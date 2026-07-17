'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Plus, Trash2 } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  category: string;
  status: 'pendente' | 'obtido' | 'enviado';
  date?: string;
}

const DOCUMENT_TEMPLATES = {
  imobiliario: [
    'RG ou Passaporte',
    'CPF',
    'Comprovante de Renda (últimos 3 meses)',
    'Extrato Bancário',
    'Declaração de Imposto de Renda',
    'Certidão Negativa de Débitos (CND)',
    'Escritura Anterior do Imóvel',
    'Planta do Imóvel',
    'Matrícula Atualizada',
  ],
  casamento: [
    'Certidão de Nascimento (original)',
    'Documento de Identidade',
    'CPF',
    'Comprovante de Residência',
    'Certidão Negativa de Débitos Conjugais',
    'Declaração de União Estável (se aplicável)',
    'Fotos 3x4',
  ],
  successao: [
    'Certidão de Óbito',
    'Testamento (se houver)',
    'RG/CPF falecido',
    'Documentos dos herdeiros',
    'Comprovante de Renda dos herdeiros',
    'Comprovante Residencial',
    'Documentos de Bens e Propriedades',
    'Certidão de Casamento (se houver)',
  ],
  mei: [
    'RG',
    'CPF',
    'Comprovante de Residência',
    'Declaração de Bens (se houver)',
    'Comprovante de Atividade',
    'Documento de Identificação Profissional',
  ],
};

export function DocumentsOrganizer() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [category, setCategory] = useState('imobiliario');
  const [showTemplate, setShowTemplate] = useState(false);

  const addDocumentFromTemplate = (docName: string) => {
    const newDoc: Document = {
      id: Date.now().toString(),
      name: docName,
      category,
      status: 'pendente',
    };
    setDocuments([...documents, newDoc]);
  };

  const updateDocumentStatus = (id: string, status: Document['status']) => {
    setDocuments(
      documents.map((doc) => (doc.id === id ? { ...doc, status, date: new Date().toLocaleDateString('pt-BR') } : doc))
    );
  };

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const exportChecklist = () => {
    const byCategory = DOCUMENT_TEMPLATES[category as keyof typeof DOCUMENT_TEMPLATES] || [];
    const documentList = documents.filter((d) => d.category === category);

    const text = `CHECKLIST DE DOCUMENTOS

Categoria: ${category.toUpperCase()}
Data: ${new Date().toLocaleDateString('pt-BR')}

DOCUMENTOS NECESSÁRIOS:
${byCategory.map((doc, idx) => {
  const found = documentList.find((d) => d.name === doc);
  const status = found?.status || 'pendente';
  const mark = status === 'pendente' ? '☐' : status === 'obtido' ? '☑' : '✓';
  const date = found?.date ? ` (${found.date})` : '';
  return `${mark} ${doc}${date}`;
}).join('\n')}

RESUMO:
- Pendentes: ${documentList.filter((d) => d.status === 'pendente').length}
- Obtidos: ${documentList.filter((d) => d.status === 'obtido').length}
- Enviados: ${documentList.filter((d) => d.status === 'enviado').length}
- Total: ${documentList.length}

💡 Imprima esta lista e leve para seus compromissos!`;

    const link = document.createElement('a');
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
    link.download = `checklist-documentos-${category}.txt`;
    link.click();
  };

  const templates = DOCUMENT_TEMPLATES[category as keyof typeof DOCUMENT_TEMPLATES] || [];
  const documentsByCategory = documents.filter((d) => d.category === category);
  const progress = documentsByCategory.length > 0
    ? ((documentsByCategory.filter((d) => d.status !== 'pendente').length / documentsByCategory.length) * 100).toFixed(0)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organizador de Documentos 📄</CardTitle>
        <CardDescription>
          Organize seus documentos e acompanhe o progresso
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Tipo de Processo
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          >
            <option value="imobiliario">Compra de Imóvel</option>
            <option value="casamento">Casamento Civil</option>
            <option value="successao">Inventário/Sucessão</option>
            <option value="mei">Abrir MEI</option>
          </select>
        </div>

        {/* Progress */}
        {documentsByCategory.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-900 dark:text-white">Progresso</span>
              <span className="text-primary font-semibold">{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full bg-gradient-to-r from-primary to-green-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Template or List */}
        {!showTemplate && documentsByCategory.length === 0 && (
          <Button onClick={() => setShowTemplate(true)} variant="outline" className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Usar Template de Documentos
          </Button>
        )}

        {showTemplate && (
          <div className="space-y-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
            <h3 className="font-semibold text-slate-900 dark:text-white">Documentos Necessários</h3>
            <div className="space-y-2">
              {templates.map((doc) => (
                <Button
                  key={doc}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    addDocumentFromTemplate(doc);
                    if (documentsByCategory.length === 0) {
                      setShowTemplate(false);
                    }
                  }}
                >
                  <Plus className="h-3 w-3 mr-2" />
                  {doc}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Documents List */}
        {documentsByCategory.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white">Seus Documentos</h3>
            {documentsByCategory.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 dark:border-slate-800"
              >
                <select
                  value={doc.status}
                  onChange={(e) =>
                    updateDocumentStatus(doc.id, e.target.value as Document['status'])
                  }
                  className="text-sm rounded border border-slate-200 bg-white px-2 py-1 dark:border-slate-800 dark:bg-slate-950"
                >
                  <option value="pendente">Pendente</option>
                  <option value="obtido">Obtido</option>
                  <option value="enviado">Enviado</option>
                </select>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {doc.name}
                  </p>
                  {doc.date && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {doc.status === 'pendente' ? 'Pendente' : `${doc.status} em ${doc.date}`}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteDocument(doc.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Export Button */}
        {documentsByCategory.length > 0 && (
          <Button onClick={exportChecklist} variant="outline" className="w-full gap-2">
            <Download className="h-4 w-4" />
            Baixar Checklist
          </Button>
        )}

        <p className="text-xs text-slate-500 dark:text-slate-400">
          💡 Mantenha cópias digitais de todos os documentos. Alguns podem ser necessários em múltiplas vias.
        </p>
      </CardContent>
    </Card>
  );
}
