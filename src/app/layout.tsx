import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import TargetCursor from "@/components/interactions/TargetCursor";
import "./globals.css";

// Variable names match the design system's tailwind-theme.css (--font-geist-sans / --font-geist-mono)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eduard Puig Valls | Digital Experience Engineer",
  description:
    "Portfolio of Eduard Puig Valls, Digital Experience Engineer building enterprise portals, AI and LLM solutions. Based in Barcelona.",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Eduard Puig Valls | Digital Experience Engineer",
    description: "Enterprise portals, AI and LLM solutions, and technical leadership. Based in Barcelona.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <TargetCursor />
      </body>
    </html>
  );
}
