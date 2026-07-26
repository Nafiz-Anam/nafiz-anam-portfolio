import { Router } from "express";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import { prisma } from "@portfolio/db";
import { createContactLeadSchema, updateContactLeadStatusSchema } from "@portfolio/types";
import { requireAuth } from "../middleware/requireAuth";

export const contactRouter = Router();

const submitLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { message: "Too many submissions. Try again in an hour.", code: "RATE_LIMITED" } },
});

function buildTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

async function sendLeadNotification(lead: {
  name: string;
  email: string;
  category: string;
  budget: string;
  message: string;
}) {
  const notifyEmail = process.env.NOTIFY_EMAIL;
  const fromEmail = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  const transporter = buildTransporter();
  if (!transporter || !notifyEmail) {
    return;
  }
  await transporter.sendMail({
    from: `"Portfolio Contact" <${fromEmail}>`,
    to: notifyEmail,
    replyTo: lead.email,
    subject: `New lead: ${lead.name} — ${lead.category}`,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Category: ${lead.category}`,
      `Budget: ${lead.budget}`,
      ``,
      `Message:`,
      lead.message,
    ].join("\n"),
    html: `
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
      <p><strong>Category:</strong> ${lead.category}</p>
      <p><strong>Budget:</strong> ${lead.budget}</p>
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

// Admin: list all leads
contactRouter.get("/", requireAuth, async (req, res) => {
  const status = req.query.status as string | undefined;
  const where = status && status !== "all" ? { status } : {};
  const leads = await prisma.contactLead.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  res.json({ leads });
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
