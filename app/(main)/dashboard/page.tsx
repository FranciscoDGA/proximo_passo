"use client";

import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Dados simulados - depois virão do banco de dados
  const myJourneys = [
    {
      id: 1,
      slug: "abrir-mei",
      title: "Abrir MEI",
      progress: 62,
      lastAccessed: "2 horas atrás",
      status: "em_progresso",
    },
    {
      id: 2,
      slug: "comprar-casa",
      title: "Comprar Casa",
      progress: 20,
      lastAccessed: "1 dia atrás",
      status: "em_progresso",
    },
  ];

  const suggestedJourneys = [
    {
      slug: "casar",
      title: "Casamento",
      description: "Guia para planejar seu casamento",
      category: "familia",
    },
    {
      slug: "inventario",
      title: "Inventário",
      description: "Processo de herança passo a passo",
      category: "familia",
    },
  ];

  const recentActivity = [
    { date: "Hoje", action: "Completou etapa 5 de Abrir MEI" },
    { date: "Ontem", action: "Iniciou jornada Comprar Casa" },
    { date: "2 dias atrás", action: "Baixou documento de MEI" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        <div className="container-safe py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Meu Dashboard
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Acompanhe seu progresso em cada jornada
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Minhas Jornadas */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Minhas Jornadas
                </h2>

                <div className="space-y-4">
                  {myJourneys.map((journey) => (
                    <Card key={journey.id} className="hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                {journey.title}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                Acessado {journey.lastAccessed}
                              </p>
                            </div>
                            <Badge variant="secondary">
                              {journey.progress}% Completo
                            </Badge>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                                style={{ width: `${journey.progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              {journey.progress}% Completo
                            </p>
                          </div>

                          <Link
                            href={`/journeys/${journey.slug}`}
                            className="inline-flex items-center text-primary font-medium hover:underline"
                          >
                            Continuar <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sugestões */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Explore Mais Jornadas
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  {suggestedJourneys.map((journey) => (
                    <Card key={journey.slug} className="hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle>{journey.title}</CardTitle>
                        <CardDescription>{journey.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/journeys/${journey.slug}`}>
                            Explorar
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Jornadas Iniciadas
                      </span>
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Progresso Médio
                      </span>
                      <span className="text-2xl font-bold text-secondary">41%</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Documentos
                      </span>
                      <span className="text-2xl font-bold text-accent">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Histórico Recente */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Atividade Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity, idx) => (
                      <div key={idx} className="border-b border-slate-200 dark:border-slate-800 pb-3 last:border-0">
                        <p className="text-xs font-semibold text-primary">
                          {activity.date}
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                          {activity.action}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upgrade */}
              <Card className="bg-gradient-to-br from-primary to-secondary text-white">
                <CardHeader>
                  <CardTitle className="text-lg">Upgrade Premium</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm opacity-90 mb-4">
                    Desbloqueie jornadas ilimitadas e especialista IA
                  </p>
                  <Button
                    variant="outline"
                    className="w-full text-primary hover:text-primary"
                    asChild
                  >
                    <Link href="/pricing">Ver Planos</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-safe py-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>&copy; 2024 Próximo Passo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
