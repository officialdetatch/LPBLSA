/* ============================================================
   LA JORNADA + LOS PREMIOS  --  the sections that run themselves,
   for every league (NFL, NBA, UCL...).

   1. LA JORNADA   <div id="jornada" data-league="nfl"></div>
      This week's matchups as head-to-head cards, the team on bye, and a
      sign that says when the games start or that they are on. Which week it
      is comes from the league's schedule file
      (leagues/<league>/assets/<league>-schedule-data.js), so it moves on by
      itself. Records and points come from the league's standings file, so the
      cards change whenever the standings manager saves.

   2. LOS PREMIOS  <div id="premios" data-league="nfl"></div>
      Up to four awards worked out from the standings: who leads, who is
      lucky, who is unlucky, who gets hit the hardest, who is on a streak...
      each with its line of trash talk. New standings = new awards.

   data-league="auto" (the home page) shows every OPEN league that has what it
   needs - a tab per league, like the Standings - and only the ones that are
   ready: a league joins by itself the day its schedule / standings have data.
   A box with nothing to show hides its whole section, so it is safe to leave
   it on a page all year. More than one box per page: use data-jornada /
   data-premios instead of the id, e.g. <div data-premios data-league="nba"></div>

   3. On a league page (<body data-league="nfl">), any element with
      data-auto="..." is kept up to date:
        week          this week's number           leader     who is 1st
        weeks-left    weeks left in the season     top-ppw    most points per week
        top-ppw-team  that team's initials
      The number written in the HTML is only what shows if the script can't run.

   Needs, loaded before it: assets/leagues.js, each league's teams and
   standings files and (for La Jornada) its schedule file.
   ============================================================ */
(function () {
  'use strict';

  if (!window.LPBSA_findLeague) return;
  var body = document.body;
  var root = body.getAttribute('data-root') || '';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function fmt(n) { return (Math.round(n * 10) / 10).toFixed(1); }
  function signed(n) {
    var r = Math.round(n * 10) / 10;
    return (r > 0 ? '+' : r < 0 ? '−' : '') + Math.abs(r).toFixed(1);
  }
  function hideSection(el) {
    var sec = el.closest('section');
    if (sec) sec.hidden = true; else el.hidden = true;
  }

  /* ---------- a league's numbers, one entry per team in standings order ---------- */
  function rowsFor(key) {
    var all = window.LPBSA_STANDINGS || {};
    if (all[key] && all[key].length) return all[key];
    if (body.getAttribute('data-league') === key && window.LEAGUE_STANDINGS) return window.LEAGUE_STANDINGS;
    return [];
  }
  function statsFor(key) {
    var L = window.LPBSA_findLeague(key);
    var teams = (window.LPBSA_teamsOf && window.LPBSA_teamsOf(key)) || [];
    var teamBy = {};
    teams.forEach(function (t) { teamBy[t.slug] = t; });
    var list = rowsFor(key).map(function (r, i) {
      var w = Number(r.w) || 0, l = Number(r.l) || 0, t = Number(r.t) || 0, gp = w + l + t;
      var pf = parseFloat(r.pf) || 0, pa = parseFloat(r.pa) || 0;
      var st = /^([WLT])\s*(\d+)/i.exec(String(r.streak || '').trim());
      return {
        slug: r.team, team: teamBy[r.team] || { slug: r.team, name: r.name || r.team },
        rank: i + 1, w: w, l: l, t: t, gp: gp,
        pfg: gp ? pf / gp : 0, pag: gp ? pa / gp : 0, diff: gp ? (pf - pa) / gp : 0,
        streakType: st ? st[1].toUpperCase() : '', streakN: st ? Number(st[2]) : 0
      };
    });
    var by = {};
    list.forEach(function (e) { by[e.slug] = e; });
    return { L: L, list: list, by: by, teamBy: teamBy };
  }
  function recordOf(e) { return e.w + '-' + e.l + (e.t ? '-' + e.t : ''); }
  function teamOf(info, slug) { return (info.by[slug] && info.by[slug].team) || info.teamBy[slug] || { slug: slug, name: slug }; }

  function crestHTML(L, t) {
    var initials = t.initials || String(t.name || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
    var img = '';
    if (t.crest) {
      var src = /^(https?:)?\/\//i.test(t.crest) || t.crest.charAt(0) === '/' ? t.crest : root + (L.assetRoot || '') + t.crest;
      img = '<img src="' + esc(src) + '" alt="" loading="lazy" onerror="this.remove()">';
    }
    return '<span class="crest' + (t.shape === 'circle' ? ' crest-circle' : '') + '">' + img +
      '<span class="crest-fallback">' + esc(initials) + '</span></span>';
  }
  function teamHref(L, slug) { return L.teamPages ? root + L.teamPages + slug + '.html' : ''; }

  /* ---------- New York time (the weeks follow it, wherever the visitor is) ---------- */
  var nyFormat = null;
  try {
    nyFormat = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hourCycle: 'h23',
      year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  } catch (e) { nyFormat = null; }
  function nyOffsetMin(ms) {
    if (!nyFormat || !nyFormat.formatToParts) return -240;   /* very old browser: assume summer time */
    var p = {};
    nyFormat.formatToParts(new Date(ms)).forEach(function (x) { p[x.type] = x.value; });
    var asUTC = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour) % 24, Number(p.minute));
    return Math.round((asUTC - ms) / 60000);
  }
  /* a New York wall-clock time -> the real moment (days may run past the end of the month) */
  function nyTime(y, m, d, h, mi) {
    var guess = Date.UTC(y, m - 1, d, h, mi);
    var t = guess - nyOffsetMin(guess) * 60000;
    return guess - nyOffsetMin(t) * 60000;
  }

  /* ---------- the calendar ---------- */
  /* A week turns over at 4 AM New York time on its first day, safely after the
     last late game of the week before. */
  var TURNOVER_HOUR = 4;
  function ymd(str) {
    var d = String(str || '').split('-').map(Number);
    return d.length === 3 && d[0] && d[1] && d[2] ? d : null;
  }
  function plusDays(d, n) {
    var t = new Date(Date.UTC(d[0], d[1] - 1, d[2] + n));
    return [t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()];
  }
  /* The first day of every week: a week's own "starts" date if it has one,
     otherwise 7 days after the week before (week 1: the schedule's "start"). */
  function scheduleOf(key) {
    var S = (window.LPBSA_SCHEDULE || {})[key];
    if (!S || !S.weeks || !S.weeks.length) return null;
    var weeks = S.weeks.slice().sort(function (a, b) { return a.week - b.week; });
    var days = [];
    for (var i = 0; i < weeks.length; i++) {
      var d = ymd(weeks[i].starts) || (i ? plusDays(days[i - 1], 7) : ymd(S.start));
      if (!d) return null;
      days.push(d);
    }
    var end = ymd(S.end) ? plusDays(ymd(S.end), 1) : plusDays(days[days.length - 1], 7);
    return { S: S, weeks: weeks, days: days, end: end };
  }
  /* Which week it is: { week, entry, phase: 'soon' | 'live' | 'over', kickoff, ... } */
  function calendarOf(sc, now) {
    var ko = sc.S.kickoff || {};
    var kt = String(ko.time || '20:15').split(':').map(Number);
    function at(d, h, mi) { return nyTime(d[0], d[1], d[2], h, mi); }
    var i = 0;
    while (i < sc.weeks.length - 1 && now >= at(sc.days[i + 1], TURNOVER_HOUR, 0)) i++;
    var kickoff = at(plusDays(sc.days[i], ko.day || 0), kt[0] || 0, kt[1] || 0);
    var phase = now >= at(sc.end, TURNOVER_HOUR, 0) ? 'over' : (now >= kickoff ? 'live' : 'soon');
    return {
      week: sc.weeks[i].week, entry: sc.weeks[i], phase: phase, kickoff: kickoff,
      first: sc.weeks[0].week, last: sc.weeks[sc.weeks.length - 1].week,
      label: ko.label || 'Kickoff', unit: sc.S.weekLabel || 'Semana'
    };
  }

  function countdownText(ms) {
    var m = Math.max(0, Math.floor(ms / 60000));
    var dd = Math.floor(m / 1440), hh = Math.floor(m % 1440 / 60), mm = m % 60;
    if (dd > 0) return dd + 'd ' + hh + 'h';
    if (hh > 0) return hh + 'h ' + mm + 'm';
    return mm + 'm';
  }
  function statusHTML(cal, now) {
    if (cal.phase === 'live') {
      return '<span class="jornada-chip is-live"><span class="live-dot" aria-hidden="true"></span>En juego</span>';
    }
    if (cal.phase === 'over') return '<span class="jornada-chip">Temporada regular terminada</span>';
    return '<span class="jornada-chip is-soon">' + esc(cal.label) + ' en <b>' + countdownText(cal.kickoff - now) + '</b></span>';
  }

  /* ---------- the trash talk for one matchup ---------- */
  function matchupLine(a, b, nTeams) {
    var A = a.team.name, B = b.team.name;
    if (!a.gp && !b.gp) return 'Primera jornada. Nadie tiene excusas todavía.';
    var aUnb = a.gp && !a.l && !a.t, bUnb = b.gp && !b.l && !b.t;
    if (aUnb && bUnb) return 'Invicto contra invicto. Uno de los dos se va a casa con su primera L.';
    if ((a.rank === 1 && b.rank === nTeams) || (b.rank === 1 && a.rank === nTeams)) {
      return 'El líder contra el sótano. Esto huele a paliza… o a la sorpresa del año.';
    }
    if (aUnb || bUnb) {
      var u = aUnb ? A : B, o = aUnb ? B : A;
      return u + ' viene invicto. ¿' + o + ' lo va a permitir?';
    }
    var cold = [a, b].filter(function (x) { return x.streakType === 'L' && x.streakN >= 2; })
      .sort(function (x, y) { return y.streakN - x.streakN; })[0];
    if (cold) return cold.team.name + ' viene con ' + cold.streakN + ' derrotas al hilo. Hoy o nunca.';
    var hot = [a, b].filter(function (x) { return x.streakType === 'W' && x.streakN >= 2; })
      .sort(function (x, y) { return y.streakN - x.streakN; })[0];
    if (hot) return hot.team.name + ' viene en llamas: ' + hot.streakN + ' victorias al hilo.';
    if (a.rank <= 2 && b.rank <= 2) return 'Duelo en la cima. Aquí se decide quién manda.';
    if (a.w === b.w && a.l === b.l && a.t === b.t) {
      return 'Mismo récord, ' + recordOf(a) + '. Alguien sale de aquí con cara larga.';
    }
    if (Math.abs(a.rank - b.rank) >= 3) return 'En el papel no hay competencia. Por eso se juega.';
    return 'Parejo en el papel. Pierde el que no revise su lineup.';
  }

  var BYE_LINES = [
    ' descansa esta semana. Ni gana ni pierde: la semana perfecta.',
    ' está de vacaciones. Buen momento para meterle mano al waiver.',
    ' no juega esta semana. El grupo de chat los extraña. Mentira.'
  ];

  /* ---------- 1. La Jornada for one league ---------- */
  function renderJornada(host, key) {
    var sc = scheduleOf(key);
    var info = statsFor(key);
    if (!info.L || !sc) return null;
    var L = info.L;
    var sec = host.closest('section');
    var statusEl = sec ? sec.querySelector('[data-jornada-status]') : null;

    function draw() {
      var now = Date.now();
      var cal = calendarOf(sc, now);
      if (statusEl) statusEl.innerHTML = statusHTML(cal, now);
      if (cal.phase === 'over') {
        host.innerHTML = '<div class="jornada-over"><p><b>Se acabó la temporada regular de ' + esc(L.short) + '.</b> ' +
          'Ahora sí: playoffs. Aquí ya no hay excusas.</p>' +
          (L.playoffs ? '<a class="btn btn-solid" href="' + esc(root + L.playoffs) + '">Ver los playoffs</a>' : '') + '</div>';
        return cal;
      }
      var wk = cal.entry || { games: [], bye: '' };
      var n = info.list.length || Object.keys(info.teamBy).length;
      function entryOf(slug) {
        return info.by[slug] || { slug: slug, team: teamOf(info, slug), rank: 0, w: 0, l: 0, t: 0, gp: 0, pfg: 0, pag: 0, diff: 0, streakType: '', streakN: 0 };
      }
      function sideHTML(e) {
        var href = teamHref(L, e.slug);
        var inner = crestHTML(L, e.team) + '<span class="mu-name">' + esc(e.team.name) + '</span>' +
          '<span class="mu-rec">' + (e.gp ? '<b>' + esc(recordOf(e)) + '</b>' + (e.rank ? ' &middot; #' + e.rank : '') : 'Sin jugar') + '</span>';
        return href ? '<a class="mu-team" href="' + esc(href) + '">' + inner + '</a>' : '<div class="mu-team">' + inner + '</div>';
      }
      var games = (wk.games || []).map(function (g) {
        var a = entryOf(g[0]), b = entryOf(g[1]);
        var bar = '';
        if (a.gp && b.gp && a.pfg + b.pfg > 0) {
          var pct = Math.round(a.pfg / (a.pfg + b.pfg) * 1000) / 10;
          bar = '<div class="mu-bar">' +
            '<div class="mu-bar-labels"><b>' + fmt(a.pfg) + '</b><span>Puntos por semana</span><b>' + fmt(b.pfg) + '</b></div>' +
            '<div class="mu-bar-track" role="img" aria-label="Puntos por semana: ' + esc(a.team.name) + ' ' + fmt(a.pfg) +
              ', ' + esc(b.team.name) + ' ' + fmt(b.pfg) + '"><span class="mu-bar-a" style="width:' + pct + '%"></span>' +
              '<span class="mu-bar-b"></span></div></div>';
        }
        return '<article class="matchup" aria-label="' + esc(a.team.name) + ' contra ' + esc(b.team.name) + '">' +
          '<div class="mu-teams">' + sideHTML(a) + '<span class="mu-vs" aria-hidden="true">VS</span>' + sideHTML(b) + '</div>' +
          bar + '<p class="mu-sass">' + esc(matchupLine(a, b, n)) + '</p></article>';
      }).join('');
      var byes = [].concat(wk.bye || []).filter(Boolean).map(function (slug) {
        var bt = teamOf(info, slug);
        var href = teamHref(L, slug);
        var name = '<b>' + esc(bt.name) + '</b>';
        return '<div class="jornada-bye">' + crestHTML(L, bt) + '<p>' +
          (href ? '<a href="' + esc(href) + '">' + name + '</a>' : name) + esc(BYE_LINES[cal.week % BYE_LINES.length]) + '</p></div>';
      }).join('');
      host.innerHTML =
        '<p class="jornada-week"><b>' + esc(cal.unit) + ' ' + cal.week + '</b> de ' + esc(L.name) + '</p>' +
        '<div class="jornada-games">' + games + '</div>' + byes;
      return cal;
    }

    var cal = draw();
    /* keep the countdown honest, and switch to "En juego" at kickoff without a reload */
    if (host._jTimer) window.clearInterval(host._jTimer);
    host._jTimer = null;
    if (cal.phase !== 'over') {
      host._jTimer = window.setInterval(function () {
        var now = Date.now();
        var next = calendarOf(sc, now);
        if (next.week !== cal.week || next.phase !== cal.phase) cal = draw();
        else if (statusEl) statusEl.innerHTML = statusHTML(next, now);
        if (cal.phase === 'over') { window.clearInterval(host._jTimer); host._jTimer = null; }
      }, 30000);
    }
    return cal;
  }

  /* ---------- 2. Los Premios for one league ---------- */
  function joinES(parts) {
    if (parts.length < 2) return parts.join('');
    return parts.slice(0, -1).join(', ') + ' y ' + parts[parts.length - 1];
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function awardsFor(info) {
    var list = info.list.filter(function (e) { return e.gp > 0; });
    if (list.length < 3 || list.length !== info.list.length) return [];
    var n = list.length;
    /* a league that keeps no points (or no points against) only gets the awards it can back up */
    var hasPF = list.some(function (e) { return e.pfg > 0; });
    var hasPA = hasPF && list.some(function (e) { return e.pag > 0; });
    var byPF = list.slice().sort(function (a, b) { return b.pfg - a.pfg || a.rank - b.rank; });
    var byDiff = list.slice().sort(function (a, b) { return b.diff - a.diff || a.rank - b.rank; });
    var diffRank = {};
    byDiff.forEach(function (e, i) { diffRank[e.slug] = i + 1; });
    var leader = list[0];

    /* the leader's card collects every way they are dominating */
    var facts = [];
    if (!leader.l && !leader.t) facts.push('invicto');
    if (hasPF && byPF[0].slug === leader.slug) facts.push('el que más anota');
    if (leader.streakType === 'W' && leader.streakN >= 2) facts.push(leader.streakN + ' victorias al hilo');
    var tail = ['Y lo sabe.', 'Que alguien los pare.', 'Esto ya es abuso.'];
    var dueno = {
      e: leader, icon: '👑', title: 'El Dueño', stat: recordOf(leader), unit: '#1 en la tabla', top: true,
      line: facts.length ? cap(joinES(facts)) + '. ' + tail[Math.min(facts.length, 3) - 1] : 'Arriba de todos. Por ahora.'
    };

    function biggestGap(test) {
      var best = null;
      list.forEach(function (e) {
        var gap = test(e);
        if (gap >= 2 && (!best || gap > best.gap)) best = { e: e, gap: gap };
      });
      return best && best.e;
    }
    var candidates = [
      function () {
        if (!hasPF) return null;
        var e = byPF[0];
        if (e.slug === leader.slug) return null;
        return { e: e, icon: '💣', title: 'La Aplanadora', stat: fmt(e.pfg), unit: 'puntos por semana',
          line: 'Anota más que nadie y ni así es líder. Alguien está robando.' };
      },
      function () {
        if (!hasPA) return null;
        var e = biggestGap(function (x) { return diffRank[x.slug] - x.rank; });
        if (!e) return null;
        var how = diffRank[e.slug] === n ? 'el peor diferencial de la liga' : 'apenas el diferencial #' + diffRank[e.slug];
        return { e: e, icon: '🍀', title: 'El Suertudo', stat: signed(e.diff), unit: 'diferencial por semana',
          line: '#' + e.rank + ' en la tabla con ' + how + '. Eso no es talento, es suerte.' };
      },
      function () {
        if (!hasPA) return null;
        var e = biggestGap(function (x) { return x.rank - diffRank[x.slug]; });
        if (!e) return null;
        return { e: e, icon: '😩', title: 'Bendito', stat: signed(e.diff), unit: 'diferencial por semana',
          line: 'Los números dicen #' + diffRank[e.slug] + '. La tabla dice #' + e.rank + '. Bendito.' };
      },
      function () {
        if (!hasPA) return null;
        var e = list.slice().sort(function (a, b) { return b.pag - a.pag || a.rank - b.rank; })[0];
        return { e: e, icon: '🥊', title: 'El Saco de Boxeo', stat: fmt(e.pag), unit: 'en contra por semana',
          line: 'Le meten ' + fmt(e.pag) + ' por semana. Que alguien llame a la policía.' };
      },
      function () {
        var e = list.filter(function (x) { return x.streakType === 'W' && x.streakN >= 2; })
          .sort(function (a, b) { return b.streakN - a.streakN || a.rank - b.rank; })[0];
        if (!e) return null;
        return { e: e, icon: '🔥', title: 'En Llamas', stat: 'W' + e.streakN, unit: 'racha',
          line: e.streakN + ' victorias al hilo. El grupo de chat ya tiene miedo.' };
      },
      function () {
        var e = list.filter(function (x) { return x.streakType === 'L' && x.streakN >= 2; })
          .sort(function (a, b) { return b.streakN - a.streakN || b.rank - a.rank; })[0];
        if (!e) return null;
        return { e: e, icon: '🧊', title: 'Congelado', stat: 'L' + e.streakN, unit: 'racha',
          line: e.streakN + ' derrotas al hilo. ¿Alguien revisó si ese lineup está prendido?' };
      },
      function () {
        var e = list[n - 1];
        return { e: e, icon: '🕳️', title: 'El Sótano', stat: recordOf(e), unit: '#' + n + ' en la tabla',
          line: 'Alguien tiene que estar aquí abajo. Esta semana les tocó a ellos.' };
      }
    ];

    var out = [dueno], used = {};
    used[leader.slug] = true;
    candidates.forEach(function (fn) {
      if (out.length >= 4) return;
      var a = fn();
      if (a && !used[a.e.slug]) { used[a.e.slug] = true; out.push(a); }
    });
    if (out.length < 4 && hasPA) {
      var rest = list.filter(function (e) { return !used[e.slug]; })
        .sort(function (a, b) { return Math.abs(a.diff) - Math.abs(b.diff) || a.rank - b.rank; });
      if (rest.length) {
        var e = rest[0];
        out.push({ e: e, icon: '😐', title: 'Ni Fu Ni Fa', stat: signed(e.diff), unit: 'diferencial por semana',
          line: 'Ni muy bueno ni muy malo: el equipo más promedio de la liga. Nadie habla de ellos. Todavía.' });
      }
    }
    return out.length >= 2 ? out : [];
  }

  function renderPremios(host, key) {
    var info = statsFor(key);
    if (!info.L) return false;
    var awards = awardsFor(info);
    if (!awards.length) return false;
    var L = info.L;
    host.classList.add('premios');
    host.innerHTML = awards.map(function (a) {
      var href = teamHref(L, a.e.slug);
      var name = esc(a.e.team.name);
      return '<article class="premio' + (a.top ? ' is-top' : '') + '">' +
        '<span class="premio-icon" aria-hidden="true">' + a.icon + '</span>' +
        '<h3 class="premio-title">' + esc(a.title) + '</h3>' +
        crestHTML(L, a.e.team) +
        '<p class="premio-team">' + (href ? '<a href="' + esc(href) + '">' + name + '</a>' : name) + '</p>' +
        '<p class="premio-stat"><b>' + esc(a.stat) + '</b><span>' + esc(a.unit) + '</span></p>' +
        '<p class="premio-line">' + esc(a.line) + '</p>' +
      '</article>';
    }).join('');
    return true;
  }

  /* ---------- one box: a single league, or "auto" = a tab per league that is ready ---------- */
  var KINDS = {
    jornada: {
      label: 'La Jornada por liga',
      render: renderJornada,
      ready: function (key) { return !!scheduleOf(key) && !!window.LPBSA_findLeague(key); }
    },
    premios: {
      label: 'Los Premios por liga',
      render: renderPremios,
      ready: function (key) { return awardsFor(statsFor(key)).length > 0; }
    }
  };
  function mount(kind, host) {
    var K = KINDS[kind];
    var want = String(host.getAttribute('data-league') || 'auto').toLowerCase();
    if (want !== 'auto') {
      if (!K.render(host, want)) hideSection(host);
      return;
    }
    var leagues = (window.LPBSA_LEAGUES || []).filter(function (L) { return L.status === 'live' && K.ready(L.key); });
    if (!leagues.length) { hideSection(host); return; }
    if (leagues.length === 1) { K.render(host, leagues[0].key); return; }

    host.innerHTML = '<div class="chip-row league-tabs" role="tablist" aria-label="' + esc(K.label) + '">' +
      leagues.map(function (L) {
        return '<button type="button" class="chip" role="tab" data-tab="' + esc(L.key) + '">' + esc(L.short) + '</button>';
      }).join('') + '</div><div class="league-panel" role="tabpanel"></div>';
    var panel = host.querySelector('.league-panel');
    function show(key) {
      Array.prototype.forEach.call(host.querySelectorAll('[data-tab]'), function (b) {
        var on = b.getAttribute('data-tab') === key;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panel.className = 'league-panel';
      K.render(panel, key);
    }
    host.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-tab]') : null;
      if (b) show(b.getAttribute('data-tab'));
    });
    /* La Jornada opens on a league whose games are on right now, if there is one */
    var first = leagues[0].key;
    if (kind === 'jornada') {
      var now = Date.now();
      var liveOne = leagues.filter(function (L) { return calendarOf(scheduleOf(L.key), now).phase === 'live'; })[0];
      if (liveOne) first = liveOne.key;
    }
    show(first);
  }

  /* ---------- 3. data-auto numbers on a league page ---------- */
  function fillAuto(key, cal) {
    var els = document.querySelectorAll('[data-auto]');
    if (!els.length) return;
    var info = statsFor(key);
    var leader = info.list[0];
    var top = info.list.filter(function (e) { return e.gp > 0 && e.pfg > 0; })
      .sort(function (a, b) { return b.pfg - a.pfg || a.rank - b.rank; })[0];
    Array.prototype.forEach.call(els, function (el) {
      var what = el.getAttribute('data-auto');
      var val = null;
      if (what === 'week' && cal) val = cal.week;
      else if (what === 'weeks-left' && cal) val = cal.phase === 'over' ? 0 : cal.last - cal.week + 1;
      else if (what === 'leader' && leader) val = leader.team.name;
      else if (what === 'top-ppw' && top) val = fmt(top.pfg);
      else if (what === 'top-ppw-team' && top) val = top.team.initials || top.team.name;
      if (val !== null) el.textContent = String(val);
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('#jornada, [data-jornada]'), function (h) { mount('jornada', h); });
  Array.prototype.forEach.call(document.querySelectorAll('#premios, [data-premios]'), function (h) { mount('premios', h); });

  var pageLeague = body.getAttribute('data-league') || '';
  if (pageLeague) {
    var sc = scheduleOf(pageLeague);
    fillAuto(pageLeague, sc ? calendarOf(sc, Date.now()) : null);
  }
})();
