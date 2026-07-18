import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { getAdminUsers } from '@/app/actions/admin';

export const metadata: Metadata = {
  title: 'Gerenciar Usuários | Admin Próximo Passo',
};

export const dynamic = 'force-dynamic';

const PLAN_COLORS: Record<string, string> = {
  free: 'bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300',
  premium: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  familia: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
  empresarial: 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
  admin: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300',
};

const PLAN_LABELS: Record<string, string> = {
  free: 'Free',
  premium: 'Premium',
  familia: 'Família',
  empresarial: 'Empresarial',
  admin: 'Admin',
};

export default async function UsersPage() {
  const users = await getAdminUsers();

  const premiumCount = users.filter((u) => u.subscription_tier !== 'free').length;
  const avgJourneys = users.length > 0
    ? (users.reduce((acc, u) => acc + (u.journeys_count || 0), 0) / users.length).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerenciar Usuários</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Visualize e gerencie contas de usuários e suas subscrições
        </p>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Usuários</CardTitle>
          <CardDescription>Total: {users.length} usuários cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-600 dark:text-slate-400">
                Nenhum usuário cadastrado ainda. Os usuários aparecem aqui após fazer signup.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Usuário
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Plano
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Jornadas
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Cadastrado em
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {user.name || 'Usuário sem nome'}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {user.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={PLAN_COLORS[user.subscription_tier] || PLAN_COLORS.free}
                          variant="secondary"
                        >
                          {PLAN_LABELS[user.subscription_tier] || 'Free'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium">
                          {user.journeys_count || 0}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {new Date(user.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/users/${user.id}`}>
                            <Button variant="ghost" size="sm" title="Visualizar">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Deletar"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{users.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{premiumCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Média de Jornadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{avgJourneys}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
