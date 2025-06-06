import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope, Space_Grotesk } from "next/font/google";

import "@/styles/globals.css";

import RootProviders from "@/components/providers";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

// const fontSans = Manrope({
//   variable: "--font-sans",
//   subsets: ["latin"],
// });

// const fontMono = JetBrains_Mono({
//   variable: "--font-mono",
//   subsets: ["latin"],
// });

// const fontHeading = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: siteConfig.name,
  icons: {
    icon: "/goku.svg",
    shortcut: "/goku.svg",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.origin,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.og,
        width: 2880,
        height: 1800,
        alt: siteConfig.name,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.socials.x,
    title: siteConfig.title,
    description: siteConfig.description,
    images: {
      url: siteConfig.og,
      width: 2880,
      height: 1800,
      alt: siteConfig.name,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", spaceGrotesk.className)}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
