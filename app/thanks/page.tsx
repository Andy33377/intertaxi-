import type { Metadata } from "next";
import Link from "next/link";

// ✅ SEO для страницы "Спасибо"
export const metadata: Metadata = {
  title: "Спасибо за заказ | InterTaxi",
  description:
    "Ваша заявка успешно отправлена. Наш оператор свяжется с вами в ближайшее время.",
  openGraph: {
    title: "Спасибо за заказ | InterTaxi",
    description:
      "Заявка принята! InterTaxi свяжется с вами для подтверждения поездки.",
    url: "https://intertaxi.example.com/thanks", // 👉 поменяй на свой домен
    siteName: "InterTaxi",
    images: [
      {
        url: "https://intertaxi.example.com/og-thanks.jpg", // 👉 подготовь картинку 1200x630
        width: 1200,
        height: 630,
        alt: "Спасибо за заказ InterTaxi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Спасибо за заказ | InterTaxi",
    description: "Заявка принята! Мы скоро свяжемся с вами.",
    images: ["https://intertaxi.example.com/og-thanks.jpg"],
  },
};

// ✅ Вёрстка страницы
export default function ThanksPage() {
  return (
    <main className="container pt-[64px] p-6 text-center space-y-4">
      <h1 className="text-2xl font-bold">Спасибо! Заявка отправлена.</h1>
      <p>Наш оператор свяжется с вами в ближайшее время.</p>
      <Link
        href="/"
        className="inline-block rounded-2xl bg-black text-white font-semibold px-6 py-3 hover:bg-gray-800 transition no-underline"
      >
        На главную
      </Link>
    </main>
  );
}
