/* ============================================================
   NBA TEAMS
   One entry per team. Empty for now - the teams arrive later.
   Fill it in like this (the crest path is relative to THIS league's
   folder, e.g. leagues/nba/images/lakers.png):

     { "slug": "lakers", "name": "Los Lakers", "crest": "images/lakers.png", "initials": "LAK" }

   A team without a crest shows its initials on a round badge, so
   leave "crest" as "" until you have the picture.

   Badges are a pointed shield by default. For a round logo add
   "shape": "circle" to that team, e.g.
     { "slug": "lakers", "name": "Los Lakers", "crest": "images/lakers.png", "initials": "LAK", "shape": "circle" }
   The nba-standings-manager.html and nba-roster-manager.html (in the folder
   above) list every team here so you can add it to the table and give it a
   roster, and the Teams page picks them up too.
   ============================================================ */
window.LPBSA_TEAMS = window.LPBSA_TEAMS || {};
window.LPBSA_TEAMS.nba = [];
