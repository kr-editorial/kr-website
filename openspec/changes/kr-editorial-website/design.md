## Context

Greenfield Next.js project for KR Editorial — an editorial services publisher (not a bookstore). Brand assets exist (`kr-logo.jpg`, `post-reference/` carousel). A detailed product spec (`SPEC.md`) defines pages, components, design system, and the quote-request flow. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**
- Services-first static site with one dynamic API route (quote request)
- Layered component architecture: primitives → brand → sections → pages
- Static generation for all pages except the API route
- Navy/cream design system faithful to brand carousel references
- Captcha-protected quote form with email delivery

**Non-Goals:**
- Ecommerce, blog (v1), CMS, user accounts, search, multi-language
- Server-side rendering for portfolio filters (client-side only)
- Database or persistent storage of quote submissions

## Decisions

### 1. Next.js App Router with static generation
**Choice:** Next.js 15+ App Router, SSG for all pages, one Route Handler for `/api/quote`.
**Rationale:** Matches Vercel hosting, enables `generateStaticParams` for book pages, keeps the site fast and cheap.
**Alternative considered:** Pages Router — rejected; App Router is the current default and supports React Server Components.

### 2. Component library: shadcn/ui
**Choice:** shadcn/ui (copy-in components) for primitives: button, input, textarea, select, label, card, badge, separator, sheet, sonner.
**Rationale:** No runtime dependency, fully themeable to navy/cream via CSS variables, Tailwind-native.
**Alternative considered:** Radix Themes, Chakra — rejected; heavier runtime and less control over brand styling.

### 3. Icons: lucide-react
**Choice:** lucide-react for all icons.
**Rationale:** Tree-shakeable, consistent stroke style matching the line-art logo.
**Alternative considered:** Heroicons — similar weight; lucide has broader icon set for editorial context.

### 4. Static content via JSON files
**Choice:** `content/books.json`, `content/services.json`, `content/site.json` loaded at build time.
**Rationale:** No CMS needed for v1; simple to edit; works with SSG.
**Alternative considered:** MDX, Sanity CMS — deferred; JSON is sufficient for initial catalog size.

### 5. Form stack: react-hook-form + shared zod schema
**Choice:** Single zod schema in `lib/validation/quote.ts` shared between `QuoteForm` (client) and `/api/quote` (server).
**Rationale:** One source of truth for validation rules; minimal re-renders.
**Alternative considered:** Server Actions — rejected for quote flow; explicit API route gives clearer captcha/rate-limit control.

### 6. Captcha: Cloudflare Turnstile (managed mode)
**Choice:** `@marsidev/react-turnstile` on client; server verification against Cloudflare `siteverify` endpoint.
**Rationale:** Free, privacy-friendly (LGPD), invisible for most users, trivial Vercel integration.
**Alternative considered:** reCAPTCHA — rejected; Google tracking concerns; hCaptcha — viable but Turnstile is lighter.

### 7. Email: Resend + react-email
**Choice:** Resend API with a JSX email template in `emails/QuoteRequestEmail.tsx`.
**Rationale:** Simple Vercel integration, JSX templates are maintainable.
**Alternative considered:** Postmark, SendGrid — all viable; Resend has best DX for Next.js.

### 8. Rate limiting: in-memory (v1)
**Choice:** Simple in-memory IP rate limit in the Route Handler.
**Rationale:** Sufficient for low-traffic publisher site; no external dependency.
**Alternative considered:** Upstash Redis — upgrade path if traffic grows.

### 9. Build order: components before pages
**Choice:** Layer 2 brand components → Layer 4 layout → Layer 3 sections → pages → quote flow → polish.
**Rationale:** Ensures reusable components are verified in isolation before page assembly.
**Scratch page:** Temporary `/dev/components` route to preview brand components during development (removed before launch).

### 10. Font: DM Sans via next/font
**Choice:** DM Sans as primary font; fallback to system sans-serif.
**Rationale:** Clean grotesque matching brand carousel typography; self-hosted via `next/font`.

## Component Architecture

```
src/
├── app/                    # pages (composition only)
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── brand/              # 17 brand components (Logo, PillLabel, BookCard, etc.)
│   ├── sections/           # 14 section blocks (HeroSection, CtaBandSection, etc.)
│   └── layout/             # SiteHeader, SiteFooter, MobileNav, PageShell
├── lib/                    # utils, data loaders, quote zod schema
├── content/                # books.json, services.json, site.json
└── emails/                 # QuoteRequestEmail.tsx
```

**Client components (3 only):** `QuoteForm`, `PortfolioFilters`, `MobileNav`. Everything else is Server Components.

## Design Tokens (CSS Variables)

```css
--color-navy: #2C2E3E;
--color-navy-deep: #302B70;
--color-cream: #FDF6EC;
--color-cream-warm: #F9F5F0;
--color-white: #FFFFFF;
```

Mapped to shadcn/ui theme: `--primary` → navy, `--background` → cream.

## API Route Flow (`/api/quote`)

```
Request → Rate limit (IP) → Zod validate → Honeypot check → Turnstile verify → Resend email → { ok: true }
                ↓ fail          ↓ fail         ↓ fake ok        ↓ 403              ↓ 500
              429            400           200 (silent)     no email           error toast
```

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| In-memory rate limit resets on cold start (Vercel serverless) | Acceptable for v1; upgrade to Upstash if abused |
| No quote submission persistence | Email is the record; add logging/DB later if needed |
| White logo variant not yet created | Extract from `kr-logo.jpg` or create SVG variant during setup |
| Book cover images not yet available | Seed data with placeholder covers; swap when assets arrive |
| Turnstile test keys in dev may mask integration issues | Test with real keys in staging before launch |

## Migration Plan

Greenfield — no migration. Deployment steps:
1. Scaffold Next.js project locally
2. Build and verify all pages
3. Configure Vercel project with env vars
4. Deploy preview → verify quote flow end-to-end with real Turnstile + Resend keys
5. Promote to production

## Open Questions

- Exact contact details (email, phone, CNPJ) for footer — use placeholders until client provides
- Book catalog seed data — how many titles for launch?
- Social media URLs for footer icons
