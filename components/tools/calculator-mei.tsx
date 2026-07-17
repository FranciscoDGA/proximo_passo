'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';

export function CalculatorMEI() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(5000);

  // MEI Constants (2024)
  const MONTHLY_CONTRIBUTION = 65.5; // Contribuição ao INSS
  const DAS_PERCENTAGE = 0.05; // 5% de DAS + ISS/ICMS
  const OPTIONAL_CONTRIBUTION = 109.29; // Contribuição complementar (opcional)

  const monthlyDAS = monthlyRevenue * DAS_PERCENTAGE;
  const totalMonthly = MONTHLY_CONTRIBUTION + monthlyDAS;
  const annualCost = totalMonthly * 12;
  const withOptional = (totalMonthly + OPTIONAL_CONTRIBUTION) * 12;

  const handleExport = () => {
    const text = `CALCULADORA MEI - Resultado

Faturamento Mensal: R$ ${monthlyRevenue.toLocaleString('pt-BR')}

CUSTOS MENSAIS:
- Contribuição INSS: R$ ${MONTHLY_CONTRIBUTION.toFixed(2)}
- DAS (5% + ISS/ICMS): R$ ${monthlyDAS.toFixed(2)}
- Total Mensal: R$ ${totalMonthly.toFixed(2)}

CUSTOS ANUAIS:
- Com DAS básico: R$ ${annualCost.toFixed(2)}
- Com contribuição complementar: R$ ${withOptional.toFixed(2)}

LIMITE DE FATURAMENTO ANUAL: R$ 168.000,00

Nota: Esta é uma simulação educativa. Consulte um contador para valores exatos.
Gerado em: ${new Date().toLocaleDateString('pt-BR')}`;

    const link = document.createElement('a');
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
    link.download = 'calculadora-mei.txt';
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora MEI 📊</CardTitle>
        <CardDescription>
          Simule seus custos como Microempreendedor Individual
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Faturamento Mensal Estimado
          </label>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <input
                type="range"
                min="1000"
                max="168000"
                step="1000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                R$ 1.000 a R$ 168.000
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                R$ {monthlyRevenue.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
          <h3 className="font-semibold text-slate-900 dark:text-white">Custos Mensais</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">Contribuição INSS:</span>
              <span className="font-medium">R$ {MONTHLY_CONTRIBUTION.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">DAS (5% + ISS/ICMS):</span>
              <span className="font-medium">R$ {monthlyDAS.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between font-semibold">
              <span>Total Mensal:</span>
              <span className="text-primary">R$ {totalMonthly.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white">Custos Anuais</h3>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">Com DAS básico:</span>
              <span className="font-medium">R$ {annualCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">Com contribuição complementar:</span>
              <span className="font-medium">R$ {withOptional.toFixed(2)}</span>
            </div>
          </div>

          <Badge className="mt-4">
            Limite: R$ 168.000/ano
          </Badge>
        </div>

        {/* Export */}
        <Button onClick={handleExport} variant="outline" className="w-full gap-2">
          <Download className="h-4 w-4" />
          Baixar Resultado
        </Button>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          💡 Esta é uma simulação educativa. Consulte um contador para valores exatos e situações específicas.
        </p>
      </CardContent>
    </Card>
  );
}
