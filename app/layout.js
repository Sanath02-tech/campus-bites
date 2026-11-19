import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata = {
  title: "CampusBites — Pre-order from your campus canteen",
  description: "Order canteen food ahead and pick it up without waiting in the queue.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Providers>
          <Suspense fallback={<div className="h-[53px] border-b border-border" />}>
            <Navbar />
          </Suspense>
          <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
