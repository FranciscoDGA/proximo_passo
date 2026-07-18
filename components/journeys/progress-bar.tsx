"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ProgressBarProps {
  current: number;
  total: number;
  journeySlug?: string;
}

export function ProgressBar({ current, total, journeySlug }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (journeySlug) {
      const stored = localStorage.getItem(`progress-${journeySlug}`);
      if (stored) {
        setProgress(parseInt(stored, 10));
      }
    } else {
      setProgress((current / total) * 100);
    }
  }, [current, total, journeySlug]);

  return (
    <Card className="sticky top-4 z-10">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                Progresso da Jornada
              </span>
              <span className="text-sm font-bold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full bg-gradient-to-r from-primary to-green-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400">
            {progress === 100 ? (
              <span className="text-green-600 dark:text-green-400 font-semibold">
                ✓ Jornada Completa! Parabéns!
              </span>
            ) : progress > 50 ? (
              <span>Você está no caminho certo! Continue...</span>
            ) : (
              <span>Comece preenchendo os itens acima</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
