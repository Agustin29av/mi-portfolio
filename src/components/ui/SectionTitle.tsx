// src/components/ui/SectionTitle.tsx
import type { ReactNode } from 'react';

interface SectionTitleProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: SectionTitleProps) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-2xl ${alignCls} ${className}`}>
      {eyebrow && (
        <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest gradient-text">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-ink-light-muted dark:text-ink-dark-muted">
          {description}
        </p>
      )}
    </div>
  );
}
