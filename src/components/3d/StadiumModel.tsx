"use client";

import Pitch from "./Pitch";

// Lower tier — the main seating bowl
function LowerTier({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#8B0000" metalness={0.2} roughness={0.8} />
    </mesh>
  );
}

// Upper tier — second level of seating
function UpperTier({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#6B0000" metalness={0.2} roughness={0.8} />
    </mesh>
  );
}

// Roof canopy
function Roof({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#222244" metalness={0.6} roughness={0.3} />
    </mesh>
  );
}

// Goal structure
function Goal({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Posts */}
      <mesh position={[-1.2, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[1.2, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Crossbar */}
      <mesh position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 2.4, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

// Arsenal cannon logo (simplified 3D)
function ArsenalCannon() {
  return (
    <group position={[0, 9, -10.5]} rotation={[0, 0, 0]}>
      {/* Cannon barrel */}
      <mesh rotation={[0, 0, Math.PI / 12]}>
        <cylinderGeometry args={[0.2, 0.15, 2.5, 12]} />
        <meshStandardMaterial color="#EF0107" emissive="#EF0107" emissiveIntensity={0.3} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Cannon wheel */}
      <mesh position={[-0.3, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.08, 8, 16]} />
        <meshStandardMaterial color="#EF0107" emissive="#EF0107" emissiveIntensity={0.3} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function StadiumModel() {
  return (
    <group>
      <Pitch />

      {/* ===== NORTH STAND (main stand with cannon) ===== */}
      <LowerTier position={[0, 2, -9]} size={[24, 4, 2]} />
      <UpperTier position={[0, 5.5, -9.5]} size={[24, 3, 2.5]} />
      <Roof position={[0, 7.5, -10]} size={[25, 0.2, 3.5]} />

      {/* ===== SOUTH STAND ===== */}
      <LowerTier position={[0, 2, 9]} size={[24, 4, 2]} />
      <UpperTier position={[0, 5.5, 9.5]} size={[24, 3, 2.5]} />
      <Roof position={[0, 7.5, 10]} size={[25, 0.2, 3.5]} />

      {/* ===== WEST STAND ===== */}
      <LowerTier position={[-12, 2, 0]} size={[2, 4, 18]} />
      <UpperTier position={[-12.5, 5.5, 0]} size={[2.5, 3, 18]} />
      <Roof position={[-13, 7.5, 0]} size={[3.5, 0.2, 19]} />

      {/* ===== EAST STAND ===== */}
      <LowerTier position={[12, 2, 0]} size={[2, 4, 18]} />
      <UpperTier position={[12.5, 5.5, 0]} size={[2.5, 3, 18]} />
      <Roof position={[13, 7.5, 0]} size={[3.5, 0.2, 19]} />

      {/* ===== CORNERS (curved fills) ===== */}
      {[
        [-11, 2.5, -8],
        [11, 2.5, -8],
        [-11, 2.5, 8],
        [11, 2.5, 8],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[2.5, 5, 2.5]} />
          <meshStandardMaterial color="#7B0000" metalness={0.2} roughness={0.8} />
        </mesh>
      ))}
      {/* Upper corners */}
      {[
        [-11.2, 5.5, -8.2],
        [11.2, 5.5, -8.2],
        [-11.2, 5.5, 8.2],
        [11.2, 5.5, 8.2],
      ].map((pos, i) => (
        <mesh key={`uc-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color="#5B0000" metalness={0.2} roughness={0.8} />
        </mesh>
      ))}

      {/* ===== GOALS ===== */}
      <Goal position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Goal position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* ===== ARSENAL CANNON ===== */}
      <ArsenalCannon />

      {/* ===== "ARSENAL" text panel (north stand face) ===== */}
      <mesh position={[0, 4, -7.9]}>
        <boxGeometry args={[8, 1.5, 0.1]} />
        <meshStandardMaterial color="#EF0107" emissive="#EF0107" emissiveIntensity={0.4} />
      </mesh>

      {/* ===== Tunnel entrance ===== */}
      <mesh position={[0, 0.8, -7.9]}>
        <boxGeometry args={[2, 1.6, 0.3]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* ===== Ground plane ===== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[50, 40]} />
        <meshStandardMaterial color="#0a0a18" />
      </mesh>

      {/* ===== Surrounding area (parking / roads) ===== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[80, 60]} />
        <meshStandardMaterial color="#060612" />
      </mesh>
    </group>
  );
}
