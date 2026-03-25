import { Provider } from "../core/store.js";
import { NotifyProviderTypes } from "../core/types.js";
import { NotifyToasts } from "./NotifyToasts.js";

export const NotifyToastsProvider = ({
  children,
  position = "bottom-right",
  toastDuration = 5,
  animationEase = "spring",
  dismissable = true,
  icons = "visible",
  toastLimit = 10,
}: NotifyProviderTypes & { children: React.ReactNode }) => {
  return (
    <Provider
      config={{
        position,
        toastDuration,
        animationEase,
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
