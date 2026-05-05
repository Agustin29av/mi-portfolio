// src/components/layout/Navbar.tsx
import { useEffect, useState } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { navLinks, portfolioData } from '../../data/portfolioData';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from '../ui/Icons';
import type { SectionId } from '../../types';

export function Navbar() {
  const darkMode = usePortfolioStore((s) => s.darkMode);
  const toggleDarkMode = usePortfolioStore((s) => s.toggleDarkMode);
  const isMenuOpen = usePortfolioStore((s) => s.isMenuOpen);
  const toggleMenu = usePortfolioStore((s) => s.toggleMenu);
  const closeMenu = usePortfolioStore((s) => s.closeMenu);
  const activeSection = usePortfolioStore((s) => s.activeSection);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: SectionId) => {
    closeMenu();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const initials = portfolioData.personal.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        <button
          onClick={() => handleNav('hero')}
          className="flex items-center gap-2 group"
          aria-label="Ir al inicio"
        >
          <span className="w-8 h-8 rounded-lg gradient-bg text-white grid place-items-center text-sm font-bold shadow-md shadow-accent-500/30">
            {initials || 'A'}
          </span>
          <span className="hidden sm:inline font-semibold gradient-text text-lg">
            {portfolioData.personal.name}
          </span>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-accent-600 dark:text-accent-300'
                      : 'text-ink-light-muted dark:text-ink-dark-muted hover:text-ink-light dark:hover:text-ink-dark'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full gradient-bg transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="w-10 h-10 grid place-items-center rounded-lg border border-border-light dark:border-border-dark text-ink-light dark:text-ink-dark hover:border-accent-500 hover:text-accent-500 transition-all duration-300"
          >
            <span className="relative w-5 h-5 inline-block">
              <SunIcon
                className={`absolute inset-0 transition-all duration-500 ${
                  darkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <MoonIcon
                className={`absolute inset-0 transition-all duration-500 ${
                  darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                }`}
              />
            </span>
          </button>

          <button
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            className="md:hidden w-10 h-10 grid place-items-center rounded-lg border border-border-light dark:border-border-dark text-ink-light dark:text-ink-dark hover:border-accent-500 transition-all duration-300"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 border-b border-border-light dark:border-border-dark' : 'max-h-0'
        }`}
      >
        <ul className="px-4 py-4 space-y-1 bg-white/95 dark:bg-surface-dark-2/95 backdrop-blur">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent-500/10 text-accent-600 dark:text-accent-300'
                      : 'text-ink-light-muted dark:text-ink-dark-muted hover:bg-slate-100 dark:hover:bg-surface-card-dark'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
