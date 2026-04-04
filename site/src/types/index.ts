import { AnimationEaseOptions } from "@/constants";
import { CSSProperties } from "react";
import { ToastDuration as DefaultToastDuration, ToastType } from "react-pings";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type Icons = "hidden" | "visible";
export type AnimationEase = (typeof AnimationEaseOptions)[number];
export type DefaultLanguage = "typescript" | "javascript";
export type ToastDuration = DefaultToastDuration;

type AdditionalTypes = "jsx" | "function" | "custom style" | "custom icon";

export type AdditionalToastTypes = AdditionalTypes | ToastType;

export interface AppState {
  defaultLanguage: DefaultLanguage;
  toastType: AdditionalToastTypes;
  position: ToastPosition;
  style?: CSSProperties | null;
  toastDuration: ToastDuration;
  animationEase: AnimationEase;
  dismissable: boolean;
  icons: Icons;
  toastsLimit: number;
  providerCode: string;
  usageCode: string;
}

export interface AppReducers {
  setDefaultLanguage: (language: DefaultLanguage) => void;
  setToastType: (type: AdditionalToastTypes) => void;
  setPosition: (position: ToastPosition) => void;
  setToastDuration: (duration: DefaultToastDuration) => void;
  setDismissable: (dismissable: boolean) => void;
  setIcons: (icons: "visible" | "hidden") => void;
  setToastLimit: (limit: number) => void;
  setAnimationEase: (animationEase: AnimationEase) => void;
  updateConfig: (config: Partial<AppState>) => void;
}

export type AppStore = AppState & AppReducers;

// store types end

export type CodeBlockProps = {
  languages?: ["javascript", "typescript"];
  children: string;
  fileName: string;
};
