/* ============================================================
   LPBLSA TV  --  the league's own video player.

   Every video in a story or on the About page - a file you uploaded
   (images/news/clip.mp4) or a YouTube link - plays inside this player
   instead of the browser's plain one:

     - the box: a navy frame with the league crest in the corner (like a
       TV channel's logo), "LPBLSA TV" written under it, and the gold
       play button.
     - an uploaded file gets the league's own controls (play, the gold
       time bar, sound, full screen). Upright phone videos get a tall box.
     - a YouTube video shows its picture with our play button, and
       YouTube's player is only loaded when someone presses play
       (faster page, and YouTube sees nothing until then).
     - la cajita: if you scroll away while a video plays, it keeps
       playing in a small box in the corner. The X closes it, the arrow
       brings you back to it. An uploaded video even keeps playing while
       you jump to another story.
     - only one video plays at a time.
     - keys, while the player has focus: space or K play/pause, the arrows
       jump 5 seconds, M sound, F full screen.

   Nothing to set up: assets/app.js writes the videos with  class="tv"
   and this file (loaded by news.html and about.html) does the rest.
   Without this file the videos still play with the browser's own
   controls, and a YouTube video opens on YouTube.

   The words visitors see are in TEXT below.
   ============================================================ */
(function () {
  'use strict';
  if (window.LPBSA_TV) return;

  var TEXT = {
    play: 'Reproducir',
    playVideo: 'Reproducir el video',
    pause: 'Pausa',
    replay: 'Ver otra vez',
    mute: 'Quitar el sonido',
    unmute: 'Poner el sonido',
    full: 'Pantalla completa',
    exitFull: 'Salir de pantalla completa',
    seek: 'Adelantar o atrasar el video',
    of: ' de ',
    back: 'Volver al video',
    close: 'Cerrar la cajita',
    original: 'Original',
    youtube: 'YouTube',
    openYT: 'Ver en YouTube',
    holding: 'El video sigue en la esquinita',
    bringBack: 'Traerlo pa’cá',
    errorTitle: 'Este video no se puede ver aquí.',
    errorText: 'Tu navegador no lee este formato.',
    errorOpen: 'Abrir el video'
  };

  var root = document.body.getAttribute('data-root') || '';
  var CREST = root + 'images/league-logo.png';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var IDLE_MS = 2600;

  function svg(inner, filled) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" ' +
      (filled ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"') +
      '>' + inner + '</svg>';
  }
  var ICON = {
    play: svg('<path d="M8 5.6v12.8a1 1 0 0 0 1.52.86l10.4-6.4a1 1 0 0 0 0-1.72L9.52 4.74A1 1 0 0 0 8 5.6z"/>', true),
    pause: svg('<rect x="6" y="5" width="4.2" height="14" rx="1.3"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.3"/>', true),
    replay: svg('<path d="M3.5 12a8.5 8.5 0 1 0 2.8-6.3"/><path d="M3.5 4.5V9H8"/>'),
    vol: svg('<path d="M4 9.5h3.2L12 5.6v12.8l-4.8-3.9H4z" fill="currentColor" stroke="none"/><path d="M15.6 9a4.3 4.3 0 0 1 0 6M18.4 6.4a8 8 0 0 1 0 11.2"/>'),
    mute: svg('<path d="M4 9.5h3.2L12 5.6v12.8l-4.8-3.9H4z" fill="currentColor" stroke="none"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>'),
    full: svg('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
    unfull: svg('<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>'),
    close: svg('<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>'),
    back: svg('<path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7"/>'),
    tv: svg('<rect x="3" y="6" width="18" height="12.5" rx="2.5"/><path d="M8.5 2.8L12 6l3.5-3.2M8 21.2h8"/>')
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function make(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }
  function button(cls, label, icon) {
    var b = make('button', cls, icon);
    b.type = 'button';
    b.setAttribute('aria-label', label);
    b.title = label;
    return b;
  }
  function clock(t) {
    if (!isFinite(t) || t < 0) t = 0;
    t = Math.floor(t);
    var h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
    return (h ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  function fullscreenElement() { return document.fullscreenElement || document.webkitFullscreenElement || null; }

  var players = [];
  var orphan = null;            /* an uploaded video still playing in the corner after its story was closed */

  /* ---------- the frame around a player: the "still playing" placeholder and the foot ---------- */
  function buildFrame(p, fig) {
    var hold = make('div', 'tv-hold');
    hold.hidden = true;
    hold.innerHTML = '<span class="tv-hold-icon">' + ICON.tv + '</span><span class="tv-hold-text">' + esc(TEXT.holding) + ' &#8600;</span>';
    var bring = make('button', 'tv-hold-btn', esc(TEXT.bringBack));
    bring.type = 'button';
    bring.addEventListener('click', function () { p.undock(); });
    hold.appendChild(bring);
    fig.insertBefore(hold, fig.firstChild);

    var foot = make('div', 'tv-foot');
    var right = p.kind === 'yt'
      ? '<a class="tv-ext" href="https://www.youtube.com/watch?v=' + esc(p.ytId) + '" target="_blank" rel="noopener noreferrer">' + esc(TEXT.openYT) + ' &#8599;</a>'
      : '<span class="tv-foot-dur"></span>';
    foot.innerHTML = '<span class="tv-mark">LPBLSA <b>TV</b></span><span class="tv-src">' +
      esc(p.kind === 'yt' ? TEXT.youtube : TEXT.original) + '</span><span class="tv-foot-r">' + right + '</span>';
    var cap = fig.querySelector('figcaption');
    fig.insertBefore(foot, cap || null);
    p.hold = hold;
    p.footDur = foot.querySelector('.tv-foot-dur');
    if (p.duration) p.showDuration();
  }

  /* ---------- one player ---------- */
  function Player(fig) {
    var p = this;
    p.fig = fig;
    p.kind = fig.getAttribute('data-tv') === 'youtube' ? 'yt' : 'file';
    p.ytId = fig.getAttribute('data-yt') || '';
    p.stage = fig.querySelector('.tv-stage');
    p.screen = fig.querySelector('.tv-screen');
    p.visible = true;
    p.ratio = 1;
    p.docked = false;
    p.dismissed = false;
    p.started = false;
    p.ytState = -1;
    p.duration = 0;
    p.storyId = '';
    var art = fig.closest('[data-story]');
    if (art) p.storyId = art.getAttribute('data-story');

    /* the bar shown on top of the player while it sits in the corner */
    var dockbar = make('div', 'tv-dockbar', '<span class="tv-mark"><span class="tv-mark-l">LPBLSA</span> <b>TV</b></span>');
    var backBtn = button('tv-db tv-back', TEXT.back, ICON.back);
    var closeBtn = button('tv-db tv-x', TEXT.close, ICON.close);
    dockbar.appendChild(backBtn);
    dockbar.appendChild(closeBtn);
    p.stage.insertBefore(dockbar, p.screen);
    backBtn.addEventListener('click', function () { p.goBack(); });
    closeBtn.addEventListener('click', function () { p.pause(); p.dismissed = true; p.undock(); if (!p.fig) p.destroy(); });

    /* what sits on the picture: the channel logo, the tag, the big button and the length */
    var overlay = make('div', 'tv-overlay');
    overlay.innerHTML = '<span class="tv-tag" aria-hidden="true"><i></i>LPBLSA <b>TV</b></span>' +
      '<span class="tv-bug" aria-hidden="true"><img src="' + esc(CREST) + '" alt="" onerror="this.parentNode.remove()"></span>' +
      '<span class="tv-chip" aria-hidden="true" hidden>' + ICON.play + '<span></span></span>' +
      '<span class="tv-spin" aria-hidden="true"></span>';
    p.big = button('tv-big', TEXT.playVideo, ICON.play);
    overlay.appendChild(p.big);
    p.screen.appendChild(overlay);
    p.chip = overlay.querySelector('.tv-chip');

    buildFrame(p, fig);

    if (p.kind === 'yt') p.setupYouTube(); else p.setupFile();

    p.stage.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') p.wake(); });
    p.stage.addEventListener('touchstart', function () { p.wake(); }, { passive: true });
    p.stage.addEventListener('focusin', function () { p.wake(); });

    fig.setAttribute('data-tv-ready', '1');
    players.push(p);
    dockWatch.observe(fig);
  }

  Player.prototype.setState = function (name, on) { this.stage.classList.toggle(name, !!on); };

  Player.prototype.setRatio = function (w, h) {
    if (!w || !h) return;
    var r = w / h;
    var targets = [this.stage];
    if (this.fig) targets.push(this.fig);
    targets.forEach(function (t) {
      t.style.setProperty('--tv-ar', w + ' / ' + h);
      t.style.setProperty('--tv-r', String(Math.round(r * 1000) / 1000));
      t.classList.toggle('is-portrait', r < 0.9);
    });
  };

  Player.prototype.showDuration = function () {
    var t = clock(this.duration);
    if (this.chip) { this.chip.lastChild.textContent = t; this.chip.hidden = false; }
    if (this.footDur) this.footDur.textContent = t;
    if (this.durEl) this.durEl.textContent = t;
  };

  /* controls stay while the video is paused, and fade after a moment of watching */
  Player.prototype.wake = function () {
    var p = this;
    p.setState('is-idle', false);
    clearTimeout(p.idleTimer);
    if (p.isPlaying()) p.idleTimer = setTimeout(function () { if (p.isPlaying()) p.setState('is-idle', true); }, IDLE_MS);
  };

  Player.prototype.isPlaying = function () {
    /* YouTube: until its player says otherwise, a video someone pressed play on counts as playing */
    if (this.kind === 'yt') return this.started && (!this.ytHeard || this.ytState === 1 || this.ytState === 3);
    return !!this.video && !this.video.paused && !this.video.ended;
  };

  Player.prototype.pause = function () {
    if (this.kind === 'yt') {
      if (this.iframe) this.ytCommand('pauseVideo');
    } else if (this.video && !this.video.paused) {
      this.video.pause();
    }
  };

  /* ---------- an uploaded video file ---------- */
  Player.prototype.setupFile = function () {
    var p = this, v = p.screen.querySelector('video');
    if (!v) return;
    p.video = v;
    v.removeAttribute('controls');
    v.setAttribute('playsinline', '');
    v.setAttribute('tabindex', '-1');
    p.src = (v.getAttribute('src') || '').split('#')[0];

    var bar = make('div', 'tv-bar');
    p.ppBtn = button('tv-btn tv-pp', TEXT.play, ICON.play);
    var time = make('span', 'tv-time', '<span class="tv-cur">0:00</span><span class="tv-sep"> / </span><span class="tv-dur">0:00</span>');
    p.seek = make('input', 'tv-seek');
    p.seek.type = 'range';
    p.seek.min = '0';
    p.seek.max = '100';
    p.seek.step = '0.1';
    p.seek.value = '0';
    p.seek.setAttribute('aria-label', TEXT.seek);
    p.volBtn = button('tv-btn tv-vol', TEXT.mute, ICON.vol);
    p.fsBtn = button('tv-btn tv-fs', TEXT.full, ICON.full);
    bar.appendChild(p.ppBtn);
    bar.appendChild(time);
    bar.appendChild(p.seek);
    bar.appendChild(p.volBtn);
    bar.appendChild(p.fsBtn);
    p.screen.appendChild(bar);
    p.curEl = time.querySelector('.tv-cur');
    p.durEl = time.querySelector('.tv-dur');

    var err = make('div', 'tv-error');
    err.hidden = true;
    err.innerHTML = '<b>' + esc(TEXT.errorTitle) + '</b><span>' + esc(TEXT.errorText) + '</span>' +
      '<a href="' + esc(p.src) + '" target="_blank" rel="noopener noreferrer">' + esc(TEXT.errorOpen) + ' &#8599;</a>';
    p.screen.appendChild(err);
    p.errEl = err;

    function meta() {
      if (v.videoWidth && v.videoHeight) p.setRatio(v.videoWidth, v.videoHeight);
      if (isFinite(v.duration) && v.duration > 0) {
        p.duration = v.duration;
        p.seek.max = String(Math.round(v.duration * 10) / 10);
        p.showDuration();
      }
      p.setState('is-ready', true);
    }
    function paint() {
      var d = p.duration || v.duration || 0, t = v.currentTime || 0;
      p.curEl.textContent = clock(t);
      if (!p.dragging) p.seek.value = String(Math.round(t * 10) / 10);
      var played = d ? Math.min(100, t / d * 100) : 0;
      var buffered = 0;
      try { if (v.buffered.length && d) buffered = Math.min(100, v.buffered.end(v.buffered.length - 1) / d * 100); } catch (e) { /* not yet */ }
      p.seek.style.setProperty('--p', played + '%');
      p.seek.style.setProperty('--b', Math.max(buffered, played) + '%');
      p.seek.setAttribute('aria-valuetext', clock(t) + TEXT.of + clock(d));
    }
    function syncButtons() {
      var playing = p.isPlaying();
      var icon = v.ended ? ICON.replay : playing ? ICON.pause : ICON.play;
      var label = v.ended ? TEXT.replay : playing ? TEXT.pause : TEXT.play;
      p.ppBtn.innerHTML = playing ? ICON.pause : ICON.play;
      p.ppBtn.setAttribute('aria-label', playing ? TEXT.pause : TEXT.play);
      p.ppBtn.title = playing ? TEXT.pause : TEXT.play;
      p.big.innerHTML = icon;
      p.big.setAttribute('aria-label', label);
      p.setState('is-playing', playing);
      p.setState('is-paused', !playing && !v.ended);
      p.setState('is-ended', v.ended);
    }
    function syncVolume() {
      var off = v.muted || v.volume === 0;
      p.volBtn.innerHTML = off ? ICON.mute : ICON.vol;
      p.volBtn.setAttribute('aria-label', off ? TEXT.unmute : TEXT.mute);
      p.volBtn.title = off ? TEXT.unmute : TEXT.mute;
    }

    v.addEventListener('loadedmetadata', meta);
    v.addEventListener('durationchange', meta);
    if (v.readyState >= 1) meta();
    v.addEventListener('timeupdate', paint);
    v.addEventListener('progress', paint);
    v.addEventListener('seeked', paint);
    v.addEventListener('volumechange', syncVolume);
    v.addEventListener('play', function () {
      p.started = true;
      p.dismissed = false;
      p.setState('is-started', true);
      pauseOthers(p);
      syncButtons();
      p.wake();
      p.updateDock();
    });
    v.addEventListener('pause', function () { syncButtons(); p.wake(); p.updateDock(); });
    v.addEventListener('ended', function () {
      syncButtons();
      p.wake();
      if (p.docked) { p.dismissed = true; p.undock(); if (!p.fig) p.destroy(); }
    });
    v.addEventListener('waiting', function () { p.setState('is-waiting', true); });
    ['playing', 'canplay', 'pause', 'seeked'].forEach(function (ev) {
      v.addEventListener(ev, function () { p.setState('is-waiting', false); });
    });
    v.addEventListener('error', function () {
      p.setState('is-error', true);
      p.errEl.hidden = false;
    });

    function toggle() {
      if (v.ended) { v.currentTime = 0; }
      if (v.paused || v.ended) {
        var r = v.play();
        if (r && r.catch) r.catch(function () { /* the browser said no (no sound allowed yet) */ });
      } else {
        v.pause();
      }
    }
    p.toggle = toggle;

    p.big.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });
    p.ppBtn.addEventListener('click', toggle);
    p.volBtn.addEventListener('click', function () { v.muted = !v.muted; if (!v.muted && v.volume === 0) v.volume = 1; });
    p.fsBtn.addEventListener('click', function () { p.fullscreen(); });

    /* a tap on the picture: a mouse plays/pauses, a finger first brings the controls back.
       Whether the controls were hidden is noted on pointerdown, before the touch itself wakes them. */
    var lastPointer = 'mouse', idleAtDown = false;
    p.stage.addEventListener('pointerdown', function (e) {
      lastPointer = e.pointerType || 'mouse';
      idleAtDown = p.stage.classList.contains('is-idle');
    }, true);
    /* that first tap is swallowed wherever it lands (the picture, the big button or a control that was hidden) */
    p.stage.addEventListener('click', function (e) {
      var woke = lastPointer !== 'mouse' && idleAtDown && p.isPlaying() && !e.target.closest('.tv-dockbar');
      idleAtDown = false;
      if (woke) { e.stopPropagation(); e.preventDefault(); p.wake(); }
    }, true);
    p.screen.addEventListener('click', function (e) {
      if (e.target.closest('.tv-bar, .tv-error, button, a, input')) return;
      toggle();
    });
    p.screen.addEventListener('dblclick', function (e) {
      if (e.target.closest('.tv-bar, button, a, input')) return;
      p.fullscreen();
    });

    p.seek.addEventListener('input', function () {
      p.dragging = true;
      var t = Number(p.seek.value) || 0;
      v.currentTime = t;
      p.curEl.textContent = clock(t);
      var d = p.duration || v.duration || 0;
      p.seek.style.setProperty('--p', (d ? t / d * 100 : 0) + '%');
    });
    p.seek.addEventListener('change', function () { p.dragging = false; paint(); });
    p.seek.addEventListener('pointerup', function () { p.dragging = false; });

    p.stage.addEventListener('keydown', function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var k = e.key;
      var onButton = e.target.tagName === 'BUTTON' || e.target.tagName === 'A';
      if ((k === ' ' || k === 'Spacebar') && !onButton) { e.preventDefault(); toggle(); }
      else if (k === 'k' || k === 'K') { e.preventDefault(); toggle(); }
      else if (k === 'ArrowLeft' || k === 'ArrowRight') {
        e.preventDefault();
        v.currentTime = Math.max(0, Math.min((p.duration || v.duration || 0), v.currentTime + (k === 'ArrowLeft' ? -5 : 5)));
        p.wake();
      }
      else if (k === 'm' || k === 'M') { v.muted = !v.muted; }
      else if (k === 'f' || k === 'F') { p.fullscreen(); }
    });

    syncButtons();
    syncVolume();
  };

  Player.prototype.fullscreen = function () {
    var st = this.stage, v = this.video;
    if (fullscreenElement()) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      return;
    }
    /* an iPhone only lets the video itself go full screen (with Apple's own controls) */
    if (v && v.webkitEnterFullscreen && /iPhone|iPod/.test(navigator.userAgent)) { v.webkitEnterFullscreen(); return; }
    if (st.requestFullscreen) { st.requestFullscreen().catch(function () { if (v && v.webkitEnterFullscreen) v.webkitEnterFullscreen(); }); }
    else if (st.webkitRequestFullscreen) st.webkitRequestFullscreen();
    else if (v && v.webkitEnterFullscreen) v.webkitEnterFullscreen();
  };

  /* ---------- a YouTube video: its picture first, YouTube's player on the first press ---------- */
  Player.prototype.setupYouTube = function () {
    var p = this;
    var facade = p.screen.querySelector('.tv-facade');
    var thumb = facade && facade.querySelector('img');
    if (p.fig.classList.contains('is-portrait')) p.setRatio(9, 16); else p.setRatio(16, 9);
    p.setState('is-ready', true);
    if (thumb) {
      /* the big picture when YouTube has one, its standard one otherwise */
      var hq = thumb.getAttribute('src');
      var better = hq.replace(/\/hqdefault\.jpg$/, '/maxresdefault.jpg');
      if (better !== hq) {
        var probe = new Image();
        probe.onload = function () { if (probe.naturalWidth > 200) thumb.src = better; };
        probe.src = better;
      }
    }
    function start(e) {
      if (e) e.preventDefault();
      if (p.iframe) return;
      pauseOthers(p);
      var f = document.createElement('iframe');
      var origin = /^https?:/.test(location.protocol) ? '&origin=' + encodeURIComponent(location.origin) : '';
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(p.ytId) +
        '?autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1' + origin;
      f.title = TEXT.youtube;
      f.className = 'tv-media tv-iframe';
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen');
      f.setAttribute('allowfullscreen', '');
      f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      f.addEventListener('load', function () {
        /* ask YouTube to tell us when the video plays, pauses or ends (for the corner box);
           asked a few times, because its player takes a moment to start listening */
        [0, 500, 1500, 3500].forEach(function (ms) {
          setTimeout(function () { if (!p.ytHeard) p.ytCommand(null); }, ms);
        });
      });
      p.iframe = f;
      p.screen.insertBefore(f, p.screen.firstChild);
      if (facade) facade.remove();
      p.started = true;
      p.dismissed = false;
      p.ytState = -1;
      p.setState('is-started', true);
      p.setState('is-playing', true);
      p.setState('is-live-yt', true);
      p.updateDock();
      try { f.focus(); } catch (er) { /* fine */ }
    }
    if (facade) {
      facade.setAttribute('tabindex', '-1');        /* the gold button is the one to tab to */
      facade.addEventListener('click', start);
    }
    p.big.addEventListener('click', start);
    p.toggle = start;
  };

  Player.prototype.ytCommand = function (func) {
    if (!this.iframe || !this.iframe.contentWindow) return;
    var msg = func
      ? { event: 'command', func: func, args: [] }
      : { event: 'listening', id: this.ytId, channel: 'widget' };
    try { this.iframe.contentWindow.postMessage(JSON.stringify(msg), '*'); } catch (e) { /* the player is gone */ }
  };

  window.addEventListener('message', function (e) {
    if (!/^https:\/\/www\.youtube(-nocookie)?\.com$/.test(e.origin)) return;
    var data;
    try { data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch (er) { return; }
    if (!data || !data.event) return;
    var state = null;
    if (data.event === 'onStateChange' && typeof data.info === 'number') state = data.info;
    else if (data.event === 'infoDelivery' && data.info && typeof data.info.playerState === 'number') state = data.info.playerState;
    if (state === null) return;
    players.forEach(function (p) {
      if (!p.iframe || p.iframe.contentWindow !== e.source) return;
      p.ytHeard = true;
      if (p.ytState === state) return;
      p.ytState = state;
      if (state === 1) { p.dismissed = false; pauseOthers(p); }
      p.setState('is-playing', state === 1 || state === 3);
      if (state === 0 && p.docked) { p.dismissed = true; p.undock(); }
      p.updateDock();
    });
  });

  /* ---------- la cajita: keep watching in the corner ---------- */
  /* It goes to the corner once the player is completely off the screen, and comes back once at least
     half of its spot is on the screen again (the gap in between stops it from jumping back and forth). */
  Player.prototype.updateDock = function () {
    var p = this;
    if (fullscreenElement()) return;          /* full screen empties the spot for a moment: not a reason to move */
    if (p.docked) {
      if (p.fig && p.ratio >= 0.5) p.undock();
      return;
    }
    if (p.fig && !p.visible && !p.dismissed && p.isPlaying()) p.dock();
  };

  Player.prototype.dock = function () {
    var p = this;
    players.forEach(function (o) { if (o !== p && o.docked) { o.pause(); o.undock(); if (!o.fig) o.destroy(); } });
    if (p.fig && p.hold) {
      p.hold.hidden = false;                  /* same shape as the video (CSS), so turning the phone is fine */
      p.fig.classList.add('is-holding');
    }
    p.docked = true;
    p.stage.classList.add('is-docked');
    p.wake();
  };

  Player.prototype.undock = function () {
    var p = this;
    if (!p.docked) return;
    p.docked = false;
    p.stage.classList.remove('is-docked');
    if (p.hold) p.hold.hidden = true;
    if (p.fig) p.fig.classList.remove('is-holding');
  };

  Player.prototype.goBack = function () {
    var p = this;
    if (p.fig && document.documentElement.contains(p.fig)) {
      p.fig.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    } else if (p.storyId) {
      p.returnUntil = Date.now() + 2000;
      location.hash = encodeURIComponent(p.storyId);   /* the story re-opens and takes its video back */
    }
  };

  Player.prototype.destroy = function () {
    var p = this;
    p.pause();
    if (p.stage && p.stage.parentNode && !p.fig) p.stage.parentNode.removeChild(p.stage);
    if (orphan === p) orphan = null;
    players = players.filter(function (o) { return o !== p; });
  };

  /* a new copy of the same story's video takes over the one still playing in the corner */
  Player.prototype.adopt = function (fig) {
    var p = this;
    var fresh = fig.querySelector('.tv-stage');
    if (fresh) fresh.parentNode.replaceChild(p.stage, fresh);
    else fig.insertBefore(p.stage, fig.firstChild);
    p.fig = fig;
    orphan = null;
    var ar = p.stage.style.getPropertyValue('--tv-ar');
    if (ar) {
      fig.style.setProperty('--tv-ar', ar);
      fig.style.setProperty('--tv-r', p.stage.style.getPropertyValue('--tv-r'));
      fig.classList.toggle('is-portrait', p.stage.classList.contains('is-portrait'));
    }
    buildFrame(p, fig);
    fig.setAttribute('data-tv-ready', '1');
    if (p.docked) {
      p.hold.hidden = false;
      fig.classList.add('is-holding');
    }
    dockWatch.observe(fig);
    /* "volver al video" from another story: once that story is open again, go straight to the video */
    if (p.returnUntil && Date.now() < p.returnUntil) {
      (window.requestAnimationFrame || setTimeout)(function () {
        if (p.fig === fig) fig.scrollIntoView({ block: 'center' });
      });
    }
  };

  var dockWatch = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          players.forEach(function (p) {
            if (p.fig !== en.target) return;
            p.visible = en.isIntersecting;
            /* how much of it shows, next to how much of it COULD show (a tall video on a short screen never shows whole) */
            var most = Math.min(en.boundingClientRect.height, en.rootBounds ? en.rootBounds.height : window.innerHeight) || 1;
            p.ratio = en.isIntersecting ? en.intersectionRect.height / most : 0;
            p.updateDock();
          });
        });
      }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], rootMargin: '-64px 0px 0px 0px' })
    : { observe: function () {}, unobserve: function () {} };

  /* one video at a time: the others pause, and one waiting in the corner closes */
  function pauseOthers(except) {
    players.slice().forEach(function (o) {
      if (o === except) return;
      o.pause();
      if (o.docked && except) { o.dismissed = true; o.undock(); if (!o.fig) o.destroy(); }
    });
  }

  document.addEventListener('fullscreenchange', syncFullscreen);
  document.addEventListener('webkitfullscreenchange', syncFullscreen);
  function syncFullscreen() {
    var fs = fullscreenElement();
    players.forEach(function (p) {
      if (!p.fsBtn) return;
      var on = fs === p.stage;
      p.fsBtn.innerHTML = on ? ICON.unfull : ICON.full;
      p.fsBtn.setAttribute('aria-label', on ? TEXT.exitFull : TEXT.full);
      p.fsBtn.title = on ? TEXT.exitFull : TEXT.full;
      p.setState('is-full', on);
    });
  }

  /* ---------- finding the players on the page ---------- */
  function scan() {
    var found = document.querySelectorAll('figure.tv:not([data-tv-ready])');
    Array.prototype.forEach.call(found, function (fig) {
      if (!fig.querySelector('.tv-stage') || !fig.querySelector('.tv-screen')) return;
      if (orphan && fig.getAttribute('data-tv') !== 'youtube') {
        var v = fig.querySelector('video');
        var src = v ? (v.getAttribute('src') || '').split('#')[0] : '';
        if (src && src === orphan.src) { orphan.adopt(fig); return; }
      }
      new Player(fig);
    });
    /* players whose story was closed (and that are not playing in the corner) are let go */
    players = players.filter(function (p) {
      if (p.fig && !document.documentElement.contains(p.fig) && p !== orphan) {
        dockWatch.unobserve(p.fig);
        return false;
      }
      return true;
    });
  }

  /* Called by assets/app.js just before it swaps the story on the news page: an uploaded video that is
     playing in the corner moves out of the story, so it keeps playing while you read the next one. */
  function beforeRender(container) {
    players.forEach(function (p) {
      if (!p.fig || !container.contains(p.fig)) return;
      dockWatch.unobserve(p.fig);
      if (p.kind === 'file' && p.docked && p.isPlaying()) {
        if (orphan && orphan !== p) orphan.destroy();
        document.body.appendChild(p.stage);       /* moved in one go, so the video does not stop */
        p.fig = null;
        orphan = p;
      } else {
        p.pause();
      }
    });
    players = players.filter(function (p) { return !p.fig || !container.contains(p.fig); });
  }

  var queued = false;
  new MutationObserver(function () {
    if (queued) return;
    queued = true;
    (window.requestAnimationFrame || setTimeout)(function () { queued = false; scan(); });
  }).observe(document.body, { childList: true, subtree: true });
  scan();

  window.LPBSA_TV = { scan: scan, beforeRender: beforeRender, pauseAll: function () { pauseOthers(null); } };
})();
