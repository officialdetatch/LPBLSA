/* ============================================================
   NEWS WRITER  --  private tool, not linked from the public site.
   Loads the current assets/news.js, lets you add, edit, reorder
   and delete stories (and the lines of the gold wire), then hands
   you a finished news.js to save over the old one. Nothing here
   touches the live site until you replace that file yourself - or,
   with the commissioner console set up on this device, press Publish
   (assets/publish.js).
   ============================================================ */
(function () {
  'use strict';

  var DRAFT_KEY = 'lpbsa.writer.draft.v2';     /* v2: the stories and the gold wire lines together */
  var list = [];
  var ticker = [];                              /* the gold wire lines, in order */
  var knownIds = [];                            /* story links already in the published file */
  var editingIndex = -1;

  /* Which fantasy the story in the form belongs to. Stays on whatever you
     picked last, so writing three basketball stories in a row is three
     clicks fewer. Stories with no league are football (the original). */
  var LEAGUES = ['all', 'football', 'basketball', 'baseball'];
  var LEAGUE_LABEL = { all: 'ALL', football: 'NFL', basketball: 'NBA', baseball: 'MLB' };
  var league = 'football';
  var leagueRow = document.getElementById('wLeague');
  function cleanLeague(v) { return LEAGUES.indexOf(v) !== -1 ? v : 'football'; }
  function setLeague(v) {
    league = cleanLeague(v);
    if (!leagueRow) return;
    Array.prototype.forEach.call(leagueRow.querySelectorAll('.chip'), function (c) {
      c.classList.toggle('active', c.getAttribute('data-league') === league);
    });
  }
  if (leagueRow) {
    leagueRow.addEventListener('click', function (ev) {
      var chip = ev.target.closest('.chip');
      if (chip) setLeague(chip.getAttribute('data-league'));
    });
  }
  var formBlocks = [];

  var f = {
    id: document.getElementById('wId'),
    date: document.getElementById('wDate'),
    headline: document.getElementById('wHeadline'),
    summary: document.getElementById('wSummary')
  };
  var storyList = document.getElementById('wList');
  var blocksEl = document.getElementById('wBlocks');
  var output = document.getElementById('wOutput');
  var formTitle = document.getElementById('wFormTitle');
  var tickerEl = document.getElementById('wTicker');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function slug(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  function toast(msg, bad) {
    var t = document.createElement('div');
    t.className = 'toast' + (bad ? ' err' : '');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('hide'); }, 2400);
    setTimeout(function () { t.remove(); }, 2800);
  }

  /* Unsaved work is kept in this browser (LPBSA_DRAFTS in assets/publish.js): only ever loaded
     on the same version of news.js it was made on, so an old draft never undoes a newer file. */
  function loadDraft(live) {
    if (window.LPBSA_DRAFTS) return window.LPBSA_DRAFTS.load(DRAFT_KEY, live, 'wDraftNote');
    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) { /* ignore */ }
    return null;
  }
  function saveDraft() {
    var data = { stories: list, ticker: ticker };
    if (window.LPBSA_DRAFTS) { window.LPBSA_DRAFTS.save(DRAFT_KEY, data); return; }
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } catch (err) { /* ignore */ }
  }
  /* a draft saved by the older writer (stories only) moves to the new key */
  function moveOldDraft(live) {
    try {
      var old = localStorage.getItem('lpbsa.writer.draft.v1');
      if (old === null) return;
      localStorage.removeItem('lpbsa.writer.draft.v1');
      var arr = JSON.parse(old);
      if (Array.isArray(arr) && localStorage.getItem(DRAFT_KEY) === null) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ stories: arr.map(normalise), ticker: live.ticker }));
      }
    } catch (err) { /* ignore */ }
  }
  function cleanTicker(arr) {
    return (Array.isArray(arr) ? arr : []).map(function (t) { return String(t == null ? '' : t); });
  }

  function cloneBlock(b) {
    if (b.type === 'image' || b.type === 'video' || b.type === 'youtube') {
      return { type: b.type, src: b.src || '', caption: b.caption || '' };
    }
    if (b.type === 'h') return { type: 'h', text: b.text || '' };
    return { type: 'p', text: b.text || '' };
  }
  /* Stories written before blocks existed only have a top image/video and
     a flat list of paragraphs. Used only to populate the edit form -
     the story in the list itself is left exactly as it was until saved. */
  function blocksFromLegacy(n) {
    var blocks = [];
    if (n.video) blocks.push({ type: 'video', src: n.video, caption: n.caption || '' });
    else if (n.image) blocks.push({ type: 'image', src: n.image, caption: n.caption || '' });
    (Array.isArray(n.body) ? n.body : (n.body ? [n.body] : [])).forEach(function (p) {
      blocks.push({ type: 'p', text: p });
    });
    return blocks;
  }

  function normalise(n, i) {
    var out = {
      id: n.id || slug(n.headline) || ('story-' + (i + 1)),
      league: cleanLeague(n.league),
      date: n.date || '',
      headline: n.headline || '',
      summary: n.summary || ''
    };
    if (Array.isArray(n.blocks) && n.blocks.length) {
      out.blocks = n.blocks.map(cloneBlock);
    } else {
      out.image = n.image || '';
      out.caption = n.caption || '';
      if (n.video) out.video = n.video;
      out.body = Array.isArray(n.body) ? n.body : (n.body ? [n.body] : []);
    }
    return out;
  }

  function liveData() {
    return { stories: (window.LEAGUE_NEWS || []).map(normalise), ticker: cleanTicker(window.LEAGUE_TICKER) };
  }
  function start() {
    var live = liveData();
    moveOldDraft(live);
    var draft = loadDraft(live);
    var mine = draft && Array.isArray(draft.stories)
      ? { stories: draft.stories.map(normalise), ticker: cleanTicker(draft.ticker) } : null;
    if (mine && JSON.stringify(mine) !== JSON.stringify(live)) {
      list = mine.stories;
      ticker = mine.ticker;
      document.getElementById('wDraftNote').classList.remove('hidden');
    } else {
      list = live.stories;
      ticker = live.ticker;
    }
    knownIds = live.stories.map(function (s) { return s.id; });
    renderFormBlocks();
    renderTicker();
    render();
  }

  function clearForm() {
    Object.keys(f).forEach(function (k) { f[k].value = ''; });
    formBlocks = [];
    renderFormBlocks();
    editingIndex = -1;
    formTitle.textContent = 'New story';
    document.getElementById('wSave').textContent = 'Add story';
  }

  function fillForm(i) {
    var n = list[i];
    f.id.value = n.id;
    setLeague(n.league);
    f.date.value = n.date;
    f.headline.value = n.headline;
    f.summary.value = n.summary;
    formBlocks = (Array.isArray(n.blocks) && n.blocks.length ? n.blocks.map(cloneBlock) : blocksFromLegacy(n));
    renderFormBlocks();
    editingIndex = i;
    formTitle.textContent = 'Editing: ' + n.headline;
    document.getElementById('wSave').textContent = 'Save changes';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- the block editor for the story currently in the form ---------- */
  function flashSaved(el) {
    el.classList.add('field-saved');
    setTimeout(function () { el.classList.remove('field-saved'); }, 700);
  }
  function focusLastBlockField(selector) {
    var els = blocksEl.querySelectorAll(selector);
    if (els.length) els[els.length - 1].focus();
  }
  function blockRowHTML(b, i) {
    var n = formBlocks.length;
    var actions = '<div class="writer-row-actions">' +
      '<button class="btn btn-ghost btn-small" data-up="' + i + '" ' + (i === 0 ? 'disabled' : '') + '>&uarr;</button>' +
      '<button class="btn btn-ghost btn-small" data-down="' + i + '" ' + (i === n - 1 ? 'disabled' : '') + '>&darr;</button>' +
      '<button class="btn btn-small btn-danger" data-del="' + i + '">Delete</button>' +
      '</div>';
    if (b.type === 'youtube') {
      var yt = window.LPBSA_youtubeInfo ? window.LPBSA_youtubeInfo(b.src) : null;
      var status = !b.src ? '' : yt
        ? '<span class="section-note" style="color:var(--gold-light)">&#10003; Video found' + (yt.short ? ' (a Short, shown tall)' : '') + '</span>'
        : '<span class="section-note" style="color:#ff8a8a">That does not look like a YouTube link. Copy it from YouTube\'s Share button or the address bar.</span>';
      return '<div class="writer-row">' +
        '<div class="writer-row-main">' +
          '<div class="writer-grid">' +
            '<div class="field" style="margin-bottom:0"><label>YouTube link</label>' +
              '<input type="text" class="block-input" data-field="src" data-idx="' + i + '" value="' + esc(b.src) + '" placeholder="https://www.youtube.com/watch?v=..."></div>' +
            '<div class="field" style="margin-bottom:0"><label>Caption (optional)</label>' +
              '<input type="text" class="block-input" data-field="caption" data-idx="' + i + '" value="' + esc(b.caption) + '" placeholder="Optional caption"></div>' +
          '</div>' + status +
        '</div>' + actions +
      '</div>';
    }
    if (b.type === 'image' || b.type === 'video') {
      var label = b.type === 'image' ? 'Image path' : 'Video path (.mp4)';
      var ph = b.type === 'image' ? 'images/news/week2.jpg' : 'images/news/week2.mp4';
      /* an iPhone .mov is usually HEVC: big, and some Android phones / Windows browsers cannot play it */
      var movNote = b.type === 'video' && /\.mov(\?|#|$)/i.test(b.src || '')
        ? '<span class="section-note" style="color:#ffcf7a">Heads up: an iPhone .mov is heavy and some phones and browsers cannot play it. ' +
          'If you can, export it as .mp4 (on iPhone: share it to yourself with "Most Compatible" on, or any video converter).</span>'
        : '';
      return '<div class="writer-row">' +
        '<div class="writer-row-main">' +
          '<div class="writer-grid">' +
            '<div class="field" style="margin-bottom:0"><label>' + label + '</label>' +
              '<input type="text" class="block-input" data-field="src" data-idx="' + i + '" value="' + esc(b.src) + '" placeholder="' + ph + '"></div>' +
            '<div class="field" style="margin-bottom:0"><label>Caption (optional)</label>' +
              '<input type="text" class="block-input" data-field="caption" data-idx="' + i + '" value="' + esc(b.caption) + '" placeholder="Optional caption"></div>' +
          '</div>' + movNote + uploadButtonHTML(b, i) +
        '</div>' + actions +
      '</div>';
    }
    if (b.type === 'h') {
      return '<div class="writer-row">' +
        '<div class="writer-row-main">' +
          '<div class="field" style="margin-bottom:0"><label>Subtitle</label>' +
            '<input type="text" class="block-input" data-field="text" data-idx="' + i + '" value="' + esc(b.text) + '" placeholder="A new section heading"></div>' +
        '</div>' + actions +
      '</div>';
    }
    return '<div class="writer-row">' +
      '<div class="writer-row-main">' +
        '<div class="field" style="margin-bottom:0"><label>Paragraph</label>' +
          '<textarea class="block-input" data-field="text" data-idx="' + i + '" rows="3" placeholder="Write a paragraph. Any http(s) link typed here becomes clickable automatically.">' + esc(b.text) + '</textarea></div>' +
      '</div>' + actions +
    '</div>';
  }
  /* with the console set up on this device: send a photo or video from the phone straight to images/news/ */
  function uploadButtonHTML(b, i) {
    if (!(window.LPBSA_PUBLISH && window.LPBSA_PUBLISH.canUpload())) return '';
    return '<div class="pub-upload"><button type="button" class="btn btn-small" data-upload="' + i + '">' +
      (b.type === 'image' ? 'Upload a photo' : 'Upload a video') + '</button>' +
      '<span class="section-note">' + (b.type === 'image'
        ? 'Resized for the web and saved in images/news/ right away.'
        : 'Up to 25 MB, saved in images/news/ right away. Longer videos: YouTube.') + '</span></div>';
  }
  function renderFormBlocks() {
    blocksEl.innerHTML = formBlocks.length
      ? formBlocks.map(blockRowHTML).join('')
      : '<p class="section-note">No content yet. Add a paragraph, subtitle, image or video below.</p>';
  }

  blocksEl.addEventListener('change', function (ev) {
    var target = ev.target;
    if (!target.classList.contains('block-input')) return;
    var i = Number(target.getAttribute('data-idx'));
    var field = target.getAttribute('data-field');
    var block = formBlocks[i];
    if (!block) return;
    block[field] = target.value;
    flashSaved(target);
    if ((block.type === 'youtube' || block.type === 'video') && field === 'src') renderFormBlocks();   /* refresh the note under it */
  });
  blocksEl.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter') return;
    var target = ev.target;
    if (target.classList.contains('block-input') && target.tagName === 'INPUT') {
      ev.preventDefault();
      target.blur();
    }
  });
  blocksEl.addEventListener('click', function (ev) {
    var upl = ev.target.closest('button[data-upload]');
    if (upl) {
      var block = formBlocks[Number(upl.getAttribute('data-upload'))];
      if (!block) return;
      window.LPBSA_PUBLISH.pick(block.type).then(function (file) {
        upl.disabled = true;
        upl.textContent = 'Uploading…';
        return window.LPBSA_PUBLISH.upload(file, { folder: 'images/news/', hint: f.headline.value || f.id.value || 'noticia' });
      }).then(function (path) {
        block.src = path;
        renderFormBlocks();
        toast('Uploaded and saved as ' + path);
      }, function (err) {
        renderFormBlocks();
        toast(err.message, true);
      });
      return;
    }
    var btn = ev.target.closest('button[data-up],button[data-down],button[data-del]');
    if (!btn) return;
    var i;
    if ((i = btn.getAttribute('data-up')) !== null) {
      i = Number(i);
      if (i > 0) { formBlocks.splice(i - 1, 0, formBlocks.splice(i, 1)[0]); renderFormBlocks(); }
      return;
    }
    if ((i = btn.getAttribute('data-down')) !== null) {
      i = Number(i);
      if (i < formBlocks.length - 1) { formBlocks.splice(i + 1, 0, formBlocks.splice(i, 1)[0]); renderFormBlocks(); }
      return;
    }
    if ((i = btn.getAttribute('data-del')) !== null) {
      i = Number(i);
      if (!window.confirm('Remove this block?')) return;
      formBlocks.splice(i, 1);
      renderFormBlocks();
    }
  });

  document.getElementById('wAddP').addEventListener('click', function () {
    formBlocks.push({ type: 'p', text: '' });
    renderFormBlocks();
    focusLastBlockField('textarea.block-input');
  });
  document.getElementById('wAddH').addEventListener('click', function () {
    formBlocks.push({ type: 'h', text: '' });
    renderFormBlocks();
    focusLastBlockField('input[data-field="text"]');
  });
  document.getElementById('wAddImg').addEventListener('click', function () {
    formBlocks.push({ type: 'image', src: '', caption: '' });
    renderFormBlocks();
    focusLastBlockField('input[data-field="src"]');
  });
  document.getElementById('wAddYT').addEventListener('click', function () {
    formBlocks.push({ type: 'youtube', src: '', caption: '' });
    renderFormBlocks();
    focusLastBlockField('input[data-field="src"]');
  });
  document.getElementById('wAddVideo').addEventListener('click', function () {
    formBlocks.push({ type: 'video', src: '', caption: '' });
    renderFormBlocks();
    focusLastBlockField('input[data-field="src"]');
  });

  function render() {
    if (!list.length) {
      storyList.innerHTML = '<p class="section-note">No stories yet. Write one above.</p>';
    } else {
      storyList.innerHTML = list.map(function (n, i) {
        return '<div class="writer-row">' +
          '<div class="writer-row-main">' +
            '<div class="news-date"><span class="news-sport">' + esc(LEAGUE_LABEL[cleanLeague(n.league)]) + '</span>' + esc(n.date) + (i === 0 ? ' &middot; top of the page' : '') + '</div>' +
            '<b>' + esc(n.headline) + '</b>' +
            '<p class="section-note" style="margin:4px 0 0">' + esc(n.summary) + '</p>' +
          '</div>' +
          '<div class="writer-row-actions">' +
            '<button class="btn btn-ghost btn-small" data-up="' + i + '" ' + (i === 0 ? 'disabled' : '') + '>&uarr;</button>' +
            '<button class="btn btn-ghost btn-small" data-down="' + i + '" ' + (i === list.length - 1 ? 'disabled' : '') + '>&darr;</button>' +
            '<button class="btn btn-small" data-edit="' + i + '">Edit</button>' +
            '<button class="btn btn-small btn-danger" data-del="' + i + '">Delete</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }
    output.value = buildFile();
    saveDraft();
  }

  function buildFile() {
    var header = [
      '/* ============================================================',
      '   LEAGUE NEWS  --  this is the only file you edit to post a story.',
      '   Newest story goes FIRST in the list.',
      '   Generated with news-writer.html',
      '   ============================================================ */'
    ].join('\n');
    var stories = JSON.stringify(list, null, 2);
    var lines = JSON.stringify(ticker.map(function (t) { return t.trim(); }).filter(Boolean), null, 2);
    return header +
      '\nwindow.LEAGUE_NEWS = ' + stories + ';\n\n' +
      '/* Short lines for the gold wire at the top of every page. */\n' +
      'window.LEAGUE_TICKER = ' + lines + ';\n';
  }

  document.getElementById('wSave').addEventListener('click', function () {
    var headline = f.headline.value.trim();
    if (!headline) { toast('A story needs a headline.', true); return; }
    var cleanBlocks = formBlocks.map(function (b) {
      if (b.type === 'image' || b.type === 'video' || b.type === 'youtube') {
        return { type: b.type, src: (b.src || '').trim(), caption: (b.caption || '').trim() };
      }
      if (b.type === 'h') return { type: 'h', text: (b.text || '').trim() };
      return { type: 'p', text: (b.text || '').trim() };
    }).filter(function (b) {
      return (b.type === 'image' || b.type === 'video' || b.type === 'youtube') ? !!b.src : !!b.text;
    });
    var firstPara = cleanBlocks.filter(function (b) { return b.type === 'p'; })[0];
    var storyId = f.id.value.trim() || slug(headline);
    if (!storyId) {
      /* a headline with no letters (just an emoji) still needs a link name that never changes:
         it takes today's date. (Without one, its link and its alerts would shift every time a story is added.) */
      var base = 'noticia-' + new Date().toISOString().slice(0, 10), nth = 1;
      storyId = base;
      while (list.some(function (s, idx) { return idx !== editingIndex && s.id === storyId; })) storyId = base + '-' + (++nth);
    }
    /* Football and basketball stories share one list and one set of links,
       so two stories may never use the same link name. */
    var clash = list.some(function (s, idx) { return idx !== editingIndex && s.id === storyId; });
    if (clash) {
      toast('Another story already uses the link name "' + storyId + '". Change the "Link name" box.', true);
      return;
    }
    var story = {
      id: storyId,
      league: league,
      date: f.date.value.trim(),
      headline: headline,
      summary: f.summary.value.trim() || (firstPara ? firstPara.text : ''),
      blocks: cleanBlocks
    };
    if (editingIndex >= 0) {
      list[editingIndex] = story;
      toast('Story updated.');
    } else {
      list.unshift(story);
      toast('Story added to the top.');
    }
    clearForm();
    render();
  });

  document.getElementById('wClear').addEventListener('click', clearForm);

  storyList.addEventListener('click', function (ev) {
    var btn = ev.target.closest('button[data-edit],button[data-del],button[data-up],button[data-down]');
    if (!btn) return;
    var i;
    if ((i = btn.getAttribute('data-edit')) !== null && i !== undefined) { fillForm(Number(i)); return; }
    if ((i = btn.getAttribute('data-del')) !== null && i !== undefined) {
      if (!window.confirm('Delete this story?')) return;
      list.splice(Number(i), 1);
      clearForm();
      render();
      return;
    }
    if ((i = btn.getAttribute('data-up')) !== null && i !== undefined) {
      i = Number(i);
      list.splice(i - 1, 0, list.splice(i, 1)[0]);
      render();
      return;
    }
    if ((i = btn.getAttribute('data-down')) !== null && i !== undefined) {
      i = Number(i);
      list.splice(i + 1, 0, list.splice(i, 1)[0]);
      render();
    }
  });

  document.getElementById('wCopy').addEventListener('click', function () {
    var code = buildFile();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(
        function () { toast('Copied. Paste it over assets/news.js'); },
        function () { output.select(); toast('Press Ctrl/Cmd + C to copy.'); }
      );
    } else {
      output.select();
      toast('Press Ctrl/Cmd + C to copy.');
    }
  });

  document.getElementById('wDownload').addEventListener('click', function () {
    var blob = new Blob([buildFile()], { type: 'text/javascript' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'news.js';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast('Downloaded. Move it into assets/ replacing the old one.');
  });

  document.getElementById('wReset').addEventListener('click', function () {
    if (!window.confirm('Throw away your unsaved changes and reload the stories currently on the site?')) return;
    if (window.LPBSA_DRAFTS) window.LPBSA_DRAFTS.clear(DRAFT_KEY);
    else { try { localStorage.removeItem(DRAFT_KEY); } catch (err) { /* ignore */ } }
    var live = liveData();
    list = live.stories;
    ticker = live.ticker;
    document.getElementById('wDraftNote').classList.add('hidden');
    clearForm();
    renderTicker();
    render();
  });

  /* ---------- the gold wire (LEAGUE_TICKER) ---------- */
  function renderTicker() {
    if (!tickerEl) return;
    tickerEl.innerHTML = ticker.length ? ticker.map(function (t, i) {
      return '<div class="writer-row ticker-row">' +
        '<div class="writer-row-main"><div class="field" style="margin-bottom:0"><label>Line ' + (i + 1) + '</label>' +
          '<input type="text" class="ticker-input" data-tick="' + i + '" value="' + esc(t) + '" placeholder="A short line for the wire"></div></div>' +
        '<div class="writer-row-actions">' +
          '<button class="btn btn-ghost btn-small" data-tup="' + i + '" ' + (i === 0 ? 'disabled' : '') + '>&uarr;</button>' +
          '<button class="btn btn-ghost btn-small" data-tdown="' + i + '" ' + (i === ticker.length - 1 ? 'disabled' : '') + '>&darr;</button>' +
          '<button class="btn btn-small btn-danger" data-tdel="' + i + '">Delete</button>' +
        '</div></div>';
    }).join('') : '<p class="section-note">No lines. With none, the wire shows the latest headlines instead.</p>';
  }
  if (tickerEl) {
    tickerEl.addEventListener('change', function (ev) {
      var el = ev.target;
      if (!el.classList.contains('ticker-input')) return;
      ticker[Number(el.getAttribute('data-tick'))] = el.value;
      flashSaved(el);
      render();
    });
    tickerEl.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' && ev.target.classList.contains('ticker-input')) { ev.preventDefault(); ev.target.blur(); }
    });
    tickerEl.addEventListener('click', function (ev) {
      var b = ev.target.closest('button[data-tup],button[data-tdown],button[data-tdel]');
      if (!b) return;
      var i;
      if ((i = b.getAttribute('data-tup')) !== null) { i = Number(i); ticker.splice(i - 1, 0, ticker.splice(i, 1)[0]); }
      else if ((i = b.getAttribute('data-tdown')) !== null) { i = Number(i); ticker.splice(i + 1, 0, ticker.splice(i, 1)[0]); }
      else if ((i = b.getAttribute('data-tdel')) !== null) {
        if (!window.confirm('Delete this line from the wire?')) return;
        ticker.splice(Number(i), 1);
      }
      renderTicker();
      render();
    });
    document.getElementById('wAddTicker').addEventListener('click', function () {
      ticker.push('');
      renderTicker();
      render();
      var inputs = tickerEl.querySelectorAll('.ticker-input');
      if (inputs.length) inputs[inputs.length - 1].focus();
    });
  }

  start();

  /* ---------- Publish (the commissioner console, assets/publish.js) ---------- */
  if (window.LPBSA_PUBLISH) {
    window.LPBSA_PUBLISH.attach({
      build: buildFile,
      /* a story still sitting in the form goes into the list first, so it is not left behind */
      before: function () {
        if (f.headline.value.trim()) {
          document.getElementById('wSave').click();
          return !f.headline.value.trim();          /* still there = it could not be added (a message says why) */
        }
        var unsaved = formBlocks.some(function (b) { return (b.text || b.src || '').trim(); });
        if (unsaved) return window.confirm('The form has content but no headline, so it is not a story yet. Publish without it?');
        return true;
      },
      pending: function () {
        if (!f.headline.value.trim()) return '';
        return editingIndex >= 0 ? 'Changes to this story are not saved yet; Publish saves them'
          : 'New story not in the list yet; Publish adds it';
      },
      message: function () {
        var added = list.filter(function (s) { return knownIds.indexOf(s.id) === -1; });
        return added.length ? 'new story: ' + added[0].headline : 'edits';
      },
      after: function () {
        if (window.LPBSA_DRAFTS) window.LPBSA_DRAFTS.published(DRAFT_KEY, { stories: list, ticker: ticker });
        knownIds = list.map(function (s) { return s.id; });
        document.getElementById('wDraftNote').classList.add('hidden');
      }
    });
  }
})();
