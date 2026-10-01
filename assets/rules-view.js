/* ============================================================
   THE RULES PAGES  --  draws one league's rules into  <div id="rulesPage">.

   Every league has its own rules page in its own folder
   (leagues/nfl/nfl-rules.html, leagues/nba/nba-rules.html ...). Each page
   loads its league's rules file (leagues/<league>/assets/<league>-rules-data.js)
   and this script, and says which league it is with  <body data-league="nfl">.

   The rules come from  window.LPBSA_RULES[<league key>] : a list of sections,
   each holding blocks. The top of nfl-rules-data.js lists the kinds of block.

   Layout: the tiles (facts, positions) run the full width; the scoring lists
   sit two to a row, and a long list flows into two columns inside its card.
   ============================================================ */
(function () {
  'use strict';

  var host = document.getElementById('rulesPage');
  if (!host || !window.LPBSA_findLeague) return;

  var root = document.body.getAttribute('data-root') || '';
  var L = window.LPBSA_findLeague(document.body.getAttribute('data-league'));
  var data = L && window.LPBSA_RULES && window.LPBSA_RULES[L.key];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* +4  /  -2  /  +0.04  (a real minus sign, so it lines up with the plus) */
  function signed(n) {
    if (typeof n !== 'number' || isNaN(n)) return esc(n);
    if (n === 0) return '0';
    return (n < 0 ? '−' : '+') + String(Math.abs(n));
  }
  function tone(n) { return typeof n === 'number' ? (n < 0 ? 'neg' : n > 0 ? 'pos' : '') : ''; }

  /* "Passing Yards (PY)"  ->  the name and the little code chip */
  function splitLabel(label) {
    var m = /^(.*?)\s*\(([^()]+)\)\s*$/.exec(String(label));
    return m && m[1] ? { name: m[1], code: m[2] } : { name: String(label), code: '' };
  }
  function cellHTML(v) {
    return v === 'N/A' ? '<span class="rules-na">N/A</span>' : esc(v);
  }
  function subhead(b) { return b.title ? '<h4 class="rules-subhead">' + esc(b.title) + '</h4>' : ''; }

  /* ---------- the kinds of block ---------- */

  /* label + value, as a row of big tiles */
  function factsHTML(b) {
    return subhead(b) + '<div class="rules-tiles">' + b.rows.map(function (r) {
      return '<div class="rules-tile"><span>' + esc(r[0]) + '</span><b>' + cellHTML(r[1]) + '</b></div>';
    }).join('') + '</div>';
  }

  /* one tile per position: code, name, how many start, the most you may hold */
  function lineupHTML(b) {
    var c = b.columns || ['', 'Starters', 'Maximums'];
    return subhead(b) + '<div class="rules-lineup">' + b.rows.map(function (r) {
      var l = splitLabel(r[0]);
      return '<div class="rules-pos"><b>' + esc(l.code || l.name) + '</b>' +
        (l.code ? '<span class="rules-pos-name">' + esc(l.name) + '</span>' : '') +
        '<dl><div><dt>' + esc(c[1]) + '</dt><dd>' + cellHTML(r[1]) + '</dd></div>' +
        '<div><dt>' + esc(c[2]) + '</dt><dd>' + cellHTML(r[2]) + '</dd></div></dl></div>';
    }).join('') + '</div>';
  }

  function tableHTML(b) {
    var head = '<thead><tr>' + b.columns.map(function (c, i) {
      return '<th scope="col"' + (i ? ' class="num"' : '') + '>' + esc(c) + '</th>';
    }).join('') + '</tr></thead>';
    var body = '<tbody>' + b.rows.map(function (r) {
      return '<tr>' + r.map(function (v, i) {
        return i ? '<td class="num">' + cellHTML(v) + '</td>' : '<th scope="row">' + esc(v) + '</th>';
      }).join('') + '</tr>';
    }).join('') + '</tbody>';
    var foot = b.foot ? '<tfoot><tr>' + b.foot.map(function (v, i) {
      return i ? '<td class="num">' + esc(v) + '</td>' : '<th scope="row">' + esc(v) + '</th>';
    }).join('') + '</tr></tfoot>' : '';
    return '<table class="rules-table">' + head + body + foot + '</table>' +
      (b.after ? '<p class="rules-after">' + esc(b.after) + '</p>' : '');
  }

  /* scoring: a list, name + code on the left, points on the right */
  function pointsHTML(b) {
    return '<ul class="rules-list">' + b.rows.map(function (r) {
      var l = splitLabel(r[0]);
      return '<li><span class="rules-lab">' + esc(l.name) +
        (l.code ? ' <span class="rules-code">' + esc(l.code) + '</span>' : '') + '</span>' +
        '<span class="pts ' + tone(r[1]) + '">' + signed(r[1]) + '</span></li>';
    }).join('') + '</ul>';
  }

  function statHTML(b) {
    return '<div class="rules-stat">' +
      (b.label ? '<span class="rules-stat-label">' + esc(b.label) + '</span>' : '') +
      '<b>' + esc(b.value) + '</b>' +
      (b.note ? '<span class="rules-stat-note">' + esc(b.note) + '</span>' : '') + '</div>';
  }

  function textHTML(b) {
    return '<div class="rules-text">' + b.paras.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>';
  }

  var RENDER = { facts: factsHTML, lineup: lineupHTML, table: tableHTML, points: pointsHTML, stat: statHTML, text: textHTML };
  var BARE = { facts: 1, lineup: 1 };            /* drawn as tiles, no card around them */
  var LONG = 9;                                  /* a list this long goes two columns wide */

  function isWide(b) {
    return !!BARE[b.type] || (b.type === 'points' && b.rows.length >= LONG);
  }

  /* One section's cards. Two cards to a row; a card that would sit alone in a row stretches across it. */
  function gridHTML(blocks) {
    var wide = blocks.map(isWide);
    var col = 0;
    for (var i = 0; i < blocks.length; i++) {
      if (wide[i]) { col = 0; continue; }
      var alone = col === 0 && (i === blocks.length - 1 || wide[i + 1]);
      if (alone) { wide[i] = true; col = 0; } else { col = (col + 1) % 2; }
    }
    return '<div class="rules-grid">' + blocks.map(function (b, i) {
      var fn = RENDER[b.type];
      if (!fn) return '';
      if (BARE[b.type]) return '<div class="rules-bare">' + fn(b) + '</div>';
      var long = b.type === 'points' && b.rows.length >= LONG;
      return '<div class="rules-card' + (wide[i] ? ' wide' : '') + (long ? ' long' : '') +
        (b.type === 'text' ? ' is-text' : '') + '">' +
        (b.title ? '<h4>' + esc(b.title) + '</h4>' : '') + fn(b) + '</div>';
    }).join('') + '</div>';
  }

  function sectionId(s) { return 'rules-' + s.id; }

  if (!data || !data.sections) {
    host.innerHTML = '<div class="rules-soon"><b>Pronto</b><span>Las reglas de ' + esc(L ? L.short : '') +
      ' se publican aqui muy pronto.</span></div>';
    return;
  }

  var secs = data.sections;
  var logo = L.logo
    ? '<img class="rules-head-logo" src="' + esc(root + L.logo) + '" alt="" width="46" height="46" onerror="this.remove()">'
    : '';
  var jump = secs.length > 1
    ? '<nav class="rules-jump" aria-label="Secciones de las reglas"><span class="rules-jump-label">Secciones</span>' +
      secs.map(function (s) {
        return '<a class="chip" href="#' + esc(sectionId(s)) + '">' + esc(s.title) + '</a>';
      }).join('') + '</nav>'
    : '';

  host.innerHTML =
    '<div class="rules-head">' + logo + '<div><h2>' + esc(L.name) + '</h2>' +
      '<span class="section-note">' + esc(L.sport) + ' &middot; ' + esc(data.title || '') + '</span></div></div>' + jump +
    secs.map(function (s) {
      return '<section class="rules-section" id="' + esc(sectionId(s)) + '"><h3>' + esc(s.title) + '</h3>' +
        gridHTML(s.blocks || []) + '</section>';
    }).join('');

  /* the section link in the address was there before the content was, so go to it now */
  if (location.hash.length > 1) {
    var target = null;
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) { /* bad address */ }
    if (target) target.scrollIntoView();
  }
})();
