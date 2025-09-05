import type { Metadata } from "next";
import OrderForm from "./OrderForm"; // наш клиентский компонент

export const metadata: Metadata = {
  title: "Заказ поездки | InterTaxi",
  description:
    "Подтвердите заказ поездки InterTaxi. Укажите пассажиров, контактные данные и пожелания.",
  openGraph: {
    title: "Заказ поездки | InterTaxi",
    description:
      "Форма заказа InterTaxi. Удобные и надёжные поездки по Молдове и Приднестровью.",
    url: "https://intertaxi.example.com/order", // 👉 заменить на твой реальный домен
    siteName: "InterTaxi",
    images: [
      {
        url: "https://intertaxi.example.com/og-order.jpg",
        width: 1200,
        height: 630,
        alt: "Форма заказа InterTaxi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Заказ поездки | InterTaxi",
    description: "Оформите заказ InterTaxi онлайн и путешествуйте с комфортом.",
    images: ["https://intertaxi.example.com/og-order.jpg"],
  },
};

export default function OrderPage() {
  return (
    <main className="container pt-[64px] p-4 space-y-6">
      <h1 className="text-2xl font-bold">Подтверждение заказа</h1>
      <OrderForm />
    </main>
  );
}
