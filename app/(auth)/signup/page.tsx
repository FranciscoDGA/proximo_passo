'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { signUp } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (password.length < 6) {
        setError('Senha deve ter no mínimo 6 caracteres');
        return;
      }

      await signUp(email, password, name);
      router.push('/dashboard?welcome=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

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
            <form onSubmit={handleSignUp} className="space-y-6">
              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-900 dark:text-white">
                  Nome Completo
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder-slate-600"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder-slate-600"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder-slate-600"
                />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Mínimo 6 caracteres</p>
              </div>

              <Button disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Criando conta...' : 'Criar Conta'}
              </Button>

              <div className="text-center text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Já tem conta?{' '}
                </span>
                <Link href="/signin" className="text-primary hover:underline font-medium">
                  Entrar
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Ao criar uma conta, você concorda com nossa Política de Privacidade
        </p>
      </div>
    </div>
  );
}
