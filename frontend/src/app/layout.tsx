import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "OnlyPeer — Find Your Team at ITB",
  description: "Campus group matchmaking for ITB students. Swipe on groups, chat first, then join.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-slate-50 text-slate-900 antialiased`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
