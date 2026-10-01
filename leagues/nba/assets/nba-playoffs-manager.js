/* ============================================================
   NBA PLAYOFFS MANAGER  --  private tool, not linked from the public site.
   Powers leagues/nba/nba-playoffs-manager.html (and only that page).
   Loads the current leagues/nba/assets/nba-playoffs-data.js, lets you
   pick the seeds (or take them from the standings), click the winner of each
   game, and hands you a finished nba-playoffs-data.js to save over the old
   one. Nothing here touches the live site until you replace that file yourself.

   The bracket itself is drawn by the shared assets/playoffs-view.js, the same
   code the public Playoffs page uses, so what you see here is what visitors get.

   This is the NBA's own copy. The NFL has its own in
   leagues/nfl/assets/nfl-playoffs-manager.js - change one, the other
   is not affected.
   ============================================================ */
(function () {
  'use strict';

  /* This league's settings - the only lines that differ from the other league's copy. */
  var KEY = 'nba';
  var SHORT = 'NBA';
  var DRAFT_KEY = 'lpbsa.nba.playoffs.draft.v1';                 /* where your unsaved edits are kept in this browser */
  var DATA_PATH = 'leagues/nba/assets/nba-playoffs-data.js'; /* the file this tool replaces (shown in messages) */
  var OUT_NAME = 'nba-playoffs-data.js';                         /* the name of the file it downloads */
  var DEFAULT_FORMAT = 6;                                      /* 4 or 6 teams */

  var PO = window.LPBSA_Playoffs;
  var els = {
    format: document.getElementById('pmFormat'),
    seeds: document.getElementById('pmSeeds'),
    bracket: document.getElementById('pmBracket'),
    summary: document.getElementById('pmSummary'),
    output: document.getElementById('pmOutput'),
    draftNote: document.getElementById('pmDraftNote')
  };
  if (!els.bracket || !PO) return; /* this script only runs on nba-playoffs-manager.html */

  var root = document.body.getAttribute('data-root') || '';
  var league = window.LPBSA_findLeague(KEY);
  var state = null;

  function esc(s) { return PO.esc(s); }
  function toast(msg, bad) {
    var t = document.createElement('div');
    t.className = 'toast' + (bad ? ' err' : '');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('hide'); }, 2400);
    setTimeout(function () { t.remove(); }, 2800);
  }

  function teams() { return window.LPBSA_teamsOf(KEY) || []; }
  function findTeam(slug) {
    var all = teams();
    for (var i = 0; i < all.length; i++) { if (all[i].slug === slug) return all[i]; }
    return null;
  }
  function ctx() { return PO.makeCtx(league, root, teams()); }

  /* ---------- the data ---------- */
  /* Results only count while the teams in that game are still the teams that played it,
     so after any change keep just the winners that are still valid. */
  function prune(s) {
    var m = PO.resolve(s), w = {};
    Object.keys(m.games).forEach(function (id) {
      var g = m.games[id];
      if (g.pickable && g.winner) w[id] = g.winner;
    });
    s.winners = w;
    return s;
  }
  function normalise(raw) {
    raw = raw || {};
    var fmt = PO.FORMATS[raw.format] ? Number(raw.format) : DEFAULT_FORMAT;
    var seeds = [], seen = {};
    for (var i = 0; i < fmt; i++) {
      var s = raw.seeds && raw.seeds[i] ? String(raw.seeds[i]) : '';
      if (s && seen[s]) s = '';
      if (s) seen[s] = true;
      seeds.push(s);
    }
    var winners = {};
    Object.keys(raw.winners || {}).forEach(function (k) { winners[k] = String(raw.winners[k]); });
    return prune({ format: fmt, seeds: seeds, winners: winners });
  }
  function fromFile() { return normalise((window.LPBSA_PLAYOFFS || {})[KEY]); }

  function buildFile() {
    var head = [
      '/* ============================================================',
      '   ' + SHORT + ' PLAYOFFS',
      '   format   4 = four teams (ROUND 1, CHAMP)',
      '            6 = six teams (ROUND 1 with byes for No. 1 and No. 2, ROUND 2, CHAMP)',
      '   seeds    the team slug of No. 1, No. 2 ... ("" = not decided yet)',
      '   winners  who advanced out of each game - the other team is eliminated',
      '   Edit it with ' + KEY + '-playoffs-manager.html rather than by hand.',
      '   Generated with ' + KEY + '-playoffs-manager.html',
      '   ============================================================ */'
    ].join('\n');
    var obj = { format: state.format, seeds: state.seeds, winners: state.winners };
    return head + '\nwindow.LPBSA_PLAYOFFS = window.LPBSA_PLAYOFFS || {};\n' +
      'window.LPBSA_PLAYOFFS.' + KEY + ' = ' + JSON.stringify(obj, null, 2) + ';\n';
  }

  function loadDraft() {
    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) { /* ignore */ }
    return null;
  }
  function saveDraft() {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(state)); } catch (err) { /* ignore */ }
  }
  function clearDraft() {
    try { localStorage.removeItem(DRAFT_KEY); } catch (err) { /* ignore */ }
  }

  /* ---------- draw ---------- */
  function seedsHTML() {
    var all = teams();
    return state.seeds.map(function (slug, i) {
      var opts = '<option value="">- not decided -</option>';
      if (slug && !findTeam(slug)) opts += '<option value="' + esc(slug) + '" selected>' + esc(slug) + ' (not in the team list)</option>';
      opts += all.map(function (t) {
        var taken = state.seeds.some(function (s, j) { return s === t.slug && j !== i; });
        return '<option value="' + esc(t.slug) + '"' + (t.slug === slug ? ' selected' : '') + (taken ? ' disabled' : '') + '>' + esc(t.name) + '</option>';
      }).join('');
      return '<div class="pm-seed"><span class="pm-seed-no">No. ' + (i + 1) + '</span>' +
        '<select class="sort-select" data-seed="' + i + '" aria-label="Seed No. ' + (i + 1) + '">' + opts + '</select></div>';
    }).join('');
  }

  function render() {
    prune(state);
    var model = PO.resolve(state);
    var c = ctx();
    els.format.value = String(state.format);
    els.seeds.innerHTML = seedsHTML();
    els.bracket.innerHTML = PO.bracketHTML(model, c, { edit: true });
    els.summary.innerHTML = PO.summaryHTML(model, c);
    els.output.value = buildFile();
    saveDraft();
  }

  /* ---------- seeds ---------- */
  els.seeds.addEventListener('change', function (ev) {
    var sel = ev.target.closest('select[data-seed]');
    if (!sel) return;
    state.seeds[Number(sel.getAttribute('data-seed'))] = sel.value;
    render();
  });

  els.format.addEventListener('change', function () {
    var fmt = Number(els.format.value);
    if (fmt === state.format) return;
    if (Object.keys(state.winners).length &&
        !window.confirm('Switching the bracket clears the results you have entered. Continue?')) {
      els.format.value = String(state.format);
      return;
    }
    var seeds = [];
    for (var i = 0; i < fmt; i++) seeds.push(state.seeds[i] || '');
    state = { format: fmt, seeds: seeds, winners: {} };
    render();
  });

  document.getElementById('pmFill').addEventListener('click', function () {
    var rows = window.LEAGUE_STANDINGS || [];
    var slugs = rows.map(function (r) { return r.team; }).filter(function (s) { return !!findTeam(s); }).slice(0, state.format);
    if (!slugs.length) { toast('There is no standings table to take the seeds from.', true); return; }
    if (state.seeds.some(function (s) { return !!s; }) &&
        !window.confirm('Replace the current seeds with the top ' + slugs.length + ' of the standings?')) return;
    var seeds = [];
    for (var i = 0; i < state.format; i++) seeds.push(slugs[i] || '');
    state.seeds = seeds;
    render();
    toast('Seeds filled from the standings: No. 1 is the team in first place.');
  });

  document.getElementById('pmClearSeeds').addEventListener('click', function () {
    if (!state.seeds.some(function (s) { return !!s; })) return;
    if (!window.confirm('Clear every seed (and the results that depend on them)?')) return;
    state.seeds = state.seeds.map(function () { return ''; });
    render();
  });

  /* ---------- results: click the team that won ---------- */
  els.bracket.addEventListener('click', function (ev) {
    var btn = ev.target.closest('button.is-pick');
    if (!btn) return;
    var game = btn.getAttribute('data-game'), team = btn.getAttribute('data-team');
    if (state.winners[game] === team) delete state.winners[game];
    else state.winners[game] = team;
    render();
  });

  document.getElementById('pmClearResults').addEventListener('click', function () {
    if (!Object.keys(state.winners).length) return;
    if (!window.confirm('Clear every result? The seeds stay.')) return;
    state.winners = {};
    render();
  });

  /* ---------- download / copy / reset ---------- */
  document.getElementById('pmDownload').addEventListener('click', function () {
    var blob = new Blob([buildFile()], { type: 'text/javascript' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = OUT_NAME;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast('Downloaded. Move it to ' + DATA_PATH.replace(/[^\/]+$/, '') + ' replacing the old one.');
  });

  document.getElementById('pmCopy').addEventListener('click', function () {
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

  document.getElementById('pmReset').addEventListener('click', function () {
    if (!window.confirm('Throw away your unsaved changes and reload the playoffs currently on the site?')) return;
    clearDraft();
    state = fromFile();
    els.draftNote.classList.add('hidden');
    render();
  });

  /* ---------- start ---------- */
  function start() {
    var onSite = fromFile();
    var draft = loadDraft();
    state = onSite;
    if (draft) {
      var d = normalise(draft);
      if (JSON.stringify(d) !== JSON.stringify(onSite)) {
        state = d;
        els.draftNote.classList.remove('hidden');
      } else {
        clearDraft();                 /* the file on the site already says the same thing */
      }
    }
    render();
  }

  start();
})();
