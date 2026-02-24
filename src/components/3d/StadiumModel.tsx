"use client";

import Pitch from "./Pitch";

function Stand({
  position,
  size,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  size: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
    </mesh>
  );
}

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
      <meshStandardMaterial
        color="#0f0f1f"
        metalness={0.5}
        roughness={0.4}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

export default function StadiumModel() {
  return (
    <group>
      <Pitch />

      {/* North stand */}
      <Stand position={[0, 3, -9]} size={[22, 6, 2]} />
      <Roof position={[0, 6.5, -9.5]} size={[23, 0.3, 3]} />

      {/* South stand */}
      <Stand position={[0, 3, 9]} size={[22, 6, 2]} />
      <Roof position={[0, 6.5, 9.5]} size={[23, 0.3, 3]} />

      {/* West stand */}
      <Stand position={[-12, 3, 0]} size={[2, 6, 18]} />
      <Roof position={[-12.5, 6.5, 0]} size={[3, 0.3, 19]} />

      {/* East stand */}
      <Stand position={[12, 3, 0]} size={[2, 6, 18]} />
      <Roof position={[12.5, 6.5, 0]} size={[3, 0.3, 19]} />

      {/* Corner fills */}
      {[
        [-11, 3, -8] as [number, number, number],
        [11, 3, -8] as [number, number, number],
        [-11, 3, 8] as [number, number, number],
        [11, 3, 8] as [number, number, number],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[2, 5, 2]} />
          <meshStandardMaterial color="#151530" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}

      {/* Ground plane under stadium */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[40, 30]} />
        <meshStandardMaterial color="#080818" />
      </mesh>
    </group>
  );
}
