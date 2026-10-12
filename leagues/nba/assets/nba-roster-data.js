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
        "status": null,
        "team_abbr": "LAL",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Josh Giddey",
        "status": null,
        "team_abbr": "CHI",
        "pos": "PG, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Cooper Flagg",
        "status": null,
        "team_abbr": "DAL",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Pascal Siakam",
        "status": null,
        "team_abbr": "IND",
        "pos": "PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Alperen Sengun",
        "status": "DTD",
        "team_abbr": "HOU",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Kyrie Irving",
        "status": null,
        "team_abbr": "DAL",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Amen Thompson",
        "status": null,
        "team_abbr": "HOU",
        "pos": "SF, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Michael Porter Jr.",
        "status": "DTD",
        "team_abbr": "BKN",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Evan Mobley",
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
        "status": null,
        "team_abbr": "NO",
        "pos": "PF, C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Chet Holmgren",
        "status": "DTD",
        "team_abbr": "OKC",
        "pos": "C, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Rudy Gobert",
        "status": "DTD",
        "team_abbr": "MIN",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "VJ Edgecombe",
        "status": null,
        "team_abbr": "PHI",
        "pos": "SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "CJ McCollum",
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
        "status": "DTD",
        "team_abbr": "DET",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Tyrese Maxey",
        "status": null,
        "team_abbr": "PHI",
        "pos": "PG, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jalen Williams",
        "status": "DTD",
        "team_abbr": "OKC",
        "pos": "PF, SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Giannis Antetokounmpo",
        "status": "DTD",
        "team_abbr": "MIA",
        "pos": "PF, C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Donovan Clingan",
        "status": null,
        "team_abbr": "POR",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Derrick White",
        "status": null,
        "team_abbr": "BOS",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jaren Jackson Jr.",
        "status": null,
        "team_abbr": "UTAH",
        "pos": "C, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jamal Murray",
        "status": null,
        "team_abbr": "DEN",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Myles Turner",
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
        "status": "DTD",
        "team_abbr": "SAC",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Josh Hart",
        "status": null,
        "team_abbr": "NY",
        "pos": "SF, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Donte DiVincenzo",
        "status": "OUT",
        "team_abbr": "MIN",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Herbert Jones",
        "status": null,
        "team_abbr": "NO",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Tari Eason",
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
        "status": "DTD",
        "team_abbr": "IND",
        "pos": "PG, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Anthony Edwards",
        "status": "DTD",
        "team_abbr": "MIN",
        "pos": "SG, SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Scottie Barnes",
        "status": null,
        "team_abbr": "TOR",
        "pos": "SF, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jayson Tatum",
        "status": null,
        "team_abbr": "BOS",
        "pos": "PF, SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Anthony Davis",
        "status": null,
        "team_abbr": "WSH",
        "pos": "C, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Stephon Castle",
        "status": null,
        "team_abbr": "SA",
        "pos": "PG, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Deni Avdija",
        "status": null,
        "team_abbr": "POR",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Naz Reid",
        "status": null,
        "team_abbr": "CHA",
        "pos": "C, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Lauri Markkanen",
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
        "status": null,
        "team_abbr": "CLE",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Caleb Wilson",
        "status": null,
        "team_abbr": "CHI",
        "pos": "SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Cameron Boozer",
        "status": null,
        "team_abbr": "MEM",
        "pos": "PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Damian Lillard",
        "status": null,
        "team_abbr": "POR",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Norman Powell",
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
        "status": "DTD",
        "team_abbr": "OKC",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Austin Reaves",
        "status": null,
        "team_abbr": "LAL",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jaylen Brown",
        "status": "DTD",
        "team_abbr": "PHI",
        "pos": "SF, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "OG Anunoby",
        "status": null,
        "team_abbr": "NY",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Bam Adebayo",
        "status": "DTD",
        "team_abbr": "MIA",
        "pos": "C, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jalen Brunson",
        "status": null,
        "team_abbr": "NY",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Julius Randle",
        "status": null,
        "team_abbr": "BKN",
        "pos": "PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Karl-Anthony Towns",
        "status": null,
        "team_abbr": "NY",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "De'Aaron Fox",
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
        "status": "DTD",
        "team_abbr": "ATL",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Franz Wagner",
        "status": null,
        "team_abbr": "ORL",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Onyeka Okongwu",
        "status": null,
        "team_abbr": "ATL",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Dejounte Murray",
        "status": "DTD",
        "team_abbr": "NO",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "John Collins",
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
        "status": "DTD",
        "team_abbr": "MIN",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Devin Booker",
        "status": "DTD",
        "team_abbr": "PHX",
        "pos": "PG, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "LeBron James",
        "status": "DTD",
        "team_abbr": "PHI",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jalen Johnson",
        "status": null,
        "team_abbr": "ATL",
        "pos": "PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Victor Wembanyama",
        "status": null,
        "team_abbr": "SA",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Stephen Curry",
        "status": null,
        "team_abbr": "GS",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Paolo Banchero",
        "status": null,
        "team_abbr": "ORL",
        "pos": "PF, SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Jalen Duren",
        "status": "DTD",
        "team_abbr": "DET",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Kon Knueppel",
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
        "status": null,
        "team_abbr": "WSH",
        "pos": "SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Tyler Herro",
        "status": null,
        "team_abbr": "MIL",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Darryn Peterson",
        "status": null,
        "team_abbr": "UTAH",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Ty Jerome",
        "status": null,
        "team_abbr": "MEM",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Aaron Gordon",
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
        "status": null,
        "team_abbr": "WSH",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Donovan Mitchell",
        "status": null,
        "team_abbr": "CLE",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Kevin Durant",
        "status": "DTD",
        "team_abbr": "HOU",
        "pos": "PF, SF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Domantas Sabonis",
        "status": "DTD",
        "team_abbr": "SAC",
        "pos": "C, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Nikola Jokic",
        "status": null,
        "team_abbr": "DEN",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "James Harden",
        "status": null,
        "team_abbr": "CLE",
        "pos": "PG, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Kawhi Leonard",
        "status": "DTD",
        "team_abbr": "TOR",
        "pos": "SF, PF",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Darius Garland",
        "status": null,
        "team_abbr": "LAC",
        "pos": "PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Desmond Bane",
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
        "status": null,
        "team_abbr": "NY",
        "pos": "SF, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Dyson Daniels",
        "status": null,
        "team_abbr": "ATL",
        "pos": "SG, PG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Brandon Miller",
        "status": null,
        "team_abbr": "CHA",
        "pos": "SF, SG",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Walker Kessler",
        "status": "DTD",
        "team_abbr": "LAL",
        "pos": "C",
        "fpts": null,
        "avg": null,
        "last": null
      },
      {
        "name": "Tobias Harris",
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
    "status": "OUT",
    "team_abbr": "LAC",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Trey Murphy III",
    "status": null,
    "team_abbr": "NO",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ryan Rollins",
    "status": null,
    "team_abbr": "MIL",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Payton Pritchard",
    "status": null,
    "team_abbr": "BOS",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "DeMar DeRozan",
    "status": null,
    "team_abbr": "DEN",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Miles Bridges",
    "status": "DTD",
    "team_abbr": "PHX",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Immanuel Quickley",
    "status": null,
    "team_abbr": "TOR",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Matas Buzelis",
    "status": null,
    "team_abbr": "CHI",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jabari Smith Jr.",
    "status": null,
    "team_abbr": "HOU",
    "pos": "PF, C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Brandin Podziemski",
    "status": null,
    "team_abbr": "GS",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Reed Sheppard",
    "status": null,
    "team_abbr": "HOU",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jaime Jaquez Jr.",
    "status": null,
    "team_abbr": "MIL",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Saddiq Bey",
    "status": null,
    "team_abbr": "NO",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Derik Queen",
    "status": null,
    "team_abbr": "NO",
    "pos": "C, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Collin Gillespie",
    "status": null,
    "team_abbr": "PHX",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Neemias Queta",
    "status": null,
    "team_abbr": "BOS",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kel'el Ware",
    "status": null,
    "team_abbr": "MIL",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jaden McDaniels",
    "status": "DTD",
    "team_abbr": "MIN",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Keyonte George",
    "status": null,
    "team_abbr": "UTAH",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Andrew Wiggins",
    "status": "DTD",
    "team_abbr": "MIA",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Toumani Camara",
    "status": null,
    "team_abbr": "POR",
    "pos": "PF, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Nikola Vucevic",
    "status": null,
    "team_abbr": "ORL",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Naji Marshall",
    "status": null,
    "team_abbr": "DAL",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ausar Thompson",
    "status": null,
    "team_abbr": "DET",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Nic Claxton",
    "status": "DTD",
    "team_abbr": "CHI",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jeremiah Fears",
    "status": null,
    "team_abbr": "NO",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Deandre Ayton",
    "status": null,
    "team_abbr": "WSH",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Tre Jones",
    "status": "DTD",
    "team_abbr": "CHI",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Russell Westbrook",
    "status": null,
    "team_abbr": "FA",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Wendell Carter Jr.",
    "status": null,
    "team_abbr": "ORL",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ayo Dosunmu",
    "status": "DTD",
    "team_abbr": "MIN",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kyle Filipowski",
    "status": "DTD",
    "team_abbr": "UTAH",
    "pos": "C, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Keldon Johnson",
    "status": null,
    "team_abbr": "SA",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Sandro Mamukelashvili",
    "status": null,
    "team_abbr": "LAL",
    "pos": "C, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Maxime Raynaud",
    "status": "OUT",
    "team_abbr": "SAC",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jay Huff",
    "status": null,
    "team_abbr": "IND",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Julian Champagnie",
    "status": null,
    "team_abbr": "SA",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Andrew Nembhard",
    "status": null,
    "team_abbr": "IND",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Moussa Diabate",
    "status": null,
    "team_abbr": "CHA",
    "pos": "PF, C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "RJ Barrett",
    "status": null,
    "team_abbr": "TOR",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Cam Spencer",
    "status": null,
    "team_abbr": "MEM",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Anthony Black",
    "status": "DTD",
    "team_abbr": "ORL",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Quentin Grimes",
    "status": null,
    "team_abbr": "LAL",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jalen Suggs",
    "status": "DTD",
    "team_abbr": "ORL",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Collin Sexton",
    "status": "DTD",
    "team_abbr": "LAL",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Precious Achiuwa",
    "status": null,
    "team_abbr": "SAC",
    "pos": "PF, C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ace Bailey",
    "status": null,
    "team_abbr": "UTAH",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Joel Embiid",
    "status": "DTD",
    "team_abbr": "PHI",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Davion Mitchell",
    "status": "DTD",
    "team_abbr": "MIA",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Royce O'Neale",
    "status": null,
    "team_abbr": "CHA",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Devin Vassell",
    "status": null,
    "team_abbr": "SA",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Alex Sarr",
    "status": null,
    "team_abbr": "WSH",
    "pos": "C, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Mark Williams",
    "status": "OUT",
    "team_abbr": "PHX",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Brice Sensabaugh",
    "status": "DTD",
    "team_abbr": "UTAH",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Cason Wallace",
    "status": "DTD",
    "team_abbr": "OKC",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jrue Holiday",
    "status": null,
    "team_abbr": "POR",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Bobby Portis",
    "status": null,
    "team_abbr": "MIA",
    "pos": "PF, C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Bub Carrington",
    "status": null,
    "team_abbr": "WSH",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Tim Hardaway Jr.",
    "status": null,
    "team_abbr": "MIA",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jaylon Tyson",
    "status": null,
    "team_abbr": "CLE",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Dylan Harper",
    "status": null,
    "team_abbr": "SA",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kris Dunn",
    "status": null,
    "team_abbr": "LAC",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Duncan Robinson",
    "status": null,
    "team_abbr": "DET",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kyle Kuzma",
    "status": null,
    "team_abbr": "MIL",
    "pos": "PF, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jarace Walker",
    "status": null,
    "team_abbr": "IND",
    "pos": "PF, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Max Christie",
    "status": null,
    "team_abbr": "DAL",
    "pos": "SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Cedric Coward",
    "status": null,
    "team_abbr": "MEM",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jerami Grant",
    "status": null,
    "team_abbr": "MEM",
    "pos": "PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Isaiah Collier",
    "status": null,
    "team_abbr": "UTAH",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Oso Ighodaro",
    "status": null,
    "team_abbr": "PHX",
    "pos": "PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Brandon Williams",
    "status": null,
    "team_abbr": "GS",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jake LaRavia",
    "status": null,
    "team_abbr": "LAL",
    "pos": "PF, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Dillon Brooks",
    "status": null,
    "team_abbr": "PHX",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "P.J. Washington",
    "status": null,
    "team_abbr": "DAL",
    "pos": "PF, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Pelle Larsson",
    "status": "DTD",
    "team_abbr": "MIA",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Shaedon Sharpe",
    "status": "OUT",
    "team_abbr": "POR",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Draymond Green",
    "status": null,
    "team_abbr": "GS",
    "pos": "PF, C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ajay Mitchell",
    "status": "DTD",
    "team_abbr": "OKC",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ivica Zubac",
    "status": null,
    "team_abbr": "IND",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kevin Porter Jr.",
    "status": null,
    "team_abbr": "MIL",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jock Landale",
    "status": null,
    "team_abbr": "ATL",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jimmy Butler III",
    "status": "OUT",
    "team_abbr": "GS",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Ryan Kalkbrenner",
    "status": null,
    "team_abbr": "CHA",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Peyton Watson",
    "status": null,
    "team_abbr": "CLE",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Tristan da Silva",
    "status": null,
    "team_abbr": "ORL",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Dennis Schroder",
    "status": null,
    "team_abbr": "CHA",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jordan Goodwin",
    "status": null,
    "team_abbr": "PHX",
    "pos": "PG, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Grayson Allen",
    "status": "DTD",
    "team_abbr": "CHA",
    "pos": "SG, PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Justin Champagnie",
    "status": null,
    "team_abbr": "WSH",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kevin Huerter",
    "status": null,
    "team_abbr": "DET",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Luke Kornet",
    "status": null,
    "team_abbr": "SA",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Bruce Brown",
    "status": null,
    "team_abbr": "NY",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Jamal Shead",
    "status": null,
    "team_abbr": "TOR",
    "pos": "PG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Bennedict Mathurin",
    "status": null,
    "team_abbr": "NO",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Harrison Barnes",
    "status": null,
    "team_abbr": "SA",
    "pos": "PF, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Day'Ron Sharpe",
    "status": "DTD",
    "team_abbr": "BKN",
    "pos": "C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Marvin Bagley III",
    "status": null,
    "team_abbr": "DEN",
    "pos": "PF, C",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Sam Hauser",
    "status": null,
    "team_abbr": "BOS",
    "pos": "SF, PF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Kyshawn George",
    "status": null,
    "team_abbr": "WSH",
    "pos": "SG, SF",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Bilal Coulibaly",
    "status": null,
    "team_abbr": "WSH",
    "pos": "SF, SG",
    "fpts": null,
    "avg": null,
    "last": null
  }
];
