"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ARSENAL_RED = new THREE.Color("#EF0107");
const WHITE = new THREE.Color("#FFFFFF");
const GOLD = new THREE.Color("#9C824A");

interface CrowdProps {
  count?: number;
}

/**
 * Crowd zones match the new StandSection tiered geometry.
 * Each stand has lower bowl (tiers 0-3.6y, depth 0-2.7 outward)
 * and upper bowl (4.4-7.2y, depth 3.9-5.9 outward).
 * Plus corner sections.
 */
interface Zone {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  zMin: number;
  zMax: number;
}

// Stand inner faces: North/South at ±8, East/West at ±11
// StandSection places geometry outward from inner face.
function getStandZones(): Zone[] {
  return [
    // NORTH STAND — lower bowl (faces south, geometry goes -Z)
    { xMin: -10, xMax: 10, yMin: 0.5, yMax: 3.5, zMin: -11, zMax: -8.5 },
    // NORTH STAND — upper bowl
    { xMin: -10, xMax: 10, yMin: 4.5, yMax: 7, zMin: -12.5, zMax: -10 },

    // SOUTH STAND — lower bowl (faces north, geometry goes +Z)
    { xMin: -10, xMax: 10, yMin: 0.5, yMax: 3.5, zMin: 8.5, zMax: 11 },
    // SOUTH STAND — upper bowl
    { xMin: -10, xMax: 10, yMin: 4.5, yMax: 7, zMin: 10, zMax: 12.5 },

    // WEST STAND — lower bowl (faces east, geometry goes -X)
    { xMin: -14, xMax: -11.5, yMin: 0.5, yMax: 3.5, zMin: -7, zMax: 7 },
    // WEST STAND — upper bowl
    { xMin: -15.5, xMax: -13, yMin: 4.5, yMax: 7, zMin: -7, zMax: 7 },

    // EAST STAND — lower bowl (faces west, geometry goes +X)
    { xMin: 11.5, xMax: 14, yMin: 0.5, yMax: 3.5, zMin: -7, zMax: 7 },
    // EAST STAND — upper bowl
    { xMin: 13, xMax: 15.5, yMin: 4.5, yMax: 7, zMin: -7, zMax: 7 },

    // CORNERS — NW
    { xMin: -13, xMax: -10, yMin: 0.5, yMax: 6, zMin: -11, zMax: -8 },
    // CORNERS — NE
    { xMin: 10, xMax: 13, yMin: 0.5, yMax: 6, zMin: -11, zMax: -8 },
    // CORNERS — SW
    { xMin: -13, xMax: -10, yMin: 0.5, yMax: 6, zMin: 8, zMax: 11 },
    // CORNERS — SE
    { xMin: 10, xMax: 13, yMin: 0.5, yMax: 6, zMin: 8, zMax: 11 },
  ];
}

export default function Crowd({ count = 3000 }: CrowdProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const basePositions = useRef<THREE.Vector3[]>([]);

  useEffect(() => {
    if (!meshRef.current) return;

    const tempMatrix = new THREE.Matrix4();
    const positions: THREE.Vector3[] = [];
    const zones = getStandZones();

    for (let i = 0; i < count; i++) {
      const zone = zones[i % zones.length];
      const x = zone.xMin + Math.random() * (zone.xMax - zone.xMin);
      const y = zone.yMin + Math.random() * (zone.yMax - zone.yMin);
      const z = zone.zMin + Math.random() * (zone.zMax - zone.zMin);

      const pos = new THREE.Vector3(x, y, z);
      positions.push(pos);

      tempMatrix.setPosition(x, y, z);
      meshRef.current.setMatrixAt(i, tempMatrix);

      // Color: 55% red, 30% white, 15% gold
      const r = Math.random();
      const color = r < 0.55 ? ARSENAL_RED : r < 0.85 ? WHITE : GOLD;
      meshRef.current.setColorAt(i, color);
    }

    basePositions.current = positions;
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [count]);

  // Wave animation
  useFrame(({ clock }) => {
    if (!meshRef.current || basePositions.current.length === 0) return;
    const time = clock.elapsedTime;
    const tempMatrix = new THREE.Matrix4();

    for (let i = 0; i < count; i++) {
      const base = basePositions.current[i];
      if (!base) continue;
      const wave =
        Math.sin(time * 2.5 + base.x * 0.4 + base.z * 0.3) * 0.08;
      tempMatrix.setPosition(base.x, base.y + wave, base.z);
      meshRef.current.setMatrixAt(i, tempMatrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 6, 6]} />
      <meshStandardMaterial roughness={0.8} />
    </instancedMesh>
  );
}
