# Images

Drop your artwork in this folder using these exact file names. Until a file
exists the site shows a navy-and-gold badge with the team initials, so
nothing looks broken while you are still collecting logos.

  league-logo.png    the league crest in the top left of every page
  mugiwaras.png      Mugiwaras De Caimito
  peters.png         Peter's Perfect Team
  sierra.png         Sierra Linda Cameltoes
  puntos.png         Los Puntos de Pina
  hobbit.png         Hobbit
  commissioner.jpg   your photo inside the commissioner pane

Square images work best (400x400 or larger). PNG with a transparent
background looks sharpest against the navy.

## Round logo or pointed shield?
Each badge can be either. The league logo is already set to round, because
yours is a circle. Team badges default to the pointed shield.

To change one team, open its page and find the badge:

  <span class="crest crest-lg">          <-  shield
  <span class="crest crest-circle crest-lg">   <-  round

Add or remove crest-circle. The team badge appears on its own page, in the
standings on index.html and in schedule tables, so search the whole folder
for that team's file name if you want it round everywhere.

To make EVERY badge round at once, open assets/style.css, find the block
that starts "WANT EVERY BADGE ROUND?" and follow the one-line instruction
there. That is a single change, no hunting through pages.
