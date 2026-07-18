"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Briefcase, Heart, Home as HomeIcon } from "lucide-react";
import journeys from "@/data/journeys.json";

// Helper to map icon names to Lucide components
const iconMap: Record<string, any> = {
  briefcase: Briefcase,
  home: HomeIcon,
  heart: Heart,
};

export default function ConquistarPage() {
  const conquistarJourneys = journeys.filter((j) => j.type === "conquistar");

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 selection:bg-primary/30">
      <div className="container-safe py-12 md:py-20 max-w-5xl mx-auto px-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Voltar
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            O que você deseja conquistar?
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Selecione seu objetivo para iniciarmos sua jornada personalizada.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {conquistarJourneys.map((journey, i) => {
            const Icon = iconMap[journey.icon] || Briefcase;
            
            return (
              <motion.div
                key={journey.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/jornada/${journey.slug}`} className="block h-full group">
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary/40">
                    <div>
                      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        {journey.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        {journey.description}
                      </p>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                          {journey.stepsCount} etapas
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                          {journey.estimatedTime}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
