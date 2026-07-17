import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gerenciar Artigos | Admin Próximo Passo',
};

export const dynamic = 'force-dynamic';

const MOCK_ARTICLES = [
  {
    id: '1',
    slug: 'mei-impostos',
    title: 'Tudo sobre Impostos para MEI',
    category: 'MEI',
    author: 'Admin',
    publishedAt: '2024-01-10',
  },
  {
    id: '2',
    slug: 'compra-imovel-financiamento',
    title: 'Guia Completo: Compra de Imóvel com Financiamento',
    category: 'Imóvel',
    author: 'Admin',
    publishedAt: '2024-01-15',
  },
  {
    id: '3',
    slug: 'imposto-renda-deducoes',
    title: '10 Deduções de IR que Você Pode Aproveitar',
    category: 'IR',
    author: 'Admin',
    publishedAt: '2024-01-20',
  },
];

export default function ArticlesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerenciar Artigos</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Publique e gerencie artigos do blog com conteúdo educativo
          </p>
        </div>
        <Link href="/admin/articles/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Artigo
          </Button>
        </Link>
      </div>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Artigos</CardTitle>
          <CardDescription>Total: {MOCK_ARTICLES.length} artigos publicados</CardDescription>
        </CardHeader>
        <CardContent>
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
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    Autor
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
                {MOCK_ARTICLES.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {article.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          /blog/{article.slug}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {article.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {article.author}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/blog/${article.slug}`}>
                          <Button variant="ghost" size="sm" title="Visualizar">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/articles/${article.id}/edit`}>
                          <Button variant="ghost" size="sm" title="Editar">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" title="Deletar" className="text-red-600 hover:text-red-700">
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
    </div>
  );
}
