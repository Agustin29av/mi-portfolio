// src/components/sections/Projects.tsx
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

            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-white/[0.03] dark:to-white/[0.06] p-4 sm:p-6 lg:p-8">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-auto object-contain drop-shadow-lg transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              ) : (
                <div className="aspect-16/10">
                  <ProjectPlaceholder title={project.title} />
                </div>
              )}
            </div>
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
