import Image from "next/image";

export default function Hero() {
  // Fixed to Bangladesh time so server and browser render the same text.
  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 sm:pt-8">
      <div className="grid items-center gap-6 rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8 md:grid-cols-[1.4fr_1fr] md:p-10">
        <div>
          <p suppressHydrationWarning className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {today}
          </p>
          <h1 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-[2.6rem]">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-4 max-w-xl text-base text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও দুধ — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#all" className="btn btn-primary mt-6 shadow-md">সব পণ্য দেখুন</a>
        </div>
        <div className="flex justify-center">
          <Image src="/hero.png" alt="ফল ও সবজির ঝুড়ি" width={320} height={260} priority className="h-auto w-full max-w-xs md:max-w-sm" />
        </div>
      </div>
    </section>
  );
}
