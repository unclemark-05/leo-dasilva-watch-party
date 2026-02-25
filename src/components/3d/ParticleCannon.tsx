"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCosmosStore } from "@/lib/cosmosStore";

const PARTICLE_COUNT = 12000;
const BARREL_COUNT = 7000;
const WHEEL_COUNT = 3000;

function generateCannonShape() {
  const targets = new Float32Array(PARTICLE_COUNT * 3);
  const scattered = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const randoms = new Float32Array(PARTICLE_COUNT);
  const sizes = new Float32Array(PARTICLE_COUNT);

  const redColor = new THREE.Color("#EF0107");
  const goldColor = new THREE.Color("#9C824A");
  const whiteColor = new THREE.Color("#ffffff");

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    // Scattered positions (random sphere)
    const phi = Math.random() * Math.PI * 2;
    const cosTheta = Math.random() * 2 - 1;
    const r = Math.pow(Math.random(), 0.33) * 15;
    scattered[i3] = r * Math.sqrt(1 - cosTheta * cosTheta) * Math.cos(phi);
    scattered[i3 + 1] = r * Math.sqrt(1 - cosTheta * cosTheta) * Math.sin(phi);
    scattered[i3 + 2] = r * cosTheta;

    // Target positions (cannon shape)
    if (i < BARREL_COUNT) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.4 * Math.sqrt(Math.random());
      const length = (Math.random() - 0.5) * 3.0;
      const tilt = 10 * (Math.PI / 180);
      targets[i3] = radius * Math.cos(angle);
      targets[i3 + 1] = length * Math.sin(tilt) + radius * Math.sin(angle);
      targets[i3 + 2] = length * Math.cos(tilt);
    } else if (i < BARREL_COUNT + WHEEL_COUNT) {
      const theta = Math.random() * Math.PI * 2;
      const phi2 = Math.random() * Math.PI * 2;
      const major = 0.7;
      const minor = 0.15 * Math.sqrt(Math.random());
      targets[i3] = (major + minor * Math.cos(phi2)) * Math.cos(theta);
      targets[i3 + 1] = (major + minor * Math.cos(phi2)) * Math.sin(theta) - 0.8;
      targets[i3 + 2] = minor * Math.sin(phi2) - 1.2;
    } else {
      targets[i3] = (Math.random() - 0.5) * 1.0;
      targets[i3 + 1] = (Math.random() - 0.5) * 0.4 - 0.5;
      targets[i3 + 2] = (Math.random() - 0.5) * 0.6 - 0.3;
    }

    // Colors: 60% red, 25% gold, 15% white
    const colorRoll = Math.random();
    const color = colorRoll < 0.6 ? redColor : colorRoll < 0.85 ? goldColor : whiteColor;
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    randoms[i] = Math.random();
    sizes[i] = Math.random() * 0.5 + 0.2;
  }

  return { targets, scattered, colors, randoms, sizes };
}

const vertexShader = /* glsl */ `
  attribute vec3 aTarget;
  attribute vec3 aScattered;
  attribute vec3 aColor;
  attribute float aRandom;
  attribute float aSize;

  uniform float uTime;
  uniform float uFormFactor;
  uniform vec2 uMouseWorld;
  uniform float uScrollProgress;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vFormFactor;
  varying float vRandom;

  void main() {
    // Blend scattered <-> target via formFactor
    vec3 pos = mix(aScattered, aTarget, uFormFactor);

    // Breathing pulse when formed
    if (uFormFactor > 0.5) {
      float breathe = sin(uTime * 0.8) * 0.03;
      pos *= 1.0 + breathe;
    }

    // Organic noise displacement
    float noise = sin(pos.x * 0.5 + uTime * 0.3) * cos(pos.y * 0.3 + uTime * 0.2) * 0.15;
    pos.x += sin(uTime * 0.15 + aRandom * 6.28) * 0.1 * (1.0 - uFormFactor) + noise * (1.0 - uFormFactor * 0.7);
    pos.y += cos(uTime * 0.12 + aRandom * 6.28) * 0.1 * (1.0 - uFormFactor);

    // Mouse ripple when formed
    if (uFormFactor > 0.3) {
      vec2 diff = pos.xy - uMouseWorld;
      float dist = length(diff);
      if (dist < 3.0) {
        float ripple = (1.0 - dist / 3.0) * 0.3 * uFormFactor;
        pos.xy += normalize(diff) * ripple;
      }
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Size attenuation
    float distanceFactor = 1.0 / (-mvPosition.z * 0.05 + 1.0);
    float formScale = 0.6 + uFormFactor * 0.4;
    gl_PointSize = aSize * uPixelRatio * distanceFactor * formScale * 60.0;
    gl_Position = projectionMatrix * mvPosition;

    vColor = aColor;
    vFormFactor = uFormFactor;
    vRandom = aRandom;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;

  varying vec3 vColor;
  varying float vFormFactor;
  varying float vRandom;

  void main() {
    // Soft radial gradient
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= alpha; // Quadratic falloff for soft glow

    // Twinkle effect
    float twinkle = sin(uTime * 2.0 + vRandom * 62.83) * 0.3 + 0.7;
    alpha *= twinkle;

    // Glow intensifies with formFactor
    float glow = exp(-dist * 4.0) * (0.3 + vFormFactor * 0.4);
    vec3 color = vColor + glow * 0.2;

    gl_FragColor = vec4(color, alpha * (0.4 + vFormFactor * 0.4));
  }
`;

export default function ParticleCannon() {
  const pointsRef = useRef<THREE.Points>(null);
  const startTime = useRef(0);
  const assembled = useRef(false);

  const { geometry, uniforms } = useMemo(() => {
    const { targets, scattered, colors, randoms, sizes } = generateCannonShape();

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(scattered.slice(), 3));
    geo.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
    geo.setAttribute("aScattered", new THREE.BufferAttribute(scattered, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const u = {
      uTime: { value: 0 },
      uFormFactor: { value: 0 },
      uMouseWorld: { value: new THREE.Vector2(0, 0) },
      uScrollProgress: { value: 0 },
      uPixelRatio: {
        value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      },
    };

    return { geometry: geo, uniforms: u };
  }, []);

  useEffect(() => {
    startTime.current = performance.now() / 1000;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const state = useCosmosStore.getState();
    const elapsed = clock.elapsedTime - startTime.current;
    const scroll = state.scrollProgress;

    // Assembly: 0→1 over first 2s
    const assemblyProgress = Math.min(elapsed / 2, 1);
    const assemblySmooth = assemblyProgress * assemblyProgress * (3 - 2 * assemblyProgress);

    if (assemblyProgress >= 1 && !assembled.current) {
      assembled.current = true;
      state.setIsLoaded(true);
    }

    // Dissolution: scatter as scroll goes 15%→50%
    const dissolveProgress =
      scroll < 0.15 ? 0 : scroll > 0.5 ? 1 : (scroll - 0.15) / 0.35;
    const dissolveSmooth =
      dissolveProgress * dissolveProgress * (3 - 2 * dissolveProgress);

    const formFactor = assemblySmooth * (1 - dissolveSmooth);

    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uFormFactor.value = formFactor;
    uniforms.uMouseWorld.value.set(state.mouseX * 5, state.mouseY * 3);
    uniforms.uScrollProgress.value = scroll;
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
