"use client";

import { CopyCheckIcon, CopyIcon, SparklesIcon } from "@/icons";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePings } from "react-pings";

export default function Hero() {
  const commandRef = useRef<HTMLSpanElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [copied, setCopied] = useState(false);

  const ping = usePings();

  async function copyCommand() {
    if (!commandRef.current) return;
    try {
      const command = commandRef.current.innerText;
      await navigator.clipboard.writeText(command);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setCopied(true);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 5000);
    } catch (error) {
      console.error(`Error on copy command: ${error}`);
    }
  }

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  });

  return (
    <div className="relative z-1 flex h-[calc(100vh-64px)] w-full items-start justify-center md:items-center">
      <Image
        src="/background-image.avif"
        className="pointer-events-none absolute inset-x-auto top-0 aspect-square h-212 w-212 mask-b-from-10 opacity-75 invert-50"
        height={784}
        width={784}
        alt=""
      />
      <div className="z-1 mx-auto mt-25 flex w-full max-w-5xl flex-col items-center text-center font-sans">
        <h1 className="bg-linear-to-r from-neutral-800 to-neutral-700 bg-clip-text text-center text-6xl font-semibold tracking-tighter text-transparent md:text-9xl dark:from-neutral-200 dark:to-neutral-300">
          New way to add toast notifications
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-neutral-600 md:text-lg dark:text-neutral-400">
          A open source modern toast notification library for react apps with
          fully customizable designs and easy implemention without complex
          setups.
        </p>
        <div className="mt-12 flex items-center justify-center gap-3 md:mt-12 md:gap-6">
          <Link
            href="/docs"
            className="bg-foreground text-background rounded-md px-4 py-3 text-sm font-semibold shadow-sm shadow-neutral-700/20 transition-all duration-200 hover:bg-neutral-900 hover:shadow-lg md:text-lg hover:dark:bg-neutral-300"
          >
            Get Started
          </Link>
          <button
            onClick={() => ping("Welcome Toast")}
            className="bg-background text-foreground relative rounded-md border border-neutral-500/30 px-4 py-3 pl-9 text-sm font-semibold transition-all duration-200 hover:bg-neutral-50 hover:shadow-sm hover:shadow-neutral-700/20 md:text-lg dark:hover:bg-neutral-900"
          >
            <span className="absolute top-0 left-3 translate-y-2">
              <SparklesIcon size={22} />
            </span>
            Generate Toast
          </button>
        </div>
        <div className="mt-12 flex w-fit items-center justify-between gap-5 text-left font-semibold text-neutral-500">
          <div className="flex items-center font-mono tracking-tighter">
            <span className="text-semibold text-xl text-green-700 mr-1">~</span>{" "}
            <span className="text-semibold text-lg text-yellow-500">$</span>{" "}
            <span
              ref={commandRef}
              className="ml-3 text-sm! font-semibold md:text-[16px]"
            >
              npm install react-pings
            </span>
          </div>

          <button
            className="group relative cursor-copy p-1"
            onClick={copyCommand}
          >
            <div className="inset absolute inset-x-0 bottom-[calc(100%+5px)] left-2 h-auto w-fit -translate-x-1/2 rounded-sm border border-neutral-500/30 bg-neutral-100 px-1 py-0.5 text-sm font-normal tracking-tight text-neutral-800 opacity-0 shadow-md shadow-neutral-500/10 filter-[drop-shadow(0_4px_3px_rgba(0,0,0,0.07))_drop-shadow(0_2px_2px_rgba(0,0,0,0.06))] group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-6 after:border-transparent after:border-t-neutral-100 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-neutral-700/10 dark:filter-[drop-shadow(0_4px_3px_rgba(200,200,200,0.06))_drop-shadow(0_2px_2px_rgba(200,200,200,0.04))] dark:after:border-t-neutral-900">
              {!copied ? "Copy" : "Copied"}
            </div>
            {!copied ? (
              <CopyIcon size={14} strokeWidth={2} color="#737373" />
            ) : (
              <CopyCheckIcon size={14} strokeWidth={2} color="#737373" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
