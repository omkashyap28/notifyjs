import { MotionStyle } from "motion";

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "promise"
  | "blank";

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

export interface PingsProviderTypes {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  toastDuration?: ToastDuration;
  animationEase?: "spring" | "tween";
  dismissable?: boolean;
  icons?: "visible" | "hidden";
  toastLimit?: number;
}

export type ToastHandler = (
  msg: ValueOrFunction<Renderable, Toast>,
  opts?: ToastOptions
) => string;

export type PromiseHandler = <T>(
  promise: Promise<T> | (() => Promise<T>),
  msgs: {
    loading: Renderable;
    success?: ValueOrFunction<Renderable, T>;
    error?: ValueOrFunction<Renderable, any>;
  },
  opts?: DefaultToastOptions
) => Promise<T>;

export interface ToastAPI extends ToastHandler {
  success: ToastHandler;
  error: ToastHandler;
  loading: ToastHandler;
  promise: PromiseHandler;
  info: ToastHandler;
  warning: ToastHandler;
  dismiss: (id: string) => void;
  remove: (id: string) => void;
}

export interface PingsContextType {
  toasts: Toast[];
  toast: ToastAPI;
  config: PingsProviderTypes;
  usePings: () => ToastAPI;
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
  toastDuration?: ToastDuration;
  style?: MotionStyle;
  dismissable?: boolean;
};

export type ToastOptions = Partial<
  Pick<Toast, "id" | "title" | "icon" | "toastDuration" | "ariaProps" | "style">
>;

export type DefaultToastOptions = ToastOptions & {
  [key in ToastType]?: ToastOptions;
};
