/* ============================================================
   GENERADOR DE NOTICIAS  --  the "🤖 Generar noticia" panel at the top of
   news-writer.html. Nothing is ever published by it: it writes a DRAFT into
   the story form below, you change whatever you like, then Add story and
   Publish as always.

   1. It reads the week from ESPN Fantasy (the leagues are public, so no
      login): the scores, each team's best and worst starters, the points
      left on the bench, pickups and trades, the table after the week, next
      week's matchups and anything "WTH" (a crazy single game).
   2. You add your own lines and jokes in "Tus notas" (they always win), and
      pick a tone (or "Sorpréndeme").
   3. Gemini (the same free Firebase AI Logic as Leonidas) writes the story
      in YOUR style: it reads your own latest stories as examples, and the
      headlines and openings of the last ones so it doesn't repeat them.
   "Lo que encontré en ESPN" shows every number it was given, to check.

   WTH: when the panel opens it looks at this week and last week for a single
   game over the limits in CONFIG.wth (NFL 50 points in a week, NBA 100 in a
   game) and offers a special story about it.

   Needs: assets/firebase-config.js with the recaptchaKey (Leonidas' App Check),
   and each league's "espn" settings in assets/leagues.js.
   ============================================================ */
(function () {
  'use strict';

  var CONFIG = {
    model: 'gemini-3.5-flash',      /* free; writes better than the -lite one Leonidas uses */
    sdk: '12.19.0',
    temperature: 0.95,              /* higher = more variety between drafts */
    wth: { ffl: 50, fba: 100 },     /* one player's points in ONE game (NFL: the week) that count as "WTH" */
    examples: 3,                    /* how many of your stories it reads to copy your style */
    avoid: 12,                      /* how many recent stories it must not repeat */
    /* how the managers are called in the stories (by team). The ESPN first name is used otherwise. */
    nicknames: {
      nfl: { puntos: 'Detatch (el comisionado)' },
      nba: { puntos: 'Detatch (el comisionado)' }
    }
  };

  var TONES = [
    { id: 'sorpresa', label: '🎲 Sorpréndeme' },
    { id: 'clasico', label: 'Tu estilo de siempre', guide: 'Tu estilo normal de LPBLSA: narrador burlón de la liga, cercano, con chistes de grupo de amigos.' },
    { id: 'telenovela', label: '📺 Telenovela', guide: 'Como el narrador de una telenovela: traiciones, lágrimas, giros dramáticos y música de fondo imaginaria.' },
    { id: 'radio', label: '📻 Radio deportiva', guide: 'Como un locutor caribeño de radio deportiva, gritando las jugadas, con frases de cabina y exageraciones.' },
    { id: 'conspiracion', label: '🕵️ Conspiración', guide: 'Como un teórico de conspiraciones: todo es un complot (de ESPN, del algoritmo, del comisionado), con "pruebas" ridículas.' },
    { id: 'funeral', label: '⚰️ Funeral', guide: 'Como un funeral solemne y ridículo para los perdedores de la semana: condolencias, flores, minuto de silencio.' }
  ];

  var host = document.getElementById('ngPanel');
  if (!host) return;

  var FB = window.LPBSA_FIREBASE || {};
  var API = 'https://lm-api-reads.fantasy.espn.com/apis/v3/games/';
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  var SPORT = {
    ffl: { bench: [20, 21], positions: { 1: 'QB', 2: 'RB', 3: 'WR', 4: 'TE', 5: 'K', 16: 'D/ST' }, unit: 'Semana', game: 'la semana', of: 'de la semana', that: 'esa semana', next: 'PRÓXIMA SEMANA' },
    fba: { bench: [12, 13], positions: { 1: 'PG', 2: 'SG', 3: 'SF', 4: 'PF', 5: 'C' }, unit: 'Matchup', game: 'un juego', of: 'del matchup', that: 'ese matchup', next: 'PRÓXIMO MATCHUP' }
  };

  var leagues = (window.LPBSA_LEAGUES || []).filter(function (L) { return L.status === 'live' && L.espn && SPORT[L.espn.game]; });
  if (!leagues.length) { host.hidden = true; return; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function n2(x) { return Math.round((Number(x) || 0) * 100) / 100; }
  function pts(x) { var r = n2(x); return String(r); }
  function norm(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ''); }

  /* ============================================================
     ESPN
     ============================================================ */
  function base(L) { var E = L.espn; return API + E.game + '/seasons/' + E.season + '/segments/0/leagues/' + E.league; }
  function espn(L, views, params, filter) {
    var url = base(L) + '?' + views.map(function (v) { return 'view=' + v; }).join('&') + (params ? '&' + params : '');
    var opts = { cache: 'no-store' };
    if (filter) opts.headers = { 'X-Fantasy-Filter': JSON.stringify(filter) };
    return window.fetch(url, opts).then(function (r) {
      if (!r.ok) throw new Error('ESPN contestó ' + r.status + (r.status === 401 ? ' (¿la liga ya no es pública?)' : ''));
      return r.json();
    });
  }
  function onlyPeriod(m) { return { schedule: { filterMatchupPeriodIds: { value: [m] } } }; }

  /* a data file of the site, run in a sandbox (the schedule tells which days each NBA matchup has) */
  function siteData(path) {
    return window.fetch(path, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.text() : ''; }).then(function (t) {
      var w = {};
      try { if (t) new Function('window', 'self', 'document', t)(w, w, undefined); } catch (e) { /* skipped */ }
      return w;
    }, function () { return {}; });
  }
  function ymd(s) { var d = String(s || '').split('-').map(Number); return d.length === 3 && d[0] ? Date.UTC(d[0], d[1] - 1, d[2]) : NaN; }
  var DAY = 86400000;

  /* the weeks of a league with their dates and ESPN scoring periods */
  function calendar(L) {
    return siteData('leagues/' + L.key + '/assets/' + L.key + '-schedule-data.js').then(function (w) {
      var S = (w.LPBSA_SCHEDULE || {})[L.key];
      if (!S || !S.weeks) return null;
      var weeks = S.weeks.slice().sort(function (a, b) { return a.week - b.week; });
      var start = ymd(S.start), out = {};
      var days = [];
      weeks.forEach(function (wk, i) { days.push(isNaN(ymd(wk.starts)) ? (i ? days[i - 1] + 7 * DAY : start) : ymd(wk.starts)); });
      weeks.forEach(function (wk, i) {
        var from = days[i];
        var to = i + 1 < days.length ? days[i + 1] - DAY : (isNaN(ymd(S.end)) ? from + 6 * DAY : ymd(S.end));
        var periods = [];
        if (L.espn.game === 'ffl') periods = [wk.week];
        else for (var d = from; d <= to; d += DAY) periods.push(Math.round((d - start) / DAY) + 1);
        out[wk.week] = { week: wk.week, from: from, to: to, periods: periods, games: wk.games || [], bye: wk.bye || '' };
      });
      return { unit: S.weekLabel || SPORT[L.espn.game].unit, weeks: out };
    });
  }
  function dayText(t) { var d = new Date(t); return d.getUTCDate() + ' ' + MESES[d.getUTCMonth()]; }

  /* our team names (with the ñ and everything), from the site's own files */
  function ourTeams(L) {
    return Promise.all([
      siteData('leagues/' + L.key + '/assets/' + L.key + '-teams-data.js'),
      siteData('leagues/' + L.key + '/assets/' + L.key + '-roster-data.js')
    ]).then(function (w) {
      return ((w[0].LPBSA_TEAMS || {})[L.key]) || w[1].LEAGUE_TEAMS || (window.LPBSA_teamsOf && window.LPBSA_teamsOf(L.key)) || [];
    });
  }

  /* everything ESPN knows about one week of one league, as plain facts */
  function collect(L, week) {
    var G = SPORT[L.espn.game];
    var siteTeams = [];
    var nick = CONFIG.nicknames[L.key] || {};
    var cal;
    return Promise.all([
      espn(L, ['mTeam', 'mSettings', 'mStatus']),
      espn(L, ['mMatchupScore'], '', onlyPeriod(week)),
      espn(L, ['mMatchupScore'], '', onlyPeriod(week + 1)).catch(function () { return {}; }),
      window.fetch(API + L.espn.game + '/seasons/' + L.espn.season + '?view=proTeamSchedules_wl').then(function (r) { return r.json(); }).catch(function () { return {}; }),
      calendar(L),
      ourTeams(L)
    ]).then(function (r) {
      var league = r[0], score = r[1], next = r[2], pro = r[3];
      cal = r[4];
      siteTeams = r[5] || [];
      var info = cal && cal.weeks[week];
      var latest = (league.status && league.status.latestScoringPeriod) || 999;
      var periods = (info ? info.periods : [week]).filter(function (p) { return p <= latest; });
      var proAbbr = {};
      ((pro.settings && pro.settings.proTeams) || []).forEach(function (t) { proAbbr[t.id] = t.abbrev; });

      /* teams: ESPN id -> our name, manager */
      var members = {};
      (league.members || []).forEach(function (m) { members[m.id] = m; });
      var team = {};
      (league.teams || []).forEach(function (t) {
        var slug = (L.espn.teams || {})[t.id] || '';
        var mine = siteTeams.filter(function (s) { return s.slug === slug || norm(s.name) === norm(t.name); })[0];
        var owner = members[t.primaryOwner] || {};
        team[t.id] = {
          id: t.id, slug: slug || (mine && mine.slug) || '', name: (mine && mine.name) || t.name,
          manager: nick[slug] || [owner.firstName, owner.lastName ? owner.lastName.charAt(0) + '.' : ''].filter(Boolean).join(' '),
          rec: (t.record && t.record.overall) || {}, seed: t.playoffSeed || 99,
          players: {}, started: 0, benched: 0
        };
      });

      /* every scoring period (NFL: the week; NBA: every day) - who scored what, started or benched */
      var games = [];   /* single games, for "WTH" */
      return Promise.all(periods.map(function (p) {
        return espn(L, ['mBoxscore'], 'scoringPeriodId=' + p, onlyPeriod(week)).then(function (j) { return { p: p, j: j }; }).catch(function () { return { p: p, j: {} }; });
      })).then(function (boxes) {
        boxes.forEach(function (b) {
          (b.j.schedule || []).forEach(function (m) {
            if (m.matchupPeriodId !== week) return;
            [m.home, m.away].forEach(function (side) {
              if (!side || !team[side.teamId]) return;
              var T = team[side.teamId];
              var ros = side.rosterForCurrentScoringPeriod || side.rosterForMatchupPeriod;
              ((ros && ros.entries) || []).forEach(function (e) {
                var pe = e.playerPoolEntry || {}, pl = pe.player || {};
                var v = Number(pe.appliedStatTotal) || 0;
                var benched = G.bench.indexOf(e.lineupSlotId) !== -1;
                var P = T.players[pl.id] = T.players[pl.id] || {
                  name: pl.fullName || '?', pos: G.positions[pl.defaultPositionId] || '', team: proAbbr[pl.proTeamId] || '',
                  started: 0, benched: 0, best: 0, bestDay: 0, startedGames: 0, wasStarter: false
                };
                if (benched) { P.benched += v; T.benched += v; }
                else { P.started += v; T.started += v; P.wasStarter = true; if (v) P.startedGames++; }
                if (v > P.best) { P.best = v; P.bestDay = b.p; }
                if (v) games.push({ team: T.name, name: P.name, pts: v, period: b.p, benched: benched });
              });
            });
          });
        });

        /* moves (adds, drops, trades) during the week */
        return Promise.all(periods.map(function (p) {
          return espn(L, ['mTransactions2'], 'scoringPeriodId=' + p).catch(function () { return {}; });
        }));
      }).then(function (txAll) {
        var seen = {}, moves = [], ids = {};
        txAll.forEach(function (j) {
          (j.transactions || []).forEach(function (t) {
            if (seen[t.id] || t.status !== 'EXECUTED') return;
            seen[t.id] = 1;
            (t.items || []).forEach(function (it) {
              if (['ADD', 'DROP', 'TRADE'].indexOf(it.type) === -1) return;
              moves.push({ type: it.type, kind: t.type, player: it.playerId, from: it.fromTeamId, to: it.toTeamId, team: t.teamId });
              ids[it.playerId] = 1;
            });
          });
        });
        var list = Object.keys(ids).map(Number);
        if (!list.length) return { moves: moves, names: {} };
        return espn(L, ['kona_player_info'], '', { players: { filterIds: { value: list } } }).then(function (k) {
          var names = {};
          (k.players || []).forEach(function (x) { if (x.player) names[x.player.id] = x.player.fullName; });
          return { moves: moves, names: names };
        }, function () { return { moves: moves, names: {} }; });
      }).then(function (mv) {
        return build(L, G, week, cal, info, team, score, next, games, mv, periods, latest);
      });
    });
  }

  function dayOf(cal, L, period) {
    if (L.espn.game === 'ffl' || !cal) return '';
    var any = cal.weeks[Object.keys(cal.weeks)[0]];
    var start = any ? any.from - (any.periods[0] - 1) * DAY : 0;
    return start ? dayText(start + (period - 1) * DAY) : '';
  }

  function build(L, G, week, cal, info, team, score, next, games, mv, periods, latest) {
    var unit = (cal && cal.unit) || G.unit;
    var lines = [], wth = [];
    var title = L.name + ' — ' + unit + ' ' + week + (info ? ' (' + dayText(info.from) + ' a ' + dayText(info.to) + ')' : '');
    var finished = info ? periods.length && periods[periods.length - 1] >= info.periods[info.periods.length - 1] && latest > info.periods[info.periods.length - 1] : true;
    lines.push('# ' + title + (finished ? '' : ' — TODAVÍA EN JUEGO, los números no son finales'));
    function who(T) { return T.name + (T.manager ? ' (manager: ' + T.manager + ')' : ''); }
    function top(T, n) {
      return Object.keys(T.players).map(function (k) { return T.players[k]; }).filter(function (p) { return p.started > 0; })
        .sort(function (a, b) { return b.started - a.started; }).slice(0, n);
    }
    function worst(T, skip) {
      /* NFL: the starter with the fewest points; NBA: the fewest points among starters who played */
      return Object.keys(T.players).map(function (k) { return T.players[k]; })
        .filter(function (p) { return p.wasStarter && (G === SPORT.ffl || p.startedGames > 0) && skip.indexOf(p) === -1; })
        .sort(function (a, b) { return a.started - b.started; })[0];
    }
    function benchBest(T) {
      return Object.keys(T.players).map(function (k) { return T.players[k]; }).filter(function (p) { return p.benched > 0; })
        .sort(function (a, b) { return b.benched - a.benched; })[0];
    }
    function pl(p) { return p.name + ' (' + [p.pos, p.team].filter(Boolean).join(', ') + ')'; }

    /* ---- results ---- */
    var results = [];
    (score.schedule || []).filter(function (m) { return m.matchupPeriodId === week; }).forEach(function (m) {
      if (!m.away) { if (team[m.home.teamId]) lines.push('\nDESCANSA (bye): ' + who(team[m.home.teamId])); return; }
      var H = team[m.home.teamId], A = team[m.away.teamId];
      if (!H || !A) return;
      var hp = Number(m.home.totalPoints) || 0, ap = Number(m.away.totalPoints) || 0;
      if (!hp && !ap && m.home.totalPointsLive != null) { hp = Number(m.home.totalPointsLive) || 0; ap = Number(m.away.totalPointsLive) || 0; }
      var win = hp === ap ? null : (hp > ap ? H : A);
      results.push({ H: H, A: A, hp: hp, ap: ap, margin: Math.abs(hp - ap), win: win });
      lines.push('\n## ' + H.name + ' ' + pts(hp) + ' vs ' + A.name + ' ' + pts(ap) + ' → ' +
        (win ? 'gana ' + win.name + ' por ' + pts(Math.abs(hp - ap)) : 'EMPATE') + (finished ? '' : ' (por ahora)'));
      [H, A].forEach(function (T) {
        var t3 = top(T, 3), w = worst(T, t3), bb = benchBest(T);
        lines.push('- ' + who(T) + ': mejores titulares: ' + (t3.length ? t3.map(function (p) { return pl(p) + ' ' + pts(p.started); }).join('; ') : 'nadie anotó todavía'));
        if (w) lines.push('  peor titular: ' + pl(w) + ' ' + pts(w.started));
        if (T.benched > 0) lines.push('  puntos que se quedaron en el BANCO: ' + pts(T.benched) + (bb ? ' (el que más: ' + pl(bb) + ' ' + pts(bb.benched) + ')' : ''));
      });
    });

    /* ---- the week's extremes ---- */
    var all = [];
    Object.keys(team).forEach(function (k) { Object.keys(team[k].players).forEach(function (id) { var p = team[k].players[id]; all.push({ p: p, T: team[k] }); }); });
    var bestWeek = all.filter(function (x) { return x.p.started > 0; }).sort(function (a, b) { return b.p.started - a.p.started; })[0];
    var bestGame = games.filter(function (g) { return !g.benched; }).sort(function (a, b) { return b.pts - a.pts; })[0];
    var worstGame = games.filter(function (g) { return !g.benched; }).sort(function (a, b) { return a.pts - b.pts; })[0];
    lines.push('\n## DESTACADOS');
    if (bestWeek) lines.push('- MVP ' + G.of + ': ' + pl(bestWeek.p) + ' de ' + bestWeek.T.name + ' con ' + pts(bestWeek.p.started));
    if (bestGame && L.espn.game !== 'ffl') lines.push('- Mejor juego individual: ' + bestGame.name + ' (' + bestGame.team + ') ' + pts(bestGame.pts) + ' el ' + dayOf(cal, L, bestGame.period));
    if (worstGame && worstGame.pts < 0) lines.push('- Peor actuación: ' + worstGame.name + ' (' + worstGame.team + ') ' + pts(worstGame.pts));
    if (results.length) {
      var close = results.slice().sort(function (a, b) { return a.margin - b.margin; })[0];
      var blow = results.slice().sort(function (a, b) { return b.margin - a.margin; })[0];
      lines.push('- Partido más cerrado: ' + close.H.name + ' vs ' + close.A.name + ' (diferencia ' + pts(close.margin) + ')');
      if (blow !== close) lines.push('- Paliza ' + G.of + ': ' + (blow.win ? blow.win.name : '') + ' por ' + pts(blow.margin));
      var scores = [];
      results.forEach(function (r) { scores.push({ T: r.H, v: r.hp }, { T: r.A, v: r.ap }); });
      scores.sort(function (a, b) { return b.v - a.v; });
      lines.push('- Más puntos: ' + scores[0].T.name + ' ' + pts(scores[0].v) + '. Menos puntos: ' + scores[scores.length - 1].T.name + ' ' + pts(scores[scores.length - 1].v));
      var lazy = Object.keys(team).map(function (k) { return team[k]; }).sort(function (a, b) { return b.benched - a.benched; })[0];
      if (lazy && lazy.benched > 0) lines.push('- Más puntos desperdiciados en el banco: ' + lazy.name + ' (' + pts(lazy.benched) + ')');
    }

    /* ---- WTH ---- */
    var limit = CONFIG.wth[L.espn.game];
    games.filter(function (g) { return g.pts >= limit; }).sort(function (a, b) { return b.pts - a.pts; }).forEach(function (g) {
      wth.push(g);
    });
    if (wth.length) {
      lines.push('\n## 🚨 WTH (fuera de lo normal: ' + limit + '+ puntos en ' + G.game + ')');
      wth.forEach(function (g) {
        lines.push('- ' + g.name + ' (' + g.team + ') hizo ' + pts(g.pts) + (L.espn.game === 'ffl' ? '' : ' el ' + dayOf(cal, L, g.period)) + (g.benched ? ' ¡Y ESTABA EN EL BANCO!' : ''));
      });
    }

    /* ---- moves ---- */
    var mvLines = [];
    mv.moves.forEach(function (m) {
      var name = mv.names[m.player] || ('jugador ' + m.player);
      if (m.type === 'ADD' && team[m.to]) {
        var after = team[m.to].players[m.player];
        mvLines.push('- ' + team[m.to].name + ' agregó a ' + name + (m.kind === 'WAIVER' ? ' (por waivers)' : '') + (after && after.started ? ' — y le dio ' + pts(after.started) + ' ' + G.that : ''));
      } else if (m.type === 'DROP' && team[m.from]) {
        mvLines.push('- ' + team[m.from].name + ' soltó a ' + name);
      } else if (m.type === 'TRADE' && team[m.from] && team[m.to]) {
        mvLines.push('- TRADE: ' + name + ' pasa de ' + team[m.from].name + ' a ' + team[m.to].name);
      }
    });
    if (mvLines.length) lines.push('\n## MOVIMIENTOS ' + G.of.toUpperCase() + '\n' + mvLines.slice(0, 20).join('\n'));

    /* ---- the table now ---- */
    var table = Object.keys(team).map(function (k) { return team[k]; }).sort(function (a, b) { return a.seed - b.seed; });
    lines.push('\n## TABLA AHORA');
    table.forEach(function (T, i) {
      var r = T.rec;
      var st = { WIN: 'W', LOSS: 'L', TIE: 'T' }[r.streakType];
      lines.push((i + 1) + '. ' + T.name + ' ' + (r.wins || 0) + '-' + (r.losses || 0) + (r.ties ? '-' + r.ties : '') + (st && r.streakLength ? ', racha ' + st + r.streakLength : '') + ', PF ' + pts(r.pointsFor));
    });

    /* ---- next week ---- */
    var nx = (next.schedule || []).filter(function (m) { return m.matchupPeriodId === week + 1; });
    if (nx.length) {
      lines.push('\n## ' + G.next + ' (' + (week + 1) + ')');
      nx.forEach(function (m) {
        if (!m.away) { if (team[m.home.teamId]) lines.push('- Descansa: ' + team[m.home.teamId].name); return; }
        if (team[m.home.teamId] && team[m.away.teamId]) lines.push('- ' + team[m.away.teamId].name + ' vs ' + team[m.home.teamId].name);
      });
    }
    return { text: lines.join('\n'), wth: wth, unit: unit, week: week, finished: finished, title: title };
  }

  /* ---------- quick "WTH" look at this week and last week, when the panel opens ---------- */
  function scanWTH(L, status) {
    var cur = (status && status.currentMatchupPeriod) || 1;
    var weeks = [cur, cur - 1].filter(function (w) { return w >= 1; });
    var latest = (status && status.latestScoringPeriod) || 999;
    return calendar(L).then(function (cal) {
      var jobs = [];
      weeks.forEach(function (w) {
        var info = cal && cal.weeks[w];
        (info ? info.periods : [w]).filter(function (p) { return p <= latest; }).forEach(function (p) { jobs.push({ w: w, p: p }); });
      });
      return Promise.all(jobs.map(function (job) {
        return espn(L, ['mBoxscore'], 'scoringPeriodId=' + job.p, onlyPeriod(job.w)).then(function (j) {
          var hits = [];
          (j.schedule || []).forEach(function (m) {
            [m.home, m.away].forEach(function (side) {
              var ros = side && side.rosterForCurrentScoringPeriod;
              ((ros && ros.entries) || []).forEach(function (e) {
                var v = Number(e.playerPoolEntry && e.playerPoolEntry.appliedStatTotal) || 0;
                if (v >= CONFIG.wth[L.espn.game]) {
                  hits.push({ week: job.w, period: job.p, pts: v, name: e.playerPoolEntry.player.fullName, teamId: side.teamId, benched: SPORT[L.espn.game].bench.indexOf(e.lineupSlotId) !== -1 });
                }
              });
            });
          });
          return hits;
        }, function () { return []; });
      })).then(function (lists) { return { cal: cal, hits: [].concat.apply([], lists) }; });
    });
  }

  /* ============================================================
     GEMINI (Firebase AI Logic + App Check, like Leonidas)
     ============================================================ */
  var modelPromise = null;
  function model() {
    if (modelPromise) return modelPromise;
    if (!FB.recaptchaKey) return Promise.reject(new Error('Falta la llave de App Check (recaptchaKey en assets/firebase-config.js).'));
    var b = 'https://www.gstatic.com/firebasejs/' + CONFIG.sdk + '/';
    modelPromise = Promise.all([import(b + 'firebase-app.js'), import(b + 'firebase-app-check.js'), import(b + 'firebase-ai.js')]).then(function (m) {
      var cfg = {};
      ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'].forEach(function (k) { if (FB[k]) cfg[k] = FB[k]; });
      var app = m[0].getApps().filter(function (a) { return a.name === 'newsgen'; })[0] || m[0].initializeApp(cfg, 'newsgen');
      var h = location.hostname;
      if (!h || h === 'localhost' || h === '127.0.0.1') self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      m[1].initializeAppCheck(app, { provider: new m[1].ReCaptchaEnterpriseProvider(FB.recaptchaKey), isTokenAutoRefreshEnabled: true });
      var ai = m[2].getAI(app, { backend: new m[2].GoogleAIBackend(), useLimitedUseAppCheckTokens: true });
      return m[2].getGenerativeModel(ai, {
        model: CONFIG.model,
        generationConfig: { temperature: CONFIG.temperature, maxOutputTokens: 8192, responseMimeType: 'application/json' }
      });
    });
    modelPromise.catch(function () { modelPromise = null; });
    return modelPromise;
  }

  function storyText(s) {
    return ['TITULAR: ' + s.headline].concat((s.blocks || []).filter(function (b) { return b.type === 'p' || b.type === 'h'; })
      .map(function (b) { return (b.type === 'h' ? '### ' : '') + b.text; })).join('\n');
  }
  function styleExamples(L) {
    var all = (window.LEAGUE_NEWS || []).filter(function (s) { return (s.blocks || []).filter(function (b) { return b.type === 'p'; }).length >= 5; });
    var same = all.filter(function (s) { return s.league === L.story; });
    var picks = same.slice(0, 1).concat(all.filter(function (s) { return same.indexOf(s) !== 0; })).slice(0, CONFIG.examples);
    return picks.map(function (s, i) { var t = storyText(s); return '--- EJEMPLO ' + (i + 1) + ' ---\n' + (t.length > 3500 ? t.slice(0, 3500) + '…' : t); }).join('\n\n');
  }
  function avoidList() {
    return (window.LEAGUE_NEWS || []).slice(0, CONFIG.avoid).map(function (s) {
      var p = (s.blocks || []).filter(function (b) { return b.type === 'p'; })[0];
      var hs = (s.blocks || []).filter(function (b) { return b.type === 'h'; }).map(function (b) { return b.text; });
      return '- "' + s.headline + '"' + (hs.length ? ' | subtítulos: ' + hs.slice(0, 6).join(' / ') : '') + (p ? ' | empezaba: "' + String(p.text).slice(0, 90) + '"' : '');
    }).join('\n');
  }

  function prompt(L, kind, facts, notes, tone) {
    var t = tone.id === 'sorpresa' ? TONES[1 + Math.floor(Math.random() * (TONES.length - 1))] : tone;
    var what = kind === 'wth'
      ? 'Una NOTICIA ESPECIAL corta (3 a 6 párrafos) sobre lo que pasó fuera de lo normal (la sección 🚨 WTH de los datos): quién fue, para qué equipo, qué significa para su matchup y para los demás, y un chiste sobre los que no lo tienen.'
      : 'El RESUMEN ' + (facts.unit === 'Semana' ? 'DE LA SEMANA ' : 'DEL MATCHUP ') + facts.week + ': una sección por cada matchup (un subtítulo dramático y 2 a 4 párrafos cortos), luego lo más loco de la semana (banco, movimientos, tabla) y al final la próxima semana.';
    return [
      'Eres el redactor de las noticias de LPBLSA (La Premier Bundesliga Serie A), una liga de fantasy de amigos puertorriqueños en lpblsa.vip. Escribes como el comisionado: en español con Spanglish natural, burlón y con cariño, como en el grupo de chat de la liga.',
      '',
      'ESCRIBE: ' + what,
      'TONO de esta vez: ' + t.guide,
      '',
      'REGLAS:',
      '- Usa SOLO los datos de abajo. Nunca inventes puntos, jugadores, récords ni jugadas. Copia los números tal cual. Si algo no está en los datos, no lo digas.',
      '- Las NOTAS DEL COMISIONADO son lo más importante: inclúyelas todas, con su gracia, y respeta lo que piden.',
      '- Habla de los equipos por su nombre y de vez en cuando del manager. Búrlate de los que perdieron, de los puntos en el banco y de los movimientos malos; celebra los buenos. Nada ofensivo de verdad.',
      '- Párrafos cortos (2 a 4 oraciones). Nada de listas. Nada de frases de IA como "en conclusión", "sin duda", "cabe destacar".',
      '- NO repitas titulares, subtítulos ni comienzos de las noticias recientes (abajo). Busca un ángulo nuevo: lo más raro de esta semana.',
      facts.finished ? '' : '- La semana TODAVÍA NO TERMINA: escríbelo como "va así" y no declares ganadores definitivos.',
      '',
      'RESPONDE SOLO con JSON así: {"headline": "titular corto y con gancho", "summary": "una o dos líneas para que den click", "blocks": [{"type":"h","text":"subtítulo"},{"type":"p","text":"párrafo"}]}',
      '',
      '=== NOTAS DEL COMISIONADO ===',
      notes ? notes : '(ninguna esta vez)',
      '',
      '=== DATOS DE ESPN ===',
      facts.text,
      '',
      '=== NOTICIAS RECIENTES (NO las repitas) ===',
      avoidList() || '(ninguna)',
      '',
      '=== TU ESTILO: noticias que ya escribiste (imita la voz, no copies frases) ===',
      styleExamples(L) || '(todavía no hay)'
    ].filter(function (x) { return x !== null; }).join('\n');
  }

  function parseStory(text) {
    var t = String(text || '').trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
    var j;
    try { j = JSON.parse(t); } catch (e) {
      var a = t.indexOf('{'), b = t.lastIndexOf('}');
      if (a === -1 || b <= a) throw new Error('Gemini no devolvió una noticia válida. Dale otra vez.');
      j = JSON.parse(t.slice(a, b + 1));
    }
    var blocks = (Array.isArray(j.blocks) ? j.blocks : []).map(function (b) {
      return { type: b && b.type === 'h' ? 'h' : 'p', text: String((b && b.text) || '').trim() };
    }).filter(function (b) { return b.text; });
    if (!j.headline || !blocks.length) throw new Error('Gemini devolvió una noticia vacía. Dale otra vez.');
    return { headline: String(j.headline).trim(), summary: String(j.summary || '').trim(), blocks: blocks };
  }

  function friendly(err) {
    var t = String((err && err.message) || err || '');
    if (/429|quota|exhausted/i.test(t)) return 'Gemini llegó a su límite gratis por ahora. Intenta en un rato.';
    if (/app.?check|recaptcha|401|403|permission/i.test(t)) return 'Gemini no aceptó la página (App Check). En tu computadora usa el debug token, como con Leonidas.';
    return t || 'Algo falló.';
  }

  /* ============================================================
     THE PANEL
     ============================================================ */
  host.innerHTML =
    '<div class="ng-head"><h3>🤖 Generar noticia</h3><span class="section-note">Escribe un borrador con lo que pasó en ESPN y tus notas. Tú lo revisas y lo publicas.</span></div>' +
    '<div class="ng-wth" id="ngWth" hidden></div>' +
    '<div class="ng-grid">' +
      '<div class="field"><label>Liga</label><div class="chip-row" id="ngLeague">' +
        leagues.map(function (L, i) { return '<button type="button" class="chip' + (i === leagues.length - 1 ? ' active' : '') + '" data-key="' + esc(L.key) + '">' + esc(L.short) + '</button>'; }).join('') +
      '</div></div>' +
      '<div class="field"><label>Qué noticia</label><div class="chip-row" id="ngKind">' +
        '<button type="button" class="chip active" data-kind="week">Resumen de la semana</button>' +
        '<button type="button" class="chip" data-kind="wth">🚨 Especial WTH</button>' +
      '</div></div>' +
      '<div class="field"><label for="ngWeek">Semana</label><select id="ngWeek"><option>Cargando…</option></select></div>' +
      '<div class="field"><label for="ngTone">Tono</label><select id="ngTone">' +
        TONES.map(function (t) { return '<option value="' + t.id + '">' + esc(t.label) + '</option>'; }).join('') +
      '</select></div>' +
    '</div>' +
    '<div class="field"><label for="ngNotes">Tus notas y chistes (lo que tiene que decir, sí o sí)</label>' +
      '<textarea id="ngNotes" rows="3" placeholder="Ej.: Peter&#39;s sigue abandonado, pidan una vela. Detatch estaba en una boda y dejó a Jokić en el banco."></textarea></div>' +
    '<div class="ng-actions"><button type="button" class="btn btn-solid" id="ngGo">Generar borrador</button>' +
      '<button type="button" class="btn btn-ghost" id="ngAgain" style="display:none">Otra versión</button>' +
      '<span class="ng-msg" id="ngMsg" role="status" aria-live="polite"></span></div>' +
    '<details class="ng-facts" id="ngFacts" hidden><summary>Lo que encontré en ESPN (revisa los números)</summary><pre id="ngFactsText"></pre></details>';

  var $ = function (id) { return document.getElementById(id); };
  var state = { L: leagues[leagues.length - 1], kind: 'week', facts: null, factsKey: '', status: {} };
  function say(t, bad) { $('ngMsg').textContent = t; $('ngMsg').className = 'ng-msg' + (bad ? ' bad' : ''); }

  function loadLeague() {
    var L = state.L;
    $('ngWeek').innerHTML = '<option>Cargando…</option>';
    $('ngWth').hidden = true;
    return espn(L, ['mStatus']).then(function (j) {
      var st = j.status || {};
      state.status[L.key] = st;
      var cur = st.currentMatchupPeriod || 1;
      var unit = SPORT[L.espn.game].unit;
      var opts = [];
      for (var w = cur; w >= 1; w--) opts.push('<option value="' + w + '"' + (w === Math.max(1, cur - 1) ? ' selected' : '') + '>' + unit + ' ' + w + (w === cur ? ' (en juego)' : '') + '</option>');
      $('ngWeek').innerHTML = opts.join('');
      return scanWTH(L, st).then(function (r) {
        if (state.L !== L || !r.hits.length) return;
        var best = r.hits.sort(function (a, b) { return b.pts - a.pts; })[0];
        var when = L.espn.game === 'ffl' ? 'en la semana ' + best.week : (r.cal ? 'el ' + dayOf(r.cal, L, best.period) : '');
        $('ngWth').innerHTML = '<b>🚨 ¡WTH!</b> ' + esc(best.name) + ' hizo <b>' + pts(best.pts) + '</b> puntos ' + esc(when) +
          (best.benched ? ' <b>¡en el banco!</b>' : '') + (r.hits.length > 1 ? ' (y ' + (r.hits.length - 1) + ' más)' : '') +
          ' <button type="button" class="btn btn-small" id="ngWthGo">Escribir la noticia especial</button>';
        $('ngWth').hidden = false;
        $('ngWthGo').onclick = function () {
          setKind('wth');
          $('ngWeek').value = String(best.week);
          generate(false);
        };
      });
    }).catch(function (err) { say(err.message, true); });
  }
  function setKind(k) {
    state.kind = k;
    Array.prototype.forEach.call($('ngKind').querySelectorAll('.chip'), function (c) { c.classList.toggle('active', c.getAttribute('data-kind') === k); });
  }
  $('ngLeague').addEventListener('click', function (e) {
    var c = e.target.closest('.chip');
    if (!c) return;
    state.L = leagues.filter(function (L) { return L.key === c.getAttribute('data-key'); })[0];
    Array.prototype.forEach.call(this.querySelectorAll('.chip'), function (x) { x.classList.toggle('active', x === c); });
    state.facts = null;
    loadLeague();
  });
  $('ngKind').addEventListener('click', function (e) { var c = e.target.closest('.chip'); if (c) setKind(c.getAttribute('data-kind')); });

  var busy = false;
  function generate(reuse) {
    if (busy) return;
    var L = state.L, week = Number($('ngWeek').value) || 1;
    var key = L.key + ':' + week;
    busy = true;
    $('ngGo').disabled = $('ngAgain').disabled = true;
    var factsP = reuse && state.facts && state.factsKey === key ? Promise.resolve(state.facts) : (say('Leyendo ESPN…'), collect(L, week));
    factsP.then(function (facts) {
      state.facts = facts; state.factsKey = key;
      $('ngFactsText').textContent = facts.text;
      $('ngFacts').hidden = false;
      if (state.kind === 'wth' && !facts.wth.length) {
        say('No hubo nada WTH en esa semana (' + CONFIG.wth[L.espn.game] + '+ puntos en ' + SPORT[L.espn.game].game + '). Escribo el resumen normal.');
        setKind('week');
      }
      say('Escribiendo… (unos 20 a 40 segundos)');
      var tone = TONES.filter(function (t) { return t.id === $('ngTone').value; })[0] || TONES[0];
      return model().then(function (m) {
        return m.generateContent(prompt(L, state.kind, facts, $('ngNotes').value.trim(), tone));
      }).then(function (res) {
        var story = parseStory(res.response.text());
        var today = new Date();
        story.league = L.story;
        story.date = (L.espn.game === 'ffl' ? 'Week ' : 'Matchup ') + facts.week + ' | ' + MONTHS[today.getMonth()] + ' ' + today.getDate();
        if (!window.LPBSA_WRITER || !window.LPBSA_WRITER.fillNew) throw new Error('El formulario todavía no está listo. Espera un segundo y dale otra vez.');
        window.LPBSA_WRITER.fillNew(story);
        $('ngAgain').style.display = '';
        say('¡Borrador listo abajo! Revísalo, cámbialo, ponle foto y dale "Add story".');
      });
    }).catch(function (err) {
      if (window.console) console.warn('[news generator]', err);
      say(friendly(err), true);
    }).then(function () {
      busy = false;
      $('ngGo').disabled = $('ngAgain').disabled = false;
    });
  }
  $('ngGo').addEventListener('click', function () { generate(false); });
  $('ngAgain').addEventListener('click', function () { generate(true); });

  loadLeague();
  window.LPBSA_NEWSGEN = { collect: collect, prompt: prompt, state: state, CONFIG: CONFIG };
})();
