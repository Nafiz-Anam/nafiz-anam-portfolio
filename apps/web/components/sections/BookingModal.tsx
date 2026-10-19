"use client";

import { useEffect } from "react";
import { X, Calendar } from "lucide-react";
import { stopLenis, startLenis } from "@/lib/lenis";
import { BookingFlow } from "./BookingFlow";

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    // Lenis drives scroll via JS on its own wheel/touch listeners — it ignores
    // body{overflow:hidden} entirely, so the background keeps scrolling under
    // the modal unless it's explicitly paused too.
    document.body.style.overflow = "hidden";
    stopLenis();
    return () => {
      document.body.style.overflow = "";
      startLenis();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col rounded-[8px] border border-foreground/10 bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-foreground/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-accent" />
            <span className="text-sm font-bold uppercase tracking-widest">Book a Discovery Call</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-foreground/50 transition-colors hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6" data-lenis-prevent>
          <BookingFlow onDone={onClose} />
        </div>
      </div>
    </div>
  );
}
