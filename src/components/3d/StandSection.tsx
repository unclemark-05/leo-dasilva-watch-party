"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  createSeatTexture,
  createConcreteMaterial,
  createRoofMaterial,
  createFasciaMaterial,
  createRoofProfile,
} from "./stadiumMaterials";

interface StandSectionProps {
  /** Length of the stand (along its face) */
  length: number;
  /** Position of the stand group center */
  position: [number, number, number];
  /** Rotation in radians around Y axis */
  rotationY?: number;
  /** Distance from pitch edge to the inner face of the lower bowl */
  innerOffset?: number;
}

/**
 * A realistic tiered stadium stand:
 * - 3 lower bowl tiers (angled upward)
 * - LED fascia strip at top of lower bowl
 * - Concourse gap
 * - 2 upper bowl tiers (steeper angle)
 * - Curved roof cantilever
 * - Roof support columns
 */
export default function StandSection({
  length,
  position,
  rotationY = 0,
  innerOffset = 0,
}: StandSectionProps) {
  // Pre-create materials once
  const materials = useMemo(() => {
    const seatTex = createSeatTexture();
    return {
      seat: new THREE.MeshStandardMaterial({
        map: seatTex,
        roughness: 0.7,
        metalness: 0.1,
      }),
      seatUpper: (() => {
        const tex = createSeatTexture("#CC0006", "#FFFFFF");
        return new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.7,
          metalness: 0.1,
        });
      })(),
      concrete: createConcreteMaterial(),
      roof: createRoofMaterial(),
      fascia: createFasciaMaterial(),
      tierBack: new THREE.MeshStandardMaterial({
        color: "#333333",
        roughness: 0.85,
        metalness: 0.05,
      }),
    };
  }, []);

  // Roof geometry via ExtrudeGeometry
  const roofGeometry = useMemo(() => {
    const profile = createRoofProfile(4.5, 0.18, 0.8);
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      steps: 1,
      depth: length,
      bevelEnabled: false,
    };
    const geo = new THREE.ExtrudeGeometry(profile, extrudeSettings);
    // Center the extrusion along its depth
    geo.translate(0, 0, -length / 2);
    return geo;
  }, [length]);

  // Lower bowl tier dimensions
  const tierDepth = 0.9; // front-to-back of each tier
  const tierRise = 1.2; // height of each tier
  const lowerTiers = 3;

  // Upper bowl
  const upperTierDepth = 1.0;
  const upperTierRise = 1.4;
  const upperTiers = 2;

  const concourseHeight = 0.8;
  const concourseDepth = 1.2;

  // Calculate total height for roof placement
  const lowerHeight = lowerTiers * tierRise; // 3.6
  const upperBaseY = lowerHeight + concourseHeight; // 4.4
  const upperHeight = upperTiers * upperTierRise; // 2.8
  const totalHeight = upperBaseY + upperHeight; // 7.2

  // Total depth (distance from inner face outward)
  const lowerDepthTotal = lowerTiers * tierDepth; // 2.7
  const upperDepthTotal = upperTiers * upperTierDepth; // 2.0

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* ===== LOWER BOWL (3 tiers, angled) ===== */}
      {Array.from({ length: lowerTiers }).map((_, i) => {
        const y = i * tierRise + tierRise / 2;
        const z = innerOffset + i * tierDepth + tierDepth / 2;
        return (
          <group key={`lower-${i}`}>
            {/* Tier face (visible seats) */}
            <mesh position={[0, y, z]}>
              <boxGeometry args={[length, tierRise, tierDepth]} />
              <primitive object={materials.seat} attach="material" />
            </mesh>
            {/* Row divider line (subtle horizontal groove) */}
            <mesh position={[0, y + tierRise / 2 - 0.02, z - tierDepth / 2 - 0.01]}>
              <boxGeometry args={[length - 0.2, 0.04, 0.04]} />
              <primitive object={materials.concrete} attach="material" />
            </mesh>
          </group>
        );
      })}

      {/* ===== LED FASCIA STRIP at top of lower bowl ===== */}
      <mesh position={[0, lowerHeight + 0.1, innerOffset - 0.05]}>
        <boxGeometry args={[length + 0.4, 0.25, 0.12]} />
        <primitive object={materials.fascia} attach="material" />
      </mesh>

      {/* ===== CONCOURSE (gap between lower and upper bowl) ===== */}
      <mesh
        position={[
          0,
          lowerHeight + concourseHeight / 2,
          innerOffset + lowerDepthTotal + concourseDepth / 2,
        ]}
      >
        <boxGeometry args={[length, concourseHeight, concourseDepth]} />
        <primitive object={materials.concrete} attach="material" />
      </mesh>

      {/* Concourse railing */}
      <mesh position={[0, upperBaseY + 0.08, innerOffset + lowerDepthTotal - 0.1]}>
        <boxGeometry args={[length + 0.2, 0.16, 0.08]} />
        <primitive object={materials.tierBack} attach="material" />
      </mesh>

      {/* ===== UPPER BOWL (2 tiers, steeper) ===== */}
      {Array.from({ length: upperTiers }).map((_, i) => {
        const y = upperBaseY + i * upperTierRise + upperTierRise / 2;
        const z =
          innerOffset +
          lowerDepthTotal +
          concourseDepth +
          i * upperTierDepth +
          upperTierDepth / 2;
        return (
          <group key={`upper-${i}`}>
            <mesh position={[0, y, z]}>
              <boxGeometry args={[length, upperTierRise, upperTierDepth]} />
              <primitive object={materials.seatUpper} attach="material" />
            </mesh>
            {/* Row divider */}
            <mesh position={[0, y + upperTierRise / 2 - 0.02, z - upperTierDepth / 2 - 0.01]}>
              <boxGeometry args={[length - 0.2, 0.04, 0.04]} />
              <primitive object={materials.concrete} attach="material" />
            </mesh>
          </group>
        );
      })}

      {/* ===== BACK WALL (behind upper bowl) ===== */}
      {(() => {
        const backZ =
          innerOffset +
          lowerDepthTotal +
          concourseDepth +
          upperDepthTotal +
          0.15;
        return (
          <mesh position={[0, totalHeight / 2, backZ]}>
            <boxGeometry args={[length + 0.4, totalHeight, 0.3]} />
            <primitive object={materials.tierBack} attach="material" />
          </mesh>
        );
      })()}

      {/* ===== CURVED ROOF CANTILEVER ===== */}
      {(() => {
        const roofZ = innerOffset - 0.3;
        return (
          <mesh
            geometry={roofGeometry}
            position={[0, totalHeight + 0.3, roofZ]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <primitive object={materials.roof} attach="material" />
          </mesh>
        );
      })()}

      {/* ===== ROOF SUPPORT COLUMNS ===== */}
      {(() => {
        const columnCount = Math.max(2, Math.floor(length / 5));
        const spacing = length / (columnCount + 1);
        const backZ =
          innerOffset +
          lowerDepthTotal +
          concourseDepth +
          upperDepthTotal;
        return Array.from({ length: columnCount }).map((_, i) => {
          const x = -length / 2 + spacing * (i + 1);
          return (
            <mesh
              key={`col-${i}`}
              position={[x, totalHeight / 2 + 0.15, backZ]}
            >
              <cylinderGeometry args={[0.12, 0.15, totalHeight + 0.3, 8]} />
              <primitive object={materials.tierBack} attach="material" />
            </mesh>
          );
        });
      })()}

      {/* ===== VIP WINDOWS (glass strip at concourse level) ===== */}
      <mesh
        position={[
          0,
          lowerHeight + concourseHeight / 2,
          innerOffset + lowerDepthTotal - 0.05,
        ]}
      >
        <boxGeometry args={[length * 0.6, concourseHeight * 0.6, 0.08]} />
        <meshStandardMaterial
          color="#88bbff"
          transparent
          opacity={0.25}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}
