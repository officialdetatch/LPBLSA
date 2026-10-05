/* Login + comments under every news story.
   Loaded by news.html. When a story is open it adds a "Comentarios" section
   right under the article: visitors sign in (Google or email + password), write
   a comment, reply to others, and delete their own. You (the commissioner) can
   delete anyone's comment and block a troublemaker from the same screen.

   HOW IT WORKS
   The site itself stays a plain static site on GitHub. The comments and the
   accounts live in a free Firebase project (Google). This file talks to it
   directly from the visitor's browser. Nothing here costs money at your size
   (the free plan allows far more than 50 people will ever use).

   ONE-TIME SETUP  (the full, click-by-click version is in FIREBASE-SETUP.md)
     1. Create a free Firebase project, turn on Google + Email sign-in and
        the Firestore database.
     2. Paste the four values Firebase gives you into FIREBASE_CONFIG below.
     3. Paste the rules from firestore.rules into Firebase (that is what keeps
        the comments safe - the page alone cannot).
   Until FIREBASE_CONFIG is filled in, this file does nothing at all and the
   news pages look exactly as before, so it is safe to publish early.

   WHAT LIVES WHERE
     Firestore collection  comments/  one document per comment or reply
     Firestore collection  banned/    one document per blocked person (by id)
     Firestore collection  admins/    one document per commissioner (by id)
   All three are protected by firestore.rules.                                     */
(function () {
  'use strict';

  /* ===== SETTINGS ===================================================
     Firebase console > Project settings > General > "Your apps" > the web app
     (</>) > "SDK setup and configuration" > Config. Copy these four values.
     (These are not secrets - they only say WHICH project to talk to. The
     rules in firestore.rules are what protect your data.)              */
  /* If assets/firebase-config.js is loaded (it is, on news.html) its values win, so the project
     address lives in one place. The values below are only the fallback. */
  var FIREBASE_CONFIG = window.LPBSA_FIREBASE || {
    apiKey: 'AIzaSyCa8_nANLmB2rHpY1ZEFoko6NPT-xdv3VQ',
    authDomain: 'lpblsa.firebaseapp.com',
    projectId: 'lpblsa',
    messagingSenderId: '318390622492',
    appId: '1:318390622492:web:2de36d08a07004bf7302d9'
  };

  var SDK_VERSION = '10.14.1';  /* Firebase web SDK version loaded from Google's CDN */
  var MAX_LENGTH = 1000;        /* longest comment, in characters (also in the rules) */
  var MAX_NAME = 40;            /* longest display name                               */
  var MIN_PASSWORD = 6;         /* Firebase's own minimum                             */

  /* The words shown on the page (edit freely). */
  var COPY = {
    title: 'Comentarios',
    loading: 'Cargando comentarios...',
    loadFail: 'No se pudieron cargar los comentarios. Revisa tu conexión e inténtalo de nuevo.',
    listFail: 'Los comentarios no están disponibles en este momento.',
    empty: 'Sé el primero en comentar.',
    one: '1 comentario',
    many: ' comentarios',
    loggedOut: 'Inicia sesión para comentar y responder.',
    enter: 'Entrar',
    create: 'Crear cuenta',
    leave: 'Salir',
    as: 'Comentando como ',
    placeholder: 'Escribe tu comentario...',
    send: 'Comentar',
    sending: 'Enviando...',
    reply: 'Responder',
    replyPlaceholder: 'Escribe tu respuesta...',
    replySend: 'Responder',
    cancel: 'Cancelar',
    del: 'Eliminar',
    block: 'Bloquear',
    confirmDel: '¿Eliminar este comentario?',
    confirmBlock: '¿Bloquear a esta persona y eliminar su comentario? No podrá volver a comentar.',
    gone: 'Comentario eliminado',
    admin: 'Comisionado',
    just: 'ahora',
    modalIn: 'Entrar',
    modalUp: 'Crear cuenta',
    modalReset: 'Recuperar contraseña',
    google: 'Continuar con Google',
    googleHint: 'Con Google entras directo, sin crear cuenta. Si Google no abre (pasa dentro de Instagram o Discord), usa tu correo.',
    or: 'o con tu correo',
    name: 'Tu nombre',
    namePh: 'Como te conoce la liga',
    email: 'Correo electrónico',
    password: 'Contraseña',
    submitIn: 'Entrar',
    submitUp: 'Crear mi cuenta',
    submitReset: 'Enviarme el enlace',
    forgot: '¿Olvidaste tu contraseña?',
    toUp: '¿Primera vez? Crea tu cuenta',
    toIn: '¿Ya tienes cuenta? Entra',
    back: 'Volver',
    resetSent: 'Listo. Revisa tu correo (mira también en spam) para cambiar tu contraseña.',
    close: 'Cerrar',
    needName: 'Escribe tu nombre (al menos 2 letras).',
    needEmail: 'Escribe un correo válido.',
    needPass: 'La contraseña debe tener al menos ' + MIN_PASSWORD + ' caracteres.',
    errors: {
      'auth/invalid-credential': 'Correo o contraseña incorrectos.',
      'auth/wrong-password': 'Correo o contraseña incorrectos.',
      'auth/user-not-found': 'Correo o contraseña incorrectos.',
      'auth/invalid-email': 'Escribe un correo válido.',
      'auth/email-already-in-use': 'Ese correo ya tiene cuenta. Prueba entrar o recuperar tu contraseña.',
      'auth/weak-password': 'La contraseña debe tener al menos ' + MIN_PASSWORD + ' caracteres.',
      'auth/too-many-requests': 'Demasiados intentos. Espera un momento e inténtalo de nuevo.',
      'auth/network-request-failed': 'Sin conexión. Revisa tu internet e inténtalo de nuevo.',
      'auth/popup-blocked': 'Tu navegador bloqueó la ventana de Google. Permítela o usa tu correo.',
      'auth/unauthorized-domain': 'Este sitio aún no está autorizado en Firebase (falta agregar el dominio).',
      'auth/operation-not-allowed': 'Ese método de entrada no está activado en Firebase.',
      'permission-denied': 'No tienes permiso para hacer eso (¿tu cuenta fue bloqueada?).',
      'unavailable': 'Sin conexión. Revisa tu internet e inténtalo de nuevo.',
      'default': 'Algo salió mal. Inténtalo de nuevo.'
    }
  };
  /* =================================================================== */

  var page = document.getElementById('newsPage');
  if (!page) return;

  /* ---------- the backend (Firebase), behind a small seam ---------- */
  /* Everything the page needs from "the server" is this one object. Firebase
     is the real one; a test can hand the page a stand-in through
     window.LPBSA_COMMENTS_BACKEND with the same methods.                    */
  function firebaseBackend() {
    var cfg = FIREBASE_CONFIG, auth, db, loading, listeners = [], settled = false;

    function script(src) {
      var map = window.__lpbsaScripts = window.__lpbsaScripts || {}; /* shared with push.js so nothing loads twice */
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
    function who(u) { return u ? { uid: u.uid, name: u.displayName || '', email: u.email || '' } : null; }
    function emit(u) { settled = true; var w = who(u); listeners.forEach(function (cb) { cb(w); }); }

    return {
      ready: function () { return !!(cfg.apiKey && cfg.projectId && cfg.appId); },
      load: function () {
        if (loading) return loading;
        var base = 'https://www.gstatic.com/firebasejs/' + SDK_VERSION + '/';
        loading = script(base + 'firebase-app-compat.js').then(function () {
          return Promise.all([script(base + 'firebase-auth-compat.js'), script(base + 'firebase-firestore-compat.js')]);
        }).then(function () {
          if (!firebase.apps.length) {
            firebase.initializeApp({ apiKey: cfg.apiKey, authDomain: cfg.authDomain, projectId: cfg.projectId,
              appId: cfg.appId, messagingSenderId: cfg.messagingSenderId });
          }
          auth = firebase.auth();
          db = firebase.firestore();
          auth.onAuthStateChanged(emit);
        });
        loading.catch(function () { loading = null; });
        return loading;
      },
      onAuth: function (cb) {
        listeners.push(cb);
        if (settled) cb(who(auth.currentUser)); /* already known: don't wait for the next change */
      },
      signInGoogle: function () { return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); },
      signInEmail: function (email, pw) { return auth.signInWithEmailAndPassword(email, pw); },
      signUpEmail: function (name, email, pw) {
        return auth.createUserWithEmailAndPassword(email, pw).then(function (cred) {
          return cred.user.updateProfile({ displayName: name }).then(function () { emit(auth.currentUser); });
        });
      },
      resetPassword: function (email) { return auth.sendPasswordResetEmail(email); },
      signOut: function () { return auth.signOut(); },
      /* The commissioner is whoever has a document at admins/<their id> (you create it
         once in the Firebase console - see FIREBASE-SETUP.md). The rules let a person
         read only their own admins document, so this is a harmless yes/no. It only
         decides whether the buttons show; the rules decide what is actually allowed. */
      checkAdmin: function () {
        var u = auth.currentUser;
        if (!u) return Promise.resolve(false);
        return db.collection('admins').doc(u.uid).get().then(function (d) { return d.exists; }, function () { return false; });
      },
      subscribe: function (storyId, onList, onError) {
        return db.collection('comments').where('storyId', '==', storyId).onSnapshot(function (snap) {
          onList(snap.docs.map(function (d) {
            var x = d.data({ serverTimestamps: 'estimate' });
            return { id: d.id, uid: x.uid, name: x.name, text: x.text, parentId: x.parentId || null,
              ts: x.createdAt && x.createdAt.toMillis ? x.createdAt.toMillis() : Date.now() };
          }));
        }, onError);
      },
      add: function (storyId, text, parentId, name) {
        return db.collection('comments').add({
          storyId: storyId, uid: auth.currentUser.uid, name: name, text: text,
          parentId: parentId || null, createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      },
      remove: function (id) { return db.collection('comments').doc(id).delete(); },
      ban: function (uid) {
        return db.collection('banned').doc(uid).set({ at: firebase.firestore.FieldValue.serverTimestamp() });
      }
    };
  }

  var backend = window.LPBSA_COMMENTS_BACKEND || firebaseBackend();
  if (!backend.ready()) return; /* not set up yet: the page stays exactly as it was */

  /* ---------- small helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function errText(e) {
    var code = e && e.code ? String(e.code).replace(/^firestore\//, '') : '';
    return COPY.errors[code] || COPY.errors['default'];
  }
  function silent(e) { /* closing the Google window is not an error worth showing */
    return e && (e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request');
  }
  function ago(ms) {
    var s = Math.max(0, Math.round((Date.now() - ms) / 1000));
    if (s < 45) return COPY.just;
    var m = Math.round(s / 60);
    if (m < 60) return 'hace ' + m + ' min';
    var h = Math.round(m / 60);
    if (h < 24) return 'hace ' + h + ' h';
    var d = Math.round(h / 24);
    if (d < 7) return 'hace ' + d + (d === 1 ? ' día' : ' días');
    try { return new Date(ms).toLocaleDateString('es-DO', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch (e) { return new Date(ms).toDateString(); }
  }
  function initial(name) { return (String(name || '?').trim().charAt(0) || '?').toUpperCase(); }
  function hue(uid) {
    var h = 0, s = String(uid || '');
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
    return h;
  }
  function avatar(c) {
    return '<span class="cm-av" style="--h:' + hue(c.uid) + '" aria-hidden="true">' + esc(initial(c.name)) + '</span>';
  }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  /* ---------- styles ---------- */
  var css = document.createElement('style');
  css.textContent =
    '.cm{margin:44px 0 0;max-width:760px;}' +
    '.cm .section-head{margin-bottom:14px;}' +
    '.cm-bar{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 14px;margin-bottom:14px;' +
      'background:var(--navy-900);border:1px solid var(--line);border-radius:var(--radius);}' +
    '.cm-bar-text{flex:1;min-width:150px;color:var(--mute);font-size:.92rem;}' +
    '.cm-bar-text strong{color:var(--white);}' +
    '.cm-form textarea,.cm-reply textarea{width:100%;min-height:84px;resize:vertical;padding:11px 12px;' +
      'background:var(--navy-950);color:var(--white);border:1px solid var(--line);border-radius:var(--radius);' +
      'font:inherit;font-size:16px;line-height:1.45;}' +
    '.cm-form textarea:focus,.cm-reply textarea:focus{outline:none;border-color:var(--gold);}' +
    '.cm-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:8px;}' +
    '.cm-count{font-size:.78rem;color:var(--mute);}' +
    '.cm-msg{margin:8px 0 0;font-size:.88rem;color:var(--gold-light);min-height:1.2em;}' +
    '.cm-msg.err{color:#ff8da1;}' +
    '.cm-list{margin-top:22px;display:flex;flex-direction:column;gap:16px;}' +
    '.cm-item{display:flex;gap:12px;align-items:flex-start;}' +
    '.cm-av{flex:0 0 38px;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;' +
      'font-family:var(--font-display);font-size:1.05rem;color:var(--white);' +
      'background:hsl(var(--h) 38% 30%);border:1px solid hsl(var(--h) 45% 48%);}' +
    '.cm-main{flex:1;min-width:0;}' +
    '.cm-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px;}' +
    '.cm-name{font-weight:700;color:var(--white);overflow-wrap:anywhere;}' +
    '.cm-badge{font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold-ink);background:var(--gold);' +
      'border-radius:20px;padding:1px 8px;}' +
    '.cm-time{font-size:.78rem;color:var(--mute);}' +
    '.cm-text{margin:3px 0 0;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.5;}' +
    '.cm-acts{display:flex;gap:14px;margin-top:5px;}' +
    '.cm-link{background:none;border:0;padding:2px 0;color:var(--mute);font-size:.8rem;letter-spacing:.04em;cursor:pointer;}' +
    '.cm-link:hover,.cm-link:focus-visible{color:var(--gold-light);}' +
    '.cm-link.danger:hover,.cm-link.danger:focus-visible{color:#ff8da1;}' +
    '.cm-replies{margin:12px 0 0;padding-left:14px;border-left:2px solid var(--line);display:flex;flex-direction:column;gap:14px;}' +
    '.cm-replies .cm-av{flex-basis:30px;width:30px;height:30px;font-size:.9rem;}' +
    '.cm-reply{margin-top:10px;}' +
    '.cm-reply .cm-row{justify-content:flex-end;}' +
    '.cm-gone{color:var(--mute);font-style:italic;font-size:.9rem;}' +
    '.cm-note{color:var(--mute);}' +
    /* sign-in window */
    '.cm-back{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;' +
      'background:rgba(2,6,18,.74);}' +
    '.cm-back[hidden]{display:none;}' +
    '.cm-modal{position:relative;width:min(420px,100%);max-height:calc(100vh - 32px);overflow:auto;padding:24px 22px 20px;' +
      'background:linear-gradient(160deg,var(--navy-700),var(--navy-900) 65%);border:1px solid var(--gold);' +
      'border-top:5px solid var(--gold);border-radius:var(--radius);box-shadow:0 24px 70px rgba(0,0,0,.65);}' +
    '.cm-modal h2{font-size:1.5rem;text-transform:uppercase;margin:0 30px 14px 0;}' +
    '.cm-x{position:absolute;top:8px;right:10px;width:34px;height:34px;border:0;background:none;color:var(--mute);' +
      'font-size:1.7rem;line-height:1;cursor:pointer;}' +
    '.cm-x:hover{color:var(--white);}' +
    '.cm-google{width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:11px 14px;cursor:pointer;' +
      'background:var(--white);color:#1f2937;border:0;border-radius:var(--radius);font-weight:700;font-size:.95rem;}' +
    '.cm-google:hover{background:#e8ebf3;}' +
    '.cm-google svg{width:18px;height:18px;}' +
    '.cm-hint{margin:8px 0 0;font-size:.76rem;color:var(--mute);}' +
    '.cm-or{display:flex;align-items:center;gap:10px;margin:16px 0 12px;color:var(--mute);font-size:.76rem;' +
      'letter-spacing:.1em;text-transform:uppercase;}' +
    '.cm-or::before,.cm-or::after{content:"";flex:1;height:1px;background:var(--line);}' +
    '.cm-modal .field{margin-bottom:12px;}' +
    '.cm-modal .field input{font-size:16px;}' +
    '.cm-switch{display:flex;flex-direction:column;align-items:stretch;gap:12px;margin-top:16px;}' +
    '.cm-cta{width:100%;padding:15px 14px;cursor:pointer;text-align:center;font-family:var(--font-body);font-size:1.05rem;font-weight:700;' +
      'color:var(--gold-light);background:rgba(212,175,55,.14);border:2px solid var(--gold);border-radius:var(--radius);' +
      'transition:background .15s ease,color .15s ease;}' +
    '.cm-cta:hover,.cm-cta:focus-visible{background:var(--gold);color:var(--gold-ink);}' +
    '.cm-cta-soft{font-size:.95rem;font-weight:600;color:var(--white);background:none;border:1px solid var(--line);}' +
    '.cm-cta-soft:hover,.cm-cta-soft:focus-visible{background:var(--navy-700);color:var(--white);border-color:var(--gold);}' +
    '.cm-forgot{align-self:center;font-size:.92rem;text-decoration:underline;padding:6px 4px;}' +
    '.cm-bar-btns{display:flex;gap:10px;flex-wrap:wrap;}' +
    '@media (prefers-reduced-motion:no-preference){.cm-modal{animation:cmPop .25s ease both;}' +
      '@keyframes cmPop{from{opacity:0;transform:translateY(10px) scale(.97);}to{opacity:1;transform:none;}}}';
  document.head.appendChild(css);

  var G_ICON = '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.4-4.7 7l7.3 5.7c4.3-4 6.9-9.9 6.9-17.2z"/><path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.3-5.7c-2 1.4-4.9 2.3-8.6 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>';

  /* ---------- the sign-in window ---------- */
  var modal = null, mode = 'in', opener = null;
  function buildModal() {
    modal = document.createElement('div');
    modal.className = 'cm-back';
    modal.hidden = true;
    modal.innerHTML = '<div class="cm-modal" role="dialog" aria-modal="true" aria-labelledby="cmMTitle">' +
      '<button type="button" class="cm-x" aria-label="' + COPY.close + '">&times;</button>' +
      '<h2 id="cmMTitle"></h2><div id="cmMBody"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('mousedown', function (e) { if (e.target === modal) closeModal(); });
    modal.querySelector('.cm-x').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
    modal.querySelector('#cmMBody').addEventListener('click', function (e) {
      var go = e.target.closest('[data-go]');
      if (go) { mode = go.getAttribute('data-go'); drawModal(); return; }
      if (e.target.closest('[data-google]')) doGoogle();
    });
    modal.querySelector('#cmMBody').addEventListener('submit', function (e) { e.preventDefault(); doEmail(); });
  }
  function drawModal() {
    var t = mode === 'up' ? COPY.modalUp : mode === 'reset' ? COPY.modalReset : COPY.modalIn;
    modal.querySelector('#cmMTitle').textContent = t;
    var body = '';
    if (mode !== 'reset') {
      body += '<button type="button" class="cm-google" data-google="1">' + G_ICON + '<span>' + COPY.google + '</span></button>' +
        '<p class="cm-hint">' + COPY.googleHint + '</p><div class="cm-or">' + COPY.or + '</div>';
    }
    body += '<form novalidate>';
    if (mode === 'up') {
      body += '<div class="field"><label for="cmName">' + COPY.name + '</label>' +
        '<input id="cmName" type="text" maxlength="' + MAX_NAME + '" autocomplete="nickname" placeholder="' + COPY.namePh + '"></div>';
    }
    body += '<div class="field"><label for="cmEmail">' + COPY.email + '</label>' +
      '<input id="cmEmail" type="email" autocomplete="email" inputmode="email"></div>';
    if (mode !== 'reset') {
      body += '<div class="field"><label for="cmPass">' + COPY.password + '</label>' +
        '<input id="cmPass" type="password" autocomplete="' + (mode === 'up' ? 'new-password' : 'current-password') + '"></div>';
    }
    body += '<button type="submit" class="btn btn-solid" style="width:100%" id="cmGo">' +
      (mode === 'up' ? COPY.submitUp : mode === 'reset' ? COPY.submitReset : COPY.submitIn) + '</button>' +
      '<p class="cm-msg" id="cmMMsg" role="alert"></p></form><div class="cm-switch">';
    if (mode === 'in') {
      body += '<button type="button" class="cm-cta" data-go="up">' + COPY.toUp + '</button>' +
        '<button type="button" class="cm-link cm-forgot" data-go="reset">' + COPY.forgot + '</button>';
    } else if (mode === 'up') {
      body += '<button type="button" class="cm-cta cm-cta-soft" data-go="in">' + COPY.toIn + '</button>';
    } else {
      body += '<button type="button" class="cm-cta cm-cta-soft" data-go="in">' + COPY.back + '</button>';
    }
    body += '</div>';
    modal.querySelector('#cmMBody').innerHTML = body;
  }
  function modalMsg(text, isErr) {
    var m = document.getElementById('cmMMsg');
    if (!m) return;
    m.textContent = text || '';
    m.className = 'cm-msg' + (isErr ? ' err' : '');
  }
  function openModal(startMode) {
    if (!modal) buildModal();
    opener = document.activeElement;
    mode = startMode || 'in';
    drawModal();
    modal.hidden = false;
    var first = modal.querySelector('.cm-google') || modal.querySelector('input');
    if (first) first.focus();
  }
  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    if (opener && opener.focus) { try { opener.focus(); } catch (e) { /* element gone */ } }
  }
  function busy(on) { var b = document.getElementById('cmGo'); if (b) b.disabled = !!on; }
  function doGoogle() {
    modalMsg('');
    backend.signInGoogle().then(closeModal, function (e) { if (!silent(e)) modalMsg(errText(e), true); });
  }
  function doEmail() {
    var email = (document.getElementById('cmEmail') || {}).value || '';
    var pass = (document.getElementById('cmPass') || {}).value || '';
    var nameEl = document.getElementById('cmName');
    var name = nameEl ? nameEl.value.trim() : '';
    email = email.trim();
    modalMsg('');
    if (!validEmail(email)) { modalMsg(COPY.needEmail, true); return; }
    if (mode === 'reset') {
      busy(true);
      backend.resetPassword(email).then(function () { busy(false); modalMsg(COPY.resetSent, false); },
        function (e) { busy(false); modalMsg(errText(e), true); });
      return;
    }
    if (mode === 'up' && name.length < 2) { modalMsg(COPY.needName, true); return; }
    if (pass.length < MIN_PASSWORD) { modalMsg(COPY.needPass, true); return; }
    busy(true);
    var p = mode === 'up' ? backend.signUpEmail(name, email, pass) : backend.signInEmail(email, pass);
    p.then(function () { busy(false); closeModal(); }, function (e) { busy(false); modalMsg(errText(e), true); });
  }

  /* ---------- who is signed in (shared by every open section) ---------- */
  var me = null, isAdmin = false, authWired = false, active = null;
  function myName() { return (me && (me.name || (me.email || '').split('@')[0])) || 'Anónimo'; }
  function wireAuth() {
    if (authWired) return;
    authWired = true;
    backend.onAuth(function (u) {
      me = u;
      isAdmin = false;
      if (active) active.drawAuth();
      if (u) {
        backend.checkAdmin().then(function (yes) {
          if (me && me.uid === u.uid) { isAdmin = !!yes; if (active) active.drawList(); }
        });
      }
    });
  }

  /* ---------- one comments section, for one story ---------- */
  function Section(storyId, article) {
    var self = this;
    var el = document.createElement('section');
    el.className = 'cm';
    el.setAttribute('data-story', storyId);
    el.innerHTML =
      '<div class="section-head"><h2>' + COPY.title + '</h2><span class="section-note" id="cmCount"></span></div>' +
      '<div class="cm-bar" id="cmBar"></div><div id="cmFormWrap"></div>' +
      '<div class="cm-list" id="cmList" aria-live="polite"><p class="cm-note">' + COPY.loading + '</p></div>';
    article.insertAdjacentElement('afterend', el);
    self.el = el;
    self.id = storyId;

    var bar = el.querySelector('#cmBar'), wrap = el.querySelector('#cmFormWrap');
    var list = el.querySelector('#cmList'), count = el.querySelector('#cmCount');
    var comments = [], loaded = false, failed = false, unsub = null, dead = false;
    var draft = '', replyTo = null, replyDraft = '';

    /* --- the sign-in bar and the comment box --- */
    self.drawAuth = function () {
      if (me) {
        bar.innerHTML = '<span class="cm-bar-text">' + COPY.as + '<strong>' + esc(myName()) + '</strong></span>' +
          '<button type="button" class="btn btn-ghost btn-small" data-act="out">' + COPY.leave + '</button>';
        wrap.innerHTML = '<form class="cm-form" novalidate>' +
          '<label class="sr-only" for="cmText" style="position:absolute;left:-9999px">' + COPY.placeholder + '</label>' +
          '<textarea id="cmText" maxlength="' + MAX_LENGTH + '" placeholder="' + COPY.placeholder + '"></textarea>' +
          '<div class="cm-row"><span class="cm-count" id="cmCharCount"></span>' +
          '<button type="submit" class="btn btn-solid btn-small" id="cmSend">' + COPY.send + '</button></div>' +
          '<p class="cm-msg" id="cmFMsg" role="alert"></p></form>';
        var ta = wrap.querySelector('textarea');
        ta.value = draft;
        updateCount();
      } else {
        bar.innerHTML = '<span class="cm-bar-text">' + COPY.loggedOut + '</span>' +
          '<span class="cm-bar-btns"><button type="button" class="btn btn-ghost" data-act="in">' + COPY.enter + '</button>' +
          '<button type="button" class="btn btn-solid" data-act="up">' + COPY.create + '</button></span>';
        wrap.innerHTML = '';
        replyTo = null;
      }
      self.drawList();
    };
    function updateCount() {
      var ta = wrap.querySelector('textarea'), c = wrap.querySelector('#cmCharCount');
      if (ta && c) c.textContent = ta.value.length + ' / ' + MAX_LENGTH;
    }
    function formMsg(text, isErr) {
      var m = wrap.querySelector('#cmFMsg');
      if (m) { m.textContent = text || ''; m.className = 'cm-msg' + (isErr ? ' err' : ''); }
    }

    /* --- the list --- */
    function itemHTML(c, isReply, tail) {
      var mine = me && me.uid === c.uid;
      var acts = '';
      if (me && !isReply) acts += '<button type="button" class="cm-link" data-act="reply" data-id="' + esc(c.id) + '">' + COPY.reply + '</button>';
      if (me && isReply) acts += '<button type="button" class="cm-link" data-act="reply" data-id="' + esc(c.parentId) + '" data-at="' + esc(c.name) + '">' + COPY.reply + '</button>';
      if (mine || isAdmin) acts += '<button type="button" class="cm-link danger" data-act="del" data-id="' + esc(c.id) + '">' + COPY.del + '</button>';
      if (isAdmin && !mine) acts += '<button type="button" class="cm-link danger" data-act="ban" data-id="' + esc(c.id) + '" data-uid="' + esc(c.uid) + '">' + COPY.block + '</button>';
      return '<div class="cm-item" id="c-' + esc(c.id) + '">' + avatar(c) +
        '<div class="cm-main"><div class="cm-head"><span class="cm-name">' + esc(c.name) + '</span>' +
        '<span class="cm-time">' + ago(c.ts) + '</span></div>' +
        '<p class="cm-text">' + esc(c.text) + '</p>' +
        (acts ? '<div class="cm-acts">' + acts + '</div>' : '') +
        (!isReply && replyTo === c.id ? replyFormHTML() : '') +
        (tail || '') + '</div></div>';
    }
    function replyFormHTML() {
      return '<form class="cm-reply" novalidate data-parent="' + esc(replyTo) + '">' +
        '<textarea maxlength="' + MAX_LENGTH + '" placeholder="' + COPY.replyPlaceholder + '" aria-label="' + COPY.replyPlaceholder + '"></textarea>' +
        '<div class="cm-row"><button type="button" class="cm-link" data-act="cancel">' + COPY.cancel + '</button>' +
        '<button type="submit" class="btn btn-solid btn-small">' + COPY.replySend + '</button></div>' +
        '<p class="cm-msg" role="alert"></p></form>';
    }
    self.drawList = function () {
      if (dead) return;
      /* keep a half-written reply alive while the list redraws */
      var oldTa = list.querySelector('.cm-reply textarea');
      var hadFocus = oldTa && document.activeElement === oldTa;
      if (oldTa) replyDraft = oldTa.value;

      if (failed) { list.innerHTML = '<p class="cm-note">' + COPY.listFail + '</p>'; count.textContent = ''; return; }
      if (!loaded) return;

      var tops = [], kids = {}, ids = {};
      comments.forEach(function (c) { ids[c.id] = true; });
      comments.forEach(function (c) {
        if (c.parentId) { (kids[c.parentId] = kids[c.parentId] || []).push(c); }
        else tops.push(c);
      });
      /* replies whose parent was deleted stay visible under a placeholder */
      Object.keys(kids).forEach(function (pid) {
        if (!ids[pid]) tops.push({ id: pid, gone: true, ts: kids[pid][0].ts });
      });
      tops.sort(function (a, b) { return b.ts - a.ts; });

      count.textContent = comments.length === 1 ? COPY.one : comments.length + COPY.many;
      if (!comments.length) { list.innerHTML = '<p class="cm-note">' + COPY.empty + '</p>'; return; }

      list.innerHTML = tops.map(function (c) {
        var replies = (kids[c.id] || []).slice().sort(function (a, b) { return a.ts - b.ts; });
        var tail = replies.length ? '<div class="cm-replies">' + replies.map(function (r) { return itemHTML(r, true); }).join('') + '</div>' : '';
        return c.gone
          ? '<div class="cm-item"><div class="cm-main"><p class="cm-gone">' + COPY.gone + '</p>' + tail + '</div></div>'
          : itemHTML(c, false, tail);
      }).join('');

      var ta = list.querySelector('.cm-reply textarea');
      if (ta) { ta.value = replyDraft; if (hadFocus) ta.focus(); }
    };

    /* --- clicks and submits --- */
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act'), id = b.getAttribute('data-id');
      if (act === 'in') { openModal('in'); return; }
      if (act === 'up') { openModal('up'); return; }
      if (act === 'out') { backend.signOut(); return; }
      if (act === 'reply') {
        replyTo = id; replyDraft = b.getAttribute('data-at') ? '@' + b.getAttribute('data-at') + ' ' : '';
        self.drawList();
        var ta = list.querySelector('.cm-reply textarea');
        if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
        return;
      }
      if (act === 'cancel') { replyTo = null; replyDraft = ''; self.drawList(); return; }
      if (act === 'del') {
        if (!window.confirm(COPY.confirmDel)) return;
        backend.remove(id).catch(function (err) { window.alert(errText(err)); });
        return;
      }
      if (act === 'ban') {
        if (!window.confirm(COPY.confirmBlock)) return;
        backend.ban(b.getAttribute('data-uid')).then(function () { return backend.remove(id); })
          .catch(function (err) { window.alert(errText(err)); });
      }
    });
    el.addEventListener('input', function (e) {
      if (e.target.closest('.cm-form')) { draft = e.target.value; updateCount(); }
    });
    function send(text, parentId, btn, msgEl, onOk) {
      text = text.trim();
      if (!text) return;
      btn.disabled = true; var label = btn.textContent; btn.textContent = COPY.sending;
      backend.add(storyId, text, parentId, myName()).then(function () {
        btn.disabled = false; btn.textContent = label; onOk();
      }, function (err) {
        btn.disabled = false; btn.textContent = label;
        msgEl.textContent = errText(err); msgEl.className = 'cm-msg err';
      });
    }
    el.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!me) { openModal('in'); return; }
      var f = e.target;
      if (f.classList.contains('cm-form')) {
        send(f.querySelector('textarea').value, null, f.querySelector('#cmSend'), f.querySelector('#cmFMsg'), function () {
          draft = ''; f.querySelector('textarea').value = ''; updateCount(); formMsg('');
        });
      } else if (f.classList.contains('cm-reply')) {
        send(f.querySelector('textarea').value, f.getAttribute('data-parent'), f.querySelector('button[type=submit]'),
          f.querySelector('.cm-msg'), function () { replyTo = null; replyDraft = ''; self.drawList(); });
      }
    });

    /* --- go live --- */
    self.drawAuth();
    backend.load().then(function () {
      if (dead) return;
      wireAuth();
      unsub = backend.subscribe(storyId, function (rows) {
        comments = rows; loaded = true; failed = false; self.drawList();
      }, function () { failed = true; self.drawList(); });
    }, function () {
      if (!dead) { list.innerHTML = '<p class="cm-note">' + COPY.loadFail + '</p>'; }
    });
    self.destroy = function () {
      dead = true;
      if (unsub) { try { unsub(); } catch (e) { /* already gone */ } }
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }

  /* ---------- put a section under whichever story is open ---------- */
  function sync() {
    var article = page.querySelector('article.article[data-story]');
    if (!article) {
      if (active) { active.destroy(); active = null; }
      return;
    }
    var id = article.getAttribute('data-story');
    if (active && active.id === id && active.el.isConnected) return;
    if (active) active.destroy();
    active = new Section(id, article);
  }
  new MutationObserver(sync).observe(page, { childList: true });
  sync();
})();
