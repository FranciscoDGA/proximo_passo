"use client";

import { Navbar } from "@/components/layout/navbar";
import { mockUser, mockJourneys } from "@/lib/mock-data";
import { Settings, Shield, Award, Map, CreditCard, ChevronRight } from "lucide-react";

export default function Perfil() {
  const completedCount = mockUser.completedJourneys.length;
  const activeCount = mockUser.activeJourneys.length;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <main className="flex-1 container-safe py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-serif font-semibold">Perfil e Conta</h1>
          <p className="text-slate-500">Gerencie suas informações pessoais e assinaturas.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Menu Lateral */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-primary text-white font-medium">
              <span className="flex items-center"><Settings className="w-5 h-5 mr-3" /> Conta</span>
              <ChevronRight className="w-5 h-5 opacity-70" />
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-100 text-slate-700 dark:hover:bg-slate-900 dark:text-slate-300 transition-colors">
              <span className="flex items-center"><Shield className="w-5 h-5 mr-3" /> Privacidade</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-100 text-slate-700 dark:hover:bg-slate-900 dark:text-slate-300 transition-colors">
              <span className="flex items-center"><CreditCard className="w-5 h-5 mr-3" /> Assinatura</span>
            </button>
          </div>

          {/* Conteúdo Principal */}
          <div className="md:col-span-2 space-y-8">
            <section className="card flex items-center gap-6 p-8">
              <img src={mockUser.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800" />
              <div>
                <h2 className="text-2xl font-semibold mb-1">{mockUser.name}</h2>
                <p className="text-slate-500 mb-4">{mockUser.email}</p>
                <div className="inline-flex items-center bg-indigo-50 text-indigo-700 dark:bg-primary/10 dark:text-primary px-3 py-1 rounded-full text-sm font-medium">
                  Plano {mockUser.plan}
                </div>
              </div>
            </section>

            <section className="grid sm:grid-cols-2 gap-4">
              <div className="card p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{completedCount}</h3>
                  <p className="text-sm text-slate-500">Jornadas Concluídas</p>
                </div>
              </div>
              <div className="card p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Map className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{activeCount}</h3>
                  <p className="text-sm text-slate-500">Em Andamento</p>
                </div>
              </div>
            </section>

            <section className="card p-8">
              <h3 className="text-lg font-semibold mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Informações Pessoais</h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome completo</label>
                    <input type="text" defaultValue={mockUser.name} className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900 outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" defaultValue={mockUser.email} className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900 outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="pt-4">
                  <button type="button" className="btn-primary">Salvar Alterações</button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
