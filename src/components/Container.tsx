import { AnimatePresence, measurePageBox } from "motion/react";
import { useNotify } from "../core/useNotify.js";
import { Toast } from "./Toast.js";

const Container = () => {
  const { config, toasts } = useNotify();
  let { position } = config;

  const positionClasses = {
    "top-left": "top-2 left-2",
    "top-center": "top-2 left-1/2 -translate-x-1/2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-center": "bottom-2 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-2 right-2",
  };

  return (
    <div
      className={`flex flex-col gap-2 pointer-events-none fixed ${positionClasses[position] || "top-2 right-2"}`}
    >
      <AnimatePresence>
        {toasts.map(({ id, title, message, type, ...props }) => (
          <></>
        ))}
      </AnimatePresence>
    </div>
  );
};

export { Container };
