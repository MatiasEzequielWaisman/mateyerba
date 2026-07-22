import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export function StaticPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container max-w-3xl py-10">
      <Breadcrumbs items={[{ label: title }]} />
      <h1 className="mt-4 mb-4 font-display text-display-sm font-semibold text-forest-950">{title}</h1>
      {intro && <p className="mb-8 text-stone-600">{intro}</p>}
      <div className="prose-sm flex flex-col gap-4 text-sm leading-relaxed text-stone-700">{children}</div>
    </div>
  );
}
