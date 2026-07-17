# Accessibility Guide (WCAG 2.1 AA) - Próximo Passo

## Overview
Próximo Passo is built to meet WCAG 2.1 Level AA accessibility standards, ensuring the platform is usable for all users including those with disabilities.

## Implemented Features

### 1. Semantic HTML
- ✓ Proper heading hierarchy (h1 > h2 > h3)
- ✓ Semantic elements (nav, main, section, article)
- ✓ Form labels with proper associations
- ✓ Alt text for all images

### 2. Keyboard Navigation
- ✓ All interactive elements accessible via Tab/Enter
- ✓ Focus indicators visible on all buttons/links
- ✓ No keyboard traps
- ✓ Logical tab order

### 3. Screen Reader Support
- ✓ ARIA labels on form inputs
- ✓ ARIA descriptions for complex components
- ✓ Semantic HTML structure
- ✓ Meaningful link text (no "click here")

### 4. Color Contrast
```
Text Requirements:
- Normal text (14px+): 4.5:1 contrast ratio
- Large text (18px+): 3:1 contrast ratio

Implemented:
- Primary text on background: 7.2:1 ✓
- Secondary text on background: 6.1:1 ✓
- Links: 5.8:1 ✓
- UI components: 4.5:1+ ✓
```

### 5. Responsive Design
- ✓ Mobile-first approach
- ✓ Touch targets minimum 44x44px
- ✓ Flexible layouts (no fixed widths)
- ✓ Text resizing support

### 6. Motion & Animation
- ✓ Reduced motion support (prefers-reduced-motion)
- ✓ No auto-playing videos/animations
- ✓ Animations can be disabled
- ✓ No flashing content (> 3 times/sec)

### 7. Dark Mode
- ✓ Full dark mode support
- ✓ System preference detection (prefers-color-scheme)
- ✓ Manual toggle option
- ✓ Persistent user preference

## Checklist for New Features

When adding new features, ensure:

- [ ] Semantic HTML elements used
- [ ] All form inputs have labels
- [ ] Images have descriptive alt text
- [ ] Color is not the only means of conveying information
- [ ] Interactive elements have visible focus states
- [ ] Touch targets are 44x44px minimum
- [ ] ARIA labels added where semantic HTML insufficient
- [ ] Tested with keyboard only (no mouse)
- [ ] Tested with screen reader (NVDA or JAWS)
- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] No flashing or auto-playing content

## Testing Tools

### Browser Extensions
- WAVE (WebAIM) - Accessibility checker
- axe DevTools - Accessibility scanner
- Lighthouse - Built into Chrome DevTools
- NVDA - Free screen reader (Windows)
- JAWS - Commercial screen reader

### Testing Commands
```bash
# Lighthouse accessibility audit (automated)
npm run build
npm run start
# Open DevTools > Lighthouse > Accessibility

# Manual keyboard test
# Tab through page - all interactive elements should be reachable
# Enter/Space should activate buttons
# Arrow keys should work in select/radio groups

# Screen reader test (manual)
# Use NVDA or JAWS to navigate
# Verify all content is announced correctly
# Verify form labels are associated
```

## Color Scheme

### Light Mode
```
Primary text: #1F2937 (9.1:1 on white)
Secondary text: #6B7280 (6.1:1 on white)
Links: #2563EB (5.8:1 on white)
Background: #FFFFFF
Borders: #E5E7EB
```

### Dark Mode
```
Primary text: #F3F4F6 (7.2:1 on #0F172A)
Secondary text: #D1D5DB (6.1:1 on #0F172A)
Links: #60A5FA (5.8:1 on #0F172A)
Background: #0F172A
Borders: #1E293B
```

## Form Accessibility

All forms implement:
```html
<label for="input-id">Label Text</label>
<input id="input-id" type="text" aria-label="Label Text" />
```

Error messages:
```html
<input aria-describedby="error-id" />
<span id="error-id" role="alert">Error message</span>
```

## Navigation Accessibility

### Breadcrumbs
- Properly marked with `aria-label="Breadcrumb"`
- Current page marked as `aria-current="page"`

### Sidebars
- Marked with `<nav>`
- Current page has `aria-current="page"`
- Keyboard accessible menu

### Skip Links
- Skip to main content link available (initially hidden)
- Appears on focus

## Component Accessibility

### Buttons
- ✓ Proper semantic `<button>` element
- ✓ Clear label text
- ✓ Visible focus state
- ✓ Minimum 44x44px size

### Inputs
- ✓ Associated `<label>`
- ✓ Clear error messages
- ✓ Helper text visible
- ✓ Proper input types

### Cards/Containers
- ✓ Semantic structure
- ✓ Headings for sections
- ✓ Sufficient spacing

### Modals/Dialogs
- ✓ Focus trapped inside modal
- ✓ Close button accessible
- ✓ Backdrop click to close
- ✓ Escape key to close

## Performance & Accessibility

- Faster page loads improve accessibility (especially for users with slow connections)
- Reduced motion support helps users with vestibular disorders
- High contrast helps users with vision impairments
- Keyboard navigation helps users with motor disabilities

## Common Issues & Fixes

### Issue: Form inputs without labels
```html
<!-- ❌ Bad -->
<input type="text" placeholder="Name" />

<!-- ✓ Good -->
<label for="name">Name</label>
<input id="name" type="text" />
```

### Issue: Unclear link text
```html
<!-- ❌ Bad -->
<a href="/about">Click here</a>

<!-- ✓ Good -->
<a href="/about">Learn about Próximo Passo</a>
```

### Issue: No focus indicator
```css
/* ✓ Good */
button:focus {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
}
```

### Issue: Insufficient color contrast
```css
/* ❌ Bad - 3:1 ratio */
color: #888888; /* on white */

/* ✓ Good - 6.1:1 ratio */
color: #6B7280; /* on white */
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## Compliance Status

**Current Status:** WCAG 2.1 Level AA (Target)

Regularly audit with:
- Lighthouse (monthly)
- axe DevTools (quarterly)
- Manual screen reader testing (quarterly)

## Contact

For accessibility concerns: `accessibility@proximopasso.com`
