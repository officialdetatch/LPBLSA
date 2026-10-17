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
  index.html            league-neutral home: league tiles, La Jornada, latest 3 stories,
                        tabbed Standings, Los Premios, Socials (see "The Socials section")
  404.html              the "page not found" page GitHub Pages shows for a broken link
  news.html             all stories, and the full article view
  teams.html            the Teams page: a carousel of cards per league
  about.html            the league's story - one page, see below
  contact.html          "join us / ask a question" page with a contact form
  news-writer.html      YOUR private tool for writing news (see below)
  about-manager.html    YOUR private tool for the About page (see below)
  consola.html          YOUR commissioner console: every private tool in one place, with a Publish
                        button that saves straight to GitHub from any device, phone included
                        (see "The Consola" below); consola-manifest.json + images/consola-icon-*.png
                        make it a Home Screen app
  assets/               what holds the website together, shared by every league:
    style.css             all colours, type and layout
    app.js                menu, ticker, news, standings rows, roster tables, about page, contact form
    leagues.js            the list of leagues everything reads from (open a new league here)
    nav.js                draws the navbar on every page
    news.js               the stories themselves - the only file you edit to post
    about-data.js         the About page content - edited via about-manager.html
    writer.js, about-manager.js   power news-writer.html / about-manager.html
    publish.js            the Consola's engine: the GitHub key, newest-copy loading, Publish, photo
                          upload, and the drafts every tool keeps (loaded by every private tool)
    console.js, console.css   consola.html itself, the Publish bar and the tools' phone layout
    alerts.js, comments.js, firebase-config.js, push.js, fantasy-switcher.js, hero-leagues.js, standings-tabs.js, teams-view.js
    rules-view.js         draws a league's Reglas page from its rules-data file
    playoffs-view.js      draws and works out the playoff bracket (4 or 6 teams) - used by every league's Playoffs page and manager
    team-page.js          the parts of an NBA team page that keep themselves up to date (record, rank, schedule)
    tv.js                 LPBLSA TV, the league's own video player (see "LPBLSA TV" below)
    socials-view.js, socials-data.js   the Socials section (socials-data.js is made by socials-writer.html)
  images/               your logos go here (see images/README.txt)
    leagues/              the round NFL / NBA / MLB logos used by the "otro Fantasy" bubble
  audio/                the commissioner theme (see audio/README.txt)
  scripts/              what the GitHub Actions run (you never run these yourself):
    send-news-alert.mjs     the email alert for a new story (news-alert.yml)
    send-push-alert.mjs     the push notification for a new story (push-alert.yml)
    fetch-instagram.py      the Instagram card's latest posts (instagram-feed.yml) - see INSTAGRAM-SETUP.md
  .github/workflows/    the Actions themselves: news-alert.yml, push-alert.yml, instagram-feed.yml
  PUSH-SETUP.md, FIREBASE-SETUP.md, INSTAGRAM-SETUP.md   one-time setup guides

  NFL  (leagues/nfl/)
  nfl-landing-page.html        the NFL home: standings, teams in rank order, NFL news
  nfl-free-agents.html         searchable top 100 free agent board
  nfl-roster-manager.html      YOUR private tool for NFL rosters and free agents
  nfl-standings-manager.html   YOUR private tool for the NFL standings table
  teams/<team>.html            one page per NFL club: crest, roster, schedule
  assets/nfl-roster-data.js        every NFL roster + the free agent board (edited via the roster manager)
  assets/nfl-roster-manager.js     powers nfl-roster-manager.html only
  assets/nfl-standings-data.js     the NFL table (edited via the standings manager)
  assets/nfl-schedule-data.js      the whole NFL regular season, week by week (see "La Jornada")
  assets/nfl-standings-manager.js  powers nfl-standings-manager.html only
  nfl-rules.html               the NFL Reglas page
  nfl-playoffs.html            the NFL Playoffs page: the bracket, who is out
  nfl-playoffs-manager.html    YOUR private tool for the NFL bracket
  assets/nfl-rules-data.js         the NFL rules (from the football rules sheet)
  assets/nfl-playoffs-data.js      who is seeded and who advanced (edited via the playoffs manager)
  assets/nfl-playoffs-manager.js   powers nfl-playoffs-manager.html only

  NBA  (leagues/nba/) - the same set, for basketball
  nba-landing-page.html        the NBA home: La Jornada, standings, Los Premios, teams, NBA news
  nba-free-agents.html         searchable top 100 free agent board
  nba-roster-manager.html      YOUR private tool for NBA rosters and free agents
  nba-standings-manager.html   YOUR private tool for the NBA table
  teams/<team>.html            one page per NBA team: logo, bio, roster, schedule (see "The NBA teams")
  images/                      the NBA team logos (see images/README.txt in that folder)
  assets/nba-teams-data.js         the six NBA teams: names, initials, logos
  assets/nba-roster-data.js        every NBA roster + the free agent board (edited via the roster manager)
  assets/nba-roster-manager.js     powers nba-roster-manager.html only
  assets/nba-standings-data.js     the NBA table (edited via the standings manager)
  assets/nba-schedule-data.js      the NBA regular season, matchup by matchup (15 matchups, Oct 20 - Jan 31)
  assets/nba-standings-manager.js  powers nba-standings-manager.html only
  assets/nba-countdown.js          the old draft-night timer - no page loads it any more (kept for a future countdown)
  nba-rules.html               the NBA Reglas page
  nba-playoffs.html            the NBA Playoffs page: the bracket, who is out
  nba-playoffs-manager.html    YOUR private tool for the NBA bracket
  assets/nba-rules-data.js         the NBA rules (from the basketball rules sheet)
  assets/nba-playoffs-data.js      who is seeded and who advanced (edited via the playoffs manager)
  assets/nba-playoffs-manager.js   powers nba-playoffs-manager.html only

  The NFL and NBA tools are separate copies on purpose: changing one never
  touches the other.

## Look and feel (2026 redesign)
  Fonts         Barlow Condensed (titles, buttons, numbers) + Barlow (text), loaded from
                Google Fonts at the top of every page.
  Colours       still the league's navy + gold - all of them are set once at the top of
                assets/style.css (:root), so a change there changes the whole site.
  The "slash"   the gold diagonal bar (hero headline, section titles, active menu tab,
                team rank badges) is the site's signature - it is drawn by CSS, no images.
  Home hero     the big crest is images/league-logo.png. The league tiles under it are
                drawn by assets/hero-leagues.js from assets/leagues.js and show the
                current #1 of each league by themselves (from its standings file).
  News cards    each card uses the story's FIRST picture as its cover. A photo (.jpg)
                fills the card; a logo or graphic (.png) is shown whole; a video shows a
                real picture from the clip (YouTube: its own thumbnail) with the gold play
                button and its length; no picture = the league's logo.
                So: put the photo or video you want on the card first in the story.
  Reading       a single story (news.html#<story>) hides the "Noticias de la Liga" header so
                the headline is the top of the page, draws a thin gold bar under the menu
                that fills as you read, and on a wide screen shows "Lo último" (the newest
                five stories, every league) beside it. The comments stay under the story.
  New season    while every team in a league is still 0-0 nobody gets the gold / silver /
                bronze in the tables, the home Standings tab says "Pretemporada", and the
                league page's hero shows the opening day and the number of teams instead of
                a leader. It all switches by itself once the first results are saved.
  Images        keep crests and logos around 512px wide - they are shown small, and a
                2 MB logo makes the site slow on phones.

## LPBLSA TV (assets/tv.js) - the video player
Every video in a story or on the About page plays in the league's own player - an uploaded
file (images/news/clip.mp4) and a YouTube link alike. Nothing to do: write the story in
news-writer.html as always ("+ Add video" or "+ Add YouTube video").

  The box        navy frame, the crest in the top corner like a TV channel's logo, the gold
                 play button, the clip's length, and "LPBLSA TV" under it. Upright phone
                 videos and YouTube Shorts get a tall box instead of black bars.
  Controls       an uploaded file gets our own: play/pause, the gold time bar, sound, full
                 screen (they fade while it plays). Keys: space or K, the arrows (5 s), M, F.
  YouTube        shows the video's picture and our play button; YouTube's player only loads
                 when someone presses play (faster page, and YouTube sees nothing until then).
  La cajita      scroll away while a video plays and it keeps going in a small box in the
                 bottom corner (X closes it, the arrow takes you back to it). An uploaded video
                 even keeps playing while you open another story.
  One at a time  starting a video pauses the others.
  Video files    use .mp4. An iPhone .mov is usually HEVC: it can be 5x bigger and some Android
                 phones and Windows browsers cannot play it (the player then says so instead of
                 showing a black box). The writer warns you when a video path ends in .mov.
  The words      the player's Spanish labels are in TEXT at the top of assets/tv.js.
  Without it     if tv.js is ever missing, uploaded videos still play with the browser's own
                 controls and a YouTube video opens on YouTube.

## The parts that run themselves (assets/jornada.js)
They work for every league (NFL and NBA now, MLB the day it goes live). On the home page
each one gets a tab per league as soon as that league has the data it needs; a league
without it simply doesn't show up yet. Each league's own page shows its own.

  La Jornada    this week's matchups: both crests, records, points per week, a line of
                trash talk, who is on bye, and a countdown ("Kickoff en ..." for NFL,
                "Tip-off en ..." for NBA) that turns into "En juego" when the games start.
                The week comes from the league's schedule file
                (leagues/<league>/assets/<league>-schedule-data.js), so it moves to the next
                week by itself - nothing to edit during the season. The top of each schedule
                file explains its format (the NBA one covers the short first matchup and
                what to do if a matchup ever runs two weeks). The NBA calls its weeks
                "Matchup" (weekLabel in its schedule file). On the home page it opens on the
                league whose games are on right now.
  Los Premios   up to four awards worked out from the standings every time the page opens:
                El Dueño (1st), La Aplanadora (most points per week but not 1st),
                El Suertudo (high in the table with a bad point differential),
                Bendito (the opposite), El Saco de Boxeo (most points against),
                En Llamas / Congelado (a streak of 2 or more), El Sótano (last),
                Ni Fu Ni Fa (the most average team). A team only gets one award.
                Save new standings = new awards. They hide until every team has played.
  League hero   on a league page, the week, the leader, most points per week and weeks
                left keep themselves up to date (the data-auto="..." spots).
  Stories       every story has a "Compartir" button (the phone's share sheet, or it
                copies the link on a computer) and "Mandarlo al grupo" (WhatsApp).
  Link previews pasting any lpblsa.vip link in WhatsApp, iMessage or X shows
                images/social-card.png with the title (the og: tags in each page's <head>).
  404.html      "Página en el IR" - shown by GitHub Pages for any address that does
                not exist. Its paths start with "/" on purpose; it only looks right on
                the real site.
  The crest     tap the big crest on the home page. Then tap it some more. (7 times.)

## Going live: MLB
(The NBA went live after the draft on Oct 11 2026 - see "The NBA teams" further down.)

MLB (the baseball division, starting next season) is already in assets/leagues.js as 'soon':
it shows greyed out ("Pronto") in the menus, on the home page tiles, the Standings tabs, the
Teams page and the bubble, and says "Se está cocinando". Its logo is images/leagues/mlb.png -
the league crest with a baseball (gold stitches, like the other balls), made to match the
others: replace that file if you get an official one.
To keep MLB a secret for now, put // in front of its lines in assets/leagues.js.
News is already ready for it: the news writer has an MLB button, the News page grows its
section by itself with the first story, and the email / phone alerts say MLB.

To open MLB:
  1. Copy the leagues/nba/ folder to leagues/mlb/ and rename every nba- file to mlb-.
     Inside each data file change .nba to .mlb (LPBSA_TEAMS.mlb, LPBSA_SCHEDULE.mlb,
     LPBSA_RULES.mlb, LPBSA_PLAYOFFS.mlb), and in the pages change the nba paths, titles,
     texts and the og: lines at the top to MLB.
  2. assets/leagues.js: set MLB's status to 'live' and give it home / rules / playoffs.
  3. index.html: take the comment marks off the four MLB lines near the bottom.
     teams.html: add the MLB teams file next to the NBA one.
  4. Phone alerts: firestore.rules already accepts 'baseball' - publish it again
     in Firebase (Firestore > Rules) the day the league opens, so phones can ask for it.
  Everything else - menus, the bubble, news badges, the hero tile, standings tab,
  La Jornada and Los Premios - picks it up by itself.

  Baseball differences to remember when MLB opens (send me the rules sheet, teams and
  ESPN schedule like the NBA and it gets built the same way):
  - ties can happen in baseball, so MLB keeps the T column (noTies: false in leagues.js)
  - the roster manager's positions and "who may start where" (C, 1B, 2B, 3B, SS, OF, UTIL,
    SP, RP, P...) come from the rules sheet - the NBA copy's SLOT_FITS is the model
  - the countdown word: the schedule file's kickoff label, e.g. "Play ball"

## The Consola - publishing from your phone (consola.html)
One private page with every tool on it: lpblsa.vip/consola.html. It is not linked from the
site and does nothing without your GitHub key, which only lives on your own devices. With the
key on a device, every tool there gets a gold Publish bar at the bottom:

  - The tool opens with the newest copy of its file straight from GitHub (never an old copy
    of the site), and the bar says "Up to date" or "Unpublished changes".
  - Publish saves the file to GitHub - the same as a commit + push from the computer. The site
    updates in about a minute, and a new story sends the email and phone alerts on its own.
    Every commit from the Consola starts with "Consola:".
  - If the file changed on GitHub after the page opened (you pushed from the computer, say),
    Publish refuses and offers Reload, so the phone can never undo a newer change.
  - The News writer can upload photos (resized to 1600 px, saved in images/news/) and videos
    (up to 25 MB; longer ones go on YouTube) right from the phone, and edits the gold wire.
  - Standings and rosters turn into one card per team / player on a phone.
  - On a device with the key, the navbar gets a "Consola" tab (visitors never see it).
Without the key (on the computer, opening the files from your folder) every tool works exactly
as before: Download, then push.

One-time setup, on each device (the steps are also on the page itself):
  1. Open lpblsa.vip/consola.html, put it on the Home Screen (iPhone: Safari > Share > Add to
     Home Screen) and open it from that icon. The Home Screen app keeps its own storage, so do
     steps 2 and 3 inside it.
  2. Make a key on GitHub: github.com/settings/personal-access-tokens/new
       Token name: LPBLSA consola   Expiration: up to you
       Repository access: Only select repositories > LPBLSA
       Permissions > Repository permissions > Contents: Read and write   (nothing else)
     Generate token and copy it (github_pat_...).
  3. Paste it in the Consola and press "Save and test". It checks the key without changing
     anything in the repo.
The key can change files in the LPBLSA repository and nothing else. Lost the phone, or the key
expired? Delete / regenerate it on GitHub (Settings > Developer settings > Personal access
tokens > Fine-grained tokens) and paste the new one. "Remove the key from this device" on the
Consola takes it off one device.

THE ONE HABIT: after publishing from the phone, run  git pull  on the computer before your next
push (the Consola reminds you when the newest change came from it). If git ever says your push
was rejected, that is all it means: git pull, then push.

Drafts: each tool keeps your unpublished changes in that browser. A draft is only loaded on the
same version of the file it was made on; if the file changed since (from another device), the
tool says so and offers "Load them anyway" instead of quietly putting old data back.

## Posting news - you are the only editor
The public pages have no edit button and no way to change anything. Stories are
read from assets/news.js, which lives on the server. Visitors can read it, but
they cannot change what anyone else sees - only you can, by replacing that file.

Open news-writer.html on your own computer to write. Fill in the headline,
date and summary, then build the story itself as a stack of blocks -
paragraphs, subtitles, images, videos and YouTube videos, in any order you like:

- Add as many blocks as you want with the five "+ Add" buttons under the list.
- Use the up/down arrows to reorder a block, and click into any box to edit
  it directly - the same pattern as the other tools.
- For an image or video, upload the file itself into images/ first (an
  images/news/ folder keeps things tidy) and point the path box at it. Videos
  play inline the same size no matter how big the source file is.
- For a YouTube video, press "+ Add YouTube video" and paste its link (the Share
  button, or the address bar - youtu.be/..., youtube.com/watch?v=... and Shorts all
  work). Nothing to download or upload: the story shows YouTube's own player with its
  play screen (a Short is shown tall), with a "Ver en YouTube" link under it. On the
  home page and the news page the story's card uses the video's thumbnail with a play
  button when the video is the first picture in the story. The writer tells you if the
  link is not a YouTube link. (Private videos, or ones whose owner switched off
  embedding, show YouTube's own "unavailable" message.)
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
the same file. Edit its lines in the "Gold wire" section of news-writer.html (add,
reorder, delete); with no lines it falls back to your news headlines.

From the Consola (see above) the same writer has a Publish button instead of the
download step, and "Upload a photo" / "Upload a video" under image and video blocks.
A story still sitting in the form when you press Publish is added to the list first.

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

## The Socials section (home page)
Three cards always come first, then any Threads posts:
  Instagram the @lpblsa profile with a grid of the 9 latest posts and the newest caption. It
            updates itself: Instagram has no profile embed, so a GitHub Action
            (instagram-feed.yml) reads the posts every 4 hours and saves them on the side branch
            "instagram-feed"; the card reads them from there. Needs a one-time setup:
            INSTAGRAM-SETUP.md. Until then (or if it ever stops) the card shows your newest
            Instagram post from socials-writer.html instead - that is why only ONE post shows
            before the setup is done.
  TikTok    TikTok's own profile card: avatar, numbers and a scrolling row of your latest videos. It
            updates itself, but TikTok's server sometimes answers "overload-protect triggered" and
            the card shows an error box. If that bothers you, set TIKTOK_MODE to 'latest' near the top
            of assets/socials-view.js: the card then shows your newest saved TikTok video (cover +
            play button) and you paste each new TikTok link in socials-writer.html, like for X.
  X.com     your NEWEST X post as X's own embedded post, plus "Ver más posts en X".
Why X is not a live profile feed: X's timeline widget often shows nothing to visitors who are not
logged in, and there is no free way to read its latest posts. A single post embed works every time.
So when you post on X (or on TikTok, in 'latest' mode): copy the post's link, paste it in socials-writer.html, make sure it is the top one,
copy the new socials-data.js it makes, and push. Older posts stay in the file but only the newest
TikTok and the newest X post show.
Which accounts: LIVE (Instagram), LATEST (TikTok, X) and TIKTOK_MODE at the top of assets/socials-view.js.
"Show" in the writer counts the three cards too: 3 = Instagram, TikTok and X.

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
replace it everywhere it appears (every public page has them, including the
team pages under leagues/nfl/teams/ and leagues/nba/teams/).
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
it so you can find it quickly. Same for the NBA team pages in leagues/nba/teams/
(they say "Bio en camino" until you write one).

## The commissioner pane
leagues/nfl/teams/puntos.html has extra pieces the other teams do not (and
leagues/nba/teams/puntos.html has its own copy - same photo and anthem, its own
bio and decrees, so edit each one in its own page):

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

## One league, several fantasies (NFL + NBA + MLB)
The site is ONE league with one fantasy per sport:

  NFL   football     live      (the original site)
  NBA   basketball   live      (6 teams, drafted Oct 11 2026)
  MLB   baseball     soon      (next season - greyed out in the menu, does nothing when
                                clicked: "Se está cocinando")

### The navbar (same on every page)
All in Spanish: Inicio, Nosotros, Reglas, Noticias, Divisiones, Playoffs, Equipos, Tienda,
Contáctanos. Reglas, Divisiones and Playoffs are hover menus (tap on a phone) listing
NFL / NBA / MLB with the sport in Spanish under each (the  sport  field in assets/leagues.js);
MLB is greyed out and does nothing. On a computer the bar always stays on one row (if the
window is tight, the league name in the corner shortens with "..."); below 1280px wide the
whole bar folds into the menu button. The labels are one line each in assets/nav.js.
It is NOT written into each page any more. assets/nav.js draws it, from the
league list in assets/leagues.js, so changing the menu or opening a league is
one edit. Each page only carries an empty <nav id="siteNav"> plus attributes on
<body> that say where it is:

  data-root    how far up the site root is ("" or "../" or "../../")
  data-active  the tab to light up: home about reglas news leagues playoffs teams contact
  data-league  on a league's own pages: nfl / nba / mlb

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
a round badge (every NBA team, until their logos arrive). MLB says "Se está cocinando"
until it opens.

### The Reglas pages
Each league has its own rules page in its own folder: leagues/nfl/nfl-rules.html and
leagues/nba/nba-rules.html. The navbar's Reglas menu (next to About) lists them; MLB is
greyed out until it has rules. The headline is "Las reglas son las reglas." The page shows
Basics and Roster as tiles (one tile per position), the scoring lists, and for the NBA the
Games Played limit - with "Secciones" jump links at the top.

The rules themselves are copied straight from your two rules spreadsheets into
leagues/nfl/assets/nfl-rules-data.js and leagues/nba/assets/nba-rules-data.js (the .xlsx
files are not part of the website). To change a rule, edit the number or text in that file
and save - the top of each file explains the little format. assets/rules-view.js draws the
page. When MLB opens: set it to 'live' in assets/leagues.js and give it a  rules  page
(see the fields listed at the top of leagues.js), copying leagues/nba/nba-rules.html and
leagues/nba/assets/nba-rules-data.js (change LPBSA_RULES.nba to LPBSA_RULES.mlb in the copy).

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
  6 teams   ROUND 1 (No.1 and No.2 have a BYE; No.4 v No.5; No.3 v No.6) -> ROUND 2 -> CHAMP
Both leagues are set to 4 (the NBA has 6 teams, top 4 qualify); the manager has a "Bracket"
box if that ever changes.

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
MLB greyed out), the latest 3 stories from every league (each with a small NFL / NBA /
MLB / LIGA badge), and one "Standings" section with a tab per league. Each tab shows that
league's own table and a "Ver la liga" link. The MLB tab is greyed and does nothing
until MLB is set to live in assets/leagues.js. The old hero numbers (top of the table,
most points, weeks to survive) now live on the NFL page, leagues/nfl/nfl-landing-page.html.
Standings still come from each league's own <league>-standings-data.js - nothing changed for
the managers. assets/standings-tabs.js draws the tabs, assets/hero-leagues.js the buttons.

### League landing pages
Each has the standings table, then the teams as cards in standings order (a gold
rank badge on each, once a game has been played), then that league's latest news. Open a new league by copying
leagues/nba/ and changing its data.

### News: one list, split by league
All stories - NFL, NBA, MLB and league-wide ones - are still written in news-writer.html
and saved into the ONE assets/news.js. The writer has a "League" picker at the top of the form;
each story is stored with a "league" value (all / football / basketball / baseball - kept
as before so old stories still work; a story with no league counts as NFL).

  - news.html shows buttons (Todas / NFL / NBA) and one section per league.
    news.html?sport=basketball opens with only that league. An MLB section appears
    by itself once the first MLB story is posted.
  - The home page shows the latest stories from every league, each with its badge.
    A league's landing page shows only its own.
  - League-wide news: pick "ALL" in the writer's League row for updates and announcements
    that belong to no single fantasy (value "all" in news.js). It appears on the home page,
    on every league's page (with an outlined LIGA badge), in the wire and in "more stories",
    and on news.html under its own "Liga" button + section (shown once one exists; rename it
    in SPORTS at the top of assets/app.js). Its phone alert and email go to everyone.
  - Two stories cannot share a "Link name" - the writer refuses, because the
    links and the email alerts use that name.
  - Email alerts work as before. An NBA story's email says "Noticias de la liga - NBA".

### NBA standings and rosters
Open leagues/nba/nba-standings-manager.html on your own computer. It works like the NFL
one (arrows to reorder, click a box to edit) without the T column, since basketball
has no ties. Press Download, then drop the file (it is named nba-standings-data.js)
into leagues/nba/assets/ replacing the old one. Save it after every matchup: the NBA page,
the home page, La Jornada, Los Premios and all six team pages follow it by themselves.

leagues/nba/nba-roster-manager.html is the NBA twin of the NFL roster manager: draft
players from free agency, bench, start, drop or trade them, and edit Status / FPTS / AVG /
LAST. It downloads nba-roster-data.js for leagues/nba/assets/. Basketball differences:
  - a player can play several positions, written the way ESPN lists them ("PG, SG"). The
    first one is his main position (the round badge next to his name); the free agent
    page's PG / SG / SF / PF / C buttons show everyone who can play there.
  - "Start at" only offers the slots his positions allow: PG, SG, SF, PF and C need that
    position, G takes a PG or SG, F takes an SF or PF, UTIL takes anyone. The 9 starters
    (NBA_STARTER_SLOTS) are the rules sheet's: PG SG SF PF C G F UTIL UTIL.
  - the snapshot at the top warns when a roster breaks the rules sheet (9 starters,
    5 on the bench, 1 on IR) or someone is starting where he can't play.
  - FPTS / AVG / LAST are season fantasy points, average per game and last game. They
    are empty until the season starts; the pages show a dash meanwhile.
The rosters show on the six team pages and the free agents on nba-free-agents.html.

### The NBA teams
The six teams, as ESPN lists them, live in leagues/nba/assets/nba-teams-data.js (slug, name,
initials, logo, round badge):
  puntos        Los Puntos de Piña           LPP   Christopher Ramirez
  sin-talento   Sin Talento de Barrio        STB   Tatiana Mejias
  imcebollin    iMcebollin                   JST   Jose Cruz
  concheros     Concheros de la Concha       CLC   George Sanchez
  mugiwaras     Mugiwaras De Caimito         MDC   Daniel Heredia   (same team and bio as in the NFL)
  pantyman      Pantyman Squad               PPT   Peter Cruz
Each has its page at leagues/nba/teams/<slug>.html, built like the NFL team pages: logo,
manager and bio, Record / Points / Streak / Playoff odds, the roster, and the schedule.
Unlike the NFL pages (written out by hand), everything except the name, manager and bio
updates itself:
  record, rank, points, streak, playoff odds   from nba-standings-data.js
  roster                                       from nba-roster-data.js
  schedule                                     from nba-schedule-data.js - the current matchup
                                               is marked ("Próximo" / "En juego") and the
                                               ones already played fade
  logo                                         from nba-teams-data.js
"Ranked #2 of 6" appears once a game has been played; until then the line says
"Temporada 2026-27". The same goes for the home page's NBA tile (it shows the tagline from
assets/leagues.js instead of crowning a 0-0 team) and the rank badges on the team cards.

Logos: every NBA logo is a circle. Save it as leagues/nba/images/<slug>.png (about 512x512)
and set that team's "crest" to "images/<slug>.png" in nba-teams-data.js - it then shows on
every page at once. Until then each team shows its initials on a round badge.

The schedule: copied from the ESPN schedule tabs of the basketball sheet - 15 matchups (each
team plays the other five three times), Matchup 1 = Oct 20-25, then Monday to Sunday until
Jan 25-31. The visitor (ESPN's "@" team) is written first, home second; that is how the team
pages know Home / Away. The top of the file explains the format.

### The NBA page
leagues/nba/nba-landing-page.html: the hero (Matchup number, leader, most points per matchup
and matchups left, all kept up to date), La Jornada, the standings, Los Premios (they appear
once every team has played), the six teams with a Free Agents button, and the NBA news.
The draft countdown and its music are gone; assets/nba-countdown.js is no longer loaded but
stays in the folder in case you ever want a countdown again (the CSS for it is still in
style.css). The only pages with music are the commissioner's (Los Puntos de Piña, NFL and NBA).

### La Tiendita (merch page)
tienda.html shows the merch from the Fourthwall store (https://lpblsa-shop.fourthwall.com). The products are NOT
typed into the page: assets/shop.js asks the store for them each time the page opens, so a new product, photo or
price appears on its own. "Comprar" opens that product in the store, which is where payment and shipping happen
(print-on-demand: Fourthwall prints, ships and handles support; there is no stock to manage).
- assets/shop.js: the store address, the read-only Storefront token, and FALLBACK (a short backup list of name,
  slug and price used only when the store cannot be reached, so the page is never empty). Update FALLBACK if you
  add or remove products.
- assets/shop.css: the card styles.
- Is the shop really live? Open tienda.html?debug (add ?debug to the address). A line under the products says "LIVE from the store" or "BACKUP LIST" plus the exact reason the store could not be reached.
- The "Tienda" tab comes from assets/nav.js.
- To cancel the token: Fourthwall > Settings > For Developers, delete it, create a new one, paste it into shop.js.

### Push notifications (the card, the bell and the menu item)
A few seconds after a page opens, a notification-style card slides in from the top asking to turn on push
notifications (one tap; "Ahora no" hides it for a week). A bell in the header (computers) and a
"Notificaciones" item at the bottom of the menu (phones and tablets) open the window where visitors choose
NFL and/or NBA or turn it off. On an iPhone it shows the "add to Home Screen" steps first, because Apple
requires that. The pieces: assets/push.js (the card, bell and window), assets/firebase-config.js (the Firebase project address + the web push key),
firebase-messaging-sw.js (must stay at the site root), and the GitHub Action push-alert.yml with
scripts/send-push-alert.mjs, which sends a notification when you add a NEW story to assets/news.js (same
"is it new?" rule as the email alert). It stays hidden until vapidKey is filled in
in assets/firebase-config.js. Full setup and testing: PUSH-SETUP.md.

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
nba.png and mlb.png (set by the logo field of each league in assets/leagues.js). To
change one, replace that file and keep the name (256x256 is plenty). The tiles sit side by
side in one row (3 on the home page, 2 on a league page); on phones they shrink to fit.
