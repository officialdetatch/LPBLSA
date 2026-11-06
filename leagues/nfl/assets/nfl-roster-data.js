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
        "fpts": 214.31,
        "avg": 18.4,
        "last": 13.58
      },
      {
        "name": "Jahmyr Gibbs",
        "espn": "4429795",
        "status": null,
        "team_abbr": "DET",
        "pos": "RB",
        "fpts": 224.21,
        "avg": 25.54,
        "last": 23.8
      },
      {
        "name": "D'Andre Swift",
        "espn": "4259545",
        "status": null,
        "team_abbr": "CHI",
        "pos": "RB",
        "fpts": 149.03,
        "avg": 17.34,
        "last": 26.9
      },
      {
        "name": "Puka Nacua",
        "espn": "4426515",
        "status": null,
        "team_abbr": "LAR",
        "pos": "WR",
        "fpts": 170.95,
        "avg": 18.43,
        "last": 19.5
      },
      {
        "name": "CeeDee Lamb",
        "espn": "4241389",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 148.45,
        "avg": 17.29,
        "last": 9.3
      },
      {
        "name": "Parker Washington",
        "espn": "4432620",
        "status": null,
        "team_abbr": "JAX",
        "pos": "WR",
        "fpts": 115.2,
        "avg": 11.89,
        "last": 13.1
      },
      {
        "name": "Trey McBride",
        "espn": "4361307",
        "status": null,
        "team_abbr": "ARI",
        "pos": "TE",
        "fpts": 111.4,
        "avg": 14.68,
        "last": 16.7
      },
      {
        "name": "James Cook III",
        "espn": "4379399",
        "status": null,
        "team_abbr": "BUF",
        "pos": "RB",
        "fpts": 186,
        "avg": 17.96,
        "last": 17.1
      },
      {
        "name": "Justin Jefferson",
        "espn": "4262921",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 138.95,
        "avg": 12.07,
        "last": 11.8
      },
      {
        "name": "Joe Burrow",
        "espn": "3915511",
        "status": null,
        "team_abbr": "CIN",
        "pos": "QB",
        "fpts": 215.16,
        "avg": 24.23,
        "last": 39.48
      },
      {
        "name": "Rams",
        "status": null,
        "team_abbr": "LAR",
        "pos": "D/ST",
        "fpts": 63.02,
        "avg": 4.63,
        "last": 11
      },
      {
        "name": "Brandon Aubrey",
        "espn": "3953687",
        "status": null,
        "team_abbr": "DAL",
        "pos": "K",
        "fpts": 93.37,
        "avg": 8.88,
        "last": 12
      }
    ],
    "bench": [
      {
        "name": "Aaron Jones Sr.",
        "espn": "3042519",
        "status": null,
        "team_abbr": "MIN",
        "pos": "RB",
        "fpts": 70.56,
        "avg": 10.33,
        "last": 5
      },
      {
        "name": "Blake Corum",
        "espn": "4429096",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 79.36,
        "avg": 9.73,
        "last": 13.3
      },
      {
        "name": "Jordan Addison",
        "espn": "4429205",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 85.16,
        "avg": 6.85,
        "last": 10.1
      },
      {
        "name": "Michael Wilson",
        "espn": "4360761",
        "status": "Q",
        "team_abbr": "ARI",
        "pos": "WR",
        "fpts": 111.36,
        "avg": 10.77,
        "last": 22.8
      },
      {
        "name": "Germie Bernard",
        "espn": "4685261",
        "status": "BYE",
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 80.92,
        "avg": 6.35,
        "last": 5.5
      },
      {
        "name": "Jordan Love",
        "espn": "4036378",
        "status": null,
        "team_abbr": "GB",
        "pos": "QB",
        "fpts": 160.48,
        "avg": 18.61,
        "last": 21.52
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
        "fpts": 174.05,
        "avg": 20.29,
        "last": 9.04
      },
      {
        "name": "Derrick Henry",
        "espn": "3043078",
        "status": null,
        "team_abbr": "BAL",
        "pos": "RB",
        "fpts": 125.34,
        "avg": 15.14,
        "last": 5.58
      },
      {
        "name": "Bucky Irving",
        "espn": "4596448",
        "status": null,
        "team_abbr": "TB",
        "pos": "RB",
        "fpts": 146.86,
        "avg": 15.2,
        "last": 21
      },
      {
        "name": "Ja'Marr Chase",
        "espn": "4362628",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 188.21,
        "avg": 15.24,
        "last": 25.6
      },
      {
        "name": "Denzel Boston",
        "espn": "4832800",
        "status": "Q",
        "team_abbr": "CLE",
        "pos": "WR",
        "fpts": 92.06,
        "avg": 9.24,
        "last": 6.7
      },
      {
        "name": "DK Metcalf",
        "espn": "4047650",
        "status": "BYE",
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 99.68,
        "avg": 7.68,
        "last": 0.9
      },
      {
        "name": "Harold Fannin Jr.",
        "espn": "5083076",
        "status": "Q",
        "team_abbr": "CLE",
        "pos": "TE",
        "fpts": 78.64,
        "avg": 9.07,
        "last": 18.4
      },
      {
        "name": "Kenneth Walker III",
        "espn": "4567048",
        "status": null,
        "team_abbr": "KC",
        "pos": "RB",
        "fpts": 208.11,
        "avg": 21.3,
        "last": 10.4
      },
      {
        "name": "Tony Pollard",
        "espn": "3916148",
        "status": "BYE",
        "team_abbr": "TEN",
        "pos": "RB",
        "fpts": 136.65,
        "avg": 13.69,
        "last": 27.2
      },
      {
        "name": "Patrick Mahomes",
        "espn": "3139477",
        "status": null,
        "team_abbr": "KC",
        "pos": "QB",
        "fpts": 175.11,
        "avg": 17.93,
        "last": 25.44
      },
      {
        "name": "Seahawks",
        "status": null,
        "team_abbr": "SEA",
        "pos": "D/ST",
        "fpts": 64.81,
        "avg": 8.38,
        "last": 1
      },
      {
        "name": "Jason Myers",
        "espn": "2473037",
        "status": null,
        "team_abbr": "SEA",
        "pos": "K",
        "fpts": 85.51,
        "avg": 8.63,
        "last": 2
      }
    ],
    "bench": [
      {
        "name": "Rashee Rice",
        "espn": "4428331",
        "status": null,
        "team_abbr": "KC",
        "pos": "WR",
        "fpts": 110.21,
        "avg": 9.26,
        "last": 14.8
      },
      {
        "name": "George Kittle",
        "espn": "3040151",
        "status": null,
        "team_abbr": "SF",
        "pos": "TE",
        "fpts": 121.97,
        "avg": 12.5,
        "last": 10.8
      },
      {
        "name": "Ravens",
        "status": null,
        "team_abbr": "BAL",
        "pos": "D/ST",
        "fpts": 52.03,
        "avg": 3.67,
        "last": 1
      },
      {
        "name": "Breece Hall",
        "espn": "4427366",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "RB",
        "fpts": 97.74,
        "avg": 12.5,
        "last": 0
      },
      {
        "name": "Dak Prescott",
        "espn": "2577417",
        "status": null,
        "team_abbr": "DAL",
        "pos": "QB",
        "fpts": 159.3,
        "avg": 18.49,
        "last": 19.8
      },
      {
        "name": "Mike Evans",
        "espn": "16737",
        "status": "Q",
        "team_abbr": "SF",
        "pos": "WR",
        "fpts": 108.11,
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
        "fpts": 147.63,
        "avg": 14.39,
        "last": 19.28
      },
      {
        "name": "Chuba Hubbard",
        "espn": "4241416",
        "status": null,
        "team_abbr": "CAR",
        "pos": "RB",
        "fpts": 168.29,
        "avg": 17.43,
        "last": 21.4
      },
      {
        "name": "Jonah Coleman",
        "espn": "4702555",
        "status": null,
        "team_abbr": "DEN",
        "pos": "RB",
        "fpts": 120.43,
        "avg": 9.9,
        "last": 18.4
      },
      {
        "name": "Jaxon Smith-Njigba",
        "espn": "4430878",
        "status": null,
        "team_abbr": "SEA",
        "pos": "WR",
        "fpts": 162.42,
        "avg": 23.5,
        "last": 20.8
      },
      {
        "name": "Drake London",
        "espn": "4426502",
        "status": null,
        "team_abbr": "ATL",
        "pos": "WR",
        "fpts": 125.33,
        "avg": 11.29,
        "last": 1.3
      },
      {
        "name": "Tee Higgins",
        "espn": "4239993",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 138.13,
        "avg": 16.87,
        "last": 32.5
      },
      {
        "name": "T.J. Hockenson",
        "espn": "4036133",
        "status": null,
        "team_abbr": "MIN",
        "pos": "TE",
        "fpts": 78.61,
        "avg": 9,
        "last": 13.8
      },
      {
        "name": "Chase Brown",
        "espn": "4362238",
        "status": null,
        "team_abbr": "CIN",
        "pos": "RB",
        "fpts": 138.94,
        "avg": 10.41,
        "last": 12.1
      },
      {
        "name": "Malik Nabers",
        "espn": "4595348",
        "status": "Q",
        "team_abbr": "NYG",
        "pos": "WR",
        "fpts": 144.42,
        "avg": 13.79,
        "last": 14.6
      },
      {
        "name": "C.J. Stroud",
        "espn": "4432577",
        "status": null,
        "team_abbr": "HOU",
        "pos": "QB",
        "fpts": 172.33,
        "avg": 18.38,
        "last": 16.52
      },
      {
        "name": "Vikings",
        "status": null,
        "team_abbr": "MIN",
        "pos": "D/ST",
        "fpts": 54.25,
        "avg": 11.29,
        "last": 5
      },
      {
        "name": "Spencer Shrader",
        "espn": "4571557",
        "status": null,
        "team_abbr": "IND",
        "pos": "K",
        "fpts": 92.09,
        "avg": 11,
        "last": 1
      }
    ],
    "bench": [
      {
        "name": "49ers",
        "status": null,
        "team_abbr": "SF",
        "pos": "D/ST",
        "fpts": 67.31,
        "avg": 7,
        "last": 1
      },
      {
        "name": "Rhamondre Stevenson",
        "espn": "4569173",
        "status": null,
        "team_abbr": "NE",
        "pos": "RB",
        "fpts": 102.31,
        "avg": 10.93,
        "last": 10.5
      },
      {
        "name": "Jaylen Warren",
        "espn": "4569987",
        "status": "BYE",
        "team_abbr": "PIT",
        "pos": "RB",
        "fpts": 126.88,
        "avg": 16.04,
        "last": 20.8
      },
      {
        "name": "Jalen Coker",
        "espn": "4695883",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 100.78,
        "avg": 10.98,
        "last": 8.6
      },
      {
        "name": "Greg Dulcich",
        "espn": "4367209",
        "status": null,
        "team_abbr": "MIA",
        "pos": "TE",
        "fpts": 67.2,
        "avg": 5.51,
        "last": 6.3
      },
      {
        "name": "Ashton Jeanty",
        "espn": "4890973",
        "status": null,
        "team_abbr": "LV",
        "pos": "RB",
        "fpts": 116.83,
        "avg": 14.23,
        "last": 8.8
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
        "fpts": 194.34,
        "avg": 20.12,
        "last": 22.46
      },
      {
        "name": "Bijan Robinson",
        "espn": "4430807",
        "status": null,
        "team_abbr": "ATL",
        "pos": "RB",
        "fpts": 152.63,
        "avg": 17.6,
        "last": 7.6
      },
      {
        "name": "Kyren Williams",
        "espn": "4430737",
        "status": null,
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 130.83,
        "avg": 16.69,
        "last": 12.4
      },
      {
        "name": "Matthew Golden",
        "espn": "4701936",
        "status": null,
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 131.61,
        "avg": 13.75,
        "last": 17.4
      },
      {
        "name": "Luther Burden III",
        "espn": "4685278",
        "status": null,
        "team_abbr": "CHI",
        "pos": "WR",
        "fpts": 111.12,
        "avg": 11.83,
        "last": 15.1
      },
      {
        "name": "Stefon Diggs",
        "espn": "2976212",
        "status": null,
        "team_abbr": "WSH",
        "pos": "WR",
        "fpts": 103.59,
        "avg": 11.45,
        "last": 11.3
      },
      {
        "name": "Sam LaPorta",
        "espn": "4430027",
        "status": null,
        "team_abbr": "DET",
        "pos": "TE",
        "fpts": 91.7,
        "avg": 10.06,
        "last": 5
      },
      {
        "name": "Christian Watson",
        "espn": "4248528",
        "status": "Q",
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 116.85,
        "avg": 15.73,
        "last": 13.3
      },
      {
        "name": "Ollie Gordon II",
        "espn": "4711533",
        "status": null,
        "team_abbr": "MIA",
        "pos": "RB",
        "fpts": 142.58,
        "avg": 9.89,
        "last": 6.9
      },
      {
        "name": "Brock Purdy",
        "espn": "4361741",
        "status": null,
        "team_abbr": "SF",
        "pos": "QB",
        "fpts": 190.7,
        "avg": 20.86,
        "last": 12.02
      },
      {
        "name": "Jaguars",
        "status": null,
        "team_abbr": "JAX",
        "pos": "D/ST",
        "fpts": 64.42,
        "avg": 8.38,
        "last": 12
      },
      {
        "name": "Cam Little",
        "espn": "4686361",
        "status": null,
        "team_abbr": "JAX",
        "pos": "K",
        "fpts": 85.05,
        "avg": 9.88,
        "last": 17
      }
    ],
    "bench": [
      {
        "name": "Travis Kelce",
        "espn": "15847",
        "status": null,
        "team_abbr": "KC",
        "pos": "TE",
        "fpts": 85.45,
        "avg": 9.64,
        "last": 9.2
      },
      {
        "name": "Omar Cooper Jr.",
        "espn": "4723820",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 73.19,
        "avg": 10.7,
        "last": 0
      },
      {
        "name": "Zay Flowers",
        "espn": "4429615",
        "status": null,
        "team_abbr": "BAL",
        "pos": "WR",
        "fpts": 91.25,
        "avg": 13.25,
        "last": 3.8
      },
      {
        "name": "DeMario Douglas",
        "espn": "4427095",
        "status": null,
        "team_abbr": "NE",
        "pos": "WR",
        "fpts": 71.78,
        "avg": 8.53,
        "last": 15.1
      },
      {
        "name": "Caleb Williams",
        "espn": "4431611",
        "status": null,
        "team_abbr": "CHI",
        "pos": "QB",
        "fpts": 170.15,
        "avg": 19.52,
        "last": 13.98
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
        "fpts": 213.89,
        "avg": 20.13,
        "last": 14.98
      },
      {
        "name": "Jonathan Taylor",
        "espn": "4242335",
        "status": null,
        "team_abbr": "IND",
        "pos": "RB",
        "fpts": 142.42,
        "avg": 16.71,
        "last": 4.7
      },
      {
        "name": "Javonte Williams",
        "espn": "4361579",
        "status": null,
        "team_abbr": "DAL",
        "pos": "RB",
        "fpts": 130.73,
        "avg": 15.9,
        "last": 6.2
      },
      {
        "name": "Amon-Ra St. Brown",
        "espn": "4374302",
        "status": "Q",
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 155.69,
        "avg": 16.36,
        "last": 9.1
      },
      {
        "name": "Nico Collins",
        "espn": "4258173",
        "status": null,
        "team_abbr": "HOU",
        "pos": "WR",
        "fpts": 117.13,
        "avg": 12.82,
        "last": 1.6
      },
      {
        "name": "Chris Olave",
        "espn": "4361370",
        "status": null,
        "team_abbr": "NO",
        "pos": "WR",
        "fpts": 117.1,
        "avg": 14.3,
        "last": 8.6
      },
      {
        "name": "Brock Bowers",
        "espn": "4432665",
        "status": null,
        "team_abbr": "LV",
        "pos": "TE",
        "fpts": 129.11,
        "avg": 17.2,
        "last": 24.7
      },
      {
        "name": "Christian McCaffrey",
        "espn": "3117251",
        "status": "Q",
        "team_abbr": "SF",
        "pos": "RB",
        "fpts": 175.53,
        "avg": 18.14,
        "last": 19
      },
      {
        "name": "Saquon Barkley",
        "espn": "3929630",
        "status": "Q",
        "team_abbr": "PHI",
        "pos": "RB",
        "fpts": 124.8,
        "avg": 7.83,
        "last": 11.9
      },
      {
        "name": "Josh Allen",
        "espn": "3918298",
        "status": null,
        "team_abbr": "BUF",
        "pos": "QB",
        "fpts": 234.46,
        "avg": 26.76,
        "last": 26.56
      },
      {
        "name": "Steelers",
        "status": "BYE",
        "team_abbr": "PIT",
        "pos": "D/ST",
        "fpts": 70.97,
        "avg": 9.13,
        "last": 16
      },
      {
        "name": "Matt Gay",
        "espn": "4249087",
        "status": null,
        "team_abbr": "LV",
        "pos": "K",
        "fpts": 87.97,
        "avg": 10.13,
        "last": 10
      }
    ],
    "bench": [
      {
        "name": "George Pickens",
        "espn": "4426354",
        "status": "Q",
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 95.33,
        "avg": 10.6,
        "last": 5.8
      },
      {
        "name": "Kyle Pitts Sr.",
        "espn": "4360248",
        "status": null,
        "team_abbr": "ATL",
        "pos": "TE",
        "fpts": 72.14,
        "avg": 6.84,
        "last": 1.6
      },
      {
        "name": "Tetairoa McMillan",
        "espn": "4685472",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 123.55,
        "avg": 12.56,
        "last": 8.8
      },
      {
        "name": "Garrett Wilson",
        "espn": "4569618",
        "status": "OUT",
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 86.61,
        "avg": 11.53,
        "last": 11.3
      },
      {
        "name": "Cameron Dicker",
        "espn": "4362081",
        "status": null,
        "team_abbr": "LAC",
        "pos": "K",
        "fpts": 83.75,
        "avg": 6.71,
        "last": 11
      },
      {
        "name": "Bryce Young",
        "espn": "4685720",
        "status": null,
        "team_abbr": "CAR",
        "pos": "QB",
        "fpts": 163.5,
        "avg": 18.03,
        "last": 10.36
      }
    ],
    "ir": [
      {
        "name": "Jeremiyah Love",
        "espn": "4870808",
        "status": "IR",
        "team_abbr": "ARI",
        "pos": "RB",
        "fpts": 48.1,
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
    "fpts": 77.77,
    "avg": 9.78,
    "last": 3.8
  },
  {
    "name": "Colston Loveland",
    "espn": "4723086",
    "status": null,
    "team_abbr": "CHI",
    "pos": "TE",
    "fpts": 95.77,
    "avg": 7.18,
    "last": 8
  },
  {
    "name": "DeVonta Smith",
    "espn": "4241478",
    "status": "Q",
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 84.93,
    "avg": 14,
    "last": 0
  },
  {
    "name": "Isaiah Likely",
    "espn": "4361050",
    "status": null,
    "team_abbr": "NYG",
    "pos": "TE",
    "fpts": 105.79,
    "avg": 13.14,
    "last": 2.2
  },
  {
    "name": "Josh Jacobs",
    "espn": "4047365",
    "status": null,
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 141.08,
    "avg": 18.9,
    "last": 20.2
  },
  {
    "name": "Bhayshul Tuten",
    "espn": "4882093",
    "status": null,
    "team_abbr": "JAX",
    "pos": "RB",
    "fpts": 150.42,
    "avg": 14.96,
    "last": 8.9
  },
  {
    "name": "Quinshon Judkins",
    "espn": "4685702",
    "status": null,
    "team_abbr": "CLE",
    "pos": "RB",
    "fpts": 110.27,
    "avg": 10.87,
    "last": 5.9
  },
  {
    "name": "A.J. Brown",
    "espn": "4047646",
    "status": "OUT",
    "team_abbr": "NE",
    "pos": "WR",
    "fpts": 91.8,
    "avg": 4.87,
    "last": 0
  },
  {
    "name": "Emeka Egbuka",
    "espn": "4567750",
    "status": "Q",
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 87.38,
    "avg": 9.52,
    "last": 0
  },
  {
    "name": "Jameson Williams",
    "espn": "4426388",
    "status": null,
    "team_abbr": "DET",
    "pos": "WR",
    "fpts": 110.16,
    "avg": 12.46,
    "last": 15
  },
  {
    "name": "Cam Skattebo",
    "espn": "4696981",
    "status": "Q",
    "team_abbr": "NYG",
    "pos": "RB",
    "fpts": 109.88,
    "avg": 9.27,
    "last": 18.6
  },
  {
    "name": "Tucker Kraft",
    "espn": "4572680",
    "status": null,
    "team_abbr": "GB",
    "pos": "TE",
    "fpts": 75.86,
    "avg": 8.88,
    "last": 14.3
  },
  {
    "name": "Will Reichard",
    "espn": "4567104",
    "status": null,
    "team_abbr": "MIN",
    "pos": "K",
    "fpts": 102.3,
    "avg": 11.43,
    "last": 0
  },
  {
    "name": "DJ Moore",
    "espn": "3915416",
    "status": "Q",
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 118.11,
    "avg": 8.98,
    "last": 14.6
  },
  {
    "name": "Matthew Stafford",
    "espn": "12483",
    "status": null,
    "team_abbr": "LAR",
    "pos": "QB",
    "fpts": 141.22,
    "avg": 16.45,
    "last": 8.28
  },
  {
    "name": "Texans",
    "status": null,
    "team_abbr": "HOU",
    "pos": "D/ST",
    "fpts": 56.79,
    "avg": 4.14,
    "last": 0
  },
  {
    "name": "Jaylen Waddle",
    "espn": "4372016",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 86.01,
    "avg": 8.04,
    "last": 13.4
  },
  {
    "name": "Broncos",
    "status": null,
    "team_abbr": "DEN",
    "pos": "D/ST",
    "fpts": 63.39,
    "avg": 6.25,
    "last": 1
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
    "name": "Ladd McConkey",
    "espn": "4612826",
    "status": null,
    "team_abbr": "LAC",
    "pos": "WR",
    "fpts": 84.05,
    "avg": 7.18,
    "last": 10.6
  },
  {
    "name": "Omarion Hampton",
    "espn": "4685382",
    "status": null,
    "team_abbr": "LAC",
    "pos": "RB",
    "fpts": 72.88,
    "avg": 8.1,
    "last": 3.7
  },
  {
    "name": "Rome Odunze",
    "espn": "4431299",
    "status": null,
    "team_abbr": "CHI",
    "pos": "WR",
    "fpts": 82.36,
    "avg": 7.35,
    "last": 10.7
  },
  {
    "name": "Carnell Tate",
    "espn": "4871023",
    "status": "OUT",
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 92.42,
    "avg": 8.61,
    "last": 0
  },
  {
    "name": "Braelon Allen",
    "espn": "4685247",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "RB",
    "fpts": 84.13,
    "avg": 11.39,
    "last": 22.3
  },
  {
    "name": "Ka'imi Fairbairn",
    "espn": "2971573",
    "status": null,
    "team_abbr": "HOU",
    "pos": "K",
    "fpts": 100.58,
    "avg": 10.71,
    "last": 11
  },
  {
    "name": "Travis Etienne Jr.",
    "espn": "4239996",
    "status": "IR",
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 101.6,
    "avg": 8.47,
    "last": 0
  },
  {
    "name": "Dallas Goedert",
    "espn": "3121023",
    "status": null,
    "team_abbr": "PHI",
    "pos": "TE",
    "fpts": 57.29,
    "avg": 8.5,
    "last": 5.2
  },
  {
    "name": "David Montgomery",
    "espn": "4035538",
    "status": "OUT",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 88.62,
    "avg": 8.4,
    "last": 0
  },
  {
    "name": "Rachaad White",
    "espn": "4697815",
    "status": null,
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 115.04,
    "avg": 9.13,
    "last": 13
  },
  {
    "name": "Woody Marks",
    "espn": "4429059",
    "status": null,
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 83.7,
    "avg": 7.93,
    "last": 8.6
  },
  {
    "name": "Dalton Kincaid",
    "espn": "4385690",
    "status": "Q",
    "team_abbr": "BUF",
    "pos": "TE",
    "fpts": 77.44,
    "avg": 9.37,
    "last": 16.6
  },
  {
    "name": "Tyler Bass",
    "espn": "3917232",
    "status": null,
    "team_abbr": "BUF",
    "pos": "K",
    "fpts": 114.04,
    "avg": 11.14,
    "last": 16
  },
  {
    "name": "Deebo Samuel Sr.",
    "espn": "3126486",
    "status": "Q",
    "team_abbr": "SF",
    "pos": "WR",
    "fpts": 83.9,
    "avg": 10.48,
    "last": 0
  },
  {
    "name": "Kyle Monangai",
    "espn": "4608686",
    "status": "Q",
    "team_abbr": "CHI",
    "pos": "RB",
    "fpts": 70.92,
    "avg": 14.2,
    "last": 0
  },
  {
    "name": "Jadarian Price",
    "espn": "4685512",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 84.76,
    "avg": 3.34,
    "last": 4.7
  },
  {
    "name": "Zach Charbonnet",
    "espn": "4426385",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 84.14,
    "avg": 4.4,
    "last": 4.4
  },
  {
    "name": "J.K. Dobbins",
    "espn": "4241985",
    "status": null,
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 70.43,
    "avg": 6.91,
    "last": 1.3
  },
  {
    "name": "Jakobi Meyers",
    "espn": "3916433",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 94.82,
    "avg": 7.82,
    "last": 8.5
  },
  {
    "name": "Tre Tucker",
    "espn": "4428718",
    "status": null,
    "team_abbr": "LV",
    "pos": "WR",
    "fpts": 66.96,
    "avg": 10.66,
    "last": 0
  },
  {
    "name": "Xavier Worthy",
    "espn": "4683062",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 75.39,
    "avg": 6.07,
    "last": 2.8
  },
  {
    "name": "Tyler Allgeier",
    "espn": "4373626",
    "status": null,
    "team_abbr": "ARI",
    "pos": "RB",
    "fpts": 80.53,
    "avg": 9.2,
    "last": 33.6
  },
  {
    "name": "Tyler Shough",
    "espn": "4360689",
    "status": null,
    "team_abbr": "NO",
    "pos": "QB",
    "fpts": 156.36,
    "avg": 17.99,
    "last": 13.82
  },
  {
    "name": "Marvin Harrison Jr.",
    "espn": "4432708",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 60.54,
    "avg": 4.83,
    "last": 7.1
  },
  {
    "name": "Rico Dowdle",
    "espn": "4038815",
    "status": "BYE",
    "team_abbr": "PIT",
    "pos": "RB",
    "fpts": 76,
    "avg": 7.62,
    "last": 11.6
  },
  {
    "name": "TreVeyon Henderson",
    "espn": "4432710",
    "status": "OUT",
    "team_abbr": "NE",
    "pos": "RB",
    "fpts": 39.73,
    "avg": 5.22,
    "last": 0
  },
  {
    "name": "Kirk Cousins",
    "espn": "14880",
    "status": null,
    "team_abbr": "LV",
    "pos": "QB",
    "fpts": 30.41,
    "avg": 19.96,
    "last": 28.18
  },
  {
    "name": "Hunter Henry",
    "espn": "3046439",
    "status": "Q",
    "team_abbr": "NE",
    "pos": "TE",
    "fpts": 66.68,
    "avg": 7.39,
    "last": 4.5
  },
  {
    "name": "Bears",
    "status": null,
    "team_abbr": "CHI",
    "pos": "D/ST",
    "fpts": 53.73,
    "avg": 7,
    "last": 10
  },
  {
    "name": "Alvin Kamara",
    "espn": "3054850",
    "status": "Q",
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 76.26,
    "avg": 9.13,
    "last": 9.7
  },
  {
    "name": "Josh Downs",
    "espn": "4688813",
    "status": null,
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 55.62,
    "avg": 6.84,
    "last": 10.3
  },
  {
    "name": "Patriots",
    "status": null,
    "team_abbr": "NE",
    "pos": "D/ST",
    "fpts": 51.01,
    "avg": 6.38,
    "last": 9
  },
  {
    "name": "KC Concepcion",
    "espn": "4870653",
    "status": null,
    "team_abbr": "CLE",
    "pos": "WR",
    "fpts": 75.75,
    "avg": 6.64,
    "last": 5.2
  },
  {
    "name": "Mark Andrews",
    "espn": "3116365",
    "status": null,
    "team_abbr": "BAL",
    "pos": "TE",
    "fpts": 42.15,
    "avg": 4.8,
    "last": 2.9
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
    "name": "Khalil Shakir",
    "espn": "4373678",
    "status": null,
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 82.93,
    "avg": 7.56,
    "last": 8.9
  },
  {
    "name": "Jordan Mason",
    "espn": "4360569",
    "status": null,
    "team_abbr": "MIN",
    "pos": "RB",
    "fpts": 71.55,
    "avg": 6.9,
    "last": 2
  },
  {
    "name": "Courtland Sutton",
    "espn": "3128429",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 70.96,
    "avg": 4.76,
    "last": 7.3
  },
  {
    "name": "Devaughn Vele",
    "espn": "4569559",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 70.41,
    "avg": 9.9,
    "last": 13.9
  },
  {
    "name": "Chiefs",
    "status": null,
    "team_abbr": "KC",
    "pos": "D/ST",
    "fpts": 50.54,
    "avg": 5.43,
    "last": 2
  },
  {
    "name": "Harrison Butker",
    "espn": "3055899",
    "status": null,
    "team_abbr": "KC",
    "pos": "K",
    "fpts": 89.41,
    "avg": 7.86,
    "last": 6
  },
  {
    "name": "Makai Lemon",
    "espn": "4870795",
    "status": null,
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 42.57,
    "avg": 5.76,
    "last": 8.7
  },
  {
    "name": "Wan'Dale Robinson",
    "espn": "4569587",
    "status": "BYE",
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 65.94,
    "avg": 7.48,
    "last": 12.7
  },
  {
    "name": "Kyler Murray",
    "espn": "3917315",
    "status": "Q",
    "team_abbr": "MIN",
    "pos": "QB",
    "fpts": 140.07,
    "avg": 12.26,
    "last": 19.9
  },
  {
    "name": "Browns",
    "status": null,
    "team_abbr": "CLE",
    "pos": "D/ST",
    "fpts": 61.14,
    "avg": 5.5,
    "last": 2
  },
  {
    "name": "Kenny Gainwell",
    "espn": "4371733",
    "status": null,
    "team_abbr": "TB",
    "pos": "RB",
    "fpts": 72.23,
    "avg": 5.88,
    "last": 14
  },
  {
    "name": "Jake Bates",
    "espn": "4689936",
    "status": null,
    "team_abbr": "DET",
    "pos": "K",
    "fpts": 92.69,
    "avg": 9.14,
    "last": 6
  },
  {
    "name": "Chris Godwin Jr.",
    "espn": "3116165",
    "status": null,
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 57.84,
    "avg": 4.95,
    "last": 0
  },
  {
    "name": "Brenton Strange",
    "espn": "4430539",
    "status": null,
    "team_abbr": "JAX",
    "pos": "TE",
    "fpts": 78.47,
    "avg": 7.08,
    "last": 3.2
  },
  {
    "name": "Chris Boswell",
    "espn": "17372",
    "status": "BYE",
    "team_abbr": "PIT",
    "pos": "K",
    "fpts": 97.78,
    "avg": 9.63,
    "last": 8
  },
  {
    "name": "Alec Pierce",
    "espn": "4360078",
    "status": "IR",
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 38.17,
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
    "name": "Keenan Allen",
    "espn": "15818",
    "status": null,
    "team_abbr": "IND",
    "pos": "WR",
    "fpts": 60,
    "avg": 8.07,
    "last": 10.2
  },
  {
    "name": "Chase McLaughlin",
    "espn": "3150744",
    "status": null,
    "team_abbr": "TB",
    "pos": "K",
    "fpts": 85.25,
    "avg": 11.13,
    "last": 12
  },
  {
    "name": "Juwan Johnson",
    "espn": "3929645",
    "status": null,
    "team_abbr": "NO",
    "pos": "TE",
    "fpts": 59.49,
    "avg": 7.79,
    "last": 1.2
  },
  {
    "name": "Giants",
    "status": null,
    "team_abbr": "NYG",
    "pos": "D/ST",
    "fpts": 49,
    "avg": 5.14,
    "last": 3
  },
  {
    "name": "Pat Freiermuth",
    "espn": "4361411",
    "status": "BYE",
    "team_abbr": "PIT",
    "pos": "TE",
    "fpts": 61.25,
    "avg": 8.31,
    "last": 10.6
  },
  {
    "name": "Jake Ferguson",
    "espn": "4242355",
    "status": "Q",
    "team_abbr": "DAL",
    "pos": "TE",
    "fpts": 33.12,
    "avg": 4.5,
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
    "name": "Brian Thomas Jr.",
    "espn": "4432773",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 60.5,
    "avg": 3.59,
    "last": 0
  },
  {
    "name": "Malik Washington",
    "espn": "4569603",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 77.69,
    "avg": 8.03,
    "last": 12.5
  },
  {
    "name": "Emanuel Wilson",
    "espn": "4887558",
    "status": null,
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 0,
    "avg": 8.98,
    "last": 0
  },
  {
    "name": "Bengals",
    "status": null,
    "team_abbr": "CIN",
    "pos": "D/ST",
    "fpts": 56.81,
    "avg": 7.14,
    "last": 2
  },
  {
    "name": "Jordyn Tyson",
    "espn": "4880281",
    "status": "IR",
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 47.54,
    "avg": null,
    "last": 0
  },
  {
    "name": "Cairo Santos",
    "espn": "17427",
    "status": null,
    "team_abbr": "CHI",
    "pos": "K",
    "fpts": 88.29,
    "avg": 8.75,
    "last": 11
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
    "name": "Lions",
    "status": null,
    "team_abbr": "DET",
    "pos": "D/ST",
    "fpts": 39.81,
    "avg": 4,
    "last": 8
  },
  {
    "name": "Eddy Pineiro",
    "espn": "4034949",
    "status": null,
    "team_abbr": "SF",
    "pos": "K",
    "fpts": 75.71,
    "avg": 5.86,
    "last": 2
  },
  {
    "name": "Adonai Mitchell",
    "espn": "4597500",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "WR",
    "fpts": 79.16,
    "avg": 10.13,
    "last": 23.7
  },
  {
    "name": "Dominic Zvada",
    "espn": "5082424",
    "status": null,
    "team_abbr": "NYG",
    "pos": "K",
    "fpts": 105.59,
    "avg": 8.14,
    "last": 1
  },
  {
    "name": "Kaelon Black",
    "espn": "4696044",
    "status": null,
    "team_abbr": "SF",
    "pos": "RB",
    "fpts": 68.02,
    "avg": 4.17,
    "last": 10.4
  },
  {
    "name": "Aaron Rodgers",
    "espn": "8439",
    "status": "BYE",
    "team_abbr": "PIT",
    "pos": "QB",
    "fpts": 141.53,
    "avg": 14.64,
    "last": 4.88
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
    "name": "Eagles",
    "status": null,
    "team_abbr": "PHI",
    "pos": "D/ST",
    "fpts": 43.22,
    "avg": 1.25,
    "last": 4
  },
  {
    "name": "MarShawn Lloyd",
    "espn": "4429023",
    "status": "Q",
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 31.34,
    "avg": 5.66,
    "last": 2.1
  },
  {
    "name": "Justin Herbert",
    "espn": "4038941",
    "status": null,
    "team_abbr": "LAC",
    "pos": "QB",
    "fpts": 113.47,
    "avg": 10.03,
    "last": 7.78
  },
  {
    "name": "J.J. McCarthy",
    "espn": "4433970",
    "status": null,
    "team_abbr": "NYG",
    "pos": "QB",
    "fpts": 171.08,
    "avg": 8.9,
    "last": 10.18
  },
  {
    "name": "Buccaneers",
    "status": null,
    "team_abbr": "TB",
    "pos": "D/ST",
    "fpts": 63.48,
    "avg": 10.25,
    "last": 15
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
    "name": "Tyler Loop",
    "espn": "4697745",
    "status": "IR",
    "team_abbr": "BAL",
    "pos": "K",
    "fpts": 0,
    "avg": 8.25,
    "last": 0
  }
];
