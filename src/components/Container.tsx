import { AnimatePresence } from "motion/react";
import { Toast } from "./Toast.js";
import { useContext } from "react";
import { NotifyContext } from "../core/store.js";
import { TOAST_POSITION } from "./config/toast.config.js";

export const Container = () => {
  const notify = useContext(NotifyContext);

  if (!notify) throw new Error("NotifyContext not founded!!");

  const toasts = notify.toasts;
  const config = notify.config;

  return (
    <div
      className={`pointer-events-none fixed z-999 flex w-auto max-w-sm flex-col gap-1.5 transition-all duration-300 select-none ${TOAST_POSITION[config.position!] || TOAST_POSITION["bottom-right"]}`}
    >
      <AnimatePresence>
        {toasts.map(({ id, title, message, type, ...props }) => (
          <Toast key={id} id={id} message={message} type={type} {...props} />
        ))}
      </AnimatePresence>
    </div>
  );
};
