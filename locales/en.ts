const en = {
  nav: {
    projects: "Projects",
    people:   "People",
    contact:  "Contact",
    meetings: "Meetings",
    about:    "About",
    language: "Language",
  },
  home: {
    description:
      "Weekly meetings to pursue research together in an open format. " +
      "Curiosity, Inquiry and Critical Thinking are forms of creative expression.\n\n" +
      "We focus on formal and data-driven research as there lies the expertise of the group, but other directions are welcome too. " +
      "Examples of projects range from urban and social modelling via AI architecture and security all the way to poking holes into existing research.",
  },
  about: {
    title: "About",
    body:
      "Curiosity, Inquiry and Critical Exploration are forms of Creative Expression. " +
      "Jopalesi is a platform to share, develop and realise these expressions. " +
      "We hold weekly meetings in R\u012b\u0123a and seek collaborations. " +
      "We believe in open data, open communication and open research.\n\n" +

      "Within the broader culture of citizen science we fall more towards the research end of the spectrum. " +
      "The choice of venue is not by chance a cultural space with a visual and performing arts programme. " +
      "The term research is often tied to a profession and an institution. " +
      "These ties have formed over the centuries and have in many cases provided a framework for researchers to conduct research. " +
      "The reverse can but may not always hold true, that being tied to a profession and an institution makes for great research. " +
      "We are agnostic on that question and seek ties to collaborators, whether of institutional type and/or professional type or neither. " +
      "We do however build our activities around the foundation of thought, curiosity and inquiry and thus share a similar intent with other more institutionalised groups.\n\n" +

      "When talking about forms of expression, research does not usually pop up at the very first moment. " +
      "It might not be the loudest of expressions, at least not by itself, but it does show all the facets of what one might associate to an expressive form of art: " +
      "the movement of thoughts, the path to an articulation, the command of tools of expression.\n\n" +

      "So see you around :)",
  },
  contact: {
    intro: "For enquiries, proposals, and correspondence.",
  },
  meetings: {
    intro:    "We meet on Tuesdays at 18:00 Latvian time at RAA.SPACE R\u012b\u0123a (Mat\u012bsa iela 8, opposite the fire brigade).",
    altVenue: "If not at RAA, an alternative place will be announced on the TG-Group.",
    cafe:     "There is a caf\u00e9 at the venue.",
    cta:      "Come along to the meetings \u2014 bring yourself, and if you like, a laptop.",
    langNote: "Meetings are held in Latvian and English when non-Latvian speakers are present.",
    entries: [
      {
        title:    "Introductory Meeting",
        date:     "10 March 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Introductory meeting. Short Presentation. Getting to know each other. Discussing Research Pursuits by the participants.",
      },
      {
        title:    "Weekly Meeting",
        date:     "17 March 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Short Presentation. Round of discussions about topics brought by participants.",
      },
      {
        title:    "Weekly Meeting",
        date:     "24 March 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Short Presentation. Round of discussions about topics brought by participants.",
      },
      {
        title:    "Weekly Meeting",
        date:     "31 March 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Short Presentation. Round of discussions about topics brought by participants.",
      },
    ],
  },
  projects: {
    blurb: "Examples of projects range from urban and social modelling via AI architecture and security all the way to poking holes into existing research.",
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

export default en;
export type Translations = typeof en;
