"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthCard from "@/components/AuthCard";
import SocialButtons from "@/components/SocialButtons";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fail = (m: string) => {
    setError(m);
    toast.error(m);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    if (!name) return fail("আপনার নাম দিন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("সঠিক ইমেইল দিন");
    if (password.length < 6) return fail("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);
    if (error) return fail(error.message || "রেজিস্ট্রেশন সম্পন্ন করা যায়নি");
    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin?registered=1");
  }

  return (
    <AuthCard title="সাইন আপ" subtitle="নতুন অ্যাকাউন্ট তৈরি করুন">
      <form onSubmit={onSubmit} className="grid gap-4" noValidate>
        <label className="grid gap-1 text-sm font-medium">
          নাম
          <input name="name" type="text" autoComplete="name" placeholder="আপনার নাম" className="input w-full" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          ইমেইল
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="input w-full" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          পাসওয়ার্ড
          <input name="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৬ অক্ষর" className="input w-full" />
        </label>
        {error && <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />} রেজিস্টার করুন
        </button>
      </form>
      <div className="divider text-xs">অথবা</div>
      <SocialButtons />
      <p className="mt-6 text-center text-sm">
        আগে থেকেই অ্যাকাউন্ট আছে? <Link href="/signin" className="font-semibold text-primary hover:underline">সাইন ইন করুন</Link>
      </p>
    </AuthCard>
  );
}
