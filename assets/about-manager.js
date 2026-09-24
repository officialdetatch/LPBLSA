/* ============================================================
   ABOUT PAGE MANAGER  --  private tool, not linked from the public site.
   Loads the current assets/about-data.js, lets you edit the title,
   intro line and the stack of paragraph/image blocks that make up
   about.html, then hands you a finished about-data.js to save over
   the old one. Nothing here touches the live site until you replace
   that file yourself.
   ============================================================ */
(function () {
  'use strict';

  var DRAFT_KEY = 'lpbsa.about.draft.v1';
  var state = { title: '', lede: '', blocks: [] };

  var els = {
    title: document.getElementById('amTitle'),
    lede: document.getElementById('amLede'),
    blocks: document.getElementById('amBlocks'),
    output: document.getElementById('amOutput'),
    draftNote: document.getElementById('amDraftNote')
  };
  if (!els.blocks) return; /* this script only runs on about-manager.html */

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
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
  function flashSaved(el) {
    el.classList.add('field-saved');
    setTimeout(function () { el.classList.remove('field-saved'); }, 700);
  }

  function normaliseBlock(b) {
    if (b && b.type === 'image') {
      return { type: 'image', src: b.src || '', caption: b.caption || '' };
    }
    return { type: 'p', text: (b && b.text) || '' };
  }
  function normalise(about) {
    about = about || {};
    return {
      title: about.title || '',
      lede: about.lede || '',
      blocks: Array.isArray(about.blocks) ? about.blocks.map(normaliseBlock) : []
    };
  }

  function loadDraft() {
    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) { /* ignore */ }
    return null;
  }
  function saveDraft() {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(state)); } catch (err) { /* ignore */ }
  }

  function buildFile() {
    var header = [
      '/* ============================================================',
      '   ABOUT PAGE',
      '   One page, edited as a list of blocks in order - paragraphs and',
      '   images, mixed however you like. Generated with about-manager.html',
      '   ============================================================ */'
    ].join('\n');
    return header + '\nwindow.LEAGUE_ABOUT = ' + JSON.stringify(state, null, 2) + ';\n';
  }

  function blockRowHTML(b, i) {
    var n = state.blocks.length;
    var actions = '<div class="writer-row-actions">' +
      '<button class="btn btn-ghost btn-small" data-up="' + i + '" ' + (i === 0 ? 'disabled' : '') + '>&uarr;</button>' +
      '<button class="btn btn-ghost btn-small" data-down="' + i + '" ' + (i === n - 1 ? 'disabled' : '') + '>&darr;</button>' +
      '<button class="btn btn-small btn-danger" data-del="' + i + '">Delete</button>' +
      '</div>';
    if (b.type === 'image') {
      return '<div class="writer-row">' +
        '<div class="writer-row-main">' +
          '<div class="writer-grid">' +
            '<div class="field" style="margin-bottom:0"><label>Image path</label>' +
              '<input type="text" class="block-input" data-field="src" data-idx="' + i + '" value="' + esc(b.src) + '" placeholder="images/about/photo.jpg"></div>' +
            '<div class="field" style="margin-bottom:0"><label>Caption (optional)</label>' +
              '<input type="text" class="block-input" data-field="caption" data-idx="' + i + '" value="' + esc(b.caption) + '" placeholder="Optional caption"></div>' +
          '</div>' +
        '</div>' + actions +
      '</div>';
    }
    return '<div class="writer-row">' +
      '<div class="writer-row-main">' +
        '<div class="field" style="margin-bottom:0"><label>Paragraph</label>' +
          '<textarea class="block-input" data-field="text" data-idx="' + i + '" rows="3">' + esc(b.text) + '</textarea></div>' +
      '</div>' + actions +
    '</div>';
  }

  function renderBlocks() {
    els.blocks.innerHTML = state.blocks.length
      ? state.blocks.map(blockRowHTML).join('')
      : '<p class="section-note">No blocks yet. Add a paragraph or image below.</p>';
  }
  function updateOutput() {
    els.output.value = buildFile();
    saveDraft();
  }
  function render() {
    els.title.value = state.title;
    els.lede.value = state.lede;
    renderBlocks();
    updateOutput();
  }

  function start() {
    var draft = loadDraft();
    var live = normalise(window.LEAGUE_ABOUT);
    if (draft && JSON.stringify(normalise(draft)) !== JSON.stringify(live)) {
      state = normalise(draft);
      els.draftNote.classList.remove('hidden');
    } else {
      state = live;
    }
    render();
  }

  els.title.addEventListener('change', function () {
    state.title = els.title.value.trim();
    updateOutput();
    flashSaved(els.title);
  });
  els.lede.addEventListener('change', function () {
    state.lede = els.lede.value.trim();
    updateOutput();
    flashSaved(els.lede);
  });

  els.blocks.addEventListener('change', function (ev) {
    var target = ev.target;
    if (!target.classList.contains('block-input')) return;
    var i = Number(target.getAttribute('data-idx'));
    var field = target.getAttribute('data-field');
    var block = state.blocks[i];
    if (!block) return;
    block[field] = target.value.trim();
    updateOutput();
    flashSaved(target);
  });
  els.blocks.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter') return;
    var target = ev.target;
    if (target.classList.contains('block-input') && target.tagName === 'INPUT') {
      ev.preventDefault();
      target.blur();
    }
  });

  els.blocks.addEventListener('click', function (ev) {
    var btn = ev.target.closest('button[data-up],button[data-down],button[data-del]');
    if (!btn) return;
    var i;
    if ((i = btn.getAttribute('data-up')) !== null) {
      i = Number(i);
      if (i > 0) { state.blocks.splice(i - 1, 0, state.blocks.splice(i, 1)[0]); renderBlocks(); updateOutput(); }
      return;
    }
    if ((i = btn.getAttribute('data-down')) !== null) {
      i = Number(i);
      if (i < state.blocks.length - 1) { state.blocks.splice(i + 1, 0, state.blocks.splice(i, 1)[0]); renderBlocks(); updateOutput(); }
      return;
    }
    if ((i = btn.getAttribute('data-del')) !== null) {
      i = Number(i);
      if (!window.confirm('Delete this block?')) return;
      state.blocks.splice(i, 1);
      renderBlocks();
      updateOutput();
    }
  });

  document.getElementById('amAddP').addEventListener('click', function () {
    state.blocks.push({ type: 'p', text: '' });
    renderBlocks();
    updateOutput();
    var areas = els.blocks.querySelectorAll('textarea.block-input');
    if (areas.length) areas[areas.length - 1].focus();
  });
  document.getElementById('amAddImg').addEventListener('click', function () {
    state.blocks.push({ type: 'image', src: '', caption: '' });
    renderBlocks();
    updateOutput();
    var inputs = els.blocks.querySelectorAll('input.block-input[data-field="src"]');
    if (inputs.length) inputs[inputs.length - 1].focus();
  });

  document.getElementById('amDownload').addEventListener('click', function () {
    var blob = new Blob([buildFile()], { type: 'text/javascript' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'about-data.js';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast('Downloaded. Move it into assets/ replacing the old one.');
  });

  document.getElementById('amCopy').addEventListener('click', function () {
    var code = buildFile();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(
        function () { toast('Copied. Paste it over assets/about-data.js'); },
        function () { els.output.select(); toast('Press Ctrl/Cmd + C to copy.'); }
      );
    } else {
      els.output.select();
      toast('Press Ctrl/Cmd + C to copy.');
    }
  });

  document.getElementById('amReset').addEventListener('click', function () {
    if (!window.confirm('Throw away your unsaved changes and reload the About page currently on the site?')) return;
    try { localStorage.removeItem(DRAFT_KEY); } catch (err) { /* ignore */ }
    state = normalise(window.LEAGUE_ABOUT);
    els.draftNote.classList.add('hidden');
    render();
  });

  start();
})();
