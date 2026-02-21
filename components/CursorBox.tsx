"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Keep in sync with stick colour in lib/shaders.ts
const STICK_COLOR = "#bdb2a3";
// px of movement before a press is considered a drag, not a tap
const DRAG_THRESHOLD = 6;

export default function CursorBox() {
  const router = useRouter();
  const [pos, setPos] = useState({ x: 50, y: 50 }); // vw / vh %
  const posRef = useRef({ x: 50, y: 50 });
  const dragging = useRef(false);
  const didDrag = useRef(false);
  const origin = useRef({ mx: 0, my: 0, bx: 50, by: 50 });

  function move(x: number, y: number) {
    const nx = Math.max(0, Math.min(100, x));
    const ny = Math.max(0, Math.min(100, y));
    posRef.current = { x: nx, y: ny };
    setPos({ x: nx, y: ny });
  }

  function startDrag(clientX: number, clientY: number) {
    dragging.current = true;
    didDrag.current = false;
    origin.current = {
      mx: clientX,
      my: clientY,
      bx: posRef.current.x,
      by: posRef.current.y,
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
          origin.current.bx + (dx / window.innerWidth) * 100,
          origin.current.by + (dy / window.innerHeight) * 100
        );
      }
    };

    const onMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = "";
      if (!didDrag.current) router.push("/pro");
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      const t = e.touches[0];
      const dx = t.clientX - origin.current.mx;
      const dy = t.clientY - origin.current.my;
      if (Math.hypot(dx, dy) > DRAG_THRESHOLD) didDrag.current = true;
      if (didDrag.current) {
        move(
          origin.current.bx + (dx / window.innerWidth) * 100,
          origin.current.by + (dy / window.innerHeight) * 100
        );
      }
    };

    const onTouchEnd = () => {
      if (!dragging.current) return;
      dragging.current = false;
      if (!didDrag.current) router.push("/pro");
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [router]);

  return (
    <div
      className="fixed z-20 select-none"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: "translate(-50%, -50%)",
        cursor: "grab",
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        startDrag(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }}
    >
      <div
        className="px-8 py-4 flex items-center justify-center"
        style={{
          border: `6px solid ${STICK_COLOR}`,
          background: "#0a0a0c",
        }}
      >
        <span
          className="text-sm tracking-[0.35em] uppercase whitespace-nowrap"
          style={{ color: STICK_COLOR }}
        >
          Jopalesi
        </span>
      </div>
    </div>
  );
}
