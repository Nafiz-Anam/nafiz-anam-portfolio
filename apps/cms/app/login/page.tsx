"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@portfolio/ui";
import { api } from "@/lib/api";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const parsed = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsed.success) {
      setError("Invalid email or password format.");
      return;
    }

    try {
      await api.post("/api/auth/login", parsed.data);
      window.location.href = "/";
    } catch {
      setError("Login failed.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form action={handleSubmit} className="flex w-80 flex-col gap-3">
        <h1 className="text-xl font-semibold">Admin login</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="rounded-md border border-slate-300 px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="rounded-md border border-slate-300 px-3 py-2"
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit">Sign in</Button>
      </form>
    </main>
  );
}
