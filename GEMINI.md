## Project Overview

This is a full stack web application. The current focus is on the frontend. The goal is to build a clean, maintainable, and scalable user interface that integrates with backend APIs.

Core responsibilities include building UI components, managing client side state, handling API integration, and ensuring performance and responsiveness.

**Stack:**

* **Frontend:** Next.js, TypeScript, Tailwind CSS
* **Backend:** Node.js, Express, TypeScript
* **Package manager:** npm (or pnpm — match whatever `package.json` / `pnpm-lock.yaml` is present)

---

## Coding Conventions

* **Next.js & SEO:** Because we are using Next.js, **prioritize SEO from the very beginning**. Implement proper metadata, semantic HTML, and optimized rendering strategies upfront so we do not have to make structural changes later.
* **Modularity:** Always follow modular and best coding practices. Build highly reusable, cleanly separated components and keep logic decoupled.
* Follow existing code style exactly — indentation, naming, file structure, import order.
* Prefer explicit over clever. Types must be strict — no `any`, no `@ts-ignore` without a flagged comment explaining why.
* Use the idioms already present in the codebase; don't introduce new patterns without asking.
* Keep functions small and single-purpose. RAG pipeline stages (ingest, chunk, embed, retrieve, generate) should stay clearly separated.
* Never leave `TODO` or `FIXME` unless explicitly asked.

---

## File Handling Rules — CRITICAL

* **Always search for an existing file before creating a new one.** If a file that could logically hold the code already exists, edit it — don't create a duplicate.
* **Never create unnecessary `.md` files.** Do not create `README.md`, `CHANGELOG.md`, `NOTES.md`, `SETUP.md`, or any documentation files unless explicitly asked.
* If unsure where something belongs, ask rather than creating a new file.

---

## Frontend Directory Structure — CRITICAL

All frontend files **must** be placed in their correct folder. Never create a file in a catch-all or arbitrary location when a purpose-built directory already exists. Before creating any new file, map it to the directory below and place it there.

```
Prashan/
├── actions/              # Next.js Server Actions for form mutations and server-side logic
├── assets/               # Static resources (images, icons, fonts) requiring webpack processing
├── config/               # App configuration (env variable validation, site metadata)
├── constants/            # Static data: nav routes, magic strings, dropdown options
├── hooks/                # Custom reusable React hooks (e.g., useClickOutside, useDebounce)
├── lib/                  # Utility functions (e.g., tailwind-merge wrapper utils.ts)
├── public/               # Static files served directly to browser (favicon, robots.txt)
├── services/             # API client services, fetch wrappers, external integrations
├── store/                # Global state management (e.g., Zustand or React Context)
├── types/                # Global TypeScript declarations and shared interfaces
└── app/                  # Next.js 13+ App Router (Pages & Routing)
    ├── globals.css       # Global styles and Tailwind CSS base imports
    ├── layout.tsx        # Root layout component wrapping all pages
    ├── page.tsx          # Main index/home page component
    └── components/       # Organized component hierarchy
        ├── global/       # Site-wide standalone components (e.g., Navbar, Footer)
        ├── home/         # Page-specific components for the home page (e.g., Hero section)
        ├── layouts/      # Layout wrapper components (e.g., authenticated dashboard layout)
        ├── shared/       # Cross-domain components used across multiple features/pages
        ├── theme/        # Theme-related components (e.g., ThemeToggle for Dark Mode)
        └── ui/           # Atomic, reusable base UI components (e.g., Buttons, Inputs)
```

**Placement rules:**

* New form/mutation logic → `actions/`
* New API call or external service wrapper → `services/`
* New custom hook → `hooks/`
* New shared helper / utility → `lib/`
* New constant, enum, or static list → `constants/`
* New TypeScript type or interface used across modules → `types/`
* New Zustand store or Context → `store/`
* New site-wide component (Navbar, Footer, etc.) → `app/components/global/`
* New page-specific component → `app/components/home/` (or a new page-scoped subfolder)
* New layout wrapper → `app/components/layouts/`
* New component used across multiple pages/features → `app/components/shared/`
* New theme-related component → `app/components/theme/`
* New atomic UI primitive (Button, Input, Badge, etc.) → `app/components/ui/`
* Images / icons / fonts needing processing → `assets/`
* Files served as-is (favicon, robots.txt, OG images) → `public/`

---

## Workflow Preferences

* Make the **minimal change** needed. Don't touch unrelated code.
* Before editing anything ambiguous, ask **one** clarifying question.
* After edits, give a 1–3 sentence summary of what changed and why.
* When adding or changing logic, suggest a corresponding test.
* Commits should follow conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, etc.

---

## UI & Component Rules — CRITICAL

When building or modifying any UI component:

1. **Analyse the existing UI first.** Look at surrounding components, the color palette in use, spacing scale, and typography before writing a single line.
2. **No decorative gradients.** Do not use `bg-gradient-*`, `from-*`, `to-*`, or any gradient utility unless the existing design already uses them consistently.
3. **No drop shadows for decoration.** Only use `shadow-*` where it serves a functional purpose (elevation, modals).
4. **Match the existing visual language** — if the app uses flat, neutral tones, keep it that way.
5. **Tailwind only** — no inline styles, no extra CSS files unless one already exists for the component.
6. Components should be clean, minimal, and purposeful. When in doubt, do less.

---

## Commands to Know

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Tests
npm test

# Lint / format
npm run lint
npm run format
```

---

## What NOT to Do

* Do **not** create new `.md` files (README, docs, notes, etc.) unless asked.
* Do **not** create a new file if an existing one can hold the change — search first.
* Do **not** place files in arbitrary locations — always follow the Frontend Directory Structure above.
* Do **not** modify lock files or `package.json` unless explicitly asked.
* Do **not** add new env variables without adding them to `.env.example` with a comment.
* Do **not** delete or rename files without confirmation.
* Do **not** add console.log to production code paths.
* Do **not** use `any` or `@ts-ignore` without flagging it with a reason.
* Do **not** add gradients, heavy shadows, or decorative flourishes to UI components.

---

## Tone & Response Style

* Concise. Code first, explanation second.
* 2–3 options max when presenting alternatives, with a clear recommendation.
* Flag anything risky or with side effects upfront with ⚠️.