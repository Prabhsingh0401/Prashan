interface StatCardProps {
  title: string;
  value?: string | number;
  description: string;
}

export default function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 shadow-sm transition-colors hover:bg-white/60 dark:hover:bg-white/10">
      <h3 className="font-semibold text-foreground/80 mb-1">{title}</h3>
      {value && <p className="text-2xl font-bold tracking-tight mb-1">{value}</p>}
      <p className="text-sm text-foreground/60">{description}</p>
    </div>
  );
}
