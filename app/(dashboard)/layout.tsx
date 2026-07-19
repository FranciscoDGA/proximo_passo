import Link from "next/link";
import { 
  LayoutDashboard, 
  Map, 
  FolderOpen, 
  Wrench, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Sparkles
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen md:sticky top-0 z-10 hidden md:flex">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-xl tracking-tight text-slate-900 dark:text-white">
            Próximo Passo
          </Link>
        </div>
        
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar (Cmd+K)" 
              className="w-full bg-slate-100 dark:bg-slate-800 border-transparent rounded-lg py-2 pl-9 pr-4 text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-primary outline-none transition-colors"
            />
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          <div className="mb-4">
            <h4 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Principal</h4>
            <Link href="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800">
              <LayoutDashboard className="w-4 h-4 mr-3 text-primary" />
              Início
            </Link>
            <Link href="/dashboard/jornadas" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/50 transition-colors">
              <Map className="w-4 h-4 mr-3" />
              Minhas Jornadas
            </Link>
            <Link href="/dashboard/documentos" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/50 transition-colors">
              <FolderOpen className="w-4 h-4 mr-3" />
              Documentos
            </Link>
            <Link href="/dashboard/ferramentas" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/50 transition-colors">
              <Wrench className="w-4 h-4 mr-3" />
              Ferramentas
            </Link>
            <Link href="/dashboard/ai" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/50 transition-colors mt-2 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4 h-4 mr-3" />
              Especialistas IA
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link href="/dashboard/perfil" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/50 transition-colors">
            <Settings className="w-4 h-4 mr-3" />
            Configurações
          </Link>
          <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/50 transition-colors mt-1">
            <LogOut className="w-4 h-4 mr-3" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Topbar - Mobile & Notifications */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center md:hidden">
            <Link href="/" className="font-serif font-bold text-lg text-slate-900 dark:text-white">
              Próximo Passo
            </Link>
          </div>
          
          <div className="flex items-center justify-end w-full space-x-4">
            <button className="relative p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-300 dark:border-slate-700">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Francisco`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-slate-50/50 dark:bg-slate-950/50">
          {children}
        </div>
      </main>
    </div>
  );
}
