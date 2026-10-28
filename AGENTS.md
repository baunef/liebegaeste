# AGENTS.md

Static wedding invitation website (site copy in German). Next.js (static
generation) + TypeScript + Tailwind CSS v4 + Framer Motion, icons via Lucide,
deployed to the Vercel free plan.

## Where things live

- `content/site.ts` — all copy; keep it separate from components.
- `config/theme.ts` — colors and type values, applied as CSS custom
  properties on `<html>` in `app/layout.tsx`; Tailwind tokens in
  `app/globals.css` read them (`paper`, `ink`, `tracking-label`).
- `config/fonts.ts` — the `next/font` import (CSS variable `--font-body`).
- `public/images/*.svg` — lettering, rendered as a CSS mask via
  `components/Lettering.tsx`.

## Constraints

- Exactly two colors (`paper`, `ink`). No gradients or other accents.
- Lettering only for hero words; body labels are all-caps with wide spacing.
- No database, CMS, backend API, user accounts, uploads, analytics or SEO.
- Optional shared password via `SHARED_PASSWORD` and `proxy.ts` (Next.js 16
  name for middleware; `config.matcher` must be a static array).

## Verify

`npm run lint`, `npm run typecheck` and `npm run build`.
