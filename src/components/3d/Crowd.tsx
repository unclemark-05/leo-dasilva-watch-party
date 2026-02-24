"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ARSENAL_RED = new THREE.Color("#EF0107");
const WHITE = new THREE.Color("#FFFFFF");
const GOLD = new THREE.Color("#9C824A");

interface CrowdProps {
  count?: number;
}

export default function Crowd({ count = 2500 }: CrowdProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const basePositions = useRef<THREE.Vector3[]>([]);

  // Initialize positions and colors after mount
  useEffect(() => {
    if (!meshRef.current) return;

    const tempMatrix = new THREE.Matrix4();
    const positions: THREE.Vector3[] = [];

    // 4 stands — wide spread to fill the visible seats
    const stands = [
      { xMin: -11, xMax: 11, yMin: 1, yMax: 6.5, zMin: -10, zMax: -8 }, // North
      { xMin: -11, xMax: 11, yMin: 1, yMax: 6.5, zMin: 8, zMax: 10 },  // South
      { xMin: -13, xMax: -11, yMin: 1, yMax: 6.5, zMin: -8, zMax: 8 }, // West
      { xMin: 11, xMax: 13, yMin: 1, yMax: 6.5, zMin: -8, zMax: 8 },   // East
    ];

    for (let i = 0; i < count; i++) {
      const stand = stands[i % 4];
      const x = stand.xMin + Math.random() * (stand.xMax - stand.xMin);
      const y = stand.yMin + Math.random() * (stand.yMax - stand.yMin);
      const z = stand.zMin + Math.random() * (stand.zMax - stand.zMin);

      const pos = new THREE.Vector3(x, y, z);
      positions.push(pos);

      tempMatrix.setPosition(x, y, z);
      meshRef.current.setMatrixAt(i, tempMatrix);

      // Color: 55% red, 30% white, 15% gold
      const r = Math.random();
      const color = r < 0.55 ? ARSENAL_RED : r < 0.85 ? WHITE : GOLD;
      meshRef.current.setColorAt(i, color);
    }

    basePositions.current = positions;
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [count]);

  // Wave animation
  useFrame(({ clock }) => {
    if (!meshRef.current || basePositions.current.length === 0) return;
    const time = clock.elapsedTime;
    const tempMatrix = new THREE.Matrix4();

    for (let i = 0; i < count; i++) {
      const base = basePositions.current[i];
      if (!base) continue;
      const wave = Math.sin(time * 2.5 + base.x * 0.4 + base.z * 0.3) * 0.08;
      tempMatrix.setPosition(base.x, base.y + wave, base.z);
      meshRef.current.setMatrixAt(i, tempMatrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 6, 6]} />
      <meshStandardMaterial roughness={0.8} />
    </instancedMesh>
  );
}
