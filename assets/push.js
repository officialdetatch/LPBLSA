/* Push notifications: the little bell.
   Adds a bell button to the header of every public page. Tapping it opens a window where a
   visitor can turn on notifications ("Activar") so their phone or computer gets a message
   every time a new story is published, and choose which fantasy they care about.
   On the news page a slim banner also invites people to turn them on.

   The hard case is the iPhone. Apple only lets a website send notifications once it has been
   added to the Home Screen, so on an iPhone the bell shows a short step-by-step guide for that
   instead of the Activar button, and the Activar button appears once they open the installed copy.

   HOW IT FITS TOGETHER
     - This file  = the bell, the window and saving the person's device address (a "token").
     - firebase-messaging-sw.js (site root) = shows the notification when the site is closed.
     - scripts/send-push-alert.mjs (GitHub Action) = sends the notification when you publish a story.
   Setup steps: PUSH-SETUP.md. Everything stays hidden until vapidKey is filled in
   in assets/firebase-config.js, so it is safe to publish early.                                 */
(function () {
  'use strict';

  var CFG = window.LPBSA_FIREBASE || {};
  var SDK_VERSION = '10.14.1';   /* keep the same as in firebase-messaging-sw.js */
  var BANNER_DAYS = 14;          /* after closing the news-page banner, wait this long before showing it again */

  /* The words shown on the page (edit freely). */
  var COPY = {
    bell: 'Notificaciones',
    title: 'Notificaciones',
    intro: 'Recibe un aviso en tu teléfono o computadora cada vez que publiquemos una noticia.',
    which: '¿De cuál Fantasy quieres avisos?',
    activate: 'Activar notificaciones',
    working: 'Activando...',
    note: 'Puedes desactivarlas cuando quieras.',
    onTitle: 'Notificaciones activadas en este dispositivo',
    onText: 'Te avisaremos cuando haya una noticia nueva. Cambia tus deportes aquí:',
    off: 'Desactivar notificaciones',
    offDone: 'Listo, ya no recibirás notificaciones en este dispositivo.',
    welcomeTitle: 'La Premier Bundesliga Serie A',
    welcomeBody: '¡Listo! Así te avisaremos cuando haya noticias.',
    keepOne: 'Deja al menos un deporte, o desactiva las notificaciones.',
    needOne: 'Elige al menos un deporte.',
    failed: 'No se pudo activar. Inténtalo de nuevo. Si usas Brave u otro navegador muy privado, prueba con Chrome o Safari.',
    saveFailed: 'No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.',
    close: 'Cerrar',
    banner: 'Recibe las noticias en tu teléfono.',
    bannerBtn: 'Activar',
    bannerBtnIos: 'Cómo activarlas',
    bannerNo: 'Cerrar aviso',
    read: 'Leer',
    copy: 'Copiar enlace',
    copied: 'Enlace copiado. Pégalo en tu navegador.',
    iosTitle: 'Primero instala la página en tu iPhone',
    iosLead: 'Apple solo permite notificaciones si la página está en tu pantalla de inicio. Son 4 pasos y toma medio minuto:',
    iosNote: 'Necesitas iOS 16.4 o más nuevo. Si no puedes, también puedes recibir las noticias por correo (hay un cuadro para suscribirte en la página de Noticias).',
    iosOldTitle: 'Actualiza tu iPhone',
    iosOld: 'Tu iPhone necesita iOS 16.4 o más nuevo para recibir notificaciones. Actualízalo en Ajustes > General > Actualización de software.',
    inappTitle: 'Ábrela en tu navegador',
    inapp: 'Estás dentro de otra app (Instagram, Discord, WhatsApp...) y desde ahí no se pueden activar notificaciones. Toca los tres puntos o el icóno del navegador y elige «Abrir en el navegador» (Safari o Chrome). O copia el enlace y pégalo allí:',
    badTitle: 'Este navegador no puede',
    bad: 'Este navegador no permite notificaciones. Prueba con Chrome, Edge, Firefox o Safari actualizados.',
    deniedTitle: 'Las notificaciones están bloqueadas',
    deniedIos: 'Para activarlas: abre Ajustes de tu iPhone > Notificaciones > LPBLSA y permite las notificaciones. Luego vuelve aquí.',
    deniedAndroid: 'Para activarlas: toca el candado junto a la dirección de la página > Permisos > Notificaciones > Permitir. Luego recarga la página.',
    deniedPc: 'Para activarlas: haz clic en el candado junto a la dirección de la página > Notificaciones > Permitir. Luego recarga la página.',
    stepSafari: 'Abre esta página en <strong>Safari</strong>.',
    stepShare: 'Toca el botón <strong>Compartir</strong> {share} (abajo en el centro; en iPad, arriba a la derecha).',
    stepAdd: 'Baja en el menú y toca <strong>Agregar a pantalla de inicio</strong> {add}. Luego toca <strong>Agregar</strong>.',
    stepOpen: 'Abre <strong>LPBLSA</strong> desde el ícono nuevo en tu pantalla de inicio (no desde Safari), toca la campana {bell} y pulsa <strong>Activar</strong>.'
  };

  /* ---------- the device we are on ---------- */
  var ua = navigator.userAgent || '';
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  var standalone = !!(navigator.standalone || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches));
  var inApp = /Instagram|FBAN|FBAV|FB_IAB|WhatsApp|Snapchat|TikTok|musical_ly|Bytedance|Line\/|Discord|Telegram|Twitter|LinkedInApp|;\s*wv\)/i.test(ua);
  var notSafariIos = isIOS && /CriOS|FxiOS|EdgiOS|OPiOS|GSA\//.test(ua);
  var hasPush = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  var SCRIPT_SRC = document.currentScript && document.currentScript.src;
  var SW_URL = SCRIPT_SRC ? new URL('../firebase-messaging-sw.js', SCRIPT_SRC).href : '/firebase-messaging-sw.js';

  /* ---------- small helpers ---------- */
  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* private mode: fine */ } }
  function lsDel(k) { try { window.localStorage.removeItem(k); } catch (e) { /* fine */ } }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function sportChoices() {
    var L = window.LPBSA_LEAGUES;
    if (L && L.length) {
      var live = L.filter(function (l) { return l.status === 'live'; }).map(function (l) {
        return { key: l.story || 'football', label: l.short, sub: l.sport };
      });
      if (live.length) return live;
    }
    return [{ key: 'football', label: 'NFL', sub: 'Football' }, { key: 'basketball', label: 'NBA', sub: 'Basketball' }];
  }

  /* ---------- the backend (Firebase), behind a small seam ---------- */
  /* Everything the page needs from "the server" is this one object. Firebase is the real
     one; a test can hand the page a stand-in through window.LPBSA_PUSH_BACKEND.            */
  function firebasePush() {
    var db, messaging, loading;
    var K_TOKEN = 'lpblsa.push.token', K_SPORTS = 'lpblsa.push.sports';

    function script(src) {
      var map = window.__lpbsaScripts = window.__lpbsaScripts || {}; /* shared with comments.js so nothing loads twice */
      if (!map[src]) {
        map[src] = new Promise(function (resolve, reject) {
          var s = document.createElement('script');
          s.src = src; s.async = false;
          s.onload = resolve;
          s.onerror = function () { delete map[src]; reject(new Error('sdk')); };
          document.head.appendChild(s);
        });
      }
      return map[src];
    }
    function load() {
      if (loading) return loading;
      var base = 'https://www.gstatic.com/firebasejs/' + SDK_VERSION + '/';
      loading = script(base + 'firebase-app-compat.js').then(function () {
        return Promise.all([script(base + 'firebase-firestore-compat.js'), script(base + 'firebase-messaging-compat.js')]);
      }).then(function () {
        if (!firebase.apps.length) {
          firebase.initializeApp({ apiKey: CFG.apiKey, authDomain: CFG.authDomain, projectId: CFG.projectId,
            appId: CFG.appId, messagingSenderId: CFG.messagingSenderId });
        }
        db = firebase.firestore();
        messaging = firebase.messaging();
      });
      loading.catch(function () { loading = null; });
      return loading;
    }
    function register() {
      return navigator.serviceWorker.register(SW_URL).then(function (r) {
        return navigator.serviceWorker.ready.then(function () { return r; });
      });
    }
    function getToken(reg) { return messaging.getToken({ vapidKey: CFG.vapidKey, serviceWorkerRegistration: reg }); }
    function save(token, sports) {
      return db.collection('pushTokens').doc(token).set({
        token: token, sports: sports, updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true }).then(function () { lsSet(K_TOKEN, token); lsSet(K_SPORTS, JSON.stringify(sports)); });
    }

    return {
      ready: function () { return !!(CFG.vapidKey && CFG.apiKey && CFG.projectId && CFG.messagingSenderId); },
      permission: function () { return hasPush ? Notification.permission : 'unsupported'; },
      enabled: function () { return hasPush && Notification.permission === 'granted' && !!lsGet(K_TOKEN); },
      sports: function () {
        try { var s = JSON.parse(lsGet(K_SPORTS) || 'null'); if (s && s.length) return s; } catch (e) { /* use default */ }
        return sportChoices().map(function (x) { return x.key; });
      },
      preload: function () { load().catch(function () { /* will retry on Activar */ }); },
      enable: function (sports) {
        /* requestPermission has to run straight from the tap, before anything slow (iPhone insists) */
        var asked = Notification.requestPermission();
        var reg;
        return Promise.resolve(asked).then(function (perm) {
          if (perm !== 'granted') { var e = new Error('permission'); e.code = 'permission'; throw e; }
          return Promise.all([load(), register()]);
        }).then(function (r) {
          reg = r[1];
          return getToken(reg);
        }).then(function (token) {
          if (!token) throw new Error('no token');
          return save(token, sports);
        }).then(function () {
          try { reg.showNotification(COPY.welcomeTitle, { body: COPY.welcomeBody, icon: new URL('../images/league-logo.png', SCRIPT_SRC).href }); }
          catch (e) { /* the welcome note is a bonus */ }
        });
      },
      setSports: function (sports) {
        var token = lsGet(K_TOKEN);
        if (!token) return Promise.reject(new Error('not subscribed'));
        return load().then(function () { return save(token, sports); });
      },
      disable: function () {
        var token = lsGet(K_TOKEN);
        lsDel(K_TOKEN); lsDel(K_SPORTS);
        return load().then(function () {
          return Promise.all([
            token ? db.collection('pushTokens').doc(token).delete().catch(function () {}) : null,
            messaging.deleteToken().catch(function () {})
          ]);
        });
      },
      /* For a person who is already subscribed: keep their address fresh and show a small
         in-page note when a notification arrives while the site is open on screen. */
      listen: function (onMessage) {
        return load().then(function () {
          messaging.onMessage(function (p) {
            var n = p.notification || {}, d = p.data || {};
            onMessage({ title: n.title || d.title || '', body: n.body || d.body || '',
              link: (p.fcmOptions && p.fcmOptions.link) || d.url || '' });
          });
          return register();
        }).then(function (reg) {
          return getToken(reg);
        }).then(function (fresh) {
          var old = lsGet(K_TOKEN);
          if (fresh && old && fresh !== old) {
            var sports = JSON.parse(lsGet(K_SPORTS) || '[]');
            return save(fresh, sports.length ? sports : sportChoices().map(function (x) { return x.key; }))
              .then(function () { return db.collection('pushTokens').doc(old).delete().catch(function () {}); });
          }
        }).catch(function () { /* quiet: this is only housekeeping */ });
      }
    };
  }

  var backend = window.LPBSA_PUSH_BACKEND || firebasePush();
  if (!backend.ready()) return; /* not set up yet: the site stays exactly as it was */

  var row = document.querySelector('.site-header .header-row');
  if (!row) return;

  /* ---------- what to show ---------- */
  function view() {
    if (inApp) return 'inapp';
    if (isIOS && !standalone) return 'ios-install';
    if (!hasPush) return isIOS ? 'ios-old' : 'unsupported';
    if (backend.permission() === 'denied') return 'denied';
    return backend.enabled() ? 'on' : 'ready';
  }

  /* ---------- styles ---------- */
  var css = document.createElement('style');
  css.textContent =
    '.pn-bell{position:relative;order:3;margin-left:auto;width:40px;height:40px;flex:0 0 40px;display:flex;align-items:center;' +
      'justify-content:center;background:none;border:1px solid var(--line);color:var(--white);border-radius:var(--radius);cursor:pointer;padding:0;}' +
    '.pn-bell:hover{border-color:var(--gold);}' +
    '.pn-bell svg{width:20px;height:20px;}' +
    '.pn-bell.pn-on{color:var(--gold);border-color:var(--gold-dark);}' +
    '.pn-bell.pn-on svg{fill:currentColor;}' +
    '.pn-dot{position:absolute;top:-4px;right:-4px;width:12px;height:12px;border-radius:50%;background:var(--gold);' +
      'border:2px solid var(--navy-950);}' +
    '.header-row.has-bell .site-nav{margin-left:8px;}' +
    '@media (max-width:1100px){.pn-bell{order:1;}.header-row.has-bell .nav-toggle{margin-left:0;order:2;}' +
      '.header-row.has-bell .site-nav{order:5;margin-left:0;}}' +
    /* window */
    '.pn-back{position:fixed;inset:0;z-index:1010;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(2,6,18,.74);}' +
    '.pn-back[hidden]{display:none;}' +
    '.pn-modal{position:relative;width:min(440px,100%);max-height:calc(100vh - 32px);overflow:auto;padding:24px 22px 20px;' +
      'background:linear-gradient(160deg,var(--navy-700),var(--navy-900) 65%);border:1px solid var(--gold);border-top:5px solid var(--gold);' +
      'border-radius:var(--radius);box-shadow:0 24px 70px rgba(0,0,0,.65);}' +
    '.pn-modal h2{font-size:1.45rem;text-transform:uppercase;margin:0 30px 10px 0;line-height:1.1;}' +
    '.pn-modal p{margin:0 0 12px;color:var(--mute);line-height:1.5;}' +
    '.pn-x{position:absolute;top:8px;right:10px;width:34px;height:34px;border:0;background:none;color:var(--mute);font-size:1.7rem;line-height:1;cursor:pointer;}' +
    '.pn-x:hover{color:var(--white);}' +
    '.pn-which{margin:14px 0 8px;font-size:.85rem;color:var(--white);font-weight:600;}' +
    '.pn-sports{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px;}' +
    '.pn-sport{flex:1 1 120px;display:flex;align-items:center;gap:10px;padding:11px 12px;cursor:pointer;background:var(--navy-950);' +
      'border:1px solid var(--line);border-radius:var(--radius);color:var(--white);}' +
    '.pn-sport:hover{border-color:var(--gold);}' +
    '.pn-sport input{width:20px;height:20px;accent-color:var(--gold);flex:0 0 auto;}' +
    '.pn-sport b{font-family:var(--font-display);letter-spacing:.06em;font-size:1.05rem;text-transform:uppercase;}' +
    '.pn-sport small{display:block;color:var(--mute);font-size:.72rem;}' +
    '.pn-go{width:100%;padding:15px 14px;cursor:pointer;font-family:var(--font-body);font-size:1.05rem;font-weight:700;color:var(--gold-ink);' +
      'background:var(--gold);border:0;border-radius:var(--radius);}' +
    '.pn-go:hover,.pn-go:focus-visible{background:var(--gold-light);}' +
    '.pn-go[disabled]{opacity:.6;cursor:default;}' +
    '.pn-ghost{width:100%;padding:12px 14px;cursor:pointer;font-family:var(--font-body);font-size:.95rem;font-weight:600;color:var(--white);' +
      'background:none;border:1px solid var(--line);border-radius:var(--radius);}' +
    '.pn-ghost:hover,.pn-ghost:focus-visible{background:var(--navy-700);border-color:var(--gold);}' +
    '.pn-small{font-size:.8rem;color:var(--mute);margin:12px 0 0;}' +
    '.pn-msg{margin:10px 0 0;min-height:1.2em;font-size:.9rem;color:var(--gold-light);}' +
    '.pn-msg.err{color:#ff8da1;}' +
    '.pn-ok{display:flex;gap:10px;align-items:center;margin:0 0 10px;font-weight:700;color:var(--gold-light);}' +
    '.pn-ok svg{width:22px;height:22px;flex:0 0 22px;}' +
    /* iPhone steps */
    '.pn-steps{list-style:none;counter-reset:pn;margin:6px 0 4px;padding:0;display:flex;flex-direction:column;gap:12px;}' +
    '.pn-steps li{counter-increment:pn;display:flex;gap:12px;align-items:flex-start;line-height:1.45;color:var(--white);font-size:.98rem;}' +
    '.pn-steps li::before{content:counter(pn);flex:0 0 28px;height:28px;border-radius:50%;background:var(--gold);color:var(--gold-ink);' +
      'font-family:var(--font-display);font-size:1rem;display:flex;align-items:center;justify-content:center;}' +
    '.pn-ico{display:inline-block;vertical-align:-5px;width:22px;height:22px;color:var(--gold-light);}' +
    /* news-page banner */
    '.pn-banner{background:var(--navy-900);border-top:1px solid var(--line);border-bottom:1px solid var(--line);}' +
    '.pn-banner .wrap{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding-top:10px;padding-bottom:10px;}' +
    '.pn-banner svg.pn-bi{width:22px;height:22px;color:var(--gold);flex:0 0 22px;}' +
    '.pn-banner span.pn-bt{flex:1;min-width:180px;font-weight:600;}' +
    '.pn-banner .btn{padding:8px 16px;}' +
    '.pn-banner-x{width:32px;height:32px;border:0;background:none;color:var(--mute);font-size:1.4rem;line-height:1;cursor:pointer;}' +
    '.pn-banner-x:hover{color:var(--white);}' +
    /* note shown while the site is open when a notification arrives */
    '.pn-toast{position:fixed;left:18px;bottom:18px;z-index:950;width:min(360px,calc(100vw - 100px));padding:14px 16px;cursor:pointer;' +
      'background:var(--white);color:var(--navy-950);border-radius:var(--radius);border-left:5px solid var(--gold);' +
      'box-shadow:0 14px 38px rgba(2,6,18,.6);}' +
    '.pn-toast strong{display:block;font-size:.95rem;line-height:1.3;}' +
    '.pn-toast span{display:block;font-size:.85rem;color:#44506f;margin-top:3px;}' +
    '.pn-toast em{display:block;font-style:normal;font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold-dark);margin-top:6px;}' +
    '@media (prefers-reduced-motion:no-preference){.pn-modal{animation:pnPop .25s ease both;}' +
      '@keyframes pnPop{from{opacity:0;transform:translateY(10px) scale(.97);}to{opacity:1;transform:none;}}}';
  document.head.appendChild(css);

  var I_BELL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>';
  var I_SHARE = '<svg class="pn-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3v12"/><path d="M8 7l4-4 4 4"/><path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
  var I_ADD = '<svg class="pn-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/></svg>';
  var I_BELL_INLINE = I_BELL.replace('<svg ', '<svg class="pn-ico" ');
  var I_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="10"/><path d="M8 12.5l3 3 5-6"/></svg>';

  /* ---------- the bell ---------- */
  var bell = document.createElement('button');
  bell.type = 'button';
  bell.className = 'pn-bell';
  bell.setAttribute('aria-label', COPY.bell);
  bell.title = COPY.bell;
  bell.setAttribute('aria-haspopup', 'dialog');
  var toggle = row.querySelector('.nav-toggle');
  row.classList.add('has-bell');
  row.insertBefore(bell, toggle || null);

  var SEEN = 'lpblsa.push.seen';
  function drawBell() {
    var on = view() === 'on';
    bell.className = 'pn-bell' + (on ? ' pn-on' : '');
    bell.innerHTML = I_BELL + (!on && !lsGet(SEEN) ? '<span class="pn-dot" aria-hidden="true"></span>' : '');
  }
  drawBell();

  /* ---------- the window ---------- */
  var modal = null, opener = null;
  function build() {
    modal = document.createElement('div');
    modal.className = 'pn-back';
    modal.hidden = true;
    modal.innerHTML = '<div class="pn-modal" role="dialog" aria-modal="true" aria-labelledby="pnTitle">' +
      '<button type="button" class="pn-x" aria-label="' + COPY.close + '">&times;</button>' +
      '<h2 id="pnTitle"></h2><div id="pnBody"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('mousedown', function (e) { if (e.target === modal) close(); });
    modal.querySelector('.pn-x').addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });
    modal.querySelector('#pnBody').addEventListener('click', onBodyClick);
    modal.querySelector('#pnBody').addEventListener('change', onBodyChange);
  }
  function setMsg(text, isErr) {
    var m = document.getElementById('pnMsg');
    if (m) { m.textContent = text || ''; m.className = 'pn-msg' + (isErr ? ' err' : ''); }
  }
  function sportsHTML(selected) {
    return '<p class="pn-which">' + COPY.which + '</p><div class="pn-sports">' + sportChoices().map(function (s) {
      return '<label class="pn-sport"><input type="checkbox" data-sport="' + esc(s.key) + '"' +
        (selected.indexOf(s.key) > -1 ? ' checked' : '') + '><span><b>' + esc(s.label) + '</b><small>' + esc(s.sub) + '</small></span></label>';
    }).join('') + '</div>';
  }
  function checked() {
    return Array.prototype.map.call(modal.querySelectorAll('input[data-sport]:checked'), function (i) { return i.getAttribute('data-sport'); });
  }
  function fill(s, tpl) {
    return tpl.replace('{share}', I_SHARE).replace('{add}', I_ADD).replace('{bell}', I_BELL_INLINE);
  }
  function render() {
    var st = view(), t = COPY.title, b = '';
    if (st === 'ios-install') {
      t = COPY.iosTitle;
      b = '<p>' + COPY.iosLead + '</p><ol class="pn-steps">' +
        '<li><span>' + COPY.stepSafari + '</span></li>' +
        '<li><span>' + fill(st, COPY.stepShare) + '</span></li>' +
        '<li><span>' + fill(st, COPY.stepAdd) + '</span></li>' +
        '<li><span>' + fill(st, COPY.stepOpen) + '</span></li></ol>' +
        (notSafariIos ? '<div style="margin-top:14px"><button type="button" class="pn-ghost" data-act="copy">' + COPY.copy + '</button></div>' : '') +
        '<p class="pn-small">' + COPY.iosNote + '</p><p class="pn-msg" id="pnMsg" role="status"></p>';
    } else if (st === 'ios-old') {
      t = COPY.iosOldTitle; b = '<p>' + COPY.iosOld + '</p>';
    } else if (st === 'inapp') {
      t = COPY.inappTitle;
      b = '<p>' + COPY.inapp + '</p><button type="button" class="pn-go" data-act="copy">' + COPY.copy + '</button><p class="pn-msg" id="pnMsg" role="status"></p>';
    } else if (st === 'unsupported') {
      t = COPY.badTitle; b = '<p>' + COPY.bad + '</p>';
    } else if (st === 'denied') {
      t = COPY.deniedTitle; b = '<p>' + (isIOS ? COPY.deniedIos : isAndroid ? COPY.deniedAndroid : COPY.deniedPc) + '</p>';
    } else if (st === 'on') {
      b = '<p class="pn-ok">' + I_CHECK + '<span>' + COPY.onTitle + '</span></p><p>' + COPY.onText + '</p>' +
        sportsHTML(backend.sports()) +
        '<button type="button" class="pn-ghost" data-act="off">' + COPY.off + '</button><p class="pn-msg" id="pnMsg" role="status"></p>';
    } else {
      b = '<p>' + COPY.intro + '</p>' + sportsHTML(backend.sports()) +
        '<button type="button" class="pn-go" data-act="on" id="pnGo">' + COPY.activate + '</button>' +
        '<p class="pn-small">' + COPY.note + '</p><p class="pn-msg" id="pnMsg" role="alert"></p>';
    }
    modal.querySelector('#pnTitle').textContent = t;
    modal.querySelector('#pnBody').innerHTML = b;
    drawBell();
  }
  function open() {
    if (!modal) build();
    opener = document.activeElement;
    lsSet(SEEN, '1');
    render();
    modal.hidden = false;
    if (view() === 'ready' && backend.preload) backend.preload(); /* warm up so Activar is quick */
    var first = modal.querySelector('.pn-go, .pn-ghost, .pn-x');
    if (first && first.focus) first.focus();
  }
  function close() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    if (opener && opener.focus) { try { opener.focus(); } catch (e) { /* element gone */ } }
  }
  function copyLink() {
    var url = location.href.split('#')[0];
    var done = function () { setMsg(COPY.copied, false); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { setMsg(url, false); });
    else setMsg(url, false);
  }
  function onBodyClick(e) {
    var b = e.target.closest('[data-act]');
    if (!b) return;
    var act = b.getAttribute('data-act');
    if (act === 'copy') { copyLink(); return; }
    if (act === 'on') {
      var sports = checked();
      if (!sports.length) { setMsg(COPY.needOne, true); return; }
      b.disabled = true; b.textContent = COPY.working; setMsg('');
      backend.enable(sports).then(function () {
        render(); attach();
      }, function (err) {
        if (err && err.code === 'permission') { render(); return; } /* they said no: show how to undo it */
        b.disabled = false; b.textContent = COPY.activate; setMsg(COPY.failed, true);
      });
      return;
    }
    if (act === 'off') {
      b.disabled = true;
      backend.disable().then(function () { render(); setMsg(COPY.offDone, false); }, function () { b.disabled = false; setMsg(COPY.saveFailed, true); });
    }
  }
  function onBodyChange(e) {
    if (!e.target.matches('input[data-sport]') || view() !== 'on') return;
    var sports = checked();
    if (!sports.length) { e.target.checked = true; setMsg(COPY.keepOne, true); return; }
    setMsg('');
    backend.setSports(sports).catch(function () { setMsg(COPY.saveFailed, true); });
  }
  bell.addEventListener('click', open);

  /* ---------- a small note when a push arrives while the site is open ---------- */
  var toastTimer = null;
  function toast(m) {
    var old = document.querySelector('.pn-toast');
    if (old) old.parentNode.removeChild(old);
    var el = document.createElement('div');
    el.className = 'pn-toast';
    el.setAttribute('role', 'status');
    el.innerHTML = '<strong>' + esc(m.title) + '</strong>' + (m.body ? '<span>' + esc(m.body) + '</span>' : '') +
      (m.link ? '<em>' + COPY.read + ' &rarr;</em>' : '');
    el.addEventListener('click', function () {
      if (m.link) location.href = m.link;
      else if (el.parentNode) el.parentNode.removeChild(el);
    });
    document.body.appendChild(el);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 9000);
  }
  var attached = false;
  function attach() {
    if (attached || view() !== 'on' || !backend.listen) return;
    attached = true;
    backend.listen(toast);
  }
  if (view() === 'on') {
    /* subscribed already: quietly keep things fresh once the page has settled */
    var later = window.requestIdleCallback || function (f) { return setTimeout(f, 1500); };
    later(attach);
  }

  /* ---------- the invitation on the news page ---------- */
  function banner() {
    if (document.body.getAttribute('data-active') !== 'news') return;
    var st = view();
    if (st !== 'ready' && st !== 'ios-install') return;
    var last = Number(lsGet('lpblsa.push.banner') || 0);
    if (last && Date.now() - last < BANNER_DAYS * 86400000) return;
    var hero = document.querySelector('main > section.hero');
    if (!hero) return;
    var el = document.createElement('div');
    el.className = 'pn-banner';
    el.innerHTML = '<div class="wrap">' + I_BELL.replace('<svg ', '<svg class="pn-bi" ') +
      '<span class="pn-bt">' + COPY.banner + '</span>' +
      '<button type="button" class="btn btn-solid" data-pn="open">' + (st === 'ios-install' ? COPY.bannerBtnIos : COPY.bannerBtn) + '</button>' +
      '<button type="button" class="pn-banner-x" data-pn="x" aria-label="' + COPY.bannerNo + '">&times;</button></div>';
    hero.insertAdjacentElement('afterend', el);
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-pn]');
      if (!b) return;
      if (b.getAttribute('data-pn') === 'x') { lsSet('lpblsa.push.banner', String(Date.now())); el.parentNode.removeChild(el); return; }
      open();
    });
  }
  /* this file loads above the page content, so wait until the page body exists */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner);
  else banner();
})();
