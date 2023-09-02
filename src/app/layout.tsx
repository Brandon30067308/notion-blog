import "./globals.css";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"] as any,
});

export const metadata: Metadata = {
  title: "Doodle Blog",
  description: "Doodle Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <meta name="color-scheme" content="light only" />
      <body
        className={clsx(inter.className, "w-full text-gray-900")}
        suppressHydrationWarning={true}
      >
        <Nav />
        <main className="flex min-h-screen flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
