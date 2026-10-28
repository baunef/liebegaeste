import type { ReactNode } from "react";

/* Page scaffold: fills the window, header and footer stay fixed, only
   `PageBody` in between scrolls. */
export default function Page({ children }: { children: ReactNode }) {
  return <div className="flex h-dvh flex-col">{children}</div>;
}

/* Scrollable content area. `justify-center-safe` centers short content
   vertically but lets long content start at the top instead of clipping
   it above the scroll area. */
export function PageBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`page-scroll flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-6 text-center sm:px-10 ${className}`}
    >
      {children}
    </main>
  );
}
