import { AnimatePresence } from "motion/react";
import { Toast } from "./Toast.js";
import { useContext } from "react";
import { NotifyContext } from "../core/store.js";

type PositionClasses = {
  "top-left": string;
  "top-center": string;
  "top-right": string;
  "bottom-left": string;
  "bottom-center": String;
  "bottom-right": string;
};

export const Container = () => {
  const notify = useContext(NotifyContext);

  if (!notify) throw new Error("NotifyContext not founded!!");

  const toasts = notify.toasts;
  const config = notify.config;

  // position based classes
  const positionClasses: PositionClasses = {
    "top-left": "top-4 left-4 items-start",
    "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
    "top-right": "top-4 right-4 items-end",
    "bottom-left": "bottom-2 left-4 items-start",
    "bottom-center": "bottom-2 left-1/2 -translate-x-1/2 items-center",
    "bottom-right": "bottom-2 right-4 items-end",
  };

  return (
    <div
      className={`fixed z-999 flex w-auto max-w-sm flex-col gap-1.5 transition-all duration-300 ${positionClasses[config?.position!] || positionClasses["bottom-right"]}`}
    >
      <AnimatePresence>
        {toasts.map(({ id, title, message, type, ...props }) => (
          <Toast key={id} id={id} message={message} type={type} {...props} />
        ))}
      </AnimatePresence>
    </div>
  );
};
