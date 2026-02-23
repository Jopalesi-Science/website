"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DraggableButton from "@/components/DraggableButton";
import LanguageButton  from "@/components/LanguageButton";
import { navRoutes }   from "@/lib/routes";
import { useI18n }     from "@/lib/i18n";
import type { Translations } from "@/locales";

type Layout = "desktop" | "tablet" | "mobile";

// Initial positions per layout — Language is always the rightmost element.
const INIT: Record<Layout, { nav: { x: number; y: number }[]; lang: { x: number; y: number } }> = {
  // ≥ 1000 px: single row, 4 nav left + language right
  desktop: {
    nav:  [{ x: 8, y: 4 }, { x: 24, y: 4 }, { x: 40, y: 4 }, { x: 56, y: 4 }],
    lang: { x: 90, y: 4 },
  },
  // 480–999 px: row 1 — first 3 nav; row 2 — 4th nav + language
  tablet: {
    nav:  [{ x: 13, y: 5 }, { x: 45, y: 5 }, { x: 77, y: 5 }, { x: 25, y: 12 }],
    lang: { x: 65, y: 12 },
  },
  // < 480 px: row 1 — nav[0] + language; row 2 — nav[1] + nav[2] + nav[3]
  // Only 1 nav beside language (two ~124 px nav + 152 px lang won't fit in 375 px)
  mobile: {
    nav:  [{ x: 19, y: 4 }, { x: 19, y: 10 }, { x: 52, y: 10 }, { x: 81, y: 10 }],
    lang: { x: 80, y: 4 },
  },
};

function getLayout(w: number): Layout {
  if (w >= 1000) return "desktop";
  if (w >= 480)  return "tablet";
  return "mobile";
}

export default function Nav() {
  const pathname = usePathname();
  const { t }    = useI18n();
  const [layout, setLayout] = useState<Layout>("desktop");

  useEffect(() => {
    function update() { setLayout(getLayout(window.innerWidth)); }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { nav: navPos, lang: langPos } = INIT[layout];

  return (
    <>
      {navRoutes.map((route, i) => (
        <DraggableButton
          key={`${route.path}-${layout}`}
          label={t.nav[route.label as keyof Translations["nav"]]}
          href={route.path}
          initialX={navPos[i].x}
          initialY={navPos[i].y}
          isActive={pathname === route.path}
        />
      ))}
      <LanguageButton
        key={`lang-${layout}`}
        initialX={langPos.x}
        initialY={langPos.y}
      />
    </>
  );
}
