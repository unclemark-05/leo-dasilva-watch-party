"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MatchBallProps {
  position?: [number, number, number];
}

export default function MatchBall({ position = [0, 3, 0] }: MatchBallProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.elapsedTime * 0.5;
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.4, 1]} />
      <meshStandardMaterial
        color="#ffffff"
        metalness={0.1}
        roughness={0.3}
        emissive="#ffffff"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}
