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
    <div className="h-screen w-full bg-gradient-to-b from-bg-dark via-arsenal-navy-dark/20 to-bg-dark" />
  ),
});

function StaticHeroFallback() {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-bg-dark via-arsenal-navy-dark/30 to-bg-dark relative overflow-hidden">
      {/* Floating particles CSS animation */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-arsenal-red/20 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 4 + 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [use3D, setUse3D] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isMobile = window.innerWidth < 768;
    const isLowEnd =
      typeof navigator !== "undefined" &&
      navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency <= 4;
    setUse3D(!isMobile && !isLowEnd);
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
          <div className="h-screen w-full bg-bg-dark" />
        )}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-arsenal-gold">
          Hosted by {HOST.name}
        </p>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white font-heading leading-none">
          {SITE.shortName}
        </h1>
        <p className="mt-2 text-lg sm:text-xl text-white/60 font-sans normal-case max-w-md">
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="text-white/30" size={28} />
      </div>
    </section>
  );
}
