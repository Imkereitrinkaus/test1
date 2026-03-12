/* ============================================================
PRODUKTDATEN – ZENTRALE DATENSTRUKTUR
Neue Produkte einfach als weiteres Objekt ergänzen.
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
ALLES LÄUFT ERST WENN DER DOM BEREIT IST
============================================================ */
document.addEventListener(‘DOMContentLoaded’, function () {

/* –––––––––––––––––––––––––––––
HILFSFUNKTIONEN
––––––––––––––––––––––––––––– */
function formatEur(val) {
return val.toFixed(2).replace(’.’, ‘,’) + ’ €’;
}

/* –––––––––––––––––––––––––––––
SPA NAVIGATION
––––––––––––––––––––––––––––– */
const PAGES = [‘home’, ‘honig’, ‘ueber’, ‘bestell’, ‘impressum’, ‘datenschutz’];

function showPage(pageId) {
PAGES.forEach(function (id) {
var el = document.getElementById(‘page-’ + id);
if (el) el.classList.toggle(‘active’, id === pageId);
});
document.querySelectorAll(’.nav__link, .mobile-nav__link’).forEach(function (link) {
link.classList.toggle(‘active’, link.getAttribute(‘data-page’) === pageId);
});
window.scrollTo({ top: 0, behavior: ‘smooth’ });
}

/* –––––––––––––––––––––––––––––
MOBILE NAV
––––––––––––––––––––––––––––– */
function closeMobile() {
var btn = document.getElementById(‘burgerBtn’);
var nav = document.getElementById(‘mobileNav’);
if (!btn || !nav) return;
nav.classList.remove(‘open’);
btn.classList.remove(‘open’);
btn.setAttribute(‘aria-expanded’, ‘false’);
btn.setAttribute(‘aria-label’, ‘Menü öffnen’);
}

function toggleMobile() {
var btn = document.getElementById(‘burgerBtn’);
var nav = document.getElementById(‘mobileNav’);
if (!btn || !nav) return;
var isOpen = nav.classList.toggle(‘open’);
btn.classList.toggle(‘open’, isOpen);
btn.setAttribute(‘aria-expanded’, String(isOpen));
btn.setAttribute(‘aria-label’, isOpen ? ‘Menü schließen’ : ‘Menü öffnen’);
}

/* –––––––––––––––––––––––––––––
BURGER BUTTON
––––––––––––––––––––––––––––– */
var burgerBtn = document.getElementById(‘burgerBtn’);
if (burgerBtn) {
burgerBtn.addEventListener(‘click’, function (e) {
e.stopPropagation();
toggleMobile();
});
}

/* –––––––––––––––––––––––––––––
GLOBAL NAVIGATION: Event Delegation für alle [data-page]
Qty-Buttons bekommen data-qty-id UND data-qty-delta –
sie werden hier explizit ausgeschlossen.
––––––––––––––––––––––––––––– */
document.addEventListener(‘click’, function (e) {
if (e.target.closest(’[data-qty-id][data-qty-delta]’)) return;

```
var target = e.target.closest('[data-page]');
if (!target) return;

e.preventDefault();
var page = target.getAttribute('data-page');
if (target.hasAttribute('data-close-mobile')) closeMobile();
showPage(page);
```

});

// Außerhalb des mobilen Menüs klicken → schließen
document.addEventListener(‘click’, function (e) {
var nav = document.getElementById(‘mobileNav’);
var btn = document.getElementById(‘burgerBtn’);
if (nav && nav.classList.contains(‘open’)) {
if (!nav.contains(e.target) && btn && !btn.contains(e.target)) {
closeMobile();
}
}
});

/* –––––––––––––––––––––––––––––
PRODUKT-TEASER (Startseite)
data-page=“honig” direkt am Card-Element → Event Delegation
fängt den Klick automatisch.
––––––––––––––––––––––––––––– */
function renderTeaserGrid() {
var grid = document.getElementById(‘teaserGrid’);
if (!grid) return;
grid.innerHTML = PRODUKTE.map(function (p) {
return ‘<div class=“teaser-card” role=“listitem” tabindex=“0” data-page=“honig”’ +
’ aria-label=”’ + p.name + ’ – ’ + p.preis.toFixed(2).replace(’.’, ‘,’) + ’ Euro”>’ +
‘<svg class="teaser-card__hex" viewBox="0 0 60 70" fill="none" aria-hidden="true">’ +
‘<polygon points="30,3 57,18 57,52 30,67 3,52 3,18" stroke="#F0A500" stroke-width="2.5" fill="rgba(240,165,0,0.12)"/>’ +
‘<polygon points="30,14 45,23 45,47 30,56 15,47 15,23" stroke="#F0A500" stroke-width="1" fill="rgba(240,165,0,0.1)"/>’ +
‘</svg>’ +
‘<div class="teaser-card__body">’ +
‘<div class="teaser-card__sub">’ + p.untertitel + ’ · ’ + p.gewicht + ‘</div>’ +
‘<h3>’ + p.name + ‘</h3>’ +
‘<p style="font-size:0.88rem;color:var(--muted);margin-top:var(--space-2);line-height:1.6;">’ + p.beschreibung + ‘</p>’ +
‘<div style="margin-top:var(--space-4);display:flex;align-items:baseline;gap:var(--space-3);">’ +
‘<span class="teaser-card__price">’ + formatEur(p.preis) + ‘</span>’ +
‘<span style="font-size:0.8rem;color:var(--muted);">’ + p.gewicht + ‘</span>’ +
‘</div></div></div>’;
}).join(’’);
}

/* –––––––––––––––––––––––––––––
PRODUKTKARTEN (Produktseite)
„Bestellen →”-Button hat data-page=“bestell”
––––––––––––––––––––––––––––– */
function renderProductCards() {
var grid = document.getElementById(‘productsGrid’);
if (!grid) return;
grid.innerHTML = PRODUKTE.map(function (p) {
var badgeHtml = p.badge ? ‘<span class="product-card__badge">’ + p.badge + ‘</span>’ : ‘’;
var f1 = p.topClass ? ‘#F0A500’ : ‘#1A1A18’;
var f2 = p.topClass ? ‘rgba(240,165,0,0.25)’ : ‘rgba(250,247,239,0.12)’;
var f3 = p.topClass ? ‘#1A1A18’ : ‘#F0A500’;
return ‘<article class="product-card" role="listitem" aria-label="' + p.name + '">’ +
‘<div class="product-card__top ' + p.topClass + '">’ + badgeHtml +
‘<svg class="product-card__jar" viewBox="0 0 80 100" fill="none" aria-hidden="true">’ +
‘<rect x="20" y="28" width="40" height="62" rx="4" fill="' + f1 + '" opacity="0.85"/>’ +
‘<rect x="24" y="22" width="32" height="12" rx="3" fill="' + f1 + '" opacity="0.95"/>’ +
‘<rect x="26" y="36" width="28" height="46" rx="2" fill="' + f2 + '"/>’ +
‘<rect x="28" y="42" width="10" height="3" rx="1" fill="' + f3 + '" opacity="0.4"/>’ +
‘<rect x="28" y="48" width="24" height="2" rx="1" fill="' + f3 + '" opacity="0.25"/>’ +
‘</svg></div>’ +
‘<div class="product-card__body">’ +
‘<p class="product-card__type">’ + p.untertitel + ’ · ’ + p.gewicht + ‘</p>’ +
‘<h3 class="product-card__name">’ + p.name + ‘</h3>’ +
‘<p class="product-card__desc">’ + p.beschreibung + ‘</p>’ +
‘<div class="product-card__footer">’ +
‘<div><div class="product-card__price">’ + formatEur(p.preis) + ‘</div>’ +
‘<div class="product-card__weight">pro Glas · ’ + p.gewicht + ‘</div></div>’ +
‘<button class="btn btn--primary" data-page="bestell" aria-label="' + p.name + ' bestellen">Bestellen →</button>’ +
‘</div></div></article>’;
}).join(’’);
}

/* –––––––––––––––––––––––––––––
BESTELLRECHNER
––––––––––––––––––––––––––––– */
var mengen = {};
PRODUKTE.forEach(function (p) { mengen[p.id] = 0; });

function renderCalcItems() {
var wrap = document.getElementById(‘calcItems’);
if (!wrap) return;
wrap.innerHTML = PRODUKTE.map(function (p) {
return ‘<div class="calc-item" role="listitem">’ +
‘<div class="calc-item__info">’ +
‘<div class="calc-item__name">’ + p.name + ‘</div>’ +
‘<div class="calc-item__price-unit">’ + formatEur(p.preis) + ’ / Glas · ’ + p.gewicht + ‘</div>’ +
‘</div>’ +
‘<div class="calc-item__qty" role="group" aria-label="Menge ' + p.name + '">’ +
‘<button class="qty-btn" data-qty-id="' + p.id + '" data-qty-delta="-1" aria-label="' + p.name + ': Menge verringern">−</button>’ +
‘<input class="qty-input" type="number" min="0" max="99" value="' + mengen[p.id] + '" id="qty-' + p.id + '" aria-label="' + p.name + ' Anzahl" data-qty-input="' + p.id + '" />’ +
‘<button class="qty-btn" data-qty-id="' + p.id + '" data-qty-delta="1" aria-label="' + p.name + ': Menge erhöhen">+</button>’ +
‘</div>’ +
‘<div class="calc-item__subtotal" aria-live="polite" id="sub-' + p.id + '">’ + formatEur(0) + ‘</div>’ +
‘</div>’;
}).join(’’);
}

function changeQty(id, delta) {
mengen[id] = Math.max(0, (mengen[id] || 0) + delta);
updateCalc(id);
}

function setQty(id, val) {
mengen[id] = Math.max(0, Math.min(99, isNaN(val) ? 0 : val));
updateCalc(id);
}

function updateCalc(changedId) {
var inp = document.getElementById(‘qty-’ + changedId);
if (inp) inp.value = mengen[changedId];

```
var prod  = PRODUKTE.find(function (p) { return p.id === changedId; });
var subEl = document.getElementById('sub-' + changedId);
if (subEl && prod) subEl.textContent = formatEur(mengen[changedId] * prod.preis);

var total   = PRODUKTE.reduce(function (s, p) { return s + (mengen[p.id] || 0) * p.preis; }, 0);
var totalEl = document.getElementById('totalAmount');
if (totalEl) totalEl.textContent = formatEur(total);

updateSummary();
```

}

function updateSummary() {
var box = document.getElementById(‘orderSummary’);
if (!box) return;
var lines = PRODUKTE.filter(function (p) { return (mengen[p.id] || 0) > 0; });
if (!lines.length) {
box.innerHTML = ‘<div class="order__summary-line empty">Noch nichts ausgewählt.</div>’;
return;
}
var total = PRODUKTE.reduce(function (s, p) { return s + (mengen[p.id] || 0) * p.preis; }, 0);
box.innerHTML = lines.map(function (p) {
return ‘<div class="order__summary-line">’ +
‘<span>’ + mengen[p.id] + ‘× ’ + p.name + ‘</span>’ +
‘<span>’ + formatEur(mengen[p.id] * p.preis) + ‘</span></div>’;
}).join(’’) +
‘<div class="order__summary-line" style="font-weight:700;border-top:1px solid #F2EDD8;margin-top:4px;padding-top:8px;">’ +
‘<span>Gesamt</span><span>’ + formatEur(total) + ‘</span></div>’;
}

/* –––––––––––––––––––––––––––––
QTY-BUTTONS: Event Delegation
––––––––––––––––––––––––––––– */
document.addEventListener(‘click’, function (e) {
var btn = e.target.closest(’[data-qty-id][data-qty-delta]’);
if (!btn) return;
e.stopPropagation();
changeQty(btn.getAttribute(‘data-qty-id’), parseInt(btn.getAttribute(‘data-qty-delta’), 10));
});

document.addEventListener(‘input’, function (e) {
var input = e.target.closest(’[data-qty-input]’);
if (!input) return;
setQty(input.getAttribute(‘data-qty-input’), parseInt(input.value, 10));
});

document.addEventListener(‘change’, function (e) {
var input = e.target.closest(’[data-qty-input]’);
if (!input) return;
setQty(input.getAttribute(‘data-qty-input’), parseInt(input.value, 10));
});

/* –––––––––––––––––––––––––––––
FORMULAR
––––––––––––––––––––––––––––– */
var orderForm = document.getElementById(‘orderForm’);
if (orderForm) {
orderForm.addEventListener(‘submit’, function (e) {
e.preventDefault();

```
  var totalQty = PRODUKTE.reduce(function (s, p) { return s + (mengen[p.id] || 0); }, 0);
  if (totalQty < 1) {
    alert('Bitte wählen Sie mindestens ein Produkt im Bestellrechner aus.');
    return;
  }

  var pflicht = ['vorname', 'nachname', 'email', 'strasse', 'plz', 'ort', 'abwicklung'];
  var valid = true;
  pflicht.forEach(function (id) {
    var el = document.getElementById(id);
    if (el && !el.value.trim()) {
      el.style.borderColor = '#C0392B';
      if (valid) el.focus();
      valid = false;
    } else if (el) {
      el.style.borderColor = '';
    }
  });
  if (!valid) { alert('Bitte füllen Sie alle Pflichtfelder aus.'); return; }

  var vorname  = document.getElementById('vorname').value.trim();
  var nachname = document.getElementById('nachname').value.trim();
  var email    = document.getElementById('email').value.trim();
  var tel      = document.getElementById('telefon').value.trim();
  var strasse  = document.getElementById('strasse').value.trim();
  var plz      = document.getElementById('plz').value.trim();
  var ort      = document.getElementById('ort').value.trim();
  var abw      = document.getElementById('abwicklung').value;
  var bem      = document.getElementById('bemerkung').value.trim();
  var abwText  = abw === 'abholung' ? 'Abholung' : 'Lieferung/Versand anfragen';

  var totalVal   = PRODUKTE.reduce(function (s, p) { return s + (mengen[p.id] || 0) * p.preis; }, 0);
  var orderLines = PRODUKTE
    .filter(function (p) { return (mengen[p.id] || 0) > 0; })
    .map(function (p) { return mengen[p.id] + '× ' + p.name + ' (' + p.gewicht + ') = ' + formatEur(mengen[p.id] * p.preis); })
    .join('\n');

  var mailBody = encodeURIComponent(
    'Neue Bestellung von ' + vorname + ' ' + nachname + '\n\n' +
    'BESTELLUNG:\n' + orderLines + '\nGesamt: ' + formatEur(totalVal) + '\n\n' +
    'KONTAKT:\nE-Mail: ' + email + '\n' +
    (tel ? 'Telefon: ' + tel + '\n' : '') +
    '\nLIEFERADRESSE:\n' + strasse + '\n' + plz + ' ' + ort + '\n\n' +
    'ABWICKLUNG: ' + abwText + '\n\n' +
    (bem ? 'BEMERKUNG:\n' + bem : '')
  );

  window.location.href = 'mailto:info@trinkaus-imkerei.de?subject=Bestellung%20Trinkaus%20%26%20S%C3%B6hne&body=' + mailBody;

  orderForm.style.display = 'none';
  var msg    = document.getElementById('successMsg');
  var nameEl = document.getElementById('successName');
  if (msg)    msg.style.display = 'block';
  if (nameEl) nameEl.textContent = vorname;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

}

/* –––––––––––––––––––––––––––––
FORMULAR: Fehler-Rand beim Tippen zurücksetzen
––––––––––––––––––––––––––––– */
document.querySelectorAll(’.form-input, .form-select, .form-textarea’).forEach(function (el) {
el.addEventListener(‘input’, function () { el.style.borderColor = ‘’; });
});

/* –––––––––––––––––––––––––––––
INIT – Dynamische Inhalte rendern
––––––––––––––––––––––––––––– */
renderTeaserGrid();
renderProductCards();
renderCalcItems();
updateSummary();

}); // Ende DOMContentLoaded