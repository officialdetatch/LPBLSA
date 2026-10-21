/* Floating "otro Fantasy" bubble.
   A round chat-style button in the bottom-right corner. A few seconds after
   the page loads a little speech bubble pops out of it ("Quieres ver la info
   de otro Fantasy?"). Clicking either one opens a small panel with one tile
   per fantasy, and each tile jumps to that fantasy's landing page.

   WHICH TILES, AND WHERE THEY GO
   There is one tile per league in assets/leagues.js, except the league the
   visitor is already on (a page says which with <body data-league="nba">).
   So the home page offers NFL, NBA and MLB, and the NBA page offers NFL
   and MLB. The tiles always sit side by side in one row, sharing the width.
   A league that is still 'soon' shows a greyed "Pronto" tile.
   A page can still replace the tiles by hand with window.LPBSA_SWITCHER.

   THE LOGOS
   Each tile shows its league's round logo - images/leagues/nfl.png, nba.png
   and mlb.png, set by the  logo  field in assets/leagues.js. To change one,
   replace that picture file (keep the name). If a picture is missing, a built-in
   football / basketball / baseball icon is drawn instead.

   THE COFFEE ROW
   Under the league tiles there is one wide "Invitame un cafe" button that opens
   the Buy Me a Coffee page in a new tab. Its address is the  coffeeUrl  line
   in CONFIG below - paste your page there (https://buymeacoffee.com/yourname).
   While coffeeUrl is empty the row shows a greyed "Pronto" instead of a link,
   so a visitor can never land on a wrong page. Set  coffee: false  to remove
   the row (and put the old wording back in  prompt).

   To open MLB, set its status to 'live' (and give it a home) in
   assets/leagues.js - this bubble follows automatically.

   LEONIDAS (the AI helper)
   Once assets/firebase-config.js has a recaptchaKey, the bubble becomes
   Leonidas: the button shows the lion, the speech bubble says  leoPrompt , and
   the panel opens to his chat (assets/leonidas.js, loaded from here) with the
   league tiles and the coffee button as a small row under it. Without the key
   - or with  leonidas: false  below - the bubble is exactly as before.
   Other pages can open it with  LPBSA_BUBBLE.open()  (the FAQ page does).   */
(function () {
  'use strict';

  var CONFIG = {
    prompt: 'Quieres ver la info de otro Fantasy, o comprarme un café?',
    title: 'Elige tu Fantasy',
    hint: 'La misma liga, otro deporte.',
    coffee: true,           /* false = no coffee row                           */
    coffeeUrl: 'https://buymeacoffee.com/cmramirez.dev',          /* your Buy Me a Coffee page                       */
    coffeeLabel: 'Invitame un café',
    coffeeSub: 'Si te gusta la página, apoya el trabajo',
    delayMs: 2500,          /* how long after load the speech bubble pops out   */
    rememberDismiss: true,  /* true = once closed, the speech bubble stays away */
                            /*        for the rest of that browser visit        */
    tiles: null,            /* null = build them from assets/leagues.js */
    leonidas: true,         /* false = never show Leonidas, even with the key */
    leoPrompt: '¿Preguntas sobre la liga? Pregúntale a Leonidas.',
    leoTitle: 'Leonidas',
    leoSub: 'El león de la liga · te contesta al momento',
    leoOther: 'Otro fantasy'
  };

  var user = window.LPBSA_SWITCHER || {};
  Object.keys(user).forEach(function (k) { CONFIG[k] = user[k]; });

  if (!document.body || document.getElementById('fsRoot')) return;

  /* Leonidas only when the Firebase settings carry the App Check key (see the top of assets/leonidas.js) */
  var FBC = window.LPBSA_FIREBASE || {};
  var LEO = !!(CONFIG.leonidas && FBC.recaptchaKey && FBC.apiKey);
  if (LEO) CONFIG.prompt = CONFIG.leoPrompt;

  var ROOT = document.body.getAttribute('data-root') || '';
  var HERE = document.body.getAttribute('data-league') || '';
  var ICON_FOR = { nfl: 'football', nba: 'basketball', mlb: 'baseball' };   /* by league key */
  if (!CONFIG.tiles) {
    CONFIG.tiles = (window.LPBSA_LEAGUES || []).filter(function (L) { return L.key !== HERE; }).map(function (L) {
      var live = L.status === 'live' && L.home;
      return { key: L.key, label: L.short, sub: L.sport, icon: ICON_FOR[L.key] || 'basketball',
        img: L.logo ? ROOT + L.logo : '',
        href: live ? ROOT + L.home : '', soon: 'Pronto' };
    });
  }

  var DISMISS_KEY = 'lpblsa.switcher.dismissed';
  function getFlag() { try { return !!window.sessionStorage.getItem(DISMISS_KEY); } catch (e) { return false; } }
  function setFlag() { try { window.sessionStorage.setItem(DISMISS_KEY, '1'); } catch (e) { /* private mode: fine */ } }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ---------- built-in icons (drawn in the site's own colours) ---------- */
  var ICONS = {
    basketball:
      '<svg viewBox="0 0 48 48" aria-hidden="true">' +
        '<circle cx="24" cy="24" r="21" fill="var(--gold)" stroke="var(--gold-ink)" stroke-width="2"/>' +
        '<g fill="none" stroke="var(--gold-ink)" stroke-width="2" stroke-linecap="round">' +
          '<path d="M24 3v42M3 24h42"/>' +
          '<path d="M8 9.5c7 5 7 24 0 29"/><path d="M40 9.5c-7 5-7 24 0 29"/>' +
        '</g></svg>',
    baseball:
      '<svg viewBox="0 0 48 48" aria-hidden="true">' +
        '<circle cx="24" cy="24" r="21" fill="var(--white)" stroke="var(--gold)" stroke-width="2"/>' +
        '<g fill="none" stroke-width="2" stroke-linecap="round">' +   /* gold seams and stitches, like the logo */
          '<path stroke="var(--gold-dark)" d="M13 8c5 4 6.500 11 6.500 16S18 36 13 40"/><path stroke="var(--gold-dark)" d="M35 8c-5 4-6.500 11-6.500 16S30 36 35 40"/>' +
          '<path stroke="var(--gold)" d="M14.500 14l3-1.500M16.500 20l3-.8M16.500 28l3 .8M14.500 34l3 1.500M33.500 14l-3-1.500M31.500 20l-3-.8M31.500 28l-3 .8M33.500 34l-3 1.500"/>' +
        '</g></svg>',
    football:
      '<svg viewBox="0 0 48 48" aria-hidden="true">' +
        '<ellipse cx="24" cy="24" rx="21" ry="13" transform="rotate(-35 24 24)" fill="var(--gold)" stroke="var(--gold-ink)" stroke-width="2"/>' +
        '<g fill="none" stroke="var(--gold-ink)" stroke-width="2" stroke-linecap="round">' +
          '<path d="M16.500 31.500l15-15"/>' +
          '<path d="M20 28l2.500 2.500M23 25l2.500 2.500M26 22l2.500 2.500"/>' +
        '</g></svg>'
  };
  var CHAT =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 11.500a8.500 8.500 0 0 1-12.300 7.600L3 21l1.900-5.300A8.500 8.500 0 1 1 21 11.500z"/>' +
    '<circle cx="8.500" cy="11.500" r=".6" fill="currentColor"/><circle cx="12" cy="11.500" r=".6" fill="currentColor"/>' +
    '<circle cx="15.500" cy="11.500" r=".6" fill="currentColor"/></svg>';

  var CUP =
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M9 19h25v9a11 11 0 0 1-11 11h-3A11 11 0 0 1 9 28z" fill="var(--gold)" stroke="var(--gold-ink)"/>' +
    '<path d="M34 22h2.500a5 5 0 0 1 0 10H33" stroke="var(--gold-light)"/>' +
    '<path d="M6 43h31" stroke="var(--gold-light)"/>' +
    '<path d="M16 6c-2 2.500 2 4 0 7M23 6c-2 2.500 2 4 0 7M30 6c-2 2.500 2 4 0 7" stroke="var(--mute)"/></svg>';

  /* ---------- styles ---------- */
  var css = document.createElement('style');
  css.textContent =
    '.fs-root{position:fixed;right:18px;bottom:18px;z-index:900;display:flex;flex-direction:column;align-items:flex-end;gap:12px;' +
      'font-family:var(--font-body);}' +
    '.fs-fab{position:relative;width:62px;height:62px;border-radius:50%;border:2px solid var(--gold-light);cursor:pointer;' +
      'display:flex;align-items:center;justify-content:center;background:var(--gold);color:var(--gold-ink);padding:0;' +
      'box-shadow:0 10px 28px rgba(2,6,18,.6);transition:transform .15s ease;}' +
    '.fs-fab:hover{transform:scale(1.07);}' +
    '.fs-fab:focus-visible{outline:3px solid var(--white);outline-offset:3px;}' +
    '.fs-fab svg{width:30px;height:30px;}' +
    '.fs-fab.nudge::after{content:"";position:absolute;inset:-2px;border-radius:50%;border:2px solid var(--gold-light);' +
      'animation:fsPulse 1.8s ease-out infinite;}' +
    '.fs-dot{position:absolute;top:-2px;right:-2px;width:16px;height:16px;border-radius:50%;background:var(--white);' +
      'border:3px solid var(--navy-950);display:none;}' +
    '.fs-fab.nudge .fs-dot{display:block;}' +
    /* speech bubble */
    '.fs-tip{position:relative;max-width:min(250px,calc(100vw - 110px));padding:13px 34px 13px 16px;cursor:pointer;' +
      'background:var(--white);color:var(--navy-950);border-radius:14px 14px 4px 14px;font-weight:600;font-size:.95rem;' +
      'line-height:1.35;box-shadow:0 12px 32px rgba(2,6,18,.55);animation:fsPop .45s cubic-bezier(.2,.9,.3,1.3) both;}' +
    '.fs-tip[hidden]{display:none;}' +
    '.fs-tip-x{position:absolute;top:4px;right:4px;width:26px;height:26px;border:0;border-radius:50%;background:none;' +
      'color:#5b6788;font-size:1.25rem;line-height:1;cursor:pointer;}' +
    '.fs-tip-x:hover{color:var(--navy-950);background:rgba(10,23,48,.08);}' +
    /* panel */
    '.fs-panel{width:min(480px,calc(100vw - 36px));padding:20px 16px 16px;text-align:center;' +
      'background:linear-gradient(160deg,var(--navy-700),var(--navy-900) 65%);border:1px solid var(--gold);' +
      'border-top:5px solid var(--gold);border-radius:var(--radius);box-shadow:0 24px 70px rgba(0,0,0,.65);' +
      'animation:fsPop .35s cubic-bezier(.2,.9,.3,1.25) both;}' +
    '.fs-panel[hidden]{display:none;}' +
    '.fs-panel h2{font-size:1.45rem;margin:0 26px 4px;text-transform:uppercase;line-height:1.1;}' +
    '.fs-panel p{margin:0 0 16px;color:var(--mute);font-size:.88rem;}' +
    '.fs-x{position:absolute;top:6px;right:8px;width:32px;height:32px;border:0;background:none;color:var(--mute);' +
      'font-size:1.6rem;line-height:1;cursor:pointer;}' +
    '.fs-x:hover{color:var(--white);}' +
    /* the league tiles sit side by side in ONE row, however many there are (3 on the home page,
       2 on a league page); they share the width equally */
    '.fs-tiles{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);gap:10px;}' +
    '.fs-sub{margin-top:-4px;font-size:.7rem;color:var(--mute);letter-spacing:.03em;line-height:1.25;}' +
    '.fs-tile{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 6px 12px;min-width:0;' +
      'text-decoration:none;color:var(--white);background:var(--navy-950);border:1px solid var(--line);' +
      'border-radius:var(--radius);transition:transform .15s ease,border-color .15s ease;}' +
    'a.fs-tile:hover,a.fs-tile:focus-visible{transform:translateY(-3px);border-color:var(--gold);outline:none;}' +
    '.fs-tile.soon{opacity:.72;cursor:default;}' +
    '.fs-ico{width:58px;height:58px;display:flex;align-items:center;justify-content:center;}' +
    '.fs-ico svg,.fs-ico img{width:100%;height:100%;object-fit:contain;}' +
    '.fs-name{font-family:var(--font-display);font-size:1.15rem;letter-spacing:.06em;text-transform:uppercase;line-height:1;}' +
    '.fs-go{font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--gold-light);padding:3px 0;white-space:nowrap;}' +
    '.fs-soon{font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--gold-light);' +
      'border:1px solid var(--gold-dark);border-radius:20px;padding:2px 8px;white-space:nowrap;}' +
    /* keeps "Entrar" / "Pronto" level across the row, even when a sport name takes two lines */
    '.fs-tile .fs-go,.fs-tile .fs-soon{margin-top:auto;line-height:16px;}' +
    /* coffee row */
    '.fs-coffee{display:flex;align-items:center;gap:14px;margin-top:12px;padding:12px 16px;text-align:left;' +
      'text-decoration:none;color:var(--white);background:var(--navy-950);border:1px dashed var(--gold);' +
      'border-radius:var(--radius);transition:transform .15s ease,border-color .15s ease;}' +
    'a.fs-coffee:hover,a.fs-coffee:focus-visible{transform:translateY(-3px);border-style:solid;outline:none;}' +
    '.fs-coffee.soon{opacity:.72;cursor:default;}' +
    '.fs-cup{flex:0 0 44px;width:44px;height:44px;}' +
    '.fs-cup svg{width:100%;height:100%;}' +
    '.fs-ctext{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0;}' +
    '.fs-cname{font-family:var(--font-display);font-size:1.1rem;letter-spacing:.06em;text-transform:uppercase;}' +
    '.fs-csub{font-size:.74rem;color:var(--mute);line-height:1.3;}' +
    /* ---- with Leonidas: lion button, chat on top, the leagues and coffee as one small row ---- */
    '.fs-fab.lion{background:var(--navy-900);border-color:var(--gold);overflow:visible;}' +
    '.fs-fab.lion img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block;}' +
    '.fs-panel.leo{width:min(420px,calc(100vw - 36px));padding:16px 16px 14px;text-align:left;}' +
    '.fs-head{display:flex;align-items:center;gap:12px;margin:0 34px 12px 0;}' +
    '.fs-av{width:48px;height:48px;flex:none;border-radius:50%;border:2px solid var(--gold);background:var(--navy-950);object-fit:cover;}' +
    '.fs-panel.leo .fs-head h2{margin:0;font-size:1.5rem;letter-spacing:.04em;}' +
    '.fs-head small{display:block;font-size:.76rem;color:var(--mute);line-height:1.3;}' +
    '.fs-mini{display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin-top:12px;padding-top:12px;border-top:1px solid var(--line);}' +
    '.fs-mini-label{flex-basis:100%;font-size:.68rem;letter-spacing:.09em;text-transform:uppercase;color:var(--mute);margin-bottom:2px;}' +
    '.fs-mt{display:inline-flex;align-items:center;gap:6px;padding:3px 10px 3px 3px;border-radius:999px;border:1px solid var(--line);' +
      'background:var(--navy-950);color:var(--white);text-decoration:none;font-family:var(--font-display);font-size:.95rem;' +
      'letter-spacing:.05em;line-height:1;transition:border-color .15s ease,transform .15s ease;}' +
    'a.fs-mt:hover,a.fs-mt:focus-visible{border-color:var(--gold);transform:translateY(-2px);outline:none;}' +
    '.fs-mt.soon{opacity:.55;cursor:default;}' +
    '.fs-mt-ico{width:26px;height:26px;display:inline-flex;}.fs-mt-ico img,.fs-mt-ico svg{width:100%;height:100%;object-fit:contain;}' +
    '.fs-mt.cafe{margin-left:auto;border-style:dashed;border-color:var(--gold);}' +
    '@keyframes fsPop{from{opacity:0;transform:translateY(12px) scale(.92);}to{opacity:1;transform:none;}}' +
    '@keyframes fsPulse{0%{transform:scale(1);opacity:.9;}100%{transform:scale(1.55);opacity:0;}}' +
    '@media (prefers-reduced-motion:reduce){.fs-tip,.fs-panel{animation:none;}.fs-fab.nudge::after{animation:none;}' +
      '.fs-fab,.fs-tile,.fs-coffee{transition:none;}}' +
    '@media (max-width:520px){.fs-root{right:12px;bottom:12px;}.fs-fab{width:56px;height:56px;}' +
      /* phones: the panel takes the screen's width and the tiles get compact so all of them still fit in the row */
      '.fs-panel{width:calc(100vw - 24px);padding:18px 10px 10px;}' +
      '.fs-panel h2{font-size:1.3rem;}.fs-panel p{margin-bottom:12px;}' +
      '.fs-tiles{gap:6px;}' +
      '.fs-tile{gap:6px;padding:11px 3px 9px;}' +
      '.fs-ico{width:46px;height:46px;}' +
      '.fs-name{font-size:1rem;}' +
      '.fs-sub{font-size:.62rem;letter-spacing:0;}' +
      '.fs-go{font-size:.62rem;letter-spacing:.05em;}' +
      '.fs-soon{font-size:.58rem;letter-spacing:.05em;padding:2px 6px;}' +
      '.fs-coffee{margin-top:8px;padding:10px 12px;gap:12px;}.fs-cup{flex-basis:38px;width:38px;height:38px;}' +
      '.fs-cname{font-size:1rem;line-height:1.15;}' +
      '.fs-panel.leo{width:calc(100vw - 24px);padding:14px 12px 12px;}' +
      '.fs-mt.cafe{margin-left:0;}}';
  document.head.appendChild(css);

  /* ---------- markup ---------- */
  function tileHTML(t) {
    var art = t.img
      ? '<img src="' + esc(t.img) + '" alt="" onerror="this.outerHTML=window.__fsIcon(\'' + esc(t.icon) + '\')">'
      : (ICONS[t.icon] || '');
    var inner = '<span class="fs-ico">' + art + '</span><span class="fs-name">' + esc(t.label) + '</span>' +
      (t.sub ? '<span class="fs-sub">' + esc(t.sub) + '</span>' : '') +
      (t.href ? '<span class="fs-go">Entrar &rarr;</span>' : '<span class="fs-soon">' + esc(t.soon || 'Próximamente') + '</span>');
    return t.href
      ? '<a class="fs-tile" href="' + esc(t.href) + '" data-fantasy="' + esc(t.key) + '">' + inner + '</a>'
      : '<div class="fs-tile soon" aria-disabled="true" data-fantasy="' + esc(t.key) + '">' + inner + '</div>';
  }
  function coffeeHTML() {
    if (!CONFIG.coffee) return '';
    var inner = '<span class="fs-cup">' + CUP + '</span>' +
      '<span class="fs-ctext"><span class="fs-cname">' + esc(CONFIG.coffeeLabel) + '</span>' +
      '<span class="fs-csub">' + esc(CONFIG.coffeeSub) + '</span></span>' +
      (CONFIG.coffeeUrl ? '<span class="fs-go">&rarr;</span>' : '<span class="fs-soon">Pronto</span>');
    return CONFIG.coffeeUrl
      ? '<a class="fs-coffee" href="' + esc(CONFIG.coffeeUrl) + '" target="_blank" rel="noopener noreferrer" data-coffee="1">' + inner + '</a>'
      : '<div class="fs-coffee soon" aria-disabled="true" data-coffee="1">' + inner + '</div>';
  }
  window.__fsIcon = function (name) { return ICONS[name] || ''; };

  /* the small versions, for the row under Leonidas */
  function miniHTML(t) {
    var art = t.img
      ? '<img src="' + esc(t.img) + '" alt="" onerror="this.outerHTML=window.__fsIcon(\'' + esc(t.icon) + '\')">'
      : (ICONS[t.icon] || '');
    var inner = '<span class="fs-mt-ico">' + art + '</span>' + esc(t.label);
    return t.href
      ? '<a class="fs-mt" href="' + esc(t.href) + '" data-fantasy="' + esc(t.key) + '" title="' + esc(t.sub || t.label) + '">' + inner + '</a>'
      : '<span class="fs-mt soon" aria-disabled="true" data-fantasy="' + esc(t.key) + '" title="' + esc(t.soon || 'Pronto') + '">' + inner + '</span>';
  }
  function miniCoffeeHTML() {
    if (!CONFIG.coffee || !CONFIG.coffeeUrl) return '';
    return '<a class="fs-mt cafe" href="' + esc(CONFIG.coffeeUrl) + '" target="_blank" rel="noopener noreferrer" data-coffee="1" title="' +
      esc(CONFIG.coffeeSub) + '"><span class="fs-mt-ico">' + CUP + '</span>Café</a>';
  }
  var LION = '<img src="' + esc(ROOT + 'images/leonidas.png') + '" alt="" onerror="this.outerHTML=window.__fsChat">';
  window.__fsChat = CHAT;

  var root = document.createElement('div');
  root.className = 'fs-root';
  root.id = 'fsRoot';
  var panelInner = LEO
    ? '<div class="fs-head"><img class="fs-av" src="' + esc(ROOT + 'images/leonidas.png') + '" alt="" onerror="this.remove()">' +
        '<div><h2 id="fsTitle">' + esc(CONFIG.leoTitle) + '</h2><small>' + esc(CONFIG.leoSub) + '</small></div></div>' +
      '<div id="fsLeo"></div>' +
      '<div class="fs-mini"><span class="fs-mini-label">' + esc(CONFIG.leoOther) + '</span>' +
        CONFIG.tiles.map(miniHTML).join('') + miniCoffeeHTML() + '</div>'
    : '<h2 id="fsTitle">' + esc(CONFIG.title) + '</h2>' +
      '<p>' + esc(CONFIG.hint) + '</p>' +
      '<div class="fs-tiles">' + CONFIG.tiles.map(tileHTML).join('') + '</div>' +
      coffeeHTML();
  root.innerHTML =
    '<div class="fs-tip" id="fsTip" hidden role="status">' + esc(CONFIG.prompt) +
      '<button type="button" class="fs-tip-x" id="fsTipX" aria-label="Cerrar">&times;</button></div>' +
    '<div class="fs-panel' + (LEO ? ' leo' : '') + '" id="fsPanel" role="dialog" aria-labelledby="fsTitle" hidden style="position:relative">' +
      '<button type="button" class="fs-x" id="fsX" aria-label="Cerrar">&times;</button>' + panelInner +
    '</div>' +
    '<button type="button" class="fs-fab' + (LEO ? ' lion' : '') + '" id="fsFab" aria-label="' + esc(CONFIG.prompt) + '" aria-expanded="false" aria-controls="fsPanel">' +
      (LEO ? LION : CHAT) + '<span class="fs-dot"></span></button>';
  document.body.appendChild(root);

  var tip = document.getElementById('fsTip');
  var panel = document.getElementById('fsPanel');
  var fab = document.getElementById('fsFab');

  /* Leonidas lives in his own file; load it and let him draw his chat in the panel */
  var leoReady = false, leoQueue = [];
  if (LEO) {
    var tag = document.createElement('script');
    tag.src = ROOT + 'assets/leonidas.js';
    tag.onload = function () {
      if (!window.LPBSA_LEONIDAS) return;
      window.LPBSA_LEONIDAS.mount(document.getElementById('fsLeo'));
      leoReady = true;
      leoQueue.splice(0).forEach(function (f) { f(); });
    };
    document.body.appendChild(tag);
  }
  function whenLeo(f) { if (leoReady) f(); else leoQueue.push(f); }

  function hideTip(remember) {
    tip.hidden = true;
    fab.classList.remove('nudge');
    if (remember && CONFIG.rememberDismiss) setFlag();
  }
  function openPanel() {
    hideTip(true);
    panel.hidden = false;
    fab.setAttribute('aria-expanded', 'true');
    if (LEO) {
      whenLeo(function () {
        window.LPBSA_LEONIDAS.warm();
        /* the keyboard only jumps up by itself on a computer, not on a phone */
        if (window.matchMedia && window.matchMedia('(hover:hover)').matches) window.LPBSA_LEONIDAS.focus();
        else document.getElementById('fsX').focus();
      });
      return;
    }
    var first = panel.querySelector('a.fs-tile') || document.getElementById('fsX');
    if (first && first.focus) first.focus();
  }
  function closePanel(returnFocus) {
    panel.hidden = true;
    fab.setAttribute('aria-expanded', 'false');
    if (returnFocus) fab.focus();
  }

  fab.addEventListener('click', function () { if (panel.hidden) openPanel(); else closePanel(false); });
  tip.addEventListener('click', openPanel);
  document.getElementById('fsTipX').addEventListener('click', function (e) { e.stopPropagation(); hideTip(true); });
  document.getElementById('fsX').addEventListener('click', function () { closePanel(true); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) closePanel(true);
  });
  document.addEventListener('click', function (e) {
    if (!panel.hidden && !root.contains(e.target)) closePanel(false);
  });

  /* for other pages: LPBSA_BUBBLE.open() opens the panel; ask('...') also asks Leonidas */
  window.LPBSA_BUBBLE = {
    leonidas: LEO,
    open: openPanel,
    ask: function (q) { openPanel(); if (LEO) whenLeo(function () { window.LPBSA_LEONIDAS.ask(q); }); }
  };

  /* ---------- the speech bubble pops out after a moment ---------- */
  /* If the signup pop-up is on screen, wait until it is closed so the two
     never fight for attention. */
  function showTip() {
    if (!panel.hidden) return;
    tip.hidden = false;
    fab.classList.add('nudge');
  }
  function whenClear(tries) {
    if (document.getElementById('alertsPopBackdrop') && tries < 240) {
      setTimeout(function () { whenClear(tries + 1); }, 500);
      return;
    }
    showTip();
  }
  if (!(CONFIG.rememberDismiss && getFlag())) {
    setTimeout(function () { whenClear(0); }, CONFIG.delayMs);
  }
})();
