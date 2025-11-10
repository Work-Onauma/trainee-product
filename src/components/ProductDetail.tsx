"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ProductDetail({ product }: { product: any }) {
  const [related, setRelated] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(1); // state สำหรับจำนวนสินค้า

  useEffect(() => {
    if (!product?.category) return;
    axios
      .get(`https://fakestoreapi.com/products/category/${product.category}`)
      .then((res) => {
        const filtered = res.data.filter((p: any) => p.id !== product.id);
        setRelated(filtered);
      })
      .catch((err) => console.error("Error loading related products:", err));
  }, [product]);

  // ฟังก์ชันเพิ่ม/ลดสินค้า
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="space-y-16">
      {/* Product Detail Section */}
      <section className="bg-white p-8 rounded-xl shadow-sm">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain rounded-lg bg-gray-50 p-6"
          />
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              {product.title}
            </h1>
            <p className="capitalize text-slate-500 mb-2">
              Category: {product.category}
            </p>
            <p className="text-2xl font-semibold text-blue-600 mb-4">
              ${product.price}
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mb-6">
              <p className="text-slate-700 font-medium">Quantity:</p>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={decreaseQty}
                  className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-l-md"
                >
                  −
                </button>
                <span className="px-4 py-1 text-gray-800 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={increaseQty}
                  className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart / Back */}
            <div className="flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition">
                Add to Cart
              </button>
              <Link
                href="/products"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-md font-medium transition"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
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
