export default function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-box border border-base-300 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 text-center">
          <div className="text-4xl">🛒</div>
          <h1 className="mt-2 text-2xl font-bold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-base-content/60">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
