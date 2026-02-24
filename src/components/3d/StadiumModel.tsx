"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import Pitch from "./Pitch";
import StandSection from "./StandSection";
import { createConcreteMaterial, createRoofMaterial } from "./stadiumMaterials";

// Hotspot names — used for click detection
export type HotspotName =
  | "ball"
  | "bench"
  | "scoreboard"
  | "stands"
  | "vip"
  | "tunnel"
  | "cannon";

interface StadiumModelProps {
  onHotspotClick: (name: HotspotName) => void;
  activeHotspot: HotspotName | null;
}

// Clickable mesh wrapper with hover effect
function Hotspot({
  name,
  position,
  children,
  onClick,
  isActive,
}: {
  name: HotspotName;
  position: [number, number, number];
  children: React.ReactNode;
  onClick: (name: HotspotName) => void;
  isActive: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(name);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      {children}
      {/* Glow ring indicator */}
      {!isActive && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1, 32]} />
          <meshBasicMaterial
            color="#EF0107"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

// Goal structure
function Goal({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[-1.2, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[1.2, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 2.4, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Net */}
      <mesh position={[0, 0.6, -0.3]}>
        <planeGeometry args={[2.4, 1.2]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>
    </group>
  );
}

/**
 * Curved corner section connecting two adjacent stands.
 * Uses a cylinder quarter-section with seat texture.
 */
function CornerSection({
  position,
  rotationY,
  height,
  radius,
}: {
  position: [number, number, number];
  rotationY: number;
  height: number;
  radius: number;
}) {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#D40006",
        roughness: 0.7,
        metalness: 0.15,
      }),
    []
  );

  const upperMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#B80005",
        roughness: 0.7,
        metalness: 0.15,
      }),
    []
  );

  const roofMat = useMemo(() => createRoofMaterial(), []);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Lower bowl corner — quarter cylinder */}
      <mesh position={[0, height * 0.25, 0]}>
        <cylinderGeometry
          args={[radius, radius, height * 0.5, 12, 1, false, 0, Math.PI / 2]}
        />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Upper bowl corner */}
      <mesh position={[0, height * 0.65, 0]}>
        <cylinderGeometry
          args={[
            radius + 0.5,
            radius + 0.3,
            height * 0.35,
            12,
            1,
            false,
            0,
            Math.PI / 2,
          ]}
        />
        <primitive object={upperMaterial} attach="material" />
      </mesh>
      {/* Corner roof cap */}
      <mesh
        position={[0, height + 0.4, 0]}
        rotation={[0, 0, 0]}
      >
        <cylinderGeometry
          args={[
            radius + 2.5,
            radius + 2.5,
            0.18,
            12,
            1,
            false,
            0,
            Math.PI / 2,
          ]}
        />
        <primitive object={roofMat} attach="material" />
      </mesh>
    </group>
  );
}

/**
 * Entrance gate structure.
 */
function EntranceGate({
  position,
  rotationY = 0,
}: {
  position: [number, number, number];
  rotationY?: number;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Left pillar */}
      <mesh position={[-1.2, 1.5, 0]}>
        <boxGeometry args={[0.3, 3, 0.4]} />
        <meshStandardMaterial color="#555" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[1.2, 1.5, 0]}>
        <boxGeometry args={[0.3, 3, 0.4]} />
        <meshStandardMaterial color="#555" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Arch / lintel */}
      <mesh position={[0, 3.1, 0]}>
        <boxGeometry args={[2.7, 0.25, 0.5]} />
        <meshStandardMaterial
          color="#EF0107"
          emissive="#EF0107"
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>
      {/* Gate opening (dark) */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[2.1, 2.6, 0.3]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function StadiumModel({
  onHotspotClick,
  activeHotspot,
}: StadiumModelProps) {
  const concreteMat = useMemo(() => createConcreteMaterial(), []);

  // Stand layout dimensions
  // Pitch is 20 x 14, so stands sit outside that boundary
  const pitchHalfW = 10; // ±X
  const pitchHalfH = 7; // ±Z

  // How far the inner face of each stand is from center
  const nsInner = 8; // North/South stand inner Z offset
  const ewInner = 11; // East/West stand inner X offset

  return (
    <group>
      <Pitch />

      {/* ===== NORTH STAND (behind north goal, faces south) ===== */}
      <StandSection
        length={22}
        position={[0, 0, -nsInner]}
        rotationY={Math.PI} // Face inward toward pitch
        innerOffset={0}
      />

      {/* ===== SOUTH STAND (behind south goal, faces north) ===== */}
      <StandSection
        length={22}
        position={[0, 0, nsInner]}
        rotationY={0}
        innerOffset={0}
      />

      {/* ===== WEST STAND (side stand, faces east) ===== */}
      <StandSection
        length={16}
        position={[-ewInner, 0, 0]}
        rotationY={Math.PI / 2}
        innerOffset={0}
      />

      {/* ===== EAST STAND (side stand, faces west) ===== */}
      <StandSection
        length={16}
        position={[ewInner, 0, 0]}
        rotationY={-Math.PI / 2}
        innerOffset={0}
      />

      {/* ===== CURVED CORNERS ===== */}
      {/* NW corner */}
      <CornerSection
        position={[-ewInner + 0.5, 0, -nsInner + 0.5]}
        rotationY={Math.PI}
        height={7.2}
        radius={3}
      />
      {/* NE corner */}
      <CornerSection
        position={[ewInner - 0.5, 0, -nsInner + 0.5]}
        rotationY={-Math.PI / 2}
        height={7.2}
        radius={3}
      />
      {/* SW corner */}
      <CornerSection
        position={[-ewInner + 0.5, 0, nsInner - 0.5]}
        rotationY={Math.PI / 2}
        height={7.2}
        radius={3}
      />
      {/* SE corner */}
      <CornerSection
        position={[ewInner - 0.5, 0, nsInner - 0.5]}
        rotationY={0}
        height={7.2}
        radius={3}
      />

      {/* ===== PERIMETER PATHWAY ===== */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
      >
        <ringGeometry args={[13.5, 15, 64]} />
        <primitive object={concreteMat} attach="material" />
      </mesh>

      {/* ===== ENTRANCE GATES ===== */}
      {/* North gate (tunnel entrance) */}
      <EntranceGate position={[0, 0, -nsInner - 6]} rotationY={0} />
      {/* South gate */}
      <EntranceGate position={[0, 0, nsInner + 6]} rotationY={Math.PI} />
      {/* West gate */}
      <EntranceGate position={[-ewInner - 6, 0, 0]} rotationY={Math.PI / 2} />
      {/* East gate */}
      <EntranceGate position={[ewInner + 6, 0, 0]} rotationY={-Math.PI / 2} />

      {/* ===== GOALS ===== */}
      <Goal position={[-pitchHalfW, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Goal position={[pitchHalfW, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* ===== HOTSPOT: Ball (center of pitch) — Fixture info ===== */}
      <Hotspot
        name="ball"
        position={[0, 0.5, 0]}
        onClick={onHotspotClick}
        isActive={activeHotspot === "ball"}
      >
        <mesh>
          <icosahedronGeometry args={[0.5, 2]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.2}
            metalness={0.1}
            roughness={0.3}
          />
        </mesh>
        <mesh
          position={[0, 1.2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[2.5, 0.5]} />
          <meshBasicMaterial
            color="#EF0107"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Hotspot>

      {/* ===== HOTSPOT: Bench/Dugout (west side) — Players ===== */}
      <Hotspot
        name="bench"
        position={[-8, 0.3, -7.5]}
        onClick={onHotspotClick}
        isActive={activeHotspot === "bench"}
      >
        {/* Dugout shelter */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[4, 1.2, 1]} />
          <meshStandardMaterial color="#023474" metalness={0.3} roughness={0.5} />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 1.3, 0]}>
          <boxGeometry args={[4.5, 0.1, 1.5]} />
          <meshStandardMaterial color="#023474" metalness={0.4} roughness={0.4} />
        </mesh>
        {/* Seats */}
        {[-1.5, -0.5, 0.5, 1.5].map((x) => (
          <mesh key={x} position={[x, 0.35, 0]}>
            <boxGeometry args={[0.4, 0.5, 0.4]} />
            <meshStandardMaterial color="#EF0107" />
          </mesh>
        ))}
      </Hotspot>

      {/* Second dugout (away team) */}
      <group position={[8, 0.3, -7.5]}>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[4, 1.2, 1]} />
          <meshStandardMaterial color="#333" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.3, 0]}>
          <boxGeometry args={[4.5, 0.1, 1.5]} />
          <meshStandardMaterial color="#333" metalness={0.4} roughness={0.4} />
        </mesh>
      </group>

      {/* ===== HOTSPOT: Scoreboard (north stand top) — Live Scores ===== */}
      <Hotspot
        name="scoreboard"
        position={[0, 7.5, -9]}
        onClick={onHotspotClick}
        isActive={activeHotspot === "scoreboard"}
      >
        <mesh>
          <boxGeometry args={[6, 2, 0.3]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 0, 0.2]}>
          <planeGeometry args={[5.5, 1.6]} />
          <meshBasicMaterial color="#EF0107" transparent opacity={0.6} />
        </mesh>
      </Hotspot>

      {/* ===== HOTSPOT: Stands (south stand center) — Community ===== */}
      <Hotspot
        name="stands"
        position={[0, 3.5, 9]}
        onClick={onHotspotClick}
        isActive={activeHotspot === "stands"}
      >
        <mesh>
          <boxGeometry args={[5, 2, 0.5]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.15}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Hotspot>

      {/* ===== HOTSPOT: VIP Box (east stand upper) — Events ===== */}
      <Hotspot
        name="vip"
        position={[12, 5.5, 0]}
        onClick={onHotspotClick}
        isActive={activeHotspot === "vip"}
      >
        <mesh>
          <boxGeometry args={[1, 2, 3]} />
          <meshStandardMaterial
            color="#9C824A"
            emissive="#9C824A"
            emissiveIntensity={0.2}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      </Hotspot>

      {/* ===== HOTSPOT: Tunnel (north stand bottom center) — About Leo ===== */}
      <Hotspot
        name="tunnel"
        position={[0, 1, -8.2]}
        onClick={onHotspotClick}
        isActive={activeHotspot === "tunnel"}
      >
        <mesh>
          <boxGeometry args={[2.5, 2, 0.5]} />
          <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.6} />
        </mesh>
        {/* Tunnel arch */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[2.5, 0.3, 0.6]} />
          <meshStandardMaterial
            color="#EF0107"
            emissive="#EF0107"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Hotspot>

      {/* ===== HOTSPOT: Cannon (top of north stand) — Articles/News ===== */}
      <Hotspot
        name="cannon"
        position={[0, 9, -11]}
        onClick={onHotspotClick}
        isActive={activeHotspot === "cannon"}
      >
        {/* Cannon barrel */}
        <mesh rotation={[0, 0, Math.PI / 10]}>
          <cylinderGeometry args={[0.25, 0.18, 3, 12]} />
          <meshStandardMaterial
            color="#EF0107"
            emissive="#EF0107"
            emissiveIntensity={0.4}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* Cannon base */}
        <mesh position={[-0.4, -0.6, 0]}>
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshStandardMaterial
            color="#EF0107"
            emissive="#EF0107"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* Wheel */}
        <mesh position={[-0.3, -0.5, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.45, 0.1, 8, 16]} />
          <meshStandardMaterial
            color="#EF0107"
            emissive="#EF0107"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </Hotspot>

      {/* ===== Ground plane ===== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[50, 40]} />
        <meshStandardMaterial color="#0a0a18" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[100, 80]} />
        <meshStandardMaterial color="#050510" />
      </mesh>
    </group>
  );
}
