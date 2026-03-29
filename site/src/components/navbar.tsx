"use client";

import { SearchBar, Theme, Wrapper } from "@/components";
// import { DarkThemeIcon, GithubIcon, LightThemeIcon, SystemThemeIcon } from "@/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import { Theme } from ".";

export default function Navbar() {
  const path = usePathname();
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const activePath = path.replace(/^\/+|\/+$/g, "");

    const handleActivePath = (newActiveLink: string) => {
      setActive(newActiveLink);
    };

    if (!activePath || activePath === "") {
      handleActivePath("Home");
    } else {
      const found = navigationLinks.find((link) => link.url === path);
      if (found) {
        handleActivePath(found.title);
      } else {
        const lastSegment = activePath.split("/").pop();
        const formatted = lastSegment
          ? lastSegment
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())
          : "Home";
        handleActivePath(formatted);
      }
    }
  }, [path]);

  return (
    <header className="bg-background sticky inset-x-0 top-0 z-99 flex h-16 w-full items-center justify-center">
      <Wrapper>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-5">
            <Link href="/" className="text-2xl font-semibold">
              ReactPings
            </Link>
            <nav className="itemss-center flex gap-3">
              {navigationLinks.map(({ title, url }) => (
                <Link
                  href={url}
                  key={title}
                  className={`text-[15px] font-normal tracking-tight capitalize ${active === title.toLowerCase() ? "text-neutral-900 dark:text-neutral-300" : "text-neutral-500"} transition-colors duration-150 hover:text-neutral-800 hover:dark:text-neutral-300`}
                  onClick={() => setActive(title)}
                >
                  {title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <SearchBar />
            <Theme />
          </div>
        </div>
      </Wrapper>
    </header>
  );
}

const navigationLinks = [
  {
    title: "Docs",
    url: "/docs",
  },
];
