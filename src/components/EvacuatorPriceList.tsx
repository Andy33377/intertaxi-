"use client";

import { useEffect, useState } from "react";
import { PriceRow } from "@/components/ui";
import {
  COUNTRY_CHANGE_EVENT,
  type Country,
  getCurrentCountry,
} from "@/lib/country";
import { evacuatorRoutes } from "@/lib/evacuatorRoutes";
import { formatPrice } from "@/lib/priceFormatter";

export default function EvacuatorPriceList() {
  const [country, setCountry] = useState<Country>("PMR");

  useEffect(() => {
    const updateCountry = () => setCountry(getCurrentCountry());

    updateCountry();
    window.addEventListener("storage", updateCountry);
    window.addEventListener(COUNTRY_CHANGE_EVENT, updateCountry);

    return () => {
      window.removeEventListener("storage", updateCountry);
      window.removeEventListener(COUNTRY_CHANGE_EVENT, updateCountry);
    };
  }, []);

  return (
    <section aria-labelledby="evacuator-tariffs-title">
      <h2
        id="evacuator-tariffs-title"
        className="mb-5 text-center font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
      >
        Тарифы эвакуатора
      </h2>

      <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
        <div>
          {evacuatorRoutes.map((route) => {
            const label =
              route.from === route.to
                ? route.from
                : `${route.from} → ${route.to}`;

            return (
              <PriceRow
                key={`${route.from}-${route.to}`}
                label={label}
                price={formatPrice(route.price, country)}
              />
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-center text-xs leading-5 text-ink-mute">
        Цена поездки по Кишинёву зависит от района. Точную стоимость сообщит
        оператор.
      </p>
    </section>
  );
}
