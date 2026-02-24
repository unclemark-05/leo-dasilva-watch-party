"use client";

import { useRef } from "react";
import * as THREE from "three";
import Pitch from "./Pitch";

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
          <meshBasicMaterial color="#EF0107" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

// Goal structure
function Goal({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
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
      {/* Net (simple plane) */}
      <mesh position={[0, 0.6, -0.3]}>
        <planeGeometry args={[2.4, 1.2]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} side={THREE.DoubleSide} wireframe />
      </mesh>
    </group>
  );
}

export default function StadiumModel({ onHotspotClick, activeHotspot }: StadiumModelProps) {
  return (
    <group>
      <Pitch />

      {/* ===== NORTH STAND (main stand) ===== */}
      {/* Lower tier */}
      <mesh position={[0, 2.5, -9]}>
        <boxGeometry args={[24, 5, 2]} />
        <meshStandardMaterial color="#EF0107" metalness={0.15} roughness={0.7} />
      </mesh>
      {/* Upper tier */}
      <mesh position={[0, 6, -9.8]}>
        <boxGeometry args={[24, 3, 2.5]} />
        <meshStandardMaterial color="#CC0006" metalness={0.15} roughness={0.7} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 8, -10.2]}>
        <boxGeometry args={[25, 0.25, 4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Seat rows (subtle horizontal lines) */}
      {[1.5, 2.5, 3.5, 4.5].map((y) => (
        <mesh key={y} position={[0, y, -7.95]}>
          <boxGeometry args={[22, 0.05, 0.05]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
        </mesh>
      ))}

      {/* ===== SOUTH STAND ===== */}
      <mesh position={[0, 2.5, 9]}>
        <boxGeometry args={[24, 5, 2]} />
        <meshStandardMaterial color="#EF0107" metalness={0.15} roughness={0.7} />
      </mesh>
      <mesh position={[0, 6, 9.8]}>
        <boxGeometry args={[24, 3, 2.5]} />
        <meshStandardMaterial color="#CC0006" metalness={0.15} roughness={0.7} />
      </mesh>
      <mesh position={[0, 8, 10.2]}>
        <boxGeometry args={[25, 0.25, 4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* ===== WEST STAND ===== */}
      <mesh position={[-12, 2.5, 0]}>
        <boxGeometry args={[2, 5, 18]} />
        <meshStandardMaterial color="#EF0107" metalness={0.15} roughness={0.7} />
      </mesh>
      <mesh position={[-12.8, 6, 0]}>
        <boxGeometry args={[2.5, 3, 18]} />
        <meshStandardMaterial color="#CC0006" metalness={0.15} roughness={0.7} />
      </mesh>
      <mesh position={[-13.2, 8, 0]}>
        <boxGeometry args={[4, 0.25, 19]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* ===== EAST STAND ===== */}
      <mesh position={[12, 2.5, 0]}>
        <boxGeometry args={[2, 5, 18]} />
        <meshStandardMaterial color="#EF0107" metalness={0.15} roughness={0.7} />
      </mesh>
      <mesh position={[12.8, 6, 0]}>
        <boxGeometry args={[2.5, 3, 18]} />
        <meshStandardMaterial color="#CC0006" metalness={0.15} roughness={0.7} />
      </mesh>
      <mesh position={[13.2, 8, 0]}>
        <boxGeometry args={[4, 0.25, 19]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* ===== CORNERS ===== */}
      {[
        [-11, 2.5, -8],
        [11, 2.5, -8],
        [-11, 2.5, 8],
        [11, 2.5, 8],
      ].map((pos, i) => (
        <group key={i}>
          <mesh position={pos as [number, number, number]}>
            <boxGeometry args={[2.5, 5, 2.5]} />
            <meshStandardMaterial color="#D40006" metalness={0.15} roughness={0.7} />
          </mesh>
          <mesh position={[pos[0] * 1.05, 6, pos[2] * 1.05] as [number, number, number]}>
            <boxGeometry args={[3, 3, 3]} />
            <meshStandardMaterial color="#B80005" metalness={0.15} roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* ===== GOALS ===== */}
      <Goal position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Goal position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* ===== HOTSPOT: Ball (center of pitch) — Fixture info ===== */}
      <Hotspot name="ball" position={[0, 0.5, 0]} onClick={onHotspotClick} isActive={activeHotspot === "ball"}>
        <mesh>
          <icosahedronGeometry args={[0.5, 2]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} metalness={0.1} roughness={0.3} />
        </mesh>
        {/* Floating label */}
        <mesh position={[0, 1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.5, 0.5]} />
          <meshBasicMaterial color="#EF0107" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
      </Hotspot>

      {/* ===== HOTSPOT: Bench/Dugout (west side) — Players ===== */}
      <Hotspot name="bench" position={[-8, 0.3, -7.5]} onClick={onHotspotClick} isActive={activeHotspot === "bench"}>
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
      <Hotspot name="scoreboard" position={[0, 7.2, -8.5]} onClick={onHotspotClick} isActive={activeHotspot === "scoreboard"}>
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
      <Hotspot name="stands" position={[0, 3.5, 8.5]} onClick={onHotspotClick} isActive={activeHotspot === "stands"}>
        {/* Highlighted section of seats */}
        <mesh>
          <boxGeometry args={[5, 2, 0.5]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.15} transparent opacity={0.7} />
        </mesh>
      </Hotspot>

      {/* ===== HOTSPOT: VIP Box (east stand upper) — Events ===== */}
      <Hotspot name="vip" position={[12.5, 5.5, 0]} onClick={onHotspotClick} isActive={activeHotspot === "vip"}>
        <mesh>
          <boxGeometry args={[1, 2, 3]} />
          <meshStandardMaterial color="#9C824A" emissive="#9C824A" emissiveIntensity={0.2} metalness={0.5} roughness={0.3} />
        </mesh>
      </Hotspot>

      {/* ===== HOTSPOT: Tunnel (north stand bottom center) — About Leo ===== */}
      <Hotspot name="tunnel" position={[0, 1, -7.8]} onClick={onHotspotClick} isActive={activeHotspot === "tunnel"}>
        <mesh>
          <boxGeometry args={[2.5, 2, 0.5]} />
          <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.6} />
        </mesh>
        {/* Tunnel arch */}
        <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[2.5, 0.3, 0.6]} />
          <meshStandardMaterial color="#EF0107" emissive="#EF0107" emissiveIntensity={0.3} />
        </mesh>
      </Hotspot>

      {/* ===== HOTSPOT: Cannon (top of north stand) — Articles/News ===== */}
      <Hotspot name="cannon" position={[0, 9.5, -10.5]} onClick={onHotspotClick} isActive={activeHotspot === "cannon"}>
        {/* Cannon barrel */}
        <mesh rotation={[0, 0, Math.PI / 10]}>
          <cylinderGeometry args={[0.25, 0.18, 3, 12]} />
          <meshStandardMaterial color="#EF0107" emissive="#EF0107" emissiveIntensity={0.4} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Cannon base */}
        <mesh position={[-0.4, -0.6, 0]}>
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshStandardMaterial color="#EF0107" emissive="#EF0107" emissiveIntensity={0.3} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Wheel */}
        <mesh position={[-0.3, -0.5, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.45, 0.1, 8, 16]} />
          <meshStandardMaterial color="#EF0107" emissive="#EF0107" emissiveIntensity={0.3} metalness={0.7} roughness={0.3} />
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
