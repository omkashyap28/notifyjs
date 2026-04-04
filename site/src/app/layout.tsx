import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PingsProvider from "@/components/pings-provider";
import { Footer, Navbar } from "@/components";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Pings",
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
      className={`bg-background text-foreground ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full w-full" cz-shortcut-listen="true">
        <NextThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <PingsProvider>{children}</PingsProvider>
          <Footer />
        </NextThemeProvider>
      </body>
    </html>
  );
}
