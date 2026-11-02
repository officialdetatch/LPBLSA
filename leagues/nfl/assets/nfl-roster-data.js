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
        "fpts": 206.97,
        "avg": 24.23,
        "last": 39.48
      },
      {
        "name": "Jahmyr Gibbs",
        "espn": "4429795",
        "status": null,
        "team_abbr": "DET",
        "pos": "RB",
        "fpts": 219.92,
        "avg": 25.54,
        "last": 23.8
      },
      {
        "name": "James Cook III",
        "espn": "4379399",
        "status": null,
        "team_abbr": "BUF",
        "pos": "RB",
        "fpts": 181.24,
        "avg": 17.96,
        "last": 17.1
      },
      {
        "name": "CeeDee Lamb",
        "espn": "4241389",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 153.77,
        "avg": 17.29,
        "last": 9.3
      },
      {
        "name": "Justin Jefferson",
        "espn": "4262921",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 137.37,
        "avg": 12.07,
        "last": 11.8
      },
      {
        "name": "Parker Washington",
        "espn": "4432620",
        "status": null,
        "team_abbr": "JAX",
        "pos": "WR",
        "fpts": 114.14,
        "avg": 11.71,
        "last": 3.1
      },
      {
        "name": "Trey McBride",
        "espn": "4361307",
        "status": null,
        "team_abbr": "ARI",
        "pos": "TE",
        "fpts": 108.99,
        "avg": 14.68,
        "last": 16.7
      },
      {
        "name": "Puka Nacua",
        "espn": "4426515",
        "status": null,
        "team_abbr": "LAR",
        "pos": "WR",
        "fpts": 176.28,
        "avg": 18.43,
        "last": 19.5
      },
      {
        "name": "D'Andre Swift",
        "espn": "4259545",
        "status": null,
        "team_abbr": "CHI",
        "pos": "RB",
        "fpts": 128.92,
        "avg": 15.97,
        "last": 17
      },
      {
        "name": "Jordan Love",
        "espn": "4036378",
        "status": null,
        "team_abbr": "GB",
        "pos": "QB",
        "fpts": 164.88,
        "avg": 18.61,
        "last": 21.52
      },
      {
        "name": "Rams",
        "status": null,
        "team_abbr": "LAR",
        "pos": "D/ST",
        "fpts": 59.47,
        "avg": 4.63,
        "last": 11
      },
      {
        "name": "Brandon Aubrey",
        "espn": "3953687",
        "status": null,
        "team_abbr": "DAL",
        "pos": "K",
        "fpts": 93.2,
        "avg": 8.88,
        "last": 12
      }
    ],
    "bench": [
      {
        "name": "Trevor Lawrence",
        "espn": "4360310",
        "status": null,
        "team_abbr": "JAX",
        "pos": "QB",
        "fpts": 203.12,
        "avg": 19.09,
        "last": 19.4
      },
      {
        "name": "Aaron Jones Sr.",
        "espn": "3042519",
        "status": null,
        "team_abbr": "MIN",
        "pos": "RB",
        "fpts": 73.23,
        "avg": 10.33,
        "last": 5
      },
      {
        "name": "Blake Corum",
        "espn": "4429096",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 80.41,
        "avg": 9.73,
        "last": 13.3
      },
      {
        "name": "Jordan Addison",
        "espn": "4429205",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 81.38,
        "avg": 6.85,
        "last": 10.1
      },
      {
        "name": "Michael Wilson",
        "espn": "4360761",
        "status": "Q",
        "team_abbr": "ARI",
        "pos": "WR",
        "fpts": 105.71,
        "avg": 10.77,
        "last": 22.8
      },
      {
        "name": "Germie Bernard",
        "espn": "4685261",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 86.42,
        "avg": 6.35,
        "last": 5.5
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
        "fpts": 179.77,
        "avg": 20.29,
        "last": 9.04
      },
      {
        "name": "Derrick Henry",
        "espn": "3043078",
        "status": null,
        "team_abbr": "BAL",
        "pos": "RB",
        "fpts": 130.05,
        "avg": 16.34,
        "last": 13
      },
      {
        "name": "Bucky Irving",
        "espn": "4596448",
        "status": null,
        "team_abbr": "TB",
        "pos": "RB",
        "fpts": 145.09,
        "avg": 15.2,
        "last": 21
      },
      {
        "name": "Ja'Marr Chase",
        "espn": "4362628",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 180.05,
        "avg": 15.24,
        "last": 25.6
      },
      {
        "name": "Denzel Boston",
        "espn": "4832800",
        "status": null,
        "team_abbr": "CLE",
        "pos": "WR",
        "fpts": 95.72,
        "avg": 9.24,
        "last": 6.7
      },
      {
        "name": "DK Metcalf",
        "espn": "4047650",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 102.95,
        "avg": 7.68,
        "last": 0.9
      },
      {
        "name": "Harold Fannin Jr.",
        "espn": "5083076",
        "status": null,
        "team_abbr": "CLE",
        "pos": "TE",
        "fpts": 72.5,
        "avg": 9.07,
        "last": 18.4
      },
      {
        "name": "Kenneth Walker III",
        "espn": "4567048",
        "status": null,
        "team_abbr": "KC",
        "pos": "RB",
        "fpts": 211.45,
        "avg": 21.3,
        "last": 10.4
      },
      {
        "name": "Tony Pollard",
        "espn": "3916148",
        "status": null,
        "team_abbr": "TEN",
        "pos": "RB",
        "fpts": 138.21,
        "avg": 13.69,
        "last": 27.2
      },
      {
        "name": "Patrick Mahomes",
        "espn": "3139477",
        "status": null,
        "team_abbr": "KC",
        "pos": "QB",
        "fpts": 170.5,
        "avg": 17.93,
        "last": 25.44
      },
      {
        "name": "Seahawks",
        "status": null,
        "team_abbr": "SEA",
        "pos": "D/ST",
        "fpts": 70.65,
        "avg": 9.43,
        "last": 9
      },
      {
        "name": "Jason Myers",
        "espn": "2473037",
        "status": null,
        "team_abbr": "SEA",
        "pos": "K",
        "fpts": 85.49,
        "avg": 9.57,
        "last": 8
      }
    ],
    "bench": [
      {
        "name": "Rashee Rice",
        "espn": "4428331",
        "status": null,
        "team_abbr": "KC",
        "pos": "WR",
        "fpts": 108.55,
        "avg": 9.26,
        "last": 14.8
      },
      {
        "name": "George Kittle",
        "espn": "3040151",
        "status": "BYE",
        "team_abbr": "SF",
        "pos": "TE",
        "fpts": 122.02,
        "avg": 12.5,
        "last": 10.8
      },
      {
        "name": "Ravens",
        "status": null,
        "team_abbr": "BAL",
        "pos": "D/ST",
        "fpts": 52.54,
        "avg": 4,
        "last": -1
      },
      {
        "name": "Breece Hall",
        "espn": "4427366",
        "status": "OUT",
        "team_abbr": "NYJ",
        "pos": "RB",
        "fpts": 99.66,
        "avg": 12.5,
        "last": 0
      },
      {
        "name": "Dak Prescott",
        "espn": "2577417",
        "status": null,
        "team_abbr": "DAL",
        "pos": "QB",
        "fpts": 158.04,
        "avg": 18.49,
        "last": 19.8
      },
      {
        "name": "Mike Evans",
        "espn": "16737",
        "status": "Q",
        "team_abbr": "SF",
        "pos": "WR",
        "fpts": 121.67,
        "avg": 12.58,
        "last": 0
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
        "fpts": 150.39,
        "avg": 14.39,
        "last": 19.28
      },
      {
        "name": "Bhayshul Tuten",
        "espn": "4882093",
        "status": null,
        "team_abbr": "JAX",
        "pos": "RB",
        "fpts": 137.92,
        "avg": 15.83,
        "last": 28.9
      },
      {
        "name": "Rhamondre Stevenson",
        "espn": "4569173",
        "status": null,
        "team_abbr": "NE",
        "pos": "RB",
        "fpts": 97.47,
        "avg": 10.93,
        "last": 10.5
      },
      {
        "name": "Jaxon Smith-Njigba",
        "espn": "4430878",
        "status": null,
        "team_abbr": "SEA",
        "pos": "WR",
        "fpts": 158.11,
        "avg": 23.88,
        "last": 26.8
      },
      {
        "name": "Drake London",
        "espn": "4426502",
        "status": null,
        "team_abbr": "ATL",
        "pos": "WR",
        "fpts": 129.58,
        "avg": 11.29,
        "last": 1.3
      },
      {
        "name": "Tee Higgins",
        "espn": "4239993",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 128.41,
        "avg": 16.87,
        "last": 32.5
      },
      {
        "name": "T.J. Hockenson",
        "espn": "4036133",
        "status": null,
        "team_abbr": "MIN",
        "pos": "TE",
        "fpts": 76.04,
        "avg": 9,
        "last": 13.8
      },
      {
        "name": "Chase Brown",
        "espn": "4362238",
        "status": null,
        "team_abbr": "CIN",
        "pos": "RB",
        "fpts": 141.98,
        "avg": 10.41,
        "last": 12.1
      },
      {
        "name": "Jaylen Warren",
        "espn": "4569987",
        "status": null,
        "team_abbr": "PIT",
        "pos": "RB",
        "fpts": 119.96,
        "avg": 16.04,
        "last": 20.8
      },
      {
        "name": "Chuba Hubbard",
        "espn": "4241416",
        "status": null,
        "team_abbr": "CAR",
        "pos": "RB",
        "fpts": 163.22,
        "avg": 17.43,
        "last": 21.4
      },
      {
        "name": "Vikings",
        "status": null,
        "team_abbr": "MIN",
        "pos": "D/ST",
        "fpts": 60.64,
        "avg": 11.29,
        "last": 5
      },
      {
        "name": "Chris Boswell",
        "espn": "17372",
        "status": null,
        "team_abbr": "PIT",
        "pos": "K",
        "fpts": 94.35,
        "avg": 9.63,
        "last": 8
      }
    ],
    "bench": [
      {
        "name": "Lamar Jackson",
        "espn": "3916387",
        "status": "OUT",
        "team_abbr": "BAL",
        "pos": "QB",
        "fpts": 179.81,
        "avg": 15.82,
        "last": 0
      },
      {
        "name": "49ers",
        "status": "BYE",
        "team_abbr": "SF",
        "pos": "D/ST",
        "fpts": 62.34,
        "avg": 7,
        "last": 1
      },
      {
        "name": "DeVonta Smith",
        "espn": "4241478",
        "status": "OUT",
        "team_abbr": "PHI",
        "pos": "WR",
        "fpts": 104.57,
        "avg": 14,
        "last": 0
      },
      {
        "name": "Tucker Kraft",
        "espn": "4572680",
        "status": null,
        "team_abbr": "GB",
        "pos": "TE",
        "fpts": 77.36,
        "avg": 8.88,
        "last": 14.3
      },
      {
        "name": "Malik Nabers",
        "espn": "4595348",
        "status": "BYE",
        "team_abbr": "NYG",
        "pos": "WR",
        "fpts": 144.43,
        "avg": 13.79,
        "last": 14.6
      },
      {
        "name": "C.J. Stroud",
        "espn": "4432577",
        "status": "BYE",
        "team_abbr": "HOU",
        "pos": "QB",
        "fpts": 172.01,
        "avg": 18.38,
        "last": 16.52
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
        "fpts": 196.18,
        "avg": 20.12,
        "last": 22.46
      },
      {
        "name": "Bijan Robinson",
        "espn": "4430807",
        "status": null,
        "team_abbr": "ATL",
        "pos": "RB",
        "fpts": 146.67,
        "avg": 17.6,
        "last": 7.6
      },
      {
        "name": "Ashton Jeanty",
        "espn": "4890973",
        "status": null,
        "team_abbr": "LV",
        "pos": "RB",
        "fpts": 113.58,
        "avg": 14.23,
        "last": 8.8
      },
      {
        "name": "Matthew Golden",
        "espn": "4701936",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 132.52,
        "avg": 13.75,
        "last": 17.4
      },
      {
        "name": "Luther Burden III",
        "espn": "4685278",
        "status": null,
        "team_abbr": "CHI",
        "pos": "WR",
        "fpts": 107.67,
        "avg": 11.36,
        "last": 21.7
      },
      {
        "name": "DeMario Douglas",
        "espn": "4427095",
        "status": null,
        "team_abbr": "NE",
        "pos": "WR",
        "fpts": 69.65,
        "avg": 8.53,
        "last": 15.1
      },
      {
        "name": "Travis Kelce",
        "espn": "15847",
        "status": null,
        "team_abbr": "KC",
        "pos": "TE",
        "fpts": 83.92,
        "avg": 9.64,
        "last": 9.2
      },
      {
        "name": "Kyren Williams",
        "espn": "4430737",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 132.76,
        "avg": 16.69,
        "last": 12.4
      },
      {
        "name": "Christian Watson",
        "espn": "4248528",
        "status": "Q",
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 120.62,
        "avg": 15.73,
        "last": 13.3
      },
      {
        "name": "Matthew Stafford",
        "espn": "12483",
        "status": null,
        "team_abbr": "LAR",
        "pos": "QB",
        "fpts": 147.3,
        "avg": 16.45,
        "last": 8.28
      },
      {
        "name": "Bengals",
        "status": null,
        "team_abbr": "CIN",
        "pos": "D/ST",
        "fpts": 55.3,
        "avg": 7.14,
        "last": 2
      },
      {
        "name": "Cam Little",
        "espn": "4686361",
        "status": null,
        "team_abbr": "JAX",
        "pos": "K",
        "fpts": 75.67,
        "avg": 8.86,
        "last": 6
      }
    ],
    "bench": [
      {
        "name": "Brock Purdy",
        "espn": "4361741",
        "status": "BYE",
        "team_abbr": "SF",
        "pos": "QB",
        "fpts": 189.85,
        "avg": 20.86,
        "last": 12.02
      },
      {
        "name": "Sam LaPorta",
        "espn": "4430027",
        "status": null,
        "team_abbr": "DET",
        "pos": "TE",
        "fpts": 95.32,
        "avg": 10.06,
        "last": 5
      },
      {
        "name": "Omar Cooper Jr.",
        "espn": "4723820",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 72.63,
        "avg": 10.7,
        "last": 0
      },
      {
        "name": "Tre Tucker",
        "espn": "4428718",
        "status": null,
        "team_abbr": "LV",
        "pos": "WR",
        "fpts": 69.19,
        "avg": 10.66,
        "last": 0
      },
      {
        "name": "Zay Flowers",
        "espn": "4429615",
        "status": null,
        "team_abbr": "BAL",
        "pos": "WR",
        "fpts": 100.84,
        "avg": 14.6,
        "last": 0
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
        "name": "Josh Allen",
        "espn": "3918298",
        "status": null,
        "team_abbr": "BUF",
        "pos": "QB",
        "fpts": 227.66,
        "avg": 26.76,
        "last": 26.56
      },
      {
        "name": "Jonathan Taylor",
        "espn": "4242335",
        "status": null,
        "team_abbr": "IND",
        "pos": "RB",
        "fpts": 148.2,
        "avg": 16.71,
        "last": 4.7
      },
      {
        "name": "Javonte Williams",
        "espn": "4361579",
        "status": null,
        "team_abbr": "DAL",
        "pos": "RB",
        "fpts": 132.58,
        "avg": 15.9,
        "last": 6.2
      },
      {
        "name": "Amon-Ra St. Brown",
        "espn": "4374302",
        "status": null,
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 160.55,
        "avg": 16.36,
        "last": 9.1
      },
      {
        "name": "Tetairoa McMillan",
        "espn": "4685472",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 128.62,
        "avg": 12.56,
        "last": 8.8
      },
      {
        "name": "Garrett Wilson",
        "espn": "4569618",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 93.45,
        "avg": 11.53,
        "last": 11.3
      },
      {
        "name": "Brock Bowers",
        "espn": "4432665",
        "status": null,
        "team_abbr": "LV",
        "pos": "TE",
        "fpts": 124.27,
        "avg": 17.2,
        "last": 24.7
      },
      {
        "name": "George Pickens",
        "espn": "4426354",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 93.53,
        "avg": 10.6,
        "last": 5.8
      },
      {
        "name": "Saquon Barkley",
        "espn": "3929630",
        "status": null,
        "team_abbr": "PHI",
        "pos": "RB",
        "fpts": 123.7,
        "avg": 7.83,
        "last": 11.9
      },
      {
        "name": "Jayden Daniels",
        "espn": "4426348",
        "status": null,
        "team_abbr": "WSH",
        "pos": "QB",
        "fpts": 214.84,
        "avg": 20.13,
        "last": 14.98
      },
      {
        "name": "Steelers",
        "status": null,
        "team_abbr": "PIT",
        "pos": "D/ST",
        "fpts": 68.41,
        "avg": 9.13,
        "last": 16
      },
      {
        "name": "Matt Gay",
        "espn": "4249087",
        "status": null,
        "team_abbr": "LV",
        "pos": "K",
        "fpts": 88.5,
        "avg": 10.13,
        "last": 10
      }
    ],
    "bench": [
      {
        "name": "Christian McCaffrey",
        "espn": "3117251",
        "status": "Q",
        "team_abbr": "SF",
        "pos": "RB",
        "fpts": 175.39,
        "avg": 18.14,
        "last": 19
      },
      {
        "name": "Nico Collins",
        "espn": "4258173",
        "status": "BYE",
        "team_abbr": "HOU",
        "pos": "WR",
        "fpts": 117.15,
        "avg": 12.82,
        "last": 1.6
      },
      {
        "name": "Chris Olave",
        "espn": "4361370",
        "status": "BYE",
        "team_abbr": "NO",
        "pos": "WR",
        "fpts": 117,
        "avg": 14.3,
        "last": 8.6
      },
      {
        "name": "Kyle Pitts Sr.",
        "espn": "4360248",
        "status": null,
        "team_abbr": "ATL",
        "pos": "TE",
        "fpts": 74.71,
        "avg": 6.84,
        "last": 1.6
      },
      {
        "name": "Cameron Dicker",
        "espn": "4362081",
        "status": null,
        "team_abbr": "LAC",
        "pos": "K",
        "fpts": 86.73,
        "avg": 6.71,
        "last": 11
      },
      {
        "name": "Bryce Young",
        "espn": "4685720",
        "status": null,
        "team_abbr": "CAR",
        "pos": "QB",
        "fpts": 169.53,
        "avg": 18.03,
        "last": 10.36
      }
    ],
    "ir": [
      {
        "name": "Jeremiyah Love",
        "espn": "4870808",
        "status": "Q",
        "team_abbr": "ARI",
        "pos": "RB",
        "fpts": 97.2,
        "avg": 7.98,
        "last": 2.3
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
    "fpts": 83.67,
    "avg": 9.78,
    "last": 3.8
  },
  {
    "name": "Colston Loveland",
    "espn": "4723086",
    "status": null,
    "team_abbr": "CHI",
    "pos": "TE",
    "fpts": 94.1,
    "avg": 7.06,
    "last": 16.4
  },
  {
    "name": "A.J. Brown",
    "espn": "4047646",
    "status": "OUT",
    "team_abbr": "NE",
    "pos": "WR",
    "fpts": 109.48,
    "avg": 4.87,
    "last": 0
  },
  {
    "name": "Isaiah Likely",
    "espn": "4361050",
    "status": "BYE",
    "team_abbr": "NYG",
    "pos": "TE",
    "fpts": 105.49,
    "avg": 13.14,
    "last": 2.2
  },
  {
    "name": "Emeka Egbuka",
    "espn": "4567750",
    "status": "OUT",
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 90.83,
    "avg": 9.52,
    "last": 0
  },
  {
    "name": "Quinshon Judkins",
    "espn": "4685702",
    "status": null,
    "team_abbr": "CLE",
    "pos": "RB",
    "fpts": 108.81,
    "avg": 10.87,
    "last": 5.9
  },
  {
    "name": "Will Reichard",
    "espn": "4567104",
    "status": null,
    "team_abbr": "MIN",
    "pos": "K",
    "fpts": 112.05,
    "avg": 11.43,
    "last": 0
  },
  {
    "name": "Josh Jacobs",
    "espn": "4047365",
    "status": null,
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 136.13,
    "avg": 18.9,
    "last": 20.2
  },
  {
    "name": "Jameson Williams",
    "espn": "4426388",
    "status": null,
    "team_abbr": "DET",
    "pos": "WR",
    "fpts": 113.35,
    "avg": 12.46,
    "last": 15
  },
  {
    "name": "Cam Skattebo",
    "espn": "4696981",
    "status": "Q",
    "team_abbr": "NYG",
    "pos": "RB",
    "fpts": 122.23,
    "avg": 9.27,
    "last": 18.6
  },
  {
    "name": "DJ Moore",
    "espn": "3915416",
    "status": "Q",
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 111.71,
    "avg": 8.98,
    "last": 14.6
  },
  {
    "name": "Jalen Coker",
    "espn": "4695883",
    "status": null,
    "team_abbr": "CAR",
    "pos": "WR",
    "fpts": 102.89,
    "avg": 10.98,
    "last": 8.6
  },
  {
    "name": "Caleb Williams",
    "espn": "4431611",
    "status": null,
    "team_abbr": "CHI",
    "pos": "QB",
    "fpts": 167.64,
    "avg": 20.9,
    "last": 22.12
  },
  {
    "name": "Omarion Hampton",
    "espn": "4685382",
    "status": null,
    "team_abbr": "LAC",
    "pos": "RB",
    "fpts": 78.78,
    "avg": 8.1,
    "last": 3.7
  },
  {
    "name": "Spencer Shrader",
    "espn": "4571557",
    "status": null,
    "team_abbr": "IND",
    "pos": "K",
    "fpts": 103.19,
    "avg": 11,
    "last": 1
  },
  {
    "name": "Stefon Diggs",
    "espn": "2976212",
    "status": null,
    "team_abbr": "WSH",
    "pos": "WR",
    "fpts": 101,
    "avg": 11.45,
    "last": 11.3
  },
  {
    "name": "Ollie Gordon II",
    "espn": "4711533",
    "status": null,
    "team_abbr": "MIA",
    "pos": "RB",
    "fpts": 146.55,
    "avg": 9.89,
    "last": 6.9
  },
  {
    "name": "Jaylen Waddle",
    "espn": "4372016",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 83.56,
    "avg": 8.04,
    "last": 13.4
  },
  {
    "name": "Carnell Tate",
    "espn": "4871023",
    "status": "OUT",
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 89.87,
    "avg": 8.61,
    "last": 0
  },
  {
    "name": "Dallas Goedert",
    "espn": "3121023",
    "status": null,
    "team_abbr": "PHI",
    "pos": "TE",
    "fpts": 66.44,
    "avg": 8.5,
    "last": 5.2
  },
  {
    "name": "Ladd McConkey",
    "espn": "4612826",
    "status": null,
    "team_abbr": "LAC",
    "pos": "WR",
    "fpts": 84.75,
    "avg": 7.18,
    "last": 10.6
  },
  {
    "name": "Broncos",
    "status": null,
    "team_abbr": "DEN",
    "pos": "D/ST",
    "fpts": 65.7,
    "avg": 6.25,
    "last": 1
  },
  {
    "name": "Rome Odunze",
    "espn": "4431299",
    "status": null,
    "team_abbr": "CHI",
    "pos": "WR",
    "fpts": 76.05,
    "avg": 6.87,
    "last": 8.9
  },
  {
    "name": "Braelon Allen",
    "espn": "4685247",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "RB",
    "fpts": 83.27,
    "avg": 11.39,
    "last": 22.3
  },
  {
    "name": "Jaguars",
    "status": null,
    "team_abbr": "JAX",
    "pos": "D/ST",
    "fpts": 59.95,
    "avg": 7.86,
    "last": 21
  },
  {
    "name": "Travis Etienne Jr.",
    "espn": "4239996",
    "status": "IR",
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 116.57,
    "avg": 8.47,
    "last": 0
  },
  {
    "name": "David Montgomery",
    "espn": "4035538",
    "status": "Q",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 107.98,
    "avg": 8.4,
    "last": 0
  },
  {
    "name": "J.K. Dobbins",
    "espn": "4241985",
    "status": null,
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 70.64,
    "avg": 6.91,
    "last": 1.3
  },
  {
    "name": "Rachaad White",
    "espn": "4697815",
    "status": null,
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 103.53,
    "avg": 9.13,
    "last": 13
  },
  {
    "name": "Dalton Kincaid",
    "espn": "4385690",
    "status": null,
    "team_abbr": "BUF",
    "pos": "TE",
    "fpts": 74.34,
    "avg": 9.37,
    "last": 16.6
  },
  {
    "name": "Kyle Monangai",
    "espn": "4608686",
    "status": "OUT",
    "team_abbr": "CHI",
    "pos": "RB",
    "fpts": 88.03,
    "avg": 14.2,
    "last": 0
  },
  {
    "name": "Hunter Henry",
    "espn": "3046439",
    "status": "Q",
    "team_abbr": "NE",
    "pos": "TE",
    "fpts": 72.17,
    "avg": 7.39,
    "last": 4.5
  },
  {
    "name": "Patriots",
    "status": null,
    "team_abbr": "NE",
    "pos": "D/ST",
    "fpts": 49.37,
    "avg": 6.38,
    "last": 9
  },
  {
    "name": "Zach Charbonnet",
    "espn": "4426385",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 113.52,
    "avg": null,
    "last": 0
  },
  {
    "name": "Xavier Worthy",
    "espn": "4683062",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 70.39,
    "avg": 6.07,
    "last": 2.8
  },
  {
    "name": "Ka'imi Fairbairn",
    "espn": "2971573",
    "status": "BYE",
    "team_abbr": "HOU",
    "pos": "K",
    "fpts": 95.92,
    "avg": 10.71,
    "last": 11
  },
  {
    "name": "Deebo Samuel Sr.",
    "espn": "3126486",
    "status": "Q",
    "team_abbr": "SF",
    "pos": "WR",
    "fpts": 94.52,
    "avg": 10.48,
    "last": 0
  },
  {
    "name": "Woody Marks",
    "espn": "4429059",
    "status": "BYE",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 72.41,
    "avg": 7.93,
    "last": 8.6
  },
  {
    "name": "Jakobi Meyers",
    "espn": "3916433",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 92.89,
    "avg": 7.73,
    "last": 3.4
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
    "name": "TreVeyon Henderson",
    "espn": "4432710",
    "status": "OUT",
    "team_abbr": "NE",
    "pos": "RB",
    "fpts": 49.78,
    "avg": 5.22,
    "last": 0
  },
  {
    "name": "Jordan Mason",
    "espn": "4360569",
    "status": null,
    "team_abbr": "MIN",
    "pos": "RB",
    "fpts": 76.89,
    "avg": 6.9,
    "last": 2
  },
  {
    "name": "Marvin Harrison Jr.",
    "espn": "4432708",
    "status": "BYE",
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 60.12,
    "avg": 4.83,
    "last": 7.1
  },
  {
    "name": "Mark Andrews",
    "espn": "3116365",
    "status": null,
    "team_abbr": "BAL",
    "pos": "TE",
    "fpts": 46.96,
    "avg": 5.04,
    "last": 2.9
  },
  {
    "name": "Tyler Shough",
    "espn": "4360689",
    "status": "BYE",
    "team_abbr": "NO",
    "pos": "QB",
    "fpts": 158.67,
    "avg": 17.99,
    "last": 13.82
  },
  {
    "name": "Jadarian Price",
    "espn": "4685512",
    "status": "IR",
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 64.14,
    "avg": 3,
    "last": 0
  },
  {
    "name": "Emanuel Wilson",
    "espn": "4887558",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 33.91,
    "avg": 10.26,
    "last": 18
  },
  {
    "name": "Rico Dowdle",
    "espn": "4038815",
    "status": null,
    "team_abbr": "PIT",
    "pos": "RB",
    "fpts": 73.64,
    "avg": 7.62,
    "last": 11.6
  },
  {
    "name": "Tyler Bass",
    "espn": "3917232",
    "status": null,
    "team_abbr": "BUF",
    "pos": "K",
    "fpts": 104.22,
    "avg": 11.14,
    "last": 16
  },
  {
    "name": "Texans",
    "status": "BYE",
    "team_abbr": "HOU",
    "pos": "D/ST",
    "fpts": 53.48,
    "avg": 4.14,
    "last": 0
  },
  {
    "name": "Josh Downs",
    "espn": "4688813",
    "status": null,
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 55.61,
    "avg": 6.84,
    "last": 10.3
  },
  {
    "name": "Courtland Sutton",
    "espn": "3128429",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 73.55,
    "avg": 4.76,
    "last": 7.3
  },
  {
    "name": "KC Concepcion",
    "espn": "4870653",
    "status": null,
    "team_abbr": "CLE",
    "pos": "WR",
    "fpts": 76.71,
    "avg": 6.64,
    "last": 5.2
  },
  {
    "name": "Khalil Shakir",
    "espn": "4373678",
    "status": null,
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 83.93,
    "avg": 7.56,
    "last": 8.9
  },
  {
    "name": "Kirk Cousins",
    "espn": "14880",
    "status": null,
    "team_abbr": "LV",
    "pos": "QB",
    "fpts": 29.2,
    "avg": 19.96,
    "last": 28.18
  },
  {
    "name": "Kyler Murray",
    "espn": "3917315",
    "status": "Q",
    "team_abbr": "MIN",
    "pos": "QB",
    "fpts": 157.2,
    "avg": 12.26,
    "last": 19.9
  },
  {
    "name": "Harrison Butker",
    "espn": "3055899",
    "status": null,
    "team_abbr": "KC",
    "pos": "K",
    "fpts": 97.38,
    "avg": 7.86,
    "last": 6
  },
  {
    "name": "Devaughn Vele",
    "espn": "4569559",
    "status": "BYE",
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 68.94,
    "avg": 9.9,
    "last": 13.9
  },
  {
    "name": "Browns",
    "status": null,
    "team_abbr": "CLE",
    "pos": "D/ST",
    "fpts": 61.8,
    "avg": 5.5,
    "last": 2
  },
  {
    "name": "Alvin Kamara",
    "espn": "3054850",
    "status": "BYE",
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 75.96,
    "avg": 9.13,
    "last": 9.7
  },
  {
    "name": "Tyler Loop",
    "espn": "4697745",
    "status": null,
    "team_abbr": "BAL",
    "pos": "K",
    "fpts": 71.4,
    "avg": 8.25,
    "last": 3
  },
  {
    "name": "Chris Godwin Jr.",
    "espn": "3116165",
    "status": null,
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 56.75,
    "avg": 4.95,
    "last": 0
  },
  {
    "name": "Wan'Dale Robinson",
    "espn": "4569587",
    "status": null,
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 61.16,
    "avg": 7.48,
    "last": 12.7
  },
  {
    "name": "Chiefs",
    "status": null,
    "team_abbr": "KC",
    "pos": "D/ST",
    "fpts": 53.46,
    "avg": 5.43,
    "last": 2
  },
  {
    "name": "Jonah Coleman",
    "espn": "4702555",
    "status": null,
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 112.12,
    "avg": 9.9,
    "last": 18.4
  },
  {
    "name": "Makai Lemon",
    "espn": "4870795",
    "status": null,
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 41.73,
    "avg": 5.76,
    "last": 8.7
  },
  {
    "name": "Juwan Johnson",
    "espn": "3929645",
    "status": "BYE",
    "team_abbr": "NO",
    "pos": "TE",
    "fpts": 59.57,
    "avg": 7.79,
    "last": 1.2
  },
  {
    "name": "Brenton Strange",
    "espn": "4430539",
    "status": null,
    "team_abbr": "JAX",
    "pos": "TE",
    "fpts": 76.27,
    "avg": 7.63,
    "last": 6.5
  },
  {
    "name": "Kenny Gainwell",
    "espn": "4371733",
    "status": null,
    "team_abbr": "TB",
    "pos": "RB",
    "fpts": 74.69,
    "avg": 5.88,
    "last": 14
  },
  {
    "name": "Alec Pierce",
    "espn": "4360078",
    "status": "IR",
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 39.1,
    "avg": 4.85,
    "last": 0
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
    "name": "Pat Freiermuth",
    "espn": "4361411",
    "status": null,
    "team_abbr": "PIT",
    "pos": "TE",
    "fpts": 62.44,
    "avg": 8.31,
    "last": 10.6
  },
  {
    "name": "Jake Ferguson",
    "espn": "4242355",
    "status": "Q",
    "team_abbr": "DAL",
    "pos": "TE",
    "fpts": 37.53,
    "avg": 4.5,
    "last": 0
  },
  {
    "name": "Tyler Allgeier",
    "espn": "4373626",
    "status": null,
    "team_abbr": "ARI",
    "pos": "RB",
    "fpts": 57.45,
    "avg": 9.2,
    "last": 33.6
  },
  {
    "name": "Commanders",
    "status": null,
    "team_abbr": "WSH",
    "pos": "D/ST",
    "fpts": 44.76,
    "avg": 5.29,
    "last": 14
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
    "fpts": 149.13,
    "avg": 14.64,
    "last": 4.88
  },
  {
    "name": "Chase McLaughlin",
    "espn": "3150744",
    "status": null,
    "team_abbr": "TB",
    "pos": "K",
    "fpts": 85.78,
    "avg": 11.13,
    "last": 12
  },
  {
    "name": "Keenan Allen",
    "espn": "15818",
    "status": null,
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 62.54,
    "avg": 8.07,
    "last": 10.2
  },
  {
    "name": "Jake Bates",
    "espn": "4689936",
    "status": null,
    "team_abbr": "DET",
    "pos": "K",
    "fpts": 92.99,
    "avg": 9.14,
    "last": 6
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
    "name": "Brian Thomas Jr.",
    "espn": "4432773",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 58.59,
    "avg": 4.1,
    "last": 7.7
  },
  {
    "name": "MarShawn Lloyd",
    "espn": "4429023",
    "status": null,
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 31.09,
    "avg": 5.66,
    "last": 2.1
  },
  {
    "name": "Malik Washington",
    "espn": "4569603",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 76.76,
    "avg": 8.03,
    "last": 12.5
  },
  {
    "name": "Eddy Pineiro",
    "espn": "4034949",
    "status": "BYE",
    "team_abbr": "SF",
    "pos": "K",
    "fpts": 75.31,
    "avg": 5.86,
    "last": 2
  },
  {
    "name": "Jordyn Tyson",
    "espn": "4880281",
    "status": "IR",
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 53.98,
    "avg": null,
    "last": 0
  },
  {
    "name": "Eagles",
    "status": null,
    "team_abbr": "PHI",
    "pos": "D/ST",
    "fpts": 46.42,
    "avg": 1.25,
    "last": 4
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
    "name": "Justin Herbert",
    "espn": "4038941",
    "status": null,
    "team_abbr": "LAC",
    "pos": "QB",
    "fpts": 124.73,
    "avg": 10.03,
    "last": 7.78
  },
  {
    "name": "Jalen Hurts",
    "espn": "4040715",
    "status": "IR",
    "team_abbr": "PHI",
    "pos": "QB",
    "fpts": 0,
    "avg": 16,
    "last": 0
  },
  {
    "name": "Geno Smith",
    "espn": "15864",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "QB",
    "fpts": 141.79,
    "avg": 15.39,
    "last": 18
  },
  {
    "name": "Sam Darnold",
    "espn": "3912547",
    "status": null,
    "team_abbr": "SEA",
    "pos": "QB",
    "fpts": 128.37,
    "avg": 12.47,
    "last": 13.98
  },
  {
    "name": "De'Von Achane",
    "espn": "4429160",
    "status": "IR",
    "team_abbr": "MIA",
    "pos": "RB",
    "fpts": 0,
    "avg": 7.03,
    "last": 0
  },
  {
    "name": "Caleb Douglas",
    "espn": "4869645",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 77.62,
    "avg": 10.28,
    "last": 6.3
  },
  {
    "name": "Bears",
    "status": null,
    "team_abbr": "CHI",
    "pos": "D/ST",
    "fpts": 53.04,
    "avg": 6.57,
    "last": 3
  },
  {
    "name": "Lions",
    "status": null,
    "team_abbr": "DET",
    "pos": "D/ST",
    "fpts": 38.86,
    "avg": 4,
    "last": 8
  },
  {
    "name": "Buccaneers",
    "status": null,
    "team_abbr": "TB",
    "pos": "D/ST",
    "fpts": 57.96,
    "avg": 10.25,
    "last": 15
  },
  {
    "name": "Brian Robinson Jr.",
    "espn": "4241474",
    "status": "OUT",
    "team_abbr": "ATL",
    "pos": "RB",
    "fpts": 47.5,
    "avg": 8.43,
    "last": 0
  },
  {
    "name": "Keon Coleman",
    "espn": "4635008",
    "status": null,
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 44.5,
    "avg": 8.1,
    "last": 0.9
  }
];
