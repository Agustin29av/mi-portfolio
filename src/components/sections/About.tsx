// src/components/sections/About.tsx
import { portfolioData } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Button } from '../ui/Button';
import { SectionTitle } from '../ui/SectionTitle';
import { EyeIcon } from '../ui/Icons';

export function About() {
  const { personal, stats } = portfolioData;
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const openCvModal = usePortfolioStore((s) => s.openCvModal);

  return (
    <section id="about" className="py-24 sm:py-32">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? 'is-visible' : ''}`}
      >
        <SectionTitle
          eyebrow="Sobre mí"
          title={
            <>
              Construyendo experiencias{' '}
              <span className="gradient-text">memorables</span>
            </>
          }
        />

        <div className="mt-16 grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Avatar */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
              <div className="absolute inset-0 rounded-full gradient-ring" aria-hidden />
              <div className="absolute inset-1.5 rounded-full bg-white dark:bg-surface-card-dark overflow-hidden">
                <img
                  src="/ImagendePerfil.png"
                  alt={`Foto de ${personal.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover scale-112 origin-center"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-3">
            <p className="text-base md:text-lg text-ink-light-muted dark:text-ink-dark-muted leading-relaxed mb-4">
              {personal.bio}
            </p>
            <p className="text-base md:text-lg text-ink-light-muted dark:text-ink-dark-muted leading-relaxed mb-8">
              Me apasiona traducir ideas en interfaces que se sienten naturales,
              accesibles y rápidas. Disfruto cuidar los detalles, las animaciones
              sutiles y la calidad del código.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-white/50 dark:bg-surface-card-dark/50"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs mt-1 text-ink-light-muted dark:text-ink-dark-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={openCvModal}
              leftIcon={<EyeIcon width={18} height={18} />}
            >
              Ver CV
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
