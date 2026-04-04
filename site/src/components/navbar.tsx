"use client";

import { SearchBar, Theme, Wrapper } from "@/components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Navbar() {
  const path = usePathname();
  const [active, setActive] = useState<string>("Home");
  const [mobileBar, setMobileBar] = useState<boolean>(false);

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

  useEffect(() => {
    const body = document.body;
    if (mobileBar) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [mobileBar]);

  return (
    <>
      <header className="bg-background sticky inset-x-0 top-0 z-99 flex h-16 w-full items-center justify-center">
        <Wrapper>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-10">
              <div className="flex items-center gap-4">
                <button
                  className="block border-none sm:hidden"
                  onClick={() => setMobileBar((prev) => !prev)}
                  title="Open sidebar"
                >
                  <div className="flex flex-col items-center justify-center">
                    <motion.div
                      animate={{
                        rotate: mobileBar ? 45 : 0,
                        y: mobileBar ? 3.5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="bg-foreground my-0.75 h-px w-4 rounded"
                    ></motion.div> 

                    <motion.div
                      animate={{
                        rotate: mobileBar ? -45 : 0,
                        y: mobileBar ? -3.5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="bg-foreground my-0.75 h-px w-4 rounded"
                    ></motion.div>
                  </div>
                </button>
                <Link
                  href="/"
                  className="font-sans text-lg font-semibold"
                  title="Logo"
                >
                  ReactPings
                </Link>
              </div>
              <nav
                className={`fixed inset-x-0 max-sm:top-16 ${mobileBar ? "opacity-100 max-sm:translate-x-0" : "max-sm:-translate-x-full max-sm:opacity-0"} max-sm:bg-background! left-0 w-full items-center gap-3 bg-transparent transition-all duration-300 max-sm:h-[calc(100vh-64px)] max-sm:w-screen max-sm:p-3 max-sm:py-20 ${mobileBar && "max-sm:shadow-lg max-sm:shadow-neutral-800/20"} sm:relative sm:flex`}
              >
                {navigationLinks.map(({ title, url }) => (
                  <Link
                    href={url}
                    key={title}
                    className={`relative overflow-hidden font-sans text-[16px] font-medium tracking-tight capitalize max-sm:block max-sm:w-full max-sm:py-1.5 max-sm:text-center sm:text-[14px] ${active === title ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-500 dark:text-neutral-400"} transition-colors duration-150 hover:text-neutral-800 hover:dark:text-neutral-300`}
                    onClick={() => {
                      setActive(title);
                      setMobileBar(false);
                    }}
                    title={title}
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
    </>
  );
}

const navigationLinks = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Docs",
    url: "/docs",
  },
  {
    title: "Github",
    url: "https://www.github.com/omkashyap28/react-pings",
  },
];
