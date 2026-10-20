/* ============================================================
   NBA ROSTERS & FREE AGENTS
   Generated with nba-roster-manager.html (in the folder above) - edit it
   there rather than by hand. The teams themselves are in nba-teams-data.js.

   Each player:  name, status (DTD, OUT, SUSP... or null when healthy),
   team_abbr (his NBA team), pos (every position he can play, as ESPN lists
   it, e.g. "PG, SG" - the first one is his main position) and fpts / avg /
   last (season fantasy points, average per game, last game - null = not
   known yet).
   NBA_STARTER_SLOTS  the 9 starters from the rules sheet, in order.
   NBA_ROSTERS        each team's starters (one per slot, null = empty),
                      bench and IR.
   NBA_FREE_AGENTS    the free-agent board, in league order (#1 first).
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
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Josh Giddey",
        "espn": "4871145",
        "status": null,
        "team_abbr": "CHI",
        "pos": "PG, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Cooper Flagg",
        "espn": "5041939",
        "status": null,
        "team_abbr": "DAL",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Pascal Siakam",
        "espn": "3149673",
        "status": null,
        "team_abbr": "IND",
        "pos": "PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Alperen Sengun",
        "espn": "4871144",
        "status": "DTD",
        "team_abbr": "HOU",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Kyrie Irving",
        "espn": "6442",
        "status": null,
        "team_abbr": "DAL",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Amen Thompson",
        "espn": "4684740",
        "status": null,
        "team_abbr": "HOU",
        "pos": "SF, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Michael Porter Jr.",
        "espn": "4278104",
        "status": "DTD",
        "team_abbr": "BKN",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Evan Mobley",
        "espn": "4432158",
        "status": null,
        "team_abbr": "CLE",
        "pos": "PF, C",
        "fpts": null,
        "avg": null,
        "last": null
      }
    ],
    "bench": [
      {
        "name": "Zion Williamson",
        "espn": "4395628",
        "status": null,
        "team_abbr": "NO",
        "pos": "PF, C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Chet Holmgren",
        "espn": "4433255",
        "status": "DTD",
        "team_abbr": "OKC",
        "pos": "C, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Rudy Gobert",
        "espn": "3032976",
        "status": "DTD",
        "team_abbr": "MIN",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "VJ Edgecombe",
        "espn": "5124612",
        "status": null,
        "team_abbr": "PHI",
        "pos": "SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "CJ McCollum",
        "espn": "2490149",
        "status": null,
        "team_abbr": "ATL",
        "pos": "SG, PG",
        "fpts": null,
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
        "status": "DTD",
        "team_abbr": "DET",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Tyrese Maxey",
        "espn": "4431678",
        "status": null,
        "team_abbr": "PHI",
        "pos": "PG, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jalen Williams",
        "espn": "4593803",
        "status": "DTD",
        "team_abbr": "OKC",
        "pos": "PF, SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Giannis Antetokounmpo",
        "espn": "3032977",
        "status": "DTD",
        "team_abbr": "MIA",
        "pos": "PF, C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Donovan Clingan",
        "espn": "5105565",
        "status": null,
        "team_abbr": "POR",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Derrick White",
        "espn": "3078576",
        "status": null,
        "team_abbr": "BOS",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jaren Jackson Jr.",
        "espn": "4277961",
        "status": null,
        "team_abbr": "UTAH",
        "pos": "C, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jamal Murray",
        "espn": "3936299",
        "status": null,
        "team_abbr": "DEN",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Myles Turner",
        "espn": "3133628",
        "status": null,
        "team_abbr": "MIL",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      }
    ],
    "bench": [
      {
        "name": "Malik Monk",
        "espn": "4066262",
        "status": "DTD",
        "team_abbr": "SAC",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Josh Hart",
        "espn": "3062679",
        "status": null,
        "team_abbr": "NY",
        "pos": "SF, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Donte DiVincenzo",
        "espn": "3934673",
        "status": "OUT",
        "team_abbr": "MIN",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Herbert Jones",
        "espn": "4277813",
        "status": null,
        "team_abbr": "NO",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Tari Eason",
        "espn": "4433192",
        "status": null,
        "team_abbr": "HOU",
        "pos": "SF, PF",
        "fpts": null,
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
        "status": "DTD",
        "team_abbr": "IND",
        "pos": "PG, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Anthony Edwards",
        "espn": "4594268",
        "status": "DTD",
        "team_abbr": "MIN",
        "pos": "SG, SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Scottie Barnes",
        "espn": "4433134",
        "status": null,
        "team_abbr": "TOR",
        "pos": "SF, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jayson Tatum",
        "espn": "4065648",
        "status": null,
        "team_abbr": "BOS",
        "pos": "PF, SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Anthony Davis",
        "espn": "6583",
        "status": null,
        "team_abbr": "WSH",
        "pos": "C, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Stephon Castle",
        "espn": "4845367",
        "status": null,
        "team_abbr": "SA",
        "pos": "PG, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Deni Avdija",
        "espn": "4683021",
        "status": null,
        "team_abbr": "POR",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Naz Reid",
        "espn": "4396971",
        "status": null,
        "team_abbr": "CHA",
        "pos": "C, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Lauri Markkanen",
        "espn": "4066336",
        "status": "DTD",
        "team_abbr": "UTAH",
        "pos": "PF, SF",
        "fpts": null,
        "avg": null,
        "last": null
      }
    ],
    "bench": [
      {
        "name": "Jarrett Allen",
        "espn": "4066328",
        "status": null,
        "team_abbr": "CLE",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Caleb Wilson",
        "espn": "5095151",
        "status": null,
        "team_abbr": "CHI",
        "pos": "SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Cameron Boozer",
        "espn": "5041935",
        "status": null,
        "team_abbr": "MEM",
        "pos": "PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Damian Lillard",
        "espn": "6606",
        "status": null,
        "team_abbr": "POR",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Norman Powell",
        "espn": "2595516",
        "status": null,
        "team_abbr": "CHI",
        "pos": "SG, SF",
        "fpts": null,
        "avg": null,
        "last": null
      }
    ],
    "ir": []
  },
  "concheros": {
    "starters": [
      {
        "name": "Shai Gilgeous-Alexander",
        "espn": "4278073",
        "status": "DTD",
        "team_abbr": "OKC",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Austin Reaves",
        "espn": "4066457",
        "status": null,
        "team_abbr": "LAL",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jaylen Brown",
        "espn": "3917376",
        "status": "DTD",
        "team_abbr": "PHI",
        "pos": "SF, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "OG Anunoby",
        "espn": "3934719",
        "status": null,
        "team_abbr": "NY",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Bam Adebayo",
        "espn": "4066261",
        "status": "DTD",
        "team_abbr": "MIA",
        "pos": "C, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jalen Brunson",
        "espn": "3934672",
        "status": null,
        "team_abbr": "NY",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Julius Randle",
        "espn": "3064514",
        "status": null,
        "team_abbr": "BKN",
        "pos": "PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Karl-Anthony Towns",
        "espn": "3136195",
        "status": null,
        "team_abbr": "NY",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "De'Aaron Fox",
        "espn": "4066259",
        "status": "DTD",
        "team_abbr": "SA",
        "pos": "PG, SG",
        "fpts": null,
        "avg": null,
        "last": null
      }
    ],
    "bench": [
      {
        "name": "Nickeil Alexander-Walker",
        "espn": "4278039",
        "status": "DTD",
        "team_abbr": "ATL",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Franz Wagner",
        "espn": "4566434",
        "status": null,
        "team_abbr": "ORL",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Onyeka Okongwu",
        "espn": "4431680",
        "status": null,
        "team_abbr": "ATL",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Dejounte Murray",
        "espn": "3907497",
        "status": "DTD",
        "team_abbr": "NO",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "John Collins",
        "espn": "3908845",
        "status": null,
        "team_abbr": "DET",
        "pos": "PF, C",
        "fpts": null,
        "avg": null,
        "last": null
      }
    ],
    "ir": []
  },
  "mugiwaras": {
    "starters": [
      {
        "name": "LaMelo Ball",
        "espn": "4432816",
        "status": "DTD",
        "team_abbr": "MIN",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Devin Booker",
        "espn": "3136193",
        "status": "DTD",
        "team_abbr": "PHX",
        "pos": "PG, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "LeBron James",
        "espn": "1966",
        "status": "DTD",
        "team_abbr": "PHI",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jalen Johnson",
        "espn": "4701230",
        "status": null,
        "team_abbr": "ATL",
        "pos": "PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Victor Wembanyama",
        "espn": "5104157",
        "status": null,
        "team_abbr": "SA",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Stephen Curry",
        "espn": "3975",
        "status": null,
        "team_abbr": "GS",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Paolo Banchero",
        "espn": "4432573",
        "status": null,
        "team_abbr": "ORL",
        "pos": "PF, SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jalen Duren",
        "espn": "4433621",
        "status": "DTD",
        "team_abbr": "DET",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Kon Knueppel",
        "espn": "5061575",
        "status": "DTD",
        "team_abbr": "CHA",
        "pos": "SF, SG",
        "fpts": null,
        "avg": null,
        "last": null
      }
    ],
    "bench": [
      {
        "name": "AJ Dybantsa",
        "espn": "5142718",
        "status": null,
        "team_abbr": "WSH",
        "pos": "SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Tyler Herro",
        "espn": "4395725",
        "status": null,
        "team_abbr": "MIL",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Darryn Peterson",
        "espn": "5041955",
        "status": null,
        "team_abbr": "UTAH",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Ty Jerome",
        "espn": "4065733",
        "status": null,
        "team_abbr": "MEM",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Aaron Gordon",
        "espn": "3064290",
        "status": null,
        "team_abbr": "DEN",
        "pos": "PF",
        "fpts": null,
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
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Donovan Mitchell",
        "espn": "3908809",
        "status": null,
        "team_abbr": "CLE",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Kevin Durant",
        "espn": "3202",
        "status": "DTD",
        "team_abbr": "HOU",
        "pos": "PF, SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Domantas Sabonis",
        "espn": "3155942",
        "status": "DTD",
        "team_abbr": "SAC",
        "pos": "C, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Nikola Jokic",
        "espn": "3112335",
        "status": null,
        "team_abbr": "DEN",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "James Harden",
        "espn": "3992",
        "status": null,
        "team_abbr": "CLE",
        "pos": "PG, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Kawhi Leonard",
        "espn": "6450",
        "status": "DTD",
        "team_abbr": "TOR",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Darius Garland",
        "espn": "4396907",
        "status": null,
        "team_abbr": "LAC",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Desmond Bane",
        "espn": "4066320",
        "status": "DTD",
        "team_abbr": "ORL",
        "pos": "SG, SF",
        "fpts": null,
        "avg": null,
        "last": null
      }
    ],
    "bench": [
      {
        "name": "Mikal Bridges",
        "espn": "3147657",
        "status": null,
        "team_abbr": "NY",
        "pos": "SF, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Dyson Daniels",
        "espn": "4869342",
        "status": null,
        "team_abbr": "ATL",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Brandon Miller",
        "espn": "4433287",
        "status": null,
        "team_abbr": "CHA",
        "pos": "SF, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Walker Kessler",
        "espn": "4433136",
        "status": "DTD",
        "team_abbr": "LAL",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Tobias Harris",
        "espn": "6440",
        "status": "DTD",
        "team_abbr": "SA",
        "pos": "PF, SF",
        "fpts": null,
        "avg": null,
        "last": null
      }
    ],
    "ir": []
  }
};

window.NBA_FREE_AGENTS = [
  {
    "name": "Brandon Ingram",
    "espn": "3913176",
    "status": "OUT",
    "team_abbr": "LAC",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Trey Murphy III",
    "espn": "4397688",
    "status": null,
    "team_abbr": "NO",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ryan Rollins",
    "espn": "4591725",
    "status": null,
    "team_abbr": "MIL",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Payton Pritchard",
    "espn": "4066354",
    "status": null,
    "team_abbr": "BOS",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "DeMar DeRozan",
    "espn": "3978",
    "status": null,
    "team_abbr": "DEN",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Miles Bridges",
    "espn": "4066383",
    "status": "DTD",
    "team_abbr": "PHX",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Immanuel Quickley",
    "espn": "4395724",
    "status": null,
    "team_abbr": "TOR",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Matas Buzelis",
    "espn": "4711294",
    "status": null,
    "team_abbr": "CHI",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jabari Smith Jr.",
    "espn": "4432639",
    "status": null,
    "team_abbr": "HOU",
    "pos": "PF, C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Brandin Podziemski",
    "espn": "4709138",
    "status": null,
    "team_abbr": "GS",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Reed Sheppard",
    "espn": "4711272",
    "status": null,
    "team_abbr": "HOU",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jaime Jaquez Jr.",
    "espn": "4432848",
    "status": null,
    "team_abbr": "MIL",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Saddiq Bey",
    "espn": "4397136",
    "status": null,
    "team_abbr": "NO",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Derik Queen",
    "espn": "4869780",
    "status": null,
    "team_abbr": "NO",
    "pos": "C, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Collin Gillespie",
    "espn": "4278585",
    "status": null,
    "team_abbr": "PHX",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Neemias Queta",
    "espn": "4397424",
    "status": null,
    "team_abbr": "BOS",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kel'el Ware",
    "espn": "5105623",
    "status": null,
    "team_abbr": "MIL",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jaden McDaniels",
    "espn": "4431671",
    "status": "DTD",
    "team_abbr": "MIN",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Keyonte George",
    "espn": "4433627",
    "status": null,
    "team_abbr": "UTAH",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Andrew Wiggins",
    "espn": "3059319",
    "status": "DTD",
    "team_abbr": "MIA",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Toumani Camara",
    "espn": "4431736",
    "status": null,
    "team_abbr": "POR",
    "pos": "PF, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Nikola Vucevic",
    "espn": "6478",
    "status": null,
    "team_abbr": "ORL",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Naji Marshall",
    "espn": "4278594",
    "status": null,
    "team_abbr": "DAL",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ausar Thompson",
    "espn": "4684742",
    "status": null,
    "team_abbr": "DET",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Nic Claxton",
    "espn": "4278067",
    "status": "DTD",
    "team_abbr": "CHI",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jeremiah Fears",
    "espn": "5144091",
    "status": null,
    "team_abbr": "NO",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Deandre Ayton",
    "espn": "4278129",
    "status": null,
    "team_abbr": "WSH",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Tre Jones",
    "espn": "4395626",
    "status": "DTD",
    "team_abbr": "CHI",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Russell Westbrook",
    "espn": "3468",
    "status": null,
    "team_abbr": "FA",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Wendell Carter Jr.",
    "espn": "4277847",
    "status": null,
    "team_abbr": "ORL",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ayo Dosunmu",
    "espn": "4397002",
    "status": "DTD",
    "team_abbr": "MIN",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kyle Filipowski",
    "espn": "4684793",
    "status": "DTD",
    "team_abbr": "UTAH",
    "pos": "C, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Keldon Johnson",
    "espn": "4395723",
    "status": null,
    "team_abbr": "SA",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Sandro Mamukelashvili",
    "espn": "4278580",
    "status": null,
    "team_abbr": "LAL",
    "pos": "C, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Maxime Raynaud",
    "espn": "4898371",
    "status": "OUT",
    "team_abbr": "SAC",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jay Huff",
    "espn": "4065731",
    "status": null,
    "team_abbr": "IND",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Julian Champagnie",
    "espn": "4592479",
    "status": null,
    "team_abbr": "SA",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Andrew Nembhard",
    "espn": "4395712",
    "status": null,
    "team_abbr": "IND",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Moussa Diabate",
    "espn": "4433249",
    "status": null,
    "team_abbr": "CHA",
    "pos": "PF, C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "RJ Barrett",
    "espn": "4395625",
    "status": null,
    "team_abbr": "TOR",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Cam Spencer",
    "espn": "4433083",
    "status": null,
    "team_abbr": "MEM",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Anthony Black",
    "espn": "4712849",
    "status": "DTD",
    "team_abbr": "ORL",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Quentin Grimes",
    "espn": "4397014",
    "status": null,
    "team_abbr": "LAL",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jalen Suggs",
    "espn": "4432165",
    "status": "DTD",
    "team_abbr": "ORL",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Collin Sexton",
    "espn": "4277811",
    "status": "DTD",
    "team_abbr": "LAL",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Precious Achiuwa",
    "espn": "4431679",
    "status": null,
    "team_abbr": "SAC",
    "pos": "PF, C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ace Bailey",
    "espn": "4873138",
    "status": null,
    "team_abbr": "UTAH",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Joel Embiid",
    "espn": "3059318",
    "status": "DTD",
    "team_abbr": "PHI",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Davion Mitchell",
    "espn": "4278053",
    "status": "DTD",
    "team_abbr": "MIA",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Royce O'Neale",
    "espn": "2583632",
    "status": null,
    "team_abbr": "CHA",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Devin Vassell",
    "espn": "4395630",
    "status": null,
    "team_abbr": "SA",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Alex Sarr",
    "espn": "5160992",
    "status": null,
    "team_abbr": "WSH",
    "pos": "C, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Mark Williams",
    "espn": "4701232",
    "status": "OUT",
    "team_abbr": "PHX",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Brice Sensabaugh",
    "espn": "5105839",
    "status": "DTD",
    "team_abbr": "UTAH",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Cason Wallace",
    "espn": "4683692",
    "status": "DTD",
    "team_abbr": "OKC",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jrue Holiday",
    "espn": "3995",
    "status": null,
    "team_abbr": "POR",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Bobby Portis",
    "espn": "3064482",
    "status": null,
    "team_abbr": "MIA",
    "pos": "PF, C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Bub Carrington",
    "espn": "4845374",
    "status": null,
    "team_abbr": "WSH",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Tim Hardaway Jr.",
    "espn": "2528210",
    "status": null,
    "team_abbr": "MIA",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jaylon Tyson",
    "espn": "4683747",
    "status": null,
    "team_abbr": "CLE",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Dylan Harper",
    "espn": "5037871",
    "status": null,
    "team_abbr": "SA",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kris Dunn",
    "espn": "2991139",
    "status": null,
    "team_abbr": "LAC",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Duncan Robinson",
    "espn": "3157465",
    "status": null,
    "team_abbr": "DET",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kyle Kuzma",
    "espn": "3134907",
    "status": null,
    "team_abbr": "MIL",
    "pos": "PF, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jarace Walker",
    "espn": "5106060",
    "status": null,
    "team_abbr": "IND",
    "pos": "PF, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Max Christie",
    "espn": "4432582",
    "status": null,
    "team_abbr": "DAL",
    "pos": "SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Cedric Coward",
    "espn": "4903027",
    "status": null,
    "team_abbr": "MEM",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jerami Grant",
    "espn": "2991070",
    "status": null,
    "team_abbr": "MEM",
    "pos": "PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Isaiah Collier",
    "espn": "4683766",
    "status": null,
    "team_abbr": "UTAH",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Oso Ighodaro",
    "espn": "4601023",
    "status": null,
    "team_abbr": "PHX",
    "pos": "PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Brandon Williams",
    "espn": "4397040",
    "status": null,
    "team_abbr": "GS",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jake LaRavia",
    "espn": "4592691",
    "status": null,
    "team_abbr": "LAL",
    "pos": "PF, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Dillon Brooks",
    "espn": "3155526",
    "status": null,
    "team_abbr": "PHX",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "P.J. Washington",
    "espn": "4278078",
    "status": null,
    "team_abbr": "DAL",
    "pos": "PF, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Pelle Larsson",
    "espn": "4601025",
    "status": "DTD",
    "team_abbr": "MIA",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Shaedon Sharpe",
    "espn": "4914336",
    "status": "OUT",
    "team_abbr": "POR",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Draymond Green",
    "espn": "6589",
    "status": null,
    "team_abbr": "GS",
    "pos": "PF, C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ajay Mitchell",
    "espn": "4900671",
    "status": "DTD",
    "team_abbr": "OKC",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ivica Zubac",
    "espn": "4017837",
    "status": null,
    "team_abbr": "IND",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kevin Porter Jr.",
    "espn": "4397140",
    "status": null,
    "team_abbr": "MIL",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jock Landale",
    "espn": "3146557",
    "status": null,
    "team_abbr": "ATL",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jimmy Butler III",
    "espn": "6430",
    "status": "OUT",
    "team_abbr": "GS",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ryan Kalkbrenner",
    "espn": "4576060",
    "status": null,
    "team_abbr": "CHA",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Peyton Watson",
    "espn": "4576087",
    "status": null,
    "team_abbr": "CLE",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Tristan da Silva",
    "espn": "4702382",
    "status": null,
    "team_abbr": "ORL",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Dennis Schroder",
    "espn": "3032979",
    "status": null,
    "team_abbr": "CHA",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jordan Goodwin",
    "espn": "4278402",
    "status": null,
    "team_abbr": "PHX",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Grayson Allen",
    "espn": "3135045",
    "status": "DTD",
    "team_abbr": "CHA",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Justin Champagnie",
    "espn": "4432907",
    "status": null,
    "team_abbr": "WSH",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kevin Huerter",
    "espn": "4066372",
    "status": null,
    "team_abbr": "DET",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Luke Kornet",
    "espn": "3064560",
    "status": null,
    "team_abbr": "SA",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Bruce Brown",
    "espn": "4065670",
    "status": null,
    "team_abbr": "NY",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jamal Shead",
    "espn": "4432241",
    "status": null,
    "team_abbr": "TOR",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Bennedict Mathurin",
    "espn": "4683634",
    "status": null,
    "team_abbr": "NO",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Harrison Barnes",
    "espn": "6578",
    "status": null,
    "team_abbr": "SA",
    "pos": "PF, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Day'Ron Sharpe",
    "espn": "4432194",
    "status": "DTD",
    "team_abbr": "BKN",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Marvin Bagley III",
    "espn": "4277848",
    "status": null,
    "team_abbr": "DEN",
    "pos": "PF, C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Sam Hauser",
    "espn": "4065804",
    "status": null,
    "team_abbr": "BOS",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kyshawn George",
    "espn": "5174563",
    "status": null,
    "team_abbr": "WSH",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Bilal Coulibaly",
    "espn": "5104155",
    "status": null,
    "team_abbr": "WSH",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  }
];
