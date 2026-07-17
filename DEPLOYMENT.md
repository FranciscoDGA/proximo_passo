# 🚀 Guia de Deployment - Próximo Passo

Este documento explica como fazer deploy da aplicação Próximo Passo no Vercel.

## Pré-requisitos

- [ ] Conta GitHub com repositório público
- [ ] Conta Vercel (gratuita)
- [ ] Conta Supabase (gratuita)
- [ ] Chave OpenAI API (gratuita)

---

## PASSO 1: Preparar GitHub

### Se o repositório já existe:

```bash
# Na pasta do projeto
git remote -v
# Deve mostrar origin apontando para seu repositório
```

### Se precisa criar repositório novo:

1. Ir para https://github.com/new
2. Criar repositório `proximo-passo`
3. Escolher "Public" (importante para Vercel grátis)
4. Não inicializar com README (já tem)

### Fazer push:

```bash
git remote add origin https://github.com/SEU_USER/proximo-passo.git
git branch -M main
git push -u origin main
# E também a branch de desenvolvimento:
git push -u origin claude/proximo-passo-mvp-1n3bc5
```

---

## PASSO 2: Configurar Supabase

### 1. Criar projeto Supabase:

1. Ir para https://supabase.com
2. Sign up ou login
3. Create new project
   - Nome: `proximo-passo`
   - Region: Brasil (São Paulo) ou seu país
   - Database password: guardar em local seguro

### 2. Pegar credenciais:

Na dashboard do projeto:
- Settings → API
- Copiar:
  - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
  - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Criar tabelas (SQL):

Na seção SQL Editor, executar:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User journeys
CREATE TABLE user_journeys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  journey_slug TEXT NOT NULL,
  progress FLOAT DEFAULT 0,
  checklist_data JSONB,
  saved_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_journeys ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);
```

---

## PASSO 3: Configurar OpenAI

### 1. Criar API key:

1. Ir para https://platform.openai.com/api-keys
2. Sign up ou login
3. "Create new secret key"
4. Copiar chave → `OPENAI_API_KEY`

### 2. Configurar limite de gastos:

- Ir para Billing → Usage limits
- Definir soft limit ($10-20/mês é seguro para MVP)

---

## PASSO 4: Conectar Vercel

### 1. Criar conta Vercel:

1. Ir para https://vercel.com
2. Sign up com GitHub
3. Autorizar integração GitHub

### 2. Importar projeto:

1. Dashboard Vercel → Add New → Project
2. Selecionar repositório `proximo-passo`
3. Configurar:
   - Framework: Next.js (detectado automaticamente)
   - Root Directory: ./
   - Build command: `npm run build` (padrão)
   - Install command: `npm install` (padrão)

### 3. Adicionar Environment Variables:

Na aba "Environment Variables", adicionar:

```
NEXT_PUBLIC_SUPABASE_URL = https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ...
SUPABASE_SERVICE_ROLE_KEY = eyJ...
OPENAI_API_KEY = sk-...
NEXT_PUBLIC_SITE_URL = https://proximo-passo.vercel.app
```

### 4. Fazer Deploy:

Clicar em "Deploy"

Esperar 3-5 minutos. Você verá:
- ✓ Build successful
- ✓ Your project is ready

---

## PASSO 5: Teste Post-Deploy

1. Ir para URL: https://proximo-passo.vercel.app
2. Testar:
   - [ ] Home page carrega
   - [ ] Explorar Guias funciona
   - [ ] Jornada Abrir MEI abre
   - [ ] Checklist persiste (localStorage funciona)
   - [ ] Preços mostra 3 planos
   - [ ] Dark mode funciona

---

## PASSO 6: Configurar Domínio (Opcional)

### Comprar domínio:

Recomendações:
- proximopasso.com.br (Namecheap, GoDaddy)
- proximopasso.co (mais barato)

### Conectar no Vercel:

1. Na dashboard do projeto → Settings → Domains
2. Add custom domain
3. Seguir instruções para adicionar DNS records
4. Esperar propagação (5-30 minutos)

---

## PASSO 7: Monitoramento

### Habilitar Sentry (opcional):

1. Ir para https://sentry.io
2. Create account
3. Create project → Next.js
4. Seguir integração
5. Adicionar `SENTRY_AUTH_TOKEN` ao Vercel

### Monitorar builds:

- Dashboard Vercel mostra todos os deploys
- Logs em Deployments → Logs
- Analytics em Analytics tab

---

## 🔄 Workflow de Deploy

Depois de configurado, o processo é automático:

1. Fazer commit localmente
2. `git push origin main`
3. GitHub dispara webhook no Vercel
4. Vercel roda build automático
5. Se bem-sucedido → deploy automático
6. Site atualizado em 3-5 minutos

---

## ⚙️ Variáveis de Ambiente por Ambiente

### Development (local):
```
.env.local (já criado)
```

### Staging (Vercel preview):
- Automático para PRs
- Environment variables do projeto

### Production (main branch):
- Automático quando merge em main
- Mesmas environment variables

---

## 🆘 Troubleshooting

### Build falha:
1. Verificar logs em Vercel → Deployments
2. Verificar se `npm run build` funciona localmente
3. Verificar Node version (deve ser 18+)

### Site não carrega:
1. Verificar environment variables
2. Verificar NEXT_PUBLIC_SUPABASE_URL está correto
3. Verificar Supabase está online

### Performance lenta:
1. Vercel Analytics mostra problemas
2. Lighthouse score via PageSpeed Insights
3. Verificar imagens estão otimizadas

---

## 📋 Checklist Final

- [ ] Repositório GitHub público
- [ ] Supabase projeto criado e configurado
- [ ] OpenAI API key gerada
- [ ] Vercel projeto criado
- [ ] Environment variables adicionadas
- [ ] Deploy bem-sucedido
- [ ] Site funciona em produção
- [ ] Dark mode funciona
- [ ] Checklist persiste
- [ ] (Opcional) Domínio customizado conectado

---

**Status**: Pronto para deploy quando a Semana 2 for concluída!

**Próximo passo**: Quando implementação estiver 100% pronta, apenas fazer:
```bash
git push origin main
# Vercel faz deploy automático
```
