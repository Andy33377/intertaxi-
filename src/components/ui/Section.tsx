import type { HTMLAttributes } from "react";

export type SectionSize = "sm" | "md" | "lg";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  size?: SectionSize;
  containerClassName?: string;
};

const sizeClasses: Record<SectionSize, string> = {
  sm: "py-8 md:py-10",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
};

export function Section({
  children,
  className,
  containerClassName,
  size = "md",
  ...props
}: SectionProps) {
  return (
    <section
      {...props}
      className={`scroll-mt-20 ${sizeClasses[size]} ${className ?? ""}`}
    >
      <div
        className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${
          containerClassName ?? ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}

