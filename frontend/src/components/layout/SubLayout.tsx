// components/layout/SubLayout.tsx
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
    // 상/하단 공통 높이
    ["--bar-h" as any]:
      typeof barHeight === "number" ? `${barHeight}px` : barHeight,
    // 메인 컨텐츠 공통 최대폭
    ["--max-w" as any]:
      typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className="min-h-dvh grid grid-rows-[var(--bar-h)_1fr_calc(var(--bar-h)+env(safe-area-inset-bottom))]"
    >
      {/* HEADER (상단) */}
      <header className="h-[var(--bar-h)] grid items-center px-4">
        {header}
      </header>

      {/* MAIN (본문) */}
      <main
        className={`row-start-2 px-4 pt-[clamp(16px,10vh,96px)] ${className}`}
      >
        <div className="mx-auto w-full" style={{ maxWidth: "var(--max-w)" }}>
          {children}
        </div>
      </main>

      {/* FOOTER (하단) */}
      <footer className="h-[var(--bar-h)] pb-[env(safe-area-inset-bottom)] grid items-center px-4">
        {footer}
      </footer>
    </div>
  );
}
