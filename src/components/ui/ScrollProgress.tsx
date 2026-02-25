"use client";

import { useCosmosStore } from "@/lib/cosmosStore";

export default function ScrollProgress() {
  const progress = useCosmosStore((s) => s.scrollProgress);

  return (
    <div className="fixed top-0 left-0 z-[51] h-0.5 w-full">
      <div
        className="h-full transition-[width] duration-150"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, #EF0107, #9C824A)",
        }}
      />
    </div>
  );
}
