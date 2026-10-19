"use client";

import { useRouter } from "next/navigation";
import { BookingFlow } from "@/components/sections/BookingFlow";

export function BookingPageClient() {
  const router = useRouter();
  return <BookingFlow onDone={() => router.push("/")} />;
}
