import { Provider } from "../core/store.js";
import { NotifyProviderTypes } from "../core/types.js";
import { Container } from "./Container.js";

export const NotifyToasts = ({
  position = "top-center",
  radius = "sm",
  toastDuration = 5,
  ease = "ease-in",
  border = "animated",
  dismissable = true,
  icons = "visible",
  toastLimit = 20,
}: NotifyProviderTypes) => {
  return (
    <Provider
      config={{
        position,
        radius,
        toastDuration,
        ease,
        border,
        dismissable,
        icons,
        toastLimit,
      }}
    >
      <Container />
    </Provider>
  );
};
