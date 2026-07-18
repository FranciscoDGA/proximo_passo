# Environment Variables Setup - Próximo Passo

## Local Development (.env.local)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# OpenAI
OPENAI_API_KEY=sk-...

# Sentry (Optional)
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...

# Environment
NEXT_PUBLIC_ENV=development
```

## Production (Vercel)

Set these in Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
OPENAI_API_KEY
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_SENTRY_DSN (optional)
```

## Required Variables

### Supabase
- **NEXT_PUBLIC_SUPABASE_URL:** Your Supabase project URL (public)
- **NEXT_PUBLIC_SUPABASE_ANON_KEY:** Supabase anonymous key (public, safe to expose)

*How to get:*
1. Go to Supabase project settings
2. Copy "Project URL" and "Anon Key"

### OpenAI
- **OPENAI_API_KEY:** OpenAI API key (secret, keep private)

*How to get:*
1. Go to platform.openai.com
2. Create API key in settings
3. Copy and keep secret

## Optional Variables

### Sentry (Error Monitoring)
- **NEXT_PUBLIC_SENTRY_DSN:** Sentry project DSN

*How to set up:*
1. Create Sentry account
2. Create Next.js project
3. Copy DSN from settings

## Deployment Checklist

Before deploying to production:

- [ ] Supabase credentials verified working
- [ ] OpenAI API key has credit/billing set up
- [ ] All required env vars set in Vercel
- [ ] No secrets in code or public directories
- [ ] Database migrations applied
- [ ] Email service configured (if using)
- [ ] Sentry project created (optional)

## Vercel Deployment

### Using Vercel CLI
```bash
vercel env pull  # Pull env vars locally
vercel deploy    # Deploy with env vars
```

### Using Vercel Dashboard
1. Go to project > Settings > Environment Variables
2. Add each variable
3. Redeploy to apply changes

## Common Issues

### "Supabase client initialization failed"
**Cause:** Environment variables not loaded
**Solution:** Ensure `.env.local` exists with correct values

### "OpenAI API error: Unauthorized"
**Cause:** Invalid or expired API key
**Solution:** Check API key in Vercel, regenerate if needed

### "NEXT_PUBLIC_SUPABASE_URL must be a valid HTTP URL"
**Cause:** Supabase URL not set
**Solution:** Copy full URL from Supabase settings (includes https://)

## Local Development Setup

```bash
# 1. Copy example file
cp .env.example .env.local

# 2. Update with your credentials
# Edit .env.local with your Supabase and OpenAI keys

# 3. Start development server
npm run dev

# 4. Verify env vars loaded
# Check browser console for any errors
```

## CI/CD Environment

GitHub Actions and other CI systems:

```yaml
env:
  NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
  NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_KEY }}
  OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

## Security Best Practices

1. **Never commit secrets** to Git
2. **Use .gitignore** to exclude .env.local
3. **Rotate API keys** periodically
4. **Use separate keys** for dev/staging/prod
5. **Monitor API usage** to detect abuse
6. **Use environment-specific URLs** (dev, staging, prod)

## Environment Validation

The app validates critical env vars on startup:
- If Supabase vars missing: Uses fallback (non-functional)
- If OpenAI key missing: Chat feature disabled
- Build continues even if optional vars missing

## Support

For environment setup issues:
- Check `.env.example` for required format
- Verify credentials with service providers
- Contact support if issues persist
