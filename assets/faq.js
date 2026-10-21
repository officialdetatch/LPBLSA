/* ============================================================
   PREGUNTAS FRECUENTES  --  draws faq.html from assets/faq-data.js.
   Every question opens and closes on its own. The search box hides the
   ones that don't match (accents and capitals don't matter). A link like
   faq.html#draft opens that question and scrolls to it.
   ============================================================ */
(function () {
  'use strict';

  var data = window.LPBSA_FAQ;
  var list = document.getElementById('faqList');
  if (!data || !list) return;
  var jump = document.getElementById('faqJump');
  var none = document.getElementById('faqNone');
  var search = document.getElementById('faqSearch');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  /* "Qué", "que" and "QUE" all match */
  function plain(s) {
    return String(s || '').replace(/<[^>]+>/g, ' ').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  var chev = '<svg class="faq-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  list.innerHTML = data.groups.map(function (g) {
    return '<section class="faq-group" id="tema-' + esc(g.id) + '" aria-labelledby="h-' + esc(g.id) + '">' +
      '<h2 class="faq-group-title" id="h-' + esc(g.id) + '">' + esc(g.title) + '</h2>' +
      g.items.map(function (it) {
        return '<details class="faq-item" id="' + esc(it.id) + '">' +
          '<summary><span>' + esc(it.q) + '</span>' + chev + '</summary>' +
          '<div class="faq-answer">' + it.a + '</div></details>';
      }).join('') + '</section>';
  }).join('');

  if (jump) {
    jump.innerHTML = data.groups.map(function (g) {
      return '<a href="#tema-' + esc(g.id) + '">' + esc(g.title) + '</a>';
    }).join('');
  }

  /* search text for each question, worked out once */
  var items = Array.prototype.slice.call(list.querySelectorAll('.faq-item'));
  var text = items.map(function (el) { return plain(el.textContent); });

  function filter() {
    var words = plain(search.value).split(/\s+/).filter(Boolean);
    var shown = 0;
    items.forEach(function (el, i) {
      var hit = words.every(function (w) { return text[i].indexOf(w) !== -1; });
      el.hidden = !hit;
      if (hit) shown++;
      /* while searching, open what matches so the answer is right there */
      if (words.length) el.open = hit;
    });
    Array.prototype.forEach.call(list.querySelectorAll('.faq-group'), function (g) {
      g.hidden = !g.querySelector('.faq-item:not([hidden])');
    });
    if (!words.length) items.forEach(function (el) { el.open = false; });
    none.hidden = shown > 0;
  }
  if (search) search.addEventListener('input', filter);

  /* faq.html#draft, or a link from one answer to another: open it and show it */
  function openFromHash() {
    var id = decodeURIComponent((location.hash || '').slice(1));
    if (!id) return;
    var el = document.getElementById(id);
    if (!el || !el.classList.contains('faq-item')) return;
    if (search && search.value) { search.value = ''; filter(); }
    el.open = true;
    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  /* "Pregúntale a Leonidas": shows once the bubble has Leonidas (assets/fantasy-switcher.js loads after this file) */
  document.addEventListener('DOMContentLoaded', function () {
    var leoBtn = document.getElementById('faqAskLeo');
    if (!leoBtn || !window.LPBSA_BUBBLE || !window.LPBSA_BUBBLE.leonidas) return;
    leoBtn.style.display = '';
    var mail = leoBtn.nextElementSibling;
    if (mail) mail.classList.remove('btn-solid');   /* one gold button is enough */
    var more = document.getElementById('faqMoreText');
    if (more) more.textContent = 'Pregúntale a Leonidas, el león de la liga, escríbenos o pregúntale a la comunidad en Discord.';
    leoBtn.addEventListener('click', function (e) { e.stopPropagation(); window.LPBSA_BUBBLE.open(); });
  });

  /* opening a question puts it in the address bar, so it can be shared */
  items.forEach(function (el) {
    el.addEventListener('toggle', function () {
      if (el.open && history.replaceState) history.replaceState(null, '', '#' + el.id);
    });
  });
})();
