'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Check, X } from 'lucide-react';

interface BenefitOption {
  name: string;
  minimumAge?: number;
  requirements: string[];
  benefits: string[];
  limitations: string[];
  monthlyApprox?: string;
  notes?: string;
}

const BENEFIT_COMPARISONS: Record<string, BenefitOption[]> = {
  'aposentadoria': [
    {
      name: 'Aposentadoria por Idade (INSS)',
      minimumAge: 62,
      requirements: [
        'Mulheres: 62 anos',
        'Homens: 65 anos',
        'Mínimo 15 anos de contribuição',
        'Estar filiado ao INSS',
      ],
      benefits: [
        'Benefício vitalício',
        '13º salário (abono anual)',
        'Assistência médica pelo SUS',
        'Isenção de IR até 2 salários mínimos',
        'Pensão garantida para dependentes',
      ],
      limitations: [
        'Valor limitado ao teto do INSS (R$ 7.786)',
        'Não acumula com outra aposentadoria',
        'Tributação progressiva se > 2 SM',
      ],
      monthlyApprox: 'Proporcional ao histórico de contribuição',
      notes: 'Sistema contributivo - quanto mais contribuir, maior o benefício',
    },
    {
      name: 'Aposentadoria Privada (PGBL/VGBL)',
      requirements: [
        'Ter conta em instituição financeira',
        'Fazer contribuições regulares',
        'Idade mínima varia (geralmente 55 anos)',
      ],
      benefits: [
        'Herança garantida para herdeiros',
        'Sem tributação sobre acúmulo (PGBL)',
        'Rendimento previsível',
        'Portabilidade entre instituições',
        'Benefício proporcional ao acumulado',
      ],
      limitations: [
        'Exige poupança sistemática',
        'Risco de mercado (se investido)',
        'Impostos sobre resgates (VGBL)',
        'Sem 13º salário automático',
      ],
      monthlyApprox: 'Depende do capital acumulado',
      notes: 'Complementar ao INSS - recomendado para rendas altas',
    },
  ],
  'desemprego': [
    {
      name: 'Seguro-Desemprego (INSS)',
      requirements: [
        'Desemprego involuntário (demissão)',
        'Mínimo 12 meses de contribuição',
        'Últimas contribuições regulares',
        'Não receber outro benefício do INSS',
      ],
      benefits: [
        'Até 5 parcelas mensais',
        'Acesso a programas de requalificação',
        'Cobertura médica mantida',
        'Sem burocracia excessiva',
      ],
      limitations: [
        '3 meses máximo de cobertura (geralmente)',
        'Valor reduzido em relação ao último salário',
        'Necessário comprovar busca de emprego',
        'Encerra ao conseguir novo emprego',
      ],
      monthlyApprox: 'R$ 1.200 - R$ 2.500',
      notes: 'Proteção para desemprego involuntário - exigência de trabalho ativo',
    },
  ],
  'invalidez': [
    {
      name: 'Auxílio por Incapacidade Temporária (INSS)',
      requirements: [
        'Acidente ou doença incapacitante',
        'Mínimo 12 meses de contribuição',
        'Avaliação médica pericial',
        'Afastamento mínimo de 15 dias',
      ],
      benefits: [
        '100% do salário (cálculo específico)',
        'Mantém direitos ao INSS',
        'Possibilidade de reabilitação profissional',
        'Pode evoluir para aposentadoria',
      ],
      limitations: [
        'Duração limitada (até recuperação)',
        'Perícia médica rigorosa',
        'Necessário afastamento comprovado',
        'Tributação normal de IR',
      ],
      monthlyApprox: 'Até R$ 7.786 (teto INSS)',
      notes: 'Proteção durante incapacidade de trabalhar',
    },
    {
      name: 'Aposentadoria por Invalidez Permanente',
      requirements: [
        'Incapacidade permanente e total',
        'Mínimo 12 meses de contribuição',
        'Perícia médica INSS',
        'Não ter condições de reabilitação',
      ],
      benefits: [
        'Benefício vitalício',
        'Valor maior que auxílio temporário',
        '13º salário anual',
        'Pensão para dependentes',
      ],
      limitations: [
        'Avaliação períodica de incapacidade',
        'Pode cessar se recuperação constatada',
        'Limite do teto do INSS',
        'Tributação progressiva',
      ],
      monthlyApprox: 'R$ 2.500 - R$ 7.786',
      notes: 'Proteção permanente por incapacidade total',
    },
  ],
};

export function ComparadorBeneficios() {
  const [selectedCategory, setSelectedCategory] = useState('aposentadoria');
  const categories = Object.keys(BENEFIT_COMPARISONS);
  const options = BENEFIT_COMPARISONS[selectedCategory] || [];

  const handleExport = () => {
    const text = `COMPARADOR DE BENEFÍCIOS SOCIAIS
Categoria: ${selectedCategory.toUpperCase()}
Data: ${new Date().toLocaleDateString('pt-BR')}

${options
  .map(
    (option, idx) => `
OPÇÃO ${idx + 1}: ${option.name}
${option.minimumAge ? `Idade Mínima: ${option.minimumAge} anos\n` : ''}
REQUISITOS:
${option.requirements.map((req) => `  • ${req}`).join('\n')}

BENEFÍCIOS:
${option.benefits.map((ben) => `  ✓ ${ben}`).join('\n')}

LIMITAÇÕES:
${option.limitations.map((lim) => `  ✗ ${lim}`).join('\n')}

Valor Aproximado: ${option.monthlyApprox}
${option.notes ? `\nNota: ${option.notes}` : ''}
---`
  )
  .join('\n')}

DICAS IMPORTANTES:
1. Simule diferentes cenários com calculadoras específicas
2. Consulte o site do INSS (www.inss.gov.br) para valores atualizados
3. Para benefícios privados, compare instituições financeiras
4. Combine INSS com benefícios privados quando possível
5. Procure um especialista em planejamento previdenciário

Gerado em: ${new Date().toLocaleDateString('pt-BR')}`;

    const link = document.createElement('a');
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
    link.download = `comparador-beneficios-${selectedCategory}.txt`;
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparador de Benefícios 🏆</CardTitle>
        <CardDescription>
          Compare diferentes benefícios sociais e previdenciários
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Tipo de Benefício
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="space-y-4">
          {options.map((option, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                    {option.name}
                  </h3>
                  {option.minimumAge && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Idade mínima: {option.minimumAge} anos
                    </p>
                  )}
                </div>
                {option.monthlyApprox && (
                  <Badge variant="secondary" className="whitespace-nowrap">
                    {option.monthlyApprox}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Requirements */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                    Requisitos
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {option.requirements.map((req, i) => (
                      <li key={i} className="text-slate-700 dark:text-slate-300 flex gap-2">
                        <span className="text-primary">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits vs Limitations */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                    Vantagens & Limitações
                  </h4>
                  <div className="space-y-2 text-sm">
                    {option.benefits.slice(0, 2).map((ben, i) => (
                      <div key={`b${i}`} className="flex gap-2 text-green-600 dark:text-green-400">
                        <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </div>
                    ))}
                    {option.limitations.slice(0, 1).map((lim, i) => (
                      <div key={`l${i}`} className="flex gap-2 text-red-600 dark:text-red-400">
                        <X className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>{lim}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {option.notes && (
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded p-2 border border-amber-200 dark:border-amber-800">
                  <p className="text-xs text-amber-900 dark:text-amber-200">
                    💡 {option.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Export Button */}
        <Button onClick={handleExport} variant="outline" className="w-full gap-2">
          <Download className="h-4 w-4" />
          Baixar Comparação
        </Button>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 space-y-2 text-sm">
          <h4 className="font-semibold text-blue-900 dark:text-blue-200">
            ℹ️ Próximos Passos
          </h4>
          <ul className="space-y-1 text-blue-800 dark:text-blue-300 text-xs">
            <li>• Consulte o site do INSS: www.inss.gov.br</li>
            <li>• Para benefícios privados, compare com corretoras autorizadas</li>
            <li>• Procure um contador ou especialista previdenciário para análise personalizada</li>
            <li>• Simule seu caso específico com calculadoras detalhadas</li>
            <li>• Mantenha documentação atualizada e registros de contribuições</li>
          </ul>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          💡 Valores e requisitos podem mudar. Sempre consulte fontes oficiais (INSS, Receita Federal) para informações atualizadas.
        </p>
      </CardContent>
    </Card>
  );
}
