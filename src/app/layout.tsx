import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Photograph",
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
        <main className="max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
