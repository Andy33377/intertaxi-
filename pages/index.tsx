import React from "react";
import type { Metadata } from "next";
import Header from "../src/components/Header";
import Contacts from "../src/components/Contacts";
import PriceList from "../src/components/PriceList";
import AboutUs from "../src/components/AboutUs";
import AutoPark from "../src/components/AutoPark";

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
        url: "https://intertaxi.vercel.app/og-1.jpg",
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

      {/* Заголовок по центру */}
      <section id="home" className="pt-[24px] scroll-mt-[80px]">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Быстро. Надёжно. Междугороднее такси. Молдова и Приднестровье.
          </h1>
        </div>
      </section>

      {/* Contacts - отдельно */}
      <section className="scroll-mt-[50px]" id="contacts">
        <div className="max-w-6xl mx-auto px-4">
          <Contacts />
        </div>
      </section>

      {/* Маршруты - всю ширину */}
      <section className="scroll-mt-[50px]" id="routes">
        <div className="max-w-6xl mx-auto px-4">
          <PriceList />
        </div>
      </section>

      {/* Внизу: Автопарк слева, AboutUs справа */}
      <section className="scroll-mt-[50px]" id="autopark-about">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-start">
            <div id="autopark">
              <AutoPark />
            </div>
            <div id="about">
              <AboutUs />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
