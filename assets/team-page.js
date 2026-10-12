/* ============================================================
   TEAM PAGE  --  the parts of a team page that keep themselves up to date.
   Used by the NBA team pages (leagues/nba/teams/<team>.html); a new league's
   team pages can use it too. The NFL team pages are written out by hand and
   do not load it.

   The page says which team it is with  <main data-team="sin-talento">  and
   which league with  <body data-league="nba">. Then this fills in:

     [data-tp="crest"]    the team's logo, from <league>-teams-data.js (no logo
                          yet = the initials badge stays)
     [data-tp="rank"]     "Ranked #2 of 6", from <league>-standings-data.js -
                          only once a game has been played; until then the page
                          keeps what is written there
     [data-tp="record"]   "3-1"            [data-tp="streak"]   "W2"
     [data-tp="pf"]       points for       [data-tp="pa"]       points against
     [data-tp="playoff"]  playoff odds
     #teamSchedule        the season, matchup by matchup, from
                          <league>-schedule-data.js: dates, opponent, home or
                          away. This week's matchup is marked and the ones
                          already played fade, so it moves along by itself.

   So when the standings manager saves a new table, every team page is up to
   date - nothing to edit in the pages. The manager's name and the bio ARE
   written in each page (look for MANAGER BIO).

   Needs, loaded before it: assets/leagues.js, the league's teams, standings
   and schedule files, assets/app.js and assets/jornada.js (for the calendar).
   ============================================================ */
(function () {
  'use strict';

  var main = document.querySelector('main[data-team]');
  if (!main || !window.LPBSA_findLeague) return;
  var root = document.body.getAttribute('data-root') || '';
  var L = window.LPBSA_findLeague(document.body.getAttribute('data-league'));
  if (!L) return;
  var slug = main.getAttribute('data-team');
  var teams = window.LPBSA_teamsOf(L.key);
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function teamOf(s) {
    for (var i = 0; i < teams.length; i++) { if (teams[i].slug === s) return teams[i]; }
    return { slug: s, name: s };
  }
  function initialsOf(t) {
    return t.initials || String(t.name || t.slug || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
  }
  function crestSrc(t) {
    if (!t.crest) return '';
    return /^(https?:)?\/\//i.test(t.crest) || t.crest.charAt(0) === '/' ? t.crest : root + (L.assetRoot || '') + t.crest;
  }
  function crestHTML(t) {
    var src = crestSrc(t);
    return '<span class="crest' + (t.shape === 'circle' ? ' crest-circle' : '') + '">' +
      (src ? '<img src="' + esc(src) + '" alt="' + esc(t.name) + ' crest" loading="lazy" onerror="this.remove()">' : '') +
      '<span class="crest-fallback">' + esc(initialsOf(t)) + '</span></span>';
  }
  function set(what, text) {
    Array.prototype.forEach.call(main.querySelectorAll('[data-tp="' + what + '"]'), function (el) {
      el.textContent = text;
    });
  }
  function num(v) {
    var n = parseFloat(v);
    return isNaN(n) ? String(v == null ? '' : v) : String(Math.round(n * 100) / 100);
  }

  /* ---------- the hero: crest, rank, record, points, streak, playoff odds ---------- */
  var me = teamOf(slug);
  Array.prototype.forEach.call(main.querySelectorAll('[data-tp="crest"]'), function (el) {
    el.classList.toggle('crest-circle', me.shape === 'circle');
    var src = crestSrc(me);
    if (!src || el.querySelector('img')) return;
    var img = document.createElement('img');
    img.src = src;
    img.alt = me.name + ' crest';
    img.onerror = function () { img.remove(); };
    el.insertBefore(img, el.firstChild);
  });

  var rows = window.LEAGUE_STANDINGS || [];
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].team !== slug) continue;
    var r = rows[i];
    var t = Number(r.t) || 0;
    set('record', (Number(r.w) || 0) + '-' + (Number(r.l) || 0) + (t || !L.noTies ? '-' + t : ''));
    set('pf', num(r.pf || 0));
    set('pa', num(r.pa || 0));
    set('streak', r.streak ? String(r.streak) : '—');
    if (r.playoff) set('playoff', String(r.playoff));
    if (window.LPBSA_hasPlayed && window.LPBSA_hasPlayed(rows)) set('rank', 'Ranked #' + (i + 1) + ' of ' + rows.length);
    break;
  }

  /* ---------- the Schedule ---------- */
  var host = document.getElementById('teamSchedule');
  if (!host) return;
  var C = window.LPBSA_CALENDAR;
  var sc = C && C.scheduleOf(L.key);
  if (!sc) {
    host.innerHTML = '<tr><td colspan="4" class="section-note">El calendario sale pronto.</td></tr>';
    return;
  }
  var cal = C.calendarOf(sc, Date.now());
  var unit = sc.S.weekLabel || 'Semana';
  var short = unit === 'Semana' ? 'WK ' : unit.charAt(0).toUpperCase();

  function dayLabel(d) { return MONTHS[d[1] - 1] + ' ' + d[2]; }
  function rangeLabel(a, b) {
    return dayLabel(a) + ' &ndash; ' + (a[1] === b[1] ? b[2] : dayLabel(b));
  }

  host.innerHTML = sc.weeks.map(function (wk, idx) {
    var first = sc.days[idx];
    var last = C.plusDays(idx + 1 < sc.days.length ? sc.days[idx + 1] : sc.end, -1);
    var state = cal.phase === 'over' || wk.week < cal.week ? 'past' : wk.week === cal.week ? 'now' : 'next';
    var tag = '';
    if (state === 'now') {
      tag = cal.phase === 'live'
        ? '<span class="sched-tag is-live"><span class="live-dot" aria-hidden="true"></span>En juego</span>'
        : '<span class="sched-tag">Pr&oacute;ximo</span>';
    }
    var cls = state === 'now' ? ' class="sched-now"' : state === 'past' ? ' class="sched-past"' : '';
    var lead = '<td><span class="slot-badge">' + esc(short + wk.week) + '</span>' + tag + '</td>' +
      '<td class="sched-dates">' + rangeLabel(first, last) + '</td>';

    var game = (wk.games || []).filter(function (g) { return g[0] === slug || g[1] === slug; })[0];
    if (!game) {
      var off = [].concat(wk.bye || []).indexOf(slug) !== -1 ? 'Bye week' : 'No juega';
      return '<tr' + cls + '>' + lead + '<td colspan="2" style="color:var(--mute)">' + off + '</td></tr>';
    }
    var home = game[1] === slug;           /* the schedule lists the visitor first, home second */
    var opp = teamOf(home ? game[0] : game[1]);
    var href = L.teamPages ? root + L.teamPages + opp.slug + '.html' : '';
    var inner = crestHTML(opp) + '<span class="name">' + esc(opp.name) + '</span>';
    return '<tr' + cls + '>' + lead +
      '<td>' + (href ? '<a class="team-link" href="' + esc(href) + '">' + inner + '</a>' : '<span class="team-link">' + inner + '</span>') + '</td>' +
      '<td style="color:var(--mute)">' + (home ? 'Home' : 'Away') + '</td></tr>';
  }).join('');
})();
