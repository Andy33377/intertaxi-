export type PhoneCountry = "MD" | "RU";

export type PhoneCountryConfig = {
  /** Код страны без «+» */
  dialCode: string;
  /** Метка в выпадающем списке */
  label: string;
  /** Длина национального номера (без кода страны) */
  nationalLength: number;
  /** Разбивка национального номера на группы */
  groups: number[];
  /** Разделители между группами (по умолчанию пробел) */
  separators?: Record<number, string>;
  /** Допустимые первые цифры национального номера */
  leadingDigits: RegExp;
  /** Цифры, которые операторы просят набирать перед номером внутри страны */
  trunkPrefixes: string[];
  placeholder: string;
  hint: string;
  example: string;
};

export const PHONE_COUNTRIES: Record<PhoneCountry, PhoneCountryConfig> = {
  MD: {
    dialCode: "373",
    label: "🇲🇩 +373",
    // Молдова и Приднестровье используют один код +373
    // и одинаковую длину национального номера: 8 цифр.
    nationalLength: 8,
    groups: [2, 3, 3],
    leadingDigits: /^[2-9]/,
    trunkPrefixes: ["0"],
    placeholder: "79 123 456",
    hint: "Молдова и Приднестровье",
    example: "+373 79 123 456",
  },
  RU: {
    dialCode: "7",
    label: "🇷🇺 +7",
    nationalLength: 10,
    groups: [3, 3, 2, 2],
    separators: { 1: " ", 2: "-", 3: "-" },
    leadingDigits: /^[3-9]/,
    trunkPrefixes: ["8"],
    placeholder: "912 345-67-89",
    hint: "Россия",
    example: "+7 912 345-67-89",
  },
};

export const PHONE_COUNTRY_OPTIONS = (
  Object.keys(PHONE_COUNTRIES) as PhoneCountry[]
).map((value) => ({ value, label: PHONE_COUNTRIES[value].label }));

/**
 * Оставляет только цифры национального номера: срезает код страны,
 * международные и междугородние префиксы, обрезает лишнее.
 * Работает и при вставке номера целиком («+373 79 123 456», «00373…», «8912…»).
 */
export function extractNationalDigits(raw: string, country: PhoneCountry) {
  const config = PHONE_COUNTRIES[country];
  let digits = raw.replace(/\D/g, "");

  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith(config.dialCode)) {
    const rest = digits.slice(config.dialCode.length);
    // Срезаем код страны, только если остаток похож на национальный номер:
    // иначе «7» в российском 79xx… было бы съедено дважды.
    if (rest.length >= config.nationalLength) digits = rest;
  }

  for (const prefix of config.trunkPrefixes) {
    // Междугородний префикс срезаем только когда без него номер
    // укладывается в национальную длину («8 912…», «0 79…»).
    if (
      digits.startsWith(prefix) &&
      digits.length > config.nationalLength
    ) {
      digits = digits.slice(prefix.length);
      break;
    }
  }

  return digits.slice(0, config.nationalLength);
}

/** Форматирует национальный номер по маске страны. Без кода страны. */
export function formatNational(raw: string, country: PhoneCountry) {
  const config = PHONE_COUNTRIES[country];
  const digits = extractNationalDigits(raw, country);
  if (!digits) return "";

  let cursor = 0;
  const parts: string[] = [];
  for (const size of config.groups) {
    if (cursor >= digits.length) break;
    parts.push(digits.slice(cursor, cursor + size));
    cursor += size;
  }

  return parts.reduce((acc, part, index) => {
    if (index === 0) return part;
    const separator = config.separators?.[index] ?? " ";
    return `${acc}${separator}${part}`;
  }, "");
}

/** Определяет страну по вставленному номеру, если код указан явно. */
export function detectCountry(raw: string): PhoneCountry | null {
  const trimmed = raw.trim();
  if (!/^(\+|00)/.test(trimmed)) return null;

  const digits = trimmed.replace(/\D/g, "").replace(/^00/, "");
  if (digits.startsWith(PHONE_COUNTRIES.MD.dialCode)) return "MD";
  if (
    digits.startsWith(PHONE_COUNTRIES.RU.dialCode) &&
    digits.length > PHONE_COUNTRIES.RU.nationalLength
  ) {
    return "RU";
  }
  return null;
}

export function isValidNational(raw: string, country: PhoneCountry) {
  const config = PHONE_COUNTRIES[country];
  const digits = extractNationalDigits(raw, country);
  return (
    digits.length === config.nationalLength && config.leadingDigits.test(digits)
  );
}

/** Номер в формате E.164 для отправки на сервер: +37379123456 */
export function toE164(raw: string, country: PhoneCountry) {
  const config = PHONE_COUNTRIES[country];
  return `+${config.dialCode}${extractNationalDigits(raw, country)}`;
}

export function phoneErrorMessage(country: PhoneCountry) {
  return `Введите номер в формате ${PHONE_COUNTRIES[country].example}`;
}
