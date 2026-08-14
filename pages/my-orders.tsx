"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import {
  ArrowRight,
  Baby,
  Calendar,
  Car,
  Clock,
  History,
  LoaderCircle,
  RefreshCw,
  Trash2,
  Users,
} from "lucide-react";
import {
  BOOKING_PREFILL_STORAGE_KEY,
  type BookingPrefill,
} from "@/components/BookingWidget";
import Header from "@/components/Header";
import { Badge, Button, Card, Section } from "@/components/ui";
import {
  findRoute,
  findRouteByLabels,
  getCityLabel,
  resolveCityId,
} from "@/lib/cities";
import {
  COUNTRY_CHANGE_EVENT,
  getCurrentCountry,
  type Country,
} from "@/lib/country";
import {
  getOrders,
  clearOrders,
  type ClientOrder,
} from "@/lib/ordersLocal";
import { formatPrice } from "@/lib/priceFormatter";
import { siteConfig } from "@/lib/siteConfig";

const statusMeta: Record<
  string,
  { label: string; variant: "default" | "accent" | "success" | "warning" | "danger" }
> = {
  submitted: { label: "Отправлен", variant: "accent" },
  pending: { label: "Ожидает", variant: "warning" },
  confirmed: { label: "Подтверждён", variant: "success" },
  completed: { label: "Завершён", variant: "default" },
  cancelled: { label: "Отменён", variant: "danger" },
};

function formatTripDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function getStatus(order: ClientOrder) {
  const key = order.status?.toLowerCase() || "submitted";
  return statusMeta[key] ?? { label: order.status || "Отправлен", variant: "default" as const };
}

function getKnownPrice(order: ClientOrder, country: Country) {
  if (order.price) return order.price;

  const fromId = resolveCityId(order.from);
  const toId = resolveCityId(order.to);
  const route =
    fromId && toId
      ? findRoute(fromId, toId)
      : findRouteByLabels(order.from, order.to);

  return route
    ? formatPrice(`от ${route.price} лей`, country)
    : null;
}

export default function MyOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<ClientOrder[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [country, setCountry] = useState<Country>("PMR");

  useEffect(() => {
    const updateCountry = () => setCountry(getCurrentCountry());

    setOrders(getOrders());
    updateCountry();
    setHydrated(true);

    window.addEventListener("storage", updateCountry);
    window.addEventListener(COUNTRY_CHANGE_EVENT, updateCountry);
    return () => {
      window.removeEventListener("storage", updateCountry);
      window.removeEventListener(COUNTRY_CHANGE_EVENT, updateCountry);
    };
  }, []);

  const orderCards = useMemo(
    () =>
      orders.map((order) => ({
        order,
        price: getKnownPrice(order, country),
        status: getStatus(order),
      })),
    [country, orders],
  );

  const repeatOrder = (order: ClientOrder) => {
    const resolvedFromId = resolveCityId(order.from);
    const resolvedToId = resolveCityId(order.to);
    const prefill: BookingPrefill = {
      fromId: resolvedFromId ?? order.from,
      toId: resolvedToId ?? order.to,
      fromLabel: resolvedFromId
        ? getCityLabel(resolvedFromId) ?? order.from
        : order.from,
      toLabel: resolvedToId ? getCityLabel(resolvedToId) ?? order.to : order.to,
    };

    window.localStorage.setItem(
      BOOKING_PREFILL_STORAGE_KEY,
      JSON.stringify(prefill),
    );
    void router.push("/#booking");
  };

  const removeAllOrders = () => {
    if (!window.confirm("Удалить историю заказов на этом устройстве?")) return;
    clearOrders();
    setOrders([]);
  };

  return (
    <>
      <NextSeo
        title={`Мои заказы | ${siteConfig.name}`}
        description="История заказов междугороднего такси на этом устройстве."
        noindex
        nofollow
      />
      <Header />

      <main className="surface-grid min-h-screen bg-background text-ink">
        <Section size="md" className="py-8 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Badge variant="accent">История поездок</Badge>
                <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Мои заказы
                </h1>
                <p className="mt-2 text-sm leading-6 text-ink-mute">
                  Заказы сохраняются только на этом устройстве
                </p>
              </div>

              {hydrated && orders.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="min-h-11 self-start text-danger hover:bg-[#2c0f08] hover:text-danger"
                  onClick={removeAllOrders}
                >
                  <Trash2 aria-hidden="true" className="size-4" />
                  Очистить
                </Button>
              )}
            </div>

            <div className="mt-8" aria-live="polite">
              {!hydrated ? (
                <Card className="flex min-h-56 items-center justify-center p-8 text-center">
                  <div role="status" className="text-ink-mute">
                    <LoaderCircle
                      aria-hidden="true"
                      className="mx-auto size-8 animate-spin motion-reduce:animate-none"
                    />
                    <p className="mt-3 text-sm">Загружаем заказы…</p>
                  </div>
                </Card>
              ) : orderCards.length === 0 ? (
                <Card className="px-6 py-12 text-center sm:px-10">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-gold/25 bg-gold-soft text-gold">
                    <History aria-hidden="true" className="size-8" />
                  </div>
                  <h2 className="mt-6 font-display text-xl font-semibold tracking-tight">
                    Заказов пока нет
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-dim">
                    После оформления поездки она появится здесь. История хранится
                    локально и доступна только в этом браузере.
                  </p>
                  <Button href="/#booking" size="lg" className="mt-7">
                    <Car aria-hidden="true" className="size-5" />
                    Запланировать поездку
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {orderCards.map(({ order, price, status }) => (
                    <Card key={order.id} className="overflow-hidden p-0">
                      <div className="flex flex-col gap-4 border-b border-line p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                        <div className="min-w-0">
                          <p className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-ink-mute">
                            Маршрут
                          </p>
                          <h2 className="mt-2 flex flex-wrap items-center gap-2 font-display text-base font-semibold tracking-tight sm:text-lg">
                            <span>{order.from}</span>
                            <ArrowRight
                              aria-hidden="true"
                              className="size-5 shrink-0 text-gold"
                            />
                            <span>{order.to}</span>
                          </h2>
                        </div>
                        <Badge variant={status.variant} className="self-start">
                          {status.label}
                        </Badge>
                      </div>

                      <div className="grid gap-4 p-5 text-sm sm:grid-cols-2 sm:p-6">
                        <div className="flex items-start gap-3">
                          <Calendar
                            aria-hidden="true"
                            className="mt-0.5 size-5 shrink-0 text-ink-mute"
                          />
                          <div>
                            <p className="font-bold text-ink">
                              {formatTripDate(order.date)}
                            </p>
                            <p className="mt-1 flex items-center gap-1.5 text-ink-mute">
                              <Clock aria-hidden="true" className="size-4" />
                              {order.time}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Users
                            aria-hidden="true"
                            className="mt-0.5 size-5 shrink-0 text-ink-mute"
                          />
                          <div>
                            <p className="font-bold text-ink">
                              Пассажиров: {order.passengers}
                            </p>
                            {order.childSeat && (
                              <p className="mt-1 flex items-center gap-1.5 text-ink-mute">
                                <Baby aria-hidden="true" className="size-4" />
                                Детское кресло
                              </p>
                            )}
                          </div>
                        </div>

                        {order.roundTrip && (
                          <div className="rounded-xl border border-line bg-surface-2/60 p-3 sm:col-span-2">
                            <p className="font-bold text-ink">
                              Обратная поездка
                              {order.returnTo ? ` → ${order.returnTo}` : ""}
                            </p>
                            <p className="mt-1 text-ink-mute">
                              {order.returnDate
                                ? formatTripDate(order.returnDate)
                                : "Дата не указана"}
                              {order.returnTime ? `, ${order.returnTime}` : ""}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 border-t border-line bg-bg-deep/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div>
                          <p className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-ink-mute">
                            Стоимость
                          </p>
                          <p className="mt-1 font-display text-base font-semibold text-gold">
                            {price ?? "Уточнит оператор"}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="secondary"
                          className="min-h-11 sm:self-center"
                          onClick={() => repeatOrder(order)}
                        >
                          <RefreshCw aria-hidden="true" className="size-4" />
                          Повторить заказ
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
