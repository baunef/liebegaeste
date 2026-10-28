import { MapPin } from "lucide-react";
import type { ReactNode } from "react";

import Page, { PageBody } from "@/components/Page";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Lettering from "@/components/Lettering";
import Reveal from "@/components/Reveal";
import { site, type Block } from "@/content/site";
import { telHref } from "@/lib/contact";
import { typeset } from "@/lib/hyphenate";
import { bindLastWords } from "@/lib/typography";
import { trimTrailingTracking } from "@/lib/tracking";
import detailsWordmark from "@/public/images/details.svg";

/* A section fills at least the visible scroll area and always snaps into
   place when scrolling (`snap-mandatory`); `snap-always` keeps a fast swipe
   from skipping a section. If a section is taller than the screen, browsers
   scroll freely within it. */
function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section
      aria-label={label}
      className="flex min-h-full w-full shrink-0 snap-start snap-always flex-col items-center justify-center-safe py-6"
    >
      {children}
    </section>
  );
}

/* The first section is visible on load and fades in on a timer; later
   sections fade in when scrolled into view. */
function BlockView({
  block,
  inView,
  delay,
}: {
  block: Block;
  inView: boolean;
  delay: number;
}) {
  switch (block.type) {
    case "events":
      return (
        <div className="grid w-full gap-14">
          {block.items.map((event, i) => (
            <Reveal key={`${event.label}-${i}`} inView={inView} delay={delay + i * 0.25}>
              <p className="label">{trimTrailingTracking(event.time)}</p>
              <p className="label mt-2">{trimTrailingTracking(event.label)}</p>
              {event.mapUrl ? (
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quiet-link body-copy relative mx-auto mt-2 inline-block max-w-md"
                >
                  {/* The icon hangs to the left outside the text flow, so the
                      place name itself sits on the center axis instead of
                      shifting right by the icon's width. */}
                  <MapPin
                    size={18}
                    strokeWidth={1.5}
                    className="absolute top-1/2 right-full mr-2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                  {event.place}
                </a>
              ) : (
                <p className="body-copy mx-auto mt-2 max-w-md">{event.place}</p>
              )}
            </Reveal>
          ))}
        </div>
      );

    case "text":
      return (
        <Reveal inView={inView} delay={delay}>
          <p className="label">{trimTrailingTracking(block.label)}</p>
          <p className="body-copy text-block mt-6">{typeset(block.text)}</p>
        </Reveal>
      );

    case "contacts":
      return (
        <div>
          <Reveal inView={inView} delay={delay}>
            <p className="label">{trimTrailingTracking(block.label)}</p>
          </Reveal>
          <div className="mx-auto mt-16 grid w-fit gap-8 md:grid-cols-2 md:gap-x-16">
            {block.people.map((person, i) => (
              <Reveal key={`${person.name}-${i}`} inView={inView} delay={delay + 0.2 + i * 0.2}>
                <p className="text-base">{bindLastWords(person.name)}</p>
                {person.phone && (
                  <p className="body-copy mt-3">
                    <a href={telHref(person.phone)} className="quiet-link">
                      {person.phone}
                    </a>
                  </p>
                )}
                {person.email && (
                  <p className="body-copy mt-3">
                    <a href={`mailto:${person.email}`} className="quiet-link">
                      {person.email}
                    </a>
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      );
  }
}

export default function DetailsPage() {
  const details = site.details;

  return (
    <Page>
      <Header />
      <PageBody className="snap-y snap-mandatory">
        {details.sections.map((section, s) => {
          const first = s === 0;
          // In the first section, blocks fade in after the headline and intro.
          const offset = first ? 0.4 : 0;

          return (
            <Section key={`${section.label}-${s}`} label={section.label}>
              {first && (
                <>
                  <Reveal>
                    <h1 className="flex justify-center">
                      <span className="sr-only">{details.headline}</span>
                      <Lettering image={detailsWordmark} className="w-52" />
                    </h1>
                  </Reveal>
                  {details.intro && (
                    <Reveal delay={0.2}>
                      <p className="body-copy text-block mt-8">{typeset(details.intro)}</p>
                    </Reveal>
                  )}
                </>
              )}
              {section.blocks.map((block, b) => (
                <div key={b} className={`w-full ${first || b > 0 ? "mt-16" : ""}`}>
                  <BlockView block={block} inView={!first} delay={offset + b * 0.3} />
                </div>
              ))}
            </Section>
          );
        })}
      </PageBody>
      <Footer />
    </Page>
  );
}
