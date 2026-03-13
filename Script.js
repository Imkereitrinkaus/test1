/* ============================================================
PRODUKTDATEN – hier neue Sorten ergänzen
============================================================ */
const PRODUKTE = [
{
id: “fruehlingsblüte”,
name: “Frühlingsblüte”,
untertitel: “Milder Blütenhonig”,
gewicht: “500 g”,
preis: 7.50,
beschreibung: “Blütenzart und aromatisch – geerntet im ersten Aufblühen des Jahres. Mild, floral, mit feiner Süße. Perfekt zum Frühstück oder pur vom Löffel.”,
badge: “Bestseller”,
topClass: “”
},
{
id: “sommertracht”,
name: “Sommertracht”,
untertitel: “Kräftiger Trachthonig”,
gewicht: “500 g”,
preis: 7.50,
beschreibung: “Kräftig und würzig – die volle Kraft der Sommerpflanzen im Glas. Intensiver Charakter, langanhaltend im Abgang. Ideal zu Käse oder dunklem Brot.”,
badge: null,
topClass: “product-card__top–summer”
}
];

/* ============================================================
START: warte bis DOM vollständig geladen ist
============================================================ */
document.addEventListener(‘DOMContentLoaded’, function () {

/* — Hilfsfunktionen ———————————— */
function formatEur(val) {
return val.toFixed(2).replace(’.’, ‘,’) + ‘\u00a0€’;
}

/* ========================================================
SEITENNAVIGATION
======================================================== */
var PAGES = [‘home’, ‘honig’, ‘ueber’, ‘bestell’, ‘impressum’, ‘datenschutz’];

function showPage(pageId) {
PAGES.forEach(function (id) {
var el = document.getElementById(‘page-’ + id);
if (el) el.classList.toggle(‘active’, id === pageId);
});
document.querySelectorAll(’.nav__link, .mobile-nav__link’).forEach(function (el) {
el.classList.toggle(‘active’, el.getAttribute(‘data-page’) === pageId);
});
window.scrollTo({ top: 0, behavior: ‘smooth’ });
}

/* ========================================================
BURGER / MOBILE MENÜ
======================================================== */
function closeMobile() {
var btn = document.getElementById(‘burgerBtn’);
var nav = document.getElementById(‘mobileNav’);
if (btn) { btn.classList.remove(‘open’); btn.setAttribute(‘aria-expanded’, ‘false’); }
if (nav)   nav.classList.remove(‘open’);
}

function toggleMobile() {
var btn = document.getElementById(‘burgerBtn’);
var nav = document.getElementById(‘mobileNav’);
if (!btn || !nav) return;
var open = !nav.classList.contains(‘open’);
nav.classList.toggle(‘open’, open);
btn.classList.toggle(‘open’, open);
btn.setAttribute(‘aria-expanded’, String(open));
}

var burgerBtn = document.getElementById(‘burgerBtn’);
if (burgerBtn) {
burgerBtn.addEventListener(‘click’, function (e) {
e.stopPropagation();
toggleMobile();
});
}

/* ========================================================
GLOBALE KLICK-DELEGATION
Navigationn via data-page, Qty-Buttons via data-qty-delta
======================================================== */
document.addEventListener(‘click’, function (e) {
/* Qty-Buttons: eigene Logik weiter unten */
if (e.target.closest(’[data-qty-delta]’)) return;

```
/* Navigations-Links */
var navTarget = e.target.closest('[data-page]');
if (navTarget) {
  e.preventDefault();
  if (navTarget.hasAttribute('data-close-mobile')) closeMobile();
  showPage(navTarget.getAttribute('data-page'));
  return;
}

/* Außerhalb Menü klicken → schließen */
var mobileNav = document.getElementById('mobileNav');
if (mobileNav && mobileNav.classList.contains('open')) {
  if (!mobileNav.contains(e.target) && e.target !== burgerBtn) {
    closeMobile();
  }
}
```

});

/* ========================================================
TEASER-GRID (Startseite)
======================================================== */
function renderTeaserGrid() {
var grid = document.getElementById(‘teaserGrid’);
if (!grid) return;
grid.innerHTML = PRODUKTE.map(function (p) {
return ‘<div class="teaser-card" data-page="honig" role="listitem" tabindex="0">’ +
‘<svg class="teaser-card__hex" viewBox="0 0 60 70" fill="none" aria-hidden="true">’ +
‘<polygon points="30,3 57,18 57,52 30,67 3,52 3,18" stroke="#F0A500" stroke-width="2.5" fill="rgba(240,165,0,0.12)"/>’ +
‘<polygon points="30,14 45,23 45,47 30,56 15,47 15,23" stroke="#F0A500" stroke-width="1" fill="rgba(240,165,0,0.1)"/>’ +
‘</svg><div class="teaser-card__body">’ +
‘<div class="teaser-card__sub">’ + p.untertitel + ’ · ’ + p.gewicht + ‘</div>’ +
‘<h3>’ + p.name + ‘</h3>’ +
‘<p style="font-size:.88rem;color:var(--muted);margin-top:8px;line-height:1.6">’ + p.beschreibung + ‘</p>’ +
‘<div style="margin-top:16px;display:flex;align-items:baseline;gap:12px">’ +
‘<span class="teaser-card__price">’ + formatEur(p.preis) + ‘</span>’ +
‘<span style="font-size:.8rem;color:var(--muted)">’ + p.gewicht + ‘</span>’ +
‘</div></div></div>’;
}).join(’’);
}

/* ========================================================
PRODUKT-KARTEN (Honig-Seite)
======================================================== */
function renderProductCards() {
var grid = document.getElementById(‘productsGrid’);
if (!grid) return;
grid.innerHTML = PRODUKTE.map(function (p) {
var f1 = p.topClass ? ‘#F0A500’ : ‘#1A1A18’;
var f2 = p.topClass ? ‘rgba(240,165,0,0.25)’ : ‘rgba(250,247,239,0.12)’;
var f3 = p.topClass ? ‘#1A1A18’ : ‘#F0A500’;
return ‘<article class="product-card" aria-label="' + p.name + '">’ +
‘<div class="product-card__top ' + p.topClass + '">’ +
(p.badge ? ‘<span class="product-card__badge">’ + p.badge + ‘</span>’ : ‘’) +
‘<svg class="product-card__jar" viewBox="0 0 80 100" fill="none" aria-hidden="true">’ +
‘<rect x="20" y="28" width="40" height="62" rx="4" fill="' + f1 + '" opacity="0.85"/>’ +
‘<rect x="24" y="22" width="32" height="12" rx="3" fill="' + f1 + '" opacity="0.95"/>’ +
‘<rect x="26" y="36" width="28" height="46" rx="2" fill="' + f2 + '"/>’ +
‘<rect x="28" y="42" width="10" height="3" rx="1" fill="' + f3 + '" opacity="0.4"/>’ +
‘<rect x="28" y="48" width="24" height="2" rx="1" fill="' + f3 + '" opacity="0.25"/>’ +
‘</svg></div><div class="product-card__body">’ +
‘<p class="product-card__type">’ + p.untertitel + ’ · ’ + p.gewicht + ‘</p>’ +
‘<h3 class="product-card__name">’ + p.name + ‘</h3>’ +
‘<p class="product-card__desc">’ + p.beschreibung + ‘</p>’ +
‘<div class="product-card__footer"><div>’ +
‘<div class="product-card__price">’ + formatEur(p.preis) + ‘</div>’ +
‘<div class="product-card__weight">pro Glas · ’ + p.gewicht + ‘</div></div>’ +
‘<button class="btn btn--primary" data-page="bestell">Bestellen →</button>’ +
‘</div></div></article>’;
}).join(’’);
}

/* ========================================================
BESTELLRECHNER
======================================================== */
var mengen = {};
PRODUKTE.forEach(function (p) { mengen[p.id] = 0; });

function renderCalcItems() {
var wrap = document.getElementById(‘calcItems’);
if (!wrap) return;
wrap.innerHTML = PRODUKTE.map(function (p) {
return ‘<div class="calc-item">’ +
‘<div class="calc-item__info">’ +
‘<div class="calc-item__name">’ + p.name + ‘</div>’ +
‘<div class="calc-item__price-unit">’ + formatEur(p.preis) + ’ / Glas · ’ + p.gewicht + ‘</div>’ +
‘</div>’ +
‘<div class="calc-item__qty">’ +
‘<button class="qty-btn" data-qty-id="' + p.id + '" data-qty-delta="-1" aria-label="Weniger">−</button>’ +
‘<input class=“qty-input” type=“number” min=“0” max=“99” value=“0” ’ +
‘id=“qty-’ + p.id + ‘” data-qty-input=”’ + p.id + ‘” aria-label=”’ + p.name + ’ Menge”/>’ +
‘<button class="qty-btn" data-qty-id="' + p.id + '" data-qty-delta="1" aria-label="Mehr">+</button>’ +
‘</div>’ +
‘<div class="calc-item__subtotal" id="sub-' + p.id + '">’ + formatEur(0) + ‘</div>’ +
‘</div>’;
}).join(’’);
}

function changeQty(id, delta) {
mengen[id] = Math.max(0, (mengen[id] || 0) + delta);
refreshCalc(id);
}
function setQty(id, val) {
mengen[id] = Math.max(0, Math.min(99, isNaN(val) ? 0 : val));
refreshCalc(id);
}
function refreshCalc(id) {
var inp = document.getElementById(‘qty-’ + id);
if (inp) inp.value = mengen[id];
var prod = PRODUKTE.find(function (p) { return p.id === id; });
var sub  = document.getElementById(‘sub-’ + id);
if (sub && prod) sub.textContent = formatEur(mengen[id] * prod.preis);
var total = PRODUKTE.reduce(function (s, p) { return s + (mengen[p.id] || 0) * p.preis; }, 0);
var totalEl = document.getElementById(‘totalAmount’);
if (totalEl) totalEl.textContent = formatEur(total);
renderSummary();
}
function renderSummary() {
var box = document.getElementById(‘orderSummary’);
if (!box) return;
var items = PRODUKTE.filter(function (p) { return (mengen[p.id] || 0) > 0; });
if (!items.length) {
box.innerHTML = ‘<div class="order__summary-line empty">Noch nichts ausgewählt.</div>’;
return;
}
var total = PRODUKTE.reduce(function (s, p) { return s + (mengen[p.id] || 0) * p.preis; }, 0);
box.innerHTML = items.map(function (p) {
return ‘<div class="order__summary-line"><span>’ + mengen[p.id] + ‘× ’ + p.name + ‘</span>’ +
‘<span>’ + formatEur(mengen[p.id] * p.preis) + ‘</span></div>’;
}).join(’’) +
‘<div class="order__summary-line" style="font-weight:700;border-top:1px solid #F2EDD8;margin-top:4px;padding-top:6px">’ +
‘<span>Gesamt</span><span>’ + formatEur(total) + ‘</span></div>’;
}

/* Qty-Button Klicks */
document.addEventListener(‘click’, function (e) {
var btn = e.target.closest(’[data-qty-delta]’);
if (!btn) return;
e.stopPropagation();
changeQty(btn.getAttribute(‘data-qty-id’), parseInt(btn.getAttribute(‘data-qty-delta’), 10));
});
/* Qty-Input Eingaben */
document.addEventListener(‘input’, function (e) {
var inp = e.target.closest(’[data-qty-input]’);
if (inp) setQty(inp.getAttribute(‘data-qty-input’), parseInt(inp.value, 10));
});

/* ========================================================
FORMULAR
======================================================== */
var form = document.getElementById(‘orderForm’);
if (form) {
form.addEventListener(‘submit’, function (e) {
e.preventDefault();
var totalQty = PRODUKTE.reduce(function (s, p) { return s + (mengen[p.id] || 0); }, 0);
if (totalQty < 1) { alert(‘Bitte wählen Sie mindestens ein Produkt aus.’); return; }

```
  var pflicht = ['vorname','nachname','email','strasse','plz','ort','abwicklung'];
  var ok = true;
  pflicht.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      if (el) el.style.borderColor = '#C0392B';
      if (ok && el) el.focus();
      ok = false;
    } else if (el) { el.style.borderColor = ''; }
  });
  if (!ok) { alert('Bitte alle Pflichtfelder ausfüllen.'); return; }

  var g = function (id) { return document.getElementById(id).value.trim(); };
  var abwText = g('abwicklung') === 'abholung' ? 'Abholung' : 'Lieferung/Versand anfragen';
  var total   = PRODUKTE.reduce(function (s, p) { return s + (mengen[p.id] || 0) * p.preis; }, 0);
  var lines   = PRODUKTE.filter(function (p) { return (mengen[p.id] || 0) > 0; })
                        .map(function (p) { return mengen[p.id] + '× ' + p.name + ' = ' + formatEur(mengen[p.id] * p.preis); })
                        .join('\n');
  var mailBody = encodeURIComponent(
    'Bestellung von ' + g('vorname') + ' ' + g('nachname') + '\n\n' +
    'PRODUKTE:\n' + lines + '\nGesamt: ' + formatEur(total) + '\n\n' +
    'E-Mail: ' + g('email') + (g('telefon') ? '\nTel: ' + g('telefon') : '') + '\n\n' +
    'Adresse: ' + g('strasse') + ', ' + g('plz') + ' ' + g('ort') + '\n' +
    'Abwicklung: ' + abwText +
    (g('bemerkung') ? '\n\nBemerkung: ' + g('bemerkung') : '')
  );
  window.location.href = 'mailto:info@trinkaus-imkerei.de?subject=Bestellung%20Trinkaus%20%26%20S%C3%B6hne&body=' + mailBody;

  form.style.display = 'none';
  var msg = document.getElementById('successMsg');
  var nm  = document.getElementById('successName');
  if (msg) msg.style.display = 'block';
  if (nm)  nm.textContent = g('vorname');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

}

/* Fehlerrand zurücksetzen */
document.querySelectorAll(’.form-input,.form-select,.form-textarea’).forEach(function (el) {
el.addEventListener(‘input’, function () { el.style.borderColor = ‘’; });
});

/* ========================================================
INIT
======================================================== */
renderTeaserGrid();
renderProductCards();
renderCalcItems();
renderSummary();

}); /* Ende DOMContentLoaded */