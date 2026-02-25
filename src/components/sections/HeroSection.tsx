"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HOST, SITE } from "@/lib/constants";
import { useCosmosStore } from "@/lib/cosmosStore";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const animated = useRef(false);

  const preloaderDone = useCosmosStore((s) => s.preloaderDone);

  // GSAP master timeline — triggered when preloader finishes
  useEffect(() => {
    if (!preloaderDone || animated.current) return;
    animated.current = true;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      document
        .querySelectorAll(".hero-tagline, .hero-char, .hero-subtitle, .hero-scroll")
        .forEach((el) => {
          (el as HTMLElement).style.opacity = "1";
          (el as HTMLElement).style.transform = "none";
        });
      return;
    }

    const tl = gsap.timeline({ delay: 0.15 });

    // 1. Tagline: tracking-in animation (letter-spacing wide → narrow + fade)
    tl.fromTo(
      ".hero-tagline",
      { letterSpacing: "1em", opacity: 0 },
      { letterSpacing: "0.3em", opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // 2. "LDWP": each char clip-path reveal from bottom with stagger + scale overshoot
    tl.fromTo(
      ".hero-char",
      { yPercent: 100, opacity: 0, scale: 1.2 },
      {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // 3. Subtitle: fade up
    tl.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

    // 4. Scroll indicator: fade in + infinite bounce
    tl.fromTo(
      ".hero-scroll",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );

    tl.to(".hero-scroll", {
      y: 8,
      duration: 1.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      tl.kill();
    };
  }, [preloaderDone]);

  // Split LDWP into individual animated characters
  const titleChars = SITE.shortName.split("").map((char, i) => (
    <span key={i} className="char-reveal-wrapper">
      <span className="char-reveal hero-char">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center text-center pointer-events-none"
    >
      <p className="hero-tagline text-xs font-semibold uppercase tracking-[0.3em] text-arsenal-gold drop-shadow-lg opacity-0">
        Hosted by {HOST.name}
      </p>
      <h1 className="mt-3 text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-white font-heading drop-shadow-[0_2px_30px_rgba(239,1,7,0.5)]">
        {titleChars}
      </h1>
      <p className="hero-subtitle mt-3 text-base sm:text-lg text-white/50 font-sans normal-case drop-shadow-lg max-w-md opacity-0">
        {SITE.tagline}
      </p>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 flex flex-col items-center gap-2 opacity-0">
        <span className="text-xs text-white/30 uppercase tracking-widest font-sans">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
