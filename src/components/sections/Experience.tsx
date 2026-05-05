// src/components/sections/Experience.tsx
import { portfolioData } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionTitle } from '../ui/SectionTitle';

export function Experience() {
  const { experiences } = portfolioData;
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="experience"
      className="py-24 sm:py-32 bg-white/50 dark:bg-surface-dark-2/50"
    >
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? 'is-visible' : ''}`}
      >
        <SectionTitle
          eyebrow="Experiencia"
          title={
            <>
              Trayectoria <span className="gradient-text">profesional</span>
            </>
          }
        />

        <div className="mt-16 relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-px bg-linear-to-b from-accent-500/40 via-accent2-500/40 to-transparent sm:-translate-x-1/2"
            aria-hidden
          />

          <ul className="space-y-12">
            {experiences.map((exp, idx) => {
              const right = idx % 2 === 1;
              return (
                <li key={exp.id} className="relative">
                  {/* Dot */}
                  <span
                    className="absolute left-4 sm:left-1/2 top-3 -translate-x-1/2 w-4 h-4 rounded-full gradient-bg ring-4 ring-white dark:ring-surface-dark"
                    aria-hidden
                  />
                  <div
                    className={`pl-12 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-10 ${
                      right ? '' : ''
                    }`}
                  >
                    <div
                      className={`${
                        right
                          ? 'sm:col-start-2 sm:text-left sm:pl-10'
                          : 'sm:text-right sm:pr-10'
                      }`}
                    >
                      <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-card-dark p-6 transition-all duration-300 hover:border-accent-500/40 hover:shadow-lg hover:shadow-accent-500/5">
                        <div className="text-xs font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-300 mb-1">
                          {exp.startDate} — {exp.endDate}
                        </div>
                        <h3 className="text-lg font-semibold">
                          {exp.role}{' '}
                          <span className="text-ink-light-muted dark:text-ink-dark-muted font-normal">
                            @ {exp.company}
                          </span>
                        </h3>
                        <ul
                          className={`mt-3 space-y-2 text-sm text-ink-light-muted dark:text-ink-dark-muted ${
                            right ? 'sm:text-left' : 'sm:text-right'
                          }`}
                        >
                          {exp.bullets.map((b, i) => (
                            <li
                              key={i}
                              className={`flex items-start gap-2 ${
                                right ? '' : 'sm:flex-row-reverse'
                              } text-left sm:text-inherit`}
                            >
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-500 flex-shrink-0" />
                              <span className="text-left">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
