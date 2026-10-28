export const SESSION_COOKIE = "site_auth";

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Comparison without early exit — the run time does not reveal how many
 * characters matched. Both sides are hex hashes and therefore always the
 * same length, so the length leaks nothing either.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function sessionToken(): Promise<string> {
  return sha256Hex(process.env.SHARED_PASSWORD ?? "");
}

export async function isValidPassword(input: string): Promise<boolean> {
  const pw = process.env.SHARED_PASSWORD;
  if (!pw) return false;
  return timingSafeEqual(await sha256Hex(input), await sha256Hex(pw));
}

export async function isValidSession(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false;
  return timingSafeEqual(cookieValue, await sessionToken());
}
