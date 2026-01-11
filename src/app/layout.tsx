import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { BootSequence, Header, Footer } from "@/components/layout";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-ready-vault.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "AI-Ready Vault",
    template: "%s | AI-Ready Vault",
  },
  description:
    "Build an Obsidian vault optimized for AI collaboration. Structure, workflow, and memory systems for Claude and other AI assistants.",
  keywords: [
    "Obsidian",
    "AI",
    "Claude",
    "knowledge management",
    "PARA method",
    "second brain",
    "AI collaboration",
    "vault structure",
  ],
  authors: [{ name: "Metatron Collective", url: "https://metatron.sh" }],
  creator: "Metatron Collective",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AI-Ready Vault",
    title: "AI-Ready Vault",
    description:
      "Build an Obsidian vault optimized for AI collaboration. Structure, workflow, and memory systems for Claude.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI-Ready Vault - Terminal interface showing vault structure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Ready Vault",
    description:
      "Build an Obsidian vault optimized for AI collaboration with Claude.",
    images: ["/og-image.png"],
    creator: "@metatroncoll",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${ibmPlexMono.variable} font-mono antialiased min-h-screen bg-void flex flex-col`}
      >
        <BootSequence>
          <Header />
          {children}
          <Footer />
        </BootSequence>
      </body>
    </html>
  );
}
