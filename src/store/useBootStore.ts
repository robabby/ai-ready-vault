"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BootStore {
  /** Whether boot sequence has completed in current session */
  isBootComplete: boolean;
  /** Whether user has seen boot sequence before (persisted to localStorage) */
  hasSeenBootBefore: boolean;
  /** Skip the boot sequence immediately */
  skipBootSequence: () => void;
  /** Mark boot as complete (called when animation finishes) */
  markBootComplete: () => void;
}

/**
 * Boot sequence state management.
 *
 * - First visit: full boot sequence plays
 * - Return visits: skip immediately (hasSeenBootBefore = true)
 * - Skip via keypress/click: ends animation early
 * - Persists hasSeenBootBefore to localStorage
 */
export const useBootStore = create<BootStore>()(
  persist(
    (set) => ({
      isBootComplete: false,
      hasSeenBootBefore: false,

      skipBootSequence: () =>
        set({
          isBootComplete: true,
          hasSeenBootBefore: true,
        }),

      markBootComplete: () =>
        set({
          isBootComplete: true,
          hasSeenBootBefore: true,
        }),
    }),
    {
      name: "boot-storage",
      // Only persist hasSeenBootBefore, not isBootComplete
      partialize: (state) => ({ hasSeenBootBefore: state.hasSeenBootBefore }),
    }
  )
);
