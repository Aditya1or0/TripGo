import React, { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

#define MAX_STEPS 256
#define HIT_EPSILON 0.001

varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform int uSteps;
uniform float uStepScale;
uniform float uScale;
uniform float uHeight;
uniform float uSpread;
uniform float uWallCurve;
uniform float uFade;
uniform float uCameraHeight;
uniform float uTilt;
uniform float uRoll;
uniform float uFov;
uniform vec3 uNear;
uniform vec3 uFar;
uniform float uBrightness;
uniform float uContrast;
uniform float uGrain;

const mat2 OCTAVE_TWIST = mat2(0.8, 0.6, -0.6, 0.8);

mat2 rotate(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

float ripple(vec2 p) {
  return sin(1.5 * p.x) * sin(1.5 * p.y);
}

void octave(inout vec2 p, inout float sum, float amplitude, float zoom) {
  sum += amplitude * (0.5 + 0.5 * ripple(p));
  p = OCTAVE_TWIST * p * zoom;
}

float terrainNoise(vec2 p) {
  float sum = 0.0;
  octave(p, sum, 0.5, 2.02);
  octave(p, sum, 0.25, 2.03);
  octave(p, sum, 0.125, 2.01);
  octave(p, sum, 0.0625, 2.04);
  sum += 0.015625 * (0.5 + 0.5 * ripple(p));
  return sum / 0.96875;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float canyon(vec3 p) {
  vec3 q = p + vec3(0.0, 0.0, uTime);
  float relief = terrainNoise(q.xz * uScale) * uHeight;
  float wall = pow(abs(q.x) * uSpread, uWallCurve) * 0.0000125;
  return max(q.y - relief * wall, 0.0);
}

float scene(vec3 p) {
  return canyon(p);
}

void main() {
  vec2 frag = vUv * uResolution;
  vec2 uv = (frag - 0.5 * uResolution) / uResolution.y;

  vec3 origin = vec3(uv + vec2(0.0, uCameraHeight), -1.0);
  vec3 dir = normalize(vec3(uv * uFov, 1.0));
  dir.zy = rotate(uTilt) * dir.zy;
  dir.xy = rotate(uRoll) * dir.xy;

  vec3 p = origin;
  int taken = 0;
  for (int i = 0; i < MAX_STEPS; i++) {
    if (i >= uSteps) break;
    taken = i;
    float jitter = (hash(p.xz) - 0.5) * uGrain;
    float d = scene(p + vec3(jitter));
    if (d < HIT_EPSILON) break;
    p += dir * d * uStepScale;
  }

  float tone = float(taken) / float(MAX_STEPS);
  tone = (tone - 0.5) * uContrast + 0.5;
  tone = clamp(tone * uBrightness, 0.0, 1.0);
  if (uFade > 0.0) {
    float travelled = distance(origin, p) / uFade;
    tone *= exp(-travelled * travelled);
  }

  gl_FragColor = vec4(mix(uNear, uFar, tone), 1.0);
}
`;

function parseColor(hex, fallback = [0, 0, 0]) {
  if (!hex || typeof hex !== "string") return fallback;
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (clean.length !== 6) return fallback;
  const num = parseInt(clean, 16);
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  ];
}

const Ravine = ({
  speed = 1,
  steps = 128,
  stepScale = 0.5,
  scale = 0.25,
  height = 1,
  spread = 34,
  wallCurve = 2.5,
  fade = 35,
  cameraHeight = 6,
  tilt = 0.05,
  roll = 0.075,
  fov = 1,
  nearColor = "#000000",
  farColor = "#ffffff",
  brightness = 0.8,
  contrast = 1,
  grain = 0.005,
  paused = false,
  dpr = 1,
  className = "",
  children,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Keep props in refs for animation loop
  const propsRef = useRef({
    speed,
    steps,
    stepScale,
    scale,
    height,
    spread,
    wallCurve,
    fade,
    cameraHeight,
    tilt,
    roll,
    fov,
    nearColor,
    farColor,
    brightness,
    contrast,
    grain,
    paused,
    dpr,
  });

  useEffect(() => {
    propsRef.current = {
      speed,
      steps,
      stepScale,
      scale,
      height,
      spread,
      wallCurve,
      fade,
      cameraHeight,
      tilt,
      roll,
      fov,
      nearColor,
      farColor,
      brightness,
      contrast,
      grain,
      paused,
      dpr,
    };
  }, [
    speed,
    steps,
    stepScale,
    scale,
    height,
    spread,
    wallCurve,
    fade,
    cameraHeight,
    tilt,
    roll,
    fov,
    nearColor,
    farColor,
    brightness,
    contrast,
    grain,
    paused,
    dpr,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl =
      canvas.getContext("webgl", {
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }) || canvas.getContext("experimental-webgl");

    if (!gl) {
      console.warn("WebGL not supported for Ravine component");
      return;
    }

    // Compile shaders
    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uStepsLoc = gl.getUniformLocation(program, "uSteps");
    const uStepScaleLoc = gl.getUniformLocation(program, "uStepScale");
    const uScaleLoc = gl.getUniformLocation(program, "uScale");
    const uHeightLoc = gl.getUniformLocation(program, "uHeight");
    const uSpreadLoc = gl.getUniformLocation(program, "uSpread");
    const uWallCurveLoc = gl.getUniformLocation(program, "uWallCurve");
    const uFadeLoc = gl.getUniformLocation(program, "uFade");
    const uCameraHeightLoc = gl.getUniformLocation(program, "uCameraHeight");
    const uTiltLoc = gl.getUniformLocation(program, "uTilt");
    const uRollLoc = gl.getUniformLocation(program, "uRoll");
    const uFovLoc = gl.getUniformLocation(program, "uFov");
    const uNearLoc = gl.getUniformLocation(program, "uNear");
    const uFarLoc = gl.getUniformLocation(program, "uFar");
    const uBrightnessLoc = gl.getUniformLocation(program, "uBrightness");
    const uContrastLoc = gl.getUniformLocation(program, "uContrast");
    const uGrainLoc = gl.getUniformLocation(program, "uGrain");

    let animationFrameId;
    let lastTime = performance.now();

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const currentDpr = Math.min(
        window.devicePixelRatio || 1,
        propsRef.current.dpr || 1.5
      );
      const width = Math.max(1, Math.floor(rect.width * currentDpr));
      const height = Math.max(1, Math.floor(rect.height * currentDpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const render = (now) => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisibleRef.current) {
        lastTime = now;
        return;
      }

      const p = propsRef.current;
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!p.paused) {
        timeRef.current += delta * p.speed * 2.5;
      }

      gl.useProgram(program);

      // Update uniforms
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, timeRef.current);
      gl.uniform1i(uStepsLoc, Math.round(Math.min(256, Math.max(32, p.steps))));
      gl.uniform1f(uStepScaleLoc, Math.min(1.0, Math.max(0.1, p.stepScale)));
      gl.uniform1f(uScaleLoc, Math.max(0.01, p.scale));
      gl.uniform1f(uHeightLoc, p.height);
      gl.uniform1f(uSpreadLoc, Math.max(0.0, p.spread));
      gl.uniform1f(uWallCurveLoc, Math.max(0.5, p.wallCurve));
      gl.uniform1f(uFadeLoc, Math.max(0.0, p.fade));
      gl.uniform1f(uCameraHeightLoc, p.cameraHeight);
      gl.uniform1f(uTiltLoc, p.tilt);
      gl.uniform1f(uRollLoc, p.roll);
      gl.uniform1f(uFovLoc, Math.max(0.1, p.fov));

      const nearRgb = parseColor(p.nearColor, [0, 0, 0]);
      gl.uniform3f(uNearLoc, nearRgb[0], nearRgb[1], nearRgb[2]);

      const farRgb = parseColor(p.farColor, [1, 1, 1]);
      gl.uniform3f(uFarLoc, farRgb[0], farRgb[1], farRgb[2]);

      gl.uniform1f(uBrightnessLoc, Math.max(0.0, p.brightness));
      gl.uniform1f(uContrastLoc, Math.max(0.0, p.contrast));
      gl.uniform1f(uGrainLoc, Math.max(0.0, p.grain));

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default Ravine;
