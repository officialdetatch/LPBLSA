/* ============================================================
   THE LEAGUES  --  one list that the navbar, the Teams page, the
   league landing pages and the floating bubble all read from.

   To open a new league (say UCL next year):
     1. change its  status  from 'soon' to 'live'
     2. give it a  home  (its landing page, relative to the site root)
     3. create its folder under leagues/ (copy leagues/nba as a start)
   Nothing else needs touching - the menu, Teams page and bubble
   pick it up by themselves.

   Fields
     key        short id, also the folder name under leagues/
     short      the name shown on buttons and badges
     name       the long name
     sport      the sport, shown in small print
     story      the value news-writer.html stores for stories of this
                league. Kept as football / basketball / soccer so every
                story already written keeps working.
     status     'live' = clickable     'soon' = greyed out, does nothing
     home       landing page, from the site root (live leagues only)
     logo       the league's round logo (from the site root) - shown in the
                floating "otro Fantasy" bubble
     assetRoot  folder its crest images live in, from the site root
     teamPages  folder of its individual team pages, from the site root
                ('' = none yet, so team names are not links)
     noTies     true = hide the T column in its standings
     rules      the league's Reglas page, from the site root. The Reglas menu in
                the navbar lists it; a league without one shows greyed out
     playoffs   the league's Playoffs page, from the site root (same idea)
   ============================================================ */
window.LPBSA_LEAGUES = [
  {
    key: 'nfl', short: 'NFL', name: 'NFL Fantasy', sport: 'Football', story: 'football',
    status: 'live', home: 'leagues/nfl/nfl-landing-page.html', logo: 'images/leagues/nfl.png',
    assetRoot: '', teamPages: 'leagues/nfl/teams/', noTies: false,
    rules: 'leagues/nfl/nfl-rules.html', playoffs: 'leagues/nfl/nfl-playoffs.html'
  },
  {
    key: 'nba', short: 'NBA', name: 'NBA Fantasy', sport: 'Basketball', story: 'basketball',
    status: 'live', home: 'leagues/nba/nba-landing-page.html', logo: 'images/leagues/nba.png',
    assetRoot: 'leagues/nba/', teamPages: '', noTies: true,
    rules: 'leagues/nba/nba-rules.html', playoffs: 'leagues/nba/nba-playoffs.html'
  },
  {
    key: 'ucl', short: 'UCL', name: 'UEFA Champions League', sport: 'Soccer', story: 'soccer',
    status: 'soon', soonText: 'Disponible el proximo año', logo: 'images/leagues/ucl.png',
    assetRoot: 'leagues/ucl/', teamPages: '', noTies: true
  }
];

/* Team lists of the newer leagues live here, keyed by league (each league's
   own <league>-teams-data.js adds itself, e.g. nba-teams-data.js). The NFL's
   list is the LEAGUE_TEAMS that leagues/nfl/assets/nfl-roster-data.js defines. */
window.LPBSA_TEAMS = window.LPBSA_TEAMS || {};

/* Standings of every league, keyed by league. Each league's <league>-standings-data.js
   (the file its standings manager writes, e.g. nfl-standings-data.js) defines window.LEAGUE_STANDINGS, so a
   page that needs several leagues loads them one after another and calls
   LPBSA_captureStandings('nfl') after each file to file it under its league. */
window.LPBSA_STANDINGS = window.LPBSA_STANDINGS || {};
window.LPBSA_captureStandings = function (key) {
  window.LPBSA_STANDINGS[key] = window.LEAGUE_STANDINGS || [];
  window.LEAGUE_STANDINGS = undefined;
};

(function () {
  'use strict';

  window.LPBSA_findLeague = function (key) {
    var all = window.LPBSA_LEAGUES || [];
    for (var i = 0; i < all.length; i++) { if (all[i].key === key) return all[i]; }
    return null;
  };

  /* The teams of one league, whichever page we are on. */
  window.LPBSA_teamsOf = function (key) {
    if (window.LPBSA_TEAMS[key]) return window.LPBSA_TEAMS[key];
    return key === 'nfl' ? (window.LEAGUE_TEAMS || []) : [];
  };

  /* Pages set <body data-root="../../" data-league="nba"> . This tells the
     shared scripts how far up the site root is and which league the page is,
     so one app.js can serve every league without per-page settings.
     app.js calls it before it reads those settings. */
  window.LPBSA_applyLeague = function () {
    var body = document.body;
    if (!body) return;
    var root = body.getAttribute('data-root') || '';
    if (root && !window.LPBSA_NEWS_BASE) window.LPBSA_NEWS_BASE = root + 'news.html#';
    if (root && !window.LPBSA_NEWS_INDEX) window.LPBSA_NEWS_INDEX = root + 'news.html';
    var L = window.LPBSA_findLeague(body.getAttribute('data-league'));
    if (!L) return;
    window.LPBSA_ASSET_BASE = root + L.assetRoot;
    window.LPBSA_TEAM_LINKS = !!L.teamPages;
    window.LPBSA_TEAM_BASE = root + L.teamPages;
    window.LPBSA_NO_TIES = !!L.noTies;
    /* the shared code looks up teams in LEAGUE_TEAMS */
    if (window.LPBSA_TEAMS[L.key]) window.LEAGUE_TEAMS = window.LPBSA_TEAMS[L.key];
  };
})();
