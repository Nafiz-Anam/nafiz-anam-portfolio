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
  "rounded-[5px] border border-foreground/10 bg-surface px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent";

const selectClassName =
  "rounded-[5px] border border-foreground/10 bg-surface px-4 py-3 text-foreground/50 focus:text-foreground focus:outline-none focus:ring-1 focus:ring-accent";

const categoryOptions = ["Category", "Web Design", "Development", "Branding", "Consulting"];
const budgetOptions = ["Budget", "< $5k", "$5k – $15k", "$15k – $30k", "$30k+"];

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

    // No backend endpoint wired up yet — this is a scaffold. See .claude/CLAUDE.md follow-ups.
    setError(null);
  }

  return (
    <section id="contact" className="dark bg-texture-lines bg-surface px-6 py-24 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <FadeIn>
          <h2 className="text-center text-4xl font-bold sm:text-5xl">
            <span className="font-sans text-foreground">Let&apos;s Get</span>{" "}
            <span className="font-serif italic text-accent-soft">Connected</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-4 rounded-[5px] bg-background p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <input name="name" placeholder="Full Name" className={fieldClassName} />
              <input name="email" type="email" placeholder="Email" className={fieldClassName} />
              <select name="category" defaultValue="" className={selectClassName}>
                <option value="" disabled>
                  Category
                </option>
                {categoryOptions.slice(1).map((option) => (
                  <option key={option} value={option} className="bg-background text-foreground">
                    {option}
                  </option>
                ))}
              </select>
              <select name="budget" defaultValue="" className={selectClassName}>
                <option value="" disabled>
                  Budget
                </option>
                {budgetOptions.slice(1).map((option) => (
                  <option key={option} value={option} className="bg-background text-foreground">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <textarea name="message" placeholder="Your Message" rows={5} className={fieldClassName} />
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
          </form>
        </FadeIn>

        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            form="contact-form"
            className="rounded-[5px] bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
          >
            Book a consultancy 🤙
          </Button>
        </div>
      </div>
    </section>
  );
}
