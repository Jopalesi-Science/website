"use client";

import Image        from "next/image";
import { useEffect, useState } from "react";
import DraggableBox from "@/components/DraggableBox";
import { useI18n }  from "@/lib/i18n";
import { TEXT_COLOR, STICK_COLOR } from "@/lib/theme";

const MAPS_URL = "https://maps.app.goo.gl/WisatMx5pmXqDCxS6";

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
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const update = () => setNarrow(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Desktop: side-by-side, well below the title (13 vh + ~56 px ≈ 20 vh).
  // Mobile: stacked vertically, centred.
  const infoPos = narrow ? { x: 50, y: 32 } : { x: 30, y: 47 };
  const mapPos  = narrow ? { x: 50, y: 68 } : { x: 68, y: 47 };

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
      <DraggableBox key={`info-${narrow}`} initialX={infoPos.x} initialY={infoPos.y} width="min(22rem, calc(100vw - 4rem))">
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

      {/* ── Map — tap to open Google Maps ── */}
      <DraggableBox
        key={`map-${narrow}`}
        initialX={mapPos.x}
        initialY={mapPos.y}
        width="min(20rem, calc(100vw - 4rem))"
        onTap={() => window.open(MAPS_URL, "_blank", "noopener,noreferrer")}
      >
        <div style={{ position: "relative", cursor: "pointer" }}>
          <Image
            src="/map.jpg"
            alt="RAA.SPACE location — Matīsa iela 8, Rīga"
            width={900}
            height={600}
            style={{ display: "block", width: "100%", height: "auto" }}
            priority
          />
          <div
            style={{
              position:   "absolute",
              bottom:     0,
              left:       0,
              right:      0,
              padding:    "0.35rem 0.7rem",
              background: "rgba(10,10,12,0.65)",
              color:      STICK_COLOR,
              fontSize:   "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              pointerEvents: "none",
            }}
          >
            tap to open in maps ↗
          </div>
        </div>
      </DraggableBox>
    </>
  );
}
