"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { fetchProductById, fetchRelatedProducts } from "@/services/productService";

export default function ProductDetail({ product }: { product: any }) {
  const [related, setRelated] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [adding, setAdding] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!product?.category) return;

    const loadData = async () => {
      try {
        const [relatedData, detailData] = await Promise.all([
          fetchRelatedProducts(product.category, product.id),
          fetchProductById(product.id),
        ]);

        setRelated(relatedData);

        // mock รีวิว
        setReviews([
          { name: "Alice", rating: 5, comment: "Very good product! Highly recommend." },
          { name: "John", rating: 4, comment: "Nice quality but shipping was slow." },
          { name: "Maria", rating: 5, comment: "Perfect fit and beautiful packaging!" },
          { name: "David", rating: 3, comment: "Average product, okay for the price." },
        ]);

        setError(null);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load product data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [product]);

  const handleAddToCart = () => {
    setAdding(true);
    setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const newItem = { ...product, quantity };
      localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
      setAdding(false);
      alert("Added to cart successfully!");
    }, 800);
  };

  if (error)
    return (
      <div className="p-10 text-center text-red-600 font-medium">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="block mx-auto mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-all duration-200"
        >
          Retry
        </button>
      </div>
    );

  if (loading)
    return (
      <div className="animate-pulse p-10 bg-white rounded-2xl shadow-md space-y-6">
        <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="space-y-16">
      {/*  Product Detail + Reviews (อยู่ใน section เดียวกัน) */}
      <section className="bg-white p-10 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
        {/* Product Info */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
          {/* รูปสินค้า */}
          <div className="flex justify-center items-center bg-gray-50 rounded-xl p-8 hover:scale-[1.02] transition-transform duration-300">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-sm h-96 object-contain"
            />
          </div>

          {/* รายละเอียดสินค้า */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
              {product.title}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.round(product.rating.rate)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[15px] text-slate-700 font-medium">
                  {product.rating.rate.toFixed(1)} / 5
                </span>
                <span className="text-gray-400 text-sm">
                  ({product.rating.count} reviews)
                </span>
              </div>
            )}

            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
              {product.category}
            </p>

            <p className="text-3xl font-bold text-blue-700 mt-3 mb-4">
              ${product.price}
            </p>

            <div className="text-slate-600 leading-relaxed text-[15px] mb-8 space-y-2">
              {product.description
                .split(/(?<=[.!?])\s+/)
                .map((sentence: string, index: number) => (
                  <p key={index}>{sentence.trim()}</p>
                ))}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-slate-700 font-semibold text-[15px]">Quantity:</p>
              <div className="flex items-center rounded-lg overflow-hidden border border-gray-300 bg-white shadow-sm">
                <button
                  onClick={decreaseQty}
                  className="px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  −
                </button>
                <span className="px-5 py-2 text-gray-800 font-semibold min-w-[50px] text-center bg-white">
                  {quantity}
                </span>
                <button
                  onClick={increaseQty}
                  className="px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* ปุ่ม Add to Cart */}
            <div className="flex flex-wrap gap-4 mb-4">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                {adding ? (
                  <span className="animate-pulse">Adding...</span>
                ) : (
                  <>
                    <ShoppingCart size={20} /> Add to Cart
                  </>
                )}
              </button>

              <Link
                href="/products"
                className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Back
              </Link>
            </div>
          </div>
        </div>

        {/* รีวิว */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-left">
            Customer Reviews
          </h2>

          <div className="flex flex-col space-y-5">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-slate-800">{r.name}</p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={16}
                        className={`${
                          j < r.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  {r.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="pt-10 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-white mb-6 text-left">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="bg-gray-50 rounded-lg p-4 shadow-sm hover:-translate-y-2 transform transition-transform duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 object-contain mx-auto mb-3"
                />
                <h3 className="text-slate-800 font-semibold text-sm line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-blue-600 font-bold mt-1">${item.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
