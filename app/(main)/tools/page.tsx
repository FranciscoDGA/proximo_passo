import { Metadata } from 'next';
import { CalculatorMEI } from '@/components/tools/calculator-mei';
import { SimulatorFinancing } from '@/components/tools/simulator-financing';
import { CalculatorFGTS } from '@/components/tools/calculator-fgts';
import { DocumentsOrganizer } from '@/components/tools/documents-organizer';
import { ComparadorBeneficios } from '@/components/tools/comparador-beneficios';

export const metadata: Metadata = {
  title: 'Ferramentas Interativas | Próximo Passo',
  description: 'Calculadoras e simuladores para suas decisões e burocracias brasileiras',
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Ferramentas Interativas 🛠️
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Simuladores, calculadoras e organizadores para ajudar você a planejar suas decisões importantes. Todos gratuitos e sem necessidade de cadastro.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="space-y-8">
          {/* Tool 1: MEI Calculator */}
          <section>
            <div className="mb-3">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                1. Calculadora MEI
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Simule seus custos como Microempreendedor Individual
              </p>
            </div>
            <CalculatorMEI />
          </section>

          {/* Tool 2: Financing Simulator */}
          <section>
            <div className="mb-3">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                2. Simulador de Financiamento
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Calcule prestações e valores totais de financiamento imobiliário
              </p>
            </div>
            <SimulatorFinancing />
          </section>

          {/* Tool 3: FGTS Calculator */}
          <section>
            <div className="mb-3">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                3. Simulador FGTS
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Simule seus rendimentos e possibilidades de saque de FGTS
              </p>
            </div>
            <CalculatorFGTS />
          </section>

          {/* Tool 4: Documents Organizer */}
          <section>
            <div className="mb-3">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                4. Organizador de Documentos
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Organize e acompanhe seus documentos por processo (compra de imóvel, casamento, inventário, etc.)
              </p>
            </div>
            <DocumentsOrganizer />
          </section>

          {/* Tool 5: Benefits Comparator */}
          <section>
            <div className="mb-3">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                5. Comparador de Benefícios
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Compare diferentes benefícios sociais e previdenciários
              </p>
            </div>
            <ComparadorBeneficios />
          </section>
        </div>

        {/* Footer Info */}
        <div className="mt-16 p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
            💡 Sobre Estas Ferramentas
          </h3>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>
              • <strong>Educativas:</strong> Desenvolvidas para ajudar no entendimento, não substituem consultoria profissional
            </li>
            <li>
              • <strong>Exportáveis:</strong> Todos os resultados podem ser baixados em formato .txt
            </li>
            <li>
              • <strong>Atualizadas:</strong> Valores e cálculos refletem legislação atual (2024-2025)
            </li>
            <li>
              • <strong>Offline:</strong> Funcionam completamente no seu navegador, sem envio de dados
            </li>
            <li>
              • <strong>Gratuitas:</strong> Sem publicidade, sem paywalls, completamente grátis
            </li>
          </ul>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
            Para informações oficiais: INSS (www.inss.gov.br) • Receita Federal (www.gov.br/receita) • Caixa Econômica (www.caixa.gov.br)
          </p>
        </div>
      </div>
    </div>
  );
}
