/**
 * Returns `value` only if it is a path on this site.
 *
 * A plain `startsWith("/")` check is not enough: `//example.com` and
 * `/\example.com` are protocol-relative URLs and would send the redirect
 * after login to a foreign domain.
 */
export function safeNextPath(value: unknown, fallback = "/"): string {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}
