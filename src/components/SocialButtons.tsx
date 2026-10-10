"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const [busy, setBusy] = useState<string | null>(null);

  const go = async (provider: "google" | "github") => {
    setBusy(provider);
    try {
      const res = await signIn.social({ provider, callbackURL });
      if (res?.error) throw new Error(res.error.message);
    } catch {
      toast.error(`${provider === "google" ? "Google" : "GitHub"} লগইন এখন চালু নেই। ইমেইল ও পাসওয়ার্ড ব্যবহার করুন।`);
      setBusy(null);
    }
  };

  return (
    <div className="grid gap-3">
      <button type="button" onClick={() => go("google")} disabled={!!busy} className="btn btn-outline w-full">
        {busy === "google" ? <span className="loading loading-spinner loading-sm" /> : <span className="font-bold text-[#ea4335]">G</span>}
        Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" onClick={() => go("github")} disabled={!!busy} className="btn btn-outline w-full">
        {busy === "github" ? <span className="loading loading-spinner loading-sm" /> : <span>🐙</span>}
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
