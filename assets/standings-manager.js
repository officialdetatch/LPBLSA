/* ============================================================
   STANDINGS MANAGER  --  private tool, not linked from the public site.
   Loads the current assets/standings-data.js, lets you reorder teams,
   edit every column inline, add a team that is missing, or drop one
   that is no longer in the league, then hands you a finished
   standings-data.js to save over the old one. Nothing here touches
   the live site until you replace that file yourself.
   ============================================================ */
(function () {
  'use strict';

  var DRAFT_KEY = 'lpbsa.standings.draft.v1';
  var NUM_FIELDS = ['w', 'l', 't', 'pf', 'pa'];
  var TEXT_FIELDS = ['pct', 'gb', 'streak', 'playoff'];
  var list = [];

  var els = {
    body: document.getElementById('smBody'),
    output: document.getElementById('smOutput'),
    addPanel: document.getElementById('smAddPanel'),
    addSelect: document.getElementById('smAddSelect'),
    addBtn: document.getElementById('smAddBtn'),
    draftNote: document.getElementById('smDraftNote')
  };
  if (!els.body) return; /* this script only runs on standings-manager.html */

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function toast(msg, bad) {
    var t = document.createElement('div');
    t.className = 'toast' + (bad ? ' err' : '');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('hide'); }, 2400);
    setTimeout(function () { t.remove(); }, 2800);
  }

  function teams() { return window.LEAGUE_TEAMS || []; }
  function findTeam(slug) {
    var all = teams();
    for (var i = 0; i < all.length; i++) { if (all[i].slug === slug) return all[i]; }
    return null;
  }

  function normalise(row) {
    return {
      team: row.team || '',
      w: typeof row.w === 'number' ? row.w : (parseFloat(row.w) || 0),
      l: typeof row.l === 'number' ? row.l : (parseFloat(row.l) || 0),
      t: typeof row.t === 'number' ? row.t : (parseFloat(row.t) || 0),
      pct: row.pct != null ? String(row.pct) : '',
      gb: row.gb != null ? String(row.gb) : '',
      pf: typeof row.pf === 'number' ? row.pf : (parseFloat(row.pf) || 0),
      pa: typeof row.pa === 'number' ? row.pa : (parseFloat(row.pa) || 0),
      streak: row.streak != null ? String(row.streak) : '',
      playoff: row.playoff != null ? String(row.playoff) : ''
    };
  }

  function loadDraft() {
    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) { /* ignore */ }
    return null;
  }
  function saveDraft() {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(list)); } catch (err) { /* ignore */ }
  }

  function medalClass(rank) {
    return rank === 1 ? 'g' : rank === 2 ? 's' : rank === 3 ? 'b' : 'n';
  }
  function flashSaved(el) {
    el.classList.add('field-saved');
    setTimeout(function () { el.classList.remove('field-saved'); }, 700);
  }

  function buildFile() {
    var header = [
      '/* ============================================================',
      '   LEAGUE STANDINGS',
      '   The ORDER of this list is the rank -- the first team is 1st place,',
      '   the last is last place. Reorder, add or edit teams with',
      '   standings-manager.html rather than editing this file by hand.',
      '   Generated with standings-manager.html',
      '   ============================================================ */'
    ].join('\n');
    return header + '\nwindow.LEAGUE_STANDINGS = ' + JSON.stringify(list, null, 2) + ';\n';
  }

  function rowHTML(row, i) {
    var rank = i + 1;
    var t = findTeam(row.team) || { slug: row.team, name: row.team || '(unknown team)' };
    var crestImg = t.crest ? '<img src="' + esc(t.crest) + '" alt="" onerror="this.remove()">' : '';
    var initials = t.initials || String(t.name || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
    function numInput(field, value) {
      return '<input type="number" step="0.1" inputmode="decimal" class="stat-input" data-field="' + field +
        '" data-idx="' + i + '" value="' + esc(value) + '">';
    }
    function textInput(field, value, width) {
      return '<input type="text" class="text-input" style="width:' + width + 'px" data-field="' + field +
        '" data-idx="' + i + '" value="' + esc(value) + '">';
    }
    return '<tr>' +
      '<td><span class="medal ' + medalClass(rank) + '">' + rank + '</span></td>' +
      '<td class="writer-row-actions">' +
        '<button class="btn btn-ghost btn-small" data-up="' + i + '" ' + (i === 0 ? 'disabled' : '') + '>&uarr;</button>' +
        '<button class="btn btn-ghost btn-small" data-down="' + i + '" ' + (i === list.length - 1 ? 'disabled' : '') + '>&darr;</button>' +
      '</td>' +
      '<td><span class="team-link" style="cursor:default"><span class="crest">' + crestImg +
        '<span class="crest-fallback">' + esc(initials) + '</span></span>' +
        '<span class="name">' + esc(t.name) + '</span></span></td>' +
      '<td class="num">' + numInput('w', row.w) + '</td>' +
      '<td class="num">' + numInput('l', row.l) + '</td>' +
      '<td class="num">' + numInput('t', row.t) + '</td>' +
      '<td class="num">' + textInput('pct', row.pct, 56) + '</td>' +
      '<td class="num">' + textInput('gb', row.gb, 56) + '</td>' +
      '<td class="num">' + numInput('pf', row.pf) + '</td>' +
      '<td class="num">' + numInput('pa', row.pa) + '</td>' +
      '<td class="num">' + textInput('streak', row.streak, 56) + '</td>' +
      '<td class="num">' + textInput('playoff', row.playoff, 56) + '</td>' +
      '<td><button class="btn btn-small btn-danger" data-del="' + i + '">Remove</button></td>' +
      '</tr>';
  }

  function renderAddPanel() {
    var used = {};
    list.forEach(function (r) { used[r.team] = true; });
    var missing = teams().filter(function (t) { return !used[t.slug]; });
    if (!missing.length) {
      els.addPanel.classList.add('hidden');
      return;
    }
    els.addPanel.classList.remove('hidden');
    els.addSelect.innerHTML = missing.map(function (t) {
      return '<option value="' + esc(t.slug) + '">' + esc(t.name) + '</option>';
    }).join('');
  }

  function render() {
    els.body.innerHTML = list.length
      ? list.map(rowHTML).join('')
      : '<tr><td colspan="13" class="section-note">No teams in the standings yet. Add one below.</td></tr>';
    renderAddPanel();
    els.output.value = buildFile();
    saveDraft();
  }

  function start() {
    var draft = loadDraft();
    var live = (window.LEAGUE_STANDINGS || []).map(normalise);
    if (draft && draft.length && JSON.stringify(draft) !== JSON.stringify(live)) {
      list = draft.map(normalise);
      els.draftNote.classList.remove('hidden');
    } else {
      list = live;
    }
    render();
  }

  /* ---------- editing a single field in place ---------- */
  function updateField(el) {
    var i = Number(el.getAttribute('data-idx'));
    var field = el.getAttribute('data-field');
    var row = list[i];
    if (!row) return;
    if (NUM_FIELDS.indexOf(field) !== -1) {
      var num = parseFloat(el.value);
      row[field] = isNaN(num) ? 0 : num;
      el.value = row[field];
    } else if (TEXT_FIELDS.indexOf(field) !== -1) {
      row[field] = el.value.trim();
      el.value = row[field];
    } else {
      return;
    }
    saveDraft();
    els.output.value = buildFile();
    flashSaved(el);
  }

  els.body.addEventListener('change', function (ev) {
    var target = ev.target;
    if (target.classList.contains('stat-input') || target.classList.contains('text-input')) {
      updateField(target);
    }
  });
  els.body.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter') return;
    var target = ev.target;
    if (target.classList.contains('stat-input') || target.classList.contains('text-input')) {
      ev.preventDefault();
      target.blur();
    }
  });

  /* ---------- reorder / remove ---------- */
  els.body.addEventListener('click', function (ev) {
    var btn = ev.target.closest('button[data-up],button[data-down],button[data-del]');
    if (!btn) return;
    var i;
    if ((i = btn.getAttribute('data-up')) !== null) {
      i = Number(i);
      if (i > 0) { list.splice(i - 1, 0, list.splice(i, 1)[0]); render(); }
      return;
    }
    if ((i = btn.getAttribute('data-down')) !== null) {
      i = Number(i);
      if (i < list.length - 1) { list.splice(i + 1, 0, list.splice(i, 1)[0]); render(); }
      return;
    }
    if ((i = btn.getAttribute('data-del')) !== null) {
      i = Number(i);
      var row = list[i];
      var t = findTeam(row.team);
      if (!window.confirm('Remove ' + (t ? t.name : row.team) + ' from the standings?')) return;
      list.splice(i, 1);
      render();
    }
  });

  /* ---------- add a missing team ---------- */
  els.addBtn.addEventListener('click', function () {
    var slug = els.addSelect.value;
    if (!slug) return;
    list.push(normalise({ team: slug, w: 0, l: 0, t: 0, pct: '0', gb: '--', pf: 0, pa: 0, streak: '', playoff: '' }));
    render();
    toast('Added to the bottom of the table.');
  });

  /* ---------- download / copy / reset ---------- */
  document.getElementById('smDownload').addEventListener('click', function () {
    var blob = new Blob([buildFile()], { type: 'text/javascript' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'standings-data.js';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast('Downloaded. Move it into assets/ replacing the old one.');
  });

  document.getElementById('smCopy').addEventListener('click', function () {
    var code = buildFile();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(
        function () { toast('Copied. Paste it over assets/standings-data.js'); },
        function () { els.output.select(); toast('Press Ctrl/Cmd + C to copy.'); }
      );
    } else {
      els.output.select();
      toast('Press Ctrl/Cmd + C to copy.');
    }
  });

  document.getElementById('smReset').addEventListener('click', function () {
    if (!window.confirm('Throw away your unsaved changes and reload the standings currently on the site?')) return;
    try { localStorage.removeItem(DRAFT_KEY); } catch (err) { /* ignore */ }
    list = (window.LEAGUE_STANDINGS || []).map(normalise);
    els.draftNote.classList.add('hidden');
    render();
  });

  start();
})();
