/* Email-alert signup box.
   Adds a "get news alerts" section to any page that loads this file.
   It stays completely hidden until FORM_ACTION below is filled in, so
   it is safe to publish before Brevo is set up. */
(function () {
  'use strict';

  /* ===== SETTINGS ===================================================
     Paste the address of your Brevo signup form here. In Brevo, open
     your subscription form > Share / embed code, and copy the URL that
     sits inside  action="https://....sibforms.com/serve/...."         */
  var FORM_ACTION = 'https://74499ef2.sibforms.com/serve/MUIFAGapRrFwXEsaVz5fvjlMSSf0EZAIl06N_DaeCRmd8E2rEb3S6a_awLz8WfXJ_rHg3YhysZMT0yX8lKV_NFno_vxqStyDvW0MdAszUXm3FG0ODASTIgBAfWRaYDJ8VaWv8GKJLscxtsWIV3evh8mRR1HQLaLFW8LHYta1FK--R1macMRikpbPaiZ_zUTNvJqzYK66ZNK-grTMQw==';

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
    fail: 'No se pudo enviar. Revisa tu conexi\u00f3n e int\u00e9ntalo de nuevo.'
  };
  /* =================================================================== */

  if (!FORM_ACTION) return;
  var host = document.querySelector('main') || document.querySelector('.site-footer');
  if (!host || document.getElementById('alertsSection')) return;

  var css = document.createElement('style');
  css.textContent =
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
    '@media (max-width:760px){.alerts-card{grid-template-columns:1fr;padding:22px;}.alerts-row{flex-direction:column;}}';
  document.head.appendChild(css);

  var section = document.createElement('section');
  section.className = 'section alerts-section';
  section.id = 'alertsSection';
  section.innerHTML =
    '<div class="wrap"><div class="alerts-card">' +
      '<div><div class="hero-kicker">' + COPY.kicker + '</div><h2>' + COPY.title + '</h2><p>' + COPY.text + '</p></div>' +
      '<form id="alertsForm" novalidate>' +
        '<label class="alerts-sr" for="alertsEmail">' + COPY.label + '</label>' +
        '<div class="alerts-row">' +
          '<input type="email" id="alertsEmail" name="EMAIL" required autocomplete="email" placeholder="' + COPY.placeholder + '">' +
          '<button class="btn btn-solid" type="submit">' + COPY.button + '</button>' +
        '</div>' +
        '<input class="alerts-hp" type="text" name="email_address_check" value="" tabindex="-1" autocomplete="off" aria-hidden="true">' +
        '<input type="hidden" name="locale" value="en">' +
        '<input type="hidden" name="html_type" value="simple">' +
        '<div class="alerts-msg" id="alertsMsg" role="status" aria-live="polite"></div>' +
      '</form>' +
    '</div></div>';
  host.appendChild(section);

  var form = document.getElementById('alertsForm');
  var input = document.getElementById('alertsEmail');
  var msg = document.getElementById('alertsMsg');
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
      .then(function () { say(COPY.ok, 'ok'); form.reset(); done(); })
      .catch(function () { say(COPY.fail, 'err'); done(); });
  });
})();
