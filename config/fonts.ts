/**
 * Fonts. next/font needs static imports at build time, so the font is
 * chosen here in code rather than by name in theme.ts.
 *
 * Any font from next/font/google works: swap `Archivo` for e.g. `Inter`
 * in both the import and the call. For a self-hosted file use
 * next/font/local instead:
 *
 *   import localFont from "next/font/local";
 *   export const sans = localFont({
 *     src: "./MyFont.woff2",
 *     variable: "--font-body",
 *   });
 *
 * Keep `variable: "--font-body"`; app/globals.css reads it.
 */
import { Archivo } from "next/font/google";

// Without `weight`, next/font loads the variable font file — required for
// in-between weights such as 350.
export const sans = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
});
