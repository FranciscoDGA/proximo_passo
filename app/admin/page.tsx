import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Compass, BookOpen, MessageSquare, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard Admin | Próximo Passo',
};

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  // Mock data - replace with real database queries
  const stats = [
    {
      label: 'Total de Usuários',
      value: '1,234',
      icon: Users,
      color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Jornadas',
      value: '5',
      icon: Compass,
      color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    },
    {
      label: 'Artigos',
      value: '47',
      icon: BookOpen,
      color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    },
    {
      label: 'Especialistas IA',
      value: '5',
      icon: MessageSquare,
      color: 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Admin</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Bem-vindo ao painel de administração. Aqui você gerencia conteúdo e visualiza analytics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {stat.label}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Usuários Recentes</CardTitle>
            <CardDescription>Últimos usuários cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 last:border-b-0">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Usuário {i}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">user{i}@email.com</p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Há {i} dias</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Used Journeys */}
        <Card>
          <CardHeader>
            <CardTitle>Jornadas Mais Usadas</CardTitle>
            <CardDescription>Histórico de acessos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Abrir MEI', users: 342 },
                { name: 'Comprar Casa', users: 285 },
                { name: 'Inventário', users: 156 },
              ].map((journey) => (
                <div key={journey.name} className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 last:border-b-0">
                  <p className="font-medium text-slate-900 dark:text-white">{journey.name}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {journey.users}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Gerencia rápida dos principais recursos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Nova Jornada', href: '/admin/journeys/new' },
              { label: 'Novo Artigo', href: '/admin/articles/new' },
              { label: 'Gerenciar Especialistas', href: '/admin/specialists' },
              { label: 'Ver Analytics', href: '/admin/analytics' },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center"
              >
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {action.label}
                </p>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
