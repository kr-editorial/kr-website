## Purpose

Provides the shared infrastructure, visual identity, navigation shell, and component layering that every page in the KR Editorial website builds upon.

## ADDED Requirements

### Requirement: Site uses a consistent design token system
The site SHALL apply a navy/cream color palette, sans-serif typography, and brand motifs (grid texture, pill labels, blob decorations, triple-stripe accent) consistently across all pages.

#### Scenario: Color tokens applied globally
- **WHEN** any page renders
- **THEN** backgrounds use cream (`#FDF6EC`), primary surfaces use navy (`#2C2E3E`), and text meets contrast requirements on both light and dark sections

#### Scenario: Logo displays correctly per context
- **WHEN** the header or footer renders on a navy background
- **THEN** the light (white) logo variant is shown
- **WHEN** the header or footer renders on a cream background
- **THEN** the dark logo variant is shown

### Requirement: Persistent site navigation
The site SHALL provide a sticky header with links to Início, Serviços, Portfólio, and Quem Somos, plus a primary CTA button "Solicitar orçamento" linking to `/contato`.

#### Scenario: Desktop navigation
- **WHEN** a visitor views any page on a desktop viewport
- **THEN** all navigation links and the quote CTA are visible in the header without opening a menu

#### Scenario: Mobile navigation
- **WHEN** a visitor views any page on a mobile viewport
- **THEN** navigation links are accessible via a drawer/sheet menu including the quote CTA

### Requirement: Site footer with publisher identity
The site SHALL display a footer with logo, navigation links, contact information (email, phone, city), social media links, and legal entity details.

#### Scenario: Footer contact info visible
- **WHEN** a visitor scrolls to the footer on any page
- **THEN** publisher contact details and social links are displayed

### Requirement: Layered component architecture
The codebase SHALL organize components into four layers: UI primitives, brand components, section blocks, and layout components. Pages SHALL compose sections only — no bespoke page-level markup.

#### Scenario: Page composition follows layers
- **WHEN** a developer inspects any page file
- **THEN** the page imports and composes section/layout components without inline UI markup

### Requirement: Static content data layer
The site SHALL load site-wide content (founders, mission, services, books) from static JSON files, enabling static generation without a CMS or database.

#### Scenario: Content served at build time
- **WHEN** the site is built for production
- **THEN** all page content is resolved from static JSON files at build time with no runtime database queries
