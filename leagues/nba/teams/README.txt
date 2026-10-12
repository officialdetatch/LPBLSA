The NBA team pages - one per team, named after the team's slug in
leagues/nba/assets/nba-teams-data.js (puntos.html, sin-talento.html, imcebollin.html,
concheros.html, mugiwaras.html, pantyman.html).

Written in each page by hand: the team name, the manager and the bio (search the
page for MANAGER BIO). puntos.html also has the commissioner pane (COMMISSIONER BIO).

Everything else updates itself from leagues/nba/assets/ - never edit it here:
  logo                                nba-teams-data.js ("crest")
  rank, record, points, streak, odds  nba-standings-data.js (nba-standings-manager.html)
  roster                              nba-roster-data.js (nba-roster-manager.html)
  schedule                            nba-schedule-data.js
