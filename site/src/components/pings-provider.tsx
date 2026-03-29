"use client";
import { PingsToastsProvider } from "react-pings";

export default function PingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PingsToastsProvider position="top-center" dismissable={false}>{children}</PingsToastsProvider>;
}
