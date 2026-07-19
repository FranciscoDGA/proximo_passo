"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, ShieldAlert, Star, Heart, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 w-full">
        {/* HERO SECTION */}
        <section className="container-safe py-24 md:py-32 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 max-w-3xl"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Seu guia para os grandes momentos
            </div>
            <h1 className="text-5xl md:text-7xl tracking-tight text-slate-900 dark:text-white">
              Em que momento da vida você está?
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
              Não importa se você busca uma grande conquista ou precisa resolver um problema urgente. 
              Nós organizamos o caminho e mostramos o próximo passo.
            </p>
          </motion.div>

          <div className="mt-16 grid w-full max-w-4xl gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/conquistar" className="block group h-full">
                <div className="relative h-full flex flex-col items-center text-center rounded-3xl border border-slate-200 bg-white p-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary/50">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-primary dark:bg-primary/10">
                    <Compass className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    Quero conquistar algo
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8">
                    Abrir empresa, comprar imóvel, casar, planejar o futuro.
                  </p>
                  <div className="mt-auto flex items-center text-sm font-medium text-primary bg-indigo-50/50 dark:bg-primary/5 px-4 py-2 rounded-full group-hover:bg-indigo-100 dark:group-hover:bg-primary/20 transition-colors">
                    Explorar jornadas <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/resolver" className="block group h-full">
                <div className="relative h-full flex flex-col items-center text-center rounded-3xl border border-slate-200 bg-white p-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-amber-500/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-amber-500/50">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-500/10">
                    <ShieldAlert className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    Preciso resolver algo
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8">
                    Demissão, falência, processos burocráticos ou luto.
                  </p>
                  <div className="mt-auto flex items-center text-sm font-medium text-amber-600 bg-amber-50/50 dark:bg-amber-500/5 px-4 py-2 rounded-full group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20 transition-colors">
                    Encontrar solução <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="bg-white py-24 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
          <div className="container-safe">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 dark:text-white mb-4">
                Como o Próximo Passo funciona
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Substituímos a ansiedade e as buscas infinitas no Google por um GPS claro e direto.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "1. Escolha a Jornada", desc: "Selecione o seu momento de vida atual.", icon: <Compass className="w-6 h-6 text-primary"/> },
                { title: "2. Siga o Checklist", desc: "Siga o mapa passo a passo, sem informações inúteis.", icon: <CheckCircle2 className="w-6 h-6 text-emerald-500"/> },
                { title: "3. Avance com IA", desc: "Tire dúvidas com nosso Especialista IA em tempo real.", icon: <Star className="w-6 h-6 text-amber-500"/> },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS FICTÍCIOS */}
        <section className="py-24">
          <div className="container-safe">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-semibold">O alívio de saber o que fazer</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { quote: "Eu estava perdida com a burocracia de abrir empresa. O checklist foi perfeito.", author: "Mariana Costa", role: "Nova Empreendedora" },
                { quote: "Quando fui demitido, não sabia nem como sacar o FGTS. A plataforma me guiou do zero.", author: "Roberto Alves", role: "Profissional de TI" },
                { quote: "Compramos nossa primeira casa sem medo, graças a verificação de documentos sugerida.", author: "Família Souza", role: "Compradores" },
              ].map((t, i) => (
                <div key={i} className="card p-8 flex flex-col">
                  <Heart className="w-8 h-8 text-rose-500/20 mb-6" fill="currentColor"/>
                  <p className="text-slate-700 dark:text-slate-300 flex-1 mb-6 leading-relaxed">&quot;{t.quote}&quot;</p>
                  <div>
                    <p className="font-medium">{t.author}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="container-safe flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-serif font-semibold">Próximo Passo</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="/sobre" className="hover:text-primary">Sobre</Link>
            <Link href="/termos" className="hover:text-primary">Privacidade</Link>
            <Link href="/contato" className="hover:text-primary">Contato</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
