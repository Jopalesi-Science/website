export const vertexShader = /* glsl */ `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // --- Grid of sticks ---
    float numSticks = 40.0;
    float stickFill = 0.45; // stick width as fraction of column

    float col = floor(uv.x * numSticks);
    float colFrac = fract(uv.x * numSticks);

    // Per-stick pseudo-random phase using sine hash
    float h1 = fract(sin(col * 127.1 + 311.7) * 43758.5453) * 6.28318;
    float h2 = fract(sin(col * 269.5 + 183.3) * 43758.5453) * 6.28318;

    float t = u_time * 0.38;
    float maxH = 0.62;

    // Top stick height: grows down from y=1
    float topH = (sin(t + h1) * 0.5 + 0.5) * maxH;

    // Bottom stick height: grows up from y=0, slightly offset frequency
    float botH = (sin(t * 0.77 + h2) * 0.5 + 0.5) * maxH;

    // Pixel height for soft edges
    float pw = 1.5 / u_resolution.y;

    // X: is pixel inside stick width?
    float gap = (1.0 - stickFill) * 0.5;
    float edgeW = 0.6 / numSticks;
    float inStickX =
      smoothstep(gap - edgeW, gap + edgeW, colFrac) -
      smoothstep(1.0 - gap - edgeW, 1.0 - gap + edgeW, colFrac);

    // Top stick occupies y in [1 - topH, 1.0]
    float topStick = smoothstep(1.0 - topH - pw, 1.0 - topH + pw, uv.y);

    // Bottom stick occupies y in [0.0, botH]
    float botStick = 1.0 - smoothstep(botH - pw, botH + pw, uv.y);

    float mask = max(topStick, botStick) * inStickX;

    vec3 bg    = vec3(0.04, 0.04, 0.05);
    vec3 stick = vec3(0.74, 0.70, 0.64);

    gl_FragColor = vec4(mix(bg, stick, mask), 1.0);
  }
`;
