"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import AuthCard from "@/components/AuthCard";
import SocialButtons from "@/components/SocialButtons";
import { signIn } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect");
  const target = redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;
    shown.current = true;
    if (params.get("reason") === "login-required") toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন");
    if (params.get("registered")) toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
  }, [params]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    if (!email || !password) {
      const m = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(m);
      toast.error(m);
      return;
    }
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);
    if (error) {
      const m = "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
      setError(m);
      toast.error(m);
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(target);
    router.refresh();
  }

  return (
    <AuthCard title="সাইন ইন" subtitle="আপনার অ্যাকাউন্টে প্রবেশ করুন">
      <form onSubmit={onSubmit} className="grid gap-4" noValidate>
        <label className="grid gap-1 text-sm font-medium">
          ইমেইল
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="input w-full" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          পাসওয়ার্ড
          <input name="password" type="password" autoComplete="current-password" placeholder="••••••" className="input w-full" />
        </label>
        {error && <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />} সাইন ইন
        </button>
      </form>
      <div className="divider text-xs">অথবা</div>
      <SocialButtons callbackURL={target} />
      <p className="mt-6 text-center text-sm">
        অ্যাকাউন্ট নেই? <Link href="/signup" className="font-semibold text-primary hover:underline">সাইন আপ করুন</Link>
      </p>
    </AuthCard>
  );
}
