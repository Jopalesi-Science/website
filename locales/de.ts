import type { Translations } from "./en";

const de: Translations = {
  nav: {
    projects: "Projekte",
    people:   "Personen",
    contact:  "Kontakt",
    meetings: "Treffen",
    about:    "\u00dcber uns",
    language: "Sprache",
  },
  home: {
    description:
      "W\u00f6chentliche Treffen, um gemeinsam in offenem Format zu forschen. " +
      "Neugierde, Hinterfragung und kritische Auseinandersetzung sind Formen kreativen Ausdrucks.\n\n" +
      "Wir fokussieren uns auf formale und datengetriebene Forschung, da dort die Expertise der Gruppe liegt \u2014 andere Richtungen sind jedoch ebenfalls willkommen. " +
      "Beispielprojekte reichen von urbaner und sozialer Modellierung \u00fcber KI-Architektur und Sicherheit bis hin zur kritischen \u00dcberpr\u00fcfung bestehender Forschungsarbeiten.",
  },
  about: {
    title: "\u00dcber uns",
    body:
      "Neugierde, Hinterfragung und kritische Auseinandersetzung sind Formen kreativen Ausdrucks. " +
      "Jopalesi ist eine Plattform, um diese Ausdrucksformen zu teilen, zu entwickeln und zu verwirklichen. " +
      "Wir treffen uns w\u00f6chentlich in R\u012b\u0123a und suchen Kooperationen. " +
      "Wir glauben an offene Daten, offene Kommunikation und offene Forschung.\n\n" +

      "Innerhalb des breiteren Spektrums der \"citizen Science\" Kultur befinden wir uns eher auf dem forschungsorientierten Fl\u00fcgel. " +
      "Die Wahl des Veranstaltungsortes ist kein Zufall \u2014 RAA.SPACE ist ein Kulturraum mit einem Programm f\u00fcr bildende und darstellende K\u00fcnste. " +
      "Der Begriff \u201EForschung\u201C ist oft an einen Beruf und eine Institution gebunden. " +
      "Diese Bindungen haben sich \u00fcber Jahrhunderte gebildet und vielen Forschenden einen Rahmen f\u00fcr ihre Arbeit gegeben. " +
      "Das Umgekehrte kann \u2014 muss aber nicht immer \u2014 zutreffen: dass die Zugeh\u00f6rigkeit zu einem Beruf und einer Institution gute Forschung macht. " +
      "Wir sind in dieser Frage agnostisch und suchen Verbindungen zu Mitarbeitenden \u2014 institutioneller und/oder professioneller Art oder auch nicht. " +
      "Wir bauen unsere Aktivit\u00e4ten jedoch auf dem Fundament von Neugierde, Hinterfragung und kritischer Auseinandersetzung auf und teilen damit ein \u00e4hnliches Anliegen mit anderen, st\u00e4rker institutionalisierten Gruppen.\n\n" +

      "Wenn man \u00fcber Ausdrucksformen spricht, kommt vielen Forschung nicht sofort als erstes in den Sinn. " +
      "Es ist vielleicht nicht die lauteste Form des Ausdrucks, zumindest nicht f\u00fcr sich allein, aber sie zeigt alle Facetten dessen, was man mit einer expressiven Kunstform verbinden k\u00f6nnte: " +
      "die Bewegung von Gedanken, den Weg zur Artikulation, die Beherrschung von Ausdrucksmitteln.\n\n" +

      "Also bis bald :)",
  },
  contact: {
    intro: "F\u00fcr Anfragen, Vorschl\u00e4ge und Korrespondenz.",
  },
  meetings: {
    intro:    "Wir treffen uns dienstags um 18:00 Uhr lettischer Zeit im RAA.SPACE R\u012b\u0123a (Mat\u012bsa iela 8, gegen\u00fcber der Feuerwache).",
    altVenue: "Falls das Treffen nicht im RAA stattfindet, wird ein alternativer Ort in der TG-Gruppe bekanntgegeben.",
    cafe:     "Am Veranstaltungsort gibt es ein Caf\u00e9.",
    cta:      "Komm zu den Treffen \u2014 bring dich selbst mit, und wenn du m\u00f6chtest, auch einen Laptop.",
    langNote: "Die Treffen finden auf Lettisch und Englisch statt, wenn Nicht-Lettischsprechende anwesend sind.",
    entries: [
      {
        title:    "W\u00f6chentliches Treffen",
        date:     "17. M\u00e4rz 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Kurze Pr\u00e4sentation. Diskussionsrunde zu Themen, die von Teilnehmenden eingebracht werden.",
        recap:     "/meetings/17-03-2026",
        thumbnail: "/meetings/17-03-2026/gathering.jpg",
        bullets:   [
          "Introductions.",
          "Cameras in the wild + Raspberry Pi.",
          "Galaxy collisions & space live-cams.",
          "Ramanujan.",
        ],
      },
      {
        title:    "W\u00f6chentliches Treffen",
        date:     "24. M\u00e4rz 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Pr\u00e4sentation zur Netzwerktheorie. Diskussion eines zahlentheoretischen Problems und mathematischer Grundlagen.",
        recap:     "/meetings/24-03-2026",
        thumbnail: "/meetings/24-03-2026/gathering.jpeg",
        bullets:   [
          "Mathematische Grundlagen: Funktionen, ganze Zahlen, Mengen.",
          "Zahlentheorie: Surjektivit\u00e4t von f(x,y) = ax+by+cxy.",
          "Netzwerktheorie: Motivation, Graphen und Fachbegriffe.",
          "Markov-Ketten, PageRank, Epidemieschwellen, SIR-Modelle.",
        ],
      },
      {
        title:    "Au\u00dferordentliches Treffen",
        date:     "27. M\u00e4rz 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Vortrag von Daniels \u00fcber das Basler Problem, Eulers urspr\u00fcngliche L\u00f6sung und Verbindungen zur Riemannschen Zeta-Funktion und Zahlentheorie.",
        recap:     "",
        thumbnail: "",
        bullets:   [
          "Das Basler Problem: \u2211 1/n\u00b2.",
          "Eulers L\u00f6sung: \u03c0\u00b2/6.",
          "Die Riemannsche Zeta-Funktion \u03b6(s).",
          "Verbindungen zur Primzahltheorie.",
        ],
      },
      {
        title:    "W\u00f6chentliches Treffen",
        date:     "31. M\u00e4rz 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Kurze Pr\u00e4sentation. Diskussionsrunde zu Themen, die von Teilnehmenden eingebracht werden.",

        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
      {
        title:    "Keine Treffen",
        date:     "7. \u2013 21. April 2026",
        time:     "\u2014",
        duration: "\u2014",
        body:     "In diesem Zeitraum finden keine Treffen statt. Regelm\u00e4\u00dfige Dienstagstreffen werden am 28. April fortgesetzt.",
        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
      {
        title:    "W\u00f6chentliches Treffen",
        date:     "28. April 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Kurze Pr\u00e4sentation. Diskussionsrunde zu Themen, die von Teilnehmenden eingebracht werden.",
        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
      {
        title:    "W\u00f6chentliches Treffen",
        date:     "5. Mai 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Kurze Pr\u00e4sentation. Diskussionsrunde zu Themen, die von Teilnehmenden eingebracht werden.",
        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
      {
        title:    "W\u00f6chentliches Treffen",
        date:     "12. Mai 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Kurze Pr\u00e4sentation. Diskussionsrunde zu Themen, die von Teilnehmenden eingebracht werden.",
        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
      {
        title:    "W\u00f6chentliches Treffen",
        date:     "19. Mai 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Kurze Pr\u00e4sentation. Diskussionsrunde zu Themen, die von Teilnehmenden eingebracht werden.",
        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
      {
        title:    "W\u00f6chentliches Treffen",
        date:     "26. Mai 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Kurze Pr\u00e4sentation. Diskussionsrunde zu Themen, die von Teilnehmenden eingebracht werden.",
        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
    ],
  },
  projects: {
    blurb: "Beispielprojekte reichen von urbaner und sozialer Modellierung \u00fcber KI-Architektur und Sicherheit bis hin zur kritischen \u00dcberpr\u00fcfung bestehender Forschungsarbeiten.",
    entries: [
      {
        title: "Augen in der Wildnis: Wildkamera-Zählung auf Privatgelände",
        body:
          "Viele Arten sind im Rückgang begriffen, doch Biodiversitätsdaten bleiben lückenhaft \u2014 besonders auf Privatgelände, das in Europa und anderswo einen großen Anteil natürlicher Lebensräume ausmacht. Wildkameras bieten eine nicht-invasive Möglichkeit zur Tierbeobachtung, wurden aber bisher vor allem in Forschungseinrichtungen und Schutzgebieten eingesetzt.\n\n" +
          "In diesem Projekt installieren wir Wildkameras auf Privatgelände in Zusammenarbeit mit Grundeigentümern und kombinieren handelsübliche Hardware mit Computer-Vision-Pipelines, um Individuen gefährdeter Arten zu erkennen und zu zählen. Ziel ist der Aufbau eines verteilten Überwachungsnetzwerks, das amtliche Erhebungen ergänzt und alle Daten offen zugänglich macht.\n\n" +
          "Neben reinen Zähldaten interessieren uns Habitatnutzung, Wanderkorridore und Populationstrends über die Zeit \u2014 mit vollständig offenen Methoden und Daten.",
      },
      {
        title: "Fluss ohne Gleichgewicht: Optimaler Transport auf diskreten Räumen",
        body:
          "Der klassische optimale Transport fragt, wie Masse zu minimalen Kosten von einer Verteilung in eine andere überführt werden kann, unter der Bedingung, dass die Gesamtmasse erhalten bleibt. Das Konzept findet breite Anwendung in Mathematik, Wirtschaft und maschinellem Lernen.\n\n" +
          "Die Massenerhaltungsbedingung ist jedoch oft zu restriktiv: Quellen und Senken müssen in der Praxis nicht ausgeglichen sein, und bei vielen interessanten Phänomenen \u2014 Populationsdynamik, ökologische Ausbreitung, Wirtschaftsströme \u2014 ist die Erzeugung oder Vernichtung von Masse Teil dessen, was man modellieren möchte. Der unbalancierte optimale Transport lockert diese Anforderung und erlaubt, dass Masse gegen einen Kostenfaktor erzeugt oder absorbiert wird.\n\n" +
          "In diesem Projekt untersuchen wir unbalancierten optimalen Transport auf diskreten Räumen \u2014 Graphen und endlichen metrischen Räumen \u2014 wo die Geometrie kombinatorisch statt stetig ist. Wir interessieren uns sowohl für die theoretische Struktur solcher Probleme als auch für mögliche Anwendungen auf Ausbreitungsprozesse, Ressourcenzuteilung und ökologische Modellierung.",
      },
      {
        title: "Wer hält die Ränder: Machtdynamiken in vernetzten Gesellschaften",
        body:
          "Einfluss und Macht in menschlichen Gesellschaften sind selten gleichmäßig verteilt. Entscheidungen propagieren durch soziale und institutionelle Netzwerke, und die Struktur dieser Netzwerke bestimmt, wer handeln kann, wer gehört wird und wessen Interessen sich durchsetzen.\n\n" +
          "In diesem Projekt untersuchen wir Machtdynamiken durch die Linse der Netzwerktheorie. Wir modellieren Gesellschaften als Graphen, in denen Knoten Akteure und Kanten Beziehungen des Einflusses, des Ressourcenflusses oder des Informationsaustauschs kodieren. Anhand von spektraler Graphentheorie, Markow-Ketten und spieltheoretischen Konzepten untersuchen wir, wie strukturelle Eigenschaften \u2014 Zentralität, Clustering, Engpässe \u2014 Hierarchien und Machtasymmetrien erzeugen.\n\n" +
          "Besonders interessiert uns, wie Eingriffe in die Netzwerkstruktur \u2014 das Hinzufügen oder Entfernen von Kanten, die Umverteilung von Ressourcen \u2014 das Machtgefüge verändern, mit Implikationen für institutionelles Design und kollektive Entscheidungsfindung.",
      },
      {
        title: "Plötzliche Systemveränderungen mit einfachen Modellen verstehen",
        body:
          "Viele Systeme in Natur und Gesellschaft können sich plötzlich und dramatisch verändern — etwa die rasche Ausbreitung einer Krankheit oder ein abrupter Wandel im kollektiven Verhalten. Wissenschaftler beschreiben solche Umschläge als Phasenübergänge.\n\n" +
          "Diese Übergänge werden meist in sehr großen, idealisierten Systemen untersucht. In diesem Projekt erforschen wir stattdessen, wie solche Veränderungen in kleineren, strukturierten Systemen entstehen, die realen Netzwerken ähnlicher sind.\n\n" +
          "Dazu verwenden wir vereinfachte Spielzeugmodelle — darunter gitterbasierte Epidemiemodelle, in denen Individuen zwischen dem empfänglichen und dem infizierten Zustand wechseln können. Indem wir diese kontrollierten Systeme studieren, möchten wir besser verstehen, wie großskalige Verhaltensveränderungen aus einfachen lokalen Wechselwirkungen entstehen.",
      },
      {
        title: "Zu Fuß zwischen Städten: Eine europäische Mobilitätsstudie",
        body:
          "Mobilität innerhalb von Städten — insbesondere zu Fuß — wurde in verschiedenen Kontexten eingehend untersucht und mit Gesundheit, Nachhaltigkeit und Lebensqualität in Verbindung gebracht (so zeigen etwa aktuelle Arbeiten in Nature Cities, wie Fußgängerinfrastruktur das städtische Wohlbefinden beeinflusst).\n\n" +
          "Weitaus weniger Aufmerksamkeit wurde bisher einer komplementären Frage gewidmet: Wie einfach ist es, ohne motorisierten Transport zwischen Städten zu reisen? Sind wir auf das Auto angewiesen? Wie häufig sind solche nicht-motorisierten Fahrten zwischen Städten überhaupt?\n\n" +
          "In diesem Projekt untersuchen wir die Mobilität zwischen Städten in ganz Europa. Mithilfe von Satellitendaten und nationalen Mobilitätsdatenbanken analysieren wir, wie gut Städte für Fußgänger und andere nicht-motorisierte Reisende miteinander verbunden sind. Durch den Vergleich verschiedener Regionen möchten wir besser verstehen, wie Infrastruktur, Geographie und Politik die Erreichbarkeit zwischen Städten prägen.",
      },
    ],
  },
};

export default de;
