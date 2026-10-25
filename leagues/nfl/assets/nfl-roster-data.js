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
        "fpts": 242.36,
        "avg": 20.25,
        "last": 24.6
      },
      {
        "name": "D'Andre Swift",
        "espn": "4259545",
        "status": null,
        "team_abbr": "CHI",
        "pos": "RB",
        "fpts": 154,
        "avg": 15.97,
        "last": 17
      },
      {
        "name": "Aaron Jones Sr.",
        "espn": "3042519",
        "status": null,
        "team_abbr": "MIN",
        "pos": "RB",
        "fpts": 121.05,
        "avg": 12.84,
        "last": 17.2
      },
      {
        "name": "Puka Nacua",
        "espn": "4426515",
        "status": "Q",
        "team_abbr": "LAR",
        "pos": "WR",
        "fpts": 212.78,
        "avg": 18.33,
        "last": 11
      },
      {
        "name": "Justin Jefferson",
        "espn": "4262921",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 181.18,
        "avg": 13.55,
        "last": 15.8
      },
      {
        "name": "Germie Bernard",
        "espn": "4685261",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 104.31,
        "avg": 6.47,
        "last": 4.2
      },
      {
        "name": "Trey McBride",
        "espn": "4361307",
        "status": null,
        "team_abbr": "ARI",
        "pos": "TE",
        "fpts": 143.47,
        "avg": 13.1,
        "last": 8.8
      },
      {
        "name": "Jahmyr Gibbs",
        "espn": "4429795",
        "status": null,
        "team_abbr": "DET",
        "pos": "RB",
        "fpts": 282.1,
        "avg": 28.04,
        "last": 35.2
      },
      {
        "name": "CeeDee Lamb",
        "espn": "4241389",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 167.9,
        "avg": 17.85,
        "last": 11.5
      },
      {
        "name": "Jordan Love",
        "espn": "4036378",
        "status": null,
        "team_abbr": "GB",
        "pos": "QB",
        "fpts": 198.42,
        "avg": 18.39,
        "last": 20.24
      },
      {
        "name": "Rams",
        "status": null,
        "team_abbr": "LAR",
        "pos": "D/ST",
        "fpts": 68.09,
        "avg": 4.17,
        "last": 2
      },
      {
        "name": "Brandon Aubrey",
        "espn": "3953687",
        "status": null,
        "team_abbr": "DAL",
        "pos": "K",
        "fpts": 90.92,
        "avg": 7.5,
        "last": 1
      }
    ],
    "bench": [
      {
        "name": "James Cook III",
        "espn": "4379399",
        "status": "BYE",
        "team_abbr": "BUF",
        "pos": "RB",
        "fpts": 200.82,
        "avg": 18.1,
        "last": 22.8
      },
      {
        "name": "Trevor Lawrence",
        "espn": "4360310",
        "status": "BYE",
        "team_abbr": "JAX",
        "pos": "QB",
        "fpts": 224.25,
        "avg": 19.03,
        "last": 27.34
      },
      {
        "name": "Parker Washington",
        "espn": "4432620",
        "status": "BYE",
        "team_abbr": "JAX",
        "pos": "WR",
        "fpts": 154.86,
        "avg": 13.15,
        "last": 8.4
      },
      {
        "name": "Blake Corum",
        "espn": "4429096",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 93.2,
        "avg": 7.98,
        "last": 13
      },
      {
        "name": "Jordan Addison",
        "espn": "4429205",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 106.66,
        "avg": 6.93,
        "last": 0
      },
      {
        "name": "Michael Wilson",
        "espn": "4360761",
        "status": null,
        "team_abbr": "ARI",
        "pos": "WR",
        "fpts": 118.11,
        "avg": 9.13,
        "last": 5.2
      }
    ],
    "ir": []
  },
  "peters": {
    "starters": [
      {
        "name": "Drake Maye",
        "espn": "4431452",
        "status": null,
        "team_abbr": "NE",
        "pos": "QB",
        "fpts": 228.45,
        "avg": 19.78,
        "last": 27.44
      },
      {
        "name": "Derrick Henry",
        "espn": "3043078",
        "status": null,
        "team_abbr": "BAL",
        "pos": "RB",
        "fpts": 195.28,
        "avg": 18.72,
        "last": 4.5
      },
      {
        "name": "Breece Hall",
        "espn": "4427366",
        "status": "OUT",
        "team_abbr": "NYJ",
        "pos": "RB",
        "fpts": 129.3,
        "avg": 12.5,
        "last": 0
      },
      {
        "name": "Ja'Marr Chase",
        "espn": "4362628",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 218.05,
        "avg": 13.28,
        "last": 16.7
      },
      {
        "name": "Zay Flowers",
        "espn": "4429615",
        "status": null,
        "team_abbr": "BAL",
        "pos": "WR",
        "fpts": 151.57,
        "avg": 15.7,
        "last": 9.7
      },
      {
        "name": "Denzel Boston",
        "espn": "4832800",
        "status": null,
        "team_abbr": "CLE",
        "pos": "WR",
        "fpts": 117.13,
        "avg": 10.5,
        "last": 2
      },
      {
        "name": "George Kittle",
        "espn": "3040151",
        "status": null,
        "team_abbr": "SF",
        "pos": "TE",
        "fpts": 139.72,
        "avg": 12.78,
        "last": 15.4
      },
      {
        "name": "Kenneth Walker III",
        "espn": "4567048",
        "status": null,
        "team_abbr": "KC",
        "pos": "RB",
        "fpts": 245.87,
        "avg": 26.2,
        "last": 26.9
      },
      {
        "name": "Tony Pollard",
        "espn": "3916148",
        "status": null,
        "team_abbr": "TEN",
        "pos": "RB",
        "fpts": 134.23,
        "avg": 7.88,
        "last": 7.6
      },
      {
        "name": "Dak Prescott",
        "espn": "2577417",
        "status": null,
        "team_abbr": "DAL",
        "pos": "QB",
        "fpts": 185.2,
        "avg": 17.48,
        "last": 11.02
      },
      {
        "name": "Ravens",
        "status": null,
        "team_abbr": "BAL",
        "pos": "D/ST",
        "fpts": 72.48,
        "avg": 6,
        "last": 10
      },
      {
        "name": "Jason Myers",
        "espn": "2473037",
        "status": null,
        "team_abbr": "SEA",
        "pos": "K",
        "fpts": 108.69,
        "avg": 9.83,
        "last": 7
      }
    ],
    "bench": [
      {
        "name": "Patrick Mahomes",
        "espn": "3139477",
        "status": null,
        "team_abbr": "KC",
        "pos": "QB",
        "fpts": 212.69,
        "avg": 18.81,
        "last": 10.48
      },
      {
        "name": "Rashee Rice",
        "espn": "4428331",
        "status": "OUT",
        "team_abbr": "KC",
        "pos": "WR",
        "fpts": 125.78,
        "avg": 7.88,
        "last": 0
      },
      {
        "name": "Seahawks",
        "status": null,
        "team_abbr": "SEA",
        "pos": "D/ST",
        "fpts": 80.12,
        "avg": 9.5,
        "last": 6
      },
      {
        "name": "Omarion Hampton",
        "espn": "4685382",
        "status": "BYE",
        "team_abbr": "LAC",
        "pos": "RB",
        "fpts": 84.31,
        "avg": 8.83,
        "last": 5.9
      },
      {
        "name": "Harold Fannin Jr.",
        "espn": "5083076",
        "status": null,
        "team_abbr": "CLE",
        "pos": "TE",
        "fpts": 74.57,
        "avg": 7.35,
        "last": 1.4
      },
      {
        "name": "Mike Evans",
        "espn": "16737",
        "status": "OUT",
        "team_abbr": "SF",
        "pos": "WR",
        "fpts": 131.04,
        "avg": 12.58,
        "last": 10.9
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
        "fpts": 196.84,
        "avg": 18.69,
        "last": 22.98
      },
      {
        "name": "Chuba Hubbard",
        "espn": "4241416",
        "status": null,
        "team_abbr": "CAR",
        "pos": "RB",
        "fpts": 168.03,
        "avg": 18.52,
        "last": 18.6
      },
      {
        "name": "Rhamondre Stevenson",
        "espn": "4569173",
        "status": null,
        "team_abbr": "NE",
        "pos": "RB",
        "fpts": 112.53,
        "avg": 10.99,
        "last": 20
      },
      {
        "name": "Jaxon Smith-Njigba",
        "espn": "4430878",
        "status": null,
        "team_abbr": "SEA",
        "pos": "WR",
        "fpts": 186.85,
        "avg": 23.39,
        "last": 19.4
      },
      {
        "name": "Drake London",
        "espn": "4426502",
        "status": null,
        "team_abbr": "ATL",
        "pos": "WR",
        "fpts": 155.79,
        "avg": 12.15,
        "last": 10.2
      },
      {
        "name": "Malik Nabers",
        "espn": "4595348",
        "status": null,
        "team_abbr": "NYG",
        "pos": "WR",
        "fpts": 163.37,
        "avg": 13.65,
        "last": 22.5
      },
      {
        "name": "Tucker Kraft",
        "espn": "4572680",
        "status": null,
        "team_abbr": "GB",
        "pos": "TE",
        "fpts": 99.4,
        "avg": 7.32,
        "last": 6.2
      },
      {
        "name": "Chase Brown",
        "espn": "4362238",
        "status": null,
        "team_abbr": "CIN",
        "pos": "RB",
        "fpts": 158.77,
        "avg": 10.6,
        "last": 5.5
      },
      {
        "name": "Jaylen Warren",
        "espn": "4569987",
        "status": null,
        "team_abbr": "PIT",
        "pos": "RB",
        "fpts": 156.33,
        "avg": 15.36,
        "last": 15.2
      },
      {
        "name": "Bo Nix",
        "espn": "4426338",
        "status": null,
        "team_abbr": "DEN",
        "pos": "QB",
        "fpts": 159.86,
        "avg": 11.61,
        "last": 4.48
      },
      {
        "name": "Vikings",
        "status": null,
        "team_abbr": "MIN",
        "pos": "D/ST",
        "fpts": 71.46,
        "avg": 12.6,
        "last": 13
      },
      {
        "name": "Chris Boswell",
        "espn": "17372",
        "status": null,
        "team_abbr": "PIT",
        "pos": "K",
        "fpts": 117.85,
        "avg": 9.86,
        "last": 11
      }
    ],
    "bench": [
      {
        "name": "Lamar Jackson",
        "espn": "3916387",
        "status": "OUT",
        "team_abbr": "BAL",
        "pos": "QB",
        "fpts": 191.41,
        "avg": 19.77,
        "last": 0
      },
      {
        "name": "49ers",
        "status": null,
        "team_abbr": "SF",
        "pos": "D/ST",
        "fpts": 80.46,
        "avg": 8,
        "last": 5
      },
      {
        "name": "DeVonta Smith",
        "espn": "4241478",
        "status": "OUT",
        "team_abbr": "PHI",
        "pos": "WR",
        "fpts": 121.07,
        "avg": 14,
        "last": 17
      },
      {
        "name": "Bhayshul Tuten",
        "espn": "4882093",
        "status": "BYE",
        "team_abbr": "JAX",
        "pos": "RB",
        "fpts": 143.74,
        "avg": 13.65,
        "last": 22.7
      },
      {
        "name": "Tyler Warren",
        "espn": "4431459",
        "status": "OUT",
        "team_abbr": "IND",
        "pos": "TE",
        "fpts": 92.74,
        "avg": 10.98,
        "last": 0
      },
      {
        "name": "Brian Robinson Jr.",
        "espn": "4241474",
        "status": "OUT",
        "team_abbr": "ATL",
        "pos": "RB",
        "fpts": 62.64,
        "avg": 8.43,
        "last": 2
      }
    ],
    "ir": []
  },
  "puntos": {
    "starters": [
      {
        "name": "Brock Purdy",
        "espn": "4361741",
        "status": null,
        "team_abbr": "SF",
        "pos": "QB",
        "fpts": 222.86,
        "avg": 22.33,
        "last": 17.36
      },
      {
        "name": "Bijan Robinson",
        "espn": "4430807",
        "status": null,
        "team_abbr": "ATL",
        "pos": "RB",
        "fpts": 206.5,
        "avg": 19.75,
        "last": 6.3
      },
      {
        "name": "Kyren Williams",
        "espn": "4430737",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 178.32,
        "avg": 17.33,
        "last": 8.2
      },
      {
        "name": "A.J. Brown",
        "espn": "4047646",
        "status": null,
        "team_abbr": "NE",
        "pos": "WR",
        "fpts": 145.87,
        "avg": 4.87,
        "last": 6.3
      },
      {
        "name": "DK Metcalf",
        "espn": "4047650",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 122.89,
        "avg": 8.64,
        "last": 6.6
      },
      {
        "name": "DeMario Douglas",
        "espn": "4427095",
        "status": null,
        "team_abbr": "NE",
        "pos": "WR",
        "fpts": 95.35,
        "avg": 7.59,
        "last": 3.8
      },
      {
        "name": "Sam LaPorta",
        "espn": "4430027",
        "status": null,
        "team_abbr": "DET",
        "pos": "TE",
        "fpts": 123.51,
        "avg": 12.62,
        "last": 17.3
      },
      {
        "name": "Ashton Jeanty",
        "espn": "4890973",
        "status": null,
        "team_abbr": "LV",
        "pos": "RB",
        "fpts": 159.41,
        "avg": 14.57,
        "last": 13.8
      },
      {
        "name": "Matthew Golden",
        "espn": "4701936",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 148.45,
        "avg": 14.28,
        "last": 19.4
      },
      {
        "name": "Jared Goff",
        "espn": "3046779",
        "status": null,
        "team_abbr": "DET",
        "pos": "QB",
        "fpts": 222.43,
        "avg": 23,
        "last": 28.94
      },
      {
        "name": "Broncos",
        "status": null,
        "team_abbr": "DEN",
        "pos": "D/ST",
        "fpts": 67.92,
        "avg": 7.67,
        "last": 11
      },
      {
        "name": "Will Reichard",
        "espn": "4567104",
        "status": null,
        "team_abbr": "MIN",
        "pos": "K",
        "fpts": 134.03,
        "avg": 13.6,
        "last": 16
      }
    ],
    "bench": [
      {
        "name": "Matthew Stafford",
        "espn": "12483",
        "status": null,
        "team_abbr": "LAR",
        "pos": "QB",
        "fpts": 186.34,
        "avg": 17.64,
        "last": 16.88
      },
      {
        "name": "Cam Little",
        "espn": "4686361",
        "status": "BYE",
        "team_abbr": "JAX",
        "pos": "K",
        "fpts": 98.03,
        "avg": 9.33,
        "last": 10
      },
      {
        "name": "Bucky Irving",
        "espn": "4596448",
        "status": null,
        "team_abbr": "TB",
        "pos": "RB",
        "fpts": 149.47,
        "avg": 12.85,
        "last": 5.9
      },
      {
        "name": "Christian Watson",
        "espn": "4248528",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 144.17,
        "avg": 17.38,
        "last": 7.9
      },
      {
        "name": "Travis Kelce",
        "espn": "15847",
        "status": null,
        "team_abbr": "KC",
        "pos": "TE",
        "fpts": 100.1,
        "avg": 10.38,
        "last": 7.3
      },
      {
        "name": "Jalen Coker",
        "espn": "4695883",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 155.24,
        "avg": 13.98,
        "last": 12.7
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
        "last": 5.4
      }
    ]
  },
  "hobbit": {
    "starters": [
      {
        "name": "Bryce Young",
        "espn": "4685720",
        "status": null,
        "team_abbr": "CAR",
        "pos": "QB",
        "fpts": 222.23,
        "avg": 22.09,
        "last": 19.84
      },
      {
        "name": "Christian McCaffrey",
        "espn": "3117251",
        "status": null,
        "team_abbr": "SF",
        "pos": "RB",
        "fpts": 198.11,
        "avg": 18,
        "last": 26.2
      },
      {
        "name": "Jonathan Taylor",
        "espn": "4242335",
        "status": null,
        "team_abbr": "IND",
        "pos": "RB",
        "fpts": 182.11,
        "avg": 18.5,
        "last": 20.1
      },
      {
        "name": "Chris Olave",
        "espn": "4361370",
        "status": null,
        "team_abbr": "NO",
        "pos": "WR",
        "fpts": 133.27,
        "avg": 14.3,
        "last": 8.6
      },
      {
        "name": "Tetairoa McMillan",
        "espn": "4685472",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 160.79,
        "avg": 14.62,
        "last": 11.6
      },
      {
        "name": "Garrett Wilson",
        "espn": "4569618",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 128.59,
        "avg": 12.88,
        "last": 6.4
      },
      {
        "name": "Brock Bowers",
        "espn": "4432665",
        "status": null,
        "team_abbr": "LV",
        "pos": "TE",
        "fpts": 158.84,
        "avg": 17.05,
        "last": 9
      },
      {
        "name": "Nico Collins",
        "espn": "4258173",
        "status": null,
        "team_abbr": "HOU",
        "pos": "WR",
        "fpts": 148.86,
        "avg": 15.63,
        "last": 9.4
      },
      {
        "name": "Javonte Williams",
        "espn": "4361579",
        "status": null,
        "team_abbr": "DAL",
        "pos": "RB",
        "fpts": 168.01,
        "avg": 16.58,
        "last": 12
      },
      {
        "name": "Amon-Ra St. Brown",
        "espn": "4374302",
        "status": null,
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 192.19,
        "avg": 17.14,
        "last": 9.9
      },
      {
        "name": "Steelers",
        "status": null,
        "team_abbr": "PIT",
        "pos": "D/ST",
        "fpts": 82.12,
        "avg": 8.14,
        "last": 9
      },
      {
        "name": "Matt Gay",
        "espn": "4249087",
        "status": null,
        "team_abbr": "LV",
        "pos": "K",
        "fpts": 104.17,
        "avg": 10.5,
        "last": 12
      }
    ],
    "bench": [
      {
        "name": "Josh Allen",
        "espn": "3918298",
        "status": "BYE",
        "team_abbr": "BUF",
        "pos": "QB",
        "fpts": 250.77,
        "avg": 26.79,
        "last": 18.3
      },
      {
        "name": "Jayden Daniels",
        "espn": "4426348",
        "status": "BYE",
        "team_abbr": "WSH",
        "pos": "QB",
        "fpts": 236.37,
        "avg": 21.42,
        "last": 21
      },
      {
        "name": "George Pickens",
        "espn": "4426354",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 119.45,
        "avg": 10.88,
        "last": 10.3
      },
      {
        "name": "Kyle Pitts Sr.",
        "espn": "4360248",
        "status": null,
        "team_abbr": "ATL",
        "pos": "TE",
        "fpts": 87.44,
        "avg": 7.07,
        "last": 20.5
      },
      {
        "name": "Jeremiyah Love",
        "espn": "4870808",
        "status": "OUT",
        "team_abbr": "ARI",
        "pos": "RB",
        "fpts": 108.75,
        "avg": 9.12,
        "last": 0
      },
      {
        "name": "Cameron Dicker",
        "espn": "4362081",
        "status": "BYE",
        "team_abbr": "LAC",
        "pos": "K",
        "fpts": 84.8,
        "avg": 6,
        "last": 6
      }
    ],
    "ir": [
      {
        "name": "Saquon Barkley",
        "espn": "3929630",
        "status": "Q",
        "team_abbr": "PHI",
        "pos": "RB",
        "fpts": 131.25,
        "avg": 5.25,
        "last": 0
      }
    ]
  }
};

window.FREE_AGENTS = [
  {
    "name": "Tee Higgins",
    "espn": "4239993",
    "status": null,
    "team_abbr": "CIN",
    "pos": "WR",
    "fpts": 142.38,
    "avg": 12.36,
    "last": 3.2
  },
  {
    "name": "Isaiah Likely",
    "espn": "4361050",
    "status": null,
    "team_abbr": "NYG",
    "pos": "TE",
    "fpts": 128.82,
    "avg": 14.97,
    "last": 20.9
  },
  {
    "name": "Emeka Egbuka",
    "espn": "4567750",
    "status": "OUT",
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 120.43,
    "avg": 9.52,
    "last": 14.3
  },
  {
    "name": "Quinshon Judkins",
    "espn": "4685702",
    "status": null,
    "team_abbr": "CLE",
    "pos": "RB",
    "fpts": 135.83,
    "avg": 9.46,
    "last": 0
  },
  {
    "name": "Ka'imi Fairbairn",
    "espn": "2971573",
    "status": null,
    "team_abbr": "HOU",
    "pos": "K",
    "fpts": 118.24,
    "avg": 10.67,
    "last": 11
  },
  {
    "name": "Colston Loveland",
    "espn": "4723086",
    "status": null,
    "team_abbr": "CHI",
    "pos": "TE",
    "fpts": 113.54,
    "avg": 7.06,
    "last": 16.4
  },
  {
    "name": "Cam Skattebo",
    "espn": "4696981",
    "status": null,
    "team_abbr": "NYG",
    "pos": "RB",
    "fpts": 88.74,
    "avg": 7.72,
    "last": 0
  },
  {
    "name": "Texans",
    "status": null,
    "team_abbr": "HOU",
    "pos": "D/ST",
    "fpts": 81.35,
    "avg": 4.83,
    "last": -2
  },
  {
    "name": "Luther Burden III",
    "espn": "4685278",
    "status": null,
    "team_abbr": "CHI",
    "pos": "WR",
    "fpts": 113.26,
    "avg": 11.36,
    "last": 21.7
  },
  {
    "name": "Jameson Williams",
    "espn": "4426388",
    "status": null,
    "team_abbr": "DET",
    "pos": "WR",
    "fpts": 107.85,
    "avg": 9.72,
    "last": 17.7
  },
  {
    "name": "Josh Jacobs",
    "espn": "4047365",
    "status": "DTD",
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 130.07,
    "avg": null,
    "last": 0
  },
  {
    "name": "Jaylen Waddle",
    "espn": "4372016",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 92.52,
    "avg": 7.35,
    "last": 4.4
  },
  {
    "name": "DJ Moore",
    "espn": "3915416",
    "status": "Q",
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 121.06,
    "avg": 7.58,
    "last": 0
  },
  {
    "name": "Caleb Williams",
    "espn": "4431611",
    "status": null,
    "team_abbr": "CHI",
    "pos": "QB",
    "fpts": 199.25,
    "avg": 20.9,
    "last": 22.12
  },
  {
    "name": "Carnell Tate",
    "espn": "4871023",
    "status": null,
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 105.14,
    "avg": 8.82,
    "last": 16
  },
  {
    "name": "Spencer Shrader",
    "espn": "4571557",
    "status": null,
    "team_abbr": "IND",
    "pos": "K",
    "fpts": 116.21,
    "avg": 14,
    "last": 9
  },
  {
    "name": "Rome Odunze",
    "espn": "4431299",
    "status": null,
    "team_abbr": "CHI",
    "pos": "WR",
    "fpts": 94.19,
    "avg": 6.87,
    "last": 8.9
  },
  {
    "name": "Ladd McConkey",
    "espn": "4612826",
    "status": "Q",
    "team_abbr": "LAC",
    "pos": "WR",
    "fpts": 94.58,
    "avg": 6.5,
    "last": 2.2
  },
  {
    "name": "J.K. Dobbins",
    "espn": "4241985",
    "status": null,
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 126.11,
    "avg": 7.62,
    "last": 12.1
  },
  {
    "name": "Dallas Goedert",
    "espn": "3121023",
    "status": null,
    "team_abbr": "PHI",
    "pos": "TE",
    "fpts": 86.07,
    "avg": 9.63,
    "last": 9.1
  },
  {
    "name": "David Montgomery",
    "espn": "4035538",
    "status": "OUT",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 109.83,
    "avg": 8.4,
    "last": 0
  },
  {
    "name": "Travis Etienne Jr.",
    "espn": "4239996",
    "status": "IR",
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 122.42,
    "avg": 8.47,
    "last": 0
  },
  {
    "name": "Braelon Allen",
    "espn": "4685247",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "RB",
    "fpts": 78.27,
    "avg": 8.73,
    "last": 11.4
  },
  {
    "name": "Ollie Gordon II",
    "espn": "4711533",
    "status": null,
    "team_abbr": "MIA",
    "pos": "RB",
    "fpts": 139.66,
    "avg": 9.1,
    "last": 14.8
  },
  {
    "name": "Stefon Diggs",
    "espn": "2976212",
    "status": "BYE",
    "team_abbr": "WSH",
    "pos": "WR",
    "fpts": 111.2,
    "avg": 11.48,
    "last": 13.4
  },
  {
    "name": "Woody Marks",
    "espn": "4429059",
    "status": null,
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 87.51,
    "avg": 7.82,
    "last": 9.1
  },
  {
    "name": "Xavier Worthy",
    "espn": "4683062",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 99.33,
    "avg": 7.42,
    "last": 10.8
  },
  {
    "name": "Dalton Kincaid",
    "espn": "4385690",
    "status": "BYE",
    "team_abbr": "BUF",
    "pos": "TE",
    "fpts": 75.44,
    "avg": 8.17,
    "last": 7.3
  },
  {
    "name": "RJ Harvey",
    "espn": "4568490",
    "status": null,
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 97.83,
    "avg": 8.38,
    "last": 13.1
  },
  {
    "name": "Kyle Monangai",
    "espn": "4608686",
    "status": "OUT",
    "team_abbr": "CHI",
    "pos": "RB",
    "fpts": 102.73,
    "avg": 14.2,
    "last": 0
  },
  {
    "name": "TreVeyon Henderson",
    "espn": "4432710",
    "status": null,
    "team_abbr": "NE",
    "pos": "RB",
    "fpts": 74.49,
    "avg": 5.22,
    "last": 3.3
  },
  {
    "name": "Marvin Harrison Jr.",
    "espn": "4432708",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 66.19,
    "avg": 4.38,
    "last": 4.9
  },
  {
    "name": "Tyler Shough",
    "espn": "4360689",
    "status": null,
    "team_abbr": "NO",
    "pos": "QB",
    "fpts": 186.19,
    "avg": 17.99,
    "last": 13.82
  },
  {
    "name": "Deebo Samuel Sr.",
    "espn": "3126486",
    "status": "OUT",
    "team_abbr": "SF",
    "pos": "WR",
    "fpts": 96.66,
    "avg": 10.48,
    "last": 0
  },
  {
    "name": "Chiefs",
    "status": null,
    "team_abbr": "KC",
    "pos": "D/ST",
    "fpts": 70.26,
    "avg": 7.4,
    "last": 14
  },
  {
    "name": "Emanuel Wilson",
    "espn": "4887558",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 10.12,
    "avg": 8.97,
    "last": 5.2
  },
  {
    "name": "Juwan Johnson",
    "espn": "3929645",
    "status": null,
    "team_abbr": "NO",
    "pos": "TE",
    "fpts": 78.3,
    "avg": 7.79,
    "last": 1.2
  },
  {
    "name": "Harrison Butker",
    "espn": "3055899",
    "status": null,
    "team_abbr": "KC",
    "pos": "K",
    "fpts": 130.93,
    "avg": 9.2,
    "last": 12
  },
  {
    "name": "Jets",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "D/ST",
    "fpts": 70.49,
    "avg": 6.67,
    "last": 3
  },
  {
    "name": "Mark Andrews",
    "espn": "3116365",
    "status": null,
    "team_abbr": "BAL",
    "pos": "TE",
    "fpts": 74.98,
    "avg": 5.6,
    "last": 0.9
  },
  {
    "name": "Josh Downs",
    "espn": "4688813",
    "status": null,
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 78.11,
    "avg": 6.93,
    "last": 6.7
  },
  {
    "name": "Jakobi Meyers",
    "espn": "3916433",
    "status": "BYE",
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 100.14,
    "avg": 8.45,
    "last": 10.8
  },
  {
    "name": "Zach Charbonnet",
    "espn": "4426385",
    "status": "OUT",
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 128.67,
    "avg": null,
    "last": 0
  },
  {
    "name": "Jordan Mason",
    "espn": "4360569",
    "status": null,
    "team_abbr": "MIN",
    "pos": "RB",
    "fpts": 105.55,
    "avg": 11.9,
    "last": 0
  },
  {
    "name": "Jadarian Price",
    "espn": "4685512",
    "status": "IR",
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 103.16,
    "avg": 3,
    "last": 0
  },
  {
    "name": "Courtland Sutton",
    "espn": "3128429",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 78.66,
    "avg": 4.13,
    "last": 2.9
  },
  {
    "name": "T.J. Hockenson",
    "espn": "4036133",
    "status": null,
    "team_abbr": "MIN",
    "pos": "TE",
    "fpts": 95.87,
    "avg": 7.54,
    "last": 1.2
  },
  {
    "name": "Devaughn Vele",
    "espn": "4569559",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 75.69,
    "avg": 9.9,
    "last": 13.9
  },
  {
    "name": "Eddy Pineiro",
    "espn": "4034949",
    "status": null,
    "team_abbr": "SF",
    "pos": "K",
    "fpts": 90.28,
    "avg": 6.5,
    "last": 5
  },
  {
    "name": "Kyler Murray",
    "espn": "3917315",
    "status": null,
    "team_abbr": "MIN",
    "pos": "QB",
    "fpts": 202.29,
    "avg": 9.95,
    "last": 18.26
  },
  {
    "name": "Alvin Kamara",
    "espn": "3054850",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 71.96,
    "avg": 9.13,
    "last": 9.7
  },
  {
    "name": "Browns",
    "status": null,
    "team_abbr": "CLE",
    "pos": "D/ST",
    "fpts": 69.38,
    "avg": 6.17,
    "last": 10
  },
  {
    "name": "Tyler Loop",
    "espn": "4697745",
    "status": null,
    "team_abbr": "BAL",
    "pos": "K",
    "fpts": 97.09,
    "avg": 9.33,
    "last": 3
  },
  {
    "name": "Pat Freiermuth",
    "espn": "4361411",
    "status": null,
    "team_abbr": "PIT",
    "pos": "TE",
    "fpts": 83.35,
    "avg": 7.99,
    "last": 3
  },
  {
    "name": "Tre Tucker",
    "espn": "4428718",
    "status": null,
    "team_abbr": "LV",
    "pos": "WR",
    "fpts": 90.15,
    "avg": 11.08,
    "last": 24.2
  },
  {
    "name": "Patriots",
    "status": null,
    "team_abbr": "NE",
    "pos": "D/ST",
    "fpts": 69.57,
    "avg": 6,
    "last": -1
  },
  {
    "name": "Khalil Shakir",
    "espn": "4373678",
    "status": "BYE",
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 80.22,
    "avg": 7.33,
    "last": 11.4
  },
  {
    "name": "Wan'Dale Robinson",
    "espn": "4569587",
    "status": null,
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 78.57,
    "avg": 7.4,
    "last": 3.7
  },
  {
    "name": "Kirk Cousins",
    "espn": "14880",
    "status": null,
    "team_abbr": "LV",
    "pos": "QB",
    "fpts": 61.34,
    "avg": 18.51,
    "last": 18.52
  },
  {
    "name": "Rachaad White",
    "espn": "4697815",
    "status": "BYE",
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 113.74,
    "avg": 8.36,
    "last": 13.7
  },
  {
    "name": "Tyler Allgeier",
    "espn": "4373626",
    "status": null,
    "team_abbr": "ARI",
    "pos": "RB",
    "fpts": 75.27,
    "avg": 5.6,
    "last": 5.3
  },
  {
    "name": "Chris Godwin Jr.",
    "espn": "3116165",
    "status": null,
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 80.01,
    "avg": 5.82,
    "last": 5.7
  },
  {
    "name": "Rico Dowdle",
    "espn": "4038815",
    "status": null,
    "team_abbr": "PIT",
    "pos": "RB",
    "fpts": 67.59,
    "avg": 6.63,
    "last": 11.6
  },
  {
    "name": "Aaron Rodgers",
    "espn": "8439",
    "status": null,
    "team_abbr": "PIT",
    "pos": "QB",
    "fpts": 177.54,
    "avg": 16.04,
    "last": 13.08
  },
  {
    "name": "Dominic Zvada",
    "espn": "5082424",
    "status": null,
    "team_abbr": "NYG",
    "pos": "K",
    "fpts": 122.58,
    "avg": 9.33,
    "last": 8
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
    "name": "Jake Ferguson",
    "espn": "4242355",
    "status": null,
    "team_abbr": "DAL",
    "pos": "TE",
    "fpts": 51.15,
    "avg": 6,
    "last": 2.3
  },
  {
    "name": "Terry McLaurin",
    "espn": "3121422",
    "status": "OUT",
    "team_abbr": "WSH",
    "pos": "WR",
    "fpts": 0,
    "avg": 7.7,
    "last": 3.2
  },
  {
    "name": "Alec Pierce",
    "espn": "4360078",
    "status": "IR",
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 69.69,
    "avg": 4.85,
    "last": 0
  },
  {
    "name": "Kenny Gainwell",
    "espn": "4371733",
    "status": null,
    "team_abbr": "TB",
    "pos": "RB",
    "fpts": 62.61,
    "avg": 4.03,
    "last": 2.9
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
    "name": "Hunter Henry",
    "espn": "3046439",
    "status": null,
    "team_abbr": "NE",
    "pos": "TE",
    "fpts": 71.81,
    "avg": 7.8,
    "last": 10.6
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
    "name": "MarShawn Lloyd",
    "espn": "4429023",
    "status": null,
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 24.8,
    "avg": 6.45,
    "last": 1
  },
  {
    "name": "Brian Thomas Jr.",
    "espn": "4432773",
    "status": "BYE",
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 51.37,
    "avg": 3.5,
    "last": 0
  },
  {
    "name": "Keenan Allen",
    "espn": "15818",
    "status": null,
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 73.24,
    "avg": 8.34,
    "last": 12.2
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
    "name": "KC Concepcion",
    "espn": "4870653",
    "status": null,
    "team_abbr": "CLE",
    "pos": "WR",
    "fpts": 79.1,
    "avg": 4.78,
    "last": 5.9
  },
  {
    "name": "Kendre Miller",
    "espn": "4599739",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 8.73,
    "avg": 5.68,
    "last": 4.3
  },
  {
    "name": "Dameon Pierce",
    "espn": "4360238",
    "status": null,
    "team_abbr": "PHI",
    "pos": "RB",
    "fpts": 53.43,
    "avg": 7.6,
    "last": 13
  },
  {
    "name": "Jake Bates",
    "espn": "4689936",
    "status": null,
    "team_abbr": "DET",
    "pos": "K",
    "fpts": 106.46,
    "avg": 9.8,
    "last": 10
  },
  {
    "name": "Eagles",
    "status": null,
    "team_abbr": "PHI",
    "pos": "D/ST",
    "fpts": 55.55,
    "avg": 2,
    "last": 1
  },
  {
    "name": "Malik Washington",
    "espn": "4569603",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 105.95,
    "avg": 7.74,
    "last": 9.1
  },
  {
    "name": "Justin Herbert",
    "espn": "4038941",
    "status": "BYE",
    "team_abbr": "LAC",
    "pos": "QB",
    "fpts": 130.25,
    "avg": 10.41,
    "last": 8.76
  },
  {
    "name": "Makai Lemon",
    "espn": "4870795",
    "status": null,
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 49.61,
    "avg": 3.53,
    "last": 3.4
  },
  {
    "name": "Brenton Strange",
    "espn": "4430539",
    "status": "BYE",
    "team_abbr": "JAX",
    "pos": "TE",
    "fpts": 87,
    "avg": 7.82,
    "last": 6.9
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
    "name": "Omar Cooper Jr.",
    "espn": "4723820",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "WR",
    "fpts": 64.73,
    "avg": 11.4,
    "last": 19.3
  },
  {
    "name": "Jordyn Tyson",
    "espn": "4880281",
    "status": "IR",
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 74.28,
    "avg": null,
    "last": 0
  },
  {
    "name": "Titans",
    "status": null,
    "team_abbr": "TEN",
    "pos": "D/ST",
    "fpts": 53.04,
    "avg": 6,
    "last": 19
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
    "name": "Sam Darnold",
    "espn": "3912547",
    "status": null,
    "team_abbr": "SEA",
    "pos": "QB",
    "fpts": 161.22,
    "avg": 12.16,
    "last": 11.02
  },
  {
    "name": "Tank Dell",
    "espn": "4366031",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 15.61,
    "avg": null,
    "last": 0
  },
  {
    "name": "Dalton Schultz",
    "espn": "3117256",
    "status": null,
    "team_abbr": "HOU",
    "pos": "TE",
    "fpts": 71.05,
    "avg": 6.95,
    "last": 5.3
  },
  {
    "name": "Tyreek Hill",
    "espn": "3116406",
    "status": "Q",
    "team_abbr": "FA",
    "pos": "WR",
    "fpts": null,
    "avg": null,
    "last": null
  },
  {
    "name": "Keon Coleman",
    "espn": "4635008",
    "status": "BYE",
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 59.16,
    "avg": 9.3,
    "last": 13.9
  },
  {
    "name": "Dontayvion Wicks",
    "espn": "4428850",
    "status": "OUT",
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 66.73,
    "avg": 7.32,
    "last": 3.4
  },
  {
    "name": "Rashid Shaheed",
    "espn": "4032473",
    "status": null,
    "team_abbr": "SEA",
    "pos": "WR",
    "fpts": 77.35,
    "avg": 5.52,
    "last": 9.3
  },
  {
    "name": "Travis Hunter",
    "espn": "4685415",
    "status": "BYE",
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 22.74,
    "avg": 2.82,
    "last": 13.9
  },
  {
    "name": "Jaguars",
    "status": "BYE",
    "team_abbr": "JAX",
    "pos": "D/ST",
    "fpts": 79.86,
    "avg": 5.67,
    "last": -2
  }
];
