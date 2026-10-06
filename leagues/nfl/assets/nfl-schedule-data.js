/* ============================================================
   NFL SCHEDULE  --  the whole regular season, week by week.
   Copied from the Schedule table on each team page (all five agree).
   The home page and the NFL page read it to show "La Jornada": this
   week's matchups, who is on bye, and whether the games are on.

   start    the TUESDAY that week 1 begins. Fantasy weeks run Tuesday to
            Monday night (New York time), so the site works out which week
            it is from this date by itself - nothing to change during the
            season. Next season: put the new Tuesday here and the new weeks below.
   kickoff  when each week's games start: day after the Tuesday (0 = Tue,
            2 = Thursday) and the time, New York time. Used for the
            "Kickoff en ..." countdown and the "En juego" sign.
   weeks    one line per week: the games (two team slugs each - the same
            slugs as nfl-roster-data.js) and the team on bye.
   ============================================================ */
window.LPBSA_SCHEDULE = window.LPBSA_SCHEDULE || {};
window.LPBSA_SCHEDULE.nfl = {
  start: "2026-09-08",
  kickoff: { day: 2, time: "20:15" },
  weeks: [
    { week:  1, games: [["mugiwaras", "puntos"], ["peters", "sierra"]], bye: "hobbit" },
    { week:  2, games: [["hobbit", "peters"], ["puntos", "sierra"]], bye: "mugiwaras" },
    { week:  3, games: [["puntos", "hobbit"], ["sierra", "mugiwaras"]], bye: "peters" },
    { week:  4, games: [["mugiwaras", "hobbit"], ["peters", "puntos"]], bye: "sierra" },
    { week:  5, games: [["hobbit", "sierra"], ["mugiwaras", "peters"]], bye: "puntos" },
    { week:  6, games: [["puntos", "mugiwaras"], ["sierra", "peters"]], bye: "hobbit" },
    { week:  7, games: [["peters", "hobbit"], ["sierra", "puntos"]], bye: "mugiwaras" },
    { week:  8, games: [["hobbit", "puntos"], ["mugiwaras", "sierra"]], bye: "peters" },
    { week:  9, games: [["hobbit", "mugiwaras"], ["puntos", "peters"]], bye: "sierra" },
    { week: 10, games: [["sierra", "hobbit"], ["peters", "mugiwaras"]], bye: "puntos" },
    { week: 11, games: [["mugiwaras", "puntos"], ["peters", "sierra"]], bye: "hobbit" },
    { week: 12, games: [["hobbit", "peters"], ["puntos", "sierra"]], bye: "mugiwaras" },
    { week: 13, games: [["puntos", "hobbit"], ["sierra", "mugiwaras"]], bye: "peters" },
    { week: 14, games: [["mugiwaras", "hobbit"], ["peters", "puntos"]], bye: "sierra" },
    { week: 15, games: [["hobbit", "sierra"], ["mugiwaras", "peters"]], bye: "puntos" }
  ]
};
