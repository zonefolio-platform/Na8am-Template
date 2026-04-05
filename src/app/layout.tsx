// src/app/layout.tsx
import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import QueryProvidor from "@/providers/query-provider";
import "@/styles/globals.css";
import Footer from "@/components/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Na8am — Portfolio",
  description:
    "Na8am by ZoneFolio — a free portfolio template for developers, designers, and freelancers.",
  keywords: ["portfolio", "template", "na8am", "zonefolio", "developer"],
  authors: [{ name: "ZoneFolio" }],
  creator: "ZoneFolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Na8am — Portfolio",
    description: "A free portfolio template by ZoneFolio.",
    siteName: "Na8am",
  },
  twitter: {
    card: "summary_large_image",
    title: "Na8am — Portfolio",
    description: "A free portfolio template by ZoneFolio.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${syne.variable} ${dmSans.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0D1117" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="antialiased">
        <QueryProvidor>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </QueryProvidor>
      </body>
    </html>
  );
}
