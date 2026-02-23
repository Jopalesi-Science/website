"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { STICK_COLOR, BG_COLOR } from "@/lib/theme";

const DRAG_THRESHOLD = 6;
const BOTTOM_CENTER  = { x: 50, y: 92 };
const CENTER         = { x: 50, y: 35 };
const LETTERS = "JOPALESI".split("");

export default function CursorBox() {
  const router   = useRouter();
  const pathname = usePathname();

  // Only the root landing page keeps the box centred and non-navigable.
  // /maja and every other route are treated as normal sub-pages.
  const isLanding = pathname === "/";

  // Always-current ref so event handlers never read a stale closure value.
  const isLandingRef = useRef(isLanding);
  isLandingRef.current = isLanding;

  const [pos, setPos]             = useState(CENTER);
  const [isDragging, setDragging] = useState(false);

  const elRef       = useRef<HTMLDivElement>(null);
  const posRef      = useRef(CENTER);
  const draggingRef = useRef(false);
  const didDrag     = useRef(false);
  const origin      = useRef({ mx: 0, my: 0, bx: CENTER.x, by: CENTER.y });

  // Animate to bottom-center on all non-landing routes; float back on landing.
  useEffect(() => {
    const target = isLanding ? CENTER : BOTTOM_CENTER;
    setPos(target);
    posRef.current = { ...target };
  }, [isLanding]);

  function move(x: number, y: number) {
    const nx = Math.max(0, Math.min(100, x));
    const ny = Math.max(0, Math.min(100, y));
    posRef.current = { x: nx, y: ny };
    setPos({ x: nx, y: ny });
  }

  function startDrag(clientX: number, clientY: number) {
    draggingRef.current = true;
    didDrag.current     = false;
    setDragging(true);
    origin.current = {
      mx: clientX, my: clientY,
      bx: posRef.current.x, by: posRef.current.y,
    };
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
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
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);
      document.body.style.cursor = "";
      if (!didDrag.current && !isLandingRef.current) router.push("/maja");
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current) return;
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
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);
      if (!didDrag.current && !isLandingRef.current) router.push("/maja");
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
  }, [router]);

  // Attach touchstart with passive:false so preventDefault() is allowed.
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    };
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    return () => el.removeEventListener("touchstart", onTouchStart);
  }, []);

  return (
    <div
      ref={elRef}
      className="fixed z-40 select-none"
      style={{
        left:       `${pos.x}%`,
        top:        `${pos.y}%`,
        transform:  "translate(-50%, -50%)",
        cursor:     isLanding ? "grab" : "pointer",
        transition: isDragging ? "none" : "left 2s ease-in-out, top 2s ease-in-out",
      }}
      onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX, e.clientY); }}
    >
      <div
        style={{
          border:     `6px solid ${STICK_COLOR}`,
          background: BG_COLOR,
          padding:    "18px 36px",
        }}
      >
        <div
          style={{
            display:        "flex",
            justifyContent: "space-between",
            width:          "10.5rem",
          }}
        >
          {LETTERS.map((char, i) => (
            <span
              key={i}
              style={{
                color:         STICK_COLOR,
                fontSize:      "1.15rem",
                textTransform: "uppercase",
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
