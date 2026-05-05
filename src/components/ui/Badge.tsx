// src/components/ui/Badge.tsx
import type { ReactNode } from 'react';

type Variant = 'default' | 'accent' | 'outline';

interface BadgeProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  default:
    'bg-slate-100 text-slate-700 dark:bg-surface-card-dark dark:text-ink-dark-muted',
  accent:
    'bg-accent-500/10 text-accent-600 dark:text-accent-300 ring-1 ring-inset ring-accent-500/20',
  outline:
    'border border-border-light dark:border-border-dark text-ink-light-muted dark:text-ink-dark-muted',
};

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
