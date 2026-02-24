"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { Stars, Float } from "@react-three/drei";
import StadiumModel from "./StadiumModel";
import Floodlights from "./Floodlights";
import Crowd from "./Crowd";
import MatchBall from "./MatchBall";

function CameraRig() {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.06;
    const radius = 25;
    camera.position.x = Math.sin(t) * radius;
    camera.position.y = 12 + Math.sin(clock.elapsedTime * 0.15) * 2;
    camera.position.z = Math.cos(t) * radius;
    camera.lookAt(0, 2, 0);
  });

  return null;
}

export default function StadiumScene() {
  return (
    <div className="h-screen w-full">
      <Canvas
        camera={{ position: [0, 12, 25], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#050510"]} />
        <fog attach="fog" args={["#050510", 40, 90]} />

        {/* Strong ambient light so the stadium is visible */}
        <ambientLight intensity={0.4} />

        {/* Main key light — warm stadium glow */}
        <directionalLight
          position={[15, 25, 10]}
          intensity={0.8}
          color="#fff5e6"
        />

        {/* Fill light from opposite side */}
        <directionalLight
          position={[-15, 20, -10]}
          intensity={0.3}
          color="#b0c4de"
        />

        {/* Red accent light from below for Arsenal feel */}
        <pointLight
          position={[0, -2, 0]}
          intensity={0.5}
          distance={30}
          color="#EF0107"
        />

        <Suspense fallback={null}>
          <CameraRig />
          <StadiumModel />
          <Floodlights />
          <Crowd count={2500} />
          <Float floatIntensity={0.8} rotationIntensity={0.2} speed={2}>
            <MatchBall position={[0, 4, 0]} />
          </Float>
          <Stars
            radius={120}
            depth={60}
            count={2000}
            factor={5}
            fade
            speed={0.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
