import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="
        bg-white rounded-xl shadow-md hover:shadow-lg 
        transform transition-transform duration-300 
        hover:-translate-y-2 p-5 flex flex-col
      "
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-52 object-contain mb-4 mx-auto"
      />
      <h3 className="text-slate-800 font-semibold text-base line-clamp-2 mb-1">
        {product.title}
      </h3>
      <p className="text-blue-600 font-bold text-lg mb-3">${product.price}</p>
      <Link
        href={`/products/${product.id}`}
        className="
          mt-auto bg-blue-600 hover:bg-blue-700 
          text-white text-center py-2 rounded-md 
          font-medium transition-colors
        "
      >
        View Details
      </Link>
    </div>
  );
}
