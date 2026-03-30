"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState<string>("getting started");

  return (
    <div className="scrollbar-visible fixed top-16 right-auto bottom-0 left-0 h-[calc(100vh-70px)] w-66 -translate-x-full overflow-y-auto p-4 md:sticky md:translate-x-0">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-neutral-500">
          Introduction
        </h3>
        <div className="flex flex-col justify-start gap-0.5">
          {docsLinks.map(({ title, url }) => (
            <Link
              key={title}
              href={url}
              onClick={() => setActiveLink(title.toLowerCase())}
              className={`group dark:hover:bg-neutral-90 relative z-1 overflow-hidden rounded-md bg-transparent px-3 py-1 font-sans text-[17px] font-normal tracking-tight capitalize transition-colors duration-150 hover:bg-neutral-200 dark:hover:bg-neutral-900 ${activeLink === title.toLowerCase() ? "bg-neutral-200 dark:bg-neutral-900" : "bg-transparent"}`}
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
              onClick={() => setActiveLink(title.toLowerCase())}
              className={`group dark:hover:bg-neutral-90 relative z-1 overflow-hidden rounded-md bg-transparent px-3 py-1 font-sans text-[17px] font-normal tracking-tight capitalize transition-colors duration-150 hover:bg-neutral-200 dark:hover:bg-neutral-900 ${activeLink === title.toLowerCase() ? "bg-neutral-200 dark:bg-neutral-900" : "bg-transparent"}`}
            >
              {title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const docsLinks = [
  {
    title: "getting started",
    url: "/docs",
  },
  {
    title: "introducton",
    url: "/docs/introduction",
  },
  {
    title: "installation",
    url: "/docs/installation",
  },
  {
    title: "theme",
    url: "/docs/theme",
  },
  {
    title: "styling",
    url: "/docs/styling",
  },
  {
    title: "customization",
    url: "/docs/customization",
  },
];

const componentsLinks = [
  {
    title: "success",
    url: "#",
  },
  {
    title: "error",
    url: "#",
  },
  {
    title: "alert",
    url: "#",
  },
  {
    title: "info",
    url: "#",
  },
  {
    title: "blank",
    url: "#",
  },
  {
    title: "promise",
    url: "#",
  },
];
