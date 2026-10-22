#!/usr/bin/env node
/* ============================================================
   YOUR OWN PUSH MESSAGES  (runs inside GitHub Actions: .github/workflows/push-message.yml)

   The Consola's "Mandar una notificación" card adds a message to
   alerts/push-messages.json. When that file changes, this script:
     1. finds the messages that are NEW in this push (by their id),
     2. sends each one as a push notification to every device that turned
        notifications on - all of them, or only the ones that chose that fantasy,
     3. removes devices that are gone, and remembers what it sent (Firestore
        "pushSent"), so a re-run never sends the same message twice.

   It uses the same Firebase secret as the news notifications
   (FIREBASE_SERVICE_ACCOUNT - see PUSH-SETUP.md). Node 18+, no packages.

   Modes (set by the workflow):
     send     send the new messages to everyone they are for (a normal push)
     test     send the NEWEST message only to the most recently turned-on device
     dry-run  only say who would get what
   ============================================================ */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createSign } from 'node:crypto';

const env = process.env;
const FILE = 'alerts/push-messages.json';
const MODE = (env.MODE || 'send').trim();
const FCM_BASE = (env.FCM_BASE || 'https://fcm.googleapis.com').replace(/\/+$/, '');
const FS_BASE = (env.FIRESTORE_BASE || 'https://firestore.googleapis.com').replace(/\/+$/, '');
const MAX_PER_RUN = 3;            /* more new messages than this in one push = something is off */
const FRESH_MS = 6 * 60 * 60 * 1000;   /* a message older than this is never sent (an old one re-added by mistake) */
const CONCURRENCY = 5;
const TEST_PREFIX = '[PRUEBA] ';
const LABEL = { football: 'NFL', basketball: 'NBA', baseball: 'MLB' };

function die(msg) { console.error('\nERROR: ' + msg); process.exit(1); }
const log = (...a) => console.log(...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- the messages file ---------- */
function parse(text, label) {
  let j;
  try { j = JSON.parse(text); } catch (e) { throw new Error(label + ' is not valid JSON: ' + e.message); }
  const list = Array.isArray(j) ? j : (j && j.messages) || [];
  return list.filter((m) => m && m.id && m.title).map((m) => ({
    id: String(m.id),
    title: String(m.title).slice(0, 80),
    body: String(m.body || '').slice(0, 200),
    to: m.to || 'all',
    link: String(m.link || ''),
    at: m.at || ''
  }));
}
function previous(before) {
  if (!before || /^0+$/.test(before)) return null;
  try {
    return execFileSync('git', ['show', `${before}:${FILE}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) {
    return '';   /* the file did not exist yet: every message in it is new */
  }
}
function siteUrl() {
  if (env.SITE_URL) return env.SITE_URL.replace(/\/+$/, '');
  try {
    const host = readFileSync('CNAME', 'utf8').trim();
    if (host) return 'https://' + host;
  } catch (e) { /* fall through */ }
  return die('No CNAME file found. Set a SITE_URL variable, e.g. https://lpblsa.vip');
}
/* only links into our own site (or none = the home page) */
function linkFor(m, site) {
  const l = m.link.trim();
  if (!l) return site + '/';
  if (/^https?:\/\//i.test(l)) return l.indexOf(site) === 0 ? l : site + '/';
  return site + '/' + l.replace(/^\/+/, '');
}

/* ---------- Google (service account, no packages) - same as send-push-alert.mjs ---------- */
let SA = null, TOKEN = null;
function b64url(x) { return Buffer.from(x).toString('base64url'); }
async function accessToken() {
  if (TOKEN && TOKEN.exp > Date.now() + 60000) return TOKEN.value;
  const now = Math.floor(Date.now() / 1000);
  const aud = SA.token_uri || 'https://oauth2.googleapis.com/token';
  const head = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(JSON.stringify({
    iss: SA.client_email,
    scope: 'https://www.googleapis.com/auth/firebase.messaging https://www.googleapis.com/auth/datastore',
    aud, iat: now, exp: now + 3600,
  }));
  const signature = createSign('RSA-SHA256').update(`${head}.${claim}`).sign(SA.private_key);
  const res = await fetch(aud, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${head}.${claim}.${b64url(signature)}` }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Google sign-in failed (HTTP ${res.status}): ${text.slice(0, 400)}`);
  const json = JSON.parse(text);
  TOKEN = { value: json.access_token, exp: Date.now() + (json.expires_in || 3600) * 1000 };
  return TOKEN.value;
}
async function google(url, { method = 'GET', body } = {}) {
  const res = await fetch(url, {
    method,
    headers: { authorization: `Bearer ${await accessToken()}`, 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (e) { /* not json */ }
  return { status: res.status, ok: res.ok, json, text };
}
function docsRoot() { return `${FS_BASE}/v1/projects/${SA.project_id}/databases/(default)/documents`; }
async function listDevices() {
  const out = [];
  let page = '';
  do {
    const r = await google(`${docsRoot()}/pushTokens?pageSize=300${page ? '&pageToken=' + encodeURIComponent(page) : ''}`);
    if (!r.ok) throw new Error(`Could not read the device list (HTTP ${r.status}): ${r.text.slice(0, 300)}`);
    for (const d of (r.json && r.json.documents) || []) {
      const f = d.fields || {};
      const token = f.token && f.token.stringValue;
      if (!token) continue;
      const sports = f.sports && f.sports.arrayValue
        ? (f.sports.arrayValue.values || []).map((v) => v.stringValue).filter(Boolean) : null;
      out.push({ name: d.name, token, sports, updated: d.updateTime || d.createTime || '' });
    }
    page = (r.json && r.json.nextPageToken) || '';
  } while (page);
  return out;
}
function wants(device, to) { return to === 'all' || !device.sports || device.sports.includes(to); }
function sentDocId(id) { return 's-msg-' + String(id).replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 110); }
async function alreadySent(id) {
  const r = await google(`${docsRoot()}/pushSent/${encodeURIComponent(sentDocId(id))}`);
  if (r.status === 404) return false;
  if (!r.ok) throw new Error(`Could not check the sent list (HTTP ${r.status}): ${r.text.slice(0, 300)}`);
  return true;
}
async function markSent(id, count) {
  const r = await google(`${docsRoot()}/pushSent?documentId=${encodeURIComponent(sentDocId(id))}`, {
    method: 'POST',
    body: { fields: { messageId: { stringValue: String(id) }, sent: { integerValue: String(count) }, at: { timestampValue: new Date().toISOString() } } },
  });
  if (!r.ok && r.status !== 409) log(`  (could not record the send, HTTP ${r.status}; a re-run could send it twice)`);
}

function buildMessage(m, url, site, token) {
  let title = m.title;
  if (MODE === 'test') title = TEST_PREFIX + title;
  return {
    message: {
      token,
      notification: { title, body: m.body || 'Toca para abrir LPBLSA.' },
      data: { url, messageId: m.id, league: String(m.to) },
      webpush: {
        headers: { TTL: '43200', Urgency: 'high' },
        notification: { icon: `${site}/images/league-logo.png`, tag: 'msg-' + m.id },
        fcm_options: { link: url },
      },
    },
  };
}
async function sendOne(message) {
  const url = `${FCM_BASE}/v1/projects/${SA.project_id}/messages:send`;
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await google(url, { method: 'POST', body: message });
    if (r.ok) return { result: 'sent' };
    const err = (r.json && r.json.error) || {};
    const code = ((err.details || []).find((d) => d.errorCode) || {}).errorCode || err.status || '';
    if (r.status === 404 || code === 'UNREGISTERED') return { result: 'gone' };
    if (r.status === 400 && /registration token/i.test(err.message || '')) return { result: 'gone' };
    if (r.status === 429 || r.status >= 500) { await sleep(800 * (attempt + 1)); continue; }
    return { result: 'failed', status: r.status, detail: (err.message || r.text || '').slice(0, 300), code };
  }
  return { result: 'failed', status: 0, detail: 'gave up after 3 tries (Google was busy)' };
}
async function sendAll(devices, m, url, site) {
  const stats = { sent: 0, gone: 0, failed: 0 };
  const errors = [];
  let i = 0, authFails = 0, stop = false;
  async function worker() {
    while (!stop) {
      const d = devices[i++];
      if (!d) return;
      const r = await sendOne(buildMessage(m, url, site, d.token));
      if (r.result === 'sent') { stats.sent++; continue; }
      if (r.result === 'gone') { stats.gone++; await google(`${FS_BASE}/v1/${d.name}`, { method: 'DELETE' }); continue; }
      stats.failed++;
      if (errors.length < 3) errors.push(`HTTP ${r.status} ${r.code || ''} ${r.detail}`.trim());
      if ((r.status === 401 || r.status === 403) && ++authFails >= 3 && stats.sent === 0) stop = true;
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, devices.length) }, worker));
  return { stats, errors, aborted: stop };
}

/* ---------- main ---------- */
async function main() {
  if (!['dry-run', 'test', 'send'].includes(MODE)) die(`MODE must be dry-run, test or send (got "${MODE}")`);
  if (!env.FIREBASE_SERVICE_ACCOUNT) die('Push notifications are not set up (the FIREBASE_SERVICE_ACCOUNT secret is missing). See PUSH-SETUP.md.');
  try { SA = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT); } catch (e) { die('The FIREBASE_SERVICE_ACCOUNT secret is not valid JSON.'); }
  if (!SA.client_email || !SA.private_key || !SA.project_id) die('The FIREBASE_SERVICE_ACCOUNT secret is missing client_email, private_key or project_id.');

  const site = siteUrl();
  const current = parse(readFileSync(FILE, 'utf8'), FILE);

  let targets;
  if (MODE !== 'send' || env.BEFORE_SHA === 'manual') {
    targets = current.slice(0, 1);   /* by hand: the newest message */
  } else {
    const prev = previous(env.BEFORE_SHA);
    if (prev === null) { log('Could not tell which messages are new (no previous version), so nothing was sent (safety stop).'); return; }
    const old = new Set(prev ? parse(prev, 'previous ' + FILE).map((m) => m.id) : []);
    targets = current.filter((m) => !old.has(m.id));
    const now = Date.now();
    targets = targets.filter((m) => {
      const t = Date.parse(m.at);
      if (t && now - t > FRESH_MS) { log(`Skipping "${m.title}": written more than ${FRESH_MS / 3600000} hours ago.`); return false; }
      return true;
    });
    if (!targets.length) { log('No new messages in this push. Nothing to send.'); return; }
    if (targets.length > MAX_PER_RUN) die(`${targets.length} new messages in one push (limit ${MAX_PER_RUN}). Nothing was sent.`);
    targets.reverse();   /* the file is newest-first: send oldest-first */
  }
  if (!targets.length) { log('There are no messages in ' + FILE + ' yet.'); return; }

  const everyone = await listDevices();
  log(`${everyone.length} device(s) have notifications turned on.`);
  let anyFailed = false;
  for (const m of targets) {
    const url = linkFor(m, site);
    let audience = everyone.filter((d) => wants(d, m.to));
    if (MODE === 'test') audience = everyone.slice().sort((a, b) => String(b.updated).localeCompare(String(a.updated))).slice(0, 1);
    log(`\n== "${m.title}" / "${m.body}"\n   for: ${m.to === 'all' ? 'everyone' : (LABEL[m.to] || m.to)}   opens: ${url}   mode: ${MODE}`);
    log(`   would reach ${audience.length} device(s)`);
    if (MODE === 'dry-run') continue;
    if (!audience.length) { log('   nobody to notify.'); continue; }
    if (MODE === 'send' && await alreadySent(m.id)) { log('   already sent before, skipping.'); continue; }
    const { stats, errors, aborted } = await sendAll(audience, m, url, site);
    log(`   sent: ${stats.sent}   removed (device gone): ${stats.gone}   failed: ${stats.failed}`);
    errors.forEach((e) => log(`   problem: ${e}`));
    if (aborted) die('Google refused the sign-in/permission repeatedly. Check the FIREBASE_SERVICE_ACCOUNT secret (PUSH-SETUP.md).');
    if (stats.sent === 0 && stats.failed > 0) anyFailed = true;
    if (MODE === 'send' && stats.sent > 0) await markSent(m.id, stats.sent);
  }
  if (anyFailed) die('No notification could be delivered. See the problem lines above.');
}

main().catch((e) => die(e.message));
