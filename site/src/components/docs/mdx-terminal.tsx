"use server";

import { Code } from "bright";
import CopyButton from "../copy-button";
import { TerminalIcon } from "@/icons";

export default async function MdcTerminal({
  children,
  ...props
}: {
  children: React.ReactNode;
  props: unknown;
}) {
  const codeString = String(children);

  return (
    <div className="relative my-5 overflow-hidden rounded-md!">
      <div className="text-foreground flex items-center justify-between border-b border-neutral-500/30 bg-neutral-200 px-4 py-1.5 text-sm dark:bg-neutral-900">
        <span className="flex items-center gap-1">
          <TerminalIcon size={17} />
          Terminal
        </span>
        <CopyButton code={codeString} className="static" />
      </div>
      <Code
        theme={{
          light: "github-light",
          dark: "dracula",
          lightSelector: "html.light",
        }}
        lang="bash"
        style={{
          margin: "0px",
          borderRadius: "0px",
        }}
        {...props}
      >
        {children}
      </Code>
    </div>
  );
}
