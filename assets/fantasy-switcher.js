/* Floating "otro Fantasy" bubble.
   A round chat-style button in the bottom-right corner. A few seconds after
   the page loads a little speech bubble pops out of it ("Quieres ver la info
   de otro Fantasy?"). Clicking either one opens a small panel with one tile
   per fantasy, and each tile jumps to that fantasy's landing page.

   WHICH TILES, AND WHERE THEY GO
   There is one tile per league in assets/leagues.js, except the league the
   visitor is already on (a page says which with <body data-league="nba">).
   So the home page offers NFL, NBA and UCL, and the NBA page offers NFL and
   UCL. A league that is still 'soon' shows a greyed "Pronto" tile.
   A page can still replace the tiles by hand with window.LPBSA_SWITCHER.

   THE LOGOS
   Each tile shows its league's round logo - images/leagues/nfl.png, nba.png and
   ucl.png, set by the  logo  field in assets/leagues.js. To change one, replace
   that picture file (keep the name). If a picture is missing, a built-in
   football / basketball / soccer ball icon is drawn instead.

   To open UCL, set its status to 'live' (and give it a home) in
   assets/leagues.js - this bubble follows automatically.                    */
(function () {
  'use strict';

  var CONFIG = {
    prompt: 'Quieres ver la info de otro Fantasy?',
    title: 'Elige tu Fantasy',
    hint: 'La misma liga, otro deporte.',
    delayMs: 2500,          /* how long after load the speech bubble pops out   */
    rememberDismiss: true,  /* true = once closed, the speech bubble stays away */
                            /*        for the rest of that browser visit        */
    tiles: null             /* null = build them from assets/leagues.js */
  };

  var user = window.LPBSA_SWITCHER || {};
  Object.keys(user).forEach(function (k) { CONFIG[k] = user[k]; });

  if (!document.body || document.getElementById('fsRoot')) return;

  var ROOT = document.body.getAttribute('data-root') || '';
  var HERE = document.body.getAttribute('data-league') || '';
  var ICON_FOR = { Football: 'football', Basketball: 'basketball', Soccer: 'soccer' };
  if (!CONFIG.tiles) {
    CONFIG.tiles = (window.LPBSA_LEAGUES || []).filter(function (L) { return L.key !== HERE; }).map(function (L) {
      var live = L.status === 'live' && L.home;
      return { key: L.key, label: L.short, sub: L.sport, icon: ICON_FOR[L.sport] || 'basketball',
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
    soccer:
      '<svg viewBox="0 0 48 48" aria-hidden="true">' +
        '<circle cx="24" cy="24" r="21" fill="var(--white)" stroke="var(--navy-950)" stroke-width="2"/>' +
        '<path d="M24 14.5l8.5 6.2-3.2 10H18.700l-3.200-10z" fill="var(--navy-950)"/>' +
        '<g fill="none" stroke="var(--navy-950)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M24 14.5V4.200M32.500 20.700l9.700-3.200M29.300 30.700l6 8.300M18.700 30.700l-6 8.300M15.500 20.700l-9.700-3.200"/>' +
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
    '.fs-panel{width:min(372px,calc(100vw - 36px));padding:20px 18px 18px;text-align:center;' +
      'background:linear-gradient(160deg,var(--navy-700),var(--navy-900) 65%);border:1px solid var(--gold);' +
      'border-top:5px solid var(--gold);border-radius:var(--radius);box-shadow:0 24px 70px rgba(0,0,0,.65);' +
      'animation:fsPop .35s cubic-bezier(.2,.9,.3,1.25) both;}' +
    '.fs-panel[hidden]{display:none;}' +
    '.fs-panel h2{font-size:1.45rem;margin:0 26px 4px;text-transform:uppercase;line-height:1.1;}' +
    '.fs-panel p{margin:0 0 16px;color:var(--mute);font-size:.88rem;}' +
    '.fs-x{position:absolute;top:6px;right:8px;width:32px;height:32px;border:0;background:none;color:var(--mute);' +
      'font-size:1.6rem;line-height:1;cursor:pointer;}' +
    '.fs-x:hover{color:var(--white);}' +
    '.fs-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(92px,1fr));gap:10px;}' +
    '.fs-sub{margin-top:-6px;font-size:.72rem;color:var(--mute);letter-spacing:.04em;}' +
    '.fs-tile{position:relative;display:flex;flex-direction:column;align-items:center;gap:10px;padding:16px 8px 14px;' +
      'text-decoration:none;color:var(--white);background:var(--navy-950);border:1px solid var(--line);' +
      'border-radius:var(--radius);transition:transform .15s ease,border-color .15s ease;}' +
    'a.fs-tile:hover,a.fs-tile:focus-visible{transform:translateY(-3px);border-color:var(--gold);outline:none;}' +
    '.fs-tile.soon{opacity:.72;cursor:default;}' +
    '.fs-ico{width:64px;height:64px;display:flex;align-items:center;justify-content:center;}' +
    '.fs-ico svg,.fs-ico img{width:100%;height:100%;object-fit:contain;}' +
    '.fs-name{font-family:var(--font-display);font-size:1.15rem;letter-spacing:.06em;text-transform:uppercase;}' +
    '.fs-go{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold-light);padding:3px 0;}' +
    '.fs-soon{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold-light);' +
      'border:1px solid var(--gold-dark);border-radius:20px;padding:2px 9px;}' +
    '@keyframes fsPop{from{opacity:0;transform:translateY(12px) scale(.92);}to{opacity:1;transform:none;}}' +
    '@keyframes fsPulse{0%{transform:scale(1);opacity:.9;}100%{transform:scale(1.55);opacity:0;}}' +
    '@media (prefers-reduced-motion:reduce){.fs-tip,.fs-panel{animation:none;}.fs-fab.nudge::after{animation:none;}' +
      '.fs-fab,.fs-tile{transition:none;}}' +
    '@media (max-width:520px){.fs-root{right:12px;bottom:12px;}.fs-fab{width:56px;height:56px;}}';
  document.head.appendChild(css);

  /* ---------- markup ---------- */
  function tileHTML(t) {
    var art = t.img
      ? '<img src="' + esc(t.img) + '" alt="" onerror="this.outerHTML=window.__fsIcon(\'' + esc(t.icon) + '\')">'
      : (ICONS[t.icon] || '');
    var inner = '<span class="fs-ico">' + art + '</span><span class="fs-name">' + esc(t.label) + '</span>' +
      (t.sub ? '<span class="fs-sub">' + esc(t.sub) + '</span>' : '') +
      (t.href ? '<span class="fs-go">Entrar &rarr;</span>' : '<span class="fs-soon">' + esc(t.soon || 'Proximamente') + '</span>');
    return t.href
      ? '<a class="fs-tile" href="' + esc(t.href) + '" data-fantasy="' + esc(t.key) + '">' + inner + '</a>'
      : '<div class="fs-tile soon" aria-disabled="true" data-fantasy="' + esc(t.key) + '">' + inner + '</div>';
  }
  window.__fsIcon = function (name) { return ICONS[name] || ''; };

  var root = document.createElement('div');
  root.className = 'fs-root';
  root.id = 'fsRoot';
  root.innerHTML =
    '<div class="fs-tip" id="fsTip" hidden role="status">' + esc(CONFIG.prompt) +
      '<button type="button" class="fs-tip-x" id="fsTipX" aria-label="Cerrar">&times;</button></div>' +
    '<div class="fs-panel" id="fsPanel" role="dialog" aria-labelledby="fsTitle" hidden style="position:relative">' +
      '<button type="button" class="fs-x" id="fsX" aria-label="Cerrar">&times;</button>' +
      '<h2 id="fsTitle">' + esc(CONFIG.title) + '</h2>' +
      '<p>' + esc(CONFIG.hint) + '</p>' +
      '<div class="fs-tiles">' + CONFIG.tiles.map(tileHTML).join('') + '</div>' +
    '</div>' +
    '<button type="button" class="fs-fab" id="fsFab" aria-label="' + esc(CONFIG.prompt) + '" aria-expanded="false" aria-controls="fsPanel">' +
      CHAT + '<span class="fs-dot"></span></button>';
  document.body.appendChild(root);

  var tip = document.getElementById('fsTip');
  var panel = document.getElementById('fsPanel');
  var fab = document.getElementById('fsFab');

  function hideTip(remember) {
    tip.hidden = true;
    fab.classList.remove('nudge');
    if (remember && CONFIG.rememberDismiss) setFlag();
  }
  function openPanel() {
    hideTip(true);
    panel.hidden = false;
    fab.setAttribute('aria-expanded', 'true');
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
