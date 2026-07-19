"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, Activity, CreditCard, ArrowUpRight } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { name: "Usuários Ativos", value: "12,450", change: "+14%", icon: Users },
    { name: "MRR (Receita)", value: "R$ 45.200", change: "+23%", icon: DollarSign },
    { name: "Profissionais no Hub", value: "142", change: "+5%", icon: Activity },
    { name: "Assinaturas Premium", value: "850", change: "+12%", icon: CreditCard },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Visão Geral</h1>
          <p className="text-slate-400">Métricas de performance da plataforma Próximo Passo.</p>
        </div>
        <button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Exportar Relatório
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-rose-500" />
                </div>
                <span className="flex items-center text-emerald-500 text-xs font-semibold bg-emerald-500/10 px-2 py-1 rounded">
                  {stat.change} <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.name}</h3>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-6">Receita (Últimos 6 Meses)</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 55, 45, 70, 85, 100].map((h, i) => (
              <div key={i} className="w-full bg-slate-800 rounded-t-sm relative group">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-rose-500 rounded-t-sm transition-all group-hover:bg-rose-400"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500">
            <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-6">Últimos Profissionais Cadastrados (Hub)</h3>
          <div className="space-y-4">
            {[
              { name: "Dra. Carolina Silva", role: "Advogada de Família", status: "Aprovado" },
              { name: "João Pedro Costa", role: "Contador Tributário", status: "Pendente" },
              { name: "Mariana Alves", role: "Corretora de Imóveis", status: "Aprovado" },
            ].map((prof, i) => (
              <div key={i} className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-white">{prof.name}</p>
                  <p className="text-xs text-slate-500">{prof.role}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-medium ${prof.status === 'Aprovado' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  {prof.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
