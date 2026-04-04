"use client";

import { Wrapper } from "@/components";
import { ChevronRightIcon } from "@/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const path = usePathname();
  const [active, setActive] = useState("Getting Started");

  useEffect(() => {
    const body = document.body;
    if (sidebarVisible) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [sidebarVisible]);

  useEffect(() => {
    let activePath = path.replace(/^\/docs\/?/, "");
    activePath = activePath.replace(/^\/+|\/+$/g, "");

    const handleActivePath = (newActiveLink: string) => {
      setActive(newActiveLink);
    };

    if (!activePath || activePath === "") {
      handleActivePath("Getting Started");
    } else {
      const allLinks = [...docsLinks, ...componentsLinks];
      const found = allLinks.find((link) => link.url === path);
      if (found) {
        handleActivePath(found.title);
      } else {
        const lastSegment = activePath.split("/").pop();
        const formatted = lastSegment
          ? lastSegment
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())
          : "Getting Started";
        handleActivePath(formatted);
      }
    }
  }, [path]);

  return (
    <>
      <div className="bg-background sticky top-16 left-0 z-9 w-screen border-y border-neutral-500/10 md:hidden">
        <button
          className="text-foregroud flex h-auto w-full items-center justify-start gap-1 px-4 py-3 text-lg"
          onClick={() => setSidebarVisible((prev) => !prev)}
        >
          <motion.span
            animate={{
              rotate: sidebarVisible ? "90deg" : "0deg",
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <ChevronRightIcon size={20} strokeWidth={2} />
          </motion.span>
          <span className="text-neutral-800 dark:text-neutral-300">Menu</span>
        </button>
      </div>
      <div
        className={`scrollbar-visible bg-background fixed top-29.5 right-auto bottom-0 left-0 h-[calc(100vh-120px)] w-screen py-4 transition-transform duration-200 md:top-16 md:h-[calc(100vh-70px)] md:w-66 ${sidebarVisible ? "translate-y-0" : "max-md:-translate-y-[calc(100vh+200px)]"} overflow-y-auto md:sticky md:translate-x-0`}
      >
        <Wrapper>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-neutral-500">
              Introduction
            </h3>
            <div className="flex flex-col justify-start gap-0.5">
              {docsLinks.map(({ title, url }) => (
                <Link
                  key={title}
                  href={url}
                  onClick={() => {
                    setActive(title);
                    setSidebarVisible(false);
                  }}
                  className={`group dark:hover:bg-neutral-90 relative z-1 overflow-hidden rounded-md bg-transparent px-3 py-1 font-sans text-[17px] font-normal tracking-tight capitalize transition-colors duration-150 hover:bg-neutral-200 dark:hover:bg-neutral-900 ${active === title ? "bg-neutral-400 dark:bg-neutral-900" : ""}`}
                  title={title}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="my-3 text-sm font-semibold text-neutral-500">
              Components
            </h3>
            <div className="flex flex-col justify-start gap-0.5">
              {componentsLinks.map(({ title, url }) => (
                <Link
                  key={title}
                  href={url}
                  onClick={() => {
                    setActive(title);
                    setSidebarVisible(false);
                  }}
                  className={`group dark:hover:bg-neutral-90 relative z-1 overflow-hidden rounded-md bg-transparent px-3 py-1 font-sans text-[17px] font-normal tracking-tight capitalize transition-colors duration-150 hover:bg-neutral-200 dark:hover:bg-neutral-900 ${active === title ? "bg-neutral-200 dark:bg-neutral-900" : "bg-transparent"}`}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}

const docsLinks = [
  {
    title: "Getting Started",
    url: "/docs",
  },
  {
    title: "Introducton",
    url: "/docs/introduction",
  },
  {
    title: "Installation",
    url: "/docs/installation",
  },
  {
    title: "Theme",
    url: "/docs/theme",
  },
  {
    title: "Styling",
    url: "/docs/styling",
  },
  {
    title: "Customization",
    url: "/docs/customization",
  },
];

const componentsLinks = [
  {
    title: "Success",
    url: "/docs/api/success",
  },
  {
    title: "Error",
    url: "/docs/api/error",
  },
  {
    title: "Warning",
    url: "/docs/apiwarning/",
  },
  {
    title: "Info",
    url: "/docs/api/info",
  },
  {
    title: "Blank",
    url: "/docs/api/blank",
  },
  {
    title: "Promise",
    url: "/docs/api/promise",
  },
];
