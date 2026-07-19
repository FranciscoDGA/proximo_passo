import { db } from "@/lib/db";

export class JourneyEngine {
  
  /**
   * Inicializa uma jornada para um usuário.
   */
  static async startJourney(userId: string, journeySlug: string) {
    const journey = await db.journey.findUnique({
      where: { slug: journeySlug },
      include: { stages: { orderBy: { order: "asc" } } }
    });

    if (!journey) throw new Error("Jornada não encontrada");

    // Verifica se já existe
    const existing = await db.userJourney.findFirst({
      where: { userId, journeyId: journey.id }
    });

    if (existing) return existing;

    const firstStage = journey.stages[0];

    const userJourney = await db.userJourney.create({
      data: {
        userId,
        journeyId: journey.id,
        status: "IN_PROGRESS",
        currentStageId: firstStage?.id,
        progressPercentage: 0
      }
    });

    // Inicia a primeira etapa
    if (firstStage) {
      await db.userStage.create({
        data: {
          userJourneyId: userJourney.id,
          stageId: firstStage.id,
          status: "UNLOCKED",
          unlockedAt: new Date()
        }
      });
    }

    return userJourney;
  }

  /**
   * Completa uma tarefa e recalcula o progresso e desbloqueio de etapas.
   */
  static async completeTask(userJourneyId: string, taskId: string) {
    const userTask = await db.userTask.upsert({
      where: {
        userJourneyId_taskId: { userJourneyId, taskId }
      },
      update: {
        completed: true,
        completedAt: new Date()
      },
      create: {
        userJourneyId,
        taskId,
        completed: true,
        completedAt: new Date()
      }
    });

    await this.calculateProgressAndUnlock(userJourneyId);

    return userTask;
  }

  /**
   * Responde uma decisão (ramificação condicional)
   */
  static async answerDecision(userJourneyId: string, decisionId: string, selectedOption: string) {
    const userDecision = await db.userDecision.upsert({
      where: {
        userJourneyId_decisionId: { userJourneyId, decisionId }
      },
      update: {
        selectedOption,
        answeredAt: new Date()
      },
      create: {
        userJourneyId,
        decisionId,
        selectedOption,
        answeredAt: new Date()
      }
    });

    await this.calculateProgressAndUnlock(userJourneyId);

    return userDecision;
  }

  /**
   * Recalcula o progresso e avalia regras (DSL) para destrancar próximas etapas.
   */
  static async calculateProgressAndUnlock(userJourneyId: string) {
    const userJourney = await db.userJourney.findUnique({
      where: { id: userJourneyId },
      include: {
        journey: {
          include: { 
            stages: { 
              include: { 
                tasks: true,
                decisions: { include: { options: true } }
              },
              orderBy: { order: "asc" }
            }
          }
        },
        userTasks: true,
        userStages: true,
        userDecisions: true
      }
    });

    if (!userJourney) throw new Error("Progresso não encontrado");

    let completedTasksCount = 0;
    let totalTasksCount = 0;

    const completedTaskIds = new Set(
      userJourney.userTasks.filter(t => t.completed).map(t => t.taskId)
    );

    const answeredDecisions = userJourney.userDecisions.reduce((acc, curr) => {
      acc[curr.decisionId] = curr.selectedOption;
      return acc;
    }, {} as Record<string, string>);

    for (const stage of userJourney.journey.stages) {
      // Avaliação de Regras do Stage (Unlock Rule)
      let isUnlockedByRule = true;
      if (stage.unlockRule) {
        // Exemplo simplificado de DSL de regra: "DECISION_ID === OPTION_VALUE"
        const [targetDecisionId, expectedValue] = stage.unlockRule.split("===").map(s => s.trim());
        if (targetDecisionId && expectedValue) {
          isUnlockedByRule = answeredDecisions[targetDecisionId] === expectedValue;
        }
      }

      if (!isUnlockedByRule) continue; // Pula etapas não aplicáveis

      // Se a etapa é aplicável, conta as tarefas dela
      totalTasksCount += stage.tasks.length;
      
      let stageCompletedTasks = 0;
      for (const task of stage.tasks) {
        if (completedTaskIds.has(task.id)) {
          completedTasksCount++;
          stageCompletedTasks++;
        }
      }

      // Se a etapa tem tarefas e todas foram completas (ou se não tem tarefas, completamos de outra forma), marca a etapa como concluída.
      // E destranca a próxima.
      const isStageCompleted = stage.tasks.length > 0 && stageCompletedTasks === stage.tasks.length;

      // Upsert UserStage para manter status sincronizado
      const existingUserStage = userJourney.userStages.find(us => us.stageId === stage.id);
      
      const newStatus = isStageCompleted ? "COMPLETED" : (existingUserStage?.status || "UNLOCKED");
      
      await db.userStage.upsert({
        where: { userJourneyId_stageId: { userJourneyId, stageId: stage.id } },
        update: {
          status: newStatus,
          completedAt: isStageCompleted && !existingUserStage?.completedAt ? new Date() : existingUserStage?.completedAt
        },
        create: {
          userJourneyId,
          stageId: stage.id,
          status: "UNLOCKED",
          unlockedAt: new Date()
        }
      });
    }

    const progressPercentage = totalTasksCount === 0 ? 0 : Math.round((completedTasksCount / totalTasksCount) * 100);
    const isJourneyCompleted = progressPercentage === 100;

    await db.userJourney.update({
      where: { id: userJourneyId },
      data: {
        progressPercentage,
        status: isJourneyCompleted ? "COMPLETED" : "IN_PROGRESS",
        completedAt: isJourneyCompleted ? new Date() : null
      }
    });

    return { progressPercentage, isJourneyCompleted };
  }
}
