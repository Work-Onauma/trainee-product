"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    Promise.all([
      axios.get("https://fakestoreapi.com/products"),
      axios.get("https://fakestoreapi.com/products/categories"),
    ])
      .then(([p, c]) => {
        setProducts(p.data);
        setCategories(c.data);
      })
      .catch(() =>
        setError("❌ Failed to load products. Please check your connection.")
      )
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "all" || p.category === selectedCategory)
  );

  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-red-600">
        {error}
        <button
          className="block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-center text-slate-900 dark:text-white mb-6">
        🛒 Our Products
        <span className="block mx-auto mt-2 w-24 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-md border ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`capitalize px-4 py-2 rounded-md border ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
            }`}
          >
            {cat.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {filtered.length > 0 ? (
          filtered.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p className="text-center text-slate-500 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
