import { useEffect, useRef } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { portfolioData } from '../../data/portfolioData';
import { Button } from './Button';
import { CloseIcon, DownloadIcon, ExternalLinkIcon } from './Icons';

export function CvModal() {
  const isCvModalOpen = usePortfolioStore((s) => s.isCvModalOpen);
  const closeCvModal = usePortfolioStore((s) => s.closeCvModal);
  const { cvUrl } = portfolioData.personal;
  
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCvModal();
      }
    };

    if (isCvModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCvModalOpen, closeCvModal]);

  if (!isCvModalOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeCvModal();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      style={{ animationDuration: '200ms' }}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-surface-card-dark w-full max-w-5xl h-[85vh] rounded-2xl border border-border-light dark:border-border-dark flex flex-col shadow-2xl overflow-hidden animate-scale-in"
        style={{ animationDuration: '250ms' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark bg-surface-light-2 dark:bg-surface-dark-2">
          <div>
            <h3 className="text-lg font-semibold text-ink-light dark:text-ink-dark">
              Curriculum Vitae
            </h3>
            <p className="text-xs text-ink-light-muted dark:text-ink-dark-muted hidden sm:block">
              Vista previa del archivo PDF
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              as="a"
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
              leftIcon={<ExternalLinkIcon width={16} height={16} />}
              className="text-xs hidden sm:inline-flex"
            >
              Nueva pestaña
            </Button>
            
            <Button
              as="a"
              href={cvUrl}
              download="Agustin_Aviles_CV.pdf"
              variant="primary"
              size="sm"
              leftIcon={<DownloadIcon width={16} height={16} />}
              className="text-xs"
            >
              Descargar
            </Button>

            <button
              onClick={closeCvModal}
              className="p-1.5 rounded-lg border border-border-light dark:border-border-dark hover:bg-black/5 dark:hover:bg-white/5 text-ink-light-muted dark:text-ink-dark-muted hover:text-ink-light dark:hover:text-ink-dark transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <CloseIcon width={18} height={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 bg-surface-light dark:bg-surface-dark relative flex flex-col">
          {/* Native PDF View (iframe) */}
          <iframe
            src={`${cvUrl}#toolbar=1`}
            className="w-full h-full border-none hidden md:block"
            title="CV Preview"
          />

          {/* Mobile Fallback - Iframe can be unreliable or force-download on mobile webviews */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center md:hidden bg-surface-light-2 dark:bg-surface-card-dark/60">
            <div className="w-16 h-16 rounded-2xl bg-accent-500/10 dark:bg-accent2-500/10 flex items-center justify-center text-accent-500 dark:text-accent2-400 mb-4 animate-float">
              <EyeIcon width={32} height={32} />
            </div>
            <h4 className="text-base font-semibold text-ink-light dark:text-ink-dark mb-2">
              Vista previa en dispositivos móviles
            </h4>
            <p className="text-sm text-ink-light-muted dark:text-ink-dark-muted max-w-sm mb-6">
              Para garantizar la mejor experiencia de lectura en tu teléfono o tableta, te recomendamos abrir el archivo directamente o descargarlo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
              <Button
                as="a"
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="w-full"
                leftIcon={<ExternalLinkIcon width={16} height={16} />}
              >
                Abrir en nueva pestaña
              </Button>
              <Button
                as="a"
                href={cvUrl}
                download="Agustin_Aviles_CV.pdf"
                variant="secondary"
                className="w-full"
                leftIcon={<DownloadIcon width={16} height={16} />}
              >
                Descargar PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline fallback icon for cleaner rendering
const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
