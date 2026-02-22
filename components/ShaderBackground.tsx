"use client";

import { useEffect, useRef } from "react";
import { vertexShader, fragmentShader } from "@/lib/shaders";

function compileShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number
): WebGLShader {
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

function createProgram(
  gl: WebGLRenderingContext,
  vert: string,
  frag: string
): WebGLProgram {
  const program = gl.createProgram()!;
  gl.attachShader(program, compileShader(gl, vert, gl.VERTEX_SHADER));
  gl.attachShader(program, compileShader(gl, frag, gl.FRAGMENT_SHADER));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`);
  }
  return program;
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Raw cursor target (updated instantly on mouse/touch move)
  const targetCursor = useRef({ x: 0.5, y: 0.5 });
  // Smoothed cursor sent to the shader (lerped slowly toward target)
  const smoothCursor = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    // Full-screen quad
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

    // Cursor tracking (raw)
    const onMouseMove = (e: MouseEvent) => {
      targetCursor.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      targetCursor.current = {
        x: t.clientX / window.innerWidth,
        y: t.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    let animId: number;
    let startTime = performance.now();
    let lastTime = startTime;

    function resize() {
      if (!canvas || !gl) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function render() {
      if (!gl || !canvas) return;

      const now = performance.now();
      const dt  = (now - lastTime) / 1000;
      lastTime  = now;

      // Lerp smoothed cursor toward target — ~5 s half-life
      const lerpK = 1 - Math.pow(0.87, dt);
      smoothCursor.current.x += (targetCursor.current.x - smoothCursor.current.x) * lerpK;
      smoothCursor.current.y += (targetCursor.current.y - smoothCursor.current.y) * lerpK;

      gl.uniform1f(uTime, (now - startTime) / 1000);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uCursor, smoothCursor.current.x, smoothCursor.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    }

    resize();
    window.addEventListener("resize", resize);
    render();

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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      aria-hidden="true"
    />
  );
}
