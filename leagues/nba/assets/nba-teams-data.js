/* ============================================================
   NBA TEAMS
   One entry per team, in the order ESPN lists them. Every NBA page reads
   this: the NBA page, the Teams page, the home page, the team pages in
   teams/, La Jornada and the three NBA managers.

     slug      the team's id - also the name of its page (teams/<slug>.html).
               Never change it once the season starts.
     name      the name shown everywhere
     crest     the logo, relative to THIS league's folder. "" = no logo yet,
               so the team shows its initials on a round badge.
     initials  the 3 letters on that badge (and in a few tight spots)
     shape     "circle" = round badge (every NBA logo is round). Delete the
               line to get the pointed shield instead.

   ADDING A LOGO: save the picture as leagues/nba/images/<slug>.png
   (square, about 512x512) and fill in its crest, e.g. for Sin Talento:
     "crest": "images/sin-talento.png"
   It then shows up on every page at once.
   ============================================================ */
window.LPBSA_TEAMS = window.LPBSA_TEAMS || {};
window.LPBSA_TEAMS.nba = [
  {"slug": "puntos", "name": "Los Puntos de Piña", "crest": "images/puntos.png", "initials": "LPP", "shape": "circle"},
  {"slug": "sin-talento", "name": "Sin Talento de Barrio", "crest": "images/sin-talento.png", "initials": "STB", "shape": "circle"},
  {"slug": "imcebollin", "name": "iMcebollin", "crest": "images/imcebollin.png", "initials": "JST", "shape": "circle"},
  {"slug": "concheros", "name": "Concheros de la Concha", "crest": "images/concheros.png", "initials": "CLC", "shape": "circle"},
  {"slug": "mugiwaras", "name": "Mugiwaras De Caimito", "crest": "images/mugiwaras.png", "initials": "MDC", "shape": "circle"},
  {"slug": "pantyman", "name": "Pantyman Squad", "crest": "images/pantyman.png", "initials": "PPT", "shape": "circle"}
];