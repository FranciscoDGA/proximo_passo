import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { AIContextEngine } from '@/lib/ai/context-engine';
import { JourneyEngine } from '@/lib/engine/journey-engine';
import { db } from '@/lib/db';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, userJourneyId } = await req.json();

  if (!userJourneyId) {
    return new Response('Missing userJourneyId', { status: 400 });
  }

  // 1. Gera o System Prompt Dinâmico (Máquina de Estados)
  let systemPrompt = "";
  try {
    systemPrompt = await AIContextEngine.buildSystemPrompt(userJourneyId);
  } catch (error) {
    return new Response('Journey context failed', { status: 404 });
  }

  // 2. Chama a OpenAI usando a interface do Vercel AI SDK Core
  const result = streamText({
    model: openai('gpt-4o'),
    system: systemPrompt,
    messages,
    tools: {
      complete_task: tool({
        description: 'Marca uma tarefa pendente como concluída no banco de dados. Use apenas quando o usuário afirmar claramente que já concluiu a ação.',
        parameters: z.object({
          taskId: z.string().describe('O ID da tarefa que foi concluída, conforme exibido no contexto.'),
        }),
        // @ts-ignore
        execute: async ({ taskId }) => {
          try {
            await JourneyEngine.completeTask(userJourneyId, taskId);
            return `A tarefa ${taskId} foi marcada como concluída com sucesso! Informe o usuário sobre o novo progresso.`;
          } catch (e: any) {
            return `Falha ao concluir a tarefa: ${e.message}`;
          }
        },
      }),
      // Ferramentas futuras (ex: upload_document) podem ser injetadas aqui
    },
    onFinish: async ({ text, toolCalls }) => {
      // 3. Persistência de Memória no Prisma (Opcional para análise futura)
      try {
        const session = await db.aIChatSession.upsert({
          where: { userJourneyId },
          update: {},
          create: { userJourneyId }
        });
        
        // Salva a mensagem que acabou de ser gerada pela IA
        await db.aIMessage.create({
          data: {
            sessionId: session.id,
            role: 'assistant',
            content: text,
            toolCalls: toolCalls ? JSON.parse(JSON.stringify(toolCalls)) : null
          }
        });
      } catch (error) {
        console.error("Erro ao salvar log de chat:", error);
      }
    }
  });

  return result.toDataStreamResponse();
}
