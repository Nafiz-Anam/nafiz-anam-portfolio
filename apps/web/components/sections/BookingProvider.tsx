"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { BookingModal } from "./BookingModal";

const BookingContext = createContext<{ openBooking: () => void }>({ openBooking: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openBooking = useCallback(() => setOpen(true), []);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </BookingContext.Provider>
  );
}
