import type { Metadata } from "next";
import QueryProvidor from "@/providers/query-provider";
import "@/styles/globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Portfolio Template",
  description: "Boilerplate Next.js Portfolio Template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvidor>
          {children}
          <Footer />
        </QueryProvidor>
      </body>
    </html>
  );
}
