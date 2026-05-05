// src/hooks/useScrollSpy.ts
import { useEffect } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import type { SectionId } from '../types';

export function useScrollSpy(sectionIds: SectionId[]): void {
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id as SectionId);
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, setActiveSection]);
}
