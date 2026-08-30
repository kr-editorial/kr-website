# KR Editorial — Site institucional

Site da KR Editorial (Edições Literárias): editoração, diagramação, revisão
textual e normalização ABNT. Construído com Next.js (App Router), Tailwind CSS
v4 e shadcn/ui, hospedado na Vercel.

## Stack

- **Next.js 16** (App Router, SSG) + TypeScript
- **Tailwind CSS v4** + **shadcn/ui** (primitivos Base UI) + **lucide-react**
- **react-hook-form + zod** — validação do formulário de orçamento
- **Cloudflare Turnstile** — captcha do formulário
- **Resend + react-email** — entrega do e-mail de orçamento

## Desenvolvimento

```bash
npm install
npm run dev
```

O conteúdo do site é estático e vive em `content/` (`books.json`,
`services.json`, `site.json`). Editar um JSON e fazer novo deploy atualiza o
site — não há CMS nem banco de dados.

As capas dos livros em `public/covers/` são placeholders gerados por
`scripts/generate-covers.mjs`; substitua pelos arquivos reais (proporção 2:3,
ex.: 600×900) mantendo o caminho referenciado em `books.json`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variável | Descrição |
| --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Site key do Cloudflare Turnstile (widget) |
| `TURNSTILE_SECRET_KEY` | Secret key do Turnstile (verificação server-side) |
| `RESEND_API_KEY` | API key do Resend |
| `QUOTE_TO_EMAIL` | E-mail que recebe as solicitações de orçamento |
| `QUOTE_FROM_EMAIL` | Remetente verificado no Resend (opcional; usa onboarding@resend.dev como fallback) |

Para desenvolvimento local, use as chaves de teste do Turnstile (documentadas
em `.env.example`). Sem `RESEND_API_KEY` em desenvolvimento, as solicitações
são registradas no console em vez de enviadas por e-mail.

## Fluxo de orçamento

`POST /api/quote` processa na ordem: rate limit por IP (5/10min) → validação
zod → honeypot (sucesso falso para bots) → verificação Turnstile → envio via
Resend. O endpoint responde `400` (validação), `403` (captcha), `429` (rate
limit), `502` (falha de e-mail) ou `{ ok: true }`.

## Deploy (Vercel)

1. Importe o repositório na Vercel com root directory `app/`.
2. Configure as variáveis de ambiente acima (produção usa chaves reais do
   Turnstile e do Resend).
3. Faça o deploy e teste o fluxo de orçamento na URL de preview.

## Estrutura

```
app/            rotas (App Router) + API
components/
  ui/           primitivos shadcn/ui
  brand/        componentes de marca (Logo, PillLabel, BookCard, ...)
  sections/     blocos de seção das páginas
  layout/       SiteHeader, SiteFooter, MobileNav, PageShell
content/        dados estáticos (livros, serviços, site)
emails/         templates react-email
lib/            tipos, loaders de conteúdo, validação zod
public/brand/   logo e ícone (variantes navy/cream)
public/covers/  capas dos livros (placeholders SVG)
```
