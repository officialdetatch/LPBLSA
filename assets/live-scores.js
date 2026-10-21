/* ============================================================
   LIVE SCORES  --  puts this week's real points from ESPN Fantasy on the
   matchup cards of La Jornada (assets/jornada.js), and keeps them fresh.

   Where they come from: each league's "espn" settings in assets/leagues.js
   (game, season, League ID, and ESPN's team number -> our team slug). The
   leagues must be "Viewable to Public" on ESPN (League > Settings), so no
   password or login is ever involved.

   What a card shows: the week's points of both teams (big), a bar with who is
   ahead, and "En vivo" while the week's games are on / "Final" once ESPN has
   a winner. For the NFL, ESPN's projection for each team shows under it.
   Before anyone scores, the card stays as it was (points per week of the season).

   How often: every minute while the week is on and the page is open on screen,
   every 10 minutes before kickoff, never when the tab is hidden. If ESPN does
   not answer (or changes its data one day), the cards simply stay as they were.

   New season: change  season  in assets/leagues.js (and the League ID if ESPN
   gives you a new one). Teams that join: add their ESPN number to  teams .
   ============================================================ */
(function () {
  'use strict';

  var API = 'https://lm-api-reads.fantasy.espn.com/apis/v3/games/';
  var EVERY_LIVE = 60 * 1000;
  var EVERY_SOON = 10 * 60 * 1000;

  var state = {};   /* by league: { week, at, games, busy, failed } */

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  /* like ESPN: 82.75 stays 82.75, 150.2 stays 150.2 */
  function fmt(n) {
    var r = Math.round(n * 100) / 100;
    return Math.round(r * 10) === r * 10 ? r.toFixed(1) : r.toFixed(2);
  }
  function norm(s) {
    return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');
  }
  function espnOf(key) {
    var L = window.LPBSA_findLeague && window.LPBSA_findLeague(key);
    return L && L.espn && L.espn.league ? L : null;
  }

  /* ESPN team number -> our slug: the list in leagues.js first, then the team name as a backup */
  function slugFor(L, team) {
    var map = L.espn.teams || {};
    if (map[team.id]) return map[team.id];
    var want = norm(team.name || ((team.location || '') + (team.nickname || '')));
    var mine = (window.LPBSA_teamsOf && window.LPBSA_teamsOf(L.key)) || [];
    for (var i = 0; i < mine.length; i++) if (norm(mine[i].name) === want) return mine[i].slug;
    return '';
  }

  function pointsOf(side) {
    if (!side) return 0;
    var n = side.totalPointsLive != null ? side.totalPointsLive : side.totalPoints;
    return Number(n) || 0;
  }

  /* one request: that week's matchups only (ESPN's own filter), plus the team list */
  function load(key, week) {
    var L = espnOf(key);
    var st = state[key] = state[key] || {};
    if (!L || st.busy) return Promise.resolve(null);
    st.busy = true;
    var E = L.espn;
    var url = API + E.game + '/seasons/' + E.season + '/segments/0/leagues/' + E.league + '?view=mMatchupScore&view=mTeam';
    var filter = JSON.stringify({ schedule: { filterMatchupPeriodIds: { value: [Number(week)] } } });
    return window.fetch(url, { headers: { 'X-Fantasy-Filter': filter }, cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('ESPN ' + r.status);
      return r.json();
    }).then(function (j) {
      var teams = {};
      (j.teams || []).forEach(function (t) { teams[t.id] = slugFor(L, t); });
      var games = (j.schedule || []).filter(function (m) {
        return m.matchupPeriodId === Number(week) && m.home && m.away;
      }).map(function (m) {
        var h = teams[m.home.teamId], a = teams[m.away.teamId];
        var g = { slugs: [h, a], pts: {}, proj: {}, final: !!m.winner && m.winner !== 'UNDECIDED' };
        g.pts[h] = pointsOf(m.home); g.pts[a] = pointsOf(m.away);
        if (m.home.totalProjectedPointsLive != null) g.proj[h] = Number(m.home.totalProjectedPointsLive) || 0;
        if (m.away.totalProjectedPointsLive != null) g.proj[a] = Number(m.away.totalProjectedPointsLive) || 0;
        return g;
      });
      st.week = Number(week); st.games = games; st.at = Date.now(); st.failed = false;
      return st;
    }).catch(function (err) {
      if (!st.failed && window.console) console.warn('[live scores] ' + key + ':', err && err.message || err);
      st.failed = true; st.at = Date.now();
      return null;
    }).then(function (res) { st.busy = false; return res; });
  }

  /* ---------- drawing on the cards ---------- */
  function gameFor(st, a, b) {
    if (!st || !st.games) return null;
    for (var i = 0; i < st.games.length; i++) {
      var s = st.games[i].slugs;
      if ((s[0] === a && s[1] === b) || (s[0] === b && s[1] === a)) return st.games[i];
    }
    return null;
  }
  function phaseOf(card) {
    var host = card.closest('[data-phase]');
    return host ? host.getAttribute('data-phase') : '';
  }

  function paint(key) {
    var st = state[key];
    Array.prototype.forEach.call(document.querySelectorAll('.matchup[data-league="' + key + '"]'), function (card) {
      if (!st || st.week !== Number(card.getAttribute('data-week'))) return;
      var a = card.getAttribute('data-a'), b = card.getAttribute('data-b');
      var g = gameFor(st, a, b);
      var old = card.querySelector('.mu-live');
      var seasonBar = card.querySelector('.mu-bar');
      function clear() { if (old) old.remove(); if (seasonBar) seasonBar.hidden = false; }
      if (!g) { clear(); return; }
      var pa = g.pts[a] || 0, pb = g.pts[b] || 0;
      var hasProj = g.proj[a] != null && g.proj[b] != null && (g.proj[a] || g.proj[b]);
      if (!pa && !pb && !hasProj) { clear(); return; }   /* nothing yet: keep the season bar */

      var live = phaseOf(card) === 'live';
      var tag = g.final ? '<span class="mu-live-tag is-final">Final</span>'
        : live ? '<span class="mu-live-tag is-live"><span class="live-dot" aria-hidden="true"></span>En vivo</span>'
        : '<span class="mu-live-tag">Esta semana</span>';
      var html;
      if (pa || pb) {
        var pct = Math.round(pa / (pa + pb) * 1000) / 10;
        var lead = pa > pb ? 'a' : pb > pa ? 'b' : '';
        html =
          '<div class="mu-live-row">' +
            '<b class="mu-live-pts' + (lead === 'a' ? ' is-ahead' : '') + '">' + fmt(pa) + '</b>' + tag +
            '<b class="mu-live-pts' + (lead === 'b' ? ' is-ahead' : '') + '">' + fmt(pb) + '</b>' +
          '</div>' +
          '<div class="mu-bar-track" role="img" aria-label="Puntos esta semana: ' + fmt(pa) + ' a ' + fmt(pb) + '">' +
            '<span class="mu-bar-a" style="width:' + pct + '%"></span><span class="mu-bar-b"></span></div>';
      } else {
        html = '';   /* before kickoff: only ESPN's projection, under the season bar */
      }
      if (hasProj && !g.final) {
        html += '<p class="mu-live-proj"><span>' + fmt(g.proj[a]) + '</span>Proyección ESPN<span>' + fmt(g.proj[b]) + '</span></p>';
      }
      var box = old || document.createElement('div');
      box.className = 'mu-live' + (g.final ? ' is-final' : live ? ' is-live' : '');
      box.innerHTML = html;
      if (!old) card.insertBefore(box, card.querySelector('.mu-sass') || null);
      /* once there are points, they take the place of the season average */
      if (seasonBar) seasonBar.hidden = !!(pa || pb);
    });
  }

  /* ---------- when to ask ESPN ---------- */
  function shownWeeks() {
    var out = {};
    Array.prototype.forEach.call(document.querySelectorAll('.matchup[data-league][data-week]'), function (c) {
      var key = c.getAttribute('data-league');
      if (!espnOf(key)) return;
      out[key] = { week: Number(c.getAttribute('data-week')), phase: phaseOf(c) };
    });
    return out;
  }
  function refresh(force) {
    if (document.hidden) return;
    var shown = shownWeeks();
    Object.keys(shown).forEach(function (key) {
      var w = shown[key], st = state[key] || {};
      if (w.phase === 'over') return;
      var wait = w.phase === 'live' ? EVERY_LIVE : EVERY_SOON;
      if (!force && st.week === w.week && st.at && Date.now() - st.at < wait - 2000) { paint(key); return; }
      load(key, w.week).then(function () { paint(key); });
    });
  }

  /* La Jornada redrew (tab switch, new week, kickoff): paint at once, ask ESPN if what we have is old */
  document.addEventListener('lpbsa:jornada', function () { refresh(false); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) refresh(false); });
  window.setInterval(function () { refresh(false); }, 30 * 1000);
  refresh(true);

  window.LPBSA_LIVE = { refresh: function () { refresh(true); }, state: state };
})();
