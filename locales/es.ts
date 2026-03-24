import type { Translations } from "./en";

const es: Translations = {
  nav: {
    projects: "Proyectos",
    people:   "Personas",
    contact:  "Contacto",
    meetings: "Reuniones",
    about:    "Sobre",
    language: "Idioma",
  },
  home: {
    description:
      "Reuniones semanales para realizar investigaciones juntos en un formato abierto. " +
      "La curiosidad, la indagaci\u00f3n y el pensamiento cr\u00edtico son formas de expresi\u00f3n creativa.\n\n" +
      "Nos centramos en investigaciones formales y basadas en datos, donde reside la experiencia del grupo, aunque otras direcciones tambi\u00e9n son bienvenidas. " +
      "Los ejemplos de proyectos van desde la modelizaci\u00f3n urbana y social, pasando por la arquitectura de IA y la seguridad, hasta el an\u00e1lisis cr\u00edtico de investigaciones existentes.",
  },
  about: {
    title: "Sobre",
    body:
      "La curiosidad, la indagaci\u00f3n y la exploraci\u00f3n cr\u00edtica son formas de expresi\u00f3n creativa. " +
      "Jopalesi es una plataforma para compartir, desarrollar y realizar estas expresiones. " +
      "Celebramos reuniones semanales en R\u012b\u0123a y buscamos colaboraciones. " +
      "Creemos en los datos abiertos, la comunicaci\u00f3n abierta y la investigaci\u00f3n abierta.\n\n" +

      "Dentro de la cultura m\u00e1s amplia de la ciencia ciudadana, nos situamos m\u00e1s hacia el extremo de la investigaci\u00f3n del espectro. " +
      "La elecci\u00f3n del lugar no es casual: es un espacio cultural con un programa de artes visuales y esc\u00e9nicas. " +
      "El t\u00e9rmino \u00abolinvested investigaci\u00f3n\u00bb suele estar ligado a una profesi\u00f3n y a una instituci\u00f3n. " +
      "Estos v\u00ednculos se han forjado a lo largo de los siglos y, en muchos casos, han proporcionado un marco a los investigadores para llevar a cabo su trabajo. " +
      "Lo contrario puede, pero no siempre, ser cierto: que estar vinculado a una profesi\u00f3n e instituci\u00f3n produce una gran investigaci\u00f3n. " +
      "Somos agn\u00f3sticos en esa cuesti\u00f3n y buscamos v\u00ednculos con colaboradores, sean de tipo institucional y/o profesional o ninguno de los dos. " +
      "Sin embargo, basamos nuestras actividades en el pensamiento, la curiosidad y la indagaci\u00f3n como fundamento, compartiendo as\u00ed una intenci\u00f3n similar con otros grupos m\u00e1s institucionalizados.\n\n" +

      "Cuando hablamos de formas de expresi\u00f3n, la investigaci\u00f3n no suele aparecer en el primer momento. " +
      "Quiz\u00e1s no sea la m\u00e1s ruidosa de las expresiones, al menos no por s\u00ed sola, pero muestra todas las facetas de lo que se podr\u00eda asociar a una forma de expresi\u00f3n art\u00edstica: " +
      "el movimiento de los pensamientos, el camino hacia la articulaci\u00f3n, el dominio de las herramientas de expresi\u00f3n.\n\n" +

      "\u00a1As\u00ed que nos vemos por ah\u00ed! :)",
  },
  contact: {
    intro: "Para consultas, propuestas y correspondencia.",
  },
  meetings: {
    intro:    "Nos reunimos los martes a las 18:00 hora letona en RAA.SPACE R\u012b\u0123a (Mat\u012bsa iela 8, frente al cuartel de bomberos).",
    altVenue: "Si la reuni\u00f3n no es en RAA, el lugar alternativo se anunciar\u00e1 en el grupo de TG.",
    cafe:     "Hay una cafeter\u00eda en el lugar de encuentro.",
    cta:      "Ven a las reuniones \u2014 tr\u00e1ete a ti mismo/a y, si quieres, un port\u00e1til.",
    langNote: "Las reuniones se celebran en let\u00f3n e ingl\u00e9s cuando hay participantes que no hablan let\u00f3n.",
    entries: [
      {
        title:    "Reuni\u00f3n Semanal",
        date:     "17 de marzo de 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Presentaci\u00f3n breve. Ronda de debates sobre temas aportados por los participantes.",
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
        title:    "Reuni\u00f3n Semanal",
        date:     "24 de marzo de 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Presentaci\u00f3n sobre teor\u00eda de redes. Debate sobre un problema de teor\u00eda de n\u00fameros y fundamentos matem\u00e1ticos.",
        recap:     "/meetings/24-03-2026",
        thumbnail: "/meetings/24-03-2026/gathering.jpeg",
        bullets:   [
          "Fundamentos matem\u00e1ticos: funciones, n\u00fameros enteros, conjuntos.",
          "Teor\u00eda de n\u00fameros: sobreyectividad de f(x,y) = ax+by+cxy.",
          "Teor\u00eda de redes: motivaci\u00f3n, grafos y vocabulario.",
          "Cadenas de Markov, PageRank, umbrales epid\u00e9micos, modelos SIR.",
        ],
      },
      {
        title:    "Reuni\u00f3n Extraordinaria",
        date:     "27 de marzo de 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Conferencia de Daniels sobre el problema de Basilea, la soluci\u00f3n original de Euler y las conexiones con la funci\u00f3n Zeta de Riemann y la teor\u00eda de n\u00fameros.",
        recap:     "",
        thumbnail: "",
        bullets:   [
          "El problema de Basilea: \u2211 1/n\u00b2.",
          "Soluci\u00f3n de Euler: \u03c0\u00b2/6.",
          "La funci\u00f3n Zeta de Riemann \u03b6(s).",
          "Conexiones con la teor\u00eda de n\u00fameros primos.",
        ],
      },
      {
        title:    "Reuni\u00f3n Semanal",
        date:     "31 de marzo de 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Presentaci\u00f3n breve. Ronda de debates sobre temas aportados por los participantes.",

        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
      {
        title:    "Sin Reuniones",
        date:     "7 \u2013 21 de abril de 2026",
        time:     "\u2014",
        duration: "\u2014",
        body:     "No hay reuniones durante este per\u00edodo. Las reuniones regulares de los martes se reanudan el 28 de abril.",
        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
      {
        title:    "Reuni\u00f3n Semanal",
        date:     "28 de abril de 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Presentaci\u00f3n breve. Ronda de debates sobre temas aportados por los participantes.",
        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
      {
        title:    "Reuni\u00f3n Semanal",
        date:     "5 de mayo de 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Presentaci\u00f3n breve. Ronda de debates sobre temas aportados por los participantes.",
        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
      {
        title:    "Reuni\u00f3n Semanal",
        date:     "12 de mayo de 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Presentaci\u00f3n breve. Ronda de debates sobre temas aportados por los participantes.",
        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
      {
        title:    "Reuni\u00f3n Semanal",
        date:     "19 de mayo de 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Presentaci\u00f3n breve. Ronda de debates sobre temas aportados por los participantes.",
        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
      {
        title:    "Reuni\u00f3n Semanal",
        date:     "26 de mayo de 2026",
        time:     "18:00 \u2013 20:00",
        duration: "2h",
        body:     "Presentaci\u00f3n breve. Ronda de debates sobre temas aportados por los participantes.",
        recap:     "",
        thumbnail: "",
        bullets:   [],
      },
    ],
  },
  projects: {
    blurb: "Los ejemplos de proyectos van desde la modelizaci\u00f3n urbana y social, pasando por la arquitectura de IA y la seguridad, hasta el an\u00e1lisis cr\u00edtico de investigaciones existentes.",
    entries: [
      {
        title: "Ojos en la naturaleza: censo con cámaras trampa en terrenos privados",
        body:
          "Muchas especies están en declive, pero los datos sobre biodiversidad siguen siendo escasos \u2014 especialmente en terrenos privados, que constituyen una gran parte del hábitat natural en Europa y más allá. Las cámaras trampa ofrecen un medio no invasivo de observar la fauna, pero su uso ha estado históricamente limitado a instituciones de investigación y áreas protegidas.\n\n" +
          "En este proyecto instalamos cámaras de fauna en terrenos privados en cooperación con los propietarios, combinando hardware comercial con sistemas de visión por computadora para detectar y contar individuos de especies amenazadas. El objetivo es construir una red de monitoreo distribuida que complemente los censos oficiales y ponga todos los datos a disposición pública.\n\n" +
          "Más allá del simple conteo, nos interesa el uso del hábitat, los corredores de movimiento y las tendencias poblacionales a lo largo del tiempo, con métodos y datos completamente abiertos.",
      },
      {
        title: "Flujo sin equilibrio: transporte óptimo en espacios discretos",
        body:
          "El transporte óptimo clásico pregunta cómo mover masa de una distribución a otra al mínimo coste, bajo la restricción de que la masa total se conserva. Este marco ha encontrado amplia aplicación en matemáticas, economía y aprendizaje automático.\n\n" +
          "Sin embargo, la restricción de conservación de masa suele ser demasiado rígida: las fuentes y sumideros no tienen por qué estar equilibrados en la práctica, y en muchos fenómenos de interés \u2014 dinámica de poblaciones, dispersión ecológica, flujos económicos \u2014 la creación o destrucción de masa es parte de lo que se desea modelar. El transporte óptimo no equilibrado relaja este requisito, permitiendo que la masa se genere o absorba a un coste.\n\n" +
          "En este proyecto estudiamos el transporte óptimo no equilibrado en espacios discretos \u2014 grafos y espacios métricos finitos \u2014 donde la geometría es combinatoria en lugar de continua. Nos interesa tanto la estructura teórica de estos problemas como sus posibles aplicaciones a procesos de propagación, asignación de recursos y modelización ecológica.",
      },
      {
        title: "Quién sostiene los bordes: dinámicas de poder en sociedades en red",
        body:
          "La influencia y el poder en las sociedades humanas rara vez se distribuyen de forma equitativa. Las decisiones se propagan a través de redes sociales e institucionales, y la estructura de esas redes determina quién puede actuar, quién es escuchado y cuyos intereses prevalecen.\n\n" +
          "En este proyecto estudiamos las dinámicas de poder a través del prisma de la teoría de redes. Modelamos las sociedades como grafos en los que los nodos representan actores y las aristas codifican relaciones de influencia, flujo de recursos o intercambio de información. Apoyándonos en la teoría espectral de grafos, cadenas de Markov e ideas de la teoría de juegos, investigamos cómo propiedades estructurales \u2014 centralidad, agrupamiento, cuellos de botella \u2014 dan lugar a jerarquías y asimetrías de poder.\n\n" +
          "Nos interesa especialmente cómo las intervenciones en la estructura de la red \u2014 añadir o eliminar aristas, redistribuir recursos \u2014 alteran el equilibrio de poder, con implicaciones para el diseño institucional y la toma de decisiones colectiva.",
      },
      {
        title: "Comprender los cambios bruscos en sistemas mediante modelos simples",
        body:
          "Muchos sistemas en la naturaleza y en la sociedad pueden cambiar de forma súbita y drástica — por ejemplo, la propagación rápida de una enfermedad o un cambio repentino en el comportamiento colectivo. Los científicos describen estos cambios como transiciones de fase.\n\n" +
          "Estas transiciones suelen estudiarse en sistemas enormes e idealizados. En este proyecto investigamos, en cambio, cómo emergen dichos cambios en sistemas más pequeños y estructurados, que se asemejan más a las redes del mundo real.\n\n" +
          "Para explorar esto utilizamos modelos de juguete simplificados — entre ellos, modelos epidémicos en malla donde los individuos pueden pasar entre los estados susceptible e infectado. Al estudiar estos sistemas controlados, buscamos comprender mejor cómo surgen los cambios de comportamiento a gran escala a partir de interacciones locales simples.",
      },
      {
        title: "Caminar entre ciudades: un estudio europeo de movilidad",
        body:
          "La movilidad dentro de las ciudades — especialmente a pie — ha sido ampliamente estudiada y se ha demostrado que influye en la salud, la sostenibilidad y la calidad de vida en general (por ejemplo, trabajos recientes publicados en Nature Cities destacan cómo la infraestructura peatonal determina el bienestar urbano).\n\n" +
          "Sin embargo, se ha prestado mucha menos atención a una pregunta complementaria: ¿qué tan fácil es viajar entre ciudades sin utilizar transporte motorizado? ¿Estamos atrapados en la dependencia del vehículo? ¿Con qué frecuencia se realizan esos desplazamientos interurbanos no motorizados?\n\n" +
          "En este proyecto estudiamos la movilidad entre áreas urbanas en toda Europa. Mediante datos satelitales y bases de datos nacionales de movilidad, analizamos qué tan bien conectadas están las ciudades para peatones y otros viajeros no motorizados. Al comparar distintas regiones, buscamos comprender mejor cómo la infraestructura, la geografía y las políticas públicas determinan la accesibilidad interurbana.",
      },
    ],
  },
};

export default es;
