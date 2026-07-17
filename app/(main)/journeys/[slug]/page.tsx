import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, FileText } from "lucide-react";
import journeys from "@/data/journeys.json";

interface JourneyPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: JourneyPageProps) {
  const journey = journeys.find((j) => j.slug === params.slug);
  if (!journey) return { title: "Jornada não encontrada" };

  return {
    title: `${journey.title} - Próximo Passo`,
    description: journey.description,
  };
}

export async function generateStaticParams() {
  return journeys.map((journey) => ({
    slug: journey.slug,
  }));
}

export default function JourneyPage({ params }: JourneyPageProps) {
  const journey = journeys.find((j) => j.slug === params.slug);

  if (!journey) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 py-12">
          <div className="container-safe">
            <div className="max-w-2xl">
              <Badge>{journey.category}</Badge>
              <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
                {journey.title}
              </h1>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                {journey.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {journey.stepsCount} etapas
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {journey.estimatedTime}
                  </span>
                </div>
              </div>

              <Button className="mt-8" size="lg">
                Começar Agora
              </Button>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-12">
          <div className="container-safe">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Etapas do Processo
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Siga cada etapa para concluir sua jornada com sucesso
            </p>

            <div className="mt-8 space-y-4">
              {journey.steps.map((step, index) => (
                <Card key={step.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex gap-6 p-6">
                      <div className="flex items-start">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="border-t border-slate-200 dark:border-slate-800 py-12">
          <div className="container-safe">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Recursos Disponíveis
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <FileText className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Documentos</CardTitle>
                  <CardDescription>Modelos e templates prontos para usar</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CheckCircle2 className="h-6 w-6 text-green-500 mb-2" />
                  <CardTitle>Checklist</CardTitle>
                  <CardDescription>Lista completa de tudo que você precisa fazer</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-slate-200 dark:border-slate-800 bg-primary py-12 text-white">
          <div className="container-safe text-center">
            <h2 className="text-3xl font-bold">Pronto para começar?</h2>
            <p className="mt-4 text-lg opacity-90">
              Junte-se a milhares de pessoas que já completaram essa jornada
            </p>
            <Button size="lg" variant="secondary" className="mt-8">
              Iniciar Jornada
            </Button>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-safe py-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>&copy; 2024 Próximo Passo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
