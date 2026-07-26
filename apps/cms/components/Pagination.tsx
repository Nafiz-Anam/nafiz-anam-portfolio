"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPage: (p: number) => void;
}

export function Pagination({ page, totalPages, total, limit, onPage }: Props) {
  if (totalPages <= 1) return null;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
      <span>{from}–{to} of {total}</span>
      <div className="flex items-center gap-1">
        <button
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted/40 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft size={13} />
        </button>
        <span className="px-2 font-medium text-foreground">{page} / {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted/40 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}
