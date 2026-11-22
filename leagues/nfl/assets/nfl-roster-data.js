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
        "fpts": 166.44,
        "avg": 19.33,
        "last": 26.78
      },
      {
        "name": "Jahmyr Gibbs",
        "espn": "4429795",
        "status": null,
        "team_abbr": "DET",
        "pos": "RB",
        "fpts": 176.81,
        "avg": 23.79,
        "last": 5
      },
      {
        "name": "James Cook III",
        "espn": "4379399",
        "status": null,
        "team_abbr": "BUF",
        "pos": "RB",
        "fpts": 149.28,
        "avg": 17.37,
        "last": 9.6
      },
      {
        "name": "CeeDee Lamb",
        "espn": "4241389",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 117.37,
        "avg": 18.57,
        "last": 20.8
      },
      {
        "name": "Parker Washington",
        "espn": "4432620",
        "status": null,
        "team_abbr": "JAX",
        "pos": "WR",
        "fpts": 110.79,
        "avg": 13.31,
        "last": 24.7
      },
      {
        "name": "DJ Moore",
        "espn": "3915416",
        "status": null,
        "team_abbr": "BUF",
        "pos": "WR",
        "fpts": 92.24,
        "avg": 10.6,
        "last": 17.4
      },
      {
        "name": "Trey McBride",
        "espn": "4361307",
        "status": null,
        "team_abbr": "ARI",
        "pos": "TE",
        "fpts": 81.82,
        "avg": 12.5,
        "last": 5
      },
      {
        "name": "Justin Jefferson",
        "espn": "4262921",
        "status": null,
        "team_abbr": "MIN",
        "pos": "WR",
        "fpts": 132.42,
        "avg": 11.45,
        "last": 11.9
      },
      {
        "name": "D'Andre Swift",
        "espn": "4259545",
        "status": null,
        "team_abbr": "CHI",
        "pos": "RB",
        "fpts": 110.26,
        "avg": 15.41,
        "last": 12.3
      },
      {
        "name": "Joe Burrow",
        "espn": "3915511",
        "status": null,
        "team_abbr": "CIN",
        "pos": "QB",
        "fpts": 180.61,
        "avg": 25.81,
        "last": 33.16
      },
      {
        "name": "Chiefs",
        "status": null,
        "team_abbr": "KC",
        "pos": "D/ST",
        "fpts": 51.55,
        "avg": 6.8,
        "last": 9
      },
      {
        "name": "Brandon Aubrey",
        "espn": "3953687",
        "status": null,
        "team_abbr": "DAL",
        "pos": "K",
        "fpts": 72.55,
        "avg": 8.73,
        "last": 4
      }
    ],
    "bench": [
      {
        "name": "Rams",
        "status": "BYE",
        "team_abbr": "LAR",
        "pos": "D/ST",
        "fpts": 55.02,
        "avg": 6.4,
        "last": 16
      },
      {
        "name": "Aaron Jones Sr.",
        "espn": "3042519",
        "status": null,
        "team_abbr": "MIN",
        "pos": "RB",
        "fpts": 68.29,
        "avg": 9.66,
        "last": 12
      },
      {
        "name": "Blake Corum",
        "espn": "4429096",
        "status": "BYE",
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 75.28,
        "avg": 10.9,
        "last": 19.4
      },
      {
        "name": "Michael Wilson",
        "espn": "4360761",
        "status": "IR",
        "team_abbr": "ARI",
        "pos": "WR",
        "fpts": 0,
        "avg": 10.58,
        "last": 0
      },
      {
        "name": "Germie Bernard",
        "espn": "4685261",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 23.31,
        "avg": 5.72,
        "last": 5.4
      },
      {
        "name": "Jordan Love",
        "espn": "4036378",
        "status": "BYE",
        "team_abbr": "GB",
        "pos": "QB",
        "fpts": 121.2,
        "avg": 19.58,
        "last": 10.8
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
        "last": 0
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
        "fpts": 133.7,
        "avg": 18.64,
        "last": 18.62
      },
      {
        "name": "Derrick Henry",
        "espn": "3043078",
        "status": null,
        "team_abbr": "BAL",
        "pos": "RB",
        "fpts": 90.17,
        "avg": 14.55,
        "last": 7.3
      },
      {
        "name": "Tony Pollard",
        "espn": "3916148",
        "status": null,
        "team_abbr": "TEN",
        "pos": "RB",
        "fpts": 129.01,
        "avg": 13.51,
        "last": 5.7
      },
      {
        "name": "Ja'Marr Chase",
        "espn": "4362628",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 165.69,
        "avg": 17.98,
        "last": 28.6
      },
      {
        "name": "Rashee Rice",
        "espn": "4428331",
        "status": null,
        "team_abbr": "KC",
        "pos": "WR",
        "fpts": 80.62,
        "avg": 9.09,
        "last": 8.3
      },
      {
        "name": "DK Metcalf",
        "espn": "4047650",
        "status": null,
        "team_abbr": "PIT",
        "pos": "WR",
        "fpts": 79.13,
        "avg": 7.65,
        "last": 0.7
      },
      {
        "name": "George Kittle",
        "espn": "3040151",
        "status": null,
        "team_abbr": "SF",
        "pos": "TE",
        "fpts": 89.29,
        "avg": 11.74,
        "last": 10.4
      },
      {
        "name": "Breece Hall",
        "espn": "4427366",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "RB",
        "fpts": 79.48,
        "avg": 12.1,
        "last": 12.8
      },
      {
        "name": "Bucky Irving",
        "espn": "4596448",
        "status": null,
        "team_abbr": "TB",
        "pos": "RB",
        "fpts": 138.83,
        "avg": 15.19,
        "last": 3.8
      },
      {
        "name": "Patrick Mahomes",
        "espn": "3139477",
        "status": null,
        "team_abbr": "KC",
        "pos": "QB",
        "fpts": 155.3,
        "avg": 19.47,
        "last": 17.32
      },
      {
        "name": "Ravens",
        "status": null,
        "team_abbr": "BAL",
        "pos": "D/ST",
        "fpts": 40.57,
        "avg": 4.45,
        "last": 12
      },
      {
        "name": "Jason Myers",
        "espn": "2473037",
        "status": "BYE",
        "team_abbr": "SEA",
        "pos": "K",
        "fpts": 53.98,
        "avg": 7.7,
        "last": 2
      }
    ],
    "bench": [
      {
        "name": "Seahawks",
        "status": "BYE",
        "team_abbr": "SEA",
        "pos": "D/ST",
        "fpts": 52.46,
        "avg": 8.9,
        "last": 12
      },
      {
        "name": "Kenneth Walker III",
        "espn": "4567048",
        "status": "OUT",
        "team_abbr": "KC",
        "pos": "RB",
        "fpts": 151.87,
        "avg": 22.92,
        "last": 0
      },
      {
        "name": "Dak Prescott",
        "espn": "2577417",
        "status": null,
        "team_abbr": "DAL",
        "pos": "QB",
        "fpts": 127.18,
        "avg": 20.34,
        "last": 21.84
      },
      {
        "name": "Harold Fannin Jr.",
        "espn": "5083076",
        "status": "BYE",
        "team_abbr": "CLE",
        "pos": "TE",
        "fpts": 56.81,
        "avg": 9.64,
        "last": 12.6
      },
      {
        "name": "Mike Evans",
        "espn": "16737",
        "status": "Q",
        "team_abbr": "SF",
        "pos": "WR",
        "fpts": 83.5,
        "avg": 12.58,
        "last": 0
      },
      {
        "name": "Denzel Boston",
        "espn": "4832800",
        "status": "BYE",
        "team_abbr": "CLE",
        "pos": "WR",
        "fpts": 70.54,
        "avg": 8.88,
        "last": 2.1
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
        "fpts": 161.54,
        "avg": 20.49,
        "last": 20.46
      },
      {
        "name": "Chuba Hubbard",
        "espn": "4241416",
        "status": null,
        "team_abbr": "CAR",
        "pos": "RB",
        "fpts": 136.7,
        "avg": 17.84,
        "last": 13.1
      },
      {
        "name": "Ashton Jeanty",
        "espn": "4890973",
        "status": null,
        "team_abbr": "LV",
        "pos": "RB",
        "fpts": 87.01,
        "avg": 12.67,
        "last": 8.4
      },
      {
        "name": "Jaxon Smith-Njigba",
        "espn": "4430878",
        "status": "BYE",
        "team_abbr": "SEA",
        "pos": "WR",
        "fpts": 123.1,
        "avg": 22.37,
        "last": 27.1
      },
      {
        "name": "Drake London",
        "espn": "4426502",
        "status": "BYE",
        "team_abbr": "ATL",
        "pos": "WR",
        "fpts": 84.28,
        "avg": 11.35,
        "last": 13.9
      },
      {
        "name": "Malik Nabers",
        "espn": "4595348",
        "status": null,
        "team_abbr": "NYG",
        "pos": "WR",
        "fpts": 104.88,
        "avg": 12.02,
        "last": 4.9
      },
      {
        "name": "Isaiah Likely",
        "espn": "4361050",
        "status": null,
        "team_abbr": "NYG",
        "pos": "TE",
        "fpts": 83.05,
        "avg": 14.33,
        "last": 23.2
      },
      {
        "name": "Jaylen Warren",
        "espn": "4569987",
        "status": null,
        "team_abbr": "PIT",
        "pos": "RB",
        "fpts": 113.3,
        "avg": 13.77,
        "last": 2.8
      },
      {
        "name": "Tee Higgins",
        "espn": "4239993",
        "status": null,
        "team_abbr": "CIN",
        "pos": "WR",
        "fpts": 108.3,
        "avg": 16.1,
        "last": 9.1
      },
      {
        "name": "Fernando Mendoza",
        "espn": "4837248",
        "status": null,
        "team_abbr": "LV",
        "pos": "QB",
        "fpts": 110.89,
        "avg": 4.04,
        "last": 13.92
      },
      {
        "name": "Vikings",
        "status": null,
        "team_abbr": "MIN",
        "pos": "D/ST",
        "fpts": 51.98,
        "avg": 11.78,
        "last": 21
      },
      {
        "name": "Ka'imi Fairbairn",
        "espn": "2971573",
        "status": null,
        "team_abbr": "HOU",
        "pos": "K",
        "fpts": 81.45,
        "avg": 10.5,
        "last": 6
      }
    ],
    "bench": [
      {
        "name": "Bo Nix",
        "espn": "4426338",
        "status": null,
        "team_abbr": "DEN",
        "pos": "QB",
        "fpts": 140.94,
        "avg": 14.53,
        "last": 15.68
      },
      {
        "name": "49ers",
        "status": null,
        "team_abbr": "SF",
        "pos": "D/ST",
        "fpts": 58.61,
        "avg": 7.44,
        "last": -1
      },
      {
        "name": "Chase Brown",
        "espn": "4362238",
        "status": null,
        "team_abbr": "CIN",
        "pos": "RB",
        "fpts": 106.49,
        "avg": 11.8,
        "last": 24.3
      },
      {
        "name": "Rhamondre Stevenson",
        "espn": "4569173",
        "status": "BYE",
        "team_abbr": "NE",
        "pos": "RB",
        "fpts": 76.08,
        "avg": 10.17,
        "last": 1
      },
      {
        "name": "Jalen Coker",
        "espn": "4695883",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 55.56,
        "avg": 8.31,
        "last": 4
      },
      {
        "name": "Jonah Coleman",
        "espn": "4702555",
        "status": null,
        "team_abbr": "DEN",
        "pos": "RB",
        "fpts": 124.07,
        "avg": 11.28,
        "last": 16.8
      }
    ],
    "ir": []
  },
  "puntos": {
    "starters": [
      {
        "name": "Caleb Williams",
        "espn": "4431611",
        "status": null,
        "team_abbr": "CHI",
        "pos": "QB",
        "fpts": 135.37,
        "avg": 17.72,
        "last": 13.7
      },
      {
        "name": "Bhayshul Tuten",
        "espn": "4882093",
        "status": null,
        "team_abbr": "JAX",
        "pos": "RB",
        "fpts": 132.37,
        "avg": 15.39,
        "last": 18.8
      },
      {
        "name": "Cam Skattebo",
        "espn": "4696981",
        "status": null,
        "team_abbr": "NYG",
        "pos": "RB",
        "fpts": 118.43,
        "avg": 11.33,
        "last": 25.7
      },
      {
        "name": "Luther Burden III",
        "espn": "4685278",
        "status": null,
        "team_abbr": "CHI",
        "pos": "WR",
        "fpts": 94.18,
        "avg": 11.38,
        "last": 2
      },
      {
        "name": "Zay Flowers",
        "espn": "4429615",
        "status": null,
        "team_abbr": "BAL",
        "pos": "WR",
        "fpts": 74.69,
        "avg": 12.53,
        "last": 10.9
      },
      {
        "name": "Jameson Williams",
        "espn": "4426388",
        "status": null,
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 81.02,
        "avg": 11.52,
        "last": 16.5
      },
      {
        "name": "Travis Kelce",
        "espn": "15847",
        "status": null,
        "team_abbr": "KC",
        "pos": "TE",
        "fpts": 73.58,
        "avg": 10.92,
        "last": 22.4
      },
      {
        "name": "Stefon Diggs",
        "espn": "2976212",
        "status": null,
        "team_abbr": "WSH",
        "pos": "WR",
        "fpts": 87.42,
        "avg": 11.58,
        "last": 17.3
      },
      {
        "name": "Deebo Samuel Sr.",
        "espn": "3126486",
        "status": null,
        "team_abbr": "SF",
        "pos": "WR",
        "fpts": 74.68,
        "avg": 12.8,
        "last": 24.4
      },
      {
        "name": "Brock Purdy",
        "espn": "4361741",
        "status": null,
        "team_abbr": "SF",
        "pos": "QB",
        "fpts": 153.71,
        "avg": 22.55,
        "last": 31.66
      },
      {
        "name": "Jaguars",
        "status": null,
        "team_abbr": "JAX",
        "pos": "D/ST",
        "fpts": 48.29,
        "avg": 7.78,
        "last": 3
      },
      {
        "name": "Cam Little",
        "espn": "4686361",
        "status": null,
        "team_abbr": "JAX",
        "pos": "K",
        "fpts": 89,
        "avg": 10.89,
        "last": 19
      }
    ],
    "bench": [
      {
        "name": "Bijan Robinson",
        "espn": "4430807",
        "status": "BYE",
        "team_abbr": "ATL",
        "pos": "RB",
        "fpts": 125.31,
        "avg": 18.02,
        "last": 15.7
      },
      {
        "name": "Kyren Williams",
        "espn": "4430737",
        "status": "Q",
        "team_abbr": "LAR",
        "pos": "RB",
        "fpts": 91.94,
        "avg": 14.53,
        "last": 4.2
      },
      {
        "name": "Sam LaPorta",
        "espn": "4430027",
        "status": null,
        "team_abbr": "DET",
        "pos": "TE",
        "fpts": 66.96,
        "avg": 8.54,
        "last": 7.7
      },
      {
        "name": "Christian Watson",
        "espn": "4248528",
        "status": "BYE",
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 86.62,
        "avg": 15.76,
        "last": 5.2
      },
      {
        "name": "Matthew Golden",
        "espn": "4701936",
        "status": "BYE",
        "team_abbr": "GB",
        "pos": "WR",
        "fpts": 104.34,
        "avg": 14.69,
        "last": 9.5
      },
      {
        "name": "Ollie Gordon II",
        "espn": "4711533",
        "status": null,
        "team_abbr": "MIA",
        "pos": "RB",
        "fpts": 111.54,
        "avg": 9.32,
        "last": 3.6
      }
    ],
    "ir": [
      {
        "name": "Davante Adams",
        "espn": "16800",
        "status": "IR",
        "team_abbr": "LAR",
        "pos": "WR",
        "fpts": 80.45,
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
        "fpts": 177.85,
        "avg": 23.02,
        "last": 7.72
      },
      {
        "name": "Jonathan Taylor",
        "espn": "4242335",
        "status": null,
        "team_abbr": "IND",
        "pos": "RB",
        "fpts": 92.46,
        "avg": 14.24,
        "last": 4.7
      },
      {
        "name": "Javonte Williams",
        "espn": "4361579",
        "status": null,
        "team_abbr": "DAL",
        "pos": "RB",
        "fpts": 105.71,
        "avg": 15.79,
        "last": 18.9
      },
      {
        "name": "Amon-Ra St. Brown",
        "espn": "4374302",
        "status": null,
        "team_abbr": "DET",
        "pos": "WR",
        "fpts": 123.96,
        "avg": 16.19,
        "last": 11
      },
      {
        "name": "George Pickens",
        "espn": "4426354",
        "status": null,
        "team_abbr": "DAL",
        "pos": "WR",
        "fpts": 81.56,
        "avg": 13.8,
        "last": 15.2
      },
      {
        "name": "Nico Collins",
        "espn": "4258173",
        "status": null,
        "team_abbr": "HOU",
        "pos": "WR",
        "fpts": 104.59,
        "avg": 13.85,
        "last": 13.3
      },
      {
        "name": "Brock Bowers",
        "espn": "4432665",
        "status": "Q",
        "team_abbr": "LV",
        "pos": "TE",
        "fpts": 77.19,
        "avg": 15.6,
        "last": 2.8
      },
      {
        "name": "Christian McCaffrey",
        "espn": "3117251",
        "status": null,
        "team_abbr": "SF",
        "pos": "RB",
        "fpts": 144.25,
        "avg": 21.44,
        "last": 44.3
      },
      {
        "name": "Tetairoa McMillan",
        "espn": "4685472",
        "status": null,
        "team_abbr": "CAR",
        "pos": "WR",
        "fpts": 87.56,
        "avg": 11.57,
        "last": 9.2
      },
      {
        "name": "Jayden Daniels",
        "espn": "4426348",
        "status": null,
        "team_abbr": "WSH",
        "pos": "QB",
        "fpts": 162.64,
        "avg": 19.42,
        "last": 20.76
      },
      {
        "name": "Steelers",
        "status": null,
        "team_abbr": "PIT",
        "pos": "D/ST",
        "fpts": 55.78,
        "avg": 7.6,
        "last": 10
      },
      {
        "name": "Tyler Bass",
        "espn": "3917232",
        "status": null,
        "team_abbr": "BUF",
        "pos": "K",
        "fpts": 84.34,
        "avg": 10.9,
        "last": 11
      }
    ],
    "bench": [
      {
        "name": "Saquon Barkley",
        "espn": "3929630",
        "status": null,
        "team_abbr": "PHI",
        "pos": "RB",
        "fpts": 103.07,
        "avg": 8.38,
        "last": 11.8
      },
      {
        "name": "Chris Olave",
        "espn": "4361370",
        "status": null,
        "team_abbr": "NO",
        "pos": "WR",
        "fpts": 89.38,
        "avg": 12.42,
        "last": 6.3
      },
      {
        "name": "Kyle Pitts Sr.",
        "espn": "4360248",
        "status": "BYE",
        "team_abbr": "ATL",
        "pos": "TE",
        "fpts": 48,
        "avg": 6.35,
        "last": 5
      },
      {
        "name": "Garrett Wilson",
        "espn": "4569618",
        "status": null,
        "team_abbr": "NYJ",
        "pos": "WR",
        "fpts": 76.89,
        "avg": 11.59,
        "last": 12.1
      },
      {
        "name": "Bryce Young",
        "espn": "4685720",
        "status": null,
        "team_abbr": "CAR",
        "pos": "QB",
        "fpts": 122.74,
        "avg": 16.72,
        "last": 12.48
      },
      {
        "name": "Will Reichard",
        "espn": "4567104",
        "status": null,
        "team_abbr": "MIN",
        "pos": "K",
        "fpts": 83.64,
        "avg": 11.22,
        "last": 12
      }
    ],
    "ir": [
      {
        "name": "Jeremiyah Love",
        "espn": "4870808",
        "status": "IR",
        "team_abbr": "ARI",
        "pos": "RB",
        "fpts": 43.49,
        "avg": 7.98,
        "last": 0
      }
    ]
  }
};

window.FREE_AGENTS = [
  {
    "name": "Colston Loveland",
    "espn": "4723086",
    "status": null,
    "team_abbr": "CHI",
    "pos": "TE",
    "fpts": 77.88,
    "avg": 7.45,
    "last": 9.7
  },
  {
    "name": "DeVonta Smith",
    "espn": "4241478",
    "status": null,
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 87.34,
    "avg": 11.82,
    "last": 3.1
  },
  {
    "name": "Tyler Warren",
    "espn": "4431459",
    "status": null,
    "team_abbr": "IND",
    "pos": "TE",
    "fpts": 44.45,
    "avg": 7.69,
    "last": 2.7
  },
  {
    "name": "Quinshon Judkins",
    "espn": "4685702",
    "status": "BYE",
    "team_abbr": "CLE",
    "pos": "RB",
    "fpts": 79.98,
    "avg": 10.63,
    "last": 14.6
  },
  {
    "name": "Omarion Hampton",
    "espn": "4685382",
    "status": null,
    "team_abbr": "LAC",
    "pos": "RB",
    "fpts": 80.96,
    "avg": 8.86,
    "last": 17
  },
  {
    "name": "Emeka Egbuka",
    "espn": "4567750",
    "status": null,
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 73.72,
    "avg": 7.95,
    "last": 1.1
  },
  {
    "name": "Texans",
    "status": null,
    "team_abbr": "HOU",
    "pos": "D/ST",
    "fpts": 42.31,
    "avg": 6.1,
    "last": 15
  },
  {
    "name": "Emmett Johnson",
    "espn": "4832955",
    "status": null,
    "team_abbr": "KC",
    "pos": "RB",
    "fpts": 64.63,
    "avg": 10.35,
    "last": 17.6
  },
  {
    "name": "Josh Jacobs",
    "espn": "4047365",
    "status": "OUT",
    "team_abbr": "GB",
    "pos": "RB",
    "fpts": 88.69,
    "avg": 12.77,
    "last": 0
  },
  {
    "name": "Rome Odunze",
    "espn": "4431299",
    "status": null,
    "team_abbr": "CHI",
    "pos": "WR",
    "fpts": 74.08,
    "avg": 7.85,
    "last": 5.7
  },
  {
    "name": "Tucker Kraft",
    "espn": "4572680",
    "status": "BYE",
    "team_abbr": "GB",
    "pos": "TE",
    "fpts": 54.77,
    "avg": 7.48,
    "last": 2.4
  },
  {
    "name": "David Montgomery",
    "espn": "4035538",
    "status": null,
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 83.49,
    "avg": 9.32,
    "last": 13.9
  },
  {
    "name": "Carnell Tate",
    "espn": "4871023",
    "status": null,
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 83.26,
    "avg": 7.59,
    "last": 0.4
  },
  {
    "name": "Jaylen Waddle",
    "espn": "4372016",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 74.65,
    "avg": 7.44,
    "last": 2.7
  },
  {
    "name": "Travis Etienne Jr.",
    "espn": "4239996",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 87.57,
    "avg": 7.2,
    "last": 5.7
  },
  {
    "name": "Broncos",
    "status": null,
    "team_abbr": "DEN",
    "pos": "D/ST",
    "fpts": 52.14,
    "avg": 6.22,
    "last": 6
  },
  {
    "name": "Spencer Shrader",
    "espn": "4571557",
    "status": null,
    "team_abbr": "IND",
    "pos": "K",
    "fpts": 65.84,
    "avg": 10.27,
    "last": 1
  },
  {
    "name": "T.J. Hockenson",
    "espn": "4036133",
    "status": null,
    "team_abbr": "MIN",
    "pos": "TE",
    "fpts": 73.1,
    "avg": 8.54,
    "last": 0
  },
  {
    "name": "Matthew Stafford",
    "espn": "12483",
    "status": "BYE",
    "team_abbr": "LAR",
    "pos": "QB",
    "fpts": 98.89,
    "avg": 16.26,
    "last": 19.76
  },
  {
    "name": "A.J. Brown",
    "espn": "4047646",
    "status": "D",
    "team_abbr": "NE",
    "pos": "WR",
    "fpts": 25.51,
    "avg": 4.58,
    "last": 3.7
  },
  {
    "name": "Drake Maye",
    "espn": "4431452",
    "status": "OUT",
    "team_abbr": "NE",
    "pos": "QB",
    "fpts": 0,
    "avg": 18.22,
    "last": 3.02
  },
  {
    "name": "Bills",
    "status": null,
    "team_abbr": "BUF",
    "pos": "D/ST",
    "fpts": 48.71,
    "avg": 6.3,
    "last": 12
  },
  {
    "name": "Zach Charbonnet",
    "espn": "4426385",
    "status": "BYE",
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 87.17,
    "avg": 7.63,
    "last": 9.4
  },
  {
    "name": "Ladd McConkey",
    "espn": "4612826",
    "status": null,
    "team_abbr": "LAC",
    "pos": "WR",
    "fpts": 65.61,
    "avg": 7.18,
    "last": 0
  },
  {
    "name": "Josh Downs",
    "espn": "4688813",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 58.75,
    "avg": 7.09,
    "last": 6.1
  },
  {
    "name": "Jadarian Price",
    "espn": "4685512",
    "status": "BYE",
    "team_abbr": "SEA",
    "pos": "RB",
    "fpts": 54.28,
    "avg": 5.34,
    "last": 10.9
  },
  {
    "name": "Kyle Monangai",
    "espn": "4608686",
    "status": null,
    "team_abbr": "CHI",
    "pos": "RB",
    "fpts": 59.24,
    "avg": 11.54,
    "last": 0.9
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
    "name": "Dallas Goedert",
    "espn": "3121023",
    "status": null,
    "team_abbr": "PHI",
    "pos": "TE",
    "fpts": 49.41,
    "avg": 7.85,
    "last": 4.3
  },
  {
    "name": "Dalton Kincaid",
    "espn": "4385690",
    "status": "OUT",
    "team_abbr": "BUF",
    "pos": "TE",
    "fpts": 48.59,
    "avg": 8.52,
    "last": 0
  },
  {
    "name": "Jakobi Meyers",
    "espn": "3916433",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 77.26,
    "avg": 7.5,
    "last": 4.9
  },
  {
    "name": "Jordyn Tyson",
    "espn": "4880281",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 71.95,
    "avg": 6,
    "last": 1.5
  },
  {
    "name": "Rico Dowdle",
    "espn": "4038815",
    "status": null,
    "team_abbr": "PIT",
    "pos": "RB",
    "fpts": 64.5,
    "avg": 6.67,
    "last": 4.2
  },
  {
    "name": "Woody Marks",
    "espn": "4429059",
    "status": "OUT",
    "team_abbr": "HOU",
    "pos": "RB",
    "fpts": 50.14,
    "avg": 7.82,
    "last": 0
  },
  {
    "name": "Rachaad White",
    "espn": "4697815",
    "status": "Q",
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 55.23,
    "avg": 8.3,
    "last": 5.7
  },
  {
    "name": "Braelon Allen",
    "espn": "4685247",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "RB",
    "fpts": 46.98,
    "avg": 10.06,
    "last": 5.1
  },
  {
    "name": "Kirk Cousins",
    "espn": "14880",
    "status": null,
    "team_abbr": "MIN",
    "pos": "QB",
    "fpts": 130.28,
    "avg": 18.77,
    "last": 15.38
  },
  {
    "name": "Courtland Sutton",
    "espn": "3128429",
    "status": null,
    "team_abbr": "DEN",
    "pos": "WR",
    "fpts": 64.05,
    "avg": 5.68,
    "last": 13
  },
  {
    "name": "Bears",
    "status": null,
    "team_abbr": "CHI",
    "pos": "D/ST",
    "fpts": 38.59,
    "avg": 8.2,
    "last": 13
  },
  {
    "name": "KC Concepcion",
    "espn": "4870653",
    "status": "BYE",
    "team_abbr": "CLE",
    "pos": "WR",
    "fpts": 59.33,
    "avg": 8.01,
    "last": 10.2
  },
  {
    "name": "Mark Andrews",
    "espn": "3116365",
    "status": null,
    "team_abbr": "BAL",
    "pos": "TE",
    "fpts": 38.95,
    "avg": 5.04,
    "last": 0
  },
  {
    "name": "Jordan Addison",
    "espn": "4429205",
    "status": "OUT",
    "team_abbr": "MIN",
    "pos": "WR",
    "fpts": 71.39,
    "avg": 6.41,
    "last": 0
  },
  {
    "name": "Chris Boswell",
    "espn": "17372",
    "status": null,
    "team_abbr": "PIT",
    "pos": "K",
    "fpts": 82.36,
    "avg": 8.9,
    "last": 7
  },
  {
    "name": "J.K. Dobbins",
    "espn": "4241985",
    "status": null,
    "team_abbr": "DEN",
    "pos": "RB",
    "fpts": 51.16,
    "avg": 6.44,
    "last": 2.7
  },
  {
    "name": "Tyler Shough",
    "espn": "4360689",
    "status": null,
    "team_abbr": "NO",
    "pos": "QB",
    "fpts": 123.39,
    "avg": 16.47,
    "last": 9.12
  },
  {
    "name": "Khalil Shakir",
    "espn": "4373678",
    "status": null,
    "team_abbr": "BUF",
    "pos": "WR",
    "fpts": 61.35,
    "avg": 7.11,
    "last": 3.9
  },
  {
    "name": "Alvin Kamara",
    "espn": "3054850",
    "status": null,
    "team_abbr": "NO",
    "pos": "RB",
    "fpts": 62.24,
    "avg": 9.2,
    "last": 6.7
  },
  {
    "name": "Cameron Dicker",
    "espn": "4362081",
    "status": null,
    "team_abbr": "LAC",
    "pos": "K",
    "fpts": 74.81,
    "avg": 7.89,
    "last": 11
  },
  {
    "name": "Tank Dell",
    "espn": "4366031",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 53.44,
    "avg": 7.83,
    "last": 4.2
  },
  {
    "name": "Kenny Gainwell",
    "espn": "4371733",
    "status": null,
    "team_abbr": "TB",
    "pos": "RB",
    "fpts": 66.4,
    "avg": 6.12,
    "last": 5.1
  },
  {
    "name": "Chig Okonkwo",
    "espn": "4360635",
    "status": null,
    "team_abbr": "WSH",
    "pos": "TE",
    "fpts": 64.91,
    "avg": 5.4,
    "last": 4.4
  },
  {
    "name": "Lions",
    "status": null,
    "team_abbr": "DET",
    "pos": "D/ST",
    "fpts": 43.12,
    "avg": 5.9,
    "last": 8
  },
  {
    "name": "Xavier Worthy",
    "espn": "4683062",
    "status": null,
    "team_abbr": "KC",
    "pos": "WR",
    "fpts": 45.96,
    "avg": 5.03,
    "last": 0
  },
  {
    "name": "Jordan Mason",
    "espn": "4360569",
    "status": null,
    "team_abbr": "MIN",
    "pos": "RB",
    "fpts": 76.48,
    "avg": 6.36,
    "last": 5.9
  },
  {
    "name": "Tyler Allgeier",
    "espn": "4373626",
    "status": null,
    "team_abbr": "ARI",
    "pos": "RB",
    "fpts": 48.74,
    "avg": 7.45,
    "last": 1.3
  },
  {
    "name": "Brenton Strange",
    "espn": "4430539",
    "status": null,
    "team_abbr": "JAX",
    "pos": "TE",
    "fpts": 53.89,
    "avg": 7.17,
    "last": 7.9
  },
  {
    "name": "Jake Bates",
    "espn": "4689936",
    "status": null,
    "team_abbr": "DET",
    "pos": "K",
    "fpts": 75.71,
    "avg": 9,
    "last": 6
  },
  {
    "name": "DeMario Douglas",
    "espn": "4427095",
    "status": "BYE",
    "team_abbr": "NE",
    "pos": "WR",
    "fpts": 44.52,
    "avg": 8.18,
    "last": 0.9
  },
  {
    "name": "Keenan Allen",
    "espn": "15818",
    "status": null,
    "team_abbr": "SF",
    "pos": "WR",
    "fpts": 48.95,
    "avg": 7.74,
    "last": 8.6
  },
  {
    "name": "Tre Tucker",
    "espn": "4428718",
    "status": null,
    "team_abbr": "LV",
    "pos": "WR",
    "fpts": 50.19,
    "avg": 9.42,
    "last": 1.4
  },
  {
    "name": "Harrison Butker",
    "espn": "3055899",
    "status": null,
    "team_abbr": "KC",
    "pos": "K",
    "fpts": 68.15,
    "avg": 7.5,
    "last": 11
  },
  {
    "name": "Marvin Harrison Jr.",
    "espn": "4432708",
    "status": "OUT",
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 39.84,
    "avg": 4.57,
    "last": 0
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
    "name": "Hunter Henry",
    "espn": "3046439",
    "status": "BYE",
    "team_abbr": "NE",
    "pos": "TE",
    "fpts": 36.66,
    "avg": 6.73,
    "last": 3.2
  },
  {
    "name": "Adonai Mitchell",
    "espn": "4597500",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "WR",
    "fpts": 61.1,
    "avg": 7.98,
    "last": 7.4
  },
  {
    "name": "Xavier Hutchinson",
    "espn": "4686422",
    "status": null,
    "team_abbr": "HOU",
    "pos": "WR",
    "fpts": 65.16,
    "avg": 7.04,
    "last": 2.3
  },
  {
    "name": "TreVeyon Henderson",
    "espn": "4432710",
    "status": "IR",
    "team_abbr": "NE",
    "pos": "RB",
    "fpts": 0,
    "avg": 5.22,
    "last": 0
  },
  {
    "name": "Jacory Croskey-Merritt",
    "espn": "4575131",
    "status": "IR",
    "team_abbr": "WSH",
    "pos": "RB",
    "fpts": 58.23,
    "avg": 8.48,
    "last": 0
  },
  {
    "name": "Makai Lemon",
    "espn": "4870795",
    "status": null,
    "team_abbr": "PHI",
    "pos": "WR",
    "fpts": 46.05,
    "avg": 5.6,
    "last": 0.8
  },
  {
    "name": "Ryan Flournoy",
    "espn": "5083754",
    "status": null,
    "team_abbr": "DAL",
    "pos": "WR",
    "fpts": 48.97,
    "avg": 7.77,
    "last": 1.6
  },
  {
    "name": "Pat Freiermuth",
    "espn": "4361411",
    "status": null,
    "team_abbr": "PIT",
    "pos": "TE",
    "fpts": 51.58,
    "avg": 8.16,
    "last": 4.6
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
    "name": "Omar Cooper Jr.",
    "espn": "4723820",
    "status": "OUT",
    "team_abbr": "NYJ",
    "pos": "WR",
    "fpts": 41,
    "avg": 8.77,
    "last": 0
  },
  {
    "name": "Wan'Dale Robinson",
    "espn": "4569587",
    "status": "IR",
    "team_abbr": "TEN",
    "pos": "WR",
    "fpts": 0,
    "avg": 6.92,
    "last": 0
  },
  {
    "name": "Aaron Rodgers",
    "espn": "8439",
    "status": null,
    "team_abbr": "PIT",
    "pos": "QB",
    "fpts": 122.51,
    "avg": 13.8,
    "last": 5.2
  },
  {
    "name": "Jets",
    "status": null,
    "team_abbr": "NYJ",
    "pos": "D/ST",
    "fpts": 41.54,
    "avg": 4.3,
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
    "name": "Kaelon Black",
    "espn": "4696044",
    "status": null,
    "team_abbr": "SF",
    "pos": "RB",
    "fpts": 57.47,
    "avg": 5.53,
    "last": 13.6
  },
  {
    "name": "Chris Godwin Jr.",
    "espn": "3116165",
    "status": null,
    "team_abbr": "TB",
    "pos": "WR",
    "fpts": 43.63,
    "avg": 4.62,
    "last": 2.8
  },
  {
    "name": "Cam Ward",
    "espn": "4688380",
    "status": null,
    "team_abbr": "TEN",
    "pos": "QB",
    "fpts": 116.13,
    "avg": 12.94,
    "last": 9.74
  },
  {
    "name": "Michael Pittman Jr.",
    "espn": "4035687",
    "status": "IR",
    "team_abbr": "PIT",
    "pos": "WR",
    "fpts": 34.23,
    "avg": 4.13,
    "last": 0
  },
  {
    "name": "Justin Herbert",
    "espn": "4038941",
    "status": null,
    "team_abbr": "LAC",
    "pos": "QB",
    "fpts": 95.45,
    "avg": 10.77,
    "last": 16.26
  },
  {
    "name": "Caleb Douglas",
    "espn": "4869645",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 63.33,
    "avg": 9.1,
    "last": 4
  },
  {
    "name": "Buccaneers",
    "status": null,
    "team_abbr": "TB",
    "pos": "D/ST",
    "fpts": 54.9,
    "avg": 9.6,
    "last": 3
  },
  {
    "name": "Bengals",
    "status": null,
    "team_abbr": "CIN",
    "pos": "D/ST",
    "fpts": 47.02,
    "avg": 6.44,
    "last": 5
  },
  {
    "name": "Juwan Johnson",
    "espn": "3929645",
    "status": null,
    "team_abbr": "NO",
    "pos": "TE",
    "fpts": 38.74,
    "avg": 6.87,
    "last": 0
  },
  {
    "name": "Chase McLaughlin",
    "espn": "3150744",
    "status": null,
    "team_abbr": "TB",
    "pos": "K",
    "fpts": 78.35,
    "avg": 10,
    "last": 1
  },
  {
    "name": "Matt Gay",
    "espn": "4249087",
    "status": "Q",
    "team_abbr": "LV",
    "pos": "K",
    "fpts": 58.69,
    "avg": 9.6,
    "last": 8
  },
  {
    "name": "Devaughn Vele",
    "espn": "4569559",
    "status": null,
    "team_abbr": "NO",
    "pos": "WR",
    "fpts": 38.02,
    "avg": 7.98,
    "last": 5.4
  },
  {
    "name": "Dominic Zvada",
    "espn": "5082424",
    "status": null,
    "team_abbr": "NYG",
    "pos": "K",
    "fpts": 74.97,
    "avg": 8.44,
    "last": 2
  },
  {
    "name": "Dalton Schultz",
    "espn": "3117256",
    "status": null,
    "team_abbr": "HOU",
    "pos": "TE",
    "fpts": 54.98,
    "avg": 6.31,
    "last": 1.6
  },
  {
    "name": "Eddy Pineiro",
    "espn": "4034949",
    "status": null,
    "team_abbr": "SF",
    "pos": "K",
    "fpts": 58.87,
    "avg": 6.33,
    "last": 8
  },
  {
    "name": "Michael Mayer",
    "espn": "4429086",
    "status": null,
    "team_abbr": "LV",
    "pos": "TE",
    "fpts": 39.54,
    "avg": 6.51,
    "last": 2.8
  },
  {
    "name": "Brian Thomas Jr.",
    "espn": "4432773",
    "status": null,
    "team_abbr": "JAX",
    "pos": "WR",
    "fpts": 40.84,
    "avg": 3.68,
    "last": 4.4
  },
  {
    "name": "Malik Washington",
    "espn": "4569603",
    "status": null,
    "team_abbr": "MIA",
    "pos": "WR",
    "fpts": 49.88,
    "avg": 7.49,
    "last": 3.7
  },
  {
    "name": "Jonathon Brooks",
    "espn": "4678008",
    "status": "IR",
    "team_abbr": "CAR",
    "pos": "RB",
    "fpts": 24.95,
    "avg": 4.15,
    "last": 0
  },
  {
    "name": "Browns",
    "status": "BYE",
    "team_abbr": "CLE",
    "pos": "D/ST",
    "fpts": 48.35,
    "avg": 5.7,
    "last": 5
  },
  {
    "name": "Cairo Santos",
    "espn": "17427",
    "status": null,
    "team_abbr": "CHI",
    "pos": "K",
    "fpts": 73.41,
    "avg": 8.4,
    "last": 5
  },
  {
    "name": "Jake Ferguson",
    "espn": "4242355",
    "status": "OUT",
    "team_abbr": "DAL",
    "pos": "TE",
    "fpts": 22.88,
    "avg": 5.01,
    "last": 0
  },
  {
    "name": "Patriots",
    "status": "BYE",
    "team_abbr": "NE",
    "pos": "D/ST",
    "fpts": 32.01,
    "avg": 4.4,
    "last": -2
  }
];
