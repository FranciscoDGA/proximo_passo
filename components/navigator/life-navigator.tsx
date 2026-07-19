"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Briefcase, Heart, Building2, Search, ArrowLeft, Target, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

type DiagnosticStep = "INTENT" | "CATEGORY" | "QUESTIONS" | "ANALYSIS";
type Intent = "CONQUISTAR" | "RESOLVER" | null;

// Fake questions for the MVP
const MOCK_QUESTIONS = [
  { id: "q1", text: "Há quanto tempo isso aconteceu?", options: ["Hoje", "Esta semana", "Há mais de um mês"] },
  { id: "q2", text: "Você possui alguma reserva financeira imediata?", options: ["Sim, para alguns meses", "Sim, apenas para este mês", "Não possuo reserva"] },
  { id: "q3", text: "Qual a sua maior preocupação neste exato momento?", options: ["Como pagar as contas", "Direitos e rescisão", "Recolocação no mercado"] }
];

export function LifeNavigator() {
  const router = useRouter();
  const [step, setStep] = useState<DiagnosticStep>("INTENT");
  const [intent, setIntent] = useState<Intent>(null);
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleIntent = (selected: Intent) => {
    setIntent(selected);
    setStep("CATEGORY");
  };

  const handleJourneySelect = (journeyId: string) => {
    setSelectedJourney(journeyId);
    setStep("QUESTIONS");
  };

  const handleAnswer = () => {
    if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep("ANALYSIS");
      // Simulate API call and redirect to Contingency Page
      setTimeout(() => {
        router.push("/contingency/perdi-emprego"); // Mocking route
      }, 2500);
    }
  };

  const renderIntent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center max-w-2xl mx-auto w-full"
    >
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 font-serif">
        Bem-vindo ao seu Próximo Passo.
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
        Nós ajudamos você a mapear e executar as maiores jornadas da vida adulta. Para começar, me diga: o que aconteceu hoje?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => handleIntent("CONQUISTAR")}
          className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 hover:ring-1 hover:ring-emerald-500 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Target className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Quero conquistar...</h3>
          <p className="text-sm text-slate-500 text-center">
            Abrir empresa, comprar imóvel, casar, planejar faculdade.
          </p>
        </button>

        <button 
          onClick={() => handleIntent("RESOLVER")}
          className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-rose-500 hover:ring-1 hover:ring-rose-500 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Preciso resolver...</h3>
          <p className="text-sm text-slate-500 text-center">
            Demissão, inventário, burnout, encerramento de empresa.
          </p>
        </button>
      </div>
    </motion.div>
  );

  const renderCategory = () => {
    const options = intent === "CONQUISTAR" ? [
      { id: "abrir-empresa", label: "Abrir uma empresa", icon: Building2 },
      { id: "comprar-imovel", label: "Comprar imóvel", icon: Target },
      { id: "casamento", label: "Casamento Civil", icon: Heart },
    ] : [
      { id: "perdi-emprego", label: "Fui demitido recentemente", icon: Briefcase },
      { id: "inventario", label: "Falecimento e Inventário", icon: Target },
      { id: "burnout", label: "Estou em Burnout", icon: ShieldAlert },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-xl mx-auto"
      >
        <button onClick={() => setStep("INTENT")} className="flex items-center text-sm text-slate-500 mb-8 hover:text-slate-900 dark:hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </button>

        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
          {intent === "CONQUISTAR" ? "O que você deseja conquistar?" : "Sinto muito por isso. O que precisamos resolver?"}
        </h2>
        
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Digite para buscar..." 
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 pl-12 pr-4 text-base focus:border-primary outline-none shadow-sm"
          />
        </div>

        <div className="space-y-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleJourneySelect(opt.id)}
              className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-primary transition-colors group text-left"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center mr-4 group-hover:bg-primary/10 transition-colors">
                  <opt.icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <span className="font-medium text-slate-900 dark:text-white">{opt.label}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 dark:text-slate-700 group-hover:text-primary transition-transform group-hover:translate-x-1" />
            </button>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderQuestions = () => {
    const question = MOCK_QUESTIONS[currentQuestionIndex];
    
    return (
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-xl mx-auto"
      >
        <div className="flex items-center gap-2 mb-8">
          {MOCK_QUESTIONS.map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= currentQuestionIndex ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white leading-tight">
          {question.text}
        </h2>
        
        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={handleAnswer}
              className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left text-slate-700 dark:text-slate-300 font-medium"
            >
              {opt}
            </button>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderAnalysis = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center max-w-md mx-auto"
    >
      <div className="relative w-24 h-24 mx-auto mb-8">
        <svg className="animate-spin w-full h-full text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <Target className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Mapeando sua jornada...</h2>
      <p className="text-slate-500">
        Nossa IA está cruzando seus dados para gerar o plano de ação mais seguro para você.
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-6">
      <AnimatePresence mode="wait">
        {step === "INTENT" && renderIntent()}
        {step === "CATEGORY" && renderCategory()}
        {step === "QUESTIONS" && renderQuestions()}
        {step === "ANALYSIS" && renderAnalysis()}
      </AnimatePresence>
    </div>
  );
}
