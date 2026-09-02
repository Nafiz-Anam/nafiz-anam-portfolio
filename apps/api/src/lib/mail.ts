import nodemailer from "nodemailer";
import { getSetting } from "./settings";

/** CMS-managed (SiteSecret), falling back to env — see getSetting(). */
export async function getMailTransport(): Promise<{ transporter: nodemailer.Transporter; from: string } | null> {
  const host = await getSetting("smtp_host", "SMTP_HOST");
  const user = await getSetting("smtp_user", "SMTP_USER");
  const pass = await getSetting("smtp_pass", "SMTP_PASS");
  if (!host || !user || !pass) return null;

  const portStr = await getSetting("smtp_port", "SMTP_PORT");
  const port = portStr ? Number(portStr) : 587;
  const from = (await getSetting("smtp_from", "SMTP_FROM")) ?? user;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return { transporter, from };
}

export async function getNotifyEmail(): Promise<string | undefined> {
  return (await getSetting("notify_email", "NOTIFY_EMAIL")) ?? "hi@nafizanam.com";
}
