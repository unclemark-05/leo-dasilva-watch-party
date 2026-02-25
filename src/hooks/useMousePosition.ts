"use client";

import { useEffect } from "react";
import { useCosmosStore } from "@/lib/cosmosStore";

export function useMousePosition() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      useCosmosStore.getState().setMouse(x, y);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
}
