"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, ShieldAlert } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950 items-center justify-center selection:bg-primary/30">
      
      {/* Top minimal nav */}
      <nav className="absolute top-0 w-full flex items-center justify-between p-6 md:p-10">
        <div className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Próximo Passo
        </div>
        <Link 
          href="/dashboard"
          className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          Minha Jornada
        </Link>
      </nav>

      <main className="w-full max-w-4xl px-6 py-20 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            Em que momento da <br className="hidden md:block"/> vida você está?
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Não importa se você busca uma grande conquista ou precisa resolver um problema urgente. 
            Nós te mostramos o próximo passo.
          </p>
        </motion.div>

        <div className="mt-16 grid w-full max-w-2xl gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/conquistar" className="block group">
              <div className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary/50">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  Quero conquistar algo
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Abrir empresa, comprar casa, casar, planejar o futuro.
                </p>
                
                <div className="mt-8 flex items-center text-sm font-medium text-primary">
                  <span>Começar jornada</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/resolver" className="block group">
              <div className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-red-500/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-red-500/50">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  Preciso resolver algo
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Demissão, luto, falência, processos burocráticos urgentes.
                </p>
                
                <div className="mt-8 flex items-center text-sm font-medium text-red-500">
                  <span>Encontrar solução</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
