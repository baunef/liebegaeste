import type { ReactNode } from "react";

/* Double hairline frame like a printed card: 1px outside, a finer line
   inside with a little gap. Ink only, no further color. */
export default function Frame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative border border-ink bg-paper ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[5px] border-[0.5px] border-ink"
      />
      {children}
    </div>
  );
}
