import { create } from "zustand";

interface CosmosState {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  isLoaded: boolean;
  isMobile: boolean;
  setScrollProgress: (v: number) => void;
  setMouse: (x: number, y: number) => void;
  setIsLoaded: (v: boolean) => void;
  setIsMobile: (v: boolean) => void;
}

export const useCosmosStore = create<CosmosState>((set) => ({
  scrollProgress: 0,
  mouseX: 0,
  mouseY: 0,
  isLoaded: false,
  isMobile: false,
  setScrollProgress: (v) => set({ scrollProgress: v }),
  setMouse: (x, y) => set({ mouseX: x, mouseY: y }),
  setIsLoaded: (v) => set({ isLoaded: v }),
  setIsMobile: (v) => set({ isMobile: v }),
}));
