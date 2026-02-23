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
        title:    "Auftaktveranstaltung",
        date:     "10. M\u00e4rz 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Auftaktveranstaltung. Kurze Pr\u00e4sentation. Gegenseitiges Kennenlernen. Diskussion \u00fcber Forschungsinteressen der Teilnehmenden.",
      },
      {
        title:    "W\u00f6chentliches Treffen",
        date:     "17. M\u00e4rz 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Kurze Pr\u00e4sentation. Diskussionsrunde zu Themen, die von Teilnehmenden eingebracht werden.",
      },
      {
        title:    "W\u00f6chentliches Treffen",
        date:     "24. M\u00e4rz 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Kurze Pr\u00e4sentation. Diskussionsrunde zu Themen, die von Teilnehmenden eingebracht werden.",
      },
      {
        title:    "W\u00f6chentliches Treffen",
        date:     "31. M\u00e4rz 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Kurze Pr\u00e4sentation. Diskussionsrunde zu Themen, die von Teilnehmenden eingebracht werden.",
      },
    ],
  },
  projects: {
    blurb: "Beispielprojekte reichen von urbaner und sozialer Modellierung \u00fcber KI-Architektur und Sicherheit bis hin zur kritischen \u00dcberpr\u00fcfung bestehender Forschungsarbeiten.",
    entries: [
      {
        title: "Interurban pedestrial mobility: A European Comparison",
        body:
          "Pedestrial mobility within the urban infrastructure has been investigated in various contexts and has been linked to various measures of life-quality. " +
          "Here we study the complementary question of the ability to move from urbanisation to urbanisation unmotorised. " +
          "We employ satellite and national data to compare several mobility metrics in the European context.",
      },
      {
        title: "Scaling law transitions in a 1-dimensional SIS model.",
        body:  "A case study of the SIS-model on the periodic 1-dimensional chain. We study scaling laws as N\u2192\u221e.",
      },
    ],
  },
};

export default de;
