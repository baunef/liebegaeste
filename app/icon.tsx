import { theme } from "@/config/theme";
import { site } from "@/content/site";

export const contentType = "image/svg+xml";
export const size = { width: 64, height: 64 };

export default function Icon() {
  const initials =
    site.nameA.trim().charAt(0).toUpperCase() +
    site.nameB.trim().charAt(0).toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size.width} ${size.height}">
  <rect width="${size.width}" height="${size.height}" rx="12" fill="${theme.colors.ink}"/>
  <text
    x="32"
    y="54"
    text-anchor="middle"
    font-family="ui-sans-serif, system-ui, sans-serif"
    font-size="58"
    letter-spacing="-6"
    fill="${theme.colors.paper}"
  >${initials}</text>
</svg>`;

  return new Response(svg, {
    headers: { "Content-Type": contentType },
  });
}
