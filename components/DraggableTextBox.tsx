"use client";

import { useEffect, useRef, useState } from "react";
import { STICK_COLOR, BG_COLOR } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";

const DRAG_THRESHOLD = 6;
const INITIAL = { x: 50, y: 73 };

export default function DraggableTextBox() {
  const { t }                       = useI18n();
  const [pos, setPos]               = useState(INITIAL);
  const [isDragging, setDragging]   = useState(false);

  const posRef      = useRef(INITIAL);
  const draggingRef = useRef(false);
  const didDrag     = useRef(false);
  const origin      = useRef({ mx: 0, my: 0, bx: INITIAL.x, by: INITIAL.y });

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

  return (
    <div
      className="fixed z-20 select-none"
      style={{
        left:      `${pos.x}%`,
        top:       `${pos.y}%`,
        transform: "translate(-50%, -50%)",
        cursor:    isDragging ? "grabbing" : "grab",
        width:     "min(32rem, calc(100vw - 4rem))",
      }}
      onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX, e.clientY); }}
      onTouchStart={(e) => { e.preventDefault(); startDrag(e.touches[0].clientX, e.touches[0].clientY); }}
    >
      <div
        style={{
          border:     `5px solid ${STICK_COLOR}`,
          background: BG_COLOR,
          padding:    "1.4rem 1.8rem",
        }}
      >
        <p
          style={{
            fontSize:      "0.92rem",
            letterSpacing: "0.05em",
            lineHeight:    1.75,
            color:         "#e8e3dc",
            opacity:       0.8,
            margin:        0,
            fontWeight:    600,
            textAlign:     "justify",
          }}
        >
          {t.home.description}
        </p>
      </div>
    </div>
  );
}
