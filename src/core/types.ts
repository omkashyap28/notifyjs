import { CSSProperties } from "react";

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "blank"
  | "custom";

export type Renderable = React.ReactElement | string | null;

export type ToastDuration = 5 | 7 | 10 | 12 | 15;

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

export interface NotifyProviderTypes {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  toastDuration?: ToastDuration;
  border?: "solid" | "animated" | "none";
  ease?: "ease-in" | "ease-out" | "anticipate";
  dismissable?: boolean;
  icons?: "visible" | "hidden";
  toastLimit?: number;
}

export type ToastHandler = (
  msg: ValueOrFunction<Renderable, Toast>,
  opts?: ToastOptions
) => string;

export interface ToastAPI extends ToastHandler {
  success: ToastHandler;
  error: ToastHandler;
  loading: ToastHandler;
  info: ToastHandler;
  warning: ToastHandler;
  custom: ToastHandler;
  dismiss: (id: string) => void;
  remove: (id: string) => void;
}

export interface NotifyContextType {
  toasts: Toast[];
  toast: ToastAPI;
  config: NotifyProviderTypes;
}

export type Toast = {
  id: string;
  title?: string;
  message: ValueOrFunction<Renderable, Toast>;
  type: ToastType;
  icon?: Renderable;
  ariaProps?: {
    role: "status" | "alert";
    "aria-live": "assertive" | "off" | "polite";
  };
  duration?: ToastDuration;
  className?: string;
  style?: CSSProperties;
  height?: number;
  dismissable?: boolean;
  visible?: boolean;
};

export type ToastOptions = Partial<
  Pick<
    Toast,
    "id" | "title" | "icon" | "duration" | "ariaProps" | "className" | "style"
  >
>;

export type DefaultToastOptions = ToastOptions & {
  [key in ToastType]?: ToastOptions;
};
