import { supabase } from './supabase';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const JOURNEY_SPECIALISTS = {
  'abrir-mei': {
    name: 'Especialista em MEI',
    description: 'Orientação sobre abertura de Microempreendedor Individual',
    systemPrompt: `Você é um especialista em MEI (Microempreendedor Individual) no Brasil.
Forneça orientações práticas sobre:
- Processo de registro no Portal do Empreendedor
- Documentos necessários
- Direitos e deveres do MEI
- Obrigações fiscais e contábeis
- Como manter a regularidade
- Dicas de gestão financeira

Seja amigável, prático e cite documentos/órgãos oficiais quando relevante.
Responda em português brasileiro.`,
  },
  'comprar-casa': {
    name: 'Especialista em Imóveis',
    description: 'Orientação sobre compra de imóvel',
    systemPrompt: `Você é um especialista em compra de imóveis no Brasil.
Forneça orientações sobre:
- Documentos necessários para compra
- Financiamento imobiliário
- FGTS e como usar na compra
- Impostos e taxas (ITBI, registro, etc)
- Negociação de preço
- Due diligence (análise da propriedade)
- Tipos de financiamento disponíveis

Seja prático, cite órgãos como Caixa Econômica, bancos privados.
Responda em português brasileiro.`,
  },
  'inventario': {
    name: 'Especialista em Sucessão',
    description: 'Orientação sobre inventário e herança',
    systemPrompt: `Você é um especialista em direito sucessório e inventário no Brasil.
Forneça orientações sobre:
- Processo de inventário (etapas)
- Documentos necessários
- Diferença entre inventário judicial e extrajudicial
- Divisão de bens
- Impostos sobre herança (ITCMD)
- Prazos legais
- Quando contratar um advogado

Seja sensível (contexto de luto), prático e completo.
Responda em português brasileiro.`,
  },
  'casar': {
    name: 'Especialista em Casamento',
    description: 'Orientação sobre planejamento de casamento',
    systemPrompt: `Você é um especialista em planejamento de casamento e documentação no Brasil.
Forneça orientações sobre:
- Documentos para casamento civil
- Regime de bens (comunhão universal, separação, participação)
- Processo de casamento no Cartório
- Prazos e procedimentos
- Implicações fiscais de cada regime
- Documentação para cerimônia
- Benefícios e direitos do casamento

Seja atencioso, informativo e prático.
Responda em português brasileiro.`,
  },
  'imposto-renda': {
    name: 'Especialista em Imposto de Renda',
    description: 'Orientação sobre declaração de IR',
    systemPrompt: `Você é um especialista em Imposto de Renda Pessoa Física no Brasil.
Forneça orientações sobre:
- Quem precisa declarar IR
- Como preencher a declaração
- Deduções permitidas
- Rendimentos e como informar
- Bens e direitos
- Dúvidas comuns sobre IR
- Prazos e multas
- Recursos para pendências

Cite a Receita Federal, instruções normativas.
Seja completo e cite exemplos práticos.
Responda em português brasileiro.`,
  },
};

export type JourneyId = keyof typeof JOURNEY_SPECIALISTS;

export async function sendChatMessage(
  userId: string,
  journeyId: string,
  userMessage: string
): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const specialist = JOURNEY_SPECIALISTS[journeyId as JourneyId];
  if (!specialist) {
    throw new Error(`Unknown journey: ${journeyId}`);
  }

  // Fetch recent conversation history (last 10 messages)
  const { data: chatHistory } = await supabase
    ?.from('chat_history')
    .select('role, content')
    .eq('user_id', userId)
    .eq('journey_id', journeyId)
    .order('created_at', { ascending: true })
    .limit(10) || { data: [] };

  // Build messages array for OpenAI
  const messages: any[] = [];

  // Add conversation history
  if (chatHistory) {
    chatHistory.forEach((msg: any) => {
      messages.push({
        role: msg.role,
        content: msg.content,
      });
    });
  }

  // Add current user message
  messages.push({
    role: 'user',
    content: userMessage,
  });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: specialist.systemPrompt,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from OpenAI');
    }

    // Save user message to database
    if (supabase) {
      await supabase.from('chat_history').insert({
        user_id: userId,
        journey_id: journeyId,
        role: 'user',
        content: userMessage,
      });

      // Save assistant message
      await supabase.from('chat_history').insert({
        user_id: userId,
        journey_id: journeyId,
        role: 'assistant',
        content: assistantMessage,
      });
    }

    return assistantMessage;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

export async function getChatHistory(
  userId: string,
  journeyId: string
): Promise<Array<{ role: string; content: string }>> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('chat_history')
    .select('role, content')
    .eq('user_id', userId)
    .eq('journey_id', journeyId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }

  return data || [];
}

export async function clearChatHistory(
  userId: string,
  journeyId: string
): Promise<void> {
  if (!supabase) {
    return;
  }

  const { error } = await supabase
    .from('chat_history')
    .delete()
    .eq('user_id', userId)
    .eq('journey_id', journeyId);

  if (error) {
    console.error('Error clearing chat history:', error);
    throw error;
  }
}
