"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Options = [
  "Кишинёв (Центр)",
  "Кишинёв (Аэропорт)",
  "Григориополь",
  "Дубоссары",
  "Рыбница",
  "Каменка",
  "Бельцы",
  "Новые Анены",
  "Каушаны",
  "Паланка",
];

const returnOption = ["Бендеры", "Тирасполь", "Слободзея"];

export default function ContactsPage() {
  const router = useRouter();
  const [roundTrip, setRoundTrip] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const payload = {
      from: data.get("from"),
      to: data.get("to"),
      date: data.get("date"),
      time: data.get("time"),
      roundTrip,
      returnTo: data.get("returnTo") || null, // доп. поле для обратного направления (сервер может игнорировать)
      returnDate: data.get("returnDate") || null, // если добавите поле даты обратки
      returnTime: data.get("returnTime") || null,
    };

    localStorage.setItem("tripData", JSON.stringify(payload));
    router.push("/order");
  };

  return (
    <div id="contacts">
      <section className="flex justify-center mt-[30px]">
        <form
          onSubmit={handleSubmit}
          className="border-0 w-full rounded-md p-3 bg-[#A9D3D9] pt-10 flex flex-col gap-4 max-w-[340px]"
        >
          <h2 className="text-center text-black text-2xl font-black">
            Запланируй поездку
          </h2>

          {/* Пункт отправления */}
          <select
            name="from"
            className="appearance-none border-none bg-white rounded-2xl p-4 outline-none"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Выберите пункт отправления
            </option>
            {Options.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Пункт назначения */}
          <select
            name="to"
            className="appearance-none border-none bg-white rounded-2xl p-4 outline-none"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Выберите пункт назначения
            </option>
            {Options.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Дата и время */}
          <input
            name="date"
            type="date"
            className="border-none bg-white rounded-2xl p-4 outline-none"
            required
          />
          <input
            name="time"
            type="time"
            step="300"
            className="border-none bg-white rounded-2xl p-4 outline-none"
            required
          />

          {/* Чекбокс обратной поездки */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={roundTrip}
              onChange={(e) => setRoundTrip(e.target.checked)}
            />
            Обратная поездка (−50% стоимости)
          </label>

          {/* Поля обратной поездки */}
          {roundTrip && (
            <>
              <select
                name="returnTo"
                className="appearance-none border-none bg-white rounded-2xl p-4 outline-none"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Выберите пункт назначения (обратно)
                </option>
                {returnOption.map((city, i) => (
                  <option key={i} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              {/* при необходимости добавьте поле даты обратки */}
              {/* <input name="returnDate" type="date" className="border-none bg-white rounded-2xl p-4 outline-none" required /> */}

              <input
                name="returnTime"
                type="time"
                step="300"
                className="border-none bg-white rounded-2xl p-4 outline-none"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="rounded-2xl bg-black text-white font-semibold py-3 hover:bg-emerald-700"
          >
            Дальше
          </button>
        </form>
      </section>
    </div>
  );
}
