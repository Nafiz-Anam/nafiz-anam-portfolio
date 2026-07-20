"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@portfolio/ui";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      id="newsletter"
      className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
              Newsletter
            </p>
            <h2
              className="font-bold leading-[1.02] tracking-tight text-foreground"
              style={{ fontSize: "clamp(38px, 4.5vw, 72px)" }}
            >
              Stay{" "}
              <span className="font-serif italic text-accent">Updated.</span>
            </h2>
            <p className="max-w-[440px] text-[15px] leading-[1.85] text-foreground/50">
              Receive practical engineering insights, architecture tips, and
              lessons from real-world software projects. No noise. No filler.
              Just useful content.
            </p>

            <div className="flex flex-wrap gap-6 border-t border-foreground/[0.07] pt-6">
              {[
                { value: "2×", label: "per month" },
                { value: "No", label: "spam, ever" },
                { value: "1-click", label: "unsubscribe" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <p className="font-mono text-[22px] font-bold leading-none text-foreground">
                    {item.value}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/34">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
          >
            {submitted ? (
              <div className="flex flex-col gap-4 rounded-[5px] border border-foreground/[0.08] bg-foreground/[0.03] px-10 py-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  You're in
                </p>
                <p className="text-[22px] font-bold tracking-tight text-foreground">
                  Thanks for subscribing.
                </p>
                <p className="text-[14px] leading-[1.8] text-foreground/45">
                  Practical engineering insights are on their way. Expect the
                  first issue soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-[5px] border border-foreground/[0.08] bg-foreground/[0.03] px-10 py-12"
              >
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-foreground/40">
                    Email Address
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-[5px] border border-foreground/[0.12] bg-transparent px-4 py-3.5 text-[14px] text-foreground placeholder-foreground/24 outline-none transition-colors duration-150 focus:border-accent/50 focus:ring-0"
                  />
                </label>

                <Button
                  type="submit"
                  className="mt-1 w-full rounded-[5px] bg-accent py-3.5 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
                >
                  Subscribe to Insights
                </Button>

                <p className="text-center text-[11px] leading-[1.7] text-foreground/28">
                  No spam. Unsubscribe anytime. Your email stays private.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
