# Project Context

> This file is the single source of truth for brand, stack, and conventions.
> All agents read this file first.

---

## Brand Identity

- **Product Name:** Na8am (نغم)
- **Tagline:** Your portfolio. Your zone.
- **Primary Color:** #0D1117 — nav background, headings, hero section background
- **Secondary Color:** #3A7BFF — CTAs, active nav underline, pill badges, links, skill tags
- **Accent Color:** #C8D9FF — pill borders, card borders, mist blue accents
- **Background:** #F0F5FF — hero section bg, section alternates, pill backgrounds
- **Text Primary:** #0D1117 — all headings and display text
- **Text Secondary:** #6B7280 — body copy, captions, meta text
- **Typography — Heading:** "Syne" weight 700–800, Google Fonts
- **Typography — Body:** "DM Sans" weight 300–500, Google Fonts
- **Tone of Voice:** Confident and direct — like a senior dev friend giving real talk, not marketing speak. Sentence case always. No buzzwords. No exclamation marks except hero CTA. Action verbs for CTAs.
- **Target Audience:** Developers, designers, and freelancers — anyone serious about their online presence. Students and job seekers included.
- **Market:** Global. Arabic name and RTL-awareness appreciated but UI is LTR.

### CSS Variables
```css
:root {
  --brand-primary: #3A7BFF;       /* CTAs, active states, pill dots, links */
  --brand-primary-dark: #1A5FE0;  /* CTA hover states */
  --brand-secondary: #0D1117;     /* Nav bg, hero bg, display headings */
  --brand-secondary-soft: #1C2333;/* Soft dark surfaces */
  --brand-accent: #C8D9FF;        /* Pill borders, card accents */
  --brand-background: #F0F5FF;    /* Hero bg, section alternates */
  --brand-surface: #FFFFFF;       /* Cards, nav, modals */
  --brand-surface-alt: #FAFBFF;   /* Page background */
  --brand-text-primary: #0D1117;  /* All headings */
  --brand-text-secondary: #6B7280;/* Body, captions, meta */
  --brand-border: rgba(13,17,23,0.08); /* Default card borders */
  --brand-border-mid: rgba(13,17,23,0.14); /* Emphasis borders */
  --brand-success: #22C55E;       /* Live badge, success states */
  --brand-warning: #D97706;       /* Warning states */
  --brand-error: #EF4444;         /* Error states only */
  --brand-font-heading: 'Syne', sans-serif;
  --brand-font-body: 'DM Sans', sans-serif;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-2xl: 64px;
}
```

---

## Project Overview

- **What it does:** Na8am is ZoneFolio's free-tier portfolio template. It generates a live, hosted portfolio site from user data entered in the ZoneFolio dashboard.
- **Problem it solves:** Developers, designers, and freelancers need a professional online presence without spending days building one. Na8am gets them live in minutes.
- **Key features:**
  - Hero section with name, title, CTAs, social links, and profile image card
  - About section with bio, skills grid, and work experience timeline
  - Projects section with featured project card and 3-column additional work grid
  - Contact section with email, phone, WhatsApp, and location cards
  - ZoneFolio "Made with ZoneFolio" badge (required on free tier)
  - Scroll-based section navigation with active underline indicator
- **Current stage:** MVP — fixes in progress before launch
- **GitHub repo:** zonefolio-platform (personal account)

---

## Stack

### Web (template rendered output)
- Next.js (App Router)
- React
- TailwindCSS
- TypeScript
- Google Fonts — Syne + DM Sans

### Backend
- Node.js / Express
- TypeScript
- Prisma v7 + Accelerate (ORM)
- PostgreSQL

### Services
- Auth: Unified Next.js app auth (no separate credentials)
- Storage: Vercel (*.zonefolio.app subdomains, separate Vercel account)
- Analytics: Blurred on free tier with upgrade prompt
- Notifications: Gmail + Nodemailer (App Password)
- Payments: Paddle Billing
- AI features: Gemini 2.0 Flash (AI feedback + automated email)

---

## Template Design Conventions

### Spacing & Layout
- Split layout (text left, image card right) used in hero and about sections
- Section pill badge → Syne heading → content below — consistent across all sections
- Max content width: 960px centered
- Mobile-first responsive (375px base)

### Component Rules
- All section badge pill dots: `var(--brand-primary)` #3A7BFF — no exceptions
- Pill badge style: border `rgba(58,123,255,0.3)`, background `rgba(58,123,255,0.06)`, border-radius 20px
- CTA primary: `background: var(--brand-primary)`, white text, border-radius 8px
- CTA ghost: transparent bg, `border: 1px solid var(--brand-border-mid)`, ink text
- Card border-radius: 14px for content cards, 10px for smaller elements
- No gradients — flat colors only
- No shadows except `box-shadow: 0 1px 8px rgba(13,17,23,0.06)` on nav

### Typography Rules
- Display (name/hero): Syne 800, 48–64px, letter-spacing −2px
- Section headings: Syne 700, 28–32px, letter-spacing −0.8px
- Subheadings: Syne 700, 20px, letter-spacing −0.3px
- Body: DM Sans 400, 15px, line-height 1.7
- Section labels: DM Sans 500, 10px, letter-spacing 1.5px, uppercase, color `var(--brand-primary)`
- Captions/tags: DM Sans 400, 12px, color `var(--brand-text-secondary)`
- Sentence case always — never all-caps headings

### ZoneFolio Badge (required on free tier)
- Style: dark pill — `background: #0D1117`, rounded, "Zf" icon + "Made with ZoneFolio" text
- Position: fixed, bottom 20px, right 20px
- Link: href="https://zonefolio.app"
- Never hidden, never removed on free tier

---

## Coding Conventions

### TypeScript
- Strict mode — no `any` types
- Interfaces over types for objects
- Explicit return types on functions
- Named exports preferred over default exports

### React
- Functional components only
- Custom hooks for business logic (usePortfolio, useAuth)
- Components < 200 lines — split if larger
- Props interface defined for every component

### Styling
- TailwindCSS utility classes — no inline style objects in JSX
- CSS variables / style tokens for brand colors — never hardcode hex values in components
- Mobile-first responsive (375px base)

### Backend
- Zod for input validation on all routes
- Response format: always `{ data, error }` — no exceptions
- Environment variables for all secrets — no hardcoded URLs
- Prisma for all database operations
- Error handler middleware — no unhandled promise rejections

### File Structure
```
src/
├── components/       # reusable UI components
├── app/              # Next.js App Router pages
├── hooks/            # custom hooks (usePortfolio, useAuth)
├── lib/              # utilities, helpers, constants
├── services/         # API calls and external service wrappers
└── types/            # TypeScript types and interfaces
```

### Git
- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`
- Branch naming: `feat/feature-name`, `fix/bug-description`
- One concern per commit — atomic and revertable
- PR required to merge to main

---

## Open Fixes (pre-launch)

| # | Issue | Priority |
|---|-------|----------|
| 01 | Text breaking mid-word in bio — fix `overflow-wrap: break-word` on bio container | High |
| 02 | Contact section pink/red background bleed into navbar area | High |
| 03 | "Professional Journey" pill dot is green — must be `var(--brand-primary)` #3A7BFF | High |
| 04 | ZoneFolio badge missing — add fixed bottom-right pill badge linking to zonefolio.app | High |
| 05 | Profile image card empty state too tall — reduce height, add proper empty state design | Med |
| 06 | Navbar "Portfolio" is static — must bind to user's site title or display name dynamically | Med |
| 07 | Entrance animations janky or repeat on scroll — should fire once on mount only | Low |

---

## Workflow

### Starting any new feature
1. Read this CLAUDE.md fully
2. Check existing components before creating new ones
3. Plan data flow: types → service → hook → component
4. Design (ui-designer agent) before building if it's a new screen
5. Implement → code-reviewer → reality-checker → ship

### Building a new screen or section
1. ui-designer defines layout, components, and states
2. frontend-developer builds it using the stack and conventions above
3. content-writer reviews all copy against tone of voice rules
4. brand-designer audits: pill dots blue, sentence case, no hardcoded colors, badge present
5. code-reviewer checks code quality and conventions
6. reality-checker gives GO / NEEDS WORK

### Before any commit
- [ ] No console.logs
- [ ] No hardcoded hex values — CSS variables only
- [ ] No hardcoded strings
- [ ] No unused imports
- [ ] All states handled (loading, error, empty)
- [ ] TypeScript types correct
- [ ] ZoneFolio badge present and linked (free tier)
- [ ] All pill dots are `var(--brand-primary)`

---

## Agents Available

| Agent | When to use |
|-------|-------------|
| `frontend-developer` | React/Next.js components, pages, template UI |
| `backend-developer` | Node.js APIs, Prisma schema, data endpoints |
| `ui-designer` | Layout planning, component specs, design systems |
| `brand-designer` | Brand consistency audits, CSS variables, visual identity |
| `content-writer` | UI copy, error messages, onboarding text, placeholders |
| `code-reviewer` | Code quality, security, convention review |
| `api-tester` | API validation, edge cases, data injection testing |
| `reality-checker` | GO/NEEDS WORK gate before shipping |
| `git-workflow` | Branch strategy, commit cleanup, Git problems |