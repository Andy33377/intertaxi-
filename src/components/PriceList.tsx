"use client";
import React from "react";
import { routes } from "@/lib/cities";

const PriceList = () => {
  return (
    <div id="routes">
      <h2 className="pt-15 text-center text-black text-2xl font-black">
        {" "}
        Наши маршруты{" "}
      </h2>
      <p className="pl-[24px] pr-[24px] pt-5">
        🚖 Все маршруты InterTaxi доступны в обоих направлениях — как из города
        отправления в пункт назначения, так и обратно домой.
        <br />
        <br />
        🎫 При заказе обратной поездки в день приезда действует скидка 50%, если
        вы возвращаетесь: в свой родной город; или в любой соседний населённый
        пункт по пути следования.
        <br />
        <br />
        🌍 Наши маршруты охватывают ключевые города и аэропорты Молдовы и
        Приднестровья: Бендеры, Тирасполь, Слободзея, Григориополь, Дубоссары,
        Рыбница, Каменка, Кишинёв (центр и аэропорт), Бельцы, Каушаны, Новые
        Анены, Паланка.
        <br />
        <br />
        🕒 Мы обеспечиваем: удобное время отправления, включая ночные поездки;
        возможность выбрать количество пассажиров и заказать детское кресло;
        фиксированные цены без скрытых платежей; комфортные автомобили для
        междугородних поездок.
      </p>
      <div className="max-w-md mx-auto mt-6 border border-gray-300">
        <table className="w-full border-collapse text-black">
          <tbody>
            {routes.map((r, i) => (
              <tr key={i} className="  border-b border-gray-400">
                <td className="px-6 py-5">
                  {r.from} - {r.to}
                </td>
                <td className="px-4 py-3 text-right font-bold">{r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceList;
