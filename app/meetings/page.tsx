"use client";

import { useEffect, useRef, useState } from "react";
import Image         from "next/image";
import Link          from "next/link";
import PageTemplate  from "@/components/PageTemplate";
import { useI18n }   from "@/lib/i18n";
import { TEXT_COLOR, ACTIVE_COLOR } from "@/lib/theme";
import { MEETING_DATES } from "@/locales/en";

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
  const [narrow, setNarrow] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let idx = 0;
    for (let i = 0; i < MEETING_DATES.length; i++) {
      if (new Date(MEETING_DATES[i]) < today) idx = i;
      else break;
    }
    requestAnimationFrame(() => {
      cardRefs.current[idx]?.scrollIntoView({ block: "start", behavior: "instant" });
    });
  }, []);

  useEffect(() => {
    const update = () => setNarrow(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <PageTemplate title={t.nav.meetings}>
      <div style={{ display: "flex", flexDirection: narrow ? "column" : "row", gap: narrow ? "1.5rem" : "3rem", alignItems: "flex-start" }}>

        {/* ── Left / top: description ── */}
        <div style={{ flex: narrow ? "none" : "0 0 22rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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

        {/* ── Right / below: meeting cards ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.6rem", minWidth: 0, overflowY: "auto", maxHeight: "calc(71vh - 10rem)", paddingRight: "0.5rem" }}>
          {m.entries.map((entry, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el; }}
              style={{
                background: TEXT_COLOR,
                padding:    "0.9rem 1.2rem 1rem",
              }}
            >
              {/* ── header row ── */}
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
                {entry.recap ? (
                  <Link
                    href={entry.recap}
                    style={{
                      color:          "#0a0a0c",
                      fontSize:       "0.75rem",
                      letterSpacing:  "0.18em",
                      textTransform:  "uppercase",
                      fontWeight:     700,
                      textDecoration: "none",
                    }}
                  >
                    {entry.title}
                  </Link>
                ) : (
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
                )}
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

              {/* ── body row: text + thumbnail ── */}
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "0.7rem" }}>

                {/* text side */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      color:         "#0a0a0c",
                      fontSize:      "0.75rem",
                      letterSpacing: "0.04em",
                      lineHeight:    1.75,
                      fontWeight:    600,
                      opacity:       0.72,
                      margin:        "0 0 0.5rem",
                    }}
                  >
                    {entry.body}
                  </p>

                  {entry.bullets.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      {entry.bullets.map((b, j) => (
                        <li key={j} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                          <span style={{ color: "#0a0a0c", fontSize: "0.68rem", opacity: 0.4, flexShrink: 0, lineHeight: 1.75 }}>—</span>
                          <span style={{ color: "#0a0a0c", fontSize: "0.68rem", letterSpacing: "0.04em", lineHeight: 1.75, fontWeight: 600, opacity: 0.65 }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* thumbnail */}
                {entry.thumbnail && (
                  <div style={{ flexShrink: 0, width: "7rem" }}>
                    <Image
                      src={entry.thumbnail}
                      alt={entry.date}
                      width={200}
                      height={133}
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                )}
              </div>

              {/* ── footer row ── */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.4rem" }}>
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
                {entry.recap && (
                  <Link
                    href={entry.recap}
                    style={{
                      border:        `2px solid ${ACTIVE_COLOR}`,
                      color:         "#0a0a0c",
                      fontSize:      "0.72rem",
                      letterSpacing: "0.14em",
                      fontWeight:    700,
                      textTransform: "uppercase",
                      textDecoration:"none",
                      padding:       "0.2rem 0.7rem",
                    }}
                  >
                    Recap ↗
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </PageTemplate>
  );
}
