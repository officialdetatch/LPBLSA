/* ============================================================
   THE PLAYOFF BRACKET  --  shared by every league's Playoffs page and by
   every league's playoffs manager. It only draws and works out the bracket;
   each league keeps its OWN playoff data in its own folder:

     leagues/<league>/assets/<league>-playoffs-data.js     who is seeded, who advanced
     leagues/<league>/<league>-playoffs.html               the public page
     leagues/<league>/<league>-playoffs-manager.html       YOUR private tool that writes the data file

   THE DATA (window.LPBSA_PLAYOFFS.<league>):
     format   4 = four teams  (ROUND 1 -> CHAMP)
              6 = six teams   (ROUND 1 with byes for No. 1 and No. 2 -> ROUND 2 -> CHAMP)
     seeds    the team slug of No. 1, No. 2 ... ("" = not decided yet)
     winners  who advanced out of each game:  { "r1m2": "sierra" }
              The loser of a game is simply the other team, so nobody is ever
              typed in as "eliminated" - it follows from who advanced.
   Game ids, in bracket order:
     4 teams   r1m1 (No.1 v No.4)  r1m2 (No.2 v No.3)  final
     6 teams   r1m1 (No.1 bye)  r1m2 (No.4 v No.5)  r1m3 (No.2 bye)  r1m4 (No.3 v No.6)
               r2m1  r2m2  final
   Teams the league has but that are not seeded are shown as "Fuera de playoffs".

   On a page this file also starts itself: a page with <div id="playoffsPage">
   and <body data-league="nfl"> gets that league's bracket.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- the two bracket shapes (from the league's bracket pictures) ---------- */
  var FORMATS = {
    4: [
      { name: 'ROUND 1', games: [
        { id: 'r1m1', slots: [{ seed: 1 }, { seed: 4 }] },
        { id: 'r1m2', slots: [{ seed: 2 }, { seed: 3 }] } ] },
      { name: 'CHAMP', games: [
        { id: 'final', slots: [{ from: 'r1m1' }, { from: 'r1m2' }] } ] }
    ],
    6: [
      { name: 'ROUND 1', games: [
        { id: 'r1m1', slots: [{ seed: 1 }, { bye: true }] },
        { id: 'r1m2', slots: [{ seed: 4 }, { seed: 5 }] },
        { id: 'r1m3', slots: [{ seed: 2 }, { bye: true }] },
        { id: 'r1m4', slots: [{ seed: 3 }, { seed: 6 }] } ] },
      { name: 'ROUND 2', games: [
        { id: 'r2m1', slots: [{ from: 'r1m1' }, { from: 'r1m2' }] },
        { id: 'r2m2', slots: [{ from: 'r1m3' }, { from: 'r1m4' }] } ] },
      { name: 'CHAMP', games: [
        { id: 'final', slots: [{ from: 'r2m1' }, { from: 'r2m2' }] } ] }
    ]
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ---------- work out the bracket ---------- */
  function resolve(data) {
    data = data || {};
    var format = FORMATS[data.format] ? Number(data.format) : 4;
    var rounds = FORMATS[format];
    var seeds = [], used = {}, i, slug;
    for (i = 0; i < format; i++) {
      slug = (data.seeds && data.seeds[i]) || '';
      if (slug && used[slug]) slug = '';           /* a team can only hold one seed */
      if (slug) used[slug] = true;
      seeds.push(slug);
    }
    var winners = data.winners || {};
    var byId = {}, out = { format: format, seeds: seeds, rounds: [], games: byId, champion: '', eliminated: [] };

    rounds.forEach(function (rd, r) {
      var row = { name: rd.name, games: [] };
      rd.games.forEach(function (g, k) {
        var slots = g.slots.map(function (s) {
          if (s.bye) return { bye: true, team: '', seed: 0 };
          if (s.seed) return { team: seeds[s.seed - 1], seed: s.seed, from: '' };
          var up = byId[s.from];
          var t = up ? up.winner : '';
          return { team: t, seed: t ? seeds.indexOf(t) + 1 : 0, from: s.from };
        });
        var game = { id: g.id, round: r, index: k, roundName: rd.name, slots: slots, winner: '', loser: '', bye: false, pickable: false };
        var byeAt = slots[0].bye ? 0 : (slots[1].bye ? 1 : -1);
        if (byeAt >= 0) {
          game.bye = true;
          game.winner = slots[1 - byeAt].team;     /* a bye simply advances the other team */
        } else if (slots[0].team && slots[1].team) {
          game.pickable = true;
          var w = winners[g.id];
          if (w && (w === slots[0].team || w === slots[1].team)) {
            game.winner = w;
            game.loser = w === slots[0].team ? slots[1].team : slots[0].team;
          }
        }
        byId[g.id] = game;
        row.games.push(game);
        if (game.loser) out.eliminated.push({ team: game.loser, round: rd.name, game: g.id });
      });
      out.rounds.push(row);
    });
    out.champion = byId.final.winner;
    out.started = seeds.some(function (s) { return !!s; });
    return out;
  }

  /* ---------- teams ---------- */
  function teamMap(teams) {
    var m = {};
    (teams || []).forEach(function (t) { m[t.slug] = t; });
    return m;
  }
  function teamName(ctx, slug) { return ctx.teams[slug] ? ctx.teams[slug].name : slug; }
  function initialsOf(t, slug) {
    return (t && t.initials) || String((t && t.name) || slug || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
  }
  function crestHTML(ctx, slug) {
    var t = ctx.teams[slug];
    var img = '';
    if (t && t.crest) img = /^(https?:)?\/\//i.test(t.crest) || t.crest.charAt(0) === '/' ? t.crest : ctx.assetBase + t.crest;
    return '<span class="crest' + (t && t.shape === 'circle' ? ' crest-circle' : '') + '">' +
      (img ? '<img src="' + esc(img) + '" alt="" onerror="this.remove()">' : '') +
      '<span class="crest-fallback">' + esc(initialsOf(t, slug)) + '</span></span>';
  }

  /* ---------- draw the bracket ---------- */
  function slotHTML(g, i, ctx, edit) {
    var s = g.slots[i];
    if (s.bye) return '<div class="slot is-bye"><span class="slot-label">BYE</span></div>';
    if (!s.team) {
      return '<div class="slot is-empty">' + (s.seed ? '<span class="slot-label">No. ' + s.seed + '</span>' : '') + '</div>';
    }
    var cls = 'slot';
    var tag = '';
    if (g.winner === s.team && !g.bye) {
      cls += ' is-winner' + (g.id === 'final' ? ' is-champ' : '');
      tag = g.id === 'final' ? '<span class="slot-tag">CAMPEON</span>' : '';
    } else if (g.loser === s.team) {
      cls += ' is-out';
      tag = '<span class="slot-tag">OUT</span>';
    }
    var inner = '<span class="slot-seed">' + (s.seed || '') + '</span>' + crestHTML(ctx, s.team) +
      '<span class="slot-name">' + esc(teamName(ctx, s.team)) + '</span>' + tag;
    if (edit && g.pickable) {
      return '<button type="button" class="' + cls + ' is-pick" data-game="' + esc(g.id) + '" data-team="' + esc(s.team) + '"' +
        ' title="' + (g.winner === s.team ? 'Click to undo' : 'Click to advance ' + esc(teamName(ctx, s.team))) + '">' + inner + '</button>';
    }
    return '<div class="' + cls + '">' + inner + '</div>';
  }

  function bracketHTML(model, ctx, opts) {
    var edit = !!(opts && opts.edit);
    var nRounds = model.rounds.length;
    var rows = model.rounds[0].games.length;
    var cols = '', head = '', cells = '';
    model.rounds.forEach(function (rd, r) {
      var span = Math.pow(2, r);
      cols += '<div class="bracket-colbg" style="grid-column:' + (r + 1) + ';grid-row:1 / ' + (rows + 2) + '"></div>';
      head += '<div class="bracket-head" style="grid-column:' + (r + 1) + ';grid-row:1">' + esc(rd.name) + '</div>';
      rd.games.forEach(function (g, k) {
        var feeds = r < nRounds - 1 ? (k % 2 === 0 ? ' feeds-down' : ' feeds-up') : '';
        cells += '<div class="bracket-cell' + feeds + (r > 0 ? ' has-in' : '') + (g.bye ? ' is-bye' : '') + '" ' +
          'style="grid-column:' + (r + 1) + ';grid-row:' + (2 + k * span) + ' / span ' + span + '">' +
          '<div class="mu" role="group" aria-label="' + esc(rd.name) + ', game ' + (k + 1) + '" data-game="' + esc(g.id) + '">' +
          slotHTML(g, 0, ctx, edit) + slotHTML(g, 1, ctx, edit) + '</div></div>';
      });
    });
    return '<div class="bracket-scroll"><div class="bracket bracket-' + model.format + '" style="--rounds:' + nRounds + ';--rows:' + rows + '">' +
      cols + head + cells + '</div></div>';
  }

  /* ---------- champion + who is out ---------- */
  function chipHTML(ctx, slug, sub) {
    return '<li class="po-chip">' + crestHTML(ctx, slug) + '<span class="po-chip-text"><b>' + esc(teamName(ctx, slug)) + '</b>' +
      (sub ? '<span>' + esc(sub) + '</span>' : '') + '</span></li>';
  }

  function championHTML(model, ctx) {
    if (!model.champion) return '';
    return '<div class="po-champ">' + crestHTML(ctx, model.champion) +
      '<div><span class="po-champ-label">Campeon</span><b>' + esc(teamName(ctx, model.champion)) + '</b></div></div>';
  }

  function listsHTML(model, ctx) {
    var seeded = {};
    model.seeds.forEach(function (s) { if (s) seeded[s] = true; });
    var outside = (ctx.teamList || []).filter(function (t) { return !seeded[t.slug]; });
    var html = '<div class="po-lists"><div class="po-list"><h3>Eliminados</h3>' +
      (model.eliminated.length
        ? '<ul>' + model.eliminated.map(function (e) { return chipHTML(ctx, e.team, 'Eliminado en ' + e.round); }).join('') + '</ul>'
        : '<p class="section-note">Todavia nadie. Los eliminados aparecen aqui cuando se juegue cada ronda.</p>') + '</div>';
    if (model.started) {
      html += '<div class="po-list"><h3>Fuera de playoffs</h3>' +
        (outside.length
          ? '<ul>' + outside.map(function (t) { return chipHTML(ctx, t.slug, 'No clasifico'); }).join('') + '</ul>'
          : '<p class="section-note">Todos los equipos de la liga clasificaron.</p>') + '</div>';
    }
    return html + '</div>';
  }

  /* both together - what the manager shows under its bracket */
  function summaryHTML(model, ctx) { return championHTML(model, ctx) + listsHTML(model, ctx); }

  function makeCtx(L, root, teamList) {
    return {
      teams: teamMap(teamList),
      teamList: teamList || [],
      assetBase: (root || '') + ((L && L.assetRoot) || '')
    };
  }

  window.LPBSA_Playoffs = {
    FORMATS: FORMATS,
    resolve: resolve,
    bracketHTML: bracketHTML,
    summaryHTML: summaryHTML,
    championHTML: championHTML,
    listsHTML: listsHTML,
    makeCtx: makeCtx,
    esc: esc
  };

  /* ---------- a league's Playoffs page ---------- */
  var host = document.getElementById('playoffsPage');
  if (!host || !window.LPBSA_findLeague) return;

  var body = document.body;
  var L = window.LPBSA_findLeague(body.getAttribute('data-league'));
  if (!L) return;
  var data = (window.LPBSA_PLAYOFFS || {})[L.key] || { format: 4, seeds: [], winners: {} };
  var model = resolve(data);
  var ctx = makeCtx(L, body.getAttribute('data-root') || '', window.LPBSA_teamsOf(L.key));

  var note = !model.started
    ? '<div class="writer-note po-note">Los playoffs todavia no empiezan. Cuando se definan los cabezas de serie, el bracket se llena aqui.</div>'
    : '';

  host.innerHTML = note + championHTML(model, ctx) +
    '<div class="section-head"><h2>Playoff Bracket</h2><span class="section-note">' + model.format + ' equipos &middot; ' + esc(L.name) + '</span></div>' +
    bracketHTML(model, ctx, { edit: false }) +
    '<div class="po-after">' + listsHTML(model, ctx) + '</div>';
})();
