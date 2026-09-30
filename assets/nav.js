/* ============================================================
   THE NAVBAR  --  one menu for every page, so a change here changes
   the whole site. Each page has an empty <nav id="siteNav"> and this
   fills it in.

   A page tells it where it is with attributes on <body>:
     data-root    how far up the site root is   ("" , "../" or "../../")
     data-active  which tab to light up:  home  about  news  leagues
                  teams  contact   (leave off for the private tools)
     data-league  on a league's own pages: nfl / nba / ucl - lights up
                  that league inside the Leagues menu

   The Leagues menu is built from assets/leagues.js. A league that is
   still 'soon' shows greyed out and does nothing when clicked.
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

  var menu = leagues.map(function (L) {
    if (L.status !== 'live' || !L.home) {
      return '<li><span class="nav-soon" tabindex="0" role="link" aria-disabled="true">' +
        '<b>' + esc(L.short) + '</b><span>' + esc(L.name) + ' &middot; Pronto</span></span></li>';
    }
    return '<li><a href="' + esc(root + L.home) + '"' + (current === L.key ? ' class="active" aria-current="page"' : '') + '>' +
      '<b>' + esc(L.short) + '</b><span>' + esc(L.sport) + '</span></a></li>';
  }).join('');

  nav.innerHTML =
    link('home', 'Home', 'index.html') +
    link('about', 'About', 'about.html') +
    link('news', 'News', 'news.html') +
    '<div class="nav-drop" id="navDrop">' +
      '<button type="button" class="nav-drop-btn' + (active === 'leagues' ? ' active' : '') + '" id="navDropBtn" ' +
        'aria-haspopup="true" aria-expanded="false" aria-controls="navDropMenu">Leagues ' + chevron + '</button>' +
      '<ul class="nav-drop-menu" id="navDropMenu">' + menu + '</ul>' +
    '</div>' +
    link('teams', 'Teams', 'teams.html') +
    link('contact', 'Contact', 'contact.html');

  /* ---------- open / close the Leagues menu ---------- */
  var drop = document.getElementById('navDrop');
  var btn = document.getElementById('navDropBtn');
  function setOpen(open) {
    drop.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!drop.classList.contains('open')); });
  document.addEventListener('click', function (e) { if (!drop.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drop.classList.contains('open')) { setOpen(false); btn.focus(); }
  });
  /* UCL (and anything else that is 'soon') does nothing - not even a jump to the top of the page. */
  drop.addEventListener('click', function (e) {
    if (e.target.closest('.nav-soon')) e.preventDefault();
  });
})();
