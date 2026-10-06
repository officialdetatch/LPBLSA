#!/usr/bin/env node
/* ============================================================
   PUSH NOTIFICATION SENDER  (runs inside GitHub Actions, not in the browser)

   What it does:
     1. Looks at assets/news.js before and after your push.
     2. Finds stories whose id is NEW (editing an old story sends nothing).
     3. Waits until the live site actually shows the new story.
     4. Sends a push notification to every device that turned notifications on
        (and chose that story's fantasy), through Firebase Cloud Messaging.
     5. Removes devices that are gone (uninstalled, cleared data) from the list.

   It is the twin of send-news-alert.mjs (the email one) and finds new stories
   the same way. Needs Node 18+ (built into GitHub's runners). No packages to install.

   Modes (set by the workflow):
     dry-run  count who would get it and print the message, send nothing
     test     send ONLY to the most recently turned-on device (yours, if you just
              turned notifications on) with "[PRUEBA]" in front of the title
     send     send to everyone who chose that fantasy  (default on a normal push)

   Needs the secret FIREBASE_SERVICE_ACCOUNT (the whole JSON file from Firebase).
   Without it this script says so and does nothing, so the email alert still works.
   ============================================================ */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createSign } from 'node:crypto';
import vm from 'node:vm';

const env = process.env;

/* ---------- the words used in the notification (edit freely) ---------- */
const COPY = {
  testPrefix: '[PRUEBA] ',
  noSummary: 'Toca para leer la noticia.',
};

/* Football notifications keep the plain headline; other fantasies say which one it is. */
const LEAGUE_LABEL = { basketball: 'NBA', soccer: 'UCL' };

/* ---------- settings ---------- */
const MODE = (env.MODE || 'send').trim();
const FCM_BASE = (env.FCM_BASE || 'https://fcm.googleapis.com').replace(/\/+$/, '');
const FS_BASE = (env.FIRESTORE_BASE || 'https://firestore.googleapis.com').replace(/\/+$/, '');
const MAX_PER_RUN = 3;                                   /* safety: more than this in one push = something is off */
const DEPLOY_WAIT_MS = Number(env.DEPLOY_WAIT_MS) || 8 * 60 * 1000;
const DEPLOY_POLL_MS = Number(env.DEPLOY_POLL_MS) || 15 * 1000;
const CONCURRENCY = 5;
const BODY_MAX = 120;

function die(msg) { console.error('\nERROR: ' + msg); process.exit(1); }
const log = (...a) => console.log(...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- reading news.js (same rules as the email script and app.js, so ids match) ---------- */
function slug(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function loadNews(source, label) {
  const sandbox = { window: {} };
  try {
    vm.runInNewContext(source, sandbox, { timeout: 3000 });
  } catch (e) {
    throw new Error(`Could not read ${label}: ${e.message}`);
  }
  const list = sandbox.window.LEAGUE_NEWS;
  if (!Array.isArray(list)) throw new Error(`${label} has no LEAGUE_NEWS list`);
  return list.map((n, i) => {
    const body = Array.isArray(n.body) ? n.body : (n.body ? [n.body] : []);
    const blocks = Array.isArray(n.blocks) ? n.blocks : [];
    const firstPara = blocks.find((b) => b && b.type === 'p' && b.text);
    return {
      id: n.id || slug(n.headline) || ('story-' + (i + 1)),
      league: n.league || 'football',
      headline: n.headline || '',
      summary: n.summary || body[0] || (firstPara && firstPara.text) || '',
    };
  });
}
function previousNewsSource(before) {
  if (!before || /^0+$/.test(before)) return null;
  try {
    return execFileSync('git', ['show', `${before}:assets/news.js`], {
      encoding: 'utf8', maxBuffer: 50 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch (e) {
    return null;
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
async function waitForDeploy(story, site) {
  const deadline = Date.now() + DEPLOY_WAIT_MS;
  log(`Waiting for ${site} to show "${story.id}" ...`);
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${site}/assets/news.js?nocache=${Date.now()}`, { headers: { 'cache-control': 'no-cache' } });
      if (res.ok && loadNews(await res.text(), 'live news.js').some((s) => s.id === story.id)) {
        log('  live.');
        return true;
      }
    } catch (e) { /* not up yet, keep waiting */ }
    await sleep(DEPLOY_POLL_MS);
  }
  return false;
}

/* ---------- talking to Google (service account, no packages) ---------- */
let SA = null;
let TOKEN = null;
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
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${head}.${claim}.${b64url(signature)}`,
    }),
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

/* ---------- the device list (Firestore collection pushTokens) ---------- */
function docsRoot() { return `${FS_BASE}/v1/projects/${SA.project_id}/databases/(default)/documents`; }

async function listDevices() {
  const out = [];
  let page = '';
  do {
    const r = await google(`${docsRoot()}/pushTokens?pageSize=300${page ? '&pageToken=' + encodeURIComponent(page) : ''}`);
    if (!r.ok) throw new Error(`Could not read the device list (HTTP ${r.status}). Is the Firestore database created, and does the service account belong to this Firebase project? ${r.text.slice(0, 300)}`);
    for (const d of (r.json && r.json.documents) || []) {
      const f = d.fields || {};
      const token = f.token && f.token.stringValue;
      if (!token) continue;
      const sports = f.sports && f.sports.arrayValue
        ? (f.sports.arrayValue.values || []).map((v) => v.stringValue).filter(Boolean)
        : null; /* no list saved = wants everything */
      out.push({ name: d.name, token, sports, updated: d.updateTime || d.createTime || '' });
    }
    page = (r.json && r.json.nextPageToken) || '';
  } while (page);
  return out;
}
/* league-wide ("all") stories go to every device, whichever fantasies it picked */
function wants(device, league) { return league === 'all' || !device.sports || device.sports.includes(league); }

function sentDocId(storyId) { return 's-' + String(storyId).replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 120); }
async function alreadySent(storyId) {
  const r = await google(`${docsRoot()}/pushSent/${encodeURIComponent(sentDocId(storyId))}`);
  if (r.status === 404) return false;
  if (!r.ok) throw new Error(`Could not check the sent list (HTTP ${r.status}): ${r.text.slice(0, 300)}`);
  return true;
}
async function markSent(storyId, count) {
  const r = await google(`${docsRoot()}/pushSent?documentId=${encodeURIComponent(sentDocId(storyId))}`, {
    method: 'POST',
    body: { fields: {
      storyId: { stringValue: String(storyId) },
      sent: { integerValue: String(count) },
      at: { timestampValue: new Date().toISOString() },
    } },
  });
  if (!r.ok && r.status !== 409) log(`  (could not record the send, HTTP ${r.status}; a re-run could notify twice)`);
}

/* ---------- the notification ---------- */
function buildMessage(story, url, site, token) {
  const label = LEAGUE_LABEL[story.league];
  let title = (label ? `${label}: ` : '') + story.headline;
  if (MODE === 'test') title = COPY.testPrefix + title;
  let body = String(story.summary || '').replace(/\s+/g, ' ').trim();
  if (!body) body = COPY.noSummary;
  else if (body.length > BODY_MAX) body = body.slice(0, BODY_MAX - 1).replace(/\s+\S*$/, '') + '…';
  return {
    message: {
      token,
      notification: { title, body },
      data: { url, storyId: String(story.id), league: String(story.league) },
      webpush: {
        headers: { TTL: '86400', Urgency: 'high' },
        notification: { icon: `${site}/images/league-logo.png`, tag: String(story.id) },
        fcm_options: { link: url },
      },
    },
  };
}

/* Returns 'sent' | 'gone' (device no longer exists) | 'failed' */
async function sendOne(device, message) {
  const url = `${FCM_BASE}/v1/projects/${SA.project_id}/messages:send`;
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await google(url, { method: 'POST', body: message });
    if (r.ok) return { result: 'sent' };
    const err = (r.json && r.json.error) || {};
    const code = ((err.details || []).find((d) => d.errorCode) || {}).errorCode || err.status || '';
    if (r.status === 404 || code === 'UNREGISTERED') return { result: 'gone' };
    if (r.status === 400 && /registration token/i.test(err.message || '')) return { result: 'gone' }; /* not a real device address */
    if (r.status === 429 || r.status >= 500) { await sleep(800 * (attempt + 1)); continue; }
    return { result: 'failed', status: r.status, detail: (err.message || r.text || '').slice(0, 300), code };
  }
  return { result: 'failed', status: 0, detail: 'gave up after 3 tries (Google was busy)' };
}

async function removeDevice(device) {
  const r = await google(`${FS_BASE}/v1/${device.name}`, { method: 'DELETE' });
  return r.ok;
}

async function sendAll(devices, story, url, site) {
  const stats = { sent: 0, gone: 0, failed: 0 };
  const errors = [];
  let i = 0, authFails = 0, stop = false;
  async function worker() {
    while (!stop) {
      const d = devices[i++];
      if (!d) return;
      const r = await sendOne(d, buildMessage(story, url, site, d.token));
      if (r.result === 'sent') { stats.sent++; continue; }
      if (r.result === 'gone') { stats.gone++; await removeDevice(d); continue; }
      stats.failed++;
      if (errors.length < 3) errors.push(`HTTP ${r.status} ${r.code || ''} ${r.detail}`.trim());
      if (r.status === 401 || r.status === 403) { if (++authFails >= 3 && stats.sent === 0) stop = true; }
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, devices.length) }, worker));
  return { stats, errors, aborted: stop };
}

/* ---------- main ---------- */
async function main() {
  if (!['dry-run', 'test', 'send'].includes(MODE)) die(`MODE must be dry-run, test or send (got "${MODE}")`);

  if (!env.FIREBASE_SERVICE_ACCOUNT) {
    const msg = 'Push notifications are not set up yet (the FIREBASE_SERVICE_ACCOUNT secret is missing), so no push was sent. See PUSH-SETUP.md.';
    if (env.STORY_ID) die(msg);
    log(msg);
    return;
  }
  try {
    SA = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
  } catch (e) {
    return die('The FIREBASE_SERVICE_ACCOUNT secret is not valid JSON. Paste the WHOLE contents of the downloaded .json file, from the first { to the last }.');
  }
  if (!SA.client_email || !SA.private_key || !SA.project_id) die('The FIREBASE_SERVICE_ACCOUNT secret is missing client_email, private_key or project_id. Paste the whole downloaded file.');

  const site = siteUrl();
  const current = loadNews(readFileSync('assets/news.js', 'utf8'), 'assets/news.js');

  /* which stories are we announcing? */
  let targets;
  if (env.STORY_ID) {
    const s = current.find((x) => x.id === env.STORY_ID.trim());
    if (!s) die(`No story with id "${env.STORY_ID}" in assets/news.js. Ids: ${current.map((x) => x.id).join(', ')}`);
    targets = [s];
  } else {
    const prev = previousNewsSource(env.BEFORE_SHA);
    if (prev === null) {
      log('Could not read the previous version of assets/news.js, so nothing was sent (safety stop).');
      log('To announce a story anyway, run this workflow by hand from the Actions tab.');
      return;
    }
    const oldIds = new Set(loadNews(prev, 'previous assets/news.js').map((s) => s.id));
    targets = current.filter((s) => !oldIds.has(s.id));
    if (!targets.length) { log('No new stories in this push (only edits to existing ones). Nothing to send.'); return; }
    if (targets.length > MAX_PER_RUN) {
      die(`${targets.length} new stories appeared in one push (limit ${MAX_PER_RUN}). Refusing to notify everyone; send them one at a time from the Actions tab.`);
    }
    targets.reverse(); /* the file is newest-first; send oldest-first */
  }

  const everyone = await listDevices();
  log(`${everyone.length} device(s) have notifications turned on.`);

  let anyFailed = false;
  for (const story of targets) {
    const url = `${site}/news.html#${encodeURIComponent(story.id)}`;
    log(`\n== ${story.headline}\n   id: ${story.id}\n   fantasy: ${story.league}\n   link: ${url}\n   mode: ${MODE}`);

    let audience = everyone.filter((d) => wants(d, story.league));
    if (MODE === 'test') { /* your own newest device, whatever fantasy it picked */
      audience = everyone.slice().sort((a, b) => String(b.updated).localeCompare(String(a.updated))).slice(0, 1);
    }
    const preview = buildMessage(story, url, site, '(device)').message.notification;
    log(`   notification: "${preview.title}" / "${preview.body}"`);
    log(`   would reach ${audience.length} device(s)${MODE === 'test' ? ' (test: newest device only)' : ''}`);

    if (MODE === 'dry-run') continue;
    if (!audience.length) { log('   nobody to notify.'); continue; }

    if (MODE === 'send') {
      if (env.FORCE !== 'true' && await alreadySent(story.id)) {
        log('   already sent before, skipping (tick "force" in a manual run to send again).');
        continue;
      }
      if (!(await waitForDeploy(story, site))) {
        die(`The live site still doesn't show "${story.id}" after ${Math.round(DEPLOY_WAIT_MS / 60000)} minutes, so no notification was sent. Check the Pages deployment, then re-run this workflow by hand.`);
      }
    }

    const { stats, errors, aborted } = await sendAll(audience, story, url, site);
    log(`   sent: ${stats.sent}   removed (device gone): ${stats.gone}   failed: ${stats.failed}`);
    if (errors.length) errors.forEach((e) => log(`   problem: ${e}`));
    if (aborted) die('Google refused the sign-in/permission repeatedly. Check that the service account is from THIS Firebase project and that "Firebase Cloud Messaging API (V1)" is enabled (Project settings > Cloud Messaging).');
    if (stats.sent === 0 && stats.failed > 0) anyFailed = true;
    if (MODE === 'send' && stats.sent > 0) await markSent(story.id, stats.sent);
  }
  if (anyFailed) die('No notification could be delivered. See the problem lines above.');
}

main().catch((e) => die(e.message));
