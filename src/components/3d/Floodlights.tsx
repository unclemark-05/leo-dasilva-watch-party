"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const POSITIONS: [number, number, number][] = [
  [-12, 0, -8],
  [12, 0, -8],
  [-12, 0, 8],
  [12, 0, 8],
];

export default function Floodlights() {
  const lightsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!lightsRef.current) return;
    lightsRef.current.children.forEach((group, i) => {
      const light = group.children[1] as THREE.PointLight;
      if (light) {
        light.intensity =
          2 + Math.sin(clock.elapsedTime * 3 + i * 0.5) * 0.15;
      }
    });
  });

  return (
    <group ref={lightsRef}>
      {POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Tower */}
          <mesh position={[0, 6, 0]}>
            <boxGeometry args={[0.25, 12, 0.25]} />
            <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Light head */}
          <mesh position={[0, 12.5, 0]}>
            <boxGeometry args={[1.5, 0.4, 0.8]} />
            <meshStandardMaterial
              color="#fff5e6"
              emissive="#fff5e6"
              emissiveIntensity={0.5}
            />
          </mesh>
          {/* Point light */}
          <pointLight
            position={[0, 12, 0]}
            intensity={2}
            distance={40}
            color="#fff5e6"
            castShadow={false}
          />
        </group>
      ))}
    </group>
  );
}
