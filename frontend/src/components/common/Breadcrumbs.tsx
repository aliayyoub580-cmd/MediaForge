import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItemProps {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItemProps[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ name: 'Home', url: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-slate-500 dark:text-teal-200/70">
      <ol className="flex items-center gap-1.5 flex-wrap">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="w-3 h-3 text-slate-400 dark:text-teal-400/50 flex-shrink-0" />}
              {isLast ? (
                <span className="font-semibold text-slate-800 dark:text-teal-100 truncate max-w-[200px]" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="flex items-center gap-1 hover:text-teal-600 dark:hover:text-teal-300 transition-colors"
                >
                  {index === 0 && <Home className="w-3 h-3 text-teal-500" />}
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
