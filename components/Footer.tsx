"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { site } from "@/content/site";
import RsvpModal from "@/components/RsvpModal";
import { trimTrailingTracking } from "@/lib/tracking";

export type FooterLabels = Partial<Record<keyof typeof site.footer, string>>;

export default function Footer({
  inactive = false,
  labels,
}: {
  inactive?: boolean;
  labels?: FooterLabels;
}) {
  const pathname = usePathname();
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const onDetails = pathname === "/details";

  const label = (key: keyof typeof site.footer) =>
    trimTrailingTracking(labels?.[key] ?? site.footer[key]);

  return (
    <footer className="shrink-0 px-6 pb-8 pt-8 sm:px-10 md:px-16 short:pb-6 short:pt-6">
      <div className="label flex items-baseline justify-between">
        {inactive ? (
          <>
            {!site.event.ended && <span className="text-left">{label("rsvp")}</span>}
            <span className="text-right">{label("details")}</span>
          </>
        ) : (
          <>
            {!site.event.ended && (
              <button
                type="button"
                onClick={() => setRsvpOpen(true)}
                className="quiet-link text-left"
              >
                {label("rsvp")}
              </button>
            )}
            {site.event.ended ? (
              <a
                href={site.photos.link}
                target="_blank"
                rel="noopener noreferrer"
                className="quiet-link text-right"
              >
                {label("bilder")}
              </a>
            ) : (
              <Link
                href={onDetails ? "/" : "/details"}
                className="quiet-link text-right"
              >
                {label(onDetails ? "einladung" : "details")}
              </Link>
            )}
          </>
        )}
      </div>
      {!inactive && <RsvpModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />}
    </footer>
  );
}
