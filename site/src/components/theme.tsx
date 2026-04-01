"use client";

import { DarkThemeIcon, LightThemeIcon, SystemThemeIcon } from "@/icons";
import { useTheme } from "next-themes";

export default function Theme() {
  const { setTheme, theme } = useTheme();

  const themeToggle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-500/30 transition-all duration-200 hover:border-neutral-500/70"
      onClick={themeToggle}
      title="Toggle theme"
    >
      {theme === "system" ? (
        <SystemThemeIcon size={15} />
      ) : theme === "light" ? (
        <LightThemeIcon size={15} />
      ) : theme === "dark" ? (
        <DarkThemeIcon size={15} />
      ) : null}
    </button>
  );
}
