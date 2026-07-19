"use client";

import { motion } from "framer-motion";
import { mockUser, mockJourneys } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, PlayCircle } from "lucide-react";
import { Navbar } from "@/components/layout/navbar"; // I'll create this right after

export default function Dashboard() {
  const active = mockJourneys.filter(j => mockUser.activeJourneys.includes(j.slug));
  const completed = mockJourneys.filter(j => mockUser.completedJourneys.includes(j.slug));

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 container-safe py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-serif font-semibold">Minha Jornada</h1>
          <p className="text-slate-500">Bem-vindo de volta, {mockUser.name.split(' ')[0]}. Veja seu progresso.</p>
        </header>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Main Content - Active Journeys */}
          <div className="md:col-span-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <PlayCircle className="w-5 h-5 mr-2 text-primary" /> Em Andamento
              </h2>
              <div className="space-y-4">
                {active.map(j => (
                  <Link href={`/jornada/${j.slug}`} key={j.id} className="block group">
                    <div className="card-hover flex flex-col sm:flex-row sm:items-center justify-between p-6">
                      <div className="mb-4 sm:mb-0">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${j.category === 'conquistar' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`}>
                          {j.category === 'conquistar' ? 'Conquista' : 'Resolução'}
                        </span>
                        <h3 className="text-lg font-semibold">{j.title}</h3>
                        <p className="text-sm text-slate-500 mt-1">Próximo passo: {j.steps[0].title}</p>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="text-sm font-medium">10%</p>
                          <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '10%' }}></div>
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-400">
                <CheckCircle2 className="w-5 h-5 mr-2" /> Concluídas
              </h2>
              <div className="space-y-4 opacity-75">
                {completed.map(j => (
                  <div key={j.id} className="card p-6 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-500">{j.title}</h3>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1 flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Jornada arquivada
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <div className="card bg-indigo-50 border-none dark:bg-indigo-950/30 p-6">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">Plano Atual</h3>
              <p className="text-3xl font-serif text-indigo-900 dark:text-white mb-4">{mockUser.plan}</p>
              <button className="w-full btn-primary bg-indigo-600 hover:bg-indigo-700">Gerenciar Plano</button>
            </div>
            
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Alertas Pendentes</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Prazo de ITBI vencendo</p>
                    <p className="text-xs text-slate-500">Comprar Imóvel • Faltam 2 dias</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
