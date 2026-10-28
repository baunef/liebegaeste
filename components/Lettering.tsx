import type { StaticImageData } from "next/image";

/* Hand-lettered SVG (monogram, page titles) shown in the theme's ink color.
   The SVG is used as a CSS mask, so its own fill color does not matter:
   any single-color SVG can be dropped into public/images/ unchanged. */
export default function Lettering({
  image,
  label,
  className = "",
}: {
  image: StaticImageData;
  /** Accessible text; leave empty when the text is already given nearby. */
  label?: string;
  className?: string;
}) {
  const mask = `url(${image.src}) center / contain no-repeat`;

  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={`block bg-ink ${className}`}
      style={{
        aspectRatio: `${image.width} / ${image.height}`,
        mask,
        WebkitMask: mask,
      }}
    />
  );
}
