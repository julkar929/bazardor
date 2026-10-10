"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthCard from "@/components/AuthCard";
import { updateUser } from "@/lib/auth-client";

export default function UpdateForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম খালি রাখা যাবে না");
    setLoading(true);
    const { error } = await updateUser({ name: name.trim() });
    setLoading(false);
    if (error) return toast.error(error.message || "আপডেট করা যায়নি");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <AuthCard title="তথ্য আপডেট করুন">
      <form onSubmit={onSubmit} className="grid gap-4">
        <label className="grid gap-1 text-sm font-medium">
          নাম
          <input value={name} onChange={(e) => setName(e.target.value)} className="input w-full" />
        </label>
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />} তথ্য আপডেট করুন
        </button>
        <Link href="/profile" className="btn btn-ghost w-full">বাতিল</Link>
      </form>
    </AuthCard>
  );
}
