import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Criar Conta - Próximo Passo",
  description: "Crie sua conta e comece hoje",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">Próximo Passo</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Seu guia para os momentos mais importantes da vida
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Criar Conta</CardTitle>
            <CardDescription>Comece sua jornada com um simples clique</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-900 dark:text-white">
                  Nome Completo
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder-slate-600"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-900 dark:text-white">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder-slate-600"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-900 dark:text-white">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder-slate-600"
                />
              </div>

              <Button className="w-full">Criar Conta</Button>

              <div className="text-center text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Já tem conta?{" "}
                </span>
                <Link href="/signin" className="text-primary hover:underline font-medium">
                  Entrar
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Ao criar uma conta, você concorda com nossa Política de Privacidade
        </p>
      </div>
    </div>
  );
}
