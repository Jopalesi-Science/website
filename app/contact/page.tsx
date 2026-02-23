"use client";

import Image      from "next/image";
import DraggableBox from "@/components/DraggableBox";
import { useI18n }  from "@/lib/i18n";
import { TEXT_COLOR, STICK_COLOR } from "@/lib/theme";

const TG_URL = "https://t.me/+ePj5WYsIPyw2Mzk0";

const txt: React.CSSProperties = {
  color:          TEXT_COLOR,
  fontSize:       "0.78rem",
  letterSpacing:  "0.05em",
  lineHeight:     1.9,
  margin:         0,
  display:        "block",
  textDecoration: "none",
};

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <>
      {/* ── Page title (fixed, mirrors PageTemplate position) ── */}
      <div
        style={{
          position:      "fixed",
          top:           "13vh",
          left:          "2rem",
          color:         TEXT_COLOR,
          fontSize:      "clamp(2rem, 5vw, 3.5rem)",
          fontWeight:    300,
          letterSpacing: "-0.02em",
          lineHeight:    1,
          pointerEvents: "none",
          zIndex:        10,
        }}
      >
        {t.nav.contact}
      </div>

      {/* ── Contact info ── */}
      <DraggableBox initialX={28} initialY={45} width="min(22rem, calc(100vw - 4rem))">
        <div style={{ padding: "1.4rem 1.8rem", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
          <span style={{ ...txt, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Jopalesi Science
          </span>
          <span style={txt}>Matīsa iela 8, LV-1009, Latvija</span>
          <br/>
          <a href="mailto:info@jopalesi.science" style={txt}>
            Email: info [at] jopalesi.science ↗
          </a>
          <a href={TG_URL} target="_blank" rel="noopener noreferrer" style={{ ...txt, marginTop: "0.4rem" }}>
            TG: Jopalesi.Science.TG ↗
          </a>
        </div>
      </DraggableBox>

      {/* ── Map ── */}
      <DraggableBox initialX={67} initialY={52} width="min(36rem, calc(100vw - 4rem))">
        <Image
          src="/map.jpg"
          alt="RAA.SPACE location — Matīsa iela 8, Rīga"
          width={900}
          height={600}
          style={{ display: "block", width: "100%", height: "auto" }}
          priority
        />
      </DraggableBox>
    </>
  );
}
