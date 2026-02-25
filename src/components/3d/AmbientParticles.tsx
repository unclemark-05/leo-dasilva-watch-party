"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 2000;
const BOUNDS = 25;

export default function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    const red = new THREE.Color("#EF0107");
    const gold = new THREE.Color("#9C824A");
    const orange = new THREE.Color("#ff6633");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Random positions within a large box
      positions[i3] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * BOUNDS * 2;

      // Drift velocities (mostly upward like embers)
      velocities[i3] = (Math.random() - 0.5) * 0.005;
      velocities[i3 + 1] = 0.005 + Math.random() * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.005;

      // Colors: mix of red, gold, and orange
      const colorRoll = Math.random();
      const color = colorRoll < 0.5 ? red : colorRoll < 0.8 ? gold : orange;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors, velocities };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      arr[i3] += velocities[i3];
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2];

      // Wrap when out of bounds
      if (arr[i3 + 1] > BOUNDS) {
        arr[i3 + 1] = -BOUNDS;
        arr[i3] = (Math.random() - 0.5) * BOUNDS * 2;
        arr[i3 + 2] = (Math.random() - 0.5) * BOUNDS * 2;
      }
      if (Math.abs(arr[i3]) > BOUNDS) arr[i3] *= -0.9;
      if (Math.abs(arr[i3 + 2]) > BOUNDS) arr[i3 + 2] *= -0.9;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
        sizeAttenuation
      />
    </points>
  );
}
