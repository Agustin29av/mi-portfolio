// src/store/usePortfolioStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SectionId } from '../types';

interface PortfolioState {
  darkMode: boolean;
  activeSection: SectionId;
  isMenuOpen: boolean;
  isCvModalOpen: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
  setActiveSection: (section: SectionId) => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  openCvModal: () => void;
  closeCvModal: () => void;
}

const getInitialDarkMode = (): boolean => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      darkMode: getInitialDarkMode(),
      activeSection: 'hero',
      isMenuOpen: false,
      isCvModalOpen: false,
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      setDarkMode: (value) => set({ darkMode: value }),
      setActiveSection: (section) => set({ activeSection: section }),
      toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
      closeMenu: () => set({ isMenuOpen: false }),
      openCvModal: () => set({ isCvModalOpen: true }),
      closeCvModal: () => set({ isCvModalOpen: false }),
    }),
    {
      name: 'portfolio-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ darkMode: state.darkMode }),
    },
  ),
);
