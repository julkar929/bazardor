import Link from "next/link";

export default function NotFoundView({ message = "দুঃখিত, আপনার খোঁজা পাতাটি পাওয়া যায়নি।" }: { message?: string }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <div className="text-7xl">🧺</div>
      <p className="mt-4 text-5xl font-bold text-primary">৪০৪</p>
      <h1 className="mt-2 text-xl font-semibold">পাতাটি পাওয়া যায়নি</h1>
      <p className="mt-2 text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-6">হোম পেজে ফিরে যান</Link>
    </div>
  );
}
