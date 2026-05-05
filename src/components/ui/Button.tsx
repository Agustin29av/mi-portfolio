// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: 'button';
  };

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: 'a';
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

const sizes: Record<Size, string> = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const variants: Record<Variant, string> = {
  primary:
    'gradient-bg text-white shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/40 hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'border border-border-light dark:border-border-dark text-ink-light dark:text-ink-dark hover:border-accent-500 hover:text-accent-500 dark:hover:text-accent-400 hover:-translate-y-0.5',
  ghost:
    'text-ink-light-muted dark:text-ink-dark-muted hover:text-accent-500 dark:hover:text-accent-400',
};

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    leftIcon,
    rightIcon,
    className = '',
    children,
  } = props;

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (props.as === 'a') {
    const { as: _as, variant: _v, size: _s, leftIcon: _li, rightIcon: _ri, className: _c, children: _ch, ...rest } = props;
    void _as; void _v; void _s; void _li; void _ri; void _c; void _ch;
    return (
      <a className={cls} {...rest}>
        {leftIcon}
        {children}
        {rightIcon}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, leftIcon: _li, rightIcon: _ri, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  void _as; void _v; void _s; void _li; void _ri; void _c; void _ch;
  return (
    <button className={cls} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
