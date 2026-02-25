"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCosmosStore } from "@/lib/cosmosStore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  staggerChildren?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  staggerChildren,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const preloaderDone = useCosmosStore((s) => s.preloaderDone);
  const animated = useRef(false);

  useEffect(() => {
    if (!preloaderDone || !ref.current || animated.current) return;
    animated.current = true;

    const el = ref.current;

    if (staggerChildren && el.children.length > 0) {
      gsap.set(el.children, { opacity: 0, y: 60 });
      gsap.set(el, { opacity: 1 });

      gsap.to(el.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: staggerChildren,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [preloaderDone, delay, staggerChildren]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
