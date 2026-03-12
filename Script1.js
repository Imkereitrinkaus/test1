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

```
/* ============================================================
   HILFSFUNKTIONEN
============================================================ */
function formatEur(val) {
  return val.toFixed(2).replace('.', ',') + ' €';
}

/* ============================================================
   SPA NAVIGATION
   Alle Seitennavigation läuft über data-page Attribute und
   Event Delegation – kein inline onclick nötig.
============================================================ */
const PAGES = ['home', 'honig', 'ueber', 'bestell', 'impressum', 'datenschutz'];

function showPage(pageId) {
  PAGES.forEach(function(id) {
    var el = document.getElementById('page-' + id);
    if (el) el.classList.toggle('active', id === pageId);
  });
  document.querySelectorAll('[data-page]').forEach(function(link) {
    var isNav = link.classList.contains('nav__link') || link.classList.contains('mobile-nav__link');
    if (isNav) link.classList.toggle('active', link.dataset.page === pageId);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   MOBILE NAV TOGGLE
============================================================ */
function toggleMobile() {
  var btn = document.getElementById('burgerBtn');
  var nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;
  var open = nav.classList.toggle('open');
  btn.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', String(open));
  btn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
}
function closeMobile() {
  var btn = document.getElementById('burgerBtn');
  var nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;
  nav.classList.remove('open');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Menü öffnen');
}

/* ============================================================
   GLOBAL EVENT DELEGATION
   Fängt alle [data-page] Klicks im gesamten Dokument.
============================================================ */
document.addEventListener('click', function(e) {
  var target = e.target.closest('[data-page]');
  if (target) {
    e.preventDefault();
    var page = target.getAttribute('data-page');
    if (target.hasAttribute('data-close-mobile')) closeMobile();
    showPage(page);
  }
});

// Burger button
var burgerBtn = document.getElementById('burgerBtn');
if (burgerBtn) {
  burgerBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMobile();
  });
}

// Close mobile nav on outside click
document.addEventListener('click', function(e) {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('burgerBtn');
  if (nav && nav.classList.contains('open')) {
    if (!nav.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      closeMobile();
    }
  }
});

/* ============================================================
   STARTSEITE – PRODUKT-TEASER
============================================================ */
function renderTeaserGrid() {
  const grid = document.getElementById('teaserGrid');
  if (!grid) return;
  grid.innerHTML = PRODUKTE.map(p => `
    <div class="teaser-card" role="listitem" tabindex="0"
          onkeypress="if(event.key==='Enter')showPage('honig')"
         aria-label="${p.name} – ${p.preis.toFixed(2).replace('.',',')} Euro">
      <svg class="teaser-card__hex" viewBox="0 0 60 70" fill="none" aria-hidden="true">
        <polygon points="30,3 57,18 57,52 30,67 3,52 3,18"
          stroke="#F0A500" stroke-width="2.5" fill="rgba(240,165,0,0.12)"/>
        <polygon points="30,14 45,23 45,47 30,56 15,47 15,23"
          stroke="#F0A500" stroke-width="1" fill="rgba(240,165,0,0.1)"/>
      </svg>
      <div class="teaser-card__body">
        <div class="teaser-card__sub">${p.untertitel} · ${p.gewicht}</div>
        <h3>${p.name}</h3>
        <p style="font-size:0.88rem;color:var(--muted);margin-top:var(--space-2);line-height:1.6;">${p.beschreibung}</p>
        <div style="margin-top:var(--space-4);display:flex;align-items:baseline;gap:var(--space-3);">
          <span class="teaser-card__price">${formatEur(p.preis)}</span>
          <span style="font-size:0.8rem;color:var(--muted);">${p.gewicht}</span>
        </div>
      </div>
    </div>
  `).join('');
}

/* ============================================================
   PRODUKTSEITE – PRODUKT-KARTEN
============================================================ */
function renderProductCards() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = PRODUKTE.map(p => `
    <article class="product-card" role="listitem" aria-label="${p.name}">
      <div class="product-card__top ${p.topClass}">
        ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
        <svg class="product-card__jar" viewBox="0 0 80 100" fill="none" aria-hidden="true">
          <!-- Jar shape -->
          <rect x="20" y="28" width="40" height="62" rx="4" fill="${p.topClass ? '#F0A500' : '#1A1A18'}" opacity="0.85"/>
          <rect x="24" y="22" width="32" height="12" rx="3" fill="${p.topClass ? '#F0A500' : '#1A1A18'}" opacity="0.95"/>
          <rect x="26" y="36" width="28" height="46" rx="2" fill="${p.topClass ? 'rgba(240,165,0,0.25)' : 'rgba(250,247,239,0.12)'}" />
          <rect x="28" y="42" width="10" height="3" rx="1" fill="${p.topClass ? '#1A1A18' : '#F0A500'}" opacity="0.4"/>
          <rect x="28" y="48" width="24" height="2" rx="1" fill="${p.topClass ? '#1A1A18' : '#F0A500'}" opacity="0.25"/>
        </svg>
      </div>
      <div class="product-card__body">
        <p class="product-card__type">${p.untertitel} · ${p.gewicht}</p>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.beschreibung}</p>
        <div class="product-card__footer">
          <div>
            <div class="product-card__price">${formatEur(p.preis)}</div>
            <div class="product-card__weight">pro Glas · ${p.gewicht}</div>
          </div>
          <button class="btn btn--primary"
            
            aria-label="${p.name} bestellen">
            Bestellen →
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

/* ============================================================
   BESTELLRECHNER
============================================================ */
const mengen = {}; // { produktId: anzahl }
PRODUKTE.forEach(p => mengen[p.id] = 0);

function renderCalcItems() {
  const wrap = document.getElementById('calcItems');
  if (!wrap) return;
  wrap.innerHTML = PRODUKTE.map(p => `
    <div class="calc-item" role="listitem">
      <div class="calc-item__info">
        <div class="calc-item__name">${p.name}</div>
        <div class="calc-item__price-unit">${formatEur(p.preis)} / Glas · ${p.gewicht}</div>
      </div>
      <div class="calc-item__qty" role="group" aria-label="Menge ${p.name}">
        <button class="qty-btn" data-qty-id="${p.id}" data-qty-delta="-1"
          aria-label="${p.name}: Menge verringern">−</button>
        <input class="qty-input" type="number" min="0" max="99"
          value="${mengen[p.id]}"
          id="qty-${p.id}"
          aria-label="${p.name} Anzahl"
          data-qty-input="${p.id}" />
        <button class="qty-btn" data-qty-id="${p.id}" data-qty-delta="1"
          aria-label="${p.name}: Menge erhöhen">+</button>
      </div>
      <div class="calc-item__subtotal" aria-live="polite" id="sub-${p.id}">${formatEur(mengen[p.id] * p.preis)}</div>
    </div>
  `).join('');
}

function changeQty(id, delta) {
  mengen[id] = Math.max(0, (mengen[id] || 0) + delta);
  updateCalc(id);
}
function setQty(id, val) {
  mengen[id] = Math.max(0, Math.min(99, val));
  updateCalc(id);
}

function updateCalc(changedId) {
  // Update input value
  const inp = document.getElementById('qty-' + changedId);
  if (inp) inp.value = mengen[changedId];

  // Update subtotal
  const prod = PRODUKTE.find(p => p.id === changedId);
  const subEl = document.getElementById('sub-' + changedId);
  if (subEl && prod) subEl.textContent = formatEur(mengen[changedId] * prod.preis);

  // Update total
  const total = PRODUKTE.reduce((sum, p) => sum + (mengen[p.id] || 0) * p.preis, 0);
  const totalEl = document.getElementById('totalAmount');
  if (totalEl) totalEl.textContent = formatEur(total);

  // Update summary
  updateSummary();
}

function updateSummary() {
  const box = document.getElementById('orderSummary');
  if (!box) return;
  const lines = PRODUKTE.filter(p => (mengen[p.id] || 0) > 0);
  if (!lines.length) {
    box.innerHTML = '<div class="order__summary-line empty">Noch nichts ausgewählt.</div>';
  } else {
    const total = PRODUKTE.reduce((s, p) => s + (mengen[p.id]||0)*p.preis, 0);
    box.innerHTML = lines.map(p => `
      <div class="order__summary-line">
        <span>${mengen[p.id]}× ${p.name}</span>
        <span>${formatEur(mengen[p.id]*p.preis)}</span>
      </div>
    `).join('') +
    `<div class="order__summary-line" style="font-weight:700;border-top:1px solid var(--cream-dark);margin-top:var(--space-2);padding-top:var(--space-2);">
      <span>Gesamt</span><span>${formatEur(total)}</span>
    </div>`;
  }
}

/* ============================================================
   FORMULAR ABSENDEN
============================================================ */
document.getElementById('orderForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;

  // Validate quantity
  const total = PRODUKTE.reduce((s, p) => s + (mengen[p.id]||0), 0);
  if (total < 1) {
    alert('Bitte wählen Sie mindestens ein Produkt im Bestellrechner aus.');
    return;
  }

  // Basic required fields
  const required = ['vorname','nachname','email','strasse','plz','ort','abwicklung'];
  let valid = true;
  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#C0392B';
      el.focus();
      valid = false;
    } else {
      el.style.borderColor = '';
    }
  });
  if (!valid) {
    alert('Bitte füllen Sie alle Pflichtfelder aus.');
    return;
  }

  // Build order summary string (for mailto or backend)
  const orderLines = PRODUKTE
    .filter(p => (mengen[p.id]||0) > 0)
    .map(p => `${mengen[p.id]}× ${p.name} (${p.gewicht}) = ${formatEur(mengen[p.id]*p.preis)}`)
    .join('\n');
  const totalVal = PRODUKTE.reduce((s,p)=>s+(mengen[p.id]||0)*p.preis,0);

  // Compose mailto (demo – replace with real backend POST)
  const vorname  = document.getElementById('vorname').value.trim();
  const nachname = document.getElementById('nachname').value.trim();
  const email    = document.getElementById('email').value.trim();
  const tel      = document.getElementById('telefon').value.trim();
  const strasse  = document.getElementById('strasse').value.trim();
  const plz      = document.getElementById('plz').value.trim();
  const ort      = document.getElementById('ort').value.trim();
  const abw      = document.getElementById('abwicklung').value;
  const bem      = document.getElementById('bemerkung').value.trim();
  const abwText  = abw === 'abholung' ? 'Abholung' : 'Lieferung/Versand anfragen';

  const body = encodeURIComponent(
    `Neue Bestellung von ${vorname} ${nachname}\n\n` +
    `BESTELLUNG:\n${orderLines}\nGesamt: ${formatEur(totalVal)}\n\n` +
    `KONTAKT:\nE-Mail: ${email}\n` +
    (tel ? `Telefon: ${tel}\n` : '') +
    `\nLIEFERADRESSE:\n${strasse}\n${plz} ${ort}\n\n` +
    `ABWICKLUNG: ${abwText}\n\n` +
    (bem ? `BEMERKUNG:\n${bem}` : '')
  );

  // Open mailto (production: replace with fetch to backend)
  window.location.href = `mailto:info@trinkaus-imkerei.de?subject=Bestellung%20Trinkaus%20%26%20S%C3%B6hne&body=${body}`;

  // Show success
  form.style.display = 'none';
  const msg = document.getElementById('successMsg');
  msg.style.display = 'block';
  document.getElementById('successName').textContent = vorname;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   QTY-BUTTONS: EVENT DELEGATION
   Fängt Klicks auf [data-qty-id] und Eingaben auf [data-qty-input].
============================================================ */
document.addEventListener('click', function(e) {
  var btn = e.target.closest('[data-qty-id]');
  if (!btn || !btn.hasAttribute('data-qty-delta')) return;
  var id    = btn.getAttribute('data-qty-id');
  var delta = parseInt(btn.getAttribute('data-qty-delta'), 10);
  changeQty(id, delta);
});

document.addEventListener('input', function(e) {
  var input = e.target.closest('[data-qty-input]');
  if (!input) return;
  var id = input.getAttribute('data-qty-input');
  setQty(id, parseInt(input.value, 10) || 0);
});

document.addEventListener('change', function(e) {
  var input = e.target.closest('[data-qty-input]');
  if (!input) return;
  var id = input.getAttribute('data-qty-input');
  setQty(id, parseInt(input.value, 10) || 0);
});

/* ============================================================
   INPUT FOCUS: RESET ERROR STATE
============================================================ */
document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function(el) {
  el.addEventListener('input', function() { el.style.borderColor = ''; });
});

/* ============================================================
   INIT
============================================================ */
renderTeaserGrid();
renderProductCards();
renderCalcItems();
updateSummary();
```
