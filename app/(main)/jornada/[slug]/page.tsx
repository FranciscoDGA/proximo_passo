import { notFound } from "next/navigation";
import { GenericJourney } from "@/components/journeys/generic-journey";
import { getJourneyBySlug, getAllJourneys } from "@/lib/journeys";

interface JourneyPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: JourneyPageProps) {
  const journey = getJourneyBySlug(params.slug);
  if (!journey) return { title: "Jornada não encontrada" };

  return {
    title: `${journey.title} - Próximo Passo`,
    description: journey.description,
  };
}

export async function generateStaticParams() {
  const journeys = getAllJourneys();
  return journeys.map((journey) => ({
    slug: journey.slug,
  }));
}

export default function JourneyPage({ params }: JourneyPageProps) {
  const journey = getJourneyBySlug(params.slug);

  if (!journey) {
    notFound();
  }

  return <GenericJourney journey={journey} />;
}
