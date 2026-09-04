import Link from "next/link";

function getPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  sorted.forEach((page, i) => {
    const prev = sorted[i - 1];
    if (i > 0 && prev !== undefined && page - prev > 1) result.push("ellipsis");
    result.push(page);
  });
  return result;
}

function pageHref(page: number) {
  return page <= 1 ? "/case-studies" : `/case-studies?page=${page}`;
}

export function CaseStudiesPagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;

  const pageList = getPageList(page, totalPages);

  return (
    <nav aria-label="Case studies pagination" className="mt-14 flex items-center justify-center gap-2">
      <Link
        href={pageHref(page - 1)}
        aria-disabled={page <= 1}
        tabIndex={page <= 1 ? -1 : undefined}
        className={`rounded-[5px] border px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${
          page <= 1
            ? "pointer-events-none border-foreground/8 text-foreground/25"
            : "border-foreground/15 text-foreground/60 hover:border-foreground/30 hover:text-foreground/90"
        }`}
      >
        Previous
      </Link>

      <div className="flex items-center gap-1">
        {pageList.map((entry, i) =>
          entry === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className="px-2 text-[13px] text-foreground/30">
              …
            </span>
          ) : (
            <Link
              key={entry}
              href={pageHref(entry)}
              aria-current={entry === page ? "page" : undefined}
              className={`flex h-9 w-9 items-center justify-center rounded-[5px] text-[13px] font-bold transition-colors ${
                entry === page
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/50 hover:bg-foreground/5 hover:text-foreground/90"
              }`}
            >
              {entry}
            </Link>
          )
        )}
      </div>

      <Link
        href={pageHref(page + 1)}
        aria-disabled={page >= totalPages}
        tabIndex={page >= totalPages ? -1 : undefined}
        className={`rounded-[5px] border px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${
          page >= totalPages
            ? "pointer-events-none border-foreground/8 text-foreground/25"
            : "border-foreground/15 text-foreground/60 hover:border-foreground/30 hover:text-foreground/90"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
