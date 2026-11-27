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
        "name": "Joe Burrow",
        "espn": "3915511",
        "status": null,
        "team_abbr": "CIN",
        "pos": "QB",
        "fpts": 159.03,
        "avg": 25.22,
        "last": 19.9
      },
      {
        "name": "Jahmyr Gibbs",
        "espn": "4429795",
        "status": null,
        "team_abbr": "DET",
        "pos": "RB",
        "fpts": 166.14,
        "avg": 27.67,
        "last": 45.7
      },
      {
        "name": "Blake Corum",
        "espn": "4429096",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 76.33,
        "avg": 12.41,
        "last": 27.5
      },
      {
        "name": "CeeDee Lamb",
        "espn": "4241389",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 99.19,
        "avg": 18.76,
        "last": 16.9
      },
      {
        "name": "Justin Jefferson",
        "espn": "4262921",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 112.57,
        "avg": 11.31,
        "last": 10.2
      },
      {
        "name": "Parker Washington",
        "espn": "4432620",
        "status": "Q",
        "team_abbr": "JAX",
        "pos": "WR",
        "fpts": 98.38,
        "avg": 13.41,
        "last": 14.3
      },
      {
        "name": "Trey McBride",
        "espn": "4361307",
        "status": null,
        "team_abbr": "ARI",
        "pos": "TE",
        "fpts": 69.38,
        "avg": 12.98,
        "last": 10.3
      },
      {
        "name": "James Cook III",
        "espn": "4379399",
        "status": null,
        "team_abbr": "BUF",
        "pos": "RB",
        "fpts": 118.34,
        "avg": 18.12,
        "last": 19
      },
      {
        "name": "D'Andre Swift",
        "espn": "4259545",
        "status": null,
        "team_abbr": "CHI",
        "pos": "RB",
        "fpts": 89.88,
        "avg": 16.22,
        "last": 25.7
      },
      {
        "name": "Trevor Lawrence",
        "espn": "4360310",
        "status": null,
        "team_abbr": "JAX",
        "pos": "QB",
        "fpts": 137.69,
        "avg": 18.67,
        "last": 12.74
      },
      {
        "name": "Rams",
        "status": null,
        "team_abbr": "LAR",
        "pos": "D/ST",
        "fpts": 47.81,
        "avg": 6.91,
        "last": 12
      },
      {
        "name": "Brandon Aubrey",
        "espn": "3953687",
        "status": null,
        "team_abbr": "DAL",
        "pos": "K",
        "fpts": 59.22,
        "avg": 9.25,
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
        "fpts": 59.18,
        "avg": 9.77,
        "last": 10.8
      },
      {
        "name": "Michael Wilson",
        "espn": "4360761",
        "status": "IR",
        "team_abbr": "ARI",
        "pos": "WR",
        "fpts": 0,
        "avg": 10.58,
        "last": 0
      },
      {
        "name": "Germie Bernard",
        "espn": "4685261",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 38.75,
        "avg": 5.88,
        "last": 7
      },
      {
        "name": "Jordan Love",
        "espn": "4036378",
        "status": null,
        "team_abbr": "GB",
        "pos": "QB",
        "fpts": 118.96,
        "avg": 18.59,
        "last": 8.62
      },
      {
        "name": "DJ Moore",
        "espn": "3915416",
        "status": null,
        "team_abbr": "BUF",
        "pos": "WR",
        "fpts": 79.33,
        "avg": 9.89,
        "last": 2.5
      },
      {
        "name": "Chiefs",
        "status": null,
        "team_abbr": "KC",
        "pos": "D/ST",
        "fpts": 48.11,
        "avg": 7.09,
        "last": 11
      }
    ],
    "ir": [
      {
        "name": "Puka Nacua",
        "espn": "4426515",
        "status": "IR",
        "team_abbr": "LAR",
        "pos": "WR",
        "fpts": 0,
        "avg": 19.8,
        "last": 0
      }
    ]
  },
  "peters": {
    "starters": [
      {
        "name": "Jared Goff",
        "espn": "3046779",
        "status": null,
        "team_abbr": "DET",
        "pos": "QB",
        "fpts": 120.66,
        "avg": 18.54,
        "last": 15.82
      },
      {
        "name": "Derrick Henry",
        "espn": "3043078",
        "status": "Q",
        "team_abbr": "BAL",
        "pos": "RB",
        "fpts": 80.25,
        "avg": 15.44,
        "last": 17.1
      },
      {
        "name": "Tony Pollard",
        "espn": "3916148",
        "status": null,
        "team_abbr": "TEN",
        "pos": "RB",
        "fpts": 108.98,
        "avg": 14.04,
        "last": 11
      },
      {
        "name": "Ja'Marr Chase",
        "espn": "4362628",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 141.71,
        "avg": 16.74,
        "last": 5.6
      },
      {
        "name": "Rashee Rice",
        "espn": "4428331",
        "status": null,
        "team_abbr": "KC",
        "pos": "WR",
        "fpts": 64.06,
        "avg": 8.4,
        "last": 2.9
      },
      {
        "name": "DK Metcalf",
        "espn": "4047650",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 67.71,
        "avg": 7.65,
        "last": 0.7
      },
      {
        "name": "George Kittle",
        "espn": "3040151",
        "status": null,
        "team_abbr": "SF",
        "pos": "TE",
        "fpts": 77.97,
        "avg": 12.26,
        "last": 16.9
      },
      {
        "name": "Breece Hall",
        "espn": "4427366",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "RB",
        "fpts": 73.3,
        "avg": 13,
        "last": 17.5
      },
      {
        "name": "Bucky Irving",
        "espn": "4596448",
        "status": null,
        "team_abbr": "TB",
        "pos": "RB",
        "fpts": 131.22,
        "avg": 16.56,
        "last": 17.5
      },
      {
        "name": "Patrick Mahomes",
        "espn": "3139477",
        "status": null,
        "team_abbr": "KC",
        "pos": "QB",
        "fpts": 137.19,
        "avg": 19.05,
        "last": 7.16
      },
      {
        "name": "Ravens",
        "status": null,
        "team_abbr": "BAL",
        "pos": "D/ST",
        "fpts": 35.79,
        "avg": 4.18,
        "last": 9
      },
      {
        "name": "Jason Myers",
        "espn": "2473037",
        "status": null,
        "team_abbr": "SEA",
        "pos": "K",
        "fpts": 53.56,
        "avg": 7.7,
        "last": 2
      }
    ],
    "bench": [
      {
        "name": "Seahawks",
        "status": null,
        "team_abbr": "SEA",
        "pos": "D/ST",
        "fpts": 51.74,
        "avg": 8.9,
        "last": 12
      },
      {
        "name": "Kenneth Walker III",
        "espn": "4567048",
        "status": "OUT",
        "team_abbr": "KC",
        "pos": "RB",
        "fpts": 132.36,
        "avg": 22.92,
        "last": 0
      },
      {
        "name": "Dak Prescott",
        "espn": "2577417",
        "status": null,
        "team_abbr": "DAL",
        "pos": "QB",
        "fpts": 107.05,
        "avg": 21.94,
        "last": 25.54
      },
      {
        "name": "Harold Fannin Jr.",
        "espn": "5083076",
        "status": null,
        "team_abbr": "CLE",
        "pos": "TE",
        "fpts": 56.88,
        "avg": 9.64,
        "last": 12.6
      },
      {
        "name": "Mike Evans",
        "espn": "16737",
        "status": "Q",
        "team_abbr": "SF",
        "pos": "WR",
        "fpts": 90.93,
        "avg": 13.63,
        "last": 19.9
      },
      {
        "name": "Denzel Boston",
        "espn": "4832800",
        "status": "Q",
        "team_abbr": "CLE",
        "pos": "WR",
        "fpts": 70.51,
        "avg": 8.88,
        "last": 2.1
      }
    ],
    "ir": []
  },
  "sierra": {
    "starters": [
      {
        "name": "C.J. Stroud",
        "espn": "4432577",
        "status": null,
        "team_abbr": "HOU",
        "pos": "QB",
        "fpts": 139.64,
        "avg": 20.49,
        "last": 20.46
      },
      {
        "name": "Chuba Hubbard",
        "espn": "4241416",
        "status": null,
        "team_abbr": "CAR",
        "pos": "RB",
        "fpts": 120.92,
        "avg": 19.13,
        "last": 26
      },
      {
        "name": "Ashton Jeanty",
        "espn": "4890973",
        "status": null,
        "team_abbr": "LV",
        "pos": "RB",
        "fpts": 83.81,
        "avg": 13.83,
        "last": 25.4
      },
      {
        "name": "Malik Nabers",
        "espn": "4595348",
        "status": null,
        "team_abbr": "NYG",
        "pos": "WR",
        "fpts": 92.99,
        "avg": 12.32,
        "last": 15
      },
      {
        "name": "Tee Higgins",
        "espn": "4239993",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 88.56,
        "avg": 15.62,
        "last": 11.3
      },
      {
        "name": "Jalen Coker",
        "espn": "4695883",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 54.91,
        "avg": 8.61,
        "last": 6.7
      },
      {
        "name": "Isaiah Likely",
        "espn": "4361050",
        "status": "Q",
        "team_abbr": "NYG",
        "pos": "TE",
        "fpts": 67.86,
        "avg": 13.3,
        "last": 4
      },
      {
        "name": "Jaylen Warren",
        "espn": "4569987",
        "status": null,
        "team_abbr": "PIT",
        "pos": "RB",
        "fpts": 93.04,
        "avg": 13.88,
        "last": 3.9
      },
      {
        "name": "Jonah Coleman",
        "espn": "4702555",
        "status": null,
        "team_abbr": "DEN",
        "pos": "RB",
        "fpts": 106.19,
        "avg": 14.88,
        "last": 32.9
      },
      {
        "name": "Fernando Mendoza",
        "espn": "4837248",
        "status": null,
        "team_abbr": "LV",
        "pos": "QB",
        "fpts": 107.63,
        "avg": 7.8,
        "last": 22.88
      },
      {
        "name": "Vikings",
        "status": null,
        "team_abbr": "MIN",
        "pos": "D/ST",
        "fpts": 46.55,
        "avg": 10.6,
        "last": 0
      },
      {
        "name": "Ka'imi Fairbairn",
        "espn": "2971573",
        "status": null,
        "team_abbr": "HOU",
        "pos": "K",
        "fpts": 65.33,
        "avg": 10.5,
        "last": 6
      }
    ],
    "bench": [
      {
        "name": "Bo Nix",
        "espn": "4426338",
        "status": null,
        "team_abbr": "DEN",
        "pos": "QB",
        "fpts": 122.21,
        "avg": 14.23,
        "last": 11.5
      },
      {
        "name": "Jaxon Smith-Njigba",
        "espn": "4430878",
        "status": "Q",
        "team_abbr": "SEA",
        "pos": "WR",
        "fpts": 122.36,
        "avg": 22.37,
        "last": 27.1
      },
      {
        "name": "49ers",
        "status": null,
        "team_abbr": "SF",
        "pos": "D/ST",
        "fpts": 53.68,
        "avg": 8.1,
        "last": 14
      },
      {
        "name": "Drake London",
        "espn": "4426502",
        "status": null,
        "team_abbr": "ATL",
        "pos": "WR",
        "fpts": 85.5,
        "avg": 11.35,
        "last": 13.9
      },
      {
        "name": "Chase Brown",
        "espn": "4362238",
        "status": null,
        "team_abbr": "CIN",
        "pos": "RB",
        "fpts": 91.63,
        "avg": 11.23,
        "last": 6.1
      },
      {
        "name": "Rhamondre Stevenson",
        "espn": "4569173",
        "status": null,
        "team_abbr": "NE",
        "pos": "RB",
        "fpts": 74.96,
        "avg": 10.17,
        "last": 1
      }
    ],
    "ir": []
  },
  "puntos": {
    "starters": [
      {
        "name": "Caleb Williams",
        "espn": "4431611",
        "status": "Q",
        "team_abbr": "CHI",
        "pos": "QB",
        "fpts": 109.98,
        "avg": 18.75,
        "last": 25.3
      },
      {
        "name": "Kyren Williams",
        "espn": "4430737",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 92.86,
        "avg": 14.53,
        "last": 14.5
      },
      {
        "name": "Bhayshul Tuten",
        "espn": "4882093",
        "status": "Q",
        "team_abbr": "JAX",
        "pos": "RB",
        "fpts": 106,
        "avg": 14.53,
        "last": 6.8
      },
      {
        "name": "Christian Watson",
        "espn": "4248528",
        "status": "Q",
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 85.38,
        "avg": 15.65,
        "last": 14.5
      },
      {
        "name": "Stefon Diggs",
        "espn": "2976212",
        "status": null,
        "team_abbr": "WSH",
        "pos": "WR",
        "fpts": 70.76,
        "avg": 11.01,
        "last": 6.5
      },
      {
        "name": "Jameson Williams",
        "espn": "4426388",
        "status": null,
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 73.41,
        "avg": 11.55,
        "last": 11
      },
      {
        "name": "Travis Kelce",
        "espn": "15847",
        "status": null,
        "team_abbr": "KC",
        "pos": "TE",
        "fpts": 71.31,
        "avg": 10.75,
        "last": 9.1
      },
      {
        "name": "Bijan Robinson",
        "espn": "4430807",
        "status": null,
        "team_abbr": "ATL",
        "pos": "RB",
        "fpts": 127.09,
        "avg": 18.02,
        "last": 15.7
      },
      {
        "name": "Cam Skattebo",
        "espn": "4696981",
        "status": null,
        "team_abbr": "NYG",
        "pos": "RB",
        "fpts": 102.1,
        "avg": 10.54,
        "last": 4.3
      },
      {
        "name": "Brock Purdy",
        "espn": "4361741",
        "status": "Q",
        "team_abbr": "SF",
        "pos": "QB",
        "fpts": 142.98,
        "avg": 22.52,
        "last": 22.2
      },
      {
        "name": "Jaguars",
        "status": null,
        "team_abbr": "JAX",
        "pos": "D/ST",
        "fpts": 46.08,
        "avg": 7.5,
        "last": 5
      },
      {
        "name": "Cam Little",
        "espn": "4686361",
        "status": null,
        "team_abbr": "JAX",
        "pos": "K",
        "fpts": 80.93,
        "avg": 11.1,
        "last": 13
      }
    ],
    "bench": [
      {
        "name": "Sam LaPorta",
        "espn": "4430027",
        "status": null,
        "team_abbr": "DET",
        "pos": "TE",
        "fpts": 63.03,
        "avg": 8.89,
        "last": 12.4
      },
      {
        "name": "Matthew Golden",
        "espn": "4701936",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 102.87,
        "avg": 13.75,
        "last": 4.4
      },
      {
        "name": "Luther Burden III",
        "espn": "4685278",
        "status": null,
        "team_abbr": "CHI",
        "pos": "WR",
        "fpts": 71.64,
        "avg": 10.92,
        "last": 6
      },
      {
        "name": "Zay Flowers",
        "espn": "4429615",
        "status": null,
        "team_abbr": "BAL",
        "pos": "WR",
        "fpts": 68.67,
        "avg": 12.68,
        "last": 12.4
      },
      {
        "name": "Ollie Gordon II",
        "espn": "4711533",
        "status": null,
        "team_abbr": "MIA",
        "pos": "RB",
        "fpts": 77.32,
        "avg": 9.73,
        "last": 7.7
      },
      {
        "name": "Deebo Samuel Sr.",
        "espn": "3126486",
        "status": null,
        "team_abbr": "SF",
        "pos": "WR",
        "fpts": 69.18,
        "avg": 11.86,
        "last": 6.2
      }
    ],
    "ir": [
      {
        "name": "Davante Adams",
        "espn": "16800",
        "status": "IR",
        "team_abbr": "LAR",
        "pos": "WR",
        "fpts": 67.96,
        "avg": 14.5,
        "last": 0
      }
    ]
  },
  "hobbit": {
    "starters": [
      {
        "name": "Josh Allen",
        "espn": "3918298",
        "status": null,
        "team_abbr": "BUF",
        "pos": "QB",
        "fpts": 146.44,
        "avg": 21.66,
        "last": 3.54
      },
      {
        "name": "Saquon Barkley",
        "espn": "3929630",
        "status": "Q",
        "team_abbr": "PHI",
        "pos": "RB",
        "fpts": 78.22,
        "avg": 7.71,
        "last": 0.7
      },
      {
        "name": "Javonte Williams",
        "espn": "4361579",
        "status": null,
        "team_abbr": "DAL",
        "pos": "RB",
        "fpts": 83.75,
        "avg": 17.43,
        "last": 31.8
      },
      {
        "name": "Amon-Ra St. Brown",
        "espn": "4374302",
        "status": null,
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 102.6,
        "avg": 16.47,
        "last": 18.1
      },
      {
        "name": "George Pickens",
        "espn": "4426354",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 73.27,
        "avg": 13.85,
        "last": 9.2
      },
      {
        "name": "Nico Collins",
        "espn": "4258173",
        "status": null,
        "team_abbr": "HOU",
        "pos": "WR",
        "fpts": 86.51,
        "avg": 13.85,
        "last": 13.3
      },
      {
        "name": "Brock Bowers",
        "espn": "4432665",
        "status": "Q",
        "team_abbr": "LV",
        "pos": "TE",
        "fpts": 79.63,
        "avg": 15.6,
        "last": 0
      },
      {
        "name": "Christian McCaffrey",
        "espn": "3117251",
        "status": null,
        "team_abbr": "SF",
        "pos": "RB",
        "fpts": 123.8,
        "avg": 20.62,
        "last": 13.2
      },
      {
        "name": "Jonathan Taylor",
        "espn": "4242335",
        "status": null,
        "team_abbr": "IND",
        "pos": "RB",
        "fpts": 76.88,
        "avg": 14.24,
        "last": 4.7
      },
      {
        "name": "Jayden Daniels",
        "espn": "4426348",
        "status": null,
        "team_abbr": "WSH",
        "pos": "QB",
        "fpts": 141.18,
        "avg": 19.13,
        "last": 17.06
      },
      {
        "name": "Commanders",
        "status": null,
        "team_abbr": "WSH",
        "pos": "D/ST",
        "fpts": 33.73,
        "avg": 4.9,
        "last": 3
      },
      {
        "name": "Will Reichard",
        "espn": "4567104",
        "status": null,
        "team_abbr": "MIN",
        "pos": "K",
        "fpts": 74.59,
        "avg": 10.4,
        "last": 3
      }
    ],
    "bench": [
      {
        "name": "Chris Olave",
        "espn": "4361370",
        "status": null,
        "team_abbr": "NO",
        "pos": "WR",
        "fpts": 83.78,
        "avg": 13.26,
        "last": 14.7
      },
      {
        "name": "Kyle Pitts Sr.",
        "espn": "4360248",
        "status": null,
        "team_abbr": "ATL",
        "pos": "TE",
        "fpts": 48.78,
        "avg": 6.35,
        "last": 5
      },
      {
        "name": "Tetairoa McMillan",
        "espn": "4685472",
        "status": "Q",
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 81.12,
        "avg": 12.26,
        "last": 16.1
      },
      {
        "name": "Garrett Wilson",
        "espn": "4569618",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 69.04,
        "avg": 10.97,
        "last": 5.4
      },
      {
        "name": "Bryce Young",
        "espn": "4685720",
        "status": null,
        "team_abbr": "CAR",
        "pos": "QB",
        "fpts": 108.32,
        "avg": 17.06,
        "last": 15.96
      },
      {
        "name": "Tyler Bass",
        "espn": "3917232",
        "status": null,
        "team_abbr": "BUF",
        "pos": "K",
        "fpts": 81.41,
        "avg": 11.45,
        "last": 11
      }
    ],
    "ir": [
      {
        "name": "Jeremiyah Love",
        "espn": "4870808",
        "status": "IR",
        "team_abbr": "ARI",
        "pos": "RB",
        "fpts": 41.27,
        "avg": 7.98,
        "last": 0
      }
    ]
  }
};

window.FREE_AGENTS = [
  {
    "name": "Colston Loveland",
    "espn": "4723086",
    "status": "Q",
    "team_abbr": "CHI",
    "pos": "TE",
    "fpts": 56.86,
    "avg": 6.75,
    "last": -1
  },
  {
    "name": "DeVonta Smith",
    "espn": "4241478",
    "status": "Q",
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 72.73,
    "avg": 16.68,
    "last": 37.5
  },
  {
    "name": "Quinshon Judkins",
    "espn": "4685702",
    "status": null,
    "team_abbr": "CLE",
    "pos": "RB",
    "fpts": 79.92,
    "avg": 10.63,
    "last": 14.6
  },
  {
    "name": "Emmett Johnson",
    "espn": "4832955",
    "status": null,
    "team_abbr": "KC",
    "pos": "RB",
    "fpts": 59.52,
    "avg": 11.44,
    "last": 17.6
  },
  {
    "name": "Omarion Hampton",
    "espn": "4685382",
    "status": null,
    "team_abbr": "LAC",
    "pos": "RB",
    "fpts": 77.03,
    "avg": 8.95,
    "last": 9.8
  },
  {
    "name": "Tyler Warren",
    "espn": "4431459",
    "status": null,
    "team_abbr": "IND",
    "pos": "TE",
    "fpts": 36.03,
    "avg": 7.69,
    "last": 2.7
  },
  {
    "name": "Emeka Egbuka",
    "espn": "4567750",
    "status": null,
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 60.03,
    "avg": 8.16,
    "last": 2.8
  },
  {
    "name": "Texans",
    "status": null,
    "team_abbr": "HOU",
    "pos": "D/ST",
    "fpts": 43.49,
    "avg": 6.1,
    "last": 15
  },
  {
    "name": "Josh Jacobs",
    "espn": "4047365",
    "status": "OUT",
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 87.63,
    "avg": 12.77,
    "last": 0
  },
  {
    "name": "Rome Odunze",
    "espn": "4431299",
    "status": null,
    "team_abbr": "CHI",
    "pos": "WR",
    "fpts": 61.66,
    "avg": 9.36,
    "last": 23.7
  },
  {
    "name": "Tucker Kraft",
    "espn": "4572680",
    "status": null,
    "team_abbr": "GB",
    "pos": "TE",
    "fpts": 53.91,
    "avg": 6.97,
    "last": 1.9
  },
  {
    "name": "David Montgomery",
    "espn": "4035538",
    "status": null,
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 70.06,
    "avg": 9.32,
    "last": 13.9
  },
  {
    "name": "T.J. Hockenson",
    "espn": "4036133",
    "status": null,
    "team_abbr": "MIN",
    "pos": "TE",
    "fpts": 57.94,
    "avg": 8.53,
    "last": 8.5
  },
  {
    "name": "Carnell Tate",
    "espn": "4871023",
    "status": null,
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 72.77,
    "avg": 9.14,
    "last": 12.8
  },
  {
    "name": "Travis Etienne Jr.",
    "espn": "4239996",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 78.21,
    "avg": 7.58,
    "last": 7.6
  },
  {
    "name": "Steelers",
    "status": null,
    "team_abbr": "PIT",
    "pos": "D/ST",
    "fpts": 49.33,
    "avg": 7.3,
    "last": 7
  },
  {
    "name": "Ladd McConkey",
    "espn": "4612826",
    "status": null,
    "team_abbr": "LAC",
    "pos": "WR",
    "fpts": 66.97,
    "avg": 8.76,
    "last": 18.2
  },
  {
    "name": "Jaylen Waddle",
    "espn": "4372016",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 62.63,
    "avg": 7.46,
    "last": 7.6
  },
  {
    "name": "Broncos",
    "status": null,
    "team_abbr": "DEN",
    "pos": "D/ST",
    "fpts": 42.6,
    "avg": 6.8,
    "last": 12
  },
  {
    "name": "Matthew Stafford",
    "espn": "12483",
    "status": null,
    "team_abbr": "LAR",
    "pos": "QB",
    "fpts": 99.93,
    "avg": 15.11,
    "last": 3.6
  },
  {
    "name": "Zach Charbonnet",
    "espn": "4426385",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 85.94,
    "avg": 7.63,
    "last": 9.4
  },
  {
    "name": "A.J. Brown",
    "espn": "4047646",
    "status": "D",
    "team_abbr": "NE",
    "pos": "WR",
    "fpts": 23.76,
    "avg": 4.58,
    "last": 3.7
  },
  {
    "name": "Josh Downs",
    "espn": "4688813",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 49.51,
    "avg": 6.8,
    "last": 1.8
  },
  {
    "name": "Jakobi Meyers",
    "espn": "3916433",
    "status": "Q",
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 66.48,
    "avg": 7.8,
    "last": 10.5
  },
  {
    "name": "Dalton Kincaid",
    "espn": "4385690",
    "status": null,
    "team_abbr": "BUF",
    "pos": "TE",
    "fpts": 49.48,
    "avg": 7.9,
    "last": 2.3
  },
  {
    "name": "Jadarian Price",
    "espn": "4685512",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 53.73,
    "avg": 5.34,
    "last": 10.9
  },
  {
    "name": "Kyle Monangai",
    "espn": "4608686",
    "status": null,
    "team_abbr": "CHI",
    "pos": "RB",
    "fpts": 51.24,
    "avg": 12.33,
    "last": 15.4
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
    "name": "Dallas Goedert",
    "espn": "3121023",
    "status": "Q",
    "team_abbr": "PHI",
    "pos": "TE",
    "fpts": 39.84,
    "avg": 7.13,
    "last": 1.4
  },
  {
    "name": "Drake Maye",
    "espn": "4431452",
    "status": "OUT",
    "team_abbr": "NE",
    "pos": "QB",
    "fpts": 0,
    "avg": 18.22,
    "last": 3.02
  },
  {
    "name": "Spencer Shrader",
    "espn": "4571557",
    "status": null,
    "team_abbr": "IND",
    "pos": "K",
    "fpts": 56.37,
    "avg": 10.27,
    "last": 1
  },
  {
    "name": "Kirk Cousins",
    "espn": "14880",
    "status": null,
    "team_abbr": "MIN",
    "pos": "QB",
    "fpts": 113.11,
    "avg": 17.73,
    "last": 7.4
  },
  {
    "name": "KC Concepcion",
    "espn": "4870653",
    "status": null,
    "team_abbr": "CLE",
    "pos": "WR",
    "fpts": 59.37,
    "avg": 8.01,
    "last": 10.2
  },
  {
    "name": "Jordyn Tyson",
    "espn": "4880281",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 56.41,
    "avg": 6,
    "last": 1.5
  },
  {
    "name": "Rico Dowdle",
    "espn": "4038815",
    "status": null,
    "team_abbr": "PIT",
    "pos": "RB",
    "fpts": 53.31,
    "avg": 6.84,
    "last": 5.4
  },
  {
    "name": "Braelon Allen",
    "espn": "4685247",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "RB",
    "fpts": 45.68,
    "avg": 9.95,
    "last": 8.9
  },
  {
    "name": "Woody Marks",
    "espn": "4429059",
    "status": "Q",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 51.15,
    "avg": 7.82,
    "last": 0
  },
  {
    "name": "Jacory Croskey-Merritt",
    "espn": "4575131",
    "status": null,
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 68.25,
    "avg": 9.52,
    "last": 14.7
  },
  {
    "name": "Khalil Shakir",
    "espn": "4373678",
    "status": null,
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 55.68,
    "avg": 7.71,
    "last": 4.8
  },
  {
    "name": "Chig Okonkwo",
    "espn": "4360635",
    "status": null,
    "team_abbr": "WSH",
    "pos": "TE",
    "fpts": 50.34,
    "avg": 5.8,
    "last": 8.6
  },
  {
    "name": "Courtland Sutton",
    "espn": "3128429",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 46.87,
    "avg": 5.11,
    "last": 0
  },
  {
    "name": "Jordan Addison",
    "espn": "4429205",
    "status": "D",
    "team_abbr": "MIN",
    "pos": "WR",
    "fpts": 57.49,
    "avg": 6.41,
    "last": 0
  },
  {
    "name": "Chris Boswell",
    "espn": "17372",
    "status": null,
    "team_abbr": "PIT",
    "pos": "K",
    "fpts": 72.63,
    "avg": 9.5,
    "last": 13
  },
  {
    "name": "Tyler Shough",
    "espn": "4360689",
    "status": null,
    "team_abbr": "NO",
    "pos": "QB",
    "fpts": 107.26,
    "avg": 16.99,
    "last": 14.28
  },
  {
    "name": "Kenny Gainwell",
    "espn": "4371733",
    "status": null,
    "team_abbr": "TB",
    "pos": "RB",
    "fpts": 55.2,
    "avg": 6.4,
    "last": 7.9
  },
  {
    "name": "Cameron Dicker",
    "espn": "4362081",
    "status": null,
    "team_abbr": "LAC",
    "pos": "K",
    "fpts": 62.01,
    "avg": 7.9,
    "last": 8
  },
  {
    "name": "Jordan Mason",
    "espn": "4360569",
    "status": null,
    "team_abbr": "MIN",
    "pos": "RB",
    "fpts": 67.95,
    "avg": 6,
    "last": 4.2
  },
  {
    "name": "Mark Andrews",
    "espn": "3116365",
    "status": null,
    "team_abbr": "BAL",
    "pos": "TE",
    "fpts": 30.33,
    "avg": 5.25,
    "last": 2.4
  },
  {
    "name": "Alvin Kamara",
    "espn": "3054850",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 29.67,
    "avg": 9.2,
    "last": 6.7
  },
  {
    "name": "Rachaad White",
    "espn": "4697815",
    "status": null,
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 9.72,
    "avg": 7.38,
    "last": 0
  },
  {
    "name": "Xavier Worthy",
    "espn": "4683062",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 38.47,
    "avg": 5.55,
    "last": 0
  },
  {
    "name": "Bills",
    "status": null,
    "team_abbr": "BUF",
    "pos": "D/ST",
    "fpts": 43.24,
    "avg": 6.09,
    "last": 6
  },
  {
    "name": "Antonio Williams",
    "espn": "5081432",
    "status": null,
    "team_abbr": "WSH",
    "pos": "WR",
    "fpts": 63.68,
    "avg": 7.53,
    "last": 16.7
  },
  {
    "name": "Bears",
    "status": null,
    "team_abbr": "CHI",
    "pos": "D/ST",
    "fpts": 35.52,
    "avg": 7.27,
    "last": -4
  },
  {
    "name": "Tank Dell",
    "espn": "4366031",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 51.09,
    "avg": 7.83,
    "last": 4.2
  },
  {
    "name": "J.K. Dobbins",
    "espn": "4241985",
    "status": "SUSP",
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 15.22,
    "avg": 5.8,
    "last": 0
  },
  {
    "name": "Brenton Strange",
    "espn": "4430539",
    "status": null,
    "team_abbr": "JAX",
    "pos": "TE",
    "fpts": 43,
    "avg": 6.76,
    "last": 3.1
  },
  {
    "name": "Jake Bates",
    "espn": "4689936",
    "status": null,
    "team_abbr": "DET",
    "pos": "K",
    "fpts": 67.08,
    "avg": 9.27,
    "last": 10
  },
  {
    "name": "Tyler Allgeier",
    "espn": "4373626",
    "status": null,
    "team_abbr": "ARI",
    "pos": "RB",
    "fpts": 37.46,
    "avg": 7.54,
    "last": 2.3
  },
  {
    "name": "Harrison Butker",
    "espn": "3055899",
    "status": null,
    "team_abbr": "KC",
    "pos": "K",
    "fpts": 59.61,
    "avg": 7.18,
    "last": 3
  },
  {
    "name": "DeMario Douglas",
    "espn": "4427095",
    "status": null,
    "team_abbr": "NE",
    "pos": "WR",
    "fpts": 42.02,
    "avg": 8.18,
    "last": 0.9
  },
  {
    "name": "Tre Tucker",
    "espn": "4428718",
    "status": null,
    "team_abbr": "LV",
    "pos": "WR",
    "fpts": 42.76,
    "avg": 9.11,
    "last": 6
  },
  {
    "name": "Keenan Allen",
    "espn": "15818",
    "status": null,
    "team_abbr": "SF",
    "pos": "WR",
    "fpts": 41.03,
    "avg": 7.5,
    "last": 5.3
  },
  {
    "name": "RJ Harvey",
    "espn": "4568490",
    "status": "IR",
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 42.71,
    "avg": 9.15,
    "last": 0
  },
  {
    "name": "Marvin Harrison Jr.",
    "espn": "4432708",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 39.98,
    "avg": 4.57,
    "last": 0
  },
  {
    "name": "Lions",
    "status": null,
    "team_abbr": "DET",
    "pos": "D/ST",
    "fpts": 38.1,
    "avg": 5.18,
    "last": 0
  },
  {
    "name": "Hunter Henry",
    "espn": "3046439",
    "status": null,
    "team_abbr": "NE",
    "pos": "TE",
    "fpts": 35.38,
    "avg": 6.73,
    "last": 3.2
  },
  {
    "name": "Adonai Mitchell",
    "espn": "4597500",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "WR",
    "fpts": 52.34,
    "avg": 7.41,
    "last": 4
  },
  {
    "name": "Pat Freiermuth",
    "espn": "4361411",
    "status": null,
    "team_abbr": "PIT",
    "pos": "TE",
    "fpts": 41.9,
    "avg": 8.35,
    "last": 6.5
  },
  {
    "name": "TreVeyon Henderson",
    "espn": "4432710",
    "status": "IR",
    "team_abbr": "NE",
    "pos": "RB",
    "fpts": 0,
    "avg": 5.22,
    "last": 0
  },
  {
    "name": "Deshaun Watson",
    "espn": "3122840",
    "status": null,
    "team_abbr": "CLE",
    "pos": "QB",
    "fpts": 115.04,
    "avg": 15.48,
    "last": 21.38
  },
  {
    "name": "Buccaneers",
    "status": null,
    "team_abbr": "TB",
    "pos": "D/ST",
    "fpts": 46.73,
    "avg": 9.2,
    "last": -1
  },
  {
    "name": "Makai Lemon",
    "espn": "4870795",
    "status": null,
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 33.25,
    "avg": 6.33,
    "last": 13.6
  },
  {
    "name": "Giants",
    "status": null,
    "team_abbr": "NYG",
    "pos": "D/ST",
    "fpts": 40.85,
    "avg": 6.1,
    "last": 6
  },
  {
    "name": "Ryan Flournoy",
    "espn": "5083754",
    "status": null,
    "team_abbr": "DAL",
    "pos": "WR",
    "fpts": 37.99,
    "avg": 7.13,
    "last": 0
  },
  {
    "name": "Alec Pierce",
    "espn": "4360078",
    "status": "IR",
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 0,
    "avg": 4.85,
    "last": 0
  },
  {
    "name": "Caleb Douglas",
    "espn": "4869645",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 59.11,
    "avg": 9.1,
    "last": 4
  },
  {
    "name": "Xavier Hutchinson",
    "espn": "4686422",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 51.17,
    "avg": 7.04,
    "last": 2.3
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
    "name": "Omar Cooper Jr.",
    "espn": "4723820",
    "status": "Q",
    "team_abbr": "NYJ",
    "pos": "WR",
    "fpts": 43.4,
    "avg": 8.77,
    "last": 0
  },
  {
    "name": "Bengals",
    "status": null,
    "team_abbr": "CIN",
    "pos": "D/ST",
    "fpts": 40.13,
    "avg": 5.8,
    "last": 0
  },
  {
    "name": "Wan'Dale Robinson",
    "espn": "4569587",
    "status": "IR",
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 0,
    "avg": 6.92,
    "last": 0
  },
  {
    "name": "Dominic Zvada",
    "espn": "5082424",
    "status": null,
    "team_abbr": "NYG",
    "pos": "K",
    "fpts": 73.21,
    "avg": 9.1,
    "last": 15
  },
  {
    "name": "Chris Godwin Jr.",
    "espn": "3116165",
    "status": null,
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 32.68,
    "avg": 4.62,
    "last": 2.8
  },
  {
    "name": "Michael Pittman Jr.",
    "espn": "4035687",
    "status": null,
    "team_abbr": "PIT",
    "pos": "WR",
    "fpts": 27.25,
    "avg": 4.13,
    "last": 0
  },
  {
    "name": "Kaelon Black",
    "espn": "4696044",
    "status": null,
    "team_abbr": "SF",
    "pos": "RB",
    "fpts": 46.88,
    "avg": 5.18,
    "last": 2
  },
  {
    "name": "Justin Herbert",
    "espn": "4038941",
    "status": "Q",
    "team_abbr": "LAC",
    "pos": "QB",
    "fpts": 98.5,
    "avg": 11.93,
    "last": 22.44
  },
  {
    "name": "Mike Gesicki",
    "espn": "3116164",
    "status": null,
    "team_abbr": "CIN",
    "pos": "TE",
    "fpts": 42.9,
    "avg": 8.23,
    "last": 10.2
  },
  {
    "name": "Devaughn Vele",
    "espn": "4569559",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 42.46,
    "avg": 8.55,
    "last": 11.1
  },
  {
    "name": "Justice Hill",
    "espn": "4038441",
    "status": null,
    "team_abbr": "BAL",
    "pos": "RB",
    "fpts": 47.82,
    "avg": 6.64,
    "last": 15.6
  },
  {
    "name": "Browns",
    "status": null,
    "team_abbr": "CLE",
    "pos": "D/ST",
    "fpts": 36.84,
    "avg": 5.7,
    "last": 5
  },
  {
    "name": "Chase McLaughlin",
    "espn": "3150744",
    "status": null,
    "team_abbr": "TB",
    "pos": "K",
    "fpts": 62.6,
    "avg": 10.2,
    "last": 3
  },
  {
    "name": "Jets",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "D/ST",
    "fpts": 39.78,
    "avg": 4.64,
    "last": 8
  },
  {
    "name": "Matt Gay",
    "espn": "4249087",
    "status": null,
    "team_abbr": "LV",
    "pos": "K",
    "fpts": 50.35,
    "avg": 9.27,
    "last": 6
  },
  {
    "name": "Juwan Johnson",
    "espn": "3929645",
    "status": "Q",
    "team_abbr": "NO",
    "pos": "TE",
    "fpts": 30.18,
    "avg": 6.87,
    "last": 0
  },
  {
    "name": "Patriots",
    "status": null,
    "team_abbr": "NE",
    "pos": "D/ST",
    "fpts": 24.32,
    "avg": 4.4,
    "last": -2
  },
  {
    "name": "Dylan Sampson",
    "espn": "5081397",
    "status": null,
    "team_abbr": "CLE",
    "pos": "RB",
    "fpts": 57.66,
    "avg": 6.22,
    "last": 5.7
  },
  {
    "name": "Eddy Pineiro",
    "espn": "4034949",
    "status": null,
    "team_abbr": "SF",
    "pos": "K",
    "fpts": 46.71,
    "avg": 6.2,
    "last": 5
  },
  {
    "name": "Jason Sanders",
    "espn": "3124679",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "K",
    "fpts": 61.89,
    "avg": 10.09,
    "last": 11
  },
  {
    "name": "Brian Thomas Jr.",
    "espn": "4432773",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 32.61,
    "avg": 4.14,
    "last": 8.3
  }
];
