"use client";

import Link from "next/link";
import { Search, User } from "lucide-react";
import { mockUser } from "@/lib/mock-data";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/80">
      <div className="container-safe flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-serif font-semibold tracking-tight text-slate-900 dark:text-white">
          Próximo Passo
        </Link>
        
        <div className="hidden md:flex flex-1 items-center justify-center max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Ex: Abrir empresa, Casar, Fui demitido..." 
              className="w-full rounded-full border border-slate-200 bg-slate-100/50 py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-800 dark:bg-slate-900"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <kbd className="hidden sm:inline-block rounded border border-slate-200 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">⌘</kbd>
              <kbd className="hidden sm:inline-block rounded border border-slate-200 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">K</kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/blog" className="hidden text-sm font-medium text-slate-600 hover:text-primary md:block dark:text-slate-400">
            Blog
          </Link>
          <Link href="/ferramentas" className="hidden text-sm font-medium text-slate-600 hover:text-primary md:block dark:text-slate-400">
            Ferramentas
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 rounded-full border border-slate-200 p-1 pr-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
            <div className="h-8 w-8 rounded-full bg-slate-100 overflow-hidden">
              <img src={mockUser.avatar} alt="Avatar" className="h-full w-full object-cover" />
            </div>
            <span className="text-sm font-medium">{mockUser.name.split(' ')[0]}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
