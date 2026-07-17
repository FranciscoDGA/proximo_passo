import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, MessageSquare, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Analytics | Admin Próximo Passo',
};

export const dynamic = 'force-dynamic';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Métricas e estatísticas de uso da plataforma
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">1,234</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-sm font-medium">Chat Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">6,847</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +25% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-sm font-medium">Artigos Lidos</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">12,453</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +8% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">4.2%</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
              Free to Premium
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Usage by Journey */}
      <Card>
        <CardHeader>
          <CardTitle>Uso por Jornada</CardTitle>
          <CardDescription>Número de usuários por jornada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Abrir MEI', users: 342, percentage: 28 },
              { name: 'Comprar Casa', users: 285, percentage: 23 },
              { name: 'Inventário/Sucessão', users: 234, percentage: 19 },
              { name: 'Casar', users: 198, percentage: 16 },
              { name: 'Imposto de Renda', users: 175, percentage: 14 },
            ].map((journey) => (
              <div key={journey.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {journey.name}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {journey.users} usuários
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-green-500 h-full"
                    style={{ width: `${journey.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Growth */}
      <Card>
        <CardHeader>
          <CardTitle>Crescimento Mensal</CardTitle>
          <CardDescription>Usuários novos nos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { month: 'Setembro', users: 245 },
              { month: 'Outubro', users: 312 },
              { month: 'Novembro', users: 428 },
              { month: 'Dezembro', users: 567 },
              { month: 'Janeiro', users: 734 },
              { month: 'Fevereiro', users: 987 },
            ].map((item) => {
              const maxUsers = 987;
              const height = (item.users / maxUsers) * 100;
              return (
                <div key={item.month} className="flex items-end gap-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400 w-20">
                    {item.month}
                  </span>
                  <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-t h-12 relative">
                    <div
                      className="bg-gradient-to-t from-primary to-green-500 rounded-t h-full transition-all"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white w-12 text-right">
                    {item.users}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Plan Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Planos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Free', count: 735, percentage: 59 },
              { name: 'Premium', count: 402, percentage: 33 },
              { name: 'Família', count: 78, percentage: 6 },
              { name: 'Empresarial', count: 19, percentage: 2 },
            ].map((plan) => (
              <div key={plan.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-sm text-slate-900 dark:text-white">
                    {plan.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {plan.count} ({plan.percentage}%)
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receita Mensal Estimada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Premium</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                R$ 12.060
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                402 × R$ 29/mês
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Família</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                R$ 4.602
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                78 × R$ 59/mês
              </p>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Estimado</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                R$ 16.662
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
