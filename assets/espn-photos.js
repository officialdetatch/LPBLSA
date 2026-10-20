/* ============================================================
   ESPN PHOTOS  --  the "Player photos" box in the roster managers
   (nfl-roster-manager.html / nba-roster-manager.html).

   Every player's photo on the site comes from ESPN, found by his ESPN
   player id (the "espn" field next to his name in the roster data; see
   "player photos" in assets/app.js). This box counts who has one and,
   with "Find missing photos", looks up the rest:
     1. it reads every team's roster from ESPN and matches by name
        (accents, Jr. / III and the like don't matter; the team breaks ties)
     2. anyone still missing (a free agent, a player between teams) is
        looked up with ESPN's player search
   Found ids go into the roster data like any other change: Publish (or
   Download) to put them on the site. NFL defenses (D/ST) need no id -
   they show their team's logo.
   ============================================================ */
(function () {
  'use strict';

  var API = 'https://site.api.espn.com/apis/site/v2/sports/';
  var SEARCH = 'https://site.web.api.espn.com/apis/common/v3/search?limit=6&type=player&query=';
  var PATH = { nba: 'basketball/nba', nfl: 'football/nfl' };
  var TEAMS = {
    nba: 'ATL BOS BKN CHA CHI CLE DAL DEN DET GS HOU IND LAC LAL MEM MIA MIL MIN NO NY OKC ORL PHI PHX POR SAC SA TOR UTAH WSH'.split(' '),
    nfl: 'ARI ATL BAL BUF CAR CHI CIN CLE DAL DEN DET GB HOU IND JAX KC LAC LAR LV MIA MIN NE NO NYG NYJ PHI PIT SEA SF TB TEN WSH'.split(' ')
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  /* "Nikola Jokić", "Jaren Jackson Jr." and "jaren jackson" all become the same key */
  function norm(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
      .replace(/[.'’`-]/g, ' ').replace(/\b(jr|sr|ii|iii|iv|v)\b/g, ' ')
      .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function getJSON(url) {
    return window.fetch(url).then(function (r) {
      if (!r.ok) throw new Error('ESPN answered ' + r.status);
      return r.json();
    });
  }
  function needsPhoto(p) { return !!p && !p.espn && !/D\/ST/i.test(p.pos || ''); }

  /* every player on every team: [{ id, name, team }] */
  function espnRosters(league) {
    return Promise.all(TEAMS[league].map(function (ab) {
      return getJSON(API + PATH[league] + '/teams/' + ab.toLowerCase() + '/roster').then(function (j) {
        var team = (j.team && j.team.abbreviation) || ab, out = [];
        (j.athletes || []).forEach(function (a) {
          if (Array.isArray(a.items)) a.items.forEach(function (x) { out.push(x); });   /* NFL: grouped by unit */
          else out.push(a);
        });
        return out.map(function (x) { return { id: String(x.id), name: x.fullName || x.displayName || '', team: team }; });
      }, function () { return []; });
    })).then(function (lists) { return [].concat.apply([], lists); });
  }
  function matchOne(p, espn) {
    var key = norm(p.name);
    var c = espn.filter(function (e) { return norm(e.name) === key; });
    if (c.length > 1) {
      var same = c.filter(function (e) { return e.team === p.team_abbr; });
      if (same.length) c = same;
    }
    if (!c.length) {
      /* same last name and first initial, on his team ("Nic" / "Nicolas") */
      var parts = key.split(' '), last = parts[parts.length - 1];
      c = espn.filter(function (e) {
        var q = norm(e.name).split(' ');
        return e.team === p.team_abbr && q[q.length - 1] === last && q[0].charAt(0) === parts[0].charAt(0);
      });
    }
    return c.length === 1 ? c[0].id : '';
  }
  function searchOne(p, league) {
    return getJSON(SEARCH + encodeURIComponent(p.name)).then(function (j) {
      var key = norm(p.name);
      var hits = (j.items || []).filter(function (i) { return i.league === league && norm(i.displayName) === key; });
      return hits.length === 1 ? String(hits[0].id) : '';
    }, function () { return ''; });
  }

  /* looks up every player in the list who has no id yet; fills p.espn in place */
  function findMissing(league, players, progress) {
    var todo = players.filter(needsPhoto);
    var found = [], missing = [];
    if (!todo.length) return Promise.resolve({ found: found, missing: missing });
    progress('Reading every ' + league.toUpperCase() + ' roster on ESPN…');
    return espnRosters(league).then(function (espn) {
      if (!espn.length) throw new Error('Could not reach ESPN. Check the connection and try again.');
      var left = [];
      todo.forEach(function (p) {
        var id = matchOne(p, espn);
        if (id) { p.espn = id; found.push(p.name); } else left.push(p);
      });
      return left.reduce(function (chain, p) {
        return chain.then(function () {
          progress('Searching ESPN for ' + p.name + '…');
          return searchOne(p, league).then(function (id) {
            if (id) { p.espn = id; found.push(p.name); } else missing.push(p.name);
          });
        });
      }, Promise.resolve());
    }).then(function () { return { found: found, missing: missing }; });
  }

  /* The box itself. opts: host (element), league ('nba' / 'nfl'),
     players () -> every player object in the tool, changed () -> save + redraw */
  function mount(opts) {
    if (!opts.host) return;
    opts.host.innerHTML =
      '<div class="editor-panel photos-panel">' +
        '<h3>Player photos</h3>' +
        '<p class="section-note photos-count" style="margin:0 0 12px"></p>' +
        '<button type="button" class="btn btn-small photos-go">Find missing photos</button>' +
        '<p class="section-note photos-msg" style="margin:12px 0 0" role="status" aria-live="polite"></p>' +
      '</div>';
    var count = opts.host.querySelector('.photos-count');
    var go = opts.host.querySelector('.photos-go');
    var msg = opts.host.querySelector('.photos-msg');
    var busy = false;
    function recount() {
      if (busy) return;
      var all = opts.players().filter(function (p) { return p && !/D\/ST/i.test(p.pos || ''); });
      var without = all.filter(needsPhoto);
      count.innerHTML = '<b>' + (all.length - without.length) + ' of ' + all.length + '</b> players have an ESPN photo' +
        (opts.league === 'nfl' ? ' (defenses show their team logo)' : '') + '.' +
        (without.length ? ' Missing: ' + esc(without.slice(0, 8).map(function (p) { return p.name; }).join(', ')) +
          (without.length > 8 ? ' and ' + (without.length - 8) + ' more' : '') + '.' : '');
      go.disabled = !without.length;
    }
    go.addEventListener('click', function () {
      busy = true;
      go.disabled = true;
      findMissing(opts.league, opts.players(), function (t) { msg.textContent = t; }).then(function (r) {
        busy = false;
        if (r.found.length) opts.changed();
        msg.textContent = (r.found.length ? 'Found ' + r.found.length + ': ' + r.found.join(', ') + '.' : 'Nothing new found.') +
          (r.missing.length ? ' Not on ESPN under that name: ' + r.missing.join(', ') + ' (check the spelling).' : '') +
          (r.found.length ? ' Publish to put the photos on the site.' : '');
        recount();
      }, function (err) {
        busy = false;
        msg.textContent = err.message;
        recount();
      });
    });
    /* moves, new free agents, discards: count again right after any edit */
    ['click', 'change'].forEach(function (ev) {
      document.addEventListener(ev, function (e) {
        if (opts.host.contains(e.target)) return;
        clearTimeout(mount.t);
        mount.t = setTimeout(recount, 150);
      }, true);
    });
    recount();
  }

  window.LPBSA_ESPN = { mount: mount, findMissing: findMissing, norm: norm };
})();
