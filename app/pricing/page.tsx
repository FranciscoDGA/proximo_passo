import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Preços - Próximo Passo",
  description: "Conheça nossos planos de assinatura",
};

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    description: "Comece sem compromisso",
    features: [
      "3 jornadas exploradas",
      "Blog completo",
      "3 ferramentas básicas",
      "Sem acesso a especialista IA",
    ],
    cta: "Começar Agora",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "R$ 29",
    period: "/mês",
    description: "Para quem quer acompanhamento completo",
    features: [
      "Jornadas ilimitadas",
      "Salvar progresso",
      "Histórico completo",
      "Acesso a especialista IA",
      "Exportar em PDF",
      "Sem anúncios",
      "Lembretes",
    ],
    cta: "Assinar Premium",
    highlighted: true,
  },
  {
    name: "Família",
    price: "R$ 59",
    period: "/mês",
    description: "Para até 5 pessoas",
    features: [
      "Tudo do Premium",
      "Até 5 pessoas na conta",
      "Compartilhar progresso",
      "Dashboard compartilhado",
      "Prioridade no suporte",
    ],
    cta: "Assinar Família",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 py-12 sm:py-20">
          <div className="container-safe text-center">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
              Planos Transparentes
            </h1>
            <p className="mt-4 text-xl text-slate-600 dark:text-slate-300">
              Escolha o plano ideal para suas necessidades
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 sm:py-20">
          <div className="container-safe">
            <div className="grid gap-8 sm:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-xl border-2 p-8 ${
                    plan.highlighted
                      ? "border-primary bg-blue-50 dark:bg-slate-900/50"
                      : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  {plan.highlighted && (
                    <Badge className="mb-4">Mais Popular</Badge>
                  )}

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {plan.description}
                  </p>

                  <div className="mt-6">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="ml-2 text-slate-600 dark:text-slate-400">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <Button
                    className="mt-8 w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>

                  <div className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-slate-200 dark:border-slate-800 py-12 sm:py-20">
          <div className="container-safe max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Perguntas Frequentes
            </h2>

            <div className="mt-8 space-y-6">
              {[
                {
                  q: "Posso cancelar minha assinatura a qualquer momento?",
                  a: "Sim, você pode cancelar sua assinatura a qualquer momento sem penalidades.",
                },
                {
                  q: "Qual é a diferença entre Premium e Família?",
                  a: "O plano Família permite até 5 pessoas na mesma conta e compartilhar progresso entre elas.",
                },
                {
                  q: "O plano gratuito tem limitações?",
                  a: "O plano gratuito permite explorar 3 jornadas sem salvar progresso. Ideal para testar a plataforma.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {q}
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">{a}</p>
                </div>
              ))}
            </div>
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
