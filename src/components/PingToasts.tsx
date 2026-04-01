import { AnimatePresence } from "motion/react";
import { Toast } from "./Toast.js";
import { useContext } from "react";
import { PingsContext } from "../core/store.js";
import { TOAST_POSITION } from "./config/toast.config.js";

export const PingsToasts = () => {
  const ping = useContext(PingsContext);

  if (!ping) throw new Error("PingsContext not founded!!");

  const toasts = ping.toasts;
  const config = ping.config;

  const setTop = () => {
    const { top } = config;
    if (typeof top === "string") {
      return top;
    } else {
      return `${top}px`;
    }
  };

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-999 flex w-auto max-w-sm flex-col gap-1.5 transition-all duration-300 select-none ${TOAST_POSITION[config.position!] || TOAST_POSITION["bottom-right"]}`}
      style={{
        paddingTop: setTop(),
      }}
    >
      <AnimatePresence>
        {toasts.map(({ id, title, message, type, ...props }) => (
          <Toast key={id} id={id} message={message} type={type} {...props} />
        ))}
      </AnimatePresence>
    </div>
  );
};
