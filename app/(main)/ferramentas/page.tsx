"use client";

import { Navbar } from "@/components/layout/navbar";
import { mockTools, mockJourneys } from "@/lib/mock-data";
import { Calculator, ListTodo, Calendar, ArrowRight } from "lucide-react";

export default function Tools() {
  const getIcon = (category: string) => {
    switch (category) {
      case "Calculadoras": return <Calculator className="w-6 h-6 text-primary" />;
      case "Organizadores": return <ListTodo className="w-6 h-6 text-emerald-500" />;
      default: return <Calendar className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <main className="flex-1 container-safe py-12 md:py-20">
        <header className="mb-16 max-w-2xl text-center mx-auto">
          <h1 className="text-4xl font-serif font-semibold mb-4">Ferramentas Práticas</h1>
          <p className="text-lg text-slate-500">Calculadoras, cronogramas e organizadores criados para acelerar a sua jornada.</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTools.map(tool => {
            const relatedJourney = mockJourneys.find(j => j.slug === tool.journeySlug);
            
            return (
              <div key={tool.id} className="card-hover flex flex-col p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {getIcon(tool.category)}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{tool.category}</span>
                    <h3 className="font-semibold text-lg">{tool.title}</h3>
                  </div>
                </div>
                
                <p className="text-slate-500 text-sm mb-6 flex-1">
                  {tool.description}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  {relatedJourney ? (
                    <span className="text-xs text-slate-400 truncate max-w-[150px]">
                      Jornada: {relatedJourney.title}
                    </span>
                  ) : <span></span>}
                  
                  <button className="text-sm font-medium text-primary flex items-center hover:underline">
                    Acessar <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
