// src/components/ui/Card.tsx
import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}

export function Card({ children, hover = false, className = '', ...rest }: CardProps) {
  const hoverCls = hover
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-500/10 hover:border-accent-500/40'
    : '';
  return (
    <div
      className={`rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-card-dark ${hoverCls} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
