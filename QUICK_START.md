# ⚡ Quick Start - Deployment Vercel

Comece em 10 minutos:

## 1️⃣ GitHub (5 min)

```bash
# Se repositório não existe ainda:
gh repo create proximo-passo --public --source=. --remote=origin --push

# Se já existe, apenas fazer push:
git push -u origin main
git push -u origin claude/proximo-passo-mvp-1n3bc5
```

## 2️⃣ Supabase (3 min)

1. Ir para https://supabase.com → Sign up
2. Create new project
3. Copiar credenciais em Settings → API

## 3️⃣ OpenAI (2 min)

1. Ir para https://platform.openai.com/api-keys
2. Create new secret key

## 4️⃣ Vercel (Push & Done)

1. Ir para https://vercel.com
2. Import from Git → selecionar `proximo-passo`
3. Add Environment Variables (copiar de Supabase + OpenAI)
4. Deploy

---

## 📋 Environment Variables para Vercel

Copiar essas 4 variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_SITE_URL=https://proximo-passo.vercel.app
```

---

## ✅ Depois de Deployado

- Site estará em: `https://proximo-passo.vercel.app`
- Redeploy automático a cada push em `main`
- Logs em Vercel Dashboard

**Prontinho! 🚀**
