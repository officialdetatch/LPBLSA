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
        "fpts": 137.8,
        "avg": 18.67,
        "last": 12.74
      },
      {
        "name": "Jahmyr Gibbs",
        "espn": "4429795",
        "status": null,
        "team_abbr": "DET",
        "pos": "RB",
        "fpts": 166.06,
        "avg": 25.87,
        "last": 25.8
      },
      {
        "name": "James Cook III",
        "espn": "4379399",
        "status": null,
        "team_abbr": "BUF",
        "pos": "RB",
        "fpts": 118.57,
        "avg": 18.03,
        "last": 16.2
      },
      {
        "name": "CeeDee Lamb",
        "espn": "4241389",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 99.29,
        "avg": 18.93,
        "last": 24.7
      },
      {
        "name": "Parker Washington",
        "espn": "4432620",
        "status": null,
        "team_abbr": "JAX",
        "pos": "WR",
        "fpts": 98.41,
        "avg": 13.41,
        "last": 14.3
      },
      {
        "name": "DJ Moore",
        "espn": "3915416",
        "status": null,
        "team_abbr": "BUF",
        "pos": "WR",
        "fpts": 79.76,
        "avg": 10.81,
        "last": 19.1
      },
      {
        "name": "Trey McBride",
        "espn": "4361307",
        "status": null,
        "team_abbr": "ARI",
        "pos": "TE",
        "fpts": 69.47,
        "avg": 12.98,
        "last": 10.3
      },
      {
        "name": "Justin Jefferson",
        "espn": "4262921",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 112.62,
        "avg": 11.31,
        "last": 10.2
      },
      {
        "name": "D'Andre Swift",
        "espn": "4259545",
        "status": null,
        "team_abbr": "CHI",
        "pos": "RB",
        "fpts": 89.8,
        "avg": 15.27,
        "last": 10.9
      },
      {
        "name": "Joe Burrow",
        "espn": "3915511",
        "status": null,
        "team_abbr": "CIN",
        "pos": "QB",
        "fpts": 163.04,
        "avg": 25.22,
        "last": 19.9
      },
      {
        "name": "Chiefs",
        "status": null,
        "team_abbr": "KC",
        "pos": "D/ST",
        "fpts": 47.64,
        "avg": 6.7,
        "last": 8
      },
      {
        "name": "Brandon Aubrey",
        "espn": "3953687",
        "status": null,
        "team_abbr": "DAL",
        "pos": "K",
        "fpts": 59.23,
        "avg": 9.27,
        "last": 10
      }
    ],
    "bench": [
      {
        "name": "Rams",
        "status": null,
        "team_abbr": "LAR",
        "pos": "D/ST",
        "fpts": 47.77,
        "avg": 6.4,
        "last": 16
      },
      {
        "name": "Aaron Jones Sr.",
        "espn": "3042519",
        "status": null,
        "team_abbr": "MIN",
        "pos": "RB",
        "fpts": 59.37,
        "avg": 9.77,
        "last": 10.8
      },
      {
        "name": "Blake Corum",
        "espn": "4429096",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 76.29,
        "avg": 10.9,
        "last": 19.4
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
        "fpts": 37.31,
        "avg": 5.88,
        "last": 7
      },
      {
        "name": "Jordan Love",
        "espn": "4036378",
        "status": null,
        "team_abbr": "GB",
        "pos": "QB",
        "fpts": 118.83,
        "avg": 19.58,
        "last": 10.8
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
        "fpts": 120.59,
        "avg": 18.81,
        "last": 20.36
      },
      {
        "name": "Derrick Henry",
        "espn": "3043078",
        "status": null,
        "team_abbr": "BAL",
        "pos": "RB",
        "fpts": 79.81,
        "avg": 15.44,
        "last": 17.1
      },
      {
        "name": "Tony Pollard",
        "espn": "3916148",
        "status": null,
        "team_abbr": "TEN",
        "pos": "RB",
        "fpts": 109.39,
        "avg": 14.04,
        "last": 11
      },
      {
        "name": "Ja'Marr Chase",
        "espn": "4362628",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 147.38,
        "avg": 16.74,
        "last": 5.6
      },
      {
        "name": "Rashee Rice",
        "espn": "4428331",
        "status": null,
        "team_abbr": "KC",
        "pos": "WR",
        "fpts": 63.94,
        "avg": 9.09,
        "last": 8.3
      },
      {
        "name": "DK Metcalf",
        "espn": "4047650",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 65.65,
        "avg": 7.65,
        "last": 0.7
      },
      {
        "name": "George Kittle",
        "espn": "3040151",
        "status": null,
        "team_abbr": "SF",
        "pos": "TE",
        "fpts": 77.95,
        "avg": 12.26,
        "last": 16.9
      },
      {
        "name": "Breece Hall",
        "espn": "4427366",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "RB",
        "fpts": 73.25,
        "avg": 13,
        "last": 17.5
      },
      {
        "name": "Bucky Irving",
        "espn": "4596448",
        "status": null,
        "team_abbr": "TB",
        "pos": "RB",
        "fpts": 131.11,
        "avg": 16.56,
        "last": 17.5
      },
      {
        "name": "Patrick Mahomes",
        "espn": "3139477",
        "status": null,
        "team_abbr": "KC",
        "pos": "QB",
        "fpts": 137.89,
        "avg": 20.24,
        "last": 24.96
      },
      {
        "name": "Ravens",
        "status": null,
        "team_abbr": "BAL",
        "pos": "D/ST",
        "fpts": 36.14,
        "avg": 4.18,
        "last": 9
      },
      {
        "name": "Jason Myers",
        "espn": "2473037",
        "status": null,
        "team_abbr": "SEA",
        "pos": "K",
        "fpts": 53.5,
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
        "fpts": 51.32,
        "avg": 8.9,
        "last": 12
      },
      {
        "name": "Kenneth Walker III",
        "espn": "4567048",
        "status": "Q",
        "team_abbr": "KC",
        "pos": "RB",
        "fpts": 152.16,
        "avg": 22.92,
        "last": 0
      },
      {
        "name": "Dak Prescott",
        "espn": "2577417",
        "status": null,
        "team_abbr": "DAL",
        "pos": "QB",
        "fpts": 107.28,
        "avg": 21.61,
        "last": 35.9
      },
      {
        "name": "Harold Fannin Jr.",
        "espn": "5083076",
        "status": null,
        "team_abbr": "CLE",
        "pos": "TE",
        "fpts": 56.77,
        "avg": 9.64,
        "last": 12.6
      },
      {
        "name": "Mike Evans",
        "espn": "16737",
        "status": null,
        "team_abbr": "SF",
        "pos": "WR",
        "fpts": 90.91,
        "avg": 13.63,
        "last": 19.9
      },
      {
        "name": "Denzel Boston",
        "espn": "4832800",
        "status": null,
        "team_abbr": "CLE",
        "pos": "WR",
        "fpts": 70.37,
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
        "fpts": 139.85,
        "avg": 20.49,
        "last": 20.46
      },
      {
        "name": "Chuba Hubbard",
        "espn": "4241416",
        "status": null,
        "team_abbr": "CAR",
        "pos": "RB",
        "fpts": 120.43,
        "avg": 19.13,
        "last": 26
      },
      {
        "name": "Ashton Jeanty",
        "espn": "4890973",
        "status": null,
        "team_abbr": "LV",
        "pos": "RB",
        "fpts": 83.77,
        "avg": 13.83,
        "last": 25.4
      },
      {
        "name": "Malik Nabers",
        "espn": "4595348",
        "status": null,
        "team_abbr": "NYG",
        "pos": "WR",
        "fpts": 92.93,
        "avg": 12.32,
        "last": 15
      },
      {
        "name": "Tee Higgins",
        "espn": "4239993",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 96.46,
        "avg": 15.62,
        "last": 11.3
      },
      {
        "name": "Jalen Coker",
        "espn": "4695883",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 54.83,
        "avg": 8.61,
        "last": 6.7
      },
      {
        "name": "Isaiah Likely",
        "espn": "4361050",
        "status": null,
        "team_abbr": "NYG",
        "pos": "TE",
        "fpts": 67.82,
        "avg": 13.3,
        "last": 4
      },
      {
        "name": "Jaylen Warren",
        "espn": "4569987",
        "status": null,
        "team_abbr": "PIT",
        "pos": "RB",
        "fpts": 93.34,
        "avg": 13.88,
        "last": 3.9
      },
      {
        "name": "Jonah Coleman",
        "espn": "4702555",
        "status": null,
        "team_abbr": "DEN",
        "pos": "RB",
        "fpts": 105.23,
        "avg": 14.88,
        "last": 32.9
      },
      {
        "name": "Fernando Mendoza",
        "espn": "4837248",
        "status": null,
        "team_abbr": "LV",
        "pos": "QB",
        "fpts": 107.5,
        "avg": 7.8,
        "last": 22.88
      },
      {
        "name": "Vikings",
        "status": null,
        "team_abbr": "MIN",
        "pos": "D/ST",
        "fpts": 46.01,
        "avg": 10.6,
        "last": 0
      },
      {
        "name": "Ka'imi Fairbairn",
        "espn": "2971573",
        "status": null,
        "team_abbr": "HOU",
        "pos": "K",
        "fpts": 65.37,
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
        "fpts": 122.06,
        "avg": 14.23,
        "last": 11.5
      },
      {
        "name": "Jaxon Smith-Njigba",
        "espn": "4430878",
        "status": null,
        "team_abbr": "SEA",
        "pos": "WR",
        "fpts": 122.3,
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
        "fpts": 85.56,
        "avg": 11.35,
        "last": 13.9
      },
      {
        "name": "Chase Brown",
        "espn": "4362238",
        "status": null,
        "team_abbr": "CIN",
        "pos": "RB",
        "fpts": 95.98,
        "avg": 11.23,
        "last": 6.1
      },
      {
        "name": "Rhamondre Stevenson",
        "espn": "4569173",
        "status": null,
        "team_abbr": "NE",
        "pos": "RB",
        "fpts": 74.9,
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
        "status": null,
        "team_abbr": "CHI",
        "pos": "QB",
        "fpts": 109.86,
        "avg": 17.81,
        "last": 14.34
      },
      {
        "name": "Bhayshul Tuten",
        "espn": "4882093",
        "status": "Q",
        "team_abbr": "JAX",
        "pos": "RB",
        "fpts": 106.36,
        "avg": 14.53,
        "last": 6.8
      },
      {
        "name": "Cam Skattebo",
        "espn": "4696981",
        "status": null,
        "team_abbr": "NYG",
        "pos": "RB",
        "fpts": 102.04,
        "avg": 10.54,
        "last": 4.3
      },
      {
        "name": "Zay Flowers",
        "espn": "4429615",
        "status": null,
        "team_abbr": "BAL",
        "pos": "WR",
        "fpts": 68.55,
        "avg": 12.68,
        "last": 12.4
      },
      {
        "name": "Stefon Diggs",
        "espn": "2976212",
        "status": null,
        "team_abbr": "WSH",
        "pos": "WR",
        "fpts": 77.1,
        "avg": 11.01,
        "last": 6.5
      },
      {
        "name": "Jameson Williams",
        "espn": "4426388",
        "status": null,
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 73.38,
        "avg": 11.6,
        "last": 17.3
      },
      {
        "name": "Travis Kelce",
        "espn": "15847",
        "status": null,
        "team_abbr": "KC",
        "pos": "TE",
        "fpts": 71.66,
        "avg": 10.92,
        "last": 22.4
      },
      {
        "name": "Luther Burden III",
        "espn": "4685278",
        "status": null,
        "team_abbr": "CHI",
        "pos": "WR",
        "fpts": 71.6,
        "avg": 11.41,
        "last": 2.3
      },
      {
        "name": "Deebo Samuel Sr.",
        "espn": "3126486",
        "status": null,
        "team_abbr": "SF",
        "pos": "WR",
        "fpts": 69.16,
        "avg": 11.86,
        "last": 6.2
      },
      {
        "name": "Brock Purdy",
        "espn": "4361741",
        "status": null,
        "team_abbr": "SF",
        "pos": "QB",
        "fpts": 142.91,
        "avg": 22.52,
        "last": 22.2
      },
      {
        "name": "Jaguars",
        "status": null,
        "team_abbr": "JAX",
        "pos": "D/ST",
        "fpts": 46.72,
        "avg": 7.5,
        "last": 5
      },
      {
        "name": "Cam Little",
        "espn": "4686361",
        "status": null,
        "team_abbr": "JAX",
        "pos": "K",
        "fpts": 80.96,
        "avg": 11.1,
        "last": 13
      }
    ],
    "bench": [
      {
        "name": "Bijan Robinson",
        "espn": "4430807",
        "status": null,
        "team_abbr": "ATL",
        "pos": "RB",
        "fpts": 127.55,
        "avg": 18.02,
        "last": 15.7
      },
      {
        "name": "Kyren Williams",
        "espn": "4430737",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 92.82,
        "avg": 14.53,
        "last": 4.2
      },
      {
        "name": "Sam LaPorta",
        "espn": "4430027",
        "status": "Q",
        "team_abbr": "DET",
        "pos": "TE",
        "fpts": 63.01,
        "avg": 8.54,
        "last": 7.7
      },
      {
        "name": "Christian Watson",
        "espn": "4248528",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 85.34,
        "avg": 15.76,
        "last": 5.2
      },
      {
        "name": "Matthew Golden",
        "espn": "4701936",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 102.82,
        "avg": 14.69,
        "last": 9.5
      },
      {
        "name": "Ollie Gordon II",
        "espn": "4711533",
        "status": null,
        "team_abbr": "MIA",
        "pos": "RB",
        "fpts": 77.26,
        "avg": 9.73,
        "last": 7.7
      }
    ],
    "ir": [
      {
        "name": "Davante Adams",
        "espn": "16800",
        "status": "IR",
        "team_abbr": "LAR",
        "pos": "WR",
        "fpts": 67.92,
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
        "fpts": 146.92,
        "avg": 23.47,
        "last": 12.16
      },
      {
        "name": "Saquon Barkley",
        "espn": "3929630",
        "status": "Q",
        "team_abbr": "PHI",
        "pos": "RB",
        "fpts": 78.16,
        "avg": 8.59,
        "last": 13.5
      },
      {
        "name": "Javonte Williams",
        "espn": "4361579",
        "status": null,
        "team_abbr": "DAL",
        "pos": "RB",
        "fpts": 84.18,
        "avg": 16.13,
        "last": 22.6
      },
      {
        "name": "Amon-Ra St. Brown",
        "espn": "4374302",
        "status": null,
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 102.55,
        "avg": 16.31,
        "last": 12.2
      },
      {
        "name": "George Pickens",
        "espn": "4426354",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 73.34,
        "avg": 14.31,
        "last": 20.3
      },
      {
        "name": "Nico Collins",
        "espn": "4258173",
        "status": null,
        "team_abbr": "HOU",
        "pos": "WR",
        "fpts": 86.58,
        "avg": 13.85,
        "last": 13.3
      },
      {
        "name": "Kyle Pitts Sr.",
        "espn": "4360248",
        "status": null,
        "team_abbr": "ATL",
        "pos": "TE",
        "fpts": 48.81,
        "avg": 6.35,
        "last": 5
      },
      {
        "name": "Christian McCaffrey",
        "espn": "3117251",
        "status": null,
        "team_abbr": "SF",
        "pos": "RB",
        "fpts": 123.79,
        "avg": 20.62,
        "last": 13.2
      },
      {
        "name": "Jonathan Taylor",
        "espn": "4242335",
        "status": null,
        "team_abbr": "IND",
        "pos": "RB",
        "fpts": 76.52,
        "avg": 14.24,
        "last": 4.7
      },
      {
        "name": "Jayden Daniels",
        "espn": "4426348",
        "status": null,
        "team_abbr": "WSH",
        "pos": "QB",
        "fpts": 143.98,
        "avg": 19.13,
        "last": 17.06
      },
      {
        "name": "Steelers",
        "status": null,
        "team_abbr": "PIT",
        "pos": "D/ST",
        "fpts": 48.93,
        "avg": 7.3,
        "last": 7
      },
      {
        "name": "Tyler Bass",
        "espn": "3917232",
        "status": null,
        "team_abbr": "BUF",
        "pos": "K",
        "fpts": 82.42,
        "avg": 11.5,
        "last": 17
      }
    ],
    "bench": [
      {
        "name": "Brock Bowers",
        "espn": "4432665",
        "status": "Q",
        "team_abbr": "LV",
        "pos": "TE",
        "fpts": 79.58,
        "avg": 15.6,
        "last": 0
      },
      {
        "name": "Chris Olave",
        "espn": "4361370",
        "status": null,
        "team_abbr": "NO",
        "pos": "WR",
        "fpts": 83.68,
        "avg": 13.26,
        "last": 14.7
      },
      {
        "name": "Tetairoa McMillan",
        "espn": "4685472",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 81.02,
        "avg": 12.26,
        "last": 16.1
      },
      {
        "name": "Garrett Wilson",
        "espn": "4569618",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 68.99,
        "avg": 10.97,
        "last": 5.4
      },
      {
        "name": "Bryce Young",
        "espn": "4685720",
        "status": null,
        "team_abbr": "CAR",
        "pos": "QB",
        "fpts": 108.03,
        "avg": 17.06,
        "last": 15.96
      },
      {
        "name": "Will Reichard",
        "espn": "4567104",
        "status": null,
        "team_abbr": "MIN",
        "pos": "K",
        "fpts": 74.63,
        "avg": 10.4,
        "last": 3
      }
    ],
    "ir": [
      {
        "name": "Jeremiyah Love",
        "espn": "4870808",
        "status": "IR",
        "team_abbr": "ARI",
        "pos": "RB",
        "fpts": 41.25,
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
    "status": null,
    "team_abbr": "CHI",
    "pos": "TE",
    "fpts": 56.84,
    "avg": 7.52,
    "last": 10.4
  },
  {
    "name": "DeVonta Smith",
    "espn": "4241478",
    "status": null,
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 72.7,
    "avg": 12.52,
    "last": 6.6
  },
  {
    "name": "Tyler Warren",
    "espn": "4431459",
    "status": null,
    "team_abbr": "IND",
    "pos": "TE",
    "fpts": 35.96,
    "avg": 7.69,
    "last": 2.7
  },
  {
    "name": "Quinshon Judkins",
    "espn": "4685702",
    "status": null,
    "team_abbr": "CLE",
    "pos": "RB",
    "fpts": 79.34,
    "avg": 10.63,
    "last": 14.6
  },
  {
    "name": "Omarion Hampton",
    "espn": "4685382",
    "status": null,
    "team_abbr": "LAC",
    "pos": "RB",
    "fpts": 76.96,
    "avg": 8.95,
    "last": 9.8
  },
  {
    "name": "Emeka Egbuka",
    "espn": "4567750",
    "status": null,
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 60,
    "avg": 8.16,
    "last": 2.8
  },
  {
    "name": "Texans",
    "status": null,
    "team_abbr": "HOU",
    "pos": "D/ST",
    "fpts": 44.2,
    "avg": 6.1,
    "last": 15
  },
  {
    "name": "Emmett Johnson",
    "espn": "4832955",
    "status": null,
    "team_abbr": "KC",
    "pos": "RB",
    "fpts": 49.86,
    "avg": 10.82,
    "last": 22.3
  },
  {
    "name": "Josh Jacobs",
    "espn": "4047365",
    "status": "Q",
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 87.56,
    "avg": 12.77,
    "last": 0
  },
  {
    "name": "Rome Odunze",
    "espn": "4431299",
    "status": null,
    "team_abbr": "CHI",
    "pos": "WR",
    "fpts": 61.63,
    "avg": 7.93,
    "last": 6.5
  },
  {
    "name": "Tucker Kraft",
    "espn": "4572680",
    "status": null,
    "team_abbr": "GB",
    "pos": "TE",
    "fpts": 53.88,
    "avg": 7.48,
    "last": 2.4
  },
  {
    "name": "David Montgomery",
    "espn": "4035538",
    "status": null,
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 70.31,
    "avg": 9.32,
    "last": 13.9
  },
  {
    "name": "Carnell Tate",
    "espn": "4871023",
    "status": null,
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 72.8,
    "avg": 9.14,
    "last": 12.8
  },
  {
    "name": "Jaylen Waddle",
    "espn": "4372016",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 62.59,
    "avg": 7.46,
    "last": 7.6
  },
  {
    "name": "Travis Etienne Jr.",
    "espn": "4239996",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 77.86,
    "avg": 7.58,
    "last": 7.6
  },
  {
    "name": "Broncos",
    "status": null,
    "team_abbr": "DEN",
    "pos": "D/ST",
    "fpts": 43.6,
    "avg": 6.8,
    "last": 12
  },
  {
    "name": "T.J. Hockenson",
    "espn": "4036133",
    "status": null,
    "team_abbr": "MIN",
    "pos": "TE",
    "fpts": 57.96,
    "avg": 8.53,
    "last": 8.5
  },
  {
    "name": "Spencer Shrader",
    "espn": "4571557",
    "status": null,
    "team_abbr": "IND",
    "pos": "K",
    "fpts": 56.32,
    "avg": 10.27,
    "last": 1
  },
  {
    "name": "Matthew Stafford",
    "espn": "12483",
    "status": null,
    "team_abbr": "LAR",
    "pos": "QB",
    "fpts": 99.8,
    "avg": 16.26,
    "last": 19.76
  },
  {
    "name": "A.J. Brown",
    "espn": "4047646",
    "status": "D",
    "team_abbr": "NE",
    "pos": "WR",
    "fpts": 23.73,
    "avg": 4.58,
    "last": 3.7
  },
  {
    "name": "Bills",
    "status": null,
    "team_abbr": "BUF",
    "pos": "D/ST",
    "fpts": 42.28,
    "avg": 6.1,
    "last": 10
  },
  {
    "name": "Zach Charbonnet",
    "espn": "4426385",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 85.93,
    "avg": 7.63,
    "last": 9.4
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
    "name": "Ladd McConkey",
    "espn": "4612826",
    "status": null,
    "team_abbr": "LAC",
    "pos": "WR",
    "fpts": 66.92,
    "avg": 8.76,
    "last": 18.2
  },
  {
    "name": "Josh Downs",
    "espn": "4688813",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 49.26,
    "avg": 7.25,
    "last": 7.9
  },
  {
    "name": "Kyle Monangai",
    "espn": "4608686",
    "status": null,
    "team_abbr": "CHI",
    "pos": "RB",
    "fpts": 51.19,
    "avg": 11.72,
    "last": 1.8
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
    "avg": 7.85,
    "last": 4.3
  },
  {
    "name": "Dalton Kincaid",
    "espn": "4385690",
    "status": "Q",
    "team_abbr": "BUF",
    "pos": "TE",
    "fpts": 49.74,
    "avg": 8.52,
    "last": 0
  },
  {
    "name": "Jakobi Meyers",
    "espn": "3916433",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 66.51,
    "avg": 7.8,
    "last": 10.5
  },
  {
    "name": "Jordyn Tyson",
    "espn": "4880281",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 56.31,
    "avg": 6,
    "last": 1.5
  },
  {
    "name": "Rico Dowdle",
    "espn": "4038815",
    "status": null,
    "team_abbr": "PIT",
    "pos": "RB",
    "fpts": 53.33,
    "avg": 6.84,
    "last": 5.4
  },
  {
    "name": "Woody Marks",
    "espn": "4429059",
    "status": "Q",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 51.32,
    "avg": 7.82,
    "last": 0
  },
  {
    "name": "Kirk Cousins",
    "espn": "14880",
    "status": null,
    "team_abbr": "MIN",
    "pos": "QB",
    "fpts": 113.27,
    "avg": 17.73,
    "last": 7.4
  },
  {
    "name": "Braelon Allen",
    "espn": "4685247",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "RB",
    "fpts": 45.66,
    "avg": 9.95,
    "last": 8.9
  },
  {
    "name": "Courtland Sutton",
    "espn": "3128429",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 47.27,
    "avg": 5.11,
    "last": 0
  },
  {
    "name": "Rachaad White",
    "espn": "4697815",
    "status": null,
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 48.32,
    "avg": 7.38,
    "last": 0
  },
  {
    "name": "Bears",
    "status": null,
    "team_abbr": "CHI",
    "pos": "D/ST",
    "fpts": 35.53,
    "avg": 8.4,
    "last": 15
  },
  {
    "name": "KC Concepcion",
    "espn": "4870653",
    "status": null,
    "team_abbr": "CLE",
    "pos": "WR",
    "fpts": 59.19,
    "avg": 8.01,
    "last": 10.2
  },
  {
    "name": "Mark Andrews",
    "espn": "3116365",
    "status": null,
    "team_abbr": "BAL",
    "pos": "TE",
    "fpts": 30.25,
    "avg": 5.25,
    "last": 2.4
  },
  {
    "name": "Jordan Addison",
    "espn": "4429205",
    "status": "D",
    "team_abbr": "MIN",
    "pos": "WR",
    "fpts": 57.53,
    "avg": 6.41,
    "last": 0
  },
  {
    "name": "Chris Boswell",
    "espn": "17372",
    "status": null,
    "team_abbr": "PIT",
    "pos": "K",
    "fpts": 72.58,
    "avg": 9.5,
    "last": 13
  },
  {
    "name": "J.K. Dobbins",
    "espn": "4241985",
    "status": null,
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 18.24,
    "avg": 5.8,
    "last": 0
  },
  {
    "name": "Khalil Shakir",
    "espn": "4373678",
    "status": null,
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 55.97,
    "avg": 8,
    "last": 12.8
  },
  {
    "name": "Tyler Shough",
    "espn": "4360689",
    "status": null,
    "team_abbr": "NO",
    "pos": "QB",
    "fpts": 106.92,
    "avg": 16.99,
    "last": 14.28
  },
  {
    "name": "Cameron Dicker",
    "espn": "4362081",
    "status": null,
    "team_abbr": "LAC",
    "pos": "K",
    "fpts": 61.96,
    "avg": 7.9,
    "last": 8
  },
  {
    "name": "Alvin Kamara",
    "espn": "3054850",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 29.56,
    "avg": 9.2,
    "last": 6.7
  },
  {
    "name": "Chig Okonkwo",
    "espn": "4360635",
    "status": null,
    "team_abbr": "WSH",
    "pos": "TE",
    "fpts": 54.37,
    "avg": 5.8,
    "last": 8.6
  },
  {
    "name": "Tank Dell",
    "espn": "4366031",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 51.13,
    "avg": 7.83,
    "last": 4.2
  },
  {
    "name": "Kenny Gainwell",
    "espn": "4371733",
    "status": null,
    "team_abbr": "TB",
    "pos": "RB",
    "fpts": 55.16,
    "avg": 6.4,
    "last": 7.9
  },
  {
    "name": "Lions",
    "status": null,
    "team_abbr": "DET",
    "pos": "D/ST",
    "fpts": 38.22,
    "avg": 5.7,
    "last": 6
  },
  {
    "name": "Xavier Worthy",
    "espn": "4683062",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 38.11,
    "avg": 6.11,
    "last": 10.8
  },
  {
    "name": "Jordan Mason",
    "espn": "4360569",
    "status": null,
    "team_abbr": "MIN",
    "pos": "RB",
    "fpts": 68.23,
    "avg": 6,
    "last": 4.2
  },
  {
    "name": "Tyler Allgeier",
    "espn": "4373626",
    "status": null,
    "team_abbr": "ARI",
    "pos": "RB",
    "fpts": 37.68,
    "avg": 7.54,
    "last": 2.3
  },
  {
    "name": "Brenton Strange",
    "espn": "4430539",
    "status": null,
    "team_abbr": "JAX",
    "pos": "TE",
    "fpts": 43.01,
    "avg": 6.76,
    "last": 3.1
  },
  {
    "name": "Jake Bates",
    "espn": "4689936",
    "status": null,
    "team_abbr": "DET",
    "pos": "K",
    "fpts": 67.01,
    "avg": 9.2,
    "last": 8
  },
  {
    "name": "Keenan Allen",
    "espn": "15818",
    "status": null,
    "team_abbr": "SF",
    "pos": "WR",
    "fpts": 41.02,
    "avg": 7.5,
    "last": 5.3
  },
  {
    "name": "DeMario Douglas",
    "espn": "4427095",
    "status": null,
    "team_abbr": "NE",
    "pos": "WR",
    "fpts": 41.98,
    "avg": 8.18,
    "last": 0.9
  },
  {
    "name": "Tre Tucker",
    "espn": "4428718",
    "status": null,
    "team_abbr": "LV",
    "pos": "WR",
    "fpts": 42.72,
    "avg": 9.11,
    "last": 6
  },
  {
    "name": "Harrison Butker",
    "espn": "3055899",
    "status": null,
    "team_abbr": "KC",
    "pos": "K",
    "fpts": 60.53,
    "avg": 7.6,
    "last": 12
  },
  {
    "name": "Marvin Harrison Jr.",
    "espn": "4432708",
    "status": "Q",
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 40.01,
    "avg": 4.57,
    "last": 0
  },
  {
    "name": "RJ Harvey",
    "espn": "4568490",
    "status": "IR",
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 42.68,
    "avg": 9.15,
    "last": 0
  },
  {
    "name": "Adonai Mitchell",
    "espn": "4597500",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "WR",
    "fpts": 52.3,
    "avg": 7.41,
    "last": 4
  },
  {
    "name": "Hunter Henry",
    "espn": "3046439",
    "status": null,
    "team_abbr": "NE",
    "pos": "TE",
    "fpts": 35.36,
    "avg": 6.73,
    "last": 3.2
  },
  {
    "name": "Xavier Hutchinson",
    "espn": "4686422",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 51.22,
    "avg": 7.04,
    "last": 2.3
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
    "name": "Jacory Croskey-Merritt",
    "espn": "4575131",
    "status": null,
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 50.93,
    "avg": 9.52,
    "last": 14.7
  },
  {
    "name": "Makai Lemon",
    "espn": "4870795",
    "status": null,
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 33.25,
    "avg": 5.6,
    "last": 0.8
  },
  {
    "name": "Pat Freiermuth",
    "espn": "4361411",
    "status": null,
    "team_abbr": "PIT",
    "pos": "TE",
    "fpts": 41.39,
    "avg": 8.35,
    "last": 6.5
  },
  {
    "name": "Ryan Flournoy",
    "espn": "5083754",
    "status": null,
    "team_abbr": "DAL",
    "pos": "WR",
    "fpts": 38.03,
    "avg": 7.77,
    "last": 1.6
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
    "name": "Omar Cooper Jr.",
    "espn": "4723820",
    "status": "Q",
    "team_abbr": "NYJ",
    "pos": "WR",
    "fpts": 43.36,
    "avg": 8.77,
    "last": 0
  },
  {
    "name": "Jets",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "D/ST",
    "fpts": 39.26,
    "avg": 4.64,
    "last": 8
  },
  {
    "name": "Aaron Rodgers",
    "espn": "8439",
    "status": null,
    "team_abbr": "PIT",
    "pos": "QB",
    "fpts": 105.83,
    "avg": 14.87,
    "last": 15.98
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
    "name": "Chris Godwin Jr.",
    "espn": "3116165",
    "status": null,
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 32.66,
    "avg": 4.62,
    "last": 2.8
  },
  {
    "name": "Michael Pittman Jr.",
    "espn": "4035687",
    "status": "IR",
    "team_abbr": "PIT",
    "pos": "WR",
    "fpts": 26.13,
    "avg": 4.13,
    "last": 0
  },
  {
    "name": "Cam Ward",
    "espn": "4688380",
    "status": null,
    "team_abbr": "TEN",
    "pos": "QB",
    "fpts": 103.78,
    "avg": 14.19,
    "last": 22.22
  },
  {
    "name": "Bengals",
    "status": null,
    "team_abbr": "CIN",
    "pos": "D/ST",
    "fpts": 44.77,
    "avg": 5.8,
    "last": 0
  },
  {
    "name": "Justin Herbert",
    "espn": "4038941",
    "status": "Q",
    "team_abbr": "LAC",
    "pos": "QB",
    "fpts": 98.37,
    "avg": 11.93,
    "last": 22.44
  },
  {
    "name": "Michael Mayer",
    "espn": "4429086",
    "status": null,
    "team_abbr": "LV",
    "pos": "TE",
    "fpts": 28.39,
    "avg": 6,
    "last": 0.9
  },
  {
    "name": "Caleb Douglas",
    "espn": "4869645",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 59.08,
    "avg": 9.1,
    "last": 4
  },
  {
    "name": "Buccaneers",
    "status": null,
    "team_abbr": "TB",
    "pos": "D/ST",
    "fpts": 46.3,
    "avg": 9.2,
    "last": -1
  },
  {
    "name": "Juwan Johnson",
    "espn": "3929645",
    "status": "Q",
    "team_abbr": "NO",
    "pos": "TE",
    "fpts": 30.14,
    "avg": 6.87,
    "last": 0
  },
  {
    "name": "Chase McLaughlin",
    "espn": "3150744",
    "status": null,
    "team_abbr": "TB",
    "pos": "K",
    "fpts": 62.54,
    "avg": 10.2,
    "last": 3
  },
  {
    "name": "Devaughn Vele",
    "espn": "4569559",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 42.39,
    "avg": 8.55,
    "last": 11.1
  },
  {
    "name": "Matt Gay",
    "espn": "4249087",
    "status": null,
    "team_abbr": "LV",
    "pos": "K",
    "fpts": 50.31,
    "avg": 9.27,
    "last": 6
  },
  {
    "name": "Eddy Pineiro",
    "espn": "4034949",
    "status": null,
    "team_abbr": "SF",
    "pos": "K",
    "fpts": 46.65,
    "avg": 6.2,
    "last": 5
  },
  {
    "name": "Dominic Zvada",
    "espn": "5082424",
    "status": null,
    "team_abbr": "NYG",
    "pos": "K",
    "fpts": 73.15,
    "avg": 9.1,
    "last": 15
  },
  {
    "name": "Dalton Schultz",
    "espn": "3117256",
    "status": null,
    "team_abbr": "HOU",
    "pos": "TE",
    "fpts": 41.42,
    "avg": 6.31,
    "last": 1.6
  },
  {
    "name": "Brian Thomas Jr.",
    "espn": "4432773",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 32.63,
    "avg": 4.14,
    "last": 8.3
  },
  {
    "name": "Malik Washington",
    "espn": "4569603",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 45.33,
    "avg": 7.68,
    "last": 5.6
  },
  {
    "name": "Jonathon Brooks",
    "espn": "4678008",
    "status": "IR",
    "team_abbr": "CAR",
    "pos": "RB",
    "fpts": 28.73,
    "avg": 4.15,
    "last": 0
  },
  {
    "name": "Cairo Santos",
    "espn": "17427",
    "status": null,
    "team_abbr": "CHI",
    "pos": "K",
    "fpts": 61.72,
    "avg": 8.7,
    "last": 8
  },
  {
    "name": "Jake Ferguson",
    "espn": "4242355",
    "status": "Q",
    "team_abbr": "DAL",
    "pos": "TE",
    "fpts": 18.75,
    "avg": 5.01,
    "last": 0
  },
  {
    "name": "Mike Gesicki",
    "espn": "3116164",
    "status": null,
    "team_abbr": "CIN",
    "pos": "TE",
    "fpts": 42.92,
    "avg": 8.23,
    "last": 10.2
  },
  {
    "name": "Browns",
    "status": null,
    "team_abbr": "CLE",
    "pos": "D/ST",
    "fpts": 35.65,
    "avg": 5.7,
    "last": 5
  }
];
