/* ============================================================
   NBA ROSTERS & FREE AGENTS
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
window.NBA_STARTER_SLOTS = ["PG","SG","SF","PF","C","G","F","UTIL","UTIL"];

window.NBA_ROSTERS = {
  "puntos": {
    "starters": [
      {
        "name": "Luka Doncic",
        "espn": "3945274",
        "status": null,
        "team_abbr": "LAL",
        "pos": "PG",
        "fpts": 4329.5,
        "avg": 72.33,
        "last": 49.25
      },
      {
        "name": "VJ Edgecombe",
        "espn": "5124612",
        "status": null,
        "team_abbr": "PHI",
        "pos": "SG",
        "fpts": 2402.25,
        "avg": 37.98,
        "last": 46.25
      },
      {
        "name": "Cooper Flagg",
        "espn": "5041939",
        "status": null,
        "team_abbr": "DAL",
        "pos": "SF, PF",
        "fpts": 3438,
        "avg": 54.12,
        "last": 6.75
      },
      {
        "name": "Zion Williamson",
        "espn": "4395628",
        "status": "OUT",
        "team_abbr": "NO",
        "pos": "PF, C",
        "fpts": 2796.75,
        "avg": 48.19,
        "last": 0
      },
      {
        "name": "Donovan Clingan",
        "espn": "5105565",
        "status": null,
        "team_abbr": "POR",
        "pos": "C",
        "fpts": 1970.25,
        "avg": 36.97,
        "last": 12.25
      },
      {
        "name": "Davion Mitchell",
        "espn": "4278053",
        "status": null,
        "team_abbr": "MIA",
        "pos": "PG",
        "fpts": 1840.5,
        "avg": 47.4,
        "last": 51.75
      },
      {
        "name": "Pascal Siakam",
        "espn": "3149673",
        "status": "DTD",
        "team_abbr": "IND",
        "pos": "PF",
        "fpts": 3134.25,
        "avg": 45.75,
        "last": 32.75
      },
      {
        "name": "Alperen Sengun",
        "espn": "4871144",
        "status": null,
        "team_abbr": "HOU",
        "pos": "C",
        "fpts": 2989.75,
        "avg": 58.1,
        "last": 80.25
      },
      null
    ],
    "bench": [
      {
        "name": "Amen Thompson",
        "espn": "4684740",
        "status": null,
        "team_abbr": "HOU",
        "pos": "SF, SG",
        "fpts": 3078.5,
        "avg": 40.06,
        "last": 41.5
      },
      {
        "name": "Michael Porter Jr.",
        "espn": "4278104",
        "status": null,
        "team_abbr": "BKN",
        "pos": "SF, PF",
        "fpts": 2721.5,
        "avg": 38.88,
        "last": 35.5
      },
      {
        "name": "Keyonte George",
        "espn": "4433627",
        "status": null,
        "team_abbr": "UTAH",
        "pos": "PG, SG",
        "fpts": 2768,
        "avg": 40.84,
        "last": 14.25
      },
      {
        "name": "Evan Mobley",
        "espn": "4432158",
        "status": "OUT",
        "team_abbr": "CLE",
        "pos": "PF, C",
        "fpts": 2707.75,
        "avg": 43.23,
        "last": 0
      },
      {
        "name": "Kyshawn George",
        "espn": "5174563",
        "status": null,
        "team_abbr": "WSH",
        "pos": "SG, SF",
        "fpts": 1937,
        "avg": 38.13,
        "last": 29
      },
      {
        "name": "Isaiah Hartenstein",
        "espn": "4222252",
        "status": null,
        "team_abbr": "OKC",
        "pos": "C",
        "fpts": 1601.25,
        "avg": 32.69,
        "last": 26.75
      }
    ],
    "ir": []
  },
  "sin-talento": {
    "starters": [
      {
        "name": "Tyrese Maxey",
        "espn": "4431678",
        "status": null,
        "team_abbr": "PHI",
        "pos": "PG, SG",
        "fpts": 3552,
        "avg": 53.56,
        "last": 32.25
      },
      {
        "name": "Zach LaVine",
        "espn": "3064440",
        "status": null,
        "team_abbr": "SAC",
        "pos": "SG, SF",
        "fpts": 2146.75,
        "avg": 39.77,
        "last": 48
      },
      {
        "name": "Devin Vassell",
        "espn": "4395630",
        "status": null,
        "team_abbr": "SA",
        "pos": "SG, SF",
        "fpts": 1917.75,
        "avg": 28.55,
        "last": 8.75
      },
      {
        "name": "Jonathan Kuminga",
        "espn": "4433247",
        "status": null,
        "team_abbr": "MIN",
        "pos": "PF, SF",
        "fpts": 1709.25,
        "avg": 29.94,
        "last": 11.25
      },
      {
        "name": "Joel Embiid",
        "espn": "3059318",
        "status": null,
        "team_abbr": "PHI",
        "pos": "C",
        "fpts": 2581.5,
        "avg": 43.46,
        "last": 69
      },
      {
        "name": "Derrick White",
        "espn": "3078576",
        "status": "OUT",
        "team_abbr": "BOS",
        "pos": "SG, PG",
        "fpts": 2866.75,
        "avg": 32.67,
        "last": 31.25
      },
      {
        "name": "Giannis Antetokounmpo",
        "espn": "3032977",
        "status": "DTD",
        "team_abbr": "MIA",
        "pos": "PF, C",
        "fpts": 4028,
        "avg": 67.95,
        "last": 75
      },
      {
        "name": "Cade Cunningham",
        "espn": "4432166",
        "status": "DTD",
        "team_abbr": "DET",
        "pos": "PG",
        "fpts": 3696,
        "avg": 57.45,
        "last": 48.5
      },
      {
        "name": "Brook Lopez",
        "espn": "3448",
        "status": null,
        "team_abbr": "LAC",
        "pos": "C",
        "fpts": 1823,
        "avg": 33.03,
        "last": 5.75
      }
    ],
    "bench": [
      {
        "name": "Yaxel Lendeborg",
        "espn": "5175737",
        "status": null,
        "team_abbr": "GS",
        "pos": "SF, PF",
        "fpts": 2299.75,
        "avg": 41.84,
        "last": 39
      },
      {
        "name": "Jalen Smith",
        "espn": "4397189",
        "status": "DTD",
        "team_abbr": "CHI",
        "pos": "PF, C",
        "fpts": 1268,
        "avg": 36.85,
        "last": 0
      },
      {
        "name": "Franz Wagner",
        "espn": "4566434",
        "status": null,
        "team_abbr": "ORL",
        "pos": "SF, PF",
        "fpts": 2715.5,
        "avg": 54.92,
        "last": 67.5
      },
      {
        "name": "Wendell Carter Jr.",
        "espn": "4277847",
        "status": null,
        "team_abbr": "ORL",
        "pos": "C",
        "fpts": 1442.25,
        "avg": 34.05,
        "last": 29
      },
      {
        "name": "James Harden",
        "espn": "3992",
        "status": null,
        "team_abbr": "CLE",
        "pos": "PG, SG",
        "fpts": 3205.25,
        "avg": 40.77,
        "last": 97.75
      }
    ],
    "ir": [
      {
        "name": "Jaren Jackson Jr.",
        "espn": "4277961",
        "status": "OUT",
        "team_abbr": "UTAH",
        "pos": "C, PF",
        "fpts": 1686.5,
        "avg": 29.88,
        "last": 0
      },
      {
        "name": "RJ Barrett",
        "espn": "4395625",
        "status": "OUT",
        "team_abbr": "TOR",
        "pos": "SF, SG",
        "fpts": 2245.75,
        "avg": 41.18,
        "last": 0
      }
    ]
  },
  "imcebollin": {
    "starters": [
      {
        "name": "Kyrie Irving",
        "espn": "6442",
        "status": null,
        "team_abbr": "DAL",
        "pos": "PG",
        "fpts": 2823.5,
        "avg": 43.46,
        "last": 1.5
      },
      {
        "name": "Ayo Dosunmu",
        "espn": "4397002",
        "status": null,
        "team_abbr": "MIN",
        "pos": "SG, PG",
        "fpts": 2311.5,
        "avg": 37.22,
        "last": 12.75
      },
      {
        "name": "Jayson Tatum",
        "espn": "4065648",
        "status": "OUT",
        "team_abbr": "BOS",
        "pos": "PF, SF",
        "fpts": 3389.5,
        "avg": 52.98,
        "last": 36
      },
      {
        "name": "Deni Avdija",
        "espn": "4683021",
        "status": null,
        "team_abbr": "POR",
        "pos": "SF, PF",
        "fpts": 3002.25,
        "avg": 48.38,
        "last": 29.5
      },
      {
        "name": "Anthony Davis",
        "espn": "6583",
        "status": null,
        "team_abbr": "WSH",
        "pos": "C, PF",
        "fpts": 2890.75,
        "avg": 55.63,
        "last": 65
      },
      {
        "name": "Stephon Castle",
        "espn": "4845367",
        "status": null,
        "team_abbr": "SA",
        "pos": "PG, SG",
        "fpts": 2727,
        "avg": 35.54,
        "last": 4.75
      },
      {
        "name": "Cameron Boozer",
        "espn": "5041935",
        "status": "OUT",
        "team_abbr": "MEM",
        "pos": "PF",
        "fpts": 2424.25,
        "avg": 41.36,
        "last": 0
      },
      {
        "name": "Jamal Murray",
        "espn": "3936299",
        "status": null,
        "team_abbr": "DEN",
        "pos": "PG",
        "fpts": 3292.5,
        "avg": 54.98,
        "last": 27.5
      },
      {
        "name": "Cam Spencer",
        "espn": "4433083",
        "status": null,
        "team_abbr": "MEM",
        "pos": "SG, PG",
        "fpts": null,
        "avg": 31.29,
        "last": 11
      }
    ],
    "bench": [
      {
        "name": "Scottie Barnes",
        "espn": "4433134",
        "status": null,
        "team_abbr": "TOR",
        "pos": "SF, SG",
        "fpts": 3091.75,
        "avg": 52.7,
        "last": 59.25
      },
      {
        "name": "Lauri Markkanen",
        "espn": "4066336",
        "status": "OUT",
        "team_abbr": "UTAH",
        "pos": "PF, SF",
        "fpts": 2452.75,
        "avg": 35.28,
        "last": 0
      },
      {
        "name": "Caleb Wilson",
        "espn": "5095151",
        "status": "OUT",
        "team_abbr": "CHI",
        "pos": "SF",
        "fpts": 2388.75,
        "avg": 38.5,
        "last": 0
      },
      {
        "name": "Jarrett Allen",
        "espn": "4066328",
        "status": null,
        "team_abbr": "CLE",
        "pos": "C",
        "fpts": 2407.75,
        "avg": 37.11,
        "last": 29
      },
      {
        "name": "Desmond Bane",
        "espn": "4066320",
        "status": null,
        "team_abbr": "ORL",
        "pos": "SG, SF",
        "fpts": 2922,
        "avg": 36.48,
        "last": 58
      }
    ],
    "ir": [
      {
        "name": "Anthony Edwards",
        "espn": "4594268",
        "status": "OUT",
        "team_abbr": "MIN",
        "pos": "SG, SF",
        "fpts": 2681.25,
        "avg": 61.5,
        "last": 0
      },
      {
        "name": "Tyrese Haliburton",
        "espn": "4396993",
        "status": "OUT",
        "team_abbr": "IND",
        "pos": "PG, SG",
        "fpts": 3274.5,
        "avg": 59.13,
        "last": 0
      }
    ]
  },
  "concheros": {
    "starters": [
      {
        "name": "Brandin Podziemski",
        "espn": "4709138",
        "status": null,
        "team_abbr": "GS",
        "pos": "SG, PG",
        "fpts": 2370.5,
        "avg": 35.91,
        "last": 25.25
      },
      {
        "name": "Austin Reaves",
        "espn": "4066457",
        "status": "OUT",
        "team_abbr": "LAL",
        "pos": "SG, PG",
        "fpts": 3188.75,
        "avg": 46.88,
        "last": 0
      },
      {
        "name": "Matas Buzelis",
        "espn": "4711294",
        "status": null,
        "team_abbr": "CHI",
        "pos": "SF, PF",
        "fpts": 2367,
        "avg": 28.17,
        "last": 13.5
      },
      {
        "name": "Julius Randle",
        "espn": "3064514",
        "status": null,
        "team_abbr": "BKN",
        "pos": "PF",
        "fpts": 2666.5,
        "avg": 41.07,
        "last": 59.25
      },
      {
        "name": "Bam Adebayo",
        "espn": "4066261",
        "status": null,
        "team_abbr": "MIA",
        "pos": "C, PF",
        "fpts": 2674.75,
        "avg": 48.07,
        "last": 44
      },
      {
        "name": "Shai Gilgeous-Alexander",
        "espn": "4278073",
        "status": "DTD",
        "team_abbr": "OKC",
        "pos": "PG",
        "fpts": 4891.5,
        "avg": 58.83,
        "last": 76.5
      },
      {
        "name": "Jaylen Brown",
        "espn": "3917376",
        "status": "OUT",
        "team_abbr": "PHI",
        "pos": "SF, SG",
        "fpts": 2933.5,
        "avg": 46.18,
        "last": 0
      },
      {
        "name": "Karl-Anthony Towns",
        "espn": "3136195",
        "status": "OUT",
        "team_abbr": "NY",
        "pos": "C",
        "fpts": 2875.75,
        "avg": 52.88,
        "last": 0
      },
      {
        "name": "Aaron Gordon",
        "espn": "3064290",
        "status": null,
        "team_abbr": "DEN",
        "pos": "PF",
        "fpts": 1924.75,
        "avg": 25.27,
        "last": 35.75
      }
    ],
    "bench": [
      {
        "name": "Jalen Brunson",
        "espn": "3934672",
        "status": null,
        "team_abbr": "NY",
        "pos": "PG",
        "fpts": 3604.25,
        "avg": 49.25,
        "last": 45
      },
      {
        "name": "OG Anunoby",
        "espn": "3934719",
        "status": "OUT",
        "team_abbr": "NY",
        "pos": "SF, PF",
        "fpts": 2283.25,
        "avg": 32.77,
        "last": 0
      },
      {
        "name": "De'Aaron Fox",
        "espn": "4066259",
        "status": null,
        "team_abbr": "SA",
        "pos": "PG, SG",
        "fpts": 2933.25,
        "avg": 31.86,
        "last": 4.5
      },
      {
        "name": "Onyeka Okongwu",
        "espn": "4431680",
        "status": null,
        "team_abbr": "ATL",
        "pos": "C",
        "fpts": 2315.75,
        "avg": 38.56,
        "last": 35
      },
      {
        "name": "Aaron Wiggins",
        "espn": "4397183",
        "status": null,
        "team_abbr": "ATL",
        "pos": "SG, SF",
        "fpts": 1385.75,
        "avg": 29.59,
        "last": 41.25
      }
    ],
    "ir": []
  },
  "mugiwaras": {
    "starters": [
      {
        "name": "LaMelo Ball",
        "espn": "4432816",
        "status": null,
        "team_abbr": "MIN",
        "pos": "PG",
        "fpts": 3232.75,
        "avg": 34.72,
        "last": 0.75
      },
      {
        "name": "Tyler Herro",
        "espn": "4395725",
        "status": null,
        "team_abbr": "MIL",
        "pos": "SG, PG",
        "fpts": 2766,
        "avg": 41.67,
        "last": 109
      },
      {
        "name": "LeBron James",
        "espn": "1966",
        "status": null,
        "team_abbr": "PHI",
        "pos": "SF, PF",
        "fpts": 2821.25,
        "avg": 43.13,
        "last": 65.75
      },
      {
        "name": "Precious Achiuwa",
        "espn": "4431679",
        "status": "DTD",
        "team_abbr": "SAC",
        "pos": "PF, C",
        "fpts": 1499.75,
        "avg": 27.08,
        "last": 0
      },
      {
        "name": "Victor Wembanyama",
        "espn": "5104157",
        "status": null,
        "team_abbr": "SA",
        "pos": "C",
        "fpts": 3892,
        "avg": 72.6,
        "last": 25.5
      },
      {
        "name": "Ty Jerome",
        "espn": "4065733",
        "status": null,
        "team_abbr": "MEM",
        "pos": "SG, PG",
        "fpts": 3280.25,
        "avg": 44.06,
        "last": 1.75
      },
      {
        "name": "Jalen Johnson",
        "espn": "4701230",
        "status": null,
        "team_abbr": "ATL",
        "pos": "PF",
        "fpts": 3442.25,
        "avg": 48.5,
        "last": 71.75
      },
      {
        "name": "Devin Booker",
        "espn": "3136193",
        "status": null,
        "team_abbr": "PHX",
        "pos": "PG, SG",
        "fpts": 3501.25,
        "avg": 47.17,
        "last": 25.75
      },
      {
        "name": "Stephen Curry",
        "espn": "3975",
        "status": "OUT",
        "team_abbr": "GS",
        "pos": "PG",
        "fpts": 3096,
        "avg": 53.35,
        "last": 0
      }
    ],
    "bench": [
      {
        "name": "Jabari Smith Jr.",
        "espn": "4432639",
        "status": null,
        "team_abbr": "HOU",
        "pos": "PF, C",
        "fpts": 1850.25,
        "avg": 36.57,
        "last": 42.75
      },
      {
        "name": "Tristan da Silva",
        "espn": "4702382",
        "status": null,
        "team_abbr": "ORL",
        "pos": "SF, PF",
        "fpts": 1272.25,
        "avg": 26.77,
        "last": 12
      },
      {
        "name": "Paul Reed",
        "espn": "4278562",
        "status": null,
        "team_abbr": "DET",
        "pos": "C, PF",
        "fpts": 1204.25,
        "avg": 33.8,
        "last": 40.5
      },
      {
        "name": "Kon Knueppel",
        "espn": "5061575",
        "status": "OUT",
        "team_abbr": "CHA",
        "pos": "SF, SG",
        "fpts": 2772,
        "avg": -0.75,
        "last": 0
      },
      {
        "name": "Day'Ron Sharpe",
        "espn": "4432194",
        "status": null,
        "team_abbr": "BKN",
        "pos": "C",
        "fpts": 1552.25,
        "avg": 33.07,
        "last": 54
      }
    ],
    "ir": [
      {
        "name": "Jalen Duren",
        "espn": "4433621",
        "status": "OUT",
        "team_abbr": "DET",
        "pos": "C",
        "fpts": 2734.25,
        "avg": 37.63,
        "last": 0
      },
      {
        "name": "Paolo Banchero",
        "espn": "4432573",
        "status": "OUT",
        "team_abbr": "ORL",
        "pos": "PF, SF",
        "fpts": 2182,
        "avg": 54.63,
        "last": 0
      }
    ]
  },
  "pantyman": {
    "starters": [
      {
        "name": "Darius Acuff Jr.",
        "espn": "5142620",
        "status": null,
        "team_abbr": "SAC",
        "pos": "PG",
        "fpts": 2425.5,
        "avg": 45.33,
        "last": 33.75
      },
      {
        "name": "Donovan Mitchell",
        "espn": "3908809",
        "status": null,
        "team_abbr": "CLE",
        "pos": "SG, PG",
        "fpts": 3603,
        "avg": 48.95,
        "last": 29.25
      },
      {
        "name": "Paul George",
        "espn": "4251",
        "status": null,
        "team_abbr": "BOS",
        "pos": "SF, PF",
        "fpts": 2166.75,
        "avg": 44.52,
        "last": 25.25
      },
      {
        "name": "Jaden McDaniels",
        "espn": "4431671",
        "status": null,
        "team_abbr": "MIN",
        "pos": "SF, PF",
        "fpts": 2249.25,
        "avg": 40.16,
        "last": 6.25
      },
      {
        "name": "Domantas Sabonis",
        "espn": "3155942",
        "status": null,
        "team_abbr": "SAC",
        "pos": "C, PF",
        "fpts": 2825.75,
        "avg": 44.07,
        "last": 43.75
      },
      {
        "name": "Dyson Daniels",
        "espn": "4869342",
        "status": null,
        "team_abbr": "ATL",
        "pos": "SG, PG",
        "fpts": 2519.75,
        "avg": 42.06,
        "last": 56.25
      },
      {
        "name": "Kevin Durant",
        "espn": "3202",
        "status": null,
        "team_abbr": "HOU",
        "pos": "PF, SF",
        "fpts": 3356.5,
        "avg": 41.82,
        "last": 30.75
      },
      {
        "name": "Nikola Jokic",
        "espn": "3112335",
        "status": null,
        "team_abbr": "DEN",
        "pos": "C",
        "fpts": 4739.25,
        "avg": 68.3,
        "last": 64.75
      },
      {
        "name": "Walker Kessler",
        "espn": "4433136",
        "status": null,
        "team_abbr": "LAL",
        "pos": "C",
        "fpts": 2000.5,
        "avg": 46.28,
        "last": 44
      }
    ],
    "bench": [
      {
        "name": "Trae Young",
        "espn": "4277905",
        "status": null,
        "team_abbr": "WSH",
        "pos": "PG",
        "fpts": 3512.75,
        "avg": 39.59,
        "last": 38.75
      },
      {
        "name": "Moussa Diabate",
        "espn": "4433249",
        "status": null,
        "team_abbr": "CHA",
        "pos": "PF, C",
        "fpts": 1330,
        "avg": 35.31,
        "last": 53.25
      },
      {
        "name": "Miles Bridges",
        "espn": "4066383",
        "status": null,
        "team_abbr": "PHX",
        "pos": "SF, PF",
        "fpts": 2384.25,
        "avg": 39.62,
        "last": 51.75
      },
      {
        "name": "Nickeil Alexander-Walker",
        "espn": "4278039",
        "status": null,
        "team_abbr": "ATL",
        "pos": "SG, PG",
        "fpts": 2905.75,
        "avg": 39.11,
        "last": 23.75
      },
      {
        "name": "Ajay Mitchell",
        "espn": "4900671",
        "status": null,
        "team_abbr": "OKC",
        "pos": "PG, SG",
        "fpts": 2463.5,
        "avg": 36.84,
        "last": 11.25
      }
    ],
    "ir": [
      {
        "name": "Kawhi Leonard",
        "espn": "6450",
        "status": "OUT",
        "team_abbr": "TOR",
        "pos": "SF, PF",
        "fpts": 2729.5,
        "avg": 42.38,
        "last": 0
      },
      {
        "name": "Dylan Harper",
        "espn": "5037871",
        "status": "OUT",
        "team_abbr": "SA",
        "pos": "PG, SG",
        "fpts": 2392.75,
        "avg": 41.45,
        "last": 0
      }
    ]
  }
};

window.NBA_FREE_AGENTS = [
  {
    "name": "Josh Giddey",
    "espn": "4871145",
    "status": null,
    "team_abbr": "CHI",
    "pos": "PG, SG",
    "fpts": 2938.5,
    "avg": 32.15,
    "last": 14.75
  },
  {
    "name": "Darius Garland",
    "espn": "4396907",
    "status": null,
    "team_abbr": "LAC",
    "pos": "PG",
    "fpts": 3066,
    "avg": 37.17,
    "last": 8.75
  },
  {
    "name": "Damian Lillard",
    "espn": "6606",
    "status": null,
    "team_abbr": "POR",
    "pos": "PG",
    "fpts": 2722.75,
    "avg": 35.05,
    "last": 8.75
  },
  {
    "name": "Naz Reid",
    "espn": "4396971",
    "status": null,
    "team_abbr": "CHA",
    "pos": "C, PF",
    "fpts": 2529,
    "avg": 32.83,
    "last": 10.75
  },
  {
    "name": "Brandon Miller",
    "espn": "4433287",
    "status": null,
    "team_abbr": "CHA",
    "pos": "SF, SG",
    "fpts": 2643,
    "avg": 32.9,
    "last": 35.75
  },
  {
    "name": "AJ Dybantsa",
    "espn": "5142718",
    "status": null,
    "team_abbr": "WSH",
    "pos": "SF",
    "fpts": 2572.25,
    "avg": 33.65,
    "last": 55.75
  },
  {
    "name": "Ausar Thompson",
    "espn": "4684742",
    "status": null,
    "team_abbr": "DET",
    "pos": "SF, PF",
    "fpts": 2027,
    "avg": 38.45,
    "last": 39.75
  },
  {
    "name": "Norman Powell",
    "espn": "2595516",
    "status": "DTD",
    "team_abbr": "CHI",
    "pos": "SG, SF",
    "fpts": 2787.5,
    "avg": 35.83,
    "last": 24.75
  },
  {
    "name": "Ja Morant",
    "espn": "4279888",
    "status": "OUT",
    "team_abbr": "POR",
    "pos": "PG",
    "fpts": 2687.5,
    "avg": 38.13,
    "last": 0
  },
  {
    "name": "Immanuel Quickley",
    "espn": "4395724",
    "status": null,
    "team_abbr": "TOR",
    "pos": "PG, SG",
    "fpts": 2357.5,
    "avg": 39.43,
    "last": 44.5
  },
  {
    "name": "Trey Murphy III",
    "espn": "4397688",
    "status": "OUT",
    "team_abbr": "NO",
    "pos": "SF, SG",
    "fpts": 2576.75,
    "avg": 35.28,
    "last": 0
  },
  {
    "name": "Darryn Peterson",
    "espn": "5041955",
    "status": null,
    "team_abbr": "UTAH",
    "pos": "SG, PG",
    "fpts": 2364.75,
    "avg": 35.81,
    "last": 55.75
  },
  {
    "name": "Alex Sarr",
    "espn": "5160992",
    "status": null,
    "team_abbr": "WSH",
    "pos": "C, PF",
    "fpts": 2294.25,
    "avg": 31.73,
    "last": 9.5
  },
  {
    "name": "Mikal Bridges",
    "espn": "3147657",
    "status": null,
    "team_abbr": "NY",
    "pos": "SF, SG",
    "fpts": 2802.75,
    "avg": 20.69,
    "last": 19
  },
  {
    "name": "Cedric Coward",
    "espn": "4903027",
    "status": null,
    "team_abbr": "MEM",
    "pos": "SF, SG",
    "fpts": 1971.5,
    "avg": 39.08,
    "last": 24.25
  },
  {
    "name": "Dejounte Murray",
    "espn": "3907497",
    "status": "OUT",
    "team_abbr": "NO",
    "pos": "SG, PG",
    "fpts": 2726,
    "avg": 33.67,
    "last": 0
  },
  {
    "name": "Chet Holmgren",
    "espn": "4433255",
    "status": "OUT",
    "team_abbr": "OKC",
    "pos": "C, PF",
    "fpts": 2325.75,
    "avg": 40.17,
    "last": 0
  },
  {
    "name": "Fred VanVleet",
    "espn": "2991230",
    "status": null,
    "team_abbr": "HOU",
    "pos": "PG, SG",
    "fpts": 2308.25,
    "avg": 36.02,
    "last": 49.75
  },
  {
    "name": "Jeremiah Fears",
    "espn": "5144091",
    "status": null,
    "team_abbr": "NO",
    "pos": "SG, PG",
    "fpts": 2203.5,
    "avg": 34.5,
    "last": 16.5
  },
  {
    "name": "Rudy Gobert",
    "espn": "3032976",
    "status": null,
    "team_abbr": "MIN",
    "pos": "C",
    "fpts": 2016.25,
    "avg": 23.89,
    "last": 6.5
  },
  {
    "name": "Payton Pritchard",
    "espn": "4066354",
    "status": null,
    "team_abbr": "BOS",
    "pos": "PG, SG",
    "fpts": 2356.75,
    "avg": 28.98,
    "last": 21.25
  },
  {
    "name": "Ivica Zubac",
    "espn": "4017837",
    "status": null,
    "team_abbr": "IND",
    "pos": "C",
    "fpts": 2112.5,
    "avg": 29.18,
    "last": 58.25
  },
  {
    "name": "Josh Hart",
    "espn": "3062679",
    "status": null,
    "team_abbr": "NY",
    "pos": "SF, SG",
    "fpts": 2011.25,
    "avg": 22.37,
    "last": 9
  },
  {
    "name": "Anthony Black",
    "espn": "4712849",
    "status": null,
    "team_abbr": "ORL",
    "pos": "PG, SG",
    "fpts": 2009.5,
    "avg": 41.21,
    "last": 40.75
  },
  {
    "name": "Andrew Nembhard",
    "espn": "4395712",
    "status": null,
    "team_abbr": "IND",
    "pos": "PG, SG",
    "fpts": 2094.75,
    "avg": 36.08,
    "last": 30.75
  },
  {
    "name": "Brandon Ingram",
    "espn": "3913176",
    "status": "OUT",
    "team_abbr": "LAC",
    "pos": "SF, PF",
    "fpts": 2248.75,
    "avg": null,
    "last": 0
  },
  {
    "name": "Derik Queen",
    "espn": "4869780",
    "status": null,
    "team_abbr": "NO",
    "pos": "C, PF",
    "fpts": 2122.75,
    "avg": 27.89,
    "last": 8.5
  },
  {
    "name": "Ace Bailey",
    "espn": "4873138",
    "status": null,
    "team_abbr": "UTAH",
    "pos": "SF, PF",
    "fpts": 1943,
    "avg": 30.71,
    "last": 10
  },
  {
    "name": "CJ McCollum",
    "espn": "2490149",
    "status": "OUT",
    "team_abbr": "ATL",
    "pos": "SG, PG",
    "fpts": 2566.5,
    "avg": 31.95,
    "last": 0
  },
  {
    "name": "Jalen Green",
    "espn": "4437244",
    "status": null,
    "team_abbr": "PHX",
    "pos": "SG, SF",
    "fpts": 2411.75,
    "avg": 24.87,
    "last": 25.5
  },
  {
    "name": "Coby White",
    "espn": "4395651",
    "status": null,
    "team_abbr": "CHA",
    "pos": "PG, SG",
    "fpts": 2541.25,
    "avg": 20.47,
    "last": 30
  },
  {
    "name": "Jaime Jaquez Jr.",
    "espn": "4432848",
    "status": null,
    "team_abbr": "MIL",
    "pos": "SF, SG",
    "fpts": 2123.5,
    "avg": 29.28,
    "last": 15.25
  },
  {
    "name": "John Collins",
    "espn": "3908845",
    "status": null,
    "team_abbr": "DET",
    "pos": "PF, C",
    "fpts": 2052.75,
    "avg": 24.53,
    "last": 7.75
  },
  {
    "name": "Saddiq Bey",
    "espn": "4397136",
    "status": null,
    "team_abbr": "NO",
    "pos": "SF, PF",
    "fpts": 1838.75,
    "avg": 33.15,
    "last": -0.5
  },
  {
    "name": "DeMar DeRozan",
    "espn": "3978",
    "status": null,
    "team_abbr": "DEN",
    "pos": "SF, PF",
    "fpts": 2588,
    "avg": 19.1,
    "last": 23.75
  },
  {
    "name": "Kel'el Ware",
    "espn": "5105623",
    "status": null,
    "team_abbr": "MIL",
    "pos": "C",
    "fpts": 2005.25,
    "avg": 23.19,
    "last": 30.75
  },
  {
    "name": "Jrue Holiday",
    "espn": "3995",
    "status": null,
    "team_abbr": "POR",
    "pos": "PG, SG",
    "fpts": 1866.75,
    "avg": 32.03,
    "last": 14.25
  },
  {
    "name": "Reed Sheppard",
    "espn": "4711272",
    "status": null,
    "team_abbr": "HOU",
    "pos": "SG, PG",
    "fpts": 2326,
    "avg": 21.46,
    "last": 0.5
  },
  {
    "name": "Christian Braun",
    "espn": "4431767",
    "status": null,
    "team_abbr": "DEN",
    "pos": "SG, SF",
    "fpts": 1497.75,
    "avg": 35.41,
    "last": 63.25
  },
  {
    "name": "Ryan Rollins",
    "espn": "4591725",
    "status": null,
    "team_abbr": "MIL",
    "pos": "SG, PG",
    "fpts": 2253.25,
    "avg": 25.18,
    "last": 19.25
  },
  {
    "name": "Quentin Grimes",
    "espn": "4397014",
    "status": null,
    "team_abbr": "LAL",
    "pos": "SG, SF",
    "fpts": 2101.5,
    "avg": 27.18,
    "last": 28.75
  },
  {
    "name": "Myles Turner",
    "espn": "3133628",
    "status": null,
    "team_abbr": "MIL",
    "pos": "C",
    "fpts": 1900.75,
    "avg": 26,
    "last": 31.75
  },
  {
    "name": "Andrew Wiggins",
    "espn": "3059319",
    "status": null,
    "team_abbr": "MIA",
    "pos": "SF, PF",
    "fpts": 2171,
    "avg": 21.7,
    "last": 21.75
  },
  {
    "name": "Zach Edey",
    "espn": "4600663",
    "status": null,
    "team_abbr": "MEM",
    "pos": "C",
    "fpts": 1722,
    "avg": 23.81,
    "last": 5
  },
  {
    "name": "Julian Champagnie",
    "espn": "4592479",
    "status": null,
    "team_abbr": "SA",
    "pos": "SF, PF",
    "fpts": 1722.75,
    "avg": 24.35,
    "last": 10.25
  },
  {
    "name": "Nic Claxton",
    "espn": "4278067",
    "status": null,
    "team_abbr": "CHI",
    "pos": "C",
    "fpts": 1934.5,
    "avg": 25.67,
    "last": 25
  },
  {
    "name": "Tobias Harris",
    "espn": "6440",
    "status": "OUT",
    "team_abbr": "SA",
    "pos": "PF, SF",
    "fpts": 2093.25,
    "avg": null,
    "last": 0
  },
  {
    "name": "Jalen Williams",
    "espn": "4593803",
    "status": "OUT",
    "team_abbr": "OKC",
    "pos": "PF, SF",
    "fpts": 655,
    "avg": 29,
    "last": 0
  },
  {
    "name": "Daniss Jenkins",
    "espn": "5107199",
    "status": null,
    "team_abbr": "DET",
    "pos": "PG",
    "fpts": null,
    "avg": 32.73,
    "last": 25.75
  },
  {
    "name": "Duncan Robinson",
    "espn": "3157465",
    "status": "OUT",
    "team_abbr": "DET",
    "pos": "SF, SG",
    "fpts": 1701.5,
    "avg": 33.77,
    "last": 0
  },
  {
    "name": "Klay Thompson",
    "espn": "6475",
    "status": null,
    "team_abbr": "MIA",
    "pos": "SG, SF",
    "fpts": 1418.25,
    "avg": 28.25,
    "last": 25
  },
  {
    "name": "Daniel Gafford",
    "espn": "4278049",
    "status": null,
    "team_abbr": "DAL",
    "pos": "C",
    "fpts": 1841.5,
    "avg": 26.77,
    "last": 1
  },
  {
    "name": "Jakob Poeltl",
    "espn": "3134908",
    "status": null,
    "team_abbr": "TOR",
    "pos": "C",
    "fpts": 1886.5,
    "avg": 26.64,
    "last": 40.5
  },
  {
    "name": "Peyton Watson",
    "espn": "4576087",
    "status": null,
    "team_abbr": "CLE",
    "pos": "SF, PF",
    "fpts": 2080,
    "avg": 26.13,
    "last": 37.75
  },
  {
    "name": "Jared McCain",
    "espn": "4683778",
    "status": null,
    "team_abbr": "OKC",
    "pos": "SG, PG",
    "fpts": 1726.75,
    "avg": 25.3,
    "last": 31.25
  },
  {
    "name": "Keegan Murray",
    "espn": "4594327",
    "status": null,
    "team_abbr": "SAC",
    "pos": "PF, SF",
    "fpts": 1953,
    "avg": 24.28,
    "last": 33.25
  },
  {
    "name": "Collin Gillespie",
    "espn": "4278585",
    "status": null,
    "team_abbr": "PHX",
    "pos": "PG",
    "fpts": 2024,
    "avg": 25.48,
    "last": 33
  },
  {
    "name": "P.J. Washington",
    "espn": "4278078",
    "status": "OUT",
    "team_abbr": "DAL",
    "pos": "PF, SF",
    "fpts": 1583.25,
    "avg": 30.38,
    "last": 0
  },
  {
    "name": "Toumani Camara",
    "espn": "4431736",
    "status": null,
    "team_abbr": "POR",
    "pos": "PF, SF",
    "fpts": 1650.25,
    "avg": 25.09,
    "last": -3.5
  },
  {
    "name": "Nikola Vucevic",
    "espn": "6478",
    "status": null,
    "team_abbr": "ORL",
    "pos": "C",
    "fpts": 1969.5,
    "avg": 10.9,
    "last": 35
  },
  {
    "name": "Kristaps Porzingis",
    "espn": "3102531",
    "status": "OUT",
    "team_abbr": "GS",
    "pos": "C, PF",
    "fpts": 2194.5,
    "avg": null,
    "last": 0
  },
  {
    "name": "Aday Mara",
    "espn": "5174983",
    "status": null,
    "team_abbr": "OKC",
    "pos": "C",
    "fpts": null,
    "avg": 30.55,
    "last": 67
  },
  {
    "name": "Kevin Porter Jr.",
    "espn": "4397140",
    "status": null,
    "team_abbr": "FA",
    "pos": "SG, PG",
    "fpts": 1050.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Dillon Brooks",
    "espn": "3155526",
    "status": null,
    "team_abbr": "PHX",
    "pos": "SF, SG",
    "fpts": 2014.25,
    "avg": 27.07,
    "last": 30.25
  },
  {
    "name": "Egor Demin",
    "espn": "5175643",
    "status": null,
    "team_abbr": "BKN",
    "pos": "PG, SG",
    "fpts": 2130,
    "avg": 19.42,
    "last": 5.25
  },
  {
    "name": "Jimmy Butler III",
    "espn": "6430",
    "status": "OUT",
    "team_abbr": "GS",
    "pos": "SF, SG",
    "fpts": 1605.25,
    "avg": null,
    "last": 0
  },
  {
    "name": "Neemias Queta",
    "espn": "4397424",
    "status": null,
    "team_abbr": "BOS",
    "pos": "C",
    "fpts": 1706.5,
    "avg": 28.29,
    "last": 48
  },
  {
    "name": "Kris Dunn",
    "espn": "2991139",
    "status": null,
    "team_abbr": "LAC",
    "pos": "PG, SG",
    "fpts": 1424,
    "avg": 26.18,
    "last": 4
  },
  {
    "name": "Jalen Suggs",
    "espn": "4432165",
    "status": null,
    "team_abbr": "ORL",
    "pos": "PG, SG",
    "fpts": 1705.5,
    "avg": 25.07,
    "last": 11.75
  },
  {
    "name": "Draymond Green",
    "espn": "6589",
    "status": "DTD",
    "team_abbr": "GS",
    "pos": "PF, C",
    "fpts": 1604.25,
    "avg": 23.23,
    "last": 0
  },
  {
    "name": "Yves Missi",
    "espn": "5061589",
    "status": null,
    "team_abbr": "NO",
    "pos": "C",
    "fpts": 1360.25,
    "avg": 24.61,
    "last": 9.25
  },
  {
    "name": "Grayson Allen",
    "espn": "3135045",
    "status": "DTD",
    "team_abbr": "CHA",
    "pos": "SG, PG",
    "fpts": 1748.75,
    "avg": 29.9,
    "last": 0
  },
  {
    "name": "Rui Hachimura",
    "espn": "4066648",
    "status": null,
    "team_abbr": "LAC",
    "pos": "PF, SF",
    "fpts": 1725.5,
    "avg": 25.6,
    "last": 14.5
  },
  {
    "name": "Collin Sexton",
    "espn": "4277811",
    "status": null,
    "team_abbr": "LAL",
    "pos": "SG, PG",
    "fpts": 2272.75,
    "avg": 19.7,
    "last": 31.75
  },
  {
    "name": "Mo Bamba",
    "espn": "4277919",
    "status": null,
    "team_abbr": "UTAH",
    "pos": "C",
    "fpts": null,
    "avg": 30.77,
    "last": 7.5
  },
  {
    "name": "Tari Eason",
    "espn": "4433192",
    "status": null,
    "team_abbr": "HOU",
    "pos": "SF, PF",
    "fpts": 1337.75,
    "avg": 26.6,
    "last": 21
  },
  {
    "name": "Jordan Poole",
    "espn": "4277956",
    "status": null,
    "team_abbr": "NO",
    "pos": "SG, PG",
    "fpts": 1579.75,
    "avg": 21.29,
    "last": 18
  },
  {
    "name": "Kyle Kuzma",
    "espn": "3134907",
    "status": null,
    "team_abbr": "MIL",
    "pos": "PF, SF",
    "fpts": 1580.5,
    "avg": 26.81,
    "last": 14
  },
  {
    "name": "Anfernee Simons",
    "espn": "4351851",
    "status": null,
    "team_abbr": "PHI",
    "pos": "SG, PG",
    "fpts": 1680.5,
    "avg": 20.35,
    "last": 26.75
  },
  {
    "name": "Naji Marshall",
    "espn": "4278594",
    "status": null,
    "team_abbr": "DAL",
    "pos": "SF, PF",
    "fpts": 1577.5,
    "avg": 25.63,
    "last": 4
  },
  {
    "name": "Ja'Kobe Walter",
    "espn": "4684272",
    "status": null,
    "team_abbr": "TOR",
    "pos": "SG",
    "fpts": 1184,
    "avg": 26.14,
    "last": 13.25
  },
  {
    "name": "Oso Ighodaro",
    "espn": "4601023",
    "status": null,
    "team_abbr": "PHX",
    "pos": "PF",
    "fpts": 1777.75,
    "avg": 20.29,
    "last": 19.25
  },
  {
    "name": "Alex Caruso",
    "espn": "2991350",
    "status": "OUT",
    "team_abbr": "OKC",
    "pos": "SG, PG",
    "fpts": 1585.25,
    "avg": 23.85,
    "last": 0
  },
  {
    "name": "Derrick Jones Jr.",
    "espn": "3936099",
    "status": null,
    "team_abbr": "LAC",
    "pos": "SF, PF",
    "fpts": 1436.25,
    "avg": 26.3,
    "last": 1.75
  },
  {
    "name": "Collin Murray-Boyles",
    "espn": "5093267",
    "status": "DTD",
    "team_abbr": "TOR",
    "pos": "PF",
    "fpts": 1547.25,
    "avg": 24.86,
    "last": 0
  },
  {
    "name": "Jaxson Hayes",
    "espn": "4397077",
    "status": null,
    "team_abbr": "UTAH",
    "pos": "C",
    "fpts": 994.25,
    "avg": 29.55,
    "last": 40.75
  },
  {
    "name": "Keldon Johnson",
    "espn": "4395723",
    "status": null,
    "team_abbr": "SA",
    "pos": "SF, PF",
    "fpts": 1815.5,
    "avg": 21.04,
    "last": -1.25
  },
  {
    "name": "Brayden Burries",
    "espn": "5082206",
    "status": null,
    "team_abbr": "MIL",
    "pos": "SG",
    "fpts": 1674.5,
    "avg": 26,
    "last": 58.5
  },
  {
    "name": "Kevin Huerter",
    "espn": "4066372",
    "status": null,
    "team_abbr": "DET",
    "pos": "SG, SF",
    "fpts": 1551.75,
    "avg": 26.17,
    "last": 35.5
  },
  {
    "name": "Mitchell Robinson",
    "espn": "4351852",
    "status": "OUT",
    "team_abbr": "BOS",
    "pos": "C",
    "fpts": 1375.25,
    "avg": 18.41,
    "last": 13.5
  },
  {
    "name": "Keaton Wagler",
    "espn": "5254165",
    "status": null,
    "team_abbr": "LAC",
    "pos": "PG, SG",
    "fpts": 1829,
    "avg": 21.37,
    "last": -3.75
  },
  {
    "name": "Malik Monk",
    "espn": "4066262",
    "status": null,
    "team_abbr": "SAC",
    "pos": "SG, PG",
    "fpts": 2013.75,
    "avg": 15.86,
    "last": -1.75
  },
  {
    "name": "Kelly Oubre Jr.",
    "espn": "3133603",
    "status": null,
    "team_abbr": "IND",
    "pos": "SF, SG",
    "fpts": 1541.25,
    "avg": 25.05,
    "last": 38
  },
  {
    "name": "Bobby Portis",
    "espn": "3064482",
    "status": null,
    "team_abbr": "MIA",
    "pos": "PF, C",
    "fpts": 1541.5,
    "avg": 19.22,
    "last": 10.75
  },
  {
    "name": "Cameron Johnson",
    "espn": "3138196",
    "status": null,
    "team_abbr": "DEN",
    "pos": "SF, PF",
    "fpts": 1796,
    "avg": 25.57,
    "last": 48.5
  },
  {
    "name": "Jaylen Wells",
    "espn": "5112087",
    "status": null,
    "team_abbr": "MEM",
    "pos": "SF, SG",
    "fpts": 1402.5,
    "avg": 23.56,
    "last": 12.5
  },
  {
    "name": "Nolan Traore",
    "espn": "5279130",
    "status": "DTD",
    "team_abbr": "BKN",
    "pos": "PG",
    "fpts": 1639,
    "avg": 28.11,
    "last": 7
  },
  {
    "name": "Meleek Thomas",
    "espn": "5041951",
    "status": null,
    "team_abbr": "CLE",
    "pos": "SG",
    "fpts": null,
    "avg": 27.14,
    "last": 20.5
  },
  {
    "name": "Jerami Grant",
    "espn": "2991070",
    "status": "OUT",
    "team_abbr": "MEM",
    "pos": "PF",
    "fpts": 2007.25,
    "avg": 22.53,
    "last": 0
  },
  {
    "name": "Kasparas Jakucionis",
    "espn": "5214640",
    "status": null,
    "team_abbr": "MIL",
    "pos": "PG",
    "fpts": 1321.75,
    "avg": 20.88,
    "last": 1.25
  }
];
