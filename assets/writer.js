/* ============================================================
   NEWS WRITER  --  private tool, not linked from the public site.
   Loads the current assets/news.js, lets you add, edit, reorder
   and delete stories, then hands you a finished news.js to save
   over the old one. Nothing here touches the live site until you
   replace that file yourself.
   ============================================================ */
(function () {
  'use strict';

  var DRAFT_KEY = 'lpbsa.writer.draft.v1';
  var list = [];
  var editingIndex = -1;
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

  function loadDraft() {
    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) { /* ignore */ }
    return null;
  }
  function saveDraft() {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(list)); } catch (err) { /* ignore */ }
  }

  function cloneBlock(b) {
    if (b.type === 'image' || b.type === 'video') {
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

  function start() {
    var draft = loadDraft();
    var live = (window.LEAGUE_NEWS || []).map(normalise);
    if (draft && draft.length && JSON.stringify(draft) !== JSON.stringify(live)) {
      list = draft.map(normalise);
      document.getElementById('wDraftNote').classList.remove('hidden');
    } else {
      list = live;
    }
    renderFormBlocks();
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
    if (b.type === 'image' || b.type === 'video') {
      var label = b.type === 'image' ? 'Image path' : 'Video path (.mp4)';
      var ph = b.type === 'image' ? 'images/news/week2.jpg' : 'images/news/week2.mp4';
      return '<div class="writer-row">' +
        '<div class="writer-row-main">' +
          '<div class="writer-grid">' +
            '<div class="field" style="margin-bottom:0"><label>' + label + '</label>' +
              '<input type="text" class="block-input" data-field="src" data-idx="' + i + '" value="' + esc(b.src) + '" placeholder="' + ph + '"></div>' +
            '<div class="field" style="margin-bottom:0"><label>Caption (optional)</label>' +
              '<input type="text" class="block-input" data-field="caption" data-idx="' + i + '" value="' + esc(b.caption) + '" placeholder="Optional caption"></div>' +
          '</div>' +
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
            '<div class="news-date">' + esc(n.date) + (i === 0 ? ' &middot; top of the page' : '') + '</div>' +
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
    var ticker = JSON.stringify(window.LEAGUE_TICKER || [], null, 2);
    return header +
      '\nwindow.LEAGUE_NEWS = ' + stories + ';\n\n' +
      '/* Short lines for the gold wire at the top of every page. */\n' +
      'window.LEAGUE_TICKER = ' + ticker + ';\n';
  }

  document.getElementById('wSave').addEventListener('click', function () {
    var headline = f.headline.value.trim();
    if (!headline) { toast('A story needs a headline.', true); return; }
    var cleanBlocks = formBlocks.map(function (b) {
      if (b.type === 'image' || b.type === 'video') {
        return { type: b.type, src: (b.src || '').trim(), caption: (b.caption || '').trim() };
      }
      if (b.type === 'h') return { type: 'h', text: (b.text || '').trim() };
      return { type: 'p', text: (b.text || '').trim() };
    }).filter(function (b) {
      return (b.type === 'image' || b.type === 'video') ? !!b.src : !!b.text;
    });
    var firstPara = cleanBlocks.filter(function (b) { return b.type === 'p'; })[0];
    var story = {
      id: (f.id.value.trim() || slug(headline)),
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
    try { localStorage.removeItem(DRAFT_KEY); } catch (err) { /* ignore */ }
    list = (window.LEAGUE_NEWS || []).map(normalise);
    document.getElementById('wDraftNote').classList.add('hidden');
    clearForm();
    render();
  });

  start();
})();
