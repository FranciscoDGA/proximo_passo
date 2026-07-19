import { notFound } from "next/navigation";
import { GenericJourney } from "@/components/journeys/generic-journey";
import { getJourneyBySlug } from "@/lib/journeys";
import { SchemaMarkup } from "@/components/seo/schema-markup";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

interface JourneySEOPageProps {
  params: {
    slug: string[]; // Pode ser ['abrir-empresa'], ou ['abrir-empresa', 'checklist']
  };
}

export async function generateMetadata({ params }: JourneySEOPageProps) {
  const journeySlug = params.slug[0];
  const subroute = params.slug[1];

  const journey = getJourneyBySlug(journeySlug);
  if (!journey) return { title: "Página não encontrada" };

  let title = `${journey.title} - Próximo Passo`;
  let description = journey.description;

  if (subroute === "checklist") {
    title = `Checklist Completo: ${journey.title} - Próximo Passo`;
    description = `Confira o checklist passo a passo com todas as etapas para ${journey.title.toLowerCase()}.`;
  } else if (subroute === "perguntas-frequentes") {
    title = `FAQ: ${journey.title} - Próximo Passo`;
    description = `Tire suas dúvidas sobre ${journey.title.toLowerCase()} com nossas perguntas frequentes.`;
  }

  return { title, description };
}

export default function JourneySEOPage({ params }: JourneySEOPageProps) {
  const journeySlug = params.slug[0];
  const subroute = params.slug[1];

  // Em produção, isso viria do Prisma via db.journey.findUnique
  const journey = getJourneyBySlug(journeySlug);

  if (!journey) {
    notFound();
  }

  // 1. Renderiza Landing Principal se for array de 1
  if (!subroute) {
    return (
      <>
        <SchemaMarkup 
          type="Article" 
          data={{ headline: journey.title, description: journey.description }} 
        />
        <Breadcrumbs items={[
          { label: "Jornadas", path: "/conquistar" },
          { label: journey.title, path: `/jornadas/${journeySlug}` }
        ]} />
        <GenericJourney journey={journey} />
      </>
    );
  }

  // 2. Renderiza Checklist Programático
  if (subroute === "checklist") {
    return (
      <div className="container-safe py-12 max-w-4xl mx-auto">
        <SchemaMarkup type="HowTo" data={{ name: `Como ${journey.title}`, steps: journey.steps.map(s => s.title) }} />
        <Breadcrumbs items={[
          { label: "Jornadas", path: "/conquistar" },
          { label: journey.title, path: `/jornadas/${journeySlug}` },
          { label: "Checklist Completo", path: `/jornadas/${journeySlug}/checklist` }
        ]} />
        
        <h1 className="text-3xl font-bold mb-4">Checklist: {journey.title}</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Acompanhe todos os passos necessários para concluir esta jornada.
        </p>

        <div className="space-y-4">
          {journey.steps.map((step, i) => (
            <div key={step.id} className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{step.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. Renderiza FAQ Programático
  if (subroute === "perguntas-frequentes") {
    return (
      <div className="container-safe py-12 max-w-3xl mx-auto">
        <SchemaMarkup type="FAQ" data={{ questions: [{ q: `Como funciona ${journey.title}?`, a: "Siga as etapas do nosso guia." }] }} />
        <Breadcrumbs items={[
          { label: "Jornadas", path: "/conquistar" },
          { label: journey.title, path: `/jornadas/${journeySlug}` },
          { label: "FAQ", path: `/jornadas/${journeySlug}/perguntas-frequentes` }
        ]} />
        
        <h1 className="text-3xl font-bold mb-8">Perguntas Frequentes: {journey.title}</h1>
        <div className="prose dark:prose-invert">
          <p>Aqui estarão as respostas automatizadas geradas pela base de conhecimento da jornada.</p>
        </div>
      </div>
    );
  }

  // Fallback 404
  notFound();
}
