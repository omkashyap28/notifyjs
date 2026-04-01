"use server";

import { Provider } from "../core/store.js";
import { PingsProviderTypes } from "../core/types.js";
import { PingsToasts } from "./PingToasts.js";

export const PingsToastsProvider = ({
  children,
  position = "bottom-right",
  toastDuration = 5,
  animationEase = "spring",
  dismissable = true,
  icons = "visible",
  toastLimit = 10,
  top = "1rem"
}: PingsProviderTypes & { children: React.ReactNode }) => {
  return (
    <Provider
      config={{
        position,
        top,
        toastDuration,
        animationEase,
        dismissable,
        icons,
        toastLimit,
      }}
    >
      {children}
      <PingsToasts />
    </Provider>
  );
};
