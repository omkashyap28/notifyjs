"use client";

import { chatgptThemes } from "@/constants/themes";
import { ChevronRightIcon, CopyCheckIcon, CopyIcon } from "@/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CodeBlockSkeleton } from "@/components/skeletons";
import { AnimatePresence, motion } from "motion/react";
import { useAppStore } from "@/store";
import { usePings } from "react-pings";
import { CodeBlockProps } from "@/types";

export default function CodeBlock({
  languages = ["javascript", "typescript"],
  children,
  fileName = "",
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const ping =  usePings()

  const defaultLanguage = useAppStore(state => state.defaultLanguage)
  const setDefaultLanguage = useAppStore(state => state.setDefaultLanguage)
  
  useEffect(() => {
    (() => setIsClient(true))();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      ping.success("Code copied")
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      ping.error("Copy failed")
      console.error("Copy failed", err);
    }
  };

  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div className="my-4 w-full overflow-hidden rounded-md border border-neutral-200 bg-neutral-100/20 shadow-md dark:border-neutral-700/20 dark:bg-[#070707]">
      <div className="text-foreground flex items-center justify-between border-b border-mauve-100/10 bg-neutral-200 px-4 py-1.5 text-sm dark:bg-neutral-900">
        <span className="flex items-center gap-1">{fileName}</span>
        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-50">
            <div
              className="text-foreground flex cursor-pointer items-center justify-between gap-2 rounded-md border border-transparent p-2 transition-all hover:border-neutral-500/20 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="font-medium capitalize">{defaultLanguage}</span>
              <ChevronRightIcon size={14} rotation={90} />
            </div>

            <AnimatePresence>
              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    className="absolute top-[calc(100%+8px)] left-0 z-50 w-full overflow-hidden rounded-md border border-neutral-500/20 bg-neutral-200 p-1 shadow-xl dark:bg-neutral-950"
                  >
                    {languages.map((language) => (
                      <div
                        key={language}
                        className={`text-foreground flex w-full cursor-pointer items-center justify-between px-2 py-1.5 text-sm capitalize transition-colors rounded dark:hover:bg-neutral-800 hover:bg-neutral-100 ${
                          defaultLanguage === language
                            ? "bg-neutral-100 dark:bg-neutral-900"
                            : "bg-transparent"
                        }`}
                        onClick={() => {
                          setDefaultLanguage(language);
                          setIsOpen(false);
                        }}
                      >
                        {language}
                      </div>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={handleCopy}
            className="rounded px-2 py-2 text-xs transition hover:bg-neutral-300 dark:hover:bg-neutral-700"
          >
            {!copied ? <CopyIcon size={14} /> : <CopyCheckIcon size={14} />}
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        {isClient ? (
          <SyntaxHighlighter
            language={languages[0]}
            style={chatgptThemes[theme]}
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{
              margin: 0,
              background: "transparent",
              padding: "16px",
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
          <CodeBlockSkeleton />
        )}
      </div>
    </div>
  );
}
