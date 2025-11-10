"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Poppins } from "next/font/google";

// ฟอนต์โลโก้
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ ดึงค่าจาก URL กลับมาในช่องค้นหา
  useEffect(() => {
    const q = searchParams.get("search");
    if (q) setSearch(q);
  }, [searchParams]);

  // ✅ กด Search แล้วเปลี่ยนหน้าแบบไม่รีโหลด
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-blue-600 via-blue-800 to-indigo-950 shadow-lg">
      <div className="relative container mx-auto flex items-center justify-between px-6 py-4">
        {/* 🛍️ Left Section: Logo */}
        <Link
          href="/"
          className={`${poppins.className} text-3xl font-bold text-white tracking-tight hover:opacity-90 transition`}
        >
          ShopEase
        </Link>

        {/* 🔍 Center Section: Search bar (Absolute Center) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white rounded-md w-[600px] shadow-md 
                       focus-within:ring-2 focus-within:ring-blue-300 
                       transition-all duration-200 px-2 py-1"
          >
            <div className="flex items-center flex-1 space-x-2">
              <Search className="w-5 h-5 text-blue-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[15px] text-gray-800 placeholder:text-gray-500"
              />
            </div>
            <button
              type="submit"
              className="ml-2 bg-blue-600 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-1.5 rounded-md transition-all duration-200 shadow-sm"
            >
              Search
            </button>
          </form>
        </div>

        {/* ☰ Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white hover:opacity-80 transition"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

    {/* 📱 Mobile Dropdown */}
{open && (
  <div className="md:hidden bg-gradient-to-b from-blue-500 to-indigo-700 border-t border-blue-300/40 shadow-inner animate-fadeIn">
    {/* 🔍 Mobile Search */}
    <div className="flex justify-center px-4 pt-4 pb-3">
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-lg w-full max-w-md px-3 py-2 shadow-md
                   focus-within:ring-2 focus-within:ring-blue-300 transition-all duration-200"
      >
        <Search className="w-5 h-5 text-blue-500 mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none text-base text-gray-800 placeholder:text-gray-500"
        />
        <button
          type="submit"
          className="ml-3 bg-blue-600 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-md transition-all duration-200 shadow-sm"
        >
          Search
        </button>
      </form>
    </div>
  </div>
)}
    </nav>
  );
}
