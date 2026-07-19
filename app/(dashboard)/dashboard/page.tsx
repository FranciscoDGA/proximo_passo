"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertTriangle, ArrowRight, TrendingUp, Download } from "lucide-react";
import Link from "next/link";
import { mockUser } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10">
      
      {/* Greeting & Quick Stats */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Olá, {mockUser.name.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Você tem 1 etapa bloqueando seu progresso. Vamos resolver?
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Próximo Passo mais importante (Widget Linear-style) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl p-6 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-4 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Ação Requerida Imediata
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Assinar Requerimento (Inventário)
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
              O advogado Paulo enviou a minuta final. Você precisa assinar para darmos entrada no cartório.
            </p>
            
            <div className="flex gap-3">
              <button className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
                Assinar Agora
              </button>
              <button className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Ver Documento
              </button>
            </div>
          </motion.div>

          {/* Jornadas em Andamento */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Jornadas Ativas</h3>
              <Link href="/dashboard/jornadas" className="text-sm text-primary hover:underline font-medium flex items-center">
                Ver todas <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {[
                { title: "Inventário Extrajudicial", progress: 65, status: "Aguardando Assinatura", color: "bg-indigo-500" },
                { title: "Abrir Empresa (MEI)", progress: 20, status: "Aguardando Prefeitura", color: "bg-emerald-500" }
              ].map((jornada, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{jornada.title}</h4>
                    <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-slate-600 dark:text-slate-300">
                      {jornada.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${jornada.color}`} style={{ width: `${jornada.progress}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 w-10 text-right">{jornada.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Widgets */}
        <div className="space-y-6">
          
          {/* Progresso Semanal */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" /> Progresso da Semana
            </h3>
            
            <div className="flex items-end gap-2 h-24 mb-4">
              {[30, 45, 20, 60, 100, 10, 0].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/10 dark:bg-primary/20 rounded-t-sm relative group">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm transition-all"
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span><span>Dom</span>
            </div>
            
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Você completou <strong className="text-slate-900 dark:text-white">4 tarefas</strong> esta semana.
            </p>
          </div>

          {/* Documentos Recentes */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2" /> Arquivos Recentes
            </h3>
            
            <div className="space-y-4">
              {[
                { name: "RG_Frente.pdf", date: "Ontem" },
                { name: "Contrato_Social.pdf", date: "Terça-feira" }
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-1">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
