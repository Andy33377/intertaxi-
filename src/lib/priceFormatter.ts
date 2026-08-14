type Country = "MD" | "PMR" | "UA";

/**
 * Курс пересчёта из молдавских леев в гривны.
 * Обновляйте вручную при заметном изменении курса.
 */
export const MDL_TO_UAH = 2.4;

/** Шаг округления гривневого эквивалента, чтобы цены выглядели «прайсово». */
const UAH_ROUND_STEP = 10;

export function formatPrice(priceString: string, country: Country): string {
  // Извлекаем число из строки (убираем "от", "лей", "руб.", пробелы)
  const numberMatch = priceString.match(/\d+/);
  if (!numberMatch) return priceString;

  const number = numberMatch[0];
  const hasPrefix = priceString.includes("от");

  // Форматируем в зависимости от страны
  if (country === "PMR") {
    return hasPrefix ? `от ${number} руб` : `${number} руб`;
  }

  if (country === "UA") {
    const uah =
      Math.round((Number(number) * MDL_TO_UAH) / UAH_ROUND_STEP) *
      UAH_ROUND_STEP;
    return hasPrefix ? `от ${uah} грн` : `${uah} грн`;
  }

  // MD — в леях
  return hasPrefix ? `от ${number} лей` : `${number} лей`;
}

export function getCurrentCountry(): Country {
  if (typeof window === "undefined") return "PMR"; // По умолчанию PMR
  const saved = window.localStorage.getItem("country") as Country | null;
  return saved === "MD" || saved === "PMR" || saved === "UA" ? saved : "PMR"; // По умолчанию PMR
}
