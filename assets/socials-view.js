/* ============================================================
   SOCIALS  --  shows the embedded posts in the home page's Socials section,
   and checks the links for the Socials writer.

   Where the posts come from:  assets/socials-data.js  (window.LPBSA_SOCIALS),
   a file the Socials writer (socials-writer.html) makes for you. You never
   edit this script to add or remove a post.

   On a page, this script fills  <div id="socialsGrid">  with one card per post.
   Each platform's own embed is used, so a post looks and works exactly like it
   does on Threads, X.com, Instagram or TikTok:

     Threads    <blockquote class="text-post-media">     + threads embed.js
     X.com      <blockquote class="twitter-tweet">       + platform.twitter.com/widgets.js
     Instagram  <blockquote class="instagram-media">     + instagram.com/embed.js
     TikTok     a play button; the video loads from tiktok.com/embed/v2 only when someone presses it

   Good to know
   - The platforms' scripts are only fetched once the Socials section is close
     to the screen, and only for the platforms that are actually posted, so the
     top of the home page loads just as fast as before.
   - TikTok is click-to-play on purpose: its embed servers sometimes answer with an
     "overload-protect triggered" error, and a page that loads the video by itself would
     show that error as a big empty box. The card shows a clean play button instead, and
     under the video there is always an "open it on TikTok" link.
   - If a platform's script cannot load (an ad blocker, no connection, a post that
     was deleted or is private), the card keeps a plain "Ver la publicacion"
     link to the post, so there is never an empty hole.
   - The styles for the cards live in this file (injected once), so style.css
     does not need to change.
   - If no post is saved yet, the Socials section stays on the page and says
     "Aún no hemos publicado en redes." (change the words in TEXT below).

   window.LPBSA_Socials  (also used by the writer):
     parse(link, platform)  -> { ok, platform, url, ... }  or  { ok:false, error }
     detect(link)           -> 'threads' | 'x' | 'instagram' | 'tiktok' | ''
     render(element, posts, { limit, lazy })
   ============================================================ */
(function () {
  'use strict';

  var DEFAULT_SHOW = 6;          /* how many posts the home page shows when the data file does not say */

  /* The words shown to visitors (Spanish, like the rest of the home page). */
  var TEXT = {
    open: 'Abrir',
    openIn: 'Ver la publicación en ',
    empty: 'Aún no hemos publicado en redes.',     /* shown when there is no post to show */
    play: 'Toca para ver el video',
    noLoad: '¿No carga? Ábrelo en TikTok'
  };

  /* The four platforms. "menu" is the name in the writer's drop-down, "label" the name on the card.
     The icons are the white ones already in images/socials-logo/ (the footer uses them too). */
  var PLATFORMS = {
    threads:   { menu: 'Threads',   label: 'Threads',   icon: 'threads-white-icon.webp' },
    x:         { menu: 'X.com',     label: 'X',         icon: 'x-social-media-white-icon.webp' },
    instagram: { menu: 'Instagram', label: 'Instagram', icon: 'instagram-white-icon.webp' },
    tiktok:    { menu: 'TikTok',    label: 'TikTok',    icon: 'tiktok-simplified-white-icon.png' }
  };
  var ORDER = ['threads', 'x', 'instagram', 'tiktok'];

  /* Each platform's official embed script. Threads is tried on its new address first. */
  var SCRIPTS = {
    threads:   ['https://www.threads.com/embed.js', 'https://www.threads.net/embed.js'],
    x:         ['https://platform.twitter.com/widgets.js'],
    instagram: ['https://www.instagram.com/embed.js']       /* TikTok needs no script: see tiktokFrame() */
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- reading a link ---------- */

  function fail(code, error, detected) {
    return { ok: false, code: code, error: error, detected: detected || '' };
  }

  /* host name -> which platform it belongs to ('' when it is none of the four) */
  function platformOfHost(host) {
    var h = String(host || '').toLowerCase().replace(/^(www|m|mobile|web|vm|vt)\./, '');
    if (h === 'x.com' || h === 'twitter.com') return 'x';
    if (h === 'instagram.com' || h === 'instagr.am') return 'instagram';
    if (h === 'threads.net' || h === 'threads.com') return 'threads';
    if (h === 'tiktok.com') return 'tiktok';
    return '';
  }

  /* a link as typed (with or without https://) -> a URL object, or null */
  function toURL(raw) {
    var s = String(raw == null ? '' : raw).trim();
    if (!s) return null;
    if (!/^[a-z][a-z0-9+.\-]*:\/\//i.test(s)) s = 'https://' + s.replace(/^\/+/, '');
    try {
      var u = new URL(s);
      return (u.protocol === 'https:' || u.protocol === 'http:') ? u : null;
    } catch (e) { return null; }
  }

  function detect(raw) {
    var u = toURL(raw);
    return u ? platformOfHost(u.hostname) : '';
  }

  function notAPost(platform) {
    return fail('not-a-post',
      'That is a link to ' + PLATFORMS[platform].menu + ', but not to one post. Open the post itself and copy its link.',
      platform);
  }

  /* One reader per platform. Each takes the URL and returns the cleaned-up post, or null if the
     link is not a single post. Tracking bits (?igsh=, ?s=20, ...) are dropped on purpose. */
  var READ = {
    x: function (u) {
      var m = /^\/(?:i\/(?:web\/)?|([A-Za-z0-9_]{1,15})\/)status(?:es)?\/(\d{5,25})(?:\/|$)/.exec(u.pathname);
      if (!m) return null;
      var who = m[1] || 'i';
      return {
        id: m[2], kind: 'Post', user: m[1] || '',
        url: 'https://x.com/' + who + '/status/' + m[2],
        embedUrl: 'https://twitter.com/' + who + '/status/' + m[2]
      };
    },
    instagram: function (u) {
      var m = /^\/(?:[A-Za-z0-9_.]{1,30}\/)?(p|reels?|tv)\/([A-Za-z0-9_\-]{5,})(?:\/|$)/i.exec(u.pathname);
      if (!m) return null;
      var type = m[1].toLowerCase();
      if (type === 'reels') type = 'reel';
      return {
        id: m[2], kind: type === 'p' ? 'Post' : type === 'tv' ? 'Video' : 'Reel', user: '',
        url: 'https://www.instagram.com/' + type + '/' + m[2] + '/'
      };
    },
    threads: function (u) {
      var m = /^\/@([A-Za-z0-9_.]{1,30})\/post\/([A-Za-z0-9_\-]{5,})(?:\/|$)/.exec(u.pathname);
      if (m) return { id: m[2], kind: 'Post', user: m[1], url: 'https://www.threads.com/@' + m[1] + '/post/' + m[2] };
      m = /^\/t\/([A-Za-z0-9_\-]{5,})(?:\/|$)/.exec(u.pathname);
      if (m) return { id: m[1], kind: 'Post', user: '', url: 'https://www.threads.com/t/' + m[1] };
      return null;
    },
    tiktok: function (u) {
      var m = /^\/@([A-Za-z0-9_.]{1,40})\/(video|photo)\/(\d{8,25})(?:\/|$)/.exec(u.pathname);
      if (!m) return null;
      return {
        id: m[3], kind: m[2] === 'photo' ? 'Photo' : 'Video', user: m[1],
        url: 'https://www.tiktok.com/@' + m[1] + '/' + m[2] + '/' + m[3]
      };
    }
  };

  /* parse(link, platform): the link as typed (and, when known, the platform the drop-down says).
     Returns { ok:true, platform, url, kind, id, ... } or { ok:false, code, error, detected }. */
  function parse(raw, want) {
    if (!String(raw == null ? '' : raw).trim()) return fail('empty', 'Paste the link of the post first.');
    var u = toURL(raw);
    if (!u) return fail('bad', 'That does not look like a link. Paste the full address of the post.');
    var found = platformOfHost(u.hostname);
    if (!found) return fail('unknown', 'That link is not from Threads, X.com, Instagram or TikTok.');
    if (want && PLATFORMS[want] && want !== found) {
      return fail('mismatch', 'That link is from ' + PLATFORMS[found].menu + ', but the drop-down says ' +
        PLATFORMS[want].menu + '. Pick ' + PLATFORMS[found].menu + ' in the drop-down.', found);
    }
    if (found === 'tiktok' && (/^(vm|vt)\./i.test(u.hostname) || /^\/t\//.test(u.pathname))) {
      return fail('short',
        'That is a TikTok short link. Open it in your browser, then copy the long address from the address bar ' +
        '(it has /video/ and a long number in it) and paste that one.', found);
    }
    var r = READ[found](u);
    if (!r) return notAPost(found);
    r.ok = true;
    r.platform = found;
    return r;
  }

  /* ---------- the cards ---------- */

  function injectCSS() {
    if (document.getElementById('lpbsaSocialsCSS')) return;
    var st = document.createElement('style');
    st.id = 'lpbsaSocialsCSS';
    st.textContent = [
      '.soc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:20px;align-items:start}',
      '.soc-card{min-width:0;overflow:hidden;background:var(--navy-800,#14213d);border:1px solid var(--line,rgba(255,255,255,.12));border-radius:var(--radius,3px)}',
      '.soc-head{display:flex;align-items:center;gap:9px;padding:10px 14px;border-bottom:1px solid var(--line,rgba(255,255,255,.12))}',
      '.soc-head img{width:16px;height:16px;object-fit:contain;flex:none}',
      '.soc-name{font-family:var(--font-display,inherit);font-size:.84rem;letter-spacing:.09em;text-transform:uppercase;color:var(--gold-light,#f0d77a)}',
      '.soc-open{margin-left:auto;font-size:.78rem;color:var(--mute,#8fa3c4);text-decoration:none;white-space:nowrap}',
      '.soc-open:hover{color:var(--gold-light,#f0d77a)}',
      '.soc-body{display:flex;justify-content:center;padding:14px;min-width:0}',
      '.soc-body>*{max-width:100%;min-width:0}',
      '.soc-body blockquote{margin:0;padding:0;border:0;background:none;width:100%;quotes:none}',
      '.soc-body blockquote::before,.soc-body blockquote::after{content:none}',
      '.soc-body blockquote.instagram-media{min-width:0 !important}',
      '.soc-tt{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%}',
      '.soc-tt-play{width:100%;min-height:210px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;cursor:pointer;',
        'background:rgba(255,255,255,.03);border:1px dashed var(--gold-dark,#a98a28);border-radius:var(--radius,3px);',
        'font-family:var(--font-display,inherit);font-size:.86rem;letter-spacing:.07em;text-transform:uppercase;color:var(--gold-light,#f0d77a)}',
      '.soc-tt-play:hover,.soc-tt-play:focus-visible{border-style:solid;color:var(--white,#fff)}',
      '.soc-tt-ico{display:flex;align-items:center;justify-content:center;width:54px;height:54px;border-radius:50%;padding-left:4px;',
        'background:var(--gold,#d4af37);color:var(--navy-950,#050b18);font-size:1.15rem}',
      '.soc-tt-open{font-size:.8rem;color:var(--mute,#8fa3c4);text-decoration:none;text-align:center}',
      '.soc-tt-open:hover{color:var(--gold-light,#f0d77a)}',
      '.soc-tt-frame{display:block;width:100%;max-width:605px;height:739px;border:0;border-radius:var(--radius,3px);background:#fff}',
      '.soc-body .twitter-tweet,.soc-body .twitter-tweet-rendered{margin:0 auto !important}',
      '.soc-body iframe{max-width:100%}',
      '.soc-body blockquote section{margin:0;padding:0}',
      '.soc-empty{margin:0;padding:34px 18px;text-align:center;color:var(--mute,#8fa3c4);',
        'background:var(--navy-800,#14213d);border:1px dashed var(--line,rgba(255,255,255,.12));border-radius:var(--radius,3px);',
        'font-family:var(--font-display,inherit);font-size:.95rem;letter-spacing:.07em;text-transform:uppercase}',
      '.soc-fallback{display:block;padding:18px 14px;text-align:center;text-decoration:none;',
        'border:1px dashed var(--gold-dark,#a98a28);border-radius:var(--radius,3px);',
        'font-family:var(--font-display,inherit);font-size:.86rem;letter-spacing:.07em;text-transform:uppercase;',
        'color:var(--gold-light,#f0d77a)}',
      '.soc-fallback:hover{border-style:solid;color:var(--white,#fff)}'
    ].join('');
    document.head.appendChild(st);
  }

  /* the platform's own embed markup, with a plain link inside it as the fallback */
  function embedHTML(p) {
    var name = PLATFORMS[p.platform].label;
    var link = function (href) {
      return '<a class="soc-fallback" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' +
        esc(TEXT.openIn + name) + ' &#8599;</a>';
    };
    if (p.platform === 'x') {
      return '<blockquote class="twitter-tweet" data-theme="dark" data-dnt="true" data-lang="es" data-align="center">' +
        link(p.embedUrl) + '</blockquote>';
    }
    if (p.platform === 'instagram') {
      return '<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="14" ' +
        'data-instgrm-permalink="' + esc(p.url + '?utm_source=ig_embed&utm_campaign=loading') + '">' + link(p.url) + '</blockquote>';
    }
    if (p.platform === 'threads') {
      return '<blockquote class="text-post-media" data-text-post-version="0" data-text-post-permalink="' + esc(p.url) +
        '" id="ig-tp-' + esc(p.id) + '">' + link(p.url) + '</blockquote>';
    }
    /* TikTok: a play button; the video itself is only fetched when someone presses it */
    return '<div class="soc-tt" data-tt-id="' + esc(p.id) + '">' +
      '<button type="button" class="soc-tt-play"><span class="soc-tt-ico" aria-hidden="true">&#9654;</span>' +
        esc(TEXT.play) + '</button>' +
      '<a class="soc-tt-open" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' +
        esc(TEXT.openIn + name) + ' &#8599;</a>' +
    '</div>';
  }

  /* Pressing a TikTok card's play button swaps it for TikTok's own player (the same address its
     embed script uses), with a link to open the video on TikTok kept underneath. */
  function tiktokFrame(ev) {
    var btn = ev.target && ev.target.closest ? ev.target.closest('.soc-tt-play') : null;
    if (!btn) return;
    var box = btn.closest('.soc-tt');
    var id = box && box.getAttribute('data-tt-id');
    if (!/^\d{8,25}$/.test(id || '')) return;
    var open = box.querySelector('.soc-tt-open');
    var href = open ? open.getAttribute('href') : 'https://www.tiktok.com/';
    box.innerHTML = '<iframe class="soc-tt-frame" src="https://www.tiktok.com/embed/v2/' + id + '" title="TikTok" ' +
      'allow="encrypted-media; fullscreen; autoplay" allowfullscreen scrolling="no"></iframe>' +
      '<a class="soc-tt-open" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + esc(TEXT.noLoad) + ' &#8599;</a>';
  }

  function cardHTML(p) {
    var pf = PLATFORMS[p.platform];
    var root = document.body.getAttribute('data-root') || '';
    return '<article class="soc-card" data-platform="' + esc(p.platform) + '">' +
      '<header class="soc-head">' +
        '<img src="' + esc(root + 'images/socials-logo/' + pf.icon) + '" alt="" width="16" height="16" onerror="this.remove()">' +
        '<span class="soc-name">' + esc(pf.label) + '</span>' +
        '<a class="soc-open" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' + esc(TEXT.open) + ' &#8599;</a>' +
      '</header>' +
      '<div class="soc-body">' + embedHTML(p) + '</div>' +
    '</article>';
  }

  /* ---------- loading each platform's script ---------- */

  var state = {};      /* platform -> { status: 'idle' | 'loading' | 'ready', url, waiting: [elements] } */

  function addScript(urls, done) {
    var i = 0;
    (function next() {
      if (i >= urls.length) { done(null); return; }
      var url = urls[i++];
      var s = document.createElement('script');
      s.async = true;
      s.src = url;
      s.setAttribute('data-soc-embed', '1');
      s.onload = function () { done(url); };
      s.onerror = function () { s.remove(); next(); };
      document.head.appendChild(s);
    })();
  }

  /* Ask the platform's script to turn the blockquotes inside `host` into real embeds. */
  function process(platform, host, fresh) {
    try {
      if (platform === 'x') {
        var tw = window.twttr;
        if (tw && tw.widgets && tw.widgets.load) tw.widgets.load(host);
        else if (tw && tw.ready) tw.ready(function (t) { t.widgets.load(host); });
      } else if (platform === 'instagram') {
        if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
      } else if (!fresh) {
        /* Threads has no "do it again" call: running its script again does it. */
        var old = document.querySelectorAll('script[data-soc-embed][data-soc-for="' + platform + '"]');
        Array.prototype.forEach.call(old, function (o) { o.remove(); });
        var s = document.createElement('script');
        s.async = true;
        s.src = state[platform].url;
        s.setAttribute('data-soc-embed', '1');
        s.setAttribute('data-soc-for', platform);
        document.head.appendChild(s);
      }
    } catch (e) { /* the plain links stay in place */ }
  }

  function boot(platform, host) {
    var S = state[platform] || (state[platform] = { status: 'idle', url: '', waiting: [] });
    if (S.status === 'ready') { process(platform, host, false); return; }
    S.waiting.push(host);
    if (S.status === 'loading') return;
    S.status = 'loading';
    addScript(SCRIPTS[platform], function (url) {
      var queue = S.waiting;
      S.waiting = [];
      if (!url) { S.status = 'idle'; return; }      /* blocked or offline: the plain links stay; a later render tries again */
      S.status = 'ready';
      S.url = url;
      /* the script has just looked through the page itself; the others still need the call */
      queue.forEach(function (h) { process(platform, h, true); });
    });
  }

  function loadEmbeds(host, list, lazy) {
    if (host._socObserver) { host._socObserver.disconnect(); host._socObserver = null; }
    var used = [];
    list.forEach(function (p) {
      if (SCRIPTS[p.platform] && used.indexOf(p.platform) === -1) used.push(p.platform);     /* TikTok has no script */
    });
    if (!used.length) return;
    var go = function () { used.forEach(function (pf) { boot(pf, host); }); };
    if (lazy && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); host._socObserver = null; go(); }
      }, { rootMargin: '600px 0px' });
      host._socObserver = io;
      io.observe(host);
    } else {
      go();
    }
  }

  /* render(element, posts, { limit, lazy })  -> how many cards were drawn.
     Posts that are not a real, single post link are skipped; the same post twice shows once. */
  function render(host, posts, opts) {
    opts = opts || {};
    var list = [], seen = {};
    (Array.isArray(posts) ? posts : []).forEach(function (p) {
      var r = parse(p && p.url);           /* the platform comes from the link itself */
      if (r.ok && !seen[r.url]) { seen[r.url] = 1; list.push(r); }
    });
    if (opts.limit > 0) list = list.slice(0, opts.limit);
    injectCSS();
    host.classList.add('soc-grid');
    if (!host._socBound) { host.addEventListener('click', tiktokFrame); host._socBound = true; }
    host.innerHTML = list.map(cardHTML).join('');
    host.setAttribute('data-count', String(list.length));
    loadEmbeds(host, list, opts.lazy !== false);
    return list.length;
  }

  /* the data file: { show: 6, posts: [{ platform, url }] }  (a bare list of posts works too) */
  function readConfig() {
    var d = window.LPBSA_SOCIALS;
    var posts = Array.isArray(d) ? d : (d && Array.isArray(d.posts) ? d.posts : []);
    var show = DEFAULT_SHOW;
    if (d && !Array.isArray(d) && d.show != null) {
      show = d.show === 'all' ? 0 : Math.floor(Number(d.show));
      if (!(show >= 0)) show = DEFAULT_SHOW;       /* 0 = every post */
    }
    return { posts: posts, show: show };
  }

  window.LPBSA_Socials = {
    platforms: PLATFORMS,
    order: ORDER,
    defaultShow: DEFAULT_SHOW,
    parse: parse,
    detect: detect,
    render: render,
    readConfig: readConfig
  };

  /* on the home page */
  var host = document.getElementById('socialsGrid');
  if (host) {
    var cfg = readConfig();
    var n = render(host, cfg.posts, { limit: cfg.show, lazy: true });
    if (!n) {
      host.classList.remove('soc-grid');
      host.innerHTML = '<p class="soc-empty">' + esc(TEXT.empty) + '</p>';     /* nothing posted yet */
    }
  }
})();
