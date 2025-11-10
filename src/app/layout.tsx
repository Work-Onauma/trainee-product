import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ShopEase | Modern Store",
  description: "Beautiful Product Showcase with Next.js & Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-slate-800 antialiased">
        <Navbar />
        <main className="min-h-screen container mx-auto px-6 py-10">
          {children}
        </main>
        <footer className="text-center py-6 text-sm text-slate-500 border-t mt-10">
          © {new Date().getFullYear()} ShopEase — Built with ❤️ & Next.js
        </footer>
      </body>
    </html>
  );
}
