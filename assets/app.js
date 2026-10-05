/* Site behaviour: menu, news wire, news cards, articles, free agents.
   Every block checks that its element exists first, so deleting a chunk
   of HTML can never take the rest of the page down with it. */
(function () {
  'use strict';

  var LS_WATCH = 'lpbsa.watch.v1';

  /* On a league's own pages (<body data-league="nba" data-root="../../">) this
     sets the paths and options below; it does nothing on the older pages. */
  if (window.LPBSA_applyLeague) window.LPBSA_applyLeague();

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

  /* Which fantasy a story belongs to. A story with no "league" is football,
     so every story written before the basketball expansion still works. */
  var SPORTS = {
    football:   { label: 'NFL', full: 'NFL Fantasy' },
    basketball: { label: 'NBA', full: 'NBA Fantasy' },
    soccer:     { label: 'UCL', full: 'UCL Fantasy' }
  };
  var SPORT_ORDER = ['football', 'basketball', 'soccer'];
  /* the league list in assets/leagues.js, when loaded, is the source of the names */
  (window.LPBSA_LEAGUES || []).forEach(function (L) {
    if (SPORTS[L.story]) SPORTS[L.story] = { label: L.short, full: L.name };
  });

  /* Turn any http(s)/www link typed in plain text into a real clickable
     link. Runs on already-escaped text, so it is safe against markup. */
  function linkify(rawText) {
    var text = esc(rawText);
    return text.replace(/(https?:\/\/[^\s<]+|www\.[^\s<]+)/gi, function (match) {
      var trail = '';
      var m = match.match(/^(.*?)([.,!?;:)\]]+)$/);
      if (m) { match = m[1]; trail = m[2]; }
      var href = /^https?:\/\//i.test(match) ? match : 'https://' + match;
      return '<a href="' + href + '" target="_blank" rel="noopener noreferrer">' + match + '</a>' + trail;
    });
  }

  /* Shared renderer for the "content blocks" model used by the About page
     and by news articles: an ordered list of paragraphs, subtitles,
     images and videos. */
  function renderBlocks(blocks) {
    return (blocks || []).map(function (b) {
      if (b.type === 'image' && b.src) {
        return '<figure class="article-figure"><img src="' + esc(b.src) + '" alt="' + esc(b.caption || '') +
          '" onerror="this.closest(\'figure\').remove()">' +
          (b.caption ? '<figcaption>' + esc(b.caption) + '</figcaption>' : '') + '</figure>';
      }
      if (b.type === 'video' && b.src) {
        return '<figure class="article-figure"><video controls playsinline preload="metadata">' +
          '<source src="' + esc(b.src) + '" type="video/mp4">Your browser does not support video playback.</video>' +
          (b.caption ? '<figcaption>' + esc(b.caption) + '</figcaption>' : '') + '</figure>';
      }
      if (b.type === 'h') {
        return '<h2 class="article-subhead">' + esc(b.text || '') + '</h2>';
      }
      return '<p>' + linkify(b.text || '') + '</p>';
    }).join('');
  }
  function stories() {
    var list = window.LEAGUE_NEWS || [];
    return list.map(function (n, i) {
      var copy = {};
      for (var k in n) { if (Object.prototype.hasOwnProperty.call(n, k)) copy[k] = n[k]; }
      copy.id = copy.id || slug(copy.headline) || ('story-' + (i + 1));
      copy.league = SPORTS[copy.league] ? copy.league : 'football';
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
  function storiesFor(league) {
    return stories().filter(function (s) { return s.league === league; });
  }
  function sportBadge(n) {
    return '<span class="news-sport">' + esc(SPORTS[n.league].label) + '</span>';
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
    /* A page can pin its wire to one fantasy with data-league="basketball".
       It then shows that fantasy's headlines instead of the hand-written
       LEAGUE_TICKER lines; data-fallback is the text shown when it has none. */
    var tickerLeague = track.getAttribute('data-league');
    var items = tickerLeague ? [] : (window.LEAGUE_TICKER || []).slice();
    if (!items.length) {
      items = (tickerLeague ? storiesFor(tickerLeague) : stories()).map(function (n) { return n.headline; });
    }
    if (!items.length) items = [track.getAttribute('data-fallback') || 'La Premier Bundesliga Serie A'];
    var strip = items.map(function (t) {
      return '<span class="ticker-item">' + esc(t) + '</span>';
    }).join('');
    track.innerHTML = strip + strip; /* doubled so the loop is seamless */
  }

  /* ---------- news cards (home page) ---------- */
  function cardHTML(n, withBadge) {
    return '<a class="news-card" href="' + NEWS_BASE + encodeURIComponent(n.id) + '">' +
      '<div class="news-date">' + (withBadge === true ? sportBadge(n) : '') + esc(n.date) + '</div>' +
      '<h3>' + esc(n.headline) + '</h3>' +
      '<p>' + esc(n.summary) + '</p>' +
      '<span class="news-more">Read the story &rarr;</span>' +
      '</a>';
  }

  var grid = document.getElementById('newsGrid');
  if (grid) {
    var limit = parseInt(grid.getAttribute('data-limit'), 10);
    var gridLeague = grid.getAttribute('data-league');
    var list = gridLeague ? storiesFor(gridLeague) : stories();
    if (limit > 0) list = list.slice(0, limit);
    var gridBadges = grid.getAttribute('data-badges') === '1';
    grid.innerHTML = list.length
      ? list.map(function (n) { return cardHTML(n, gridBadges); }).join('')
      : '<p class="section-note">' + esc(grid.getAttribute('data-empty') || 'No stories posted yet. Add one in assets/news.js.') + '</p>';
  }

  /* ---------- standings table (home page) ---------- */
  function medalClass(rank) {
    return rank === 1 ? 'g' : rank === 2 ? 's' : rank === 3 ? 'b' : 'n';
  }
  function standingsRowClass(rank) {
    return rank <= 3 ? 'rank-' + rank : 'rank-n';
  }
  function streakClass(s) {
    var c = String(s || '').trim().charAt(0).toUpperCase();
    return c === 'W' ? 'streak-w' : c === 'L' ? 'streak-l' : '';
  }
  function findTeam(teamSlug, list) {
    var teams = list || window.LEAGUE_TEAMS || [];
    for (var i = 0; i < teams.length; i++) { if (teams[i].slug === teamSlug) return teams[i]; }
    return null;
  }
  /* ctx is optional: the home page draws several leagues' tables, so it hands in
     each league's own teams and options. Without it the page-wide settings below apply. */
  function standingsRowHTML(row, i, ctx) {
    ctx = ctx || {};
    var rank = i + 1;
    var t = findTeam(row.team, ctx.teams) || { slug: row.team, name: row.name || row.team };
    /* Other fantasies can tune the table before this script runs:
         LPBSA_TEAM_LINKS = false   team pages do not exist yet (no links)
         LPBSA_TEAM_BASE            folder of the team pages (default leagues/nfl/teams/)
         LPBSA_NO_TIES = true       hide the T column (basketball has no ties) */
    var linked = ctx.linked !== undefined ? ctx.linked : window.LPBSA_TEAM_LINKS !== false;
    var teamBase = ctx.teamBase != null ? ctx.teamBase : (window.LPBSA_TEAM_BASE || 'leagues/nfl/teams/');
    var assetBase = ctx.assetBase != null ? ctx.assetBase : (window.LPBSA_ASSET_BASE || '');
    var noTies = ctx.noTies !== undefined ? ctx.noTies : !!window.LPBSA_NO_TIES;
    var initials = t.initials || String(t.name || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
    var crestPath = t.crest && !/^(https?:)?\/\//i.test(t.crest) && t.crest.charAt(0) !== '/'
      ? assetBase + t.crest : t.crest;
    var crestImg = t.crest ? '<img src="' + esc(crestPath) + '" alt="' + esc(t.name) + ' crest" onerror="this.remove()">' : '';
    var streakText = row.streak ? '<span class="' + streakClass(row.streak) + '">' + esc(row.streak) + '</span>' : '--';
    return '<tr class="' + standingsRowClass(rank) + '">' +
      '<td><div class="rk-cell"><span class="medal ' + medalClass(rank) + '">' + rank + '</span></div></td>' +
      '<td>' + (linked ? '<a class="team-link" href="' + esc(teamBase) + esc(t.slug) + '.html">' : '<span class="team-link">') +
      '<span class="crest' + (t.shape === 'circle' ? ' crest-circle' : '') + '">' + crestImg + '<span class="crest-fallback">' + esc(initials) + '</span></span>' +
      '<span class="name">' + esc(t.name) + '</span>' + (linked ? '</a>' : '</span>') + '</td>' +
      '<td class="num">' + esc(row.w) + '</td>' +
      '<td class="num">' + esc(row.l) + '</td>' +
      (noTies ? '' : '<td class="num">' + esc(row.t) + '</td>') +
      '<td class="num">' + esc(row.pct) + '</td>' +
      '<td class="num">' + esc(row.gb) + '</td>' +
      '<td class="num">' + esc(row.pf) + '</td>' +
      '<td class="num">' + esc(row.pa) + '</td>' +
      '<td class="num">' + streakText + '</td>' +
      '<td class="num">' + esc(row.playoff) + '</td>' +
      '</tr>';
  }
  /* the same rows, for pages that show more than one league's table (see standings-tabs.js) */
  window.LPBSA_standingsRowsHTML = function (rows, ctx) {
    return (rows || []).map(function (r, i) { return standingsRowHTML(r, i, ctx); }).join('');
  };
  var standingsBody = document.getElementById('standingsBody');
  if (standingsBody) {
    var standingsRows = window.LEAGUE_STANDINGS || [];
    standingsBody.innerHTML = standingsRows.length
      ? standingsRows.map(function (r, i) { return standingsRowHTML(r, i); }).join('')
      : '<tr><td colspan="' + (window.LPBSA_NO_TIES ? 10 : 11) + '" class="section-note">' +
        esc(standingsBody.getAttribute('data-empty') || 'No standings posted yet. Add them with the standings manager.') + '</td></tr>';
  }

  /* ---------- about page ---------- */
  var aboutBody = document.getElementById('aboutBody');
  if (aboutBody) {
    var about = window.LEAGUE_ABOUT || {};
    var aboutTitleEl = document.getElementById('aboutTitle');
    var aboutLedeEl = document.getElementById('aboutLede');
    if (aboutTitleEl && about.title) aboutTitleEl.textContent = about.title;
    if (aboutLedeEl) aboutLedeEl.textContent = about.lede || '';
    var aboutBlocks = about.blocks || [];
    aboutBody.innerHTML = aboutBlocks.length ? renderBlocks(aboutBlocks) :
      '<p class="section-note">Nothing here yet &mdash; add some in about-manager.html.</p>';
  }

  /* ---------- custom select dropdowns (contact page and anywhere else) ---------- */
  var customSelects = document.querySelectorAll('.custom-select');
  for (var csi = 0; csi < customSelects.length; csi++) {
    (function (wrap) {
      var btn = wrap.querySelector('.custom-select-btn');
      var valueEl = wrap.querySelector('.custom-select-value');
      var list = wrap.querySelector('.custom-select-list');
      var hiddenField = wrap.querySelector('input[type="hidden"]');
      var options = Array.prototype.slice.call(list.querySelectorAll('li'));
      var activeIndex = 0;
      for (var oi = 0; oi < options.length; oi++) {
        if (options[oi].getAttribute('aria-selected') === 'true') { activeIndex = oi; break; }
      }

      function highlight(i) {
        for (var j = 0; j < options.length; j++) { options[j].classList.toggle('active', j === i); }
      }
      function close() {
        wrap.classList.remove('open');
        list.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
      }
      function open() {
        wrap.classList.add('open');
        list.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
        highlight(activeIndex);
        list.focus();
      }
      function choose(i) {
        activeIndex = i;
        for (var j = 0; j < options.length; j++) { options[j].setAttribute('aria-selected', j === i ? 'true' : 'false'); }
        valueEl.textContent = options[i].textContent;
        if (hiddenField) hiddenField.value = options[i].getAttribute('data-value') || options[i].textContent;
        close();
        btn.focus();
      }

      btn.addEventListener('click', function () {
        if (wrap.classList.contains('open')) { close(); } else { open(); }
      });
      btn.addEventListener('keydown', function (ev) {
        if (ev.key === 'ArrowDown' || ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          open();
        }
      });
      list.addEventListener('keydown', function (ev) {
        if (ev.key === 'ArrowDown') { ev.preventDefault(); activeIndex = Math.min(activeIndex + 1, options.length - 1); highlight(activeIndex); }
        else if (ev.key === 'ArrowUp') { ev.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); highlight(activeIndex); }
        else if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); choose(activeIndex); }
        else if (ev.key === 'Escape') { close(); btn.focus(); }
        else if (ev.key === 'Tab') { close(); }
      });
      for (var oi2 = 0; oi2 < options.length; oi2++) {
        (function (idx) {
          options[idx].addEventListener('click', function () { choose(idx); });
          options[idx].addEventListener('mouseenter', function () { activeIndex = idx; highlight(idx); });
        })(oi2);
      }
      document.addEventListener('click', function (ev) {
        if (!wrap.contains(ev.target)) close();
      });
    })(customSelects[csi]);
  }

  /* ---------- contact form ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var cfStatus = document.getElementById('cfStatus');
    var cfSubmit = document.getElementById('cfSubmit');
    contactForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (/YOUR_FORM_ID/.test(contactForm.action)) {
        cfStatus.textContent = 'This form is not connected to an inbox yet - please email info@lpblsa.vip directly for now.';
        return;
      }
      cfSubmit.disabled = true;
      cfStatus.textContent = 'Sending...';
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          cfStatus.textContent = 'Thanks - your message is on its way. We will get back to you soon.';
          contactForm.reset();
        } else {
          cfStatus.textContent = 'Something went wrong sending that. Please try again or email info@lpblsa.vip.';
        }
      }).catch(function () {
        cfStatus.textContent = 'Something went wrong sending that. Please try again or email info@lpblsa.vip.';
      }).then(function () { cfSubmit.disabled = false; });
    });
  }

  /* ---------- news page: index + single article ---------- */
  function articleHTML(n) {
    var content;
    if (Array.isArray(n.blocks) && n.blocks.length) {
      content = renderBlocks(n.blocks);
    } else {
      var paras = (n.body || []).map(function (p) { return '<p>' + linkify(p) + '</p>'; }).join('');
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
      content = pic + paras;
    }
    var others = storiesFor(n.league).filter(function (s) { return s.id !== n.id; }).slice(0, 3);
    var more = others.length
      ? '<div class="section-head" style="margin-top:46px"><h2>More stories</h2></div>' +
        '<div class="news-grid">' + others.map(cardHTML).join('') + '</div>'
      : '';
    return '<a class="back-link" href="' + NEWS_INDEX + '">&larr; All news</a>' +
      '<article class="article" data-story="' + esc(n.id) + '">' +
      '<div class="news-date">' + sportBadge(n) + esc(n.date) + '</div>' +
      '<h1>' + esc(n.headline) + '</h1>' +
      '<p class="article-lede">' + esc(n.summary) + '</p>' +
      content +
      '</article>' + more;
  }

  /* The news page is split by fantasy: a row of filter chips, then one
     section per fantasy. Football and Basketball always show; Soccer only
     appears once a soccer story exists. news.html?sport=basketball shows
     just that one. */
  function pickedSport() {
    var m = /[?&]sport=([a-z]+)/.exec(location.search);
    return m && SPORTS[m[1]] ? m[1] : '';
  }
  function sportSectionHTML(key) {
    var list = storiesFor(key);
    var body = list.length
      ? '<div class="news-grid">' + list.map(cardHTML).join('') + '</div>'
      : '<p class="section-note">Aun no hay noticias de ' + esc(SPORTS[key].label) + '.</p>';
    return '<div class="sport-block" id="news-' + key + '">' +
      '<div class="section-head"><h2>' + esc(SPORTS[key].full) + '</h2>' +
      '<span class="section-note">' + list.length + (list.length === 1 ? ' noticia' : ' noticias') + '</span></div>' +
      body + '</div>';
  }
  function indexHTML() {
    if (!stories().length) {
      return '<p class="section-note">No stories posted yet. Add one in assets/news.js.</p>';
    }
    var picked = pickedSport();
    var shown = SPORT_ORDER.filter(function (k) {
      return k === 'football' || k === 'basketball' || storiesFor(k).length;
    });
    function chip(key, label) {
      return '<button type="button" class="chip sport-chip' + (key === picked ? ' active' : '') + '" data-sport="' + key + '">' + esc(label) + '</button>';
    }
    var chips = '<div class="chip-row sport-chips">' + chip('', 'Todas') +
      shown.map(function (k) { return chip(k, SPORTS[k].label); }).join('') + '</div>';
    return chips + (picked ? [picked] : shown).map(sportSectionHTML).join('');
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
    window.addEventListener('popstate', fromHash);
    newsPage.addEventListener('click', function (ev) {
      var chip = ev.target.closest('.sport-chip');
      if (!chip) return;
      var sp = chip.getAttribute('data-sport');
      try { history.pushState(null, '', NEWS_INDEX + (sp ? '?sport=' + sp : '')); } catch (e) { /* file:// quirks */ }
      window.LPBSA_renderNews('');
    });
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
