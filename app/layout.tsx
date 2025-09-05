import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // Заголовки
  title: {
    default: "InterTaxi — Междугороднее такси",
    template: "%s | InterTaxi", // если будут внутренние страницы
  },
  description:
    "Междугороднее такси InterTaxi. Быстрая подача авто, комфортные поездки по Молдове и Приднестровью.",

  // Ключевые слова (SEO)
  keywords: [
    "такси",
    "междугороднее такси",
    "InterTaxi",
    "Молдова",
    "Бендеры",
    "Тирасполь",
    "Кишинёв",
    "Приднестровье",
  ],

  // Open Graph (для соцсетей: Facebook, Telegram и др.)
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://intertaxi.example.com", // 👉 твой домен
    siteName: "InterTaxi",
    title: "InterTaxi — Междугороднее такси",
    description:
      "Закажи поездку онлайн. Междугороднее такси: Бендеры, Тирасполь, Кишинёв и другие маршруты.",
    images: [
      {
        url: "https://intertaxi.example.com/og-image.jpg", // 👉 картинка 1200x630
        width: 1200,
        height: 630,
        alt: "InterTaxi — Междугороднее такси",
      },
    ],
  },

  // Twitter cards (чтобы красиво выглядели ссылки в Twitter/X)
  twitter: {
    card: "summary_large_image",
    title: "InterTaxi — Междугороднее такси",
    description:
      "Быстро. Надёжно. Междугороднее такси по Молдове и Приднестровью.",
    images: ["https://intertaxi.example.com/og-image.jpg"],
  },

  // Иконки
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Базовый URL сайта
  metadataBase: new URL("https://intertaxi.example.com"), // 👉 заменить на твой домен
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
