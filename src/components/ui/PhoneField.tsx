"use client";

import { useLayoutEffect, useRef } from "react";
import { Select, type SelectTone } from "./Select";
import {
  PHONE_COUNTRIES,
  PHONE_COUNTRY_OPTIONS,
  detectCountry,
  formatNational,
  type PhoneCountry,
} from "@/lib/phone";

export type PhoneFieldProps = {
  id?: string;
  /** Национальный номер без кода страны, уже отформатированный маской */
  value: string;
  country: PhoneCountry;
  onValueChange: (value: string) => void;
  onCountryChange: (country: PhoneCountry) => void;
  tone?: SelectTone;
  invalid?: boolean;
  describedBy?: string;
  required?: boolean;
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
};

const inputToneClasses: Record<SelectTone, string> = {
  dark: "border-line-strong bg-surface text-ink placeholder:text-ink-mute focus:border-gold",
  paper:
    "border-paper-line bg-white/75 text-paper-ink shadow-[inset_0_1px_2px_rgb(25_27_18/0.06)] placeholder:text-paper-ink/40 focus:border-gold-deep focus:bg-white",
};

/** Позиция каретки в отформатированной строке после `digitCount` цифр. */
function caretAfterDigits(formatted: string, digitCount: number) {
  if (digitCount <= 0) return 0;
  let seen = 0;
  for (let index = 0; index < formatted.length; index += 1) {
    if (/\d/.test(formatted[index])) {
      seen += 1;
      if (seen === digitCount) return index + 1;
    }
  }
  return formatted.length;
}

export function PhoneField({
  id,
  value,
  country,
  onValueChange,
  onCountryChange,
  tone = "dark",
  invalid = false,
  describedBy,
  required,
  className,
  inputRef: externalInputRef,
}: PhoneFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef<number | null>(null);
  const config = PHONE_COUNTRIES[country];

  // Маска переставляет символы, поэтому каретку возвращаем на место вручную —
  // иначе она прыгает в конец при правке середины номера.
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input || caretRef.current === null) return;
    const position = Math.min(caretRef.current, input.value.length);
    caretRef.current = null;
    if (document.activeElement === input) {
      input.setSelectionRange(position, position);
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const raw = input.value;
    const caret = input.selectionStart ?? raw.length;
    const inputType = (event.nativeEvent as InputEvent).inputType;

    let head = raw.slice(0, caret);
    const tail = raw.slice(caret);

    // Backspace по разделителю должен удалять цифру перед ним, а не «зависать».
    if (
      inputType === "deleteContentBackward" &&
      raw.length === value.length - 1 &&
      value[caret] &&
      !/\d/.test(value[caret])
    ) {
      head = head.slice(0, -1);
    }

    const detected = detectCountry(raw);
    const nextCountry = detected ?? country;
    if (detected && detected !== country) onCountryChange(detected);

    const formatted = formatNational(`${head}${tail}`, nextCountry);
    const digitsBefore = formatNational(head, nextCountry).replace(
      /\D/g,
      "",
    ).length;
    caretRef.current = caretAfterDigits(formatted, digitsBefore);

    if (formatted === value) {
      // Состояние не изменится — React не перерисует инпут,
      // и в поле останется отклонённый маской символ.
      input.value = formatted;
      input.setSelectionRange(caretRef.current, caretRef.current);
      caretRef.current = null;
      return;
    }

    onValueChange(formatted);
  };

  return (
    <div className={`grid grid-cols-[7.25rem_1fr] gap-2 ${className ?? ""}`}>
      <Select
        tone={tone}
        aria-label="Код страны"
        value={country}
        onValueChange={(next) => {
          const nextCountry = next as PhoneCountry;
          if (nextCountry === country) return;
          onCountryChange(nextCountry);
          onValueChange(formatNational(value, nextCountry));
        }}
        options={PHONE_COUNTRY_OPTIONS}
      />
      <input
        id={id}
        ref={(node) => {
          inputRef.current = node;
          if (externalInputRef) externalInputRef.current = node;
        }}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={value}
        onChange={handleChange}
        placeholder={config.placeholder}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        required={required}
        className={`min-h-12 min-w-0 rounded-xl border px-3 text-base tracking-[0.02em] outline-none transition ${
          inputToneClasses[tone]
        } ${invalid ? "border-[#b3341f] focus:border-[#b3341f]" : ""}`}
      />
    </div>
  );
}
