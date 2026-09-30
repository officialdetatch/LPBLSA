/* Email-alert signup.
   Adds two things to the site:
     1. A "get news alerts" box at the bottom of any page that loads this file.
     2. A pop-up that jumps onto the screen a moment after the HOME page loads.
   Both stay completely hidden until FORM_ACTION below is filled in, so it is
   safe to publish before Brevo is set up. */
(function () {
  'use strict';

  /* ===== SETTINGS ===================================================
     Paste the address of your Brevo signup form here. In Brevo, open
     your subscription form > Share / embed code, and copy the URL that
     sits inside  action="https://....sibforms.com/serve/...."         */
  var FORM_ACTION = 'https://74499ef2.sibforms.com/serve/MUIFAGapRrFwXEsaVz5fvjlMSSf0EZAIl06N_DaeCRmd8E2rEb3S6a_awLz8WfXJ_rHg3YhysZMT0yX8lKV_NFno_vxqStyDvW0MdAszUXm3FG0ODASTIgBAfWRaYDJ8VaWv8GKJLscxtsWIV3evh8mRR1HQLaLFW8LHYta1FK--R1macMRikpbPaiZ_zUTNvJqzYK66ZNK-grTMQw==';

  /* The home-page pop-up. */
  var POPUP = {
    enabled: true,          /* false = turn the pop-up off, keep the bottom boxes */
    delayMs: 1200,          /* how long after the page loads it appears           */
    oncePerSession: true,   /* true  = once per browser visit (won't nag if they  */
                            /*         click around and come back to the home)    */
                            /* false = every single time the home page loads      */
    stopAfterSignup: true   /* true  = never show it again on a browser that has  */
                            /*         already signed up                          */
  };

  /* The words shown on the page (edit freely). */
  var COPY = {
    kicker: 'Alertas por correo',
    title: 'No te pierdas <span class="accent">ninguna noticia</span>',
    text: 'Deja tu correo y te avisamos cada vez que publiquemos una noticia nueva.',
    label: 'Correo electr\u00f3nico',
    placeholder: 'tucorreo@ejemplo.com',
    button: 'Suscribirme',
    sending: 'Enviando...',
    invalid: 'Escribe un correo v\u00e1lido.',
    ok: 'Casi listo. Revisa tu correo y confirma tu suscripci\u00f3n (mira tambi\u00e9n en spam).',
    fail: 'No se pudo enviar. Revisa tu conexi\u00f3n e int\u00e9ntalo de nuevo.',
    close: 'Cerrar',
    later: 'Ahora no, gracias'
  };
  /* =================================================================== */

  if (!FORM_ACTION) return;

  var isHome = /(^|\/)(index\.html)?$/.test(location.pathname);
  var SIGNED_KEY = 'lpblsa.alerts.signedup';
  var SEEN_KEY = 'lpblsa.alerts.popup.seen';

  function store(kind) {
    try { return kind === 'session' ? window.sessionStorage : window.localStorage; } catch (e) { return null; }
  }
  function getFlag(kind, key) { var s = store(kind); try { return !!(s && s.getItem(key)); } catch (e) { return false; } }
  function setFlag(kind, key) { var s = store(kind); try { if (s) s.setItem(key, '1'); } catch (e) { /* private mode: fine */ } }

  /* ---------- styles ---------- */
  var css = document.createElement('style');
  css.textContent =
    /* bottom box */
    '.alerts-card{display:grid;grid-template-columns:1.1fr 1fr;gap:28px;align-items:center;' +
      'background:linear-gradient(135deg,var(--navy-800),var(--navy-900));border:1px solid var(--line);' +
      'border-left:5px solid var(--gold);border-radius:var(--radius);padding:28px;box-shadow:var(--shadow-md);}' +
    '.alerts-card h2{font-size:clamp(1.4rem,3vw,1.9rem);margin:6px 0 8px;}' +
    '.alerts-card p{color:var(--mute);margin:0;}' +
    '.alerts-row{display:flex;gap:10px;}' +
    '.alerts-row input[type=email]{flex:1;min-width:0;background:var(--navy-950);border:1px solid var(--line);' +
      'color:var(--white);padding:12px 14px;border-radius:var(--radius);font-family:var(--font-body);font-size:1rem;}' +
    '.alerts-row input[type=email]:focus{outline:none;border-color:var(--gold);}' +
    '.alerts-row .btn{justify-content:center;white-space:nowrap;}' +
    '.alerts-row .btn[disabled]{opacity:.6;cursor:wait;}' +
    '.alerts-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0;}' +
    '.alerts-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}' +
    '.alerts-msg{min-height:1.4em;margin-top:10px;font-size:.9rem;color:var(--mute);}' +
    '.alerts-msg.ok{color:var(--gold-light);}' +
    '.alerts-msg.err{color:var(--loss);}' +
    '@media (max-width:760px){.alerts-card{grid-template-columns:1fr;padding:22px;}.alerts-row{flex-direction:column;}}' +
    /* pop-up */
    '.alerts-pop-backdrop{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;' +
      'padding:20px;background:rgba(3,8,20,.8);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);' +
      'opacity:0;transition:opacity .35s ease;}' +
    '.alerts-pop-backdrop.show{opacity:1;}' +
    '.alerts-pop{position:relative;width:min(560px,100%);max-height:calc(100vh - 40px);overflow:auto;text-align:center;' +
      'background:linear-gradient(160deg,var(--navy-700),var(--navy-900) 60%);border:1px solid var(--gold);' +
      'border-top:6px solid var(--gold);border-radius:var(--radius);padding:40px 34px 28px;' +
      'box-shadow:0 30px 90px rgba(0,0,0,.65),0 0 60px rgba(212,175,55,.18);' +
      'transform:translateY(28px) scale(.94);transition:transform .45s cubic-bezier(.2,.9,.3,1.25);outline:none;}' +
    '.alerts-pop-backdrop.show .alerts-pop{transform:none;}' +
    '.alerts-icon{width:74px;height:74px;margin:0 auto 14px;border-radius:50%;display:flex;align-items:center;' +
      'justify-content:center;background:var(--gold);color:var(--gold-ink);animation:alertsPulse 2s ease-out infinite;}' +
    '.alerts-icon svg{width:38px;height:38px;transform-origin:50% 8%;animation:alertsRing 2.4s ease-in-out infinite;}' +
    '.alerts-pop h2{font-size:clamp(1.9rem,7vw,2.8rem);line-height:1.05;margin:8px 0 12px;text-transform:uppercase;}' +
    '.alerts-pop p{color:var(--mute);margin:0 0 22px;font-size:1.05rem;}' +
    '.alerts-pop .alerts-row{flex-direction:column;}' +
    '.alerts-pop .alerts-row input[type=email]{padding:15px 16px;font-size:1.05rem;text-align:center;}' +
    '.alerts-pop .alerts-row .btn{padding:15px 20px;font-size:1.05rem;}' +
    '.alerts-pop .alerts-msg{text-align:center;}' +
    '.alerts-pop-x{position:absolute;top:8px;right:10px;background:none;border:0;color:var(--mute);font-size:2rem;' +
      'line-height:1;cursor:pointer;padding:6px 12px;}' +
    '.alerts-pop-x:hover,.alerts-later:hover{color:var(--white);}' +
    '.alerts-later{display:inline-block;margin-top:14px;background:none;border:0;color:var(--mute);cursor:pointer;' +
      'font:inherit;font-size:.9rem;text-decoration:underline;}' +
    '@keyframes alertsPulse{0%{box-shadow:0 0 0 0 rgba(212,175,55,.6);}70%,100%{box-shadow:0 0 0 22px rgba(212,175,55,0);}}' +
    '@keyframes alertsRing{0%,55%,100%{transform:rotate(0);}10%{transform:rotate(14deg);}20%{transform:rotate(-12deg);}' +
      '30%{transform:rotate(9deg);}40%{transform:rotate(-6deg);}}' +
    '@media (prefers-reduced-motion:reduce){.alerts-pop-backdrop,.alerts-pop{transition:none;}' +
      '.alerts-icon,.alerts-icon svg{animation:none;}}';
  document.head.appendChild(css);

  /* ---------- shared form markup + submit logic ---------- */
  function formHTML(prefix) {
    return '<form id="' + prefix + 'Form" novalidate>' +
      '<label class="alerts-sr" for="' + prefix + 'Email">' + COPY.label + '</label>' +
      '<div class="alerts-row">' +
        '<input type="email" id="' + prefix + 'Email" name="EMAIL" required autocomplete="email" placeholder="' + COPY.placeholder + '">' +
        '<button class="btn btn-solid" type="submit">' + COPY.button + '</button>' +
      '</div>' +
      '<input class="alerts-hp" type="text" name="email_address_check" value="" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<input type="hidden" name="locale" value="en">' +
      '<input type="hidden" name="html_type" value="simple">' +
      '<div class="alerts-msg" id="' + prefix + 'Msg" role="status" aria-live="polite"></div>' +
    '</form>';
  }

  function wire(prefix, onSuccess) {
    var form = document.getElementById(prefix + 'Form');
    var input = document.getElementById(prefix + 'Email');
    var msg = document.getElementById(prefix + 'Msg');
    var btn = form.querySelector('button');

    function say(text, kind) { msg.textContent = text; msg.className = 'alerts-msg ' + (kind || ''); }
    function done() { btn.disabled = false; btn.textContent = COPY.button; }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say(COPY.invalid, 'err'); input.focus(); return; }
      if (form.elements.email_address_check.value) return; /* a bot filled the hidden field */
      btn.disabled = true; btn.textContent = COPY.sending; say('');
      var url = FORM_ACTION + (FORM_ACTION.indexOf('?') < 0 ? '?' : '&') + 'isAjax=1';
      /* no-cors: the browser sends the signup but can't read Brevo's reply. */
      fetch(url, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(new FormData(form)) })
        .then(function () {
          say(COPY.ok, 'ok'); form.reset(); done();
          setFlag('local', SIGNED_KEY);
          if (onSuccess) onSuccess();
        })
        .catch(function () { say(COPY.fail, 'err'); done(); });
    });
  }

  /* ---------- 1. the box at the bottom of the page ---------- */
  /* Not on the home page: the pop-up does that job there. (If you switch the
     pop-up off above, the box comes back on the home page automatically.) */
  var host = document.querySelector('main') || document.querySelector('.site-footer');
  var skipBox = isHome && POPUP.enabled;
  if (host && !skipBox && !document.getElementById('alertsSection')) {
    var section = document.createElement('section');
    section.className = 'section alerts-section';
    section.id = 'alertsSection';
    section.innerHTML =
      '<div class="wrap"><div class="alerts-card">' +
        '<div><div class="hero-kicker">' + COPY.kicker + '</div><h2>' + COPY.title + '</h2><p>' + COPY.text + '</p></div>' +
        formHTML('alerts') +
      '</div></div>';
    host.appendChild(section);
    wire('alerts');
  }

  /* ---------- 2. the pop-up on the home page ---------- */
  if (!isHome || !POPUP.enabled) return;
  if (POPUP.stopAfterSignup && getFlag('local', SIGNED_KEY)) return;
  if (POPUP.oncePerSession && getFlag('session', SEEN_KEY)) return;

  var BELL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>' +
    '<path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>';

  function openPopup() {
    if (document.getElementById('alertsPopBackdrop')) return;
    setFlag('session', SEEN_KEY);

    var lastFocus = document.activeElement;
    var prevOverflow = document.body.style.overflow;

    var back = document.createElement('div');
    back.className = 'alerts-pop-backdrop';
    back.id = 'alertsPopBackdrop';
    back.innerHTML =
      '<div class="alerts-pop" role="dialog" aria-modal="true" aria-labelledby="alertsPopTitle" tabindex="-1">' +
        '<button type="button" class="alerts-pop-x" aria-label="' + COPY.close + '">&times;</button>' +
        '<div class="alerts-icon">' + BELL + '</div>' +
        '<div class="hero-kicker">' + COPY.kicker + '</div>' +
        '<h2 id="alertsPopTitle">' + COPY.title + '</h2>' +
        '<p>' + COPY.text + '</p>' +
        formHTML('alertsPop') +
        '<button type="button" class="alerts-later">' + COPY.later + '</button>' +
      '</div>';
    document.body.appendChild(back);
    document.body.style.overflow = 'hidden';

    var dialog = back.querySelector('.alerts-pop');
    var closed = false;

    function close() {
      if (closed) return;
      closed = true;
      document.removeEventListener('keydown', onKey);
      back.classList.remove('show');
      document.body.style.overflow = prevOverflow;
      setTimeout(function () { back.remove(); }, 400);
      if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) { /* ignore */ } }
    }

    function onKey(e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      var f = dialog.querySelectorAll('button:not([disabled]),input:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', onKey);

    back.addEventListener('click', function (e) { if (e.target === back) close(); });
    back.querySelector('.alerts-pop-x').addEventListener('click', close);
    back.querySelector('.alerts-later').addEventListener('click', close);

    /* After a successful signup, leave the thank-you message up for a moment, then close. */
    wire('alertsPop', function () { setTimeout(close, 3200); });

    requestAnimationFrame(function () { back.classList.add('show'); });
    /* Focus the box itself, not the email field: on phones, focusing the field
       would throw the keyboard up over the pop-up before anyone has read it. */
    dialog.focus();
  }

  function schedule() { setTimeout(openPopup, POPUP.delayMs); }
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule);
})();