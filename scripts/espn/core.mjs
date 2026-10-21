/* ============================================================
   ESPN SYNC - THE BRAINS  (used by scripts/espn-sync.mjs)
   Reads one league from ESPN Fantasy and writes the site's own data files
   in exactly the format the roster and standings managers write them:
     leagues/<key>/assets/<key>-roster-data.js      rosters + free agents
     leagues/<key>/assets/<key>-standings-data.js   the table
   No files, no Node here - only "turn ESPN's answers into file text", so it
   can be tested anywhere. The league settings come from assets/leagues.js
   (the "espn" lines: game, season, League ID, ESPN team number -> slug).
   ============================================================ */

const API = 'https://lm-api-reads.fantasy.espn.com/apis/v3/games/';

/* ESPN's numbers for each sport */
export const GAMES = {
  ffl: {
    sport: 'NFL',
    slots: { QB: 0, RB: 2, WR: 4, TE: 6, OP: 7, 'D/ST': 16, K: 17, BE: 20, IR: 21, FLEX: 23 },
    positions: { 1: 'QB', 2: 'RB', 3: 'WR', 4: 'TE', 5: 'K', 16: 'D/ST' },
    multiPos: false,
    byes: true
  },
  fba: {
    sport: 'NBA',
    slots: { PG: 0, SG: 1, SF: 2, PF: 3, C: 4, G: 5, F: 6, 'SG/SF': 7, 'G/F': 8, 'PF/C': 9, 'F/C': 10, UTIL: 11, BE: 12, IR: 13 },
    positions: { 1: 'PG', 2: 'SG', 3: 'SF', 4: 'PF', 5: 'C' },
    slotPositions: { 0: 'PG', 1: 'SG', 2: 'SF', 3: 'PF', 4: 'C' },   /* "every position he can play" */
    multiPos: true,
    byes: false
  }
};

/* ESPN's injury words -> the short tags the site shows */
const STATUS = {
  QUESTIONABLE: 'Q', DOUBTFUL: 'D', OUT: 'OUT', INJURY_RESERVE: 'IR', SUSPENSION: 'SUSP',
  DAY_TO_DAY: 'DTD', PROBABLE: 'P', BEREAVEMENT: 'BRV', PATERNITY: 'PAT',
  SEVEN_DAY_DL: 'IL', TEN_DAY_DL: 'IL', FIFTEEN_DAY_DL: 'IL', SIXTY_DAY_DL: 'IL'
};

function round2(n) { return Math.round(Number(n) * 100) / 100; }
function norm(s) {
  return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

export function leagueURL(E, views) {
  return API + E.game + '/seasons/' + E.season + '/segments/0/leagues/' + E.league + '?' +
    views.map((v) => 'view=' + v).join('&');
}

/* ---------- the variable names in each league's roster file ---------- */
/* The NFL file (the first one) uses LEAGUE_TEAMS / STARTER_SLOTS / LEAGUE_ROSTERS / FREE_AGENTS;
   newer leagues prefix them: NBA_STARTER_SLOTS / NBA_ROSTERS / NBA_FREE_AGENTS. */
export function rosterNames(key, current) {
  const K = key.toUpperCase();
  if (current && current[K + '_ROSTERS'] !== undefined) {
    return { slots: K + '_STARTER_SLOTS', rosters: K + '_ROSTERS', fa: K + '_FREE_AGENTS', teams: null };
  }
  if (key === 'nfl') return { slots: 'STARTER_SLOTS', rosters: 'LEAGUE_ROSTERS', fa: 'FREE_AGENTS', teams: 'LEAGUE_TEAMS' };
  return { slots: K + '_STARTER_SLOTS', rosters: K + '_ROSTERS', fa: K + '_FREE_AGENTS', teams: null };
}

/* ---------- one player, the way the site stores him ---------- */
function statsOf(p, season, maxPeriod) {
  const out = { fpts: null, avg: null, last: null };
  const list = (p && p.stats) || [];
  const proj = list.find((s) => s.statSourceId === 1 && s.statSplitTypeId === 0 && s.id === '10' + season);
  const act = list.find((s) => s.statSourceId === 0 && s.statSplitTypeId === 0 && s.id === '00' + season);
  /* the newest single game of THIS season (ESPN lists them newest first; last season's games have
     scoring period numbers higher than any this season has reached yet) */
  const game = list.find((s) => s.statSourceId === 0 && (s.statSplitTypeId === 1 || s.statSplitTypeId === 5) &&
    s.scoringPeriodId > 0 && (!maxPeriod || s.scoringPeriodId <= maxPeriod));
  if (proj && proj.appliedTotal != null) out.fpts = round2(proj.appliedTotal);
  if (act && (act.appliedTotal || act.appliedAverage)) out.avg = round2(act.appliedAverage || 0);
  if (game && game.appliedTotal != null) out.last = round2(game.appliedTotal);
  return out;
}

export function playerRecord(p, ctx) {
  const G = ctx.G;
  let pos = G.positions[p.defaultPositionId] || '';
  if (G.multiPos) {
    const more = (p.eligibleSlots || []).map((s) => G.slotPositions[s]).filter((x) => x && x !== pos);
    pos = [pos].concat(more.filter((x, i) => more.indexOf(x) === i)).filter(Boolean).join(', ');
  }
  const isDef = pos === 'D/ST';
  const team = ctx.proTeams[p.proTeamId] || 'FA';
  let status = STATUS[p.injuryStatus] || null;
  if (!status && G.byes && ctx.byeWeek && ctx.proByes[p.proTeamId] === ctx.byeWeek) status = 'BYE';
  const s = statsOf(ctx.stats[p.id] || p, ctx.season, ctx.maxPeriod);
  const rec = { name: isDef ? String(p.fullName || '').replace(/\s*D\/ST$/i, '') : p.fullName };
  if (!isDef && p.id > 0) rec.espn = String(p.id);
  rec.status = status;
  rec.team_abbr = team;
  rec.pos = pos;
  rec.fpts = s.fpts;
  rec.avg = s.avg;
  rec.last = s.last;
  return rec;
}

/* ESPN team -> our slug: the numbers in leagues.js first, the team name as a backup */
export function slugFor(L, team, ourTeams) {
  const map = (L.espn && L.espn.teams) || {};
  if (map[team.id]) return map[team.id];
  const want = norm(team.name || ((team.location || '') + (team.nickname || '')));
  const hit = (ourTeams || []).find((t) => norm(t.name) === want);
  return hit ? hit.slug : '';
}

/* ---------- the whole sync for one league ----------
   getJSON(url, filter) -> ESPN's answer (filter = the X-Fantasy-Filter object, or null)
   current = { roster: {...globals of the roster file}, standings: [...], teams: [...our teams] }
   Returns { rosterText, standingsText, notes, problems } - a text is null when it should not be written. */
export async function syncLeague(L, getJSON, current) {
  const E = L.espn;
  const G = GAMES[E.game];
  const notes = [], problems = [];
  if (!G) return { rosterText: null, standingsText: null, notes, problems: ['ESPN game "' + E.game + '" is not set up in scripts/espn/core.mjs'] };

  const league = await getJSON(leagueURL(E, ['mRoster', 'mTeam', 'mSettings', 'mStatus']), null);
  const proInfo = await getJSON(API + E.game + '/seasons/' + E.season + '?view=proTeamSchedules_wl', null);
  const proTeams = {}, proByes = {};
  ((proInfo.settings && proInfo.settings.proTeams) || []).forEach((t) => {
    proTeams[t.id] = t.abbrev ? String(t.abbrev).toUpperCase() : 'FA';
    if (t.byeWeek) proByes[t.id] = t.byeWeek;
  });
  proTeams[0] = 'FA';
  const week = (league.status && league.status.currentMatchupPeriod) || league.scoringPeriodId || 0;
  const ourTeams = current.teams || [];

  /* every ESPN team must be one of ours, or nothing is written (better old data than wrong data) */
  const slugOf = {};
  (league.teams || []).forEach((t) => {
    const s = slugFor(L, t, ourTeams);
    if (!s) problems.push('ESPN team ' + t.id + ' "' + t.name + '" is not one of our teams - add it to "teams" in assets/leagues.js');
    slugOf[t.id] = s;
  });
  if (!(league.teams || []).length) problems.push('ESPN sent no teams (is the league still "Viewable to Public"?)');
  if (problems.length) return { rosterText: null, standingsText: null, notes, problems };

  /* stats (season projection, season average, last game) for every rostered player, in one go */
  const ids = [];
  league.teams.forEach((t) => ((t.roster && t.roster.entries) || []).forEach((e) => ids.push(e.playerId)));
  const statFilter = { value: 1, additionalValue: ['00' + E.season, '10' + E.season] };
  const stats = {};
  if (ids.length) {
    const kona = await getJSON(leagueURL(E, ['kona_player_info']), {
      players: { filterIds: { value: ids }, filterStatsForTopScoringPeriodIds: statFilter }   /* (no limit: ESPN refuses one here) */
    });
    (kona.players || []).forEach((x) => { if (x.player) stats[x.player.id] = x.player; });
  }
  const maxPeriod = (league.status && league.status.latestScoringPeriod) || league.scoringPeriodId || 0;
  const ctx = { G, proTeams, proByes, byeWeek: G.byes ? week : 0, stats, season: E.season, maxPeriod };

  /* ---------- rosters ---------- */
  const cur = current.roster || {};
  const N = rosterNames(L.key, cur);
  const slots = Array.isArray(cur[N.slots]) && cur[N.slots].length ? cur[N.slots] : null;
  if (!slots) problems.push('could not read the starter slots from ' + L.key + '-roster-data.js');
  const unknown = (slots || []).filter((s) => G.slots[s] === undefined);
  if (unknown.length) problems.push('starter slot(s) ' + unknown.join(', ') + ' are not known for ESPN game ' + E.game);
  if (problems.length) return { rosterText: null, standingsText: null, notes, problems };

  const rosters = {};
  let rostered = 0;
  /* keep the site's team order (the current file's), then any team ESPN has that it did not */
  const order = Object.keys(cur[N.rosters] || {});
  league.teams.forEach((t) => { if (order.indexOf(slugOf[t.id]) === -1) order.push(slugOf[t.id]); });
  const byTeam = {};
  league.teams.forEach((t) => { byTeam[slugOf[t.id]] = t; });
  order.forEach((slug) => {
    const t = byTeam[slug];
    if (!t) return;   /* a team that is not on ESPN any more */
    const pool = {};
    ((t.roster && t.roster.entries) || []).forEach((e) => {
      const p = e.playerPoolEntry && e.playerPoolEntry.player;
      if (!p) return;
      (pool[e.lineupSlotId] = pool[e.lineupSlotId] || []).push(playerRecord(p, ctx));
      rostered++;
    });
    const starters = slots.map((label) => {
      const list = pool[G.slots[label]];
      return list && list.length ? list.shift() : null;
    });
    /* anyone left in a starting spot the site does not have goes to the bench */
    const bench = [], ir = [];
    Object.keys(pool).forEach((slotId) => {
      const id = Number(slotId);
      (pool[slotId] || []).forEach((p) => { (id === G.slots.IR ? ir : bench).push(p); });
    });
    rosters[slug] = { starters, bench, ir };
  });
  const before = Object.values(cur[N.rosters] || {}).reduce((n, r) =>
    n + (r.starters || []).filter(Boolean).length + (r.bench || []).length + (r.ir || []).length, 0);
  if (rostered < Math.max(5, before * 0.5)) {
    problems.push('ESPN listed only ' + rostered + ' rostered players (the site has ' + before + ') - not trusting it this time');
  }

  /* ---------- free agents: the most-owned ones, as many as the board shows now (100) ---------- */
  const faCount = Math.max(25, Math.min(200, (cur[N.fa] || []).length || 100));
  const startIds = Object.keys(G.slots).filter((k) => k !== 'BE' && k !== 'IR').map((k) => G.slots[k]);
  const faAns = await getJSON(leagueURL(E, ['kona_player_info']), {
    players: {
      filterStatus: { value: ['FREEAGENT', 'WAIVERS'] },
      filterSlotIds: { value: startIds },
      limit: faCount,
      sortPercOwned: { sortPriority: 1, sortAsc: false },
      sortDraftRanks: { sortPriority: 100, sortAsc: true, value: 'STANDARD' },
      filterStatsForTopScoringPeriodIds: statFilter
    }
  });
  const fa = (faAns.players || []).filter((x) => x.player).map((x) => playerRecord(x.player, ctx));
  const keepOldFA = fa.length < 10;
  if (keepOldFA) notes.push('free agents: ESPN sent only ' + fa.length + ', kept the old list');

  let rosterText = null;
  if (!problems.length) {
    const K = L.key.toUpperCase();
    const header = [
      '/* ============================================================',
      '   ' + K + ' ROSTERS & FREE AGENTS',
      '   Kept up to date from ESPN Fantasy by the "ESPN sync" robot',
      '   (.github/workflows/espn-sync.yml, every 3 hours) - see README.md,',
      '   "Rosters and standings from ESPN". Changes made here or in the',
      '   roster manager are replaced on the next sync.',
      '',
      '   Each player:  name, espn (his ESPN id, for the photo), status (Q, D,',
      '   OUT, IR, DTD, BYE... or null when fine), team_abbr, pos (every position',
      '   he can play - the first one is his main one), fpts (ESPN\'s season',
      '   projection), avg (average per game this season) and last (his last',
      '   game) - null = not known yet.',
      '   ============================================================ */'
    ].join('\n');
    let text = header + '\n';
    if (N.teams) text += 'window.' + N.teams + ' = ' + JSON.stringify(cur[N.teams] || ourTeams, null, 2) + ';\n\n';
    text += 'window.' + N.slots + ' = ' + JSON.stringify(slots) + ';\n\n';
    text += 'window.' + N.rosters + ' = ' + JSON.stringify(rosters, null, 2) + ';\n\n';
    text += 'window.' + N.fa + ' = ' + JSON.stringify(keepOldFA ? (cur[N.fa] || []) : fa, null, 2) + ';\n';
    rosterText = text;
    notes.push('rosters: ' + rostered + ' players on ' + Object.keys(rosters).length + ' teams; free agents: ' + (keepOldFA ? (cur[N.fa] || []).length + ' (old)' : fa.length));
  }

  /* ---------- standings ---------- */
  const oldRows = {};
  (current.standings || []).forEach((r) => { oldRows[r.team] = r; });
  const ranked = league.teams.slice().sort((a, b) => {
    const sa = a.playoffSeed || 99, sb = b.playoffSeed || 99;
    if (sa !== sb) return sa - sb;
    const ra = a.record.overall, rb = b.record.overall;
    return (rb.percentage - ra.percentage) || (rb.pointsFor - ra.pointsFor);
  });
  const table = ranked.map((t) => {
    const r = (t.record && t.record.overall) || {};
    const slug = slugOf[t.id];
    const games = (r.wins || 0) + (r.losses || 0) + (r.ties || 0);
    const pct = games ? ((r.wins || 0) + (r.ties || 0) / 2) / games : 0;
    const gb = Number(r.gamesBack) || 0;
    const kind = { WIN: 'W', LOSS: 'L', TIE: 'T' }[r.streakType] || '';
    return {
      team: slug,
      w: r.wins || 0,
      l: r.losses || 0,
      t: r.ties || 0,
      pct: pct >= 1 ? '1.000' : pct.toFixed(3).replace(/^0/, ''),
      gb: gb ? String(gb) : '--',
      pf: round2(r.pointsFor || 0),
      pa: round2(r.pointsAgainst || 0),
      streak: kind && r.streakLength ? kind + r.streakLength : '',
      /* ESPN does not share playoff chances: whatever the standings manager last had stays */
      playoff: oldRows[slug] && oldRows[slug].playoff != null ? oldRows[slug].playoff : ''
    };
  });
  const K = L.key.toUpperCase();
  const standingsText = [
    '/* ============================================================',
    '   ' + K + ' LEAGUE STANDINGS',
    '   The ORDER of this list is the rank -- the first team is 1st place,',
    '   the last is last place. Kept up to date from ESPN Fantasy by the',
    '   "ESPN sync" robot (every 3 hours). The "playoff" chances are the only',
    '   thing ESPN does not share: set them in ' + L.key + '-standings-manager.html,',
    '   the robot keeps them.',
    '   ============================================================ */'
  ].join('\n') + '\nwindow.LEAGUE_STANDINGS = ' + JSON.stringify(table, null, 2) + ';\n';
  notes.push('standings: ' + table.map((r) => r.team + ' ' + r.w + '-' + r.l + (r.t ? '-' + r.t : '')).join(', '));

  return { rosterText: problems.length ? null : rosterText, standingsText, notes, problems };
}

/* the part of a data file that matters (the comment at the top can change without it counting as news) */
export function body(text) {
  return String(text || '').replace(/^\s*\/\*[\s\S]*?\*\/\s*/, '').trim();
}
