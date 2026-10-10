import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, unitLabel } from "@/lib/format";
import PriceBadge from "./PriceBadge";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group block rounded-box border border-base-300 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-base-200 text-3xl">{p.image}</div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-base-content group-hover:text-primary">{p.nameBn}</h3>
          <p className="text-sm text-base-content/60">{unitLabel(p.unit)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2 border-t border-base-300 pt-3">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-lg font-bold text-primary">{formatPrice(p.today)} টাকা</p>
        </div>
        <PriceBadge change={p.change} />
      </div>
    </Link>
  );
}
