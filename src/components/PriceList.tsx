"use client";

import React, { useState, useEffect } from "react";
import { routes } from "@/lib/cities";
import { formatPrice, getCurrentCountry } from "@/lib/priceFormatter";

type Country = "MD" | "PMR" | "UA";

const PriceList = () => {
  const [country, setCountry] = useState<Country>("PMR"); // По умолчанию PMR

  useEffect(() => {
    const updateCountry = () => {
      setCountry(getCurrentCountry());
    };

    updateCountry();

    // изменения в других вкладках
    window.addEventListener("storage", updateCountry);

    // изменения в текущей вкладке
    const interval = setInterval(updateCountry, 500);

    return () => {
      window.removeEventListener("storage", updateCountry);
      clearInterval(interval);
    };
  }, []);

  // Делим маршруты на 2 колонки
  const midPoint = Math.ceil(routes.length / 2);
  const leftColumn = routes.slice(0, midPoint);
  const rightColumn = routes.slice(midPoint);

  return (
    <div id="routes" className="mt-3 mb-3">
      <h2 className="pt-15 text-center text-black text-2xl font-black">
        Наши маршруты
      </h2>

      {/* Описание */}
      <div className="max-w-5xl mx-auto px-4">
        <p className="px-6 pt-5 text-sm md:text-base text-slate-700">
          🚖{" "}
          <strong>Все маршруты InterTaxi доступны в обоих направлениях</strong>{" "}
          — как из города отправления в пункт назначения, так и обратно домой.
          <br />
          <br />
          🎫{" "}
          <strong>
            При заказе обратной поездки в день приезда действует скидка 50%
          </strong>
          , если вы возвращаетесь в свой родной город или в любой соседний
          населённый пункт по пути следования.
          <br />
          <br />
          🌍{" "}
          <strong>
            Наши маршруты охватывают ключевые города и аэропорты Молдовы,
            Приднестровья и Украины:
          </strong>{" "}
          Бендеры, Тирасполь, Слободзея, Григориополь, Дубоссары, Рыбница,
          Каменка, Кишинёв (центр и аэропорт), Бельцы, Каушаны, Новые Анены,
          Паланка, а также популярные направления в Украину.
          <br />
          <br />
          🕒 <strong>Мы обеспечиваем удобное время отправления</strong> (включая
          ночные поездки), возможность выбрать количество пассажиров и заказать
          детское кресло, фиксированные цены без скрытых платежей и комфортные
          автомобили для междугородних поездок.
          <br />
          <br />
          🚨 Дополнительно{" "}
          <strong>
            мы предоставляем услуги эвакуатора, автосервиса и шиномонтажа
          </strong>{" "}
          — круглосуточная помощь на дороге, в том числе при поломке или ДТП по
          маршруту следования.
        </p>
      </div>

      {/* Таблица */}
      <div className="max-w-6xl mx-auto mt-6 px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Левая колонка */}
          <div className="border border-gray-300">
            <table className="w-full border-collapse text-black">
              <tbody>
                {leftColumn.map((r, i) => (
                  <tr key={i} className="border-b border-gray-400">
                    <td className="px-6 py-5">
                      {r.from} – {r.to}
                    </td>
                    <td className="px-4 py-3 text-right font-bold">
                      {formatPrice(r.price, country)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Правая колонка */}
          <div className="border border-gray-300">
            <table className="w-full border-collapse text-black">
              <tbody>
                {rightColumn.map((r, i) => (
                  <tr key={i} className="border-b border-gray-400">
                    <td className="px-6 py-5">
                      {r.from} – {r.to}
                    </td>
                    <td className="px-4 py-3 text-right font-bold">
                      {formatPrice(r.price, country)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceList;
