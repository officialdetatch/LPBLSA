# La Premier Bundesliga Serie A - site guide

## Running it
Open index.html in any browser. To put it online, upload this whole folder to
any static host (Netlify drop, GitHub Pages, Cloudflare Pages, your own server).
Keep the folder structure intact.

## Files - where everything lives

Rule of thumb: the main folders hold what the WHOLE website needs. Anything that
belongs to one league lives in that league's folder and starts with its name
(nfl-... or nba-...), so you always know which league a file is for.

  THE WHOLE SITE (root)
  index.html            league-neutral home: league buttons, latest 3 stories, tabbed Standings
  news.html             all stories, and the full article view
  teams.html            the Teams page: a carousel of cards per league
  about.html            the league's story - one page, see below
  contact.html          "join us / ask a question" page with a contact form
  news-writer.html      YOUR private tool for writing news (see below)
  about-manager.html    YOUR private tool for the About page (see below)
  assets/               what holds the website together, shared by every league:
    style.css             all colours, type and layout
    app.js                menu, ticker, news, standings rows, roster tables, about page, contact form
    leagues.js            the list of leagues everything reads from (open a new league here)
    nav.js                draws the navbar on every page
    news.js               the stories themselves - the only file you edit to post
    about-data.js         the About page content - edited via about-manager.html
    writer.js, about-manager.js   power news-writer.html / about-manager.html
    alerts.js, comments.js, fantasy-switcher.js, hero-leagues.js, standings-tabs.js, teams-view.js
    rules-view.js         draws a league's Reglas page from its rules-data file
    playoffs-view.js      draws and works out the playoff bracket (4 or 6 teams) - used by every league's Playoffs page and manager
  images/               your logos go here (see images/README.txt)
    leagues/              the round NFL / NBA / UCL logos used by the "otro Fantasy" bubble
  audio/                the commissioner theme (see audio/README.txt)

  NFL  (leagues/nfl/)
  nfl-landing-page.html        the NFL home: standings, teams in rank order, NFL news
  nfl-free-agents.html         searchable top 100 free agent board
  nfl-roster-manager.html      YOUR private tool for NFL rosters and free agents
  nfl-standings-manager.html   YOUR private tool for the NFL standings table
  teams/<team>.html            one page per NFL club: crest, roster, schedule
  assets/nfl-roster-data.js        every NFL roster + the free agent board (edited via the roster manager)
  assets/nfl-roster-manager.js     powers nfl-roster-manager.html only
  assets/nfl-standings-data.js     the NFL table (edited via the standings manager)
  assets/nfl-standings-manager.js  powers nfl-standings-manager.html only
  nfl-rules.html               the NFL Reglas page
  nfl-playoffs.html            the NFL Playoffs page: the bracket, who is out
  nfl-playoffs-manager.html    YOUR private tool for the NFL bracket
  assets/nfl-rules-data.js         the NFL rules (from the football rules sheet)
  assets/nfl-playoffs-data.js      who is seeded and who advanced (edited via the playoffs manager)
  assets/nfl-playoffs-manager.js   powers nfl-playoffs-manager.html only

  NBA  (leagues/nba/) - the same set, for basketball
  nba-landing-page.html        the NBA home - right now only the draft countdown (see below)
  nba-roster-manager.html      YOUR private tool for NBA rosters
  nba-standings-manager.html   YOUR private tool for the NBA table
  teams/  images/              NBA team pages and crests, later
  assets/nba-countdown.js          the draft-night timer on the NBA page
  assets/nba-teams-data.js         the NBA teams (empty until they exist)
  assets/nba-roster-data.js        NBA rosters + free agents (empty until they exist)
  assets/nba-roster-manager.js     powers nba-roster-manager.html only
  assets/nba-standings-data.js     the NBA table
  assets/nba-standings-manager.js  powers nba-standings-manager.html only
  nba-rules.html               the NBA Reglas page
  nba-playoffs.html            the NBA Playoffs page: the bracket, who is out
  nba-playoffs-manager.html    YOUR private tool for the NBA bracket
  assets/nba-rules-data.js         the NBA rules (from the basketball rules sheet)
  assets/nba-playoffs-data.js      who is seeded and who advanced (edited via the playoffs manager)
  assets/nba-playoffs-manager.js   powers nba-playoffs-manager.html only

  The NFL and NBA tools are separate copies on purpose: changing one never
  touches the other.

## Posting news - you are the only editor
The public pages have no edit button and no way to change anything. Stories are
read from assets/news.js, which lives on the server. Visitors can read it, but
they cannot change what anyone else sees - only you can, by replacing that file.

Open news-writer.html on your own computer to write. Fill in the headline,
date and summary, then build the story itself as a stack of blocks -
paragraphs, subtitles, images and videos, in any order you like:

- Add as many blocks as you want with the four "+ Add" buttons under the list.
- Use the up/down arrows to reorder a block, and click into any box to edit
  it directly - the same pattern as the other tools.
- For an image or video, upload the file itself into images/ first (an
  images/news/ folder keeps things tidy) and point the path box at it. Videos
  play inline the same size no matter how big the source file is.
- Any http(s) link typed straight into a paragraph - a Discord invite, a
  tweet, anything - turns into a real clickable link automatically. You do
  not need to write it as a link yourself.

When you are done, press "Download news.js" and drop that file into assets/,
replacing the old one. This page is not linked from the site's menu, so nobody
finds it by clicking around. If you would rather it never goes online at all,
delete news-writer.html and assets/writer.js before you upload - everything
else keeps working.

Stories written before this update still work exactly as they did - they are
stored a little differently behind the scenes (a single photo and a plain
list of paragraphs, instead of blocks), and news-writer.html understands
both. The moment you open an old story to edit it, it is shown in the same
block editor as everything else, and saving it upgrades it to the new
format automatically - nothing to do on your end.

The scrolling gold wire at the top reads window.LEAGUE_TICKER at the bottom of
the same file. Empty that array and it falls back to your news headlines.

## Updating standings - nfl-standings-manager.html
Standings are no longer plain HTML you edit by hand. They live in
leagues/nfl/assets/nfl-standings-data.js and you edit that file using
nfl-standings-manager.html - never by editing the table in index.html
directly, since app.js overwrites it with whatever nfl-standings-data.js says
every time the page loads.

Open leagues/nfl/nfl-standings-manager.html on your own computer. Every team is a row, in
rank order - the top row is 1st place. Use the up/down arrows in the Move
column to move a team to a different place in the table (a week's results
flipping two teams is just two clicks), and click into any of the W, L, T,
PCT, GB, PF, PA, Streak or Playoff boxes to edit it directly, the same way
you edit stats in the roster manager. If a team is ever missing from the
table - say you add a sixth team next season - a small panel appears above
it so you can add it to the bottom; there's a matching Remove button on
each row for a team that leaves the league.

When you are done, press Download, and index.html picks up the new file the
moment you replace it. Like the other two tools, this page is not linked
from the site's menu, your work is saved in the browser if you close the
tab mid-session, and there are links to jump to the roster manager or news
writer. If you would rather it never goes online at all, delete
leagues/nfl/nfl-standings-manager.html and leagues/nfl/assets/nfl-standings-manager.js before you upload -
the home page keeps working off whatever leagues/nfl/assets/nfl-standings-data.js already
says, it just loses the tool that edits it.

## About page - about-manager.html
The About page (about.html) is the story of the league - as much or as
little as you want to write, with photos wherever you want them. It is
edited with about-manager.html rather than by hand, the same idea as the
other tools but simpler: instead of a list of separate stories, there is
just one page, built from a stack of blocks.

Open about-manager.html on your own computer. At the top, set the page
title and the short gold intro line under it. Below that is the list of
blocks - paragraphs, subtitles, images and videos, the same four types as
the news writer. Add as many as you like with the "Add" buttons, use the
up/down arrows to put them in the order you want them to read, and click
into any box to edit it directly. Any http(s) link typed into a paragraph
becomes a real clickable link automatically. To add a photo or video,
upload the file itself into images/ first (an images/about/ folder keeps
things tidy) and point the path box at wherever you put it, exactly like a
news story.

When you are done, press Download about-data.js and drop the file into
assets/, replacing the old one. Like the other tools, your work is saved in
the browser if you close the tab mid-session, this page is not linked from
the site's menu, and there are links to jump to the other three tools. If
you would rather it never goes online at all, delete about-manager.html and
assets/about-manager.js before you upload - about.html keeps working off
whatever assets/about-data.js already says, it just loses the tool that
edits it.

## Contact page
contact.html is a "join us / ask a question" page with a form that emails
whatever the person types straight to info@lpblsa.vip - there is no server
of your own involved. That needs a free third-party service called
Formspree to actually deliver the email, and it takes about five minutes
to switch on:

  1. Go to formspree.io and sign up using info@lpblsa.vip
  2. Create a new form and confirm the verification email it sends you
  3. Copy the endpoint it gives you - it looks like https://formspree.io/f/xxxxxxx
  4. Open contact.html, find the <form ... action="..."> near the top of
     the page body, and paste your endpoint in place of
     https://formspree.io/f/YOUR_FORM_ID

Until you do that, the form will politely tell whoever submits it to email
you directly instead - it will not silently fail. The mailto link under the
form (and the Discord link next to it) work immediately either way, no
setup required. Formspree's free plan covers a generous number of
submissions a month, which should be more than enough for a league contact
form; if you ever want a different inbox, redo the steps above with the new
address and swap in the new endpoint.

## Managing rosters and free agents - nfl-roster-manager.html
Rosters and the free agent board are no longer baked into each team page by
hand. They all read from one file, leagues/nfl/assets/nfl-roster-data.js, and you edit that
file using nfl-roster-manager.html - never by editing the tables in leagues/nfl/teams/*.html
or nfl-free-agents.html directly, since app.js overwrites whatever is in those
tables with what nfl-roster-data.js says every time the page loads.

Open leagues/nfl/nfl-roster-manager.html on your own computer. Type a player's name - free
agent or already rostered, it does not matter - and a dropdown next to them
offers every move that is actually legal given where they are right now:

  - a free agent gets "Add to [Team] (Bench)" for all five teams
  - a rostered player gets "Drop to free agents," "Move to bench," "Move to
    IR," "Start at [slot]" for every slot on their own team (it shows who is
    currently there and bumps them to the bench automatically), and
    "Trade to [Team]" for the other four teams

A small form at the top lets you add a player who was never in the original
pool, in case a deep waiver pickup becomes relevant. A snapshot at the top
shows each team's Starters/Bench/IR counts so you can check the roster is
legal at a glance.

Every row in the "Every player" table also has editable boxes for Status,
Proj FPTS, AVG and LAST - for any player, free agent or rostered. Click into
one, type the new value, then click away (or press Tab or Enter) to save it.
The Status box takes any short tag: type Q, D, IR, OUT, SUSP or BYE (there is
a dropdown of these when you click in, but you can type anything), and clear
the box completely once a player is healthy again to remove the tag. This is
separate from "Move to injured reserve" in the Action column - that action
moves a player into the team's IR roster slot; the Status box just controls
the small badge shown next to their name on the public pages, and you can set
either one independently of the other.

Every move updates a "Your nfl-roster-data.js" box live. When you are done,
press Download, and drop the file into assets/, replacing the old one -
every page that shows a roster or the free agent list picks it up
immediately. Like news-writer.html, this page is not linked from the site's
menu, your work is saved in the browser if you close the tab mid-session,
and there is a small link between the two tools so you can jump between
posting news and managing the roster. If you would rather it never goes
online at all, delete leagues/nfl/nfl-roster-manager.html and leagues/nfl/assets/nfl-roster-manager.js
before you upload - the team and free agent pages keep working off whatever
leagues/nfl/assets/nfl-roster-data.js already says, they just lose the tool that edits it.

## Footer social links
Every page's footer has five round icons - Instagram, Threads, Discord, TikTok
and X - linking to the league's official pages:
  Instagram   instagram.com/lpblsa
  Threads     threads.com/@lpblsa
  Discord     the discord.gg invite link
  TikTok      tiktok.com/@lpblsa
  X           x.com/lpblsa_onX
They are plain HTML, the same five links repeated in every page, so if a URL
ever changes, search the project for that link (for example discord.gg) and
replace it everywhere it appears (10 pages: index, news, about, contact and
free-agents, plus the 5 team pages under leagues/nfl/teams/).
The icons are the white image files in images/socials-logo/. To swap one,
replace the file there and keep the same file name. The small size tweaks
that keep them looking even live in assets/style.css under .social-link img.

## Badge shapes
Every crest can be a pointed shield or a circle. The league logo in the header
is already round. To flip one, add or remove the class crest-circle:

  <span class="crest crest-lg">                 pointed shield
  <span class="crest crest-circle crest-lg">    circle

For the teams that come from data (standings tables, team cards, the managers), add
"shape": "circle" to the team in nfl-roster-data.js / nba-teams-data.js - that is how
Los Puntos de Pina is set up. The pages in leagues/nfl/teams/ are written out by hand,
so there it is the crest-circle class, as above.

To make them all round at once, see the "WANT EVERY BADGE ROUND?" block near
the top of assets/style.css.

## Manager bios
Each team page has a <p class="team-bio"> paragraph under the manager name.
Rewrite it directly in that team's html file. There is a comment right above
it so you can find it quickly.

## The commissioner pane
leagues/nfl/teams/puntos.html has extra pieces the other teams do not:

  - a gold "Meet the commissioner" button, and a clickable crest
  - a full-screen pane with THE COMMISSIONER in large gold type, your photo,
    your bio and your decrees. Edit that text inside leagues/nfl/teams/puntos.html, in the
    block marked COMMISSIONER BIO.
  - your photo: save it as images/commissioner.jpg
  - an anthem: save your sound file as audio/commissioner-theme.mp3

About the anthem starting by itself: browsers refuse to play sound until the
visitor has clicked somewhere on the page. Nothing can turn that off, so the
site does the next best thing - it tries immediately, then starts the moment
they click anything, and opening the commissioner pane always starts it. A
button in the bottom right corner lets anyone start or stop it, which also
keeps you on the right side of anyone browsing at work.

## Colours
Everything comes from the variables at the top of assets/style.css:
  --navy-950 / --navy-900 / --navy-800   backgrounds
  --gold / --gold-light / --gold-dark    accents
  --silver / --bronze                    podium rows 2 and 3
Change them there and the whole site follows.

## If you delete something and a page goes blank
It should not happen any more - each piece of the page checks for its own HTML
before running. But if you remove a whole section, also remove the matching
block in assets/app.js to keep things tidy.

## Email alerts for new news
When you add a NEW story to assets/news.js and push it, everyone who signed up
gets an email with the headline, summary, photo and a link. It runs on GitHub
(Actions) and sends through Brevo (free plan, 300 emails a day). You post news
exactly the way you always did - nothing changes there.

How it decides to send:
  - Only a NEW story id triggers an email. Editing an old story, or changing
    the ticker, sends nothing.
  - It waits until the live site shows the story, so the link never 404s.
  - A story is never emailed twice (unless you force it by hand).
  - More than 3 new stories in one push = it refuses, in case something is off.

Files:
  .github/workflows/news-alert.yml   the trigger
  scripts/send-news-alert.mjs        builds and sends the email (words in COPY)
  assets/alerts.js                   the signup box on the site (words in COPY)

### One-time setup (about 20 minutes)
1. Create a free account at brevo.com. Brevo may ask a few questions and
   approve the account before it lets you send - do this first.
2. Contacts > Lists: create a list (e.g. "LPBLSA News Alerts"). Write down
   its ID number.
3. Add your domain: Brevo > Senders, domains & dedicated IPs > Domains >
   add lpblsa.vip. Brevo shows DNS records; add them at wherever lpblsa.vip's
   DNS lives. ADD them next to your existing Zoho records - do not delete or
   replace the Zoho MX or SPF records - then click Authenticate in Brevo.
4. Senders: add newsletter@lpblsa.vip. Brevo emails a code to that address,
   so create that mailbox in Zoho first.
5. Signup form: Contacts > Forms > create a Subscription form, attach it to
   your list, turn on double opt-in (confirmation email), publish it. Open its
   share / embed code and copy the URL inside action="https://....sibforms.com/
   serve/...". Paste it into FORM_ACTION at the top of assets/alerts.js. Until
   you do, the signup box stays hidden.
6. API key: Brevo > SMTP & API > API keys > generate. If Brevo's "authorized
   IPs" security setting is on, turn it off - GitHub's servers change address.
7. GitHub repo > Settings > Secrets and variables > Actions:
     Secrets tab   -> New secret    BREVO_API_KEY   = the key from step 6
     Variables tab -> New variable  BREVO_LIST_ID   = the list number from step 2
   (Optional variables: SENDER_EMAIL, SENDER_NAME, REPLY_TO. Defaults are
   newsletter@lpblsa.vip, "La Premier Bundesliga Serie A", info@lpblsa.vip.)
8. Sign yourself up with the box on the site to make sure it works.

### Testing safely (Actions tab > "News alert email" > Run workflow)
  story_id = any id from assets/news.js, e.g. resumen-de-la-semana
  mode     = dry-run  builds the email only; download it from the run's
                      Artifacts and open it in a browser
           = test     emails ONLY the address you type in test_email
           = send     emails the whole list (use for a manual resend)
Try dry-run first, then test, and only then rely on the automatic sending.

### Good to know
  - Free-plan emails carry a small "Sent with Brevo" footer.
  - The free plan sends 300 emails per day. If the list ever passes 300
    people, the extra ones need a paid plan or a resend the next day.
  - Never put subscriber emails in this repo - it is public. Brevo holds them.
  - If a run fails, GitHub emails you; the log says why in plain words.

## One league, several fantasies (NFL + NBA + UCL)
The site is ONE league with one fantasy per sport:

  NFL   football     live      (the original site)
  NBA   basketball   live      (teams and rosters still to come)
  UCL   UEFA Champions League  next year - greyed out in the menu, does nothing when clicked

### The navbar (same on every page)
Home, About, Reglas, News, Leagues, Playoffs, Teams, Contact. Reglas, Leagues and Playoffs are
hover menus (tap on a phone) listing NFL / NBA / UCL; UCL is greyed out and does nothing.
Below 1100px wide the whole bar folds into the menu button.
It is NOT written into each page any more. assets/nav.js draws it, from the
league list in assets/leagues.js, so changing the menu or opening a league is
one edit. Each page only carries an empty <nav id="siteNav"> plus attributes on
<body> that say where it is:

  data-root    how far up the site root is ("" or "../" or "../../")
  data-active  the tab to light up: home about reglas news leagues playoffs teams contact
  data-league  on a league's own pages: nfl / nba / ucl

### The folders
See "Files - where everything lives" at the top. In short: the root and assets/ hold
what the whole site needs; leagues/nfl/ and leagues/nba/ each hold that league's
landing page, its two private managers, its data files and its team pages, all named
nfl-... / nba-... so you can never mix them up.

Colours, fonts and layout are shared - every league page loads the same
assets/style.css, assets/app.js and assets/news.js, so a change there changes
all of them.

### The Teams page
teams.html shows every team as a card - crest, name, and a link to its
page when it has one - in a scrolling carousel per league (arrows appear when a
row is wider than the screen). A team with no crest picture shows its initials on
a round badge. NBA says "Equipos por confirmar" until teams exist, and UCL says it is
available next year.

### The Reglas pages
Each league has its own rules page in its own folder: leagues/nfl/nfl-rules.html and
leagues/nba/nba-rules.html. The navbar's Reglas menu (next to About) lists them; UCL is
greyed out until it has rules. The headline is "Las reglas son las reglas." The page shows
Basics and Roster as tiles (one tile per position), the scoring lists, and for the NBA the
Games Played limit - with "Secciones" jump links at the top.

The rules themselves are copied straight from your two rules spreadsheets into
leagues/nfl/assets/nfl-rules-data.js and leagues/nba/assets/nba-rules-data.js (the .xlsx
files are not part of the website). To change a rule, edit the number or text in that file
and save - the top of each file explains the little format. assets/rules-view.js draws the
page. When UCL opens: set it to 'live' in assets/leagues.js and give it a  rules  page
(see the fields listed at the top of leagues.js), copying leagues/nba/nba-rules.html and
leagues/nba/assets/nba-rules-data.js (change LPBSA_RULES.nba to LPBSA_RULES.ucl in the copy).

To change the headline or the line under it, edit the hero at the top of nfl-rules.html /
nba-rules.html.

### The Playoffs pages (and their managers)
Everything playoff-related for a league lives in that league's folder:

  leagues/nfl/nfl-playoffs.html            the public page: the bracket, the champion, who is out
  leagues/nfl/nfl-playoffs-manager.html    YOUR private tool (not linked anywhere)
  leagues/nfl/assets/nfl-playoffs-data.js  the data the page reads (the manager writes it)
  (and the same three with nba- in leagues/nba/)

The only shared piece is assets/playoffs-view.js, which draws the bracket and works out
who advances; the page and the manager both use it, so the manager shows exactly what
visitors will see. The Playoffs menu in the navbar links to each league's page.

Two bracket shapes, taken from the league's bracket pictures:
  4 teams   ROUND 1 (No.1 v No.4, No.2 v No.3) -> CHAMP          (NFL: 5 teams, top 4 qualify)
  6 teams   ROUND 1 (No.1 and No.2 have a BYE; No.4 v No.5; No.3 v No.6) -> ROUND 2 -> CHAMP   (NBA: 10 teams, top 6)
The NFL is set to 4 and the NBA to 6; the manager has a "Bracket" box if that ever changes.

How to run the playoffs with the manager (open leagues/nfl/nfl-playoffs-manager.html from
your folder):
  1. Seeds - pick who is No. 1, No. 2 ... or press "Fill from standings" to take the top
     of the table. Any team of the league that is not seeded shows as "Fuera de playoffs".
  2. Results - as each game is played, click the team that won. It moves to the next round
     and the other team is marked OUT and listed under "Eliminados". Click the winner
     again to undo. A BYE moves the seed forward by itself. Click the winner of the
     final and the champion banner appears.
  3. Press "Download nfl-playoffs-data.js", drop it into leagues/nfl/assets/ replacing the
     old one, and push. Nothing changes on the site until you do. Unsaved work is kept in
     your browser, so you can close the tab and come back.
Changing a seed removes only the results that depended on it. Nobody is ever typed in as
"eliminated" - it follows from who advanced. The data file's top explains the format.

### The home page (index.html)
It no longer belongs to one sport. It has the news wire, league buttons (NFL / NBA,
UCL greyed out), the latest 3 stories from every league (each with a small NFL / NBA /
UCL badge), and one "Standings" section with a tab per league. Each tab shows that
league's own table and a "Ver la liga" link. The UCL tab is greyed and does nothing
until UCL is set to live in assets/leagues.js. The old hero numbers (top of the table,
most points, weeks to survive) now live on the NFL page, leagues/nfl/nfl-landing-page.html.
Standings still come from each league's own <league>-standings-data.js - nothing changed for
the managers. assets/standings-tabs.js draws the tabs, assets/hero-leagues.js the buttons.

### League landing pages
Each has the standings table, then the teams as cards in standings order (a gold
rank badge on each), then that league's latest news. Open a new league by copying
leagues/nba/ and changing its data.

### News: one list, split by league
All stories - NFL, NBA, UCL - are still written in news-writer.html and saved into
the ONE assets/news.js. The writer has a "League" picker at the top of the form;
each story is stored with a "league" value (football / basketball / soccer - kept
as before so old stories still work; a story with no league counts as NFL).

  - news.html shows buttons (Todas / NFL / NBA) and one section per league.
    news.html?sport=basketball opens with only that league. A UCL section appears
    by itself once the first UCL story is posted.
  - The home page shows the latest stories from every league, each with its badge.
    A league's landing page shows only its own.
  - Two stories cannot share a "Link name" - the writer refuses, because the
    links and the email alerts use that name.
  - Email alerts work as before. An NBA story's email says "Noticias de la liga - NBA".

### NBA standings and rosters
Open leagues/nba/nba-standings-manager.html on your own computer. It works like the NFL
one (arrows to reorder, click a box to edit) without the T column, since basketball
has no ties. Press Download, then drop the file (it is named nba-standings-data.js)
into leagues/nba/assets/ replacing the old one. The manager lists the teams found in
leagues/nba/assets/nba-teams-data.js, so add the teams there first (the file explains
the format).

leagues/nba/nba-roster-manager.html is the NBA twin of the NFL roster manager: draft
players from free agency, bench, start, drop or trade them. It downloads
nba-roster-data.js for leagues/nba/assets/. The starting lineup in that file is the
league's real one from the rules sheet - 9 starters: PG SG SF PF C G F UTIL UTIL
(NBA_STARTER_SLOTS). The NBA rosters are not shown on any public page yet; that comes
with the NBA team pages.

### When the NBA teams and rosters arrive
Fill in leagues/nba/assets/nba-teams-data.js - they appear on the NBA page, the Teams
page and both NBA managers at once. Individual NBA team pages are not built yet. When
they exist, set  teamPages: 'leagues/nba/teams/'  for the nba league in assets/leagues.js
and the team names become links.

### The NBA countdown page
Until the NBA teams are ready, leagues/nba/nba-landing-page.html shows only a countdown:
"La expansion fue confirmada - NBA DRAFT este Domingo a las 9PM", with a timer to
Sunday 4 Oct 2026, 9PM New York time. The moment the timer hits zero the page swaps
itself (no reload) to "ESTAMOS TRABAJANDO EN EDITAR LOS EQUIPOS - CHECK PRONTO!", and
anyone opening the page after that sees that message straight away.

  - The draft time is one line on the page: data-target="2026-10-04T21:00:00-04:00"
    (year-month-day, T, hour:min:sec, then the New York offset: -04:00 while clocks
    are on summer time, -05:00 in winter). Change it there to move the draft.
  - The old NBA page (hero, standings, teams, news) is still in the file, switched off
    inside one big HTML comment. The comment itself says how to bring it back: delete the
    countdown section, remove the comment start and end lines, and uncomment the three
    scripts at the bottom.
  - The home page, the Teams page, the menu and the bubble still point at this page.

### Comments and login (news stories)
Under every news story there is a "Comentarios" section: visitors log in (Google or email +
password), comment, reply, and delete their own. The commissioner can delete any comment and
block a person. It is all in assets/comments.js, loaded by news.html. The accounts and comments
live in a free Firebase project, so the site itself stays plain files on GitHub.

It stays completely invisible until you paste your Firebase details into FIREBASE_CONFIG at the
top of assets/comments.js. The click-by-click setup is in FIREBASE-SETUP.md, and the safety rules
that go into Firebase are in firestore.rules. The wording on screen is the COPY block in
comments.js. app.js tags each article with data-story="<story id>" so each story gets its own
comment thread (so never change a story's id once people have commented on it).

### The coffee button
The floating bubble now says "Quieres ver la info de otro Fantasy, o comprarme un café?" and its
panel ends with a wide "Invitame un café" button for Buy Me a Coffee. Its address is the single
line  coffeeUrl: ''  near the top of assets/fantasy-switcher.js - paste your page there, for
example  coffeeUrl: 'https://buymeacoffee.com/yourname',  and the button turns into a live link
(opens in a new tab). While that line is empty the button shows a greyed "Pronto". The wording is
the  prompt,  coffeeLabel  and  coffeeSub  lines in the same place; set  coffee: false  to remove it.

### The bubble logos
The floating bubble shows images/leagues/nfl.png,
nba.png and ucl.png (set by the logo field of each league in assets/leagues.js). To
change one, replace that file and keep the name (256x256 is plenty).
