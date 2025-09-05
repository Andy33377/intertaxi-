"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [childSeat, setChildSeat] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      passengers,
      childSeat,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };
    console.log("ORDER:", payload);
    router.push("/thanks");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ""))}
          className="mt-1 w-full rounded-2xl border p-3"
          placeholder="+373 ..."
          autoComplete="tel"
          required
        />
      </div>

      {/* Пассажиры + кресло */}
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
          Нужное детское кресло
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
        className="w-full h-14 rounded-2xl bg-black text-white text-lg font-semibold"
      >
        Подтвердить заказ
      </button>
    </form>
  );
}
