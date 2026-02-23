"use client";

import { useEffect, useRef, useState } from "react";
import { STICK_COLOR, BG_COLOR } from "@/lib/theme";

const DRAG_THRESHOLD = 6;

interface Props {
  initialX: number;
  initialY: number;
  width?: string;
  children: React.ReactNode;
}

export default function DraggableBox({ initialX, initialY, width = "auto", children }: Props) {
  const [pos, setPos]             = useState({ x: initialX, y: initialY });
  const [isDragging, setDragging] = useState(false);

  const elRef       = useRef<HTMLDivElement>(null);
  const posRef      = useRef({ x: initialX, y: initialY });
  const draggingRef = useRef(false);
  const didDrag     = useRef(false);
  const origin      = useRef({ mx: 0, my: 0, bx: initialX, by: initialY });

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

  // passive:false so preventDefault() is allowed on touch
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
      className="fixed z-20 select-none"
      style={{
        left:      `${pos.x}%`,
        top:       `${pos.y}%`,
        transform: "translate(-50%, -50%)",
        cursor:    isDragging ? "grabbing" : "grab",
        width,
      }}
      onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX, e.clientY); }}
    >
      <div style={{ border: `5px solid ${STICK_COLOR}`, background: BG_COLOR }}>
        {children}
      </div>
    </div>
  );
}
