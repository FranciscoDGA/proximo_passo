# Configuração OpenAI API - Próximo Passo

Este guia explica como configurar a OpenAI API para o chat com especialistas IA.

## Passo 1: Criar Conta OpenAI

1. Acesse [platform.openai.com](https://platform.openai.com)
2. Clique em "Sign up" ou faça login se já tem conta
3. Concluir verificação de email e configurar perfil

## Passo 2: Gerar API Key

1. Vá para **API keys** na sidebar
2. Clique em **"Create new secret key"**
3. Dê um nome descritivo (ex: "Proximo Passo")
4. Copie a chave (você só verá uma vez!)
5. **Guarde em local seguro**

## Passo 3: Configurar Variável de Ambiente

1. Abra `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
```

2. Substitua `sk-proj-xxxxxxxxxxxxx` pela sua API key real
3. Salve o arquivo

## Passo 4: Definir Limite de Gastos (Importante!)

1. Vá para **Billing** → **Usage limits**
2. Configure um **Hard limit** para evitar surpresas
3. Exemplo: $20/mês para testes
4. Configure alertas para avisos

## Passo 5: Testar a Integração

1. Execute o projeto:
```bash
npm run dev
```

2. Faça login em http://localhost:3000/signin
3. Acesse uma jornada (ex: /journeys/abrir-mei)
4. Clique na aba "Especialista"
5. Faça uma pergunta para testar

## Custos Estimados

**Modelo usado**: `gpt-4o-mini` (muito econômico)

Preços (aproximados):
- **Entrada**: $0.00015 por 1K tokens
- **Saída**: $0.0006 por 1K tokens

**Exemplos de uso**:
- 1 pergunta/resposta: ~5-10 centavos de real
- 100 conversas por dia: ~R$5-10/dia
- 1 mês (30 dias): ~R$150-300/mês

## Troubleshooting

### "OpenAI API key not configured"
Verifique:
- ✅ .env.local existe e tem OPENAI_API_KEY
- ✅ Reiniciou o servidor (npm run dev)
- ✅ API key está correta (começa com `sk-`)

### "Invalid API key"
- API key expirou ou foi revogada
- Gere uma nova em platform.openai.com

### "Rate limit exceeded"
- Muitas requisições simultâneas
- Aguarde alguns segundos
- Aumente o limite de uso se estiver testando muito

### "Insufficient balance"
- Acabou o crédito
- Adicione um método de pagamento em **Billing**

## Segurança

⚠️ **IMPORTANTE**: Nunca compartilhe sua API key!

- ✅ Mantenha em .env.local
- ✅ Adicione .env.local ao .gitignore
- ✅ Se vazar, delete e gere uma nova
- ✅ Use rate limiting em produção (já implementado)

## Modelos Disponíveis

Atual: `gpt-4o-mini` (melhor custo-benefício)

Outros disponíveis:
- `gpt-4o` - Mais poderoso, mais caro
- `gpt-4-turbo` - Rápido, intermediário
- `gpt-3.5-turbo` - Mais barato, menos poderoso

## Próximos Passos

1. ✅ Testar chat com uma jornada
2. 📊 Monitorar gastos em Billing
3. 🔐 Configurar limite de gastos
4. 🚀 Deploy para produção com limites apropriados

## Recursos Úteis

- [Documentação OpenAI](https://platform.openai.com/docs)
- [Pricing Calculator](https://openai.com/pricing)
- [Model Comparison](https://platform.openai.com/docs/models)
