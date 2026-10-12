Put the NBA team logos here, named after each team's slug:

  puntos.png        Los Puntos de Piña
  sin-talento.png   Sin Talento de Barrio
  imcebollin.png    iMcebollin
  concheros.png     Concheros de la Concha
  mugiwaras.png     Mugiwaras De Caimito (the NFL logo has a football, so it gets its own)
  pantyman.png      Pantyman Squad

Then point that team's "crest" at it in leagues/nba/assets/nba-teams-data.js, e.g.
  "crest": "images/sin-talento.png"
and it shows up everywhere at once (NBA page, team page, Teams page, standings,
La Jornada). Every NBA logo is round ("shape": "circle"), so a square picture of a
circle works best - about 512x512, PNG with a transparent background.
Until a team has a logo it shows its initials on a round gold-and-navy badge.
