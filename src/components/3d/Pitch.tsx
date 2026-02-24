"use client";

import { Line } from "@react-three/drei";
import * as THREE from "three";

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

  return (
    <group>
      {/* Green pitch — bright and vibrant */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial
          color="#2d8b2d"
          emissive="#0a3a0a"
          emissiveIntensity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Pitch stripe pattern (alternating shades) */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-hw + (i * W) / 10 + W / 20, 0.015, 0]}
        >
          <planeGeometry args={[W / 10, H]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#2d8b2d" : "#338b33"}
            emissive={i % 2 === 0 ? "#0a3a0a" : "#0c3f0c"}
            emissiveIntensity={0.1}
            side={THREE.DoubleSide}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}

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
          <mesh position={[side * (hw - 2.5), y + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.08, 12]} />
            <meshBasicMaterial color="white" side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
