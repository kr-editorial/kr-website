# KR Editorial — Website Spec

Publisher website for **KR Editorial** (*Edições Literárias*).

**Founders:** Karine Z. Lazzaretti · Rodrigo S. Lazzaretti

**Reference catalog UX:** [Editora Kaleo](https://www.editorakaleo.com/) — book browsing patterns only.

**Reference brand & messaging:** `kr-logo.jpg` + `post-reference/` carousel (5 slides).

**Scope:** Mostly static site. No ecommerce. Primary conversion: **quote request** via captcha-protected API → email.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · lucide-react · Vercel

---

## Who KR Editorial Is

KR Editorial is an **editorial services publisher**, not a bookstore. They take manuscripts from draft to finished publication — printed books and e-books — with professional editing, layout, and academic normalization.

**Tagline (from brand):** *Do rascunho à publicação.*

**Mission:** Technical excellence, respect for the author's identity, and academic rigor — delivering clarity, organization, professional aesthetics, and normative compliance.

### Target audience
- Authors
- Academics
- Pastors
- Researchers
- Institutions

### Services
| Service | Details |
|---|---|
| **Editoração e diagramação** | Professional editing and page layout for print and digital |
| **Obras acadêmicas** | Scientific articles, TCC, master's and doctorate theses |
| **Normalização ABNT** | Compliance with Brazilian technical standards |
| **Revisão textual** | Spelling, grammar, and textual correction |
| **Padronização editorial** | Style revision and editorial standardization |

### Value propositions (site copy pillars)
- Publicação profissional
- Aprovação acadêmica
- Credibilidade editorial
- Texto claro, coeso e bem estruturado

### Primary CTA (hero)
> *Solicite um orçamento e leve seu projeto do rascunho à publicação final com qualidade editorial.*

---

## Design System

Derived from logo + carousel posts. The site should feel **academic, professional, and literary** — like quality stationery, not a retail shop.

### Colors

| Token | Hex | Usage |
|---|---|---|
| `navy` | `#2C2E3E` | Header, footer, pill labels, primary buttons, inverted sections |
| `navy-deep` | `#302B70` | Accent blobs, speech-bubble panels, alternate dark surfaces |
| `cream` | `#FDF6EC` | Page background, light sections |
| `cream-warm` | `#F9F5F0` | Alternate section background |
| `white` | `#FFFFFF` | Text on navy, card surfaces |
| `text` | `#2C2E3E` | Body copy on light backgrounds |

### Typography
- **Sans-serif** throughout (e.g. Inter, DM Sans, or similar clean grotesque).
- **Logo style:** bold caps for "KR EDITORIAL"; light tracked caps for "EDIÇÕES LITERÁRIAS".
- **Section labels:** navy pill with white *italic* text (e.g. *Serviço editorial completo*, *Ideal para quem busca:*).
- **Headlines:** large bold sans; mix weights within a line (regular + bold) for emphasis.
- **Founder names:** small caps, slightly letter-spaced.

### Recurring visual motifs
| Motif | Source | Web application |
|---|---|---|
| **Grid / graph-paper texture** | Slides 2, 4 | Subtle CSS background on light sections (`repeating-linear-gradient`) |
| **Navy framing bars** | Slides 2, 4 | Sticky header + substantial footer in solid navy |
| **Organic blob shapes** | Slide 1 | Decorative `border-radius` blobs bleeding off section edges (hero, CTA) |
| **Pill labels** | Slides 2–4 | Section eyebrow component for services, audience, value props |
| **Three vertical stripes** | Slide 5 | Brand accent on hero/CTA section right edge or as section divider |
| **Centered formal layout** | All slides | Institutional pages use centered, balanced single-column content |
| **Inverted navy block** | Slide 5 | Final homepage CTA band: navy bg, white text, quote button |

### Logo usage
- `kr-logo.jpg` — dark-on-cream variant for header (light pages) and footer.
- White logo variant needed for navy backgrounds (hero CTA, footer if inverted).
- Icon: open book + quill — reuse as favicon and subtle decorative element.

### Component patterns
- **Pill eyebrow** — navy rounded rect, white italic label, above section heading.
- **Value prop list** — centered or left-aligned bullets on grid-texture background.
- **Service card** — cream card with thin navy border + light shadow (slide 3 mission box).
- **Speech-bubble panel** — navy rounded panel with white bullet list (services overview).
- **CTA button** — solid navy, white text; primary site-wide action.

---

## Site Strategy

### Lead with services, support with catalog

Unlike Kaleo (shop-first), KR Editorial is **services-first**. The catalog of published works is **social proof and portfolio**, not the main conversion path.

| Priority | Purpose |
|---|---|
| 1. Quote request | Primary conversion — every page routes here |
| 2. Services & audience | Explain what they do and who they serve |
| 3. Published catalog | Showcase finished work (credibility) |
| 4. About / founders | Trust and human connection |
| 5. Blog (optional v1) | SEO and editorial content — defer if needed |

---

## Patterns We Reuse (from Kaleo)

Applied to the **catalog/portfolio section only**:

- Book cards: cover, title, optional badge (*Lançamento*), CTA → **Saiba mais** (not purchase).
- Curated homepage rails for published titles (leaner than Kaleo — one section, not five duplicate rails).
- Category/format taxonomy for portfolio filtering.
- Book detail pages: cover, synopsis, author, specs.
- Blog ↔ catalog cross-links (when blog exists).
- Breadcrumbs on catalog pages.
- Portuguese-first copy.

---

## What We Do Differently

| Kaleo (reference) | KR Editorial |
|---|---|
| Shop-first homepage | Services-first homepage; catalog as portfolio |
| **Comprar** everywhere | **Solicitar orçamento** as sole primary CTA |
| Prices, promos, kits | No pricing; quote-based engagement |
| Cart, checkout, Store | Removed entirely |
| Generic publisher footer | Founders named; services and audience highlighted |
| Wix + CMS | Next.js static data (JSON/MDX) |
| Decorative retail grids | Academic grid texture, pill labels, navy framing |
| Blog as product marketing | Blog deferred; focus on services copy first |

### Quote request (only dynamic feature)
- **Fields:** name, email, phone (optional), institution, project type (livro / ebook / artigo / TCC / dissertação / tese / outro), message, quantity (optional).
- **Pre-fill** from book detail CTA: `?livro=<slug>`.
- **Captcha:** Cloudflare Turnstile — required; see [Captcha plan](#captcha-cloudflare-turnstile).
- **API:** `POST /api/quote` → validate, verify captcha, rate-limit, email via Resend.
- **Honeypot** field as secondary bot filter. No database in v1.

### Captcha (Cloudflare Turnstile)

The quote form is the only attack surface on the site, so captcha is mandatory — the API must never send email without a verified token.

**Why Turnstile:** free at any volume, no user friction (invisible/managed mode — most users never see a challenge), privacy-friendly (no cookies/tracking, LGPD-friendly), and trivial to verify from a Vercel function.

**Client side (`QuoteForm`):**
- Render the widget via `@marsidev/react-turnstile` in **managed mode** (invisible unless Cloudflare suspects a bot).
- Widget theme: `light`, matching the cream form background.
- Submit button stays disabled until a token is issued; token is included in the POST body as `turnstileToken`.
- On submit failure due to expired token, reset the widget and prompt resubmission.

**Server side (`/api/quote`):**
- Verify the token against `https://challenges.cloudflare.com/turnstile/v0/siteverify` with `TURNSTILE_SECRET_KEY` and the client IP; cheap local checks (rate limit, zod, honeypot) run first, but the email is only sent after the token verifies.
- Tokens are single-use — verification happens exactly once per request.
- On failure, return `403` with a generic message (*Verificação falhou, tente novamente*); never send the email.

**Keys & environments:**
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (client) + `TURNSTILE_SECRET_KEY` (server), set in Vercel env.
- Local dev uses Cloudflare's dummy test keys (`1x0000...` always-pass) so the flow works without a real challenge.

**Defense in depth (checked in order, cheapest first):**
1. IP rate limit
2. Zod payload validation
3. Honeypot hidden field
4. Turnstile token verification (network call — gates the email send)

---

## Site Map

```
/                              Home
/servicos                      Editorial services (detailed)
/portfolio                     Published works catalog
/portfolio/[slug]              Book detail → CTA: Solicitar orçamento
/quem-somos                    About + founders
/contato                       Quote request form (also linked site-wide)
/blog                          (v2 — defer if needed)
/blog/[slug]
```

### Homepage sections (top → bottom)

1. **Hero** — navy or cream with blobs; headline from slide 5; primary CTA *Solicitar orçamento*; three-stripe accent.
2. **Value props** — pill *Ideal para quem busca:* + 4 bullets (slide 4) on grid texture.
3. **Services overview** — pill *Serviço editorial completo* + service list in speech-bubble panel (slide 3).
4. **Audience** — *Autores, acadêmicos, pastores, pesquisadores e instituições* (slide 2).
5. **Process** — *Do rascunho à publicação* — simple 3–4 step visual (draft → editing → layout → publication).
6. **Portfolio teaser** — curated book grid (3–6 titles) + *Ver portfólio*.
7. **Mission statement** — bordered card with slide 3 quote.
8. **CTA band** — inverted navy block (slide 5); quote button + founder names.

---

## Page Notes

### `/servicos`
Expand carousel content into scannable sections: editing, layout, ABNT normalization, academic works, e-books. Each service block uses pill eyebrow + description. Ends with quote CTA.

### `/portfolio` and `/portfolio/[slug]`
Kaleo-style catalog without commerce. Filters: format (livro, ebook), theme, author. Detail page includes specs and *Solicitar orçamento* pre-filled with title.

### `/quem-somos`
Founders (Karine & Rodrigo Lazzaretti), mission statement, editorial philosophy (author identity + academic rigor). Grid-texture background, centered layout.

### `/contato`
Full quote form. Repeats primary CTA copy. Shows email/phone if available.

---

## Libraries

Modern, lightweight choices — no heavy UI runtime.

| Concern | Library | Why |
|---|---|---|
| Framework | **Next.js 15+** (App Router) | Static generation + one API route; Vercel-native |
| Styling | **Tailwind CSS v4** | Utility-first; design tokens as CSS variables |
| Components | **shadcn/ui** | Copy-in components (no runtime dep); Tailwind-native; fully themeable to navy/cream |
| Icons | **lucide-react** | Lightweight, tree-shakeable, consistent stroke style that matches the line-art logo |
| Forms | **react-hook-form + zod** | Minimal re-renders; single zod schema shared between client and API validation |
| Captcha | **Cloudflare Turnstile** (`@marsidev/react-turnstile`) | Free, privacy-friendly, invisible mode |
| Email | **Resend** (`resend` + `react-email`) | Simple API on Vercel; JSX email template for the quote |
| Fonts | **next/font** with DM Sans (or Inter) | Self-hosted, zero layout shift |

shadcn/ui components to install: `button`, `input`, `textarea`, `select`, `label`, `card`, `badge`, `separator`, `sheet` (mobile nav), `sonner` (toasts).

---

## Component Architecture

Build order: **1) UI primitives → 2) brand components → 3) section blocks → 4) pages.** Pages contain no bespoke markup beyond composing sections; sections compose brand components and primitives.

```
src/
├── app/                    # pages (composition only)
├── components/
│   ├── ui/                 # shadcn/ui primitives (generated)
│   ├── brand/              # KR-specific reusable components
│   ├── sections/           # full-width page sections
│   └── layout/             # header, footer, shells
├── lib/                    # data access, utils, validation schemas
├── content/                # books.json, services.json, site.json
└── emails/                 # react-email quote template
```

### Layer 1 — UI primitives (`components/ui/`)

shadcn/ui, themed via CSS variables to the design system (navy primary, cream background, radius, etc.). No customization beyond the theme; treated as vendored code.

### Layer 2 — Brand components (`components/brand/`)

Pure, prop-driven, no data fetching. Each maps to a motif from the design system.

| Component | Props (essence) | Description |
|---|---|---|
| `Logo` | `variant: "dark" \| "light"`, `size` | Logo image/SVG; light variant for navy backgrounds |
| `PillLabel` | `children` | Navy rounded pill, white italic text — section eyebrow |
| `SectionHeading` | `pill?`, `title`, `subtitle?`, `align` | Pill + h2 + optional lede; standard section opener |
| `CtaButton` | `href?`, `variant: "primary" \| "inverted"`, `size` | Wraps `ui/button`; primary = navy, inverted = white on navy |
| `GridTexture` | `children`, `className` | Wrapper applying graph-paper CSS background |
| `BlobDecoration` | `position`, `color` | Absolute-positioned organic blob bleeding off section edge |
| `TripleStripe` | `orientation` | Three-stripe brand accent (vertical/horizontal) |
| `BookCard` | `book: Book` | Cover, title, author, badge, → `/portfolio/[slug]` |
| `BookCover` | `src`, `alt`, `sizes` | `next/image` with fixed 2:3 ratio + shadow |
| `ServiceCard` | `service: Service`, `icon` | Cream card, thin navy border, lucide icon, bullets |
| `ValuePropItem` | `icon`, `children` | Icon + text row for value-prop lists |
| `ProcessStep` | `index`, `title`, `description`, `icon` | Numbered step for the process section |
| `FounderCard` | `name`, `role?`, `photo?` | Founder display for about page / CTA band |
| `MissionQuote` | `children` | Bordered card with light shadow (slide 3 mission box) |
| `SpeechPanel` | `children` | Navy rounded panel, white content (services overview) |
| `Breadcrumbs` | `items: {label, href}[]` | Portfolio navigation trail |
| `SpecList` | `items: {label, value}[]` | Book detail specs (ISBN, pages, year, format) |

### Layer 3 — Section blocks (`components/sections/`)

Full-width bands composing brand components. Receive data via props (fetched in pages).

| Section | Used on | Composition |
|---|---|---|
| `HeroSection` | Home | Navy bg, `Logo` light, headline, `CtaButton`, `TripleStripe`, `BlobDecoration` |
| `ValuePropsSection` | Home | `GridTexture` + `SectionHeading` (pill *Ideal para quem busca:*) + `ValuePropItem` × 4 |
| `ServicesOverviewSection` | Home | `SectionHeading` + `SpeechPanel` with service list + link to `/servicos` |
| `ServicesDetailSection` | Serviços | `ServiceCard` list, one per service, alternating layout |
| `AudienceSection` | Home, Serviços | Pill + audience chips/icons (autores, acadêmicos, pastores, pesquisadores, instituições) |
| `ProcessSection` | Home, Serviços | `SectionHeading` (*Do rascunho à publicação*) + `ProcessStep` × 4 |
| `PortfolioTeaserSection` | Home | `SectionHeading` + `BookCard` grid (3–6) + *Ver portfólio* link |
| `PortfolioGridSection` | Portfolio | Filter bar (format/category) + `BookCard` grid |
| `BookDetailSection` | Book page | `BookCover` + title/author + description + `SpecList` + pre-filled `CtaButton` |
| `RelatedBooksSection` | Book page | `BookCard` grid from `relatedSlugs` |
| `MissionSection` | Home, Quem Somos | `MissionQuote` with slide-3 statement |
| `FoundersSection` | Quem Somos | `FounderCard` × 2 + editorial philosophy copy |
| `QuoteFormSection` | Contato | `QuoteForm` + contact info sidebar |
| `CtaBandSection` | All pages (except Contato) | Inverted navy band: headline, `CtaButton` inverted, founder names, `TripleStripe` |

### Layer 4 — Layout (`components/layout/`)

| Component | Description |
|---|---|
| `SiteHeader` | Sticky navy bar: `Logo` light, nav links (Início, Serviços, Portfólio, Quem Somos), `CtaButton` *Solicitar orçamento* |
| `MobileNav` | `ui/sheet` drawer with same links |
| `SiteFooter` | Navy footer: logo, nav, contact (email/phone/city), social icons (lucide), CNPJ line |
| `PageShell` | Optional wrapper for inner pages: breadcrumbs slot + title band |

### Interactive components (client)

| Component | Notes |
|---|---|
| `QuoteForm` | react-hook-form + zod schema; fields per quote spec; Turnstile widget; honeypot; submits to `/api/quote`; success/error states via `sonner` toast + inline confirmation |
| `PortfolioFilters` | Client-side filter state (format, category) over statically-rendered book list; URL search params for shareability |
| `MobileNav` | Sheet open/close state |

Everything else is Server Components.

---

## Pages → Composition

Each page is assembly only; no unique markup outside sections.

### `/` — Home
```
SiteHeader
HeroSection
ValuePropsSection
ServicesOverviewSection
AudienceSection
ProcessSection
PortfolioTeaserSection
MissionSection
CtaBandSection
SiteFooter
```

### `/servicos`
```
SiteHeader
PageShell (title: Serviços Editoriais)
ServicesDetailSection
AudienceSection
ProcessSection
CtaBandSection
SiteFooter
```

### `/portfolio`
```
SiteHeader
PageShell (title: Portfólio, breadcrumbs)
PortfolioGridSection (PortfolioFilters + BookCard grid)
CtaBandSection
SiteFooter
```

### `/portfolio/[slug]` — static params from `books.json`
```
SiteHeader
PageShell (breadcrumbs: Início / Portfólio / {title})
BookDetailSection
RelatedBooksSection
CtaBandSection
SiteFooter
```

### `/quem-somos`
```
SiteHeader
PageShell (title: Quem Somos)
FoundersSection
MissionSection
CtaBandSection
SiteFooter
```

### `/contato`
```
SiteHeader
PageShell (title: Solicitar Orçamento)
QuoteFormSection
SiteFooter
```

### `/api/quote` — Route Handler
1. Rate-limit by IP (in-memory or Upstash if needed).
2. Parse body with the shared zod schema (same schema as `QuoteForm`).
3. Reject if honeypot filled (return fake success to not tip off bots).
4. Verify Turnstile token server-side (see Captcha plan) — mandatory gate before email.
5. Send email via Resend using `emails/QuoteRequestEmail.tsx`.
6. Return `{ ok: true }` or field-level errors.

Env vars: `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.

---

## Build Order

1. **Setup** — Next.js + Tailwind + shadcn/ui init; theme tokens (navy/cream, radius, fonts); content JSON files with seed data.
2. **Brand components** — all of Layer 2, verified in isolation on a scratch page.
3. **Layout** — `SiteHeader`, `SiteFooter`, `MobileNav`, `PageShell`.
4. **Sections** — Layer 3, starting with those shared across pages (`CtaBandSection`, `ProcessSection`, `AudienceSection`).
5. **Pages** — Home first (exercises most sections), then Serviços, Portfólio + detail, Quem Somos.
6. **Quote flow** — `QuoteForm`, `/api/quote`, Turnstile, Resend template, `/contato`.
7. **Polish** — metadata/OG per page, favicon from logo icon, responsive pass, lint.

---

## Data Model (static)

```ts
type Book = {
  slug: string
  title: string
  author: string
  cover: string
  format: "livro" | "ebook"
  categories: string[]
  badge?: "lançamento" | "novo"
  excerpt: string
  description: string
  isbn?: string
  pages?: number
  year?: number
  featured?: boolean
  relatedSlugs?: string[]
}

type Service = {
  slug: string
  title: string
  pill: string           // eyebrow label
  description: string
  items: string[]        // bullet points
}

type SiteContent = {
  founders: { name: string; role?: string }[]
  mission: string
  heroCta: string
  valueProps: string[]
  audiences: string[]
  processSteps: { title: string; description: string }[]
}
```

---

## Assets

| File | Purpose |
|---|---|
| `kr-logo.jpg` | Primary logo (dark on cream) |
| `post-reference/1–5.jpg` | Brand reference for layout, copy, and color — not used directly on site |

---

## Non-Goals (v1)

- Ecommerce, pricing, cart, inventory
- User accounts or author portal
- Admin panel / CMS
- Blog (unless time allows)
- Search
- Multi-language
