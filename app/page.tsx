import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-dark-border">
        <div className="container-safe flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-primary">Próximo Passo</div>
          <div className="flex gap-6">
            <Link
              href="/journeys"
              className="text-slate-600 transition-colors hover:text-primary dark:text-dark-text"
            >
              Explorar Guias
            </Link>
            <Link
              href="/signin"
              className="text-slate-600 transition-colors hover:text-primary dark:text-dark-text"
            >
              Entrar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-950 dark:via-dark-bg dark:to-slate-900">
        <div className="container-safe py-20 text-center sm:py-32">
          <div className="animate-slide-up">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-7xl">
              Não sabe o que fazer agora?
            </h1>
            <p className="mt-6 text-xl text-slate-600 dark:text-slate-300">
              Nós mostramos o próximo passo.
            </p>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
              Receba orientação personalizada para abrir empresa, comprar imóvel,
              aposentadoria, inventário, casamento, documentos, benefícios e muito mais.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/journeys" className="btn-primary">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="#features" className="btn-secondary">
                Explorar Guias
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="card-hover">
              <div className="text-3xl font-bold text-primary">50+</div>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Guias de Vida</p>
            </div>
            <div className="card-hover">
              <div className="text-3xl font-bold text-secondary">1000+</div>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Checklists</p>
            </div>
            <div className="card-hover">
              <div className="text-3xl font-bold text-accent">100K+</div>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Pessoas Ajudadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section id="features" className="py-20 sm:py-32">
        <div className="container-safe">
          <h2 className="text-center text-4xl font-bold text-slate-900 dark:text-white">
            Como Funciona
          </h2>
          <p className="mt-4 text-center text-lg text-slate-600 dark:text-slate-400">
            Seu GPS pessoal para os momentos importantes da vida
          </p>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "1. Escolha sua Jornada",
                description: "Selecione o evento importante que você precisa navegar",
              },
              {
                title: "2. Receba Orientação",
                description: "IA especialista guia você passo a passo",
              },
              {
                title: "3. Acompanhe Progresso",
                description: "Checklist inteligente e timeline visual",
              },
            ].map((feature) => (
              <div key={feature.title} className="card-hover">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-white sm:py-32">
        <div className="container-safe text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">
            Pronto para começar sua jornada?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Junte-se a milhares de pessoas que já encontraram seu próximo passo
          </p>
          <Link href="/journeys" className="mt-8 inline-block rounded-lg bg-white px-8 py-4 font-semibold text-primary transition-all hover:bg-slate-100">
            Explorar Guias Agora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-dark-border">
        <div className="container-safe py-12 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>&copy; 2024 Próximo Passo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
