import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://waitlist.mceltech.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Productivity & Digital Innovation Bootcamp | M-CEL TECH",
  description:
    "Join the waitlist for M-CEL TECH's hybrid AI Productivity & Digital Innovation Bootcamp. Learn Prompt Engineering, Cinematic AI Video Generation, Vibe Coding, AI Automation, and Project Management for ₦15,000.",
  keywords: [
    "M-CEL TECH",
    "AI Bootcamp",
    "Prompt Engineering",
    "AI Automation",
    "Vibe Coding",
    "Digital Innovation",
    "Nigeria tech training",
  ],
  authors: [{ name: "M-CEL TECH" }],
  openGraph: {
    title: "AI Productivity & Digital Innovation Bootcamp | M-CEL TECH",
    description:
      "Join the waitlist for M-CEL TECH's hybrid AI Productivity & Digital Innovation Bootcamp.",
    url: siteUrl,
    siteName: "M-CEL TECH",
    type: "website",
    locale: "en_NG",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Productivity & Digital Innovation Bootcamp | M-CEL TECH",
    description:
      "Join the waitlist for M-CEL TECH's hybrid AI Productivity & Digital Innovation Bootcamp.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
