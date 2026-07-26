import { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'neutral';
}

export function Badge({ className, variant = 'primary', children, ...props }: BadgeProps) {
  const variants = {
    primary: 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border-primary-200/50 dark:border-primary-700/30',
    accent: 'bg-accent-100 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300 border-accent-200/50 dark:border-accent-700/30',
    success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-700/30',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200/50 dark:border-amber-700/30',
    danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200/50 dark:border-red-700/30',
    neutral: 'bg-dark-100 dark:bg-dark-700/40 text-dark-600 dark:text-dark-300 border-dark-200/50 dark:border-dark-600/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
