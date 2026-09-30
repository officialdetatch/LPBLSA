/* ============================================================
   TEAM CARDS  --  draws team cards in two places:
     1. #teamsGrid  on a league's landing page: that league's teams as a
        grid, in standings order when there is a table (rank badge on each)
     2. #teamsPage  on the Teams page: one carousel per league

   A team with no crest image shows its initials on the round badge, so a
   league with no logos yet still looks finished. Every league and where
   its files live comes from assets/leagues.js.
   ============================================================ */
(function () {
  'use strict';

  var LEAGUES = window.LPBSA_LEAGUES || [];
  var root = document.body.getAttribute('data-root') || '';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function initialsOf(t) {
    return t.initials || String(t.name || t.slug || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
  }
  function crestURL(t, L) {
    if (!t.crest) return '';
    return /^(https?:)?\/\//i.test(t.crest) || t.crest.charAt(0) === '/' ? t.crest : root + L.assetRoot + t.crest;
  }

  function cardHTML(t, L, rank) {
    var img = crestURL(t, L);
    var crest = '<span class="crest' + (t.shape === 'circle' ? ' crest-circle' : '') + '">' +
      (img ? '<img src="' + esc(img) + '" alt="' + esc(t.name) + ' crest" onerror="this.remove()">' : '') +
      '<span class="crest-fallback">' + esc(initialsOf(t)) + '</span></span>';
    var inner = (rank ? '<span class="team-card-rank">' + rank + '</span>' : '') + crest +
      '<span class="team-card-name">' + esc(t.name) + '</span>' +
      '<span class="team-card-meta">' + esc(L.short) + (rank ? ' &middot; #' + rank : '') + '</span>';
    if (L.teamPages) {
      return '<a class="team-card" href="' + esc(root + L.teamPages + t.slug + '.html') + '">' + inner +
        '<span class="team-card-go">Ver equipo &rarr;</span></a>';
    }
    return '<div class="team-card">' + inner + '</div>';
  }

  /* Teams in standings order when there is a table; anyone missing from it goes last. */
  function inRankOrder(teams) {
    var rows = window.LEAGUE_STANDINGS || [];
    var bySlug = {}, out = [], used = {};
    teams.forEach(function (t) { bySlug[t.slug] = t; });
    rows.forEach(function (r) { if (bySlug[r.team] && !used[r.team]) { out.push(bySlug[r.team]); used[r.team] = true; } });
    var ranked = out.length;
    teams.forEach(function (t) { if (!used[t.slug]) out.push(t); });
    return { list: out, ranked: ranked };
  }

  /* ---------- 1. a league landing page ---------- */
  var grid = document.getElementById('teamsGrid');
  if (grid) {
    var L = window.LPBSA_findLeague(document.body.getAttribute('data-league'));
    if (L) {
      var teams = window.LPBSA_teamsOf(L.key);
      if (!teams.length) {
        grid.innerHTML = '<div class="team-soon"><b>Equipos por confirmar</b>' +
          esc(grid.getAttribute('data-empty') || 'Los equipos se publican pronto.') + '</div>';
      } else {
        var ordered = inRankOrder(teams);
        grid.className = 'team-grid';
        grid.innerHTML = ordered.list.map(function (t, i) {
          return cardHTML(t, L, i < ordered.ranked ? i + 1 : 0);
        }).join('');
      }
    }
  }

  /* ---------- 2. the Teams page ---------- */
  var page = document.getElementById('teamsPage');
  if (page) {
    page.innerHTML = LEAGUES.map(function (L) {
      var teams = L.status === 'live' ? window.LPBSA_teamsOf(L.key) : [];
      var body;
      if (teams.length) {
        body = '<div class="carousel-track" tabindex="0" aria-label="Equipos ' + esc(L.short) + '">' +
          teams.map(function (t) { return cardHTML(t, L, 0); }).join('') + '</div>';
      } else {
        var msg = L.status === 'live' ? 'Los equipos se anuncian pronto.' : (L.soonText || 'Proximamente.');
        body = '<div class="carousel-track"><div class="team-soon"><b>' + esc(L.short) + ' &middot; ' +
          (L.status === 'live' ? 'Equipos por confirmar' : 'Proximamente') + '</b>' + esc(msg) + '</div></div>';
      }
      return '<section class="team-league" id="teams-' + esc(L.key) + '" data-league="' + esc(L.key) + '">' +
        '<div class="section-head"><h2><span class="news-sport">' + esc(L.short) + '</span>' + esc(L.name) + '</h2>' +
        '<div class="carousel-ctl" hidden>' +
          '<button type="button" class="carousel-btn" data-dir="-1" aria-label="Anterior">&lsaquo;</button>' +
          '<button type="button" class="carousel-btn" data-dir="1" aria-label="Siguiente">&rsaquo;</button>' +
        '</div></div>' + body + '</section>';
    }).join('');

    /* arrows appear only when the row is wider than the screen */
    Array.prototype.forEach.call(page.querySelectorAll('.team-league'), function (sec) {
      var track = sec.querySelector('.carousel-track');
      var ctl = sec.querySelector('.carousel-ctl');
      var prev = ctl.querySelector('[data-dir="-1"]');
      var next = ctl.querySelector('[data-dir="1"]');
      function sync() {
        var max = track.scrollWidth - track.clientWidth;
        ctl.hidden = max <= 2;
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= max - 2;
      }
      ctl.addEventListener('click', function (e) {
        var b = e.target.closest('.carousel-btn');
        if (b) track.scrollBy({ left: Number(b.getAttribute('data-dir')) * track.clientWidth * 0.8, behavior: 'smooth' });
      });
      track.addEventListener('scroll', sync, { passive: true });
      window.addEventListener('resize', sync);
      sync();
    });
  }
})();
