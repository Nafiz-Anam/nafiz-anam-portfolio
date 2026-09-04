"use client";

import { trackEvent } from "@/lib/analytics";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  event: string;
  eventParams?: Record<string, unknown>;
}

export function TrackedLink({ event, eventParams, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackEvent(event, eventParams);
        onClick?.(e);
      }}
    />
  );
}
