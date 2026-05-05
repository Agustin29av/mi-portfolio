// src/components/sections/Skills.tsx
import { portfolioData } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionTitle } from '../ui/SectionTitle';
import type { Skill, SkillCategory } from '../../types';

const categories: SkillCategory[] = ['Frontend', 'Tools', 'Otros'];

interface SkillCardProps {
  skill: Skill;
  visible: boolean;
  delay: number;
}

function SkillCard({ skill, visible, delay }: SkillCardProps) {
  const pct = (skill.level / 5) * 100;
  return (
    <div
      className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-card-dark transition-all duration-300 hover:border-accent-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-500/5"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl" aria-hidden>
          {skill.icon}
        </span>
        <span className="font-medium text-sm">{skill.name}</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 dark:bg-surface-dark-2 overflow-hidden">
        <div
          className="h-full gradient-bg rounded-full transition-all duration-1000 ease-out"
          style={{ width: visible ? `${pct}%` : '0%', transitionDelay: `${delay}ms` }}
        />
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
      className="py-24 sm:py-32 bg-white/50 dark:bg-surface-dark-2/50"
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

        <div className="mt-16 space-y-12">
          {categories.map((cat) => {
            const items = skills.filter((s) => s.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-ink-light-muted dark:text-ink-dark-muted">
                  {cat}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {items.map((skill, i) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      visible={isVisible}
                      delay={i * 60}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
