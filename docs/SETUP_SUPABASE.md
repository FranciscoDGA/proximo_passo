# Configuração do Supabase - Próximo Passo

Este guia passo-a-passo explica como configurar o Supabase para autenticação e persistência de dados.

## Pré-requisitos

- Conta no [Supabase](https://supabase.com)
- Node.js 18+ instalado
- Git configurado

## Passo 1: Criar Projeto Supabase

1. Acesse [app.supabase.com](https://app.supabase.com)
2. Clique em "New Project"
3. Preencha os detalhes:
   - **Name**: Próximo Passo (ou seu nome preferido)
   - **Database Password**: Crie uma senha forte e segura
   - **Region**: Escolha a região mais próxima do seu público (ex: us-east-1 para Brasil)
4. Clique "Create new project"
5. Aguarde o projeto ser criado (leva 2-3 minutos)

## Passo 2: Obter Credenciais

Uma vez que o projeto for criado:

1. Vá para **Settings** → **API**
2. Copie:
   - **Project URL** (use como `NEXT_PUBLIC_SUPABASE_URL`)
   - **Anon Public key** (use como `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Passo 3: Configurar Variáveis de Ambiente

1. Abra o arquivo `.env.local` no raiz do projeto
2. Substitua os valores:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
OPENAI_API_KEY=sk-proj-...
```

## Passo 4: Criar Tabelas do Banco de Dados

1. No Supabase, vá para **SQL Editor**
2. Clique em "New Query"
3. Cole o conteúdo do arquivo `supabase/migrations/001_create_schema.sql`
4. Clique "Run"

Você deve ver mensagens de sucesso para todas as operações.

## Passo 5: Configurar Autenticação

1. Vá para **Authentication** → **Providers**
2. Certifique-se de que "Email" está habilitado (deve estar por padrão)
3. Vá para **Settings** → **Email**:
   - **Confirm email**: Desabilitar para desenvolvimento (para testes mais rápidos)
   - Em produção, você deve usar um provedor de email (SendGrid, Mailgun, etc)

## Passo 6: Configurar URLs de Redirecionamento

1. Vá para **Authentication** → **URL Configuration**
2. Em "Redirect URLs", adicione:
   - Para desenvolvimento: `http://localhost:3000/**`
   - Para produção: `https://seu-dominio.com.br/**`

## Passo 7: Testar Autenticação

1. Execute o projeto localmente:
```bash
npm run dev
```

2. Acesse `http://localhost:3000/signup`
3. Crie uma conta com um email e senha
4. Você deve ser redirecionado para o dashboard
5. Verifique se o progresso do checklist está sendo salvo no Supabase

Para verificar no banco de dados:
- Vá para **SQL Editor**
- Execute: `SELECT * FROM users;`
- Execute: `SELECT * FROM user_journeys;`

## Passo 8: Configurar Storage para Documentos (Opcional)

Se deseja armazenar documentos PDF:

1. Vá para **Storage**
2. Clique "Create new bucket"
3. Nome: `documents`
4. Marque "Public bucket" se quiser acesso público
5. Configure políticas de acesso no SQL

## Troubleshooting

### "NEXT_PUBLIC_SUPABASE_URL is required"
Certifique-se de que `.env.local` existe e as variáveis estão corretas.

### "Política de segurança de linha rejeitou esta operação"
O usuário não está autenticado ou as políticas RLS estão muito restritivas.
Verifique as políticas em **Authentication** → **Row Level Security**.

### Email não recebe confirmação
Em desenvolvimento, desabilite "Confirm email" nas configurações de autenticação.

## Recursos Adicionais

- [Documentação Supabase](https://supabase.com/docs)
- [Autenticação com Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## Próximos Passos

Depois de configurar o Supabase:

1. **FASE 2**: Implementar Chat com Especialista IA
   - Integrar OpenAI API
   - Criar interface de chat
   - Salvar histórico de conversas

2. **FASE 3**: Criar Ferramentas Interativas
   - Calculadora MEI
   - Simulador de Financiamento
   - Calculadora FGTS

3. **FASE 4**: Admin Panel
   - Dashboard de analytics
   - Gerenciamento de conteúdo
   - Listagem de usuários
