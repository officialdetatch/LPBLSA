/* ============================================================
   SOCIALS  --  shows the embedded posts in the home page's Socials section,
   and checks the links for the Socials writer.

   Where the posts come from:  assets/socials-data.js  (window.LPBSA_SOCIALS),
   a file the Socials writer (socials-writer.html) makes for you. You never
   edit this script to add or remove a post.

   LIVE FEEDS (Instagram, TikTok and X.com): the Socials section starts with each account's
   own feed, which keeps itself up to date - post and it shows up here, nothing to save:
     Instagram  the profile with a grid of the latest posts  drawn here from the "instagram-feed" branch,
                which the Instagram GitHub Action refreshes every 4 hours (INSTAGRAM-SETUP.md). Until
                that is set up - or if it ever stops - the card shows your newest Instagram post from
                the Socials writer instead.
     X.com      the profile timeline (newest posts first)    <a class="twitter-timeline"> + widgets.js
     TikTok     the profile card with the latest videos      <blockquote class="tiktok-embed" data-embed-type="creator"> + embed.js
   Which accounts: LIVE below. Threads has no feed, so for it the section shows the posts you
   add with the Socials writer (posts you add there for X or TikTok are skipped while their live
   feed is on; the newest Instagram one is the Instagram card's stand-in).

   On a page, this script fills  <div id="socialsGrid">  with the live feeds, then one
   card per post. Each platform's own embed is used, so a post looks and works exactly
   like it does on Threads, X.com, Instagram or TikTok:

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
     render(element, posts, { limit, lazy })   limit counts the live feeds too
     live                   the LIVE accounts below
   ============================================================ */
(function () {
  'use strict';

  var DEFAULT_SHOW = 6;          /* how many cards the home page shows when the data file does not say */

  /* The accounts shown as a LIVE FEED, newest posts first, kept up to date by themselves.
     Set one to '' to go back to single posts from the Socials writer for that platform. */
  var LIVE = {
    instagram: 'lpblsa',         /* instagram.com/lpblsa - its latest posts, saved every 4 hours by the
                                    "Instagram feed" GitHub Action (one-time setup: INSTAGRAM-SETUP.md) */
    tiktok: 'lpblsa',            /* tiktok.com/@lpblsa */
    x: 'lpblsa_onX'              /* x.com/lpblsa_onX */
  };
  var LIVE_ORDER = ['instagram', 'tiktok', 'x'];
  var FEED_HEIGHT = 620;         /* how tall the X timeline is, in pixels (it scrolls inside) */

  /* Where the Instagram Action saves the latest posts (one small file, pictures included): the
     "instagram-feed" branch of the repo - never main, so your own pushes are never in its way. It is read
     straight from GitHub, or from the jsDelivr copy of it if GitHub does not answer. If neither can be read
     (the setup is not done yet, or the Action stopped), the Instagram card shows your newest Instagram post
     from the Socials writer instead, so there is never an empty card. */
  var IG_SOURCES = [
    'https://raw.githubusercontent.com/officialdetatch/LPBLSA/instagram-feed/instagram.json',
    'https://cdn.jsdelivr.net/gh/officialdetatch/LPBLSA@instagram-feed/instagram.json'
  ];
  var IG_SHOW = 9;               /* how many of the latest posts the Instagram card shows (3 per row) */

  /* The words shown to visitors (Spanish, like the rest of the home page). */
  var TEXT = {
    open: 'Abrir',
    openIn: 'Ver la publicación en ',
    empty: 'Aún no hemos publicado en redes.',     /* shown when there is no post to show */
    play: 'Toca para ver el video',
    noLoad: '¿No carga? Ábrelo en TikTok',
    liveX: 'Ver los posts de @{u} en X',           /* the link under a live feed, until it loads */
    liveTiktok: 'Ver los videos de @{u} en TikTok',
    liveInstagram: 'Ver las publicaciones de @{u} en Instagram',
    liveTag: 'Lo último',                           /* the little tag on a live feed's card */
    igFollow: 'Seguir',                             /* the Instagram card */
    igPosts: '{n} publicaciones',
    igFollowers: '{n} seguidores',
    igLatest: 'Último post',
    igPost: 'Publicación de Instagram',
    igVideo: 'Video',
    igAlbum: 'Álbum'
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
    instagram: ['https://www.instagram.com/embed.js'],      /* a single TikTok post needs no script: see tiktokFrame() */
    tiktokLive: ['https://www.tiktok.com/embed.js']          /* TikTok's profile card (the live feed) */
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
      '.soc-fallback:hover{border-style:solid;color:var(--white,#fff)}',
      '.soc-handle{font-size:.78rem;color:var(--mute,#8fa3c4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}',
      '.soc-live{flex:none;font-family:var(--font-display,inherit);font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;',
        'padding:2px 8px;border-radius:999px;color:var(--gold-light,#f0d77a);border:1px solid rgba(212,175,55,.45)}',
      '.soc-feed{width:100%}',
      '.soc-feed iframe{width:100% !important;max-width:100%}',
      '.soc-body blockquote.tiktok-embed{margin:0 auto;min-width:0 !important}',
      /* the Instagram card: profile row, a 3-across grid of the latest posts, the newest caption */
      '.soc-ig{width:100%;display:flex;flex-direction:column;gap:12px}',
      '.soc-ig-top{display:flex;align-items:center;gap:11px;min-width:0;text-decoration:none;color:var(--white,#fff)}',
      '.soc-ig-avatar{flex:none;width:46px;height:46px;border-radius:50%;object-fit:cover;border:2px solid var(--gold,#d4af37);',
        'background:var(--navy-950,#050b18)}',
      '.soc-ig-who{display:flex;flex-direction:column;gap:2px;min-width:0;line-height:1.25}',
      '.soc-ig-who b{font-size:.92rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}',
      '.soc-ig-who span{font-size:.74rem;color:var(--mute,#8fa3c4)}',
      '.soc-ig-follow{margin-left:auto;flex:none;padding:6px 13px;border-radius:999px;background:var(--gold,#d4af37);',
        'color:var(--navy-950,#050b18);font-family:var(--font-display,inherit);font-size:.74rem;letter-spacing:.08em;text-transform:uppercase}',
      '.soc-ig-top:hover .soc-ig-follow,.soc-ig-top:focus-visible .soc-ig-follow{background:var(--gold-light,#f0d77a)}',
      '.soc-ig-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px}',
      '.soc-ig-tile{position:relative;display:block;aspect-ratio:4/5;overflow:hidden;border-radius:2px;background:var(--navy-950,#050b18)}',
      '.soc-ig-tile img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .3s ease,opacity .3s ease}',
      'a.soc-ig-tile:hover img,a.soc-ig-tile:focus-visible img{transform:scale(1.06);opacity:.86}',
      'a.soc-ig-tile:focus-visible{outline:2px solid var(--gold,#d4af37);outline-offset:2px}',
      '.soc-ig-tile img.soc-ig-blank{width:30%;height:30%;margin:auto;position:absolute;inset:0;object-fit:contain;opacity:.45}',
      '.soc-ig-badge{position:absolute;top:6px;right:6px;width:18px;height:18px;color:#fff;pointer-events:none;',
        'filter:drop-shadow(0 1px 2px rgba(0,0,0,.75))}',
      '.soc-ig-skel{background:linear-gradient(100deg,rgba(255,255,255,.03) 30%,rgba(255,255,255,.09) 50%,rgba(255,255,255,.03) 70%);',
        'background-size:300% 100%;animation:socShimmer 1.3s linear infinite}',
      '@keyframes socShimmer{from{background-position:100% 0}to{background-position:0 0}}',
      '@media (prefers-reduced-motion:reduce){.soc-ig-skel{animation:none}.soc-ig-tile img{transition:none}}',
      '.soc-ig-latest{display:flex;flex-direction:column;gap:4px;text-decoration:none;color:var(--mute,#8fa3c4)}',
      '.soc-ig-when{font-family:var(--font-display,inherit);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--gold-light,#f0d77a)}',
      '.soc-ig-cap{font-size:.84rem;line-height:1.45;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}',
      '.soc-ig-cap b{color:var(--white,#fff);margin-right:5px}',
      '.soc-ig-latest:hover .soc-ig-cap{color:var(--white,#fff)}'
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

  /* a live feed: the platform's own profile embed, with a plain link inside it until it loads */
  function liveHTML(p) {
    var u = p.user;
    if (p.platform === 'instagram') {
      /* grey tiles while the latest posts load (see igLoad), so the card does not jump */
      var skel = '';
      for (var i = 0; i < IG_SHOW; i++) skel += '<span class="soc-ig-tile soc-ig-skel"></span>';
      return '<div class="soc-ig" aria-busy="true"><div class="soc-ig-grid">' + skel + '</div>' +
        '<a class="soc-fallback" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' +
        esc(TEXT.liveInstagram.replace('{u}', u)) + ' &#8599;</a></div>';
    }
    if (p.platform === 'x') {
      return '<div class="soc-feed"><a class="twitter-timeline soc-fallback" data-theme="dark" data-dnt="true" data-lang="es"' +
        ' data-height="' + FEED_HEIGHT + '" data-chrome="noheader nofooter transparent"' +
        ' href="https://twitter.com/' + esc(u) + '">' + esc(TEXT.liveX.replace('{u}', u)) + ' &#8599;</a></div>';
    }
    return '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@' + esc(u) + '" data-unique-id="' + esc(u) + '"' +
      ' data-embed-type="creator" style="max-width:720px;min-width:288px;"><section>' +
      '<a class="soc-fallback" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@' + esc(u) + '?refer=creator_embed">' +
      esc(TEXT.liveTiktok.replace('{u}', u)) + ' &#8599;</a></section></blockquote>';
  }

  function cardHTML(p) {
    var pf = PLATFORMS[p.platform];
    var root = document.body.getAttribute('data-root') || '';
    if (p.live) {
      return '<article class="soc-card soc-card-live" data-platform="' + esc(p.platform) + '">' +
        '<header class="soc-head">' +
          '<img src="' + esc(root + 'images/socials-logo/' + pf.icon) + '" alt="" width="16" height="16" onerror="this.remove()">' +
          '<span class="soc-name">' + esc(pf.label) + '</span>' +
          '<span class="soc-handle">@' + esc(p.user) + '</span>' +
          '<span class="soc-live">' + esc(TEXT.liveTag) + '</span>' +
          '<a class="soc-open" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' + esc(TEXT.open) + ' &#8599;</a>' +
        '</header>' +
        '<div class="soc-body">' + liveHTML(p) + '</div>' +
      '</article>';
    }
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
        /* Threads and TikTok have no "do it again" call: running their script again does it. */
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

  function scriptFor(p) {
    if (p.platform === 'tiktok') return p.live ? 'tiktokLive' : '';      /* a single TikTok post has no script */
    if (p.platform === 'instagram' && p.live) return '';                 /* the Instagram card is drawn here, no script */
    return SCRIPTS[p.platform] ? p.platform : '';
  }
  function loadEmbeds(host, list, lazy) {
    if (host._socObserver) { host._socObserver.disconnect(); host._socObserver = null; }
    var used = [], igCard = false;
    list.forEach(function (p) {
      if (p.live && p.platform === 'instagram') igCard = true;
      var k = scriptFor(p);
      if (k && used.indexOf(k) === -1) used.push(k);
    });
    if (!used.length && !igCard) return;
    var go = function () {
      if (igCard) igLoad(host);
      used.forEach(function (pf) { boot(pf, host); });
    };
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

  /* ---------- the Instagram card (the latest posts saved by the Instagram Action) ---------- */

  var ig = { status: 'idle', data: null, waiting: [] };     /* the feed is fetched once per page */
  var SAFE_IMG = /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+\/]+=*$/;    /* the pictures come inside the file */
  var MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  var BADGE = {
    video: '<svg class="soc-ig-badge" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>',
    album: '<svg class="soc-ig-badge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">' +
      '<rect x="3" y="7.5" width="13.5" height="13.5" rx="2"/><path d="M7.5 3.5h11a2 2 0 0 1 2 2v11"/></svg>'
  };

  /* is this platform shown as a live feed right now? (Instagram stops being one if its feed cannot be read) */
  function isLive(platform) {
    return !!LIVE[platform] && !(platform === 'instagram' && ig.status === 'failed');
  }

  function igPostsOf(data) {
    return (data && Array.isArray(data.posts) ? data.posts : []).filter(function (p) {
      return p && /^https:\/\/www\.instagram\.com\/[A-Za-z0-9_.\/\-]+$/.test(String(p.url || ''));
    });
  }
  function short(text, n) {
    var s = String(text || '').replace(/\s+/g, ' ').trim();
    return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s;
  }
  function count(n) {
    try { return Number(n).toLocaleString('es-PR'); } catch (e) { return String(n); }
  }
  /* "hace 3 h", "ayer", "hace 4 días", "12 oct" */
  function ago(iso) {
    var t = Date.parse(iso || '');
    if (!t) return '';
    var s = Math.max(0, (Date.now() - t) / 1000);
    if (s < 3600) return 'hace ' + Math.max(1, Math.round(s / 60)) + ' min';
    if (s < 86400) return 'hace ' + Math.round(s / 3600) + ' h';
    var days = Math.round(s / 86400);
    if (days < 7) return days === 1 ? 'ayer' : 'hace ' + days + ' días';
    var d = new Date(t);
    return d.getDate() + ' ' + MONTHS[d.getMonth()] + (d.getFullYear() !== new Date().getFullYear() ? ' ' + d.getFullYear() : '');
  }

  function igHTML(data) {
    var root = document.body.getAttribute('data-root') || '';
    var acc = data.account || {};
    var user = String(acc.username || LIVE.instagram).replace(/[^A-Za-z0-9_.]/g, '');
    var profile = 'https://www.instagram.com/' + user + '/';
    var posts = igPostsOf(data).slice(0, IG_SHOW);
    var stats = [];
    if (Number(acc.posts) > 0) stats.push(TEXT.igPosts.replace('{n}', count(acc.posts)));
    if (Number(acc.followers) > 0) stats.push(TEXT.igFollowers.replace('{n}', count(acc.followers)));
    var avatar = SAFE_IMG.test(String(acc.avatar || ''))
      ? '<img class="soc-ig-avatar" src="' + esc(acc.avatar) + '" alt="" width="46" height="46" onerror="this.remove()">' : '';
    var tiles = posts.map(function (p) {
      var alt = short(p.caption, 110) || TEXT.igPost;
      var pic = SAFE_IMG.test(String(p.img || ''))
        ? '<img src="' + esc(p.img) + '" alt="' + esc(alt) + '" decoding="async"' +
          ' onerror="this.className=\'soc-ig-blank\';this.onerror=null;this.src=\'' + esc(root + 'images/socials-logo/' + PLATFORMS.instagram.icon) + '\'">'
        : '<img class="soc-ig-blank" src="' + esc(root + 'images/socials-logo/' + PLATFORMS.instagram.icon) + '" alt="' + esc(alt) + '">';
      var badge = p.type === 'CAROUSEL_ALBUM' ? BADGE.album : (p.type === 'VIDEO' || p.reel) ? BADGE.video : '';
      var kind = p.type === 'CAROUSEL_ALBUM' ? TEXT.igAlbum + ': ' : (p.type === 'VIDEO' || p.reel) ? TEXT.igVideo + ': ' : '';
      return '<a class="soc-ig-tile" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer" title="' + esc(kind + alt) + '">' +
        pic + badge + '</a>';
    }).join('');
    var newest = posts[0];
    var latest = newest && (newest.caption || newest.time)
      ? '<a class="soc-ig-latest" href="' + esc(newest.url) + '" target="_blank" rel="noopener noreferrer">' +
          '<span class="soc-ig-when">' + esc(TEXT.igLatest) + (ago(newest.time) ? ' &middot; ' + esc(ago(newest.time)) : '') + '</span>' +
          (newest.caption ? '<span class="soc-ig-cap"><b>' + esc(user) + '</b>' + esc(short(newest.caption, 260)) + '</span>' : '') +
        '</a>'
      : '';
    return '<div class="soc-ig">' +
      '<a class="soc-ig-top" href="' + esc(profile) + '" target="_blank" rel="noopener noreferrer">' + avatar +
        '<span class="soc-ig-who"><b>' + esc(acc.name || user) + '</b>' + (stats.length ? '<span>' + esc(stats.join(' · ')) + '</span>' : '') + '</span>' +
        '<span class="soc-ig-follow">' + esc(TEXT.igFollow) + '</span></a>' +
      '<div class="soc-ig-grid">' + tiles + '</div>' + latest +
    '</div>';
  }

  /* fill (or swap out) the Instagram card(s) in `host` once the feed is in */
  function igApply(host) {
    var cards = host.querySelectorAll('.soc-card-live[data-platform="instagram"]');
    Array.prototype.forEach.call(cards, function (card) {
      if (ig.status === 'ready') {
        card.querySelector('.soc-body').innerHTML = igHTML(ig.data);
        return;
      }
      /* the feed cannot be read: show the newest Instagram post from the Socials writer instead */
      var backup = host._igBackup;
      if (backup) {
        var box = document.createElement('div');
        box.innerHTML = cardHTML(backup);
        card.parentNode.replaceChild(box.firstChild, card);
        boot('instagram', host);
      }
      /* no backup post: the card keeps its "see the posts on Instagram" link */
      else {
        var grid = card.querySelector('.soc-ig-grid');
        if (grid) grid.remove();
        var wrap = card.querySelector('.soc-ig');
        if (wrap) wrap.removeAttribute('aria-busy');
      }
    });
  }

  function igLoad(host) {
    if (ig.status === 'ready' || ig.status === 'failed') { igApply(host); return; }
    if (ig.waiting.indexOf(host) === -1) ig.waiting.push(host);
    if (ig.status === 'loading') return;
    ig.status = 'loading';
    var finish = function (data) {
      ig.data = data;
      ig.status = data && igPostsOf(data).length ? 'ready' : 'failed';
      var queue = ig.waiting;
      ig.waiting = [];
      queue.forEach(igApply);
    };
    if (!window.fetch) { finish(null); return; }
    /* try each source in turn; the first one that answers with posts wins */
    (function next(i) {
      if (i >= IG_SOURCES.length) { finish(null); return; }
      var ctl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 8000);
      fetch(IG_SOURCES[i], { cache: 'no-cache', signal: ctl ? ctl.signal : undefined })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (data) {
          clearTimeout(timer);
          if (igPostsOf(data).length) finish(data); else next(i + 1);
        }, function () { clearTimeout(timer); next(i + 1); });
    })(0);
  }

  /* the live feeds that are switched on, as cards */
  function liveFeeds() {
    return LIVE_ORDER.filter(isLive).map(function (k) {
      return { live: true, platform: k, user: LIVE[k],
        url: k === 'x' ? 'https://x.com/' + LIVE[k]
          : k === 'instagram' ? 'https://www.instagram.com/' + LIVE[k] + '/'
          : 'https://www.tiktok.com/@' + LIVE[k] };
    });
  }

  /* render(element, posts, { limit, lazy })  -> how many cards were drawn.
     The live feeds come first, then the saved posts (minus those of a platform that has a live feed).
     Posts that are not a real, single post link are skipped; the same post twice shows once.
     The newest saved Instagram post is kept aside as the Instagram card's stand-in (see igApply). */
  function render(host, posts, opts) {
    opts = opts || {};
    var list = liveFeeds(), seen = {};
    host._igBackup = null;
    (Array.isArray(posts) ? posts : []).forEach(function (p) {
      var r = parse(p && p.url);           /* the platform comes from the link itself */
      if (!r.ok || seen[r.url]) return;
      seen[r.url] = 1;
      if (r.platform === 'instagram' && !host._igBackup) host._igBackup = r;
      if (!isLive(r.platform)) list.push(r);
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
    live: LIVE,
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
