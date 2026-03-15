/* ============================================================
   SCRIPT.JS  –  Liest Inhalte aus inhalt.js und rendert die Seite.
   Texte und Daten werden NICHT hier geändert – nur in inhalt.js.
============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  var f = SITE.firma;

  /* ── Hilfsfunktionen ───────────────────────────────────── */
  function eur(v) { return v.toFixed(2).replace('.', ',') + '\u00a0\u20ac'; }
  function el(id) { return document.getElementById(id); }
  function set(id, html) { var e = el(id); if (e) e.innerHTML = html; }
  function setText(id, txt) { var e = el(id); if (e) e.textContent = txt; }

  /* ── Navigation rendern ────────────────────────────────── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  var navLinksEl = el('navLinks');
  if (navLinksEl) {
    navLinksEl.innerHTML = SITE.nav.map(function (item) {
      var active = currentPage === item.href ? ' active' : '';
      return '<li><a class="nav__link' + active + '" href="' + item.href + '">' + item.label + '</a></li>';
    }).join('');
  }

  var mobileNavEl = el('mobileNav');
  if (mobileNavEl) {
    var mobileLinks = SITE.nav.map(function (item) {
      var active = currentPage === item.href ? ' active' : '';
      return '<a class="mobile-nav__link' + active + '" href="' + item.href + '">' + item.label + '</a>';
    }).join('');
    mobileLinks += '<a class="mobile-nav__link" style="font-size:1rem;opacity:.55" href="impressum.html">Impressum</a>';
    mobileLinks += '<a class="mobile-nav__link" style="font-size:1rem;opacity:.55" href="datenschutz.html">Datenschutz</a>';
    mobileLinks += '<a class="btn btn--primary" href="bestell.html" style="margin-top:24px;align-self:flex-start">Jetzt bestellen \u2192</a>';
    mobileNavEl.innerHTML = mobileLinks;
  }

  /* ── Firmenname & Slogan überall einsetzen ─────────────── */
  document.querySelectorAll('[data-site="name"]').forEach(function (e) {
    e.innerHTML = f.name;
  });
  document.querySelectorAll('[data-site="slogan"]').forEach(function (e) {
    e.textContent = '\u00bb' + f.slogan + '\u00ab';
  });
  document.querySelectorAll('[data-site="email"]').forEach(function (e) {
    e.innerHTML = '<a href="mailto:' + f.email + '">' + f.email + '</a>';
  });
  document.querySelectorAll('[data-site="adresse"]').forEach(function (e) {
    e.innerHTML = f.name + '<br>' + f.strasse + '<br>' + f.plz + ' ' + f.ort;
  });
  document.querySelectorAll('[data-site="gruendung"]').forEach(function (e) {
    e.textContent = f.gruendung;
  });
  document.querySelectorAll('[data-site="jahr"]').forEach(function (e) {
    e.textContent = new Date().getFullYear();
  });

  /* ── Footer rendern ────────────────────────────────────── */
  var footerNav = el('footerNav');
  if (footerNav) {
    footerNav.innerHTML = SITE.nav.map(function (item) {
      return '<li><a class="footer__link" href="' + item.href + '">' + item.label + '</a></li>';
    }).join('');
  }

  /* ── Burger-Menü ───────────────────────────────────────── */
  var burger = el('burgerBtn');
  var mobileNavDiv = el('mobileNav');
  if (burger && mobileNavDiv) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !mobileNavDiv.classList.contains('open');
      mobileNavDiv.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (mobileNavDiv.classList.contains('open') &&
          !mobileNavDiv.contains(e.target) && e.target !== burger) {
        mobileNavDiv.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── STARTSEITE ────────────────────────────────────────── */
  var h = SITE.home;

  set('heroEyebrow',   h.hero_eyebrow);
  set('heroTitel',     h.hero_titel);
  set('heroText',      h.hero_text);
  set('teaserEyebrow', h.teaser_eyebrow);
  set('teaserTitel',   h.teaser_titel);
  set('teaserText',    h.teaser_text);
  set('trustEyebrow',  h.trust_eyebrow);
  set('trustTitel',    h.trust_titel);
  set('trustText',     h.trust_text);
  set('ctaTitel',      h.cta_titel);
  set('ctaText',       h.cta_text);

  var trustListe = el('trustListe');
  if (trustListe && h.trust_liste) {
    trustListe.innerHTML = h.trust_liste.map(function (t) {
      return '<li>' + t + '</li>';
    }).join('');
  }

  /* Teaser-Grid */
  var teaserGrid = el('teaserGrid');
  if (teaserGrid) {
    teaserGrid.innerHTML = SITE.produkte.map(function (p) {
      return '<a class="teaser-card" href="honig.html">' +
        '<svg class="teaser-card__hex" viewBox="0 0 60 70" fill="none">' +
        '<polygon points="30,3 57,18 57,52 30,67 3,52 3,18" stroke="#F0A500" stroke-width="2.5" fill="rgba(240,165,0,0.12)"/></svg>' +
        '<div><div class="teaser-card__sub">' + p.untertitel + ' \u00b7 ' + p.gewicht + '</div>' +
        '<h3>' + p.name + '</h3>' +
        '<p style="font-size:.88rem;color:var(--muted);margin-top:8px;line-height:1.6">' + p.beschreibung + '</p>' +
        '<div style="margin-top:16px"><span class="teaser-card__price">' + eur(p.preis) + '</span></div>' +
        '</div></a>';
    }).join('');
  }

  /* ── HONIG-SEITE ───────────────────────────────────────── */
  var ho = SITE.honig;
  set('honigTitel',      ho.titel);
  set('honigUntertitel', ho.untertitel);
  set('hinweisTitel',    ho.hinweis_titel);
  set('hinweisText',     ho.hinweis_text);

  var productsGrid = el('productsGrid');
  if (productsGrid) {
    productsGrid.innerHTML = SITE.produkte.map(function (p) {
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
        '<p class="product-card__type">' + p.untertitel + ' \u00b7 ' + p.gewicht + '</p>' +
        '<h3 class="product-card__name">' + p.name + '</h3>' +
        '<p class="product-card__desc">' + p.beschreibung + '</p>' +
        '<div class="product-card__footer"><div>' +
        '<div class="product-card__price">' + eur(p.preis) + '</div>' +
        '<div class="product-card__weight">pro Glas \u00b7 ' + p.gewicht + '</div>' +
        '</div><a class="btn btn--primary" href="bestell.html">Bestellen \u2192</a>' +
        '</div></div></article>';
    }).join('');
  }

  /* ── ÜBER-UNS-SEITE ────────────────────────────────────── */
  var u = SITE.ueber;
  set('ueberEyebrow', u.eyebrow);
  set('ueberTitel',   u.titel);
  set('ueberLead',    u.lead);
  set('ueberText',    u.text);
  set('ueberZitat',   '\u00bb' + u.zitat + '\u00ab');
  set('gruendungSvg', f.gruendung);

  var ueberListe = el('ueberListe');
  if (ueberListe && u.liste) {
    ueberListe.innerHTML = u.liste.map(function (t) {
      return '<li>' + t + '</li>';
    }).join('');
  }

  /* ── BESTELLSEITE ──────────────────────────────────────── */
  var b = SITE.bestell;
  set('bestellTitel',      b.titel);
  set('bestellUntertitel', b.untertitel);

  /* E-Mail im Formular-Hinweis */
  var bestellEmail = el('bestellEmail');
  if (bestellEmail) bestellEmail.href = 'mailto:' + f.email;

  var calcItems = el('calcItems');
  if (calcItems) {
    var mengen = {};
    SITE.produkte.forEach(function (p) { mengen[p.id] = 0; });

    calcItems.innerHTML = SITE.produkte.map(function (p) {
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
      var inp = el('qty-' + id); if (inp) inp.value = mengen[id];
      var prod = SITE.produkte.filter(function (p) { return p.id === id; })[0];
      var sub = el('sub-' + id);
      if (sub && prod) sub.textContent = eur(mengen[id] * prod.preis);
      var total = SITE.produkte.reduce(function (s, p) { return s + mengen[p.id] * p.preis; }, 0);
      var tel = el('totalAmount'); if (tel) tel.textContent = eur(total);
      var box = el('orderSummary'); if (!box) return;
      var items = SITE.produkte.filter(function (p) { return mengen[p.id] > 0; });
      if (!items.length) {
        box.innerHTML = '<div class="order__summary-line empty">Noch nichts ausgew\u00e4hlt.</div>';
        return;
      }
      box.innerHTML = items.map(function (p) {
        return '<div class="order__summary-line"><span>' + mengen[p.id] + '\u00d7 ' + p.name +
          '</span><span>' + eur(mengen[p.id] * p.preis) + '</span></div>';
      }).join('') +
        '<div class="order__summary-line" style="font-weight:700;border-top:1px solid #F2EDD8;margin-top:4px;padding-top:6px">' +
        '<span>Gesamt</span><span>' + eur(total) + '</span></div>';
    }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-d]');
      if (!btn || !calcItems.contains(btn)) return;
      var id = btn.getAttribute('data-id');
      mengen[id] = Math.max(0, mengen[id] + parseInt(btn.getAttribute('data-d'), 10));
      refresh(id);
    });
    document.addEventListener('input', function (e) {
      var inp = e.target;
      if (!inp.id || inp.id.indexOf('qty-') !== 0) return;
      var id = inp.id.replace('qty-', '');
      var v = parseInt(inp.value, 10);
      mengen[id] = Math.max(0, Math.min(99, isNaN(v) ? 0 : v));
      refresh(id);
    });
    SITE.produkte.forEach(function (p) { refresh(p.id); });

    /* Formular */
    var form = el('orderForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var qty = SITE.produkte.reduce(function (s, p) { return s + mengen[p.id]; }, 0);
        if (qty < 1) { alert('Bitte mindestens ein Produkt ausw\u00e4hlen.'); return; }
        var pflicht = ['vorname','nachname','email','strasse','plz','ort','abwicklung'];
        var ok = true;
        pflicht.forEach(function (id) {
          var e2 = el(id);
          if (!e2 || !e2.value.trim()) { if (e2) e2.style.borderColor = '#C0392B'; ok = false; }
          else if (e2) e2.style.borderColor = '';
        });
        if (!ok) { alert('Bitte alle Pflichtfelder ausf\u00fcllen.'); return; }
        var g = function (id) { return el(id).value.trim(); };
        var total = SITE.produkte.reduce(function (s, p) { return s + mengen[p.id] * p.preis; }, 0);
        var lines = SITE.produkte.filter(function (p) { return mengen[p.id] > 0; })
          .map(function (p) { return mengen[p.id] + 'x ' + p.name + ' = ' + eur(mengen[p.id] * p.preis); }).join('\n');
        var body = encodeURIComponent(
          'Bestellung von ' + g('vorname') + ' ' + g('nachname') + '\n\nPRODUKTE:\n' + lines +
          '\nGesamt: ' + eur(total) + '\n\nE-Mail: ' + g('email') +
          (g('telefon') ? '\nTel: ' + g('telefon') : '') +
          '\n\nAdresse: ' + g('strasse') + ', ' + g('plz') + ' ' + g('ort') +
          '\nAbwicklung: ' + (g('abwicklung') === 'abholung' ? 'Abholung' : 'Lieferung anfragen') +
          (g('bemerkung') ? '\n\nBemerkung: ' + g('bemerkung') : '')
        );
        window.location.href = 'mailto:' + f.email +
          '?subject=Bestellung%20' + encodeURIComponent(f.name) + '&body=' + body;
        form.style.display = 'none';
        var msg = el('successMsg'); var nm = el('successName');
        if (msg) msg.style.display = 'block';
        if (nm) nm.textContent = g('vorname');
        window.scrollTo(0, 0);
      });
    }
  }

  /* ── IMPRESSUM ─────────────────────────────────────────── */
  var impAdresse = el('impAdresse');
  if (impAdresse) {
    impAdresse.innerHTML =
      'Familie ' + f.name + '<br>' +
      f.name + ' \u2013 ' + f.zusatz + '<br>' +
      f.strasse + '<br>' +
      f.plz + ' ' + f.ort;
  }
  var impEmail = el('impEmail');
  if (impEmail) {
    impEmail.href      = 'mailto:' + f.email;
    impEmail.textContent = f.email;
  }


  /* Datenschutz: Verantwortlicher */
  var dsgvoV = el('dsgvoVerantwortlicher');
  if (dsgvoV) dsgvoV.textContent = f.name + ' (' + f.zusatz + '), Kontaktdaten siehe Impressum.';

}); /* end DOMContentLoaded */
