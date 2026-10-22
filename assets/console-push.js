/* ============================================================
   CONSOLA  --  "Mandar una notificación": your own push messages.
   You write a title and a message, pick who it is for (everyone, or one
   fantasy's fans) and where tapping it goes, and press Enviar. The Consola
   saves it in alerts/push-messages.json (one commit, with the same GitHub key
   as everything else here); .github/workflows/push-message.yml then sends it
   to every device that turned notifications on, a minute or two later.
   Send as many as you like - each one goes out once.
   ============================================================ */
(function () {
  'use strict';

  var P = window.LPBSA_PUBLISH;
  var host = document.getElementById('csPush');
  if (!P || !host) return;

  var FILE = 'alerts/push-messages.json';
  var KEEP = 30;                    /* the file keeps the last 30 messages */
  var TITLE_MAX = 60, BODY_MAX = 160;

  /* quick starts: tap one, then change whatever you like */
  var IDEAS = [
    { label: '⏰ Lineup', title: '⏰ ¡Revisen sus lineups!', body: 'Los juegos empiezan pronto. Nadie quiere perder por un jugador en el banco.' },
    { label: '🔁 Waivers', title: '🔁 Se mueve el waiver', body: 'Hoy procesan los waivers. Es tu última oportunidad de reclamar a ese jugador.' },
    { label: '📰 Noticia', title: '📰 Nueva noticia en la liga', body: 'Hay algo nuevo en LPBLSA. Entra y entérate.' }
  ];

  var leagues = (window.LPBSA_LEAGUES || []).filter(function (L) { return L.status === 'live'; });
  /* who: the devices store which fantasies they want by their "story" word (football, basketball...) */
  var WHO = [{ key: 'all', label: 'Todos' }].concat(leagues.map(function (L) {
    return { key: L.story, label: L.short };
  }));
  /* where tapping it goes (pages of the site) */
  var WHERE = [{ path: '', label: 'Inicio' }, { path: 'news.html', label: 'Noticias' }];
  leagues.forEach(function (L) {
    if (L.home) WHERE.push({ path: L.home, label: L.short + ': la división (La Jornada)' });
    WHERE.push({ path: 'leagues/' + L.key + '/' + L.key + '-free-agents.html', label: L.short + ': free agents' });
  });

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var rtf = window.Intl && Intl.RelativeTimeFormat ? new Intl.RelativeTimeFormat('es', { numeric: 'auto' }) : null;
  function ago(iso) {
    var s = (new Date(iso).getTime() - Date.now()) / 1000;
    if (!isFinite(s)) return '';
    var steps = [[60, 'second'], [60, 'minute'], [24, 'hour'], [7, 'day'], [4.35, 'week'], [12, 'month'], [Infinity, 'year']];
    for (var i = 0; i < steps.length; i++) {
      if (Math.abs(s) < steps[i][0]) return rtf ? rtf.format(Math.round(s), steps[i][1]) : new Date(iso).toLocaleString();
      s /= steps[i][0];
    }
    return '';
  }
  function whoLabel(key) {
    for (var i = 0; i < WHO.length; i++) if (WHO[i].key === key) return WHO[i].label;
    return key;
  }

  host.innerHTML =
    '<h2>Mandar una notificación</h2>' +
    '<p>Le llega al teléfono (o la compu) de todos los que activaron la campanita, en uno o dos minutos.</p>' +
    '<form class="cp-form" id="cpForm" autocomplete="off">' +
      '<div class="cp-row"><span class="cp-label">Para</span><div class="cp-chips" role="radiogroup" aria-label="Para quién">' +
        WHO.map(function (w, i) {
          return '<button type="button" class="cp-chip' + (i ? '' : ' on') + '" role="radio" aria-checked="' + (i ? 'false' : 'true') + '" data-who="' + esc(w.key) + '">' + esc(w.label) + '</button>';
        }).join('') + '</div></div>' +
      '<div class="cp-row"><span class="cp-label">Ideas</span><div class="cp-chips">' +
        IDEAS.map(function (x, i) { return '<button type="button" class="cp-chip cp-idea" data-idea="' + i + '">' + esc(x.label) + '</button>'; }).join('') +
      '</div></div>' +
      '<label class="cp-field"><span class="cp-label">Título <small id="cpTitleN"></small></span>' +
        '<input id="cpTitle" maxlength="' + TITLE_MAX + '" placeholder="⏰ ¡Revisen sus lineups!" required></label>' +
      '<label class="cp-field"><span class="cp-label">Mensaje <small id="cpBodyN"></small></span>' +
        '<textarea id="cpBody" rows="3" maxlength="' + BODY_MAX + '" placeholder="Los juegos empiezan a las 7. Nadie quiere perder por un jugador en el banco."></textarea></label>' +
      '<label class="cp-field"><span class="cp-label">Al tocarla, abre</span><select id="cpWhere">' +
        WHERE.map(function (w) { return '<option value="' + esc(w.path) + '">' + esc(w.label) + '</option>'; }).join('') +
      '</select></label>' +
      '<div class="cp-preview" aria-hidden="true"><img src="images/league-logo.png" alt=""><div><b id="cpPrevT">Título</b><span id="cpPrevB">Mensaje</span></div><small>ahora</small></div>' +
      '<button class="btn btn-solid cp-send" type="submit" id="cpSend" disabled>Enviar notificación</button>' +
      '<p class="cs-msg" id="cpMsg" role="status" aria-live="polite"></p>' +
    '</form>' +
    '<div class="cp-recent"><h3>Últimas enviadas</h3><ul id="cpList"><li class="cp-empty">Cargando…</li></ul></div>';

  var $ = function (id) { return document.getElementById(id); };
  var form = $('cpForm'), title = $('cpTitle'), body = $('cpBody'), where = $('cpWhere');
  var send = $('cpSend'), msg = $('cpMsg'), list = $('cpList');
  var who = 'all', busy = false;

  function say(text, kind) { msg.textContent = text; msg.className = 'cs-msg' + (kind ? ' ' + kind : ''); }
  function update() {
    var t = title.value.trim(), b = body.value.trim();
    $('cpTitleN').textContent = title.value.length + '/' + TITLE_MAX;
    $('cpBodyN').textContent = body.value.length + '/' + BODY_MAX;
    $('cpPrevT').textContent = t || 'Título';
    $('cpPrevB').textContent = b || 'Toca para abrir LPBLSA.';
    send.disabled = busy || !t;
    send.textContent = 'Enviar a ' + (who === 'all' ? 'todos' : 'los de ' + whoLabel(who));
  }
  host.addEventListener('click', function (e) {
    var chip = e.target.closest('.cp-chip');
    if (!chip) return;
    if (chip.hasAttribute('data-who')) {
      who = chip.getAttribute('data-who');
      Array.prototype.forEach.call(host.querySelectorAll('[data-who]'), function (c) {
        var on = c === chip;
        c.classList.toggle('on', on);
        c.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      /* a message for one fantasy opens that fantasy's page (change it below if you like) */
      var L = leagues.filter(function (x) { return x.story === who; })[0];
      var homes = leagues.map(function (x) { return x.home; });
      if (L && L.home && (where.value === '' || homes.indexOf(where.value) !== -1)) where.value = L.home;
      if (!L && homes.indexOf(where.value) !== -1) where.value = '';
    } else if (chip.hasAttribute('data-idea')) {
      var idea = IDEAS[+chip.getAttribute('data-idea')];
      title.value = idea.title;
      body.value = idea.body;
      title.focus();
    }
    update();
  });
  title.addEventListener('input', update);
  body.addEventListener('input', update);

  function drawList(messages) {
    list.innerHTML = messages.length ? messages.slice(0, 6).map(function (m) {
      return '<li><b>' + esc(m.title) + '</b><span>' + esc(m.body || '') + '</span><small>' +
        esc(whoLabel(m.to)) + ' &middot; ' + esc(ago(m.at)) + '</small></li>';
    }).join('') : '<li class="cp-empty">Todavía no has mandado ninguna.</li>';
  }
  /* the file on GitHub (it may not exist yet: then it is made on the first send) */
  function readFile() {
    return P.getFile(FILE).then(function (f) {
      var j = {};
      try { j = JSON.parse(f.text); } catch (e) { j = {}; }
      return { sha: f.sha, messages: Array.isArray(j.messages) ? j.messages : [] };
    }, function (err) {
      if (err.status === 404) return { sha: null, messages: [] };
      throw err;
    });
  }
  function load() {
    if (!P.token()) return;
    readFile().then(function (f) { drawList(f.messages); }, function (err) {
      list.innerHTML = '<li class="cp-empty">' + esc(err.message) + '</li>';
    });
  }

  function save(entry, tries) {
    return readFile().then(function (f) {
      var messages = [entry].concat(f.messages).slice(0, KEEP);
      var text = JSON.stringify({ messages: messages }, null, 2) + '\n';
      return P.putFile(FILE, P.utf8ToB64(text), f.sha, 'notificación: ' + entry.title.slice(0, 60)).then(function () {
        return messages;
      }, function (err) {
        /* someone (another device) saved in between: read again and retry once */
        if ((err.status === 409 || err.status === 422) && tries < 1) return save(entry, tries + 1);
        throw err;
      });
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var t = title.value.trim(), b = body.value.trim();
    if (!t || busy) return;
    var audience = who === 'all' ? 'TODOS los que tienen notificaciones' : 'los que siguen ' + whoLabel(who);
    if (!window.confirm('¿Mandar esta notificación a ' + audience + '?\n\n' + t + (b ? '\n' + b : ''))) return;
    busy = true;
    update();
    say('Guardando…');
    var entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: t,
      body: b,
      to: who,
      link: where.value,
      at: new Date().toISOString()
    };
    save(entry, 0).then(function (messages) {
      title.value = '';
      body.value = '';
      drawList(messages);
      say('¡Enviada! Le llega a todos en uno o dos minutos.', 'ok');
      P.toast('Notificación en camino.');
    }, function (err) {
      say(err.message + ' No se envió nada.', 'bad');
    }).then(function () {
      busy = false;
      update();
    });
  });

  update();
  load();
  /* the console shows this card only once the key works; read the list then too */
  var homeBox = document.getElementById('csHome');
  if (homeBox && window.MutationObserver) {
    new MutationObserver(function () { if (!homeBox.hidden) load(); }).observe(homeBox, { attributes: true, attributeFilter: ['hidden'] });
  }
})();
