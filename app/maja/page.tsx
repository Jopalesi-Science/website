"use client";

import { useI18n } from "@/lib/i18n";

export default function MajaPage() {
  const { t } = useI18n();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div
        style={{
          border:    "2px solid #bdb2a3",
          maxWidth:  "32rem",
          padding:   "1.2rem 1.5rem",
          background: "#0a0a0c",
        }}
      >
        <p
          style={{
            fontSize:      "0.75rem",
            letterSpacing: "0.05em",
            lineHeight:    1.75,
            color:         "#bdb2a3",
            opacity:       0.65,
            margin:        0,
            whiteSpace:    "pre-line",
          }}
        >
          {t.home.description}
        </p>
      </div>
    </main>
  );
}
