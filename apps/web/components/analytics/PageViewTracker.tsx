"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function PageViewTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastUrl = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    if (lastUrl.current === url) return;
    lastUrl.current = url;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export function PageViewTracker() {
  return <PageViewTrackerInner />;
}
