import React from "react";
import type { Metadata } from "next";
import Header from "../src/components/Header";
import Contacts from "../src/components/Contacts";
import PriceList from "../src/components/PriceList";
import AboutUs from "../src/components/AboutUs";

// ✅ SEO для главной страницы
export const metadata: Metadata = {
  title: "InterTaxi — Междугороднее такси по Молдове и Приднестровью",
  description:
    "Закажите междугороднее такси InterTaxi онлайн. Быстрая подача авто, комфортные поездки: Бендеры, Тирасполь, Кишинёв, Рыбница и другие маршруты.",
  keywords: [
    "такси",
    "междугороднее такси",
    "такси Бендеры",
    "такси Тирасполь",
    "такси Кишинёв",
    "InterTaxi",
    "такси Молдова",
    "такси Приднестровье",
  ],
  openGraph: {
    title: "InterTaxi — Междугороднее такси по Молдове и Приднестровью",
    description:
      "Онлайн-заказ такси InterTaxi. Быстро, надёжно и комфортно: Бендеры, Тирасполь, Кишинёв, Каменка, Рыбница и другие маршруты.",
    url: "https://intertaxi.com",
    siteName: "InterTaxi",
    images: [
      {
        url: "https://intertaxi.example.com/og-image.jpg", // 👉 твоя картинка 1200x630
        width: 1200,
        height: 630,
        alt: "InterTaxi — Междугороднее такси",
      },
    ],
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "InterTaxi — Междугороднее такси",
    description:
      "Закажите поездку онлайн: Бендеры, Тирасполь, Кишинёв и другие города. InterTaxi — быстро и надёжно.",
    images: ["https://intertaxi.example.com/og-image.jpg"],
  },
};

export default function HomePage() {
  return (
    <div>
      <Header />

      <section id="home" className="pt-[24px]">
        <h1 className="text-2xl pl-[24px] font-bold ">
          Быстро. Надёжно. Междугороднее такси.
        </h1>
      </section>

      <section id="contacts">
        <Contacts />
      </section>

      <section id="routes">
        <PriceList />
      </section>

      <section id="about">
        <AboutUs />
      </section>
    </div>
  );
}
