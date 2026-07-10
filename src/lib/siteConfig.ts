export type ContactLink = {
  href: string;
  display: string;
};

export const siteConfig = {
  name: "InterTaxi",
  url: "https://intertaxi.vercel.app",
  description:
    "Междугороднее такси по Молдове, Приднестровью и Украине — быстро, надёжно и с фиксированными ценами.",
  phone: {
    href: "tel:+37377951963",
    display: "+373 77 951 963",
  },
  social: {
    telegram: "https://t.me/AlexandrZaluzhets",
    viber: "viber://chat?number=%2B37377951963",
    instagram:
      "https://www.instagram.com/taxi_transfer_pmr.md?igsh=bzI2ejZqcW16Y3J0",
  },
  evacuatorPhones: [
    {
      href: "tel:+37377704380",
      display: "+373 77 704 380",
    },
    {
      href: "tel:+37362167613",
      display: "+373 62 167 613",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

