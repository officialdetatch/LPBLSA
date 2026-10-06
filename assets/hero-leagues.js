/* ============================================================
   HOME HERO LEAGUE TILES  --  one tile per league, from assets/leagues.js.
   A live league is a tile that links to its landing page and shows who is
   leading its table right now (read from that league's standings data, so it
   updates by itself whenever the standings manager saves a new table).
   A league that is still 'soon' is a greyed tile that does nothing.
   Fills  <nav id="heroLeagues"></nav>.

   Optional field in assets/leagues.js:
     tagline   the line shown under a live league that has no table yet
               (default: "La tabla sale al arrancar la temporada")
   ============================================================ */
(function () {
  'use strict';
  var host = document.getElementById('heroLeagues');
  if (!host || !window.LPBSA_LEAGUES) return;
  var root = document.body.getAttribute('data-root') || '';
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  var arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function teamOf(L, slug) {
    var list = window.LPBSA_teamsOf ? window.LPBSA_teamsOf(L.key) : [];
    for (var i = 0; i < list.length; i++) { if (list[i].slug === slug) return list[i]; }
    return null;
  }

  /* "[crown] [crest] Mugiwaras De Caimito  2-0"  (the crown reads "Líder" to screen readers) */
  function leaderHTML(L) {
    var rows = (window.LPBSA_STANDINGS && window.LPBSA_STANDINGS[L.key]) || [];
    if (!rows.length) {
      return '<span>' + esc(L.tagline || 'La tabla sale al arrancar la temporada') + '</span>';
    }
    var top = rows[0];
    var t = teamOf(L, top.team) || { name: top.name || top.team };
    var initials = t.initials || String(t.name || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
    var crest = '';
    if (t.crest) {
      var path = /^(https?:)?\/\//i.test(t.crest) || t.crest.charAt(0) === '/' ? t.crest : root + (L.assetRoot || '') + t.crest;
      crest = '<span class="crest' + (t.shape === 'circle' ? ' crest-circle' : '') + '">' +
        '<img src="' + esc(path) + '" alt="" onerror="this.remove()"><span class="crest-fallback">' + esc(initials) + '</span></span>';
    }
    var record = [top.w, top.l].concat(L.noTies || !Number(top.t) ? [] : [top.t]).join('-');
    return '<svg class="crown" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Líder"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5L3 7z"/></svg>' +
      crest + '<b>' + esc(t.name) + '</b><span class="rec">' + esc(record) + '</span>';
  }

  host.innerHTML = window.LPBSA_LEAGUES.map(function (L) {
    var logo = L.logo
      ? '<img class="league-tile-logo" src="' + esc(root + L.logo) + '" alt="" width="56" height="56" onerror="this.style.visibility=\'hidden\'">'
      : '<span class="league-tile-logo" aria-hidden="true"></span>';
    if (L.status === 'live' && L.home) {
      return '<a class="league-tile" href="' + esc(root + L.home) + '">' + logo +
        '<span class="league-tile-body"><span class="league-tile-name">' + esc(L.name) + '</span>' +
        '<span class="league-tile-meta">' + leaderHTML(L) + '</span></span>' +
        '<span class="league-tile-go" aria-hidden="true">' + arrow + '</span></a>';
    }
    return '<div class="league-tile is-soon" aria-disabled="true">' + logo +
      '<span class="league-tile-body"><span class="league-tile-name">' + esc(L.name) + '</span>' +
      '<span class="league-tile-meta"><span>' + esc(L.soonText || L.sport) + '</span></span></span>' +
      '<span class="league-tile-soon">Pronto</span></div>';
  }).join('');
})();

/* ============================================================
   EL ESCUDO  --  tap the big crest on the home page.
   Every tap spins it and says something. Every 7th tap turns on
   "modo comisionado" (a little gold confetti). Nobody is told this
   exists - that's the point. Change the lines in LINES freely.
   ============================================================ */
(function () {
  'use strict';
  var crest = document.querySelector('.hero-crest');
  var img = crest && crest.querySelector('img');
  if (!crest || !img) return;

  var LINES = [
    'Tocar el escudo no te da puntos. Revisa tu lineup.',
    'El comisionado vio eso.',
    'Respeta el escudo. Esta es la liga más dura de Fantasy.',
    '¿Aburrido? El waiver wire te está esperando.',
    'Ese escudo vale más que tu banca.',
    'Sigue tocando y te mandamos al IR.',
    'Acho, ¿no tienes un lineup que arreglar?'
  ];
  var BOSS = '👑 Modo comisionado activado. Ahora sí eres de la liga más dura.';
  var taps = 0, toast = null, hideTimer = null;
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function say(text) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast toast-sass hide';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    requestAnimationFrame(function () { toast.classList.remove('hide'); });
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () { toast.classList.add('hide'); }, 2800);
  }
  function confetti() {
    if (still) return;
    var box = crest.getBoundingClientRect();
    var x = box.left + box.width / 2, y = box.top + box.height / 2;
    for (var i = 0; i < 34; i++) {
      var c = document.createElement('span');
      c.className = 'confetti';
      var a = Math.random() * Math.PI * 2, r = 140 + Math.random() * 260;
      c.style.left = x + 'px';
      c.style.top = y + 'px';
      c.style.setProperty('--dx', Math.round(Math.cos(a) * r) + 'px');
      c.style.setProperty('--dy', Math.round(Math.sin(a) * r + 120) + 'px');
      c.style.setProperty('--rot', Math.round(Math.random() * 720 - 360) + 'deg');
      c.style.animationDelay = Math.round(Math.random() * 120) + 'ms';
      document.body.appendChild(c);
      setTimeout(function (el) { el.remove(); }, 1800, c);
    }
  }
  crest.addEventListener('click', function () {
    taps++;
    if (!still) {
      img.classList.remove('is-spinning');
      void img.offsetWidth; /* restart the spin on every tap */
      img.classList.add('is-spinning');
    }
    if (taps % 7 === 0) { say(BOSS); confetti(); }
    else say(LINES[(taps - 1) % LINES.length]);
  });
  img.addEventListener('animationend', function () { img.classList.remove('is-spinning'); });
})();
