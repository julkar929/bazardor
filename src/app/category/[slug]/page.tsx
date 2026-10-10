import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NotFoundView from "@/components/NotFoundView";
import SortableProducts from "@/components/SortableProducts";
import { getCategory, getProductsByCategory } from "@/lib/api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCategory(slug);
  return { title: c ? c.nameBn : "ক্যাটেগরি পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  const products = await getProductsByCategory(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-base-200 text-3xl">{category.icon}</span>
        <h1 className="text-3xl font-bold">{category.nameBn}</h1>
      </div>
      {products.length === 0 ? (
        <NotFoundView message="এই ক্যাটেগরিতে এখনো কোনো পণ্য নেই।" />
      ) : (
        <SortableProducts products={products} />
      )}
    </div>
  );
}
