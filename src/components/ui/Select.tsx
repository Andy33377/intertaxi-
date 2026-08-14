"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

export type SelectTone = "dark" | "paper";

export type SelectOption = {
  value: string;
  label: ReactNode;
};

export type SelectProps = {
  id?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  tone?: SelectTone;
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
};

const triggerToneClasses: Record<SelectTone, string> = {
  dark: "border-line-strong bg-surface text-ink hover:border-gold/40 data-[state=open]:border-gold",
  paper:
    "border-paper-line bg-white/75 text-paper-ink shadow-[inset_0_1px_2px_rgb(25_27_18/0.06)] data-[state=open]:border-gold-deep",
};

export function Select({
  id,
  value,
  onValueChange,
  options,
  tone = "dark",
  placeholder,
  className,
  "aria-label": ariaLabel,
}: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        id={id}
        aria-label={ariaLabel}
        className={`flex min-h-12 min-w-0 items-center justify-between gap-2 rounded-xl border px-3 text-sm font-semibold outline-none transition ${
          triggerToneClasses[tone]
        } ${className ?? ""}`}
      >
        <span className="truncate">
          <SelectPrimitive.Value placeholder={placeholder} />
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            className={`size-4 shrink-0 transition-transform duration-200 ${
              tone === "paper" ? "text-paper-ink/50" : "text-ink-mute"
            }`}
            aria-hidden
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="pop-panel z-[70] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-line-strong bg-[#141812] text-ink shadow-lift"
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="flex min-h-10 cursor-pointer select-none items-center justify-between gap-3 rounded-lg px-3 text-sm font-semibold outline-none transition-colors data-[highlighted]:bg-surface-2 data-[state=checked]:text-gold"
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check className="size-4 text-gold" aria-hidden />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
