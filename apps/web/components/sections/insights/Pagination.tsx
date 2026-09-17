import Link from "next/link";

function pageHref(page: number) {
  return page <= 1 ? "/insights" : `/insights?page=${page}`;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("ellipsis");
    result.push(p);
    prev = p;
  }
  return result;
}

export function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Insights pagination" className="mt-14 flex items-center justify-center gap-1.5">
      <Link
        href={pageHref(currentPage - 1)}
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : undefined}
        className={`flex h-9 items-center gap-1 rounded-[5px] border px-3 text-xs font-bold uppercase tracking-wide transition-colors duration-150 ${
          currentPage <= 1
            ? "pointer-events-none border-panel-foreground/[0.08] text-panel-foreground/20"
            : "border-panel-foreground/15 text-panel-foreground/60 hover:border-panel-foreground/30 hover:text-panel-foreground/90"
        }`}
      >
        ← Prev
      </Link>

      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <span key={`e-${i}`} className="flex h-9 w-9 items-center justify-center text-xs text-panel-foreground/30">
              …
            </span>
          ) : (
            <Link
              key={p}
              href={pageHref(p)}
              aria-current={p === currentPage ? "page" : undefined}
              className={`flex h-9 w-9 items-center justify-center rounded-[5px] border text-xs font-bold transition-colors duration-150 ${
                p === currentPage
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-panel-foreground/[0.12] text-panel-foreground/60 hover:border-panel-foreground/30 hover:text-panel-foreground/90"
              }`}
            >
              {p}
            </Link>
          )
        )}
      </div>

      <Link
        href={pageHref(currentPage + 1)}
        aria-disabled={currentPage >= totalPages}
        tabIndex={currentPage >= totalPages ? -1 : undefined}
        className={`flex h-9 items-center gap-1 rounded-[5px] border px-3 text-xs font-bold uppercase tracking-wide transition-colors duration-150 ${
          currentPage >= totalPages
            ? "pointer-events-none border-panel-foreground/[0.08] text-panel-foreground/20"
            : "border-panel-foreground/15 text-panel-foreground/60 hover:border-panel-foreground/30 hover:text-panel-foreground/90"
        }`}
      >
        Next →
      </Link>
    </nav>
  );
}
