"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export type CheckboxTone = "dark" | "paper";

export type CheckboxProps = {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  tone?: CheckboxTone;
  className?: string;
  "aria-label"?: string;
};

const toneClasses: Record<CheckboxTone, string> = {
  dark: "border-line-strong bg-surface data-[state=checked]:border-gold data-[state=checked]:bg-gold data-[state=checked]:text-[#14120a]",
  paper:
    "border-paper-line bg-white data-[state=checked]:border-paper-ink data-[state=checked]:bg-paper-ink data-[state=checked]:text-gold",
};

export function Checkbox({
  id,
  checked,
  onCheckedChange,
  tone = "dark",
  className,
  "aria-label": ariaLabel,
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      id={id}
      checked={checked}
      onCheckedChange={(state) => onCheckedChange(state === true)}
      aria-label={ariaLabel}
      className={`grid size-5 shrink-0 place-items-center rounded-md border-2 transition-colors duration-150 ${
        toneClasses[tone]
      } ${className ?? ""}`}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="size-3.5" strokeWidth={3.5} aria-hidden />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
