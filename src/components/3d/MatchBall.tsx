"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MatchBallProps {
  position?: [number, number, number];
}

export default function MatchBall({ position = [0, 4, 0] }: MatchBallProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.elapsedTime * 0.8;
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.4) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.5, 2]} />
      <meshStandardMaterial
        color="#ffffff"
        metalness={0.15}
        roughness={0.25}
        emissive="#ffffff"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}
