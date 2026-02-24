"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useCallback } from "react";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import StadiumModel, { type HotspotName } from "./StadiumModel";
import Floodlights from "./Floodlights";
import Crowd from "./Crowd";

// Camera target positions for each hotspot
const CAMERA_TARGETS: Record<
  HotspotName,
  { pos: [number, number, number]; lookAt: [number, number, number] }
> = {
  ball: { pos: [0, 4, 5], lookAt: [0, 0.5, 0] },
  bench: { pos: [-5, 3, -5], lookAt: [-8, 0.5, -7.5] },
  scoreboard: { pos: [0, 8, -2], lookAt: [0, 7.2, -8.5] },
  stands: { pos: [0, 5, 14], lookAt: [0, 3.5, 8.5] },
  vip: { pos: [8, 7, 3], lookAt: [12.5, 5.5, 0] },
  tunnel: { pos: [0, 2.5, -4], lookAt: [0, 1, -7.8] },
  cannon: { pos: [0, 10, -5], lookAt: [0, 9.5, -10.5] },
};

const DEFAULT_CAM = { pos: [0, 12, 25] as [number, number, number], lookAt: [0, 2, 0] as [number, number, number] };

function CameraController({
  activeHotspot,
}: {
  activeHotspot: HotspotName | null;
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...DEFAULT_CAM.pos));
  const targetLookAt = useRef(new THREE.Vector3(...DEFAULT_CAM.lookAt));
  const currentLookAt = useRef(new THREE.Vector3(...DEFAULT_CAM.lookAt));
  const orbitAngle = useRef(0);

  useFrame(({ clock }, delta) => {
    if (activeHotspot) {
      // Zoom to hotspot
      const target = CAMERA_TARGETS[activeHotspot];
      targetPos.current.set(...target.pos);
      targetLookAt.current.set(...target.lookAt);
    } else {
      // Orbit around stadium
      orbitAngle.current += delta * 0.06;
      const radius = 25;
      targetPos.current.set(
        Math.sin(orbitAngle.current) * radius,
        12 + Math.sin(clock.elapsedTime * 0.15) * 1.5,
        Math.cos(orbitAngle.current) * radius
      );
      targetLookAt.current.set(0, 2, 0);
    }

    // Smooth lerp camera position
    camera.position.lerp(targetPos.current, activeHotspot ? 0.04 : 0.02);

    // Smooth lerp lookAt
    currentLookAt.current.lerp(targetLookAt.current, activeHotspot ? 0.04 : 0.02);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

interface StadiumSceneProps {
  activeHotspot: HotspotName | null;
  onHotspotClick: (name: HotspotName) => void;
}

export default function StadiumScene({ activeHotspot, onHotspotClick }: StadiumSceneProps) {
  const handleClick = useCallback(
    (name: HotspotName) => {
      onHotspotClick(name);
    },
    [onHotspotClick]
  );

  return (
    <div className="h-screen w-full">
      <Canvas
        camera={{ position: [0, 12, 25], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#050510"]} />
        <fog attach="fog" args={["#050510", 45, 100]} />

        {/* Lighting — bright enough to see the real Arsenal red */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[15, 25, 10]} intensity={1} color="#fff5e6" />
        <directionalLight position={[-15, 20, -10]} intensity={0.4} color="#b0c4de" />
        <pointLight position={[0, -2, 0]} intensity={0.6} distance={30} color="#EF0107" />

        <Suspense fallback={null}>
          <CameraController activeHotspot={activeHotspot} />
          <StadiumModel onHotspotClick={handleClick} activeHotspot={activeHotspot} />
          <Floodlights />
          <Crowd count={2500} />
          <Stars radius={120} depth={60} count={2000} factor={5} fade speed={0.8} />
        </Suspense>
      </Canvas>
    </div>
  );
}
