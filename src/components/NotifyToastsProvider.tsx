import { Provider } from "../core/store.js";
import { NotifyProviderTypes } from "../core/types.js";
import { NotifyToasts } from "./NotifyToasts.js";

export const NotifyToastsProvider = ({
  children,
  position = "bottom-right",
  toastDuration = 5,
  ease = "spring",
  dismissable = true,
  icons = "visible",
  toastLimit = 20,
}: NotifyProviderTypes & { children: React.ReactNode }) => {
  return (
    <Provider
      config={{
        position,
        toastDuration,
        ease,
        dismissable,
        icons,
        toastLimit,
      }}
    >
      {children}
      <NotifyToasts />
    </Provider>
  );
};
