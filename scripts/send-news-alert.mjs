#!/usr/bin/env node
/* ============================================================
   NEWS ALERT SENDER  (runs inside GitHub Actions, not in the browser)

   What it does:
     1. Looks at assets/news.js before and after your push.
     2. Finds stories whose id is NEW (editing an old story sends nothing).
     3. Waits until the live site actually shows the new story.
     4. Creates a Brevo email campaign and sends it to your subscriber list.

   Modes (set by the workflow):
     dry-run  build the email and save a preview file, send nothing
     test     send ONLY to TEST_EMAIL
     send     send to the whole Brevo list  (default on a normal push)

   Needs Node 18+ (built into GitHub's runners). No packages to install.
   ============================================================ */
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';

const env = process.env;

/* ---------- the words used in the email (edit freely) ---------- */
const COPY = {
  subjectPrefix: '📰 ',
  kicker: 'Noticias de la liga',
  button: 'Leer la noticia completa',
  linkHint: 'O copia este enlace:',
  footer: 'Recibes este correo porque te suscribiste a las alertas de noticias de La Premier Bundesliga Serie A.',
  unsubscribe: 'Cancelar suscripción',
};

/* ---------- settings (mostly from GitHub repo Variables) ---------- */
const API = (env.BREVO_API_BASE || 'https://api.brevo.com/v3').replace(/\/+$/, '');
const MODE = (env.MODE || 'send').trim();
const SENDER_EMAIL = env.SENDER_EMAIL || 'newsletter@lpblsa.vip';
const SENDER_NAME = env.SENDER_NAME || 'La Premier Bundesliga Serie A';
const REPLY_TO = env.REPLY_TO || 'info@lpblsa.vip';
const MAX_PER_RUN = 3;                                   /* safety: more than this in one push = something is off */
const DEPLOY_WAIT_MS = Number(env.DEPLOY_WAIT_MS) || 8 * 60 * 1000;
const DEPLOY_POLL_MS = Number(env.DEPLOY_POLL_MS) || 15 * 1000;

function die(msg) { console.error('\nERROR: ' + msg); process.exit(1); }
const log = (...a) => console.log(...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- reading news.js ---------- */
function slug(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/* Same rules app.js uses to build a story id and summary, so the ids
   here always match the ones in the site's links. */
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
    const firstImage = blocks.find((b) => b && b.type === 'image' && b.src);
    return {
      id: n.id || slug(n.headline) || ('story-' + (i + 1)),
      date: n.date || '',
      headline: n.headline || '',
      summary: n.summary || body[0] || (firstPara && firstPara.text) || '',
      image: (firstImage && firstImage.src) || n.image || '',
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

/* ---------- the email ---------- */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
function absolute(site, path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return site + '/' + path.replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/');
}

function buildEmail(story, url, imageUrl) {
  const font = "'Arial Narrow',Arial,Helvetica,sans-serif";
  const body = "Arial,Helvetica,sans-serif";
  const hero = imageUrl
    ? `<tr><td style="padding:0;"><a href="${esc(url)}"><img src="${esc(imageUrl)}" width="600" alt="" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></a></td></tr>`
    : '';
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(story.headline)}</title></head>
<body style="margin:0;padding:0;background:#050b1a;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#050b1a;">${esc(story.summary).slice(0, 140)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050b1a;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#0a1730;border:1px solid #28407a;">
<tr><td style="height:4px;background:#d4af37;font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="padding:22px 28px 2px;font-family:${font};font-size:12px;letter-spacing:2px;color:#d4af37;text-transform:uppercase;">${esc(COPY.kicker)}</td></tr>
<tr><td style="padding:0 28px 18px;font-family:${font};font-size:14px;letter-spacing:1px;color:#a9b4cf;text-transform:uppercase;">La Premier Bundesliga Serie A</td></tr>
${hero}
<tr><td style="padding:24px 28px 0;font-family:${font};font-size:12px;letter-spacing:1px;color:#d4af37;text-transform:uppercase;">${esc(story.date)}</td></tr>
<tr><td style="padding:6px 28px 0;"><h1 style="margin:0;font-family:${font};font-size:28px;line-height:1.2;color:#f6f7fb;font-weight:bold;">${esc(story.headline)}</h1></td></tr>
<tr><td style="padding:14px 28px 0;font-family:${body};font-size:16px;line-height:1.6;color:#dfe4f2;">${esc(story.summary)}</td></tr>
<tr><td style="padding:26px 28px 8px;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="#d4af37" style="border-radius:3px;"><a href="${esc(url)}" style="display:inline-block;padding:13px 26px;font-family:${font};font-size:14px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#050b1a;text-decoration:none;">${esc(COPY.button)}</a></td></tr></table>
</td></tr>
<tr><td style="padding:6px 28px 28px;font-family:${body};font-size:12px;line-height:1.5;color:#7f8bab;">${esc(COPY.linkHint)} <a href="${esc(url)}" style="color:#a9b4cf;">${esc(url)}</a></td></tr>
<tr><td style="padding:18px 28px 24px;border-top:1px solid #28407a;font-family:${body};font-size:12px;line-height:1.5;color:#7f8bab;">${esc(COPY.footer)}<br><a href="{{ unsubscribe }}" style="color:#a9b4cf;">${esc(COPY.unsubscribe)}</a></td></tr>
</table>
</td></tr></table>
</body></html>`;
}

/* ---------- Brevo ---------- */
async function brevo(path, { method = 'GET', body } = {}) {
  const res = await fetch(API + path, {
    method,
    headers: { 'api-key': env.BREVO_API_KEY, accept: 'application/json', 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Brevo ${method} ${path} -> HTTP ${res.status}: ${text.slice(0, 600)}`);
  try { return text ? JSON.parse(text) : null; } catch (e) { return null; }
}

/* True if a non-draft campaign with this name already exists (stops double sends). */
async function alreadySent(name) {
  for (let offset = 0; offset < 500; offset += 100) {
    const data = await brevo(`/emailCampaigns?limit=100&offset=${offset}&sort=desc`);
    const list = (data && data.campaigns) || [];
    if (list.some((c) => c.name === name && c.status !== 'draft')) return true;
    if (list.length < 100) break;
  }
  return false;
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

/* ---------- main ---------- */
async function main() {
  if (!['dry-run', 'test', 'send'].includes(MODE)) die(`MODE must be dry-run, test or send (got "${MODE}")`);
  const listId = Number(env.BREVO_LIST_ID);
  if (MODE !== 'dry-run') {
    if (!env.BREVO_API_KEY) die('BREVO_API_KEY secret is missing (repo Settings > Secrets and variables > Actions).');
    if (!Number.isInteger(listId) || listId < 1) die('BREVO_LIST_ID variable is missing or not a number.');
  }
  if (MODE === 'test' && !env.TEST_EMAIL) die('Test mode needs a test email address.');

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
      die(`${targets.length} new stories appeared in one push (limit ${MAX_PER_RUN}). Refusing to email everyone; send them one at a time from the Actions tab.`);
    }
    targets.reverse(); /* the file is newest-first; send oldest-first */
  }

  for (const story of targets) {
    const url = `${site}/news.html#${encodeURIComponent(story.id)}`;
    const subject = COPY.subjectPrefix + story.headline;
    const html = buildEmail(story, url, absolute(site, story.image));
    const name = `${MODE === 'test' ? '[TEST] ' : ''}LPBLSA news: ${story.id}`;
    log(`\n== ${story.headline}\n   id: ${story.id}\n   link: ${url}\n   mode: ${MODE}`);

    if (MODE === 'dry-run') {
      const file = `email-preview-${story.id}.html`;
      writeFileSync(file, html);
      log(`   preview saved as ${file} (download it from the run's Artifacts)`);
      continue;
    }

    if (MODE === 'send') {
      if (env.FORCE !== 'true' && await alreadySent(name)) {
        log('   already sent before, skipping (tick "force" in a manual run to send again).');
        continue;
      }
      if (!(await waitForDeploy(story, site))) {
        die(`The live site still doesn't show "${story.id}" after ${Math.round(DEPLOY_WAIT_MS / 60000)} minutes, so no email was sent. Check the Pages deployment, then re-run this workflow by hand.`);
      }
    }

    const created = await brevo('/emailCampaigns', {
      method: 'POST',
      body: {
        name, subject, type: 'classic',
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        replyTo: REPLY_TO,
        htmlContent: html,
        recipients: { listIds: [listId] },
      },
    });
    if (!created || !created.id) die('Brevo did not return a campaign id.');

    if (MODE === 'test') {
      await brevo(`/emailCampaigns/${created.id}/sendTest`, { method: 'POST', body: { emailTo: [env.TEST_EMAIL] } });
      log(`   test email sent to ${env.TEST_EMAIL} (draft campaign #${created.id} left in Brevo; safe to delete).`);
    } else {
      await brevo(`/emailCampaigns/${created.id}/sendNow`, { method: 'POST' });
      log(`   sent! Brevo campaign #${created.id}`);
    }
  }
}

main().catch((e) => die(e.message));
