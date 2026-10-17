/* ============================================================
   CONSOLA  --  consola.html, the commissioner's home base.
   Without a key on this device: the three setup steps.
   With one: every tool (newest news first), when each file last
   changed, and the latest changes on GitHub.
   The GitHub side (the key, reading, publishing) is assets/publish.js.
   ============================================================ */
(function () {
  'use strict';

  var P = window.LPBSA_PUBLISH;
  if (!P) return;

  /* The tools, in the order they show. file = what the tool publishes (from the root of the repo). */
  var ICON = {
    news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h11l3 3v13H5z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>',
    about: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.1"/></svg>',
    socials: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.6" cy="7.4" r=".8" fill="currentColor"/></svg>'
  };
  var TOOLS = [
    { group: 'News', main: true, name: 'News writer', href: 'news-writer.html', file: 'assets/news.js',
      what: 'Stories, photos and the gold wire', ico: ICON.news },
    { group: 'NBA', name: 'Standings', href: 'leagues/nba/nba-standings-manager.html',
      file: 'leagues/nba/assets/nba-standings-data.js', what: 'W, L, PF, PA, streaks', ico: 'NBA' },
    { group: 'NBA', name: 'Rosters & free agents', href: 'leagues/nba/nba-roster-manager.html',
      file: 'leagues/nba/assets/nba-roster-data.js', what: 'Pickups, drops, trades, injuries', ico: 'NBA' },
    { group: 'NBA', name: 'Playoffs', href: 'leagues/nba/nba-playoffs-manager.html',
      file: 'leagues/nba/assets/nba-playoffs-data.js', what: 'Seeds and the bracket', ico: 'NBA' },
    { group: 'NFL', name: 'Standings', href: 'leagues/nfl/nfl-standings-manager.html',
      file: 'leagues/nfl/assets/nfl-standings-data.js', what: 'W, L, T, PF, PA, streaks', ico: 'NFL' },
    { group: 'NFL', name: 'Rosters & free agents', href: 'leagues/nfl/nfl-roster-manager.html',
      file: 'leagues/nfl/assets/nfl-roster-data.js', what: 'Pickups, drops, trades, injuries', ico: 'NFL' },
    { group: 'NFL', name: 'Playoffs', href: 'leagues/nfl/nfl-playoffs-manager.html',
      file: 'leagues/nfl/assets/nfl-playoffs-data.js', what: 'Seeds and the bracket', ico: 'NFL' },
    { group: 'Site', name: 'About page', href: 'about-manager.html', file: 'assets/about-data.js',
      what: 'The league history', ico: ICON.about },
    { group: 'Site', name: 'Socials', href: 'socials-writer.html', file: 'assets/socials-data.js',
      what: 'The Socials section of the home page', ico: ICON.socials }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var setup = $('csSetup'), home = $('csHome'), msg = $('csMsg');
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function say(text, kind) { msg.textContent = text; msg.className = 'cs-msg' + (kind ? ' ' + kind : ''); }

  /* "3 hours ago" */
  var rtf = window.Intl && Intl.RelativeTimeFormat ? new Intl.RelativeTimeFormat('en', { numeric: 'auto' }) : null;
  function ago(iso) {
    var s = (new Date(iso).getTime() - Date.now()) / 1000;
    if (!isFinite(s)) return '';
    var steps = [[60, 'second'], [60, 'minute'], [24, 'hour'], [7, 'day'], [4.35, 'week'], [12, 'month'], [Infinity, 'year']];
    for (var i = 0; i < steps.length; i++) {
      if (Math.abs(s) < steps[i][0]) return rtf ? rtf.format(Math.round(s), steps[i][1]) : new Date(iso).toLocaleString();
      s /= steps[i][0];
    }
    return '';
  }
  var PREFIX = P.CONFIG.commitPrefix;
  function fromConsole(message) { return String(message || '').indexOf(PREFIX) === 0; }
  function firstLine(message) { return String(message || '').split('\n')[0]; }

  /* running as a Home Screen app? then step 1 is done */
  function installed() {
    return window.navigator.standalone === true ||
      (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  }

  /* ---------- set up ---------- */
  function showSetup(text, kind) {
    home.hidden = true;
    setup.hidden = false;
    if (installed()) {
      var step = $('csStepHome');
      step.innerHTML = '<b>Home Screen: done.</b> You are in the Home Screen app, so the key you paste below stays here.';
    }
    if (text) say(text, kind);
  }

  /* Checks a key without changing anything: read news.js, then try to save it over a version that
     does not exist - GitHub answers "conflict" when the key may write, "forbidden" when it may not. */
  function testKey() {
    return P.api('GET', P.repoPath()).then(function () {
      return P.getFile('assets/news.js');
    }).then(function (f) {
      return P.api('PUT', P.contentsPath('assets/news.js'), {
        message: PREFIX + 'key test (never saved)',
        content: P.utf8ToB64(f.text),
        sha: '0000000000000000000000000000000000000000',
        branch: P.CONFIG.branch
      }).then(function () { return true; }, function (err) {
        if (err.status === 409 || err.status === 422) return true;
        throw err;
      });
    });
  }

  $('csKeyForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var key = $('csKey').value.trim();
    if (!key) { say('Paste the key from GitHub first.', 'bad'); return; }
    if (!/^(github_pat_|ghp_)[A-Za-z0-9_]{20,}$/.test(key)) {
      say('That does not look like a GitHub key. It should start with github_pat_ - copy it again from GitHub.', 'bad');
      return;
    }
    if (!P.setToken(key)) { say('This browser will not save anything (private mode?). Use a normal window or the Home Screen app.', 'bad'); return; }
    $('csSave').disabled = true;
    say('Testing the key with GitHub…');
    testKey().then(function () {
      $('csKey').value = '';
      say('');
      showHome();
      P.toast('Key saved. This device can publish now.');
    }, function (err) {
      P.clearToken();
      say(err.message, 'bad');
    }).then(function () { $('csSave').disabled = false; });
  });

  /* ---------- the console ---------- */
  function toolHTML(t) {
    var ico = /^</.test(t.ico) ? t.ico : esc(t.ico);
    return '<a class="cs-tool' + (t.main ? ' cs-main-tool' : '') + '" href="' + esc(t.href) + '">' +
      '<span class="cs-ico">' + ico + '</span>' +
      '<span><b>' + esc(t.name) + '</b><small>' + esc(t.what) + '</small>' +
        '<small class="cs-when" data-when="' + esc(t.file) + '">&nbsp;</small></span>' +
      '<span class="cs-go" aria-hidden="true">&rarr;</span></a>';
  }
  function drawTools() {
    var groups = [];
    TOOLS.forEach(function (t) { if (groups.indexOf(t.group) === -1) groups.push(t.group); });
    $('csTools').innerHTML = groups.map(function (g) {
      return '<div class="cs-group"><h3>' + esc(g) + '</h3><div class="cs-tools">' +
        TOOLS.filter(function (t) { return t.group === g; }).map(toolHTML).join('') + '</div></div>';
    }).join('');
  }
  function commitsURL(extra) {
    return P.repoPath() + '/commits?sha=' + encodeURIComponent(P.CONFIG.branch) + extra;
  }
  function loadWhen() {
    TOOLS.forEach(function (t) {
      P.api('GET', commitsURL('&per_page=1&path=' + encodeURIComponent(t.file))).then(function (list) {
        var c = list && list[0];
        var el = document.querySelector('[data-when="' + t.file + '"]');
        if (!el) return;
        el.textContent = c ? 'Last change ' + ago(c.commit.committer.date) + (fromConsole(c.commit.message) ? ' · from the Consola' : '') : 'Never changed';
      }, function () { /* the list below shows the problem */ });
    });
  }
  function loadActivity() {
    var box = $('csActivity');
    P.api('GET', commitsURL('&per_page=8')).then(function (list) {
      list = list || [];
      box.innerHTML = list.length ? list.map(function (c) {
        var phone = fromConsole(c.commit.message);
        var text = firstLine(c.commit.message);
        if (phone) text = text.slice(PREFIX.length);
        return '<li><span class="cs-src' + (phone ? ' phone' : '') + '">' + (phone ? 'Consola' : 'Computer') + '</span>' +
          '<a href="' + esc(c.html_url) + '" target="_blank" rel="noopener noreferrer">' + esc(text) + '</a>' +
          '<small>' + esc(ago(c.commit.committer.date)) + '</small></li>';
      }).join('') : '<li><span></span><small>No changes yet.</small></li>';
      /* the newest change came from here: the computer is behind until it pulls */
      var pull = $('csPull');
      if (list[0] && fromConsole(list[0].commit.message)) {
        pull.innerHTML = '<span>The newest change came from the Consola. On the computer, before your next push, run</span> <code>git pull</code>';
      }
    }, function (err) {
      if (err.status === 401) { P.clearToken(); showSetup(err.message, 'bad'); return; }
      box.innerHTML = '<li><span></span><small>' + esc(err.message) + '</small></li>';
    });
  }
  function showHome() {
    setup.hidden = true;
    home.hidden = false;
    drawTools();
    loadWhen();
    loadActivity();
  }

  $('csForget').addEventListener('click', function () {
    if (!window.confirm('Remove the GitHub key from this device? The tools here go back to Download only. (To cancel the key everywhere, delete it on GitHub.)')) return;
    P.clearToken();
    showSetup('Key removed from this device.', 'ok');
  });

  if (P.token()) showHome(); else showSetup();
})();
