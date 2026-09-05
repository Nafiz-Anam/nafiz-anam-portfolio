const NAVY = "#0E0E1D";
const CORAL = "#E8623C";
const CREAM = "#F7F1EC";
const MUTED = "#8A8A93";
const BORDER = "#ECECEC";
const CARD_BG = "#F7F5F2";

const SANS = "Arial, Helvetica, sans-serif";
const SERIF_ITALIC = "Georgia, 'Times New Roman', serif";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";

/** Wraps body content in the branded shell (navy/coral, text logo, footer). */
export function emailShell(heading: string, bodyHtml: string): string {
  return `
<div style="background:${CARD_BG};padding:32px 16px;font-family:${SANS};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${BORDER};">
    <tr>
      <td style="background:${NAVY};padding:28px 32px;">
        <span style="font-family:${SANS};font-size:22px;font-weight:700;color:${CREAM};">Nafiz </span><span style="font-family:${SERIF_ITALIC};font-style:italic;font-size:22px;color:${CORAL};">Anam.</span>
      </td>
    </tr>
    <tr>
      <td style="padding:36px 32px 12px;">
        <h1 style="margin:0 0 20px;font-size:20px;line-height:1.3;color:${NAVY};font-family:${SANS};">${heading}</h1>
        ${bodyHtml}
      </td>
    </tr>
    <tr>
      <td style="padding:20px 32px 32px;">
        <p style="margin:0;font-size:12px;color:${MUTED};font-family:${SANS};">
          Nafiz Anam &middot; <a href="${SITE_URL}" style="color:${CORAL};text-decoration:none;">nafizanam.com</a>
        </p>
      </td>
    </tr>
  </table>
</div>`.trim();
}

/** A labelled key/value info card (e.g. booking date, duration). */
export function detailsCard(rows: Array<[string, string]>): string {
  const items = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:6px 0;font-size:13px;color:${MUTED};font-family:${SANS};white-space:nowrap;">${label}</td>
          <td style="padding:6px 0 6px 16px;font-size:14px;color:${NAVY};font-family:${SANS};font-weight:600;">${value}</td>
        </tr>`
    )
    .join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CARD_BG};border-left:3px solid ${CORAL};border-radius:6px;margin:12px 0 20px;">
      <tr>
        <td style="padding:16px 18px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${items}</table>
        </td>
      </tr>
    </table>`;
}

export function paragraph(text: string): string {
  return `<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:${NAVY};font-family:${SANS};">${text}</p>`;
}

export function ctaButton(label: string, href: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;">
      <tr>
        <td style="border-radius:6px;background:${CORAL};">
          <a href="${href}" style="display:inline-block;padding:12px 24px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;font-family:${SANS};text-transform:uppercase;letter-spacing:0.04em;">${label}</a>
        </td>
      </tr>
    </table>`;
}
