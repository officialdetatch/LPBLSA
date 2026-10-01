/* ============================================================
   NFL RULES  --  what the NFL's Reglas page (nfl-rules.html, in the folder above) shows.
   Copied straight from La_Premier_Bundesliga_Seria_A_Football_Rules.xlsx.

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
window.LPBSA_RULES.nfl = {
  title: "LPBLSA - A. Football",
  sections: [
    {
      id: "basics", title: "Basics",
      blocks: [
        { type: "facts",
          rows: [
            ["League Name", "LPBLSA - A. Football"],
            ["Number of Teams", 5],
            ["Scoring Type", "Head to Head Points, 0.5 Points Per Reception"],
          ],
        },
      ]
    },
    {
      id: "roster", title: "Roster",
      blocks: [
        { type: "facts", title: "Roster size",
          rows: [
            ["Roster Size", 18],
            ["Total Starters", 12],
            ["Total on Bench", 6],
            ["Injury Reserve", 1],
          ],
        },
        { type: "lineup", title: "Positions", columns: ["Position", "Starters", "Maximums"],
          rows: [
            ["Quarterback (QB)", 1, 3],
            ["Running Back (RB)", 2, 6],
            ["Wide Receiver (WR)", 3, 7],
            ["Tight End (TE)", 1, 3],
            ["Flex (FLEX)", 2, "N/A"],
            ["Offensive Player Utility (OP)", 1, "N/A"],
            ["Team Defense/Special Teams (D/ST)", 1, 2],
            ["Place Kicker (K)", 1, 2],
            ["Bench (BE)", 6, "N/A"],
            ["Injured Reserve (IR)", 1, "N/A"],
          ],
        },
      ]
    },
    {
      id: "offense", title: "Offensive Scoring",
      blocks: [
        { type: "points", title: "Passing",
          rows: [
            ["Passing Yards (PY)", 0.04],
            ["TD Pass (PTD)", 4],
            ["Interceptions Thrown (INT)", -2],
            ["2pt Passing Conversion (2PC)", 2],
          ],
        },
        { type: "points", title: "Rushing",
          rows: [
            ["Rushing Yards (RY)", 0.1],
            ["TD Rush (RTD)", 6],
            ["2pt Rushing Conversion (2PR)", 2],
          ],
        },
        { type: "points", title: "Receiving",
          rows: [
            ["Receiving Yards (REY)", 0.1],
            ["Each reception (REC)", 0.5],
            ["TD Reception (RETD)", 6],
            ["2pt Receiving Conversion (2PRE)", 2],
          ],
        },
        { type: "points", title: "Kicking",
          rows: [
            ["Each PAT Made (PAT)", 1],
            ["Total FG Missed (FGM)", -1],
            ["FG Made (0-39 yards) (FG0)", 3],
            ["FG Made (40-49 yards) (FG40)", 4],
            ["FG Made (50-59 yards) (FG50)", 5],
            ["FG Made (60+ yards) (FG60)", 6],
          ],
        },
      ]
    },
    {
      id: "defense", title: "D/ST Scoring",
      blocks: [
        { type: "points", title: "Team Defense / Special Teams",
          rows: [
            ["Kickoff Return TD (KRTD)", 6],
            ["Punt Return TD (PRTD)", 6],
            ["Interception Return TD (INTTD)", 6],
            ["Fumble Return TD (FRTD)", 6],
            ["Blocked Punt or FG return for TD (BLKKRTD)", 6],
            ["2pt Return (2PTRET)", 2],
            ["1pt Safety (1PSF)", 1],
            ["Each Sack (SK)", 1],
            ["Blocked Punt, PAT or FG (BLKK)", 2],
            ["Each Interception (INT)", 2],
            ["Each Fumble Recovered (FR)", 2],
            ["Each Safety (SF)", 2],
            ["0 points allowed (PA0)", 5],
            ["1-6 points allowed (PA1)", 4],
            ["7-13 points allowed (PA7)", 3],
            ["14-17 points allowed (PA14)", 1],
            ["28-34 points allowed (PA28)", -1],
            ["35-45 points allowed (PA35)", -3],
            ["46+ points allowed (PA46)", -5],
            ["Less than 100 total yards allowed (YA100)", 5],
            ["100-199 total yards allowed (YA199)", 3],
            ["200-299 total yards allowed (YA299)", 2],
            ["350-399 total yards allowed (YA399)", -1],
            ["400-449 total yards allowed (YA449)", -3],
            ["450-499 total yards allowed (YA499)", -5],
            ["500-549 total yards allowed (YA549)", -6],
            ["550+ total yards allowed (YA550)", -7],
          ],
        },
        { type: "points", title: "Miscellaneous",
          rows: [
            ["Kickoff Return TD (KRTD)", 6],
            ["Punt Return TD (PRTD)", 6],
            ["Fumble Recovered for TD (FTD)", 6],
            ["Total Fumbles Lost (FUML)", -2],
            ["Interception Return TD (INTTD)", 6],
            ["Fumble Return TD (FRTD)", 6],
            ["Blocked Punt or FG return for TD (BLKKRTD)", 6],
            ["2pt Return (2PTRET)", 2],
            ["1pt Safety (1PSF)", 1],
          ],
        },
      ]
    },
  ]
};
