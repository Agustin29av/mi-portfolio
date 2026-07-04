// src/components/sections/Hero.tsx
import { useEffect, useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Button } from '../ui/Button';
import { ArrowDownIcon, EyeIcon, GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon } from '../ui/Icons';

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function useTypewriter(words: string[], speed = 90, pause = 1500) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    if (!deleting && text === current) {
      const timeout = window.setTimeout(() => setDeleting(true), pause);
      return () => window.clearTimeout(timeout);
    }

    if (deleting && text === '') {
      const timeout = window.setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 200);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(
      () => {
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
        );
      },
      deleting ? speed / 2 : speed,
    );
    return () => window.clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export function Hero() {
  const { personal, roles } = portfolioData;
  const typed = useTypewriter(roles);
  const openCvModal = usePortfolioStore((s) => s.openCvModal);

  const greetingWords = ['Hola,', 'soy'];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden />
      <div
        className="blob bg-accent-500 -top-10 -left-10 w-80 h-80 animate-float opacity-25"
        style={{ filter: 'blur(56px)' }}
        aria-hidden
      />
      <div
        className="blob bg-accent2-500 top-1/4 -right-10 w-96 h-96 animate-float"
        style={{ animationDelay: '2s', filter: 'blur(60px)' }}
        aria-hidden
      />

      {/* Fade hacia la siguiente sección para evitar el corte abrupto del blob */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-surface-light dark:to-surface-dark"
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <p className="text-base md:text-lg font-medium text-ink-light-muted dark:text-ink-dark-muted mb-4">
            {greetingWords.map((w, i) => (
              <span
                key={i}
                className="word-fade mr-2"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {w}
              </span>
            ))}
          </p>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-4">
            <span className="gradient-text">{personal.name}</span>
          </h1>

          <p className="text-2xl md:text-3xl font-semibold text-ink-light dark:text-ink-dark mb-6 min-h-[2.25rem] md:min-h-[2.75rem]">
            <span className="typewriter-cursor">{typed}</span>
          </p>

          <p className="text-base md:text-lg text-ink-light-muted dark:text-ink-dark-muted max-w-2xl mb-8">
            {personal.bio}
          </p>

          {personal.location && (
            <div className="inline-flex items-center gap-1.5 mb-8 text-sm text-ink-light-muted dark:text-ink-dark-muted">
              <MapPinIcon width={16} height={16} />
              {personal.location}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Button
              size="lg"
              onClick={() => scrollTo('projects')}
              rightIcon={<ArrowDownIcon width={18} height={18} />}
            >
              Ver proyectos
            </Button>
            <Button
              onClick={openCvModal}
              variant="secondary"
              size="lg"
              leftIcon={<EyeIcon width={18} height={18} />}
            >
              Ver CV
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-11 h-11 grid place-items-center rounded-xl border border-border-light dark:border-border-dark text-ink-light dark:text-ink-dark hover:border-accent-500 hover:text-accent-500 hover:-translate-y-0.5 transition-all"
            >
              <GitHubIcon />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-11 h-11 grid place-items-center rounded-xl border border-border-light dark:border-border-dark text-ink-light dark:text-ink-dark hover:border-accent-500 hover:text-accent-500 hover:-translate-y-0.5 transition-all"
            >
              <LinkedInIcon />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              className="w-11 h-11 grid place-items-center rounded-xl border border-border-light dark:border-border-dark text-ink-light dark:text-ink-dark hover:border-accent-500 hover:text-accent-500 hover:-translate-y-0.5 transition-all"
            >
              <MailIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
