## Purpose

Delivers the services-first marketing experience through the Home, Serviços, and Quem Somos pages, converting visitors by explaining editorial services, audience, process, and trust signals.

## ADDED Requirements

### Requirement: Homepage presents services-first narrative
The homepage SHALL display eight sections in order: Hero, Value Props, Services Overview, Audience, Process, Portfolio Teaser, Mission Statement, and CTA Band.

#### Scenario: Hero section with primary CTA
- **WHEN** a visitor lands on `/`
- **THEN** they see a hero with the headline "Solicite um orçamento e leve seu projeto do rascunho à publicação final com qualidade editorial" and a CTA button linking to `/contato`

#### Scenario: Value propositions displayed
- **WHEN** a visitor scrolls past the hero
- **THEN** they see four value propositions: publicação profissional, aprovação acadêmica, credibilidade editorial, and texto claro, coeso e bem estruturado

#### Scenario: Services overview with link to detail page
- **WHEN** a visitor views the services overview section
- **THEN** they see a summary of editorial services and a link to `/servicos`

#### Scenario: Process section shows publication pipeline
- **WHEN** a visitor views the process section
- **THEN** they see 3–4 steps illustrating the journey from draft to publication

#### Scenario: Portfolio teaser links to full catalog
- **WHEN** a visitor views the portfolio teaser
- **THEN** they see 3–6 featured book cards and a "Ver portfólio" link to `/portfolio`

#### Scenario: CTA band on every page except Contato
- **WHEN** a visitor views any page except `/contato`
- **THEN** they see an inverted navy CTA band with a quote button and founder names

### Requirement: Serviços page details all editorial services
The `/servicos` page SHALL list all five service areas (editoração e diagramação, obras acadêmicas, normalização ABNT, revisão textual, padronização editorial) with descriptions and bullet points, followed by audience and process sections.

#### Scenario: Service detail blocks
- **WHEN** a visitor navigates to `/servicos`
- **THEN** each service is displayed as a scannable block with a pill eyebrow label, title, description, and item list

#### Scenario: Serviços page ends with quote CTA
- **WHEN** a visitor reaches the bottom of `/servicos`
- **THEN** a CTA band prompts them to request a quote

### Requirement: Quem Somos page builds trust
The `/quem-somos` page SHALL present the founders (Karine Z. Lazzaretti and Rodrigo S. Lazzaretti), the mission statement, and the editorial philosophy emphasizing author identity and academic rigor.

#### Scenario: Founders displayed
- **WHEN** a visitor navigates to `/quem-somos`
- **THEN** they see founder cards with names and optional roles

#### Scenario: Mission statement shown
- **WHEN** a visitor views the about page
- **THEN** they see the mission quote about technical excellence, respect for author identity, and academic rigor

### Requirement: Portuguese-first copy
All marketing page content SHALL be written in Brazilian Portuguese.

#### Scenario: Page language
- **WHEN** any marketing page renders
- **THEN** all visible text, labels, and CTAs are in Portuguese

### Requirement: Page metadata for SEO
Each marketing page SHALL include unique title, description, and Open Graph metadata.

#### Scenario: Home page metadata
- **WHEN** a search engine or social platform crawls `/`
- **THEN** it receives a unique page title and description for KR Editorial
