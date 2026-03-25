import Error from "../icons/Error.js";
import Info from "../icons/Info.js";
import Loading from "../icons/Loading.js";
import Success from "../icons/Success.js";
import Warning from "../icons/Warning.js";

export type ToastStyles = {
  success: string;
  error: string;
  warning: string;
  info: string;
  promise: string;
  blank: string;
  custom: string;
};

export type ToastIcons = {
  success: React.ElementType;
  error: React.ElementType;
  info: React.ElementType;
  warning: React.ElementType;
  promise: React.ElementType;
  blank: React.ElementType | null;
  custom: React.ElementType | null;
};

export type ToastPositions = {
  "top-left": string;
  "top-center": string;
  "top-right": string;
  "bottom-left": string;
  "bottom-center": string;
  "bottom-right": string;
};

export let TOAST_STYLES: ToastStyles = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-orange-500",
  info: "text-yellow-500",
  promise: "text-neutral-500",
  blank: "text-neutral-500",
  custom: "text-neutral-500",
};

export const setToastStyles = (styles: Partial<ToastStyles>) => {
  TOAST_STYLES = { ...TOAST_STYLES, ...styles };
};

export let TOAST_ICONS: ToastIcons = {
  success: Success,
  error: Error,
  info: Info,
  warning: Warning,
  promise: Loading,
  blank: null,
  custom: null,
};

export const setToastIcons = (icons: Partial<ToastIcons>) => {
  TOAST_ICONS = { ...TOAST_ICONS, ...icons };
};

export const TOAST_POSITION: ToastPositions = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
};
