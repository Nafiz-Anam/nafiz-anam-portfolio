import Script from "next/script";
import { SERVER_API } from "@/lib/api-url";

async function getGtmContainerId(): Promise<string | undefined> {
  try {
    const res = await fetch(`${SERVER_API}/site-config`, { next: { revalidate: 300 } });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { config: Record<string, string> };
    return data.config?.gtm_container_id || undefined;
  } catch {
    return undefined;
  }
}

export async function GoogleTagManager() {
  const id = await getGtmContainerId();
  if (!id) return null;

  return (
    <>
      <Script id="gtm-init" strategy="beforeInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${id}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${id}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
