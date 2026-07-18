import { GenericJourney } from "@/components/journeys/generic-journey";
import { getJourneyBySlug } from "@/lib/journeys";

export const metadata = {
  title: "Abrir MEI - Próximo Passo",
  description: "Guia completo para formalizar seu trabalho como Microempreendedor Individual",
};

export default function AbrirMEIPage() {
  const journey = getJourneyBySlug("abrir-mei");

  if (!journey) {
    return <div>Journey not found</div>;
  }

  return <GenericJourney journey={journey} />;
}
