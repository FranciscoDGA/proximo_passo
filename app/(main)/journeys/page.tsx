import { Navbar } from "@/components/layout/navbar";
import { JourneyCard } from "@/components/journeys/journey-card";
import journeys from "@/data/journeys.json";

export const metadata = {
  title: "Explorar Jornadas - Próximo Passo",
  description: "Explore todas as jornadas de vida disponíveis no Próximo Passo",
};

export default function JourneysPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        <div className="container-safe py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Explorar Guias
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Escolha uma jornada para começar seu guia personalizado
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {journeys.map((journey) => (
              <JourneyCard
                key={journey.id}
                id={journey.id}
                slug={journey.slug}
                title={journey.title}
                description={journey.description}
                category={journey.category}
                stepsCount={journey.stepsCount}
                estimatedTime={journey.estimatedTime}
              />
            ))}
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
