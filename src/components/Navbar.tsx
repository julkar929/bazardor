"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Category } from "@/lib/types";
import { signOut, useSession } from "@/lib/auth-client";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date()),
    );
  }, []);

  const handleSignOut = async () => {
    (document.activeElement as HTMLElement | null)?.blur();
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      {/* Row 1: logo + date (left), auth (right) */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-xl shadow-sm">🛒</span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <span className="block min-h-4 text-xs text-base-content/60">{date}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-9 w-28 rounded-lg" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex cursor-pointer items-center gap-2 rounded-full py-1 pr-2 pl-1 text-sm font-medium hover:bg-base-200">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt="" className="size-9 rounded-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary font-bold text-primary-content">
                    {(user.name || "?").charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="max-w-28 truncate">{user.name}</span>
                <span className="text-[10px] text-base-content/50">▾</span>
              </div>
              <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-48 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                <li><Link href="/profile">আমার প্রোফাইল</Link></li>
                <li><button onClick={handleSignOut}>সাইন আউট</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm btn-ghost sm:btn-md">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-sm btn-primary sm:btn-md">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      {/* Row 2: category menu below the logo */}
      <div className="border-t border-base-300/60">
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 [scrollbar-width:none] md:justify-center" aria-label="ক্যাটেগরি">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition ${
                  active ? "border-primary font-semibold text-primary" : "border-transparent text-base-content/80 hover:text-primary"
                }`}
              >
                <span>{c.icon}</span> {c.nameBn}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
