/* ============================================================
   ESPN SYNC  --  run by .github/workflows/espn-sync.yml every 3 hours.
   For every league that is 'live' and has "espn" settings in assets/leagues.js,
   it reads ESPN Fantasy and rewrites that league's
     leagues/<key>/assets/<key>-roster-data.js      (rosters + free agents)
     leagues/<key>/assets/<key>-standings-data.js   (the table)
   only when something actually changed. The workflow then commits them.
   The leagues must be "Viewable to Public" on ESPN: no login is used.

   Try it on your computer (Node 18+), from the site folder:
     node scripts/espn-sync.mjs            writes the files
     DRY_RUN=1 node scripts/espn-sync.mjs  only says what would change
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { syncLeague, body } from './espn/core.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DRY = /^(1|true|yes)$/i.test(process.env.DRY_RUN || '');

/* run one of the site's data files and return what it puts on window */
function runData(file, start) {
  const window = start || {};
  if (!fs.existsSync(file)) return window;
  const sandbox = { window, self: window, document: undefined, console };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file, timeout: 5000 });
  return window;
}

async function getJSON(url, filter) {
  const headers = { Accept: 'application/json', 'User-Agent': 'lpblsa.vip ESPN sync' };
  if (filter) headers['X-Fantasy-Filter'] = JSON.stringify(filter);
  for (let attempt = 1; ; attempt++) {
    try {
      const r = await fetch(url, { headers });
      if (!r.ok) throw new Error('ESPN answered ' + r.status + ' for ' + url.replace(/\?.*/, ''));
      return await r.json();
    } catch (err) {
      if (attempt >= 3) throw err;
      await new Promise((res) => setTimeout(res, 4000 * attempt));
    }
  }
}

const summary = [];
function say(line) { console.log(line); summary.push(line); }

const site = runData(path.join(ROOT, 'assets/leagues.js'), { LPBSA_TEAMS: {} });
const leagues = (site.LPBSA_LEAGUES || []).filter((L) => L.status === 'live' && L.espn && L.espn.league);
if (!leagues.length) say('No live league has "espn" settings in assets/leagues.js - nothing to do.');

let changed = 0, failed = 0;
for (const L of leagues) {
  const dir = path.join(ROOT, 'leagues', L.key, 'assets');
  const rosterFile = path.join(dir, L.key + '-roster-data.js');
  const standingsFile = path.join(dir, L.key + '-standings-data.js');
  const teamsFile = path.join(dir, L.key + '-teams-data.js');
  try {
    const roster = runData(rosterFile, {});
    const teamsWin = runData(teamsFile, { LPBSA_TEAMS: {} });
    const teams = (teamsWin.LPBSA_TEAMS && teamsWin.LPBSA_TEAMS[L.key]) || roster.LEAGUE_TEAMS || [];
    const standings = runData(standingsFile, {}).LEAGUE_STANDINGS || [];

    const res = await syncLeague(L, getJSON, { roster, standings, teams });
    say('### ' + L.short);
    res.notes.forEach((n) => say('- ' + n));
    res.problems.forEach((p) => say('- PROBLEM: ' + p));
    if (res.problems.length) failed++;

    for (const [file, text] of [[rosterFile, res.rosterText], [standingsFile, res.standingsText]]) {
      if (!text) continue;
      const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
      const rel = path.relative(ROOT, file);
      if (body(old) === body(text)) { say('- ' + rel + ': no change'); continue; }
      changed++;
      say('- ' + rel + ': UPDATED' + (DRY ? ' (dry run, not written)' : ''));
      if (!DRY) fs.writeFileSync(file, text);
    }
  } catch (err) {
    failed++;
    say('### ' + L.short + '\n- PROBLEM: ' + (err && err.message || err) + ' - the files were left as they were.');
  }
}

say('\n' + changed + ' file(s) changed' + (failed ? ', ' + failed + ' league(s) with problems' : '') + '.');
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, '## ESPN sync\n' + summary.join('\n') + '\n');
/* a league with problems makes the run show red in Actions (the good league is still saved) */
process.exitCode = failed ? 1 : 0;
