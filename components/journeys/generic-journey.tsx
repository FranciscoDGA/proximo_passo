"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Checklist } from "@/components/journeys/checklist";
import { ProgressBar } from "@/components/journeys/progress-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, FileText, MessageCircle } from "lucide-react";

interface JourneyData {
  id: string;
  slug: string;
  title: string;
  description: string;
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
  const [activeTab, setActiveTab] = useState<
    "checklist" | "timeline" | "docs" | "faqs" | "chat"
  >("checklist");

  const checklist = journey.sections.checklist.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
  }));

  const tabs = [
    { key: "checklist", label: "Checklist", icon: "✓" },
    ...(journey.sections.timeline
      ? [{ key: "timeline", label: "Timeline", icon: "📅" }]
      : []),
    ...(journey.sections.documents
      ? [{ key: "docs", label: "Documentos", icon: "📄" }]
      : []),
    ...(journey.sections.faqs ? [{ key: "faqs", label: "FAQs", icon: "❓" }] : []),
    { key: "chat", label: "Especialista", icon: "💬" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 py-12">
          <div className="container-safe">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Badge>{journey.category}</Badge>
                <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
                  {journey.title}
                </h1>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                  {journey.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-300">
                      {journey.stepsCount} etapas
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-slate-600 dark:text-slate-300">
                      {journey.estimatedTime}
                    </span>
                  </div>
                </div>

                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Visão Geral</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 dark:text-slate-300">
                      {journey.sections.overview.description}
                    </p>
                    {journey.sections.overview.benefits && (
                      <ul className="mt-4 space-y-2">
                        {journey.sections.overview.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-slate-700 dark:text-slate-300">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <ProgressBar
                  current={0}
                  total={journey.stepsCount}
                  journeySlug={journey.slug}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 bg-white dark:bg-slate-950">
          <div className="container-safe">
            <div className="flex gap-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() =>
                    setActiveTab(tab.key as typeof activeTab)
                  }
                  className={`border-b-2 px-4 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.key
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container-safe grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {activeTab === "checklist" && (
                <Checklist items={checklist} journeySlug={journey.slug} journeyId={journey.id} />
              )}

              {activeTab === "timeline" &&
                journey.sections.timeline && (
                  <div className="space-y-6">
                    {journey.sections.timeline.map((phase) => (
                      <Card key={phase.day}>
                        <CardHeader>
                          <CardTitle className="text-lg">Dia {phase.day}</CardTitle>
                          <CardDescription>{phase.title}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {phase.tasks.map((task) => (
                              <li key={task} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                <span className="text-slate-700 dark:text-slate-300">
                                  {task}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

              {activeTab === "docs" &&
                journey.sections.documents && (
                  <div className="space-y-4">
                    {journey.sections.documents.map((doc) => (
                      <Card key={doc.name}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                              <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                  {doc.name}
                                </h3>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                  {doc.description}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

              {activeTab === "faqs" &&
                journey.sections.faqs && (
                  <div className="space-y-6">
                    {journey.sections.faqs.map((faq, idx) => (
                      <div key={idx}>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {faq.q}
                        </h3>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">{faq.a}</p>
                        {idx < journey.sections.faqs!.length - 1 && (
                          <div className="mt-6 border-t border-slate-200 dark:border-slate-800" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

              {activeTab === "chat" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Especialista em {journey.title}
                    </CardTitle>
                    <CardDescription>
                      Converse com nossa IA especialista
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg bg-slate-100 p-6 text-center dark:bg-slate-800">
                      <p className="text-slate-600 dark:text-slate-400">
                        Chat com especialista IA será ativado em breve.
                      </p>
                      <Button className="mt-4">Contatar Suporte</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {journey.sections.costs && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Custos Envolvidos</CardTitle>
                    {journey.sections.costs.description && (
                      <CardDescription>
                        {journey.sections.costs.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {journey.sections.costs.items.map((item) => (
                        <div key={item.item} className="flex justify-between">
                          <span className="text-slate-700 dark:text-slate-300">
                            {item.item}
                          </span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {item.cost}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Próximos Passos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-inside space-y-2 text-sm">
                    <li className="text-slate-700 dark:text-slate-300">
                      1. Complete o checklist acima
                    </li>
                    <li className="text-slate-700 dark:text-slate-300">
                      2. Siga a timeline
                    </li>
                    <li className="text-slate-700 dark:text-slate-300">
                      3. Use os documentos
                    </li>
                    <li className="text-slate-700 dark:text-slate-300">
                      4. Fale com o especialista
                    </li>
                  </ol>
                </CardContent>
              </Card>
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
