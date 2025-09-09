import * as React from "react";

type SubLayoutProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: number | string;
  barHeight?: number | string;
  className?: string;
};

export function SubLayout({
  header,
  footer,
  children,
  maxWidth = 480,
  barHeight = 56,
  className = "",
}: SubLayoutProps) {
  const style = {
    ["--bar-h" as any]:
      typeof barHeight === "number" ? `${barHeight}px` : barHeight,
    ["--max-w" as any]:
      typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className="min-h-dvh grid grid-rows-[var(--bar-h)_1fr_calc(var(--bar-h)+env(safe-area-inset-bottom))]"
    >
      <header className="h-[var(--bar-h)] grid items-center px-4">
        {header}
      </header>

      <main
        className={`row-start-2 px-4 pt-[clamp(4px,2vh,20px)] ${className}`}
      >
        <div className="mx-auto w-full" style={{ maxWidth: "var(--max-w)" }}>
          {children}
        </div>
      </main>

      <footer className="h-[var(--bar-h)] pb-[env(safe-area-inset-bottom)] grid items-center px-4">
        {footer}
      </footer>
    </div>
  );
}
