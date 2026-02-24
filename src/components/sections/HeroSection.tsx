"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { HOST, SITE } from "@/lib/constants";

const StadiumScene = dynamic(() => import("@/components/3d/StadiumScene"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-gradient-to-b from-[#050510] via-[#1a0005] to-[#050510]" />
  ),
});

function StaticHeroFallback() {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#050510] via-[#1a0005] to-[#050510] relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: i % 3 === 0 ? "rgba(239,1,7,0.4)" : "rgba(255,255,255,0.15)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 4 + 4}s`,
            }}
          />
        ))}
      </div>
      {/* Fake stadium glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[60vw] h-[30vh] rounded-full bg-arsenal-red/5 blur-3xl" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [use3D, setUse3D] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only disable 3D on small mobile screens
    const isMobile = window.innerWidth < 640;
    setUse3D(!isMobile);
  }, []);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* 3D or fallback background */}
      <div className="absolute inset-0">
        {mounted ? (
          use3D ? (
            <StadiumScene />
          ) : (
            <StaticHeroFallback />
          )
        ) : (
          <div className="h-screen w-full bg-[#050510]" />
        )}
      </div>

      {/* Overlay — subtle, so the 3D stadium shows through */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-bg-dark/30" />

      {/* Content — positioned lower so stadium is visible above */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 px-4 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-arsenal-gold drop-shadow-lg">
          Hosted by {HOST.name}
        </p>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white font-heading leading-none drop-shadow-[0_2px_20px_rgba(239,1,7,0.3)]">
          {SITE.shortName}
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-white/70 font-sans normal-case max-w-lg drop-shadow-lg">
          {SITE.tagline}. Free events. Real passion.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/events">
            <Button size="lg">Next Watch Party</Button>
          </Link>
          <Link href="/community">
            <Button variant="outline" size="lg">
              Join Community
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="text-white/40" size={28} />
      </div>
    </section>
  );
}
