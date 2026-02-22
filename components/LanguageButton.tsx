"use client";

import { useEffect, useRef, useState } from "react";
import { STICK_COLOR, HOVER_COLOR, BG_COLOR } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";

const DRAG_THRESHOLD = 6;

// Language option labels — always shown in the language's own name.
// This list is independent of the translation system.
const LANGUAGES = [
  { code: "en", nativeName: "English"   },
  { code: "lv", nativeName: "Latviski"  },
  { code: "es", nativeName: "Español"   },
  { code: "de", nativeName: "Deutsch"   },
  { code: "zh", nativeName: "中文"       },
  { code: "ru", nativeName: "Русский"   },
  { code: "ar", nativeName: "العربية"   },
  { code: "ka", nativeName: "ქართული"   },
  { code: "hy", nativeName: "Հայerene"  },
];

// Build dropdown list: all languages except the current one, with regionCode
// surfaced near the top once IP detection is implemented.
function buildDropdownList(currentCode: string, regionCode: string | null) {
  const order = ["en", "lv"];
  if (regionCode && !order.includes(regionCode)) order.splice(1, 0, regionCode);
  for (const { code } of LANGUAGES) {
    if (!order.includes(code)) order.push(code);
  }
  return order
    .filter((c) => c !== currentCode)
    .map((c) => LANGUAGES.find((l) => l.code === c)!)
    .filter(Boolean);
}

function GlobeIcon({ color }: { color: string }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none"
      style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px", flexShrink: 0 }}
    >
      <circle  cx="6" cy="6" r="5"           stroke={color} strokeWidth="1.2" />
      <ellipse cx="6" cy="6" rx="2.2" ry="5" stroke={color} strokeWidth="1.2" />
      <line x1="1" y1="6" x2="11" y2="6"     stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

interface Props {
  initialX: number;
  initialY: number;
}

export default function LanguageButton({ initialX, initialY }: Props) {
  const { lang, setLang, t }        = useI18n();
  const [pos, setPos]               = useState({ x: initialX, y: initialY });
  const [isOpen, setIsOpen]         = useState(false);
  const [regionCode, setRegionCode] = useState<string | null>(null);
  const [hovered, setHovered]       = useState(false);
  const [hoveredOpt, setHoveredOpt] = useState<string | null>(null);

  const posRef   = useRef({ x: initialX, y: initialY });
  const dragging = useRef(false);
  const didDrag  = useRef(false);
  const origin   = useRef({ mx: 0, my: 0, bx: initialX, by: initialY });

  // Stub: future IP-based region detection
  useEffect(() => {
    // TODO: fetch user region via IP, then call setRegionCode(langCode)
  }, []);

  function move(x: number, y: number) {
    const nx = Math.max(0, Math.min(100, x));
    const ny = Math.max(0, Math.min(100, y));
    posRef.current = { x: nx, y: ny };
    setPos({ x: nx, y: ny });
  }

  function startDrag(clientX: number, clientY: number) {
    dragging.current = true;
    didDrag.current  = false;
    origin.current   = {
      mx: clientX, my: clientY,
      bx: posRef.current.x, by: posRef.current.y,
    };
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - origin.current.mx;
      const dy = e.clientY - origin.current.my;
      if (Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        didDrag.current = true;
        document.body.style.cursor = "grabbing";
      }
      if (didDrag.current) {
        move(
          origin.current.bx + (dx / window.innerWidth)  * 100,
          origin.current.by + (dy / window.innerHeight) * 100
        );
      }
    };

    const onMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = "";
      if (!didDrag.current) setIsOpen((prev) => !prev);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      const t  = e.touches[0];
      const dx = t.clientX - origin.current.mx;
      const dy = t.clientY - origin.current.my;
      if (Math.hypot(dx, dy) > DRAG_THRESHOLD) didDrag.current = true;
      if (didDrag.current) {
        move(
          origin.current.bx + (dx / window.innerWidth)  * 100,
          origin.current.by + (dy / window.innerHeight) * 100
        );
      }
    };

    const onTouchEnd = () => {
      if (!dragging.current) return;
      dragging.current = false;
      if (!didDrag.current) setIsOpen((prev) => !prev);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend",  onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend",  onTouchEnd);
    };
  }, []);

  function handleSelect(code: string) {
    setLang(code);
    setIsOpen(false);
  }

  const buttonColor  = hovered ? HOVER_COLOR : STICK_COLOR;
  const options      = buildDropdownList(lang, regionCode);
  const dropdownMaxH = `${options.length * 34 + 8}px`;

  return (
    <div
      className="fixed z-30 select-none"
      style={{
        left:      `${pos.x}%`,
        top:       `${pos.y}%`,
        transform: "translate(-50%, -50%)",
        cursor:    "grab",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX, e.clientY); }}
      // e.preventDefault() stops mobile browsers generating a synthetic mousedown
      // after touchend, which would otherwise toggle the dropdown twice.
      onTouchStart={(e) => { e.preventDefault(); startDrag(e.touches[0].clientX, e.touches[0].clientY); }}
    >
      <div style={{ display: "inline-block", position: "relative" }}>

        {/* ── Main button — fixed width so label changes don't resize it ── */}
        <div
          style={{
            borderWidth:  "4px",
            borderStyle:  "solid",
            borderColor:  buttonColor,
            background:   BG_COLOR,
            padding:      "6px 16px",
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
            width:        "9.5rem",
            boxSizing:    "border-box",
            transition:   "border-color 0.4s ease",
            whiteSpace:   "nowrap",
          }}
        >
          <GlobeIcon color={buttonColor} />
          <span
            style={{
              color:         buttonColor,
              fontSize:      "0.7rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              transition:    "color 0.4s ease",
            }}
          >
            {t.nav.language}
          </span>
        </div>

        {/* ── Dropdown — absolutely positioned, doesn't affect button height ── */}
        <div
          style={{
            position:      "absolute",
            top:           "100%",
            left:          0,
            width:         "9.5rem",
            overflow:      "hidden",
            maxHeight:     isOpen ? dropdownMaxH : "0px",
            pointerEvents: isOpen ? "auto" : "none",
            transition:    "max-height 0.35s ease",
          }}
        >
          {options.map((lang, i) => {
            const oc = hoveredOpt === lang.code ? HOVER_COLOR : STICK_COLOR;
            return (
              <div
                key={lang.code}
                style={{
                  borderLeftWidth:   "4px",
                  borderRightWidth:  "4px",
                  borderBottomWidth: "4px",
                  borderTopWidth:    "0px",
                  borderStyle:       "solid",
                  borderColor:       oc,
                  background:        BG_COLOR,
                  padding:           "5px 16px",
                  display:           "flex",
                  alignItems:        "center",
                  cursor:            "pointer",
                  whiteSpace:        "nowrap",
                  boxSizing:         "border-box",
                  opacity:           isOpen ? 1 : 0,
                  transform:         isOpen ? "translateY(0)" : "translateY(-5px)",
                  transition:        isOpen
                    ? `opacity 0.2s ease ${i * 0.035}s, transform 0.2s ease ${i * 0.035}s, border-color 0.25s ease`
                    : "opacity 0.12s ease, transform 0.12s ease, border-color 0.25s ease",
                }}
                onMouseEnter={() => setHoveredOpt(lang.code)}
                onMouseLeave={() => setHoveredOpt(null)}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => handleSelect(lang.code)}
              >
                <span
                  style={{
                    color:         oc,
                    fontSize:      "0.65rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    transition:    "color 0.25s ease",
                  }}
                >
                  {lang.nativeName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
