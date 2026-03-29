"use client";

import { DarkThemeIcon, LightThemeIcon, SystemThemeIcon } from "@/icons";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Theme() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    (() => setMounted(true))();
  }, []);

  if (!mounted) return null;

  const themeToggle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <motion.button
      whileTap={{
        scale: 0.8,
      }}
      transition={{
        duration: 0.2,
      }}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-500/30 transition-all duration-200 hover:border-neutral-500/50"
      onClick={themeToggle}
    >
      {theme === "system" ? (
        <SystemThemeIcon size={15} />
      ) : resolvedTheme === "light" ? (
        <LightThemeIcon size={15} />
      ) : (
        <DarkThemeIcon size={15} />
      )}{" "}
    </motion.button>
  );
}
