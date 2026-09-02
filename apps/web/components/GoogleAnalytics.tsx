import Script from "next/script";
import { SERVER_API } from "@/lib/api-url";

async function getGaMeasurementId(): Promise<string | undefined> {
  try {
    const res = await fetch(`${SERVER_API}/api/site-config`, { next: { revalidate: 300 } });
    if (!res.ok) return undefined;
    const data = await res.json() as { config: Record<string, string> };
    return data.config?.ga_measurement_id || undefined;
  } catch {
    return undefined;
  }
}

export async function GoogleAnalytics() {
  const id = await getGaMeasurementId();
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
