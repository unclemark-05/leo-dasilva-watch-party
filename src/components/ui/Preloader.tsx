"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCosmosStore } from "@/lib/cosmosStore";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barWrapRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const exitPlayed = useRef(false);

  const preloaderDone = useCosmosStore((s) => s.preloaderDone);
  const isLoaded = useCosmosStore((s) => s.isLoaded);

  // Simulate loading progress, accelerate when 3D scene signals isLoaded
  useEffect(() => {
    if (preloaderDone) return;

    let current = 0;
    const interval = setInterval(() => {
      const loaded = useCosmosStore.getState().isLoaded;
      const step = loaded
        ? Math.random() * 15 + 10
        : current < 70
          ? Math.random() * 10 + 4
          : Math.random() * 4 + 1;
      current = Math.min(current + step, 100);
      const rounded = Math.round(current);
      setProgress(rounded);
      useCosmosStore.getState().setLoadProgress(rounded);
      if (rounded >= 100) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, [preloaderDone]);

  // Play exit animation when progress reaches 100
  useEffect(() => {
    if (progress < 100 || exitPlayed.current) return;
    exitPlayed.current = true;

    const tl = gsap.timeline({
      onComplete: () => useCosmosStore.getState().setPreloaderDone(true),
    });

    tl.to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
    });

    tl.to(
      barWrapRef.current,
      { opacity: 0, duration: 0.2 },
      "-=0.1"
    );

    tl.to(counterRef.current, { opacity: 0, duration: 0.2 }, "<");

    // Iris-wipe exit
    tl.to(preloaderRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 0.8,
      ease: "power3.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [progress]);

  if (preloaderDone) return null;

  return (
    <div
      ref={preloaderRef}
      className="preloader"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
    >
      <div ref={textRef} className="preloader-text">
        LDWP
      </div>
      <div ref={barWrapRef} className="preloader-bar">
        <div
          className="preloader-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span ref={counterRef} className="preloader-counter">
        {progress}%
      </span>
    </div>
  );
}
