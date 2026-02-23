"use client";

import PageTemplate  from "@/components/PageTemplate";
import { useI18n }   from "@/lib/i18n";
import { TEXT_COLOR } from "@/lib/theme";

const TG_URL = "https://t.me/+ePj5WYsIPyw2Mzk0";

const prose: React.CSSProperties = {
  color:         TEXT_COLOR,
  fontSize:      "0.75rem",
  letterSpacing: "0.05em",
  lineHeight:    1.85,
  margin:        0,
};

export default function MeetingsPage() {
  const { t } = useI18n();
  const m = t.meetings;

  return (
    <PageTemplate title={t.nav.meetings}>
      <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>

        {/* ── Left: description ── */}
        <div style={{ flex: "0 0 22rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={prose}>
            {m.intro.split("RAA.SPACE")[0]}
            <a
              href="https://raa.space"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: TEXT_COLOR, textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              RAA.SPACE
            </a>
            {m.intro.split("RAA.SPACE")[1]}
          </p>
          <p style={prose}>{m.cafe}</p>
          <p style={prose}>
            {m.altVenue}{" "}
            <a
              href={TG_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: TEXT_COLOR, textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Jopalesi.Science.TG ↗
            </a>
          </p>
          <p style={prose}>{m.cta}</p>
          <p style={prose}>{m.langNote}</p>
        </div>

        {/* ── Right: meeting cards — paddingRight keeps cards off the edge ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.6rem", minWidth: 0, paddingRight: "2.5rem" }}>
          {m.entries.map((entry, i) => (
            <div
              key={i}
              style={{
                background: TEXT_COLOR,
                padding:    "0.9rem 1.2rem 1rem",
              }}
            >
              {/* header row */}
              <div
                style={{
                  display:        "flex",
                  justifyContent: "space-between",
                  alignItems:     "baseline",
                  flexWrap:       "wrap",
                  gap:            "0.3rem",
                  paddingBottom:  "0.55rem",
                  marginBottom:   "0.55rem",
                  borderBottom:   "1.5px solid #0a0a0c",
                }}
              >
                <span
                  style={{
                    color:         "#0a0a0c",
                    fontSize:      "0.75rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight:    700,
                  }}
                >
                  {entry.title}
                </span>
                <span
                  style={{
                    color:         "#0a0a0c",
                    fontSize:      "0.68rem",
                    letterSpacing: "0.08em",
                    fontWeight:    600,
                    opacity:       0.6,
                    whiteSpace:    "nowrap",
                  }}
                >
                  {entry.date} · {entry.time}
                </span>
              </div>

              {/* body */}
              <p
                style={{
                  color:         "#0a0a0c",
                  fontSize:      "0.75rem",
                  letterSpacing: "0.04em",
                  lineHeight:    1.75,
                  fontWeight:    600,
                  opacity:       0.72,
                  margin:        "0 0 0.55rem",
                }}
              >
                {entry.body}
              </p>

              {/* location */}
              <p style={{ margin: 0, fontSize: "0.68rem", letterSpacing: "0.08em", color: "#0a0a0c", opacity: 0.5, fontWeight: 600 }}>
                @{" "}
                <a
                  href="https://raa.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#0a0a0c", textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  RAA.SPACE
                </a>
              </p>
            </div>
          ))}
        </div>

      </div>
    </PageTemplate>
  );
}
