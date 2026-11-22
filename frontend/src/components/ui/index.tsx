// Shared small UI components

import { clsx } from "clsx";

// ── Badge ────────────────────────────────────────────────────────────────────

type BadgeVariant = "brand" | "amber" | "rose" | "emerald" | "slate";
const badgeClasses: Record<BadgeVariant, string> = {
  brand:   "bg-brand-100 text-brand-700",
  amber:   "bg-amber-50 text-amber-600 ring-1 ring-amber-200",
  rose:    "bg-rose-50 text-rose-500 ring-1 ring-rose-200",
  emerald: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
  slate:   "bg-surface-1 text-ink-secondary",
};

export function Badge({
  children,
  variant = "slate",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", badgeClasses[variant], className)}>
      {children}
    </span>
  );
}

// ── Skill Tag ────────────────────────────────────────────────────────────────

export function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-lg bg-surface-1 px-2.5 py-1 text-xs font-medium text-ink-secondary ring-1 ring-surface-2 hover:bg-surface-2 transition-colors">
      {label}
    </span>
  );
}

// ── Avatar ───────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "from-brand-500 to-purple-600",
  "from-rose-400 to-pink-600",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-600",
  "from-sky-400 to-blue-600",
];

export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  const sizeClasses = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-xl",
  };
  return (
    <div
      className={clsx(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white",
        color,
        sizeClasses[size],
        className,
      )}
    >
      {initials}
    </div>
  );
}

// ── Category Label ───────────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { label: string; emoji: string; variant: BadgeVariant }> = {
  course:      { label: "Tugas Kuliah", emoji: "📚", variant: "brand" },
  competition: { label: "Kompetisi",    emoji: "🏆", variant: "amber" },
  event:       { label: "Event",        emoji: "🎪", variant: "rose" },
  social:      { label: "Study Group",  emoji: "🤝", variant: "emerald" },
};

export function CategoryBadge({ category }: { category: string }) {
  const meta = CATEGORY_META[category] ?? { label: category, emoji: "📌", variant: "slate" as BadgeVariant };
  return (
    <Badge variant={meta.variant}>
      {meta.emoji} {meta.label}
    </Badge>
  );
}

// ── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_META: Record<string, { label: string; variant: BadgeVariant }> = {
  pending:   { label: "Menunggu",   variant: "amber" },
  chatting:  { label: "Ngobrol",    variant: "brand" },
  approved:  { label: "Diterima ✓", variant: "emerald" },
  rejected:  { label: "Ditolak",    variant: "rose" },
  withdrawn: { label: "Dibatalkan", variant: "slate" },
};

export function StatusBadge({ status }: { status: string }) {
  const meta = STATUS_META[status] ?? { label: status, variant: "slate" as BadgeVariant };
  return <Badge variant={meta.variant}>{meta.label}</Badge>;
}

// ── Divider ──────────────────────────────────────────────────────────────────

export function Divider({ className }: { className?: string }) {
  return <hr className={clsx("border-surface-2", className)} />;
}

// ── Stat Chip ────────────────────────────────────────────────────────────────

export function StatChip({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-surface-1 px-2.5 py-1 text-xs text-ink-secondary">
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
}
