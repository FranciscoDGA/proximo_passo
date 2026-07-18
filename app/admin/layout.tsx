'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/admin/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && isMounted) {
      if (!user) {
        router.push('/signin');
        return;
      }
      // Check if user is admin (email-based for now)
      const adminEmails = ['admin@proximopasso.com', 'francisco@proximopasso.com'];
      if (adminEmails.includes(user.email || '')) {
        setIsAdmin(true);
      } else {
        router.push('/');
      }
    }
  }, [user, isLoading, isMounted, router]);

  if (!isMounted || isLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950">
          <div className="container mx-auto py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
