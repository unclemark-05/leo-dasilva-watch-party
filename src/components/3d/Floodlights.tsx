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

/**
 * A single floodlight tower with:
 * - Tapered cylindrical pole (wider at base)
 * - Cross-brace near top
 * - Cluster of 4 light units
 * - Transparent volumetric light cone
 */
function FloodlightTower() {
  return (
    <group>
      {/* Tapered pole — wider base, narrower top */}
      <mesh position={[0, 7, 0]}>
        <cylinderGeometry args={[0.15, 0.4, 14, 8]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Base plate */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Cross-brace near top */}
      <mesh position={[0, 13, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[2.5, 0.08, 0.08]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 13, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[2.5, 0.08, 0.08]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Horizontal bar holding light cluster */}
      <mesh position={[0, 14, 0]}>
        <boxGeometry args={[2.5, 0.12, 0.12]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Light unit cluster (2x2 grid) */}
      {[
        [-0.5, 14.4, -0.25],
        [0.5, 14.4, -0.25],
        [-0.5, 14.4, 0.25],
        [0.5, 14.4, 0.25],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.6, 0.3, 0.4]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#fffbe6"
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}

      {/* Reflector backing behind light units */}
      <mesh position={[0, 14.35, 0]}>
        <boxGeometry args={[2.2, 0.6, 1]} />
        <meshStandardMaterial
          color="#888888"
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>

      {/* Volumetric light cone (transparent) */}
      <mesh position={[0, 8, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[6, 14, 16, 1, true]} />
        <meshBasicMaterial
          color="#fffbe6"
          transparent
          opacity={0.015}
          side={THREE.DoubleSide}
          depthWrite={false}
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
  );
}

export default function Floodlights() {
  const lightsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!lightsRef.current) return;
    lightsRef.current.children.forEach((towerGroup, i) => {
      // Find point lights in the tower groups and animate their intensity
      towerGroup.traverse((child) => {
        if ((child as THREE.PointLight).isPointLight) {
          (child as THREE.PointLight).intensity =
            4 + Math.sin(clock.elapsedTime * 2.5 + i * 0.8) * 0.3;
        }
      });
    });
  });

  return (
    <group ref={lightsRef}>
      {POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          <FloodlightTower />
        </group>
      ))}
    </group>
  );
}
