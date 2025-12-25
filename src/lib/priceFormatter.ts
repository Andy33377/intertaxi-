type Country = "MD" | "PMR" | "UA";

export function formatPrice(priceString: string, country: Country): string {
  // Извлекаем число из строки (убираем "от", "лей", "руб.", пробелы)
  const numberMatch = priceString.match(/\d+/);
  if (!numberMatch) return priceString;

  const number = numberMatch[0];
  const hasPrefix = priceString.includes("от");

  // Форматируем в зависимости от страны
  if (country === "PMR") {
    return hasPrefix ? `от ${number} руб` : `${number} руб`;
  } else {
    // MD и UA - в леях
    return hasPrefix ? `от ${number} лей` : `${number} лей`;
  }
}

export function getCurrentCountry(): Country {
  if (typeof window === "undefined") return "PMR"; // По умолчанию PMR
  const saved = window.localStorage.getItem("country") as Country | null;
  return saved === "MD" || saved === "PMR" || saved === "UA" ? saved : "PMR"; // По умолчанию PMR
}
