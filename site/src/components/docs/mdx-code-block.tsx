"use server";

import { Code } from "bright";
import { CopyButton } from "@/components";
import { isValidElement } from "react";
import Image from "next/image";

export default async function MdxCodeBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  let codeString = "";

  if (isValidElement(children)) {
    const child = children as React.ReactElement<{ children: string }>;
    codeString = String(child.props.children).trim();
  }

  return (
    <div className="relative my-5 overflow-hidden rounded-md!">
      <div className="text-foreground flex items-center justify-between border-b border-neutral-500/30 bg-neutral-200 px-4 py-1.5 text-sm dark:bg-neutral-900">
        <div className="flex items-center gap-1">
          <Image
            src="/typescript.png"
            alt=""
            height={24}
            width={24}
            loading="lazy"
            className="rounded"
          />
          <span className="text-sm">Typescript</span>
        </div>
        <CopyButton code={codeString} className="static" />
      </div>
      <Code
        lineNumbers
        theme={{
          light: "github-light",
          dark: "dracula",
          lightSelector: "html.light",
        }}
        style={{
          margin: "0px",
          borderRadius: "0px",
        }}
      >
        {children}
      </Code>
    </div>
  );
}
