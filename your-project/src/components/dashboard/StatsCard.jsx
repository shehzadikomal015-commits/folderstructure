"use client";

import { cn } from "@/lib/utils";

export function StatsCard({ title, value, growth, trend, icon: Icon, className }) {
  const isPositive = growth >= 0;

  return (
    <div
      className={cn(
        "p-6 rounded-3xl bg-white border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <span
          className={cn(
            "text-xs font-bold px-2.5 py-1 rounded-full",
            isPositive
              ? "bg-success/10 text-success"
              : "bg-danger/10 text-danger"
          )}
        >
          {isPositive ? "+" : ""}
          {growth}%
        </span>
      </div>
      <div>
        <p className="text-sm text-muted mb-1 font-medium">{title}</p>
        <p className="text-3xl font-extrabold text-foreground tracking-tight">{value}</p>
      </div>
      {trend && (
        <div className="mt-5 h-14 flex items-end gap-1.5">
          {trend.map((val, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-primary/30 to-primary/10 rounded-t-lg transition-all duration-300 hover:from-primary/40 hover:to-primary/20"
              style={{ height: `${val}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
