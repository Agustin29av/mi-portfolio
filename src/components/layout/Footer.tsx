// src/components/layout/Footer.tsx
import { portfolioData } from '../../data/portfolioData';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { ArrowUpIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../ui/Icons';

export function Footer() {
  const year = new Date().getFullYear();
  const { personal } = portfolioData;
  const openEmailModal = usePortfolioStore((s) => s.openEmailModal);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-border-light dark:border-border-dark bg-white/40 dark:bg-surface-dark-2/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ink-light-muted dark:text-ink-dark-muted">
          © {year}{' '}
          <span className="font-medium text-ink-light dark:text-ink-dark">
            {personal.name}
          </span>
          . Hecho con React + TypeScript.
        </p>

        <div className="flex items-center gap-2">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 grid place-items-center rounded-lg text-ink-light-muted dark:text-ink-dark-muted hover:text-accent-500 hover:bg-accent-500/10 transition-colors"
          >
            <GitHubIcon />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 grid place-items-center rounded-lg text-ink-light-muted dark:text-ink-dark-muted hover:text-accent-500 hover:bg-accent-500/10 transition-colors"
          >
            <LinkedInIcon />
          </a>
          <button
            onClick={openEmailModal}
            aria-label="Email"
            className="w-9 h-9 grid place-items-center rounded-lg text-ink-light-muted dark:text-ink-dark-muted hover:text-accent-500 hover:bg-accent-500/10 transition-colors cursor-pointer bg-transparent"
          >
            <MailIcon />
          </button>
          <button
            onClick={scrollTop}
            aria-label="Volver arriba"
            className="ml-2 w-9 h-9 grid place-items-center rounded-lg gradient-bg text-white shadow-md shadow-accent-500/30 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
}
