import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
      <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={item.path} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
          <Link
            href={item.path}
            className={`transition-colors ${
              index === items.length - 1 
                ? 'font-medium text-slate-900 dark:text-slate-100 pointer-events-none' 
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
