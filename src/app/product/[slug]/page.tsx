import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import PriceBadge from "@/components/PriceBadge";
import { getProduct } from "@/lib/api";
import { formatPrice, toBn, unitLabel } from "@/lib/format";
import { getSession } from "@/lib/session";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  return { title: p ? p.nameBn : "পণ্য পাওয়া যায়নি" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await getSession();
  if (!session) redirect(`/signin?redirect=${encodeURIComponent(`/product/${slug}`)}&reason=login-required`);

  const p = await getProduct(slug);
  if (!p) notFound();

  const min = Math.min(...p.markets.map((m) => m.min));
  const max = Math.max(...p.markets.map((m) => m.max));
  const avg = p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / p.markets.length;
  const divisions = [...new Set(p.markets.map((m) => m.division))];
  const history = [
    { label: "আজ", value: p.today },
    { label: "গতকাল", value: p.yesterday },
    { label: "গত সপ্তাহ", value: p.lastWeek },
    { label: "গত মাস", value: p.lastMonth },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href={`/category/${p.category}`} className="text-sm text-primary hover:underline">← {p.categoryNameBn}</Link>

      <section className="mt-4 flex flex-col gap-5 rounded-box border border-base-300 bg-white p-5 sm:flex-row sm:items-center">
        <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-6xl">{p.image}</div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{p.nameBn}</h1>
          <p className="mt-1 text-base-content/70">
            {toBn(p.markets.length)}টি বাজারের তথ্য অনুযায়ী আজকের গড় দাম {formatPrice(avg)} টাকা, {unitLabel(p.unit)}।
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Link href={`/category/${p.category}`} className="badge badge-primary badge-outline">{p.categoryIcon} {p.categoryNameBn}</Link>
            <span className="badge badge-ghost">{unitLabel(p.unit)}</span>
          </div>
        </div>
        <div className="sm:text-right">
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-3xl font-bold text-primary">{formatPrice(p.today)} টাকা</p>
          <div className="mt-1"><PriceBadge change={p.change} /></div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "সর্বনিম্ন দাম", value: min, tone: "text-success" },
          { label: "সর্বোচ্চ দাম", value: max, tone: "text-error" },
          { label: "গড় দাম", value: avg, tone: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="rounded-box border border-base-300 bg-white p-5">
            <p className="text-sm text-base-content/60">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.tone}`}>{formatPrice(s.value)} টাকা</p>
            <p className="text-xs text-base-content/50">{unitLabel(p.unit)}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {history.map((h) => (
          <div key={h.label} className="rounded-box bg-base-200 p-3 text-center">
            <p className="text-xs text-base-content/60">{h.label}</p>
            <p className="font-semibold">{formatPrice(h.value)} টাকা</p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="space-y-6">
          {divisions.map((d) => (
            <div key={d}>
              <h3 className="mb-2 font-semibold text-primary">📍 {d} বিভাগ</h3>
              <div className="overflow-x-auto rounded-box border border-base-300 bg-white">
                <table className="table">
                  <thead>
                    <tr><th>বাজার</th><th className="text-right">সর্বনিম্ন</th><th className="text-right">সর্বোচ্চ</th><th className="text-right">গড়</th></tr>
                  </thead>
                  <tbody>
                    {p.markets.filter((m) => m.division === d).map((m) => (
                      <tr key={m.market}>
                        <td className="font-medium">{m.market}</td>
                        <td className="text-right text-success">{formatPrice(m.min)} টাকা</td>
                        <td className="text-right text-error">{formatPrice(m.max)} টাকা</td>
                        <td className="text-right font-semibold">{formatPrice((m.min + m.max) / 2)} টাকা</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
