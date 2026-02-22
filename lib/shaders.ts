export const vertexShader = /* glsl */ `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float u_time;
  uniform vec2  u_resolution;
  uniform vec2  u_cursor; // screen space [0,1]x[0,1], y=0 at top

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // ── grid ──────────────────────────────────────────────────────────
    float numSticks   = 40.0;
    float stickFill   = 0.45;
    float col         = floor(uv.x * numSticks);
    float colFrac     = fract(uv.x * numSticks);
    float colCenterUV = (col + 0.5) / numSticks;

    float h1 = fract(sin(col * 127.1 + 311.7) * 43758.5453) * 6.28318;
    float h2 = fract(sin(col * 269.5  + 183.3) * 43758.5453) * 6.28318;

    float t    = u_time * 0.38;
    float maxH = 0.62;

    // ── mode 0 : center — random-phase sticks ─────────────────────────
    float topH0 = (sin(t        + h1) * 0.5 + 0.5) * maxH;
    float botH0 = (sin(t * 0.77 + h2) * 0.5 + 0.5) * maxH;

    // ── 1/x base shapes (sampled at column centre → rectangular tips) ─
    // xLR: increases left→right over [1.5, 3]
    // xRL: decreases left→right over [3, 1.5]  (left-right mirror)
    float xLR = 1.5 + colCenterUV * 1.5;
    float xRL = 3.0 - colCenterUV * 1.5;

    // yLR ∈ [1, 0]: tall left, short right   (3/x−1 on xLR)
    // yRL ∈ [0, 1]: short left, tall right   (mirror)
    float yLR = 3.0 / xLR - 1.0;
    float yRL = 3.0 / xRL - 1.0;

    float wigB = sin(t * 1.30 + h2 * 2.5) * 0.18;
    float wigT = sin(t * 1.10 + h1 * 2.0) * 0.18;

    // ── mode 1 : top-right ─────────────────────────────────────────────
    // bot: tall left → short right   top: short left → tall right
    float botH1 = clamp(yLR         * maxH + wigB, 0.0, maxH);
    float topH1 = clamp((1.0 - yLR) * maxH + wigT, 0.0, maxH);

    // ── mode 2 : top-left (LR mirror of TR) ───────────────────────────
    // bot: short left → tall right   top: tall left → short right
    float botH2 = clamp(yRL         * maxH + wigB, 0.0, maxH);
    float topH2 = clamp((1.0 - yRL) * maxH + wigT, 0.0, maxH);

    // ── mode 3 : bottom-right (TB mirror of TR) ────────────────────────
    // swap top/bottom roles: bot uses what TR used for top, and vice versa
    float botH3 = clamp((1.0 - yLR) * maxH + wigB, 0.0, maxH);
    float topH3 = clamp(yLR         * maxH + wigT, 0.0, maxH);

    // ── mode 4 : bottom-left (both mirrors) ───────────────────────────
    float botH4 = clamp((1.0 - yRL) * maxH + wigB, 0.0, maxH);
    float topH4 = clamp(yRL         * maxH + wigT, 0.0, maxH);

    // ── zone weights (sum always ≤ 1 by construction) ──────────────────
    vec2  d = u_cursor - vec2(0.5);
    float R = smoothstep(0.0, 0.45,  d.x);
    float L = smoothstep(0.0, 0.45, -d.x);
    float T = smoothstep(0.0, 0.45, -d.y); // y=0 is screen top
    float B = smoothstep(0.0, 0.45,  d.y);

    float wTR = R * T;
    float wTL = L * T;
    float wBR = R * B;
    float wBL = L * B;
    float w0  = 1.0 - wTR - wTL - wBR - wBL; // center weight

    // ── weighted blend ─────────────────────────────────────────────────
    float topH = w0*topH0 + wTR*topH1 + wTL*topH2 + wBR*topH3 + wBL*topH4;
    float botH = w0*botH0 + wTR*botH1 + wTL*botH2 + wBR*botH3 + wBL*botH4;

    // ── render ─────────────────────────────────────────────────────────
    float pw    = 1.5 / u_resolution.y;
    float gap   = (1.0 - stickFill) * 0.5;
    float edgeW = 0.6 / numSticks;

    float inStickX =
      smoothstep(gap - edgeW, gap + edgeW, colFrac) -
      smoothstep(1.0 - gap - edgeW, 1.0 - gap + edgeW, colFrac);

    // top stick: anchored at screen top, grows downward
    float topStick = smoothstep(1.0 - topH - pw, 1.0 - topH + pw, uv.y)
                   * smoothstep(1.0 + pw, 1.0, uv.y);

    // bottom stick: anchored at screen bottom, grows upward
    float botStick = 1.0 - smoothstep(botH - pw, botH + pw, uv.y);

    float mask = max(topStick, botStick) * inStickX;

    vec3 bg    = vec3(0.04, 0.04, 0.05);
    vec3 stick = vec3(0.74, 0.70, 0.64);

    gl_FragColor = vec4(mix(bg, stick, mask), 1.0);
  }
`;
