import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/signin?redirect=/profile&reason=login-required");
  const { user } = session;

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="rounded-box border border-base-300 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-content">
          {(user.name || "?").charAt(0).toUpperCase()}
        </div>
        <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
        <p className="text-base-content/70">{user.email}</p>
        <Link href="/profile/update" className="btn btn-primary mt-6">তথ্য আপডেট করুন</Link>
      </div>
    </div>
  );
}
