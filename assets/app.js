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
    /* "all" = league-wide news (updates, announcements) that belongs to no single fantasy.
       To rename it on the site, change label / full here - nothing else. */
    all:        { label: 'LIGA', full: 'Avisos de la Liga' },
    football:   { label: 'NFL', full: 'NFL Fantasy' },
    basketball: { label: 'NBA', full: 'NBA Fantasy' },
    baseball:   { label: 'MLB', full: 'MLB Fantasy' }
  };
  var SPORT_ORDER = ['all', 'football', 'basketball', 'baseball'];
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

  /* YouTube links: any normal way of copying a video's address -> { id, short } (or null).
     Handles youtube.com/watch?v=, youtu.be/, /embed/, /shorts/, /live/, music.youtube.com and m.youtube.com.
     The news writer uses the same function, so what it accepts is exactly what the site can show. */
  function youtubeInfo(raw) {
    var s = String(raw == null ? '' : raw).trim();
    if (!s) return null;
    if (/^[A-Za-z0-9_-]{11}$/.test(s)) return { id: s, short: false };       /* a bare video id */
    if (!/^[a-z][a-z0-9+.\-]*:\/\//i.test(s)) s = 'https://' + s.replace(/^\/+/, '');
    var u;
    try { u = new URL(s); } catch (e) { return null; }
    var host = u.hostname.toLowerCase().replace(/^(www|m|music)\./, '');
    var id = '', isShort = false, m;
    if (host === 'youtu.be') {
      id = u.pathname.split('/')[1] || '';
    } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      if (u.pathname === '/watch') id = u.searchParams.get('v') || '';
      else if ((m = /^\/(embed|shorts|live|v)\/([A-Za-z0-9_-]{11})(?:[/?]|$)/.exec(u.pathname))) { id = m[2]; isShort = m[1] === 'shorts'; }
    }
    return /^[A-Za-z0-9_-]{11}$/.test(id) ? { id: id, short: isShort } : null;
  }
  window.LPBSA_youtubeInfo = youtubeInfo;

  /* LPBLSA TV: every video - an uploaded file or a YouTube link - is written as the league's own player.
     assets/tv.js (on news.html and about.html) turns this into the player with our controls; without it
     an uploaded video still plays with the browser's controls and a YouTube video opens on YouTube.
     "#t=0.1" makes phones show the clip's first picture instead of a black box. */
  function tvFileHTML(src, caption) {
    var url = fromRoot(String(src));
    return '<figure class="article-figure tv" data-tv="file"><div class="tv-stage"><div class="tv-screen">' +
      '<video class="tv-media" controls playsinline preload="metadata" src="' + esc(url) + (url.indexOf('#') === -1 ? '#t=0.1' : '') + '"></video>' +
      '</div></div>' + (caption ? '<figcaption>' + esc(caption) + '</figcaption>' : '') + '</figure>';
  }
  function tvYouTubeHTML(yt, caption) {
    var watch = 'https://www.youtube.com/watch?v=' + yt.id;
    return '<figure class="article-figure tv tv-yt' + (yt.short ? ' is-portrait' : '') + '" data-tv="youtube" data-yt="' + esc(yt.id) + '">' +
      '<div class="tv-stage"><div class="tv-screen">' +
      '<a class="tv-facade" href="' + watch + '" target="_blank" rel="noopener noreferrer" aria-label="Ver el video en YouTube">' +
      '<img class="tv-thumb" src="https://i.ytimg.com/vi/' + esc(yt.id) + '/hqdefault.jpg" alt="" loading="lazy" decoding="async" onerror="this.remove()"></a>' +
      '</div></div>' + (caption ? '<figcaption>' + esc(caption) + '</figcaption>' : '') + '</figure>';
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
      if (b.type === 'video' && b.src) return tvFileHTML(b.src, b.caption);
      if (b.type === 'youtube') {
        /* a bad link shows as a plain link instead */
        var yt = youtubeInfo(b.src);
        if (!yt) return b.src ? '<p>' + linkify(String(b.src)) + '</p>' : '';
        return tvYouTubeHTML(yt, b.caption);
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
  /* only the stories written for exactly this fantasy (the news page sections) */
  function storiesOnly(league) {
    return stories().filter(function (s) { return s.league === league; });
  }
  /* a fantasy's own stories PLUS the league-wide ones, newest first as written - used by the league
     pages, the wire and "more stories", so an update for everybody shows up everywhere */
  function storiesFor(league) {
    return stories().filter(function (s) { return s.league === league || s.league === 'all'; });
  }
  function sportBadge(n) {
    return '<span class="news-sport' + (n.league === 'all' ? ' news-sport-all' : '') + '">' + esc(SPORTS[n.league].label) + '</span>';
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
  /* The picture on top of a card: the story's first photo. A story whose first
     picture is a video gets a play button; a story with no picture gets its
     league's logo. Paths in news.js are from the site root, so pages in
     sub-folders (the league landing pages) prefix them with data-root. */
  var PAGE_ROOT = document.body.getAttribute('data-root') || '';
  function fromRoot(src) {
    return /^(https?:|data:)?\/\//i.test(src) || /^(data:|\/)/.test(src) ? src : PAGE_ROOT + src;
  }
  function coverOf(n) {
    var blocks = Array.isArray(n.blocks) ? n.blocks : [];
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      if (b && b.src && (b.type === 'image' || b.type === 'video')) return { type: b.type, src: b.src };
      if (b && b.src && b.type === 'youtube') {                       /* a YouTube video: its thumbnail + a play button */
        var yt = youtubeInfo(b.src);
        if (yt) return { type: 'youtube', id: yt.id };
      }
    }
    if (n.image) return { type: 'image', src: n.image };
    if (n.video) return { type: 'video', src: n.video };
    return null;
  }
  function leagueLogoFor(n) {
    var list = window.LPBSA_LEAGUES || [];
    for (var i = 0; i < list.length; i++) { if (list[i].story === n.league && list[i].logo) return list[i].logo; }
    return 'images/league-logo.png';
  }
  var PLAY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>';
  var ARROW_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  function coverHTML(n) {
    var c = coverOf(n);
    var mark = '<span class="news-cover-mark"><img src="' + esc(fromRoot(leagueLogoFor(n))) + '" alt="" loading="lazy" decoding="async"></span>';
    var inner;
    if (c && c.type === 'image') {
      inner = '<img src="' + esc(fromRoot(c.src)) + '" alt="" loading="lazy" decoding="async"' +
        (/\.(png|webp|svg|gif)(\?|$)/i.test(c.src) ? ' class="is-graphic"' : '') + ' onerror="this.remove()">';
    } else if (c && c.type === 'youtube') {
      /* the video's own thumbnail: the big one (no black bars) when YouTube has it, its standard one
         otherwise (see ytCover below); if neither loads, the league logo shows instead */
      inner = mark + '<img class="news-cover-yt" src="https://i.ytimg.com/vi/' + esc(c.id) + '/maxresdefault.jpg" alt="" loading="lazy" decoding="async" ' +
        'data-yt="' + esc(c.id) + '" onload="LPBSA_ytCover(this,1)" onerror="LPBSA_ytCover(this,0)">' +
        '<span class="news-cover-play"><span>' + PLAY_ICON + '</span></span>';
    } else if (c && c.type === 'video') {
      /* a real picture from the clip (loaded only when the card is near the screen, see wakeCoverVideos);
         the logo shows until then, or for good if the clip cannot be read */
      inner = mark + '<video class="news-cover-video" muted playsinline preload="none" tabindex="-1" aria-hidden="true" data-src="' +
        esc(fromRoot(c.src)) + '"></video>' +
        '<span class="news-cover-play"><span>' + PLAY_ICON + '</span></span>' +
        '<span class="news-cover-dur" hidden></span>';
    } else {
      inner = mark;
    }
    return '<div class="news-cover' + (c && (c.type === 'video' || c.type === 'youtube') ? ' is-video' : '') + '">' + inner + '</div>';
  }
  /* YouTube answers a missing big thumbnail with a tiny grey one (or an error): fall back to the standard picture */
  window.LPBSA_ytCover = function (img, loaded) {
    var big = /maxresdefault/.test(img.src);
    if (loaded && img.naturalWidth > 120) {
      if (img.previousSibling) img.previousSibling.style.display = 'none';    /* the logo underneath */
      if (!big) {
        /* the standard thumbnail is 4:3 with black bars around a 16:9 picture: zoom in just enough
           to hide them in this card's shape (a 16:9 card needs no zoom, a square one 1.33x) */
        var box = img.parentNode.getBoundingClientRect();
        var r = box.height ? box.width / box.height : 16 / 9;
        img.style.setProperty('--yt-s', String(r >= 16 / 9 ? 1 : r >= 4 / 3 ? (16 / 9) / r : 4 / 3));
        img.classList.add('is-hq');
      }
      return;
    }
    if (big) { img.src = 'https://i.ytimg.com/vi/' + encodeURIComponent(img.getAttribute('data-yt')) + '/hqdefault.jpg'; return; }
    img.remove();
  };
  function clockText(t) {
    t = Math.floor(t || 0);
    return Math.floor(t / 60) + ':' + (t % 60 < 10 ? '0' : '') + (t % 60);
  }
  /* Card covers of video stories: fetch a few frames of the clip once the card is close to the screen. */
  function wakeCoverVideos(scope) {
    var vids = (scope || document).querySelectorAll('video.news-cover-video[data-src]');
    if (!vids.length) return;
    function load(v) {
      var src = v.getAttribute('data-src');
      v.removeAttribute('data-src');
      var cover = v.parentNode;
      var ready = function () { cover.classList.add('is-ready'); };
      v.addEventListener('loadeddata', ready);
      v.addEventListener('seeked', ready);
      v.addEventListener('loadedmetadata', function () {
        var dur = cover.querySelector('.news-cover-dur');
        if (dur && isFinite(v.duration) && v.duration > 0) { dur.textContent = clockText(v.duration); dur.hidden = false; }
      });
      v.preload = 'metadata';
      v.src = src + (src.indexOf('#') === -1 ? '#t=0.1' : '');
    }
    if (!('IntersectionObserver' in window)) { Array.prototype.forEach.call(vids, load); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        load(e.target);
      });
    }, { rootMargin: '250px 0px' });
    Array.prototype.forEach.call(vids, function (v) { io.observe(v); });
  }
  function cardHTML(n, withBadge) {
    var badge = (withBadge === true || n.league === 'all') ? sportBadge(n) : '';
    var when = n.date ? '<span class="news-when">' + esc(n.date) + '</span>' : '';
    return '<a class="news-card" href="' + NEWS_BASE + encodeURIComponent(n.id) + '">' +
      coverHTML(n) +
      '<div class="news-date">' + badge + when + '</div>' +
      '<div class="news-body">' +
      '<h3>' + esc(n.headline) + '</h3>' +
      '<p>' + esc(n.summary) + '</p>' +
      '<span class="news-more">Leer la noticia ' + ARROW_ICON + '</span>' +
      '</div>' +
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
    wakeCoverVideos(grid);
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
    /* nobody has played yet (a new season): no gold, silver or bronze until a game counts */
    var podium = ctx.played !== false;
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
    return '<tr class="' + (podium ? standingsRowClass(rank) : 'rank-n') + '">' +
      '<td><div class="rk-cell"><span class="medal ' + (podium ? medalClass(rank) : 'n') + '">' + rank + '</span></div></td>' +
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
  function playedAny(rows) { return window.LPBSA_hasPlayed ? window.LPBSA_hasPlayed(rows) : true; }
  window.LPBSA_standingsRowsHTML = function (rows, ctx) {
    ctx = ctx || {};
    if (ctx.played === undefined) ctx.played = playedAny(rows);
    return (rows || []).map(function (r, i) { return standingsRowHTML(r, i, ctx); }).join('');
  };
  var standingsBody = document.getElementById('standingsBody');
  if (standingsBody) {
    var standingsRows = window.LEAGUE_STANDINGS || [];
    var standingsCtx = { played: playedAny(standingsRows) };
    standingsBody.innerHTML = standingsRows.length
      ? standingsRows.map(function (r, i) { return standingsRowHTML(r, i, standingsCtx); }).join('')
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
    ? tvFileHTML(n.video, n.caption)
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
      ? '<div class="section-head" style="margin-top:46px"><h2>M\u00e1s noticias</h2></div>' +
        '<div class="news-grid">' + others.map(cardHTML).join('') + '</div>'
      : '';
    /* the story on the left; on a wide screen "Lo \u00faltimo" sits beside it (the comments go under the story) */
    return '<a class="back-link" href="' + NEWS_INDEX + '">&larr; Todas las noticias</a>' +
      '<div class="article-layout">' +
      '<article class="article" data-story="' + esc(n.id) + '">' +
      '<div class="news-date">' + sportBadge(n) + esc(n.date) + '</div>' +
      '<h1>' + esc(n.headline) + '</h1>' +
      '<p class="article-lede">' + esc(n.summary) + '</p>' +
      shareHTML(n) +
      content +
      '</article>' + railHTML(n) + '</div>' + more;
  }

  /* "Lo \u00faltimo": the newest stories from every league, beside the one being read (wide screens only) */
  function railThumb(s) {
    var c = coverOf(s), pic = '';
    if (c && c.type === 'image') {
      pic = '<img src="' + esc(fromRoot(c.src)) + '" alt="" loading="lazy" decoding="async"' +
        (/\.(png|webp|svg|gif)(\?|$)/i.test(c.src) ? ' class="is-graphic"' : '') + ' onerror="this.remove()">';
    } else if (c && c.type === 'youtube') {
      pic = '<img src="https://i.ytimg.com/vi/' + esc(c.id) + '/mqdefault.jpg" alt="" loading="lazy" decoding="async" onerror="this.remove()">';
    }
    var play = c && (c.type === 'video' || c.type === 'youtube') ? '<i class="rail-play">' + PLAY_ICON + '</i>' : '';
    return '<span class="rail-thumb"><img class="rail-logo" src="' + esc(fromRoot(leagueLogoFor(s))) + '" alt="" loading="lazy" decoding="async">' +
      pic + play + '</span>';
  }
  function railHTML(n) {
    var latest = stories().filter(function (s) { return s.id !== n.id; }).slice(0, 5);
    if (!latest.length) return '';
    return '<aside class="article-rail" aria-label="Lo \u00faltimo">' +
      '<div class="rail-head">Lo \u00faltimo</div>' +
      latest.map(function (s) {
        return '<a class="rail-item" href="' + NEWS_BASE + encodeURIComponent(s.id) + '">' + railThumb(s) +
          '<span class="rail-text"><span class="rail-meta">' + sportBadge(s) + (s.date ? '<span>' + esc(s.date) + '</span>' : '') + '</span>' +
          '<b>' + esc(s.headline) + '</b></span></a>';
      }).join('') +
      '<a class="rail-all" href="' + NEWS_INDEX + '">Todas las noticias ' + ARROW_ICON + '</a>' +
      '</aside>';
  }

  /* the thin gold bar under the menu that fills as you read a story */
  var progressBar = null, progressQueued = false;
  function paintProgress() {
    progressQueued = false;
    if (!progressBar) return;
    var art = document.body.classList.contains('is-reading') && newsPage && newsPage.querySelector('article.article');
    if (!art) { progressBar.style.transform = 'scaleX(0)'; return; }
    var r = art.getBoundingClientRect();
    var span = r.height - window.innerHeight * 0.6;
    var done = span > 0 ? (window.innerHeight * 0.25 - r.top) / span : 1;
    progressBar.style.transform = 'scaleX(' + Math.max(0, Math.min(1, done)).toFixed(4) + ')';
  }
  function queueProgress() {
    if (progressQueued) return;
    progressQueued = true;
    (window.requestAnimationFrame || setTimeout)(paintProgress);
  }

  /* ---------- sharing a story (the group chat is where the trash talk lives) ---------- */
  var SHARE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>';
  var CHAT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.3A8.5 8.5 0 1 1 21 11.5z"/></svg>';
  function storyURL(id) {
    try { return new URL(NEWS_BASE + encodeURIComponent(id), location.href).href; } catch (e) { return location.href; }
  }
  function shareHTML(n) {
    return '<div class="article-share">' +
      '<button type="button" class="btn btn-small btn-solid" data-share-story="' + esc(n.id) + '">' + SHARE_ICON + 'Compartir</button>' +
      '<a class="btn btn-small btn-ghost" href="https://wa.me/?text=' + encodeURIComponent(n.headline + '\n' + storyURL(n.id)) +
        '" target="_blank" rel="noopener noreferrer">' + CHAT_ICON + 'Mandarlo al grupo</a>' +
    '</div>';
  }
  function flash(text) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.setAttribute('role', 'status');
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('hide'); }, 2600);
    setTimeout(function () { t.remove(); }, 3000);
  }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    return new Promise(function (ok, fail) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? ok() : fail(); } catch (e) { fail(e); }
      ta.remove();
    });
  }
  document.addEventListener('click', function (ev) {
    var btn = ev.target.closest ? ev.target.closest('[data-share-story]') : null;
    if (!btn) return;
    var story = findStory(btn.getAttribute('data-share-story'));
    if (!story) return;
    var url = storyURL(story.id);
    if (navigator.share) {
      navigator.share({ title: story.headline, text: story.summary, url: url }).catch(function () { /* closed the sheet */ });
      return;
    }
    copyText(url).then(function () { flash('Link copiado. P\u00e9galo en el grupo.'); },
      function () { flash('No se pudo copiar. El link es: ' + url); });
  });

  /* The news page is split by fantasy: a row of filter chips, then one
     section per fantasy. Football and Basketball always show; Baseball and the
     league-wide "Liga" section only appear once a story exists for them. news.html?sport=basketball shows
     just that one. */
  function pickedSport() {
    var m = /[?&]sport=([a-z]+)/.exec(location.search);
    return m && SPORTS[m[1]] ? m[1] : '';
  }
  function sportSectionHTML(key) {
    var list = storiesOnly(key);
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
      return k === 'football' || k === 'basketball' || storiesOnly(k).length;
    });
    function chip(key, label) {
      return '<button type="button" class="chip sport-chip' + (key === picked ? ' active' : '') + '" data-sport="' + key + '">' + esc(label) + '</button>';
    }
    var chips = '<div class="chip-row sport-chips">' + chip('', 'Todas') +
      shown.map(function (k) { return chip(k, SPORTS[k].label); }).join('') + '</div>';
    return chips + (picked ? [picked] : shown).map(sportSectionHTML).join('');
  }

  var newsPage = document.getElementById('newsPage');
  if (newsPage) {
    var bar = document.createElement('div');
    bar.className = 'read-progress';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<span></span>';
    document.body.appendChild(bar);
    progressBar = bar.firstChild;
    window.addEventListener('scroll', queueProgress, { passive: true });
    window.addEventListener('resize', queueProgress);
  }
  window.LPBSA_renderNews = function (id) {
    if (!newsPage) return;
    var story = id ? findStory(id) : null;
    /* a video playing in the corner keeps playing while the next story opens (assets/tv.js) */
    if (window.LPBSA_TV) window.LPBSA_TV.beforeRender(newsPage);
    /* reading one story: the page header steps aside so the story is the first thing on screen */
    document.body.classList.toggle('is-reading', !!story);
    if (id && !story) {
      newsPage.innerHTML = '<a class="back-link" href="' + NEWS_INDEX + '">&larr; Todas las noticias</a>' +
        '<p class="section-note">Esa noticia ya no est\u00e1 aqu\u00ed.</p>';
      return;
    }
    newsPage.innerHTML = story ? articleHTML(story) : indexHTML();
    wakeCoverVideos(newsPage);
    queueProgress();
  };

  if (newsPage && !window.LPBSA_SINGLE) {
    var fromHash = function () {
      var raw = location.hash.replace(/^#/, ''), id;
      try { id = decodeURIComponent(raw); } catch (e) { id = raw; }      /* a mangled link (a stray %) */
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
  /* A basketball player can play several spots ("PG, SG"): the round avatar shows
     the first (his main one), the small tag under the name shows them all. */
  function mainPos(pos) {
    return String(pos || '?').split(',')[0].trim() || '?';
  }
  function playerCellHTML(p, slotLabel) {
    var status = p.status ? '<span class="player-status">' + esc(p.status) + '</span>' : '';
    return '<td><span class="slot-badge">' + esc(slotLabel) + '</span></td>' +
      '<td><span class="player-cell"><span class="player-avatar">' + esc(mainPos(p.pos)) + '</span>' +
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
          var counted = false; /* no numbers yet (a new season) = a dash rather than 0 */
          var any = false;
          players.forEach(function (p, i) {
            if (!p) return;
            any = true;
            var label = slotList ? slotList[i] : (section === 'bench' ? 'Bench' : 'IR');
            rowsHtml.push('<tr>' + playerCellHTML(p, label) + '</tr>');
            if (typeof p.fpts === 'number') { total += p.fpts; counted = true; }
          });
          body.innerHTML = any ? rowsHtml.join('') :
            '<tr><td colspan="5" class="section-note">No players here right now.</td></tr>';
          if (totalEl) totalEl.textContent = counted ? fmtNum(Math.round(total * 10) / 10) : '\u2014';
        });
      var badge = document.getElementById('starters-projected-' + slug);
      if (badge) {
        var startCounted = false;
        var startTotal = (team.starters || []).reduce(function (sum, p) {
          if (p && typeof p.fpts === 'number') { startCounted = true; return sum + p.fpts; }
          return sum;
        }, 0);
        badge.textContent = startCounted ? fmtNum(Math.round(startTotal * 10) / 10) : '\u2014';
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
      var key = slug(a.name) + '-' + slug(a.pos ? mainPos(a.pos) : '');
      return '<tr class="fa-row" data-pos="' + esc(a.pos) + '" data-name="' + esc((a.name || '').toLowerCase()) +
        '" data-team="' + esc((a.team_abbr || '').toLowerCase()) + '" data-fpts="' + fpts + '" data-avg="' + avg +
        '" data-last="' + last + '" data-rank="' + (i + 1) + '">' +
        '<td class="num" style="color:var(--mute)">' + (i + 1) + '</td>' +
        '<td><span class="player-cell"><span class="player-avatar">' + esc(mainPos(a.pos)) + '</span>' +
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
        /* a player listed at several spots ("PG, SG") shows under each of them */
        var matchPos =
          pos === 'ALL' ? true :
          pos === 'WATCH' ? !!watch[key] :
          row.getAttribute('data-pos').split(/\s*,\s*/).indexOf(pos) !== -1;
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
