import type { Metadata } from "next";
import QueryProvidor from "@/providers/query-provider";
import "@/styles/globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Portfolio Template | Professional & Modern",
  description: "A beautiful, responsive portfolio template built with Next.js, Tailwind CSS, and modern web technologies. Perfect for showcasing your work professionally.",
  keywords: ["portfolio", "template", "next.js", "tailwind", "responsive", "modern"],
  authors: [{ name: "Portfolio Template" }],
  creator: "Portfolio Template",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Portfolio Template | Professional & Modern",
    description: "A beautiful, responsive portfolio template built with Next.js, Tailwind CSS, and modern web technologies.",
    siteName: "Portfolio Template",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Template | Professional & Modern",
    description: "A beautiful, responsive portfolio template built with Next.js, Tailwind CSS, and modern web technologies.",
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
  verification: {
    google: "google-site-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#2563eb" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="antialiased">
        <QueryProvidor>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </QueryProvidor>
      </body>
    </html>
  );
}
