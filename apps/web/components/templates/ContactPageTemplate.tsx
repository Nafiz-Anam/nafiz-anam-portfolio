"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Select } from "@portfolio/ui";
import { BookingButton } from "@/components/sections/BookingButton";

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
            Let's Build Something{" "}
            <span className="font-serif italic text-accent">Exceptional.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="mb-14 max-w-[640px] text-[18px] leading-[1.8] text-foreground/52"
          >
            Whether you're building a new product, modernizing existing software,
            scaling your engineering team, or looking for a trusted technical
            partner — I'd love to hear about your project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.16 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#inquiry">
              <Button className="rounded-[5px] bg-accent px-8 py-4 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90">
                Schedule a Discovery Call
              </Button>
            </a>
            <a href="mailto:hello@nafizanam.com">
              <Button
                variant="outline"
                className="rounded-[5px] border-foreground/20 px-8 py-4 text-xs font-bold uppercase tracking-wide hover:border-foreground/40 hover:bg-foreground/[0.03]"
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
  "Founders validating an MVP or early-stage product",
  "Startups building custom software from scratch",
  "Businesses modernizing legacy systems",
  "Agencies needing senior technical leadership",
  "Companies scaling engineering teams",
  "Organisations pursuing digital transformation",
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
  "Digital Transformation",
  "Technical Consulting",
  "Custom Software",
  "Team Scaling",
] as const;

function WhoShouldReachOut() {
  return (
    <section className="bg-background px-6 py-28 lg:px-16">
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
                    className="rounded-[3px] border border-foreground/[0.10] bg-foreground/[0.03] px-4 py-2 text-[12px] font-medium text-foreground/60 transition-colors duration-150 hover:border-accent/30 hover:bg-accent/[0.05] hover:text-foreground/80"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[5px] border border-accent/15 bg-accent/[0.04] p-7">
              <p className="text-[13px] leading-[1.85] text-foreground/60">
                Not sure if your project fits? Reach out anyway. If I'm not
                the right fit, I'll tell you honestly — and point you in the
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
  contactMethod: string;
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
  contactMethod: "",
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
  "w-full rounded-[5px] border border-foreground/[0.10] bg-foreground/[0.02] px-5 py-4 text-[14px] text-foreground placeholder:text-foreground/22 transition-colors duration-150 focus:border-accent/50 focus:bg-foreground/[0.03] focus:outline-none";

const selectClass =
  "w-full appearance-none rounded-[5px] border border-foreground/[0.10] bg-foreground/[0.02] px-5 py-4 text-[14px] text-foreground transition-colors duration-150 focus:border-accent/50 focus:bg-foreground/[0.03] focus:outline-none";

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

function ProjectInquiryForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const setField = (field: keyof FormState) => (v: string) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="inquiry" className="bg-background px-6 py-28 lg:px-16">
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
                        hello@nafizanam.com
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
                      options={[
                        { value: "custom-software", label: "Custom Software Development" },
                        { value: "saas", label: "SaaS Platform" },
                        { value: "ai-automation", label: "AI & Automation" },
                        { value: "cloud-devops", label: "Cloud Infrastructure & DevOps" },
                        { value: "consulting", label: "Technical Consulting & Architecture" },
                        { value: "team-scaling", label: "Engineering Leadership & Team Scaling" },
                        { value: "integration", label: "System Integration" },
                        { value: "other", label: "Other" },
                      ]}
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
                        options={[
                          { value: "under-10k", label: "Under $10,000" },
                          { value: "10-25k", label: "$10,000 – $25,000" },
                          { value: "25-50k", label: "$25,000 – $50,000" },
                          { value: "50-100k", label: "$50,000 – $100,000" },
                          { value: "100k-plus", label: "$100,000+" },
                          { value: "undecided", label: "Not sure yet" },
                        ]}
                        buttonClassName={selectClass}
                      />
                    </FormField>
                    <FormField label="Desired Timeline (Optional)">
                      <Select
                        value={form.timeline}
                        onChange={setField("timeline")}
                        placeholder="Select a timeline…"
                        options={[
                          { value: "asap", label: "As soon as possible" },
                          { value: "1-3mo", label: "1 – 3 months" },
                          { value: "3-6mo", label: "3 – 6 months" },
                          { value: "6mo-plus", label: "6+ months" },
                          { value: "flexible", label: "Flexible" },
                        ]}
                        buttonClassName={selectClass}
                      />
                    </FormField>
                  </div>

                  {/* Project description */}
                  <FormField label="Project Description" required>
                    <div>
                      <textarea
                        rows={6}
                        placeholder="Tell me about your project — the problem you're solving, where you are now, and what success looks like…"
                        value={form.description}
                        onChange={set("description")}
                        className={`${inputClass} resize-none ${errors.description ? "border-red-400/50" : ""}`}
                      />
                      {errors.description && (
                        <p className="mt-1.5 text-[11px] text-red-500/80">{errors.description}</p>
                      )}
                    </div>
                  </FormField>

                  {/* Preferred contact method */}
                  <FormField label="Preferred Contact Method">
                    <Select
                      value={form.contactMethod}
                      onChange={setField("contactMethod")}
                      placeholder="Select a preference…"
                      options={[
                        { value: "email", label: "Email" },
                        { value: "video", label: "Video Call" },
                        { value: "phone", label: "Phone" },
                      ]}
                      buttonClassName={selectClass}
                    />
                  </FormField>

                  {/* Submit */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full rounded-[5px] bg-accent py-4 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90 sm:w-auto sm:px-12"
                    >
                      Send Inquiry
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
            <div className="rounded-[5px] border border-foreground/[0.08] bg-foreground/[0.02] p-7">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                Response Time
              </p>
              <p className="text-[15px] font-semibold text-foreground/80">
                Within 1 business day
              </p>
            </div>

            <div className="rounded-[5px] border border-foreground/[0.08] bg-foreground/[0.02] p-7">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                Timezone
              </p>
              <p className="text-[15px] font-semibold text-foreground/80">
                GMT+6 · Flexible overlap
              </p>
            </div>

            <div className="rounded-[5px] border border-foreground/[0.08] bg-foreground/[0.02] p-7">
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

            <div className="rounded-[5px] border border-foreground/[0.08] bg-foreground/[0.02] p-7">
              <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground/32">
                Prefer a direct line?
              </p>
              <a
                href="mailto:hello@nafizanam.com"
                className="text-[13px] font-medium text-accent transition-opacity hover:opacity-75"
              >
                hello@nafizanam.com
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
    value: "hello@nafizanam.com",
    href: "mailto:hello@nafizanam.com",
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
    value: "linkedin.com/in/nafizanam",
    href: "https://linkedin.com/in/nafizanam",
    description: "Professional profile & endorsements",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/nafizanam",
    href: "https://github.com/nafizanam",
    description: "Open source work & code samples",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "Google Calendar",
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
    value: "Dhaka, Bangladesh",
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
    <div className="flex h-full flex-col gap-5 rounded-[5px] border border-panel-foreground/[0.08] bg-panel p-7 shadow-sm transition-all duration-200 hover:border-accent/40 hover:shadow-md">
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
    <section className="bg-panel bg-texture-lines-panel px-6 py-28 text-panel-foreground lg:px-16">
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
            if (item.label === "Google Calendar") {
              return (
                <Reveal key={item.label} delay={(i % 3) * 0.06}>
                  <BookingButton className="block h-full w-full text-left">
                    <ConnectCard icon={item.icon} label={item.label} value={item.value} description={item.description} />
                  </BookingButton>
                </Reveal>
              );
            }
            const inner = <ConnectCard icon={item.icon} label={item.label} value={item.value} description={item.description} />;
            return item.href ? (
              <Reveal key={item.label} delay={(i % 3) * 0.06}>
                <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block h-full">
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
      "I'll review your inquiry within one business day and follow up with any initial questions.",
  },
  {
    number: "02",
    title: "Discovery Conversation",
    description:
      "We'll have a focused 30–45 minute conversation about your goals, challenges, constraints, and requirements.",
  },
  {
    number: "03",
    title: "Proposal & Roadmap",
    description:
      "You'll receive a clear proposal covering recommended approach, scope, timeline, and investment.",
  },
  {
    number: "04",
    title: "Engineering Partnership",
    description:
      "Once aligned, we begin. You'll have a dedicated technical partner from day one through long-term delivery.",
  },
] as const;

function WhatHappensNext() {
  return (
    <section className="bg-background px-6 py-28 lg:px-16">
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
    a: "Custom software, SaaS platforms, AI and automation systems, enterprise integrations, cloud infrastructure, and technical leadership. I've delivered projects across healthcare, logistics, finance, education, and enterprise sectors.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes — fully remote-capable with experience working with clients across North America, Europe, the Middle East, and Asia. I'm flexible with timezone overlap and async-first communication.",
  },
  {
    q: "Can you join an existing development team?",
    a: "Absolutely. I work well in embedded roles — as a senior engineer, tech lead, or architect on existing teams. This includes code reviews, architecture guidance, or hands-on delivery alongside your team.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, standard practice before discussing any proprietary project details. NDAs are signed before technical specifics are shared.",
  },
  {
    q: "Do you provide ongoing maintenance?",
    a: "Yes. Retainer agreements for maintenance, monitoring, feature development, and ongoing technical support are available after project delivery.",
  },
  {
    q: "What is the typical project timeline?",
    a: "MVPs typically run 8–16 weeks. Complex enterprise systems range from 6–12 months. The exact timeline is established during the discovery conversation based on scope and constraints.",
  },
  {
    q: "How quickly do you respond to inquiries?",
    a: "Within one business day for all inquiries. Discovery calls are typically scheduled within 3–5 business days of initial contact.",
  },
  {
    q: "Can you help with existing software?",
    a: "Yes — audits, architecture reviews, performance optimisation, refactoring, or adding new features to existing codebases. Many engagements begin with an assessment of what already exists.",
  },
] as const;

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-background px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-16">
          <SectionLabel>FAQ</SectionLabel>
          <h2
            className="mt-4 font-bold leading-[1.08] tracking-tight text-foreground"
            style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
          >
            Common{" "}
            <span className="font-serif italic text-accent">questions</span>
          </h2>
        </Reveal>

        <div className="mx-auto max-w-[860px]">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={0}>
                <div className="border-b border-foreground/[0.07]">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`text-[15px] font-semibold leading-snug transition-colors duration-150 ${
                        isOpen ? "text-foreground" : "text-foreground/70"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      className={`mt-1 shrink-0 text-foreground/35 transition-transform duration-250 ${
                        isOpen ? "rotate-180 text-accent" : ""
                      }`}
                    >
                      <path d="M2 5l5 5 5-5" />
                    </svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-[14px] leading-[1.88] text-foreground/55">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 7 — Final CTA
═══════════════════════════════════════════════════════════ */
function ContactFinalCTA() {
  return (
    <section className="dark bg-texture-lines bg-background px-6 py-32 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <SectionLabel>Ready to Start?</SectionLabel>
          <h2
            className="max-w-[760px] font-bold leading-[1.04] tracking-tight text-foreground"
            style={{ fontSize: "clamp(30px, 4.5vw, 66px)" }}
          >
            Every great product starts with{" "}
            <span className="font-serif italic text-accent">a conversation.</span>
          </h2>
          <p className="max-w-[520px] text-[16px] leading-[1.88] text-foreground/48">
            Whether you have a detailed specification or just an early idea,
            let's discuss how we can turn it into a scalable, reliable product.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <BookingButton className="rounded-[5px] bg-accent px-10 py-4 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90">
              Book Discovery Call
            </BookingButton>
            <a href="/case-studies">
              <Button
                variant="outline"
                className="rounded-[5px] border-foreground/20 px-10 py-4 text-xs font-bold uppercase tracking-wide hover:border-foreground/40 hover:bg-foreground/[0.03]"
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
    <>
      {/* Hero — dark */}
      <div className="dark bg-texture-lines bg-background text-foreground">
        <ContactHero />
      </div>

      {/* Who should reach out — light */}
      <WhoShouldReachOut />

      {/* Form — light */}
      <div className="border-t border-foreground/[0.06]">
        <ProjectInquiryForm />
      </div>

      {/* Other ways to connect — dark panel */}
      <div className="dark">
        <OtherWaysToConnect />
      </div>

      {/* What happens next — light */}
      <WhatHappensNext />

      {/* FAQ — light */}
      <div className="border-t border-foreground/[0.06]">
        <FAQ />
      </div>

      {/* Final CTA — dark */}
      <ContactFinalCTA />
    </>
  );
}
