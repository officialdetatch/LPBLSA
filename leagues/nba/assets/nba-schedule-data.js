/* ============================================================
   NBA SCHEDULE  --  the regular season, matchup by matchup.
   Copied from the Schedule tabs of LPBLSA - BASKETBALL.xlsx (ESPN).
   La Jornada (home page and NBA page) and the Schedule on every NBA team
   page read it, so the current matchup moves on by itself - nothing to
   edit during the season.

   start      the first day of matchup 1 (opening night), "YYYY-MM-DD".
   end        the last day of the last matchup.
   kickoff    when each matchup's games start, counted from its first day:
              day 0 = that first day; time in New York time; label = the word
              on the countdown ("Tip-off en 2d 4h").
   weekLabel  what a matchup is called on the site ("Matchup 3").
   weeks      one line per matchup, in order. games = pairs of team slugs
              (the same slugs as nba-teams-data.js), VISITOR FIRST, HOME
              SECOND - the "@" team in ESPN is the first one. With 6 teams
              there are 3 games and no bye.
              After matchup 1 each matchup starts 7 days after the one before
              (Monday to Sunday), so a date is only written where that is not
              true: matchup 1 is short (opening night Tuesday to Sunday), so
              matchup 2 carries its own  starts  date. If a later matchup is
              ever longer (an All-Star break), give the one AFTER it a  starts
              date too.
   Each team plays the other five three times: 15 matchups, Oct 20 - Jan 31.
   ============================================================ */
window.LPBSA_SCHEDULE = window.LPBSA_SCHEDULE || {};
window.LPBSA_SCHEDULE.nba = {
  start: "2026-10-20",
  end: "2027-01-31",
  kickoff: { day: 0, time: "19:00", label: "Tip-off" },
  weekLabel: "Matchup",
  weeks: [
    { week:  1, games: [["concheros", "mugiwaras"], ["imcebollin", "sin-talento"], ["pantyman", "puntos"]] },   // Oct 20 - 25
    { week:  2, starts: "2026-10-26", games: [["concheros", "pantyman"], ["mugiwaras", "sin-talento"], ["puntos", "imcebollin"]] },   // Oct 26 - Nov 1
    { week:  3, games: [["mugiwaras", "puntos"], ["pantyman", "imcebollin"], ["sin-talento", "concheros"]] },   // Nov 2 - 8
    { week:  4, games: [["concheros", "puntos"], ["imcebollin", "mugiwaras"], ["sin-talento", "pantyman"]] },   // Nov 9 - 15
    { week:  5, games: [["concheros", "imcebollin"], ["pantyman", "mugiwaras"], ["puntos", "sin-talento"]] },   // Nov 16 - 22
    { week:  6, games: [["mugiwaras", "concheros"], ["puntos", "pantyman"], ["sin-talento", "imcebollin"]] },   // Nov 23 - 29
    { week:  7, games: [["imcebollin", "puntos"], ["pantyman", "concheros"], ["sin-talento", "mugiwaras"]] },   // Nov 30 - Dec 6
    { week:  8, games: [["concheros", "sin-talento"], ["imcebollin", "pantyman"], ["puntos", "mugiwaras"]] },   // Dec 7 - 13
    { week:  9, games: [["mugiwaras", "imcebollin"], ["pantyman", "sin-talento"], ["puntos", "concheros"]] },   // Dec 14 - 20
    { week: 10, games: [["imcebollin", "concheros"], ["mugiwaras", "pantyman"], ["sin-talento", "puntos"]] },   // Dec 21 - 27
    { week: 11, games: [["concheros", "mugiwaras"], ["imcebollin", "sin-talento"], ["pantyman", "puntos"]] },   // Dec 28 - Jan 3
    { week: 12, games: [["concheros", "pantyman"], ["mugiwaras", "sin-talento"], ["puntos", "imcebollin"]] },   // Jan 4 - 10
    { week: 13, games: [["mugiwaras", "puntos"], ["pantyman", "imcebollin"], ["sin-talento", "concheros"]] },   // Jan 11 - 17
    { week: 14, games: [["concheros", "puntos"], ["imcebollin", "mugiwaras"], ["sin-talento", "pantyman"]] },   // Jan 18 - 24
    { week: 15, games: [["concheros", "imcebollin"], ["pantyman", "mugiwaras"], ["puntos", "sin-talento"]] }    // Jan 25 - 31
  ]
};
