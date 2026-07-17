"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-slate-200 dark:border-slate-800">
      <div className="container-safe flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary">Próximo Passo</div>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div className={`${isOpen ? "block" : "hidden"} absolute left-0 right-0 top-16 border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 md:static md:border-none md:bg-transparent md:p-0 dark:md:bg-transparent`}>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <Link
              href="/journeys"
              className="text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-blue-400"
            >
              Explorar Guias
            </Link>
            <Link
              href="/blog"
              className="text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-blue-400"
            >
              Blog
            </Link>
            <Link
              href="/pricing"
              className="text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-blue-400"
            >
              Preços
            </Link>
            <div className="flex gap-2 pt-4 md:pt-0">
              <Button variant="ghost" asChild>
                <Link href="/signin">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Começar</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
