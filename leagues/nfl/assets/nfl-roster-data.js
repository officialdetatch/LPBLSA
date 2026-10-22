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
        "fpts": 242.44,
        "avg": 20.25,
        "last": 24.6
      },
      {
        "name": "D'Andre Swift",
        "espn": "4259545",
        "status": null,
        "team_abbr": "CHI",
        "pos": "RB",
        "fpts": 154.11,
        "avg": 15.8,
        "last": 21
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
        "status": null,
        "team_abbr": "LAR",
        "pos": "WR",
        "fpts": 214.64,
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
        "fpts": 104.4,
        "avg": 6.85,
        "last": 20.2
      },
      {
        "name": "Trey McBride",
        "espn": "4361307",
        "status": null,
        "team_abbr": "ARI",
        "pos": "TE",
        "fpts": 143.54,
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
        "fpts": 167.97,
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
        "fpts": 68.29,
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
        "fpts": 224.17,
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
        "fpts": 93.18,
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
        "fpts": 118.17,
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
        "fpts": 228.46,
        "avg": 18.5,
        "last": 23.8
      },
      {
        "name": "Derrick Henry",
        "espn": "3043078",
        "status": null,
        "team_abbr": "BAL",
        "pos": "RB",
        "fpts": 197.31,
        "avg": 18.72,
        "last": 4.5
      },
      {
        "name": "Breece Hall",
        "espn": "4427366",
        "status": "Q",
        "team_abbr": "NYJ",
        "pos": "RB",
        "fpts": 142.36,
        "avg": 12.5,
        "last": 0
      },
      {
        "name": "Ja'Marr Chase",
        "espn": "4362628",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 218.27,
        "avg": 13.28,
        "last": 16.7
      },
      {
        "name": "Rashee Rice",
        "espn": "4428331",
        "status": "Q",
        "team_abbr": "KC",
        "pos": "WR",
        "fpts": 125.87,
        "avg": 7.88,
        "last": 0
      },
      {
        "name": "Zay Flowers",
        "espn": "4429615",
        "status": null,
        "team_abbr": "BAL",
        "pos": "WR",
        "fpts": 152.94,
        "avg": 15.7,
        "last": 9.7
      },
      {
        "name": "George Kittle",
        "espn": "3040151",
        "status": null,
        "team_abbr": "SF",
        "pos": "TE",
        "fpts": 139.78,
        "avg": 12.78,
        "last": 15.4
      },
      {
        "name": "Kenneth Walker III",
        "espn": "4567048",
        "status": null,
        "team_abbr": "KC",
        "pos": "RB",
        "fpts": 245.95,
        "avg": 26.2,
        "last": 26.9
      },
      {
        "name": "Tony Pollard",
        "espn": "3916148",
        "status": null,
        "team_abbr": "TEN",
        "pos": "RB",
        "fpts": 133.9,
        "avg": 7.88,
        "last": 7.6
      },
      {
        "name": "Dak Prescott",
        "espn": "2577417",
        "status": null,
        "team_abbr": "DAL",
        "pos": "QB",
        "fpts": 185.23,
        "avg": 17.48,
        "last": 11.02
      },
      {
        "name": "Ravens",
        "status": null,
        "team_abbr": "BAL",
        "pos": "D/ST",
        "fpts": 73.9,
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
        "fpts": 212.64,
        "avg": 18.81,
        "last": 10.48
      },
      {
        "name": "Seahawks",
        "status": null,
        "team_abbr": "SEA",
        "pos": "D/ST",
        "fpts": 80.02,
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
        "status": "Q",
        "team_abbr": "SF",
        "pos": "WR",
        "fpts": 131.12,
        "avg": 12.58,
        "last": 10.9
      },
      {
        "name": "Denzel Boston",
        "espn": "4832800",
        "status": "Q",
        "team_abbr": "CLE",
        "pos": "WR",
        "fpts": 117.13,
        "avg": 10.5,
        "last": 2
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
        "fpts": 196.78,
        "avg": 18.69,
        "last": 22.98
      },
      {
        "name": "Chuba Hubbard",
        "espn": "4241416",
        "status": null,
        "team_abbr": "CAR",
        "pos": "RB",
        "fpts": 167.74,
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
        "avg": 9.48,
        "last": 3.6
      },
      {
        "name": "Jaxon Smith-Njigba",
        "espn": "4430878",
        "status": null,
        "team_abbr": "SEA",
        "pos": "WR",
        "fpts": 186.97,
        "avg": 23.39,
        "last": 19.4
      },
      {
        "name": "Drake London",
        "espn": "4426502",
        "status": null,
        "team_abbr": "ATL",
        "pos": "WR",
        "fpts": 155.85,
        "avg": 12.15,
        "last": 10.2
      },
      {
        "name": "Malik Nabers",
        "espn": "4595348",
        "status": null,
        "team_abbr": "NYG",
        "pos": "WR",
        "fpts": 163.41,
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
        "name": "DeVonta Smith",
        "espn": "4241478",
        "status": null,
        "team_abbr": "PHI",
        "pos": "WR",
        "fpts": 138.03,
        "avg": 14,
        "last": 17
      },
      {
        "name": "Chase Brown",
        "espn": "4362238",
        "status": null,
        "team_abbr": "CIN",
        "pos": "RB",
        "fpts": 158.6,
        "avg": 10.6,
        "last": 5.5
      },
      {
        "name": "Bo Nix",
        "espn": "4426338",
        "status": null,
        "team_abbr": "DEN",
        "pos": "QB",
        "fpts": 160.01,
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
        "avg": 9.67,
        "last": 17
      }
    ],
    "bench": [
      {
        "name": "Lamar Jackson",
        "espn": "3916387",
        "status": "Q",
        "team_abbr": "BAL",
        "pos": "QB",
        "fpts": 211.34,
        "avg": 19.77,
        "last": 0
      },
      {
        "name": "49ers",
        "status": null,
        "team_abbr": "SF",
        "pos": "D/ST",
        "fpts": 81.46,
        "avg": 8,
        "last": 5
      },
      {
        "name": "Cam Skattebo",
        "espn": "4696981",
        "status": null,
        "team_abbr": "NYG",
        "pos": "RB",
        "fpts": 74.6,
        "avg": 7.72,
        "last": 0
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
        "status": "Q",
        "team_abbr": "IND",
        "pos": "TE",
        "fpts": 92.78,
        "avg": 10.98,
        "last": 0
      },
      {
        "name": "Brian Robinson Jr.",
        "espn": "4241474",
        "status": "Q",
        "team_abbr": "ATL",
        "pos": "RB",
        "fpts": 68.39,
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
        "fpts": 222.85,
        "avg": 22.33,
        "last": 17.36
      },
      {
        "name": "Bijan Robinson",
        "espn": "4430807",
        "status": null,
        "team_abbr": "ATL",
        "pos": "RB",
        "fpts": 204.69,
        "avg": 19.75,
        "last": 6.3
      },
      {
        "name": "Kyren Williams",
        "espn": "4430737",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 178.27,
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
        "avg": 4.15,
        "last": 4.2
      },
      {
        "name": "DK Metcalf",
        "espn": "4047650",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 122.99,
        "avg": 8.98,
        "last": 14.8
      },
      {
        "name": "DeMario Douglas",
        "espn": "4427095",
        "status": null,
        "team_abbr": "NE",
        "pos": "WR",
        "fpts": 95.35,
        "avg": 8.22,
        "last": 16.1
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
        "fpts": 159.43,
        "avg": 14.57,
        "last": 13.8
      },
      {
        "name": "Matthew Golden",
        "espn": "4701936",
        "status": "Q",
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 148.45,
        "avg": 14.28,
        "last": 19.4
      },
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
        "name": "Broncos",
        "status": null,
        "team_abbr": "DEN",
        "pos": "D/ST",
        "fpts": 68.5,
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
        "status": "Q",
        "team_abbr": "TB",
        "pos": "RB",
        "fpts": 149.45,
        "avg": 12.85,
        "last": 5.9
      },
      {
        "name": "Christian Watson",
        "espn": "4248528",
        "status": "Q",
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 144.17,
        "avg": 17.38,
        "last": 7.9
      },
      {
        "name": "Travis Kelce",
        "espn": "15847",
        "status": "Q",
        "team_abbr": "KC",
        "pos": "TE",
        "fpts": 100.16,
        "avg": 10.38,
        "last": 7.3
      },
      {
        "name": "Jared Goff",
        "espn": "3046779",
        "status": null,
        "team_abbr": "DET",
        "pos": "QB",
        "fpts": 222.34,
        "avg": 23,
        "last": 28.94
      },
      {
        "name": "Jalen Coker",
        "espn": "4695883",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 155.25,
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
        "fpts": 222.18,
        "avg": 22.09,
        "last": 19.84
      },
      {
        "name": "Christian McCaffrey",
        "espn": "3117251",
        "status": null,
        "team_abbr": "SF",
        "pos": "RB",
        "fpts": 198.05,
        "avg": 18,
        "last": 26.2
      },
      {
        "name": "Jonathan Taylor",
        "espn": "4242335",
        "status": null,
        "team_abbr": "IND",
        "pos": "RB",
        "fpts": 182.02,
        "avg": 18.5,
        "last": 20.1
      },
      {
        "name": "Chris Olave",
        "espn": "4361370",
        "status": null,
        "team_abbr": "NO",
        "pos": "WR",
        "fpts": 133.28,
        "avg": 15.25,
        "last": 12.3
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
        "fpts": 128.6,
        "avg": 12.88,
        "last": 6.4
      },
      {
        "name": "Brock Bowers",
        "espn": "4432665",
        "status": "Q",
        "team_abbr": "LV",
        "pos": "TE",
        "fpts": 159.02,
        "avg": 17.05,
        "last": 9
      },
      {
        "name": "Nico Collins",
        "espn": "4258173",
        "status": null,
        "team_abbr": "HOU",
        "pos": "WR",
        "fpts": 148.96,
        "avg": 15.63,
        "last": 9.4
      },
      {
        "name": "Javonte Williams",
        "espn": "4361579",
        "status": null,
        "team_abbr": "DAL",
        "pos": "RB",
        "fpts": 167.64,
        "avg": 16.58,
        "last": 12
      },
      {
        "name": "Amon-Ra St. Brown",
        "espn": "4374302",
        "status": null,
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 192.39,
        "avg": 17.14,
        "last": 9.9
      },
      {
        "name": "Steelers",
        "status": null,
        "team_abbr": "PIT",
        "pos": "D/ST",
        "fpts": 80.88,
        "avg": 8,
        "last": 11
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
        "fpts": 250.79,
        "avg": 26.79,
        "last": 18.3
      },
      {
        "name": "Jayden Daniels",
        "espn": "4426348",
        "status": "BYE",
        "team_abbr": "WSH",
        "pos": "QB",
        "fpts": 236.34,
        "avg": 21.42,
        "last": 21
      },
      {
        "name": "George Pickens",
        "espn": "4426354",
        "status": "Q",
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 119.5,
        "avg": 10.88,
        "last": 10.3
      },
      {
        "name": "Kyle Pitts Sr.",
        "espn": "4360248",
        "status": null,
        "team_abbr": "ATL",
        "pos": "TE",
        "fpts": 87.47,
        "avg": 7.07,
        "last": 20.5
      },
      {
        "name": "Jeremiyah Love",
        "espn": "4870808",
        "status": "D",
        "team_abbr": "ARI",
        "pos": "RB",
        "fpts": 108.68,
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
        "fpts": 134.26,
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
    "fpts": 142.53,
    "avg": 12.36,
    "last": 3.2
  },
  {
    "name": "Jaylen Warren",
    "espn": "4569987",
    "status": null,
    "team_abbr": "PIT",
    "pos": "RB",
    "fpts": 156.29,
    "avg": 15.38,
    "last": 8.8
  },
  {
    "name": "Isaiah Likely",
    "espn": "4361050",
    "status": null,
    "team_abbr": "NYG",
    "pos": "TE",
    "fpts": 128.84,
    "avg": 14.97,
    "last": 20.9
  },
  {
    "name": "Emeka Egbuka",
    "espn": "4567750",
    "status": "Q",
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 131.81,
    "avg": 9.52,
    "last": 14.3
  },
  {
    "name": "Quinshon Judkins",
    "espn": "4685702",
    "status": "Q",
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
    "fpts": 104.46,
    "avg": 5.5,
    "last": 15.5
  },
  {
    "name": "Luther Burden III",
    "espn": "4685278",
    "status": null,
    "team_abbr": "CHI",
    "pos": "WR",
    "fpts": 113.68,
    "avg": 9.63,
    "last": 13.5
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
    "name": "Texans",
    "status": null,
    "team_abbr": "HOU",
    "pos": "D/ST",
    "fpts": 79.05,
    "avg": 4.83,
    "last": -2
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
    "name": "Jaylen Waddle",
    "espn": "4372016",
    "status": "Q",
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 92.62,
    "avg": 7.35,
    "last": 4.4
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
    "name": "Caleb Williams",
    "espn": "4431611",
    "status": null,
    "team_abbr": "CHI",
    "pos": "QB",
    "fpts": 199.26,
    "avg": 20.49,
    "last": 16.5
  },
  {
    "name": "Carnell Tate",
    "espn": "4871023",
    "status": null,
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 105.19,
    "avg": 8.82,
    "last": 16
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
    "fpts": 94.66,
    "avg": 6.53,
    "last": 5.4
  },
  {
    "name": "Dallas Goedert",
    "espn": "3121023",
    "status": null,
    "team_abbr": "PHI",
    "pos": "TE",
    "fpts": 87.81,
    "avg": 9.63,
    "last": 9.1
  },
  {
    "name": "David Montgomery",
    "espn": "4035538",
    "status": "D",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 109.76,
    "avg": 8.4,
    "last": 0
  },
  {
    "name": "J.K. Dobbins",
    "espn": "4241985",
    "status": null,
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 126.49,
    "avg": 7.62,
    "last": 12.1
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
    "name": "Stefon Diggs",
    "espn": "2976212",
    "status": "BYE",
    "team_abbr": "WSH",
    "pos": "WR",
    "fpts": 111.25,
    "avg": 11.48,
    "last": 13.4
  },
  {
    "name": "Braelon Allen",
    "espn": "4685247",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "RB",
    "fpts": 72.94,
    "avg": 8.73,
    "last": 11.4
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
    "name": "Ollie Gordon II",
    "espn": "4711533",
    "status": null,
    "team_abbr": "MIA",
    "pos": "RB",
    "fpts": 139.64,
    "avg": 9.1,
    "last": 14.8
  },
  {
    "name": "Kyle Monangai",
    "espn": "4608686",
    "status": "OUT",
    "team_abbr": "CHI",
    "pos": "RB",
    "fpts": 102.81,
    "avg": 14.2,
    "last": 0
  },
  {
    "name": "RJ Harvey",
    "espn": "4568490",
    "status": null,
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 98.04,
    "avg": 8.38,
    "last": 13.1
  },
  {
    "name": "TreVeyon Henderson",
    "espn": "4432710",
    "status": null,
    "team_abbr": "NE",
    "pos": "RB",
    "fpts": 74.49,
    "avg": 5.6,
    "last": 2.5
  },
  {
    "name": "Xavier Worthy",
    "espn": "4683062",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 99.4,
    "avg": 7.42,
    "last": 10.8
  },
  {
    "name": "Marvin Harrison Jr.",
    "espn": "4432708",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 66.23,
    "avg": 4.38,
    "last": 4.9
  },
  {
    "name": "Tyler Shough",
    "espn": "4360689",
    "status": null,
    "team_abbr": "NO",
    "pos": "QB",
    "fpts": 186.15,
    "avg": 18.69,
    "last": 26.96
  },
  {
    "name": "Woody Marks",
    "espn": "4429059",
    "status": null,
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 87.16,
    "avg": 7.82,
    "last": 9.1
  },
  {
    "name": "Deebo Samuel Sr.",
    "espn": "3126486",
    "status": "OUT",
    "team_abbr": "SF",
    "pos": "WR",
    "fpts": 96.69,
    "avg": 10.48,
    "last": 0
  },
  {
    "name": "Juwan Johnson",
    "espn": "3929645",
    "status": null,
    "team_abbr": "NO",
    "pos": "TE",
    "fpts": 78.3,
    "avg": 8.88,
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
    "fpts": 7.23,
    "avg": 8.97,
    "last": 5.2
  },
  {
    "name": "Josh Downs",
    "espn": "4688813",
    "status": null,
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 78.15,
    "avg": 6.93,
    "last": 6.7
  },
  {
    "name": "Mark Andrews",
    "espn": "3116365",
    "status": null,
    "team_abbr": "BAL",
    "pos": "TE",
    "fpts": 75.68,
    "avg": 5.6,
    "last": 0.9
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
    "name": "Jadarian Price",
    "espn": "4685512",
    "status": "IR",
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 103.11,
    "avg": 3,
    "last": 0
  },
  {
    "name": "Courtland Sutton",
    "espn": "3128429",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 78.79,
    "avg": 4.13,
    "last": 2.9
  },
  {
    "name": "Zach Charbonnet",
    "espn": "4426385",
    "status": "Q",
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 137.34,
    "avg": null,
    "last": 0
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
    "name": "Devaughn Vele",
    "espn": "4569559",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 75.69,
    "avg": 9.23,
    "last": 5.7
  },
  {
    "name": "Jordan Mason",
    "espn": "4360569",
    "status": "IR",
    "team_abbr": "MIN",
    "pos": "RB",
    "fpts": 105.55,
    "avg": 11.9,
    "last": 0
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
    "name": "Tyler Loop",
    "espn": "4697745",
    "status": null,
    "team_abbr": "BAL",
    "pos": "K",
    "fpts": 97.61,
    "avg": 9.33,
    "last": 3
  },
  {
    "name": "Alvin Kamara",
    "espn": "3054850",
    "status": "Q",
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 71.96,
    "avg": 9.02,
    "last": 13.9
  },
  {
    "name": "Jets",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "D/ST",
    "fpts": 71.23,
    "avg": 6.67,
    "last": 3
  },
  {
    "name": "Patriots",
    "status": null,
    "team_abbr": "NE",
    "pos": "D/ST",
    "fpts": 68.55,
    "avg": 7.17,
    "last": 5
  },
  {
    "name": "T.J. Hockenson",
    "espn": "4036133",
    "status": "Q",
    "team_abbr": "MIN",
    "pos": "TE",
    "fpts": 95.87,
    "avg": 7.54,
    "last": 1.2
  },
  {
    "name": "Khalil Shakir",
    "espn": "4373678",
    "status": "BYE",
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 80.21,
    "avg": 7.33,
    "last": 11.4
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
    "name": "Wan'Dale Robinson",
    "espn": "4569587",
    "status": null,
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 78.61,
    "avg": 7.4,
    "last": 3.7
  },
  {
    "name": "Kyler Murray",
    "espn": "3917315",
    "status": null,
    "team_abbr": "MIN",
    "pos": "QB",
    "fpts": 202.26,
    "avg": 9.95,
    "last": 18.26
  },
  {
    "name": "Rachaad White",
    "espn": "4697815",
    "status": "BYE",
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 113.69,
    "avg": 8.36,
    "last": 13.7
  },
  {
    "name": "Rico Dowdle",
    "espn": "4038815",
    "status": "Q",
    "team_abbr": "PIT",
    "pos": "RB",
    "fpts": 67.56,
    "avg": 4.97,
    "last": 6.4
  },
  {
    "name": "Pat Freiermuth",
    "espn": "4361411",
    "status": null,
    "team_abbr": "PIT",
    "pos": "TE",
    "fpts": 83.41,
    "avg": 8.82,
    "last": 2.1
  },
  {
    "name": "Browns",
    "status": null,
    "team_abbr": "CLE",
    "pos": "D/ST",
    "fpts": 69.41,
    "avg": 6.17,
    "last": 10
  },
  {
    "name": "Kirk Cousins",
    "espn": "14880",
    "status": null,
    "team_abbr": "LV",
    "pos": "QB",
    "fpts": 61.36,
    "avg": 18.51,
    "last": 18.52
  },
  {
    "name": "Jake Ferguson",
    "espn": "4242355",
    "status": null,
    "team_abbr": "DAL",
    "pos": "TE",
    "fpts": 51.16,
    "avg": 6,
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
    "last": 10.7
  },
  {
    "name": "Tre Tucker",
    "espn": "4428718",
    "status": null,
    "team_abbr": "LV",
    "pos": "WR",
    "fpts": 90.25,
    "avg": 11.08,
    "last": 24.2
  },
  {
    "name": "Alec Pierce",
    "espn": "4360078",
    "status": "IR",
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 69.74,
    "avg": 4.85,
    "last": 0
  },
  {
    "name": "Kenny Gainwell",
    "espn": "4371733",
    "status": null,
    "team_abbr": "TB",
    "pos": "RB",
    "fpts": 62.59,
    "avg": 4.03,
    "last": 2.9
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
    "name": "Aaron Rodgers",
    "espn": "8439",
    "status": null,
    "team_abbr": "PIT",
    "pos": "QB",
    "fpts": 177.56,
    "avg": 16.53,
    "last": 16.02
  },
  {
    "name": "Tyler Allgeier",
    "espn": "4373626",
    "status": null,
    "team_abbr": "ARI",
    "pos": "RB",
    "fpts": 76.13,
    "avg": 5.6,
    "last": 5.3
  },
  {
    "name": "Dameon Pierce",
    "espn": "4360238",
    "status": null,
    "team_abbr": "PHI",
    "pos": "RB",
    "fpts": 54.27,
    "avg": 7.6,
    "last": 13
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
    "name": "Hunter Henry",
    "espn": "3046439",
    "status": null,
    "team_abbr": "NE",
    "pos": "TE",
    "fpts": 71.81,
    "avg": 7.33,
    "last": 12.8
  },
  {
    "name": "Chris Godwin Jr.",
    "espn": "3116165",
    "status": null,
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 78.08,
    "avg": 5.82,
    "last": 5.7
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
    "name": "KC Concepcion",
    "espn": "4870653",
    "status": "Q",
    "team_abbr": "CLE",
    "pos": "WR",
    "fpts": 79.1,
    "avg": 4.78,
    "last": 5.9
  },
  {
    "name": "Eagles",
    "status": null,
    "team_abbr": "PHI",
    "pos": "D/ST",
    "fpts": 55.88,
    "avg": 2,
    "last": 1
  },
  {
    "name": "Keenan Allen",
    "espn": "15818",
    "status": null,
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 73.28,
    "avg": 8.34,
    "last": 12.2
  },
  {
    "name": "Justin Herbert",
    "espn": "4038941",
    "status": "BYE",
    "team_abbr": "LAC",
    "pos": "QB",
    "fpts": 130.26,
    "avg": 10.41,
    "last": 8.76
  },
  {
    "name": "Kendre Miller",
    "espn": "4599739",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 8.73,
    "avg": 5.96,
    "last": 8
  },
  {
    "name": "Jake Bates",
    "espn": "4689936",
    "status": null,
    "team_abbr": "DET",
    "pos": "K",
    "fpts": 106.47,
    "avg": 9.8,
    "last": 10
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
    "name": "Makai Lemon",
    "espn": "4870795",
    "status": null,
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 49.59,
    "avg": 3.53,
    "last": 3.4
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
    "name": "Malik Washington",
    "espn": "4569603",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 105.88,
    "avg": 7.74,
    "last": 9.1
  },
  {
    "name": "Jaguars",
    "status": "BYE",
    "team_abbr": "JAX",
    "pos": "D/ST",
    "fpts": 79.86,
    "avg": 5.67,
    "last": -2
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
    "name": "Omar Cooper Jr.",
    "espn": "4723820",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "WR",
    "fpts": 64.25,
    "avg": 11.4,
    "last": 19.3
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
    "fpts": 161.15,
    "avg": 12.16,
    "last": 11.02
  },
  {
    "name": "Dontayvion Wicks",
    "espn": "4428850",
    "status": null,
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 76.14,
    "avg": 7.32,
    "last": 3.4
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
    "name": "Dalton Schultz",
    "espn": "3117256",
    "status": "Q",
    "team_abbr": "HOU",
    "pos": "TE",
    "fpts": 71.1,
    "avg": 6.95,
    "last": 5.3
  },
  {
    "name": "Tank Dell",
    "espn": "4366031",
    "status": "IR",
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 15.14,
    "avg": null,
    "last": 0
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
    "name": "Quentin Johnston",
    "espn": "4429025",
    "status": "BYE",
    "team_abbr": "LAC",
    "pos": "WR",
    "fpts": 58.41,
    "avg": 4.16,
    "last": 6.2
  },
  {
    "name": "Tyjae Spears",
    "espn": "4428557",
    "status": null,
    "team_abbr": "TEN",
    "pos": "RB",
    "fpts": 61.13,
    "avg": 3.27,
    "last": 1.3
  },
  {
    "name": "Rashid Shaheed",
    "espn": "4032473",
    "status": "Q",
    "team_abbr": "SEA",
    "pos": "WR",
    "fpts": 77.36,
    "avg": 5.52,
    "last": 9.3
  }
];
