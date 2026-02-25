import { create } from "zustand";

interface CosmosState {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  isLoaded: boolean;
  isMobile: boolean;
  preloaderDone: boolean;
  scrollDirection: "up" | "down";
  loadProgress: number;
  setScrollProgress: (v: number) => void;
  setMouse: (x: number, y: number) => void;
  setIsLoaded: (v: boolean) => void;
  setIsMobile: (v: boolean) => void;
  setPreloaderDone: (v: boolean) => void;
  setScrollDirection: (v: "up" | "down") => void;
  setLoadProgress: (v: number) => void;
}

export const useCosmosStore = create<CosmosState>((set) => ({
  scrollProgress: 0,
  mouseX: 0,
  mouseY: 0,
  isLoaded: false,
  isMobile: false,
  preloaderDone: false,
  scrollDirection: "down",
  loadProgress: 0,
  setScrollProgress: (v) => set({ scrollProgress: v }),
  setMouse: (x, y) => set({ mouseX: x, mouseY: y }),
  setIsLoaded: (v) => set({ isLoaded: v }),
  setIsMobile: (v) => set({ isMobile: v }),
  setPreloaderDone: (v) => set({ preloaderDone: v }),
  setScrollDirection: (v) => set({ scrollDirection: v }),
  setLoadProgress: (v) => set({ loadProgress: v }),
}));
