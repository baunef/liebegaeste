"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import Frame from "@/components/Frame";
import Lettering from "@/components/Lettering";
import { site } from "@/content/site";
import { telHref } from "@/lib/contact";
import { EASE_OUT } from "@/lib/motion";
import { bindLastWords } from "@/lib/typography";
import rsvpWordmark from "@/public/images/rsvp.svg";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function RsvpModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rsvp = site.rsvp;
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    return () => {
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  // Keep the background from scrolling while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    dialog.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[8vh] sm:p-6 sm:pt-[12vh]">
          {/* Click target for closing — keyboard users have Escape and the
              close button, so it is hidden from the accessibility tree.
              Opaque paper instead of a tinted overlay: the card sits alone
              on the background, without a third color. */}
          <motion.button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-paper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-title"
            tabIndex={-1}
            className="relative max-h-full w-full max-w-sm overflow-y-auto"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <Frame className="px-10 pb-14 pt-16 text-center">
              <button
                type="button"
                onClick={onClose}
                aria-label={rsvp.closeLabel}
                className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center text-sm leading-none focus-visible:outline-offset-[-3px]"
              >
                <span aria-hidden="true">✕</span>
              </button>
              <p id="rsvp-title" className="sr-only">
                {rsvp.label}
              </p>
              <Lettering image={rsvpWordmark} className="mx-auto w-52" />
              <p className="body-copy mx-auto mt-7 max-w-[16rem]">{bindLastWords(rsvp.text)}</p>
              <div className="mt-10 flex flex-col items-center gap-4 text-base">
                {rsvp.phone && (
                  <a href={telHref(rsvp.phone)} className="quiet-link py-1">
                    {rsvp.phone}
                  </a>
                )}
                {rsvp.email && (
                  <a href={`mailto:${rsvp.email}`} className="quiet-link py-1">
                    {rsvp.email}
                  </a>
                )}
              </div>
            </Frame>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
