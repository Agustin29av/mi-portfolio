// src/components/sections/Projects.tsx
import { useMemo, useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SectionTitle } from '../ui/SectionTitle';
import { ExternalLinkIcon, GitHubIcon } from '../ui/Icons';
import type { Project } from '../../types';

const ALL = 'Todos';

function ProjectPlaceholder({ title }: { title: string }) {
  return (
    <div className="aspect-16/10 rounded-xl gradient-bg grid place-items-center relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden />
      <span className="relative text-3xl font-bold text-white/90 px-4 text-center">
        {title}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card hover className="p-5 flex flex-col h-full group">
      <div className="relative">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="aspect-16/10 w-full object-cover rounded-xl"
          />
        ) : (
          <ProjectPlaceholder title={project.title} />
        )}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="accent">★ Featured</Badge>
          </div>
        )}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-ink-light dark:text-ink-dark">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-ink-light-muted dark:text-ink-dark-muted flex-1">
        {project.description}
      </p>

      {project.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center gap-2">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-light dark:text-ink-dark hover:text-accent-500 transition-colors"
          >
            <GitHubIcon width={16} height={16} /> Código
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 dark:text-accent-300 hover:underline"
          >
            Ver live <ExternalLinkIcon width={14} height={14} />
          </a>
        )}
      </div>
    </Card>
  );
}

export function Projects() {
  const { projects } = portfolioData;
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<string>(ALL);

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return [ALL, ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(
    () => (filter === ALL ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter, projects],
  );

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? 'is-visible' : ''}`}
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

        {projects.length > 0 && tags.length > 1 && (
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {tags.map((tag) => {
              const active = filter === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    active
                      ? 'gradient-bg text-white shadow-md shadow-accent-500/30'
                      : 'border border-border-light dark:border-border-dark text-ink-light-muted dark:text-ink-dark-muted hover:border-accent-500 hover:text-accent-500'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-12">
          {filtered.length === 0 ? (
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
