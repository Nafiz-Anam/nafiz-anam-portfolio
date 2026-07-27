"use client";

import { useState } from "react";
import { z } from "zod";
import { Button, Select } from "@portfolio/ui";
import { FadeIn } from "@/components/FadeIn";
import { api } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Valid email required"),
  category: z.string().min(1, "Category required"),
  budget: z.string().min(1, "Budget required"),
  message: z.string().min(1, "Message required"),
});

const fieldClassName =
  "rounded-[5px] border border-foreground/10 bg-surface px-5 py-4 text-[14px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent transition-colors duration-250";

const categoryOptions = ["Web Design", "Development", "Branding", "Consulting"];
const budgetOptions = ["< $5k", "$5k – $15k", "$15k – $30k", "$30k+"];

export function ContactSection() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      category: formData.get("category"),
      budget: formData.get("budget"),
      message: formData.get("message"),
    });

    if (!parsed.success) {
      const first = parsed.error.errors[0]?.message;
      setError(first ?? "Please fill in every field.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/contact", parsed.data);
      setSubmitted(true);
    } catch (err) {
      const e = err as { message?: string };
      setError(e.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="dark bg-texture-lines bg-surface px-6 py-32 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Let&apos;s Work Together
          </p>
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            <span className="font-sans text-foreground">Let&apos;s Get</span>{" "}
            <span className="font-serif italic text-accent">Connected</span>
          </h2>
          <p className="max-w-[520px] text-[15px] leading-[1.85] text-foreground/55">
            Whether you have a project in mind or want to explore how we might work together,
            I&apos;d love to hear from you.
          </p>
        </FadeIn>

        {submitted ? (
          <FadeIn delay={0.1}>
            <div className="mt-14 flex flex-col items-center gap-4 rounded-[5px] bg-background p-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
                <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Message received!</h3>
              <p className="max-w-sm text-[14px] leading-relaxed text-foreground/55">
                Thanks for reaching out. I&apos;ll review your message and get back to you within 24 hours.
              </p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0.1}>
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="mt-14 flex flex-col gap-5 rounded-[5px] bg-background p-8 sm:p-12"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <input name="name" placeholder="Full Name" className={fieldClassName} />
                <input name="email" type="email" placeholder="Email Address" className={fieldClassName} />
                <Select
                  name="category"
                  value={category}
                  onChange={setCategory}
                  placeholder="Category"
                  options={categoryOptions.map((o) => ({ value: o, label: o }))}
                />
                <Select
                  name="budget"
                  value={budget}
                  onChange={setBudget}
                  placeholder="Budget Range"
                  options={budgetOptions.map((o) => ({ value: o, label: o }))}
                />
              </div>
              <textarea name="message" placeholder="Tell me about your project..." rows={6} className={fieldClassName} />
              {error ? <p className="text-sm text-red-400">{error}</p> : null}
            </form>

            <div className="mt-10 flex justify-center">
              <Button
                type="submit"
                form="contact-form"
                disabled={loading}
                className="rounded-[5px] bg-accent px-10 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send Message"}
              </Button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
