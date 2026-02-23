"use client";

import { useEffect, useState } from "react";
import PageTemplate  from "@/components/PageTemplate";
import { useI18n }   from "@/lib/i18n";
import { TEXT_COLOR } from "@/lib/theme";

const prose: React.CSSProperties = {
  color:         TEXT_COLOR,
  fontSize:      "0.75rem",
  letterSpacing: "0.05em",
  lineHeight:    1.85,
  margin:        0,
};

export default function ProjectsPage() {
  const { t } = useI18n();
  const p = t.projects;
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const update = () => setNarrow(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <PageTemplate title={t.nav.projects}>
      <div style={{ display: "flex", flexDirection: narrow ? "column" : "row", gap: narrow ? "1.5rem" : "3rem", alignItems: "flex-start" }}>

        {/* ── Left / top: blurb ── */}
        <div style={{ flex: narrow ? "none" : "0 0 22rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={prose}>{p.blurb}</p>
        </div>

        {/* ── Right / below: project cards ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.6rem", minWidth: 0 }}>
          {p.entries.map((entry, i) => (
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
                  paddingBottom: "0.55rem",
                  marginBottom:  "0.55rem",
                  borderBottom:  "1.5px solid #0a0a0c",
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
                  margin:        0,
                  whiteSpace:    "pre-line",
                }}
              >
                {entry.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </PageTemplate>
  );
}
