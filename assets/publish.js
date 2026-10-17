/* ============================================================
   PUBLISH  --  lets the private tools save straight to the site from
   any device, phone included. Part of the commissioner console
   (consola.html); setup steps are in README.md, "The console".

   HOW IT WORKS
   Your GitHub key (made once on github.com, allowed to change files in
   the LPBLSA repository only) is kept in this browser. With it:
     - each tool opens with the newest copy of its file straight from
       GitHub, never an old copy of the site;
     - its Publish button saves the file to GitHub - the same as a
       commit + push from your computer, so the site updates in about a
       minute and the email / phone alerts go out as they always do;
     - Publish refuses if the file changed on GitHub after the page
       opened (published from your computer, say), so the phone can never
       undo a newer change;
     - the News writer can upload photos and videos from the phone.
   Without the key (on your computer, opening the files from your folder)
   every tool works exactly as before: Download, then push.

   ALSO HERE: LPBSA_DRAFTS - the unsaved changes each tool keeps in this
   browser. A draft is only loaded on the same version of the file it was
   made on; an older one is offered, never loaded by itself.
   ============================================================ */
(function () {
  'use strict';

  var CONFIG = {
    owner: 'officialdetatch',      /* github.com/officialdetatch/LPBLSA */
    repo: 'LPBLSA',
    branch: 'main',
    api: 'https://api.github.com',
    commitPrefix: 'Consola: ',     /* every commit made from here starts with this */
    maxUploadMB: 25,               /* bigger videos: YouTube */
    photoMaxSide: 1600             /* uploaded photos are resized to this many pixels, long side */
  };
  var TOKEN_KEY = 'lpblsa.console.token';
  var LOG_KEY = 'lpblsa.console.log';

  /* ---------------- small helpers ---------------- */
  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function lsDel(k) { try { window.localStorage.removeItem(k); } catch (e) { /* private mode */ } }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function root() { return (document.body && document.body.getAttribute('data-root')) || ''; }

  function token() { return (lsGet(TOKEN_KEY) || '').trim(); }

  /* text <-> base64 (GitHub sends and takes file contents as base64) */
  function bytesToB64(bytes) {
    var s = '', CH = 0x8000;
    for (var i = 0; i < bytes.length; i += CH) s += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
    return window.btoa(s);
  }
  function utf8ToB64(text) { return bytesToB64(new TextEncoder().encode(text)); }
  function b64ToUtf8(b64) {
    var bin = window.atob(String(b64 || '').replace(/\s+/g, ''));
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }
  function blobToB64(blob) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { resolve(String(r.result).replace(/^data:[^,]*,/, '')); };
      r.onerror = function () { reject(new Error('Could not read that file.')); };
      r.readAsDataURL(blob);
    });
  }

  /* Two versions of a data file say the same thing when they only differ in the comment at the top
     or in spaces at the ends of lines (a hand-edited file and the tool's own copy of it). */
  function sameData(a, b) {
    function core(t) { return String(t == null ? '' : t).replace(/^\s*\/\*[\s\S]*?\*\//, '').replace(/[ \t]+$/gm, '').trim(); }
    return core(a) === core(b);
  }

  /* a short fingerprint of a value, to tell two versions of a file apart */
  function fp(x) {
    var s;
    try { s = typeof x === 'string' ? x : JSON.stringify(x); } catch (e) { s = String(x); }
    s = s == null ? '' : s;
    var h = 2166136261 >>> 0;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return s.length.toString(36) + '.' + h.toString(36);
  }

  /* ---------------- GitHub ---------------- */
  function friendly(status, body, headers) {
    var msg = (body && body.message) || '';
    if (status === 0) return 'No connection to GitHub. Check your internet and try again.';
    if (status === 401) return 'GitHub did not accept your key (it expired or was deleted). Open the Consola and paste a new one.';
    if (status === 403 && headers && headers.get && headers.get('x-ratelimit-remaining') === '0') {
      return 'GitHub says too many requests for now. Wait a few minutes and try again.';
    }
    if (status === 403) return 'Your key is not allowed to change files in LPBLSA. On GitHub, give it "Contents: Read and write" for the LPBLSA repository.';
    if (status === 404) return 'GitHub could not find that with your key. Make sure the key has access to the LPBLSA repository.';
    if (status === 409) return 'This file changed on GitHub after you opened this page (published from another device?). Reload the page and make your change again - nothing was published.';
    if (status === 422) return 'GitHub refused the change' + (msg ? ': ' + msg : '.') ;
    if (status >= 500) return 'GitHub is having trouble right now. Try again in a minute.';
    return 'GitHub answered with an error (' + status + (msg ? ': ' + msg : '') + ').';
  }
  function api(method, path, body) {
    var t = token();
    var headers = { 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
    if (t) headers.Authorization = 'Bearer ' + t;
    if (body) headers['Content-Type'] = 'application/json';
    return window.fetch(CONFIG.api + path, {
      method: method, headers: headers, cache: 'no-store',
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) {
      return r.text().then(function (txt) {
        var json = null;
        try { json = txt ? JSON.parse(txt) : null; } catch (e) { json = null; }
        if (!r.ok) {
          var err = new Error(friendly(r.status, json, r.headers));
          err.status = r.status;
          throw err;
        }
        return json;
      });
    }, function () {
      var err = new Error(friendly(0));
      err.status = 0;
      throw err;
    });
  }
  function repoPath() { return '/repos/' + CONFIG.owner + '/' + CONFIG.repo; }
  function contentsPath(file) {
    return repoPath() + '/contents/' + String(file).split('/').map(encodeURIComponent).join('/');
  }
  /* the newest copy of one file on GitHub: { sha, text } */
  function getFile(file) {
    return api('GET', contentsPath(file) + '?ref=' + encodeURIComponent(CONFIG.branch)).then(function (j) {
      if (!j || j.type !== 'file') throw new Error(file + ' is not a file on GitHub.');
      if (j.content && j.encoding === 'base64') return { sha: j.sha, text: b64ToUtf8(j.content) };
      /* files over 1 MB come without their contents: read them by their id */
      return api('GET', repoPath() + '/git/blobs/' + j.sha).then(function (b) {
        return { sha: j.sha, text: b64ToUtf8(b.content) };
      });
    });
  }
  /* saves one file as one commit. sha = the version it replaces (left out for a new file) */
  function putFile(file, b64, sha, message) {
    var body = { message: CONFIG.commitPrefix + message, content: b64, branch: CONFIG.branch };
    if (sha) body.sha = sha;
    return api('PUT', contentsPath(file), body);
  }

  /* what this device published lately (the Consola shows it) */
  function logPublish(entry) {
    var list = [];
    try { list = JSON.parse(lsGet(LOG_KEY) || '[]') || []; } catch (e) { list = []; }
    list.unshift(entry);
    lsSet(LOG_KEY, JSON.stringify(list.slice(0, 20)));
  }

  /* ---------------- drafts ---------------- */
  var bases = {};
  function staleKey(key) { return key + '.older'; }
  function insertNote(html, beforeId) {
    var el = document.createElement('div');
    el.className = 'writer-note pub-note';
    el.innerHTML = html;
    var anchor = beforeId && document.getElementById(beforeId);
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(el, anchor);
    else {
      var wrap = document.querySelector('main .section .wrap') || document.querySelector('main') || document.body;
      wrap.insertBefore(el, wrap.firstChild);
    }
    return el;
  }
  function offerOlder(key, beforeId) {
    var note = insertNote(
      '<b>Older unsaved changes.</b> This browser has changes to this file that were never published, made on an ' +
      'older version of it (the file has changed since, maybe from your computer). They were not loaded, so nothing ' +
      'newer gets undone. Loading them puts that older version back, plus those changes.' +
      '<div class="news-edit-row" style="margin-top:10px">' +
        '<button type="button" class="btn btn-small" data-pub-older="load">Load them anyway</button>' +
        '<button type="button" class="btn btn-ghost btn-small" data-pub-older="drop">Throw them away</button>' +
      '</div>', beforeId);
    note.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-pub-older]');
      if (!b) return;
      var older = lsGet(staleKey(key));
      lsDel(staleKey(key));
      if (b.getAttribute('data-pub-older') === 'load' && older) {
        var data = null;
        try { data = JSON.parse(older); } catch (err) { data = null; }
        lsSet(key, JSON.stringify({ lpblsaDraft: 2, base: bases[key], dirty: true, data: data }));
        window.location.reload();
        return;
      }
      note.remove();
    });
  }
  window.LPBSA_DRAFTS = {
    /* The tool's unsaved changes - only when they were made on this same version of the
       file (live = what the file holds right now, as the tool reads it). */
    load: function (key, live, noteId) {
      bases[key] = fp(live);
      var out = null, raw = lsGet(key);
      if (raw) {
        var d = null;
        try { d = JSON.parse(raw); } catch (e) { d = null; }
        if (d && d.lpblsaDraft === 2) {
          if (d.base === bases[key]) out = d.data;
          else {
            if (d.dirty) lsSet(staleKey(key), JSON.stringify(d.data));
            lsDel(key);
          }
        } else if (d !== null) {
          /* a draft saved before the console existed: same as the file, or set aside */
          if (fp(d) === bases[key]) out = d;
          else lsSet(staleKey(key), JSON.stringify(d));
          lsDel(key);
        }
      }
      if (lsGet(staleKey(key))) offerOlder(key, noteId);
      return out;
    },
    save: function (key, data) {
      var base = bases[key];
      lsSet(key, JSON.stringify({ lpblsaDraft: 2, base: base, dirty: fp(data) !== base, data: data }));
    },
    clear: function (key) { lsDel(key); },
    /* after a publish: the file now holds exactly this */
    published: function (key, data) { bases[key] = fp(data); lsDel(key); }
  };

  /* ---------------- the tool pages ---------------- */
  var S = {
    file: '',          /* the file this page publishes, from the root of the repo */
    name: '',          /* its name, for messages */
    sha: '',           /* the version on GitHub it was loaded from */
    text: null,        /* that version's text */
    fresh: false,      /* true = loaded from GitHub, so Publish is safe */
    error: null,
    tool: null,        /* what attach() was given */
    busy: false,       /* publishing right now */
    uploading: false,  /* a photo or video is on its way: Publish waits for it */
    conflict: ''       /* the file changed on GitHub since this page opened: Reload, no Publish */
  };

  function loadScripts(list, done) {
    var i = 0;
    (function next() {
      if (i >= list.length) { if (done) done(); return; }
      var s = document.createElement('script');
      s.src = list[i++];
      s.onload = next;
      s.onerror = next;
      document.body.appendChild(s);
    })();
  }

  /* Called by each tool page in place of its own <script> tag:
       LPBSA_PUBLISH.boot({ file: 'assets/news.js', scripts: ['assets/writer.js'] })
     file    = the file the tool writes, from the root of the repo
     scripts = the tool's own script(s), as the page refers to them */
  function boot(opts) {
    S.file = opts.file;
    S.name = String(opts.file).split('/').pop();
    if (!token()) { loadScripts(opts.scripts); return; }
    document.body.classList.add('pub-on');
    collapseHelp();
    drawBar();
    setStatus('wait', 'Getting the newest ' + S.name + ' from GitHub…');
    getFile(opts.file).then(function (f) {
      try {
        (0, eval)(f.text);                                 /* the newest copy replaces the site's */
      } catch (e) {
        S.error = new Error(S.name + ' on GitHub has a mistake in it (' + e.message + ').');
        return;
      }
      if (window.LPBSA_applyLeague) window.LPBSA_applyLeague();
      S.sha = f.sha;
      S.text = f.text;
      S.fresh = true;
    }, function (err) {
      S.error = err;
    }).then(function () {
      loadScripts(opts.scripts, refresh);
    });
  }

  /* Called by each tool at the end of its script:
       build   () -> the whole file, as Download would save it
       after   () -> runs after a successful publish (the tool forgets its draft there)
       before  () -> optional; return false to stop (e.g. a story still in the form)
       pending () -> optional; a short note when there is work not in the file yet (a story typed in
                     the form but not added): Publish lights up and before() takes care of it
       message () -> optional; a few words for the commit, e.g. the story's headline */
  function attach(tool) {
    S.tool = tool;
    if (!token()) return;
    drawBar();
    refresh();
  }

  /* ---------------- the bar at the bottom ---------------- */
  var bar, barStatus, barBtn;
  function drawBar() {
    if (bar) return;
    bar = document.createElement('div');
    bar.className = 'pub-bar';
    bar.innerHTML =
      '<a class="pub-back" href="' + esc(root() + 'consola.html') + '" aria-label="Back to the Consola">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<span>Consola</span></a>' +
      '<p class="pub-status" role="status" aria-live="polite"><span class="pub-dot"></span><span class="pub-text"></span></p>' +
      '<button type="button" class="btn btn-solid pub-go" disabled>Publish</button>';
    document.body.appendChild(bar);
    document.body.classList.add('pub-has-bar');
    barStatus = bar.querySelector('.pub-status');
    barBtn = bar.querySelector('.pub-go');
    barBtn.addEventListener('click', publish);
    /* any edit in the tool may change the file: look again right after it */
    ['click', 'change', 'input', 'keyup'].forEach(function (ev) {
      document.addEventListener(ev, function (e) {
        if (bar.contains(e.target)) return;
        clearTimeout(drawBar.t);
        drawBar.t = setTimeout(refresh, 120);
      }, true);
    });
  }
  function setStatus(kind, text) {
    if (!bar) return;
    barStatus.setAttribute('data-kind', kind);
    barStatus.querySelector('.pub-text').textContent = text;
  }
  var lastDone = '';
  function refresh() {
    if (!bar || S.busy) return;
    if (!S.tool || S.uploading) { barBtn.disabled = true; return; }
    if (S.conflict) { barBtn.disabled = true; setStatus('bad', S.conflict); return; }
    if (!S.fresh) {
      barBtn.disabled = true;
      setStatus('bad', (S.error ? S.error.message : 'Could not read GitHub.') + ' Showing the site\'s copy; Publish is off.');
      return;
    }
    var text, pending = '';
    try { text = S.tool.build(); } catch (e) { text = null; }
    try { pending = S.tool.pending ? String(S.tool.pending() || '') : ''; } catch (e) { pending = ''; }
    var changed = text !== null && !sameData(text, S.text);
    barBtn.disabled = !changed && !pending;
    if (pending) setStatus('edit', pending);
    else if (changed) setStatus('edit', 'Unpublished changes');
    else if (lastDone) setStatus('ok', lastDone);
    else setStatus('ok', 'Up to date with the site');
  }

  function publish() {
    if (S.busy || !S.fresh || !S.tool) return;
    /* a box still being typed in saves itself when it loses focus - let that happen first */
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    setTimeout(function () {
      if (S.tool.before && S.tool.before() === false) return;
      var text = S.tool.build();
      if (sameData(text, S.text)) { refresh(); toastMsg('Nothing new to publish.'); return; }
      if (!window.confirm('Publish ' + S.name + ' to lpblsa.vip now?')) return;
      var words = '';
      try { words = S.tool.message ? String(S.tool.message() || '') : ''; } catch (e) { words = ''; }
      S.busy = true;
      barBtn.disabled = true;
      setStatus('wait', 'Publishing…');
      putFile(S.file, utf8ToB64(text), S.sha, S.name + (words ? ' - ' + words.slice(0, 80) : '')).then(function (res) {
        S.sha = res && res.content ? res.content.sha : S.sha;
        S.text = text;
        S.busy = false;
        var when = new Date();
        lastDone = 'Published ' + when.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) + ' - live in about a minute';
        logPublish({ file: S.file, when: when.toISOString(), words: words, url: res && res.commit ? res.commit.html_url : '' });
        try { if (S.tool.after) S.tool.after(); } catch (e) { /* the file is published either way */ }
        refresh();
        toastMsg('Published. The site updates in about a minute.');
      }, function (err) {
        S.busy = false;
        refresh();
        setStatus('bad', err.message);
        barBtn.disabled = err.status === 409;     /* a changed file needs a reload, not a retry */
        if (err.status === 409) { S.conflict = err.message; addReload(); }
        toastMsg(err.message, true);
      });
    }, 30);
  }
  function addReload() {
    if (bar.querySelector('.pub-reload')) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn btn-small pub-reload';
    b.textContent = 'Reload';
    b.addEventListener('click', function () { window.location.reload(); });
    bar.insertBefore(b, barBtn);
    barBtn.classList.add('hidden');
  }
  function toastMsg(msg, bad) {
    var t = document.createElement('div');
    t.className = 'toast' + (bad ? ' err' : '');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('hide'); }, bad ? 5200 : 2600);
    setTimeout(function () { t.remove(); }, bad ? 5600 : 3000);
  }

  /* On a phone the long "how this works" box comes first on every tool: fold it away. */
  function collapseHelp() {
    var note = document.querySelector('main .writer-note:not([id])');
    if (!note || note.closest('details')) return;
    var d = document.createElement('details');
    d.className = 'pub-help';
    d.innerHTML = '<summary>How this tool works</summary>';
    note.parentNode.insertBefore(d, note);
    d.appendChild(note);
  }

  /* ---------------- photos and videos from the phone ---------------- */
  function slug(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  function extOf(file) {
    var m = /\.([a-z0-9]{2,5})$/i.exec(file.name || '');
    if (m) return m[1].toLowerCase();
    var t = (file.type || '').split('/')[1] || 'bin';
    return t === 'jpeg' ? 'jpg' : t === 'quicktime' ? 'mov' : t;
  }
  /* photos: turned the right way up, at most 1600 px on the long side, as JPG */
  function shrinkPhoto(file) {
    return new Promise(function (resolve, reject) {
      var keepable = /^image\/(jpeg|png|webp)$/.test(file.type);
      if (/^image\/(gif|svg\+xml)$/.test(file.type) || (keepable && file.size < 350 * 1024)) {
        resolve({ blob: file, ext: extOf(file) });
        return;
      }
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        var w = img.naturalWidth, h = img.naturalHeight;
        var k = Math.min(1, CONFIG.photoMaxSide / Math.max(w, h));
        var c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(w * k));
        c.height = Math.max(1, Math.round(h * k));
        var g = c.getContext('2d');
        g.fillStyle = '#060c1c';                       /* the site's background, behind any see-through part */
        g.fillRect(0, 0, c.width, c.height);
        g.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob(function (b) {
          if (!b) { reject(new Error('Could not read that photo.')); return; }
          if (keepable && file.size <= b.size) resolve({ blob: file, ext: extOf(file) });
          else resolve({ blob: b, ext: 'jpg' });
        }, 'image/jpeg', 0.84);
      };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error('This browser cannot open that photo. Try a JPG or PNG.'));
      };
      img.src = url;
    });
  }
  /* opens the phone's photo picker; resolves with the chosen file. Call it straight from a tap. */
  function pick(kind) {
    return new Promise(function (resolve) {
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = kind === 'video' ? 'video/mp4,video/quicktime,video/webm,video/*' : 'image/*';
      input.style.cssText = 'position:fixed;left:-9999px;opacity:0;';
      input.addEventListener('change', function () {
        var f = input.files && input.files[0];
        input.remove();
        if (f) resolve(f);
      });
      document.body.appendChild(input);
      input.click();
    });
  }
  /* uploads a photo or video into the repo right away (its own commit) and resolves with its
     path from the root of the site, e.g. "images/news/2026-10-20-mugiwaras-k3f9.jpg" */
  function upload(file, opts) {
    opts = opts || {};
    var isVideo = /^video\//.test(file.type) || /\.(mp4|mov|m4v|webm)$/i.test(file.name || '');
    var folder = (opts.folder || 'images/news/').replace(/^\/+/, '').replace(/\/?$/, '/');
    var ready = isVideo ? Promise.resolve({ blob: file, ext: extOf(file) }) : shrinkPhoto(file);
    return ready.then(function (r) {
      var mb = r.blob.size / 1048576;
      if (mb > CONFIG.maxUploadMB) {
        throw new Error('That ' + (isVideo ? 'video' : 'photo') + ' is ' + mb.toFixed(0) + ' MB; the limit here is ' +
          CONFIG.maxUploadMB + ' MB. ' + (isVideo ? 'Trim it, or put it on YouTube and use a YouTube block.' : ''));
      }
      S.uploading = true;
      if (barBtn) barBtn.disabled = true;
      setStatus('wait', 'Uploading the ' + (isVideo ? 'video' : 'photo') + ' (' + Math.max(0.1, mb).toFixed(1) + ' MB)…');
      return blobToB64(r.blob).then(function (b64) {
        var day = new Date().toISOString().slice(0, 10);
        var base = slug(opts.hint).slice(0, 40) || (isVideo ? 'video' : 'foto');
        var path = folder + day + '-' + base + '-' + Math.random().toString(36).slice(2, 6) + '.' + r.ext;
        return putFile(path, b64, null, 'upload ' + path).then(function () {
          S.uploading = false;
          refresh();
          return path;
        });
      });
    }).then(null, function (err) {
      S.uploading = false;
      refresh();
      throw err;
    });
  }

  window.LPBSA_PUBLISH = {
    CONFIG: CONFIG,
    TOKEN_KEY: TOKEN_KEY,
    LOG_KEY: LOG_KEY,
    boot: boot,
    attach: attach,
    pick: pick,
    upload: upload,
    canUpload: function () { return !!token(); },
    token: token,
    setToken: function (t) { return lsSet(TOKEN_KEY, String(t || '').trim()); },
    clearToken: function () { lsDel(TOKEN_KEY); },
    api: api,
    repoPath: repoPath,
    contentsPath: contentsPath,
    getFile: getFile,
    putFile: putFile,
    utf8ToB64: utf8ToB64,
    toast: toastMsg
  };
})();
