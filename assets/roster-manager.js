/* ============================================================
   ROSTER MANAGER  --  private tool, not linked from the public site.
   Search any player, then draft them from free agency, drop them
   back, start them, bench them, IR them, or trade them to another
   team. When you are done, download a finished roster-data.js and
   save it over the old one.
   ============================================================ */
(function () {
  'use strict';

  var DRAFT_KEY = 'lpbsa.roster.draft.v1';
  var TEAMS = window.LEAGUE_TEAMS || [];
  var SLOTS = window.STARTER_SLOTS || [];
  var state = null; /* { rosters: {...}, freeAgents: [...] } */
  var filterTeam = 'ALL';

  var els = {
    search: document.getElementById('rmSearch'),
    chips: document.getElementById('rmChips'),
    body: document.getElementById('rmBody'),
    count: document.getElementById('rmCount'),
    snapshot: document.getElementById('rmSnapshot'),
    output: document.getElementById('rmOutput'),
    draftNote: document.getElementById('rmDraftNote')
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function fmtNum(v) {
    if (v === null || v === undefined || v === '') return '--';
    return (typeof v === 'number') ? (Math.round(v * 10) / 10).toString() : String(v);
  }
  function teamName(slug) {
    var t = TEAMS.filter(function (x) { return x.slug === slug; })[0];
    return t ? t.name : slug;
  }
  function toast(msg, bad) {
    var t = document.createElement('div');
    t.className = 'toast' + (bad ? ' err' : '');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('hide'); }, 2600);
    setTimeout(function () { t.remove(); }, 3000);
  }

  function liveSnapshot() {
    var rosters = {};
    TEAMS.forEach(function (t) {
      var r = (window.LEAGUE_ROSTERS || {})[t.slug] || { starters: [], bench: [], ir: [] };
      rosters[t.slug] = {
        starters: r.starters.slice(),
        bench: r.bench.slice(),
        ir: r.ir.slice()
      };
    });
    return { rosters: rosters, freeAgents: (window.FREE_AGENTS || []).slice() };
  }

  function loadDraft() {
    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) { return null; }
  }
  function saveDraft() {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(state)); } catch (err) { /* ignore */ }
  }

  function start() {
    var live = liveSnapshot();
    var draft = loadDraft();
    if (draft && JSON.stringify(draft) !== JSON.stringify(live)) {
      state = draft;
      els.draftNote.classList.remove('hidden');
    } else {
      state = live;
    }
    renderChips();
    renderAll();
  }

  /* ---------- reading and moving players ---------- */
  function getPlayerAtLoc(loc) {
    if (loc.type === 'fa') return state.freeAgents[loc.idx];
    return state.rosters[loc.team][loc.section][loc.idx];
  }
  function removeAtLoc(loc) {
    if (loc.type === 'fa') return state.freeAgents.splice(loc.idx, 1)[0];
    var arr = state.rosters[loc.team][loc.section];
    if (loc.section === 'starters') {
      var p = arr[loc.idx];
      arr[loc.idx] = null;
      return p;
    }
    return arr.splice(loc.idx, 1)[0];
  }

  function applyAction(loc, action) {
    var player = getPlayerAtLoc(loc);
    if (!player) return;

    if (action === 'drop') {
      if (!window.confirm('Drop ' + player.name + ' to free agents?')) return;
      removeAtLoc(loc);
      state.freeAgents.unshift(player);
      toast(player.name + ' dropped to free agents.');
    } else if (action.indexOf('add:') === 0) {
      var addTeam = action.slice(4);
      removeAtLoc(loc);
      state.rosters[addTeam].bench.push(player);
      toast(player.name + ' added to ' + teamName(addTeam) + ' (Bench).');
    } else if (action === 'bench') {
      removeAtLoc(loc);
      state.rosters[loc.team].bench.push(player);
      toast(player.name + ' moved to bench.');
    } else if (action === 'ir') {
      removeAtLoc(loc);
      state.rosters[loc.team].ir.push(player);
      toast(player.name + ' moved to injured reserve.');
    } else if (action.indexOf('start:') === 0) {
      var idx = Number(action.slice(6));
      var team = loc.team;
      var displaced = state.rosters[team].starters[idx];
      removeAtLoc(loc);
      state.rosters[team].starters[idx] = player;
      if (displaced) state.rosters[team].bench.push(displaced);
      toast(player.name + ' is starting at ' + SLOTS[idx] +
        (displaced ? '. ' + displaced.name + ' moved to bench.' : '.'));
    } else if (action.indexOf('trade:') === 0) {
      var dest = action.slice(6);
      if (!window.confirm('Move ' + player.name + ' to ' + teamName(dest) + '?')) return;
      removeAtLoc(loc);
      state.rosters[dest].bench.push(player);
      toast(player.name + ' moved to ' + teamName(dest) + ' (Bench).');
    } else {
      return;
    }
    saveDraft();
    renderAll();
  }

  /* ---------- listing + filtering ---------- */
  function allEntries() {
    var out = [];
    state.freeAgents.forEach(function (p, i) {
      out.push({ player: p, loc: { type: 'fa', idx: i } });
    });
    TEAMS.forEach(function (t) {
      ['starters', 'bench', 'ir'].forEach(function (section) {
        (state.rosters[t.slug][section] || []).forEach(function (p, i) {
          if (!p) return;
          out.push({ player: p, loc: { type: 'roster', team: t.slug, section: section, idx: i } });
        });
      });
    });
    return out;
  }

  function locLabel(loc) {
    if (loc.type === 'fa') return '<span class="loc-pill loc-fa">Free agent</span>';
    var name = teamName(loc.team);
    if (loc.section === 'starters') {
      return '<span class="loc-pill loc-start">' + esc(name) + ' &middot; ' + esc(SLOTS[loc.idx]) + '</span>';
    }
    if (loc.section === 'bench') return '<span class="loc-pill loc-bench">' + esc(name) + ' &middot; Bench</span>';
    return '<span class="loc-pill loc-ir">' + esc(name) + ' &middot; IR</span>';
  }

  function actionOptionsHTML(loc) {
    var opts = ['<option value="">Choose action&hellip;</option>'];
    if (loc.type === 'fa') {
      TEAMS.forEach(function (t) {
        opts.push('<option value="add:' + t.slug + '">Add to ' + esc(t.name) + ' (Bench)</option>');
      });
      return opts.join('');
    }
    var team = loc.team, section = loc.section;
    opts.push('<option value="drop">Drop to free agents</option>');
    if (section !== 'bench') opts.push('<option value="bench">Move to bench</option>');
    if (section !== 'ir') opts.push('<option value="ir">Move to injured reserve</option>');
    SLOTS.forEach(function (label, idx) {
      if (section === 'starters' && loc.idx === idx) return;
      var occ = state.rosters[team].starters[idx];
      opts.push('<option value="start:' + idx + '">Start at ' + esc(label) +
        ' (currently: ' + esc(occ ? occ.name : 'empty') + ')</option>');
    });
    TEAMS.forEach(function (t) {
      if (t.slug === team) return;
      opts.push('<option value="trade:' + t.slug + '">Trade to ' + esc(t.name) + ' (Bench)</option>');
    });
    return opts.join('');
  }

  function rowHTML(entry) {
    var p = entry.player, loc = entry.loc;
    var status = p.status ? '<span class="player-status">' + esc(p.status) + '</span>' : '';
    return '<tr>' +
      '<td><span class="player-cell"><span class="player-avatar">' + esc(p.pos || '?') + '</span>' +
      '<span><span class="player-name">' + esc(p.name) + '</span>' + status +
      '<span class="nfl-tag">' + esc(p.team_abbr) + ' ' + esc(p.pos) + '</span></span></span></td>' +
      '<td>' + locLabel(loc) + '</td>' +
      '<td class="num">' + fmtNum(p.fpts) + '</td>' +
      '<td><select class="sort-select action-select" data-loc-type="' + loc.type +
        '" data-loc-team="' + (loc.team || '') + '" data-loc-section="' + (loc.section || '') +
        '" data-loc-idx="' + (loc.idx != null ? loc.idx : '') + '">' + actionOptionsHTML(loc) + '</select></td>' +
      '</tr>';
  }

  function renderChips() {
    var chips = ['<button class="chip active" data-team="ALL">All</button>',
      '<button class="chip" data-team="FA">Free agents</button>'];
    TEAMS.forEach(function (t) {
      chips.push('<button class="chip" data-team="' + t.slug + '">' + esc(t.name) + '</button>');
    });
    els.chips.innerHTML = chips.join('');
  }

  function renderSnapshot() {
    els.snapshot.innerHTML = TEAMS.map(function (t) {
      var r = state.rosters[t.slug];
      var filled = r.starters.filter(Boolean).length;
      return '<div class="writer-row"><div class="writer-row-main">' +
        '<b>' + esc(t.name) + '</b>' +
        '<p class="section-note" style="margin:4px 0 0">Starters ' + filled + '/' + SLOTS.length +
        ' &middot; Bench ' + r.bench.length + ' &middot; IR ' + r.ir.length + '</p>' +
        '</div></div>';
    }).join('') + '<div class="writer-row"><div class="writer-row-main">' +
      '<b>Free agents</b><p class="section-note" style="margin:4px 0 0">' +
      state.freeAgents.length + ' listed</p></div></div>';
  }

  function renderTable() {
    var q = (els.search.value || '').trim().toLowerCase();
    var entries = allEntries().filter(function (entry) {
      var loc = entry.loc, p = entry.player;
      var matchTeam =
        filterTeam === 'ALL' ? true :
        filterTeam === 'FA' ? loc.type === 'fa' :
        (loc.type === 'roster' && loc.team === filterTeam);
      if (!matchTeam) return false;
      if (!q) return true;
      return (p.name || '').toLowerCase().indexOf(q) !== -1 ||
        (p.team_abbr || '').toLowerCase().indexOf(q) !== -1 ||
        (p.pos || '').toLowerCase().indexOf(q) !== -1;
    });
    els.count.textContent = entries.length + (entries.length === 1 ? ' player' : ' players') +
      (q ? ' matching "' + q + '"' : '') + '.';
    if (!entries.length) {
      els.body.innerHTML = '<tr><td colspan="4" class="section-note">' +
        (q ? 'No one matches that search.' : 'Nothing here yet.') + '</td></tr>';
      return;
    }
    /* Cap what renders at once so a blank search on 130+ players stays fast
       and the table does not overwhelm the page. */
    var shown = entries.slice(0, 250);
    els.body.innerHTML = shown.map(rowHTML).join('');
  }

  function buildFile() {
    var header = [
      '/* ============================================================',
      '   LEAGUE ROSTERS & FREE AGENTS',
      '   Generated with roster-manager.html',
      '   ============================================================ */'
    ].join('\n');
    return header +
      '\nwindow.LEAGUE_TEAMS = ' + JSON.stringify(TEAMS, null, 2) + ';\n\n' +
      'window.STARTER_SLOTS = ' + JSON.stringify(SLOTS) + ';\n\n' +
      'window.LEAGUE_ROSTERS = ' + JSON.stringify(state.rosters, null, 2) + ';\n\n' +
      'window.FREE_AGENTS = ' + JSON.stringify(state.freeAgents, null, 2) + ';\n';
  }

  function renderAll() {
    renderSnapshot();
    renderTable();
    els.output.value = buildFile();
  }

  /* ---------- new player form ---------- */
  var newForm = {
    name: document.getElementById('rmNewName'),
    pos: document.getElementById('rmNewPos'),
    team: document.getElementById('rmNewTeam'),
    fpts: document.getElementById('rmNewFpts'),
    avg: document.getElementById('rmNewAvg'),
    last: document.getElementById('rmNewLast')
  };
  document.getElementById('rmNewAdd').addEventListener('click', function () {
    var name = newForm.name.value.trim();
    if (!name) { toast('Give the player a name first.', true); return; }
    var num = function (el) {
      var v = parseFloat(el.value);
      return isNaN(v) ? null : v;
    };
    state.freeAgents.unshift({
      name: name,
      status: null,
      team_abbr: newForm.team.value.trim().toUpperCase(),
      pos: newForm.pos.value,
      fpts: num(newForm.fpts),
      avg: num(newForm.avg),
      last: num(newForm.last)
    });
    newForm.name.value = '';
    newForm.team.value = '';
    newForm.fpts.value = '';
    newForm.avg.value = '';
    newForm.last.value = '';
    saveDraft();
    filterTeam = 'FA';
    Array.prototype.forEach.call(els.chips.querySelectorAll('.chip'), function (c) {
      c.classList.toggle('active', c.getAttribute('data-team') === 'FA');
    });
    renderAll();
    toast(name + ' added to free agents.');
  });

  /* ---------- wiring ---------- */
  els.search.addEventListener('input', renderTable);
  els.chips.addEventListener('click', function (ev) {
    var chip = ev.target.closest('.chip');
    if (!chip) return;
    Array.prototype.forEach.call(els.chips.querySelectorAll('.chip'), function (c) {
      c.classList.remove('active');
    });
    chip.classList.add('active');
    filterTeam = chip.getAttribute('data-team');
    renderTable();
  });
  els.body.addEventListener('change', function (ev) {
    var select = ev.target.closest('.action-select');
    if (!select) return;
    var action = select.value;
    if (!action) return;
    var loc = {
      type: select.getAttribute('data-loc-type'),
      team: select.getAttribute('data-loc-team') || undefined,
      section: select.getAttribute('data-loc-section') || undefined,
      idx: select.getAttribute('data-loc-idx') !== '' ? Number(select.getAttribute('data-loc-idx')) : undefined
    };
    applyAction(loc, action);
  });

  document.getElementById('rmCopy').addEventListener('click', function () {
    var code = buildFile();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(
        function () { toast('Copied. Paste it over assets/roster-data.js'); },
        function () { els.output.select(); toast('Press Ctrl/Cmd + C to copy.'); }
      );
    } else {
      els.output.select();
      toast('Press Ctrl/Cmd + C to copy.');
    }
  });
  document.getElementById('rmDownload').addEventListener('click', function () {
    var blob = new Blob([buildFile()], { type: 'text/javascript' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'roster-data.js';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast('Downloaded. Move it into assets/ replacing the old one.');
  });
  document.getElementById('rmReset').addEventListener('click', function () {
    if (!window.confirm('Throw away your unsaved changes and reload what is currently on the site?')) return;
    try { localStorage.removeItem(DRAFT_KEY); } catch (err) { /* ignore */ }
    state = liveSnapshot();
    els.draftNote.classList.add('hidden');
    renderAll();
    toast('Reloaded from the live site data.');
  });

  start();
})();
