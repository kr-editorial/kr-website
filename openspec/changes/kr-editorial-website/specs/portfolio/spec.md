## Purpose

Showcases published works as a portfolio catalog, providing browsing, filtering, and detail views that serve as social proof without any commerce functionality.

## ADDED Requirements

### Requirement: Portfolio listing page displays all published works
The `/portfolio` page SHALL render a grid of book cards showing cover image, title, author, and optional badge (Lançamento, Novo), with no pricing or purchase options.

#### Scenario: Book cards link to detail pages
- **WHEN** a visitor clicks a book card on `/portfolio`
- **THEN** they are navigated to `/portfolio/[slug]` for that book

#### Scenario: No commerce elements
- **WHEN** a visitor views the portfolio listing
- **THEN** no prices, "Comprar" buttons, cart icons, or checkout flows are present

### Requirement: Portfolio supports client-side filtering
The portfolio listing SHALL allow filtering by format (livro, ebook) and category, with filter state reflected in URL search parameters for shareability.

#### Scenario: Filter by format
- **WHEN** a visitor selects the "ebook" format filter
- **THEN** only books with format "ebook" are displayed and the URL updates with the filter parameter

#### Scenario: Filter by category
- **WHEN** a visitor selects a category filter
- **THEN** only books matching that category are displayed

#### Scenario: Shareable filter URL
- **WHEN** a visitor shares a filtered portfolio URL
- **THEN** the recipient sees the same filtered results

### Requirement: Book detail page shows full publication info
Each `/portfolio/[slug]` page SHALL display cover image, title, author, full description, specifications (ISBN, pages, year, format), and a CTA to request a quote pre-filled with the book title.

#### Scenario: Book specifications displayed
- **WHEN** a visitor views a book detail page
- **THEN** available specs (ISBN, pages, year, format) are listed

#### Scenario: Quote CTA pre-fills book title
- **WHEN** a visitor clicks "Solicitar orçamento" on a book detail page
- **THEN** they are navigated to `/contato?livro=<slug>` with the book pre-selected in the form

### Requirement: Related books shown on detail page
A book detail page SHALL display related titles when `relatedSlugs` are defined in the book data.

#### Scenario: Related titles grid
- **WHEN** a book has related slugs defined
- **THEN** a section below the detail shows cards for those related books

### Requirement: Breadcrumb navigation on portfolio pages
Portfolio listing and detail pages SHALL display breadcrumbs (Início → Portfólio → {title}).

#### Scenario: Detail page breadcrumbs
- **WHEN** a visitor views `/portfolio/zerar-o-jogo`
- **THEN** breadcrumbs show Início / Portfólio / Zerar o Jogo with working links

### Requirement: Static generation for book pages
Book detail pages SHALL be statically generated at build time from `books.json` data.

#### Scenario: All books pre-rendered
- **WHEN** the site is built
- **THEN** a static HTML page exists for every book slug in the content data
