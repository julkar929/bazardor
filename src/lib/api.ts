import type { Category, Product } from "./types";
import fallbackProducts from "../../data/products.json";
import fallbackCategories from "../../data/categories.json";

const BASES = [
  process.env.BAZARDOR_API_URL || "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function get<T>(path: string): Promise<T | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) return (await res.json()) as T;
    } catch {
      /* try next base */
    }
  }
  return null;
}

/** Live API first, bundled snapshot of the same API as a safety net. */
export async function getProducts(): Promise<Product[]> {
  return (await get<Product[]>("/products")) ?? (fallbackProducts as Product[]);
}

export async function getCategories(): Promise<Category[]> {
  return (await get<Category[]>("/categories")) ?? (fallbackCategories as Category[]);
}

export async function getCategory(slug: string): Promise<Category | null> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === slug);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}
