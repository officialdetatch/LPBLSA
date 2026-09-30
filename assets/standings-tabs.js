/* ============================================================
   STANDINGS ON THE HOME PAGE  --  one "Standings" section with a tab per
   league (NFL / NBA / UCL ...), each showing that league's own table.

   Leagues come from assets/leagues.js; their tables come from
   LPBSA_STANDINGS (each league's <league>-standings-data.js, filed by league).
   A league that is still 'soon' gets a greyed tab that does nothing.
   Fills  <div id="standingsTabs"></div>.
   ============================================================ */
(function () {
  'use strict';

  var host = document.getElementById('standingsTabs');
  if (!host || !window.LPBSA_LEAGUES || !window.LPBSA_standingsRowsHTML) return;

  var root = document.body.getAttribute('data-root') || '';
  var leagues = window.LPBSA_LEAGUES;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function rowsOf(L) { return (window.LPBSA_STANDINGS && window.LPBSA_STANDINGS[L.key]) || []; }

  function panelHTML(L) {
    var rows = rowsOf(L);
    var ctx = {
      teams: window.LPBSA_teamsOf(L.key),
      assetBase: root + L.assetRoot,
      linked: !!L.teamPages,
      teamBase: root + L.teamPages,
      noTies: !!L.noTies
    };
    var cols = L.noTies ? 10 : 11;
    var body = rows.length
      ? window.LPBSA_standingsRowsHTML(rows, ctx)
      : '<tr><td colspan="' + cols + '" class="section-note">' +
        (L.key === 'nba' ? 'Los equipos y la tabla se publican cuando arranque la temporada.' : 'Todavia no hay tabla de posiciones.') +
        '</td></tr>';
    return '<div class="standings-panel" id="standings-' + esc(L.key) + '" role="tabpanel" hidden>' +
      '<p class="section-note standings-sub">' + esc(L.name) + ' &middot; El podio de los ganadores &middot; ' +
        '<a href="' + esc(root + L.home) + '">Ver la liga &rarr;</a></p>' +
      '<div class="table-scroll"><table class="standings-table"><thead><tr>' +
        '<th>RK</th><th>Team</th><th class="num">W</th><th class="num">L</th>' +
        (L.noTies ? '' : '<th class="num">T</th>') +
        '<th class="num">PCT</th><th class="num">GB</th><th class="num">PF</th><th class="num">PA</th>' +
        '<th class="num">Streak</th><th class="num">Playoff</th></tr></thead>' +
      '<tbody>' + body + '</tbody></table></div></div>';
  }

  var live = leagues.filter(function (L) { return L.status === 'live' && L.home; });
  if (!live.length) return;

  var tabs = leagues.map(function (L) {
    if (!(L.status === 'live' && L.home)) {
      return '<button type="button" class="chip standings-tab soon" disabled title="' + esc(L.name) + ' - pronto">' +
        esc(L.short) + ' <small>Pronto</small></button>';
    }
    return '<button type="button" class="chip standings-tab" role="tab" data-league="' + esc(L.key) + '">' + esc(L.short) + '</button>';
  }).join('');

  host.innerHTML = '<div class="chip-row standings-tabs" role="tablist" aria-label="Standings por liga">' + tabs + '</div>' +
    live.map(panelHTML).join('');

  function show(key) {
    Array.prototype.forEach.call(host.querySelectorAll('.standings-tab[data-league]'), function (b) {
      var on = b.getAttribute('data-league') === key;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    Array.prototype.forEach.call(host.querySelectorAll('.standings-panel'), function (p) {
      p.hidden = p.id !== 'standings-' + key;
    });
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('.standings-tab[data-league]');
    if (b) show(b.getAttribute('data-league'));
  });

  /* open on the first league that has a table, else the first live one */
  var first = live.filter(function (L) { return rowsOf(L).length; })[0] || live[0];
  show(first.key);
})();
