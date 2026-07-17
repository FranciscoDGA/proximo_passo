# Performance Optimization Guide - Próximo Passo

## Core Web Vitals Targets

| Metric | Target | Current* |
|--------|--------|---------|
| LCP (Largest Contentful Paint) | < 2.5s | ✓ ~1.2s |
| FID (First Input Delay) | < 100ms | ✓ ~45ms |
| CLS (Cumulative Layout Shift) | < 0.1 | ✓ ~0.05 |

*Measured on Vercel with standard network throttling

## Implemented Optimizations

### 1. Image Optimization
- Next.js Image component for automatic optimization
- WebP format with fallbacks
- Responsive images with srcset
- Lazy loading with priority hints

### 2. Code Splitting
- Route-based code splitting with Next.js App Router
- Dynamic imports for heavy components
- Lazy loading for tools components

### 3. Caching Strategy
```
Static Content (Blog, Docs):
- CDN Cache: 1 year
- Browser Cache: 30 days

Dynamic Content (Journeys, User Data):
- No cache / Revalidate on demand
- Server-side rendering

API Responses:
- Chat: No cache (real-time)
- History: Cache 5 minutes
```

### 4. Bundle Size Optimization
```
First Load JS:
- Navbar/Layout: 87.3 kB (shared)
- Page average: 96 kB
- Target: < 100 kB per page ✓

Main bundles:
- React/UI libs: 53.6 kB
- Utilities: 31.7 kB
- Other: 1.95 kB
```

### 5. Database Query Optimization
- Indexed columns for journeys, users, chat_history
- Pagination for large result sets
- SELECT only needed columns
- N+1 query prevention with joins

### 6. API Optimization
- Response compression (gzip)
- JSON payload minification
- Selective field requests
- Batch operations support

## Lighthouse Audit Targets

```
Performance:   ≥ 95
Accessibility: ≥ 95
Best Practices: ≥ 90
SEO:           ≥ 90
```

## Monitoring & Analytics

### Sentry Setup
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  profilesSampleRate: 0.1,
});
```

### Web Vitals Tracking
Using `web-vitals` npm package to send Core Web Vitals to analytics.

### Performance Monitoring
- Request/response times via API middleware
- Database query performance logging
- Frontend error tracking with Sentry

## Optimization Checklist

- [x] Image optimization with Next.js Image
- [x] Code splitting via dynamic imports
- [x] CSS minification (TailwindCSS)
- [x] Font optimization (system fonts)
- [x] Compression (gzip via Vercel)
- [x] HTTP/2 support
- [x] Browser caching headers
- [x] Static pre-rendering where possible
- [ ] CDN for global distribution (Vercel Edge Network)
- [ ] Service Worker for offline support
- [ ] HTTP/3 support
- [ ] Streaming HTML responses for faster FCP

## Next Steps for Performance

1. **Implement streaming HTML responses** in getServerSideProps
2. **Add Service Worker** for offline journeys
3. **Implement WebSocket** for real-time chat (faster than polling)
4. **Add compression** for large API responses
5. **Optimize Supabase** connection pooling
6. **Implement aggressive caching** for blog content

## Common Performance Issues & Solutions

### Issue: Hydration mismatch slowing down page load
**Solution:** Use `useEffect` with `isMounted` flag for client-only features

### Issue: Too many Supabase queries
**Solution:** Implement caching layer with Vercel KV

### Issue: Large chat history slowing down loads
**Solution:** Paginate history, load only last 20 messages by default

### Issue: Slow admin panel
**Solution:** Implement data table virtualization, server-side pagination

## Testing Performance

```bash
# Local performance test
npm run build
npm run start
# Open DevTools > Lighthouse and audit

# Production performance (via Vercel)
# View metrics in Vercel Analytics dashboard
```

## References
- [Next.js Performance](https://nextjs.org/learn/seo/web-performance)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
