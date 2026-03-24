"use client";

import Image        from "next/image";
import Link         from "next/link";
import PageTemplate from "@/components/PageTemplate";
import { TEXT_COLOR, BG_COLOR } from "@/lib/theme";

const prose: React.CSSProperties = {
  color:         TEXT_COLOR,
  fontSize:      "1rem",
  fontWeight:    700,
  letterSpacing: "0.04em",
  lineHeight:    1.75,
  margin:        0,
};

const section: React.CSSProperties = {
  display:       "flex",
  flexDirection: "column",
  gap:           "0.8rem",
  marginBottom:  "2.5rem",
};

const PARTICIPANTS = ["Romans", "Daniels", "Leo", "Sandis", "Anonymous"];

const TOPICS = [
  "Math basics: functions, integer numbers, and sets.",
  "Number theory problem (brought by Daniels): for which parameter tuples (a, b, c) is f\u209a,\u1D47,\u1D9C(x, y) = ax + by + cxy surjective? Explored the c = 0 case.",
  "Network theory: motivation, vocabulary — graphs G = (V, E), directed vs. undirected, weighted networks.",
  "Markov chains and stationary distributions.",
  "PageRank as an application of Markov chains to link graphs.",
  "Epidemic thresholds and compartmental epidemiological models (SIR).",
  "Discussions on assumptions and limitations of the Markov chain framework, and possible applications.",
];

function SectionLabel({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "0.2rem" }}>
      <span
        style={{
          background:    TEXT_COLOR,
          color:         BG_COLOR,
          fontSize:      "1.5rem",
          letterSpacing: "0.08em",
          fontWeight:    700,
          padding:       "0.1rem 0.5rem",
          flexShrink:    0,
        }}
      >
        {n}.
      </span>
      <span
        style={{
          background:    TEXT_COLOR,
          color:         BG_COLOR,
          fontSize:      "1.5rem",
          letterSpacing: "0.08em",
          fontWeight:    700,
          padding:       "0.1rem 0.6rem",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default function Meeting24032026() {
  return (
    <PageTemplate title="24 March 2026">

      {/* ── Back link ── */}
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/meetings"
          style={{
            color:          TEXT_COLOR,
            fontSize:       "1.4rem",
            fontWeight:     700,
            letterSpacing:  "0.08em",
            textDecoration: "none",
          }}
        >
          ← Meetings
        </Link>
      </div>

      {/* ── 1. Photo ── */}
      <div style={section}>
        <SectionLabel n={1}>Gathering</SectionLabel>
        <div style={{ width: "100%", maxWidth: "38rem" }}>
          <Image
            src="/meetings/24-03-2026/gathering.jpeg"
            alt="Gathering — 24 March 2026"
            width={760}
            height={507}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>
      </div>

      {/* ── 2. Slides ── */}
      <div style={section}>
        <SectionLabel n={2}>Slides</SectionLabel>
        <a
          href="/meetings/24-03-2026/main.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...prose,
            textDecoration:      "underline",
            textUnderlineOffset: "4px",
          }}
        >
          ↓ main.pdf
        </a>
      </div>

      {/* ── 3. Participants ── */}
      <div style={section}>
        <SectionLabel n={3}>Participants ({PARTICIPANTS.length})</SectionLabel>
        <p style={{ ...prose, margin: 0 }}>
          {PARTICIPANTS.join(", ")}
        </p>
      </div>

      {/* ── 4. About ── */}
      <div style={section}>
        <SectionLabel n={4}>About this meeting</SectionLabel>
        <ul
          style={{
            listStyle: "none",
            padding:   0,
            margin:    0,
            display:   "flex",
            flexDirection: "column",
            gap:       "0.7rem",
          }}
        >
          {TOPICS.map((topic, i) => (
            <li key={i} style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
              <span style={{ ...prose, opacity: 0.3, flexShrink: 0 }}>—</span>
              <p style={prose}>{topic}</p>
            </li>
          ))}
        </ul>
      </div>

    </PageTemplate>
  );
}
