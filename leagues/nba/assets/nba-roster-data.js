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
        "name": "Kyrie Irving",
        "espn": "6442",
        "status": null,
        "team_abbr": "DAL",
        "pos": "PG",
        "fpts": 2823.5,
        "avg": null,
        "last": null
      },
      {
        "name": "Josh Giddey",
        "espn": "4871145",
        "status": null,
        "team_abbr": "CHI",
        "pos": "PG, SG",
        "fpts": 2938.5,
        "avg": null,
        "last": null
      },
      {
        "name": "Michael Porter Jr.",
        "espn": "4278104",
        "status": null,
        "team_abbr": "BKN",
        "pos": "SF, PF",
        "fpts": 2721.5,
        "avg": null,
        "last": null
      },
      {
        "name": "Pascal Siakam",
        "espn": "3149673",
        "status": null,
        "team_abbr": "IND",
        "pos": "PF",
        "fpts": 3134.25,
        "avg": null,
        "last": null
      },
      {
        "name": "Zion Williamson",
        "espn": "4395628",
        "status": null,
        "team_abbr": "NO",
        "pos": "PF, C",
        "fpts": 2796.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Amen Thompson",
        "espn": "4684740",
        "status": null,
        "team_abbr": "HOU",
        "pos": "SF, SG",
        "fpts": 3078.5,
        "avg": null,
        "last": null
      },
      {
        "name": "Cooper Flagg",
        "espn": "5041939",
        "status": null,
        "team_abbr": "DAL",
        "pos": "SF, PF",
        "fpts": 3438,
        "avg": null,
        "last": null
      },
      {
        "name": "Luka Doncic",
        "espn": "3945274",
        "status": null,
        "team_abbr": "LAL",
        "pos": "PG",
        "fpts": 4329.5,
        "avg": null,
        "last": null
      },
      {
        "name": "Alperen Sengun",
        "espn": "4871144",
        "status": null,
        "team_abbr": "HOU",
        "pos": "C",
        "fpts": 2989.75,
        "avg": null,
        "last": null
      }
    ],
    "bench": [
      {
        "name": "Evan Mobley",
        "espn": "4432158",
        "status": null,
        "team_abbr": "CLE",
        "pos": "PF, C",
        "fpts": 2707.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Chet Holmgren",
        "espn": "4433255",
        "status": null,
        "team_abbr": "OKC",
        "pos": "C, PF",
        "fpts": 2325.75,
        "avg": 44.75,
        "last": 44.75
      },
      {
        "name": "Rudy Gobert",
        "espn": "3032976",
        "status": null,
        "team_abbr": "MIN",
        "pos": "C",
        "fpts": 2016.25,
        "avg": null,
        "last": null
      },
      {
        "name": "VJ Edgecombe",
        "espn": "5124612",
        "status": null,
        "team_abbr": "PHI",
        "pos": "SG",
        "fpts": 2402.25,
        "avg": 15,
        "last": 15
      },
      {
        "name": "CJ McCollum",
        "espn": "2490149",
        "status": null,
        "team_abbr": "ATL",
        "pos": "SG, PG",
        "fpts": 2566.5,
        "avg": null,
        "last": null
      }
    ],
    "ir": []
  },
  "sin-talento": {
    "starters": [
      {
        "name": "Cade Cunningham",
        "espn": "4432166",
        "status": null,
        "team_abbr": "DET",
        "pos": "PG",
        "fpts": 3696,
        "avg": 47,
        "last": 47
      },
      {
        "name": "Tyrese Maxey",
        "espn": "4431678",
        "status": null,
        "team_abbr": "PHI",
        "pos": "PG, SG",
        "fpts": 3552,
        "avg": 71.5,
        "last": 71.5
      },
      {
        "name": "Jalen Williams",
        "espn": "4593803",
        "status": null,
        "team_abbr": "OKC",
        "pos": "PF, SF",
        "fpts": 3057.25,
        "avg": 25.75,
        "last": 25.75
      },
      {
        "name": "Giannis Antetokounmpo",
        "espn": "3032977",
        "status": null,
        "team_abbr": "MIA",
        "pos": "PF, C",
        "fpts": 4028,
        "avg": null,
        "last": null
      },
      {
        "name": "Joel Embiid",
        "espn": "3059318",
        "status": null,
        "team_abbr": "PHI",
        "pos": "C",
        "fpts": 2581.5,
        "avg": 44.25,
        "last": 44.25
      },
      {
        "name": "Derrick White",
        "espn": "3078576",
        "status": null,
        "team_abbr": "BOS",
        "pos": "SG, PG",
        "fpts": 2866.75,
        "avg": 39,
        "last": 39
      },
      {
        "name": "Josh Hart",
        "espn": "3062679",
        "status": null,
        "team_abbr": "NY",
        "pos": "SF, SG",
        "fpts": 2011.25,
        "avg": 35.25,
        "last": 35.25
      },
      {
        "name": "Jamal Murray",
        "espn": "3936299",
        "status": null,
        "team_abbr": "DEN",
        "pos": "PG",
        "fpts": 3292.5,
        "avg": null,
        "last": null
      },
      {
        "name": "Myles Turner",
        "espn": "3133628",
        "status": null,
        "team_abbr": "MIL",
        "pos": "C",
        "fpts": 1900.75,
        "avg": null,
        "last": null
      }
    ],
    "bench": [
      {
        "name": "Jaren Jackson Jr.",
        "espn": "4277961",
        "status": null,
        "team_abbr": "UTAH",
        "pos": "C, PF",
        "fpts": 2492.25,
        "avg": null,
        "last": null
      },
      {
        "name": "Malik Monk",
        "espn": "4066262",
        "status": "DTD",
        "team_abbr": "SAC",
        "pos": "SG, PG",
        "fpts": 2013.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Herbert Jones",
        "espn": "4277813",
        "status": null,
        "team_abbr": "NO",
        "pos": "SF, PF",
        "fpts": 1343.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Brandon Miller",
        "espn": "4433287",
        "status": null,
        "team_abbr": "CHA",
        "pos": "SF, SG",
        "fpts": 2643,
        "avg": null,
        "last": null
      }
    ],
    "ir": []
  },
  "imcebollin": {
    "starters": [
      {
        "name": "Tyrese Haliburton",
        "espn": "4396993",
        "status": null,
        "team_abbr": "IND",
        "pos": "PG, SG",
        "fpts": 3274.5,
        "avg": null,
        "last": null
      },
      {
        "name": "Anthony Edwards",
        "espn": "4594268",
        "status": null,
        "team_abbr": "MIN",
        "pos": "SG, SF",
        "fpts": 3787.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Scottie Barnes",
        "espn": "4433134",
        "status": null,
        "team_abbr": "TOR",
        "pos": "SF, SG",
        "fpts": 3091.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Anthony Davis",
        "espn": "6583",
        "status": null,
        "team_abbr": "WSH",
        "pos": "C, PF",
        "fpts": 2890.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Naz Reid",
        "espn": "4396971",
        "status": null,
        "team_abbr": "CHA",
        "pos": "C, PF",
        "fpts": 2529,
        "avg": null,
        "last": null
      },
      {
        "name": "Damian Lillard",
        "espn": "6606",
        "status": null,
        "team_abbr": "POR",
        "pos": "PG",
        "fpts": 2722.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Deni Avdija",
        "espn": "4683021",
        "status": "DTD",
        "team_abbr": "POR",
        "pos": "SF, PF",
        "fpts": 3002.25,
        "avg": null,
        "last": null
      },
      {
        "name": "Lauri Markkanen",
        "espn": "4066336",
        "status": null,
        "team_abbr": "UTAH",
        "pos": "PF, SF",
        "fpts": 2727,
        "avg": null,
        "last": null
      },
      {
        "name": "Norman Powell",
        "espn": "2595516",
        "status": null,
        "team_abbr": "CHI",
        "pos": "SG, SF",
        "fpts": 2787.5,
        "avg": null,
        "last": null
      }
    ],
    "bench": [
      {
        "name": "Jayson Tatum",
        "espn": "4065648",
        "status": null,
        "team_abbr": "BOS",
        "pos": "PF, SF",
        "fpts": 3389.5,
        "avg": 25.25,
        "last": 25.25
      },
      {
        "name": "Stephon Castle",
        "espn": "4845367",
        "status": null,
        "team_abbr": "SA",
        "pos": "PG, SG",
        "fpts": 2727,
        "avg": 34.5,
        "last": 34.5
      },
      {
        "name": "Caleb Wilson",
        "espn": "5095151",
        "status": null,
        "team_abbr": "CHI",
        "pos": "SF",
        "fpts": 2388.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Cameron Boozer",
        "espn": "5041935",
        "status": null,
        "team_abbr": "MEM",
        "pos": "PF",
        "fpts": 2424.25,
        "avg": null,
        "last": null
      },
      {
        "name": "Donovan Clingan",
        "espn": "5105565",
        "status": null,
        "team_abbr": "POR",
        "pos": "C",
        "fpts": 1970.25,
        "avg": null,
        "last": null
      }
    ],
    "ir": [
      {
        "name": "Brandin Podziemski",
        "espn": "4709138",
        "status": "OUT",
        "team_abbr": "GS",
        "pos": "SG, PG",
        "fpts": 2370.5,
        "avg": null,
        "last": null
      }
    ]
  },
  "concheros": {
    "starters": [
      {
        "name": "Shai Gilgeous-Alexander",
        "espn": "4278073",
        "status": null,
        "team_abbr": "OKC",
        "pos": "PG",
        "fpts": 4891.5,
        "avg": 78,
        "last": 78
      },
      {
        "name": "Austin Reaves",
        "espn": "4066457",
        "status": null,
        "team_abbr": "LAL",
        "pos": "SG, PG",
        "fpts": 3188.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Jaylen Brown",
        "espn": "3917376",
        "status": null,
        "team_abbr": "PHI",
        "pos": "SF, SG",
        "fpts": 2933.5,
        "avg": 50.75,
        "last": 50.75
      },
      {
        "name": "OG Anunoby",
        "espn": "3934719",
        "status": null,
        "team_abbr": "NY",
        "pos": "SF, PF",
        "fpts": 2283.25,
        "avg": 14.25,
        "last": 14.25
      },
      {
        "name": "Bam Adebayo",
        "espn": "4066261",
        "status": null,
        "team_abbr": "MIA",
        "pos": "C, PF",
        "fpts": 2674.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Jalen Brunson",
        "espn": "3934672",
        "status": null,
        "team_abbr": "NY",
        "pos": "PG",
        "fpts": 3604.25,
        "avg": 28.25,
        "last": 28.25
      },
      {
        "name": "Julius Randle",
        "espn": "3064514",
        "status": null,
        "team_abbr": "BKN",
        "pos": "PF",
        "fpts": 2666.5,
        "avg": null,
        "last": null
      },
      {
        "name": "Karl-Anthony Towns",
        "espn": "3136195",
        "status": null,
        "team_abbr": "NY",
        "pos": "C",
        "fpts": 2875.75,
        "avg": 46.75,
        "last": 46.75
      },
      {
        "name": "De'Aaron Fox",
        "espn": "4066259",
        "status": null,
        "team_abbr": "SA",
        "pos": "PG, SG",
        "fpts": 2933.25,
        "avg": 42.75,
        "last": 42.75
      }
    ],
    "bench": [
      {
        "name": "Nickeil Alexander-Walker",
        "espn": "4278039",
        "status": null,
        "team_abbr": "ATL",
        "pos": "SG, PG",
        "fpts": 2905.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Franz Wagner",
        "espn": "4566434",
        "status": null,
        "team_abbr": "ORL",
        "pos": "SF, PF",
        "fpts": 2715.5,
        "avg": null,
        "last": null
      },
      {
        "name": "Onyeka Okongwu",
        "espn": "4431680",
        "status": null,
        "team_abbr": "ATL",
        "pos": "C",
        "fpts": 2315.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Dejounte Murray",
        "espn": "3907497",
        "status": null,
        "team_abbr": "NO",
        "pos": "SG, PG",
        "fpts": 2726,
        "avg": null,
        "last": null
      },
      {
        "name": "John Collins",
        "espn": "3908845",
        "status": null,
        "team_abbr": "DET",
        "pos": "PF, C",
        "fpts": 2052.75,
        "avg": 23,
        "last": 23
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
        "avg": null,
        "last": null
      },
      {
        "name": "Devin Booker",
        "espn": "3136193",
        "status": null,
        "team_abbr": "PHX",
        "pos": "PG, SG",
        "fpts": 3501.25,
        "avg": null,
        "last": null
      },
      {
        "name": "Paolo Banchero",
        "espn": "4432573",
        "status": null,
        "team_abbr": "ORL",
        "pos": "PF, SF",
        "fpts": 2740.25,
        "avg": null,
        "last": null
      },
      {
        "name": "Jalen Johnson",
        "espn": "4701230",
        "status": null,
        "team_abbr": "ATL",
        "pos": "PF",
        "fpts": 3442.25,
        "avg": null,
        "last": null
      },
      {
        "name": "Victor Wembanyama",
        "espn": "5104157",
        "status": null,
        "team_abbr": "SA",
        "pos": "C",
        "fpts": 3892,
        "avg": 40.5,
        "last": 40.5
      },
      {
        "name": "Stephen Curry",
        "espn": "3975",
        "status": "DTD",
        "team_abbr": "GS",
        "pos": "PG",
        "fpts": 3096,
        "avg": null,
        "last": null
      },
      {
        "name": "LeBron James",
        "espn": "1966",
        "status": null,
        "team_abbr": "PHI",
        "pos": "SF, PF",
        "fpts": 2821.25,
        "avg": 41.5,
        "last": 41.5
      },
      {
        "name": "Tyler Herro",
        "espn": "4395725",
        "status": null,
        "team_abbr": "MIL",
        "pos": "SG, PG",
        "fpts": 2766,
        "avg": null,
        "last": null
      },
      {
        "name": "Ty Jerome",
        "espn": "4065733",
        "status": null,
        "team_abbr": "MEM",
        "pos": "SG, PG",
        "fpts": 2780.25,
        "avg": null,
        "last": null
      }
    ],
    "bench": [
      {
        "name": "Jalen Duren",
        "espn": "4433621",
        "status": null,
        "team_abbr": "DET",
        "pos": "C",
        "fpts": 2852,
        "avg": 51.25,
        "last": 51.25
      },
      {
        "name": "Kon Knueppel",
        "espn": "5061575",
        "status": "OUT",
        "team_abbr": "CHA",
        "pos": "SF, SG",
        "fpts": 2772,
        "avg": null,
        "last": null
      },
      {
        "name": "AJ Dybantsa",
        "espn": "5142718",
        "status": "OUT",
        "team_abbr": "WSH",
        "pos": "SF",
        "fpts": 2572.25,
        "avg": null,
        "last": null
      },
      {
        "name": "Darryn Peterson",
        "espn": "5041955",
        "status": null,
        "team_abbr": "UTAH",
        "pos": "SG, PG",
        "fpts": 2364.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Aaron Gordon",
        "espn": "3064290",
        "status": null,
        "team_abbr": "DEN",
        "pos": "PF",
        "fpts": 1924.75,
        "avg": null,
        "last": null
      }
    ],
    "ir": []
  },
  "pantyman": {
    "starters": [
      {
        "name": "Trae Young",
        "espn": "4277905",
        "status": null,
        "team_abbr": "WSH",
        "pos": "PG",
        "fpts": 3512.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Desmond Bane",
        "espn": "4066320",
        "status": null,
        "team_abbr": "ORL",
        "pos": "SG, SF",
        "fpts": 2922,
        "avg": null,
        "last": null
      },
      {
        "name": "Kawhi Leonard",
        "espn": "6450",
        "status": null,
        "team_abbr": "TOR",
        "pos": "SF, PF",
        "fpts": 3068.5,
        "avg": null,
        "last": null
      },
      {
        "name": "Jaden McDaniels",
        "espn": "4431671",
        "status": null,
        "team_abbr": "MIN",
        "pos": "SF, PF",
        "fpts": 2249.25,
        "avg": null,
        "last": null
      },
      {
        "name": "Walker Kessler",
        "espn": "4433136",
        "status": null,
        "team_abbr": "LAL",
        "pos": "C",
        "fpts": 2000.5,
        "avg": null,
        "last": null
      },
      {
        "name": "Darius Garland",
        "espn": "4396907",
        "status": null,
        "team_abbr": "LAC",
        "pos": "PG",
        "fpts": 3066,
        "avg": null,
        "last": null
      },
      {
        "name": "Kevin Durant",
        "espn": "3202",
        "status": null,
        "team_abbr": "HOU",
        "pos": "PF, SF",
        "fpts": 3356.5,
        "avg": null,
        "last": null
      },
      {
        "name": "Domantas Sabonis",
        "espn": "3155942",
        "status": null,
        "team_abbr": "SAC",
        "pos": "C, PF",
        "fpts": 2825.75,
        "avg": null,
        "last": null
      },
      {
        "name": "Dyson Daniels",
        "espn": "4869342",
        "status": null,
        "team_abbr": "ATL",
        "pos": "SG, PG",
        "fpts": 2519.75,
        "avg": null,
        "last": null
      }
    ],
    "bench": [
      {
        "name": "Nikola Jokic",
        "espn": "3112335",
        "status": null,
        "team_abbr": "DEN",
        "pos": "C",
        "fpts": 4739.25,
        "avg": null,
        "last": null
      },
      {
        "name": "Donovan Mitchell",
        "espn": "3908809",
        "status": null,
        "team_abbr": "CLE",
        "pos": "SG, PG",
        "fpts": 3603,
        "avg": null,
        "last": null
      },
      {
        "name": "James Harden",
        "espn": "3992",
        "status": null,
        "team_abbr": "CLE",
        "pos": "PG, SG",
        "fpts": 3205.25,
        "avg": null,
        "last": null
      },
      {
        "name": "Paul George",
        "espn": "4251",
        "status": null,
        "team_abbr": "BOS",
        "pos": "SF, PF",
        "fpts": 2166.75,
        "avg": 82.75,
        "last": 82.75
      },
      {
        "name": "Rui Hachimura",
        "espn": "4066648",
        "status": null,
        "team_abbr": "LAC",
        "pos": "PF, SF",
        "fpts": 1725.5,
        "avg": null,
        "last": null
      }
    ],
    "ir": []
  }
};

window.NBA_FREE_AGENTS = [
  {
    "name": "Mikal Bridges",
    "espn": "3147657",
    "status": null,
    "team_abbr": "NY",
    "pos": "SF, SG",
    "fpts": 2802.75,
    "avg": 9.5,
    "last": 9.5
  },
  {
    "name": "Jarrett Allen",
    "espn": "4066328",
    "status": "DTD",
    "team_abbr": "CLE",
    "pos": "C",
    "fpts": 2407.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Ja Morant",
    "espn": "4279888",
    "status": null,
    "team_abbr": "POR",
    "pos": "PG",
    "fpts": 2687.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Trey Murphy III",
    "espn": "4397688",
    "status": null,
    "team_abbr": "NO",
    "pos": "SF, SG",
    "fpts": 2576.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Dylan Harper",
    "espn": "5037871",
    "status": null,
    "team_abbr": "SA",
    "pos": "PG, SG",
    "fpts": 2392.75,
    "avg": 33,
    "last": 33
  },
  {
    "name": "Keyonte George",
    "espn": "4433627",
    "status": null,
    "team_abbr": "UTAH",
    "pos": "PG, SG",
    "fpts": 2768,
    "avg": null,
    "last": null
  },
  {
    "name": "Ivica Zubac",
    "espn": "4017837",
    "status": null,
    "team_abbr": "IND",
    "pos": "C",
    "fpts": 2112.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Alex Sarr",
    "espn": "5160992",
    "status": null,
    "team_abbr": "WSH",
    "pos": "C, PF",
    "fpts": 2294.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Miles Bridges",
    "espn": "4066383",
    "status": null,
    "team_abbr": "PHX",
    "pos": "SF, PF",
    "fpts": 2384.25,
    "avg": null,
    "last": null
  },
  {
    "name": "DeMar DeRozan",
    "espn": "3978",
    "status": null,
    "team_abbr": "DEN",
    "pos": "SF, PF",
    "fpts": 2588,
    "avg": null,
    "last": null
  },
  {
    "name": "Jalen Green",
    "espn": "4437244",
    "status": null,
    "team_abbr": "PHX",
    "pos": "SG, SF",
    "fpts": 2411.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Matas Buzelis",
    "espn": "4711294",
    "status": null,
    "team_abbr": "CHI",
    "pos": "SF, PF",
    "fpts": 2367,
    "avg": null,
    "last": null
  },
  {
    "name": "Ausar Thompson",
    "espn": "4684742",
    "status": null,
    "team_abbr": "DET",
    "pos": "SF, PF",
    "fpts": 2027,
    "avg": 34.5,
    "last": 34.5
  },
  {
    "name": "Payton Pritchard",
    "espn": "4066354",
    "status": null,
    "team_abbr": "BOS",
    "pos": "PG, SG",
    "fpts": 2356.75,
    "avg": 29.25,
    "last": 29.25
  },
  {
    "name": "Coby White",
    "espn": "4395651",
    "status": "OUT",
    "team_abbr": "CHA",
    "pos": "PG, SG",
    "fpts": 2541.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Kel'el Ware",
    "espn": "5105623",
    "status": null,
    "team_abbr": "MIL",
    "pos": "C",
    "fpts": 2005.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Immanuel Quickley",
    "espn": "4395724",
    "status": null,
    "team_abbr": "TOR",
    "pos": "PG, SG",
    "fpts": 2357.5,
    "avg": null,
    "last": null
  },
  {
    "name": "RJ Barrett",
    "espn": "4395625",
    "status": null,
    "team_abbr": "TOR",
    "pos": "SF, SG",
    "fpts": 2245.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Reed Sheppard",
    "espn": "4711272",
    "status": null,
    "team_abbr": "HOU",
    "pos": "SG, PG",
    "fpts": 2326,
    "avg": null,
    "last": null
  },
  {
    "name": "Darius Acuff Jr.",
    "espn": "5142620",
    "status": null,
    "team_abbr": "SAC",
    "pos": "PG",
    "fpts": 2425.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Ryan Rollins",
    "espn": "4591725",
    "status": null,
    "team_abbr": "MIL",
    "pos": "SG, PG",
    "fpts": 2253.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Derik Queen",
    "espn": "4869780",
    "status": null,
    "team_abbr": "NO",
    "pos": "C, PF",
    "fpts": 2122.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Brandon Ingram",
    "espn": "3913176",
    "status": "OUT",
    "team_abbr": "LAC",
    "pos": "SF, PF",
    "fpts": 2248.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Andrew Wiggins",
    "espn": "3059319",
    "status": null,
    "team_abbr": "MIA",
    "pos": "SF, PF",
    "fpts": 2171,
    "avg": null,
    "last": null
  },
  {
    "name": "Fred VanVleet",
    "espn": "2991230",
    "status": null,
    "team_abbr": "HOU",
    "pos": "PG, SG",
    "fpts": 2308.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Nikola Vucevic",
    "espn": "6478",
    "status": null,
    "team_abbr": "ORL",
    "pos": "C",
    "fpts": 1969.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Zach Edey",
    "espn": "4600663",
    "status": null,
    "team_abbr": "MEM",
    "pos": "C",
    "fpts": 1722,
    "avg": null,
    "last": null
  },
  {
    "name": "Zach LaVine",
    "espn": "3064440",
    "status": null,
    "team_abbr": "SAC",
    "pos": "SG, SF",
    "fpts": 2146.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Ayo Dosunmu",
    "espn": "4397002",
    "status": null,
    "team_abbr": "MIN",
    "pos": "SG, PG",
    "fpts": 2311.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Jabari Smith Jr.",
    "espn": "4432639",
    "status": null,
    "team_abbr": "HOU",
    "pos": "PF, C",
    "fpts": 1850.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Kristaps Porzingis",
    "espn": "3102531",
    "status": "OUT",
    "team_abbr": "GS",
    "pos": "C, PF",
    "fpts": 2194.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Keegan Murray",
    "espn": "4594327",
    "status": null,
    "team_abbr": "SAC",
    "pos": "PF, SF",
    "fpts": 1953,
    "avg": null,
    "last": null
  },
  {
    "name": "Kevin Porter Jr.",
    "espn": "4397140",
    "status": null,
    "team_abbr": "FA",
    "pos": "SG, PG",
    "fpts": 2228.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Tobias Harris",
    "espn": "6440",
    "status": "DTD",
    "team_abbr": "SA",
    "pos": "PF, SF",
    "fpts": 2093.25,
    "avg": null,
    "last": 0
  },
  {
    "name": "Yaxel Lendeborg",
    "espn": "5175737",
    "status": null,
    "team_abbr": "GS",
    "pos": "SF, PF",
    "fpts": 1590.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Jeremiah Fears",
    "espn": "5144091",
    "status": null,
    "team_abbr": "NO",
    "pos": "SG, PG",
    "fpts": 2203.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Egor Demin",
    "espn": "5175643",
    "status": null,
    "team_abbr": "BKN",
    "pos": "PG, SG",
    "fpts": 2130,
    "avg": null,
    "last": null
  },
  {
    "name": "Jakob Poeltl",
    "espn": "3134908",
    "status": null,
    "team_abbr": "TOR",
    "pos": "C",
    "fpts": 1886.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Jaime Jaquez Jr.",
    "espn": "4432848",
    "status": null,
    "team_abbr": "MIL",
    "pos": "SF, SG",
    "fpts": 2123.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Andrew Nembhard",
    "espn": "4395712",
    "status": null,
    "team_abbr": "IND",
    "pos": "PG, SG",
    "fpts": 2094.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Peyton Watson",
    "espn": "4576087",
    "status": null,
    "team_abbr": "CLE",
    "pos": "SF, PF",
    "fpts": 2080,
    "avg": null,
    "last": null
  },
  {
    "name": "Nic Claxton",
    "espn": "4278067",
    "status": "OUT",
    "team_abbr": "CHI",
    "pos": "C",
    "fpts": 1934.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Cedric Coward",
    "espn": "4903027",
    "status": null,
    "team_abbr": "MEM",
    "pos": "SF, SG",
    "fpts": 1971.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Quentin Grimes",
    "espn": "4397014",
    "status": null,
    "team_abbr": "LAL",
    "pos": "SG, SF",
    "fpts": 2101.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Collin Gillespie",
    "espn": "4278585",
    "status": null,
    "team_abbr": "PHX",
    "pos": "PG",
    "fpts": 2024,
    "avg": null,
    "last": null
  },
  {
    "name": "Ace Bailey",
    "espn": "4873138",
    "status": null,
    "team_abbr": "UTAH",
    "pos": "SF, PF",
    "fpts": 1943,
    "avg": null,
    "last": null
  },
  {
    "name": "Isaiah Hartenstein",
    "espn": "4222252",
    "status": null,
    "team_abbr": "OKC",
    "pos": "C",
    "fpts": 1601.25,
    "avg": 16.5,
    "last": 16.5
  },
  {
    "name": "Dillon Brooks",
    "espn": "3155526",
    "status": null,
    "team_abbr": "PHX",
    "pos": "SF, SG",
    "fpts": 2014.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Kyshawn George",
    "espn": "5174563",
    "status": null,
    "team_abbr": "WSH",
    "pos": "SG, SF",
    "fpts": 1937,
    "avg": null,
    "last": null
  },
  {
    "name": "Jimmy Butler III",
    "espn": "6430",
    "status": "OUT",
    "team_abbr": "GS",
    "pos": "SF, SG",
    "fpts": 1605.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Devin Vassell",
    "espn": "4395630",
    "status": null,
    "team_abbr": "SA",
    "pos": "SG, SF",
    "fpts": 1917.75,
    "avg": 8.5,
    "last": 8.5
  },
  {
    "name": "Collin Sexton",
    "espn": "4277811",
    "status": "OUT",
    "team_abbr": "LAL",
    "pos": "SG, PG",
    "fpts": 2272.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Draymond Green",
    "espn": "6589",
    "status": null,
    "team_abbr": "GS",
    "pos": "PF, C",
    "fpts": 1604.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Julian Champagnie",
    "espn": "4592479",
    "status": null,
    "team_abbr": "SA",
    "pos": "SF, PF",
    "fpts": 1722.75,
    "avg": 33.75,
    "last": 33.75
  },
  {
    "name": "Jalen Suggs",
    "espn": "4432165",
    "status": null,
    "team_abbr": "ORL",
    "pos": "PG, SG",
    "fpts": 1847.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Daniel Gafford",
    "espn": "4278049",
    "status": null,
    "team_abbr": "DAL",
    "pos": "C",
    "fpts": 1841.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Jrue Holiday",
    "espn": "3995",
    "status": null,
    "team_abbr": "POR",
    "pos": "PG, SG",
    "fpts": 1866.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Jonathan Kuminga",
    "espn": "4433247",
    "status": null,
    "team_abbr": "MIN",
    "pos": "PF, SF",
    "fpts": 1709.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Neemias Queta",
    "espn": "4397424",
    "status": null,
    "team_abbr": "BOS",
    "pos": "C",
    "fpts": 1706.5,
    "avg": 18.5,
    "last": 18.5
  },
  {
    "name": "Cason Wallace",
    "espn": "4683692",
    "status": null,
    "team_abbr": "OKC",
    "pos": "SG, PG",
    "fpts": 1789.75,
    "avg": 13.25,
    "last": 13.25
  },
  {
    "name": "Mitchell Robinson",
    "espn": "4351852",
    "status": null,
    "team_abbr": "BOS",
    "pos": "C",
    "fpts": 1375.25,
    "avg": 18.5,
    "last": 18.5
  },
  {
    "name": "Jared McCain",
    "espn": "4683778",
    "status": null,
    "team_abbr": "OKC",
    "pos": "SG, PG",
    "fpts": 1434.25,
    "avg": 43,
    "last": 43
  },
  {
    "name": "Anthony Black",
    "espn": "4712849",
    "status": "OUT",
    "team_abbr": "ORL",
    "pos": "PG, SG",
    "fpts": 2009.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Oso Ighodaro",
    "espn": "4601023",
    "status": null,
    "team_abbr": "PHX",
    "pos": "PF",
    "fpts": 1777.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Toumani Camara",
    "espn": "4431736",
    "status": null,
    "team_abbr": "POR",
    "pos": "PF, SF",
    "fpts": 1650.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Saddiq Bey",
    "espn": "4397136",
    "status": null,
    "team_abbr": "NO",
    "pos": "SF, PF",
    "fpts": 1838.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Scotty Pippen Jr.",
    "espn": "4431785",
    "status": null,
    "team_abbr": "MEM",
    "pos": "PG, SG",
    "fpts": 1980.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Day'Ron Sharpe",
    "espn": "4432194",
    "status": null,
    "team_abbr": "BKN",
    "pos": "C",
    "fpts": 1552.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Bennedict Mathurin",
    "espn": "4683634",
    "status": null,
    "team_abbr": "NO",
    "pos": "SF, SG",
    "fpts": 1758,
    "avg": null,
    "last": null
  },
  {
    "name": "Collin Murray-Boyles",
    "espn": "5093267",
    "status": null,
    "team_abbr": "TOR",
    "pos": "PF",
    "fpts": 1547.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Davion Mitchell",
    "espn": "4278053",
    "status": null,
    "team_abbr": "MIA",
    "pos": "PG",
    "fpts": 1840.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Jordan Poole",
    "espn": "4277956",
    "status": null,
    "team_abbr": "NO",
    "pos": "SG, PG",
    "fpts": 1579.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Jerami Grant",
    "espn": "2991070",
    "status": null,
    "team_abbr": "MEM",
    "pos": "PF",
    "fpts": 2007.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Andre Drummond",
    "espn": "6585",
    "status": null,
    "team_abbr": "NY",
    "pos": "C",
    "fpts": 882.25,
    "avg": 47,
    "last": 47
  },
  {
    "name": "Deandre Ayton",
    "espn": "4278129",
    "status": null,
    "team_abbr": "WSH",
    "pos": "C",
    "fpts": 1446.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Christian Braun",
    "espn": "4431767",
    "status": null,
    "team_abbr": "DEN",
    "pos": "SG, SF",
    "fpts": 1497.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Keldon Johnson",
    "espn": "4395723",
    "status": null,
    "team_abbr": "SA",
    "pos": "SF, PF",
    "fpts": 1815.5,
    "avg": 25,
    "last": 25
  },
  {
    "name": "Brook Lopez",
    "espn": "3448",
    "status": null,
    "team_abbr": "LAC",
    "pos": "C",
    "fpts": 1823,
    "avg": null,
    "last": null
  },
  {
    "name": "Bobby Portis",
    "espn": "3064482",
    "status": null,
    "team_abbr": "MIA",
    "pos": "PF, C",
    "fpts": 1541.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Cameron Johnson",
    "espn": "3138196",
    "status": null,
    "team_abbr": "DEN",
    "pos": "SF, PF",
    "fpts": 1796,
    "avg": null,
    "last": null
  },
  {
    "name": "P.J. Washington",
    "espn": "4278078",
    "status": null,
    "team_abbr": "DAL",
    "pos": "PF, SF",
    "fpts": 1583.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Anfernee Simons",
    "espn": "4351851",
    "status": null,
    "team_abbr": "PHI",
    "pos": "SG, PG",
    "fpts": 1680.5,
    "avg": 20.75,
    "last": 20.75
  },
  {
    "name": "Aday Mara",
    "espn": "5174983",
    "status": null,
    "team_abbr": "OKC",
    "pos": "C",
    "fpts": null,
    "avg": 17.25,
    "last": 17.25
  },
  {
    "name": "Keaton Wagler",
    "espn": "5254165",
    "status": null,
    "team_abbr": "LAC",
    "pos": "PG, SG",
    "fpts": 1829,
    "avg": null,
    "last": null
  },
  {
    "name": "Klay Thompson",
    "espn": "6475",
    "status": null,
    "team_abbr": "MIA",
    "pos": "SG, SF",
    "fpts": 1418.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Alex Caruso",
    "espn": "2991350",
    "status": null,
    "team_abbr": "OKC",
    "pos": "SG, PG",
    "fpts": 1585.25,
    "avg": 26.75,
    "last": 26.75
  },
  {
    "name": "Scoot Henderson",
    "espn": "4683678",
    "status": null,
    "team_abbr": "POR",
    "pos": "PG, SG",
    "fpts": 1784,
    "avg": null,
    "last": null
  },
  {
    "name": "Ajay Mitchell",
    "espn": "4900671",
    "status": null,
    "team_abbr": "OKC",
    "pos": "PG, SG",
    "fpts": 1461.5,
    "avg": 14,
    "last": 14
  },
  {
    "name": "Jake LaRavia",
    "espn": "4592691",
    "status": null,
    "team_abbr": "LAL",
    "pos": "PF, SF",
    "fpts": 1714.5,
    "avg": null,
    "last": null
  },
  {
    "name": "T.J. McConnell",
    "espn": "2530530",
    "status": "OUT",
    "team_abbr": "IND",
    "pos": "PG",
    "fpts": 1786.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Mikel Brown Jr.",
    "espn": "5101761",
    "status": null,
    "team_abbr": "BKN",
    "pos": "PG",
    "fpts": 1929.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Kyle Filipowski",
    "espn": "4684793",
    "status": null,
    "team_abbr": "UTAH",
    "pos": "C, PF",
    "fpts": 1612.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Duncan Robinson",
    "espn": "3157465",
    "status": null,
    "team_abbr": "DET",
    "pos": "SF, SG",
    "fpts": 1701.5,
    "avg": 32.75,
    "last": 32.75
  },
  {
    "name": "Moussa Diabate",
    "espn": "4433249",
    "status": null,
    "team_abbr": "CHA",
    "pos": "PF, C",
    "fpts": 1330,
    "avg": null,
    "last": null
  },
  {
    "name": "Grayson Allen",
    "espn": "3135045",
    "status": null,
    "team_abbr": "CHA",
    "pos": "SG, PG",
    "fpts": 1748.75,
    "avg": null,
    "last": null
  },
  {
    "name": "Shaedon Sharpe",
    "espn": "4914336",
    "status": "OUT",
    "team_abbr": "POR",
    "pos": "SG, SF",
    "fpts": 722,
    "avg": null,
    "last": null
  },
  {
    "name": "Mark Williams",
    "espn": "4701232",
    "status": "OUT",
    "team_abbr": "PHX",
    "pos": "C",
    "fpts": 666.5,
    "avg": null,
    "last": null
  },
  {
    "name": "Khaman Maluach",
    "espn": "5203685",
    "status": null,
    "team_abbr": "PHX",
    "pos": "C",
    "fpts": 1145,
    "avg": null,
    "last": null
  },
  {
    "name": "Jusuf Nurkic",
    "espn": "3102530",
    "status": "OUT",
    "team_abbr": "UTAH",
    "pos": "C",
    "fpts": 1413.25,
    "avg": null,
    "last": null
  },
  {
    "name": "Santi Aldama",
    "espn": "4593125",
    "status": "OUT",
    "team_abbr": "DAL",
    "pos": "PF, SF",
    "fpts": 1514.75,
    "avg": null,
    "last": null
  }
];
