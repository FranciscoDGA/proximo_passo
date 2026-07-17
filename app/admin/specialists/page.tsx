import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gerenciar Especialistas | Admin Próximo Passo',
};

export const dynamic = 'force-dynamic';

const MOCK_SPECIALISTS = [
  {
    id: '1',
    name: 'Especialista em MEI',
    journeyId: 'abrir-mei',
    model: 'gpt-4o-mini',
    status: 'ativo',
    messagesCount: 1234,
  },
  {
    id: '2',
    name: 'Especialista em Imóveis',
    journeyId: 'comprar-casa',
    model: 'gpt-4o-mini',
    status: 'ativo',
    messagesCount: 2156,
  },
  {
    id: '3',
    name: 'Especialista em Sucessão',
    journeyId: 'inventario',
    model: 'gpt-4o-mini',
    status: 'ativo',
    messagesCount: 834,
  },
  {
    id: '4',
    name: 'Especialista em Casamento',
    journeyId: 'casar',
    model: 'gpt-4o-mini',
    status: 'ativo',
    messagesCount: 567,
  },
  {
    id: '5',
    name: 'Especialista em Imposto de Renda',
    journeyId: 'imposto-renda',
    model: 'gpt-4o-mini',
    status: 'ativo',
    messagesCount: 1892,
  },
];

export default function SpecialistsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Gerenciar Especialistas IA
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Configure prompts e modelos para cada especialista de jornada
          </p>
        </div>
        <Link href="/admin/specialists/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Especialista
          </Button>
        </Link>
      </div>

      {/* Specialists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_SPECIALISTS.map((specialist) => (
          <Card key={specialist.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{specialist.name}</CardTitle>
                  <CardDescription>
                    Jornada: {specialist.journeyId}
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  {specialist.status === 'ativo' ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Modelo</p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {specialist.model}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Mensagens Processadas
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {specialist.messagesCount.toLocaleString('pt-BR')}
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Link href={`/admin/specialists/${specialist.id}/edit`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  title="Deletar"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Specialists Info */}
      <Card>
        <CardHeader>
          <CardTitle>Sobre Especialistas IA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <p>
            Cada jornada possui um especialista IA que fornece orientações personalizadas baseadas em
            um system prompt configurado.
          </p>
          <p>
            Os especialistas usam o modelo OpenAI (gpt-4o-mini) para manter custos baixos enquanto
            fornecem respostas de qualidade.
          </p>
          <p>
            Você pode editar o prompt de sistema de cada especialista para ajustar o tom, nível de
            detalhe e informações específicas fornecidas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
