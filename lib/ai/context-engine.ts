import { db } from "@/lib/db";

export class AIContextEngine {
  /**
   * Lê o progresso do usuário no banco de dados e gera a "Máquina de Estados" textual
   * para o System Prompt da Inteligência Artificial.
   */
  static async buildSystemPrompt(userJourneyId: string): Promise<string> {
    const userJourney = await db.userJourney.findUnique({
      where: { id: userJourneyId },
      include: {
        journey: {
          include: {
            specialists: true,
            stages: {
              include: { tasks: true, documents: true },
              orderBy: { order: "asc" }
            }
          }
        },
        userStages: true,
        userTasks: true,
        userDocuments: true
      }
    });

    if (!userJourney) throw new Error("Jornada não encontrada");

    const journey = userJourney.journey;
    const specialist = journey.specialists[0] || { 
      name: "Especialista", 
      systemPrompt: "Você é um assistente prestativo." 
    };

    let prompt = `Você é ${specialist.name}.\n`;
    prompt += `${specialist.systemPrompt}\n\n`;
    
    prompt += `CONTEXTO DA MÁQUINA DE ESTADOS DA JORNADA:\n`;
    prompt += `Jornada Atual: ${journey.title}\n`;
    prompt += `Progresso Geral: ${userJourney.progressPercentage}%\n`;
    prompt += `Status: ${userJourney.status}\n\n`;

    prompt += `RESUMO DAS ETAPAS:\n`;
    for (const stage of journey.stages) {
      const userStage = userJourney.userStages.find(us => us.stageId === stage.id);
      const statusIcon = userStage?.status === "COMPLETED" ? "✅" 
                       : userStage?.status === "UNLOCKED" ? "⏳" 
                       : "🔒";
      
      prompt += `${statusIcon} Etapa ${stage.order}: ${stage.title}\n`;
      
      // Lista as tarefas apenas da etapa atual desbloqueada
      if (userStage?.status === "UNLOCKED") {
        prompt += `   TAREFAS PENDENTES NESTA ETAPA:\n`;
        for (const task of stage.tasks) {
          const userTask = userJourney.userTasks.find(ut => ut.taskId === task.id);
          if (!userTask?.completed) {
            prompt += `   - [ ] ${task.title}\n`;
          }
        }
      }
    }

    prompt += `\nDIRETRIZES ABSOLUTAS DE SEGURANÇA:\n`;
    prompt += `- Não invente leis ou prazos jurídicos.\n`;
    prompt += `- Baseie-se apenas nas tarefas pendentes mostradas acima para orientar o usuário.\n`;
    prompt += `- Se o usuário perguntar algo fora do escopo desta jornada, redirecione o foco educadamente.\n`;
    prompt += `- Você tem ferramentas para marcar as tarefas como concluídas se o usuário disser que já fez.\n`;

    return prompt;
  }
}
