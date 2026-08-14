export type Country = "MD" | "PMR" | "UA";

export type CountryMeta = {
  label: string;
  flag: string;
  name: string;
  currency: string;
};

export const countryMeta: Record<Country, CountryMeta> = {
  MD: {
    label: "MD",
    flag: "🇲🇩",
    name: "Молдова",
    currency: "лей",
  },
  PMR: {
    label: "PMR",
    flag: "🇲🇩",
    name: "Приднестровье",
    currency: "руб",
  },
  UA: {
    label: "UA",
    flag: "🇺🇦",
    name: "Украина",
    currency: "грн",
  },
};

export const COUNTRY_CHANGE_EVENT = "intertaxi:country-change";
export const COUNTRY_STORAGE_KEY = "country";
export const DEFAULT_COUNTRY: Country = "PMR";

function isCountry(value: string | null): value is Country {
  return value === "MD" || value === "PMR" || value === "UA";
}

export function getCurrentCountry(): Country {
  if (typeof window === "undefined") return DEFAULT_COUNTRY;

  const savedCountry = window.localStorage.getItem(COUNTRY_STORAGE_KEY);
  return isCountry(savedCountry) ? savedCountry : DEFAULT_COUNTRY;
}

export function setCurrentCountry(country: Country): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(COUNTRY_STORAGE_KEY, country);
  window.dispatchEvent(
    new CustomEvent<Country>(COUNTRY_CHANGE_EVENT, { detail: country }),
  );
}

