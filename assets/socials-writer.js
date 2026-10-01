/* ============================================================
   SOCIALS WRITER  --  private tool, not linked from the public site.
   Loads the posts currently in assets/socials-data.js, lets you paste the link
   of a Threads, X.com, Instagram or TikTok post, reorder or remove posts, and
   shows a live preview of the Socials section. Then it hands you a finished
   socials-data.js to save over the old one. Nothing here touches the live
   site until you replace that file yourself.

   Needs  assets/socials-view.js  (it checks the links and draws the preview).
   ============================================================ */
(function () {
  'use strict';

  var DRAFT_KEY = 'lpbsa.socials.draft.v1';
  var SHOW_CHOICES = [3, 4, 6, 8, 9, 12, 0];            /* 0 = every post */

  var S = window.LPBSA_Socials;
  var posts = [];                                       /* newest first: [{ platform, url }] */
  var show = S ? S.defaultShow : 6;

  var els = {
    platform: document.getElementById('swPlatform'),
    url: document.getElementById('swUrl'),
    add: document.getElementById('swAdd'),
    hint: document.getElementById('swHint'),
    show: document.getElementById('swShow'),
    list: document.getElementById('swList'),
    preview: document.getElementById('socialsPreview'),
    output: document.getElementById('wOutput'),
    draftNote: document.getElementById('swDraftNote')
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function toast(msg, bad) {
    var t = document.createElement('div');
    t.className = 'toast' + (bad ? ' err' : '');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('hide'); }, 2400);
    setTimeout(function () { t.remove(); }, 2800);
  }

  if (!S) {
    els.list.innerHTML = '<p class="section-note">assets/socials-view.js is missing, so links cannot be checked. ' +
      'Put it in the assets/ folder and reload this page.</p>';
    return;
  }

  /* ---------- the draft, kept in this browser until you save the file ---------- */
  function loadDraft() {
    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) { /* ignore */ }
    return null;
  }
  function saveDraft() {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ show: show, posts: posts })); } catch (err) { /* ignore */ }
  }

  /* Whatever is handed in (the data file, the draft) comes out as clean posts: every link re-read, bad
     ones dropped, the same post only once. */
  function clean(list) {
    var out = [], seen = {};
    (Array.isArray(list) ? list : []).forEach(function (p) {
      var r = S.parse(p && p.url);
      if (r.ok && !seen[r.url]) { seen[r.url] = 1; out.push({ platform: r.platform, url: r.url }); }
    });
    return out;
  }
  function cleanShow(v) {
    v = Math.floor(Number(v));
    return v >= 0 ? v : S.defaultShow;               /* 0 = every post */
  }
  function snapshot(p, s) { return JSON.stringify({ show: s, posts: p }); }

  function start() {
    var cfg = S.readConfig();
    var live = { show: cleanShow(cfg.show), posts: clean(cfg.posts) };
    var draft = loadDraft();
    if (draft && Array.isArray(draft.posts) &&
        snapshot(clean(draft.posts), cleanShow(draft.show)) !== snapshot(live.posts, live.show)) {
      posts = clean(draft.posts);
      show = cleanShow(draft.show);
      els.draftNote.classList.remove('hidden');
    } else {
      posts = live.posts;
      show = live.show;
    }
    fillShowChoices();
    fillPlatformChoices();
    render();
  }

  /* ---------- the form ---------- */
  function fillPlatformChoices() {
    els.platform.innerHTML = S.order.map(function (k) {
      return '<option value="' + k + '">' + esc(S.platforms[k].menu) + '</option>';
    }).join('');
  }
  function fillShowChoices() {
    var choices = SHOW_CHOICES.slice();
    if (choices.indexOf(show) === -1) choices.push(show);      /* a number typed by hand into the data file */
    els.show.innerHTML = choices.map(function (n) {
      return '<option value="' + n + '"' + (n === show ? ' selected' : '') + '>' + (n ? n + ' posts' : 'All of them') + '</option>';
    }).join('');
  }

  var IDLE_HINT = 'Paste the link of the post. The platform is picked for you from the link; change the drop-down only if it guessed wrong.';
  function setHint(text, tone) {
    els.hint.textContent = text;
    els.hint.className = 'sw-hint' + (tone ? ' ' + tone : '');
  }
  /* `follow` is true while a link is being typed or pasted: the drop-down then follows the link. When
     you change the drop-down yourself, it is left as you set it and the link is checked against it. */
  function checkLink(follow) {
    var raw = els.url.value;
    if (!raw.trim()) { setHint(IDLE_HINT); return null; }
    var found = S.detect(raw);
    if (follow === true && found && found !== els.platform.value) els.platform.value = found;
    var r = S.parse(raw, els.platform.value);
    if (r.ok) {
      setHint('✓ ' + S.platforms[r.platform].menu + ' ' + r.kind.toLowerCase() + ' — will be saved as ' + r.url, 'ok');
      return r;
    }
    setHint(r.error, 'bad');
    return null;
  }

  function addPost() {
    var raw = els.url.value;
    var r = S.parse(raw, els.platform.value);
    if (!r.ok) {
      setHint(r.error, 'bad');
      toast(r.error, true);
      return;
    }
    if (posts.some(function (p) { return p.url === r.url; })) {
      toast('That post is already in the list.', true);
      return;
    }
    posts.unshift({ platform: r.platform, url: r.url });
    els.url.value = '';
    setHint(IDLE_HINT);
    render();
    toast('Added to the top of the Socials.');
    els.url.focus();
  }

  els.url.addEventListener('input', function () { checkLink(true); });
  els.url.addEventListener('paste', function () { setTimeout(function () { checkLink(true); }, 0); });
  els.url.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') { ev.preventDefault(); addPost(); }
  });
  els.platform.addEventListener('change', function () { checkLink(false); });
  els.add.addEventListener('click', addPost);
  els.show.addEventListener('change', function () {
    show = cleanShow(els.show.value);
    render();
  });

  /* ---------- the list of posts ---------- */
  function rowHTML(p, i) {
    var r = S.parse(p.url);
    var over = show > 0 && i >= show;
    return '<div class="writer-row' + (over ? ' sw-over' : '') + '">' +
      '<div class="writer-row-main">' +
        '<div class="sw-meta"><span class="sw-chip">' + esc(S.platforms[p.platform].menu) + '</span>' +
          '<span class="section-note">' + esc(r.ok ? r.kind : '') +
          (i === 0 ? ' &middot; top of the Socials' : '') +
          (over ? ' &middot; <b>not on the home page</b> (only the first ' + show + ' show)' : '') + '</span></div>' +
        '<a class="sw-url" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' + esc(p.url) + '</a>' +
      '</div>' +
      '<div class="writer-row-actions">' +
        '<button type="button" class="btn btn-ghost btn-small" data-up="' + i + '" ' + (i === 0 ? 'disabled' : '') + '>&uarr;</button>' +
        '<button type="button" class="btn btn-ghost btn-small" data-down="' + i + '" ' + (i === posts.length - 1 ? 'disabled' : '') + '>&darr;</button>' +
        '<button type="button" class="btn btn-small btn-danger" data-del="' + i + '">Remove</button>' +
      '</div>' +
    '</div>';
  }

  els.list.addEventListener('click', function (ev) {
    var btn = ev.target.closest('button[data-up],button[data-down],button[data-del]');
    if (!btn || btn.disabled) return;
    var i;
    if ((i = btn.getAttribute('data-up')) !== null) {
      i = Number(i);
      if (i > 0) { posts.splice(i - 1, 0, posts.splice(i, 1)[0]); render(); }
      return;
    }
    if ((i = btn.getAttribute('data-down')) !== null) {
      i = Number(i);
      if (i < posts.length - 1) { posts.splice(i + 1, 0, posts.splice(i, 1)[0]); render(); }
      return;
    }
    if ((i = btn.getAttribute('data-del')) !== null) {
      if (!window.confirm('Remove this post from the Socials?')) return;
      posts.splice(Number(i), 1);
      render();
    }
  });

  /* ---------- the preview (the same code the home page uses) ---------- */
  var previewTimer = 0;
  function drawPreview() {
    if (!els.preview) return;
    if (!posts.length) {
      els.preview.className = '';
      els.preview.innerHTML = '<p class="section-note">No posts yet, so the home page will say &ldquo;A&uacute;n no hemos publicado en redes.&rdquo;</p>';
      return;
    }
    S.render(els.preview, posts, { limit: show, lazy: false });
  }

  function render() {
    els.list.innerHTML = posts.length
      ? posts.map(rowHTML).join('')
      : '<p class="section-note">No posts yet. Paste a link above.</p>';
    els.output.value = buildFile();
    saveDraft();
    clearTimeout(previewTimer);
    previewTimer = setTimeout(drawPreview, 250);   /* one redraw however fast you click */
  }

  /* ---------- the file ---------- */
  function buildFile() {
    var header = [
      '/* ============================================================',
      '   SOCIALS  --  the posts embedded in the Socials section of the home page.',
      '   Newest post goes FIRST in the list. "show" is how many appear on the home page',
      '   (0 means all of them).',
      '   Generated with socials-writer.html -- add and remove posts there.',
      '   ============================================================ */'
    ].join('\n');
    var lines = posts.map(function (p) {
      return '    { "platform": ' + JSON.stringify(p.platform) + ', "url": ' + JSON.stringify(p.url) + ' }';
    });
    return header + '\n' +
      'window.LPBSA_SOCIALS = {\n' +
      '  "show": ' + show + ',\n' +
      '  "posts": [\n' + lines.join(',\n') + (lines.length ? '\n' : '') + '  ]\n' +
      '};\n';
  }

  document.getElementById('swCopy').addEventListener('click', function () {
    var code = buildFile();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(
        function () { toast('Copied. Paste it over assets/socials-data.js'); },
        function () { els.output.select(); toast('Press Ctrl/Cmd + C to copy.'); }
      );
    } else {
      els.output.select();
      toast('Press Ctrl/Cmd + C to copy.');
    }
  });

  document.getElementById('swDownload').addEventListener('click', function () {
    var blob = new Blob([buildFile()], { type: 'text/javascript' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'socials-data.js';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast('Downloaded. Move it into assets/ replacing the old one.');
  });

  document.getElementById('swReset').addEventListener('click', function () {
    if (!window.confirm('Throw away your unsaved changes and reload the posts currently on the site?')) return;
    try { localStorage.removeItem(DRAFT_KEY); } catch (err) { /* ignore */ }
    var cfg = S.readConfig();
    posts = clean(cfg.posts);
    show = cleanShow(cfg.show);
    els.draftNote.classList.add('hidden');
    fillShowChoices();
    els.url.value = '';
    setHint(IDLE_HINT);
    render();
  });

  start();
  setHint(IDLE_HINT);
})();
