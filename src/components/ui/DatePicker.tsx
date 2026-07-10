"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { ru } from "react-day-picker/locale";
import { CalendarDays } from "lucide-react";

export type DatePickerTone = "dark" | "paper";

export type DatePickerProps = {
  id?: string;
  /** Значение в формате yyyy-MM-dd (как у нативного input[type=date]) */
  value: string;
  onChange: (value: string) => void;
  /** Минимальная дата в формате yyyy-MM-dd */
  min?: string;
  tone?: DatePickerTone;
  placeholder?: string;
  className?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

const triggerToneClasses: Record<DatePickerTone, string> = {
  dark: "border-line-strong bg-surface text-ink hover:border-gold/40 data-[state=open]:border-gold",
  paper:
    "border-paper-line bg-white/75 text-paper-ink shadow-[inset_0_1px_2px_rgb(25_27_18/0.06)] hover:border-gold-deep/60 data-[state=open]:border-gold-deep",
};

function parseISODate(value: string): Date | undefined {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
}

function toISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function DatePicker({
  id,
  value,
  onChange,
  min,
  tone = "paper",
  placeholder = "Выберите дату",
  className,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selected = value ? parseISODate(value) : undefined;
  const minDate = min ? parseISODate(min) : undefined;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          id={id}
          type="button"
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          className={`flex min-h-12 w-full items-center gap-3 rounded-xl border px-3 text-left text-base outline-none transition ${
            triggerToneClasses[tone]
          } ${
            ariaInvalid ? "!border-[#b3341f]" : ""
          } ${className ?? ""}`}
        >
          <CalendarDays
            className={`size-5 shrink-0 ${
              tone === "paper" ? "text-paper-ink/40" : "text-ink-mute"
            }`}
            aria-hidden
          />
          <span
            className={
              value
                ? ""
                : tone === "paper"
                  ? "text-paper-ink/40"
                  : "text-ink-mute"
            }
          >
            {selected ? dateFormatter.format(selected) : placeholder}
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          align="start"
          collisionPadding={12}
          className="pop-panel z-[70] rounded-2xl border border-line-strong bg-[#12150f] p-3 shadow-lift"
        >
          <DayPicker
            className="nr-cal"
            mode="single"
            locale={ru}
            weekStartsOn={1}
            showOutsideDays
            selected={selected}
            defaultMonth={selected ?? minDate ?? new Date()}
            disabled={minDate ? { before: minDate } : undefined}
            onSelect={(date) => {
              if (date) {
                onChange(toISODate(date));
                setOpen(false);
              }
            }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
