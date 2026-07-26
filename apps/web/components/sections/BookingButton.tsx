"use client";

import { useBooking } from "./BookingProvider";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function BookingButton({ className, children }: Props) {
  const { openBooking } = useBooking();
  return (
    <button type="button" onClick={openBooking} className={className}>
      {children}
    </button>
  );
}
