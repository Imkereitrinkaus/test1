/* Produktdaten – hier neue Sorten ergänzen */
var PRODUKTE = [
  {
    id: 'fruehlingsblute',
    name: 'Fr\u00fchlingsbl\u00fcte',
    untertitel: 'Milder Bl\u00fctenhonig',
    gewicht: '500\u202fg',
    preis: 7.50,
    beschreibung: 'Bl\u00fctenzart und aromatisch \u2013 geerntet im ersten Aufbl\u00fchen des Jahres. Mild, floral, mit feiner S\u00fc\u00dfe. Perfekt zum Fr\u00fchst\u00fcck oder pur vom L\u00f6ffel.',
    badge: 'Bestseller',
    sommer: false
  },
  {
    id: 'sommertracht',
    name: 'Sommertracht',
    untertitel: 'Kr\u00e4ftiger Trachthonig',
    gewicht: '500\u202fg',
    preis: 7.50,
    beschreibung: 'Kr\u00e4ftig und w\u00fcrzig \u2013 die volle Kraft der Sommerpflanzen im Glas. Intensiver Charakter, langanhaltend im Abgang. Ideal zu K\u00e4se oder dunklem Brot.',
    badge: null,
    sommer: true
  }
];

document.addEventListener('DOMContentLoaded', function () {

  /* ── Burger-Menü ─────────────────────────────────────── */
  var burger = document.getElementById('burgerBtn');
  var mobileNav = document.getElementById('mobileNav');

  if (burger && mobileNav) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (mobileNav.classList.contains('open') &&
          !mobileNav.contains(e.target) &&
          e.target !== burger) {
        mobileNav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Hilfsfunktion ───────────────────────────────────── */
  function eur(v) { return v.toFixed(2).replace('.', ',') + '\u00a0\u20ac'; }

  /* ── Teaser-Grid (Startseite) ────────────────────────── */
  var teaserGrid = document.getElementById('teaserGrid');
  if (teaserGrid) {
    teaserGrid.innerHTML = PRODUKTE.map(function (p) {
      return '<a class="teaser-card" href="honig.html">' +
        '<svg class="teaser-card__hex" viewBox="0 0 60 70" fill="none">' +
        '<polygon points="30,3 57,18 57,52 30,67 3,52 3,18" stroke="#F0A500" stroke-width="2.5" fill="rgba(240,165,0,0.12)"/></svg>' +
        '<div><div class="teaser-card__sub">' + p.untertitel + ' &middot; ' + p.gewicht + '</div>' +
        '<h3>' + p.name + '</h3>' +
        '<p style="font-size:.88rem;color:var(--muted);margin-top:8px;line-height:1.6">' + p.beschreibung + '</p>' +
        '<div style="margin-top:16px"><span class="teaser-card__price">' + eur(p.preis) + '</span></div>' +
        '</div></a>';
    }).join('');
  }

  /* ── Produkt-Karten (honig.html) ─────────────────────── */
  var productsGrid = document.getElementById('productsGrid');
  if (productsGrid) {
    productsGrid.innerHTML = PRODUKTE.map(function (p) {
      var topCls = p.sommer ? 'product-card__top product-card__top--summer' : 'product-card__top';
      var f1 = p.sommer ? '#F0A500' : '#1A1A18';
      var f2 = p.sommer ? 'rgba(240,165,0,0.25)' : 'rgba(250,247,239,0.12)';
      return '<article class="product-card">' +
        '<div class="' + topCls + '">' +
        (p.badge ? '<span class="product-card__badge">' + p.badge + '</span>' : '') +
        '<svg class="product-card__jar" viewBox="0 0 80 100" fill="none">' +
        '<rect x="20" y="28" width="40" height="62" rx="4" fill="' + f1 + '" opacity="0.85"/>' +
        '<rect x="24" y="22" width="32" height="12" rx="3" fill="' + f1 + '" opacity="0.95"/>' +
        '<rect x="26" y="36" width="28" height="46" rx="2" fill="' + f2 + '"/>' +
        '</svg></div>' +
        '<div class="product-card__body">' +
        '<p class="product-card__type">' + p.untertitel + ' &middot; ' + p.gewicht + '</p>' +
        '<h3 class="product-card__name">' + p.name + '</h3>' +
        '<p class="product-card__desc">' + p.beschreibung + '</p>' +
        '<div class="product-card__footer"><div>' +
        '<div class="product-card__price">' + eur(p.preis) + '</div>' +
        '<div class="product-card__weight">pro Glas &middot; ' + p.gewicht + '</div>' +
        '</div><a class="btn btn--primary" href="bestell.html">Bestellen &rarr;</a>' +
        '</div></div></article>';
    }).join('');
  }

  /* ── Bestellrechner (bestell.html) ───────────────────── */
  var calcItems = document.getElementById('calcItems');
  if (calcItems) {
    var mengen = {};
    PRODUKTE.forEach(function (p) { mengen[p.id] = 0; });

    calcItems.innerHTML = PRODUKTE.map(function (p) {
      return '<div class="calc-item">' +
        '<div class="calc-item__info">' +
        '<div class="calc-item__name">' + p.name + '</div>' +
        '<div class="calc-item__price-unit">' + eur(p.preis) + ' / Glas</div>' +
        '</div>' +
        '<div class="calc-item__qty">' +
        '<button class="qty-btn" data-id="' + p.id + '" data-d="-1">&minus;</button>' +
        '<input class="qty-input" type="number" min="0" max="99" value="0" id="qty-' + p.id + '">' +
        '<button class="qty-btn" data-id="' + p.id + '" data-d="1">+</button>' +
        '</div>' +
        '<div class="calc-item__subtotal" id="sub-' + p.id + '">' + eur(0) + '</div>' +
        '</div>';
    }).join('');

    function refresh(id) {
      var inp = document.getElementById('qty-' + id);
      if (inp) inp.value = mengen[id];
      var prod = PRODUKTE.filter(function (p) { return p.id === id; })[0];
      var sub = document.getElementById('sub-' + id);
      if (sub && prod) sub.textContent = eur(mengen[id] * prod.preis);
      var total = PRODUKTE.reduce(function (s, p) { return s + mengen[p.id] * p.preis; }, 0);
      var tel = document.getElementById('totalAmount');
      if (tel) tel.textContent = eur(total);
      var box = document.getElementById('orderSummary');
      if (!box) return;
      var items = PRODUKTE.filter(function (p) { return mengen[p.id] > 0; });
      if (!items.length) { box.innerHTML = '<div class="order__summary-line empty">Noch nichts ausgew\u00e4hlt.</div>'; return; }
      box.innerHTML = items.map(function (p) {
        return '<div class="order__summary-line"><span>' + mengen[p.id] + '\u00d7 ' + p.name + '</span><span>' + eur(mengen[p.id] * p.preis) + '</span></div>';
      }).join('') +
        '<div class="order__summary-line" style="font-weight:700;border-top:1px solid #F2EDD8;margin-top:4px;padding-top:6px">' +
        '<span>Gesamt</span><span>' + eur(total) + '</span></div>';
    }

    /* Qty-Buttons */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-d]');
      if (!btn || !calcItems.contains(btn)) return;
      var id = btn.getAttribute('data-id');
      mengen[id] = Math.max(0, mengen[id] + parseInt(btn.getAttribute('data-d'), 10));
      refresh(id);
    });
    /* Qty-Inputs */
    document.addEventListener('input', function (e) {
      var inp = e.target;
      if (!inp.id || inp.id.indexOf('qty-') !== 0) return;
      var id = inp.id.replace('qty-', '');
      var v = parseInt(inp.value, 10);
      mengen[id] = Math.max(0, Math.min(99, isNaN(v) ? 0 : v));
      refresh(id);
    });

    PRODUKTE.forEach(function (p) { refresh(p.id); });

    /* Formular */
    var form = document.getElementById('orderForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var qty = PRODUKTE.reduce(function (s, p) { return s + mengen[p.id]; }, 0);
        if (qty < 1) { alert('Bitte mindestens ein Produkt ausw\u00e4hlen.'); return; }
        var ids = ['vorname', 'nachname', 'email', 'strasse', 'plz', 'ort', 'abwicklung'];
        var ok = true;
        ids.forEach(function (id) {
          var el = document.getElementById(id);
          if (!el || !el.value.trim()) { if (el) el.style.borderColor = '#C0392B'; ok = false; }
          else if (el) el.style.borderColor = '';
        });
        if (!ok) { alert('Bitte alle Pflichtfelder ausf\u00fcllen.'); return; }
        var g = function (id) { return document.getElementById(id).value.trim(); };
        var total = PRODUKTE.reduce(function (s, p) { return s + mengen[p.id] * p.preis; }, 0);
        var lines = PRODUKTE.filter(function (p) { return mengen[p.id] > 0; })
          .map(function (p) { return mengen[p.id] + 'x ' + p.name + ' = ' + eur(mengen[p.id] * p.preis); }).join('\n');
        var body = encodeURIComponent(
          'Bestellung von ' + g('vorname') + ' ' + g('nachname') + '\n\nPRODUKTE:\n' + lines +
          '\nGesamt: ' + eur(total) + '\n\nE-Mail: ' + g('email') +
          (g('telefon') ? '\nTel: ' + g('telefon') : '') +
          '\n\nAdresse: ' + g('strasse') + ', ' + g('plz') + ' ' + g('ort') +
          '\nAbwicklung: ' + (g('abwicklung') === 'abholung' ? 'Abholung' : 'Lieferung anfragen') +
          (g('bemerkung') ? '\n\nBemerkung: ' + g('bemerkung') : '')
        );
        window.location.href = 'mailto:info@trinkaus-imkerei.de?subject=Bestellung%20Trinkaus%20%26%20S%C3%B6hne&body=' + body;
        form.style.display = 'none';
        var msg = document.getElementById('successMsg');
        var nm = document.getElementById('successName');
        if (msg) msg.style.display = 'block';
        if (nm) nm.textContent = g('vorname');
        window.scrollTo(0, 0);
      });
    }
  }

}); /* end DOMContentLoaded */
