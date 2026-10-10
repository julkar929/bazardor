import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="লোড হচ্ছে…">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-box border border-base-300 bg-white p-4">
          <div className="flex gap-3">
            <div className="skeleton size-14 rounded-xl" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-base-300 pt-3">
            <div className="skeleton h-7 w-24" />
            <div className="skeleton h-6 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
