"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { vertexShader, fragmentShader } from "@/lib/shaders";

interface Snapshot {
  time: number;
  cursorX: number;
  cursorY: number;
}

// Used when the page is loaded directly (no live animation to freeze).
// Pick a time that produces a visually varied arrangement.
const DEFAULT_SNAPSHOT: Snapshot = { time: 137.3, cursorX: 0.5, cursorY: 0.5 };

function compileShader(gl: WebGLRenderingContext, source: string, type: number): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vert: string, frag: string): WebGLProgram {
  const program = gl.createProgram()!;
  gl.attachShader(program, compileShader(gl, vert, gl.VERTEX_SHADER));
  gl.attachShader(program, compileShader(gl, frag, gl.FRAGMENT_SHADER));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`);
  }
  return program;
}

export default function BackgroundManager() {
  const pathname  = usePathname();
  const isHome    = pathname === "/" || pathname === "/maja";

  // Tracks the live animated state so we can freeze it on navigation
  const liveRef   = useRef<Snapshot>({ time: 0, cursorX: 0.5, cursorY: 0.5 });

  // When non-null, the canvas renders this snapshot once and pauses
  const frozenRef = useRef<Snapshot | null>(null);

  // Cursor inputs
  const targetCursor = useRef({ x: 0.5, y: 0.5 });
  const smoothCursor = useRef({ x: 0.5, y: 0.5 });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Update frozen state whenever the route changes ───────────────────
  useEffect(() => {
    if (!isHome) {
      // Freeze: use live state if animation has been running, else default
      frozenRef.current = liveRef.current.time > 0.5
        ? { ...liveRef.current }
        : DEFAULT_SNAPSHOT;
    } else {
      frozenRef.current = null; // unfreeze — resume animation
    }
  }, [isHome]);

  // ── WebGL setup (runs once) ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    const positions = new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1,
    ]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime       = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uCursor     = gl.getUniformLocation(program, "u_cursor");

    // Cursor listeners
    const onMouseMove = (e: MouseEvent) => {
      targetCursor.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      targetCursor.current = { x: t.clientX / window.innerWidth, y: t.clientY / window.innerHeight };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    let animId: number;
    const startTime = performance.now();
    let lastTime    = startTime;

    // Track last snapshot that was drawn to avoid redundant redraws when frozen
    let lastDrawnSnapshot: Snapshot | null = null;

    function resize() {
      if (!canvas || !gl) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      lastDrawnSnapshot = null; // force redraw after resize
    }

    function draw(time: number, cx: number, cy: number) {
      if (!gl || !canvas) return;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uCursor, cx, cy);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function loop() {
      animId = requestAnimationFrame(loop);
      if (!gl || !canvas) return;

      const frozen = frozenRef.current;

      if (frozen) {
        // Only redraw if the snapshot changed (new freeze or after resize)
        if (frozen !== lastDrawnSnapshot) {
          draw(frozen.time, frozen.cursorX, frozen.cursorY);
          lastDrawnSnapshot = frozen;
        }
        return;
      }

      // ── Animated mode ─────────────────────────────────────────────
      lastDrawnSnapshot = null;

      const now = performance.now();
      const dt  = (now - lastTime) / 1000;
      lastTime  = now;

      const lerpK = 1 - Math.pow(0.87, dt);
      smoothCursor.current.x += (targetCursor.current.x - smoothCursor.current.x) * lerpK;
      smoothCursor.current.y += (targetCursor.current.y - smoothCursor.current.y) * lerpK;

      const elapsed = (now - startTime) / 1000;

      // Keep live state up to date for potential freeze
      liveRef.current = { time: elapsed, cursorX: smoothCursor.current.x, cursorY: smoothCursor.current.y };

      draw(elapsed, smoothCursor.current.x, smoothCursor.current.y);
    }

    resize();
    window.addEventListener("resize", resize);
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10"
        aria-hidden="true"
      />
      {/* Semi-transparent overlay: fades in over 1 s when leaving home */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -9,
          backgroundColor: "rgba(0, 0, 0, 0.82)",
          opacity: isHome ? 0 : 1,
          transition: "opacity 1s ease",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
