"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useCosmosStore } from "@/lib/cosmosStore";

const CosmosScene = dynamic(() => import("@/components/3d/CosmosScene"), {
  ssr: false,
  loading: () => null,
});

function CSSFallback() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050510]">
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 animate-pulse-slow"
        style={{
          background: "radial-gradient(circle, #EF0107 0%, transparent 70%)",
          top: "20%",
          left: "30%",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 animate-pulse-slow"
        style={{
          background: "radial-gradient(circle, #9C824A 0%, transparent 70%)",
          top: "50%",
          right: "20%",
          filter: "blur(60px)",
          animationDelay: "1.5s",
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-10 animate-float"
        style={{
          background: "radial-gradient(circle, #ff4444 0%, transparent 70%)",
          bottom: "20%",
          left: "50%",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}

export default function CosmosBackground() {
  const [use3D, setUse3D] = useState(false);

  useScrollProgress();
  useMousePosition();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    const noWebGL = (() => {
      try {
        const c = document.createElement("canvas");
        return !c.getContext("webgl2") && !c.getContext("webgl");
      } catch {
        return true;
      }
    })();

    const shouldUse3D = !isMobile && !isLowEnd && !noWebGL;
    setUse3D(shouldUse3D);
    useCosmosStore.getState().setIsMobile(isMobile);
  }, []);

  return use3D ? <CosmosScene /> : <CSSFallback />;
}
