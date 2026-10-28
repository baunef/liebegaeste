// The `hyphen` package ships without types; only the German variant is
// used, at build time.
declare module "hyphen/de" {
  export function hyphenateSync(
    text: string,
    options?: { hyphenChar?: string; minWordLength?: number },
  ): string;
}
