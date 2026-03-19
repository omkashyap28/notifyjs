import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
  useRef,
} from "react";
import {
  NotifyContextType,
  Renderable,
  Toast,
  ToastAPI,
  ToastDuration,
  ToastProvider,
  ToastType,
  ValueOrFunction,
} from "./types.js";

export const TOAST_LIMIT = 20;
const TOAST_REMOVE_DELAY = 1000;

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
const Provider = ({ children }: { children: ReactNode }): ReactNode => {
  const [state, dispatch] = useReducer(reducer, {
    toasts: [],
    setting: {
      toastLimit: TOAST_LIMIT,
    },
  });

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
        const timeout = setTimeout(() => dismissToast(id), duration);
        timerRef.current.set(id, timeout);
      }

      return id;
    },
    [dismissToast]
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
      dismissToast,
      removeToast,
    }),
    [toasts, addToast, dismissToast, removeToast]
  );

  return (
    <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>
  );
};

export { NotifyContext, Provider };
