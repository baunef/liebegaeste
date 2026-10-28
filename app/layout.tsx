import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import { sans } from "@/config/fonts";
import { theme } from "@/config/theme";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  robots: {
    index: false,
    follow: false,
  },
};

// Theme values as CSS custom properties; app/globals.css maps them to
// Tailwind tokens.
const themeVars = {
  "--paper": theme.colors.paper,
  "--ink": theme.colors.ink,
  "--base-size": theme.type.baseSize,
  "--base-line-height": theme.type.baseLineHeight,
  "--label-tracking": `${theme.type.labelTracking}em`,
  "--label-weight": theme.type.labelWeight,
  "--body-weight": theme.type.bodyWeight,
} as CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={sans.variable} style={themeVars}>
      <body>{children}</body>
    </html>
  );
}
