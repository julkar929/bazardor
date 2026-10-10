export default function SectionHeader({ id, title, subtitle }: { id?: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div id={id} className="mb-5">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-base-content/60">{subtitle}</p>}
    </div>
  );
}
