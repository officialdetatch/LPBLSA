/* ============================================================
   NBA RULES  --  what the NBA's Reglas page (nba-rules.html, in the folder above) shows.
   Copied straight from LPBLSA - BASKETBALL RULES.xlsx.

   To change a rule, edit the number or the text below and save; the Reglas page
   reads this file and nothing else needs touching.

   The file is a list of sections, each holding blocks (cards). A block is one of:
     facts    a row of tiles, label and value   rows: [label, value]
     lineup   one tile per position             columns: [...]  rows: [position, starters, maximum]
     table    a table with column headings      columns: [...]  rows: [[...]]
     points   scoring, label and points         rows: [label, points]
              (a number: positive shows green with +, negative shows red;
              a list of 9 or more rows is laid out in two columns)
     stat     one big number                    label, value, note
     text     paragraphs                        paras: [...]
   A block can carry a  title  (the little heading on its card).
   ============================================================ */

window.LPBSA_RULES = window.LPBSA_RULES || {};
window.LPBSA_RULES.nba = {
  title: "LPBLSA - Basketball",
  sections: [
    {
      id: "basics", title: "Basics",
      blocks: [
        { type: "facts",
          rows: [
            ["League Name", "LPBLSA - Basketball"],
            ["Number of Teams", 6],
            ["Scoring Type", "Head to Head Points"],
          ],
        },
      ]
    },
    {
      id: "roster", title: "Roster",
      blocks: [
        { type: "facts", title: "Roster size",
          rows: [
            ["Roster Size", 14],
            ["Total Starters", 9],
            ["Total on Bench", 5],
            ["Injury Reserve", 1],
          ],
        },
        { type: "lineup", title: "Positions", columns: ["Position", "Starters", "Maximums"],
          rows: [
            ["Point Guard (PG)", 1, 3],
            ["Shooting Guard (SG)", 1, 3],
            ["Small Forward (SF)", 1, 3],
            ["Power Forward (PF)", 1, 3],
            ["Center (C)", 1, 3],
            ["Guard (G)", 1, "N/A"],
            ["Forward (F)", 1, "N/A"],
            ["Util (UTIL)", 2, "N/A"],
            ["Bench (BE)", 5, "N/A"],
            ["Injured Reserve (IR)", 1, "N/A"],
          ],
        },
      ]
    },
    {
      id: "gp", title: "Games Played Rules",
      blocks: [
        { type: "stat", title: "Games Played Limits (Maximums)", label: "All Players", value: "42 Games Played", note: "AVG of: 4.7 per slot",
        },
        { type: "text",
          paras: [
            "Each fantasy matchup has a maximum of 42 Games Played (GP) per team.",
            "The 42 GP limit applies to the entire starting lineup combined, not to individual players. Every game played by a player in an active lineup counts as 1 GP toward the team's weekly total.",
          ],
        },
        { type: "table", title: "For example:", columns: ["Player", "Games"],
          rows: [
            ["Player A", "5 games"],
            ["Player B", "4 games"],
            ["Player C", "4 games"],
            ["Player D", "5 games"],
            ["Player E", "4 games"],
            ["Player F", "5 games"],
            ["Player G", "4 games"],
            ["Player H", "4 games"],
            ["Player I", "3 games"],
          ],
          foot: ["Total", "38 GP"],
          after: "The team would have 4 GP remaining for that matchup.",
        },
        { type: "text",
          paras: [
            "Once the team reaches 42 total GP, the Games Played limit has been reached for that matchup. Any additional player games beyond the limit will not count toward the matchup's fantasy score.",
            "The 42 GP limit resets at the beginning of each new matchup.",
            "The purpose of the limit is to prevent teams from gaining an advantage simply by having players with more games on the NBA schedule and to make lineup management and player scheduling an important part of the league.",
          ],
        },
      ]
    },
    {
      id: "scoring", title: "Scoring",
      blocks: [
        { type: "points", title: "Scoring",
          rows: [
            ["Field Goals Made (FGM)", 2],
            ["Field Goals Missed (FGMI)", -1.25],
            ["Free Throws Made (FTM)", 0.5],
            ["Free Throws Missed (FTMI)", -1],
            ["Three Pointers Made (3PM)", 1],
            ["Offensive Rebounds (OREB)", 1.5],
            ["Defensive Rebounds (DREB)", 1],
            ["Assists (AST)", 2],
            ["Steals (STL)", 4],
            ["Blocks (BLK)", 4],
            ["Turnovers (TO)", -2],
            ["Personal Fouls (PF)", -0.5],
            ["Triple Doubles (TD)", 5],
            ["Quadruple Doubles (QD)", 10],
            ["Points (PTS)", 1],
          ],
        },
      ]
    },
  ]
};
