"use client";

import { DarkThemeIcon, LightThemeIcon, SystemThemeIcon } from "@/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Theme() {
  const { setTheme, theme } = useTheme();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    (() => setIsClient(true))();
  }, []);

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
      <span className="flex h-3.75 w-3.75 items-center justify-center">
        {isClient ? (
          theme === "system" ? (
            <SystemThemeIcon size={15} />
          ) : theme === "light" ? (
            <LightThemeIcon size={15} />
          ) : (
            <DarkThemeIcon size={15} />
          )
        ) : (
          <span className="h-3.75 w-3.75" />
        )}
      </span>
    </button>
  );
}
