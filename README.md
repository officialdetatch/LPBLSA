# La Premier Bundesliga Serie A - site guide

## Running it
Open index.html in any browser. To put it online, upload this whole folder to
any static host (Netlify drop, GitHub Pages, Cloudflare Pages, your own server).
Keep the folder structure intact.

## Files
  index.html            landing page: news wire, latest 3 stories, standings
  news.html             all stories, and the full article view
  free-agents.html      searchable top 100 free agent board
  teams/<team>.html     one page per club: crest, roster, schedule
  about.html            the league's story - one page, see below
  contact.html          "join us / ask a question" page with a contact form
  news-writer.html      YOUR private tool for writing news (see below)
  roster-manager.html   YOUR private tool for rosters and free agents (see below)
  standings-manager.html YOUR private tool for the standings table (see below)
  about-manager.html    YOUR private tool for the About page (see below)
  assets/news.js        the stories themselves - the only file you edit to post
  assets/roster-data.js every team's roster and the free agent board - edited via roster-manager.html, not by hand
  assets/standings-data.js the standings table on the home page - edited via standings-manager.html, not by hand
  assets/about-data.js  the About page's title, intro and content blocks - edited via about-manager.html, not by hand
  assets/style.css      all colours, type and layout
  assets/app.js         menu, ticker, news rendering, standings, roster tables, free agent filters, about page, contact form
  assets/writer.js      powers news-writer.html only
  assets/roster-manager.js  powers roster-manager.html only
  assets/standings-manager.js  powers standings-manager.html only
  assets/about-manager.js  powers about-manager.html only
  images/               your logos go here (see images/README.txt)

## Posting news - you are the only editor
The public pages have no edit button and no way to change anything. Stories are
read from assets/news.js, which lives on the server. Visitors can read it, but
they cannot change what anyone else sees - only you can, by replacing that file.

Two ways to write:

1. news-writer.html (easiest). Open it on your own computer. Write the story in
   the form, reorder or delete existing ones, then press "Download news.js" and
   drop that file into assets/, replacing the old one. Upload, and the site is
   updated. This page is not linked from the site's menu, so nobody finds it by
   clicking around. If you would rather it never goes online at all, delete
   news-writer.html and assets/writer.js before you upload - everything else
   keeps working.

2. By hand. Open assets/news.js and add an entry at the top of the list:

     {
       id: "week-3-recap",
       date: "Week 3 \u00b7 Sep 28",
       headline: "Your headline",
       summary: "One or two lines. This is all the home page shows.",
       image: "",
       body: [
         "First paragraph.",
         "Second paragraph."
       ]
     }

   summary is what appears on the card; body is the full article you get after
   clicking. Add as many paragraphs to body as you like.

To put a photo in a story, save it to images/news/ and set
image: "images/news/your-file.jpg". If the file is missing the story still
renders without it.

The scrolling gold wire at the top reads window.LEAGUE_TICKER at the bottom of
the same file. Empty that array and it falls back to your news headlines.

## Updating standings - standings-manager.html
Standings are no longer plain HTML you edit by hand. They live in
assets/standings-data.js and you edit that file using
standings-manager.html - never by editing the table in index.html
directly, since app.js overwrites it with whatever standings-data.js says
every time the page loads.

Open standings-manager.html on your own computer. Every team is a row, in
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
standings-manager.html and assets/standings-manager.js before you upload -
the home page keeps working off whatever assets/standings-data.js already
says, it just loses the tool that edits it.

## About page - about-manager.html
The About page (about.html) is the story of the league - as much or as
little as you want to write, with photos wherever you want them. It is
edited with about-manager.html rather than by hand, the same idea as the
other tools but simpler: instead of a list of separate stories, there is
just one page, built from a stack of blocks.

Open about-manager.html on your own computer. At the top, set the page
title and the short gold intro line under it. Below that is the list of
blocks - each one is either a paragraph or an image with an optional
caption. Add as many as you like with the two "Add" buttons, use the
up/down arrows to put them in the order you want them to read, and click
into any box to edit it directly. To add a photo, upload the image file
itself into images/ first (an images/about/ folder keeps things tidy) and
point the Image path box at wherever you put it, exactly like adding a
photo to a news story.

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

## Managing rosters and free agents - roster-manager.html
Rosters and the free agent board are no longer baked into each team page by
hand. They all read from one file, assets/roster-data.js, and you edit that
file using roster-manager.html - never by editing the tables in teams/*.html
or free-agents.html directly, since app.js overwrites whatever is in those
tables with what roster-data.js says every time the page loads.

Open roster-manager.html on your own computer. Type a player's name - free
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

Every move updates a "Your roster-data.js" box live. When you are done,
press Download, and drop the file into assets/, replacing the old one -
every page that shows a roster or the free agent list picks it up
immediately. Like news-writer.html, this page is not linked from the site's
menu, your work is saved in the browser if you close the tab mid-session,
and there is a small link between the two tools so you can jump between
posting news and managing the roster. If you would rather it never goes
online at all, delete roster-manager.html and assets/roster-manager.js
before you upload - the team and free agent pages keep working off whatever
assets/roster-data.js already says, they just lose the tool that edits it.

## Footer social links
Every page's footer has three round icons - Instagram, Threads and Discord -
linking to the league's official pages. They are plain HTML, the same three
links repeated in every file, so if a URL ever changes, search the project
for that link (for example discord.gg) and replace it everywhere it
appears. The icons themselves are inline SVG code sitting right next to the
links, not image files, so there is nothing to upload for these.

## Badge shapes
Every crest can be a pointed shield or a circle. The league logo in the header
is already round. To flip one, add or remove the class crest-circle:

  <span class="crest crest-lg">                 pointed shield
  <span class="crest crest-circle crest-lg">    circle

To make them all round at once, see the "WANT EVERY BADGE ROUND?" block near
the top of assets/style.css.

## Manager bios
Each team page has a <p class="team-bio"> paragraph under the manager name.
Rewrite it directly in that team's html file. There is a comment right above
it so you can find it quickly.

## The commissioner pane
teams/puntos.html has extra pieces the other teams do not:

  - a gold "Meet the commissioner" button, and a clickable crest
  - a full-screen pane with THE COMMISSIONER in large gold type, your photo,
    your bio and your decrees. Edit that text inside teams/puntos.html, in the
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
