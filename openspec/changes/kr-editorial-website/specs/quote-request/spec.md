## Purpose

Enables visitors to request editorial service quotes through a validated, captcha-protected form that delivers submissions to the publisher via email — the site's sole dynamic feature and primary conversion path.

## ADDED Requirements

### Requirement: Contact page hosts the quote request form
The `/contato` page SHALL display a quote request form with fields for name, email, phone (optional), institution (optional), project type, message, and quantity (optional), plus contact information sidebar.

#### Scenario: Required fields enforced
- **WHEN** a visitor submits the form without name, email, project type, or message
- **THEN** validation errors are shown for each missing required field

#### Scenario: Project type selection
- **WHEN** a visitor opens the project type field
- **THEN** they can choose from: livro, ebook, artigo, TCC, dissertação, tese, outro

#### Scenario: Book pre-fill from portfolio
- **WHEN** a visitor arrives at `/contato?livro=<slug>`
- **THEN** the form pre-fills the project reference with the book title matching that slug

### Requirement: Captcha is mandatory before submission
The form SHALL integrate Cloudflare Turnstile in managed mode. The submit button SHALL remain disabled until a valid captcha token is issued.

#### Scenario: Submit disabled without captcha
- **WHEN** a visitor fills all required fields but no captcha token exists
- **THEN** the submit button is disabled

#### Scenario: Captcha token included in submission
- **WHEN** a visitor submits the form with a valid captcha token
- **THEN** the token is sent to the API as `turnstileToken`

#### Scenario: Expired token handling
- **WHEN** submission fails due to an expired captcha token
- **THEN** the widget resets and the visitor is prompted to try again

### Requirement: Honeypot bot protection
The form SHALL include a hidden honeypot field that legitimate users never fill.

#### Scenario: Honeypot traps bots
- **WHEN** a submission includes a filled honeypot field
- **THEN** the API returns a fake success response without sending email

### Requirement: API validates and delivers quote requests
The `POST /api/quote` endpoint SHALL validate the payload, verify the captcha token, rate-limit by IP, and send an email to the configured recipient.

#### Scenario: Successful quote submission
- **WHEN** a valid submission passes all checks (rate limit, validation, honeypot, captcha)
- **THEN** an email is sent to `QUOTE_TO_EMAIL` and the API returns `{ ok: true }`

#### Scenario: Captcha verification failure
- **WHEN** the Turnstile token fails server-side verification
- **THEN** the API returns HTTP 403 with message "Verificação falhou, tente novamente" and no email is sent

#### Scenario: Rate limit exceeded
- **WHEN** a single IP exceeds the rate limit
- **THEN** the API returns HTTP 429 and no email is sent

#### Scenario: Validation errors returned
- **WHEN** the payload fails zod schema validation
- **THEN** the API returns field-level error details

### Requirement: Defense-in-depth security order
The API SHALL process checks in order: IP rate limit → payload validation → honeypot → Turnstile verification. Email delivery SHALL only occur after all checks pass.

#### Scenario: Email gated on captcha
- **WHEN** any check before Turnstile verification fails
- **THEN** no email is sent and no captcha verification network call is made (except when honeypot passes but captcha fails)

### Requirement: User feedback on submission
The form SHALL show success confirmation on successful submission and error toasts on failure.

#### Scenario: Success feedback
- **WHEN** the API returns `{ ok: true }`
- **THEN** the visitor sees a success message and the form resets

#### Scenario: Error feedback
- **WHEN** the API returns an error
- **THEN** the visitor sees an error toast with a user-friendly message

### Requirement: Environment configuration
The quote flow SHALL require four environment variables: `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `TURNSTILE_SECRET_KEY`, and `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Local development SHALL use Cloudflare dummy test keys.

#### Scenario: Local development with test keys
- **WHEN** a developer runs the site locally with Turnstile test keys
- **THEN** the captcha flow works without displaying a real challenge
