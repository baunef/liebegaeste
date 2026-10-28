import Page, { PageBody } from "@/components/Page";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import Wordmark from "@/components/Wordmark";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";
import { trimTrailingTracking } from "@/lib/tracking";

export default function InvitePage() {
  return (
    <Page>
      <Header />
      <PageBody className="justify-center-safe pb-12 sm:py-6 short:sm:py-2">
        <Reveal>
          <Eyebrow />
        </Reveal>
        <Reveal delay={0.4}>
          <h1 className="label mt-9 short:mt-5">{trimTrailingTracking(site.invite.title)}</h1>
        </Reveal>
        <Reveal delay={0.7} className="mt-12 short:mt-6">
          <Wordmark />
        </Reveal>
        <Reveal delay={0.9}>
          <p className="label mt-12 short:mt-6">{trimTrailingTracking(site.city)}</p>
          <p className="label mt-3">{trimTrailingTracking(site.date)}</p>
        </Reveal>
      </PageBody>
      <Footer />
    </Page>
  );
}
