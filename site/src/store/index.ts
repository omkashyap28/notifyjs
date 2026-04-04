import { create } from "zustand";
import { AppStore, AppState } from "@/types";
import {
  generateAllCodes,
  generateProviderCode,
  generateUsageCode,
} from "@/utils";

const initialState: Omit<AppState, "providerCode" | "usageCode"> = {
  defaultLanguage: "typescript",
  toastType: "success",
  position: "top-center",
  style: null,
  toastDuration: 5,
  animationEase: "spring",
  dismissable: false,
  icons: "visible",
  toastsLimit: 10,
};

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,

  // Initialize strings based on default state
  providerCode: generateProviderCode(initialState),
  usageCode: generateUsageCode(initialState),

  setDefaultLanguage: (defaultLanguage) => set({ defaultLanguage }),

  setToastType: (toastType) =>
    set((state) => {
      const newState = { ...state, toastType };
      return {
        ...newState,
        usageCode: generateUsageCode(newState),
      };
    }),

  setPosition: (position) =>
    set((state) => ({
      position,
      providerCode: generateProviderCode({ ...state, position }),
    })),

  setToastDuration: (toastDuration) =>
    set((state) => ({
      toastDuration,
      providerCode: generateProviderCode({ ...state, toastDuration }),
    })),

  setDismissable: (dismissable) =>
    set((state) => ({
      dismissable,
      providerCode: generateProviderCode({ ...state, dismissable }),
    })),

  setIcons: (icons) =>
    set((state) => ({
      icons,
      providerCode: generateProviderCode({ ...state, icons }),
    })),

  setToastLimit: (toastsLimit) =>
    set((state) => ({
      toastsLimit,
      providerCode: generateProviderCode({ ...state, toastsLimit }),
    })),
  setAnimationEase: (animationEase) =>
    set((state) => ({
      animationEase,
      providerCode: generateProviderCode({ ...state, animationEase }),
    })),

  updateConfig: (config) => {
    set((state) => {
      const newState = { ...state, ...config };
      return {
        ...newState,
        ...generateAllCodes(newState),
      };
    });
  },
}));
