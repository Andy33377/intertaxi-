"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrderForm() {
  type Trip = {
    from?: string;
    to?: string;
    date?: string;
    time?: string;
    roundTrip?: boolean;
    returnDate?: string | null;
    returnTime?: string | null;
  };

  const router = useRouter();

  // 🔹 Состояние маршрута
  const [trip, setTrip] = useState<Trip>({});
  const [tripLoaded, setTripLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tripData");
      setTrip(raw ? JSON.parse(raw) : {});
    } catch {
      setTrip({});
    } finally {
      setTripLoaded(true);
    }
  }, []);

  // 🔹 Локальный state для контактов
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [childSeat, setChildSeat] = useState(false);
  const [comment, setComment] = useState("");

  // 🔹 Отправка заказа
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...trip,
      name: name.trim(),
      phone: phone.trim(),
      passengers,
      childSeat,
      comment: comment.trim(),
    };

    console.log("📤 Отправляем заказ:", payload);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Ошибка при создании заказа:", errorText);
        alert("Не удалось создать заказ: " + errorText);
        return;
      }

      const data = await res.json();
      console.log("✅ Заказ успешно создан:", data);

      router.push("/thanks");
    } catch (err) {
      console.error("🚨 Ошибка сети или кода:", err);
      alert("Не удалось отправить заказ 😞");
    }
  };

  // 🔹 Пока грузим localStorage
  if (!tripLoaded) {
    return <p className="text-center p-4">Загрузка...</p>;
  }

  // 🔹 Если маршрута нет — вернуть на форму выбора
  if (!trip.from || !trip.to || !trip.date || !trip.time) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <p>Маршрут не заполнен. Пожалуйста, выберите его заново.</p>
        <button
          onClick={() => router.push("/#contacts")}
          className="mt-3 rounded-2xl bg-black text-white px-4 py-2"
        >
          К выбору маршрута
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold text-center mb-4">
        Подтверждение поездки
      </h2>

      {/* Подтверждение маршрута */}
      <div className="bg-gray-100 p-3 rounded-lg text-sm space-y-1">
        <p>
          <strong>Откуда:</strong> {trip.from || "—"}
        </p>
        <p>
          <strong>Куда:</strong> {trip.to || "—"}
        </p>
        <p>
          <strong>Дата:</strong> {trip.date || "—"}
        </p>
        <p>
          <strong>Время:</strong> {trip.time || "—"}
        </p>
        {trip.roundTrip && (
          <>
            <p>
              <strong>Обратная дата:</strong> {trip.returnDate || "—"}
            </p>
            <p>
              <strong>Обратное время:</strong> {trip.returnTime || "—"}
            </p>
          </>
        )}
      </div>

      {/* Имя */}
      <div>
        <label className="block text-sm font-medium">Имя *</label>
        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value.replace(/[^A-Za-zА-Яа-яЁё\s]/g, ""))
          }
          className="mt-1 w-full rounded-2xl border p-3"
          autoComplete="name"
          required
        />
      </div>

      {/* Телефон */}
      <div>
        <label className="block text-sm font-medium">Телефон *</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ""))}
          className="mt-1 w-full rounded-2xl border p-3"
          placeholder="+373 ..."
          autoComplete="tel"
          required
        />
      </div>

      {/* Пассажиры и кресло */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Пассажиров</label>
          <input
            type="number"
            min={1}
            max={6}
            value={passengers}
            onChange={(e) => setPassengers(+e.target.value)}
            className="mt-1 w-full rounded-2xl border p-3"
          />
        </div>
        <label className="flex items-center gap-2 mt-7">
          <input
            type="checkbox"
            checked={childSeat}
            onChange={(e) => setChildSeat(e.target.checked)}
          />
          Детское кресло
        </label>
      </div>

      {/* Комментарий */}
      <div>
        <label className="block text-sm font-medium">Комментарий</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 w-full rounded-2xl border p-3"
          rows={3}
          placeholder="Пожелания к поездке"
        />
      </div>

      {/* Кнопка */}
      <button
        type="submit"
        className="w-full h-14 rounded-2xl bg-black text-white text-lg font-semibold hover:bg-emerald-700"
      >
        Подтвердить заказ
      </button>
    </form>
  );
}
