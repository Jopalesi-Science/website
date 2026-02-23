import { TEXT_COLOR, BG_COLOR } from "@/lib/theme";

interface PageTemplateProps {
  title:     string;
  children?: React.ReactNode;
}

// Gap around the fixed panel (same effect as margin for a fixed element).
const GAP = "1rem";

export default function PageTemplate({ title, children }: PageTemplateProps) {
  return (
    <>
      {/* ── Scrollable content panel ── */}
      <main
        className="page-scroll page-template-bg"
        style={{
          position:  "fixed",
          top:       `calc(13vh + ${GAP})`,
          bottom:    `calc(16vh + ${GAP})`,
          left:      GAP,
          right:     `calc(1.2rem + ${GAP})`,
          overflowY: "auto",
          padding:   `0 0 2rem 2rem`,
        }}
      >
        <h1
          style={{
            fontSize:      "clamp(2rem, 5vw, 3.5rem)",
            fontWeight:    300,
            letterSpacing: "-0.02em",
            lineHeight:    1,
            marginBottom:  "2rem",
            color:         TEXT_COLOR,
          }}
        >
          {title}
        </h1>

        {children && (
          <div
            style={{
              fontSize:   "0.8rem",
              lineHeight: 1.8,
              color:      TEXT_COLOR,
            }}
            className="space-y-4"
          >
            {children}
          </div>
        )}
      </main>

      {/* ── Scroll-fade overlay: fades content into the background so users
           know more content is below. Fades in with the panel (same 2 s
           animation). Pointer-events none so clicks pass through. ── */}
      <div
        aria-hidden="true"
        className="page-template-fade"
        style={{
          position:      "fixed",
          bottom:        `calc(16vh + ${GAP})`,
          left:          GAP,
          right:         `calc(1.2rem + ${GAP})`,
          height:        "5rem",
          background:    `linear-gradient(to bottom, transparent, ${BG_COLOR})`,
          pointerEvents: "none",
          zIndex:        15,
        }}
      />
    </>
  );
}
