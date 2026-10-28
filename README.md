# liebegaeste

A quiet, typographic wedding invitation website. Two pages — the invitation
and a details page — plus an RSVP dialog and an optional shared password.
Fully static, built with Next.js, Tailwind CSS and Framer Motion, and made to
run on the Vercel free plan. The site copy is in German.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: set SHARED_PASSWORD
npm run dev
```

Open http://localhost:3000.

## Make it yours

| What | Where |
| --- | --- |
| Names, date, city, all text, RSVP contact, photo link | `content/site.ts` |
| Details page sections | `content/site.ts` → `details.sections` |
| Colors, text size, letter spacing, font weights | `config/theme.ts` |
| Font | `config/fonts.ts` |
| Monogram and page titles (lettering) | `public/images/*.svg` |
| Password | `SHARED_PASSWORD` environment variable |

### Content

Everything visitors read lives in `content/site.ts`. Values in CAPS are shown
as spaced all-caps labels.

The details page is a list of full-screen sections. Each section holds one or
more blocks:

- `events` — time, label, place and an optional map link
- `text` — a label and a justified paragraph
- `contacts` — a label and people with phone number and/or email

Add, remove or reorder sections and blocks as you like.

After the wedding, set `event.ended` to `true`: the RSVP link disappears and
the footer links to the photo album (`photos.link`).

### Colors and type

`config/theme.ts` holds the two colors — `paper` (background) and `ink`
(everything else) — plus base text size, label letter spacing and font
weights. The design deliberately uses exactly two colors.

`config/fonts.ts` picks the font. Swap the import for any Google Font from
`next/font/google`, or use a local file via `next/font/local` (example in
the file). Fonts are self-hosted at build time, so no request goes to Google
from your guests' browsers.

### Lettering

`monogram.svg`, `details.svg` and `rsvp.svg` in `public/images/` are
placeholders. Replace them with your own lettering (for example drawn by hand
or set in a script font and converted to paths in Inkscape). Keep the file
names. The SVGs are rendered as a mask in the `ink` color, so their own fill
color does not matter — any single-color SVG works.

### Password

Set `SHARED_PASSWORD` (locally in `.env.local`, in production as a Vercel
environment variable) to put the site behind a single shared password.
Without it, the site is open. Guests enter the password once; a cookie keeps
them signed in for seven days. Changing the password signs everyone out.

## Deploy

Push the repository to GitHub and import it in Vercel. Pushes to `main`
deploy to production; other branches get preview deployments.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript without building

## Structure

- `app/` — pages (`/`, `/details`, `/zugang` for the password)
- `components/` — header, footer, lettering, RSVP dialog, animations
- `config/` — theme and font
- `content/site.ts` — all copy
- `lib/` — typesetting helpers (hyphenation, non-breaking last words), auth
- `proxy.ts` — password gate (active only when `SHARED_PASSWORD` is set)

## Design notes

- Exactly two colors, no gradients or extra accents.
- Lettering only for hero words (monogram, page titles); everything else is
  a grotesk, all-caps labels with wide letter spacing.
- Sections are separated by whitespace, not lines.
- Search engines are told not to index the site.

## License

MIT
