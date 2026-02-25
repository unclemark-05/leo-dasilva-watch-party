"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useCosmosStore } from "@/lib/cosmosStore";

const WAYPOINTS: { t: number; pos: [number, number, number]; look: [number, number, number] }[] = [
  { t: 0.0, pos: [0, 0, 20], look: [0, 0, 0] },
  { t: 0.15, pos: [0, 0, 20], look: [0, 0, 0] },
  { t: 0.25, pos: [5, 3, 25], look: [0, 0, -5] },
  { t: 0.4, pos: [8, 5, 22], look: [2, 1, -8] },
  { t: 0.55, pos: [-3, 2, 18], look: [-2, 0, -10] },
  { t: 0.7, pos: [0, -2, 20], look: [0, -1, -5] },
  { t: 0.85, pos: [-5, 0, 15], look: [0, 0, -5] },
  { t: 1.0, pos: [0, 0, 12], look: [0, 0, 0] },
];

function lerpWaypoints(progress: number) {
  let i = 0;
  for (let j = 1; j < WAYPOINTS.length; j++) {
    if (progress <= WAYPOINTS[j].t) {
      i = j - 1;
      break;
    }
    if (j === WAYPOINTS.length - 1) i = j - 1;
  }

  const a = WAYPOINTS[i];
  const b = WAYPOINTS[Math.min(i + 1, WAYPOINTS.length - 1)];
  const range = b.t - a.t;
  const local = range > 0 ? (progress - a.t) / range : 0;
  const t = Math.max(0, Math.min(1, local));

  // Smooth step interpolation
  const smooth = t * t * (3 - 2 * t);

  return {
    pos: a.pos.map((v, idx) => v + (b.pos[idx] - v) * smooth) as [number, number, number],
    look: a.look.map((v, idx) => v + (b.look[idx] - v) * smooth) as [number, number, number],
  };
}

export default function ScrollCameraController() {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 20));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const state = useCosmosStore.getState();
    const { pos, look } = lerpWaypoints(state.scrollProgress);

    // Mouse parallax offset
    const parallaxX = state.mouseX * 0.8;
    const parallaxY = state.mouseY * 0.4;

    targetPos.current.set(pos[0] + parallaxX, pos[1] + parallaxY, pos[2]);
    targetLook.current.set(look[0], look[1], look[2]);

    // Smooth lerp camera
    camera.position.lerp(targetPos.current, 0.04);
    currentLook.current.lerp(targetLook.current, 0.04);
    camera.lookAt(currentLook.current);
  });

  return null;
}
