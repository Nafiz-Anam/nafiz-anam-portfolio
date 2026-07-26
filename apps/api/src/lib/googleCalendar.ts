import { google, calendar_v3 } from "googleapis";
import crypto from "node:crypto";

const ALGO = "aes-256-gcm";
const IV_LEN = 16;
const TAG_LEN = 16;

function getEncryptionKey(): Buffer {
  const hex = process.env.ENCRYPTION_KEY ?? "";
  if (hex.length !== 64) throw new Error("ENCRYPTION_KEY must be a 32-byte hex string (64 chars)");
  return Buffer.from(hex, "hex");
}

export function encrypt(plain: string): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const encrypted = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

export function decrypt(ciphertext: string): string {
  const key = getEncryptionKey();
  const buf = Buffer.from(ciphertext, "base64");
  const iv = buf.subarray(0, IV_LEN);
  const tag = buf.subarray(IV_LEN, IV_LEN + TAG_LEN);
  const encrypted = buf.subarray(IV_LEN + TAG_LEN);
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);
  return decipher.update(encrypted) + decipher.final("utf8");
}

export function makeOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

export function getAuthUrl(state: string): string {
  const oauth2 = makeOAuth2Client();
  return oauth2.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/calendar.freebusy",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    state,
  });
}

export async function exchangeCode(code: string): Promise<{ refreshToken: string; email: string }> {
  const oauth2 = makeOAuth2Client();
  const { tokens } = await oauth2.getToken(code);
  if (!tokens.refresh_token) throw new Error("No refresh token — user must re-authorise with prompt=consent");
  oauth2.setCredentials(tokens);
  const oauth2Api = google.oauth2({ version: "v2", auth: oauth2 });
  const { data } = await oauth2Api.userinfo.get();
  return { refreshToken: tokens.refresh_token, email: data.email ?? "" };
}

export async function getCalendarClient(refreshToken: string): Promise<calendar_v3.Calendar> {
  const oauth2 = makeOAuth2Client();
  oauth2.setCredentials({ refresh_token: refreshToken });
  return google.calendar({ version: "v3", auth: oauth2 });
}

export async function getFreeBusy(
  refreshToken: string,
  timeMin: Date,
  timeMax: Date
): Promise<Array<{ start: Date; end: Date }>> {
  const cal = await getCalendarClient(refreshToken);
  const { data } = await cal.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [{ id: "primary" }],
    },
  });
  return (data.calendars?.primary?.busy ?? []).map((b) => ({
    start: new Date(b.start!),
    end: new Date(b.end!),
  }));
}

function stableEventId(bookingId: string): string {
  return bookingId.replace(/-/g, "").toLowerCase().slice(0, 64);
}

export async function createCalendarEvent(
  refreshToken: string,
  params: {
    bookingId: string;
    name: string;
    email: string;
    scheduledAt: Date;
    durationMins: number;
    timezone: string;
    ownerEmail: string;
  }
): Promise<string> {
  const cal = await getCalendarClient(refreshToken);
  const end = new Date(params.scheduledAt.getTime() + params.durationMins * 60_000);
  const { data } = await cal.events.insert({
    calendarId: "primary",
    sendUpdates: "all",
    requestBody: {
      id: stableEventId(params.bookingId),
      summary: `Discovery Call — ${params.name}`,
      description: params.email
        ? `Booked via nafizanam.com\nClient: ${params.name}\nEmail: ${params.email}`
        : `Booked via nafizanam.com\nClient: ${params.name}`,
      start: { dateTime: params.scheduledAt.toISOString(), timeZone: params.timezone },
      end: { dateTime: end.toISOString(), timeZone: params.timezone },
      attendees: [
        { email: params.ownerEmail, organizer: true },
        { email: params.email, displayName: params.name },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: 60 * 24 },
          { method: "popup", minutes: 30 },
          { method: "email", minutes: 60 * 24 },
        ],
      },
      conferenceData: undefined,
      extendedProperties: { private: { source: "nafizanam-portfolio", bookingId: params.bookingId } },
    },
  });
  return data.id ?? stableEventId(params.bookingId);
}

export async function deleteCalendarEvent(refreshToken: string, eventId: string): Promise<void> {
  const cal = await getCalendarClient(refreshToken);
  try {
    await cal.events.delete({ calendarId: "primary", eventId, sendUpdates: "all" });
  } catch (err: unknown) {
    const code = (err as { code?: number }).code;
    if (code === 404 || code === 410) return;
    throw err;
  }
}
