/* ============================================================
   NBA SCHEDULE  --  the regular season, matchup by matchup.
   EMPTY UNTIL THE MATCHUPS ARE OUT. While "weeks" is empty, La Jornada
   simply doesn't show an NBA tab - nothing breaks. Fill it in after the
   draft and the NBA tab appears by itself on the home page (and on the NBA
   page, once its content is switched back on).

   start    the first day of matchup 1 (opening night), "YYYY-MM-DD".
   kickoff  when each matchup's games start, counted from its first day:
            day 0 = that first day; time in New York time; label = the word
            on the countdown ("Tip-off en 2d 4h").
   weeks    one line per matchup, in order. games = the two team slugs
            (the same slugs as nba-teams-data.js). With 10 teams there are 5
            games and no bye; with an odd number add  bye: "slug".
            A matchup lasts until the next one starts. Fantasy basketball weeks
            normally run Monday to Sunday, so after the first one each matchup
            starts 7 days after the one before - you only write a date when
            that is NOT true:
              - matchup 1 is usually short (opening night to Sunday): give
                matchup 2 its Monday with  starts: "YYYY-MM-DD"
              - the All-Star break matchup is usually two weeks long: give the
                matchup AFTER it its own  starts  date too
   end      (optional) the last day of the last matchup, "YYYY-MM-DD".
            Without it, the last matchup lasts 7 days.

   Example (made-up teams):
     start: "2026-10-20",
     weeks: [
       { week: 1, games: [["lakers", "celtics"], ["heat", "knicks"]] },
       { week: 2, starts: "2026-10-26", games: [["lakers", "heat"], ["celtics", "knicks"]] },
       { week: 3, games: [ ... ] },                         <- Nov 2, by itself
       ...
       { week: 18, starts: "2027-02-22", games: [ ... ] }   <- after a 2-week All-Star matchup
     ]
   ============================================================ */
window.LPBSA_SCHEDULE = window.LPBSA_SCHEDULE || {};
window.LPBSA_SCHEDULE.nba = {
  start: "",
  kickoff: { day: 0, time: "19:00", label: "Tip-off" },
  weeks: []
};
