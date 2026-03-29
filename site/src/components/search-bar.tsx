"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SearchIcon } from "@/icons";

export default function SearchBar() {
  const searchElemRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    document.body.style.overflow = visibility ? "hidden" : "auto";
  }, [visibility]);

  useEffect(() => {
    const visibleSearch = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setVisibility(true);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setVisibility(false);
      }
    };

    window.addEventListener("keydown", visibleSearch);

    return () => window.removeEventListener("keydown", visibleSearch);
  }, []);

  return (
    <>
      <div
        tabIndex={0}
        ref={searchElemRef}
        className="md:hidden"
        onClick={() => setVisibility(true)}
      >
        <SearchIcon size={15} strokeWidth={2} />
      </div>
      <div
        tabIndex={0}
        ref={searchElemRef}
        className="relative flex h-9 w-68 cursor-pointer items-center justify-start rounded-md border border-neutral-400/30 bg-neutral-50 py-2 transition-colors duration-200 hover:bg-neutral-100/90 max-md:hidden dark:bg-neutral-800 hover:dark:bg-neutral-800/80"
        onClick={() => setVisibility(true)}
      >
        <p className="ml-2 text-[16px] text-neutral-500 select-none">
          Search documentation
        </p>
        <div className="absolute right-1 h-fit rounded border border-neutral-500/30 px-1 py-0.5 text-neutral-700 dark:border-neutral-200/30 dark:bg-neutral-900 dark:text-neutral-300">
          <kbd className="text-[12px] tracking-tight">CtrlK</kbd>
        </div>
      </div>
      <AnimatePresence>
        {visibility && (
          <motion.div
            aria-hidden={!visibility}
            initial={{
              y: 10,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 10,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed inset-0 top-20 z-9 mx-auto h-fit w-[90%] max-w-xl rounded-md bg-neutral-50 px-4 py-2 shadow-md dark:bg-neutral-900"
          >
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Search documentation"
                value={searchText}
                autoFocus
                onChange={(e) => setSearchText(e.target.value)}
                className="text-foreground h-12 w-full text-lg font-light tracking-wide outline-none selection:bg-blue-600!"
              />

              <span
                className="cursor-pointer rounded border border-neutral-500/20 bg-neutral-100 px-2 py-0.5 text-sm tracking-tighter text-neutral-600 shadow transition-colors duration-150 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 hover:dark:bg-neutral-900"
                onClick={() => setVisibility(false)}
              >
                <kbd>Esc</kbd>
              </span>
            </div>

            <div className="mt-3 h-auto w-full overflow-y-auto border-t border-neutral-400/30 py-4 dark:border-neutral-200/20">
              {searchText === "" && (
                <div className="text-[16px] font-light tracking-wide text-neutral-400">
                  Nothing to search
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {visibility && (
        <div
          className="fixed inset-0 h-full w-full bg-white/40 backdrop-blur-lg dark:bg-black/80"
          onClick={() => setVisibility(false)}
        />
      )}
    </>
  );
}
