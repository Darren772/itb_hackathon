import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "OnlyPeer — Temukan Tim Terbaikmu di ITB",
  description: "Swipe kelompok, ngobrol dulu, baru gabung. Nggak ada lagi teman sekelompok yang ghosting.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#7C3AED" />
      </head>
      <body className="font-sans bg-surface-0 text-ink-primary antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "12px",
              fontFamily: "var(--font-plus-jakarta), system-ui",
              fontSize: "14px",
              fontWeight: "500",
            },
          }}
        />
      </body>
    </html>
  );
}
