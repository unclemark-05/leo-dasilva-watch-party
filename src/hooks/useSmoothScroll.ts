"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCosmosStore } from "@/lib/cosmosStore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({ duration: 1.2 });
    lenisRef.current = lenis;

    const store = useCosmosStore.getState();

    lenis.on("scroll", () => {
      ScrollTrigger.update();

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      useCosmosStore.getState().setScrollProgress(progress);
      useCosmosStore
        .getState()
        .setScrollDirection(lenis.direction >= 0 ? "down" : "up");
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
}
