"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { signOut } from "@/lib/auth";

export function Navbar() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
      setIsSigningOut(false);
    }
  };

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
              {isMounted && !isLoading && user ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/dashboard">
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </Button>
                </>
              ) : isMounted && !isLoading ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/signin">Entrar</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Começar</Link>
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
