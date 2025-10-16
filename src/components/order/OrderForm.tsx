"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addOrder } from "@/lib/ordersLocal";

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
  const [country, setCountry] = useState<"MD" | "PMR" | "RU">("MD");

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

  // 🔹 Локальный state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [childSeat, setChildSeat] = useState(false);
  const [comment, setComment] = useState("");

  // Форматирование телефона по стране
  function formatPhone(raw: string, c: "MD" | "PMR" | "RU") {
    let digits = raw.replace(/\D/g, "");
    if (!digits) return "";
    // Убираем префикс 00
    if (digits.startsWith("00")) digits = digits.slice(2);

    if (c === "MD" || c === "PMR") {
      if (digits.startsWith("373")) digits = digits.slice(3);
      // Ожидаем 8 цифр
      digits = digits.slice(0, 8);
      const p1 = digits.slice(0, 2);
      const p2 = digits.slice(2, 5);
      const p3 = digits.slice(5, 8);
      return `+373${p1 ? " " + p1 : ""}${p2 ? " " + p2 : ""}${
        p3 ? " " + p3 : ""
      }`.trim();
    }

    // RU: +7 (XXX) XXX-XX-XX
    if (digits.startsWith("7")) digits = digits.slice(1);
    if (digits.startsWith("8")) digits = digits.slice(1); // часто вводят 8XXXXXXXXXX
    digits = digits.slice(0, 10);
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 6);
    const c4 = digits.slice(6, 8);
    const d4 = digits.slice(8, 10);

    let body = "";
    if (a) body = ` (${a}`;
    if (b) body += `) ${b}`;
    if (c4) body += `-${c4}`;
    if (d4) body += `-${d4}`;
    return `+7${body}`.trim();
  }

  function normalizePhoneForApi(formatted: string) {
    return formatted.replace(/[^+\d]/g, "");
  }

  // 🔹 Отправка заказа
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Мини-валидация телефона по выбранной стране
    const normalized = normalizePhoneForApi(phone);
    const valid =
      (country === "MD" && /^\+373\d{8}$/.test(normalized)) ||
      (country === "PMR" && /^\+373\d{8}$/.test(normalized)) ||
      (country === "RU" && /^\+7\d{10}$/.test(normalized));

    if (!valid) {
      alert(
        country === "RU"
          ? "Введите телефон в формате +7 (XXX) XXX-XX-XX"
          : "Введите телефон в формате +373 XX XXX XXX"
      );
      return;
    }
    const payload = {
      ...trip,
      name: name.trim(),
      phone: normalizePhoneForApi(phone),
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

      // 🔹 Пишем заказ в историю (localStorage)
      try {
        addOrder({
          id: data.id,
          createdAt: data.createdAt,
          name: payload.name,
          phone: payload.phone,
          passengers: payload.passengers,
          childSeat: payload.childSeat,
          comment: payload.comment || null,
          from: payload.from!,
          to: payload.to!,
          date: payload.date!,
          time: payload.time!,
          roundTrip: payload.roundTrip,
          returnDate: trip.returnDate ?? null,
          returnTime: trip.returnTime ?? null,
        });
      } catch {
        /* игнорируем ошибку локального сохранения */
      }

      // 🔹 Очищаем временные данные и переходим на страницу благодарности
      localStorage.removeItem("tripData");
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

  // 🔹 Основная форма
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

      <div>
        <label className="block text-sm font-medium">Телефон *</label>
        <div className="mt-1 flex gap-2">
          <select
            className="w-36 rounded-2xl border p-3 bg-white"
            value={country}
            onChange={(e) => {
              const c = e.target.value as "MD" | "PMR" | "RU";
              setCountry(c);
              setPhone((prev) => formatPhone(prev, c));
            }}
          >
            <option value="MD">🇲🇩 +373 (Молдова)</option>
            <option value="PMR">🇲🇩 +373 (ПМР)</option>
            <option value="RU">🇷🇺 +7 (Россия)</option>
          </select>
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value, country))}
            className="flex-1 rounded-2xl border p-3"
            placeholder={
              country === "RU" ? "+7 (9XX) XXX-XX-XX" : "+373 XX XXX XXX"
            }
            autoComplete="tel"
            maxLength={country === "RU" ? 18 : 16}
            required
          />
        </div>
        <p className="mt-1 text-xs text-slate-500">
          {country === "RU"
            ? "Формат: +7 (XXX) XXX-XX-XX"
            : "Формат: +373 XX XXX XXX"}
        </p>
      </div>

      {/* Пассажиры */}
      <div>
        <label className="block text-sm font-medium">Пассажиры</label>
        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={() => setPassengers((p) => Math.max(1, p - 1))}
            className="px-3 py-2 rounded-2xl border"
            aria-label="Уменьшить"
          >
            −
          </button>
          <input
            type="number"
            inputMode="numeric"
            className="w-20 text-center rounded-2xl border p-3"
            value={passengers}
            min={1}
            max={4}
            step={1}
            onChange={(e) => {
              const n = parseInt(e.target.value.replace(/^0+/, "") || "0", 10);
              if (Number.isNaN(n)) return;
              setPassengers(Math.max(1, Math.min(4, n)));
            }}
          />
          <button
            type="button"
            onClick={() => setPassengers((p) => Math.min(4, p + 1))}
            className="px-3 py-2 rounded-2xl border"
            aria-label="Увеличить"
          >
            +
          </button>
        </div>
      </div>

      {/* Детское кресло */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={childSeat}
          onChange={(e) => setChildSeat(e.target.checked)}
        />
        Детское кресло
      </label>

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
