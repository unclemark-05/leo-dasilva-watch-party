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
    const t = clock.elapsedTime * 0.08;
    const radius = 28;
    camera.position.x = Math.sin(t) * radius;
    camera.position.y = 14;
    camera.position.z = Math.cos(t) * radius;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function StadiumScene() {
  return (
    <div className="h-screen w-full">
      <Canvas
        camera={{ position: [0, 15, 28], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#0a0a1a"]} />
        <fog attach="fog" args={["#0a0a1a", 30, 80]} />

        <ambientLight intensity={0.15} />
        <directionalLight position={[10, 20, 10]} intensity={0.3} color="#fff5e6" />

        <Suspense fallback={null}>
          <CameraRig />
          <StadiumModel />
          <Floodlights />
          <Crowd count={2000} />
          <Float floatIntensity={0.5} rotationIntensity={0.1} speed={2}>
            <MatchBall position={[0, 3, 0]} />
          </Float>
          <Stars
            radius={100}
            depth={50}
            count={1500}
            factor={4}
            fade
            speed={1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
