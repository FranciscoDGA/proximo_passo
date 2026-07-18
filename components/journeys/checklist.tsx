"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { saveJourneyProgress } from "@/lib/journeys-persistence";

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

export function Checklist({
  items,
  journeySlug,
  journeyId,
  onProgressChange,
}: ChecklistProps) {
  const { user } = useAuth();
  const [checklist, setChecklist] = useState<ChecklistItem[]>(items);
  const [isSaving, setIsSaving] = useState(false);

  // Load from local storage initially
  useEffect(() => {
    const stored = localStorage.getItem(`checklist-${journeySlug}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed)) {
          // Merge local state with potentially updated items from JSON
          const merged = items.map(item => {
            const storedItem = parsed.find(p => p.id === item.id);
            return { ...item, completed: storedItem?.completed || false };
          });
          setChecklist(merged);
        }
      } catch (e) {
        console.error("Failed to parse checklist from localStorage", e);
      }
    }
  }, [journeySlug, items]);

  // Save to local storage and DB when changed
  useEffect(() => {
    localStorage.setItem(`checklist-${journeySlug}`, JSON.stringify(checklist));
    const progress =
      checklist.filter((item) => item.completed).length / checklist.length;
    onProgressChange?.(Math.round(progress * 100));

    if (user) {
      const checklistData: Record<string, boolean> = {};
      checklist.forEach((item) => {
        checklistData[String(item.id)] = item.completed || false;
      });

      setIsSaving(true);
      saveJourneyProgress(user.id, journeyId, progress, checklistData)
        .catch((err) => {
          console.error("Error saving progress:", err);
        })
        .finally(() => {
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
    <div className="space-y-8">
      {/* Premium Progress Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Seu Progresso
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {completedCount} de {totalCount} etapas concluídas
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold text-primary">
              {Math.round(progressPercent)}%
            </span>
            <AnimatePresence>
              {isSaving && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-slate-400"
                >
                  Salvando...
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        {checklist.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => toggleItem(item.id)}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-5 transition-colors duration-300 ${
              item.completed
                ? "border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-900/10"
                : "border-slate-200 bg-white hover:border-primary/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary/40"
            }`}
          >
            {item.completed && (
              <motion.div
                layoutId={`highlight-${item.id}`}
                className="absolute left-0 top-0 h-full w-1 bg-green-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-0.5">
                <AnimatePresence mode="wait">
                  {item.completed ? (
                    <motion.div
                      key="checked"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2 className="h-7 w-7 text-green-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unchecked"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Circle className="h-7 w-7 text-slate-300 group-hover:text-primary/50 dark:text-slate-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold transition-all duration-300 ${
                    item.completed
                      ? "text-slate-400 line-through dark:text-slate-500"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-1 text-sm transition-all duration-300 ${
                    item.completed
                      ? "text-slate-400 dark:text-slate-500"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          variant="ghost"
          className="text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          onClick={() => {
            setChecklist(checklist.map((item) => ({ ...item, completed: false })));
          }}
        >
          Recomeçar Checklist
        </Button>
      </div>
    </div>
  );
}
