"use client";
import { useAppStore } from "@/store";
import { PingsToastsProvider } from "react-pings";

export default function PingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const position = useAppStore((state) => state.position);
  const toastDuration = useAppStore((state) => state.toastDuration);
  const animationEase = useAppStore((state) => state.animationEase);
  const dismissable = useAppStore((state) => state.dismissable);
  const icons = useAppStore((state) => state.icons);
  const toastsLimit = useAppStore((state) => state.toastsLimit);
  const style = useAppStore((state) => state.style);
  return (
    <PingsToastsProvider
      position={position}
      toastLimit={toastsLimit}
      dismissable={dismissable}
      icons={icons}
      animationEase={animationEase}
      toastDuration={toastDuration}
      style={style}
    >
      {children}
    </PingsToastsProvider>
  );
}
