/* La Tiendita: the merch page.
   The products are NOT typed in here. This page asks the store (Fourthwall) for them every time it opens,
   so a new product, a new photo or a new price shows up on its own. The "Comprar" buttons open that
   product in the store, which is where the payment and the shipping happen.

   If the store cannot be reached (no internet, or Fourthwall is having a bad day) the page shows the
   short list in FALLBACK below, so it is never empty. Keep that list roughly up to date.

   What to change here:
     - SHOP_URL / TOKEN: only if the store itself changes.
     - FALLBACK: the backup list (name, slug and price of each product).
   The TOKEN is Fourthwall's "Storefront" token. It can only READ the product list (and build a cart); it
   cannot see orders, money or the account. If you ever want to cancel it, delete it in Fourthwall
   (Settings > For Developers) and paste the new one here.                                              */
(function () {
  'use strict';

  var SHOP_URL = 'https://lpblsa-shop.fourthwall.com';
  var API = 'https://storefront-api.fourthwall.com/v1';
  var TOKEN = 'ptkn_72b82cbd-a4a8-453c-9e81-a3e013fda661';
  var COLLECTION = 'all';

  var FALLBACK = [
    { name: 'La Premier Bundesliga Serie A - Logo Cocido', slug: 'la-premier-bundesliga-serie-a-logo-cocido', price: 25.99 },
    { name: 'La Premier Bundesliga Serie A - Black Logo', slug: 'la-premier-bundesliga-serie-a-black-logo', price: 21.99 },
    { name: 'La Premier Bundesliga Serie A - White Logo Tee', slug: 'la-premier-bundesliga-serie-a-white-logo-tee', price: 21.99 }
  ];

  var COPY = {
    buy: 'Comprar',
    soldOut: 'Agotado',
    from: 'Desde ',
    colors: 'Colores',
    sizes: 'Tallas',
    fallbackNote: 'No pudimos cargar las fotos ahora mismo. Toca Comprar para ver cada producto, sus colores y tallas en la tienda.',
    empty: 'Aún no hay productos. Vuelve pronto.'
  };

  var grid = document.getElementById('shopGrid');
  var note = document.getElementById('shopNote');
  if (!grid) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function productUrl(slug) { return SHOP_URL + '/products/' + encodeURIComponent(slug); }
  function money(v) { return '$' + Number(v).toFixed(2); }
  function safeImg(u) { return typeof u === 'string' && /^https:\/\//.test(u) ? u : ''; }
  function safeColor(c) { return typeof c === 'string' && /^#[0-9a-f]{3,8}$/i.test(c) ? c : ''; }

  /* ---------- talking to the store ---------- */
  function getJSON(path) {
    var url = API + path + (path.indexOf('?') > -1 ? '&' : '?') + 'storefront_token=' + encodeURIComponent(TOKEN);
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 9000) : null;
    return fetch(url, ctl ? { signal: ctl.signal } : {}).then(function (r) {
      if (timer) clearTimeout(timer);
      if (!r.ok) throw new Error('store ' + r.status);
      return r.json();
    }, function (e) { if (timer) clearTimeout(timer); throw e; });
  }
  /* The list comes back as an object holding one array (the products). Find it without caring about its name. */
  function listFrom(res) {
    if (Array.isArray(res)) return res;
    if (!res || typeof res !== 'object') return [];
    var keys = ['results', 'items', 'content', 'products', 'data'];
    for (var i = 0; i < keys.length; i++) if (Array.isArray(res[keys[i]])) return res[keys[i]];
    var any = Object.keys(res).filter(function (k) { return Array.isArray(res[k]); })[0];
    return any ? res[any] : [];
  }
  function allProducts() {
    /* one quiet retry: a slow phone connection or a single hiccup should not drop the page to the backup list */
    return loadAll().catch(function () {
      return new Promise(function (ok) { setTimeout(ok, 700); }).then(loadAll);
    });
  }
  function loadAll() {
    var out = [];
    function page(n) {
      return getJSON('/collections/' + COLLECTION + '/products' + (n ? '?page=' + n : '')).then(function (res) {
        out = out.concat(listFrom(res));
        var p = res && (res.paging || res.page || res.pagination);
        if (p && p.hasNextPage && n < 6) return page(n + 1);
        return out;
      });
    }
    return page(0);
  }
  /* The list may not carry prices and sizes, so ask for the full product when it does not. */
  function withDetails(p) {
    if ((p.variants && p.variants.length) || p.price) return Promise.resolve(p);
    return getJSON('/products/' + encodeURIComponent(p.slug)).then(function (full) { return full && full.slug ? full : p; }, function () { return p; });
  }

  /* ---------- reading one product ---------- */
  function summary(p) {
    var variants = p.variants || [];
    var prices = variants.map(function (v) { return v.unitPrice && Number(v.unitPrice.value); }).filter(function (n) { return n > 0; });
    var colors = [], sizes = [], seenC = {}, seenS = {};
    variants.forEach(function (v) {
      var a = v.attributes || {};
      if (a.color && a.color.name && !seenC[a.color.name]) { seenC[a.color.name] = 1; colors.push({ name: a.color.name, hex: safeColor(a.color.swatch) }); }
      if (a.size && a.size.name && !seenS[a.size.name]) { seenS[a.size.name] = 1; sizes.push(a.size.name); }
    });
    var img = (p.images && p.images[0] && (p.images[0].transformedUrl || p.images[0].url)) ||
      (variants[0] && variants[0].images && variants[0].images[0] && variants[0].images[0].url) || '';
    var sold = !!(p.state && p.state.type && p.state.type !== 'AVAILABLE');
    /* a bundle (or a backup-list item) carries its price at the top instead of inside variants;
       the store sends it as {value, currency}, the backup list as a plain number */
    var top = p.price && typeof p.price === 'object' ? Number(p.price.value) : Number(p.price);
    var flat = top > 0 ? top : null;
    return {
      name: p.name, slug: p.slug, img: safeImg(img), sold: sold,
      min: prices.length ? Math.min.apply(null, prices) : flat,
      max: prices.length ? Math.max.apply(null, prices) : flat,
      colors: colors, sizes: sizes
    };
  }

  /* ---------- drawing ---------- */
  function card(s) {
    var priceText = s.min == null ? '' : (s.max > s.min ? COPY.from : '') + money(s.min);
    var photo = s.img
      ? '<img src="' + esc(s.img) + '" alt="' + esc(s.name) + '" loading="lazy" decoding="async" width="768" height="1024">'
      : '<span class="shop-ph"><img src="images/league-logo.png" alt="" width="96" height="96"></span>';
    var sw = s.colors.length
      ? '<div class="shop-sw" aria-label="' + COPY.colors + '">' + s.colors.slice(0, 8).map(function (c) {
          return '<i title="' + esc(c.name) + '"' + (c.hex ? ' style="background:' + c.hex + '"' : '') + '></i>';
        }).join('') + (s.colors.length > 8 ? '<small>+' + (s.colors.length - 8) + '</small>' : '') + '</div>'
      : '';
    var sz = s.sizes.length ? '<div class="shop-sizes">' + COPY.sizes + ': ' + esc(s.sizes.join(' · ')) + '</div>' : '';
    var buy = s.sold
      ? '<span class="btn btn-ghost shop-buy" aria-disabled="true">' + COPY.soldOut + '</span>'
      : '<a class="btn btn-solid shop-buy" href="' + esc(productUrl(s.slug)) + '" target="_blank" rel="noopener noreferrer">' + COPY.buy + ' &rarr;</a>';
    return '<article class="shop-card">' +
      '<a class="shop-photo" href="' + esc(productUrl(s.slug)) + '" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">' + photo + '</a>' +
      '<div class="shop-info"><h3>' + esc(s.name) + '</h3>' + sw + sz +
      '<div class="shop-row"><span class="shop-price">' + esc(priceText) + '</span>' + buy + '</div></div></article>';
  }
  /* Add ?debug to the page address (tienda.html?debug) to see, under the products, where they came from and,
     if the store could not be reached, the exact reason. Visitors never see this. */
  var DEBUG = /[?&]debug\b/.test(location.search);
  function draw(list, isFallback, why) {
    if (!list.length) { grid.innerHTML = '<p class="section-note">' + COPY.empty + '</p>'; return; }
    grid.innerHTML = list.map(card).join('');
    grid.removeAttribute('aria-busy');
    grid.setAttribute('data-source', isFallback ? 'backup' : 'store');
    if (note) {
      var msg = isFallback ? COPY.fallbackNote : '';
      if (DEBUG) msg += (msg ? ' ' : '') + '[debug] ' + (isFallback ? 'BACKUP LIST. Store said: ' + why : 'LIVE from the store: ' + list.length + ' products.');
      note.textContent = msg;
      note.hidden = !msg;
    }
  }

  /* ---------- go ---------- */
  grid.setAttribute('aria-busy', 'true');
  grid.innerHTML = '<div class="shop-skel"></div><div class="shop-skel"></div><div class="shop-skel"></div>';

  allProducts().then(function (list) {
    list = list.filter(function (p) { return p && p.slug && (!p.access || !p.access.type || p.access.type === 'PUBLIC'); });
    if (!list.length) throw new Error('empty');
    return Promise.all(list.map(withDetails));
  }).then(function (full) {
    draw(full.map(summary), false);
  }).catch(function (e) {
    var why = e && e.name === 'AbortError' ? 'no answer in 9 seconds (timeout)' : (e && e.message) || String(e);
    if (window.console && console.warn) console.warn('[tienda] could not load the store, showing the backup list:', e);
    draw(FALLBACK.map(summary), true, why);
  });
})();
