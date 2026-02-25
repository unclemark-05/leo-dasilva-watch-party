"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const ringScale = useRef(1);
  const hovering = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || reducedMotion) {
      document.documentElement.classList.add("touch-device");
      return;
    }

    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], [data-magnetic]')) {
        hovering.current = true;
        dotRef.current?.classList.add("hovering");
        ringRef.current?.classList.add("hovering");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], [data-magnetic]')) {
        hovering.current = false;
        dotRef.current?.classList.remove("hovering");
        ringRef.current?.classList.remove("hovering");
      }
    };

    const animate = () => {
      // Dot follows mouse exactly
      dotPos.current.x = mouse.current.x;
      dotPos.current.y = mouse.current.y;

      // Ring trails with lerp
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      // Smooth ring scale
      const targetScale = hovering.current ? 1.5 : 1;
      ringScale.current += (targetScale - ringScale.current) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${ringScale.current.toFixed(3)})`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
