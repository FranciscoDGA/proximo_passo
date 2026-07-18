# Design System - Próximo Passo

## 🎨 Paleta de Cores

### Cores Primárias
```
Primary Blue:    #2563EB (Confiança, Ação, CTA)
Secondary Green: #10B981 (Sucesso, Progresso, Check)
Accent Amber:    #F59E0B (Atenção, Alerta, Destaque)
```

### Cores Neutras (Light Mode)
```
Background:      #FFFFFF
Surface:         #F9FAFB (cinza-50)
Text Primary:    #1F2937 (cinza-800)
Text Secondary:  #6B7280 (cinza-500)
Border:          #E5E7EB (cinza-200)
```

### Cores Neutras (Dark Mode)
```
Background:      #0F172A (slate-950)
Surface:         #1E293B (slate-900)
Text Primary:    #F3F4F6 (slate-100)
Text Secondary:  #CBD5E1 (slate-300)
Border:          #1E293B (slate-800)
```

### Estados
```
Success:         #10B981
Warning:         #F59E0B
Error:           #EF4444
Info:            #3B82F6
Disabled:        #D1D5DB
```

---

## 📝 Tipografia

### Fontes
- **Sans-serif**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono (código)

### Escalas

#### Headings
- H1 (Hero): Inter 700, 56px, linha 64px, Letter: -1px
- H2 (Página): Inter 700, 48px, linha 56px, Letter: -0.5px
- H3 (Seção): Inter 700, 36px, linha 44px, Letter: -0.25px
- H4 (Card): Inter 600, 24px, linha 32px
- H5 (Label): Inter 600, 20px, linha 28px
- H6 (Small): Inter 600, 18px, linha 26px

#### Body Text
- Large: Inter 400, 18px, linha 28px (Intro)
- Regular: Inter 400, 16px, linha 24px (Padrão)
- Small: Inter 400, 14px, linha 20px (Secundário)
- XSmall: Inter 400, 12px, linha 18px (Meta)

#### Code/Mono
- Regular: JetBrains Mono 400, 14px, linha 20px

---

## 🎯 Componentes

### Buttons

#### Primary Button
```
Background: #2563EB
Text: White
Padding: 12px 24px (md)
Border Radius: 8px
Font: Inter 600, 16px
Hover: bg-blue-600, shadow-lg
Focus: ring-2 ring-offset-2 ring-blue-500
Active: bg-blue-700
Disabled: opacity-50, cursor-not-allowed
```

#### Secondary Button
```
Background: White
Border: 1px #E5E7EB
Text: #1F2937
Padding: 12px 24px (md)
Border Radius: 8px
Hover: bg-slate-50
Active: bg-slate-100
Dark: bg-slate-950, border-dark-border
```

#### Ghost Button
```
Background: Transparent
Text: #2563EB
Hover: bg-blue-50
Dark: text-blue-400, hover-bg-slate-800
```

### Cards

#### Base Card
```
Background: White (dark: slate-950)
Border: 1px #E5E7EB (dark: #1E293B)
Border Radius: 12px
Padding: 24px
Shadow: 0 1px 3px rgba(0,0,0,0.1)
```

#### Card Hover
```
Transition: 150ms ease-in-out
Shadow: 0 10px 15px -3px rgba(0,0,0,0.1)
Transform: translateY(-2px)
```

### Input Fields

#### Text Input
```
Background: White
Border: 1px #E5E7EB
Border Radius: 8px
Padding: 10px 12px
Font: Inter 400, 16px
Focus: border-blue-500, ring-2 ring-blue-100
Placeholder: #9CA3AF
```

### Navigation

#### Navbar
```
Height: 64px
Background: White (dark: slate-950)
Border Bottom: 1px #E5E7EB
Z-index: 50
Sticky: true
```

#### Sidebar
```
Width: 256px (collapsed: 64px)
Background: White
Border Right: 1px #E5E7EB
Transition: width 200ms ease
```

---

## 🎬 Animações

### Transições Padrão
```
Duration: 150ms
Timing: ease-in-out
```

### Animações Principais
```
Fade In: opacity 0 → 1 (300ms)
Slide Up: translateY(10px) → 0, opacity 0 → 1 (300ms)
Bounce: scale 0.95 → 1 (150ms)
Hover: shadow + translateY(-2px) (150ms)
```

### Easing
```
Fast: cubic-bezier(0.4, 0, 0.2, 1) - 100ms
Standard: cubic-bezier(0.4, 0, 0.6, 1) - 150ms
Slow: cubic-bezier(0.2, 0, 0.8, 1) - 300ms
```

---

## 📏 Spacing Scale

```
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
6: 24px
8: 32px
12: 48px
16: 64px
```

---

## 🔳 Shadows

```
xs:  0 1px 2px 0 rgba(0, 0, 0, 0.05)
sm:  0 1px 3px 0 rgba(0, 0, 0, 0.1)
md:  0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1)
2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

---

## ⚡ Dark Mode

Implementado via `prefers-color-scheme: dark` + `class` strategy

```html
<!-- Toggle Dark Mode -->
<html class="dark">
  <!-- Content adjusts via dark: prefix -->
</html>
```

### Regras Dark Mode
- Backgrounds escurecem (white → slate-950)
- Text clareia (dark → light)
- Borders ajustam (cinza-claro → cinza-escuro)
- Shadows reduzem intensidade
- Sem perda de contrast (WCAG AA minimum)

---

## ♿ Acessibilidade

### Cores
- Contrast ratio > 4.5:1 para texto
- Contrast ratio > 3:1 para UI components
- Sem dependência só de cor

### Interatividade
- Focus indicator: 2px ring offset
- Keyboard navigation completa
- Screen reader labels
- ARIA attributes onde necessário

### Motion
- Respeita `prefers-reduced-motion`
- Animações opcionais/desativáveis
- Sem movimento infinito

---

## 🖼️ Ícones

- **Biblioteca**: Lucide React
- **Tamanho Padrão**: 20px, 24px, 32px
- **Stroke Width**: 2px
- **Color**: Herda do text-color

---

## 📱 Responsive Breakpoints

```
Mobile:   < 640px
Tablet:   640px - 1024px
Desktop:  1024px - 1280px
Wide:     > 1280px
```

---

**Status**: Aprovado para implementação em componentes

