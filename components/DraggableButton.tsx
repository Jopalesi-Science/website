"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { STICK_COLOR, HOVER_COLOR, ACTIVE_COLOR, BG_COLOR } from "@/lib/theme";

const DRAG_THRESHOLD = 6; // px

interface Props {
  label:    string;
  href:     string;
  initialX: number; // vw %  — center of button
  initialY: number; // vh %  — center of button
  isActive: boolean;
  borderWidth?: number; // px, default 4
  textSize?:    string; // css font-size, default "0.7rem"
  padding?:     string; // css padding, default "6px 20px"
}

export default function DraggableButton({
  label,
  href,
  initialX,
  initialY,
  isActive,
  borderWidth = 4,
  textSize    = "0.7rem",
  padding     = "6px 20px",
}: Props) {
  const router    = useRouter();
  const [pos, setPos]       = useState({ x: initialX, y: initialY });
  const [hovered, setHovered] = useState(false);
  const posRef   = useRef({ x: initialX, y: initialY });
  const dragging = useRef(false);
  const didDrag  = useRef(false);
  const origin   = useRef({ mx: 0, my: 0, bx: initialX, by: initialY });

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
      if (!didDrag.current) router.push(href);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      const t = e.touches[0];
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
      if (!didDrag.current) router.push(href);
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
  }, [router, href]);

  // Active → red, hover-on-inactive → midpoint, default → stick colour
  const color = isActive
    ? ACTIVE_COLOR
    : hovered
      ? HOVER_COLOR
      : STICK_COLOR;

  return (
    <div
      className="fixed z-20 select-none"
      style={{
        left:      `${pos.x}%`,
        top:       `${pos.y}%`,
        transform: "translate(-50%, -50%)",
        cursor:    "grab",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX, e.clientY); }}
      onTouchStart={(e) => { startDrag(e.touches[0].clientX, e.touches[0].clientY); }}
    >
      <div
        style={{
          border:     `${borderWidth}px solid ${color}`,
          background: BG_COLOR,
          padding,
          display:    "inline-flex",
          alignItems: "center",
          transition: "border-color 0.4s ease",
        }}
      >
        <span
          style={{
            color,
            fontSize:      textSize,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            whiteSpace:    "nowrap",
            transition:    "color 0.4s ease",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
