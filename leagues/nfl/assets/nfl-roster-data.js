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
        "fpts": 227.99,
        "avg": 21.69,
        "last": 28.88
      },
      {
        "name": "D'Andre Swift",
        "espn": "4259545",
        "status": null,
        "team_abbr": "CHI",
        "pos": "RB",
        "fpts": 140.5,
        "avg": 15.97,
        "last": 17
      },
      {
        "name": "Aaron Jones Sr.",
        "espn": "3042519",
        "status": "Q",
        "team_abbr": "MIN",
        "pos": "RB",
        "fpts": 97.98,
        "avg": 11.22,
        "last": 3.1
      },
      {
        "name": "Puka Nacua",
        "espn": "4426515",
        "status": null,
        "team_abbr": "LAR",
        "pos": "WR",
        "fpts": 186.05,
        "avg": 18.22,
        "last": 17.8
      },
      {
        "name": "Justin Jefferson",
        "espn": "4262921",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 152.54,
        "avg": 12.12,
        "last": 6.4
      },
      {
        "name": "Germie Bernard",
        "espn": "4685261",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 90.25,
        "avg": 6.47,
        "last": 4.2
      },
      {
        "name": "Trey McBride",
        "espn": "4361307",
        "status": null,
        "team_abbr": "ARI",
        "pos": "TE",
        "fpts": 130.17,
        "avg": 14.39,
        "last": 22.1
      },
      {
        "name": "Jahmyr Gibbs",
        "espn": "4429795",
        "status": null,
        "team_abbr": "DET",
        "pos": "RB",
        "fpts": 264.95,
        "avg": 25.83,
        "last": 14.8
      },
      {
        "name": "CeeDee Lamb",
        "espn": "4241389",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 160.04,
        "avg": 18.43,
        "last": 21.9
      },
      {
        "name": "Jordan Love",
        "espn": "4036378",
        "status": null,
        "team_abbr": "GB",
        "pos": "QB",
        "fpts": 172.32,
        "avg": 18.19,
        "last": 16.96
      },
      {
        "name": "Rams",
        "status": null,
        "team_abbr": "LAR",
        "pos": "D/ST",
        "fpts": 70.7,
        "avg": 3.71,
        "last": 1
      },
      {
        "name": "Brandon Aubrey",
        "espn": "3953687",
        "status": null,
        "team_abbr": "DAL",
        "pos": "K",
        "fpts": 94.45,
        "avg": 8.43,
        "last": 14
      }
    ],
    "bench": [
      {
        "name": "James Cook III",
        "espn": "4379399",
        "status": null,
        "team_abbr": "BUF",
        "pos": "RB",
        "fpts": 196.86,
        "avg": 18.1,
        "last": 22.8
      },
      {
        "name": "Trevor Lawrence",
        "espn": "4360310",
        "status": null,
        "team_abbr": "JAX",
        "pos": "QB",
        "fpts": 224.73,
        "avg": 19.03,
        "last": 27.34
      },
      {
        "name": "Parker Washington",
        "espn": "4432620",
        "status": null,
        "team_abbr": "JAX",
        "pos": "WR",
        "fpts": 155.63,
        "avg": 13.15,
        "last": 8.4
      },
      {
        "name": "Blake Corum",
        "espn": "4429096",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 98.57,
        "avg": 9.21,
        "last": 16.6
      },
      {
        "name": "Jordan Addison",
        "espn": "4429205",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 84.77,
        "avg": 6.2,
        "last": 3.3
      },
      {
        "name": "Michael Wilson",
        "espn": "4360761",
        "status": null,
        "team_abbr": "ARI",
        "pos": "WR",
        "fpts": 97.86,
        "avg": 9.05,
        "last": 8.6
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
        "fpts": 220.95,
        "avg": 19.78,
        "last": 27.44
      },
      {
        "name": "Derrick Henry",
        "espn": "3043078",
        "status": null,
        "team_abbr": "BAL",
        "pos": "RB",
        "fpts": 169.93,
        "avg": 16.81,
        "last": 5.4
      },
      {
        "name": "Omarion Hampton",
        "espn": "4685382",
        "status": null,
        "team_abbr": "LAC",
        "pos": "RB",
        "fpts": 91.35,
        "avg": 8.83,
        "last": 5.9
      },
      {
        "name": "Ja'Marr Chase",
        "espn": "4362628",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 192.93,
        "avg": 13.52,
        "last": 14.7
      },
      {
        "name": "Zay Flowers",
        "espn": "4429615",
        "status": null,
        "team_abbr": "BAL",
        "pos": "WR",
        "fpts": 153.81,
        "avg": 17.03,
        "last": 23.7
      },
      {
        "name": "Denzel Boston",
        "espn": "4832800",
        "status": null,
        "team_abbr": "CLE",
        "pos": "WR",
        "fpts": 105.72,
        "avg": 9.6,
        "last": 4.2
      },
      {
        "name": "Harold Fannin Jr.",
        "espn": "5083076",
        "status": null,
        "team_abbr": "CLE",
        "pos": "TE",
        "fpts": 75.47,
        "avg": 7.74,
        "last": 10.1
      },
      {
        "name": "Kenneth Walker III",
        "espn": "4567048",
        "status": null,
        "team_abbr": "KC",
        "pos": "RB",
        "fpts": 225.97,
        "avg": 23.12,
        "last": 7.7
      },
      {
        "name": "Tony Pollard",
        "espn": "3916148",
        "status": null,
        "team_abbr": "TEN",
        "pos": "RB",
        "fpts": 137.94,
        "avg": 11.76,
        "last": 35
      },
      {
        "name": "Patrick Mahomes",
        "espn": "3139477",
        "status": null,
        "team_abbr": "KC",
        "pos": "QB",
        "fpts": 181.46,
        "avg": 16.68,
        "last": 6
      },
      {
        "name": "Seahawks",
        "status": null,
        "team_abbr": "SEA",
        "pos": "D/ST",
        "fpts": 75.67,
        "avg": 9.43,
        "last": 9
      },
      {
        "name": "Jason Myers",
        "espn": "2473037",
        "status": null,
        "team_abbr": "SEA",
        "pos": "K",
        "fpts": 95.43,
        "avg": 9.57,
        "last": 8
      }
    ],
    "bench": [
      {
        "name": "Rashee Rice",
        "espn": "4428331",
        "status": "Q",
        "team_abbr": "KC",
        "pos": "WR",
        "fpts": 120.9,
        "avg": 7.88,
        "last": 0
      },
      {
        "name": "George Kittle",
        "espn": "3040151",
        "status": "BYE",
        "team_abbr": "SF",
        "pos": "TE",
        "fpts": 121.86,
        "avg": 12.5,
        "last": 10.8
      },
      {
        "name": "Ravens",
        "status": null,
        "team_abbr": "BAL",
        "pos": "D/ST",
        "fpts": 59.82,
        "avg": 4.71,
        "last": -3
      },
      {
        "name": "Breece Hall",
        "espn": "4427366",
        "status": "Q",
        "team_abbr": "NYJ",
        "pos": "RB",
        "fpts": 121.95,
        "avg": 12.5,
        "last": 0
      },
      {
        "name": "Dak Prescott",
        "espn": "2577417",
        "status": null,
        "team_abbr": "DAL",
        "pos": "QB",
        "fpts": 174.93,
        "avg": 18.31,
        "last": 23.28
      },
      {
        "name": "Mike Evans",
        "espn": "16737",
        "status": "Q",
        "team_abbr": "SF",
        "pos": "WR",
        "fpts": 121.51,
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
        "fpts": 158.28,
        "avg": 13.69,
        "last": 26.18
      },
      {
        "name": "Bhayshul Tuten",
        "espn": "4882093",
        "status": null,
        "team_abbr": "JAX",
        "pos": "RB",
        "fpts": 143.2,
        "avg": 13.65,
        "last": 22.7
      },
      {
        "name": "Rhamondre Stevenson",
        "espn": "4569173",
        "status": null,
        "team_abbr": "NE",
        "pos": "RB",
        "fpts": 109.29,
        "avg": 10.99,
        "last": 20
      },
      {
        "name": "Jaxon Smith-Njigba",
        "espn": "4430878",
        "status": null,
        "team_abbr": "SEA",
        "pos": "WR",
        "fpts": 176.06,
        "avg": 23.88,
        "last": 26.8
      },
      {
        "name": "Drake London",
        "espn": "4426502",
        "status": null,
        "team_abbr": "ATL",
        "pos": "WR",
        "fpts": 154.31,
        "avg": 12.71,
        "last": 16.1
      },
      {
        "name": "Tee Higgins",
        "espn": "4239993",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 136.39,
        "avg": 14.27,
        "last": 23.8
      },
      {
        "name": "Tucker Kraft",
        "espn": "4572680",
        "status": null,
        "team_abbr": "GB",
        "pos": "TE",
        "fpts": 88.43,
        "avg": 8.1,
        "last": 12.8
      },
      {
        "name": "Chase Brown",
        "espn": "4362238",
        "status": null,
        "team_abbr": "CIN",
        "pos": "RB",
        "fpts": 145.63,
        "avg": 10.13,
        "last": 7.8
      },
      {
        "name": "Jaylen Warren",
        "espn": "4569987",
        "status": null,
        "team_abbr": "PIT",
        "pos": "RB",
        "fpts": 142.89,
        "avg": 15.36,
        "last": 15.2
      },
      {
        "name": "Chuba Hubbard",
        "espn": "4241416",
        "status": null,
        "team_abbr": "CAR",
        "pos": "RB",
        "fpts": 161.04,
        "avg": 16.77,
        "last": 8
      },
      {
        "name": "Vikings",
        "status": null,
        "team_abbr": "MIN",
        "pos": "D/ST",
        "fpts": 65.15,
        "avg": 12.33,
        "last": 11
      },
      {
        "name": "Chris Boswell",
        "espn": "17372",
        "status": null,
        "team_abbr": "PIT",
        "pos": "K",
        "fpts": 104.06,
        "avg": 9.86,
        "last": 11
      }
    ],
    "bench": [
      {
        "name": "Lamar Jackson",
        "espn": "3916387",
        "status": "Q",
        "team_abbr": "BAL",
        "pos": "QB",
        "fpts": 199.93,
        "avg": 19.77,
        "last": 0
      },
      {
        "name": "49ers",
        "status": "BYE",
        "team_abbr": "SF",
        "pos": "D/ST",
        "fpts": 70.55,
        "avg": 7,
        "last": 1
      },
      {
        "name": "DeVonta Smith",
        "espn": "4241478",
        "status": "Q",
        "team_abbr": "PHI",
        "pos": "WR",
        "fpts": 116.98,
        "avg": 14,
        "last": 0
      },
      {
        "name": "Malik Nabers",
        "espn": "4595348",
        "status": "BYE",
        "team_abbr": "NYG",
        "pos": "WR",
        "fpts": 146.33,
        "avg": 13.79,
        "last": 14.6
      },
      {
        "name": "C.J. Stroud",
        "espn": "4432577",
        "status": "BYE",
        "team_abbr": "HOU",
        "pos": "QB",
        "fpts": 170.22,
        "avg": 18.38,
        "last": 16.52
      }
    ],
    "ir": []
  },
  "puntos": {
    "starters": [
      {
        "name": "Jared Goff",
        "espn": "3046779",
        "status": null,
        "team_abbr": "DET",
        "pos": "QB",
        "fpts": 203.71,
        "avg": 22.17,
        "last": 18.02
      },
      {
        "name": "Bijan Robinson",
        "espn": "4430807",
        "status": null,
        "team_abbr": "ATL",
        "pos": "RB",
        "fpts": 184.31,
        "avg": 19.03,
        "last": 14.7
      },
      {
        "name": "Bucky Irving",
        "espn": "4596448",
        "status": null,
        "team_abbr": "TB",
        "pos": "RB",
        "fpts": 159.32,
        "avg": 14.37,
        "last": 23.5
      },
      {
        "name": "A.J. Brown",
        "espn": "4047646",
        "status": null,
        "team_abbr": "NE",
        "pos": "WR",
        "fpts": 128.58,
        "avg": 4.87,
        "last": 6.3
      },
      {
        "name": "Christian Watson",
        "espn": "4248528",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 124.41,
        "avg": 16.07,
        "last": 8.2
      },
      {
        "name": "Omar Cooper Jr.",
        "espn": "4723820",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 80.56,
        "avg": 14.27,
        "last": 20
      },
      {
        "name": "Sam LaPorta",
        "espn": "4430027",
        "status": null,
        "team_abbr": "DET",
        "pos": "TE",
        "fpts": 106.09,
        "avg": 10.9,
        "last": 2.3
      },
      {
        "name": "Kyren Williams",
        "espn": "4430737",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 150.55,
        "avg": 17.3,
        "last": 17.1
      },
      {
        "name": "Ashton Jeanty",
        "espn": "4890973",
        "status": null,
        "team_abbr": "LV",
        "pos": "RB",
        "fpts": 138.04,
        "avg": 15,
        "last": 17.6
      },
      {
        "name": "Matthew Stafford",
        "espn": "12483",
        "status": null,
        "team_abbr": "LAR",
        "pos": "QB",
        "fpts": 163.52,
        "avg": 17.62,
        "last": 17.5
      },
      {
        "name": "Broncos",
        "status": null,
        "team_abbr": "DEN",
        "pos": "D/ST",
        "fpts": 72.15,
        "avg": 7,
        "last": 3
      },
      {
        "name": "Cam Little",
        "espn": "4686361",
        "status": null,
        "team_abbr": "JAX",
        "pos": "K",
        "fpts": 97.67,
        "avg": 9.33,
        "last": 10
      }
    ],
    "bench": [
      {
        "name": "Brock Purdy",
        "espn": "4361741",
        "status": "BYE",
        "team_abbr": "SF",
        "pos": "QB",
        "fpts": 189.22,
        "avg": 20.86,
        "last": 12.02
      },
      {
        "name": "Travis Kelce",
        "espn": "15847",
        "status": null,
        "team_abbr": "KC",
        "pos": "TE",
        "fpts": 89.55,
        "avg": 9.72,
        "last": 6.4
      },
      {
        "name": "Matthew Golden",
        "espn": "4701936",
        "status": "Q",
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 131.17,
        "avg": 13.23,
        "last": 6.9
      },
      {
        "name": "Jalen Coker",
        "espn": "4695883",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 132.55,
        "avg": 11.46,
        "last": 1.4
      },
      {
        "name": "DK Metcalf",
        "espn": "4047650",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 108.04,
        "avg": 8.64,
        "last": 6.6
      },
      {
        "name": "Tre Tucker",
        "espn": "4428718",
        "status": null,
        "team_abbr": "LV",
        "pos": "WR",
        "fpts": 83.98,
        "avg": 12.19,
        "last": 18.8
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
        "fpts": 249.31,
        "avg": 26.79,
        "last": 18.3
      },
      {
        "name": "Jonathan Taylor",
        "espn": "4242335",
        "status": null,
        "team_abbr": "IND",
        "pos": "RB",
        "fpts": 169.46,
        "avg": 18.43,
        "last": 18
      },
      {
        "name": "Javonte Williams",
        "espn": "4361579",
        "status": null,
        "team_abbr": "DAL",
        "pos": "RB",
        "fpts": 160.43,
        "avg": 17.29,
        "last": 21.5
      },
      {
        "name": "Amon-Ra St. Brown",
        "espn": "4374302",
        "status": "Q",
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 177.55,
        "avg": 17.57,
        "last": 19.7
      },
      {
        "name": "Tetairoa McMillan",
        "espn": "4685472",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 143.5,
        "avg": 13.18,
        "last": 6
      },
      {
        "name": "Garrett Wilson",
        "espn": "4569618",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 103.42,
        "avg": 11.56,
        "last": 3.6
      },
      {
        "name": "Brock Bowers",
        "espn": "4432665",
        "status": null,
        "team_abbr": "LV",
        "pos": "TE",
        "fpts": 123.09,
        "avg": 15.7,
        "last": 10.3
      },
      {
        "name": "George Pickens",
        "espn": "4426354",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 109.49,
        "avg": 11.29,
        "last": 13.7
      },
      {
        "name": "Saquon Barkley",
        "espn": "3929630",
        "status": "Q",
        "team_abbr": "PHI",
        "pos": "RB",
        "fpts": 105.49,
        "avg": 7.02,
        "last": 14.1
      },
      {
        "name": "Jayden Daniels",
        "espn": "4426348",
        "status": null,
        "team_abbr": "WSH",
        "pos": "QB",
        "fpts": 236.12,
        "avg": 21.42,
        "last": 21
      },
      {
        "name": "Steelers",
        "status": null,
        "team_abbr": "PIT",
        "pos": "D/ST",
        "fpts": 73.88,
        "avg": 8.14,
        "last": 9
      },
      {
        "name": "Matt Gay",
        "espn": "4249087",
        "status": null,
        "team_abbr": "LV",
        "pos": "K",
        "fpts": 99.64,
        "avg": 10.14,
        "last": 8
      }
    ],
    "bench": [
      {
        "name": "Christian McCaffrey",
        "espn": "3117251",
        "status": "Q",
        "team_abbr": "SF",
        "pos": "RB",
        "fpts": 175.08,
        "avg": 18.14,
        "last": 19
      },
      {
        "name": "Nico Collins",
        "espn": "4258173",
        "status": "BYE",
        "team_abbr": "HOU",
        "pos": "WR",
        "fpts": 116.42,
        "avg": 12.82,
        "last": 1.6
      },
      {
        "name": "Chris Olave",
        "espn": "4361370",
        "status": "BYE",
        "team_abbr": "NO",
        "pos": "WR",
        "fpts": 117.09,
        "avg": 14.3,
        "last": 8.6
      },
      {
        "name": "Kyle Pitts Sr.",
        "espn": "4360248",
        "status": null,
        "team_abbr": "ATL",
        "pos": "TE",
        "fpts": 85.61,
        "avg": 7.59,
        "last": 10.7
      },
      {
        "name": "Cameron Dicker",
        "espn": "4362081",
        "status": null,
        "team_abbr": "LAC",
        "pos": "K",
        "fpts": 86.35,
        "avg": 6,
        "last": 6
      },
      {
        "name": "Bryce Young",
        "espn": "4685720",
        "status": null,
        "team_abbr": "CAR",
        "pos": "QB",
        "fpts": 192.64,
        "avg": 19.31,
        "last": 5.42
      }
    ],
    "ir": [
      {
        "name": "Jeremiyah Love",
        "espn": "4870808",
        "status": "Q",
        "team_abbr": "ARI",
        "pos": "RB",
        "fpts": 106.35,
        "avg": 9.12,
        "last": 0
      }
    ]
  }
};

window.FREE_AGENTS = [
  {
    "name": "Tyler Warren",
    "espn": "4431459",
    "status": "Q",
    "team_abbr": "IND",
    "pos": "TE",
    "fpts": 89.28,
    "avg": 10.98,
    "last": 0
  },
  {
    "name": "Isaiah Likely",
    "espn": "4361050",
    "status": "BYE",
    "team_abbr": "NYG",
    "pos": "TE",
    "fpts": 105.27,
    "avg": 13.14,
    "last": 2.2
  },
  {
    "name": "Colston Loveland",
    "espn": "4723086",
    "status": null,
    "team_abbr": "CHI",
    "pos": "TE",
    "fpts": 103.93,
    "avg": 7.06,
    "last": 16.4
  },
  {
    "name": "Emeka Egbuka",
    "espn": "4567750",
    "status": "Q",
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 107.8,
    "avg": 9.52,
    "last": 0
  },
  {
    "name": "Quinshon Judkins",
    "espn": "4685702",
    "status": null,
    "team_abbr": "CLE",
    "pos": "RB",
    "fpts": 127.1,
    "avg": 11.7,
    "last": 22.9
  },
  {
    "name": "Cam Skattebo",
    "espn": "4696981",
    "status": "Q",
    "team_abbr": "NYG",
    "pos": "RB",
    "fpts": 120.04,
    "avg": 9.27,
    "last": 18.6
  },
  {
    "name": "Josh Jacobs",
    "espn": "4047365",
    "status": null,
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 132.51,
    "avg": 17.6,
    "last": 17.6
  },
  {
    "name": "Luther Burden III",
    "espn": "4685278",
    "status": null,
    "team_abbr": "CHI",
    "pos": "WR",
    "fpts": 118.99,
    "avg": 11.36,
    "last": 21.7
  },
  {
    "name": "Jameson Williams",
    "espn": "4426388",
    "status": null,
    "team_abbr": "DET",
    "pos": "WR",
    "fpts": 113.34,
    "avg": 12.03,
    "last": 23.6
  },
  {
    "name": "Will Reichard",
    "espn": "4567104",
    "status": null,
    "team_abbr": "MIN",
    "pos": "K",
    "fpts": 122.31,
    "avg": 13.33,
    "last": 12
  },
  {
    "name": "DJ Moore",
    "espn": "3915416",
    "status": "Q",
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 121.83,
    "avg": 7.58,
    "last": 0
  },
  {
    "name": "Caleb Williams",
    "espn": "4431611",
    "status": null,
    "team_abbr": "CHI",
    "pos": "QB",
    "fpts": 184,
    "avg": 20.9,
    "last": 22.12
  },
  {
    "name": "Jaylen Waddle",
    "espn": "4372016",
    "status": "Q",
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 89.65,
    "avg": 7.27,
    "last": 6.8
  },
  {
    "name": "Carnell Tate",
    "espn": "4871023",
    "status": "Q",
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 96.14,
    "avg": 8.61,
    "last": 7.4
  },
  {
    "name": "Spencer Shrader",
    "espn": "4571557",
    "status": null,
    "team_abbr": "IND",
    "pos": "K",
    "fpts": 107.42,
    "avg": 12.43,
    "last": 3
  },
  {
    "name": "Ka'imi Fairbairn",
    "espn": "2971573",
    "status": "BYE",
    "team_abbr": "HOU",
    "pos": "K",
    "fpts": 95.78,
    "avg": 10.71,
    "last": 11
  },
  {
    "name": "Dallas Goedert",
    "espn": "3121023",
    "status": null,
    "team_abbr": "PHI",
    "pos": "TE",
    "fpts": 74.23,
    "avg": 9.16,
    "last": 7.3
  },
  {
    "name": "Rome Odunze",
    "espn": "4431299",
    "status": null,
    "team_abbr": "CHI",
    "pos": "WR",
    "fpts": 84.07,
    "avg": 6.87,
    "last": 8.9
  },
  {
    "name": "Ladd McConkey",
    "espn": "4612826",
    "status": "Q",
    "team_abbr": "LAC",
    "pos": "WR",
    "fpts": 97,
    "avg": 6.5,
    "last": 2.2
  },
  {
    "name": "Ollie Gordon II",
    "espn": "4711533",
    "status": null,
    "team_abbr": "MIA",
    "pos": "RB",
    "fpts": 153.08,
    "avg": 10.38,
    "last": 16.8
  },
  {
    "name": "Stefon Diggs",
    "espn": "2976212",
    "status": null,
    "team_abbr": "WSH",
    "pos": "WR",
    "fpts": 110.89,
    "avg": 11.48,
    "last": 13.4
  },
  {
    "name": "Braelon Allen",
    "espn": "4685247",
    "status": "Q",
    "team_abbr": "NYJ",
    "pos": "RB",
    "fpts": 78.2,
    "avg": 9.83,
    "last": 16.4
  },
  {
    "name": "David Montgomery",
    "espn": "4035538",
    "status": "Q",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 106.91,
    "avg": 8.4,
    "last": 0
  },
  {
    "name": "Travis Etienne Jr.",
    "espn": "4239996",
    "status": "IR",
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 116.23,
    "avg": 8.47,
    "last": 0
  },
  {
    "name": "J.K. Dobbins",
    "espn": "4241985",
    "status": null,
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 68.76,
    "avg": 7.71,
    "last": 8.3
  },
  {
    "name": "Texans",
    "status": "BYE",
    "team_abbr": "HOU",
    "pos": "D/ST",
    "fpts": 61.14,
    "avg": 4.14,
    "last": 0
  },
  {
    "name": "Dalton Kincaid",
    "espn": "4385690",
    "status": null,
    "team_abbr": "BUF",
    "pos": "TE",
    "fpts": 76.18,
    "avg": 8.17,
    "last": 7.3
  },
  {
    "name": "Kyle Monangai",
    "espn": "4608686",
    "status": "Q",
    "team_abbr": "CHI",
    "pos": "RB",
    "fpts": 95.9,
    "avg": 14.2,
    "last": 0
  },
  {
    "name": "RJ Harvey",
    "espn": "4568490",
    "status": null,
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 80.33,
    "avg": 9.15,
    "last": 13
  },
  {
    "name": "Xavier Worthy",
    "espn": "4683062",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 79.68,
    "avg": 6.62,
    "last": 2.6
  },
  {
    "name": "Woody Marks",
    "espn": "4429059",
    "status": "BYE",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 70.49,
    "avg": 7.93,
    "last": 8.6
  },
  {
    "name": "TreVeyon Henderson",
    "espn": "4432710",
    "status": null,
    "team_abbr": "NE",
    "pos": "RB",
    "fpts": 55.85,
    "avg": 5.22,
    "last": 3.3
  },
  {
    "name": "T.J. Hockenson",
    "espn": "4036133",
    "status": null,
    "team_abbr": "MIN",
    "pos": "TE",
    "fpts": 91.46,
    "avg": 8.2,
    "last": 11.5
  },
  {
    "name": "Deebo Samuel Sr.",
    "espn": "3126486",
    "status": "Q",
    "team_abbr": "SF",
    "pos": "WR",
    "fpts": 94.37,
    "avg": 10.48,
    "last": 0
  },
  {
    "name": "Marvin Harrison Jr.",
    "espn": "4432708",
    "status": "BYE",
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 59.72,
    "avg": 4.83,
    "last": 7.1
  },
  {
    "name": "Tyler Shough",
    "espn": "4360689",
    "status": "BYE",
    "team_abbr": "NO",
    "pos": "QB",
    "fpts": 158.46,
    "avg": 17.99,
    "last": 13.82
  },
  {
    "name": "Emanuel Wilson",
    "espn": "4887558",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 8.42,
    "avg": 10.26,
    "last": 18
  },
  {
    "name": "Zach Charbonnet",
    "espn": "4426385",
    "status": "Q",
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 135.58,
    "avg": null,
    "last": 0
  },
  {
    "name": "Jakobi Meyers",
    "espn": "3916433",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 100.77,
    "avg": 8.45,
    "last": 10.8
  },
  {
    "name": "Rachaad White",
    "espn": "4697815",
    "status": null,
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 114.16,
    "avg": 8.36,
    "last": 13.7
  },
  {
    "name": "Mark Andrews",
    "espn": "3116365",
    "status": null,
    "team_abbr": "BAL",
    "pos": "TE",
    "fpts": 71.57,
    "avg": 5.34,
    "last": 3.8
  },
  {
    "name": "Jordan Mason",
    "espn": "4360569",
    "status": null,
    "team_abbr": "MIN",
    "pos": "RB",
    "fpts": 96.16,
    "avg": 9.35,
    "last": 6.8
  },
  {
    "name": "Patriots",
    "status": null,
    "team_abbr": "NE",
    "pos": "D/ST",
    "fpts": 58.93,
    "avg": 6,
    "last": -1
  },
  {
    "name": "Jadarian Price",
    "espn": "4685512",
    "status": "IR",
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 87.25,
    "avg": 3,
    "last": 0
  },
  {
    "name": "Harrison Butker",
    "espn": "3055899",
    "status": null,
    "team_abbr": "KC",
    "pos": "K",
    "fpts": 105.91,
    "avg": 8.17,
    "last": 3
  },
  {
    "name": "Josh Downs",
    "espn": "4688813",
    "status": null,
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 57.21,
    "avg": 6.34,
    "last": 2.8
  },
  {
    "name": "Courtland Sutton",
    "espn": "3128429",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 78.18,
    "avg": 4.4,
    "last": 6
  },
  {
    "name": "Hunter Henry",
    "espn": "3046439",
    "status": null,
    "team_abbr": "NE",
    "pos": "TE",
    "fpts": 81.06,
    "avg": 7.8,
    "last": 10.6
  },
  {
    "name": "Devaughn Vele",
    "espn": "4569559",
    "status": "BYE",
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 67.59,
    "avg": 9.9,
    "last": 13.9
  },
  {
    "name": "Jaguars",
    "status": null,
    "team_abbr": "JAX",
    "pos": "D/ST",
    "fpts": 64.37,
    "avg": 5.67,
    "last": -2
  },
  {
    "name": "Rico Dowdle",
    "espn": "4038815",
    "status": null,
    "team_abbr": "PIT",
    "pos": "RB",
    "fpts": 80.97,
    "avg": 6.63,
    "last": 11.6
  },
  {
    "name": "Chiefs",
    "status": null,
    "team_abbr": "KC",
    "pos": "D/ST",
    "fpts": 61.52,
    "avg": 6,
    "last": -1
  },
  {
    "name": "Alvin Kamara",
    "espn": "3054850",
    "status": "BYE",
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 75.81,
    "avg": 9.13,
    "last": 9.7
  },
  {
    "name": "Kyler Murray",
    "espn": "3917315",
    "status": null,
    "team_abbr": "MIN",
    "pos": "QB",
    "fpts": 179.29,
    "avg": 10.74,
    "last": 13.9
  },
  {
    "name": "Tyler Loop",
    "espn": "4697745",
    "status": null,
    "team_abbr": "BAL",
    "pos": "K",
    "fpts": 84.21,
    "avg": 9,
    "last": 7
  },
  {
    "name": "Juwan Johnson",
    "espn": "3929645",
    "status": "BYE",
    "team_abbr": "NO",
    "pos": "TE",
    "fpts": 59.58,
    "avg": 7.79,
    "last": 1.2
  },
  {
    "name": "Kirk Cousins",
    "espn": "14880",
    "status": null,
    "team_abbr": "LV",
    "pos": "QB",
    "fpts": 45.4,
    "avg": 18.78,
    "last": 20.4
  },
  {
    "name": "Khalil Shakir",
    "espn": "4373678",
    "status": null,
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 80.88,
    "avg": 7.33,
    "last": 11.4
  },
  {
    "name": "Wan'Dale Robinson",
    "espn": "4569587",
    "status": null,
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 69.22,
    "avg": 6.73,
    "last": 2.7
  },
  {
    "name": "Browns",
    "status": null,
    "team_abbr": "CLE",
    "pos": "D/ST",
    "fpts": 65.93,
    "avg": 6,
    "last": 5
  },
  {
    "name": "Chris Godwin Jr.",
    "espn": "3116165",
    "status": null,
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 70.32,
    "avg": 5.66,
    "last": 4.7
  },
  {
    "name": "KC Concepcion",
    "espn": "4870653",
    "status": null,
    "team_abbr": "CLE",
    "pos": "WR",
    "fpts": 88.32,
    "avg": 6.84,
    "last": 19.2
  },
  {
    "name": "Pat Freiermuth",
    "espn": "4361411",
    "status": null,
    "team_abbr": "PIT",
    "pos": "TE",
    "fpts": 72.94,
    "avg": 7.99,
    "last": 3
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
    "name": "Eddy Pineiro",
    "espn": "4034949",
    "status": "BYE",
    "team_abbr": "SF",
    "pos": "K",
    "fpts": 75.71,
    "avg": 5.86,
    "last": 2
  },
  {
    "name": "Tyler Allgeier",
    "espn": "4373626",
    "status": null,
    "team_abbr": "ARI",
    "pos": "RB",
    "fpts": 60.17,
    "avg": 5.71,
    "last": 6.4
  },
  {
    "name": "Kenny Gainwell",
    "espn": "4371733",
    "status": null,
    "team_abbr": "TB",
    "pos": "RB",
    "fpts": 67.31,
    "avg": 4.71,
    "last": 8.8
  },
  {
    "name": "Alec Pierce",
    "espn": "4360078",
    "status": "IR",
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 62.34,
    "avg": 4.85,
    "last": 0
  },
  {
    "name": "Jake Ferguson",
    "espn": "4242355",
    "status": null,
    "team_abbr": "DAL",
    "pos": "TE",
    "fpts": 41.96,
    "avg": 5.14,
    "last": 0
  },
  {
    "name": "Aaron Rodgers",
    "espn": "8439",
    "status": null,
    "team_abbr": "PIT",
    "pos": "QB",
    "fpts": 158.91,
    "avg": 16.04,
    "last": 13.08
  },
  {
    "name": "Terry McLaurin",
    "espn": "3121422",
    "status": "IR",
    "team_abbr": "WSH",
    "pos": "WR",
    "fpts": 0,
    "avg": 7.7,
    "last": 3.2
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
    "name": "Jets",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "D/ST",
    "fpts": 54.76,
    "avg": 5.71,
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
    "name": "Bengals",
    "status": null,
    "team_abbr": "CIN",
    "pos": "D/ST",
    "fpts": 57.34,
    "avg": 8,
    "last": 8
  },
  {
    "name": "DeMario Douglas",
    "espn": "4427095",
    "status": null,
    "team_abbr": "NE",
    "pos": "WR",
    "fpts": 84,
    "avg": 7.59,
    "last": 3.8
  },
  {
    "name": "Brenton Strange",
    "espn": "4430539",
    "status": null,
    "team_abbr": "JAX",
    "pos": "TE",
    "fpts": 87.71,
    "avg": 7.82,
    "last": 6.9
  },
  {
    "name": "Brian Thomas Jr.",
    "espn": "4432773",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 51.67,
    "avg": 3.5,
    "last": 0
  },
  {
    "name": "Keenan Allen",
    "espn": "15818",
    "status": null,
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 58.73,
    "avg": 7.72,
    "last": 4.6
  },
  {
    "name": "Jake Bates",
    "espn": "4689936",
    "status": null,
    "team_abbr": "DET",
    "pos": "K",
    "fpts": 98.71,
    "avg": 9.67,
    "last": 9
  },
  {
    "name": "MarShawn Lloyd",
    "espn": "4429023",
    "status": null,
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 41.73,
    "avg": 6.17,
    "last": 4.5
  },
  {
    "name": "Dameon Pierce",
    "espn": "4360238",
    "status": "Q",
    "team_abbr": "PHI",
    "pos": "RB",
    "fpts": 79.24,
    "avg": 8.83,
    "last": 11.3
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
    "name": "Eagles",
    "status": null,
    "team_abbr": "PHI",
    "pos": "D/ST",
    "fpts": 44.94,
    "avg": 0.86,
    "last": -6
  },
  {
    "name": "Makai Lemon",
    "espn": "4870795",
    "status": null,
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 46.57,
    "avg": 5.34,
    "last": 16.2
  },
  {
    "name": "Tyler Bass",
    "espn": "3917232",
    "status": null,
    "team_abbr": "BUF",
    "pos": "K",
    "fpts": 110.65,
    "avg": 10.33,
    "last": 17
  },
  {
    "name": "Malik Washington",
    "espn": "4569603",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 93.52,
    "avg": 7.28,
    "last": 5
  },
  {
    "name": "Jonah Coleman",
    "espn": "4702555",
    "status": null,
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 80.36,
    "avg": 7.07,
    "last": 7.9
  },
  {
    "name": "Justin Herbert",
    "espn": "4038941",
    "status": null,
    "team_abbr": "LAC",
    "pos": "QB",
    "fpts": 137.09,
    "avg": 10.41,
    "last": 8.76
  },
  {
    "name": "Dominic Zvada",
    "espn": "5082424",
    "status": "BYE",
    "team_abbr": "NYG",
    "pos": "K",
    "fpts": 105.75,
    "avg": 8.14,
    "last": 1
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
    "name": "Jordyn Tyson",
    "espn": "4880281",
    "status": "IR",
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 59.72,
    "avg": null,
    "last": 0
  },
  {
    "name": "Kendre Miller",
    "espn": "4599739",
    "status": "BYE",
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 0,
    "avg": 5.68,
    "last": 4.3
  },
  {
    "name": "Chase McLaughlin",
    "espn": "3150744",
    "status": null,
    "team_abbr": "TB",
    "pos": "K",
    "fpts": 93.14,
    "avg": 11,
    "last": 12
  },
  {
    "name": "Brian Robinson Jr.",
    "espn": "4241474",
    "status": "Q",
    "team_abbr": "ATL",
    "pos": "RB",
    "fpts": 58.41,
    "avg": 8.43,
    "last": 0
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
    "fpts": 142.64,
    "avg": 12.47,
    "last": 13.98
  },
  {
    "name": "Tank Dell",
    "espn": "4366031",
    "status": "BYE",
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 19.53,
    "avg": 5,
    "last": 5
  },
  {
    "name": "Travis Hunter",
    "espn": "4685415",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 22.88,
    "avg": 2.82,
    "last": 13.9
  },
  {
    "name": "Dalton Schultz",
    "espn": "3117256",
    "status": "BYE",
    "team_abbr": "HOU",
    "pos": "TE",
    "fpts": 65.37,
    "avg": 6.96,
    "last": 7
  }
];
