## Why

KR Editorial needs a professional web presence to attract authors, academics, pastors, researchers, and institutions seeking editorial services — from manuscript editing to finished publication. The current project has brand assets and a detailed product spec but no implementation. A services-first static site with a quote-request funnel will convert visitors without the complexity of ecommerce.

## What Changes

- New Next.js 15+ website (App Router) deployed on Vercel
- Services-first marketing pages: Home, Serviços, Quem Somos, Contato
- Portfolio catalog (published works as social proof) with listing, filters, and book detail pages — no purchase flow
- Quote request form with Cloudflare Turnstile captcha, validated API route, and email delivery via Resend
- Layered component architecture: shadcn/ui primitives → brand components → section blocks → page composition
- Static content layer (JSON) for books, services, and site copy
- Navy/cream design system derived from `kr-logo.jpg` and `post-reference/` carousel
- Portuguese-first copy throughout

## Capabilities

### New Capabilities

- `site-foundation`: Project setup, design tokens, layout shell (header, footer, mobile nav), routing, and shared page infrastructure
- `marketing-pages`: Home, Serviços, and Quem Somos pages composing section blocks with static content
- `portfolio`: Portfolio listing with client-side filters, static book detail pages, breadcrumbs, and related titles
- `quote-request`: Contact page, quote form (react-hook-form + zod), Turnstile captcha, `/api/quote` route handler, honeypot, rate limiting, and Resend email template

### Modified Capabilities

<!-- No existing capabilities — greenfield project -->

## Impact

- **New codebase**: Full Next.js application under `src/` with no prior implementation
- **Dependencies**: Next.js, Tailwind CSS v4, shadcn/ui, lucide-react, react-hook-form, zod, @marsidev/react-turnstile, resend, react-email
- **External services**: Cloudflare Turnstile (captcha), Resend (email), Vercel (hosting)
- **Environment variables**: `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- **Assets**: `kr-logo.jpg` (logo), white logo variant needed, book cover images in `content/`
- **Out of scope (v1)**: Ecommerce, blog, CMS, user accounts, search, multi-language
