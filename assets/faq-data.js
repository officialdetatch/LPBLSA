/* ============================================================
   PREGUNTAS FRECUENTES  --  what faq.html shows (the "Preguntas frecuentes"
   link in every page's footer). Written from LPBLSA_FAQ.docx.

   To change an answer, edit the text below and save; faq.html reads this
   file and nothing else needs touching. This same file is meant to feed the
   AI helper later, so keep the answers true and complete.

   groups   one card per topic:  { id, title, items: [...] }
   items    one question each:   { id, q, a }
              id   the short name in the link (faq.html#draft opens that question)
              q    the question
              a    the answer, in HTML: <p>, <ul><li>, <b>, <a href="...">
                   (links are relative to the site root: "tienda.html", not "/tienda.html")
   ============================================================ */

window.LPBSA_FAQ = {
  updated: "2026-10-20",
  groups: [
    {
      id: "basico", title: "Lo básico",
      items: [
        { id: "que-es", q: "¿Qué es LPBLSA y qué significa el nombre?",
          a: "<p>LPBLSA es una liga de deportes de fantasía. Son las siglas de <b>La Premier Bundesliga Serie A</b>, un nombre que nació como sátira para nuestra liga.</p>" },
        { id: "deportes", q: "¿Qué deportes tiene la liga?",
          a: "<p>Ahora mismo la liga tiene tres divisiones: <b>NFL</b>, <b>NBA</b> y <b>MLB</b>. La división de MLB se habilita la próxima temporada.</p>" },
        { id: "una-division", q: "¿Puedo jugar en una sola división o tengo que jugar en todas?",
          a: "<p>No tienes que unirte a las tres divisiones. Pero si tu lado competitivo te pide más, puedes jugar en todas.</p>" },
        { id: "plataforma", q: "¿En qué plataforma jugamos? ¿Necesito una cuenta?",
          a: "<p>Jugamos en <b>ESPN Fantasy</b>, así que sí: necesitas tener (o crear) una cuenta de ESPN.</p>" },
        { id: "equipos", q: "¿Cuántos equipos hay en cada liga?",
          a: "<p>Ahora mismo hay <b>5 equipos</b> en la división de football americano (NFL) y <b>6</b> en la de NBA. ¡Pero siempre estamos buscando más equipos!</p>" }
      ]
    },
    {
      id: "unirte", title: "Cómo unirte",
      items: [
        { id: "como-unirme", q: "¿Cómo me uno y a quién contacto?",
          a: "<p>Escríbenos a <a href=\"mailto:info@lpblsa.vip\">info@lpblsa.vip</a> y te agregamos.</p>" },
        { id: "cuando", q: "¿Cuándo abren espacios? ¿Puedo unirme a mitad de temporada?",
          a: "<p>Los espacios abren al final de cada temporada. Lamentablemente, no puedes unirte a mitad de temporada.</p>" },
        { id: "lista-espera", q: "¿Hay lista de espera si la liga está llena?",
          a: "<p>Sí. Cuando se llenen los espacios habrá una lista de espera, y los candidatos tienen que demostrar que cumplen con los requisitos para ser manager.</p>" },
        { id: "experiencia", q: "¿Necesito experiencia en fantasy?",
          a: "<p>¡No! No necesitas experiencia. La liga es 100% para todo el mundo, aunque sea tu primera vez.</p>" }
      ]
    },
    {
      id: "dinero", title: "Dinero",
      items: [
        { id: "costo", q: "¿Hay que pagar para entrar? ¿Cuánto?",
          a: "<p>No. Ahora mismo no hay entry fee: somos una liga <b>100% free to play</b>. Esto podría cambiar en el futuro, dependiendo de cuánto crezca la liga.</p>" },
        { id: "premio", q: "¿Cuál es el premio?",
          a: "<p>El campeón de cada división se lleva <b>$10 por cada equipo que juega en esa división</b>, en una gift card a escoger: Amazon, PlayStation, Xbox, etc.</p>" +
             "<p>Hoy eso es <b>$50</b> en la NFL (5 equipos) y <b>$60</b> en la NBA (6 equipos). Mientras más crezca la liga, más grande el premio: con 10 equipos, serían $100.</p>" }
      ]
    },
    {
      id: "reglas", title: "Reglas y formato",
      items: [
        { id: "draft", q: "¿Cómo es el draft y cuándo es?",
          a: "<p>Los drafts son tipo <b>snake</b> y se hacen dos domingos antes de que empiece la temporada de cada deporte.</p>" },
        { id: "puntos", q: "¿Cómo se cuentan los puntos?",
          a: "<p>Cada división tiene su propia puntuación. La encuentras en su página de reglas: <a href=\"leagues/nfl/nfl-rules.html\">Reglas NFL</a> y <a href=\"leagues/nba/nba-rules.html\">Reglas NBA</a>.</p>" +
             "<p>En resumen: la NFL es por puntos con medio punto por recepción (half PPR), y la NBA es por puntos con un máximo de 42 juegos por matchup.</p>" },
        { id: "playoffs", q: "¿Es head-to-head o por puntos totales? ¿Cómo son los playoffs?",
          a: "<p>La liga es <b>head-to-head</b>: cada semana te enfrentas a otro equipo. Los <b>4 mejores equipos</b> de cada división clasifican a los playoffs, que son de muerte súbita. Solo hay premio para el campeón.</p>" },
        { id: "inactivo", q: "¿Qué pasa si un manager deja de estar activo?",
          a: "<p>Un manager se considera inactivo cuando pasa una de estas dos cosas:</p>" +
             "<ul><li>Pierde más de 2 semanas seguidas sin hacerle ningún cambio a su lineup (mover jugadores del banco, moverse en waivers o hacer trades).</li>" +
             "<li>Dice, de palabra o por escrito, que no quiere seguir como manager en la liga.</li></ul>" +
             "<p>Si un manager es declarado inactivo, el comisionado puede:</p>" +
             "<ul><li>Activarle el modo automático (ver <a href=\"#expectativas\">qué se espera de un manager</a>).</li>" +
             "<li>Editar su lineup según el rendimiento de los jugadores.</li>" +
             "<li>Hacer trades, si la mayoría de los otros managers lo aprueba por votación.</li>" +
             "<li>Soltar jugadores para que pasen a waivers.</li></ul>" },
        { id: "keeper", q: "¿Hay formato keeper o dynasty?",
          a: "<p>No. Por ahora la liga empieza de cero cada temporada, con plantillas nuevas.</p>" }
      ]
    },
    {
      id: "comunidad", title: "La comunidad y la página",
      items: [
        { id: "pagina", q: "¿Qué hay en lpblsa.vip? ¿Tengo que crear una cuenta?",
          a: "<p>No necesitas una cuenta para visitar la página. Aquí encontrarás las noticias de la liga, los standings, los rosters, las reglas y nuestra <a href=\"tienda.html\">Tiendita</a>, donde nos puedes apoyar para seguir creando y manteniendo la liga.</p>" +
             "<p>La cuenta solo hace falta para comentar en las noticias.</p>" },
        { id: "alertas", q: "¿Cómo recibo las noticias o alertas?",
          a: "<p>Suscríbete a nuestro newsletter, activa las notificaciones de la página en tu teléfono o síguenos en nuestras redes para enterarte de todo.</p>" },
        { id: "comentar", q: "¿Puedo comentar en las noticias?",
          a: "<p>¡Sí! Todos son bienvenidos a comentar. Solo tienes que iniciar sesión con Google o con tu email.</p>" },
        { id: "chat", q: "¿Hay un chat de grupo?",
          a: "<p>Sí. Tenemos un <a href=\"https://discord.gg/BN3yCCYXz5\" target=\"_blank\" rel=\"noopener noreferrer\">Discord</a> abierto a toda la comunidad. No tienes que ser manager de la liga para participar.</p>" },
        { id: "pagina-equipo", q: "¿Me dan una página de equipo, logo o bio?",
          a: "<p>Sí. Cuando se confirma que eres miembro de la liga, se crea la página de tu equipo (manejada 100% por nuestro comisionado). Para cambiar tu bio o tu logo, escríbenos por DM o a <a href=\"mailto:managers-affairs@lpblsa.vip\">managers-affairs@lpblsa.vip</a>.</p>" },
        { id: "merch", q: "¿Dónde consigo la mercancía de la liga?",
          a: "<p>En nuestra <a href=\"tienda.html\">Tiendita</a>, que funciona con <a href=\"https://lpblsa-shop.fourthwall.com/\" target=\"_blank\" rel=\"noopener noreferrer\">Fourthwall</a>. Importante:</p>" +
             "<ul><li><b>Hecho a pedido.</b> Se imprime cuando compras, por eso no hay stock limitado ni se acaba la talla.</li>" +
             "<li><b>Envío a tu casa.</b> Normalmente llega entre 7 y 10 días. El pago y el envío se hacen en la tienda segura de Fourthwall.</li>" +
             "<li><b>Revisa tu talla.</b> Como cada pieza se fabrica para ti, no hay cambios por talla. Mira la guía de tallas antes de comprar.</li></ul>" }
      ]
    },
    {
      id: "compromiso", title: "Compromiso",
      items: [
        { id: "tiempo", q: "¿Cuánto tiempo toma por semana?",
          a: "<p>Depende de ti. Puedes estar pendiente a tu roster todo el día, o armar tu lineup antes de los juegos y olvidarte hasta la próxima semana.</p>" },
        { id: "expectativas", q: "¿Qué se espera de un manager?",
          a: "<p>Lo principal es no caer en <a href=\"#inactivo\">inactivo</a>. Además:</p>" +
             "<ul><li>Estar pendiente a tu lineup y al rendimiento de tus jugadores.</li>" +
             "<li>Participar en nuestras conversaciones: ¡eso es lo que mantiene viva la comunidad!</li>" +
             "<li>Si necesitas un descanso, avísanos y activamos el modo automático. Ese modo escoge tus jugadores con el algoritmo y las proyecciones de ESPN; no nos hacemos responsables si ESPN escoge jugadores que tengan una mala semana.</li></ul>" },
        { id: "idioma", q: "¿La liga es en español o en inglés?",
          a: "<p>En Spanglish. La liga es netamente puertorriqueña, ¡pero todo el mundo es bienvenido!</p>" }
      ]
    }
  ]
};
