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

const PARTICIPANTS = ["Daniels", "Romans", "Ārands", "Jana", "Leo"];

const TOPICS = [
  "Introduced ourselves — first meeting of the group.",
  "Met at the Mātes Nātres café inside RAA Space, Matīsa iela 8, Rīga.",
  "Discussed installing cameras in the wild with Raspberry Pi: on-site processing, remote transmission, and camera control.",
  "Discussed collisions of galaxies and space live-cams.",
  "Briefly talked about Ramanujan.",
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

export default function Meeting17032026() {
  return (
    <PageTemplate title="17 March 2026">

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
            src="/meetings/17-03-2026/gathering.jpg"
            alt="Gathering — 17 March 2026"
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
          href="/meetings/17-03-2026/recreational-research-meeting.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...prose,
            textDecoration:      "underline",
            textUnderlineOffset: "4px",
          }}
        >
          ↓ recreational-research-meeting.pdf
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
