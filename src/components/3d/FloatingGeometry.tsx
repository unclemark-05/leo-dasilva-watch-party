"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCosmosStore } from "@/lib/cosmosStore";

interface ShapeConfig {
  type: "icosahedron" | "octahedron" | "dodecahedron" | "torus" | "torusKnot";
  position: [number, number, number];
  color: string;
  wireframe: boolean;
  scale: number;
  rotSpeed: [number, number, number];
  floatSpeed: number;
  floatAmp: number;
}

const SHAPES: ShapeConfig[] = [
  { type: "icosahedron", position: [-8, 4, -5], color: "#EF0107", wireframe: true, scale: 0.8, rotSpeed: [0.003, 0.005, 0.002], floatSpeed: 0.7, floatAmp: 0.5 },
  { type: "octahedron", position: [9, -3, -8], color: "#9C824A", wireframe: false, scale: 0.6, rotSpeed: [0.004, 0.002, 0.006], floatSpeed: 0.9, floatAmp: 0.4 },
  { type: "dodecahedron", position: [-6, -5, -12], color: "#EF0107", wireframe: true, scale: 0.5, rotSpeed: [0.002, 0.004, 0.003], floatSpeed: 0.5, floatAmp: 0.6 },
  { type: "torus", position: [7, 6, -10], color: "#ff4444", wireframe: true, scale: 0.7, rotSpeed: [0.005, 0.003, 0.001], floatSpeed: 0.8, floatAmp: 0.3 },
  { type: "torusKnot", position: [-10, 1, -15], color: "#9C824A", wireframe: true, scale: 0.4, rotSpeed: [0.001, 0.006, 0.004], floatSpeed: 0.6, floatAmp: 0.5 },
  { type: "icosahedron", position: [12, -1, -7], color: "#ffffff", wireframe: true, scale: 0.5, rotSpeed: [0.003, 0.001, 0.005], floatSpeed: 1.0, floatAmp: 0.4 },
  { type: "octahedron", position: [-4, 7, -18], color: "#EF0107", wireframe: false, scale: 0.3, rotSpeed: [0.006, 0.004, 0.002], floatSpeed: 0.4, floatAmp: 0.7 },
  { type: "dodecahedron", position: [5, -6, -14], color: "#ff6666", wireframe: true, scale: 0.6, rotSpeed: [0.002, 0.005, 0.003], floatSpeed: 0.7, floatAmp: 0.4 },
  { type: "torus", position: [-12, -3, -6], color: "#9C824A", wireframe: false, scale: 0.35, rotSpeed: [0.004, 0.002, 0.005], floatSpeed: 0.9, floatAmp: 0.3 },
  { type: "icosahedron", position: [3, 8, -20], color: "#ffffff", wireframe: true, scale: 0.4, rotSpeed: [0.005, 0.003, 0.001], floatSpeed: 0.5, floatAmp: 0.6 },
];

function FloatingShape({ config }: { config: ShapeConfig }) {
  const ref = useRef<THREE.Mesh>(null);
  const baseY = config.position[1];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const scroll = useCosmosStore.getState().scrollProgress;

    // Rotation
    ref.current.rotation.x += config.rotSpeed[0];
    ref.current.rotation.y += config.rotSpeed[1];
    ref.current.rotation.z += config.rotSpeed[2];

    // Sine float
    ref.current.position.y = baseY + Math.sin(t * config.floatSpeed) * config.floatAmp;

    // Shift depth with scroll
    ref.current.position.z = config.position[2] - scroll * 8;

    // Scale pulse
    const pulse = 1 + Math.sin(t * 0.5 + config.position[0]) * 0.08;
    ref.current.scale.setScalar(config.scale * pulse);
  });

  const geometry = (() => {
    switch (config.type) {
      case "icosahedron": return <icosahedronGeometry args={[1, 0]} />;
      case "octahedron": return <octahedronGeometry args={[1, 0]} />;
      case "dodecahedron": return <dodecahedronGeometry args={[1, 0]} />;
      case "torus": return <torusGeometry args={[1, 0.3, 16, 32]} />;
      case "torusKnot": return <torusKnotGeometry args={[1, 0.3, 64, 8]} />;
    }
  })();

  return (
    <mesh ref={ref} position={config.position}>
      {geometry}
      <meshBasicMaterial
        color={config.color}
        wireframe={config.wireframe}
        transparent
        opacity={config.wireframe ? 0.4 : 0.25}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function FloatingGeometry() {
  return (
    <group>
      {SHAPES.map((config, i) => (
        <FloatingShape key={i} config={config} />
      ))}
    </group>
  );
}
