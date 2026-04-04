"use client";

import { chatgptThemes } from "@/constants/themes";
import { CopyCheckIcon, CopyIcon, TerminalIcon } from "@/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { TerminalSkeleton } from "@/components/skeletons";

export default function Terminal({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    (() => setIsClient(true))();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div className="my-4 w-full overflow-hidden rounded-md border border-neutral-200 bg-neutral-100/20 shadow-md dark:border-neutral-700/20 dark:bg-[#070707]">
      <div className="text-foreground flex items-center justify-between border-b border-mauve-100/10 bg-neutral-200 px-4 py-1.5 text-sm dark:bg-neutral-900">
        <span className="flex items-center gap-1">
          <TerminalIcon size={17} />
          Terminal
        </span>
        <button
          onClick={handleCopy}
          className="rounded px-2 py-2 text-xs transition hover:bg-neutral-300 dark:hover:bg-neutral-700"
        >
          {!copied ? <CopyIcon size={14} /> : <CopyCheckIcon size={14} />}
        </button>
      </div>

      <div className="overflow-auto">
        {isClient ? (
          <SyntaxHighlighter
            language="terminal"
            style={chatgptThemes[theme]}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              background: "transparent",
              padding: "20px 16px",
              fontSize: "14px",
            }}
            codeTagProps={{
              style: {
                fontFamily: "Fira Code, monospace",
              },
            }}
          >
            {children}
          </SyntaxHighlighter>
        ) : (
          <TerminalSkeleton />
        )}
      </div>
    </div>
  );
}
