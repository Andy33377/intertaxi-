export type EvacuatorRoute = { from: string; to: string; price: string };

export const evacuatorRoutes: EvacuatorRoute[] = [
  { from: "Бендеры", to: "Бендеры", price: "300 лей" },
  { from: "Тирасполь", to: "Бендеры", price: "400 лей" },
  { from: "Парканы", to: "Тирасполь", price: "350 лей" },
  { from: "Кишинёв", to: "Кишинёв", price: "от 1100 лей" },
];
