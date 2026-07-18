'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function SimulatorFinancing() {
  const [propertyValue, setPropertyValue] = useState(500000);
  const [downPayment, setDownPayment] = useState(20);
  const [months, setMonths] = useState(360); // 30 years
  const [interest, setInterest] = useState(8.5);

  const loanAmount = propertyValue * (1 - downPayment / 100);
  const monthlyRate = interest / 100 / 12;
  const monthlyPayment =
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPaid = monthlyPayment * months;
  const totalInterest = totalPaid - loanAmount;

  const handleExport = () => {
    const text = `SIMULADOR DE FINANCIAMENTO IMOBILIÁRIO

DADOS:
- Valor do Imóvel: R$ ${propertyValue.toLocaleString('pt-BR')}
- Entrada: ${downPayment}% (R$ ${(propertyValue * (downPayment / 100)).toLocaleString('pt-BR')})
- Valor Financiado: R$ ${loanAmount.toLocaleString('pt-BR')}
- Prazo: ${months} meses (${(months / 12).toFixed(1)} anos)
- Taxa de Juros: ${interest}% a.a.

RESULTADO:
- Prestação Mensal: R$ ${monthlyPayment.toFixed(2)}
- Total Pago: R$ ${totalPaid.toFixed(2)}
- Total de Juros: R$ ${totalInterest.toFixed(2)}

INFORMAÇÕES IMPORTANTES:
- Taxas: Caixa Econômica (${interest}%) é referência
- Bancos privados podem oferecer taxas diferentes
- Adicione custos de seguro, IPTU, condomínio
- Primeiras parcelas podem ter amortização inicial
- Possibilidade de usar FGTS para reduzir valor financiado

Gerado em: ${new Date().toLocaleDateString('pt-BR')}`;

    const link = document.createElement('a');
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
    link.download = 'simulador-financiamento.txt';
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulador Financiamento 🏠</CardTitle>
        <CardDescription>
          Simule financiamento imobiliário e prestações
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inputs */}
        <div className="space-y-4">
          {/* Valor do Imóvel */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Valor do Imóvel: R$ {propertyValue.toLocaleString('pt-BR')}
            </label>
            <input
              type="range"
              min="50000"
              max="2000000"
              step="10000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Entrada */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Entrada: {downPayment}%
            </label>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              R$ {(propertyValue * (downPayment / 100)).toLocaleString('pt-BR')}
            </p>
          </div>

          {/* Prazo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Prazo: {months} meses ({(months / 12).toFixed(1)} anos)
            </label>
            <input
              type="range"
              min="60"
              max="420"
              step="12"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Taxa de Juros */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Taxa de Juros: {interest.toFixed(2)}% a.a.
            </label>
            <input
              type="range"
              min="3"
              max="15"
              step="0.1"
              value={interest}
              onChange={(e) => setInterest(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Caixa: ~{interest.toFixed(2)}% | Bancos privados podem variar
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300">Valor Financiado:</span>
              <span className="text-lg font-semibold text-slate-900 dark:text-white">
                R$ {loanAmount.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-blue-200 dark:border-blue-800 pt-3">
              <span className="text-slate-600 dark:text-slate-300">Prestação Mensal:</span>
              <span className="text-2xl font-bold text-primary">
                R$ {monthlyPayment.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="border-t border-blue-200 dark:border-blue-800 pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">Total Pago:</span>
              <span className="font-medium">R$ {totalPaid.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">Total de Juros:</span>
              <span className="font-medium text-red-600 dark:text-red-400">
                R$ {totalInterest.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Export */}
        <Button onClick={handleExport} variant="outline" className="w-full gap-2">
          <Download className="h-4 w-4" />
          Baixar Simulação
        </Button>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          💡 Simule com diferentes cenários. Adicione: IPTU, condomínio, seguro, ITBI. Consulte um banco para proposta real.
        </p>
      </CardContent>
    </Card>
  );
}
