/* Site behaviour: menu, news wire, news cards, articles, free agents.
   Every block checks that its element exists first, so deleting a chunk
   of HTML can never take the rest of the page down with it. */
(function () {
  'use strict';

  var LS_WATCH = 'lpbsa.watch.v1';

  /* Where a story links to. The single-file build overrides this. */
  var NEWS_BASE = window.LPBSA_NEWS_BASE || 'news.html#';
  var NEWS_INDEX = window.LPBSA_NEWS_INDEX || 'news.html';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function slug(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  function stories() {
    var list = window.LEAGUE_NEWS || [];
    return list.map(function (n, i) {
      var copy = {};
      for (var k in n) { if (Object.prototype.hasOwnProperty.call(n, k)) copy[k] = n[k]; }
      copy.id = copy.id || slug(copy.headline) || ('story-' + (i + 1));
      copy.body = Array.isArray(copy.body) ? copy.body : (copy.body ? [copy.body] : []);
      copy.summary = copy.summary || copy.body[0] || '';
      return copy;
    });
  }
  function findStory(id) {
    var all = stories();
    for (var i = 0; i < all.length; i++) { if (all[i].id === id) return all[i]; }
    return null;
  }

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- scrolling wire ---------- */
  var track = document.getElementById('tickerTrack');
  if (track) {
    var items = (window.LEAGUE_TICKER || []).slice();
    if (!items.length) items = stories().map(function (n) { return n.headline; });
    if (!items.length) items = ['La Premier Bundesliga Serie A'];
    var strip = items.map(function (t) {
      return '<span class="ticker-item">' + esc(t) + '</span>';
    }).join('');
    track.innerHTML = strip + strip; /* doubled so the loop is seamless */
  }

  /* ---------- news cards (home page) ---------- */
  function cardHTML(n) {
    return '<a class="news-card" href="' + NEWS_BASE + encodeURIComponent(n.id) + '">' +
      '<div class="news-date">' + esc(n.date) + '</div>' +
      '<h3>' + esc(n.headline) + '</h3>' +
      '<p>' + esc(n.summary) + '</p>' +
      '<span class="news-more">Read the story &rarr;</span>' +
      '</a>';
  }

  var grid = document.getElementById('newsGrid');
  if (grid) {
    var limit = parseInt(grid.getAttribute('data-limit'), 10);
    var list = stories();
    if (limit > 0) list = list.slice(0, limit);
    grid.innerHTML = list.length
      ? list.map(cardHTML).join('')
      : '<p class="section-note">No stories posted yet. Add one in assets/news.js.</p>';
  }

  /* ---------- news page: index + single article ---------- */
  function articleHTML(n) {
    var paras = n.body.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
    var pic = n.video
  ? '<figure class="article-figure"><video controls playsinline preload="metadata">' +
    '<source src="' + esc(n.video) + '" type="video/mp4">' +
    'Your browser does not support video playback.' +
    '</video>' +
    (n.caption ? '<figcaption>' + esc(n.caption) + '</figcaption>' : '') +
    '</figure>'
  : n.image
    ? '<figure class="article-figure"><img src="' + esc(n.image) + '" alt="' +
      esc(n.headline) + '" onerror="this.closest(\'figure\').remove()">' +
      (n.caption ? '<figcaption>' + esc(n.caption) + '</figcaption>' : '') +
      '</figure>'
    : '';
    var others = stories().filter(function (s) { return s.id !== n.id; }).slice(0, 3);
    var more = others.length
      ? '<div class="section-head" style="margin-top:46px"><h2>More stories</h2></div>' +
        '<div class="news-grid">' + others.map(cardHTML).join('') + '</div>'
      : '';
    return '<a class="back-link" href="' + NEWS_INDEX + '">&larr; All news</a>' +
      '<article class="article">' +
      '<div class="news-date">' + esc(n.date) + '</div>' +
      '<h1>' + esc(n.headline) + '</h1>' +
      '<p class="article-lede">' + esc(n.summary) + '</p>' +
      pic + paras +
      '</article>' + more;
  }

  function indexHTML() {
    var all = stories();
    if (!all.length) {
      return '<p class="section-note">No stories posted yet. Add one in assets/news.js.</p>';
    }
    return '<div class="news-grid">' + all.map(cardHTML).join('') + '</div>';
  }

  var newsPage = document.getElementById('newsPage');
  window.LPBSA_renderNews = function (id) {
    if (!newsPage) return;
    var story = id ? findStory(id) : null;
    if (id && !story) {
      newsPage.innerHTML = '<a class="back-link" href="' + NEWS_INDEX + '">&larr; All news</a>' +
        '<p class="section-note">That story is no longer here.</p>';
      return;
    }
    newsPage.innerHTML = story ? articleHTML(story) : indexHTML();
  };

  if (newsPage && !window.LPBSA_SINGLE) {
    var fromHash = function () {
      var id = decodeURIComponent(location.hash.replace(/^#/, ''));
      window.LPBSA_renderNews(id);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  /* ---------- commissioner pane + anthem ---------- */
  var pane = document.getElementById('commishPane');
  var audio = document.getElementById('commishAudio');
  var soundBtn = document.getElementById('soundToggle');
  var soundLabel = document.getElementById('soundLabel');

  function markSound(playing) {
    if (!soundBtn) return;
    soundBtn.classList.toggle('playing', playing);
    soundBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    if (soundLabel) soundLabel.textContent = playing ? 'Anthem playing' : 'Play anthem';
  }
  function anthemAllowed() {
    if (!audio) return false;
    /* In the single-file build every page lives in the same document, so
       only play while the commissioner's page is the one on screen. */
    var host = audio.closest('[data-route]');
    return !host || !host.classList.contains('hidden');
  }
  function playAnthem() {
    if (!audio || !anthemAllowed()) return;
    var attempt = audio.play();
    if (attempt && attempt.then) {
      attempt.then(function () { markSound(true); }, function () { markSound(false); });
    } else {
      markSound(true);
    }
  }
  function stopAnthem() {
    if (!audio) return;
    audio.pause();
    markSound(false);
  }

  if (audio) {
    /* Try straight away. Browsers usually refuse until the visitor has
       clicked something, so also start on the first click anywhere. */
    playAnthem();
    var kick = function () { if (audio.paused) playAnthem(); };
    document.addEventListener('click', kick);
    document.addEventListener('keydown', kick);
    audio.addEventListener('play', function () {
      markSound(true);
      document.removeEventListener('click', kick);
      document.removeEventListener('keydown', kick);
    });
    audio.addEventListener('pause', function () { markSound(false); });
  }

  /* The single-file build calls this when the visitor changes page. */
  window.LPBSA_syncAnthem = function () {
    if (!audio) return;
    if (!anthemAllowed()) { stopAnthem(); return; }
    if (audio.paused) playAnthem();
  };
  if (soundBtn && audio && audio.closest('[data-route]')) {
    soundBtn.classList.add('hidden');
  }
  if (soundBtn) {
    soundBtn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      if (audio && audio.paused) { playAnthem(); } else { stopAnthem(); }
    });
  }

  if (pane) {
    var lastFocus = null;
    var openPane = function () {
      pane.classList.remove('hidden');
      document.body.classList.add('pane-open');
      lastFocus = document.activeElement;
      var close = pane.querySelector('.commish-close');
      if (close) close.focus();
      if (audio && audio.paused) playAnthem();
    };
    var closePane = function () {
      pane.classList.add('hidden');
      document.body.classList.remove('pane-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    document.addEventListener('click', function (ev) {
      if (ev.target.closest('[data-commish-open], .commish-crest')) {
        ev.preventDefault();
        openPane();
        return;
      }
      if (ev.target.closest('[data-commish-close]')) {
        ev.preventDefault();
        closePane();
      }
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !pane.classList.contains('hidden')) closePane();
    });
  }

  /* ---------- render rosters from window.LEAGUE_ROSTERS ---------- */
  /* Every team's roster tables live in the DOM already, empty, waiting for
     this. If a page has no roster containers (news, free agents) this is a
     harmless no-op. */
  function fmtNum(v) {
    if (v === null || v === undefined || v === '') return '--';
    return (typeof v === 'number') ? (Math.round(v * 10) / 10).toString() : String(v);
  }
  function playerCellHTML(p, slotLabel) {
    var status = p.status ? '<span class="player-status">' + esc(p.status) + '</span>' : '';
    return '<td><span class="slot-badge">' + esc(slotLabel) + '</span></td>' +
      '<td><span class="player-cell"><span class="player-avatar">' + esc(p.pos || '?') + '</span>' +
      '<span><span class="player-name">' + esc(p.name) + '</span>' + status +
      '<span class="nfl-tag">' + esc(p.team_abbr) + ' ' + esc(p.pos) + '</span></span></span></td>' +
      '<td class="num">' + fmtNum(p.fpts) + '</td><td class="num">' + fmtNum(p.avg) + '</td><td class="num">' + fmtNum(p.last) + '</td>';
  }
  function renderAllRosters() {
    var rosters = window.LEAGUE_ROSTERS, slots = window.STARTER_SLOTS;
    if (!rosters) return;
    Object.keys(rosters).forEach(function (slug) {
      var team = rosters[slug];
      [['starters', team.starters, slots], ['bench', team.bench, null], ['ir', team.ir, null]]
        .forEach(function (entry) {
          var section = entry[0], players = entry[1] || [], slotList = entry[2];
          var body = document.getElementById('body-' + section + '-' + slug);
          var totalEl = document.getElementById('total-' + section + '-' + slug);
          if (!body) return;
          var rowsHtml = [];
          var total = 0;
          var any = false;
          players.forEach(function (p, i) {
            if (!p) return;
            any = true;
            var label = slotList ? slotList[i] : (section === 'bench' ? 'Bench' : 'IR');
            rowsHtml.push('<tr>' + playerCellHTML(p, label) + '</tr>');
            if (typeof p.fpts === 'number') total += p.fpts;
          });
          body.innerHTML = any ? rowsHtml.join('') :
            '<tr><td colspan="5" class="section-note">No players here right now.</td></tr>';
          if (totalEl) totalEl.textContent = fmtNum(Math.round(total * 10) / 10);
        });
      var badge = document.getElementById('starters-projected-' + slug);
      if (badge) {
        var startTotal = (team.starters || []).reduce(function (sum, p) {
          return sum + (p && typeof p.fpts === 'number' ? p.fpts : 0);
        }, 0);
        badge.textContent = fmtNum(Math.round(startTotal * 10) / 10);
      }
    });
  }
  renderAllRosters();

  function renderFreeAgentRows() {
    var body = document.getElementById('faBody');
    if (!body || !window.FREE_AGENTS) return;
    var html = window.FREE_AGENTS.map(function (a, i) {
      var status = a.status ? '<span class="player-status">' + esc(a.status) + '</span>' : '';
      var fpts = typeof a.fpts === 'number' ? a.fpts : 0;
      var avg = typeof a.avg === 'number' ? a.avg : 0;
      var last = typeof a.last === 'number' ? a.last : 0;
      var key = slug(a.name) + '-' + slug(a.pos || '');
      return '<tr class="fa-row" data-pos="' + esc(a.pos) + '" data-name="' + esc((a.name || '').toLowerCase()) +
        '" data-team="' + esc((a.team_abbr || '').toLowerCase()) + '" data-fpts="' + fpts + '" data-avg="' + avg +
        '" data-last="' + last + '" data-rank="' + (i + 1) + '">' +
        '<td class="num" style="color:var(--mute)">' + (i + 1) + '</td>' +
        '<td><span class="player-cell"><span class="player-avatar">' + esc(a.pos) + '</span>' +
        '<span><span class="player-name">' + esc(a.name) + '</span>' + status +
        '<span class="nfl-tag">' + esc(a.team_abbr) + ' ' + esc(a.pos) + '</span></span></span></td>' +
        '<td><span class="avail-pill">Available</span></td>' +
        '<td class="num">' + fmtNum(a.fpts) + '</td><td class="num">' + fmtNum(a.avg) + '</td><td class="num">' + fmtNum(a.last) + '</td>' +
        '<td><button class="star-btn" data-watch="' + key + '" aria-label="Add ' + esc(a.name) + ' to watchlist">&#9733;</button></td></tr>';
    }).join('');
    body.innerHTML = html || '<tr><td colspan="7" class="section-note">No free agents listed.</td></tr>';
  }

  /* ---------- free agents ---------- */
  var faBody = document.getElementById('faBody');
  if (faBody) {
    renderFreeAgentRows();
    var search = document.getElementById('faSearch');
    var sort = document.getElementById('faSort');
    var chips = document.getElementById('faChips');
    var count = document.getElementById('faCount');
    var rows = Array.prototype.slice.call(faBody.querySelectorAll('.fa-row'));
    var watch = {};
    try { watch = JSON.parse(localStorage.getItem(LS_WATCH)) || {}; } catch (err) { watch = {}; }
    var pos = 'ALL';

    var saveWatch = function () {
      try { localStorage.setItem(LS_WATCH, JSON.stringify(watch)); } catch (err) { /* private mode */ }
    };
    var paintStars = function () {
      Array.prototype.forEach.call(faBody.querySelectorAll('[data-watch]'), function (b) {
        b.classList.toggle('on', !!watch[b.getAttribute('data-watch')]);
      });
    };
    var apply = function () {
      var q = (search.value || '').trim().toLowerCase();
      var shown = 0;
      rows.forEach(function (row) {
        var key = row.querySelector('[data-watch]').getAttribute('data-watch');
        var matchPos =
          pos === 'ALL' ? true :
          pos === 'WATCH' ? !!watch[key] :
          row.getAttribute('data-pos') === pos;
        var matchQ = !q ||
          row.getAttribute('data-name').indexOf(q) !== -1 ||
          row.getAttribute('data-team').indexOf(q) !== -1 ||
          row.getAttribute('data-pos').toLowerCase().indexOf(q) !== -1;
        var show = matchPos && matchQ;
        row.classList.toggle('hidden', !show);
        if (show) shown++;
      });
      count.textContent = shown + (shown === 1 ? ' free agent' : ' free agents') +
        (pos === 'WATCH' ? ' on your watchlist' : '') + '.';
    };
    var resort = function () {
      var key = sort.value;
      rows.slice().sort(function (a, b) {
        if (key === 'name') return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
        if (key === 'rank') return Number(a.getAttribute('data-rank')) - Number(b.getAttribute('data-rank'));
        return Number(b.getAttribute('data-' + key)) - Number(a.getAttribute('data-' + key));
      }).forEach(function (r) { faBody.appendChild(r); });
    };

    if (search) search.addEventListener('input', apply);
    if (sort) sort.addEventListener('change', function () { resort(); apply(); });
    if (chips) {
      chips.addEventListener('click', function (ev) {
        var chip = ev.target.closest('.chip');
        if (!chip) return;
        Array.prototype.forEach.call(chips.querySelectorAll('.chip'), function (c) {
          c.classList.remove('active');
        });
        chip.classList.add('active');
        pos = chip.getAttribute('data-pos');
        apply();
      });
    }
    faBody.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-watch]');
      if (!btn) return;
      var key = btn.getAttribute('data-watch');
      if (watch[key]) { delete watch[key]; } else { watch[key] = true; }
      saveWatch();
      paintStars();
      if (pos === 'WATCH') apply();
    });

    paintStars();
    apply();
  }
})();
