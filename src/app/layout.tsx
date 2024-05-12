import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import { Providers } from "@/context/Providers";

export const metadata: Metadata = {
  title: { default: "Photograph", template: "%s | Photograph" },
  description: "Curated photography from around the world.",
};

export const revalidate = 60 * 60 * 24; // 1 day

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="max-w-6xl mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
