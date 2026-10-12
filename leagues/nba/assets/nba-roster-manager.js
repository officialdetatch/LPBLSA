/* ============================================================
   NBA ROSTER MANAGER  --  private tool, not linked from the public site.
   Powers leagues/nba/nba-roster-manager.html (and only that page).
   Search any player, then draft them from free agency, drop them
   back, start them, bench them, IR them, or trade them to another
   team. When you are done, download a finished nba-roster-data.js and
   save it over the old one in leagues/nba/assets/.

   This is the NBA's own copy. The NFL has its own in
   leagues/nfl/assets/nfl-roster-manager.js - change one, the other
   is not affected.

   The NBA teams come from leagues/nba/assets/nba-teams-data.js (add them
   there first). This tool then keeps each team's roster and the free-agent
   board in nba-roster-data.js.

   Basketball differences from the NFL copy:
     - a player can play several positions ("PG, SG"), so "Start at" only
       offers the slots he is allowed in: PG / SG / SF / PF / C need that
       position, G takes a PG or SG, F takes an SF or PF, UTIL takes anyone
       (the rules sheet). A player with no positions written can start anywhere.
     - the snapshot checks the roster limits from the rules sheet:
       9 starters, 5 on the bench, 1 on IR.
   ============================================================ */
(function () {
  'use strict';

  var DRAFT_KEY = 'lpbsa.nba.roster.draft.v2';   /* where your unsaved edits are kept in this browser (v2: the drafted rosters) */
  var DATA_PATH = 'leagues/nba/assets/nba-roster-data.js';   /* the file this tool replaces */
  var OUT_NAME = 'nba-roster-data.js';      /* the name of the file it downloads */
  var TEAMS = (window.LPBSA_TEAMS && window.LPBSA_TEAMS.nba) || [];
  var SLOTS = window.NBA_STARTER_SLOTS || [];
  var POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C'];
  /* who may start in each slot (null = anyone) */
  var SLOT_FITS = { PG: ['PG'], SG: ['SG'], SF: ['SF'], PF: ['PF'], C: ['C'], G: ['PG', 'SG'], F: ['SF', 'PF'], UTIL: null };
  var LIMITS = { bench: 5, ir: 1 };          /* from the rules sheet */
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

  /* ---------- positions ---------- */
  function positionsOf(p) {
    return String((p && p.pos) || '').split(',').map(function (x) { return x.trim().toUpperCase(); }).filter(Boolean);
  }
  function mainPos(p) { return positionsOf(p)[0] || '?'; }
  function canStart(p, slot) {
    var fits = SLOT_FITS[slot];
    var mine = positionsOf(p);
    if (!fits || !mine.length) return true;
    return mine.some(function (x) { return fits.indexOf(x) !== -1; });
  }

  function liveSnapshot() {
    var rosters = {};
    TEAMS.forEach(function (t) {
      var r = (window.NBA_ROSTERS || {})[t.slug] || { starters: [], bench: [], ir: [] };
      rosters[t.slug] = {
        starters: (r.starters || []).slice(),
        bench: (r.bench || []).slice(),
        ir: (r.ir || []).slice()
      };
    });
    return { rosters: rosters, freeAgents: (window.NBA_FREE_AGENTS || []).slice() };
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
  /* a saved draft from before a team was added still needs a roster for it */
  function fillMissingTeams(s) {
    TEAMS.forEach(function (t) {
      if (!s.rosters[t.slug]) s.rosters[t.slug] = { starters: [], bench: [], ir: [] };
    });
    return s;
  }

  function start() {
    var live = liveSnapshot();
    var draft = loadDraft();
    if (draft && draft.rosters && draft.freeAgents && JSON.stringify(draft) !== JSON.stringify(live)) {
      state = fillMissingTeams(draft);
      els.draftNote.classList.remove('hidden');
    } else {
      state = live;
    }
    renderChips();
    renderAll();
    if (!TEAMS.length) {
      els.count.textContent = 'No NBA teams yet - add them in leagues/nba/assets/nba-teams-data.js first, then reload this page.';
    }
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
      if (!canStart(player, SLOTS[idx])) {
        toast(player.name + ' (' + player.pos + ') cannot play ' + SLOTS[idx] + '.', true);
        return;
      }
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
    if (loc.type === 'fa') return '<span class="loc-pill loc-fa">Free agent #' + (loc.idx + 1) + '</span>';
    var name = teamName(loc.team);
    if (loc.section === 'starters') {
      return '<span class="loc-pill loc-start">' + esc(name) + ' &middot; ' + esc(SLOTS[loc.idx]) + '</span>';
    }
    if (loc.section === 'bench') return '<span class="loc-pill loc-bench">' + esc(name) + ' &middot; Bench</span>';
    return '<span class="loc-pill loc-ir">' + esc(name) + ' &middot; IR</span>';
  }

  function actionOptionsHTML(entry) {
    var loc = entry.loc, player = entry.player;
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
      if (!canStart(player, label)) return;   /* only the slots his positions allow */
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

  function locAttrs(loc) {
    return ' data-loc-type="' + loc.type + '" data-loc-team="' + (loc.team || '') +
      '" data-loc-section="' + (loc.section || '') +
      '" data-loc-idx="' + (loc.idx != null ? loc.idx : '') + '"';
  }
  function statInputHTML(loc, field, value) {
    var v = (value === null || value === undefined) ? '' : value;
    return '<input type="number" step="0.1" inputmode="decimal" class="stat-input" data-field="' + field + '"' +
      locAttrs(loc) + ' value="' + esc(v) + '" placeholder="--">';
  }
  function statusInputHTML(loc, value) {
    return '<input type="text" list="rmStatusOptions" maxlength="8" class="status-input" data-field="status"' +
      locAttrs(loc) + ' value="' + esc(value || '') + '" placeholder="Healthy">';
  }
  function rowHTML(entry) {
    var p = entry.player, loc = entry.loc;
    return '<tr>' +
      '<td><span class="player-cell"><span class="player-avatar">' + esc(mainPos(p)) + '</span>' +
      '<span><span class="player-name">' + esc(p.name) + '</span>' +
      '<span class="nfl-tag">' + esc(p.team_abbr) + ' ' + esc(p.pos) + '</span></span></span></td>' +
      '<td>' + locLabel(loc) + '</td>' +
      '<td>' + statusInputHTML(loc, p.status) + '</td>' +
      '<td class="num">' + statInputHTML(loc, 'fpts', p.fpts) + '</td>' +
      '<td class="num">' + statInputHTML(loc, 'avg', p.avg) + '</td>' +
      '<td class="num">' + statInputHTML(loc, 'last', p.last) + '</td>' +
      '<td><select class="sort-select action-select"' + locAttrs(loc) + '>' + actionOptionsHTML(entry) + '</select></td>' +
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
      var warn = [];
      if (filled < SLOTS.length) warn.push((SLOTS.length - filled) + ' empty starting spot' + (SLOTS.length - filled === 1 ? '' : 's'));
      if (r.bench.length > LIMITS.bench) warn.push('bench over the limit (' + r.bench.length + '/' + LIMITS.bench + ')');
      if (r.ir.length > LIMITS.ir) warn.push('IR over the limit (' + r.ir.length + '/' + LIMITS.ir + ')');
      r.starters.forEach(function (p, i) {
        if (p && !canStart(p, SLOTS[i])) warn.push(p.name + ' cannot play ' + SLOTS[i]);
      });
      return '<div class="writer-row"><div class="writer-row-main">' +
        '<b>' + esc(t.name) + '</b>' +
        '<p class="section-note" style="margin:4px 0 0">Starters ' + filled + '/' + SLOTS.length +
        ' &middot; Bench ' + r.bench.length + '/' + LIMITS.bench + ' &middot; IR ' + r.ir.length + '/' + LIMITS.ir + '</p>' +
        (warn.length ? '<p class="section-note" style="margin:4px 0 0;color:var(--loss)">&#9888; ' + esc(warn.join(' · ')) + '</p>' : '') +
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
      els.body.innerHTML = '<tr><td colspan="7" class="section-note">' +
        (q ? 'No one matches that search.' : 'Nothing here yet.') + '</td></tr>';
      return;
    }
    /* Cap what renders at once so a blank search on 180+ players stays fast
       and the table does not overwhelm the page. */
    var shown = entries.slice(0, 250);
    els.body.innerHTML = shown.map(rowHTML).join('');
  }

  function buildFile() {
    var header = [
      '/* ============================================================',
      '   NBA ROSTERS & FREE AGENTS',
      '   Generated with nba-roster-manager.html (in the folder above) - edit it',
      '   there rather than by hand. The teams themselves are in nba-teams-data.js.',
      '',
      '   Each player:  name, status (DTD, OUT, SUSP... or null when healthy),',
      '   team_abbr (his NBA team), pos (every position he can play, as ESPN lists',
      '   it, e.g. "PG, SG" - the first one is his main position) and fpts / avg /',
      '   last (season fantasy points, average per game, last game - null = not',
      '   known yet).',
      '   NBA_STARTER_SLOTS  the 9 starters from the rules sheet, in order.',
      '   NBA_ROSTERS        each team\'s starters (one per slot, null = empty),',
      '                      bench and IR.',
      '   NBA_FREE_AGENTS    the free-agent board, in league order (#1 first).',
      '   ============================================================ */'
    ].join('\n');
    return header +
      '\nwindow.NBA_STARTER_SLOTS = ' + JSON.stringify(SLOTS) + ';\n\n' +
      'window.NBA_ROSTERS = ' + JSON.stringify(state.rosters, null, 2) + ';\n\n' +
      'window.NBA_FREE_AGENTS = ' + JSON.stringify(state.freeAgents, null, 2) + ';\n';
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
  /* the position buttons: tap every position the player can play */
  newForm.pos.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-pos]');
    if (!b) return;
    var on = !b.classList.contains('active');
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  function pickedPositions() {
    var picked = Array.prototype.filter.call(newForm.pos.querySelectorAll('[data-pos]'), function (b) {
      return b.classList.contains('active');
    }).map(function (b) { return b.getAttribute('data-pos'); });
    return POSITIONS.filter(function (p) { return picked.indexOf(p) !== -1; });
  }
  document.getElementById('rmNewAdd').addEventListener('click', function () {
    var name = newForm.name.value.trim();
    if (!name) { toast('Give the player a name first.', true); return; }
    var positions = pickedPositions();
    if (!positions.length) { toast('Pick at least one position.', true); return; }
    var num = function (el) {
      var v = parseFloat(el.value);
      return isNaN(v) ? null : v;
    };
    state.freeAgents.unshift({
      name: name,
      status: null,
      team_abbr: newForm.team.value.trim().toUpperCase(),
      pos: positions.join(', '),
      fpts: num(newForm.fpts),
      avg: num(newForm.avg),
      last: num(newForm.last)
    });
    newForm.name.value = '';
    newForm.team.value = '';
    newForm.fpts.value = '';
    newForm.avg.value = '';
    newForm.last.value = '';
    Array.prototype.forEach.call(newForm.pos.querySelectorAll('[data-pos]'), function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    saveDraft();
    filterTeam = 'FA';
    Array.prototype.forEach.call(els.chips.querySelectorAll('.chip'), function (c) {
      c.classList.toggle('active', c.getAttribute('data-team') === 'FA');
    });
    renderAll();
    toast(name + ' added to free agents.');
  });

  /* ---------- editing status / fpts / avg / last in place ---------- */
  function locFromEl(el) {
    return {
      type: el.getAttribute('data-loc-type'),
      team: el.getAttribute('data-loc-team') || undefined,
      section: el.getAttribute('data-loc-section') || undefined,
      idx: el.getAttribute('data-loc-idx') !== '' ? Number(el.getAttribute('data-loc-idx')) : undefined
    };
  }
  function flashSaved(el) {
    el.classList.add('field-saved');
    setTimeout(function () { el.classList.remove('field-saved'); }, 700);
  }
  function updateStatField(el) {
    var loc = locFromEl(el);
    var player = getPlayerAtLoc(loc);
    if (!player) return;
    var field = el.getAttribute('data-field');
    var raw = el.value.trim();
    if (field === 'status') {
      player.status = raw ? raw.toUpperCase() : null;
      el.value = player.status || '';
    } else {
      var num = raw === '' ? null : parseFloat(raw);
      player[field] = (num === null || isNaN(num)) ? null : num;
      el.value = player[field] === null ? '' : player[field];
    }
    saveDraft();
    els.output.value = buildFile();
    flashSaved(el);
  }

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
    var target = ev.target;
    if (target.classList.contains('stat-input') || target.classList.contains('status-input')) {
      updateStatField(target);
      return;
    }
    var select = ev.target.closest('.action-select');
    if (!select) return;
    var action = select.value;
    if (!action) return;
    var loc = locFromEl(select);
    applyAction(loc, action);
  });
  /* Enter should save-and-blur the field instead of doing nothing (text
     inputs don't submit a form here). */
  els.body.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter') return;
    var target = ev.target;
    if (target.classList.contains('stat-input') || target.classList.contains('status-input')) {
      ev.preventDefault();
      target.blur();
    }
  });

  document.getElementById('rmCopy').addEventListener('click', function () {
    var code = buildFile();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(
        function () { toast('Copied. Paste it over ' + DATA_PATH); },
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
    a.download = OUT_NAME;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast('Downloaded. Move it into ' + DATA_PATH.replace(/[^\/]+$/, '') + ' replacing the old one.');
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
