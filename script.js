/* PRODUKTDATEN */
var PRODUKTE = [
  {
    id: 'fruehlingsblute',
    name: 'Frühlingsblüte',
    untertitel: 'Milder Blütenhonig',
    gewicht: '500 g',
    preis: 7.50,
    beschreibung: 'Blütenzart und aromatisch – geerntet im ersten Aufblühen des Jahres. Mild, floral, mit feiner Süße. Perfekt zum Frühstück oder pur vom Löffel.',
    badge: 'Bestseller',
    topClass: ''
  },
  {
    id: 'sommertracht',
    name: 'Sommertracht',
    untertitel: 'Kräftiger Trachthonig',
    gewicht: '500 g',
    preis: 7.50,
    beschreibung: 'Kräftig und würzig – die volle Kraft der Sommerpflanzen im Glas. Intensiver Charakter, langanhaltend im Abgang. Ideal zu Käse oder dunklem Brot.',
    badge: null,
    topClass: 'product-card__top--summer'
  }
];

document.addEventListener('DOMContentLoaded', function () {

  function eur(v) { return v.toFixed(2).replace('.', ',') + '\u00a0\u20ac'; }

  /* NAVIGATION */
  var PAGES = ['home','honig','ueber','bestell','impressum','datenschutz'];

  function showPage(id) {
    PAGES.forEach(function(p) {
      var el = document.getElementById('page-' + p);
      if (el) el.classList.toggle('active', p === id);
    });
    document.querySelectorAll('.nav__link, .mobile-nav__link').forEach(function(el) {
      el.classList.toggle('active', el.getAttribute('data-page') === id);
    });
    window.scrollTo(0, 0);
  }

  /* BURGER */
  function closeMobile() {
    var btn = document.getElementById('burgerBtn');
    var nav = document.getElementById('mobileNav');
    if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
    if (nav) nav.classList.remove('open');
  }

  var burger = document.getElementById('burgerBtn');
  if (burger) {
    burger.addEventListener('click', function(e) {
      e.stopPropagation();
      var nav = document.getElementById('mobileNav');
      var open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  /* CLICK DELEGATION: Navigation + Qty */
  document.addEventListener('click', function(e) {
    /* Qty buttons have priority */
    var qtyBtn = e.target.closest('[data-qty-delta]');
    if (qtyBtn) {
      e.stopPropagation();
      changeQty(qtyBtn.getAttribute('data-qty-id'),
                parseInt(qtyBtn.getAttribute('data-qty-delta'), 10));
      return;
    }
    /* Navigation links */
    var link = e.target.closest('[data-page]');
    if (link) {
      e.preventDefault();
      if (link.hasAttribute('data-close-mobile')) closeMobile();
      showPage(link.getAttribute('data-page'));
      return;
    }
    /* Click outside mobile nav -> close */
    var mNav = document.getElementById('mobileNav');
    if (mNav && mNav.classList.contains('open')) {
      if (!mNav.contains(e.target) && e.target !== burger) closeMobile();
    }
  });

  /* QTY INPUT */
  document.addEventListener('input', function(e) {
    var inp = e.target.closest('[data-qty-input]');
    if (inp) {
      var v = parseInt(inp.value, 10);
      setQty(inp.getAttribute('data-qty-input'), isNaN(v) ? 0 : v);
    }
  });

  /* RENDER TEASER */
  function renderTeaserGrid() {
    var grid = document.getElementById('teaserGrid');
    if (!grid) return;
    grid.innerHTML = PRODUKTE.map(function(p) {
      return '<div class="teaser-card" data-page="honig" tabindex="0">' +
        '<svg class="teaser-card__hex" viewBox="0 0 60 70" fill="none">' +
        '<polygon points="30,3 57,18 57,52 30,67 3,52 3,18" stroke="#F0A500" stroke-width="2.5" fill="rgba(240,165,0,0.12)"/></svg>' +
        '<div><div class="teaser-card__sub">' + p.untertitel + ' &middot; ' + p.gewicht + '</div>' +
        '<h3>' + p.name + '</h3>' +
        '<p style="font-size:.88rem;color:var(--muted);margin-top:8px;line-height:1.6">' + p.beschreibung + '</p>' +
        '<div style="margin-top:16px"><span class="teaser-card__price">' + eur(p.preis) + '</span></div>' +
        '</div></div>';
    }).join('');
  }

  /* RENDER PRODUCTS */
  function renderProductCards() {
    var grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = PRODUKTE.map(function(p) {
      var f1 = p.topClass ? '#F0A500' : '#1A1A18';
      var f2 = p.topClass ? 'rgba(240,165,0,0.25)' : 'rgba(250,247,239,0.12)';
      var f3 = p.topClass ? '#1A1A18' : '#F0A500';
      return '<article class="product-card">' +
        '<div class="product-card__top ' + p.topClass + '">' +
        (p.badge ? '<span class="product-card__badge">' + p.badge + '</span>' : '') +
        '<svg class="product-card__jar" viewBox="0 0 80 100" fill="none">' +
        '<rect x="20" y="28" width="40" height="62" rx="4" fill="' + f1 + '" opacity="0.85"/>' +
        '<rect x="24" y="22" width="32" height="12" rx="3" fill="' + f1 + '" opacity="0.95"/>' +
        '<rect x="26" y="36" width="28" height="46" rx="2" fill="' + f2 + '"/>' +
        '<rect x="28" y="42" width="10" height="3" rx="1" fill="' + f3 + '" opacity="0.4"/>' +
        '</svg></div>' +
        '<div class="product-card__body">' +
        '<p class="product-card__type">' + p.untertitel + ' &middot; ' + p.gewicht + '</p>' +
        '<h3 class="product-card__name">' + p.name + '</h3>' +
        '<p class="product-card__desc">' + p.beschreibung + '</p>' +
        '<div class="product-card__footer"><div>' +
        '<div class="product-card__price">' + eur(p.preis) + '</div>' +
        '<div class="product-card__weight">pro Glas &middot; ' + p.gewicht + '</div>' +
        '</div><button class="btn btn--primary" data-page="bestell">Bestellen &rarr;</button>' +
        '</div></div></article>';
    }).join('');
  }

  /* RECHNER */
  var mengen = {};
  PRODUKTE.forEach(function(p) { mengen[p.id] = 0; });

  function renderCalcItems() {
    var wrap = document.getElementById('calcItems');
    if (!wrap) return;
    wrap.innerHTML = PRODUKTE.map(function(p) {
      return '<div class="calc-item">' +
        '<div class="calc-item__info">' +
        '<div class="calc-item__name">' + p.name + '</div>' +
        '<div class="calc-item__price-unit">' + eur(p.preis) + ' / Glas</div>' +
        '</div>' +
        '<div class="calc-item__qty">' +
        '<button class="qty-btn" data-qty-id="' + p.id + '" data-qty-delta="-1">&minus;</button>' +
        '<input class="qty-input" type="number" min="0" max="99" value="0"' +
               ' id="qty-' + p.id + '" data-qty-input="' + p.id + '">' +
        '<button class="qty-btn" data-qty-id="' + p.id + '" data-qty-delta="1">+</button>' +
        '</div>' +
        '<div class="calc-item__subtotal" id="sub-' + p.id + '">' + eur(0) + '</div>' +
        '</div>';
    }).join('');
  }

  function changeQty(id, delta) {
    mengen[id] = Math.max(0, (mengen[id] || 0) + delta);
    refreshCalc(id);
  }
  function setQty(id, val) {
    mengen[id] = Math.max(0, Math.min(99, val));
    refreshCalc(id);
  }
  function refreshCalc(id) {
    var inp = document.getElementById('qty-' + id);
    if (inp) inp.value = mengen[id];
    var prod = PRODUKTE.filter(function(p){ return p.id === id; })[0];
    var sub  = document.getElementById('sub-' + id);
    if (sub && prod) sub.textContent = eur(mengen[id] * prod.preis);
    var total = PRODUKTE.reduce(function(s,p){ return s + (mengen[p.id]||0) * p.preis; }, 0);
    var el = document.getElementById('totalAmount');
    if (el) el.textContent = eur(total);
    renderSummary();
  }
  function renderSummary() {
    var box = document.getElementById('orderSummary');
    if (!box) return;
    var items = PRODUKTE.filter(function(p){ return (mengen[p.id]||0) > 0; });
    if (!items.length) {
      box.innerHTML = '<div class="order__summary-line empty">Noch nichts ausgewählt.</div>';
      return;
    }
    var total = PRODUKTE.reduce(function(s,p){ return s + (mengen[p.id]||0) * p.preis; }, 0);
    box.innerHTML = items.map(function(p){
      return '<div class="order__summary-line"><span>' + mengen[p.id] + '× ' + p.name + '</span>' +
             '<span>' + eur(mengen[p.id] * p.preis) + '</span></div>';
    }).join('') +
    '<div class="order__summary-line" style="font-weight:700;border-top:1px solid #F2EDD8;margin-top:4px;padding-top:6px">' +
    '<span>Gesamt</span><span>' + eur(total) + '</span></div>';
  }

  /* FORMULAR */
  var form = document.getElementById('orderForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var qty = PRODUKTE.reduce(function(s,p){ return s + (mengen[p.id]||0); }, 0);
      if (qty < 1) { alert('Bitte mindestens ein Produkt auswählen.'); return; }
      var ids = ['vorname','nachname','email','strasse','plz','ort','abwicklung'];
      var ok = true;
      ids.forEach(function(id) {
        var el = document.getElementById(id);
        if (!el || !el.value.trim()) {
          if (el) el.style.borderColor = '#C0392B';
          ok = false;
        } else if (el) { el.style.borderColor = ''; }
      });
      if (!ok) { alert('Bitte alle Pflichtfelder ausfüllen.'); return; }
      var g = function(id){ return document.getElementById(id).value.trim(); };
      var total = PRODUKTE.reduce(function(s,p){ return s + (mengen[p.id]||0) * p.preis; }, 0);
      var lines = PRODUKTE.filter(function(p){ return (mengen[p.id]||0) > 0; })
                          .map(function(p){ return mengen[p.id] + 'x ' + p.name + ' = ' + eur(mengen[p.id] * p.preis); })
                          .join('\n');
      var body = encodeURIComponent(
        'Bestellung von ' + g('vorname') + ' ' + g('nachname') + '\n\n' +
        'PRODUKTE:\n' + lines + '\nGesamt: ' + eur(total) + '\n\n' +
        'E-Mail: ' + g('email') + (g('telefon') ? '\nTel: ' + g('telefon') : '') + '\n\n' +
        'Adresse: ' + g('strasse') + ', ' + g('plz') + ' ' + g('ort') + '\n' +
        'Abwicklung: ' + (g('abwicklung') === 'abholung' ? 'Abholung' : 'Lieferung anfragen') +
        (g('bemerkung') ? '\n\nBemerkung: ' + g('bemerkung') : '')
      );
      window.location.href = 'mailto:info@trinkaus-imkerei.de?subject=Bestellung%20Trinkaus%20%26%20S%C3%B6hne&body=' + body;
      form.style.display = 'none';
      var msg = document.getElementById('successMsg');
      var nm  = document.getElementById('successName');
      if (msg) msg.style.display = 'block';
      if (nm)  nm.textContent = g('vorname');
      window.scrollTo(0, 0);
    });
    form.querySelectorAll('.form-input,.form-select,.form-textarea').forEach(function(el) {
      el.addEventListener('input', function(){ el.style.borderColor = ''; });
    });
  }

  /* INIT */
  renderTeaserGrid();
  renderProductCards();
  renderCalcItems();
  renderSummary();

}); /* end DOMContentLoaded */
