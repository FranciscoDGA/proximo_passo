import Link from "next/link";
import { 
  Users, 
  Map, 
  Settings, 
  BarChart, 
  CreditCard, 
  ShieldCheck,
  Search,
  BookOpen,
  Briefcase
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-slate-300">
      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen md:sticky top-0 z-10 hidden md:flex">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="font-serif font-bold text-xl tracking-tight text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-rose-500" />
            Admin Panel
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="mb-6">
            <h4 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Visão Geral</h4>
            <Link href="/admin" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-white bg-slate-800">
              <BarChart className="w-4 h-4 mr-3 text-rose-500" />
              Métricas
            </Link>
            <Link href="/admin/usuarios" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <Users className="w-4 h-4 mr-3" />
              Usuários
            </Link>
            <Link href="/admin/assinaturas" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <CreditCard className="w-4 h-4 mr-3" />
              Assinaturas & Faturamento
            </Link>
          </div>

          <div className="mb-6">
            <h4 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Conteúdo</h4>
            <Link href="/admin/jornadas" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <Map className="w-4 h-4 mr-3" />
              Jornadas (JDL)
            </Link>
            <Link href="/admin/profissionais" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <Briefcase className="w-4 h-4 mr-3" />
              Hub de Profissionais
            </Link>
            <Link href="/admin/blog" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <BookOpen className="w-4 h-4 mr-3" />
              Blog & SEO
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <Settings className="w-4 h-4 mr-3" />
            Voltar ao App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center w-full max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Busca global admin..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-1.5 pl-9 pr-4 text-sm focus:border-rose-500 outline-none transition-colors text-white"
              />
            </div>
          </div>
          <div className="text-sm font-medium text-slate-400">
            Ambiente de Produção
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
