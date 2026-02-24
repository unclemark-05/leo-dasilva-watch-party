"use client";

import { Line } from "@react-three/drei";
import * as THREE from "three";

function CircleLine({
  radius,
  segments = 64,
  y = 0.02,
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
  return <Line points={points} color="white" lineWidth={1} />;
}

export default function Pitch() {
  const W = 20; // pitch width
  const H = 14; // pitch height
  const hw = W / 2;
  const hh = H / 2;
  const y = 0.02;

  return (
    <group>
      {/* Green surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#1a8f2d" side={THREE.DoubleSide} />
      </mesh>

      {/* Touchlines */}
      <Line points={[[-hw, y, -hh], [hw, y, -hh]]} color="white" lineWidth={1} />
      <Line points={[[-hw, y, hh], [hw, y, hh]]} color="white" lineWidth={1} />
      <Line points={[[-hw, y, -hh], [-hw, y, hh]]} color="white" lineWidth={1} />
      <Line points={[[hw, y, -hh], [hw, y, hh]]} color="white" lineWidth={1} />

      {/* Center line */}
      <Line points={[[0, y, -hh], [0, y, hh]]} color="white" lineWidth={1} />

      {/* Center circle */}
      <CircleLine radius={1.8} />

      {/* Center spot */}
      <mesh position={[0, y, 0]}>
        <circleGeometry args={[0.1, 16]} />
        <meshBasicMaterial color="white" side={THREE.DoubleSide} />
      </mesh>

      {/* Penalty areas */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <Line
            points={[
              [side * hw, y, -3.5],
              [side * (hw - 3.2), y, -3.5],
              [side * (hw - 3.2), y, 3.5],
              [side * hw, y, 3.5],
            ]}
            color="white"
            lineWidth={1}
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
            lineWidth={1}
          />
        </group>
      ))}
    </group>
  );
}
