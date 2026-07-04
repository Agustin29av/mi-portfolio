import { useEffect, useRef, useState } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { portfolioData } from '../../data/portfolioData';
import { Button } from './Button';
import { CloseIcon, MailIcon, CheckIcon } from './Icons';

export function EmailModal() {
  const isEmailModalOpen = usePortfolioStore((s) => s.isEmailModalOpen);
  const closeEmailModal = usePortfolioStore((s) => s.closeEmailModal);
  const { email } = portfolioData.personal;

  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeEmailModal();
      }
    };

    if (isEmailModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isEmailModalOpen, closeEmailModal]);

  if (!isEmailModalOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeEmailModal();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar el correo: ', err);
    }
  };

  // Web mail composition URLs
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  const outlookUrl = `https://outlook.live.com/default.aspx?rru=compose&to=${email}`;
  const mailtoUrl = `mailto:${email}`;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      style={{ animationDuration: '200ms' }}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-surface-card-dark w-full max-w-md rounded-2xl border border-border-light dark:border-border-dark flex flex-col shadow-2xl overflow-hidden animate-scale-in"
        style={{ animationDuration: '250ms' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark bg-surface-light-2 dark:bg-surface-dark-2">
          <div>
            <h3 className="text-lg font-semibold text-ink-light dark:text-ink-dark">
              Contacto por Email
            </h3>
            <p className="text-xs text-ink-light-muted dark:text-ink-dark-muted">
              Elegí cómo preferís escribirme
            </p>
          </div>
          <button
            onClick={closeEmailModal}
            className="p-1.5 rounded-lg border border-border-light dark:border-border-dark hover:bg-black/5 dark:hover:bg-white/5 text-ink-light-muted dark:text-ink-dark-muted hover:text-ink-light dark:hover:text-ink-dark transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <CloseIcon width={18} height={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center">
          {/* Big Envelope Icon */}
          <div className="w-16 h-16 rounded-2xl bg-accent-500/10 dark:bg-accent2-500/10 flex items-center justify-center text-accent-500 dark:text-accent2-400 mb-4 animate-float">
            <MailIcon width={32} height={32} />
          </div>

          <p className="text-sm text-center text-ink-light-muted dark:text-ink-dark-muted mb-6">
            Podés copiar mi dirección de correo para enviarme un mail desde tu proveedor habitual, o usar los accesos directos de abajo.
          </p>

          {/* Copy Box */}
          <div className="w-full flex items-center gap-2 p-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark-2 mb-6">
            <span className="flex-1 text-sm font-semibold select-all break-all px-1 text-ink-light dark:text-ink-dark">
              {email}
            </span>
            <Button
              onClick={handleCopy}
              variant={copied ? 'ghost' : 'primary'}
              size="sm"
              className={`min-w-[80px] transition-all duration-300 ${
                copied
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                  : ''
              }`}
              leftIcon={
                copied ? (
                  <CheckIcon width={16} height={16} />
                ) : (
                  <CopyIcon width={16} height={16} />
                )
              }
            >
              {copied ? 'Copiado' : 'Copiar'}
            </Button>
          </div>

          {/* Direct Link Actions */}
          <div className="w-full space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-light-muted dark:text-ink-dark-muted mb-2">
              Enviar directamente vía
            </div>
            
            <a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-border-light dark:border-border-dark hover:border-red-500/30 bg-white dark:bg-surface-card-dark hover:bg-red-50/10 dark:hover:bg-red-950/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-red-500 font-bold text-sm">G</span>
                <span className="text-sm font-medium text-ink-light dark:text-ink-dark">Gmail (Web)</span>
              </div>
              <span className="text-xs text-ink-light-muted dark:text-ink-dark-muted group-hover:translate-x-0.5 transition-transform">→</span>
            </a>

            <a
              href={outlookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-border-light dark:border-border-dark hover:border-blue-500/30 bg-white dark:bg-surface-card-dark hover:bg-blue-50/10 dark:hover:bg-blue-950/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-blue-500 font-bold text-sm">O</span>
                <span className="text-sm font-medium text-ink-light dark:text-ink-dark">Outlook / Hotmail (Web)</span>
              </div>
              <span className="text-xs text-ink-light-muted dark:text-ink-dark-muted group-hover:translate-x-0.5 transition-transform">→</span>
            </a>

            <a
              href={mailtoUrl}
              className="flex items-center justify-between p-3.5 rounded-xl border border-border-light dark:border-border-dark hover:border-accent-500/30 bg-white dark:bg-surface-card-dark hover:bg-accent-50/10 dark:hover:bg-indigo-950/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <MailIcon width={18} height={18} className="text-accent-500" />
                <span className="text-sm font-medium text-ink-light dark:text-ink-dark">Cliente predeterminado</span>
              </div>
              <span className="text-xs text-ink-light-muted dark:text-ink-dark-muted group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);
