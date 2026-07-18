'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/providers/auth-provider';
import { getUserJourneys } from '@/lib/journeys-persistence';
import { getJourneysAction } from '@/app/actions/journeys';

interface UserJourney {
  id: string;
  user_id: string;
  journey_id: string;
  progress: number;
  checklist_data: Record<string, boolean>;
  saved_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [userJourneys, setUserJourneys] = useState<UserJourney[]>([]);
  const [allJourneys, setAllJourneys] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push('/signin');
      return;
    }

    const fetchData = async () => {
      try {
        const [userJourneysData, allJourneysData] = await Promise.all([
          getUserJourneys(user.id),
          getJourneysAction(),
        ]);
        setUserJourneys(userJourneysData);
        setAllJourneys(allJourneysData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Erro ao carregar jornadas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const suggestedJourneys = allJourneys
    .filter((j) => !userJourneys.some((uj) => uj.journey_id === j.id))
    .slice(0, 2);

  const myJourneys = userJourneys
    .map((uj) => {
      const journey = allJourneys.find((j) => j.id === uj.journey_id);
      if (!journey) return null;

      return {
        ...journey,
        progress: Math.round((uj.progress || 0) * 100),
        lastAccessed: new Date(uj.saved_at).toLocaleDateString('pt-BR'),
      };
    })
    .filter(Boolean);

  const totalJourneys = myJourneys.length;
  const avgProgress = totalJourneys > 0 ? Math.round(myJourneys.reduce((sum, j) => sum + j.progress, 0) / totalJourneys) : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        <div className="container-safe py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Bem-vindo, {user?.user_metadata?.name || 'Usuário'}!
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Acompanhe seu progresso em cada jornada
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-200">
              {error}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Minhas Jornadas */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Minhas Jornadas ({totalJourneys})
                </h2>

                {myJourneys.length > 0 ? (
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

                            <div className="space-y-2">
                              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                <div
                                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                                  style={{ width: `${journey.progress}%` }}
                                />
                              </div>
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
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-slate-600 dark:text-slate-300">
                        Você ainda não iniciou nenhuma jornada. Comece a explorar!
                      </p>
                      <Button asChild className="mt-4">
                        <Link href="/journeys">Explorar Jornadas</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sugestões */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Explore Mais Jornadas
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  {suggestedJourneys.map((journey) => (
                    <Card key={journey.id} className="hover:shadow-lg transition-all">
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
                      <span className="text-2xl font-bold text-primary">{totalJourneys}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Progresso Médio
                      </span>
                      <span className="text-2xl font-bold text-secondary">{avgProgress}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
