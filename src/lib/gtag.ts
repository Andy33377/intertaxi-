// Google Ads (gtag.js) — ID аккаунта и метки конверсий.
// Метки (часть после "/") берутся в Google Ads:
// Цели → Конверсии → нужная конверсия → «Настройка тега» → «Установить тег самостоятельно».
export const GOOGLE_ADS_ID = "AW-18476170634";

export const CONVERSIONS = {
  /** Заявка с сайта (успешная отправка формы заказа) */
  lead: `${GOOGLE_ADS_ID}/LEAD_LABEL`,
  /** Клик по номеру телефона */
  call: `${GOOGLE_ADS_ID}/CALL_LABEL`,
  /** Клик по Telegram / Viber */
  messenger: `${GOOGLE_ADS_ID}/MESSENGER_LABEL`,
} as const;

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export function trackConversion(
  sendTo: string,
  params: Record<string, unknown> = {},
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  // Пока метка не заполнена — не отправляем мусор в Google Ads
  if (sendTo.endsWith("_LABEL")) return;
  window.gtag("event", "conversion", { send_to: sendTo, ...params });
}

/** Отслеживает клики по tel:, Telegram и Viber на всех страницах */
export function handleContactClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!link) return;

  const href = link.getAttribute("href") ?? "";
  if (href.startsWith("tel:")) {
    trackConversion(CONVERSIONS.call);
  } else if (href.includes("t.me/") || href.startsWith("viber:")) {
    trackConversion(CONVERSIONS.messenger);
  }
}
