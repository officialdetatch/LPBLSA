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

  var f = {
    id: document.getElementById('wId'),
    date: document.getElementById('wDate'),
    headline: document.getElementById('wHeadline'),
    summary: document.getElementById('wSummary'),
    image: document.getElementById('wImage'),
    caption: document.getElementById('wCaption'),
    body: document.getElementById('wBody')
  };
  var storyList = document.getElementById('wList');
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

  function normalise(n, i) {
    return {
      id: n.id || slug(n.headline) || ('story-' + (i + 1)),
      date: n.date || '',
      headline: n.headline || '',
      summary: n.summary || '',
      image: n.image || '',
      caption: n.caption || '',
      body: Array.isArray(n.body) ? n.body : (n.body ? [n.body] : [])
    };
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
    render();
  }

  function clearForm() {
    Object.keys(f).forEach(function (k) { f[k].value = ''; });
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
    f.image.value = n.image;
    f.caption.value = n.caption;
    f.body.value = n.body.join('\n\n');
    editingIndex = i;
    formTitle.textContent = 'Editing: ' + n.headline;
    document.getElementById('wSave').textContent = 'Save changes';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
    var story = {
      id: (f.id.value.trim() || slug(headline)),
      date: f.date.value.trim(),
      headline: headline,
      summary: f.summary.value.trim(),
      image: f.image.value.trim(),
      caption: f.caption.value.trim(),
      body: f.body.value.split(/\n\s*\n/).map(function (p) {
        return p.replace(/\s*\n\s*/g, ' ').trim();
      }).filter(Boolean)
    };
    if (!story.summary) story.summary = story.body[0] || '';
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
