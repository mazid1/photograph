import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import NextAuthProvider from "@/context/NextAuthProvider";

export const metadata: Metadata = {
  title: { default: "Photograph", template: "%s | Photograph" },
  description: "Curated photography from around the world.",
};

export const revalidate = 60 * 60; // 1 hour

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto">{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
