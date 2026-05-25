# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev        # start dev server
pnpm build      # production build
pnpm start      # serve production build
pnpm lint       # run ESLint
```

No test suite configured yet.

## Architecture

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · pnpm

**Routing:** File-system based via `src/app/`. Folders = URL segments, `page.tsx` = renderable route, `layout.tsx` = shared wrapper. Currently only the root route (`/`) exists.

**Rendering model:** All components are Server Components by default. Add `'use client'` only for components that need state, event handlers, or browser APIs.

**Styling:** Tailwind v4 — no `tailwind.config.js`. Configuration lives in two places:
- `src/app/globals.css` — design tokens defined with `@theme inline`, Tailwind imported via `@import "tailwindcss"`
- `postcss.config.mjs` — Tailwind registered as `@tailwindcss/postcss` plugin

**Path alias:** `@/*` maps to `src/*` (e.g. `import Foo from '@/components/Foo'`).

**Deployment:** Vercel, with three environments mapped to Git branches:
- `main` → Production
- `preprod` → Preview (pre-production testing)
- `develop` → Preview (active development)

Feature branches should be merged into `develop`, stabilized, then promoted through `preprod` → `main`.

## Educational Approach

This project is designed to promote active learning. In each answer:
- Explain the **why** behind each technical decision, not just the how
- When introducing something new (an API, a pattern, a tool), briefly explain what it is and when it is used in real-world projects
- Link the changes to concepts and best practices in professional web development

To activate full training mode with a course structure, use the command `/edu <task>`.
