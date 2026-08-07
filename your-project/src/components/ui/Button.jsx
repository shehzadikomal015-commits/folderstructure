import { cn } from "@/lib/utils";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  loading,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary via-primary-light to-secondary bg-[length:200%_auto] text-white hover:bg-[position:100%_0] shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "bg-gray-100 text-foreground border border-border hover:bg-gray-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10",
    ghost: "text-muted hover:text-gray-900 hover:bg-gray-100",
    danger:
      "bg-gradient-to-r from-danger to-red-500 text-white hover:shadow-lg hover:shadow-danger/20 hover:scale-[1.02] active:scale-[0.98]",
    outline:
      "border-2 border-primary text-primary hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] active:scale-[0.98]",
    accent:
      "bg-gradient-to-r from-accent via-amber-400 to-primary bg-[length:200%_auto] text-white hover:bg-[position:100%_0] shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
