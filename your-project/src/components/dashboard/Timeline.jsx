"use client";

import { cn } from "@/lib/utils";

export function Timeline({ items }) {
  const typeColors = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    info: "bg-info",
    muted: "bg-muted",
  };

  return (
    <div className="relative">
      <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative z-10 mt-1">
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-full",
                  typeColors[item.type] || typeColors.muted
                )}
              />
            </div>
            <div className="flex-1 pb-4">
              <p className="text-sm font-medium text-foreground">
                {item.title}
              </p>
              <p className="text-xs text-muted mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
