"use client";

import { Navbar } from "@/components/layout/navbar";
import { mockArticles, mockJourneys } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

export default function Blog() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <main className="flex-1 container-safe py-12 md:py-20">
        <header className="mb-16 max-w-2xl text-center mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <BookOpen className="w-4 h-4 mr-2" /> Biblioteca de Guias
          </div>
          <h1 className="text-4xl font-serif font-semibold mb-4">Aprenda antes de agir</h1>
          <p className="text-lg text-slate-500">Artigos práticos que se conectam diretamente com as suas jornadas de vida. Sem enrolação, direto ao ponto.</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockArticles.map(article => {
            const relatedJourney = mockJourneys.find(j => j.slug === article.journeySlug);
            
            return (
              <div key={article.id} className="group card-hover flex flex-col p-8 h-full">
                <div className="mb-6 flex justify-between items-start">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    Leitura: {article.readTime}
                  </span>
                  {relatedJourney && (
                    <span className="inline-flex items-center text-xs font-medium text-primary">
                      Jornada conectada <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-slate-500 mb-8 flex-1">
                  {article.resume}
                </p>

                {relatedJourney && (
                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">Faz parte de:</p>
                    <Link href={`/jornada/${relatedJourney.slug}`} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-indigo-50 dark:hover:bg-primary/10 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center">
                        <Compass className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{relatedJourney.title}</p>
                        <p className="text-xs text-slate-500">{relatedJourney.steps.length} passos</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function Compass(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
