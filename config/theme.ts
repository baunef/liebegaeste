/**
 * Visual theme. The design uses exactly two colors: `paper` for the
 * background and `ink` for all text, lines and lettering. Values are
 * written as CSS custom properties on <html> (see app/layout.tsx), so
 * every Tailwind utility (`bg-paper`, `border-ink`, ...) follows them.
 */
export const theme = {
  colors: {
    paper: "#F3EDDE",
    ink: "#304C8E",
  },

  type: {
    /** Base text size and line height for labels and body copy. */
    baseSize: "1.25rem",
    baseLineHeight: "1.75rem",
    /** Letter spacing of the all-caps labels, in em. */
    labelTracking: 0.4,
    /** Font weights. Values between steps (e.g. 350) need a variable font. */
    labelWeight: 400,
    bodyWeight: 300,
  },
} as const;
