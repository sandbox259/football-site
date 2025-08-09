import * as React from "react"

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "secondary"
}

export function Badge({
  className,
  children,
  variant = "default",
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

  const variantStyles =
    variant === "outline"
      ? "text-foreground border"
      : variant === "secondary"
      ? "bg-white/10 text-white/70 border-0"
      : "bg-primary text-primary-foreground border-transparent"

  return (
    <div className={cn(baseStyles, variantStyles, className)} {...props}>
      {children}
    </div>
  )
}
