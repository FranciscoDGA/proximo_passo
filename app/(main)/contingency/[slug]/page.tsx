import Link from "next/link";
import { AlertTriangle, CheckCircle2, ArrowRight, FileText, Wrench, Sparkles, MessageCircle } from "lucide-react";

export default function ContingencyPage({ params }: { params: { slug: string } }) {
  // Mock data for MVP
  const journeyTitle = params.slug === "perdi-emprego" ? "Demissão" : "Jornada";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* War Room Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-semibold mb-4">
            <AlertTriangle className="w-4 h-4" />
            Situação Mapeada
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Plano de Contingência: {journeyTitle}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Processamos suas respostas. Aqui está o seu diagnóstico e o plano de ação imediato para retomarmos o controle.
          </p>
        </div>

        {/* Priority 1 */}
        <div className="bg-white dark:bg-slate-900 border-2 border-rose-500 rounded-2xl p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          <h2 className="text-sm font-bold text-rose-500 uppercase tracking-wider mb-2">Sua Prioridade Número 1</h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Garantir recebimento das verbas rescisórias e Seguro-Desemprego.
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
            Como você mencionou que não possui reserva financeira para o próximo mês, o foco absoluto hoje deve ser dar entrada na sua rescisão e solicitar o seguro-desemprego para não faltar liquidez.
          </p>
          
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center shadow-sm transition-colors">
            Iniciar Jornada de Recuperação <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Timeline / Next Steps */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <CheckCircle2 className="w-6 h-6 mr-2 text-primary" /> Próximos Passos
            </h3>
            
            <div className="space-y-6">
              {[
                { title: "Verificar documentação", desc: "TRCT, Guias do FGTS e Seguro-Desemprego", status: "PENDING" },
                { title: "Calcular acerto", desc: "Use nossa calculadora de rescisão", status: "LOCKED" },
                { title: "Revisar currículo", desc: "Adequação para o mercado atual", status: "LOCKED" },
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                    step.status === 'PENDING' ? 'border-primary text-primary' : 'border-slate-200 dark:border-slate-800 text-slate-400'
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <h4 className={`font-semibold ${step.status === 'PENDING' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{step.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Scripts */}
          <div className="space-y-8">
            
            {/* Hard Conversations Scripts */}
            <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 mr-2 text-indigo-500" /> Scripts de Conversa
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Comunicações difíceis já formatadas para você.
              </p>
              <div className="space-y-3">
                <Link href="#" className="block p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow text-sm font-medium">
                  Informar recrutadores sobre disponibilidade
                </Link>
                <Link href="#" className="block p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow text-sm font-medium">
                  Comunicar bancos para renegociação
                </Link>
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <Wrench className="w-6 h-6 mr-2 text-slate-700 dark:text-slate-300" /> Ferramentas Imediatas
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center text-center">
                  <FileText className="w-8 h-8 text-primary mb-2" />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Calculadora Rescisão</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center text-center">
                  <Sparkles className="w-8 h-8 text-indigo-500 mb-2" />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Revisor de CV (IA)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
