import type { Product } from "@/lib/types";
import { formatPct, formatPrice, unitShort } from "@/lib/format";

function Item({ p }: { p: Product }) {
  const color = p.change.dir === "up" ? "text-error" : p.change.dir === "down" ? "text-success" : "text-base-content/50";
  const arrow = p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—";
  return (
    <span className="inline-flex items-center gap-2 px-5 text-sm whitespace-nowrap">
      <span className="text-lg">{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span className="font-bold text-primary">
        {formatPrice(p.today)} টাকা/{unitShort(p.unit)}
      </span>
      <span className={`font-semibold ${color}`}>
        {arrow} {formatPct(p.change.pct)}%
      </span>
    </span>
  );
}

export default function Ticker({ products }: { products: Product[] }) {
  return (
    <div className="ticker-wrap overflow-hidden border-b border-base-300 bg-white py-2" aria-label="আজকের দামের তালিকা">
      <div className="ticker-track flex">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 divide-x divide-base-300" aria-hidden={k === 1}>
            {products.map((p) => (
              <Item key={`${k}-${p.id}`} p={p} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
