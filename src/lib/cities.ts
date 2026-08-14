export type CityRegion = "MD_PMR" | "UA";

export type City = {
  id: string;
  label: string;
  region: CityRegion;
  aliases?: string[];
};

export type CityGroup = {
  id: CityRegion;
  label: string;
  cities: City[];
};

export type Route = {
  id: string;
  fromId: string;
  toId: string;
  price: number;
};

const mdPmCityData: City[] = [
  { id: "balti", label: "Бельцы", region: "MD_PMR" },
  { id: "bendery", label: "Бендеры", region: "MD_PMR" },
  { id: "grigoriopol", label: "Григориополь", region: "MD_PMR" },
  { id: "dnestrovsk", label: "Днестровск", region: "MD_PMR" },
  { id: "dubossary", label: "Дубоссары", region: "MD_PMR" },
  { id: "kalarashevka", label: "Каларашевка", region: "MD_PMR" },
  { id: "kamenka", label: "Каменка", region: "MD_PMR" },
  { id: "causeni", label: "Каушаны", region: "MD_PMR" },
  {
    id: "chisinau-airport",
    label: "Кишинёв (Аэропорт)",
    region: "MD_PMR",
    aliases: ["Кишинёв Аэропорт"],
  },
  {
    id: "chisinau-center",
    label: "Кишинёв (Центр)",
    region: "MD_PMR",
    aliases: ["Кишинёв Центр"],
  },
  { id: "cricova", label: "Криково", region: "MD_PMR" },
  { id: "novye-aneny", label: "Новые Анены", region: "MD_PMR" },
  { id: "palanca", label: "Паланка", region: "MD_PMR" },
  { id: "pervomaisk", label: "Первомайск", region: "MD_PMR" },
  { id: "rybnitsa", label: "Рыбница", region: "MD_PMR" },
  { id: "slobodzeya", label: "Слободзея", region: "MD_PMR" },
  {
    id: "iasi-customs",
    label: "Таможня у Ясс (без пересечения)",
    region: "MD_PMR",
  },
  { id: "tiraspol", label: "Тирасполь", region: "MD_PMR" },
  {
    id: "tiraspol-bolshoy-khutor",
    label: "Тирасполь (Б. Хутор)",
    region: "MD_PMR",
  },
];

const uaCityData: City[] = [
  { id: "odesa", label: "Одесса", region: "UA" },
  { id: "kyiv", label: "Киев", region: "UA" },
  { id: "vinnytsia", label: "Винница", region: "UA" },
  { id: "lviv", label: "Львов", region: "UA" },
  { id: "khmelnytskyi", label: "Хмельницкий", region: "UA" },
  { id: "ternopil", label: "Тернополь", region: "UA" },
  { id: "chernivtsi", label: "Черновцы", region: "UA" },
  { id: "uman", label: "Умань", region: "UA" },
  { id: "dnipro", label: "Днепр", region: "UA" },
  { id: "kryvyi-rih", label: "Кривой Рог", region: "UA" },
  { id: "poltava", label: "Полтава", region: "UA" },
  { id: "zhytomyr", label: "Житомир", region: "UA" },
];

export const cities: City[] = [...mdPmCityData, ...uaCityData];

export const cityGroups: CityGroup[] = [
  {
    id: "MD_PMR",
    label: "Молдова / ПМР",
    cities: mdPmCityData,
  },
  {
    id: "UA",
    label: "Украина",
    cities: uaCityData,
  },
];

export const routes: Route[] = [
  {
    id: "bendery-tiraspol",
    fromId: "bendery",
    toId: "tiraspol",
    price: 100,
  },
  {
    id: "bendery-tiraspol-bolshoy-khutor",
    fromId: "bendery",
    toId: "tiraspol-bolshoy-khutor",
    price: 150,
  },
  {
    id: "bendery-slobodzeya",
    fromId: "bendery",
    toId: "slobodzeya",
    price: 250,
  },
  {
    id: "bendery-grigoriopol",
    fromId: "bendery",
    toId: "grigoriopol",
    price: 400,
  },
  {
    id: "bendery-dubossary",
    fromId: "bendery",
    toId: "dubossary",
    price: 550,
  },
  {
    id: "bendery-rybnitsa",
    fromId: "bendery",
    toId: "rybnitsa",
    price: 850,
  },
  {
    id: "bendery-kamenka",
    fromId: "bendery",
    toId: "kamenka",
    price: 1100,
  },
  {
    id: "bendery-chisinau-airport",
    fromId: "bendery",
    toId: "chisinau-airport",
    price: 400,
  },
  {
    id: "bendery-chisinau-center",
    fromId: "bendery",
    toId: "chisinau-center",
    price: 450,
  },
  {
    id: "tiraspol-novye-aneny",
    fromId: "tiraspol",
    toId: "novye-aneny",
    price: 300,
  },
  {
    id: "tiraspol-causeni",
    fromId: "tiraspol",
    toId: "causeni",
    price: 350,
  },
  {
    id: "tiraspol-dubossary",
    fromId: "tiraspol",
    toId: "dubossary",
    price: 450,
  },
  {
    id: "tiraspol-rybnitsa",
    fromId: "tiraspol",
    toId: "rybnitsa",
    price: 690,
  },
  {
    id: "tiraspol-kamenka",
    fromId: "tiraspol",
    toId: "kamenka",
    price: 980,
  },
  {
    id: "tiraspol-palanca",
    fromId: "tiraspol",
    toId: "palanca",
    price: 600,
  },
  {
    id: "tiraspol-balti",
    fromId: "tiraspol",
    toId: "balti",
    price: 1200,
  },
  {
    id: "tiraspol-cricova",
    fromId: "tiraspol",
    toId: "cricova",
    price: 390,
  },
  {
    id: "chisinau-center-tiraspol",
    fromId: "chisinau-center",
    toId: "tiraspol",
    price: 600,
  },
  {
    id: "chisinau-center-bendery",
    fromId: "chisinau-center",
    toId: "bendery",
    price: 425,
  },
  {
    id: "chisinau-center-slobodzeya",
    fromId: "chisinau-center",
    toId: "slobodzeya",
    price: 480,
  },
  {
    id: "chisinau-center-kalarashevka",
    fromId: "chisinau-center",
    toId: "kalarashevka",
    price: 2000,
  },
  {
    id: "chisinau-center-iasi-customs",
    fromId: "chisinau-center",
    toId: "iasi-customs",
    price: 1200,
  },
  {
    id: "chisinau-airport-bendery",
    fromId: "chisinau-airport",
    toId: "bendery",
    price: 325,
  },
  {
    id: "chisinau-airport-palanca",
    fromId: "chisinau-airport",
    toId: "palanca",
    price: 850,
  },
  {
    id: "chisinau-airport-rybnitsa",
    fromId: "chisinau-airport",
    toId: "rybnitsa",
    price: 750,
  },
  {
    id: "chisinau-airport-balti",
    fromId: "chisinau-airport",
    toId: "balti",
    price: 1000,
  },
  {
    id: "chisinau-airport-dnestrovsk",
    fromId: "chisinau-airport",
    toId: "dnestrovsk",
    price: 680,
  },
  {
    id: "chisinau-airport-pervomaisk",
    fromId: "chisinau-airport",
    toId: "pervomaisk",
    price: 750,
  },
];

const cityById = new Map(cities.map((city) => [city.id, city]));

function normalizeCityValue(value: string) {
  return value
    .normalize("NFKC")
    .trim()
    .toLocaleLowerCase("ru-RU")
    .replace(/\s+/g, " ");
}

const cityIdByValue = new Map<string, string>();

for (const city of cities) {
  for (const value of [city.id, city.label, ...(city.aliases ?? [])]) {
    cityIdByValue.set(normalizeCityValue(value), city.id);
  }
}

const routeByDirection = new Map(
  routes.map((route) => [`${route.fromId}::${route.toId}`, route]),
);

export function getCityById(id: string): City | undefined {
  return cityById.get(id);
}

export function getCityLabel(id: string): string {
  return getCityById(id)?.label ?? id;
}

export function resolveCityId(value: string): string | undefined {
  if (!value) return undefined;
  return cityIdByValue.get(normalizeCityValue(value));
}

export function findRoute(fromId: string, toId: string): Route | undefined {
  const resolvedFromId = resolveCityId(fromId);
  const resolvedToId = resolveCityId(toId);

  if (!resolvedFromId || !resolvedToId) return undefined;

  return (
    routeByDirection.get(`${resolvedFromId}::${resolvedToId}`) ??
    routeByDirection.get(`${resolvedToId}::${resolvedFromId}`)
  );
}

export function findRouteByLabels(
  from: string,
  to: string,
): Route | undefined {
  const fromId = resolveCityId(from);
  const toId = resolveCityId(to);

  if (!fromId || !toId) return undefined;
  return findRoute(fromId, toId);
}

// Compatibility label exports for existing selects and saved order data.
export const mdPmCities = mdPmCityData.map((city) => city.label);
export const uaCities = uaCityData.map((city) => city.label);
