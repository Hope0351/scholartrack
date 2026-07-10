import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

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
    "Find, evaluate, and apply to international scholarships with AI-powered matching, essay coaching, eligibility checks, mock interviews, and a complete application tracker. Built for African students.",
  keywords: [
    "scholarships for African students",
    "Mastercard Foundation",
    "Chevening",
    "Fulbright",
    "DAAD",
    "Rhodes Scholarship",
    "AI scholarship matcher",
    "SOP writing",
    "mock interview",
    "graduate school applications",
    "Africa education",
  ],
  authors: [{ name: "Hope0351" }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [{ url: "/logo.svg" }],
    shortcut: ["/favicon.svg"],
  },
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0A09" },
  ],
  width: "device-width",
  initialScale: 1,
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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
