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
        "fpts": 177.54,
        "avg": 18.4,
        "last": 13.58
      },
      {
        "name": "Jahmyr Gibbs",
        "espn": "4429795",
        "status": null,
        "team_abbr": "DET",
        "pos": "RB",
        "fpts": 190.66,
        "avg": 24.03,
        "last": 13.4
      },
      {
        "name": "James Cook III",
        "espn": "4379399",
        "status": null,
        "team_abbr": "BUF",
        "pos": "RB",
        "fpts": 163.34,
        "avg": 17.8,
        "last": 16.7
      },
      {
        "name": "Justin Jefferson",
        "espn": "4262921",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 136.97,
        "avg": 11.39,
        "last": 7.3
      },
      {
        "name": "Parker Washington",
        "espn": "4432620",
        "status": null,
        "team_abbr": "JAX",
        "pos": "WR",
        "fpts": 108.08,
        "avg": 11.89,
        "last": 13.1
      },
      {
        "name": "Jordan Addison",
        "espn": "4429205",
        "status": "Q",
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 85.46,
        "avg": 6.41,
        "last": 3.8
      },
      {
        "name": "Trey McBride",
        "espn": "4361307",
        "status": null,
        "team_abbr": "ARI",
        "pos": "TE",
        "fpts": 94.03,
        "avg": 14.03,
        "last": 8.9
      },
      {
        "name": "CeeDee Lamb",
        "espn": "4241389",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 134.02,
        "avg": 18.53,
        "last": 28.5
      },
      {
        "name": "Blake Corum",
        "espn": "4429096",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 74.01,
        "avg": 9.96,
        "last": 11.8
      },
      {
        "name": "Joe Burrow",
        "espn": "3915511",
        "status": null,
        "team_abbr": "CIN",
        "pos": "QB",
        "fpts": 194.38,
        "avg": 24.89,
        "last": 29.54
      },
      {
        "name": "Rams",
        "status": null,
        "team_abbr": "LAR",
        "pos": "D/ST",
        "fpts": 63.37,
        "avg": 5.33,
        "last": 11
      },
      {
        "name": "Brandon Aubrey",
        "espn": "3953687",
        "status": null,
        "team_abbr": "DAL",
        "pos": "K",
        "fpts": 84.12,
        "avg": 8.89,
        "last": 9
      }
    ],
    "bench": [
      {
        "name": "D'Andre Swift",
        "espn": "4259545",
        "status": "BYE",
        "team_abbr": "CHI",
        "pos": "RB",
        "fpts": 111.63,
        "avg": 15.76,
        "last": 3.1
      },
      {
        "name": "Aaron Jones Sr.",
        "espn": "3042519",
        "status": null,
        "team_abbr": "MIN",
        "pos": "RB",
        "fpts": 73.21,
        "avg": 9.36,
        "last": 2.6
      },
      {
        "name": "Michael Wilson",
        "espn": "4360761",
        "status": "IR",
        "team_abbr": "ARI",
        "pos": "WR",
        "fpts": 0,
        "avg": 10.58,
        "last": 9
      },
      {
        "name": "Germie Bernard",
        "espn": "4685261",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 76.96,
        "avg": 6.35,
        "last": 5.5
      },
      {
        "name": "Jordan Love",
        "espn": "4036378",
        "status": null,
        "team_abbr": "GB",
        "pos": "QB",
        "fpts": 148.71,
        "avg": 20.56,
        "last": 36.18
      },
      {
        "name": "DJ Moore",
        "espn": "3915416",
        "status": null,
        "team_abbr": "BUF",
        "pos": "WR",
        "fpts": 99.73,
        "avg": 8.33,
        "last": 5.1
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
        "last": 28
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
        "avg": 18.42,
        "last": 5.3
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
        "status": "Q",
        "team_abbr": "KC",
        "pos": "RB",
        "fpts": 207.85,
        "avg": 22.92,
        "last": 34.3
      },
      {
        "name": "Ja'Marr Chase",
        "espn": "4362628",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 176.16,
        "avg": 16.65,
        "last": 26.5
      },
      {
        "name": "Rashee Rice",
        "espn": "4428331",
        "status": null,
        "team_abbr": "KC",
        "pos": "WR",
        "fpts": 90.74,
        "avg": 8.95,
        "last": 7.4
      },
      {
        "name": "Denzel Boston",
        "espn": "4832800",
        "status": "Q",
        "team_abbr": "CLE",
        "pos": "WR",
        "fpts": 86.4,
        "avg": 9.63,
        "last": 12.8
      },
      {
        "name": "George Kittle",
        "espn": "3040151",
        "status": null,
        "team_abbr": "SF",
        "pos": "TE",
        "fpts": 108.03,
        "avg": 11.91,
        "last": 7.8
      },
      {
        "name": "Breece Hall",
        "espn": "4427366",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "RB",
        "fpts": 91.29,
        "avg": 11.93,
        "last": 10.2
      },
      {
        "name": "DK Metcalf",
        "espn": "4047650",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 93.61,
        "avg": 7.68,
        "last": 0.9
      },
      {
        "name": "Patrick Mahomes",
        "espn": "3139477",
        "status": null,
        "team_abbr": "KC",
        "pos": "QB",
        "fpts": 155.6,
        "avg": 17.75,
        "last": 16.48
      },
      {
        "name": "Seahawks",
        "status": null,
        "team_abbr": "SEA",
        "pos": "D/ST",
        "fpts": 59.58,
        "avg": 8.56,
        "last": 10
      },
      {
        "name": "Jason Myers",
        "espn": "2473037",
        "status": null,
        "team_abbr": "SEA",
        "pos": "K",
        "fpts": 66.21,
        "avg": 8.33,
        "last": 6
      }
    ],
    "bench": [
      {
        "name": "Ravens",
        "status": null,
        "team_abbr": "BAL",
        "pos": "D/ST",
        "fpts": 45.55,
        "avg": 3.67,
        "last": 1
      },
      {
        "name": "Dak Prescott",
        "espn": "2577417",
        "status": null,
        "team_abbr": "DAL",
        "pos": "QB",
        "fpts": 135.66,
        "avg": 18.6,
        "last": 19.5
      },
      {
        "name": "Harold Fannin Jr.",
        "espn": "5083076",
        "status": null,
        "team_abbr": "CLE",
        "pos": "TE",
        "fpts": 64.12,
        "avg": 9.31,
        "last": 11.2
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
        "avg": 13.69,
        "last": 27.2
      },
      {
        "name": "Bucky Irving",
        "espn": "4596448",
        "status": "BYE",
        "team_abbr": "TB",
        "pos": "RB",
        "fpts": 140.09,
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
        "fpts": 170.79,
        "avg": 20.51,
        "last": 35.36
      },
      {
        "name": "Chuba Hubbard",
        "espn": "4241416",
        "status": null,
        "team_abbr": "CAR",
        "pos": "RB",
        "fpts": 151.86,
        "avg": 16.7,
        "last": 11.6
      },
      {
        "name": "Ashton Jeanty",
        "espn": "4890973",
        "status": null,
        "team_abbr": "LV",
        "pos": "RB",
        "fpts": 105.04,
        "avg": 13.14,
        "last": 4.5
      },
      {
        "name": "Jaxon Smith-Njigba",
        "espn": "4430878",
        "status": null,
        "team_abbr": "SEA",
        "pos": "WR",
        "fpts": 135.47,
        "avg": 21.84,
        "last": 8.6
      },
      {
        "name": "Drake London",
        "espn": "4426502",
        "status": null,
        "team_abbr": "ATL",
        "pos": "WR",
        "fpts": 100.13,
        "avg": 11.07,
        "last": 9.3
      },
      {
        "name": "Malik Nabers",
        "espn": "4595348",
        "status": null,
        "team_abbr": "NYG",
        "pos": "WR",
        "fpts": 118.44,
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
        "fpts": 127.21,
        "avg": 16.04,
        "last": 20.8
      },
      {
        "name": "Tee Higgins",
        "espn": "4239993",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 124.04,
        "avg": 16.98,
        "last": 17.7
      },
      {
        "name": "Fernando Mendoza",
        "espn": "4837248",
        "status": null,
        "team_abbr": "LV",
        "pos": "QB",
        "fpts": 125.2,
        "avg": 0.74,
        "last": 0
      },
      {
        "name": "Vikings",
        "status": null,
        "team_abbr": "MIN",
        "pos": "D/ST",
        "fpts": 49.55,
        "avg": 10.63,
        "last": 6
      },
      {
        "name": "Spencer Shrader",
        "espn": "4571557",
        "status": null,
        "team_abbr": "IND",
        "pos": "K",
        "fpts": 81.19,
        "avg": 11.56,
        "last": 16
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
        "avg": 8.5,
        "last": 19
      },
      {
        "name": "Chase Brown",
        "espn": "4362238",
        "status": null,
        "team_abbr": "CIN",
        "pos": "RB",
        "fpts": 115.84,
        "avg": 10.24,
        "last": 9
      },
      {
        "name": "Rhamondre Stevenson",
        "espn": "4569173",
        "status": "Q",
        "team_abbr": "NE",
        "pos": "RB",
        "fpts": 72.99,
        "avg": 11.19,
        "last": 13.3
      },
      {
        "name": "Jalen Coker",
        "espn": "4695883",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 78.88,
        "avg": 10.07,
        "last": 4.6
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
        "status": null,
        "team_abbr": "NE",
        "pos": "QB",
        "fpts": 173.75,
        "avg": 19.91,
        "last": 18.26
      },
      {
        "name": "Bijan Robinson",
        "espn": "4430807",
        "status": null,
        "team_abbr": "ATL",
        "pos": "RB",
        "fpts": 147.82,
        "avg": 18.28,
        "last": 23.7
      },
      {
        "name": "Ollie Gordon II",
        "espn": "4711533",
        "status": null,
        "team_abbr": "MIA",
        "pos": "RB",
        "fpts": 117.31,
        "avg": 9.51,
        "last": 6.9
      },
      {
        "name": "Christian Watson",
        "espn": "4248528",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 111.77,
        "avg": 16.93,
        "last": 26.6
      },
      {
        "name": "Matthew Golden",
        "espn": "4701936",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 124.73,
        "avg": 15.27,
        "last": 27.4
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
        "fpts": 81.19,
        "avg": 10.35,
        "last": 15.3
      },
      {
        "name": "Kyren Williams",
        "espn": "4430737",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 117.02,
        "avg": 15.68,
        "last": 7.6
      },
      {
        "name": "Zay Flowers",
        "espn": "4429615",
        "status": null,
        "team_abbr": "BAL",
        "pos": "WR",
        "fpts": 86.59,
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
        "avg": 21.41,
        "last": 25.28
      },
      {
        "name": "Jaguars",
        "status": null,
        "team_abbr": "JAX",
        "pos": "D/ST",
        "fpts": 57.03,
        "avg": 8.38,
        "last": 12
      },
      {
        "name": "Cam Little",
        "espn": "4686361",
        "status": null,
        "team_abbr": "JAX",
        "pos": "K",
        "fpts": 85.76,
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
        "fpts": 76.63,
        "avg": 9.45,
        "last": 5.2
      },
      {
        "name": "Omar Cooper Jr.",
        "espn": "4723820",
        "status": "Q",
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 60.48,
        "avg": 10.52,
        "last": 9.8
      },
      {
        "name": "Luther Burden III",
        "espn": "4685278",
        "status": "Q",
        "team_abbr": "CHI",
        "pos": "WR",
        "fpts": 94.82,
        "avg": 12.42,
        "last": 17.2
      },
      {
        "name": "DeMario Douglas",
        "espn": "4427095",
        "status": null,
        "team_abbr": "NE",
        "pos": "WR",
        "fpts": 62.37,
        "avg": 8.99,
        "last": 12.7
      },
      {
        "name": "Caleb Williams",
        "espn": "4431611",
        "status": "BYE",
        "team_abbr": "CHI",
        "pos": "QB",
        "fpts": 136.78,
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
        "avg": 18.59,
        "last": 21.7
      },
      {
        "name": "Jonathan Taylor",
        "espn": "4242335",
        "status": null,
        "team_abbr": "IND",
        "pos": "RB",
        "fpts": 120.91,
        "avg": 15.62,
        "last": 6.9
      },
      {
        "name": "Amon-Ra St. Brown",
        "espn": "4374302",
        "status": "Q",
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 135.96,
        "avg": 15.89,
        "last": 12.6
      },
      {
        "name": "Chris Olave",
        "espn": "4361370",
        "status": null,
        "team_abbr": "NO",
        "pos": "WR",
        "fpts": 109.3,
        "avg": 14.18,
        "last": 13.3
      },
      {
        "name": "Tetairoa McMillan",
        "espn": "4685472",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 113.45,
        "avg": 12.69,
        "last": 13.6
      },
      {
        "name": "Brock Bowers",
        "espn": "4432665",
        "status": null,
        "team_abbr": "LV",
        "pos": "TE",
        "fpts": 106.39,
        "avg": 17.43,
        "last": 18.8
      },
      {
        "name": "Nico Collins",
        "espn": "4258173",
        "status": null,
        "team_abbr": "HOU",
        "pos": "WR",
        "fpts": 103.17,
        "avg": 12.93,
        "last": 13.5
      },
      {
        "name": "Javonte Williams",
        "espn": "4361579",
        "status": null,
        "team_abbr": "DAL",
        "pos": "RB",
        "fpts": 119.9,
        "avg": 16.4,
        "last": 20.4
      },
      {
        "name": "Josh Allen",
        "espn": "3918298",
        "status": null,
        "team_abbr": "BUF",
        "pos": "QB",
        "fpts": 202.4,
        "avg": 25.02,
        "last": 12.86
      },
      {
        "name": "Steelers",
        "status": null,
        "team_abbr": "PIT",
        "pos": "D/ST",
        "fpts": 67.22,
        "avg": 9.13,
        "last": 16
      },
      {
        "name": "Tyler Bass",
        "espn": "3917232",
        "status": null,
        "team_abbr": "BUF",
        "pos": "K",
        "fpts": 97.96,
        "avg": 11.38,
        "last": 13
      }
    ],
    "bench": [
      {
        "name": "George Pickens",
        "espn": "4426354",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 78.1,
        "avg": 10.6,
        "last": 0
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
        "fpts": 60.47,
        "avg": 6.5,
        "last": 3.8
      },
      {
        "name": "Garrett Wilson",
        "espn": "4569618",
        "status": "Q",
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 81.71,
        "avg": 11.53,
        "last": 0
      },
      {
        "name": "Bryce Young",
        "espn": "4685720",
        "status": null,
        "team_abbr": "CAR",
        "pos": "QB",
        "fpts": 151.67,
        "avg": 18.32,
        "last": 20.34
      },
      {
        "name": "Will Reichard",
        "espn": "4567104",
        "status": null,
        "team_abbr": "MIN",
        "pos": "K",
        "fpts": 89.34,
        "avg": 11.13,
        "last": 9
      }
    ],
    "ir": [
      {
        "name": "Jeremiyah Love",
        "espn": "4870808",
        "status": "IR",
        "team_abbr": "ARI",
        "pos": "RB",
        "fpts": 43.33,
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
    "fpts": 61.13,
    "avg": 9.3,
    "last": 6.4
  },
  {
    "name": "Bhayshul Tuten",
    "espn": "4882093",
    "status": null,
    "team_abbr": "JAX",
    "pos": "RB",
    "fpts": 134.34,
    "avg": 14.96,
    "last": 8.9
  },
  {
    "name": "Colston Loveland",
    "espn": "4723086",
    "status": "BYE",
    "team_abbr": "CHI",
    "pos": "TE",
    "fpts": 78.58,
    "avg": 7.2,
    "last": 7.4
  },
  {
    "name": "DeVonta Smith",
    "espn": "4241478",
    "status": "OUT",
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 85.49,
    "avg": 14,
    "last": 0
  },
  {
    "name": "Jameson Williams",
    "espn": "4426388",
    "status": null,
    "team_abbr": "DET",
    "pos": "WR",
    "fpts": 84.74,
    "avg": 11.46,
    "last": 4.5
  },
  {
    "name": "Quinshon Judkins",
    "espn": "4685702",
    "status": null,
    "team_abbr": "CLE",
    "pos": "RB",
    "fpts": 93.42,
    "avg": 10.14,
    "last": 5
  },
  {
    "name": "Texans",
    "status": null,
    "team_abbr": "HOU",
    "pos": "D/ST",
    "fpts": 50.21,
    "avg": 5.13,
    "last": 12
  },
  {
    "name": "Emeka Egbuka",
    "espn": "4567750",
    "status": "BYE",
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 76.43,
    "avg": 8.93,
    "last": 5.4
  },
  {
    "name": "A.J. Brown",
    "espn": "4047646",
    "status": "Q",
    "team_abbr": "NE",
    "pos": "WR",
    "fpts": 92.01,
    "avg": 4.87,
    "last": 0
  },
  {
    "name": "Josh Jacobs",
    "espn": "4047365",
    "status": "OUT",
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 95.76,
    "avg": 12.77,
    "last": 0.5
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
    "name": "Tucker Kraft",
    "espn": "4572680",
    "status": null,
    "team_abbr": "GB",
    "pos": "TE",
    "fpts": 64.6,
    "avg": 8.04,
    "last": 1.4
  },
  {
    "name": "Matthew Stafford",
    "espn": "12483",
    "status": null,
    "team_abbr": "LAR",
    "pos": "QB",
    "fpts": 116.13,
    "avg": 15.87,
    "last": 11.22
  },
  {
    "name": "Ka'imi Fairbairn",
    "espn": "2971573",
    "status": null,
    "team_abbr": "HOU",
    "pos": "K",
    "fpts": 92.75,
    "avg": 11.5,
    "last": 17
  },
  {
    "name": "Zach Charbonnet",
    "espn": "4426385",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 89.62,
    "avg": 6.75,
    "last": 9.1
  },
  {
    "name": "Rome Odunze",
    "espn": "4431299",
    "status": "BYE",
    "team_abbr": "CHI",
    "pos": "WR",
    "fpts": 74.61,
    "avg": 8.09,
    "last": 14
  },
  {
    "name": "Carnell Tate",
    "espn": "4871023",
    "status": "OUT",
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 80.21,
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
    "fpts": 65.59,
    "avg": 7.84,
    "last": 6
  },
  {
    "name": "Ladd McConkey",
    "espn": "4612826",
    "status": "Q",
    "team_abbr": "LAC",
    "pos": "WR",
    "fpts": 75.25,
    "avg": 7.18,
    "last": 0
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
    "name": "T.J. Hockenson",
    "espn": "4036133",
    "status": "OUT",
    "team_abbr": "MIN",
    "pos": "TE",
    "fpts": 75.77,
    "avg": 8.54,
    "last": 5.3
  },
  {
    "name": "Woody Marks",
    "espn": "4429059",
    "status": null,
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 66.86,
    "avg": 7.93,
    "last": 7.9
  },
  {
    "name": "Travis Etienne Jr.",
    "espn": "4239996",
    "status": "IR",
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 95.36,
    "avg": 8.47,
    "last": 0
  },
  {
    "name": "Jadarian Price",
    "espn": "4685512",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 73.02,
    "avg": 4.42,
    "last": 9.8
  },
  {
    "name": "Deebo Samuel Sr.",
    "espn": "3126486",
    "status": null,
    "team_abbr": "SF",
    "pos": "WR",
    "fpts": 75.86,
    "avg": 10.48,
    "last": 0
  },
  {
    "name": "Dalton Kincaid",
    "espn": "4385690",
    "status": null,
    "team_abbr": "BUF",
    "pos": "TE",
    "fpts": 63.28,
    "avg": 8.74,
    "last": 4.3
  },
  {
    "name": "Braelon Allen",
    "espn": "4685247",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "RB",
    "fpts": 57.62,
    "avg": 10.61,
    "last": 4.4
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
    "name": "Dallas Goedert",
    "espn": "3121023",
    "status": "BYE",
    "team_abbr": "PHI",
    "pos": "TE",
    "fpts": 48.91,
    "avg": 8.36,
    "last": 7.5
  },
  {
    "name": "David Montgomery",
    "espn": "4035538",
    "status": "Q",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 93.29,
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
    "name": "Jakobi Meyers",
    "espn": "3916433",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 83.67,
    "avg": 7.82,
    "last": 8.5
  },
  {
    "name": "Josh Downs",
    "espn": "4688813",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 67.05,
    "avg": 6.51,
    "last": 3.9
  },
  {
    "name": "Kyle Monangai",
    "espn": "4608686",
    "status": "OUT",
    "team_abbr": "CHI",
    "pos": "RB",
    "fpts": 59.88,
    "avg": 14.2,
    "last": 0
  },
  {
    "name": "Tyler Shough",
    "espn": "4360689",
    "status": null,
    "team_abbr": "NO",
    "pos": "QB",
    "fpts": 142.54,
    "avg": 18.2,
    "last": 19.7
  },
  {
    "name": "KC Concepcion",
    "espn": "4870653",
    "status": null,
    "team_abbr": "CLE",
    "pos": "WR",
    "fpts": 67.87,
    "avg": 7.77,
    "last": 16.8
  },
  {
    "name": "Rico Dowdle",
    "espn": "4038815",
    "status": null,
    "team_abbr": "PIT",
    "pos": "RB",
    "fpts": 76.14,
    "avg": 7.62,
    "last": 11.6
  },
  {
    "name": "Tyler Allgeier",
    "espn": "4373626",
    "status": null,
    "team_abbr": "ARI",
    "pos": "RB",
    "fpts": 61.17,
    "avg": 8.8,
    "last": 5.6
  },
  {
    "name": "Kirk Cousins",
    "espn": "14880",
    "status": null,
    "team_abbr": "MIN",
    "pos": "QB",
    "fpts": 134.25,
    "avg": 19.14,
    "last": 12.64
  },
  {
    "name": "Alvin Kamara",
    "espn": "3054850",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 64.02,
    "avg": 8.74,
    "last": 6.4
  },
  {
    "name": "Xavier Worthy",
    "espn": "4683062",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 60.7,
    "avg": 6.29,
    "last": 7.8
  },
  {
    "name": "Khalil Shakir",
    "espn": "4373678",
    "status": null,
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 72.57,
    "avg": 7.59,
    "last": 7.8
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
    "name": "Hunter Henry",
    "espn": "3046439",
    "status": null,
    "team_abbr": "NE",
    "pos": "TE",
    "fpts": 55.48,
    "avg": 7.12,
    "last": 5
  },
  {
    "name": "Tre Tucker",
    "espn": "4428718",
    "status": null,
    "team_abbr": "LV",
    "pos": "WR",
    "fpts": 59.67,
    "avg": 10.31,
    "last": 7.5
  },
  {
    "name": "Bills",
    "status": null,
    "team_abbr": "BUF",
    "pos": "D/ST",
    "fpts": 51.47,
    "avg": 5.13,
    "last": 15
  },
  {
    "name": "Courtland Sutton",
    "espn": "3128429",
    "status": "BYE",
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 63.93,
    "avg": 5.68,
    "last": 13
  },
  {
    "name": "Chris Boswell",
    "espn": "17372",
    "status": null,
    "team_abbr": "PIT",
    "pos": "K",
    "fpts": 97.97,
    "avg": 9.63,
    "last": 8
  },
  {
    "name": "Jordan Mason",
    "espn": "4360569",
    "status": null,
    "team_abbr": "MIN",
    "pos": "RB",
    "fpts": 83.61,
    "avg": 6.48,
    "last": 5.2
  },
  {
    "name": "Marvin Harrison Jr.",
    "espn": "4432708",
    "status": "OUT",
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 43.05,
    "avg": 4.57,
    "last": 3
  },
  {
    "name": "TreVeyon Henderson",
    "espn": "4432710",
    "status": "OUT",
    "team_abbr": "NE",
    "pos": "RB",
    "fpts": 39.8,
    "avg": 5.22,
    "last": 0
  },
  {
    "name": "Tank Dell",
    "espn": "4366031",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 67.24,
    "avg": 11.75,
    "last": 18.5
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
    "name": "Chiefs",
    "status": null,
    "team_abbr": "KC",
    "pos": "D/ST",
    "fpts": 53.01,
    "avg": 6.25,
    "last": 12
  },
  {
    "name": "Jake Bates",
    "espn": "4689936",
    "status": null,
    "team_abbr": "DET",
    "pos": "K",
    "fpts": 81.47,
    "avg": 9.88,
    "last": 15
  },
  {
    "name": "Audric Estime",
    "espn": "4569682",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 4.01,
    "avg": 11.05,
    "last": 14.2
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
    "name": "Harrison Butker",
    "espn": "3055899",
    "status": null,
    "team_abbr": "KC",
    "pos": "K",
    "fpts": 83.92,
    "avg": 7.38,
    "last": 4
  },
  {
    "name": "Wan'Dale Robinson",
    "espn": "4569587",
    "status": null,
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 64.85,
    "avg": 7.48,
    "last": 12.7
  },
  {
    "name": "Brenton Strange",
    "espn": "4430539",
    "status": null,
    "team_abbr": "JAX",
    "pos": "TE",
    "fpts": 65.34,
    "avg": 7.08,
    "last": 3.2
  },
  {
    "name": "Keenan Allen",
    "espn": "15818",
    "status": null,
    "team_abbr": "SF",
    "pos": "WR",
    "fpts": 44.96,
    "avg": 7.64,
    "last": 4.6
  },
  {
    "name": "Matt Gay",
    "espn": "4249087",
    "status": null,
    "team_abbr": "LV",
    "pos": "K",
    "fpts": 68.53,
    "avg": 9.78,
    "last": 7
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
    "fpts": 67.56,
    "avg": 6.23,
    "last": 9.1
  },
  {
    "name": "Packers",
    "status": null,
    "team_abbr": "GB",
    "pos": "D/ST",
    "fpts": 50.02,
    "avg": 7.44,
    "last": 11
  },
  {
    "name": "Devaughn Vele",
    "espn": "4569559",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 50.3,
    "avg": 9,
    "last": 2.7
  },
  {
    "name": "Patriots",
    "status": null,
    "team_abbr": "NE",
    "pos": "D/ST",
    "fpts": 43.69,
    "avg": 5.11,
    "last": -5
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
    "name": "Browns",
    "status": null,
    "team_abbr": "CLE",
    "pos": "D/ST",
    "fpts": 49.86,
    "avg": 5.78,
    "last": 8
  },
  {
    "name": "Chris Godwin Jr.",
    "espn": "3116165",
    "status": "BYE",
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 45.25,
    "avg": 4.82,
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
    "name": "Jordyn Tyson",
    "espn": "4880281",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 59.16,
    "avg": 3,
    "last": 3
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
    "name": "Juwan Johnson",
    "espn": "3929645",
    "status": null,
    "team_abbr": "NO",
    "pos": "TE",
    "fpts": 50.51,
    "avg": 8.11,
    "last": 10.4
  },
  {
    "name": "Corey Kiner",
    "espn": "4431431",
    "status": null,
    "team_abbr": "NE",
    "pos": "RB",
    "fpts": 34.23,
    "avg": 3.44,
    "last": 11.5
  },
  {
    "name": "Pat Freiermuth",
    "espn": "4361411",
    "status": null,
    "team_abbr": "PIT",
    "pos": "TE",
    "fpts": 61.55,
    "avg": 8.31,
    "last": 10.6
  },
  {
    "name": "Adonai Mitchell",
    "espn": "4597500",
    "status": "Q",
    "team_abbr": "NYJ",
    "pos": "WR",
    "fpts": 70.77,
    "avg": 8.1,
    "last": 0
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
    "name": "Aaron Rodgers",
    "espn": "8439",
    "status": null,
    "team_abbr": "PIT",
    "pos": "QB",
    "fpts": 141.27,
    "avg": 14.64,
    "last": 4.88
  },
  {
    "name": "Jake Ferguson",
    "espn": "4242355",
    "status": "OUT",
    "team_abbr": "DAL",
    "pos": "TE",
    "fpts": 21.88,
    "avg": 5.01,
    "last": 9.1
  },
  {
    "name": "Brian Thomas Jr.",
    "espn": "4432773",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 46.25,
    "avg": 3.59,
    "last": 0
  },
  {
    "name": "Kaelon Black",
    "espn": "4696044",
    "status": null,
    "team_abbr": "SF",
    "pos": "RB",
    "fpts": 59.06,
    "avg": 4.52,
    "last": 7
  },
  {
    "name": "Malik Washington",
    "espn": "4569603",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 63.94,
    "avg": 7.41,
    "last": 3.1
  },
  {
    "name": "Eddy Pineiro",
    "espn": "4034949",
    "status": null,
    "team_abbr": "SF",
    "pos": "K",
    "fpts": 62.01,
    "avg": 6.13,
    "last": 8
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
    "name": "Lions",
    "status": null,
    "team_abbr": "DET",
    "pos": "D/ST",
    "fpts": 42.84,
    "avg": 4.75,
    "last": 10
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
    "name": "Bengals",
    "status": null,
    "team_abbr": "CIN",
    "pos": "D/ST",
    "fpts": 48.12,
    "avg": 6.63,
    "last": 3
  },
  {
    "name": "MarShawn Lloyd",
    "espn": "4429023",
    "status": null,
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 12.26,
    "avg": 5.66,
    "last": 0
  },
  {
    "name": "Caleb Douglas",
    "espn": "4869645",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 63.3,
    "avg": 10.22,
    "last": 10
  },
  {
    "name": "Chase McLaughlin",
    "espn": "3150744",
    "status": "BYE",
    "team_abbr": "TB",
    "pos": "K",
    "fpts": 78.78,
    "avg": 11,
    "last": 10
  },
  {
    "name": "Justin Herbert",
    "espn": "4038941",
    "status": null,
    "team_abbr": "LAC",
    "pos": "QB",
    "fpts": 103.53,
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
  },
  {
    "name": "Emmett Johnson",
    "espn": "4832955",
    "status": null,
    "team_abbr": "KC",
    "pos": "RB",
    "fpts": 47.92,
    "avg": 6.73,
    "last": 9.4
  }
];
