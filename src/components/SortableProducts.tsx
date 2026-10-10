"use client";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import ProductGrid, { SkeletonGrid } from "./ProductGrid";
import { toBn } from "@/lib/format";

type Sort = "default" | "asc" | "desc";

export default function SortableProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  // Sort by the numeric `today` value (never by the Bengali-formatted string).
  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => a.today - b.today);
    if (sort === "desc") list.sort((a, b) => b.today - a.today);
    return list;
  }, [products, sort]);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-base-content/60">মোট {toBn(products.length)}টি পণ্য</p>
        <label className="flex items-center gap-2 text-sm font-medium">
          সাজান:
          <select
            className="select select-sm sm:select-md w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="সাজান"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      {ready ? <ProductGrid products={sorted} /> : <SkeletonGrid count={Math.min(products.length, 8)} />}
    </>
  );
}
