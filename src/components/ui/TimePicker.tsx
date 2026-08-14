"use client";

import { useEffect, useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Clock3 } from "lucide-react";

export type TimePickerTone = "dark" | "paper";

export type TimePickerProps = {
  id?: string;
  /** Значение в формате HH:mm (как у нативного input[type=time]) */
  value: string;
  onChange: (value: string) => void;
  tone?: TimePickerTone;
  placeholder?: string;
  minuteStep?: number;
  className?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

const triggerToneClasses: Record<TimePickerTone, string> = {
  dark: "border-line-strong bg-surface text-ink hover:border-gold/40 data-[state=open]:border-gold",
  paper:
    "border-paper-line bg-white/75 text-paper-ink shadow-[inset_0_1px_2px_rgb(25_27_18/0.06)] hover:border-gold-deep/60 data-[state=open]:border-gold-deep",
};

const pad = (num: number) => String(num).padStart(2, "0");

export function TimePicker({
  id,
  value,
  onChange,
  tone = "paper",
  placeholder = "Выберите время",
  minuteStep = 5,
  className,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const hourListRef = useRef<HTMLDivElement>(null);
  const minuteListRef = useRef<HTMLDivElement>(null);

  const [selectedHour, selectedMinute] = value
    ? value.split(":")
    : [undefined, undefined];

  const hours = Array.from({ length: 24 }, (_, index) => pad(index));
  const minutes = Array.from(
    { length: Math.ceil(60 / minuteStep) },
    (_, index) => pad(index * minuteStep),
  );

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      hourListRef.current
        ?.querySelector("[data-selected='true']")
        ?.scrollIntoView({ block: "center" });
      minuteListRef.current
        ?.querySelector("[data-selected='true']")
        ?.scrollIntoView({ block: "center" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const chooseHour = (hour: string) => {
    onChange(`${hour}:${selectedMinute ?? "00"}`);
  };

  const chooseMinute = (minute: string) => {
    const hour = selectedHour ?? pad(new Date().getHours());
    onChange(`${hour}:${minute}`);
    setOpen(false);
  };

  const optionClass = (isSelected: boolean) =>
    `block w-full rounded-lg px-4 py-2 text-center text-sm font-semibold tabular-nums transition-colors ${
      isSelected
        ? "bg-gold text-[#14120a]"
        : "text-ink-dim hover:bg-surface-2 hover:text-ink"
    }`;

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
          <Clock3
            className={`size-5 shrink-0 ${
              tone === "paper" ? "text-paper-ink/40" : "text-ink-mute"
            }`}
            aria-hidden
          />
          <span
            className={`tabular-nums ${
              value
                ? ""
                : tone === "paper"
                  ? "text-paper-ink/40"
                  : "text-ink-mute"
            }`}
          >
            {value || placeholder}
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          align="start"
          collisionPadding={12}
          className="pop-panel z-[70] rounded-2xl border border-line-strong bg-[#12150f] p-3 text-ink shadow-lift"
        >
          <div className="flex gap-2">
            <div className="flex flex-col">
              <p className="pb-2 text-center text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-mute">
                Часы
              </p>
              <div
                ref={hourListRef}
                className="time-col max-h-52 space-y-0.5 overflow-y-auto pr-1"
              >
                {hours.map((hour) => (
                  <button
                    key={hour}
                    type="button"
                    data-selected={hour === selectedHour}
                    onClick={() => chooseHour(hour)}
                    className={optionClass(hour === selectedHour)}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="w-px self-stretch bg-line-strong/60"
              aria-hidden="true"
            />

            <div className="flex flex-col">
              <p className="pb-2 text-center text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-mute">
                Минуты
              </p>
              <div
                ref={minuteListRef}
                className="time-col max-h-52 space-y-0.5 overflow-y-auto pr-1"
              >
                {minutes.map((minute) => (
                  <button
                    key={minute}
                    type="button"
                    data-selected={minute === selectedMinute}
                    onClick={() => chooseMinute(minute)}
                    className={optionClass(minute === selectedMinute)}
                  >
                    {minute}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
