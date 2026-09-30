/* ============================================================
   HOME HERO BUTTONS  --  one button per league, from assets/leagues.js.
   A live league is a solid button to its landing page; a league that is
   still 'soon' is a greyed button that does nothing.
   Fills  <div id="heroLeagues"></div>.
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
  host.innerHTML = window.LPBSA_LEAGUES.map(function (L) {
    if (L.status === 'live' && L.home) {
      return '<a class="btn btn-solid" href="' + esc(root + L.home) + '">' + esc(L.short) + ' &middot; ' + esc(L.sport) + '</a>';
    }
    return '<span class="btn btn-ghost" aria-disabled="true">' + esc(L.short) + ' &middot; Pronto</span>';
  }).join('');
})();
