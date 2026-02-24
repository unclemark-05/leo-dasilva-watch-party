"use client";

import * as THREE from "three";

// Arsenal branding colors
const ARSENAL_RED = "#EF0107";
const ARSENAL_RED_DARK = "#CC0006";
const ARSENAL_WHITE = "#FFFFFF";

/**
 * Procedural seat texture — grid of red/white seat blocks.
 * Drawn once on a canvas, returned as a CanvasTexture.
 */
export function createSeatTexture(
  primaryColor = ARSENAL_RED,
  accentColor = ARSENAL_WHITE,
  size = 256
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Background — dark concrete between seats
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, size, size);

  const cols = 16;
  const rows = 12;
  const seatW = size / cols;
  const seatH = size / rows;
  const gap = 1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // 80% primary, 15% accent, 5% dark (empty seats)
      const rand = Math.random();
      if (rand < 0.05) continue; // empty seat
      ctx.fillStyle =
        rand < 0.8 ? primaryColor : rand < 0.95 ? accentColor : ARSENAL_RED_DARK;
      ctx.fillRect(
        c * seatW + gap,
        r * seatH + gap,
        seatW - gap * 2,
        seatH - gap * 2
      );
      // Subtle seat back highlight
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(c * seatW + gap, r * seatH + gap, seatW - gap * 2, 2);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 2);
  return tex;
}

/**
 * Procedural grass texture — alternating stripes with noise grain.
 */
export function createGrassTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const stripeCount = 10;
  const stripeH = size / stripeCount;
  const darkGreen = "#2a7d2a";
  const lightGreen = "#339933";

  for (let i = 0; i < stripeCount; i++) {
    ctx.fillStyle = i % 2 === 0 ? darkGreen : lightGreen;
    ctx.fillRect(0, i * stripeH, size, stripeH);
  }

  // Subtle grass grain noise
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
  }
  ctx.putImageData(imageData, 0, 0);

  // Faint white line texture (mowing pattern)
  ctx.strokeStyle = "rgba(255,255,255,0.03)";
  ctx.lineWidth = 1;
  for (let x = 0; x < size; x += 8) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/**
 * Concrete material — used for concourse, walkways, structural elements.
 */
export function createConcreteMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: "#555555",
    roughness: 0.9,
    metalness: 0.05,
  });
}

/**
 * Roof material — dark metallic titanium-look (Emirates roof style).
 */
export function createRoofMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: "#2a2a3e",
    metalness: 0.7,
    roughness: 0.2,
  });
}

/**
 * LED fascia / ribbon board material — emissive Arsenal red.
 */
export function createFasciaMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: ARSENAL_RED,
    emissive: ARSENAL_RED,
    emissiveIntensity: 0.8,
    metalness: 0.3,
    roughness: 0.4,
  });
}

/**
 * Roof cantilever profile — arc shape for ExtrudeGeometry.
 * Returns a THREE.Shape tracing the cross-section of a curved canopy.
 */
export function createRoofProfile(
  span: number,
  thickness = 0.15,
  curve = 0.6
): THREE.Shape {
  const shape = new THREE.Shape();
  // Start at inner edge (pitch side)
  shape.moveTo(0, 0);
  // Curve upward to outer edge
  shape.quadraticCurveTo(span * 0.5, curve, span, 0);
  // Bottom of roof
  shape.lineTo(span, -thickness);
  shape.quadraticCurveTo(span * 0.5, curve - thickness, 0, -thickness);
  shape.closePath();
  return shape;
}
