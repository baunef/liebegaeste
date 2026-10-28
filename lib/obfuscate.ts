const OBFUSCATION_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_/\\-#+=&$?";

/** Random characters of the same length — keeps the layout without revealing the text. */
export function obfuscate(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += OBFUSCATION_CHARS[Math.floor(Math.random() * OBFUSCATION_CHARS.length)];
  }
  return result;
}

/**
 * Obfuscates all values of a label object. Call on the server only:
 * `Math.random()` would otherwise differ during hydration.
 */
export function obfuscateAll<T extends Record<string, string>>(
  labels: T
): Record<keyof T, string> {
  return Object.fromEntries(
    Object.entries(labels).map(([key, value]) => [key, obfuscate(value.length)])
  ) as Record<keyof T, string>;
}
