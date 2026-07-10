import type { HTMLAttributes } from "react";

export type BadgeVariant =
  | "default"
  | "accent"
  | "success"
  | "warning"
  | "danger";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-line-strong bg-surface-2 text-ink-dim",
  accent: "border-gold/30 bg-gold-soft text-gold",
  success: "border-success/30 bg-[#0d2417] text-success",
  warning: "border-[#ff9257]/30 bg-[#2c150a] text-[#ff9257]",
  danger: "border-danger/30 bg-[#2c0f08] text-danger",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={`inline-flex min-h-6 items-center gap-1 rounded-full border px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] ${
        variantClasses[variant]
      } ${className ?? ""}`}
    />
  );
}
