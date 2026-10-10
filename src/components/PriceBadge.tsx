import { formatPct } from "@/lib/format";
import type { Product } from "@/lib/types";

/** Price up = red ▲ (bad for buyers), price down = green ▼ (good for buyers). */
export default function PriceBadge({ change }: { change: Product["change"] }) {
  const cls =
    change.dir === "up"
      ? "bg-error/10 text-error"
      : change.dir === "down"
        ? "bg-success/10 text-success"
        : "bg-base-300 text-base-content/60";
  const label =
    change.dir === "up"
      ? `▲ ${formatPct(change.pct)}%`
      : change.dir === "down"
        ? `▼ ${formatPct(change.pct)}%`
        : `— ${formatPct(0)}%`;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${cls}`}>
      {label}
    </span>
  );
}
