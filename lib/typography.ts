/* Whitespace other than U+00A0, followed by a word that may already contain
   non-breaking spaces — otherwise every pass would hit the same spot again. */
const BREAKING_SPACE = /[^\S ]+(?=(?:\S| )+$)/;

/** Replaces the last `count` spaces of a paragraph with non-breaking spaces
    (U+00A0) so the last words never stand alone on the last line.
    Complements `text-wrap: pretty`, which not every browser supports.
    No dependencies, so it is usable in client components too. */
export function bindLastWords(text: string, count = 2) {
  let result = text.trimEnd();
  for (let i = 0; i < count; i++) {
    result = result.replace(BREAKING_SPACE, " ");
  }
  return result;
}
