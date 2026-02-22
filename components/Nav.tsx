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
  // ≥ 768 px: single row, 5 nav + language
  desktop: {
    nav:  [{ x: 8, y: 5 }, { x: 20, y: 5 }, { x: 33, y: 5 }, { x: 47, y: 5 }, { x: 61, y: 5 }],
    lang: { x: 83, y: 5 },
  },
  // 480–767 px: row 1 — first 3 nav; row 2 — last 2 nav + language (rightmost)
  tablet: {
    nav:  [{ x: 13, y: 7 }, { x: 38, y: 7 }, { x: 63, y: 7 }, { x: 22, y: 14 }, { x: 47, y: 14 }],
    lang: { x: 78, y: 14 },
  },
  // < 480 px: 2 × 2 nav grid + 5th nav; language pinned top-right
  mobile: {
    nav:  [{ x: 22, y: 10 }, { x: 62, y: 10 }, { x: 22, y: 17 }, { x: 62, y: 17 }, { x: 22, y: 24 }],
    lang: { x: 85, y: 5 },
  },
};

function getLayout(w: number): Layout {
  if (w >= 768) return "desktop";
  if (w >= 480) return "tablet";
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
