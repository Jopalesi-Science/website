import type { Translations } from "./en";

const zh: Translations = {
  nav: {
    projects: "项目",
    people:   "人员",
    contact:  "联系",
    meetings: "会议",
    about:    "关于",
    language: "语言",
  },
  home: {
    description:
      "每周例会，以开放的形式共同开展研究。" +
      "好奇心、探究与批判性思考是创造性表达的方式。\n\n" +
      "我们专注于正式的、数据驱动的研究，这也是团队的专长所在，但其他方向同样欢迎。" +
      "项目范例涵盖城市与社会建模、人工智能架构与安全，乃至对现有研究的批判性审视。",
  },
  about: {
    title: "关于",
    body:
      "好奇心、探究与批判性探索是创造性表达的形式。" +
      "Jopalesi是一个分享、发展和实现这些表达的平台。" +
      "我们每周在里加举行会议，寻求合作。" +
      "我们相信开放数据、开放交流与开放研究。\n\n" +

      "在更广泛的公民科学文化中，我们更偏向于光谱中研究的一端。" +
      "场地的选择并非偶然——那是一个拥有视觉与表演艺术项目的文化空间。" +
      "「研究」一词常与职业和机构相关联。" +
      "这些关联在数百年间逐渐形成，许多情况下为研究者提供了开展工作的框架。" +
      "反之则未必总是成立——与职业和机构的绑定不一定能造就优秀的研究。" +
      "我们对这一问题持不可知论态度，寻求与合作者的联结，无论是机构类型、职业类型，抑或两者皆非。" +
      "然而，我们以思想、好奇心和探究为根基开展活动，由此与其他更具制度化色彩的群体共享相似的志向。\n\n" +

      "谈及表达形式时，研究通常不会在第一时间浮现脑海。" +
      "它或许不是最响亮的表达方式，至少单独而言如此，但它确实展现了人们可能与艺术表达形式相关联的一切面向：" +
      "思想的流动、走向表达的路径、对表达工具的掌握。\n\n" +

      "那么，期待与你相遇 :)",
  },
  contact: {
    intro: "如有咨询、提案或其他事宜，欢迎联系。",
  },
  meetings: {
    intro:    "我们每周二18:00（拉脱维亚时间）在里加RAA.SPACE（Matīsa iela 8，消防站对面）举行会议。",
    altVenue: "若会议不在RAA举行，将通过TG群公告备选场地。",
    cafe:     "场地内设有咖啡厅。",
    cta:      "欢迎参加会议——带上你自己，如果愿意，也可以带上笔记本电脑。",
    langNote: "会议以拉脱维亚语和英语进行，当有不讲拉脱维亚语的参与者出席时。",
    entries: [
      {
        title:    "介绍性会议",
        date:     "2026年3月10日",
        time:     "18:00 – 20:00",
        duration: "2h",
        body:     "介绍性会议。简短演示。相互认识。讨论参与者的研究方向。",
      },
      {
        title:    "每周例会",
        date:     "2026年3月17日",
        time:     "18:00 – 20:00",
        duration: "2h",
        body:     "简短演示。就参与者提出的议题进行讨论。",
      },
      {
        title:    "每周例会",
        date:     "2026年3月24日",
        time:     "18:00 – 20:00",
        duration: "2h",
        body:     "简短演示。就参与者提出的议题进行讨论。",
      },
      {
        title:    "每周例会",
        date:     "2026年3月31日",
        time:     "18:00 – 20:00",
        duration: "2h",
        body:     "简短演示。就参与者提出的议题进行讨论。",
      },
    ],
  },
  projects: {
    blurb: "项目范例涵盖城市与社会建模、人工智能架构与安全，乃至对现有研究的批判性审视。",
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

export default zh;
