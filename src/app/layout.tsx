import type { Metadata } from "next";
import {
  Antic_Didone,
  Brawler,
  Comic_Neue,
  Faculty_Glyphic,
  Geist,
  Geist_Mono,
  Host_Grotesk,
  IBM_Plex_Serif,
  Montserrat,
  Noto_Sans_Bamum,
  Plus_Jakarta_Sans,
  Roboto,
  Spectral,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Sidebar from "@/components/Sidebar";

const geistSans = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  preload: true,
  fallback: ["sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "My Album",
  description:
    "A horizontal scrolling editorial experience showcasing our wedding story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${geistSans.className} `} suppressHydrationWarning>

        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
