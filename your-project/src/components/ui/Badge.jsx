import { cn } from "@/lib/utils";

export function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-gray-100 text-gray-700 border border-gray-200",
    primary: "bg-primary/10 text-primary-light border border-primary/20",
    secondary: "bg-secondary/10 text-secondary-light border border-secondary/20",
    success: "bg-success/10 text-success border border-success/20",
    warning: "bg-warning/10 text-warning-light border border-warning/20",
    danger: "bg-danger/10 text-danger-light border border-danger/20",
    muted: "bg-gray-100 text-muted border border-gray-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
