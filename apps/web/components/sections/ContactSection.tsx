"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@portfolio/ui";
import { FadeIn } from "@/components/FadeIn";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  category: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().min(1),
});

const fieldClassName =
  "rounded-[5px] border border-foreground/10 bg-surface px-5 py-4 text-[14px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent transition-colors duration-250";

const selectClassName =
  "rounded-[5px] border border-foreground/10 bg-surface px-5 py-4 text-[14px] text-foreground/50 focus:text-foreground focus:outline-none focus:ring-1 focus:ring-accent transition-colors duration-250";

const categoryOptions = ["Web Design", "Development", "Branding", "Consulting"];
const budgetOptions = ["< $5k", "$5k – $15k", "$15k – $30k", "$30k+"];

export function ContactSection() {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      setError("Please fill in every field.");
      return;
    }

    setError(null);
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
            <span className="font-serif italic text-accent-soft">Connected</span>
          </h2>
          <p className="max-w-[520px] text-[15px] leading-[1.85] text-foreground/55">
            Whether you have a project in mind or want to explore how we might work together,
            I&apos;d love to hear from you.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="mt-14 flex flex-col gap-5 rounded-[5px] bg-background p-8 sm:p-12"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <input name="name" placeholder="Full Name" className={fieldClassName} />
              <input name="email" type="email" placeholder="Email Address" className={fieldClassName} />
              <select name="category" defaultValue="" className={selectClassName}>
                <option value="" disabled>
                  Category
                </option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option} className="bg-background text-foreground">
                    {option}
                  </option>
                ))}
              </select>
              <select name="budget" defaultValue="" className={selectClassName}>
                <option value="" disabled>
                  Budget Range
                </option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option} className="bg-background text-foreground">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <textarea name="message" placeholder="Tell me about your project..." rows={6} className={fieldClassName} />
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
          </form>
        </FadeIn>

        <div className="mt-10 flex justify-center">
          <Button
            type="submit"
            form="contact-form"
            className="rounded-[5px] bg-accent px-10 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90"
          >
            Send Message 🤙
          </Button>
        </div>
      </div>
    </section>
  );
}
