"use client";
import Link from "next/link";

export default function ProductDetail({ product }: { product: any }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-contain rounded-lg bg-gray-50 p-6"
        />
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">{product.title}</h1>
          <p className="capitalize text-slate-500 mb-2">Category: {product.category}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-4">${product.price}</p>
          <p className="text-slate-700 leading-relaxed mb-6">{product.description}</p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition">
              Add to Cart
            </button>
            <Link href="/products" className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-md font-medium transition">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
