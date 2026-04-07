"use client";

import { componentsLinks, docsLinks } from "@/constants/links";
import { ChevronRightIcon } from "@/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MarginBlock } from "@/components/docs";

export default function MdxFooter() {
  const path = usePathname();
  const current = allLinks.findIndex((item) => item.url === path);
  const prev = current > 0 ? allLinks[current - 1] : null;
  const next = current < allLinks.length - 1 ? allLinks[current + 1] : null;

  return (
    <>
      <MarginBlock />
      <div
        className={`flex items-center ${prev ? "justify-between" : "justify-end"}`}
      >
        {prev ? (
          <Link className="group text-left" href={prev.url}>
            <span className="flex items-center text-[12px] text-blue-500 group-hover:underline">
              <ChevronRightIcon size={16} rotation={180} />
              Prev
            </span>
            <span className="mt-1 block text-[18px] font-semibold tracking-tight">
              {prev.title}
            </span>
          </Link>
        ) : null}
        {next ? (
          <Link className="group text-right" href={next.url}>
            <span className="flex items-center justify-end text-[12px] text-blue-500 group-hover:underline">
              Next
              <ChevronRightIcon size={16} />
            </span>
            <span className="mt-1 block text-[18px] font-semibold tracking-tight">
              {next.title}
            </span>
          </Link>
        ) : null}
      </div>
    </>
  );
}

const allLinks = [...docsLinks, ...componentsLinks];
