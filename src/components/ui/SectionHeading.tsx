import type { ReactNode } from "react";

export type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  index,
  kicker,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`view-rise ${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${
        className ?? ""
      }`}
    >
      <div
        className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        <span className="font-display text-xs font-semibold tracking-[0.2em] text-gold">
          {index}
        </span>
        <span className="h-px w-10 shrink-0 bg-gold/60" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-ink-dim">
          {kicker}
        </span>
      </div>
      <h2 className="mt-4 font-display text-[clamp(1.45rem,3.4vw,2.3rem)] font-semibold leading-[1.15] tracking-tight text-ink">
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 leading-relaxed text-ink-dim ${
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
