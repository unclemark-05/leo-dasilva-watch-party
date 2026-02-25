"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCosmosStore } from "@/lib/cosmosStore";

interface RingConfig {
  radius: number;
  position: [number, number, number];
  color: string;
  opacity: number;
  rotationAxis: "x" | "y" | "z";
  speed: number;
}

const RINGS: RingConfig[] = [
  { radius: 8, position: [0, 0, -5], color: "#EF0107", opacity: 0.15, rotationAxis: "y", speed: 0.2 },
  { radius: 12, position: [2, -1, -10], color: "#9C824A", opacity: 0.12, rotationAxis: "x", speed: -0.15 },
  { radius: 6, position: [-3, 2, -3], color: "#ff4444", opacity: 0.2, rotationAxis: "z", speed: 0.25 },
  { radius: 15, position: [0, 0, -15], color: "#EF0107", opacity: 0.08, rotationAxis: "y", speed: -0.1 },
];

function EnergyRing({ config }: { config: RingConfig }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const scroll = useCosmosStore.getState().scrollProgress;

    const speed = config.speed * (1 + scroll * 0.5);

    switch (config.rotationAxis) {
      case "x":
        ref.current.rotation.x = t * speed;
        ref.current.rotation.y = t * speed * 0.3;
        break;
      case "y":
        ref.current.rotation.y = t * speed;
        ref.current.rotation.z = t * speed * 0.2;
        break;
      case "z":
        ref.current.rotation.z = t * speed;
        ref.current.rotation.x = t * speed * 0.15;
        break;
    }
  });

  return (
    <mesh ref={ref} position={config.position}>
      <torusGeometry args={[config.radius, 0.03, 16, 100]} />
      <meshBasicMaterial
        color={config.color}
        transparent
        opacity={config.opacity}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function EnergyRings() {
  return (
    <group>
      {RINGS.map((config, i) => (
        <EnergyRing key={i} config={config} />
      ))}
    </group>
  );
}
