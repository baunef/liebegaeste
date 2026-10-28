import { site } from "@/content/site";
import { obfuscate } from "@/lib/obfuscate";
import { trimTrailingTracking } from "@/lib/tracking";

export default function Header({ obscured = false }: { obscured?: boolean }) {
  const show = (value: string) => (obscured ? obfuscate(value.length) : value);

  // Hidden on mobile: together with eyebrow and wordmark the screen would feel crowded.
  return (
    <header className="hidden shrink-0 px-6 pb-4 pt-8 sm:block sm:pb-6 short:pb-2 short:pt-6 sm:px-10 md:px-16">
      <div className="label grid grid-cols-3 items-baseline">
        <span>{trimTrailingTracking(show(site.nameA))}</span>
        <span className="justify-self-center">{trimTrailingTracking(show(site.header.center))}</span>
        <span className="justify-self-end">{trimTrailingTracking(show(site.nameB))}</span>
      </div>
    </header>
  );
}
