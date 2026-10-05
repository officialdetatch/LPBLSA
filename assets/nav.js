/* ============================================================
   THE NAVBAR  --  one menu for every page, so a change here changes
   the whole site. Each page has an empty <nav id="siteNav"> and this
   fills it in.

   A page tells it where it is with attributes on <body>:
     data-root    how far up the site root is   ("" , "../" or "../../")
     data-active  which tab to light up:  home  about  reglas  news  leagues
                  playoffs  teams  contact  tienda   (leave off for the private tools)
     data-league  on a league's own pages: nfl / nba / ucl - lights up
                  that league inside the Leagues menu

   The Reglas, Leagues and Playoffs menus are all built from assets/leagues.js
   (its home / rules / playoffs fields). A league that is still 'soon' - or has no
   page of that kind yet - shows greyed out and does nothing when clicked.
   ============================================================ */
(function () {
  'use strict';

  var nav = document.getElementById('siteNav');
  if (!nav) return;

  var body = document.body;
  var root = body.getAttribute('data-root') || '';
  var active = body.getAttribute('data-active') || '';
  var current = body.getAttribute('data-league') || '';
  var leagues = window.LPBSA_LEAGUES || [];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function link(key, label, href) {
    return '<a href="' + esc(root + href) + '" data-nav="' + key + '"' +
      (active === key ? ' class="active" aria-current="page"' : '') + '>' + esc(label) + '</a>';
  }

  var chevron = '<svg class="nav-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  /* One hover menu. `field` is the league field it links to (home / rules / playoffs);
     a league that is still 'soon', or has no page of that kind yet, shows greyed out. */
  function dropdown(key, label, field) {
    var items = leagues.map(function (L) {
      if (L.status !== 'live' || !L[field]) {
        return '<li><span class="nav-soon" tabindex="0" role="link" aria-disabled="true">' +
          '<b>' + esc(L.short) + '</b><span>' + esc(L.name) + ' &middot; Pronto</span></span></li>';
      }
      var here = key === 'leagues'
        ? (current === L.key && active !== 'reglas' && active !== 'playoffs')
        : (active === key && current === L.key);
      return '<li><a href="' + esc(root + L[field]) + '"' + (here ? ' class="active" aria-current="page"' : '') + '>' +
        '<b>' + esc(L.short) + '</b><span>' + esc(L.sport) + '</span></a></li>';
    }).join('');
    return '<div class="nav-drop" data-drop="' + key + '">' +
      '<button type="button" class="nav-drop-btn' + (active === key ? ' active' : '') + '" ' +
        'aria-haspopup="true" aria-expanded="false" aria-controls="navDropMenu-' + key + '">' + esc(label) + ' ' + chevron + '</button>' +
      '<ul class="nav-drop-menu" id="navDropMenu-' + key + '">' + items + '</ul>' +
    '</div>';
  }

  nav.innerHTML =
    link('home', 'Home', 'index.html') +
    link('about', 'About', 'about.html') +
    dropdown('reglas', 'Reglas', 'rules') +
    link('news', 'News', 'news.html') +
    dropdown('leagues', 'Leagues', 'home') +
    dropdown('playoffs', 'Playoffs', 'playoffs') +
    link('teams', 'Teams', 'teams.html') +
    link('contact', 'Contact', 'contact.html') +
    link('tienda', 'Tienda', 'tienda.html');

  /* ---------- open / close the menus (hover on a computer, tap on a phone) ---------- */
  var drops = Array.prototype.slice.call(nav.querySelectorAll('.nav-drop'));
  function setOpen(drop, open) {
    drop.classList.toggle('open', open);
    drop.querySelector('.nav-drop-btn').setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeAll(except) {
    drops.forEach(function (d) { if (d !== except) setOpen(d, false); });
  }
  drops.forEach(function (drop) {
    var btn = drop.querySelector('.nav-drop-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !drop.classList.contains('open');
      closeAll(drop);
      setOpen(drop, open);
    });
    /* a league that is not open yet does nothing - not even a jump to the top of the page */
    drop.addEventListener('click', function (e) {
      if (e.target.closest('.nav-soon')) e.preventDefault();
    });
  });
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) closeAll(null);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openOne = drops.filter(function (d) { return d.classList.contains('open'); })[0];
    if (openOne) { closeAll(null); openOne.querySelector('.nav-drop-btn').focus(); }
  });
})();
