"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "motion/react";
import { Checkbox, PhoneField } from "@/components/ui";
import {
  Armchair,
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";
import { addOrder } from "@/lib/ordersLocal";
import { findRouteByLabels } from "@/lib/cities";
import { formatPrice, getCurrentCountry } from "@/lib/priceFormatter";
import {
  PHONE_COUNTRIES,
  isValidNational,
  phoneErrorMessage,
  toE164,
  type PhoneCountry,
} from "@/lib/phone";
import { CONVERSIONS, trackConversion } from "@/lib/gtag";

type Trip = {
  from?: string;
  to?: string;
  date?: string;
  time?: string;
  roundTrip?: boolean;
  returnTo?: string | null;
  returnDate?: string | null;
  returnTime?: string | null;
};

const ticketLabelClass =
  "block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-paper-ink/60";

const ticketFieldClass =
  "mt-2 min-h-12 w-full rounded-xl border border-paper-line bg-white/75 px-4 text-base text-paper-ink shadow-[inset_0_1px_2px_rgb(25_27_18/0.06)] outline-none transition focus:border-gold-deep focus:bg-white";

export default function OrderForm() {
  const router = useRouter();
  const [trip, setTrip] = useState<Trip>({});
  const [tripLoaded, setTripLoaded] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<PhoneCountry>("MD");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [passengers, setPassengers] = useState(1);
  const [childSeat, setChildSeat] = useState(false);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("tripData");
      setTrip(raw ? (JSON.parse(raw) as Trip) : {});
    } catch {
      setTrip({});
    } finally {
      setTripLoaded(true);
    }
  }, []);

  const quotedPrice = useMemo(() => {
    if (!trip.from || !trip.to) return null;
    const route = findRouteByLabels(trip.from, trip.to);
    return route
      ? formatPrice(`от ${route.price} лей`, getCurrentCountry())
      : null;
  }, [trip.from, trip.to]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidNational(phone, phoneCountry)) {
      setPhoneError(phoneErrorMessage(phoneCountry));
      phoneInputRef.current?.focus();
      return;
    }
    setPhoneError(null);

    const payload = {
      ...trip,
      name: name.trim(),
      phone: toE164(phone, phoneCountry),
      passengers,
      childSeat,
      comment: comment.trim(),
    };

    setSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        window.alert(`Не удалось создать заказ: ${errorText}`);
        return;
      }

      const data = await response.json();
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
        returnTo: payload.returnTo ?? payload.from ?? null,
        returnDate: payload.returnDate ?? null,
        returnTime: payload.returnTime ?? null,
        price: quotedPrice ?? undefined,
        status: "submitted",
      });

      // Конверсия Google Ads: заявка отправлена (transaction_id защищает от дублей)
      trackConversion(CONVERSIONS.lead, { transaction_id: String(data.id) });

      window.localStorage.removeItem("tripData");
      await router.push("/thanks");
    } catch {
      window.alert("Не удалось отправить заказ. Проверьте соединение и попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!tripLoaded) {
    return (
      <div className="mx-auto h-[34rem] max-w-2xl animate-pulse rounded-card bg-surface shadow-card" />
    );
  }

  if (!trip.from || !trip.to || !trip.date || !trip.time) {
    return (
      <div className="mx-auto max-w-xl rounded-card border border-line bg-surface p-7 text-center shadow-card sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full border border-gold/30 bg-gold-soft text-gold">
          <MapPin className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          Сначала выберите маршрут
        </h1>
        <p className="mt-3 text-ink-dim">
          Вернитесь к форме поездки — выбранные города и цена появятся здесь.
        </p>
        <button
          type="button"
          onClick={() => router.push("/#booking")}
          className="mt-6 min-h-12 rounded-xl bg-gold px-6 font-extrabold text-[#14120a] shadow-gold transition-colors hover:bg-gold-bright"
        >
          Выбрать маршрут
        </button>
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.2, 1] }}
      onSubmit={handleSubmit}
      className="ticket relative mx-auto max-w-2xl rounded-card shadow-lift"
    >
      {/* Шапка билета — маршрут */}
      <div className="relative overflow-hidden px-5 pb-6 pt-6 sm:px-7 sm:pt-7">
        <span
          className="absolute inset-x-0 top-0 opacity-[0.13]"
          style={{
            height: 8,
            backgroundSize: "8px 8px",
            backgroundImage:
              "conic-gradient(#191b12 25%, transparent 0 50%, #191b12 0 75%, transparent 0)",
          }}
          aria-hidden="true"
        />
        <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-paper-ink/50">
          Онлайн-заказ · шаг 2 из 2
        </p>
        <h1 className="mt-2 font-display text-xl font-semibold tracking-tight text-paper-ink sm:text-2xl">
          Подтвердите поездку
        </h1>

        <div className="mt-6 grid gap-3 rounded-2xl border border-paper-line bg-white/60 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div>
            <span className={ticketLabelClass}>Откуда</span>
            <p className="mt-1 font-display text-base font-semibold tracking-tight text-paper-ink">
              {trip.from}
            </p>
          </div>
          <ArrowRight
            className="hidden size-5 text-gold-deep sm:block"
            aria-hidden="true"
          />
          <div className="sm:text-right">
            <span className={ticketLabelClass}>Куда</span>
            <p className="mt-1 font-display text-base font-semibold tracking-tight text-paper-ink">
              {trip.to}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-paper-ink/70">
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4 text-gold-deep" aria-hidden="true" />
            {trip.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock3 className="size-4 text-gold-deep" aria-hidden="true" />
            {trip.time}
          </span>
          {quotedPrice && (
            <strong className="ml-auto font-display text-base font-semibold text-paper-ink">
              {quotedPrice}
            </strong>
          )}
        </div>

        {trip.roundTrip && (
          <div className="mt-4 rounded-xl border border-dashed border-gold-deep/50 bg-[#f3e7c0]/70 px-4 py-3 text-sm text-paper-ink">
            <strong>Обратная поездка −50%:</strong>{" "}
            {trip.returnDate || trip.date} в {trip.returnTime || "уточняется"}
          </div>
        )}
      </div>

      {/* Перфорация */}
      <div className="ticket-perforation" aria-hidden="true">
        <span className="ticket-notch ticket-notch--left" />
        <span className="ticket-notch ticket-notch--right" />
      </div>

      <div className="space-y-6 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={ticketLabelClass}>
            Ваше имя <span className="text-[#b3341f]">*</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={ticketFieldClass}
              autoComplete="name"
              placeholder="Как к вам обращаться"
              required
            />
          </label>

          <div>
            <label htmlFor="order-phone" className={ticketLabelClass}>
              Телефон <span className="text-[#b3341f]">*</span>
            </label>
            <PhoneField
              id="order-phone"
              className="mt-2"
              tone="paper"
              value={phone}
              country={phoneCountry}
              inputRef={phoneInputRef}
              onValueChange={(next) => {
                setPhone(next);
                if (phoneError) setPhoneError(null);
              }}
              onCountryChange={(next) => {
                setPhoneCountry(next);
                setPhoneError(null);
              }}
              invalid={Boolean(phoneError)}
              describedBy="order-phone-hint"
              required
            />
            <p
              id="order-phone-hint"
              className={`mt-1.5 text-xs normal-case tracking-normal ${
                phoneError ? "text-[#b3341f]" : "text-paper-ink/55"
              }`}
            >
              {phoneError ??
                `Код +${PHONE_COUNTRIES[phoneCountry].dialCode} — ${PHONE_COUNTRIES[phoneCountry].hint}`}
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <span className={`flex items-center gap-2 ${ticketLabelClass}`}>
              <Users className="size-4" aria-hidden="true" />
              Пассажиры
            </span>
            <div className="mt-2 inline-grid grid-cols-[3rem_4rem_3rem] overflow-hidden rounded-xl border border-paper-line bg-white/75">
              <button
                type="button"
                onClick={() => setPassengers((count) => Math.max(1, count - 1))}
                className="grid min-h-12 place-items-center text-paper-ink transition hover:bg-paper-dim"
                aria-label="Уменьшить количество пассажиров"
              >
                <Minus className="size-4" aria-hidden="true" />
              </button>
              <output className="relative grid min-h-12 place-items-center overflow-hidden border-x border-paper-line font-display text-base font-semibold text-paper-ink">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={passengers}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    {passengers}
                  </motion.span>
                </AnimatePresence>
              </output>
              <button
                type="button"
                onClick={() => setPassengers((count) => Math.min(6, count + 1))}
                className="grid min-h-12 place-items-center text-paper-ink transition hover:bg-paper-dim"
                aria-label="Увеличить количество пассажиров"
              >
                <Plus className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <label
            htmlFor="order-child-seat"
            className={`flex min-h-20 cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
              childSeat
                ? "border-gold-deep bg-[#f3e7c0]/70"
                : "border-paper-line bg-white/60 hover:border-gold-deep/60"
            }`}
          >
            <Checkbox
              id="order-child-seat"
              tone="paper"
              checked={childSeat}
              onCheckedChange={setChildSeat}
            />
            <Armchair className="size-5 text-gold-deep" aria-hidden="true" />
            <span>
              <strong className="block text-sm text-paper-ink">
                Детское кресло
              </strong>
              <span className="text-xs text-paper-ink/60">
                Подготовим заранее
              </span>
            </span>
          </label>
        </div>

        <label className={`block ${ticketLabelClass}`}>
          Комментарий
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            className={`${ticketFieldClass} min-h-28 py-3`}
            rows={3}
            placeholder="Номер рейса, багаж или пожелания к поездке"
          />
        </label>

        <div className="flex items-start gap-3 rounded-xl border border-paper-line bg-white/50 p-4 text-sm text-paper-ink/70">
          <ShieldCheck
            className="mt-0.5 size-5 shrink-0 text-[#2c7a4b]"
            aria-hidden="true"
          />
          <p>Мы используем ваши контакты только для подтверждения этой поездки.</p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-paper-ink px-6 font-display text-sm font-semibold uppercase tracking-[0.18em] text-gold transition hover:bg-black disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? "Отправляем…" : "Подтвердить заказ"}
        </button>
      </div>
    </motion.form>
  );
}
