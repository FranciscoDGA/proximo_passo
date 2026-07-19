"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Briefcase, Heart, Building2, Search, ArrowLeft, Target, ShieldAlert, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

type DiagnosticStep = "INTENT" | "CATEGORY" | "QUESTIONS" | "ANALYSIS";
type Intent = "CONQUISTAR" | "RESOLVER" | null;

const MOCK_QUESTIONS = [
  { id: "q1", text: "Há quanto tempo isso aconteceu?", options: ["Hoje", "Esta semana", "Há mais de um mês"] },
  { id: "q2", text: "Você possui alguma reserva financeira imediata?", options: ["Sim, para alguns meses", "Sim, apenas para este mês", "Não possuo reserva"] },
  { id: "q3", text: "Qual a sua maior preocupação neste exato momento?", options: ["Como pagar as contas", "Direitos e rescisão", "Recolocação no mercado"] }
];

export function LifeNavigator() {
  const router = useRouter();
  const [step, setStep] = useState<DiagnosticStep>("INTENT");
  const [intent, setIntent] = useState<Intent>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleIntent = (selected: Intent) => {
    setIntent(selected);
    setStep("CATEGORY");
  };

  const handleJourneySelect = (journeyId: string) => {
    setStep("QUESTIONS");
  };

  const handleAnswer = () => {
    if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep("ANALYSIS");
      setTimeout(() => {
        router.push("/contingency/perdi-emprego");
      }, 3000);
    }
  };

  const renderIntent = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center max-w-4xl mx-auto w-full z-10"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium mb-8 backdrop-blur-md"
      >
        <Sparkles className="w-4 h-4 text-indigo-400" />
        Inteligência Artificial Ativada
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 font-serif leading-[1.1]"
      >
        O seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">Próximo Passo</span><br/>começa agora.
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-white/60 mb-16 max-w-2xl mx-auto font-light"
      >
        Nós ajudamos você a mapear e executar os eventos mais críticos da vida. <br className="hidden md:block" />
        Para iniciarmos a triagem, como podemos classificar seu momento?
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
      >
        <button 
          onClick={() => handleIntent("CONQUISTAR")}
          className="relative group flex flex-col items-center justify-center p-10 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-indigo-500/50 rounded-[2rem] transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[50px] -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(99,102,241,0)] group-hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] z-10">
            <Target className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 z-10">Quero conquistar</h3>
          <p className="text-white/50 text-center font-light z-10">
            Abrir empresa, comprar imóvel, casar, planejar aposentadoria.
          </p>
        </button>

        <button 
          onClick={() => handleIntent("RESOLVER")}
          className="relative group flex flex-col items-center justify-center p-10 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-rose-500/50 rounded-[2rem] transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 via-rose-500/0 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full blur-[50px] -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="w-20 h-20 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(244,63,94,0)] group-hover:shadow-[0_0_40px_rgba(244,63,94,0.4)] z-10">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 z-10">Preciso resolver</h3>
          <p className="text-white/50 text-center font-light z-10">
            Demissão, inventário, burnout, falência, processos complexos.
          </p>
        </button>
      </motion.div>
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
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl mx-auto z-10"
      >
        <button onClick={() => setStep("INTENT")} className="flex items-center text-sm text-white/50 mb-8 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Voltar
        </button>

        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white font-serif">
          {intent === "CONQUISTAR" ? "O que você deseja conquistar?" : "Sinto muito por isso.\nO que aconteceu?"}
        </h2>
        
        <div className="relative mb-10 group">
          <div className="absolute inset-[-1px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" />
          <input 
            type="text" 
            placeholder="Digite para buscar seu objetivo..." 
            className="relative w-full bg-[#111] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-lg text-white placeholder:text-white/30 focus:border-indigo-500/50 outline-none transition-colors"
          />
        </div>

        <div className="space-y-4">
          {options.map((opt, i) => (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={opt.id}
              onClick={() => handleJourneySelect(opt.id)}
              className="w-full flex items-center justify-between p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.05] hover:border-white/20 transition-all group text-left backdrop-blur-sm"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mr-5 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                  <opt.icon className="w-6 h-6 text-white/50 group-hover:text-indigo-400 transition-colors" />
                </div>
                <span className="text-xl font-medium text-white/80 group-hover:text-white transition-colors">{opt.label}</span>
              </div>
              <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-indigo-400 transition-transform group-hover:translate-x-2" />
            </motion.button>
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
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl mx-auto z-10"
      >
        <div className="flex items-center gap-3 mb-12">
          {MOCK_QUESTIONS.map((_, i) => (
            <div key={i} className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                initial={{ width: i < currentQuestionIndex ? "100%" : "0%" }}
                animate={{ width: i <= currentQuestionIndex ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          ))}
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white font-serif leading-tight">
          {question.text}
        </h2>
        
        <div className="space-y-4">
          {question.options.map((opt, i) => (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              onClick={handleAnswer}
              className="w-full p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.05] hover:border-indigo-500/50 transition-all text-left text-white/80 hover:text-white text-lg font-medium group backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span>{opt}</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 text-indigo-400 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderAnalysis = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center max-w-md mx-auto z-10"
    >
      <div className="relative w-32 h-32 mx-auto mb-10">
        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />
        <svg className="animate-spin w-full h-full text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
          <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <Sparkles className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white animate-pulse" />
      </div>
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-4 text-white font-serif"
      >
        Mapeando a Rota Ideal...
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-white/50 font-light"
      >
        O Motor de Jornadas está cruzando seus dados com a legislação vigente e melhores práticas. Gerando sala de contingência.
      </motion.p>
    </motion.div>
  );

  return (
    <div className="w-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        {step === "INTENT" && renderIntent()}
        {step === "CATEGORY" && renderCategory()}
        {step === "QUESTIONS" && renderQuestions()}
        {step === "ANALYSIS" && renderAnalysis()}
      </AnimatePresence>
    </div>
  );
}
