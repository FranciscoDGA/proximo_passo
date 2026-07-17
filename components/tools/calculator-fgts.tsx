'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';

export function CalculatorFGTS() {
  const [balance, setBalance] = useState(50000);
  const [interest, setInterest] = useState(3.5); // Taxa média FGTS

  const totalWithInterest = balance * (1 + interest / 100);
  const earnedInterest = totalWithInterest - balance;

  const handleExport = () => {
    const text = `CALCULADORA FGTS

DADOS:
- Saldo FGTS: R$ ${balance.toLocaleString('pt-BR')}
- Taxa de Juros Estimada: ${interest}% ao ano

RESULTADO:
- Valor Atual: R$ ${balance.toLocaleString('pt-BR')}
- Juros Estimados (1 ano): R$ ${earnedInterest.toLocaleString('pt-BR')}
- Total com Juros: R$ ${totalWithInterest.toLocaleString('pt-BR')}

POSSIBILIDADES DE SAQUE:

1. COMPRA DE IMÓVEL
   - Usar para dar entrada na compra
   - Reduzir valor financiado
   - Retirada direta dos fundos

2. QUITAÇÃO DE FINANCIAMENTO
   - Quitar saldo devedor
   - Reduzir prazo do financiamento
   - Diminuir juros totais

3. SAQUE EXTRAORDINÁRIO
   - Eventualmente liberado pelo governo
   - Períodos específicos
   - Consulte a Caixa Econômica

4. APOSENTADORIA
   - Após 65 anos (M) / 62 anos (F)
   - Sem depósitos há 3 anos
   - Resgate total disponível

5. DESEMPREGO
   - Com 3 meses de desemprego
   - Necessário comprovação
   - Retirada mensal durante período

ONDE CONSULTAR:
- Site da Caixa Econômica: www.caixa.gov.br
- App "Caixa Trabalhador"
- Agências da Caixa

Gerado em: ${new Date().toLocaleDateString('pt-BR')}`;

    const link = document.createElement('a');
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
    link.download = 'calculadora-fgts.txt';
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora FGTS 💰</CardTitle>
        <CardDescription>
          Simule seus rendimentos e possibilidades de saque de FGTS
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inputs */}
        <div className="space-y-4">
          {/* Saldo FGTS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Saldo FGTS Atual: R$ {balance.toLocaleString('pt-BR')}
            </label>
            <input
              type="range"
              min="0"
              max="500000"
              step="5000"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Consulte no app Caixa Trabalhador
            </p>
          </div>

          {/* Taxa de Juros */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Taxa de Juros Estimada: {interest}% a.a.
            </label>
            <input
              type="range"
              min="1"
              max="8"
              step="0.1"
              value={interest}
              onChange={(e) => setInterest(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Taxa média histórica: 3-4% a.a.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <h3 className="font-semibold text-slate-900 dark:text-white">Rendimentos (1 ano)</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">Saldo Atual:</span>
              <span className="font-medium">R$ {balance.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">Juros (1 ano):</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                + R$ {earnedInterest.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-green-200 dark:border-green-800 pt-3 flex justify-between font-semibold text-lg">
              <span>Total Após 1 Ano:</span>
              <span className="text-green-600 dark:text-green-400">
                R$ {totalWithInterest.toFixed(2)}
              </span>
            </div>
          </div>

          <Badge className="mt-4" variant="secondary">
            Consulte saldo real na Caixa
          </Badge>
        </div>

        {/* Info Box */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50 space-y-3 text-sm">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            💡 Quando Você Pode Sacar FGTS?
          </h3>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li>• <strong>Compra Imóvel:</strong> Usar como entrada ou amortizar financiamento</li>
            <li>• <strong>Quitação:</strong> Quitar saldo devedor de imóvel</li>
            <li>• <strong>Aposentadoria:</strong> Idade específica + outros requisitos</li>
            <li>• <strong>Desemprego:</strong> Após 3 meses desempregado</li>
            <li>• <strong>Saque Extraordinário:</strong> Quando governo autoriza (periodicamente)</li>
            <li>• <strong>Critérios Sociais:</strong> Doenças graves, câncer, AIDS</li>
          </ul>
        </div>

        {/* Export */}
        <Button onClick={handleExport} variant="outline" className="w-full gap-2">
          <Download className="h-4 w-4" />
          Baixar Informações
        </Button>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          💡 Consulte sempre o site da Caixa Econômica (caixa.gov.br) e o App "Caixa Trabalhador" para saldo e opções atualizadas.
        </p>
      </CardContent>
    </Card>
  );
}
