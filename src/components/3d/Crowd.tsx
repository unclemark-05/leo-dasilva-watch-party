"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ARSENAL_RED = new THREE.Color("#EF0107");
const WHITE = new THREE.Color("#FFFFFF");
const NAVY = new THREE.Color("#023474");

interface CrowdProps {
  count?: number;
}

export default function Crowd({ count = 2000 }: CrowdProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { matrices, colors } = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    const colors: THREE.Color[] = [];
    const tempMatrix = new THREE.Matrix4();

    // 4 stands around the pitch
    const stands = [
      { x: [-11, 11], y: [2, 6], z: [-8.5, -7.5] }, // North
      { x: [-11, 11], y: [2, 6], z: [7.5, 8.5] }, // South
      { x: [-12, -11], y: [2, 6], z: [-7, 7] }, // West
      { x: [11, 12], y: [2, 6], z: [-7, 7] }, // East
    ];

    for (let i = 0; i < count; i++) {
      const stand = stands[i % 4];
      const x =
        stand.x[0] + Math.random() * (stand.x[1] - stand.x[0]);
      const y =
        stand.y[0] + Math.random() * (stand.y[1] - stand.y[0]);
      const z =
        stand.z[0] + Math.random() * (stand.z[1] - stand.z[0]);

      tempMatrix.setPosition(x, y, z);
      matrices.push(tempMatrix.clone());

      // Color distribution: 60% red, 25% white, 15% navy
      const r = Math.random();
      if (r < 0.6) colors.push(ARSENAL_RED.clone());
      else if (r < 0.85) colors.push(WHITE.clone());
      else colors.push(NAVY.clone());
    }

    return { matrices, colors };
  }, [count]);

  // Apply matrices and colors on mount
  useMemo(() => {
    if (!meshRef.current) return;
    matrices.forEach((m, i) => {
      meshRef.current!.setMatrixAt(i, m);
      meshRef.current!.setColorAt(i, colors[i]);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  }, [matrices, colors]);

  // Subtle wave animation
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.elapsedTime;
    const tempMatrix = new THREE.Matrix4();
    const pos = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, tempMatrix);
      pos.setFromMatrixPosition(tempMatrix);

      const wave = Math.sin(time * 2 + pos.x * 0.5 + pos.z * 0.3) * 0.05;
      tempMatrix.setPosition(pos.x, pos.y + wave, pos.z);
      meshRef.current.setMatrixAt(i, tempMatrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.08, 4, 4]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
}
