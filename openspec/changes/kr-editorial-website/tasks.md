## 1. Project Setup

- [x] 1.1 Scaffold Next.js 15+ project in `app/` with TypeScript, Tailwind CSS v4, and App Router; verify `npm run dev` starts without errors from `app/`
- [x] 1.2 Initialize shadcn/ui and install primitives (button, input, textarea, select, label, card, badge, separator, sheet, sonner); verify components render in a test page
- [x] 1.3 Configure design tokens (navy/cream CSS variables) in `globals.css` and shadcn theme; verify colors match spec (`#2C2E3E`, `#FDF6EC`)
- [x] 1.4 Set up DM Sans via `next/font` in root layout; verify font loads without layout shift
- [x] 1.5 Install lucide-react, react-hook-form, zod, @marsidev/react-turnstile, resend, react-email; verify all packages resolve in `package.json`
- [x] 1.6 Create `content/` directory with seed `books.json`, `services.json`, `site.json`; verify data matches types in SPEC.md
- [x] 1.7 Copy `../kr-logo.jpg` to `app/public/` and create white logo variant for navy backgrounds; verify both variants display correctly
- [x] 1.8 Create `lib/` utilities: `cn()` helper, data loaders for content JSON, TypeScript types for Book/Service/SiteContent; verify imports work

## 2. Brand Components (Layer 2)

- [x] 2.1 Implement `Logo` (dark/light variants, sizes); verify both variants render on cream and navy backgrounds
- [x] 2.2 Implement `PillLabel`, `SectionHeading`, `CtaButton` (primary/inverted); verify pill italic style and button variants
- [x] 2.3 Implement `GridTexture`, `BlobDecoration`, `TripleStripe`; verify grid pattern and blob positioning on a scratch page
- [x] 2.4 Implement `BookCover` (2:3 ratio, shadow) and `BookCard`; verify card links to `/portfolio/[slug]` with cover, title, author, badge
- [x] 2.5 Implement `ServiceCard`, `ValuePropItem`, `ProcessStep`; verify icon + text layout and numbered steps
- [x] 2.6 Implement `FounderCard`, `MissionQuote`, `SpeechPanel`; verify bordered card shadow and navy panel styling
- [x] 2.7 Implement `Breadcrumbs` and `SpecList`; verify breadcrumb links and spec key-value display
- [x] 2.8 Create `/dev/components` scratch page showcasing all brand components; verify every component renders correctly in isolation

## 3. Layout Components (Layer 4)

- [x] 3.1 Implement `SiteHeader` with sticky navy bar, logo, nav links (Início, Serviços, Portfólio, Quem Somos), and quote CTA; verify links and sticky behavior
- [x] 3.2 Implement `MobileNav` with sheet drawer containing same links + CTA; verify drawer opens/closes on mobile viewport
- [x] 3.3 Implement `SiteFooter` with logo, nav, contact info, social icons (lucide), CNPJ line; verify all footer elements present
- [x] 3.4 Implement `PageShell` with breadcrumbs slot and title band; verify breadcrumbs render on inner pages

## 4. Section Blocks (Layer 3)

- [x] 4.1 Implement `HeroSection` (navy bg, light logo, headline, CTA, TripleStripe, BlobDecoration); verify hero matches slide 5 reference
- [x] 4.2 Implement `ValuePropsSection` (GridTexture, pill *Ideal para quem busca:*, 4 ValuePropItems); verify all four value props display
- [x] 4.3 Implement `ServicesOverviewSection` (SectionHeading, SpeechPanel, link to /servicos); verify service list and navigation link
- [x] 4.4 Implement `ServicesDetailSection` (ServiceCard list, alternating layout); verify all 5 services render with pills and bullets
- [x] 4.5 Implement `AudienceSection` (pill + audience chips/icons); verify 5 audience types display
- [x] 4.6 Implement `ProcessSection` (SectionHeading *Do rascunho à publicação*, ProcessStep × 4); verify 4-step pipeline visual
- [x] 4.7 Implement `PortfolioTeaserSection` (BookCard grid 3–6, *Ver portfólio* link); verify featured books and link to /portfolio
- [x] 4.8 Implement `PortfolioGridSection` with `PortfolioFilters` (format, category, URL params); verify filtering updates grid and URL
- [x] 4.9 Implement `BookDetailSection` (BookCover, title, author, description, SpecList, pre-filled CTA); verify specs and quote link with `?livro=<slug>`
- [x] 4.10 Implement `RelatedBooksSection` (BookCard grid from relatedSlugs); verify related titles display when defined
- [x] 4.11 Implement `MissionSection` (MissionQuote); verify mission statement text renders in bordered card
- [x] 4.12 Implement `FoundersSection` (FounderCard × 2, philosophy copy); verify both founders and editorial philosophy text
- [x] 4.13 Implement `CtaBandSection` (inverted navy, headline, inverted CTA, founder names, TripleStripe); verify CTA links to /contato

## 5. Pages

- [x] 5.1 Assemble Home page (`/`) with all 8 sections + header/footer; verify section order matches spec
- [x] 5.2 Assemble Serviços page (`/servicos`) with ServicesDetail, Audience, Process, CtaBand; verify all service blocks present
- [x] 5.3 Assemble Quem Somos page (`/quem-somos`) with Founders, Mission, CtaBand; verify founder cards and mission quote
- [x] 5.4 Assemble Portfolio page (`/portfolio`) with PortfolioGridSection and filters; verify book grid and filter behavior
- [x] 5.5 Assemble Book detail page (`/portfolio/[slug]`) with `generateStaticParams`, BookDetail, RelatedBooks, CtaBand; verify static generation for all book slugs
- [x] 5.6 Add unique metadata (title, description, OG) to all pages; verify meta tags in page source

## 6. Quote Request Flow

- [x] 6.1 Create shared zod schema in `lib/validation/quote.ts` for form fields (name, email, phone, institution, projectType, message, quantity, turnstileToken, honeypot); verify schema rejects invalid payloads
- [x] 6.2 Implement `QuoteForm` client component with react-hook-form, all fields, Turnstile widget (managed/light theme), honeypot, submit disabled until token; verify form validation and captcha gating
- [x] 6.3 Implement book pre-fill from `?livro=<slug>` query param; verify navigating from book detail pre-selects the book in the form
- [x] 6.4 Create `emails/QuoteRequestEmail.tsx` react-email template; verify template renders all form fields
- [x] 6.5 Implement `POST /api/quote` Route Handler (rate limit → zod → honeypot → Turnstile verify → Resend email); verify successful submission sends email and returns `{ ok: true }`
- [x] 6.6 Implement error handling: 403 on captcha fail, 429 on rate limit, 400 on validation, fake 200 on honeypot; verify each error path
- [x] 6.7 Implement `QuoteFormSection` with form + contact info sidebar; verify success toast (sonner) and inline confirmation on submit
- [x] 6.8 Assemble Contato page (`/contato`) with QuoteFormSection; verify full quote flow end-to-end with Turnstile test keys

## 7. Polish & Launch Prep

- [x] 7.1 Add favicon from logo book+quill icon; verify favicon displays in browser tab
- [ ] 7.2 Responsive pass on all pages (mobile, tablet, desktop); verify layout at 375px, 768px, 1280px viewports
- [x] 7.3 Remove `/dev/components` scratch page; verify route returns 404
- [x] 7.4 Create `.env.example` with all required env vars documented; verify file lists RESEND_API_KEY, QUOTE_TO_EMAIL, TURNSTILE_SECRET_KEY, NEXT_PUBLIC_TURNSTILE_SITE_KEY
- [x] 7.5 Run production build (`npm run build`); verify zero build errors and all static pages generated
- [ ] 7.6 Configure Vercel project with env vars and deploy preview; verify quote flow works with real Turnstile + Resend keys on preview URL
