"use client";

import { ChevronRightIcon } from "@/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function BreadCrumps() {
  const path = usePathname();

  const segments = path.split("/").filter((val) => val !== "");

  return (
    <div className="mb-10 flex items-center">
      <div className="flex items-center gap-1">
        <Link href="/" className="tracking-normal text-blue-500">
          Home
        </Link>
        {segments.length > 0 && <ChevronRightIcon size={20} />}

        {segments.map((segment, idx) => {
          const title = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
          const href = `/${segments.slice(0, idx + 1).join("/")}`;
          const isLast = segments.length - 1 === idx;

          return (
            <Fragment key={idx}>
              {!isLast ? (
                <>
                  <Link href={href} className="tracking-normal text-blue-500">
                    {title}
                  </Link>
                  <ChevronRightIcon size={20} />
                </>
              ) : (
                <span className="tracking-normal text-neutral-700 dark:text-neutral-300">
                  {title}
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
