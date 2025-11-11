"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductDetail from "@/components/ProductDetail";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
        setError(null); 
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again later.");
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (error)
    return (
      <div className="text-center text-red-500 mt-10 text-lg font-medium">
        {error}
      </div>
    );

  if (!product)
    return (
      <div className="text-center text-slate-500 mt-10 text-lg">
        Loading...
      </div>
    );

  return <ProductDetail product={product} />;
}
