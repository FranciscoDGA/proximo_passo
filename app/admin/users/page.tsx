import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gerenciar Usuários | Admin Próximo Passo',
};

export const dynamic = 'force-dynamic';

const MOCK_USERS = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    plan: 'Premium',
    status: 'ativo',
    joinedAt: '2024-01-10',
    journeys: 3,
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    plan: 'Free',
    status: 'ativo',
    joinedAt: '2024-01-15',
    journeys: 1,
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    plan: 'Família',
    status: 'ativo',
    joinedAt: '2024-01-20',
    journeys: 5,
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana@email.com',
    plan: 'Premium',
    status: 'inativo',
    joinedAt: '2024-02-01',
    journeys: 2,
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    email: 'carlos@email.com',
    plan: 'Free',
    status: 'ativo',
    joinedAt: '2024-02-05',
    journeys: 0,
  },
];

const PLAN_COLORS: Record<string, string> = {
  Free: 'bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300',
  Premium: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  Família: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
  Empresarial: 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
};

export default function UsersPage() {
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
          <CardDescription>Total: {MOCK_USERS.length} usuários</CardDescription>
        </CardHeader>
        <CardContent>
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
                    Status
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
                {MOCK_USERS.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={PLAN_COLORS[user.plan] || PLAN_COLORS.Free}
                        variant="secondary"
                      >
                        {user.plan}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium">
                        {user.journeys}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="secondary"
                        className={
                          user.status === 'ativo'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                            : 'bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300'
                        }
                      >
                        {user.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(user.joinedAt).toLocaleDateString('pt-BR')}
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
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {MOCK_USERS.filter((u) => u.status === 'ativo').length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {MOCK_USERS.filter((u) => u.plan !== 'Free').length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Média de Jornadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {(MOCK_USERS.reduce((acc, u) => acc + u.journeys, 0) / MOCK_USERS.length).toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
