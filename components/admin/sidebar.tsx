'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  User,
  BarChart3,
  Settings,
  MessageSquare,
} from 'lucide-react';

const ADMIN_ROUTES = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Jornadas',
    href: '/admin/journeys',
    icon: Compass,
  },
  {
    label: 'Artigos',
    href: '/admin/articles',
    icon: BookOpen,
  },
  {
    label: 'Especialistas',
    href: '/admin/specialists',
    icon: MessageSquare,
  },
  {
    label: 'Usuários',
    href: '/admin/users',
    icon: User,
  },
  {
    label: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    label: 'Configurações',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <nav className="space-y-2 p-4">
        {ADMIN_ROUTES.map((route) => {
          const Icon = route.icon;
          const isActive = pathname === route.href;

          return (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{route.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
