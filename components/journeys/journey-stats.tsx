"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, DollarSign, FileText } from "lucide-react";

interface JourneyStatsProps {
  stepsCount: number;
  estimatedTime: string;
  minCost?: string;
  maxCost?: string;
  documentsCount?: number;
}

export function JourneyStats({
  stepsCount,
  estimatedTime,
  minCost,
  maxCost,
  documentsCount = 0,
}: JourneyStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="h-8 w-8 text-secondary flex-shrink-0" />
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Etapas</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stepsCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Clock className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Tempo</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {estimatedTime}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {(minCost || maxCost) && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <DollarSign className="h-8 w-8 text-accent flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Custos</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {minCost && maxCost ? `${minCost} - ${maxCost}` : minCost || maxCost}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {documentsCount > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <FileText className="h-8 w-8 text-secondary flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Documentos
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {documentsCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
