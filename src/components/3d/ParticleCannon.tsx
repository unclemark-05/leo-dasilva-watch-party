"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCosmosStore } from "@/lib/cosmosStore";

const PARTICLE_COUNT = 12000;
const BARREL_COUNT = 7000;
const WHEEL_COUNT = 3000;
const CARRIAGE_COUNT = 2000;

// Generate cannon-shaped target positions
function generateCannonShape() {
  const targets = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const scattered = new Float32Array(PARTICLE_COUNT * 3);

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
      // Barrel: cylinder (radius 0.4, length 3.0, tilted 10 degrees)
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.4 * Math.sqrt(Math.random());
      const length = (Math.random() - 0.5) * 3.0;
      const tilt = 10 * (Math.PI / 180);
      targets[i3] = radius * Math.cos(angle);
      targets[i3 + 1] = length * Math.sin(tilt) + radius * Math.sin(angle);
      targets[i3 + 2] = length * Math.cos(tilt);
    } else if (i < BARREL_COUNT + WHEEL_COUNT) {
      // Wheel: torus (major 0.7, minor 0.15) below barrel rear
      const theta = Math.random() * Math.PI * 2;
      const phi2 = Math.random() * Math.PI * 2;
      const major = 0.7;
      const minor = 0.15 * Math.sqrt(Math.random());
      targets[i3] = (major + minor * Math.cos(phi2)) * Math.cos(theta);
      targets[i3 + 1] = (major + minor * Math.cos(phi2)) * Math.sin(theta) - 0.8;
      targets[i3 + 2] = minor * Math.sin(phi2) - 1.2;
    } else {
      // Carriage: box (1.0 x 0.4 x 0.6) under barrel
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
  }

  return { targets, scattered, colors };
}

export default function ParticleCannon() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const startTime = useRef(0);
  const assembled = useRef(false);

  const { targets, scattered, colors } = useMemo(() => generateCannonShape(), []);

  // Current positions (will be lerped)
  const currentPositions = useRef(new Float32Array(scattered));

  useEffect(() => {
    startTime.current = performance.now() / 1000;
    if (!meshRef.current) return;

    // Set instance colors
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const color = new THREE.Color(colors[i3], colors[i3 + 1], colors[i3 + 2]);
      meshRef.current.setColorAt(i, color);
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [colors]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const state = useCosmosStore.getState();
    const elapsed = clock.elapsedTime - startTime.current;
    const scroll = state.scrollProgress;

    // Assembly progress: 0→1 over first 2 seconds
    const assemblyProgress = Math.min(elapsed / 2, 1);
    const assemblySmooth = assemblyProgress * assemblyProgress * (3 - 2 * assemblyProgress);

    if (assemblyProgress >= 1 && !assembled.current) {
      assembled.current = true;
      useCosmosStore.getState().setIsLoaded(true);
    }

    // Dissolution: scattered again as scroll goes 15%→50%
    const dissolveProgress = scroll < 0.15 ? 0 : scroll > 0.5 ? 1 : (scroll - 0.15) / 0.35;
    const dissolveSmooth = dissolveProgress * dissolveProgress * (3 - 2 * dissolveProgress);

    // Breathing animation (subtle scale pulse when assembled)
    const breathe = assembled.current ? Math.sin(clock.elapsedTime * 0.8) * 0.03 : 0;

    // Mouse ripple displacement
    const mxWorld = state.mouseX * 5;
    const myWorld = state.mouseY * 3;

    const positions = currentPositions.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Blend between scattered and target based on assembly and dissolve
      const formFactor = assemblySmooth * (1 - dissolveSmooth);

      const tx = targets[i3];
      const ty = targets[i3 + 1];
      const tz = targets[i3 + 2];
      const sx = scattered[i3];
      const sy = scattered[i3 + 1];
      const sz = scattered[i3 + 2];

      let px = sx + (tx - sx) * formFactor;
      let py = sy + (ty - sy) * formFactor;
      let pz = sz + (tz - sz) * formFactor;

      // Breathing
      if (formFactor > 0.5) {
        px *= 1 + breathe;
        py *= 1 + breathe;
        pz *= 1 + breathe;
      }

      // Mouse ripple (only when formed)
      if (formFactor > 0.3) {
        const dx = px - mxWorld;
        const dy = py - myWorld;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 3) {
          const ripple = (1 - dist / 3) * 0.3 * formFactor;
          px += dx * ripple;
          py += dy * ripple;
        }
      }

      // Smooth lerp current positions
      positions[i3] += (px - positions[i3]) * 0.08;
      positions[i3 + 1] += (py - positions[i3 + 1]) * 0.08;
      positions[i3 + 2] += (pz - positions[i3 + 2]) * 0.08;

      dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      const scale = 0.02 + formFactor * 0.015;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}
