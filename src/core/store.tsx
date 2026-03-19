import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  NotifyContextType,
  NotifyProviderTypes,
  Renderable,
  Toast,
  ToastAPI,
  ToastType,
  ValueOrFunction,
} from "./types.js";

export const TOAST_LIMIT = 20;
const TOAST_REMOVE_DELAY = 1000;
const DEFAULT_CONFIG: NotifyProviderTypes = {
  position: "top-center",
  radius: "sm",
  theme: "system",
  toastDuration: 5,
  border: "animated",
  borderColor: "#ff45ac",
  animationDuration: 0.5,
  ease: "ease-in",
  dismissable: true,
  stackType: "stack",
  icons: "visible",
  toastLimit: 20,
};

interface ToastSetting {
  toastLimit: number;
}

enum ActionType {
  ADD_TOAST,
  UPDATE_TOAST,
  REMOVE_TOAST,
  DISMISS_TOAST,
  PAUSE,
  RESUME,
}

type Action =
  | {
      type: ActionType.ADD_TOAST;
      toast: Toast;
    }
  | {
      type: ActionType.UPDATE_TOAST;
      toast: Partial<Toast>;
    }
  | {
      type: ActionType.REMOVE_TOAST;
      toastId: string;
    }
  | {
      type: ActionType.DISMISS_TOAST;
      toastId: string;
    };

export type ToasterState = {
  toasts: Toast[];
  setting: ToastSetting;
};

const reducer = (state: ToasterState, action: Action): ToasterState => {
  switch (action.type) {
    case ActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(
          0,
          state.setting.toastLimit
        ),
      };
    case ActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    case ActionType.DISMISS_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId ? { ...t, visible: false } : t
        ),
      };
    case ActionType.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
};

// creating context
const NotifyContext = createContext<NotifyContextType | null>(null);

// function to generate unique id
const uniqueId = () => crypto.randomUUID();

// Context provider
const Provider = ({
  children,
  config: userConfig,
}: {
  children: ReactNode;
  config: NotifyProviderTypes;
}) => {
  // toast state
  const [state, dispatch] = useReducer(reducer, {
    toasts: [],
    setting: {
      toastLimit: TOAST_LIMIT,
    },
  });

  // toast component config
  const [config, setConfig] = useState<NotifyProviderTypes>({
    ...DEFAULT_CONFIG,
    ...userConfig,
  });

  // toast
  const timerRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const removeToast = useCallback((toastId: string) => {
    dispatch({ type: ActionType.REMOVE_TOAST, toastId });
    if (timerRef.current.has(toastId)) {
      clearTimeout(timerRef.current.get(toastId));
      timerRef.current.delete(toastId);
    }
  }, []);

  const dismissToast = useCallback(
    (toastId: string) => {
      dispatch({ type: ActionType.DISMISS_TOAST, toastId });

      setTimeout(() => {
        removeToast(toastId);
      }, TOAST_REMOVE_DELAY);
    },
    [removeToast]
  );

  const addToast = useCallback(
    (
      message: ValueOrFunction<Renderable, Toast>,
      type: ToastType,
      options?: Partial<Toast>
    ) => {
      const id = uniqueId();
      const duration = options?.duration ?? 5;

      dispatch({
        type: ActionType.ADD_TOAST,
        toast: { id, message, type, visible: true, ...options },
      });

      if (duration !== Infinity) {
        const timeout = setTimeout(() => dismissToast(id), duration * 1000);
        timerRef.current.set(id, timeout);
      }

      return id;
    },
    [dismissToast]
  );

  useEffect(
    () => setConfig((prev) => ({ ...prev, ...userConfig })),
    [userConfig]
  );

  const { toasts } = state;
  const toast: ToastAPI = {
    success: (msg: ValueOrFunction<Renderable, Toast>, opts?: Partial<Toast>) =>
      addToast(msg, "success", opts),
    warning: (msg: ValueOrFunction<Renderable, Toast>, opts?: Partial<Toast>) =>
      addToast(msg, "warning", opts),
    info: (msg: ValueOrFunction<Renderable, Toast>, opts?: Partial<Toast>) =>
      addToast(msg, "info", opts),
    error: (msg: ValueOrFunction<Renderable, Toast>, opts?: Partial<Toast>) =>
      addToast(msg, "error", opts),
    loading: (msg: ValueOrFunction<Renderable, Toast>, opts?: Partial<Toast>) =>
      addToast(msg, "loading", opts),
    custom: (msg: ValueOrFunction<Renderable, Toast>, opts?: Partial<Toast>) =>
      addToast(msg, "custom", opts),
  };

  const value = useMemo(
    () => ({
      toasts,
      toast,
      config,
      dismissToast,
      removeToast,
    }),
    [toasts, config, dismissToast, removeToast]
  );

  return (
    <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>
  );
};

export { NotifyContext, Provider };
