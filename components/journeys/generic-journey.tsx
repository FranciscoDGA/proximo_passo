"use client";

import { Navbar } from "@/components/layout/navbar";
import { Checklist } from "@/components/journeys/checklist";
import { Chat } from "@/components/journeys/chat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface JourneyData {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  category: string;
  stepsCount: number;
  estimatedTime: string;
  sections: {
    overview: {
      description: string;
      benefits?: string[];
    };
    checklist: Array<{
      id: number;
      title: string;
      description: string;
    }>;
    timeline?: Array<{
      day: string;
      title: string;
      tasks: string[];
    }>;
    documents?: Array<{
      name: string;
      description: string;
      url: string;
    }>;
    faqs?: Array<{
      q: string;
      a: string;
    }>;
    costs?: {
      description?: string;
      items: Array<{
        item: string;
        cost: string;
      }>;
    };
  };
}

interface GenericJourneyProps {
  journey: JourneyData;
}

export function GenericJourney({ journey }: GenericJourneyProps) {
  const checklist = journey.sections.checklist.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
  }));

  const backLink = journey.type === "conquistar" ? "/conquistar" : "/resolver";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* Minimal Hero Header */}
        <section className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800 pt-8 pb-12">
          <div className="container-safe max-w-6xl mx-auto px-6">
            <Link 
              href={backLink}
              className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Voltar
            </Link>

            <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
                    {journey.category}
                  </Badge>
                  <span className="flex items-center text-xs font-medium text-slate-500 gap-1">
                    <Clock className="h-3 w-3" /> {journey.estimatedTime}
                  </span>
                  <span className="flex items-center text-xs font-medium text-slate-500 gap-1">
                    <CheckCircle2 className="h-3 w-3" /> {journey.stepsCount} etapas
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                  {journey.title}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {journey.description}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Unified Layout: Left Checklist, Right Chat/Sidebar */}
        <section className="py-12">
          <div className="container-safe max-w-6xl mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              
              {/* Left Column (Checklist and Content) */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Checklist items={checklist} journeySlug={journey.slug} journeyId={journey.id} />
                </motion.div>

                {journey.sections.overview.benefits && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">O que você ganha ao terminar</h3>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {journey.sections.overview.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {journey.sections.documents && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Modelos e Documentos</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {journey.sections.documents.map((doc) => (
                        <a href={doc.url} key={doc.name} className="group block p-5 rounded-2xl border border-slate-200 bg-white hover:border-primary/40 hover:shadow-sm transition-all dark:bg-slate-900 dark:border-slate-800">
                          <FileText className="h-8 w-8 text-slate-400 group-hover:text-primary mb-3 transition-colors" />
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{doc.name}</h4>
                          <p className="text-xs text-slate-500">{doc.description}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column (Sidebar/Chat) */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24">
                
                {/* AI Assistant Chat */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="shadow-xl shadow-primary/5 rounded-2xl overflow-hidden"
                >
                  <Chat journeyId={journey.id} journeyTitle={journey.title} />
                </motion.div>

                {/* Costs Breakdown */}
                {journey.sections.costs && (
                  <Card className="shadow-none border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-base">Custos Estimados</CardTitle>
                      {journey.sections.costs.description && (
                        <CardDescription className="text-xs">
                          {journey.sections.costs.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {journey.sections.costs.items.map((item) => (
                          <div key={item.item} className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2 last:border-0 last:pb-0">
                            <span className="text-slate-600 dark:text-slate-400">
                              {item.item}
                            </span>
                            <span className="font-medium text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                              {item.cost}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
