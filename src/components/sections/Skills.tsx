// src/components/sections/Skills.tsx
import { portfolioData } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionTitle } from '../ui/SectionTitle';
import { BrandIcon } from '../ui/BrandIcons';
import type { Skill, SkillCategory } from '../../types';
import type { SVGProps } from 'react';

const categories: SkillCategory[] = [
  'Frontend',
  'Backend',
  'Librerías Frontend',
  'Bases de Datos',
  'Herramientas',
];

// Helper to get a generic icon for each category
function CategoryIcon({ category, className }: { category: SkillCategory; className?: string }) {
  const props: SVGProps<SVGSVGElement> = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
  };

  switch (category) {
    case 'Frontend':
      return (
        <svg {...props}>
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      );
    case 'Backend':
      return (
        <svg {...props}>
          <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
          <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
          <line x1="6" x2="6.01" y1="6" y2="6" />
          <line x1="6" x2="6.01" y1="18" y2="18" />
        </svg>
      );
    case 'Librerías Frontend':
      return (
        <svg {...props}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 12 12 17 22 12" />
          <polyline points="2 17 12 22 22 17" />
        </svg>
      );
    case 'Bases de Datos':
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5V19A9 3 0 0 0 21 19V5" />
          <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
      );
    case 'Herramientas':
      return (
        <svg {...props}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    default:
      return null;
  }
}

interface BentoCardProps {
  category: SkillCategory;
  items: Skill[];
  visible: boolean;
  delay: number;
}

function BentoCard({ category, items, visible, delay }: BentoCardProps) {
  // Determine grid span based on category for the Bento layout
  const colSpanClass =
    category === 'Frontend'
      ? 'lg:col-span-2'
      : category === 'Librerías Frontend' || category === 'Bases de Datos' || category === 'Herramientas'
      ? 'lg:col-span-1'
      : 'lg:col-span-1';

  return (
    <div
      className={`group relative overflow-hidden p-6 sm:p-8 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-card-dark transition-all duration-500 hover:border-accent-500/40 hover:shadow-2xl hover:shadow-accent-500/10 flex flex-col gap-6 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${colSpanClass}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Subtle background glow effect (Animated Floating Orbs) */}
      <div 
        className="absolute -top-32 -right-32 w-64 h-64 bg-accent-500/20 dark:bg-accent-400/10 rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-700 animate-float pointer-events-none"
      ></div>
      <div 
        className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent2-500/10 dark:bg-accent2-400/10 rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-700 animate-float pointer-events-none"
        style={{ animationDelay: '3s' }}
      ></div>

      {/* Header */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-500 to-accent2-500 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-accent-500/25">
          <CategoryIcon category={category} className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-ink-light dark:text-ink-dark">
          {category}
        </h3>
      </div>

      {/* Skills Pills */}
      <div className="flex flex-wrap gap-3 relative z-10">
        {items.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-surface-dark-2 border border-slate-200 dark:border-slate-700/50 shadow-xs hover:border-accent-400 dark:hover:border-accent-500 hover:shadow-md hover:shadow-accent-500/10 hover:-translate-y-1 transition-all duration-300 group/pill cursor-default"
          >
            <BrandIcon
              name={skill.name}
              fallback={skill.icon}
              className="w-4 h-4 shrink-0 text-slate-600 dark:text-slate-300 group-hover/pill:text-accent-600 dark:group-hover/pill:text-accent-400 group-hover/pill:scale-110 transition-all duration-300"
            />
            <span className="text-sm font-medium text-ink-light dark:text-ink-dark transition-colors">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const { skills } = portfolioData;
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="skills"
      className="py-24 sm:py-32 bg-white dark:bg-surface-dark-1 relative overflow-hidden"
    >
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? 'is-visible' : ''}`}
      >
        <SectionTitle
          eyebrow="Skills"
          title={
            <>
              Stack y <span className="gradient-text">herramientas</span>
            </>
          }
          description="Las tecnologías con las que trabajo a diario para construir productos web."
        />

        {/* Bento Box Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => {
            const items = skills.filter((s) => s.category === cat);
            if (items.length === 0) return null;
            return (
              <BentoCard
                key={cat}
                category={cat}
                items={items}
                visible={isVisible}
                delay={index * 100}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
