import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../node_modules/react-pings/dist/index.css";
import "./globals.css";
import PingsProvider from "@/components/pings-provider";
import { Footer, Navbar } from "@/components";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-tahoma",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-courier",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReactPings - Toast Notification Library",
  description: "Modern toast notification library for react",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full w-full" style={{ background: "#D4D0C8" }}>
        <ThemeProvider attribute={"class"} defaultTheme="light" enableSystem={false}>
          <Navbar />
          <PingsProvider>{children}</PingsProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
