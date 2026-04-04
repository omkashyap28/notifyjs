export const toastTypes = [
  "success",
  "error",
  "info",
  "warning",
  "promise",
  "blank",
  "jsx",
  "function",
  "custom icon",
  "custom style",
] as const;

export const toastPosition = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const;

export const AnimationEaseOptions = ["spring", "tween"] as const;
