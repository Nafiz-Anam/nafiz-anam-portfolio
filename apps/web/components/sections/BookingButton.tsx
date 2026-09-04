"use client";

import { useBooking } from "./BookingProvider";
import { trackEvent } from "@/lib/analytics";

interface Props {
  className?: string;
  children: React.ReactNode;
  location: string;
  eventParams?: Record<string, unknown>;
}

export function BookingButton({ className, children, location, eventParams }: Props) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      data-cta="book-call"
      data-location={location}
      onClick={() => {
        trackEvent("cta_book_call_click", { cta_location: location, ...eventParams });
        openBooking();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
