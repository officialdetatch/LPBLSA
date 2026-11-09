/* ============================================================
   NFL ROSTERS & FREE AGENTS
   Kept up to date from ESPN Fantasy by the "ESPN sync" robot
   (.github/workflows/espn-sync.yml, every 3 hours) - see README.md,
   "Rosters and standings from ESPN". Changes made here or in the
   roster manager are replaced on the next sync.

   Each player:  name, espn (his ESPN id, for the photo), status (Q, D,
   OUT, IR, DTD, BYE... or null when fine), team_abbr, pos (every position
   he can play - the first one is his main one), fpts (ESPN's season
   projection), avg (average per game this season) and last (his last
   game) - null = not known yet.
   ============================================================ */
window.LEAGUE_TEAMS = [
  {
    "slug": "mugiwaras",
    "name": "Mugiwaras De Caimito",
    "crest": "images/mugiwaras.png",
    "initials": "MDC"
  },
  {
    "slug": "peters",
    "name": "Peter's Perfect Team",
    "crest": "images/peters.png",
    "initials": "PPT"
  },
  {
    "slug": "sierra",
    "name": "Sierra Linda Cameltoes",
    "crest": "images/sierra.png",
    "initials": "SLC"
  },
  {
    "slug": "puntos",
    "name": "Los Puntos de Piña",
    "crest": "images/puntos.png",
    "initials": "LPP",
    "shape": "circle"
  },
  {
    "slug": "hobbit",
    "name": "Hobbit",
    "crest": "images/hobbit.png",
    "initials": "HOB"
  }
];

window.STARTER_SLOTS = ["QB","RB","RB","WR","WR","WR","TE","FLEX","FLEX","OP","D/ST","K"];

window.LEAGUE_ROSTERS = {
  "mugiwaras": {
    "starters": [
      {
        "name": "Trevor Lawrence",
        "espn": "4360310",
        "status": null,
        "team_abbr": "JAX",
        "pos": "QB",
        "fpts": 177.17,
        "avg": 18.4,
        "last": 13.58
      },
      {
        "name": "Jahmyr Gibbs",
        "espn": "4429795",
        "status": null,
        "team_abbr": "DET",
        "pos": "RB",
        "fpts": 191.04,
        "avg": 24.03,
        "last": 13.4
      },
      {
        "name": "D'Andre Swift",
        "espn": "4259545",
        "status": null,
        "team_abbr": "CHI",
        "pos": "RB",
        "fpts": 112.62,
        "avg": 15.76,
        "last": 3.1
      },
      {
        "name": "Puka Nacua",
        "espn": "4426515",
        "status": "D",
        "team_abbr": "LAR",
        "pos": "WR",
        "fpts": 153.78,
        "avg": 19.8,
        "last": 28
      },
      {
        "name": "CeeDee Lamb",
        "espn": "4241389",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 133.5,
        "avg": 18.53,
        "last": 28.5
      },
      {
        "name": "Parker Washington",
        "espn": "4432620",
        "status": null,
        "team_abbr": "JAX",
        "pos": "WR",
        "fpts": 107.95,
        "avg": 11.89,
        "last": 13.1
      },
      {
        "name": "Trey McBride",
        "espn": "4361307",
        "status": null,
        "team_abbr": "ARI",
        "pos": "TE",
        "fpts": 94.67,
        "avg": 14.03,
        "last": 8.9
      },
      {
        "name": "James Cook III",
        "espn": "4379399",
        "status": null,
        "team_abbr": "BUF",
        "pos": "RB",
        "fpts": 170.24,
        "avg": 17.96,
        "last": 17.1
      },
      {
        "name": "Justin Jefferson",
        "espn": "4262921",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 124.67,
        "avg": 12.07,
        "last": 11.8
      },
      {
        "name": "Joe Burrow",
        "espn": "3915511",
        "status": null,
        "team_abbr": "CIN",
        "pos": "QB",
        "fpts": 194.02,
        "avg": 24.89,
        "last": 29.54
      },
      {
        "name": "Rams",
        "status": null,
        "team_abbr": "LAR",
        "pos": "D/ST",
        "fpts": 62.24,
        "avg": 5.33,
        "last": 11
      },
      {
        "name": "Brandon Aubrey",
        "espn": "3953687",
        "status": null,
        "team_abbr": "DAL",
        "pos": "K",
        "fpts": 84.03,
        "avg": 8.89,
        "last": 9
      }
    ],
    "bench": [
      {
        "name": "Aaron Jones Sr.",
        "espn": "3042519",
        "status": null,
        "team_abbr": "MIN",
        "pos": "RB",
        "fpts": 65.41,
        "avg": 10.33,
        "last": 5
      },
      {
        "name": "Blake Corum",
        "espn": "4429096",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 69.49,
        "avg": 9.96,
        "last": 11.8
      },
      {
        "name": "Jordan Addison",
        "espn": "4429205",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 76.39,
        "avg": 6.85,
        "last": 10.1
      },
      {
        "name": "Michael Wilson",
        "espn": "4360761",
        "status": "OUT",
        "team_abbr": "ARI",
        "pos": "WR",
        "fpts": 92.18,
        "avg": 10.58,
        "last": 9
      },
      {
        "name": "Germie Bernard",
        "espn": "4685261",
        "status": "BYE",
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 76.84,
        "avg": 6.35,
        "last": 5.5
      },
      {
        "name": "Jordan Love",
        "espn": "4036378",
        "status": null,
        "team_abbr": "GB",
        "pos": "QB",
        "fpts": 149.53,
        "avg": 20.56,
        "last": 36.18
      }
    ],
    "ir": []
  },
  "peters": {
    "starters": [
      {
        "name": "Jared Goff",
        "espn": "3046779",
        "status": null,
        "team_abbr": "DET",
        "pos": "QB",
        "fpts": 141.03,
        "avg": 18.42,
        "last": 5.3
      },
      {
        "name": "Derrick Henry",
        "espn": "3043078",
        "status": null,
        "team_abbr": "BAL",
        "pos": "RB",
        "fpts": 110.33,
        "avg": 15.14,
        "last": 5.58
      },
      {
        "name": "Kenneth Walker III",
        "espn": "4567048",
        "status": null,
        "team_abbr": "KC",
        "pos": "RB",
        "fpts": 207.92,
        "avg": 22.92,
        "last": 34.3
      },
      {
        "name": "Ja'Marr Chase",
        "espn": "4362628",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 175.96,
        "avg": 16.65,
        "last": 26.5
      },
      {
        "name": "Rashee Rice",
        "espn": "4428331",
        "status": null,
        "team_abbr": "KC",
        "pos": "WR",
        "fpts": 95.33,
        "avg": 8.95,
        "last": 7.4
      },
      {
        "name": "Denzel Boston",
        "espn": "4832800",
        "status": null,
        "team_abbr": "CLE",
        "pos": "WR",
        "fpts": 86.32,
        "avg": 9.63,
        "last": 12.8
      },
      {
        "name": "George Kittle",
        "espn": "3040151",
        "status": null,
        "team_abbr": "SF",
        "pos": "TE",
        "fpts": 106.64,
        "avg": 11.91,
        "last": 7.8
      },
      {
        "name": "Breece Hall",
        "espn": "4427366",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "RB",
        "fpts": 92.58,
        "avg": 11.93,
        "last": 10.2
      },
      {
        "name": "Bucky Irving",
        "espn": "4596448",
        "status": null,
        "team_abbr": "TB",
        "pos": "RB",
        "fpts": 139.77,
        "avg": 16.46,
        "last": 26.5
      },
      {
        "name": "Dak Prescott",
        "espn": "2577417",
        "status": null,
        "team_abbr": "DAL",
        "pos": "QB",
        "fpts": 135.49,
        "avg": 18.6,
        "last": 19.5
      },
      {
        "name": "Seahawks",
        "status": null,
        "team_abbr": "SEA",
        "pos": "D/ST",
        "fpts": 58.31,
        "avg": 8.56,
        "last": 10
      },
      {
        "name": "Jason Myers",
        "espn": "2473037",
        "status": null,
        "team_abbr": "SEA",
        "pos": "K",
        "fpts": 66.12,
        "avg": 8.33,
        "last": 6
      }
    ],
    "bench": [
      {
        "name": "Patrick Mahomes",
        "espn": "3139477",
        "status": "Q",
        "team_abbr": "KC",
        "pos": "QB",
        "fpts": 156.95,
        "avg": 17.75,
        "last": 16.48
      },
      {
        "name": "Ravens",
        "status": null,
        "team_abbr": "BAL",
        "pos": "D/ST",
        "fpts": 45.68,
        "avg": 3.67,
        "last": 1
      },
      {
        "name": "Harold Fannin Jr.",
        "espn": "5083076",
        "status": null,
        "team_abbr": "CLE",
        "pos": "TE",
        "fpts": 64.11,
        "avg": 9.31,
        "last": 11.2
      },
      {
        "name": "Mike Evans",
        "espn": "16737",
        "status": "OUT",
        "team_abbr": "SF",
        "pos": "WR",
        "fpts": 89,
        "avg": 12.58,
        "last": 0
      },
      {
        "name": "Tony Pollard",
        "espn": "3916148",
        "status": "BYE",
        "team_abbr": "TEN",
        "pos": "RB",
        "fpts": 130.35,
        "avg": 13.69,
        "last": 27.2
      },
      {
        "name": "DK Metcalf",
        "espn": "4047650",
        "status": "BYE",
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 93.97,
        "avg": 7.68,
        "last": 0.9
      }
    ],
    "ir": []
  },
  "sierra": {
    "starters": [
      {
        "name": "Bo Nix",
        "espn": "4426338",
        "status": null,
        "team_abbr": "DEN",
        "pos": "QB",
        "fpts": 140.8,
        "avg": 14.53,
        "last": 15.68
      },
      {
        "name": "Chase Brown",
        "espn": "4362238",
        "status": null,
        "team_abbr": "CIN",
        "pos": "RB",
        "fpts": 115.7,
        "avg": 10.24,
        "last": 9
      },
      {
        "name": "Chuba Hubbard",
        "espn": "4241416",
        "status": null,
        "team_abbr": "CAR",
        "pos": "RB",
        "fpts": 152.25,
        "avg": 16.7,
        "last": 11.6
      },
      {
        "name": "Drake London",
        "espn": "4426502",
        "status": null,
        "team_abbr": "ATL",
        "pos": "WR",
        "fpts": 99.51,
        "avg": 11.07,
        "last": 9.3
      },
      {
        "name": "Malik Nabers",
        "espn": "4595348",
        "status": null,
        "team_abbr": "NYG",
        "pos": "WR",
        "fpts": 118.52,
        "avg": 12.91,
        "last": 6.8
      },
      {
        "name": "Tee Higgins",
        "espn": "4239993",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 123.89,
        "avg": 16.98,
        "last": 17.7
      },
      {
        "name": "T.J. Hockenson",
        "espn": "4036133",
        "status": null,
        "team_abbr": "MIN",
        "pos": "TE",
        "fpts": 70.02,
        "avg": 9,
        "last": 13.8
      },
      {
        "name": "Jaxon Smith-Njigba",
        "espn": "4430878",
        "status": null,
        "team_abbr": "SEA",
        "pos": "WR",
        "fpts": 135.5,
        "avg": 21.84,
        "last": 8.6
      },
      {
        "name": "Rhamondre Stevenson",
        "espn": "4569173",
        "status": "Q",
        "team_abbr": "NE",
        "pos": "RB",
        "fpts": 86.73,
        "avg": 11.19,
        "last": 13.3
      },
      {
        "name": "C.J. Stroud",
        "espn": "4432577",
        "status": null,
        "team_abbr": "HOU",
        "pos": "QB",
        "fpts": 170.62,
        "avg": 20.51,
        "last": 35.36
      },
      {
        "name": "49ers",
        "status": null,
        "team_abbr": "SF",
        "pos": "D/ST",
        "fpts": 64.22,
        "avg": 8.5,
        "last": 19
      },
      {
        "name": "Spencer Shrader",
        "espn": "4571557",
        "status": null,
        "team_abbr": "IND",
        "pos": "K",
        "fpts": 81.1,
        "avg": 11.56,
        "last": 16
      }
    ],
    "bench": [
      {
        "name": "Vikings",
        "status": null,
        "team_abbr": "MIN",
        "pos": "D/ST",
        "fpts": 50.9,
        "avg": 11.29,
        "last": 5
      },
      {
        "name": "Jaylen Warren",
        "espn": "4569987",
        "status": "BYE",
        "team_abbr": "PIT",
        "pos": "RB",
        "fpts": 127.04,
        "avg": 16.04,
        "last": 20.8
      },
      {
        "name": "Jalen Coker",
        "espn": "4695883",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 78.49,
        "avg": 10.07,
        "last": 4.6
      },
      {
        "name": "Jonah Coleman",
        "espn": "4702555",
        "status": null,
        "team_abbr": "DEN",
        "pos": "RB",
        "fpts": 122.71,
        "avg": 11.28,
        "last": 16.8
      },
      {
        "name": "Greg Dulcich",
        "espn": "4367209",
        "status": null,
        "team_abbr": "MIA",
        "pos": "TE",
        "fpts": 55.9,
        "avg": 5.13,
        "last": 2.4
      },
      {
        "name": "Ashton Jeanty",
        "espn": "4890973",
        "status": null,
        "team_abbr": "LV",
        "pos": "RB",
        "fpts": 109.59,
        "avg": 13.14,
        "last": 4.5
      }
    ],
    "ir": []
  },
  "puntos": {
    "starters": [
      {
        "name": "Drake Maye",
        "espn": "4431452",
        "status": null,
        "team_abbr": "NE",
        "pos": "QB",
        "fpts": 174.91,
        "avg": 19.91,
        "last": 18.26
      },
      {
        "name": "Bijan Robinson",
        "espn": "4430807",
        "status": null,
        "team_abbr": "ATL",
        "pos": "RB",
        "fpts": 148.34,
        "avg": 18.28,
        "last": 23.7
      },
      {
        "name": "Kyren Williams",
        "espn": "4430737",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 111.48,
        "avg": 15.68,
        "last": 7.6
      },
      {
        "name": "Matthew Golden",
        "espn": "4701936",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 124.51,
        "avg": 15.27,
        "last": 27.4
      },
      {
        "name": "Omar Cooper Jr.",
        "espn": "4723820",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 61.28,
        "avg": 10.52,
        "last": 9.8
      },
      {
        "name": "Luther Burden III",
        "espn": "4685278",
        "status": "Q",
        "team_abbr": "CHI",
        "pos": "WR",
        "fpts": 95.06,
        "avg": 12.42,
        "last": 17.2
      },
      {
        "name": "Travis Kelce",
        "espn": "15847",
        "status": null,
        "team_abbr": "KC",
        "pos": "TE",
        "fpts": 85.69,
        "avg": 10.35,
        "last": 15.3
      },
      {
        "name": "Christian Watson",
        "espn": "4248528",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 111.68,
        "avg": 16.93,
        "last": 26.6
      },
      {
        "name": "Ollie Gordon II",
        "espn": "4711533",
        "status": null,
        "team_abbr": "MIA",
        "pos": "RB",
        "fpts": 123.68,
        "avg": 9.51,
        "last": 6.9
      },
      {
        "name": "Brock Purdy",
        "espn": "4361741",
        "status": null,
        "team_abbr": "SF",
        "pos": "QB",
        "fpts": 169.34,
        "avg": 21.41,
        "last": 25.28
      },
      {
        "name": "Jaguars",
        "status": null,
        "team_abbr": "JAX",
        "pos": "D/ST",
        "fpts": 58.67,
        "avg": 8.38,
        "last": 12
      },
      {
        "name": "Cam Little",
        "espn": "4686361",
        "status": null,
        "team_abbr": "JAX",
        "pos": "K",
        "fpts": 85.66,
        "avg": 9.88,
        "last": 17
      }
    ],
    "bench": [
      {
        "name": "Sam LaPorta",
        "espn": "4430027",
        "status": null,
        "team_abbr": "DET",
        "pos": "TE",
        "fpts": 76.32,
        "avg": 9.45,
        "last": 5.2
      },
      {
        "name": "Zay Flowers",
        "espn": "4429615",
        "status": null,
        "team_abbr": "BAL",
        "pos": "WR",
        "fpts": 86.52,
        "avg": 13.25,
        "last": 3.8
      },
      {
        "name": "DeMario Douglas",
        "espn": "4427095",
        "status": null,
        "team_abbr": "NE",
        "pos": "WR",
        "fpts": 64.25,
        "avg": 8.99,
        "last": 12.7
      },
      {
        "name": "Caleb Williams",
        "espn": "4431611",
        "status": null,
        "team_abbr": "CHI",
        "pos": "QB",
        "fpts": 137.76,
        "avg": 18.39,
        "last": 12.76
      },
      {
        "name": "Stefon Diggs",
        "espn": "2976212",
        "status": null,
        "team_abbr": "WSH",
        "pos": "WR",
        "fpts": 82.57,
        "avg": 10.76,
        "last": 6.6
      }
    ],
    "ir": [
      {
        "name": "Davante Adams",
        "espn": "16800",
        "status": "IR",
        "team_abbr": "LAR",
        "pos": "WR",
        "fpts": 0,
        "avg": 14.5,
        "last": 0
      }
    ]
  },
  "hobbit": {
    "starters": [
      {
        "name": "Jayden Daniels",
        "espn": "4426348",
        "status": null,
        "team_abbr": "WSH",
        "pos": "QB",
        "fpts": 177.28,
        "avg": 19.2,
        "last": 14.56
      },
      {
        "name": "Jonathan Taylor",
        "espn": "4242335",
        "status": null,
        "team_abbr": "IND",
        "pos": "RB",
        "fpts": 121.48,
        "avg": 15.62,
        "last": 6.9
      },
      {
        "name": "Javonte Williams",
        "espn": "4361579",
        "status": null,
        "team_abbr": "DAL",
        "pos": "RB",
        "fpts": 119.22,
        "avg": 16.4,
        "last": 20.4
      },
      {
        "name": "Amon-Ra St. Brown",
        "espn": "4374302",
        "status": null,
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 135.39,
        "avg": 15.89,
        "last": 12.6
      },
      {
        "name": "Nico Collins",
        "espn": "4258173",
        "status": null,
        "team_abbr": "HOU",
        "pos": "WR",
        "fpts": 102.61,
        "avg": 12.93,
        "last": 13.5
      },
      {
        "name": "Chris Olave",
        "espn": "4361370",
        "status": null,
        "team_abbr": "NO",
        "pos": "WR",
        "fpts": 109.32,
        "avg": 14.18,
        "last": 13.3
      },
      {
        "name": "Brock Bowers",
        "espn": "4432665",
        "status": null,
        "team_abbr": "LV",
        "pos": "TE",
        "fpts": 112.1,
        "avg": 17.43,
        "last": 18.8
      },
      {
        "name": "Christian McCaffrey",
        "espn": "3117251",
        "status": null,
        "team_abbr": "SF",
        "pos": "RB",
        "fpts": 159.02,
        "avg": 18.59,
        "last": 21.7
      },
      {
        "name": "Saquon Barkley",
        "espn": "3929630",
        "status": null,
        "team_abbr": "PHI",
        "pos": "RB",
        "fpts": 99.24,
        "avg": 7.89,
        "last": 8.2
      },
      {
        "name": "Josh Allen",
        "espn": "3918298",
        "status": null,
        "team_abbr": "BUF",
        "pos": "QB",
        "fpts": 215.47,
        "avg": 26.76,
        "last": 26.56
      },
      {
        "name": "Steelers",
        "status": "BYE",
        "team_abbr": "PIT",
        "pos": "D/ST",
        "fpts": 65.76,
        "avg": 9.13,
        "last": 16
      },
      {
        "name": "Will Reichard",
        "espn": "4567104",
        "status": null,
        "team_abbr": "MIN",
        "pos": "K",
        "fpts": 91.3,
        "avg": 11.43,
        "last": 0
      }
    ],
    "bench": [
      {
        "name": "George Pickens",
        "espn": "4426354",
        "status": "OUT",
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 77.82,
        "avg": 10.6,
        "last": 0
      },
      {
        "name": "Kyle Pitts Sr.",
        "espn": "4360248",
        "status": null,
        "team_abbr": "ATL",
        "pos": "TE",
        "fpts": 60.09,
        "avg": 6.5,
        "last": 3.8
      },
      {
        "name": "Tetairoa McMillan",
        "espn": "4685472",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 112.9,
        "avg": 12.69,
        "last": 13.6
      },
      {
        "name": "Garrett Wilson",
        "espn": "4569618",
        "status": "OUT",
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 82.86,
        "avg": 11.53,
        "last": 0
      },
      {
        "name": "Bryce Young",
        "espn": "4685720",
        "status": null,
        "team_abbr": "CAR",
        "pos": "QB",
        "fpts": 150.85,
        "avg": 18.32,
        "last": 20.34
      },
      {
        "name": "Tyler Bass",
        "espn": "3917232",
        "status": null,
        "team_abbr": "BUF",
        "pos": "K",
        "fpts": 97.07,
        "avg": 11.14,
        "last": 16
      }
    ],
    "ir": [
      {
        "name": "Jeremiyah Love",
        "espn": "4870808",
        "status": "IR",
        "team_abbr": "ARI",
        "pos": "RB",
        "fpts": 43.25,
        "avg": 7.98,
        "last": 0
      }
    ]
  }
};

window.FREE_AGENTS = [
  {
    "name": "Tyler Warren",
    "espn": "4431459",
    "status": null,
    "team_abbr": "IND",
    "pos": "TE",
    "fpts": 62.79,
    "avg": 9.3,
    "last": 6.4
  },
  {
    "name": "Colston Loveland",
    "espn": "4723086",
    "status": null,
    "team_abbr": "CHI",
    "pos": "TE",
    "fpts": 78.75,
    "avg": 7.2,
    "last": 7.4
  },
  {
    "name": "Isaiah Likely",
    "espn": "4361050",
    "status": null,
    "team_abbr": "NYG",
    "pos": "TE",
    "fpts": 88.74,
    "avg": 13.23,
    "last": 13.8
  },
  {
    "name": "DeVonta Smith",
    "espn": "4241478",
    "status": "OUT",
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 85.43,
    "avg": 14,
    "last": 0
  },
  {
    "name": "Josh Jacobs",
    "espn": "4047365",
    "status": "OUT",
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 123.55,
    "avg": 12.77,
    "last": 0.5
  },
  {
    "name": "Bhayshul Tuten",
    "espn": "4882093",
    "status": null,
    "team_abbr": "JAX",
    "pos": "RB",
    "fpts": 134.19,
    "avg": 14.96,
    "last": 8.9
  },
  {
    "name": "Quinshon Judkins",
    "espn": "4685702",
    "status": null,
    "team_abbr": "CLE",
    "pos": "RB",
    "fpts": 93.03,
    "avg": 10.14,
    "last": 5
  },
  {
    "name": "Jameson Williams",
    "espn": "4426388",
    "status": null,
    "team_abbr": "DET",
    "pos": "WR",
    "fpts": 84.43,
    "avg": 11.46,
    "last": 4.5
  },
  {
    "name": "Emeka Egbuka",
    "espn": "4567750",
    "status": null,
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 76.32,
    "avg": 8.93,
    "last": 5.4
  },
  {
    "name": "A.J. Brown",
    "espn": "4047646",
    "status": "OUT",
    "team_abbr": "NE",
    "pos": "WR",
    "fpts": 81.64,
    "avg": 4.87,
    "last": 0
  },
  {
    "name": "Tucker Kraft",
    "espn": "4572680",
    "status": null,
    "team_abbr": "GB",
    "pos": "TE",
    "fpts": 64.5,
    "avg": 8.04,
    "last": 1.4
  },
  {
    "name": "Cam Skattebo",
    "espn": "4696981",
    "status": "OUT",
    "team_abbr": "NYG",
    "pos": "RB",
    "fpts": 96.91,
    "avg": 9.27,
    "last": 0
  },
  {
    "name": "DJ Moore",
    "espn": "3915416",
    "status": null,
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 107.67,
    "avg": 8.98,
    "last": 14.6
  },
  {
    "name": "Texans",
    "status": null,
    "team_abbr": "HOU",
    "pos": "D/ST",
    "fpts": 51.37,
    "avg": 5.13,
    "last": 12
  },
  {
    "name": "Matthew Stafford",
    "espn": "12483",
    "status": null,
    "team_abbr": "LAR",
    "pos": "QB",
    "fpts": 119.59,
    "avg": 15.87,
    "last": 11.22
  },
  {
    "name": "Jaylen Waddle",
    "espn": "4372016",
    "status": "Q",
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 82.38,
    "avg": 7.44,
    "last": 2.7
  },
  {
    "name": "Broncos",
    "status": null,
    "team_abbr": "DEN",
    "pos": "D/ST",
    "fpts": 54.2,
    "avg": 6.22,
    "last": 6
  },
  {
    "name": "Lamar Jackson",
    "espn": "3916387",
    "status": "IR",
    "team_abbr": "BAL",
    "pos": "QB",
    "fpts": 0,
    "avg": 15.82,
    "last": 0
  },
  {
    "name": "Ladd McConkey",
    "espn": "4612826",
    "status": "Q",
    "team_abbr": "LAC",
    "pos": "WR",
    "fpts": 75.24,
    "avg": 7.18,
    "last": 0
  },
  {
    "name": "Omarion Hampton",
    "espn": "4685382",
    "status": null,
    "team_abbr": "LAC",
    "pos": "RB",
    "fpts": 65.29,
    "avg": 7.84,
    "last": 6
  },
  {
    "name": "Rome Odunze",
    "espn": "4431299",
    "status": null,
    "team_abbr": "CHI",
    "pos": "WR",
    "fpts": 74.78,
    "avg": 8.09,
    "last": 14
  },
  {
    "name": "Ka'imi Fairbairn",
    "espn": "2971573",
    "status": null,
    "team_abbr": "HOU",
    "pos": "K",
    "fpts": 92.65,
    "avg": 11.5,
    "last": 17
  },
  {
    "name": "Carnell Tate",
    "espn": "4871023",
    "status": "OUT",
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 89.71,
    "avg": 8.61,
    "last": 0
  },
  {
    "name": "Braelon Allen",
    "espn": "4685247",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "RB",
    "fpts": 58.43,
    "avg": 10.61,
    "last": 4.4
  },
  {
    "name": "Travis Etienne Jr.",
    "espn": "4239996",
    "status": "IR",
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 86.43,
    "avg": 8.47,
    "last": 0
  },
  {
    "name": "Dallas Goedert",
    "espn": "3121023",
    "status": null,
    "team_abbr": "PHI",
    "pos": "TE",
    "fpts": 48.89,
    "avg": 8.36,
    "last": 7.5
  },
  {
    "name": "Woody Marks",
    "espn": "4429059",
    "status": null,
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 71.59,
    "avg": 7.93,
    "last": 7.9
  },
  {
    "name": "Dalton Kincaid",
    "espn": "4385690",
    "status": null,
    "team_abbr": "BUF",
    "pos": "TE",
    "fpts": 70.54,
    "avg": 9.37,
    "last": 16.6
  },
  {
    "name": "Rachaad White",
    "espn": "4697815",
    "status": null,
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 90.9,
    "avg": 8.67,
    "last": 5.9
  },
  {
    "name": "David Montgomery",
    "espn": "4035538",
    "status": "OUT",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 83,
    "avg": 8.4,
    "last": 0
  },
  {
    "name": "Deebo Samuel Sr.",
    "espn": "3126486",
    "status": "OUT",
    "team_abbr": "SF",
    "pos": "WR",
    "fpts": 83.49,
    "avg": 10.48,
    "last": 0
  },
  {
    "name": "Kyle Monangai",
    "espn": "4608686",
    "status": "OUT",
    "team_abbr": "CHI",
    "pos": "RB",
    "fpts": 60.37,
    "avg": 14.2,
    "last": 0
  },
  {
    "name": "Jadarian Price",
    "espn": "4685512",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 72.8,
    "avg": 4.42,
    "last": 9.8
  },
  {
    "name": "Zach Charbonnet",
    "espn": "4426385",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 89.28,
    "avg": 6.75,
    "last": 9.1
  },
  {
    "name": "J.K. Dobbins",
    "espn": "4241985",
    "status": null,
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 49.8,
    "avg": 6.44,
    "last": 2.7
  },
  {
    "name": "Tyler Allgeier",
    "espn": "4373626",
    "status": null,
    "team_abbr": "ARI",
    "pos": "RB",
    "fpts": 59.28,
    "avg": 8.8,
    "last": 5.6
  },
  {
    "name": "Jakobi Meyers",
    "espn": "3916433",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 83.58,
    "avg": 7.82,
    "last": 8.5
  },
  {
    "name": "Xavier Worthy",
    "espn": "4683062",
    "status": "Q",
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 73.9,
    "avg": 6.29,
    "last": 7.8
  },
  {
    "name": "Tre Tucker",
    "espn": "4428718",
    "status": null,
    "team_abbr": "LV",
    "pos": "WR",
    "fpts": 63.82,
    "avg": 10.31,
    "last": 7.5
  },
  {
    "name": "Bears",
    "status": null,
    "team_abbr": "CHI",
    "pos": "D/ST",
    "fpts": 50,
    "avg": 7.67,
    "last": 13
  },
  {
    "name": "Tyler Shough",
    "espn": "4360689",
    "status": null,
    "team_abbr": "NO",
    "pos": "QB",
    "fpts": 141.95,
    "avg": 18.2,
    "last": 19.7
  },
  {
    "name": "Marvin Harrison Jr.",
    "espn": "4432708",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 48.08,
    "avg": 4.57,
    "last": 3
  },
  {
    "name": "Alvin Kamara",
    "espn": "3054850",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 65.13,
    "avg": 8.74,
    "last": 6.4
  },
  {
    "name": "Rico Dowdle",
    "espn": "4038815",
    "status": "BYE",
    "team_abbr": "PIT",
    "pos": "RB",
    "fpts": 76.02,
    "avg": 7.62,
    "last": 11.6
  },
  {
    "name": "Kirk Cousins",
    "espn": "14880",
    "status": null,
    "team_abbr": "LV",
    "pos": "QB",
    "fpts": 43.12,
    "avg": 19.14,
    "last": 12.64
  },
  {
    "name": "Josh Downs",
    "espn": "4688813",
    "status": null,
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 47.21,
    "avg": 6.51,
    "last": 3.9
  },
  {
    "name": "KC Concepcion",
    "espn": "4870653",
    "status": null,
    "team_abbr": "CLE",
    "pos": "WR",
    "fpts": 67.8,
    "avg": 7.77,
    "last": 16.8
  },
  {
    "name": "TreVeyon Henderson",
    "espn": "4432710",
    "status": "OUT",
    "team_abbr": "NE",
    "pos": "RB",
    "fpts": 40.17,
    "avg": 5.22,
    "last": 0
  },
  {
    "name": "Hunter Henry",
    "espn": "3046439",
    "status": null,
    "team_abbr": "NE",
    "pos": "TE",
    "fpts": 55.6,
    "avg": 7.12,
    "last": 5
  },
  {
    "name": "Mark Andrews",
    "espn": "3116365",
    "status": null,
    "team_abbr": "BAL",
    "pos": "TE",
    "fpts": 38.93,
    "avg": 4.8,
    "last": 2.9
  },
  {
    "name": "Khalil Shakir",
    "espn": "4373678",
    "status": null,
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 75.66,
    "avg": 7.56,
    "last": 8.9
  },
  {
    "name": "Chiefs",
    "status": null,
    "team_abbr": "KC",
    "pos": "D/ST",
    "fpts": 52.14,
    "avg": 6.25,
    "last": 12
  },
  {
    "name": "Courtland Sutton",
    "espn": "3128429",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 64.49,
    "avg": 5.68,
    "last": 13
  },
  {
    "name": "Patriots",
    "status": null,
    "team_abbr": "NE",
    "pos": "D/ST",
    "fpts": 43.66,
    "avg": 5.11,
    "last": -5
  },
  {
    "name": "RJ Harvey",
    "espn": "4568490",
    "status": "IR",
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 0,
    "avg": 9.15,
    "last": 0
  },
  {
    "name": "Jordan Mason",
    "espn": "4360569",
    "status": null,
    "team_abbr": "MIN",
    "pos": "RB",
    "fpts": 66.44,
    "avg": 6.9,
    "last": 2
  },
  {
    "name": "Devaughn Vele",
    "espn": "4569559",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 50.31,
    "avg": 9,
    "last": 2.7
  },
  {
    "name": "Matt Gay",
    "espn": "4249087",
    "status": null,
    "team_abbr": "LV",
    "pos": "K",
    "fpts": 70.44,
    "avg": 9.78,
    "last": 7
  },
  {
    "name": "Harrison Butker",
    "espn": "3055899",
    "status": null,
    "team_abbr": "KC",
    "pos": "K",
    "fpts": 84.13,
    "avg": 7.38,
    "last": 4
  },
  {
    "name": "Makai Lemon",
    "espn": "4870795",
    "status": null,
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 33.85,
    "avg": 6.13,
    "last": 9.1
  },
  {
    "name": "Browns",
    "status": null,
    "team_abbr": "CLE",
    "pos": "D/ST",
    "fpts": 49.63,
    "avg": 5.78,
    "last": 8
  },
  {
    "name": "Wan'Dale Robinson",
    "espn": "4569587",
    "status": "BYE",
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 63.68,
    "avg": 7.48,
    "last": 12.7
  },
  {
    "name": "Jake Bates",
    "espn": "4689936",
    "status": null,
    "team_abbr": "DET",
    "pos": "K",
    "fpts": 81.27,
    "avg": 9.88,
    "last": 15
  },
  {
    "name": "Kenny Gainwell",
    "espn": "4371733",
    "status": null,
    "team_abbr": "TB",
    "pos": "RB",
    "fpts": 67.4,
    "avg": 6.23,
    "last": 9.1
  },
  {
    "name": "Giants",
    "status": null,
    "team_abbr": "NYG",
    "pos": "D/ST",
    "fpts": 49.26,
    "avg": 6.25,
    "last": 14
  },
  {
    "name": "Kyler Murray",
    "espn": "3917315",
    "status": "OUT",
    "team_abbr": "MIN",
    "pos": "QB",
    "fpts": 0,
    "avg": 12.26,
    "last": 19.9
  },
  {
    "name": "Chris Godwin Jr.",
    "espn": "3116165",
    "status": null,
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 45.17,
    "avg": 4.82,
    "last": 3.8
  },
  {
    "name": "Brenton Strange",
    "espn": "4430539",
    "status": null,
    "team_abbr": "JAX",
    "pos": "TE",
    "fpts": 65.25,
    "avg": 7.08,
    "last": 3.2
  },
  {
    "name": "Alec Pierce",
    "espn": "4360078",
    "status": "IR",
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 38.16,
    "avg": 4.85,
    "last": 0
  },
  {
    "name": "Keenan Allen",
    "espn": "15818",
    "status": null,
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 53.96,
    "avg": 7.64,
    "last": 4.6
  },
  {
    "name": "Chase McLaughlin",
    "espn": "3150744",
    "status": null,
    "team_abbr": "TB",
    "pos": "K",
    "fpts": 78.69,
    "avg": 11,
    "last": 10
  },
  {
    "name": "Devin Singletary",
    "espn": "4040761",
    "status": null,
    "team_abbr": "NYG",
    "pos": "RB",
    "fpts": 56.37,
    "avg": 6.88,
    "last": 4.9
  },
  {
    "name": "Romeo Doubs",
    "espn": "4361432",
    "status": "IR",
    "team_abbr": "NE",
    "pos": "WR",
    "fpts": 0,
    "avg": 8.52,
    "last": 0
  },
  {
    "name": "Juwan Johnson",
    "espn": "3929645",
    "status": null,
    "team_abbr": "NO",
    "pos": "TE",
    "fpts": 50.53,
    "avg": 8.11,
    "last": 10.4
  },
  {
    "name": "Chris Boswell",
    "espn": "17372",
    "status": "BYE",
    "team_abbr": "PIT",
    "pos": "K",
    "fpts": 97.87,
    "avg": 9.63,
    "last": 8
  },
  {
    "name": "Adonai Mitchell",
    "espn": "4597500",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "WR",
    "fpts": 71.71,
    "avg": 8.1,
    "last": 0
  },
  {
    "name": "Cameron Dicker",
    "espn": "4362081",
    "status": null,
    "team_abbr": "LAC",
    "pos": "K",
    "fpts": 74.03,
    "avg": 7.5,
    "last": 13
  },
  {
    "name": "Pat Freiermuth",
    "espn": "4361411",
    "status": "BYE",
    "team_abbr": "PIT",
    "pos": "TE",
    "fpts": 61,
    "avg": 8.31,
    "last": 10.6
  },
  {
    "name": "Jake Ferguson",
    "espn": "4242355",
    "status": "OUT",
    "team_abbr": "DAL",
    "pos": "TE",
    "fpts": 29.75,
    "avg": 5.01,
    "last": 9.1
  },
  {
    "name": "Michael Pittman Jr.",
    "espn": "4035687",
    "status": "IR",
    "team_abbr": "PIT",
    "pos": "WR",
    "fpts": 0,
    "avg": 4.13,
    "last": 0
  },
  {
    "name": "Jacory Croskey-Merritt",
    "espn": "4575131",
    "status": "IR",
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 0,
    "avg": 8.48,
    "last": 0
  },
  {
    "name": "Brian Thomas Jr.",
    "espn": "4432773",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 46.2,
    "avg": 3.59,
    "last": 0
  },
  {
    "name": "Malik Washington",
    "espn": "4569603",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 66.45,
    "avg": 7.41,
    "last": 3.1
  },
  {
    "name": "Jordyn Tyson",
    "espn": "4880281",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 59.15,
    "avg": 3,
    "last": 3
  },
  {
    "name": "Cairo Santos",
    "espn": "17427",
    "status": null,
    "team_abbr": "CHI",
    "pos": "K",
    "fpts": 73.65,
    "avg": 8.78,
    "last": 9
  },
  {
    "name": "Lions",
    "status": null,
    "team_abbr": "DET",
    "pos": "D/ST",
    "fpts": 46.54,
    "avg": 4.75,
    "last": 10
  },
  {
    "name": "Dominic Zvada",
    "espn": "5082424",
    "status": null,
    "team_abbr": "NYG",
    "pos": "K",
    "fpts": 94.81,
    "avg": 9.25,
    "last": 17
  },
  {
    "name": "Kaelon Black",
    "espn": "4696044",
    "status": null,
    "team_abbr": "SF",
    "pos": "RB",
    "fpts": 59.16,
    "avg": 4.52,
    "last": 7
  },
  {
    "name": "Bengals",
    "status": null,
    "team_abbr": "CIN",
    "pos": "D/ST",
    "fpts": 49.08,
    "avg": 6.63,
    "last": 3
  },
  {
    "name": "Terry McLaurin",
    "espn": "3121422",
    "status": "IR",
    "team_abbr": "WSH",
    "pos": "WR",
    "fpts": 0,
    "avg": 7.7,
    "last": 0
  },
  {
    "name": "Eddy Pineiro",
    "espn": "4034949",
    "status": null,
    "team_abbr": "SF",
    "pos": "K",
    "fpts": 61.81,
    "avg": 6.13,
    "last": 8
  },
  {
    "name": "Emanuel Wilson",
    "espn": "4887558",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 0,
    "avg": 8.98,
    "last": 0
  },
  {
    "name": "J.J. McCarthy",
    "espn": "4433970",
    "status": "Q",
    "team_abbr": "NYG",
    "pos": "QB",
    "fpts": 135.66,
    "avg": 8.5,
    "last": 7.28
  },
  {
    "name": "Jonathon Brooks",
    "espn": "4678008",
    "status": "IR",
    "team_abbr": "CAR",
    "pos": "RB",
    "fpts": 0,
    "avg": 4.15,
    "last": 0
  },
  {
    "name": "Eagles",
    "status": null,
    "team_abbr": "PHI",
    "pos": "D/ST",
    "fpts": 43.22,
    "avg": 2.22,
    "last": 10
  },
  {
    "name": "Bills",
    "status": null,
    "team_abbr": "BUF",
    "pos": "D/ST",
    "fpts": 43.44,
    "avg": 3.71,
    "last": 16
  },
  {
    "name": "Aaron Rodgers",
    "espn": "8439",
    "status": "BYE",
    "team_abbr": "PIT",
    "pos": "QB",
    "fpts": 140.92,
    "avg": 14.64,
    "last": 4.88
  },
  {
    "name": "Justin Herbert",
    "espn": "4038941",
    "status": "Q",
    "team_abbr": "LAC",
    "pos": "QB",
    "fpts": 103.3,
    "avg": 10.08,
    "last": 10.42
  },
  {
    "name": "MarShawn Lloyd",
    "espn": "4429023",
    "status": "OUT",
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 28.49,
    "avg": 5.66,
    "last": 0
  },
  {
    "name": "Buccaneers",
    "status": null,
    "team_abbr": "TB",
    "pos": "D/ST",
    "fpts": 57.46,
    "avg": 10.33,
    "last": 11
  }
];
