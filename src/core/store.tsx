import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import {
  NotifyContextType,
  NotifyProviderTypes,
  Renderable,
  Toast,
  ToastAPI,
  ToastOptions,
  ToastType,
  ValueOrFunction,
} from "./types.js";

const TOAST_REMOVE_DELAY = 1000;

type Message = ValueOrFunction<Renderable, Toast>;

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
      limit: number;
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
};

const reducer = (state: ToasterState, action: Action): ToasterState => {
  switch (action.type) {
    case ActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, action.limit),
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
  config: Partial<NotifyProviderTypes>;
}) => {
  // toast state
  const [state, dispatch] = useReducer(reducer, {
    toasts: [],
  });

  // toast component config
  const config = useMemo(
    () => ({
      ...userConfig,
    }),
    [userConfig]
  );

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
      const duration = options?.duration ?? config.toastDuration ?? 5;

      dispatch({
        type: ActionType.ADD_TOAST,
        toast: { id, message, type, ...options },
        limit: config.toastLimit ?? 20,
      });

      if (duration !== Infinity) {
        const timeout = setTimeout(() => dismissToast(id), duration * 1000);
        timerRef.current.set(id, timeout);
      }

      return id;
    },
    [dismissToast, config.toastDuration, config.toastLimit]
  );

  useEffect(() => {
    const timers = timerRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const { toasts } = state;

  const toastApi: ToastAPI = useMemo(() => {
    const toast = (msg: Message, opts?: ToastOptions) =>
      addToast(msg, "blank", opts);
    toast.success = (msg: Message, opts?: ToastOptions) =>
      addToast(msg, "success", opts);
    toast.warning = (msg: Message, opts?: ToastOptions) =>
      addToast(msg, "warning", opts);
    toast.info = (msg: Message, opts?: ToastOptions) =>
      addToast(msg, "info", opts);
    toast.error = (msg: Message, opts?: ToastOptions) =>
      addToast(msg, "error", opts);
    toast.loading = (msg: Message, opts?: ToastOptions) =>
      addToast(msg, "loading", opts);
    toast.custom = (msg: Message, opts?: ToastOptions) =>
      addToast(msg, "custom", opts);
    toast.blank = (msg: Message, opts: ToastOptions) =>
      addToast(msg, "blank", opts);
    toast.dismiss = (id: string) => dismissToast(id);
    toast.remove = (id: string) => removeToast(id);

    return toast;
  }, [addToast, removeToast, dismissToast]);

  const value = useMemo(
    () => ({
      toasts,
      toast: toastApi,
      config,
    }),
    [toasts, toastApi, config]
  );

  return (
    <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>
  );
};

export { NotifyContext, Provider };
