import { motion } from "motion/react";
import { Toast as ToastPropsType, resolveValue } from "../core/types.js";
import { useContext, useMemo } from "react";
import { PingsContext } from "../core/store.js";
import { TOAST_ICONS, TOAST_STYLES } from "./config/toast.config.js";
import Close from "./icons/Close.js";

export const Toast = (props: ToastPropsType) => {
  const { id, message, type, title, style, icon, ...prop } = props;

  const Icon = TOAST_ICONS[type];

  const context = useContext(PingsContext);

  if (!context) throw new Error("PingsContext is not founded!!");

  const { config, toast: toastApi } = context;
  const renderMessage = resolveValue(message, props);

  const animationVariants = useMemo(() => {
    const position = config.position || "top-right";
    const isTop = position.includes("top");
    const isBottom = position.includes("bottom");
    const isLeft = position.includes("left");
    const isRight = position.includes("right");
    const isCenter = position.includes("center");

    return {
      initial: {
        opacity: 0,
        filter: "blur(4px)",
        scale: 0.95,
        x: isLeft ? -20 : isRight ? 20 : 0,
        y: isCenter ? (isTop ? -20 : 20) : 0,
      },
      animate: {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
      },
      exit: {
        opacity: 0,
        filter: "blur(2px)",
        x: isLeft ? -20 : isRight ? 20 : 0,
        y: isCenter ? (isTop ? -20 : 20) : 0,
        transition: { duration: 0.15 },
      },
    };
  }, [config.position]);

  return (
    <motion.div
      layout
      initial={animationVariants.initial}
      animate={animationVariants.animate}
      exit={animationVariants.exit}
      transition={{
        type: config.animationEase || "spring",
        stiffness: 300,
        damping: 25,
      }}
      className="group bg-toast-background/85 pointer-events-auto relative flex items-center gap-3 rounded-xl border border-neutral-500/20 px-3 py-2 text-[15px] font-medium shadow-md backdrop-blur-md"
      style={style!}
      {...prop}
    >
      {config.icons === "visible" && Icon && (
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className={TOAST_STYLES[type]}
        >
          {icon ? icon : <Icon size={24} />}
        </motion.span>
      )}

      <div className="flex flex-col">
        {title && (
          <span className={`capitalize ${TOAST_STYLES[type]}`}>{title}</span>
        )}
        <span className="text-toast-foreground text-[15px] leading-tight tracking-tight">
          {renderMessage}
        </span>
      </div>

      {config.dismissable && (
        <button
          onClick={() => toastApi.dismiss(id)}
          className="bg-toast-button-background text-toast-button-foreground absolute top-1 right-1 z-99 flex h-5 w-5 -translate-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-neutral-500/40 opacity-0 transition-all duration-200 group-hover:opacity-100"
        >
          <Close size={24} />
        </button>
      )}
    </motion.div>
  );
};
