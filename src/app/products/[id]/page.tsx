"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductDetail from "@/components/ProductDetail";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product)
    return <div className="text-center text-slate-500 mt-10 text-lg">Loading...</div>;

  return <ProductDetail product={product} />;
}
