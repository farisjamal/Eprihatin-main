import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBg?: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  subtitle?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  iconBg = "bg-[#EEF4FF]",
  change,
  changeType = "neutral",
  subtitle,
}: StatsCardProps) {
  return (
    <div
      className="rounded-2xl p-5 hover:shadow-lg transition-shadow glass-panel"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide mb-1" style={{ fontWeight: 600 }}>{title}</p>
          <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{value}</p>
          {subtitle && <p className="text-xs text-[var(--muted-foreground)] mt-1">{subtitle}</p>}
          {change && (
            <p
              className={`text-xs mt-1 font-medium ${changeType === "up"
                ? "text-[var(--success)]"
                : changeType === "down"
                  ? "text-[var(--destructive)]"
                  : "text-[var(--muted-foreground)]"
                }`}
            >
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
