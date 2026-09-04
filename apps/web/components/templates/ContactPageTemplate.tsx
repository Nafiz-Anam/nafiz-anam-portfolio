"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Select } from "@portfolio/ui";
import { BookingButton } from "@/components/sections/BookingButton";
import { Accordion } from "@/components/Accordion";
import { api } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";

const CONTACT_EMAIL = "hi@nafizanam.com";

/* ─── Shared Reveal ─── */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
      {children}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — Hero
═══════════════════════════════════════════════════════════ */
function ContactHero() {
  return (
    <section className="px-6 pb-28 pt-24 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="max-w-[1000px]">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <SectionLabel>Get in Touch</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
            className="mb-8 font-bold leading-[1.04] tracking-tight text-foreground"
            style={{ fontSize: "clamp(38px, 6vw, 86px)" }}
          >
            Tell Me What's
            <br />
            <span className="font-serif italic text-accent">Not Working.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="mb-14 max-w-[640px] text-[18px] leading-[1.8] text-foreground/52"
          >
            Whether it's a product that can't handle growth, a system held
            together with workarounds, or a decision you don't want to get
            wrong on your own, I'd like to hear what's actually going on
            before we talk about the fix.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.16 }}
            className="flex flex-wrap gap-4"
          >
            <BookingButton location="contact_hero" className="rounded-[5px] bg-accent px-8 py-4 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90">
              Schedule a Discovery Call
            </BookingButton>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              onClick={() => trackEvent("email_click", { location: "contact_hero" })}
            >
              <Button
                variant="outline"
                className="h-auto rounded-[5px] border-foreground/20 px-8 py-4 text-xs font-bold uppercase tracking-wide hover:border-foreground/40 hover:bg-foreground/[0.03]"
              >
                Send an Email
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — Who Should Reach Out
═══════════════════════════════════════════════════════════ */
const WHO_LIST = [
  "Funded startups scaling a product past MVP",
  "Founders validating an early-stage idea who need it built right the first time",
  "Growing businesses whose manual processes or legacy systems are limiting growth",
  "Companies that need senior technical leadership without hiring a full-time CTO",
  "Agencies or teams needing an experienced partner for a complex build",
] as const;

const CAPABILITIES = [
  "SaaS Platforms",
  "AI & Automation",
  "Cloud Infrastructure",
  "DevOps",
  "Software Architecture",
  "Engineering Leadership",
  "System Integrations",
  "Product Strategy",
  "Technical Consulting",
  "Custom Software",
  "Team Scaling",
] as const;

function WhoShouldReachOut() {
  return (
    <section className="bg-texture-lines bg-surface px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-16">
          <SectionLabel>Who This Is For</SectionLabel>
          <h2
            className="mt-4 font-bold leading-[1.08] tracking-tight text-foreground"
            style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
          >
            The right fit for{" "}
            <span className="font-serif italic text-accent">serious work</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: who */}
          <Reveal className="flex flex-col gap-4">
            {WHO_LIST.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 border-b border-foreground/[0.06] pb-4 last:border-b-0"
              >
                <svg
                  className="mt-[3px] shrink-0 text-accent"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-[15px] leading-[1.75] text-foreground/68">{item}</p>
              </div>
            ))}
          </Reveal>

          {/* Right: capabilities */}
          <Reveal delay={0.1} className="flex flex-col gap-8">
            <div>
              <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/32">
                Areas of Expertise
              </p>
              <div className="flex flex-wrap gap-2.5">
                {CAPABILITIES.map((cap) => (
                  <span
                    key={cap}
                    className="rounded-[3px] border border-foreground/[0.10] bg-background px-4 py-2 text-[12px] font-medium text-foreground/70 transition-colors duration-150 hover:border-accent/30 hover:bg-accent/10 hover:text-foreground/90"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[5px] border border-accent/15 bg-accent/[0.04] p-7">
              <p className="text-[13px] leading-[1.85] text-foreground/60">
                Not sure if your project fits? Reach out anyway. If I'm not
                the right fit, I'll tell you honestly, and point you in the
                right direction.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3 — Project Inquiry Form
═══════════════════════════════════════════════════════════ */
interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  timeline: "",
  description: "",
};

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/40">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-[5px] border border-foreground/[0.10] bg-panel px-5 py-4 text-[14px] text-foreground placeholder:text-foreground/22 transition-colors duration-150 focus:border-accent/50 focus:outline-none";

const selectClass =
  "w-full appearance-none rounded-[5px] border border-foreground/[0.10] bg-panel px-5 py-4 text-[14px] text-foreground transition-colors duration-150 focus:border-accent/50 focus:outline-none";

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <svg
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M2 4l4 4 4-4" />
      </svg>
    </div>
  );
}

const PROJECT_TYPE_OPTIONS = [
  { value: "new-mvp", label: "New product / MVP build" },
  { value: "scaling", label: "Scaling an existing product" },
  { value: "legacy", label: "Fixing or modernizing legacy systems" },
  { value: "automation", label: "Automation & AI integration" },
  { value: "consulting", label: "Technical consulting / second opinion" },
  { value: "retainer", label: "Ongoing technical leadership (retainer)" },
  { value: "other", label: "Something else" },
];

const BUDGET_OPTIONS = [
  { value: "under-10k", label: "Under $10,000" },
  { value: "10-25k", label: "$10,000 – $25,000" },
  { value: "25-50k", label: "$25,000 – $50,000" },
  { value: "50-100k", label: "$50,000 – $100,000" },
  { value: "100k-plus", label: "$100,000+" },
  { value: "undecided", label: "Not sure yet" },
];

const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP / within a month" },
  { value: "1-3mo", label: "1–3 months" },
  { value: "3-6mo", label: "3–6 months" },
  { value: "flexible", label: "Flexible, still exploring" },
];

function labelFor(options: readonly { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

function ProjectInquiryForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const started = useRef(false);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackEvent("form_start", { form_name: "contact_page" });
  };

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    markStarted();
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const setField = (field: keyof FormState) => (v: string) => {
    markStarted();
    if (field === "budget") trackEvent("form_field_budget_selected", { budget_range: v });
    setForm((prev) => ({ ...prev, [field]: v }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address";
    if (!form.description.trim()) errs.description = "Tell me about your project";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      for (const [field, message] of Object.entries(errs)) {
        trackEvent("form_error", { field_name: field, error_type: message });
      }
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await api.post("/contact", {
        name: form.name.trim(),
        company: form.company.trim() || null,
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        category: form.projectType ? labelFor(PROJECT_TYPE_OPTIONS, form.projectType) : null,
        budget: form.budget ? labelFor(BUDGET_OPTIONS, form.budget) : null,
        timeline: form.timeline ? labelFor(TIMELINE_OPTIONS, form.timeline) : null,
        message: form.description.trim(),
      });
      trackEvent("form_submit_contact", {
        project_type: form.projectType || null,
        budget_range: form.budget || null,
        timeline: form.timeline || null,
      });
      setSubmitted(true);
    } catch (err) {
      const message = (err as { message?: string })?.message;
      setSubmitError(message || "Something went wrong. Please try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="bg-texture-lines bg-background px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-16">
          <SectionLabel>Project Inquiry</SectionLabel>
          <h2
            className="mt-4 font-bold leading-[1.08] tracking-tight text-foreground"
            style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
          >
            Tell me about{" "}
            <span className="font-serif italic text-accent">your project</span>
          </h2>
          <p className="mt-5 max-w-[500px] text-[15px] leading-[1.85] text-foreground/45">
            Fill in what you know. There are no wrong answers — this starts a
            conversation, not a contract.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Form */}
          <Reveal>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-start gap-6 rounded-[5px] border border-emerald-400/20 bg-emerald-400/[0.05] px-10 py-14"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: "hsl(var(--accent) / 0.12)" }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ color: "hsl(var(--accent))" }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-3 text-[22px] font-bold tracking-tight text-foreground">
                      Message received.
                    </h3>
                    <p className="text-[15px] leading-[1.8] text-foreground/55">
                      I'll review your inquiry and be in touch within one
                      business day. Check your inbox — I reply from{" "}
                      <span className="font-medium text-foreground/75">
                        {CONTACT_EMAIL}
                      </span>
                      .
                    </p>
                  </div>
                  <button
                    onClick={() => { setForm(INITIAL_FORM); setSubmitted(false); }}
                    className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent transition-opacity hover:opacity-70"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-7"
                >
                  {/* Row 1: Name + Company */}
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <FormField label="Full Name" required>
                      <div>
                        <input
                          type="text"
                          placeholder="Alex Johnson"
                          value={form.name}
                          onChange={set("name")}
                          className={`${inputClass} ${errors.name ? "border-red-400/50" : ""}`}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-[11px] text-red-500/80">{errors.name}</p>
                        )}
                      </div>
                    </FormField>
                    <FormField label="Company / Organisation">
                      <input
                        type="text"
                        placeholder="Acme Inc."
                        value={form.company}
                        onChange={set("company")}
                        className={inputClass}
                      />
                    </FormField>
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <FormField label="Email Address" required>
                      <div>
                        <input
                          type="email"
                          placeholder="alex@company.com"
                          value={form.email}
                          onChange={set("email")}
                          className={`${inputClass} ${errors.email ? "border-red-400/50" : ""}`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-[11px] text-red-500/80">{errors.email}</p>
                        )}
                      </div>
                    </FormField>
                    <FormField label="Phone (Optional)">
                      <input
                        type="tel"
                        placeholder="+1 555 000 0000"
                        value={form.phone}
                        onChange={set("phone")}
                        className={inputClass}
                      />
                    </FormField>
                  </div>

                  {/* Row 3: Project Type */}
                  <FormField label="Project Type">
                    <Select
                      value={form.projectType}
                      onChange={setField("projectType")}
                      placeholder="Select a project type…"
                      options={PROJECT_TYPE_OPTIONS}
                      buttonClassName={selectClass}
                    />
                  </FormField>

                  {/* Row 4: Budget + Timeline */}
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <FormField label="Estimated Budget (Optional)">
                      <Select
                        value={form.budget}
                        onChange={setField("budget")}
                        placeholder="Select a range…"
                        options={BUDGET_OPTIONS}
                        buttonClassName={selectClass}
                      />
                    </FormField>
                    <FormField label="Desired Timeline (Optional)">
                      <Select
                        value={form.timeline}
                        onChange={setField("timeline")}
                        placeholder="Select a timeline…"
                        options={TIMELINE_OPTIONS}
                        buttonClassName={selectClass}
                      />
                    </FormField>
                  </div>

                  {/* Project description */}
                  <FormField label="Project Description" required>
                    <div>
                      <textarea
                        rows={6}
                        placeholder="Tell me about your project, the problem you're solving, where you are now, and what success looks like."
                        value={form.description}
                        onChange={set("description")}
                        className={`${inputClass} resize-none ${errors.description ? "border-red-400/50" : ""}`}
                      />
                      {errors.description && (
                        <p className="mt-1.5 text-[11px] text-red-500/80">{errors.description}</p>
                      )}
                    </div>
                  </FormField>

                  {/* Submit */}
                  <div className="pt-2">
                    {submitError && (
                      <p className="mb-4 text-[13px] text-red-500/90">{submitError}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-[5px] bg-accent py-4 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90 disabled:opacity-60 sm:w-auto sm:px-12"
                    >
                      {submitting ? "Sending…" : "Send Inquiry"}
                    </Button>
                    <p className="mt-4 text-[11px] leading-[1.7] text-foreground/28">
                      No spam. No commitment. I'll respond within one business day.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          {/* Side panel */}
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="rounded-[5px] border border-foreground/[0.08] bg-background p-7">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                Response Time
              </p>
              <p className="text-[15px] font-semibold text-foreground/80">
                Within 1 business day
              </p>
            </div>

            <div className="rounded-[5px] border border-foreground/[0.08] bg-background p-7">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                Timezone
              </p>
              <p className="text-[15px] font-semibold text-foreground/80">
                GMT+6 · Flexible overlap
              </p>
            </div>

            <div className="rounded-[5px] border border-foreground/[0.08] bg-background p-7">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                Availability
              </p>
              <p className="text-[15px] font-semibold text-foreground/80">
                Currently taking new projects
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-foreground/40">Open to inquiries</span>
              </div>
            </div>

            <div className="rounded-[5px] border border-foreground/[0.08] bg-background p-7">
              <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                Prefer a direct line?
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => trackEvent("email_click", { location: "contact_side_panel" })}
                className="text-[13px] font-medium text-accent transition-opacity hover:opacity-75"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="rounded-[5px] border border-foreground/[0.08] bg-background p-7">
              <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                WhatsApp
              </p>
              <a
                href="https://wa.me/8801819758093"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "contact_side_panel" })}
                className="text-[13px] font-medium text-accent transition-opacity hover:opacity-75"
              >
                +880 1819-758093
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 4 — Other Ways to Connect
═══════════════════════════════════════════════════════════ */
const CONNECT_ITEMS = [
  {
    label: "Email",
    value: "hi@nafizanam.com",
    href: "mailto:hi@nafizanam.com",
    description: "Best for detailed project briefs",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kazinafizanam",
    href: "https://www.linkedin.com/in/kazinafizanam/",
    description: "Professional background and how others describe working with me",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/Nafiz-Anam",
    href: "https://github.com/Nafiz-Anam",
    description: "Technical background, for anyone who wants to look under the hood",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "Booking Calendar",
    value: "Book a 30-min call",
    href: "https://calendar.google.com/calendar/appointments",
    description: "Pick a time that works for you",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Khulna, Bangladesh",
    href: null,
    description: "Available for remote engagements worldwide",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Timezone",
    value: "GMT+6 (BST)",
    href: null,
    description: "Flexible overlap with EU & US East",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
] as const;

function ConnectCard({ icon, label, value, description }: { icon: React.ReactNode; label: string; value: string; description: string }) {
  return (
    <div className="flex h-full flex-col gap-5 rounded-[5px] border border-panel-foreground/[0.08] bg-background p-7 shadow-sm transition-all duration-200 hover:border-accent/40 hover:shadow-md">
      <div className="text-panel-foreground/40">{icon}</div>
      <div className="flex flex-col gap-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-panel-foreground/30">{label}</p>
        <p className="text-[14px] font-semibold text-panel-foreground/80">{value}</p>
        <p className="text-[12px] text-panel-foreground/40">{description}</p>
      </div>
      <div className="mt-auto">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">Open →</span>
      </div>
    </div>
  );
}

function OtherWaysToConnect() {
  return (
    <section className="bg-surface bg-texture-lines px-6 py-28 text-panel-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-16">
          <SectionLabel>Other Ways to Connect</SectionLabel>
          <h2
            className="mt-4 font-bold leading-[1.08] tracking-tight text-panel-foreground"
            style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
          >
            Reach me{" "}
            <span className="font-serif italic text-accent">directly</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONNECT_ITEMS.map((item, i) => {
            if (item.label === "Booking Calendar") {
              return (
                <Reveal key={item.label} delay={(i % 3) * 0.06}>
                  <BookingButton location="contact_connect_card" className="block h-full w-full text-left">
                    <ConnectCard icon={item.icon} label={item.label} value={item.value} description={item.description} />
                  </BookingButton>
                </Reveal>
              );
            }
            const inner = <ConnectCard icon={item.icon} label={item.label} value={item.value} description={item.description} />;
            return item.href ? (
              <Reveal key={item.label} delay={(i % 3) * 0.06}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (item.label === "Email") trackEvent("email_click", { location: "contact_connect_card" });
                  }}
                  className="block h-full"
                >
                  {inner}
                </a>
              </Reveal>
            ) : (
              <Reveal key={item.label} delay={(i % 3) * 0.06}>{inner}</Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 5 — What Happens Next
═══════════════════════════════════════════════════════════ */
const STEPS = [
  {
    number: "01",
    title: "Initial Review",
    description:
      "I review every inquiry within one business day and follow up with any questions before we talk, so we start the conversation with the right context.",
  },
  {
    number: "02",
    title: "Discovery Conversation",
    description:
      "A focused 30-45 minute conversation about what's actually going on: your goals, constraints, and what's not working.",
  },
  {
    number: "03",
    title: "Proposal & Roadmap",
    description:
      "You'll get a clear proposal: the approach I'd take, the scope, the timeline, and the investment required.",
  },
  {
    number: "04",
    title: "Engineering Partnership",
    description:
      "Once we're aligned, we start. You'll have a dedicated technical partner from day one, not a contractor waiting for instructions.",
  },
] as const;

function WhatHappensNext() {
  return (
    <section className="bg-texture-lines bg-background px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-20">
          <SectionLabel>The Process</SectionLabel>
          <h2
            className="mt-4 font-bold leading-[1.08] tracking-tight text-foreground"
            style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
          >
            What happens{" "}
            <span className="font-serif italic text-accent">next</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08}>
              <div className="relative flex flex-col gap-6 border-t-2 border-foreground/[0.08] pt-8 pr-0 lg:pr-10">
                {/* Accent top border overlay */}
                <div
                  className="absolute left-0 top-[-2px] h-[2px] w-8"
                  style={{ background: "hsl(var(--accent))" }}
                />

                <span className="font-mono text-[11px] font-bold tabular-nums text-accent/60">
                  {step.number}
                </span>

                <div className="flex flex-col gap-3">
                  <h3 className="text-[16px] font-bold leading-snug tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-[1.82] text-foreground/52">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 6 — FAQ
═══════════════════════════════════════════════════════════ */
const FAQS = [
  {
    q: "What types of projects do you work on?",
    a: "Mostly two kinds: SaaS products that need to scale past their MVP, and operating businesses whose manual processes or legacy systems have started limiting growth. If your project doesn't fit either, reach out anyway. I'll tell you honestly if I'm the right fit.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. Most of my clients are outside Bangladesh, across Australia, Europe, and the US. I work GMT+6, with flexible hours to overlap with your team.",
  },
  {
    q: "Can you join an existing development team?",
    a: "Yes. I regularly work alongside in-house teams as a technical lead or architecture partner, not just as an outside contractor. That can mean reviewing decisions, unblocking a specific problem, or taking ongoing technical ownership.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, standard practice for any project with real detail to protect. I'm happy to sign yours or provide mine.",
  },
  {
    q: "Do you provide ongoing maintenance?",
    a: "Yes, either as part of the original engagement or as an ongoing retainer once the initial build or fix is delivered. Software that's actively used needs an owner, not a one-time delivery.",
  },
  {
    q: "What is the typical project timeline?",
    a: "It depends on the problem, not a fixed package. A focused fix might take a few weeks. A full product build or system migration is usually measured in months. You'll get a real timeline in the proposal, not before.",
  },
  {
    q: "How quickly do you respond to inquiries?",
    a: "Within one business day, usually faster.",
  },
  {
    q: "Can you help with existing software?",
    a: "Yes, this is a large part of the work. Reviewing, fixing, or extending an existing system is often more valuable than starting over, and I'll tell you if a rebuild is genuinely the better call.",
  },
] as const;

function FAQ() {
  return (
    <section className="bg-texture-lines bg-surface px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-16 flex flex-col items-center text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2
            className="mt-4 font-bold leading-[1.08] tracking-tight text-foreground"
            style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
          >
            Common{" "}
            <span className="font-serif italic text-accent">questions</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto max-w-[860px]">
          <Accordion items={FAQS} variant="chevron" />
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 7 — Final CTA
═══════════════════════════════════════════════════════════ */
function ContactFinalCTA() {
  return (
    <section className="px-6 py-32 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <SectionLabel>Ready to Start?</SectionLabel>
          <h2
            className="max-w-[760px] font-bold leading-[1.04] tracking-tight text-foreground"
            style={{ fontSize: "clamp(30px, 4.5vw, 66px)" }}
          >
            Every real fix starts with{" "}
            <span className="font-serif italic text-accent">a conversation.</span>
          </h2>
          <p className="max-w-[520px] text-[16px] leading-[1.88] text-foreground/48">
            Whether you already know exactly what's wrong, or just know that
            something is, let's talk about it before we talk about the solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <BookingButton location="contact_final_cta" className="rounded-[5px] bg-accent px-10 py-4 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90">
              Book Discovery Call
            </BookingButton>
            <a href="/case-studies">
              <Button
                variant="outline"
                className="h-auto rounded-[5px] border-foreground/20 px-10 py-4 text-xs font-bold uppercase tracking-wide hover:border-foreground/40 hover:bg-foreground/[0.03]"
              >
                Explore Case Studies
              </Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export function ContactPageTemplate({ config: _config = {} }: { config?: Record<string, string> }) {
  return (
    <div className="dark bg-background text-foreground">
      {/* Hero */}
      <div className="bg-texture-lines">
        <ContactHero />
      </div>

      {/* Who should reach out */}
      <WhoShouldReachOut />

      {/* Form */}
      <ProjectInquiryForm />

      {/* Other ways to connect — dark panel */}
      <OtherWaysToConnect />

      {/* What happens next */}
      <WhatHappensNext />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <div className="bg-texture-lines">
        <ContactFinalCTA />
      </div>
    </div>
  );
}
