import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Configurações | Admin Próximo Passo',
};

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Configurações</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Gerencie as configurações globais da plataforma
        </p>
      </div>

      {/* Platform Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações da Plataforma</CardTitle>
          <CardDescription>Configurações gerais do sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Nome da Plataforma
            </label>
            <input
              type="text"
              defaultValue="Próximo Passo"
              className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              URL da Plataforma
            </label>
            <input
              type="text"
              defaultValue="https://proximopasso.com"
              className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Email de Suporte
            </label>
            <input
              type="email"
              defaultValue="suporte@proximopasso.com"
              className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2 text-slate-900 dark:text-white"
            />
          </div>

          <Button>Salvar Alterações</Button>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de API</CardTitle>
          <CardDescription>Gerenciar integrações e chaves de API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">OpenAI API</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Para chat com especialistas IA
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                Configurado
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Última verificação: Há 2 horas
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Supabase</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Banco de dados e autenticação
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                Conectado
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Última verificação: Agora
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Stripe</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Processamento de pagamentos
                </p>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300">
                Não Configurado
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure Stripe para aceitar pagamentos
            </p>
            <Button variant="outline" size="sm">Configurar Stripe</Button>
          </div>
        </CardContent>
      </Card>

      {/* Feature Flags */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Flags</CardTitle>
          <CardDescription>Ativar/desativar funcionalidades</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: 'Chat com Especialistas', enabled: true },
            { name: 'Ferramentas Interativas', enabled: true },
            { name: 'Blog', enabled: true },
            { name: 'Dashboard de Usuário', enabled: true },
            { name: 'Plano Família', enabled: false },
            { name: 'Plano Empresarial', enabled: false },
          ].map((flag) => (
            <div key={flag.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {flag.name}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={flag.enabled}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Dangerous Zone */}
      <Card className="border-red-200 dark:border-red-900/20">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Zona de Perigo</CardTitle>
          <CardDescription>Ações que não podem ser desfeitas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20">
            <p className="text-sm text-red-900 dark:text-red-200 mb-3">
              Limpar todo o cache de chat - isto excluirá o histórico de todas as conversas dos usuários.
            </p>
            <Button variant="destructive" size="sm">
              Limpar Cache
            </Button>
          </div>

          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20">
            <p className="text-sm text-red-900 dark:text-red-200 mb-3">
              Resetar base de dados - isto excluirá todos os dados de usuários, jornadas e artigos.
            </p>
            <Button variant="destructive" size="sm">
              Resetar Database
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
