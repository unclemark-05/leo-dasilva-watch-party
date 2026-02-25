"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import ParticleCannon from "./ParticleCannon";
import FloatingGeometry from "./FloatingGeometry";
import EnergyRings from "./EnergyRings";
import AmbientParticles from "./AmbientParticles";
import ScrollCameraController from "./ScrollCameraController";

export default function CosmosScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#050510"]} />
      <fog attach="fog" args={["#050510", 30, 80]} />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[-10, 5, -10]} intensity={2} color="#EF0107" distance={50} />
      <pointLight position={[10, -5, -5]} intensity={1.5} color="#9C824A" distance={40} />
      <pointLight position={[0, 10, 10]} intensity={0.8} color="#ff4444" distance={35} />

      <Suspense fallback={null}>
        <ParticleCannon />
        <FloatingGeometry />
        <EnergyRings />
        <AmbientParticles />
        <ScrollCameraController />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0005, 0.0005)}
          />
          <Vignette
            offset={0.3}
            darkness={0.7}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
