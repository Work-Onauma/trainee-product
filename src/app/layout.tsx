import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ShopEase | Modern Store",
  description: "Beautiful Product Showcase with Next.js & Tailwind",
  icons: {
    icon: "/favicon.png", // เพิ่ม favicon ที่นี่ (ใช้ไฟล์ใน /public)
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* เพิ่ม fallback favicon tag สำหรับเบราว์เซอร์ที่ไม่รองรับ metadata */}
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>

      <body className="bg-gray-50 text-slate-800 antialiased">
        <Navbar />
        <main className="min-h-screen container mx-auto px-6 py-10">
          {children}
        </main>
        <footer className="text-center py-6 text-sm text-slate-500 border-t mt-10">
          {new Date().getFullYear()} ShopEase — Built with & Next.js
        </footer>
      </body>
    </html>
  );
}
