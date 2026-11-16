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
        "fpts": 177.52,
        "avg": 19.33,
        "last": 26.78
      },
      {
        "name": "Jahmyr Gibbs",
        "espn": "4429795",
        "status": null,
        "team_abbr": "DET",
        "pos": "RB",
        "fpts": 190.66,
        "avg": 25.88,
        "last": 40.7
      },
      {
        "name": "James Cook III",
        "espn": "4379399",
        "status": null,
        "team_abbr": "BUF",
        "pos": "RB",
        "fpts": 163.34,
        "avg": 18.23,
        "last": 21.7
      },
      {
        "name": "Justin Jefferson",
        "espn": "4262921",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 137.82,
        "avg": 11.45,
        "last": 11.9
      },
      {
        "name": "Parker Washington",
        "espn": "4432620",
        "status": null,
        "team_abbr": "JAX",
        "pos": "WR",
        "fpts": 108.09,
        "avg": 13.31,
        "last": 24.7
      },
      {
        "name": "Jordan Addison",
        "espn": "4429205",
        "status": "OUT",
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 76.03,
        "avg": 6.41,
        "last": 0
      },
      {
        "name": "Trey McBride",
        "espn": "4361307",
        "status": null,
        "team_abbr": "ARI",
        "pos": "TE",
        "fpts": 94.29,
        "avg": 13.25,
        "last": 6.2
      },
      {
        "name": "CeeDee Lamb",
        "espn": "4241389",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 134.06,
        "avg": 18.35,
        "last": 16.7
      },
      {
        "name": "Blake Corum",
        "espn": "4429096",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 74.02,
        "avg": 10.9,
        "last": 19.4
      },
      {
        "name": "Joe Burrow",
        "espn": "3915511",
        "status": null,
        "team_abbr": "CIN",
        "pos": "QB",
        "fpts": 194.36,
        "avg": 25.81,
        "last": 33.16
      },
      {
        "name": "Rams",
        "status": null,
        "team_abbr": "LAR",
        "pos": "D/ST",
        "fpts": 63.39,
        "avg": 6.4,
        "last": 16
      },
      {
        "name": "Brandon Aubrey",
        "espn": "3953687",
        "status": null,
        "team_abbr": "DAL",
        "pos": "K",
        "fpts": 84.12,
        "avg": 9.2,
        "last": 12
      }
    ],
    "bench": [
      {
        "name": "D'Andre Swift",
        "espn": "4259545",
        "status": "BYE",
        "team_abbr": "CHI",
        "pos": "RB",
        "fpts": 111.64,
        "avg": 15.76,
        "last": 3.1
      },
      {
        "name": "Aaron Jones Sr.",
        "espn": "3042519",
        "status": null,
        "team_abbr": "MIN",
        "pos": "RB",
        "fpts": 73.26,
        "avg": 9.66,
        "last": 12
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
        "fpts": 76.96,
        "avg": 5.76,
        "last": 1
      },
      {
        "name": "Jordan Love",
        "espn": "4036378",
        "status": null,
        "team_abbr": "GB",
        "pos": "QB",
        "fpts": 148.81,
        "avg": 19.58,
        "last": 10.8
      },
      {
        "name": "DJ Moore",
        "espn": "3915416",
        "status": null,
        "team_abbr": "BUF",
        "pos": "WR",
        "fpts": 99.73,
        "avg": 9.63,
        "last": 17.4
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
        "fpts": 141.71,
        "avg": 18.64,
        "last": 20.42
      },
      {
        "name": "Derrick Henry",
        "espn": "3043078",
        "status": null,
        "team_abbr": "BAL",
        "pos": "RB",
        "fpts": 110.63,
        "avg": 15.14,
        "last": 5.58
      },
      {
        "name": "Kenneth Walker III",
        "espn": "4567048",
        "status": "OUT",
        "team_abbr": "KC",
        "pos": "RB",
        "fpts": 176.65,
        "avg": 22.92,
        "last": 0
      },
      {
        "name": "Ja'Marr Chase",
        "espn": "4362628",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 176.14,
        "avg": 17.98,
        "last": 28.6
      },
      {
        "name": "Rashee Rice",
        "espn": "4428331",
        "status": null,
        "team_abbr": "KC",
        "pos": "WR",
        "fpts": 94.43,
        "avg": 9.2,
        "last": 10.7
      },
      {
        "name": "Denzel Boston",
        "espn": "4832800",
        "status": null,
        "team_abbr": "CLE",
        "pos": "WR",
        "fpts": 86.31,
        "avg": 8.88,
        "last": 2.1
      },
      {
        "name": "George Kittle",
        "espn": "3040151",
        "status": null,
        "team_abbr": "SF",
        "pos": "TE",
        "fpts": 108.03,
        "avg": 11.74,
        "last": 10.4
      },
      {
        "name": "Breece Hall",
        "espn": "4427366",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "RB",
        "fpts": 91.29,
        "avg": 12.1,
        "last": 12.8
      },
      {
        "name": "DK Metcalf",
        "espn": "4047650",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 93.61,
        "avg": 8.42,
        "last": 14.4
      },
      {
        "name": "Patrick Mahomes",
        "espn": "3139477",
        "status": null,
        "team_abbr": "KC",
        "pos": "QB",
        "fpts": 163.12,
        "avg": 19.71,
        "last": 35.42
      },
      {
        "name": "Seahawks",
        "status": null,
        "team_abbr": "SEA",
        "pos": "D/ST",
        "fpts": 59.54,
        "avg": 8.9,
        "last": 12
      },
      {
        "name": "Jason Myers",
        "espn": "2473037",
        "status": null,
        "team_abbr": "SEA",
        "pos": "K",
        "fpts": 66.21,
        "avg": 7.7,
        "last": 2
      }
    ],
    "bench": [
      {
        "name": "Ravens",
        "status": null,
        "team_abbr": "BAL",
        "pos": "D/ST",
        "fpts": 45.6,
        "avg": 3.67,
        "last": 1
      },
      {
        "name": "Dak Prescott",
        "espn": "2577417",
        "status": null,
        "team_abbr": "DAL",
        "pos": "QB",
        "fpts": 135.54,
        "avg": 20.19,
        "last": 34.42
      },
      {
        "name": "Harold Fannin Jr.",
        "espn": "5083076",
        "status": null,
        "team_abbr": "CLE",
        "pos": "TE",
        "fpts": 64.06,
        "avg": 9.64,
        "last": 12.6
      },
      {
        "name": "Mike Evans",
        "espn": "16737",
        "status": "OUT",
        "team_abbr": "SF",
        "pos": "WR",
        "fpts": 86.57,
        "avg": 12.58,
        "last": 0
      },
      {
        "name": "Tony Pollard",
        "espn": "3916148",
        "status": null,
        "team_abbr": "TEN",
        "pos": "RB",
        "fpts": 130.81,
        "avg": 14.38,
        "last": 19.9
      },
      {
        "name": "Bucky Irving",
        "espn": "4596448",
        "status": "BYE",
        "team_abbr": "TB",
        "pos": "RB",
        "fpts": 140.1,
        "avg": 16.46,
        "last": 26.5
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
        "fpts": 170.92,
        "avg": 20.5,
        "last": 20.44
      },
      {
        "name": "Chuba Hubbard",
        "espn": "4241416",
        "status": null,
        "team_abbr": "CAR",
        "pos": "RB",
        "fpts": 151.66,
        "avg": 18.37,
        "last": 31.7
      },
      {
        "name": "Ashton Jeanty",
        "espn": "4890973",
        "status": null,
        "team_abbr": "LV",
        "pos": "RB",
        "fpts": 105.05,
        "avg": 12.67,
        "last": 8.4
      },
      {
        "name": "Jaxon Smith-Njigba",
        "espn": "4430878",
        "status": null,
        "team_abbr": "SEA",
        "pos": "WR",
        "fpts": 135.48,
        "avg": 22.37,
        "last": 27.1
      },
      {
        "name": "Drake London",
        "espn": "4426502",
        "status": "Q",
        "team_abbr": "ATL",
        "pos": "WR",
        "fpts": 100.15,
        "avg": 11.35,
        "last": 13.9
      },
      {
        "name": "Malik Nabers",
        "espn": "4595348",
        "status": null,
        "team_abbr": "NYG",
        "pos": "WR",
        "fpts": 118.45,
        "avg": 12.02,
        "last": 4.9
      },
      {
        "name": "Isaiah Likely",
        "espn": "4361050",
        "status": null,
        "team_abbr": "NYG",
        "pos": "TE",
        "fpts": 88.69,
        "avg": 14.33,
        "last": 23.2
      },
      {
        "name": "Jaylen Warren",
        "espn": "4569987",
        "status": null,
        "team_abbr": "PIT",
        "pos": "RB",
        "fpts": 127.22,
        "avg": 14.99,
        "last": 6.6
      },
      {
        "name": "Tee Higgins",
        "espn": "4239993",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 124.03,
        "avg": 16.1,
        "last": 9.1
      },
      {
        "name": "Fernando Mendoza",
        "espn": "4837248",
        "status": null,
        "team_abbr": "LV",
        "pos": "QB",
        "fpts": 125.2,
        "avg": 4.04,
        "last": 13.92
      },
      {
        "name": "Vikings",
        "status": null,
        "team_abbr": "MIN",
        "pos": "D/ST",
        "fpts": 49.46,
        "avg": 11.78,
        "last": 21
      },
      {
        "name": "Ka'imi Fairbairn",
        "espn": "2971573",
        "status": null,
        "team_abbr": "HOU",
        "pos": "K",
        "fpts": 92.75,
        "avg": 11,
        "last": 7
      }
    ],
    "bench": [
      {
        "name": "Bo Nix",
        "espn": "4426338",
        "status": "BYE",
        "team_abbr": "DEN",
        "pos": "QB",
        "fpts": 139.34,
        "avg": 14.53,
        "last": 15.68
      },
      {
        "name": "49ers",
        "status": null,
        "team_abbr": "SF",
        "pos": "D/ST",
        "fpts": 63.63,
        "avg": 7.44,
        "last": -1
      },
      {
        "name": "Chase Brown",
        "espn": "4362238",
        "status": null,
        "team_abbr": "CIN",
        "pos": "RB",
        "fpts": 115.83,
        "avg": 11.8,
        "last": 24.3
      },
      {
        "name": "Rhamondre Stevenson",
        "espn": "4569173",
        "status": null,
        "team_abbr": "NE",
        "pos": "RB",
        "fpts": 109.71,
        "avg": 10.17,
        "last": 1
      },
      {
        "name": "Jalen Coker",
        "espn": "4695883",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 78.47,
        "avg": 8.85,
        "last": 0.3
      },
      {
        "name": "Jonah Coleman",
        "espn": "4702555",
        "status": "BYE",
        "team_abbr": "DEN",
        "pos": "RB",
        "fpts": 122.44,
        "avg": 11.28,
        "last": 16.8
      }
    ],
    "ir": []
  },
  "puntos": {
    "starters": [
      {
        "name": "Drake Maye",
        "espn": "4431452",
        "status": "Q",
        "team_abbr": "NE",
        "pos": "QB",
        "fpts": 173.43,
        "avg": 18.22,
        "last": 3.02
      },
      {
        "name": "Bijan Robinson",
        "espn": "4430807",
        "status": null,
        "team_abbr": "ATL",
        "pos": "RB",
        "fpts": 147.83,
        "avg": 18.02,
        "last": 15.7
      },
      {
        "name": "Ollie Gordon II",
        "espn": "4711533",
        "status": null,
        "team_abbr": "MIA",
        "pos": "RB",
        "fpts": 117.31,
        "avg": 9.96,
        "last": 13.5
      },
      {
        "name": "Christian Watson",
        "espn": "4248528",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 111.72,
        "avg": 15.76,
        "last": 5.2
      },
      {
        "name": "Matthew Golden",
        "espn": "4701936",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 124.59,
        "avg": 14.69,
        "last": 9.5
      },
      {
        "name": "Stefon Diggs",
        "espn": "2976212",
        "status": null,
        "team_abbr": "WSH",
        "pos": "WR",
        "fpts": 82.51,
        "avg": 11.58,
        "last": 17.3
      },
      {
        "name": "Travis Kelce",
        "espn": "15847",
        "status": null,
        "team_abbr": "KC",
        "pos": "TE",
        "fpts": 84.01,
        "avg": 9.64,
        "last": 4
      },
      {
        "name": "Kyren Williams",
        "espn": "4430737",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 117,
        "avg": 14.53,
        "last": 4.2
      },
      {
        "name": "Zay Flowers",
        "espn": "4429615",
        "status": null,
        "team_abbr": "BAL",
        "pos": "WR",
        "fpts": 86.58,
        "avg": 13.25,
        "last": 3.8
      },
      {
        "name": "Brock Purdy",
        "espn": "4361741",
        "status": null,
        "team_abbr": "SF",
        "pos": "QB",
        "fpts": 169.85,
        "avg": 22.55,
        "last": 31.66
      },
      {
        "name": "Jaguars",
        "status": null,
        "team_abbr": "JAX",
        "pos": "D/ST",
        "fpts": 57.06,
        "avg": 7.78,
        "last": 3
      },
      {
        "name": "Cam Little",
        "espn": "4686361",
        "status": null,
        "team_abbr": "JAX",
        "pos": "K",
        "fpts": 85.76,
        "avg": 10.89,
        "last": 19
      }
    ],
    "bench": [
      {
        "name": "Sam LaPorta",
        "espn": "4430027",
        "status": null,
        "team_abbr": "DET",
        "pos": "TE",
        "fpts": 76.63,
        "avg": 8.63,
        "last": 2.1
      },
      {
        "name": "Omar Cooper Jr.",
        "espn": "4723820",
        "status": "Q",
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 60.48,
        "avg": 8.77,
        "last": 0
      },
      {
        "name": "Luther Burden III",
        "espn": "4685278",
        "status": "Q",
        "team_abbr": "CHI",
        "pos": "WR",
        "fpts": 94.86,
        "avg": 12.42,
        "last": 17.2
      },
      {
        "name": "DeMario Douglas",
        "espn": "4427095",
        "status": null,
        "team_abbr": "NE",
        "pos": "WR",
        "fpts": 62.17,
        "avg": 8.18,
        "last": 0.9
      },
      {
        "name": "Caleb Williams",
        "espn": "4431611",
        "status": "BYE",
        "team_abbr": "CHI",
        "pos": "QB",
        "fpts": 136.84,
        "avg": 18.39,
        "last": 12.76
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
        "fpts": 177.01,
        "avg": 19.42,
        "last": 20.76
      },
      {
        "name": "Christian McCaffrey",
        "espn": "3117251",
        "status": null,
        "team_abbr": "SF",
        "pos": "RB",
        "fpts": 159.56,
        "avg": 21.44,
        "last": 44.3
      },
      {
        "name": "Jonathan Taylor",
        "espn": "4242335",
        "status": null,
        "team_abbr": "IND",
        "pos": "RB",
        "fpts": 120.89,
        "avg": 15.19,
        "last": 11.3
      },
      {
        "name": "Amon-Ra St. Brown",
        "espn": "4374302",
        "status": null,
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 135.96,
        "avg": 16.77,
        "last": 23.8
      },
      {
        "name": "Chris Olave",
        "espn": "4361370",
        "status": null,
        "team_abbr": "NO",
        "pos": "WR",
        "fpts": 109.3,
        "avg": 13.1,
        "last": 4.5
      },
      {
        "name": "Tetairoa McMillan",
        "espn": "4685472",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 112.83,
        "avg": 11.83,
        "last": 5
      },
      {
        "name": "Brock Bowers",
        "espn": "4432665",
        "status": "Q",
        "team_abbr": "LV",
        "pos": "TE",
        "fpts": 106.41,
        "avg": 15.6,
        "last": 2.8
      },
      {
        "name": "Nico Collins",
        "espn": "4258173",
        "status": null,
        "team_abbr": "HOU",
        "pos": "WR",
        "fpts": 103.2,
        "avg": 13.93,
        "last": 19.9
      },
      {
        "name": "Javonte Williams",
        "espn": "4361579",
        "status": null,
        "team_abbr": "DAL",
        "pos": "RB",
        "fpts": 121.14,
        "avg": 15.48,
        "last": 7.2
      },
      {
        "name": "Josh Allen",
        "espn": "3918298",
        "status": null,
        "team_abbr": "BUF",
        "pos": "QB",
        "fpts": 202.39,
        "avg": 24.72,
        "last": 22.34
      },
      {
        "name": "Steelers",
        "status": null,
        "team_abbr": "PIT",
        "pos": "D/ST",
        "fpts": 67.7,
        "avg": 7.33,
        "last": -7
      },
      {
        "name": "Tyler Bass",
        "espn": "3917232",
        "status": null,
        "team_abbr": "BUF",
        "pos": "K",
        "fpts": 97.96,
        "avg": 10.89,
        "last": 7
      }
    ],
    "bench": [
      {
        "name": "George Pickens",
        "espn": "4426354",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 78.11,
        "avg": 13.64,
        "last": 38
      },
      {
        "name": "Saquon Barkley",
        "espn": "3929630",
        "status": "BYE",
        "team_abbr": "PHI",
        "pos": "RB",
        "fpts": 99.52,
        "avg": 7.89,
        "last": 8.2
      },
      {
        "name": "Kyle Pitts Sr.",
        "espn": "4360248",
        "status": null,
        "team_abbr": "ATL",
        "pos": "TE",
        "fpts": 60.48,
        "avg": 6.35,
        "last": 5
      },
      {
        "name": "Garrett Wilson",
        "espn": "4569618",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 81.71,
        "avg": 11.59,
        "last": 12.1
      },
      {
        "name": "Bryce Young",
        "espn": "4685720",
        "status": null,
        "team_abbr": "CAR",
        "pos": "QB",
        "fpts": 151.67,
        "avg": 17.19,
        "last": 8.1
      },
      {
        "name": "Will Reichard",
        "espn": "4567104",
        "status": null,
        "team_abbr": "MIN",
        "pos": "K",
        "fpts": 89.34,
        "avg": 11.22,
        "last": 12
      }
    ],
    "ir": [
      {
        "name": "Jeremiyah Love",
        "espn": "4870808",
        "status": "IR",
        "team_abbr": "ARI",
        "pos": "RB",
        "fpts": 43.36,
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
    "fpts": 61.14,
    "avg": 8.31,
    "last": 1.4
  },
  {
    "name": "Bhayshul Tuten",
    "espn": "4882093",
    "status": null,
    "team_abbr": "JAX",
    "pos": "RB",
    "fpts": 134.34,
    "avg": 15.39,
    "last": 18.8
  },
  {
    "name": "Colston Loveland",
    "espn": "4723086",
    "status": "BYE",
    "team_abbr": "CHI",
    "pos": "TE",
    "fpts": 78.61,
    "avg": 7.2,
    "last": 7.4
  },
  {
    "name": "Jameson Williams",
    "espn": "4426388",
    "status": null,
    "team_abbr": "DET",
    "pos": "WR",
    "fpts": 84.74,
    "avg": 10.97,
    "last": 7
  },
  {
    "name": "DeVonta Smith",
    "espn": "4241478",
    "status": "OUT",
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 85.48,
    "avg": 14,
    "last": 0
  },
  {
    "name": "Quinshon Judkins",
    "espn": "4685702",
    "status": null,
    "team_abbr": "CLE",
    "pos": "RB",
    "fpts": 93.41,
    "avg": 10.63,
    "last": 14.6
  },
  {
    "name": "Texans",
    "status": null,
    "team_abbr": "HOU",
    "pos": "D/ST",
    "fpts": 50.21,
    "avg": 5.11,
    "last": 5
  },
  {
    "name": "A.J. Brown",
    "espn": "4047646",
    "status": "Q",
    "team_abbr": "NE",
    "pos": "WR",
    "fpts": 91.71,
    "avg": 4.58,
    "last": 3.7
  },
  {
    "name": "Emeka Egbuka",
    "espn": "4567750",
    "status": "BYE",
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 76.45,
    "avg": 8.93,
    "last": 5.4
  },
  {
    "name": "Cam Skattebo",
    "espn": "4696981",
    "status": null,
    "team_abbr": "NYG",
    "pos": "RB",
    "fpts": 97.04,
    "avg": 11.33,
    "last": 25.7
  },
  {
    "name": "Josh Jacobs",
    "espn": "4047365",
    "status": "OUT",
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 95.72,
    "avg": 12.77,
    "last": 0
  },
  {
    "name": "Tucker Kraft",
    "espn": "4572680",
    "status": null,
    "team_abbr": "GB",
    "pos": "TE",
    "fpts": 64.56,
    "avg": 7.48,
    "last": 2.4
  },
  {
    "name": "Spencer Shrader",
    "espn": "4571557",
    "status": null,
    "team_abbr": "IND",
    "pos": "K",
    "fpts": 81.19,
    "avg": 11.2,
    "last": 8
  },
  {
    "name": "Matthew Stafford",
    "espn": "12483",
    "status": null,
    "team_abbr": "LAR",
    "pos": "QB",
    "fpts": 116.13,
    "avg": 16.26,
    "last": 19.76
  },
  {
    "name": "Zach Charbonnet",
    "espn": "4426385",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 89.62,
    "avg": 7.63,
    "last": 9.4
  },
  {
    "name": "Rome Odunze",
    "espn": "4431299",
    "status": "BYE",
    "team_abbr": "CHI",
    "pos": "WR",
    "fpts": 74.64,
    "avg": 8.09,
    "last": 14
  },
  {
    "name": "Travis Etienne Jr.",
    "espn": "4239996",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 95.04,
    "avg": 7.58,
    "last": 4.9
  },
  {
    "name": "Carnell Tate",
    "espn": "4871023",
    "status": "OUT",
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 80.22,
    "avg": 8.61,
    "last": 0
  },
  {
    "name": "Jaylen Waddle",
    "espn": "4372016",
    "status": "Q",
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 81.59,
    "avg": 7.44,
    "last": 2.7
  },
  {
    "name": "Omarion Hampton",
    "espn": "4685382",
    "status": null,
    "team_abbr": "LAC",
    "pos": "RB",
    "fpts": 65.67,
    "avg": 7.84,
    "last": 6
  },
  {
    "name": "Jadarian Price",
    "espn": "4685512",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 73.02,
    "avg": 5.34,
    "last": 10.9
  },
  {
    "name": "Ladd McConkey",
    "espn": "4612826",
    "status": "OUT",
    "team_abbr": "LAC",
    "pos": "WR",
    "fpts": 67.09,
    "avg": 7.18,
    "last": 0
  },
  {
    "name": "Woody Marks",
    "espn": "4429059",
    "status": "D",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 71.87,
    "avg": 7.82,
    "last": 7
  },
  {
    "name": "Deebo Samuel Sr.",
    "espn": "3126486",
    "status": null,
    "team_abbr": "SF",
    "pos": "WR",
    "fpts": 75.86,
    "avg": 12.8,
    "last": 24.4
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
    "name": "Dalton Kincaid",
    "espn": "4385690",
    "status": null,
    "team_abbr": "BUF",
    "pos": "TE",
    "fpts": 63.28,
    "avg": 8.52,
    "last": 6.8
  },
  {
    "name": "T.J. Hockenson",
    "espn": "4036133",
    "status": "OUT",
    "team_abbr": "MIN",
    "pos": "TE",
    "fpts": 75.78,
    "avg": 8.54,
    "last": 0
  },
  {
    "name": "Rachaad White",
    "espn": "4697815",
    "status": null,
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 90.79,
    "avg": 8.3,
    "last": 5.7
  },
  {
    "name": "Emmett Johnson",
    "espn": "4832955",
    "status": null,
    "team_abbr": "KC",
    "pos": "RB",
    "fpts": 58.57,
    "avg": 9.54,
    "last": 32.1
  },
  {
    "name": "Jakobi Meyers",
    "espn": "3916433",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 83.65,
    "avg": 7.5,
    "last": 4.9
  },
  {
    "name": "Braelon Allen",
    "espn": "4685247",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "RB",
    "fpts": 57.62,
    "avg": 10.06,
    "last": 5.1
  },
  {
    "name": "Josh Downs",
    "espn": "4688813",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 70.66,
    "avg": 7.19,
    "last": 13.3
  },
  {
    "name": "Dallas Goedert",
    "espn": "3121023",
    "status": "BYE",
    "team_abbr": "PHI",
    "pos": "TE",
    "fpts": 48.9,
    "avg": 8.36,
    "last": 7.5
  },
  {
    "name": "David Montgomery",
    "espn": "4035538",
    "status": "OUT",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 83.13,
    "avg": 8.4,
    "last": 0
  },
  {
    "name": "Broncos",
    "status": "BYE",
    "team_abbr": "DEN",
    "pos": "D/ST",
    "fpts": 55.91,
    "avg": 6.22,
    "last": 6
  },
  {
    "name": "Kyle Monangai",
    "espn": "4608686",
    "status": "OUT",
    "team_abbr": "CHI",
    "pos": "RB",
    "fpts": 59.89,
    "avg": 14.2,
    "last": 0
  },
  {
    "name": "Tyler Shough",
    "espn": "4360689",
    "status": null,
    "team_abbr": "NO",
    "pos": "QB",
    "fpts": 142.51,
    "avg": 17.29,
    "last": 9.98
  },
  {
    "name": "KC Concepcion",
    "espn": "4870653",
    "status": null,
    "team_abbr": "CLE",
    "pos": "WR",
    "fpts": 67.82,
    "avg": 8.01,
    "last": 10.2
  },
  {
    "name": "Rico Dowdle",
    "espn": "4038815",
    "status": null,
    "team_abbr": "PIT",
    "pos": "RB",
    "fpts": 76.14,
    "avg": 7.08,
    "last": 4.4
  },
  {
    "name": "Tyler Allgeier",
    "espn": "4373626",
    "status": null,
    "team_abbr": "ARI",
    "pos": "RB",
    "fpts": 61.19,
    "avg": 8.06,
    "last": 1.4
  },
  {
    "name": "Khalil Shakir",
    "espn": "4373678",
    "status": null,
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 72.57,
    "avg": 7.47,
    "last": 6.5
  },
  {
    "name": "Kirk Cousins",
    "espn": "14880",
    "status": null,
    "team_abbr": "MIN",
    "pos": "QB",
    "fpts": 134.28,
    "avg": 18.77,
    "last": 15.38
  },
  {
    "name": "Xavier Worthy",
    "espn": "4683062",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 64.15,
    "avg": 5.59,
    "last": 0
  },
  {
    "name": "Hunter Henry",
    "espn": "3046439",
    "status": null,
    "team_abbr": "NE",
    "pos": "TE",
    "fpts": 55.31,
    "avg": 6.73,
    "last": 3.2
  },
  {
    "name": "Alvin Kamara",
    "espn": "3054850",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 63.56,
    "avg": 9.51,
    "last": 14.9
  },
  {
    "name": "Tank Dell",
    "espn": "4366031",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 67.29,
    "avg": 9.03,
    "last": 3.6
  },
  {
    "name": "Bills",
    "status": null,
    "team_abbr": "BUF",
    "pos": "D/ST",
    "fpts": 51.47,
    "avg": 5.67,
    "last": 10
  },
  {
    "name": "J.K. Dobbins",
    "espn": "4241985",
    "status": "BYE",
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 49.72,
    "avg": 6.44,
    "last": 2.7
  },
  {
    "name": "Chris Boswell",
    "espn": "17372",
    "status": null,
    "team_abbr": "PIT",
    "pos": "K",
    "fpts": 97.97,
    "avg": 9.11,
    "last": 5
  },
  {
    "name": "Tre Tucker",
    "espn": "4428718",
    "status": null,
    "team_abbr": "LV",
    "pos": "WR",
    "fpts": 59.68,
    "avg": 9.42,
    "last": 1.4
  },
  {
    "name": "Jordan Mason",
    "espn": "4360569",
    "status": null,
    "team_abbr": "MIN",
    "pos": "RB",
    "fpts": 83.65,
    "avg": 6.36,
    "last": 5.9
  },
  {
    "name": "Courtland Sutton",
    "espn": "3128429",
    "status": "BYE",
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 63.92,
    "avg": 5.68,
    "last": 13
  },
  {
    "name": "Wan'Dale Robinson",
    "espn": "4569587",
    "status": "Q",
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 64.86,
    "avg": 6.92,
    "last": 2.5
  },
  {
    "name": "Chiefs",
    "status": null,
    "team_abbr": "KC",
    "pos": "D/ST",
    "fpts": 53.01,
    "avg": 6.56,
    "last": 9
  },
  {
    "name": "Brenton Strange",
    "espn": "4430539",
    "status": null,
    "team_abbr": "JAX",
    "pos": "TE",
    "fpts": 65.32,
    "avg": 7.17,
    "last": 7.9
  },
  {
    "name": "Jake Bates",
    "espn": "4689936",
    "status": null,
    "team_abbr": "DET",
    "pos": "K",
    "fpts": 81.46,
    "avg": 9.33,
    "last": 5
  },
  {
    "name": "Marvin Harrison Jr.",
    "espn": "4432708",
    "status": "OUT",
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 43.04,
    "avg": 4.57,
    "last": 0
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
    "name": "Mark Andrews",
    "espn": "3116365",
    "status": null,
    "team_abbr": "BAL",
    "pos": "TE",
    "fpts": 38.97,
    "avg": 4.8,
    "last": 2.9
  },
  {
    "name": "Harrison Butker",
    "espn": "3055899",
    "status": null,
    "team_abbr": "KC",
    "pos": "K",
    "fpts": 83.92,
    "avg": 7.11,
    "last": 5
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
    "name": "Keenan Allen",
    "espn": "15818",
    "status": null,
    "team_abbr": "SF",
    "pos": "WR",
    "fpts": 44.96,
    "avg": 7.74,
    "last": 8.6
  },
  {
    "name": "Packers",
    "status": null,
    "team_abbr": "GB",
    "pos": "D/ST",
    "fpts": 49.78,
    "avg": 7.1,
    "last": 4
  },
  {
    "name": "Matt Gay",
    "espn": "4249087",
    "status": null,
    "team_abbr": "LV",
    "pos": "K",
    "fpts": 68.54,
    "avg": 9.6,
    "last": 8
  },
  {
    "name": "Makai Lemon",
    "espn": "4870795",
    "status": "BYE",
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 33.86,
    "avg": 6.13,
    "last": 9.1
  },
  {
    "name": "Kenny Gainwell",
    "espn": "4371733",
    "status": "BYE",
    "team_abbr": "TB",
    "pos": "RB",
    "fpts": 67.57,
    "avg": 6.23,
    "last": 9.1
  },
  {
    "name": "Dominic Zvada",
    "espn": "5082424",
    "status": null,
    "team_abbr": "NYG",
    "pos": "K",
    "fpts": 92.29,
    "avg": 8.44,
    "last": 2
  },
  {
    "name": "Devaughn Vele",
    "espn": "4569559",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 50.3,
    "avg": 8.27,
    "last": 2.4
  },
  {
    "name": "Patriots",
    "status": null,
    "team_abbr": "NE",
    "pos": "D/ST",
    "fpts": 43.69,
    "avg": 4.4,
    "last": -2
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
    "name": "Audric Estime",
    "espn": "4569682",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 4.83,
    "avg": 7.9,
    "last": 1.6
  },
  {
    "name": "Corey Kiner",
    "espn": "4431431",
    "status": null,
    "team_abbr": "NE",
    "pos": "RB",
    "fpts": 46.47,
    "avg": 3.35,
    "last": 2.5
  },
  {
    "name": "Browns",
    "status": null,
    "team_abbr": "CLE",
    "pos": "D/ST",
    "fpts": 49.86,
    "avg": 5.7,
    "last": 5
  },
  {
    "name": "Jordyn Tyson",
    "espn": "4880281",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 59.16,
    "avg": 8.25,
    "last": 13.5
  },
  {
    "name": "Chris Godwin Jr.",
    "espn": "3116165",
    "status": "BYE",
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 45.26,
    "avg": 4.82,
    "last": 3.8
  },
  {
    "name": "Cameron Dicker",
    "espn": "4362081",
    "status": null,
    "team_abbr": "LAC",
    "pos": "K",
    "fpts": 74.14,
    "avg": 7.5,
    "last": 13
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
    "fpts": 50.51,
    "avg": 7.63,
    "last": 3.8
  },
  {
    "name": "Bears",
    "status": "BYE",
    "team_abbr": "CHI",
    "pos": "D/ST",
    "fpts": 46.98,
    "avg": 7.67,
    "last": 13
  },
  {
    "name": "Pat Freiermuth",
    "espn": "4361411",
    "status": null,
    "team_abbr": "PIT",
    "pos": "TE",
    "fpts": 61.55,
    "avg": 8.56,
    "last": 10.5
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
    "name": "Adonai Mitchell",
    "espn": "4597500",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "WR",
    "fpts": 70.77,
    "avg": 7.98,
    "last": 7.4
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
    "name": "Aaron Rodgers",
    "espn": "8439",
    "status": null,
    "team_abbr": "PIT",
    "pos": "QB",
    "fpts": 141.27,
    "avg": 14.75,
    "last": 15.62
  },
  {
    "name": "Jake Ferguson",
    "espn": "4242355",
    "status": "OUT",
    "team_abbr": "DAL",
    "pos": "TE",
    "fpts": 21.92,
    "avg": 5.01,
    "last": 0
  },
  {
    "name": "Kyler Murray",
    "espn": "3917315",
    "status": "OUT",
    "team_abbr": "MIN",
    "pos": "QB",
    "fpts": 0,
    "avg": 12.26,
    "last": 0
  },
  {
    "name": "Kaelon Black",
    "espn": "4696044",
    "status": null,
    "team_abbr": "SF",
    "pos": "RB",
    "fpts": 59.06,
    "avg": 5.53,
    "last": 13.6
  },
  {
    "name": "Brian Thomas Jr.",
    "espn": "4432773",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 46.24,
    "avg": 3.68,
    "last": 4.4
  },
  {
    "name": "Eddy Pineiro",
    "espn": "4034949",
    "status": null,
    "team_abbr": "SF",
    "pos": "K",
    "fpts": 62.01,
    "avg": 6.33,
    "last": 8
  },
  {
    "name": "Malik Washington",
    "espn": "4569603",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 63.93,
    "avg": 7.91,
    "last": 11.86
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
    "name": "Giants",
    "status": null,
    "team_abbr": "NYG",
    "pos": "D/ST",
    "fpts": 48.3,
    "avg": 6.11,
    "last": 5
  },
  {
    "name": "Lions",
    "status": null,
    "team_abbr": "DET",
    "pos": "D/ST",
    "fpts": 40.09,
    "avg": 5.67,
    "last": 13
  },
  {
    "name": "MarShawn Lloyd",
    "espn": "4429023",
    "status": null,
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 12.25,
    "avg": 5.63,
    "last": 5.4
  },
  {
    "name": "Darren Waller",
    "espn": "2576925",
    "status": null,
    "team_abbr": "CAR",
    "pos": "TE",
    "fpts": 58.96,
    "avg": 7.64,
    "last": 3.4
  },
  {
    "name": "Bengals",
    "status": null,
    "team_abbr": "CIN",
    "pos": "D/ST",
    "fpts": 48.87,
    "avg": 6.44,
    "last": 5
  },
  {
    "name": "Caleb Douglas",
    "espn": "4869645",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 63.29,
    "avg": 9.95,
    "last": 8.6
  },
  {
    "name": "Justin Herbert",
    "espn": "4038941",
    "status": null,
    "team_abbr": "LAC",
    "pos": "QB",
    "fpts": 103.51,
    "avg": 10.08,
    "last": 10.42
  },
  {
    "name": "Buccaneers",
    "status": "BYE",
    "team_abbr": "TB",
    "pos": "D/ST",
    "fpts": 56.89,
    "avg": 10.33,
    "last": 11
  }
];
