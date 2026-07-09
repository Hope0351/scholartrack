import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScholarTrack Africa — AI-Powered Scholarships for African Students",
  description:
    "Find, evaluate, and apply to international scholarships with AI-powered matching, essay coaching, eligibility checks, and a complete application tracker. Built for African students.",
  keywords: [
    "scholarships for African students",
    "Mastercard Foundation",
    "Chevening",
    "Fulbright",
    "DAAD",
    "Rhodes Scholarship",
    "AI scholarship matcher",
    "SOP writing",
    "graduate school applications",
    "Africa education",
  ],
  authors: [{ name: "Hope0351" }],
  openGraph: {
    title: "ScholarTrack Africa",
    description: "AI-powered scholarship platform for African students.",
    url: "https://github.com/Hope0351/scholartrack",
    siteName: "ScholarTrack Africa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScholarTrack Africa",
    description: "AI-powered scholarship platform for African students.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
