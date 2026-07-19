"use client";

import { Navbar } from "@/components/layout/navbar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, ArrowLeft, Send, Sparkles, Target, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MockJourney, mockUser } from "@/lib/mock-data";
import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";

interface GenericJourneyProps {
  journey: MockJourney;
}

export function GenericJourney({ journey }: GenericJourneyProps) {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  
  const toggleStep = (id: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const progress = Math.round((Object.values(completedSteps).filter(Boolean).length / journey.steps.length) * 100);
  const backLink = journey.category === "conquistar" ? "/conquistar" : "/resolver";

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Integração com Vercel AI SDK
  // @ts-ignore
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    // @ts-ignore
    api: "/api/chat",
    body: {
      userJourneyId: journey.id, // Em prod, seria o id do UserJourney do BD
    },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: `Olá ${mockUser.name.split(" ")[0]}! Sou ${journey.specialistName}, seu guia nesta jornada de ${journey.title}. Como posso te ajudar agora?`
      }
    ]
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
                className="max-w-3xl"
              >
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <Badge variant="secondary" className={`${journey.category === 'conquistar' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`}>
                    {journey.category === 'conquistar' ? 'Conquista' : 'Resolução'}
                  </Badge>
                  <span className="flex items-center text-xs font-medium text-slate-500 gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    <Clock className="h-3 w-3" /> {journey.estimatedTime}
                  </span>
                  <span className="flex items-center text-xs font-medium text-slate-500 gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    Complexidade: {journey.complexity}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                  {journey.title}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {journey.description}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Unified Layout: Left Timeline, Right Chat/Sidebar */}
        <section className="py-12">
          <div className="container-safe max-w-6xl mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              
              {/* Left Column (Timeline) */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-8">
                
                <div className="card p-8 mb-8 border-primary/20 bg-indigo-50/50 dark:bg-primary/5 dark:border-primary/10">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2 flex items-center">
                    <Target className="w-4 h-4 mr-2" /> Objetivo Final
                  </h3>
                  <p className="text-xl font-serif font-medium">{journey.objective}</p>
                  
                  <div className="mt-8">
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span>Progresso da Jornada</span>
                      <span className="text-primary">{progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 space-y-12 pb-8">
                  {journey.steps.map((step, index) => {
                    const isCompleted = completedSteps[step.id];
                    return (
                      <div key={step.id} className="relative pl-8">
                        {/* Timeline dot */}
                        <div className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full border-2 bg-white dark:bg-slate-950 transition-colors duration-300 flex items-center justify-center ${isCompleted ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 dark:border-slate-600'}`}>
                          {isCompleted && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>
                        
                        <div 
                          className={`card p-6 transition-all duration-300 cursor-pointer ${isCompleted ? 'opacity-60 bg-slate-50 dark:bg-slate-900/50' : 'hover:border-primary/30 hover:shadow-md'}`}
                          onClick={() => toggleStep(step.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Passo {index + 1}</span>
                            <button className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 text-transparent hover:border-primary'}`}>
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          </div>
                          <h3 className={`text-xl font-semibold mb-2 ${isCompleted ? 'line-through text-slate-500' : ''}`}>
                            {step.title}
                          </h3>
                          <p className="text-slate-500">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Hub de Profissionais (SaaS Lead Gen) */}
                <div className="card mt-12 p-6 md:p-8 bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-900/30">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                    <ShieldCheck className="w-5 h-5" />
                    Hub de Profissionais Verificados
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Precisa de ajuda especializada?</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Esta jornada exige o acompanhamento de um profissional qualificado. Conheça nossos parceiros homologados.
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { name: "Dr. Carlos Eduardo", role: "Advogado Especialista", rating: 4.9, reviews: 124 },
                      { name: "Dra. Marina Silva", role: "Especialista em Direito de Família", rating: 5.0, reviews: 89 }
                    ].map((prof, i) => (
                      <div key={i} className="flex items-center p-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500/50 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mr-4">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${prof.name}`} alt={prof.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{prof.name}</h4>
                          <p className="text-xs text-slate-500">{prof.role}</p>
                          <div className="flex items-center gap-1 mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            {prof.rating} <span className="text-slate-400 font-normal">({prof.reviews} avaliações)</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (Mock AI Chat) */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24">
                
                <div className="card overflow-hidden p-0 flex flex-col h-[600px] border-primary/10 shadow-xl shadow-primary/5">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-primary/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{journey.specialistName}</h3>
                      <p className="text-xs text-slate-500">{journey.specialistRole}</p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 dark:bg-slate-950/30">
                    {messages.map((m: any) => (
                      <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {m.role === 'assistant' && (
                          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-primary/20 flex items-center justify-center shrink-0">
                            <Sparkles className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <div className={`p-3 rounded-2xl border text-sm shadow-sm ${
                          m.role === 'user' 
                            ? 'bg-primary text-white border-primary rounded-tr-none'
                            : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 rounded-tl-none'
                        }`}>
                          {m.content}
                          
                          {/* Fallback de UI para tool calls (Functions) no chat */}
                          {m.toolInvocations?.map((tool: any) => (
                            <div key={tool.toolCallId} className="mt-2 p-2 bg-slate-100 dark:bg-slate-900 rounded text-xs text-slate-500">
                              🛠️ Ação: {tool.toolName} executada.
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-primary/20 flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 text-sm shadow-sm flex gap-1">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                    <form onSubmit={handleSubmit} className="relative">
                      <input 
                        type="text" 
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Pergunte ao especialista..." 
                        className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-4 pr-12 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800"
                        disabled={isLoading}
                      />
                      <button 
                        type="submit" 
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white disabled:opacity-50" 
                        disabled={isLoading || !input.trim()}
                      >
                        <Send className="w-4 h-4 ml-0.5" />
                      </button>
                    </form>
                  </div>
                </div>

              </div>
              
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
