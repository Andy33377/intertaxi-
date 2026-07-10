import type { MouseEventHandler, ReactNode } from "react";

export type PriceRowProps = {
  label: string;
  price: string | number;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  note?: string;
  className?: string;
};

export function PriceRow({
  label,
  price,
  href,
  onClick,
  note,
  className,
}: PriceRowProps) {
  const content: ReactNode = (
    <>
      <span className="min-w-0 text-left">
        <span className="block font-semibold text-ink">{label}</span>
        {note ? (
          <span className="mt-0.5 block text-xs text-ink-mute">{note}</span>
        ) : null}
      </span>
      <span className="dotted-leader" aria-hidden="true" />
      <span className="shrink-0 text-right font-display text-sm font-semibold text-gold">
        {price}
      </span>
    </>
  );

  const classes = `group flex min-h-14 w-full items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 ${
    href || onClick
      ? "transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
      : ""
  } ${className ?? ""}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  return <div className={classes}>{content}</div>;
}
