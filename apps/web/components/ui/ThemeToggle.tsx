"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "./IconButton";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-9 w-9" />;

  const isDark = theme === "dark";

  return (
    <IconButton onClick={() => setTheme(isDark ? "light" : "dark")} aria-label="Toggle theme">
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </IconButton>
  );
}
