'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import { saveJourneyProgress } from '@/lib/journeys-persistence';

interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  completed?: boolean;
}

interface ChecklistProps {
  items: ChecklistItem[];
  journeySlug: string;
  journeyId: string;
  onProgressChange?: (progress: number) => void;
}

export function Checklist({ items, journeySlug, journeyId, onProgressChange }: ChecklistProps) {
  const { user } = useAuth();
  const [checklist, setChecklist] = useState<ChecklistItem[]>(items);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`checklist-${journeySlug}`);
    if (stored) {
      setChecklist(JSON.parse(stored));
    }
  }, [journeySlug]);

  useEffect(() => {
    localStorage.setItem(`checklist-${journeySlug}`, JSON.stringify(checklist));
    const progress = (checklist.filter((item) => item.completed).length / checklist.length);
    onProgressChange?.(Math.round(progress * 100));

    if (user) {
      const checklistData: Record<string, boolean> = {};
      checklist.forEach((item) => {
        checklistData[String(item.id)] = item.completed || false;
      });

      setIsSaving(true);
      saveJourneyProgress(user.id, journeyId, progress, checklistData).catch((err) => {
        console.error('Error saving progress:', err);
      }).finally(() => {
        setIsSaving(false);
      });
    }
  }, [checklist, journeySlug, journeyId, user, onProgressChange]);

  const toggleItem = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = checklist.filter((item) => item.completed).length;
  const totalCount = checklist.length;
  const progressPercent = (completedCount / totalCount) * 100;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            Progresso
          </span>
          <span className="text-sm font-semibold text-primary">
            {completedCount}/{totalCount}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full bg-gradient-to-r from-primary to-green-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {Math.round(progressPercent)}% completo
          </p>
          {isSaving && <p className="text-xs text-slate-500 dark:text-slate-400">Salvando...</p>}
        </div>
      </div>

      <div className="space-y-3">
        {checklist.map((item) => (
          <Card
            key={item.id}
            className={`cursor-pointer transition-all ${
              item.completed
                ? 'bg-green-50 dark:bg-slate-900/50'
                : 'hover:border-primary'
            }`}
            onClick={() => toggleItem(item.id)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 pt-0.5">
                  {item.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-slate-300 dark:text-slate-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-semibold transition-all ${
                      item.completed
                        ? 'line-through text-slate-500 dark:text-slate-400'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      item.completed
                        ? 'text-slate-400 dark:text-slate-500'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => {
            setChecklist(checklist.map((item) => ({ ...item, completed: false })));
          }}
        >
          Limpar Progresso
        </Button>
        <Button
          onClick={() => {
            const link = document.createElement('a');
            link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(
              `Checklist\n\n${checklist.map((item) => `${item.completed ? '✓' : '○'} ${item.title}`).join('\n')}`
            )}`;
            link.download = `checklist-${journeySlug}.txt`;
            link.click();
          }}
        >
          Baixar Checklist
        </Button>
      </div>
    </div>
  );
}
