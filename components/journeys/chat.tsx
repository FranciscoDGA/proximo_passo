'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, Loader2, Trash2 } from 'lucide-react';
import { useAuth } from '@/providers/auth-provider';
import { JOURNEY_SPECIALISTS, JourneyId } from '@/lib/ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatProps {
  journeyId: string;
  journeyTitle: string;
}

export function Chat({ journeyId, journeyTitle }: ChatProps) {
  const { user, isLoading: authLoading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const specialist = JOURNEY_SPECIALISTS[journeyId as JourneyId];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!user || authLoading) return;

    const loadChatHistory = async () => {
      try {
        const response = await fetch(
          `/api/chat?userId=${user.id}&journeyId=${journeyId}`
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data.history || []);
        }
      } catch (err) {
        console.error('Error loading chat history:', err);
      }
    };

    loadChatHistory();
  }, [user, journeyId, authLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !user) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setError(null);

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          journeyId: journeyId,
          message: userMessage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao enviar mensagem');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar mensagem');
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!user || !confirm('Deseja limpar todo o histórico de conversa?')) return;

    try {
      setMessages([]);
      await fetch(`/api/chat/clear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          journeyId: journeyId,
        }),
      });
    } catch (err) {
      console.error('Error clearing history:', err);
    }
  };

  if (authLoading || !specialist) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Carregando...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Especialista em {journeyTitle}
          </CardTitle>
          <CardDescription>Converse com nossa IA especialista</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Faça login para acessar o especialista IA
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              {specialist.name}
            </CardTitle>
            <CardDescription className="mt-1">
              {specialist.description}
            </CardDescription>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearHistory}
              className="text-red-600 hover:text-red-700 dark:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Chat Messages */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
          {messages.length === 0 ? (
            <div className="text-center text-sm text-slate-500 dark:text-slate-400">
              <p>Nenhuma conversa iniciada.</p>
              <p>Faça uma pergunta para começar!</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100 rounded-lg px-4 py-2">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">
            {error}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            placeholder="Digite sua pergunta..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-400 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder-slate-600"
          />
          <Button
            type="submit"
            size="sm"
            disabled={isLoading || !inputValue.trim()}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Enviar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
