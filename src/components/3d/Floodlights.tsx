"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const POSITIONS: [number, number, number][] = [
  [-14, 0, -10],
  [14, 0, -10],
  [-14, 0, 10],
  [14, 0, 10],
];

export default function Floodlights() {
  const lightsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!lightsRef.current) return;
    // Access point lights (child index 2 in each tower group)
    lightsRef.current.children.forEach((group, i) => {
      const pointLight = group.children[2] as THREE.PointLight;
      if (pointLight && pointLight.isLight) {
        pointLight.intensity =
          4 + Math.sin(clock.elapsedTime * 2.5 + i * 0.8) * 0.3;
      }
    });
  });

  return (
    <group ref={lightsRef}>
      {POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Tower pole */}
          <mesh position={[0, 7, 0]}>
            <boxGeometry args={[0.3, 14, 0.3]} />
            <meshStandardMaterial color="#444" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Light panel at top */}
          <mesh position={[0, 14.5, 0]}>
            <boxGeometry args={[2, 0.5, 1.2]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#fffbe6"
              emissiveIntensity={1.5}
            />
          </mesh>
          {/* Point light — BRIGHT */}
          <pointLight
            position={[0, 14, 0]}
            intensity={4}
            distance={50}
            color="#fff8e0"
            castShadow={false}
          />
          {/* Secondary spotlight pointing down at pitch */}
          <spotLight
            position={[0, 14, 0]}
            target-position={[0, 0, 0]}
            angle={0.6}
            penumbra={0.5}
            intensity={2}
            distance={35}
            color="#fff8e0"
            castShadow={false}
          />
        </group>
      ))}
    </group>
  );
}
