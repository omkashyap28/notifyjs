"use client";

import { CheckIcon, CopyIcon } from "@/icons";
import { useState } from "react";
import { usePings } from "react-pings";

export default function CopyButton({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const [copied, setCopied] = useState<boolean>(false);
  const { success, error } = usePings();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      success("Copied successfully");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      error("Error in copy code");
      console.error("Copy failed", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center justify-center rounded-full p-2 text-xs transition hover:bg-neutral-300 dark:hover:bg-neutral-700 ${className}`}
    >
      {!copied ? <CopyIcon size={14} /> : <CheckIcon size={14} />}
    </button>
  );
}
