import { Router } from "express";
import rateLimit from "express-rate-limit";
import { prisma } from "@portfolio/db";
import { createContactLeadSchema, updateContactLeadStatusSchema } from "@portfolio/types";
import { requireAuth } from "../middleware/requireAuth";
import { getMailTransport, getNotifyEmail } from "../lib/mail";

export const contactRouter = Router();

const submitLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { message: "Too many submissions. Try again in an hour.", code: "RATE_LIMITED" } },
});

async function sendLeadNotification(lead: {
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  category?: string | null;
  budget?: string | null;
  timeline?: string | null;
  message: string;
}) {
  const notifyEmail = await getNotifyEmail();
  const mail = await getMailTransport();
  if (!mail || !notifyEmail) {
    return;
  }
  const rows: [string, string | null | undefined][] = [
    ["Name", lead.name],
    ["Company", lead.company],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Project Type", lead.category],
    ["Budget", lead.budget],
    ["Timeline", lead.timeline],
  ];
  const present = rows.filter(([, v]) => v);

  await mail.transporter.sendMail({
    from: `"Portfolio Contact" <${mail.from}>`,
    to: notifyEmail,
    replyTo: lead.email,
    subject: `New lead: ${lead.name}${lead.category ? ` — ${lead.category}` : ""}`,
    text: [
      ...present.map(([k, v]) => `${k}: ${v}`),
      ``,
      `Message:`,
      lead.message,
    ].join("\n"),
    html: `
      ${present.map(([k, v]) => `<p><strong>${k}:</strong> ${k === "Email" ? `<a href="mailto:${v}">${v}</a>` : v}</p>`).join("\n      ")}
      <hr/>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${lead.message}</p>
    `,
  });
}

// Public: submit contact form (rate limited: 5/hour per IP)
contactRouter.post("/", submitLimit, async (req, res) => {
  const parsed = createContactLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: { message: "invalid input", details: parsed.error.flatten() } });
  }

  const lead = await prisma.contactLead.create({ data: parsed.data });

  // Fire-and-forget — don't block the response on email delivery
  sendLeadNotification(parsed.data).catch((err) =>
    console.error("[contact] email notification failed:", err)
  );

  res.status(201).json({ ok: true, id: lead.id });
});

// Admin: list leads with pagination
contactRouter.get("/", requireAuth, async (req, res) => {
  const status = req.query.status as string | undefined;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25));
  const skip = (page - 1) * limit;
  const where = status && status !== "all" ? { status } : {};
  const [leads, total] = await Promise.all([
    prisma.contactLead.findMany({ where, orderBy: { createdAt: "desc" }, skip, take: limit }),
    prisma.contactLead.count({ where }),
  ]);
  res.json({ leads, total, page, totalPages: Math.ceil(total / limit) });
});

// Admin: update status
contactRouter.patch("/:id/status", requireAuth, async (req, res) => {
  const parsed = updateContactLeadStatusSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: { message: "invalid status" } });
  }
  const lead = await prisma.contactLead.update({
    where: { id: req.params.id },
    data: { status: parsed.data.status },
  });
  res.json(lead);
});

// Admin: delete
contactRouter.delete("/:id", requireAuth, async (req, res) => {
  await prisma.contactLead.delete({ where: { id: req.params.id } });
  res.status(204).send();
});
