# Roadmap - Próximo Passo MVP V1

## Timeline: 4 Semanas (Sprint Intenso)

---

## 📅 SEMANA 1: Setup + Discovery (Dias 1-5)

### Status: ✅ CONCLUÍDO

**Infraestrutura:**
- ✅ Next.js 14 + React 18 + TypeScript
- ✅ TailwindCSS + shadcn/ui
- ✅ Project setup com linting e formatting
- ✅ Folder structure pronta

**UI Components:**
- ✅ Button, Card, Badge
- ✅ Navbar com responsividade
- ✅ Journey card component

**Pages:**
- ✅ Home page (hero + stats)
- ✅ Journeys explorer
- ✅ Journey detail page (dinâmica)
- ✅ Pricing page
- ✅ Auth pages (signin/signup)

**Documentation:**
- ✅ Vision document
- ✅ Personas (5 personas)
- ✅ Life journeys map (26 jornadas)
- ✅ Design system (colors, typography)

**Repository:**
- ✅ Initial commits
- ✅ Branch setup
- ✅ Ready for development

---

## 📅 SEMANA 2: Jornadas Principais 1-2

### Status: ⏳ EM PROGRESSO

### Épico 1: Abrir MEI (Priority: ALTA)

**Objetivos:**
- Implementar jornada completa de Abrir MEI
- 8 etapas com checklist
- Especialista IA para MEI
- Calculadora MEI
- Documentos para download

**Tasks:**
- [ ] Criar página de jornada MEI
- [ ] Implementar componente de checklist interativo
- [ ] Timeline visual de prazos
- [ ] Integrar OpenAI para especialista MEI
- [ ] Criar calculadora MEI
- [ ] Gerar modelos de documentos (JSON)
- [ ] Sistema de progresso persistente (localStorage primeiro)

**Estimated Time**: 3 dias

### Épico 2: Comprar Casa (Priority: ALTA)

**Objetivos:**
- Implementar jornada de Comprar Casa
- 15 etapas com profundidade
- Checklist colaborativo (para casal)
- Calculadora de financiamento
- Timeline de prazos críticos

**Tasks:**
- [ ] Criar página de jornada Comprar Casa
- [ ] Checklist com dependências (etapas que bloqueiam outras)
- [ ] Calculadora de financiamento imobiliário
- [ ] Dashboard de progresso (multiusuário - versão básica)
- [ ] Especialista IA para imóveis

**Estimated Time**: 2 dias

### Épico 3: Dashboard Básico

**Objetivos:**
- Dashboard com minhas jornadas
- Histórico de ações
- Progresso visual

**Tasks:**
- [ ] Criar página /dashboard
- [ ] Listar jornadas iniciadas
- [ ] Mostrar progresso visual
- [ ] Histórico de últimas ações
- [ ] Quick access aos especialistas

**Estimated Time**: 1 dia

### Épico 4: Especialista IA v1

**Objetivos:**
- Chat com IA especialista
- Context-aware (sabe qual jornada está)
- Histórico de conversa

**Tasks:**
- [ ] Criar API route /api/chat
- [ ] Implementar chamadas OpenAI
- [ ] Sistema de prompts por jornada
- [ ] Chat interface no navegador
- [ ] Histórico persistente

**Estimated Time**: 1.5 dias

---

## 📅 SEMANA 3: Mais Jornadas + Conteúdo

### Épico 1: Jornadas 3-5

**Tasks:**
- [ ] Inventário (18 etapas)
- [ ] Casar (12 etapas)
- [ ] Declarar IR (10 etapas)

**Estimated Time**: 3 dias

### Épico 2: Blog com SEO

**Objetivos:**
- 30 artigos sementes
- Otimização para SEO
- Breadcrumb, metadata, schema

**Tasks:**
- [ ] Estrutura de blog post
- [ ] Página de blog
- [ ] 30 artigos seedados (JSON)
- [ ] SEO metadata (OG, Schema.org)
- [ ] Breadcrumb navigation
- [ ] Related articles

**Estimated Time**: 2 dias

### Épico 3: 5 Ferramentas Principais

**Tasks:**
- [ ] Calculadora MEI (✓ jornada 1)
- [ ] Calculadora de Financiamento (✓ jornada 2)
- [ ] Checklist de Casamento (jornada 4)
- [ ] Simulador de Aposentadoria
- [ ] Organizador de Documentos

**Estimated Time**: 1.5 dias

### Épico 4: Admin Panel Básico

**Objetivos:**
- CRUD de jornadas
- Publicar artigos
- Ver analytics básico

**Tasks:**
- [ ] Protected route /admin
- [ ] Jornadas management
- [ ] Articles management
- [ ] Basic analytics

**Estimated Time**: 1 dia

---

## 📅 SEMANA 4: Polish + Launch

### Épico 1: Testing & QA

**Tasks:**
- [ ] E2E tests (Playwright) - jornadas críticas
- [ ] Performance testing
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Mobile testing

**Estimated Time**: 1.5 dias

### Épico 2: Optimization

**Tasks:**
- [ ] Lighthouse score > 95
- [ ] Core Web Vitals optimization
- [ ] SEO optimization (sitemap, robots.txt)
- [ ] Image optimization
- [ ] CSS/JS minification

**Estimated Time**: 1 dia

### Épico 3: Deployment

**Tasks:**
- [ ] Vercel setup
- [ ] Environment variables
- [ ] Database migrations (Supabase)
- [ ] Monitoring (Sentry)

**Estimated Time**: 0.5 dias

### Épico 4: Soft Launch

**Tasks:**
- [ ] Landing page refinement
- [ ] CTA optimization
- [ ] Social proof collection
- [ ] Beta user feedback

**Estimated Time**: 1 dia

---

## 📊 Métricas de Sucesso (MVP)

| Métrica | Target | Status |
|---------|--------|--------|
| Jornadas Completas | 5 | ⏳ |
| Lighthouse Score | ≥ 95 | ⏳ |
| Core Web Vitals | Excellent | ⏳ |
| Páginas Indexáveis | 100% | ⏳ |
| Documentos Prontos | 50+ | ⏳ |
| Ferramentas Funcionando | 5 | ⏳ |
| Especialistas IA | 5 | ⏳ |
| Autenticação | Funcional | ⏳ |
| Dashboard | Básico | ⏳ |

---

## 🚀 Fase V1.5 (Após Launch)

Após o MVP, prioridades para 2-3 semanas seguintes:

1. **Mais Jornadas** (10 novas)
2. **Sistema de Lembretes** (push notifications)
3. **Exportar Checklist em PDF**
4. **Feedback de Usuários**
5. **Refinements baseados em analytics**

---

## 🎯 Próximas Fases (V2+)

### V2 - Integração & Comunidade
- 30 jornadas (26 → 30)
- Plano Família
- APIs gov.br
- Marketplace de profissionais

### V3 - Mobile & Growth
- App mobile (React Native)
- Integração WhatsApp
- 50+ jornadas
- IA que aprende com histórico

---

**Última Atualização**: 2024-07-17
**Status do Projeto**: MVP V1 em desenvolvimento
**Sprint Atual**: Semana 2
