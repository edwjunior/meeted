import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eduard Puig Valls — Digital Experience Engineer",
  description:
    "Portfolio of Eduard Puig Valls, Digital Experience Engineer specializing in enterprise portals, AI & LLM solutions, and technical leadership. Based in Barcelona.",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Eduard Puig Valls — Digital Experience Engineer",
    description:
      "Enterprise portals, AI & LLM solutions and technical leadership. Based in Barcelona.",
  },
};

export const viewport: Viewport = {
  themeColor: "#07091c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
