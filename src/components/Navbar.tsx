"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Poppins } from "next/font/google";
import axios from "axios";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); //  สำหรับ fade-out
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("search");
    if (q) setSearch(q);
  }, [searchParams]);

  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      router.push("/products");
      return;
    }

    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const filtered = res.data
          .map((p: any) => p.title)
          .filter((title: string) =>
            title.toLowerCase().includes(search.toLowerCase())
          )
          .slice(0, 5);
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      })
      .catch(() => setSuggestions([]));
  }, [search]);

  // gมื่อกด Search หรือ Enter
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const term =
      highlightIndex >= 0 ? suggestions[highlightIndex] : search.trim();
    if (!term) return;

    // เริ่ม fade-out ก่อน
    setFadeOut(true);
    setTimeout(() => {
      setShowSuggestions(false);
      setSuggestions([]);
      setHighlightIndex(-1);
      inputRef.current?.blur();
    }, 200); // 0.2 วินาที

    router.push(`/products?search=${encodeURIComponent(term)}`);
  };

  // เมื่อคลิก suggestion
  const handleSuggestionClick = (value: string) => {
    setFadeOut(true);
    setTimeout(() => {
      setSearch(value);
      setShowSuggestions(false);
      setSuggestions([]);
      setHighlightIndex(-1);
      inputRef.current?.blur();
      router.push(`/products?search=${encodeURIComponent(value)}`);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-blue-600 via-blue-800 to-indigo-950 shadow-lg">
      <div className="relative container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/products"
          onClick={() => {
            setSearch("");
            setSuggestions([]);
            setShowSuggestions(false);
            setHighlightIndex(-1);
            inputRef.current?.blur();
          }}
          className={`${poppins.className} text-3xl font-bold text-white tracking-tight hover:opacity-90 transition`}
        >
          ShopEase
        </Link>

        {/* Search bar */}
        <div className="hidden sm:block absolute left-[55%] lg:left-[52%] xl:left-1/2 transform -translate-x-1/2 transition-all duration-300">
          <div className="relative">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white rounded-md shadow-md
                focus-within:ring-2 focus-within:ring-blue-300 
                transition-all duration-300 px-2 py-1
                w-[600px] xl:w-[550px] lg:w-[480px] md:w-[400px] sm:w-[320px]"
            >
              <div className="flex items-center flex-1 space-x-2">
                <Search className="w-5 h-5 text-blue-500" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setHighlightIndex(-1);
                    setFadeOut(false);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  onKeyDown={handleKeyDown}
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

            {/* Suggestion dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                className={`absolute left-0 right-0 bg-white mt-1 rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto transform transition-all duration-200 ${
                  fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              >
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      i === highlightIndex
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-blue-50 text-gray-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-white hover:opacity-80 transition"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
}
