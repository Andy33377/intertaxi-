"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, MapPinned, Search, X } from "lucide-react";
import { getCityLabel, routes, type Route } from "@/lib/cities";
import {
  COUNTRY_CHANGE_EVENT,
  getCurrentCountry,
  type Country,
} from "@/lib/country";
import { formatPrice } from "@/lib/priceFormatter";
import { Button, Card, PriceRow, SectionHeading } from "@/components/ui";
import BenefitGrid from "@/components/BenefitGrid";

type RoutePrefillDetail = {
  fromId: string;
  toId: string;
};

const ROUTE_PREFILL_EVENT = "intertaxi:prefill-route";

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase("ru").replace(/ё/g, "е");
}

export default function PriceList() {
  const [country, setCountry] = useState<Country>("PMR");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const updateCountry = () => setCountry(getCurrentCountry());
    updateCountry();
    window.addEventListener(COUNTRY_CHANGE_EVENT, updateCountry);
    window.addEventListener("storage", updateCountry);
    return () => {
      window.removeEventListener(COUNTRY_CHANGE_EVENT, updateCountry);
      window.removeEventListener("storage", updateCountry);
    };
  }, []);

  const filteredRoutes = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    if (!normalizedQuery) return routes;

    return routes.filter((route) => {
      const routeLabel = normalizeSearch(
        `${getCityLabel(route.fromId)} ${getCityLabel(route.toId)}`,
      );
      return routeLabel.includes(normalizedQuery);
    });
  }, [query]);

  const routesByOrigin = useMemo(() => {
    const groups = new Map<string, Route[]>();
    filteredRoutes.forEach((route) => {
      const current = groups.get(route.fromId) ?? [];
      current.push(route);
      groups.set(route.fromId, current);
    });
    return Array.from(groups.entries());
  }, [filteredRoutes]);

  const selectRoute = (route: Route) => {
    const detail: RoutePrefillDetail = {
      fromId: route.fromId,
      toId: route.toId,
    };
    window.dispatchEvent(
      new CustomEvent<RoutePrefillDetail>(ROUTE_PREFILL_EVENT, { detail }),
    );
    window.requestAnimationFrame(() => {
      document
        .getElementById("booking")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="py-14 sm:py-20">
      <SectionHeading
        index="01"
        kicker="Популярные направления"
        title="Маршруты и цены"
        description="Найдите нужный город и нажмите на маршрут — форма заказа заполнится автоматически."
        align="center"
      />

      <div className="mt-10">
        <BenefitGrid />
      </div>

      <div className="view-rise mx-auto mt-12 max-w-3xl">
        <label
          htmlFor="route-search"
          className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-ink-dim"
        >
          Найти маршрут
        </label>
        <div className="flex min-h-12 items-center rounded-xl border border-line-strong bg-surface transition focus-within:border-gold">
          <Search className="ml-4 size-5 shrink-0 text-ink-mute" aria-hidden />
          <input
            id="route-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Например, Бендеры или аэропорт"
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-ink outline-none placeholder:text-ink-mute"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Очистить поиск маршрутов"
              onClick={() => setQuery("")}
              className="mr-1"
            >
              <X className="size-5" aria-hidden />
            </Button>
          )}
        </div>
        <p className="mt-2 text-sm text-ink-mute" aria-live="polite">
          Найдено маршрутов: {filteredRoutes.length}
        </p>
      </div>

      {routesByOrigin.length === 0 ? (
        <Card tone="muted" className="mx-auto mt-8 max-w-3xl p-8 text-center">
          <MapPinned className="mx-auto size-10 text-ink-mute" aria-hidden />
          <h3 className="mt-4 font-display text-lg font-semibold text-ink">
            Маршрут не найден
          </h3>
          <p className="mt-2 text-sm text-ink-dim">
            Попробуйте другой город или напишите нам — рассчитаем поездку.
          </p>
        </Card>
      ) : (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {routesByOrigin.map(([fromId, originRoutes]) => (
            <Card key={fromId} className="view-rise overflow-hidden p-0">
              <div className="relative flex items-center gap-3 border-b border-line bg-bg-deep/60 px-4 py-4">
                <span
                  className="road-divider absolute inset-x-4 bottom-0 opacity-60"
                  style={{ height: 2 }}
                  aria-hidden="true"
                />
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold">
                  <MapPinned className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-ink-mute">
                    Отправление из
                  </p>
                  <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                    {getCityLabel(fromId)}
                  </h3>
                </div>
              </div>

              <div>
                {originRoutes.map((route) => (
                  <PriceRow
                    key={route.id}
                    label={getCityLabel(route.toId)}
                    price={formatPrice(`от ${route.price} лей`, country)}
                    note="Выбрать маршрут"
                    onClick={() => selectRoute(route)}
                    className="min-h-16"
                  />
                ))}
              </div>

              <div className="flex items-center justify-end gap-1 border-t border-line px-4 py-2.5 text-xs font-semibold text-ink-mute">
                Нажмите, чтобы заполнить заказ
                <ArrowUpRight className="size-3.5 text-gold" aria-hidden />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
