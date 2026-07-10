import type { HTMLAttributes } from "react";

export type CardTone = "default" | "muted" | "dark" | "accent";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: CardTone;
};

const toneClasses: Record<CardTone, string> = {
  default: "border border-line bg-surface text-ink shadow-card",
  muted: "border border-line bg-surface-2/60 text-ink",
  dark: "border border-line bg-bg-deep text-ink shadow-card",
  accent: "ticket border-0 text-paper-ink shadow-lift",
};

export function Card({
  className,
  tone = "default",
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-card ${toneClasses[tone]} ${className ?? ""}`}
    />
  );
}
