import { useContext } from "react";
import { NotifyContext } from "./store.js";

export function useNotify() {
  const context = useContext(NotifyContext);
  if (!context) throw new Error("useNotify only works with NotifyProvider");
  const { toast } = context;
  return toast;
}
