import { ReactNode } from "react";
import { Provider } from "../core/store.js";
import { NotifyProviderTypes } from "../core/types.js";

const NotifyProvider = ({
  children,
  ...config
}: NotifyProviderTypes & { children: ReactNode }) => {
  return <Provider config={config}>{children}</Provider>;
};

export default NotifyProvider;
