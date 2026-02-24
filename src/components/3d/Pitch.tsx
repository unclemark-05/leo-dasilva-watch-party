"use client";

import { useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { createGrassTexture } from "./stadiumMaterials";

function CircleLine({
  radius,
  segments = 64,
  y = 0.03,
}: {
  radius: number;
  segments?: number;
  y?: number;
}) {
  const points: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push([Math.cos(angle) * radius, y, Math.sin(angle) * radius]);
  }
  return <Line points={points} color="white" lineWidth={1.5} />;
}

export default function Pitch() {
  const W = 20;
  const H = 14;
  const hw = W / 2;
  const hh = H / 2;
  const y = 0.03;

  // Procedural grass texture (created once)
  const grassMaterial = useMemo(() => {
    const tex = createGrassTexture(512);
    return new THREE.MeshStandardMaterial({
      map: tex,
      emissive: "#0a3a0a",
      emissiveIntensity: 0.1,
      side: THREE.DoubleSide,
    });
  }, []);

  return (
    <group>
      {/* Green pitch with procedural grass stripes + grain */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[W, H]} />
        <primitive object={grassMaterial} attach="material" />
      </mesh>

      {/* Touchlines */}
      <Line points={[[-hw, y, -hh], [hw, y, -hh]]} color="white" lineWidth={2} />
      <Line points={[[-hw, y, hh], [hw, y, hh]]} color="white" lineWidth={2} />
      <Line points={[[-hw, y, -hh], [-hw, y, hh]]} color="white" lineWidth={2} />
      <Line points={[[hw, y, -hh], [hw, y, hh]]} color="white" lineWidth={2} />

      {/* Center line */}
      <Line points={[[0, y, -hh], [0, y, hh]]} color="white" lineWidth={2} />

      {/* Center circle */}
      <CircleLine radius={2} />

      {/* Center spot */}
      <mesh position={[0, y + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, 16]} />
        <meshBasicMaterial color="white" side={THREE.DoubleSide} />
      </mesh>

      {/* Penalty areas */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <Line
            points={[
              [side * hw, y, -3.5],
              [side * (hw - 3.5), y, -3.5],
              [side * (hw - 3.5), y, 3.5],
              [side * hw, y, 3.5],
            ]}
            color="white"
            lineWidth={1.5}
          />
          {/* Goal area */}
          <Line
            points={[
              [side * hw, y, -1.8],
              [side * (hw - 1.2), y, -1.8],
              [side * (hw - 1.2), y, 1.8],
              [side * hw, y, 1.8],
            ]}
            color="white"
            lineWidth={1.5}
          />
          {/* Penalty spot */}
          <mesh
            position={[side * (hw - 2.5), y + 0.01, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[0.08, 12]} />
            <meshBasicMaterial color="white" side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* Corner arcs */}
      {[
        [-hw, -hh],
        [hw, -hh],
        [-hw, hh],
        [hw, hh],
      ].map(([cx, cz], i) => {
        const startAngle =
          i === 0
            ? 0
            : i === 1
              ? Math.PI / 2
              : i === 2
                ? -Math.PI / 2
                : Math.PI;
        const pts: [number, number, number][] = [];
        for (let j = 0; j <= 16; j++) {
          const angle = startAngle + (j / 16) * (Math.PI / 2);
          pts.push([cx + Math.cos(angle) * 0.5, y, cz + Math.sin(angle) * 0.5]);
        }
        return <Line key={i} points={pts} color="white" lineWidth={1} />;
      })}
    </group>
  );
}
