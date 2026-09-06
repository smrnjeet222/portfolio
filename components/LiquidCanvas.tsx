"use client";

import { useEffect, useRef } from "react";

export interface LiquidCanvasParams {
  colors?: string[];
  glowColors?: string[];
  speed?: number;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
  distortion?: number;
  distortBoost?: number;
  swirl?: number;
  swirlBoost?: number;
  bloomThreshold?: number;
  bloomRange?: number;
  bloomStrength?: number;
  vignette?: number;
  decay?: number;
  mouseRadius?: number;
  mouseStrength?: number;
  mouseSmoothing?: number;
  mouseVelocity?: number;
  glowIntensity?: number;
}

const DEFAULT_PARAMS: Required<LiquidCanvasParams> = {
  // Muted, subtle, deep atmospheric palette
  colors: ["#0d1117", "#0b1b2d", "#12385b", "#9ec5e8", "#0d1117"],
  glowColors: ["#d0e6fa", "#5ba3dc", "#0f2642"],
  speed: 16,
  scale: 1.75,
  offsetX: -110,
  offsetY: -45,
  distortion: 16,
  distortBoost: 1.1,
  swirl: 18,
  swirlBoost: 0.45,
  bloomThreshold: 0.65,
  bloomRange: 0.18,
  bloomStrength: 0.08,
  vignette: 0.42,
  decay: 0.93,
  mouseRadius: 0.08,
  mouseStrength: 1.0,
  mouseSmoothing: 0.12,
  mouseVelocity: 0.18,
  glowIntensity: 0.10,
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16) / 255,
    parseInt(clean.slice(2, 4), 16) / 255,
    parseInt(clean.slice(4, 6), 16) / 255,
  ];
}

const VERTEX_SHADER = `#version 300 es
in vec4 a_position;
out vec2 vUv;
void main() {
  vUv = a_position.xy * 0.5 + 0.5;
  gl_Position = a_position;
}
`;

const FLOWMAP_SHADER = `#version 300 es
precision mediump float;
in vec2 vUv;
uniform sampler2D u_prev;
uniform vec2 u_mouse;
uniform vec2 u_velocity;
uniform float u_brushRadius;
uniform float u_brushStrength;
uniform float u_decay;
out vec4 fragColor;

void main() {
  vec4 prev = texture(u_prev, vUv);

  prev.r *= u_decay;
  prev.gb = mix(vec2(0.5), prev.gb, u_decay);

  float dist = distance(vUv, u_mouse);
  float radiusSq = u_brushRadius * u_brushRadius * 0.5;
  float influence = exp(-dist * dist / radiusSq);
  influence = max(0.0, influence - 0.01);

  float speed = length(u_velocity);
  float totalStrength = u_brushStrength * 0.3 + min(speed * 3.0, 0.7) * u_brushStrength;

  prev.r = max(prev.r, influence * totalStrength);
  float blendAmt = influence * min(totalStrength, 0.4) * 0.3;
  prev.g = mix(prev.g, clamp(u_velocity.x * 2.0 + 0.5, 0.0, 1.0), blendAmt);
  prev.b = mix(prev.b, clamp(u_velocity.y * 2.0 + 0.5, 0.0, 1.0), blendAmt);

  fragColor = prev;
}
`;

// High-performance, anti-aliased 3D Curl-Fluid Shader
const FLUID_SHADER = `#version 300 es
precision highp float;
in vec2 vUv;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_c1, u_c2, u_c3, u_c4, u_c5;
uniform float u_scale;
uniform float u_rotation;
uniform vec2 u_offset;
uniform sampler2D u_flowmap;
uniform float u_distortBoost;
uniform float u_swirlBoost;
uniform float u_glowIntensity;
uniform vec3 u_glowColor1;
uniform vec3 u_glowColor2;
uniform vec3 u_glowColor3;
uniform float u_vignette;
uniform float u_bloomThreshold;
uniform float u_bloomRange;
uniform float u_bloomStrength;
out vec4 fragColor;

vec3 mod289v3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289v4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289v4(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289v3(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// Optimized analytical curl (avoids 3 heavy snoise calls per pixel)
vec2 fastCurl(vec2 uv, float t) {
  float n = snoise(vec3(uv * 0.75, t * 0.04));
  return vec2(-sin(n * 6.28318), cos(n * 6.28318)) * 0.035;
}

// 2-layer domain warped fluid noise
float fluidNoise(vec2 uv, float t) {
  float n1 = snoise(vec3(uv * 0.6, t * 0.06));
  float n2 = snoise(vec3(uv * 0.6 + 5.2, t * 0.06 + 1.3));
  vec2 w = vec2(n1, n2) * 0.55;
  return snoise(vec3((uv + w) * 0.5, t * 0.04));
}

void main() {
  float aspect = u_resolution.x / u_resolution.y;
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 suv = vec2(uv.x * aspect, uv.y) * u_scale + u_offset;
  float cs0 = cos(u_rotation), sn0 = sin(u_rotation);
  suv = mat2(cs0, -sn0, sn0, cs0) * (suv - u_offset) + u_offset;
  float t = u_time;

  // Smooth mouse interaction via flowmap
  vec4 flow = texture(u_flowmap, uv);
  float influence = smoothstep(0.01, 0.9, flow.r);
  vec2 flowDir = (flow.gb - 0.5) * 2.0;

  // Damped mouse distortion
  suv += flowDir * (influence * u_distortBoost * 0.55);

  // Smooth mouse swirl
  float swirlAngle = influence * u_swirlBoost * 1.8;
  float cs = cos(swirlAngle), sn = sin(swirlAngle);
  vec2 delta = suv - vec2(uv.x * aspect, uv.y) * u_scale;
  suv += (mat2(cs, sn, -sn, cs) * delta - delta) * (influence * 0.75);

  // Fluid turbulence
  vec2 curl = fastCurl(suv, t);
  vec2 uvD = suv + curl * 12.0;
  float f = fluidNoise(uvD, t);
  float swirl = snoise(vec3(uvD * 0.75 + f * 1.4, t * 0.035)) * 0.5 + 0.5;
  float n = f * 0.5 + 0.5;

  // Deep atmospheric color mixing (subtle, soft, non-distracting)
  vec3 col = mix(u_c1, u_c2, smoothstep(0.24, 0.54, n));
  col = mix(col, u_c3, smoothstep(0.38, 0.68, n + swirl * 0.25) * 0.85);

  // Soft, delicate, non-intrusive white wisps
  float whiteCrest = pow(smoothstep(0.68, 0.90, swirl), 2.4) * smoothstep(0.32, 0.62, n);
  col = mix(col, u_c4, whiteCrest * 0.35);

  // Deep shadow folds
  col = mix(col, u_c5, smoothstep(0.50, 0.80, n * swirl) * 0.40);

  // Mouse proximity color shift: 3-color glow
  if (influence > 0.005) {
    float glow = smoothstep(0.0, 0.75, influence);
    vec3 glowMix = mix(u_glowColor3, u_glowColor2, influence);
    glowMix = mix(glowMix, u_glowColor1, influence * 0.85);
    col = mix(col, glowMix, glow * u_glowIntensity);
  }

  // Soft self-luminance bloom on fluid highlights only
  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  float bloom = smoothstep(u_bloomThreshold - u_bloomRange, u_bloomThreshold + u_bloomRange, luma);
  col += col * bloom * u_bloomStrength;

  // Vignette
  float vig = 1.0 - smoothstep(0.35, 0.75, length(uv - 0.5));
  col = mix(col * (1.0 - u_vignette), col, vig);

  // Ultra-wide, gradual feathering across the lower half
  float bottomFade = smoothstep(0.0, 0.58, uv.y);
  col = mix(u_c1, col, bottomFade);

  fragColor = vec4(col, 1.0);
}
`;

export default function LiquidCanvas({ params }: { params?: LiquidCanvasParams }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const seedRef = useRef({
    timeOffset: Math.random() * 400 + 15,
    offsetX: (Math.random() - 0.5) * 50,
    offsetY: (Math.random() - 0.5) * 25,
    rotation: (Math.random() - 0.5) * 0.35,
  });
  const cachedRectRef = useRef<{ left: number; top: number; width: number; height: number }>({
    left: 0,
    top: 0,
    width: 1,
    height: 1,
  });
  const rawMouseRef = useRef<{ clientX: number; clientY: number }>({ clientX: -9999, clientY: -9999 });
  const mouseState = useRef({
    x: 0.5,
    y: 0.5,
    smoothX: 0.5,
    smoothY: 0.5,
    vx: 0,
    vy: 0,
    svx: 0,
    svy: 0,
  });
  const isIntersectingRef = useRef(true);
  const mergedParams = { ...DEFAULT_PARAMS, ...params };
  const paramsRef = useRef(mergedParams);
  paramsRef.current = mergedParams;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateRect = () => {
      const r = canvas.getBoundingClientRect();
      cachedRectRef.current = {
        left: r.left,
        top: r.top,
        width: r.width || 1,
        height: r.height || 1,
      };
    };
    updateRect();
    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });

    if (!gl) {
      return;
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (vertSrc: string, fragSrc: string) => {
      const vertShader = compileShader(gl.VERTEX_SHADER, vertSrc);
      const fragShader = compileShader(gl.FRAGMENT_SHADER, fragSrc);
      if (!vertShader || !fragShader) return null;

      const prog = gl.createProgram();
      if (!prog) return null;
      gl.attachShader(prog, vertShader);
      gl.attachShader(prog, fragShader);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error("Link error:", gl.getProgramInfoLog(prog));
        gl.deleteProgram(prog);
        return null;
      }
      return prog;
    };

    const flowmapProg = createProgram(VERTEX_SHADER, FLOWMAP_SHADER);
    const fluidProg = createProgram(VERTEX_SHADER, FLUID_SHADER);

    if (!flowmapProg || !fluidProg) return;

    const flowmapUniforms = {
      prev: gl.getUniformLocation(flowmapProg, "u_prev"),
      mouse: gl.getUniformLocation(flowmapProg, "u_mouse"),
      velocity: gl.getUniformLocation(flowmapProg, "u_velocity"),
      brushRadius: gl.getUniformLocation(flowmapProg, "u_brushRadius"),
      brushStrength: gl.getUniformLocation(flowmapProg, "u_brushStrength"),
      decay: gl.getUniformLocation(flowmapProg, "u_decay"),
    };

    const fluidUniforms = {
      time: gl.getUniformLocation(fluidProg, "u_time"),
      resolution: gl.getUniformLocation(fluidProg, "u_resolution"),
      scale: gl.getUniformLocation(fluidProg, "u_scale"),
      rotation: gl.getUniformLocation(fluidProg, "u_rotation"),
      offset: gl.getUniformLocation(fluidProg, "u_offset"),
      flowmap: gl.getUniformLocation(fluidProg, "u_flowmap"),
      distortBoost: gl.getUniformLocation(fluidProg, "u_distortBoost"),
      swirlBoost: gl.getUniformLocation(fluidProg, "u_swirlBoost"),
      glowIntensity: gl.getUniformLocation(fluidProg, "u_glowIntensity"),
      glowColor1: gl.getUniformLocation(fluidProg, "u_glowColor1"),
      glowColor2: gl.getUniformLocation(fluidProg, "u_glowColor2"),
      glowColor3: gl.getUniformLocation(fluidProg, "u_glowColor3"),
      c1: gl.getUniformLocation(fluidProg, "u_c1"),
      c2: gl.getUniformLocation(fluidProg, "u_c2"),
      c3: gl.getUniformLocation(fluidProg, "u_c3"),
      c4: gl.getUniformLocation(fluidProg, "u_c4"),
      c5: gl.getUniformLocation(fluidProg, "u_c5"),
      vignette: gl.getUniformLocation(fluidProg, "u_vignette"),
      bloomThreshold: gl.getUniformLocation(fluidProg, "u_bloomThreshold"),
      bloomRange: gl.getUniformLocation(fluidProg, "u_bloomRange"),
      bloomStrength: gl.getUniformLocation(fluidProg, "u_bloomStrength"),
    };

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const bindQuad = (prog: WebGLProgram) => {
      const posAttr = gl.getAttribLocation(prog, "a_position");
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(posAttr);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);
    };

    const createFBO = (w: number, h: number, data: Uint8Array | null) => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      return { fbo, tex };
    };

    // 1.0 DPR is pixel-perfect crisp, zero downscale blur, and keeps fragment count fast
    const computeRenderSize = () => {
      const dpr = 1.0;
      const cw = cachedRectRef.current.width;
      const ch = cachedRectRef.current.height;
      return {
        rw: Math.max(1, Math.round(cw * dpr)),
        rh: Math.max(1, Math.round(ch * dpr)),
      };
    };

    let { rw: displayW, rh: displayH } = computeRenderSize();
    canvas.width = displayW;
    canvas.height = displayH;

    let fboW = Math.max(1, Math.round(displayW / 4));
    let fboH = Math.max(1, Math.round(displayH / 4));

    const initData = new Uint8Array(fboW * fboH * 4);
    for (let i = 0; i < fboW * fboH; i++) {
      initData[4 * i] = 0;
      initData[4 * i + 1] = 128;
      initData[4 * i + 2] = 128;
      initData[4 * i + 3] = 255;
    }

    let fboA = createFBO(fboW, fboH, initData);
    let fboB = createFBO(fboW, fboH, initData);
    let pingPong = false;

    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const onMouseMove = (e: MouseEvent) => {
      rawMouseRef.current.clientX = e.clientX;
      rawMouseRef.current.clientY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    startTimeRef.current = performance.now();

    let lastFrameTime = 0;
    const minFrameInterval = 1000 / 30;

    const render = (now: number) => {
      rafRef.current = requestAnimationFrame(render);
      if (!isIntersectingRef.current || now - lastFrameTime < minFrameInterval) {
        return;
      }
      lastFrameTime = now - ((now - lastFrameTime) % minFrameInterval);

      const { rw: curW, rh: curH } = computeRenderSize();
      if (curW !== displayW || curH !== displayH) {
        displayW = curW;
        displayH = curH;
        canvas.width = displayW;
        canvas.height = displayH;

        fboW = Math.max(1, Math.round(displayW / 4));
        fboH = Math.max(1, Math.round(displayH / 4));

        gl.deleteFramebuffer(fboA.fbo);
        gl.deleteTexture(fboA.tex);
        gl.deleteFramebuffer(fboB.fbo);
        gl.deleteTexture(fboB.tex);

        const resizedData = new Uint8Array(fboW * fboH * 4);
        for (let i = 0; i < fboW * fboH; i++) {
          resizedData[4 * i] = 0;
          resizedData[4 * i + 1] = 128;
          resizedData[4 * i + 2] = 128;
          resizedData[4 * i + 3] = 255;
        }
        fboA = createFBO(fboW, fboH, resizedData);
        fboB = createFBO(fboW, fboH, resizedData);
      }

      const p = paramsRef.current;
      const m = mouseState.current;
      const raw = rawMouseRef.current;
      const rect = cachedRectRef.current;

      if (raw.clientX > -9000) {
        m.x = (raw.clientX - rect.left) / rect.width;
        m.y = 1.0 - (raw.clientY - rect.top) / rect.height;
      }

      m.smoothX += (m.x - m.smoothX) * p.mouseSmoothing;
      m.smoothY += (m.y - m.smoothY) * p.mouseSmoothing;
      m.svx += ((m.x - m.smoothX) * 0.5 - m.svx) * p.mouseVelocity;
      m.svy += ((m.y - m.smoothY) * 0.5 - m.svy) * p.mouseVelocity;

      const srcFBO = pingPong ? fboA : fboB;
      const dstFBO = pingPong ? fboB : fboA;
      pingPong = !pingPong;

      // 1. Flowmap pass
      gl.bindFramebuffer(gl.FRAMEBUFFER, dstFBO.fbo);
      gl.viewport(0, 0, fboW, fboH);
      gl.useProgram(flowmapProg);
      bindQuad(flowmapProg);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, srcFBO.tex);
      gl.uniform1i(flowmapUniforms.prev, 0);
      gl.uniform2f(flowmapUniforms.mouse, m.smoothX, m.smoothY);
      gl.uniform2f(flowmapUniforms.velocity, m.svx, m.svy);
      gl.uniform1f(flowmapUniforms.brushRadius, p.mouseRadius);
      gl.uniform1f(flowmapUniforms.brushStrength, isTouch ? 0.3 : p.mouseStrength);
      gl.uniform1f(flowmapUniforms.decay, p.decay);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // 2. Fluid render pass
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, displayW, displayH);

      const animTime = (seedRef.current.timeOffset + (performance.now() - startTimeRef.current) * 0.001) * (p.speed / 100);
      const palette = p.colors;

      gl.useProgram(fluidProg);
      bindQuad(fluidProg);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, dstFBO.tex);
      gl.uniform1i(fluidUniforms.flowmap, 0);

      gl.uniform1f(fluidUniforms.time, animTime);
      gl.uniform2f(fluidUniforms.resolution, displayW, displayH);
      gl.uniform1f(fluidUniforms.scale, p.scale);
      gl.uniform1f(fluidUniforms.rotation, seedRef.current.rotation);
      gl.uniform2f(
        fluidUniforms.offset,
        (p.offsetX + seedRef.current.offsetX) / 100,
        (p.offsetY + seedRef.current.offsetY) / 100
      );
      gl.uniform1f(fluidUniforms.distortBoost, p.distortBoost);
      gl.uniform1f(fluidUniforms.swirlBoost, p.swirlBoost);
      gl.uniform1f(fluidUniforms.vignette, p.vignette);
      gl.uniform1f(fluidUniforms.bloomThreshold, p.bloomThreshold);
      gl.uniform1f(fluidUniforms.bloomRange, p.bloomRange);
      gl.uniform1f(fluidUniforms.bloomStrength, p.bloomStrength);
      gl.uniform1f(fluidUniforms.glowIntensity, p.glowIntensity);

      const gCol1 = hexToRgb(p.glowColors[0] || "#ffffff");
      const gCol2 = hexToRgb(p.glowColors[1] || p.glowColors[0] || "#7dcfff");
      const gCol3 = hexToRgb(p.glowColors[2] || p.glowColors[0] || "#143258");
      gl.uniform3f(fluidUniforms.glowColor1, gCol1[0], gCol1[1], gCol1[2]);
      gl.uniform3f(fluidUniforms.glowColor2, gCol2[0], gCol2[1], gCol2[2]);
      gl.uniform3f(fluidUniforms.glowColor3, gCol3[0], gCol3[1], gCol3[2]);

      const cLocs = [
        fluidUniforms.c1,
        fluidUniforms.c2,
        fluidUniforms.c3,
        fluidUniforms.c4,
        fluidUniforms.c5,
      ];
      for (let i = 0; i < 5; i++) {
        const rgb = hexToRgb(palette[i] || palette[palette.length - 1] || "#0d1117");
        gl.uniform3f(cLocs[i], rgb[0], rgb[1], rgb[2]);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    rafRef.current = requestAnimationFrame(render);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isIntersectingRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
      observer.disconnect();

      gl.deleteBuffer(quadBuffer);
      gl.deleteFramebuffer(fboA.fbo);
      gl.deleteTexture(fboA.tex);
      gl.deleteFramebuffer(fboB.fbo);
      gl.deleteTexture(fboB.tex);
      gl.deleteProgram(flowmapProg);
      gl.deleteProgram(fluidProg);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
}
