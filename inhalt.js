/* ============================================================
   INHALT.JS  –  Hier alle Texte, Kontaktdaten und Produkte pflegen.
   Keine andere Datei muss angefasst werden.
============================================================ */

var SITE = {

  /* ── Firmenname & Kontakt ─────────────────────────────── */
  firma: {
    name:      "Trinkaus \u0026 S\u00f6hne",
    zusatz:    "Imkerei",
    slogan:    "Natur im Glas.",
    strasse:   "Musterstra\u00dfe 1",          /* \u2190 HIER ANPASSEN */
    plz:       "12345",                         /* \u2190 HIER ANPASSEN */
    ort:       "Musterstadt",                   /* \u2190 HIER ANPASSEN */
    email:     "info@trinkaus-imkerei.de",      /* \u2190 HIER ANPASSEN */
    telefon:   "",                              /* optional */
    gruendung: "2018"
  },

  /* ── Navigation ───────────────────────────────────────── */
  nav: [
    { label: "Startseite",  href: "index.html"    },
    { label: "Honig",       href: "honig.html"    },
    { label: "\u00dcber uns", href: "ueber.html"  },
    { label: "Bestellung",  href: "bestell.html"  }
  ],

  /* ── Produkte ─────────────────────────────────────────── */
  produkte: [
    {
      id:           "fruehlingsblute",
      name:         "Fr\u00fchlingsbl\u00fcte",
      untertitel:   "Milder Bl\u00fctenhonig",
      gewicht:      "500\u202fg",
      preis:        7.50,
      beschreibung: "Bl\u00fctenzart und aromatisch \u2013 geerntet im ersten Aufbl\u00fchen des Jahres. Mild, floral, mit feiner S\u00fc\u00dfe. Perfekt zum Fr\u00fchst\u00fcck oder pur vom L\u00f6ffel.",
      badge:        "Bestseller",
      sommer:       false
    },
    {
      id:           "sommertracht",
      name:         "Sommertracht",
      untertitel:   "Kr\u00e4ftiger Trachthonig",
      gewicht:      "500\u202fg",
      preis:        7.50,
      beschreibung: "Kr\u00e4ftig und w\u00fcrzig \u2013 die volle Kraft der Sommerpflanzen im Glas. Intensiver Charakter, langanhaltend im Abgang. Ideal zu K\u00e4se oder dunklem Brot.",
      badge:        null,
      sommer:       true
    }
  ],

  /* ── Startseite ───────────────────────────────────────── */
  home: {
    hero_eyebrow:   "Familienimkerei \u00b7 Regional \u00b7 Handarbeit",
    hero_titel:     "Echter Honig.<br><em>Aus eigener Hand.</em>",
    hero_text:      "Eine Imkerei aus Leidenschaft. Kleiner Betrieb. Gro\u00dfer Anspruch. Jedes Glas handabgef\u00fcllt, unbehandelt, ehrlich.",
    teaser_eyebrow: "Aus unserer Imkerei",
    teaser_titel:   "Zwei Sorten. Ein Anspruch.",
    teaser_text:    "Vom ersten Fr\u00fchlingsbl\u00fcher bis zur vollen Sommertracht \u2013 jede Sorte erz\u00e4hlt, was die Bienen erlebt haben.",
    trust_eyebrow:  "Warum Trinkaus?",
    trust_titel:    "Kein Kompromiss<br>beim Honig.",
    trust_text:     "Wir schleudern, wenn der Honig bereit ist \u2013 nicht wenn der Kalender es vorschreibt.",
    trust_liste: [
      "Bienen auf eigener Wiese, keine Wanderimkerei",
      "Kaltgeschleudert \u2013 schonend, ohne W\u00e4rmeverlust",
      "Ohne Zus\u00e4tze, ohne Aufheizen, ohne Tricks",
      "Abgef\u00fcllt in wiederverwendbare Gl\u00e4ser",
      "Direkt vom Imker \u2013 kurze Wege, volle Transparenz"
    ],
    cta_titel: "Bereit f\u00fcr echten Honig?",
    cta_text:  "Direkt bei uns bestellen \u2013 Abholung oder Lieferung auf Anfrage."
  },

  /* ── Honig-Seite ──────────────────────────────────────── */
  honig: {
    titel:         "Unser Honig",
    untertitel:    "Jede Sorte ist ein Saisonportr\u00e4t. Was die Bienen sammeln, bestimmt das Ergebnis.",
    hinweis_titel: "Nat\u00fcrliche Kristallisation",
    hinweis_text:  "Echter Honig kristallisiert mit der Zeit \u2013 das ist ein Zeichen von Qualit\u00e4t. Im Wasserbad bei max.\u00a040\u202f\u00b0C l\u00e4sst er sich wieder verfl\u00fcssigen."
  },

  /* ── \u00dcber-uns-Seite ─────────────────────────────────────── */
  ueber: {
    eyebrow: "Die Imkerei",
    titel:   "Handwerk<br>mit Leidenschaft.",
    lead:    "Wir sind keine Imkermeister von Beruf \u2013 wir sind es aus \u00dcberzeugung.",
    text:    "Trinkaus \u0026 S\u00f6hne steht f\u00fcr das, was man heute selten findet: Honig, der so schmeckt, wie er soll. Unbehandelt. Ungefiltert. Ehrlich.",
    zitat:   "Unsere Bienen entscheiden, was geerntet wird. Wir sorgen daf\u00fcr, dass es so ins Glas kommt, wie sie es gemacht haben.",
    liste: [
      "Bienen auf eigenem Gel\u00e4nde \u2013 keine Wanderung",
      "Schleuderung nur bei optimaler Reife",
      "Kaltschleuderung: max.\u00a040\u202f\u00b0C, Enzyme bleiben erhalten",
      "Handabf\u00fcllung in Mehrwegg\u00e4ser",
      "Direktvertrieb \u2013 ohne Zwischenh\u00e4ndler"
    ]
  },

  /* ── Bestellseite ─────────────────────────────────────── */
  bestell: {
    titel:    "Direkt bestellen",
    untertitel: "W\u00e4hlen Sie Ihre Sorten und Mengen. Wir melden uns innerhalb von 48 Stunden.",
    erfolg:   "Vielen Dank! Wir melden uns innerhalb von 48 Stunden."
  }

};
