import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = false, hover = false, glow = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border transition-all duration-300',
        glass
          ? 'bg-white/70 dark:bg-dark-900/70 backdrop-blur-xl border-primary-200/30 dark:border-primary-700/20 shadow-glass'
          : 'bg-white dark:bg-dark-800/60 border-dark-200/50 dark:border-dark-700/30 shadow-card',
        hover && 'hover:-translate-y-1 hover:shadow-glow cursor-pointer',
        glow && 'shadow-glow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';
