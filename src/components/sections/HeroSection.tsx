"use client";

import { useEffect, useRef } from "react";
import { HOST, SITE } from "@/lib/constants";
import { useCosmosStore } from "@/lib/cosmosStore";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for particle assembly (2s) then animate text in
    const timeout = setTimeout(() => {
      const elements = [taglineRef.current, titleRef.current, subtitleRef.current, scrollRef.current];
      elements.forEach((el, i) => {
        if (!el) return;
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, i * 200);
      });
    }, 2000);

    // Subscribe to loaded state for immediate show if already loaded
    const unsub = useCosmosStore.subscribe((state) => {
      if (state.isLoaded) {
        clearTimeout(timeout);
        const elements = [taglineRef.current, titleRef.current, subtitleRef.current, scrollRef.current];
        elements.forEach((el, i) => {
          if (!el) return;
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, i * 200);
        });
      }
    });

    return () => {
      clearTimeout(timeout);
      unsub();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center text-center pointer-events-none"
    >
      <p
        ref={taglineRef}
        className="text-xs font-semibold uppercase tracking-[0.3em] text-arsenal-gold drop-shadow-lg transition-all duration-700 opacity-0 translate-y-4"
      >
        Hosted by {HOST.name}
      </p>
      <h1
        ref={titleRef}
        className="mt-3 text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-white font-heading drop-shadow-[0_2px_30px_rgba(239,1,7,0.5)] transition-all duration-700 opacity-0 translate-y-6"
      >
        {SITE.shortName}
      </h1>
      <p
        ref={subtitleRef}
        className="mt-3 text-base sm:text-lg text-white/50 font-sans normal-case drop-shadow-lg max-w-md transition-all duration-700 opacity-0 translate-y-4"
      >
        {SITE.tagline}
      </p>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 flex flex-col items-center gap-2 transition-all duration-700 opacity-0 translate-y-4"
      >
        <span className="text-xs text-white/30 uppercase tracking-widest font-sans">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse-slow" />
      </div>
    </section>
  );
}
