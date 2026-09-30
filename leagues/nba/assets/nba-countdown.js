/* ============================================================
   NBA COUNTDOWN  --  the draft-night timer on leagues/nba/nba-landing-page.html

   The time it counts down to is written on the page itself, in
     <div id="nbaCountdown" data-target="2026-10-04T21:00:00-04:00">
   (year-month-day T hour:minute:second, then the New York UTC offset:
   -04:00 while clocks are on summer time, -05:00 in winter).
   Change that one line to move the draft.

   Before that moment  -> the timer ticks down every second.
   At that moment      -> the page swaps itself, no reload, to
                          "Estamos trabajando en editar los equipos".
   If someone opens the page after it -> they go straight to that message.
   ============================================================ */
(function () {
  'use strict';

  var box = document.getElementById('nbaCountdown');
  if (!box) return;

  var target = new Date(box.getAttribute('data-target')).getTime();
  var before = document.getElementById('nbaBefore');
  var after = document.getElementById('nbaAfter');
  var cells = {
    d: box.querySelector('[data-unit="d"]'),
    h: box.querySelector('[data-unit="h"]'),
    m: box.querySelector('[data-unit="m"]'),
    s: box.querySelector('[data-unit="s"]')
  };
  var timer = null;

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function showAfter() {
    if (timer) window.clearInterval(timer);
    if (before) before.hidden = true;
    if (after) after.hidden = false;
  }

  function tick() {
    var left = target - Date.now();
    if (isNaN(left) || left <= 0) { showAfter(); return; }
    var secs = Math.floor(left / 1000);
    cells.d.textContent = pad(Math.floor(secs / 86400));
    cells.h.textContent = pad(Math.floor(secs % 86400 / 3600));
    cells.m.textContent = pad(Math.floor(secs % 3600 / 60));
    cells.s.textContent = pad(secs % 60);
  }

  tick();
  if (!after || after.hidden) timer = window.setInterval(tick, 1000);
})();
