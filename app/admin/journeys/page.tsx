import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { getAdminJourneys } from '@/app/actions/admin';

export const metadata: Metadata = {
  title: 'Gerenciar Jornadas | Admin Próximo Passo',
};

export const dynamic = 'force-dynamic';

export default async function JourneysPage() {
  const journeys = await getAdminJourneys();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerenciar Jornadas</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Crie, edite e gerencie as jornadas da vida disponíveis na plataforma
          </p>
        </div>
        <Link href="/admin/journeys/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Jornada
          </Button>
        </Link>
      </div>

      {/* Journeys Table */}
      <Card>
        <CardHeader>
          <CardTitle>Todas as Jornadas</CardTitle>
          <CardDescription>Total: {journeys.length} jornadas publicadas</CardDescription>
        </CardHeader>
        <CardContent>
          {journeys.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-600 dark:text-slate-400">
                Nenhuma jornada criada ainda. Crie a primeira jornada para começar.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Título
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Categoria
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Etapas
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Publicado
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {journeys.map((journey) => (
                    <tr
                      key={journey.id}
                      className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {journey.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            /{journey.slug}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {journey.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium">
                          {journey.steps_count}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {new Date(journey.published_at).toLocaleDateString('pt-BR')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/journeys/${journey.slug}`}>
                            <Button variant="ghost" size="sm" title="Visualizar">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/journeys/${journey.id}/edit`}>
                            <Button variant="ghost" size="sm" title="Editar">
                              <Edit className="h-4 w-4" />
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
    </div>
  );
}
