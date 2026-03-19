import { CSSProperties } from "react";

export type ToastType = "success" | "error" | "warning" | "info" | "custom";

export type Renderable = React.ReactElement | string | null;

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> =
  | TValue
  | ValueFunction<TValue, TArg>;

const isFunction = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> =>
  typeof valOrFunction === "function";

export const resolveValue = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>,
  arg: TArg
): TValue => (isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction);

export interface ToastProvider {
  position:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  radius: "none" | "sm" | "md" | "lg" | "xl" | "full";
  theme: "light" | "dark" | "system";
  toastDuration: 5 | 7 | 10 | 12 | 15;
  border: "solid" | "animated" | "none";
  borderColor: string;
  animationDuration: number;
  ease: "ease-in" | "ease-out" | "anticipate";
  dismissable: boolean;
  stackType: "stack" | "card";
  icons: "visible" | "hidden";
}

export interface NotifyContextType {
  toasts: [];
  addToast: (message: string, type: ToastType, icon: Renderable) => void;
  success: (message: string, icon: Renderable) => void;
  info: (message: string, icon: Renderable) => void;
  warning: (message: string, icon: Renderable) => void;
  error: (message: string, icon: Renderable) => void;
  custom: (message: string, type: string, icon: Renderable) => void;
  removeToast: (id: string) => void;
}

export type Toast = {
  id: string;
  message: ValueOrFunction<Renderable, Toast>;
  type: ToastType;
  toastId?: string;
  icon?: Renderable;
  ariaProps: {
    role: "status" | "alert";
    "aria-live": "assertive" | "off" | "polite";
  };
  className?: string;
  style: CSSProperties;
  height?: number;
  dismissable: boolean;
};
