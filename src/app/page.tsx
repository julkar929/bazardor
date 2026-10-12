import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();
  const risers = products.filter((p) => p.change.dir === "up").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);
  const fallers = products.filter((p) => p.change.dir === "down").sort((a, b) => a.change.pct - b.change.pct).slice(0, 6);

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl space-y-12 px-4 pt-10">
        <section>
          <SectionHeader title={<><span className="mr-1 text-error">▲</span>আজ দাম বেড়েছে</>} subtitle="গতকালের তুলনায় সবচেয়ে বেশি দাম বেড়েছে যেসব পণ্যের" />
          <ProductGrid products={risers} />
        </section>
        <section>
          <SectionHeader title={<><span className="mr-1 text-success">▼</span>আজ দাম কমেছে</>} subtitle="গতকালের তুলনায় সবচেয়ে বেশি দাম কমেছে যেসব পণ্যের" />
          <ProductGrid products={fallers} />
        </section>
        <section>
          <SectionHeader id="all" title="সব পণ্য" subtitle="সব ক্যাটেগরির নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম" />
          <ProductGrid products={products} />
        </section>
      </div>
    </>
  );
}
