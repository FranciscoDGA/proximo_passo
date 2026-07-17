# 🚀 Próximo Passo MVP V1

Uma plataforma brasileira premium que funciona como "Google Maps para burocracias e decisões da vida". Seu guia para os momentos mais importantes da vida.

## 📋 O que é?

Próximo Passo é um Sistema Operacional da Vida Adulta que:
- ✅ Guia você através de eventos complexos (abrir empresa, comprar casa, herança, etc)
- ✅ Oferece checklists dinâmicos com próximos passos claros
- ✅ Conecta você com especialistas IA contextualizados
- ✅ Fornece ferramentas prontas (calculadoras, templates, documentos)
- ✅ Oferece experiência premium elegante e minimalista

## 🏗️ Stack Técnico

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: TailwindCSS + shadcn/ui + Framer Motion
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **AI**: OpenAI (GPT-4o mini)
- **Hosting**: Vercel
- **Cache**: Vercel KV
- **Monitoring**: Sentry

## 🎯 MVP V1 Roadmap (4 Semanas)

### Semana 1: Setup + Discovery
- ✅ Infraestrutura (Next.js, Supabase, Vercel)
- ✅ Documentos de discovery (vision, personas, jornadas)
- ⏳ Design system
- ⏳ Landing page skeleton

### Semana 2: Jornadas Principais
- ⏳ Jornada 1: Abrir MEI
- ⏳ Jornada 2: Comprar Casa
- ⏳ Dashboard básico
- ⏳ Especialista IA v1

### Semana 3: Mais Conteúdo
- ⏳ Jornadas 3-5: Inventário, Casar, IR
- ⏳ Blog com 30 artigos
- ⏳ 5 ferramentas principais
- ⏳ Admin panel básico

### Semana 4: Launch
- ⏳ Polish & UX refinement
- ⏳ Performance optimization
- ⏳ E2E tests
- ⏳ Soft launch

## 📂 Estrutura do Projeto

```
proximo-passo/
├── app/                    # Next.js app router
│   ├── (auth)/            # Páginas de autenticação
│   ├── (main)/            # Páginas autenticadas
│   ├── admin/             # Painel administrativo
│   ├── api/               # API routes
│   ├── layout.tsx         # Layout root
│   ├── page.tsx           # Home page
│   └── globals.css        # Estilos globais
│
├── components/            # Componentes React
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Componentes de layout
│   ├── journeys/         # Componentes de jornadas
│   ├── blog/             # Componentes de blog
│   ├── dashboard/        # Dashboard components
│   └── admin/            # Admin components
│
├── lib/                   # Funções utilitárias
│   ├── utils.ts          # Helpers
│   ├── constants.ts      # Constantes
│   ├── db.ts             # Database queries
│   ├── auth.ts           # Auth helpers
│   └── ai.ts             # IA integration
│
├── data/                  # Dados estáticos
│   ├── journeys.json     # Definições de jornadas
│   ├── tools.json        # Ferramentas disponíveis
│   └── blog-posts.json   # Posts sementes
│
├── docs/                  # Documentação do projeto
│   ├── vision.md         # Visão do produto
│   ├── personas.md       # Personas
│   ├── life-journeys-map.md
│   ├── design-system.md
│   └── roadmap.md
│
├── public/               # Arquivos estáticos
│   ├── images/
│   ├── icons/
│   └── sitemap.xml
│
└── package.json          # Dependências
```

## 🚀 Getting Started

### Pré-requisitos
- Node.js 18+
- npm 9+
- Conta Supabase
- API Key OpenAI
- Conta Vercel (opcional para deploy)

### Instalação

```bash
# 1. Clonar repositório
git clone <repository>
cd proximo-passo

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credentials

# 4. Rodar desenvolvimento
npm run dev

# Abrir http://localhost:3000
```

### Comandos Disponíveis

```bash
npm run dev           # Rodar dev server
npm run build         # Build para produção
npm start             # Rodar em produção
npm run lint          # Verificar código
npm run format        # Formatar código
npm run type-check    # Verificar tipos TypeScript
```

## 📊 Estrutura de Dados

### Tabelas Principais (Supabase)

#### users
- id (UUID)
- email
- name
- subscription_tier (free | premium | familia | empresarial)
- created_at
- updated_at

#### journeys
- id (UUID)
- slug
- title
- description
- category
- steps_count
- estimated_time
- icon
- created_at

#### user_journeys
- id (UUID)
- user_id
- journey_id
- progress (0-100)
- checklist_data (JSON)
- saved_at

#### checklist_items
- id (UUID)
- journey_id
- title
- description
- is_completed
- order

#### specialists
- id (UUID)
- journey_id
- name
- system_prompt
- model
- created_at

## 🎨 Design

O projeto segue um design system premium e minimalista:
- Cores: Primary Blue (#2563EB), Secondary Green (#10B981), Accent Amber (#F59E0B)
- Font: Inter (sans-serif)
- Dark Mode nativo
- Acessibilidade WCAG 2.1 AA
- Performance Lighthouse > 95

Veja `/docs/design-system.md` para detalhes completos.

## 📖 Documentação

Toda a documentação do projeto está em `/docs`:
- `vision.md` - Missão e visão
- `personas.md` - Personas de usuários
- `life-journeys-map.md` - Mapa de jornadas
- `design-system.md` - Design system
- `roadmap.md` - Roadmap detalhado

## 🤝 Contribuindo

Este é um projeto ativo. Para contribuir:
1. Cria branch a partir de `main`
2. Faça suas mudanças
3. Abra pull request
4. Aguarde review

## 📄 Licença

Propriedade de Próximo Passo © 2024

## 📞 Contato

- Email: team@proximopasso.com.br
- Website: https://proximopasso.com.br

---

**Status do Projeto**: MVP V1 em desenvolvimento | **Sprint Atual**: Semana 1 Setup
