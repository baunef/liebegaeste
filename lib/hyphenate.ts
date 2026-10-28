import { hyphenateSync } from "hyphen/de";

import { bindLastWords } from "@/lib/typography";

/** Inserts soft hyphens (U+00AD) into German body text. Runs on the server
    at build time so justified text breaks the same way in every browser —
    `hyphens: auto` would depend on the browser's dictionary. */
export function hyphenate(text: string) {
  return hyphenateSync(text, { minWordLength: 6 });
}

/** Body text for paragraphs: hyphenation plus non-breaking last two spaces. */
export function typeset(text: string) {
  return bindLastWords(hyphenate(text));
}
