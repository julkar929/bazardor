const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(input: number | string): string {
  return String(input).replace(/\d/g, (d) => BN[Number(d)]);
}

/** Bengali digits with Indian-style grouping, e.g. 1850 -> ১,৮৫০ */
export function formatPrice(n: number): string {
  return toBn(Math.round(n).toLocaleString("en-IN"));
}

export function formatPct(pct: number): string {
  return toBn(Math.abs(pct).toFixed(1));
}

export const UNIT_LABEL: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};
export const UNIT_SHORT: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};
export const unitLabel = (u: string) => UNIT_LABEL[u] ?? `প্রতি ${u}`;
export const unitShort = (u: string) => UNIT_SHORT[u] ?? u;
