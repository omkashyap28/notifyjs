import { useContext } from "react";
import { PingsContext } from "./store.js";

export function usePings() {
  const context = useContext(PingsContext);
  if (!context) throw new Error("useNotify only works with NotifyProvider");
  const { toast } = context;
  return toast;
}
