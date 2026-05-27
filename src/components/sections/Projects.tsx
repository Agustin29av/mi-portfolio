// src/components/sections/Projects.tsx
import { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Badge } from '../ui/Badge';
import { SectionTitle } from '../ui/SectionTitle';
import { ExternalLinkIcon, GitHubIcon } from '../ui/Icons';
import type { Project } from '../../types';

function ProjectPlaceholder({ title }: { title: string }) {
  return (
    <div className="w-full h-full rounded-2xl gradient-bg grid place-items-center relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden />
      <span className="relative text-4xl font-bold text-white/90 px-6 text-center">
        {title}
      </span>
    </div>
  );
}

function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasImages = project.images && project.images.length > 0;
  const images = hasImages ? project.images! : [];

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="group relative">
        <div
          className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-14 p-6 sm:p-8 lg:p-12 rounded-3xl border border-border-light dark:border-border-dark bg-white/60 dark:bg-surface-card-dark/60 backdrop-blur-sm transition-all duration-500 group-hover:border-accent-500/30`}
        >
          {/* Image Section */}
          <div className="w-full lg:w-[58%] shrink-0 relative">
            {/* Subtle glow behind image only */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 blur-lg pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 50%, var(--color-accent-500), transparent 70%)`,
              }}
            />

            {/* Mockup browser window wrapper */}
            <div className="relative rounded-2xl overflow-hidden border border-border-light dark:border-border-dark bg-slate-50 dark:bg-surface-card-dark shadow-2xl dark:shadow-[0_20px_50px_rgba(99,102,241,0.12)] group-hover:dark:shadow-[0_20px_50px_rgba(99,102,241,0.22)] flex flex-col transition-all duration-500">
              
              {/* Browser top navigation bar */}
              <div className="h-8 bg-slate-100 dark:bg-surface-card-dark shrink-0 flex items-center px-4 gap-1.5 border-b border-border-light dark:border-border-dark justify-between select-none">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="text-[10px] text-ink-light-muted/60 dark:text-ink-dark-muted/60 font-mono hidden sm:block truncate max-w-[200px]">
                  {project.liveUrl ? project.liveUrl.replace('https://', '') : 'localhost:3000'}
                </div>
                <div className="w-[36px]" />
              </div>

              {/* Aspect Ratio Controlled viewport */}
              <div className="relative overflow-hidden group/slider aspect-16/10 bg-slate-100 dark:bg-surface-card-dark flex items-center justify-center p-2 sm:p-4">
                {hasImages ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={images[currentImageIndex].url}
                      alt={`${project.title} - ${images[currentImageIndex].caption}`}
                      loading="lazy"
                      className="w-full h-full object-contain rounded-lg drop-shadow-md select-none transition-all duration-500 ease-in-out"
                    />

                    {/* Navigation Arrow buttons */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="absolute left-3 p-2 rounded-full bg-white/90 dark:bg-surface-card-dark/95 hover:bg-white dark:hover:bg-surface-dark text-ink-light dark:text-ink-dark shadow-md hover:scale-105 transition-all opacity-0 group-hover/slider:opacity-100 duration-300 focus:outline-none"
                          aria-label="Previous image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-3 p-2 rounded-full bg-white/90 dark:bg-surface-card-dark/95 hover:bg-white dark:hover:bg-surface-dark text-ink-light dark:text-ink-dark shadow-md hover:scale-105 transition-all opacity-0 group-hover/slider:opacity-100 duration-300 focus:outline-none"
                          aria-label="Next image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                ) : project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-contain rounded-lg drop-shadow-md select-none"
                  />
                ) : (
                  <ProjectPlaceholder title={project.title} />
                )}
              </div>

              {/* Slider index indicators (dots) */}
              {hasImages && images.length > 1 && (
                <div className="flex justify-center gap-1.5 py-2 bg-slate-100/50 dark:bg-surface-card-dark/40 border-t border-border-light/40 dark:border-border-dark/40 select-none">
                  {images.map((_, imgIndex) => (
                    <button
                      key={imgIndex}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentImageIndex(imgIndex);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        imgIndex === currentImageIndex
                          ? 'w-6 bg-accent-500 dark:bg-accent-400'
                          : 'w-1.5 bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-600'
                      }`}
                      aria-label={`Go to slide ${imgIndex + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
             {/* Slider Caption Text */}
            {hasImages && images[currentImageIndex].caption && (
              <p className="mt-3 text-xs sm:text-sm text-center italic text-ink-light-muted dark:text-ink-dark-muted font-medium bg-white/20 dark:bg-white/[0.01] py-2.5 px-4 rounded-xl border border-border-light/30 dark:border-border-dark/30 shadow-sm transition-all duration-300">
                🔍 {images[currentImageIndex].caption}
              </p>
            )}
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-[42%] flex flex-col">
            {/* Project number */}
            <span className="text-sm font-bold gradient-text tracking-widest uppercase mb-3">
              Proyecto {String(index + 1).padStart(2, '0')}
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-ink-light dark:text-ink-dark leading-tight">
              {project.title}
            </h3>

            <p className="mt-4 text-base text-ink-light-muted dark:text-ink-dark-muted leading-relaxed">
              {project.description}
            </p>

            {/* Tech stack pills */}
            {project.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="accent" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-8 flex items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full gradient-bg text-white text-sm font-semibold shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/35 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Ver Demo <ExternalLinkIcon width={14} height={14} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border-light dark:border-border-dark text-ink-light dark:text-ink-dark text-sm font-semibold hover:border-accent-500 hover:text-accent-500 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <GitHubIcon width={16} height={16} /> Código
                </a>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}

export function Projects() {
  const { projects } = portfolioData;
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? 'is-visible' : ''}`}
      >
        <SectionTitle
          eyebrow="Proyectos"
          title={
            <>
              Trabajos <span className="gradient-text">recientes</span>
            </>
          }
          description="Una selección de proyectos en los que estuve trabajando."
        />

        <div className="mt-16 flex flex-col gap-12">
          {projects.length === 0 ? (
            <div className="max-w-md mx-auto text-center p-10 rounded-2xl border border-dashed border-border-light dark:border-border-dark">
              <div className="text-4xl mb-3">🚧</div>
              <h3 className="font-semibold text-lg mb-2">Próximamente</h3>
              <p className="text-sm text-ink-light-muted dark:text-ink-dark-muted">
                Estoy puliendo algunos proyectos para compartir muy pronto. Mientras
                tanto, te invito a revisar mi GitHub.
              </p>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 dark:text-accent-300 hover:underline"
              >
                <GitHubIcon width={16} height={16} /> Visitar GitHub
              </a>
            </div>
          ) : (
            projects.map((p, i) => (
              <ProjectShowcase key={p.id} project={p} index={i} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
