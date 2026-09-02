import { google, calendar_v3 } from "googleapis";
import { getSetting } from "./settings";

export { encrypt, decrypt } from "./crypto";

export async function makeOAuth2Client() {
  const clientId = await getSetting("google_client_id", "GOOGLE_CLIENT_ID");
  const clientSecret = await getSetting("google_client_secret", "GOOGLE_CLIENT_SECRET");
  return new google.auth.OAuth2(clientId, clientSecret, process.env.GOOGLE_REDIRECT_URI);
}

export async function getAuthUrl(state: string): Promise<string> {
  const oauth2 = await makeOAuth2Client();
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
  const oauth2 = await makeOAuth2Client();
  const { tokens } = await oauth2.getToken(code);
  if (!tokens.refresh_token) throw new Error("No refresh token — user must re-authorise with prompt=consent");
  oauth2.setCredentials(tokens);
  const oauth2Api = google.oauth2({ version: "v2", auth: oauth2 });
  const { data } = await oauth2Api.userinfo.get();
  return { refreshToken: tokens.refresh_token, email: data.email ?? "" };
}

export async function getCalendarClient(refreshToken: string): Promise<calendar_v3.Calendar> {
  const oauth2 = await makeOAuth2Client();
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
