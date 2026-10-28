import Page, { PageBody } from "@/components/Page";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { obfuscateAll } from "@/lib/obfuscate";
import { safeNextPath } from "@/lib/nav";
import { trimTrailingTracking } from "@/lib/tracking";
import { bindLastWords } from "@/lib/typography";
import { site } from "@/content/site";
import { login } from "./actions";

export default async function ZugangPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; fehler?: string }>;
}) {
  const params = await searchParams;
  const next = safeNextPath(params.next);
  const failed = params.fehler === "1";

  return (
    <Page>
      <Header obscured />
      <PageBody className="justify-center-safe py-6">
        <form action={login} className="flex w-full max-w-xs flex-col items-center">
          <input type="hidden" name="next" value={next} />
          <input
            type="password"
            name="password"
            required
            autoFocus
            aria-label={site.zugang.passwordLabel}
            aria-invalid={failed || undefined}
            aria-describedby={failed ? "zugang-fehler" : undefined}
            className="w-full border-b border-current bg-transparent px-2 py-2 text-center text-base uppercase tracking-[0.3em] placeholder:text-current"
            placeholder={site.zugang.passwordLabel}
          />
          {failed && (
            <p id="zugang-fehler" role="alert" className="body-copy mt-4">
              {bindLastWords(site.zugang.error)}
            </p>
          )}
          <button
            type="submit"
            className="label quiet-link mt-8"
          >
            {trimTrailingTracking(site.zugang.submit)}
          </button>
        </form>
      </PageBody>
      <Footer inactive labels={obfuscateAll(site.footer)} />
    </Page>
  );
}
