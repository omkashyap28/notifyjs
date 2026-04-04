"use client";

import { useState } from "react";
import { ChevronRightIcon } from "@/icons";
import { AnimatePresence, motion } from "motion/react";
import { AnimationEaseOptions, toastTypes, toastPosition } from "@/constants";
import { Heading3 } from "@/components";
import { useAppStore } from "@/store";
import { ToastDuration, usePings } from "react-pings";
import { getClassNames } from "@/utils";

export default function Customizer() {
  const position = useAppStore((state) => state.position);
  const setPosition = useAppStore((state) => state.setPosition);
  const duration = useAppStore((state) => state.toastDuration);
  const setDuration = useAppStore((state) => state.setToastDuration);
  const toastsLimit = useAppStore((state) => state.toastsLimit);
  const dismissable = useAppStore((state) => state.dismissable);
  const setDismissable = useAppStore((state) => state.setDismissable);
  const icons = useAppStore((state) => state.icons);
  const setIcons = useAppStore((state) => state.setIcons);
  const setToastsLimit = useAppStore((state) => state.setToastLimit);
  const animationEase = useAppStore((state) => state.animationEase);
  const setAnimationEase = useAppStore((state) => state.setAnimationEase);
  const setToastType = useAppStore((state) => state.setToastType);

  const [isOpen, setIsOpen] = useState(false);

  const customDuration: ToastDuration[] = [5, 7, 10, 12, 15];

  const durationPercentage = ((duration - 5) / (15 - 5)) * 100;
  const taostsLimitPercentage = ((toastsLimit - 10) / (20 - 10)) * 100;

  const ping = usePings();

  const handleClick = (type: (typeof toastTypes)[number]) => {
    setToastType(type);
    switch (type) {
      case "success":
        ping.success("Success Toast");
        break;
      case "error":
        ping.error("Error Toast");
        break;
      case "info":
        ping.info("Info Toast");
        break;
      case "warning":
        ping.warning("Warning Toast");
        break;
      case "promise":
        ping.promise(
          new Promise((rej, res) => {
            setTimeout(Math.random() > 0.5 ? rej : res, 1000);
          }),
          {
            loading: "Saving...",
            success: "Saved successfully",
            error: "Error in saving",
          }
        );
      case "blank":
        ping("Blank Toast");
        break;
      case "jsx":
        ping.success(<p>Hello world</p>);
        break;
      case "function":
        ping.error(() => "Function Error");
        break;
      case "custom icon":
        ping.success("Wow", {
          icon: "😎",
        });
        break;
      case "custom style":
        ping("Custom styles", {
          style: {
            background: "indigo",
          },
        });
        break;
      default:
        ping("Blank Toast");
    }
  };

  return (
    <div className="relative flex h-full w-full items-center justify-start md:sticky lg:top-1/6 lg:w-1/2">
      <div className="ml-0 w-full lg:max-w-lg">
        <div className="mb-4 flex flex-col items-start gap-1">
          <Heading3 className="mt-0! mb-0!">Toast options</Heading3>
        </div>

        <div className="w-full space-y-8">
          <div>
            <label className="mb-4 block text-xs font-medium tracking-wider text-neutral-500 uppercase">
              Toast Variant
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {toastTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleClick(type)}
                  className="rounded-lg border border-neutral-700/20 bg-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-800 capitalize shadow-sm transition-all duration-200 hover:bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-8 border-t border-neutral-500/50 pt-4 md:grid-cols-1">
            {/* Duration Slider */}
            <div className="my-4 grid w-full grid-cols-2 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium tracking-wider text-neutral-500 uppercase">
                  Duration <span>{duration}s</span>
                </label>

                <input
                  type="range"
                  min={0}
                  max={customDuration.length - 1}
                  step={1}
                  value={customDuration.indexOf(duration)}
                  onChange={(e) => {
                    const index = Number(e.target.value);
                    setDuration(customDuration[index]);
                  }}
                  className="h-1.5 w-full appearance-none rounded-lg"
                  style={{
                    background: `linear-gradient(to right, var(--slider-fill) ${durationPercentage}%, var(--slider-track) ${durationPercentage}%)`,
                    transition: "background 0.2s ease",
                  }}
                  title="Change duration"
                />
              </div>
              <div>
                <label className="block text-xs font-medium tracking-wider text-neutral-500 uppercase">
                  Max Toasts <span>{toastsLimit}</span>
                </label>

                <input
                  type="range"
                  min={10}
                  max={20}
                  step={1}
                  value={toastsLimit}
                  onChange={(e) => setToastsLimit(Number(e.target.value))}
                  className="h-1.5 w-full appearance-none rounded-lg"
                  style={{
                    background: `linear-gradient(to right, var(--slider-fill) ${taostsLimitPercentage}%, var(--slider-track) ${taostsLimitPercentage}%)`,
                    transition: "background 0.2s ease",
                  }}
                  title="Change Toasts Limit"
                />
              </div>
              <div className="col-span-2 mt-5">
                <div className="flex w-full items-center justify-between max-sm:flex-col max-sm:items-start max-sm:justify-start max-sm:space-y-4">
                  <div>
                    <div className="flex w-fit items-center gap-3">
                      <input
                        type="checkbox"
                        id="dismissable"
                        checked={dismissable}
                        onChange={() => setDismissable(!dismissable)}
                        className="accent-foreground h-3.5 w-3.5 cursor-pointer rounded-sm bg-neutral-800"
                        title="Toggle Dismissable"
                      />
                      <label
                        htmlFor="dismissable"
                        className="block text-xs font-medium tracking-wider text-neutral-500 uppercase"
                      >
                        Dismissable{" "}
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="flex w-fit items-center gap-3">
                      <input
                        type="checkbox"
                        id="icons"
                        checked={icons === "visible"}
                        onChange={() =>
                          setIcons(icons === "visible" ? "hidden" : "visible")
                        }
                        className="accent-foreground h-3.5 w-3.5 cursor-pointer rounded-sm bg-neutral-800"
                        title="Toggle icons visibility"
                      />
                      <label
                        htmlFor="icons"
                        className="block text-xs font-medium tracking-wider text-neutral-500 uppercase"
                      >
                        Icons{" "}
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="flex w-full items-center gap-3">
                      <div className="relative w-30 max-w-50">
                        <div
                          className="text-foreground flex cursor-pointer items-center justify-between gap-2 rounded-md"
                          onClick={() => setIsOpen((prev) => !prev)}
                        >
                          <span className="font-medium text-neutral-500 capitalize">
                            {animationEase}
                          </span>
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
                                {AnimationEaseOptions.map((type) => (
                                  <div
                                    key={type}
                                    className={`text-foreground flex w-full cursor-pointer items-center justify-between rounded px-2 py-1.5 text-sm capitalize transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                                      animationEase === type
                                        ? "bg-neutral-100 dark:bg-neutral-900"
                                        : "bg-transparent"
                                    }`}
                                    onClick={() => {
                                      setAnimationEase(type);
                                      setIsOpen(false);
                                    }}
                                  >
                                    {type}
                                  </div>
                                ))}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Position Picker */}
            <div className="flex flex-col gap-4">
              <label className="block text-xs font-medium tracking-wider text-neutral-500 uppercase">
                Positioning
              </label>
              <div className="grid w-full grid-cols-3 gap-2 rounded-xl border border-neutral-800/20 bg-neutral-100/20 p-2 shadow dark:bg-neutral-800/20">
                {toastPosition.map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos)}
                    className={`flex h-10 w-auto items-center justify-center rounded-md transition-all ${
                      position === pos
                        ? "bg-neutral-900 dark:bg-neutral-200 dark:text-neutral-800"
                        : "border-neutral-700/30 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                    } border`}
                    title={pos}
                  >
                    <div
                      className={`h-5 w-5 rounded border-3 ${getClassNames(pos)} ${position === pos ? "border-neutral-200 dark:border-neutral-900" : "border-neutral-800 dark:border-neutral-100"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
