"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowRightLeft,
  Check,
  ChevronsUpDown,
  Search,
} from "lucide-react";
import { DatePicker, TimePicker } from "@/components/ui";
import {
  cityGroups,
  findRoute,
  getCityById,
  getCityLabel,
  resolveCityId,
  type City,
} from "@/lib/cities";
import {
  COUNTRY_CHANGE_EVENT,
  getCurrentCountry,
  type Country,
} from "@/lib/country";
import { formatPrice } from "@/lib/priceFormatter";

export const ROUTE_PREFILL_EVENT = "intertaxi:prefill-route" as const;
export const BOOKING_PREFILL_STORAGE_KEY = "bookingPrefill" as const;

export type RoutePrefillDetail = {
  fromId: string;
  toId: string;
};

export type BookingPrefill = RoutePrefillDetail & {
  fromLabel?: string;
  toLabel?: string;
  date?: string;
  time?: string;
  roundTrip?: boolean;
  returnDate?: string;
  returnTime?: string;
};

type BookingWidgetProps = {
  className?: string;
  onRouteChange?: (route: RoutePrefillDetail) => void;
};

type CityComboboxProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (cityId: string) => void;
  error?: string;
};

const ticketLabelClass =
  "mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-paper-ink/60";

function CityCombobox({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
}: CityComboboxProps) {
  const reactId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = `${id}-${reactId.replace(/:/g, "")}-listbox`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedLabel = value ? getCityLabel(value) : "";

  useEffect(() => {
    if (!open) setQuery(selectedLabel);
  }, [open, selectedLabel]);

  const filteredGroups = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ru");

    return cityGroups
      .map((group) => ({
        ...group,
        cities: group.cities.filter((city) =>
          city.label.toLocaleLowerCase("ru").includes(normalizedQuery),
        ),
      }))
      .filter((group) => group.cities.length > 0);
  }, [query]);

  const filteredCities = useMemo(
    () => filteredGroups.flatMap((group) => group.cities),
    [filteredGroups],
  );

  useEffect(() => {
    setActiveIndex((current) =>
      Math.min(current, Math.max(filteredCities.length - 1, 0)),
    );
  }, [filteredCities.length]);

  const optionId = (city: City) =>
    `${listboxId}-${city.id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;

  const selectCity = (city: City) => {
    onChange(city.id);
    setQuery(city.label);
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      if (filteredCities.length > 0) {
        setActiveIndex((current) =>
          Math.min(current + 1, filteredCities.length - 1),
        );
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter" && open && filteredCities[activeIndex]) {
      event.preventDefault();
      selectCity(filteredCities[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
      setQuery(selectedLabel);
    }
  };

  return (
    <div className="relative">
      <label htmlFor={id} className={ticketLabelClass}>
        {label}
      </label>
      <div
        className={`flex min-h-12 items-center rounded-xl border bg-white/75 shadow-[inset_0_1px_2px_rgb(25_27_18/0.06)] transition focus-within:bg-white ${
          error
            ? "border-[#b3341f]"
            : "border-paper-line focus-within:border-gold-deep"
        }`}
      >
        <Search
          className="ml-3 size-5 shrink-0 text-paper-ink/40"
          aria-hidden
        />
        <input
          ref={inputRef}
          id={id}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={
            open && filteredCities[activeIndex]
              ? optionId(filteredCities[activeIndex])
              : undefined
          }
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete="off"
          value={query}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onChange={(event) => {
            setQuery(event.target.value);
            onChange("");
            setOpen(true);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-paper-ink outline-none placeholder:text-paper-ink/40"
        />
        <button
          type="button"
          aria-label={`${open ? "Закрыть" : "Открыть"} список: ${label}`}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            setOpen((current) => !current);
            inputRef.current?.focus();
          }}
          className="mr-1 grid size-11 shrink-0 place-items-center rounded-lg text-paper-ink/50 hover:bg-paper-dim"
        >
          <ChevronsUpDown className="size-5" aria-hidden />
        </button>
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-[#b3341f]">
          {error}
        </p>
      )}

      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-paper-line bg-white p-1 shadow-xl"
        >
          {filteredGroups.length === 0 ? (
            <p className="px-3 py-4 text-sm text-paper-ink/60">
              Город не найден
            </p>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.id} role="group" aria-label={group.label}>
                <p className="px-3 pb-1 pt-3 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-paper-ink/45">
                  {group.label}
                </p>
                {group.cities.map((city) => {
                  const index = filteredCities.findIndex(
                    (option) => option.id === city.id,
                  );
                  const selected = city.id === value;

                  return (
                    <button
                      key={city.id}
                      id={optionId(city)}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => selectCity(city)}
                      className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-paper-ink ${
                        index === activeIndex
                          ? "bg-paper-dim"
                          : "hover:bg-paper-dim/60"
                      }`}
                    >
                      <span>{city.label}</span>
                      {selected && (
                        <Check className="size-4 text-gold-deep" aria-hidden />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function localToday() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function resolvePrefillCity(id: string | undefined, label?: string) {
  if (id && getCityById(id)) return id;
  return resolveCityId(label ?? id ?? "") ?? "";
}

export default function BookingWidget({
  className = "",
  onRouteChange,
}: BookingWidgetProps) {
  const router = useRouter();
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [country, setCountry] = useState<Country>("PMR");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const applyPrefill = useCallback((prefill: Partial<BookingPrefill>) => {
    const nextFromId = resolvePrefillCity(prefill.fromId, prefill.fromLabel);
    const nextToId = resolvePrefillCity(prefill.toId, prefill.toLabel);

    if (nextFromId) setFromId(nextFromId);
    if (nextToId) setToId(nextToId);
    if (prefill.date) setDate(prefill.date);
    if (prefill.time) setTime(prefill.time);
    if (typeof prefill.roundTrip === "boolean") {
      setRoundTrip(prefill.roundTrip);
    }
    if (prefill.returnDate) setReturnDate(prefill.returnDate);
    if (prefill.returnTime) setReturnTime(prefill.returnTime);
    setErrors({});
  }, []);

  useEffect(() => {
    setCountry(getCurrentCountry());

    const updateCountry = () => setCountry(getCurrentCountry());
    window.addEventListener(COUNTRY_CHANGE_EVENT, updateCountry);
    window.addEventListener("storage", updateCountry);

    try {
      const rawPrefill = window.localStorage.getItem(
        BOOKING_PREFILL_STORAGE_KEY,
      );
      if (rawPrefill) {
        applyPrefill(JSON.parse(rawPrefill) as Partial<BookingPrefill>);
        window.localStorage.removeItem(BOOKING_PREFILL_STORAGE_KEY);
      }
    } catch {
      window.localStorage.removeItem(BOOKING_PREFILL_STORAGE_KEY);
    }

    const handleRoutePrefill = (event: Event) => {
      const { detail } = event as CustomEvent<RoutePrefillDetail>;
      if (detail) applyPrefill(detail);
    };

    window.addEventListener(ROUTE_PREFILL_EVENT, handleRoutePrefill);
    return () => {
      window.removeEventListener(COUNTRY_CHANGE_EVENT, updateCountry);
      window.removeEventListener("storage", updateCountry);
      window.removeEventListener(ROUTE_PREFILL_EVENT, handleRoutePrefill);
    };
  }, [applyPrefill]);

  useEffect(() => {
    if (fromId && toId) onRouteChange?.({ fromId, toId });
  }, [fromId, onRouteChange, toId]);

  const knownRoute = useMemo(
    () => (fromId && toId ? findRoute(fromId, toId) : undefined),
    [fromId, toId],
  );
  const displayedPrice = knownRoute
    ? formatPrice(`от ${knownRoute.price} лей`, country)
    : null;

  const toggleRoundTrip = () => {
    setRoundTrip((current) => {
      const next = !current;
      if (next) {
        setReturnDate((value) => value || date);
        setReturnTime((value) => value || time);
      }
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!fromId) nextErrors.from = "Выберите пункт отправления";
    if (!toId) nextErrors.to = "Выберите пункт назначения";
    if (fromId && fromId === toId) {
      nextErrors.to = "Пункты отправления и назначения должны отличаться";
    }
    if (!date) nextErrors.date = "Выберите дату поездки";
    if (date && date < localToday()) {
      nextErrors.date = "Дата поездки не может быть в прошлом";
    }
    if (!time) nextErrors.time = "Выберите время поездки";
    if (roundTrip && !returnDate) {
      nextErrors.returnDate = "Выберите дату обратной поездки";
    }
    if (roundTrip && !returnTime) {
      nextErrors.returnTime = "Выберите время обратной поездки";
    }
    if (roundTrip && returnDate && date && returnDate < date) {
      nextErrors.returnDate = "Обратная поездка должна быть не раньше основной";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      from: getCityLabel(fromId),
      to: getCityLabel(toId),
      date,
      time,
      roundTrip,
      returnTo: roundTrip ? getCityLabel(fromId) : null,
      returnDate: roundTrip ? returnDate : null,
      returnTime: roundTrip ? returnTime : null,
    };

    window.localStorage.setItem("tripData", JSON.stringify(payload));
    router.push("/order");
  };

  return (
    <div id="booking" className={`scroll-mt-24 ${className}`}>
      <div className="ticket relative rounded-card shadow-lift">
        {/* Шапка билета */}
        <div className="relative overflow-hidden px-5 pb-5 pt-6 sm:px-7 sm:pt-7">
          <span
            className="checker-strip absolute inset-x-0 top-0 opacity-[0.13]"
            style={{
              height: 8,
              backgroundSize: "8px 8px",
              backgroundImage:
                "conic-gradient(#191b12 25%, transparent 0 50%, #191b12 0 75%, transparent 0)",
            }}
            aria-hidden="true"
          />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-paper-ink/50">
                Онлайн-заказ · шаг 1 из 2
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-paper-ink sm:text-2xl">
                Куда едем?
              </h2>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-paper-ink text-gold">
              <ArrowRight className="size-5" aria-hidden />
            </span>
          </div>
        </div>

        {/* Перфорация */}
        <div className="ticket-perforation" aria-hidden="true">
          <span className="ticket-notch ticket-notch--left" />
          <span className="ticket-notch ticket-notch--right" />
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 px-5 pb-6 pt-5 sm:px-7 sm:pb-7"
        >
          <CityCombobox
            id="booking-from"
            label="Откуда"
            placeholder="Начните вводить город"
            value={fromId}
            onChange={(cityId) => {
              setFromId(cityId);
              clearError("from");
            }}
            error={errors.from}
          />

          <div className="flex justify-center sm:-my-1 sm:justify-end">
            <button
              type="button"
              aria-label="Поменять местами пункты отправления и назначения"
              onClick={() => {
                setFromId(toId);
                setToId(fromId);
                setErrors({});
              }}
              className="grid size-11 place-items-center rounded-xl border border-paper-line bg-white/75 text-paper-ink/70 transition hover:border-gold-deep hover:text-paper-ink"
            >
              <ArrowRightLeft className="size-5" aria-hidden />
            </button>
          </div>

          <CityCombobox
            id="booking-to"
            label="Куда"
            placeholder="Начните вводить город"
            value={toId}
            onChange={(cityId) => {
              setToId(cityId);
              clearError("to");
            }}
            error={errors.to}
          />

          <AnimatePresence initial={false}>
            {displayedPrice && (
              <motion.div
                key="route-price"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 0.61, 0.2, 1] }}
                className="!mt-0 overflow-hidden"
                aria-live="polite"
              >
                <div className="flex min-h-12 items-baseline gap-3 rounded-xl border border-dashed border-gold-deep/50 bg-white/60 px-4 py-3">
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-paper-ink/55">
                    Цена маршрута
                  </span>
                  <span className="dotted-leader" aria-hidden="true" />
                  <strong className="whitespace-nowrap font-display text-base font-semibold text-paper-ink">
                    {displayedPrice}
                  </strong>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="booking-date" className={ticketLabelClass}>
                Дата
              </label>
              <DatePicker
                id="booking-date"
                tone="paper"
                value={date}
                min={localToday()}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? "booking-date-error" : undefined}
                onChange={(nextDate) => {
                  setDate(nextDate);
                  clearError("date");
                  if (returnDate && returnDate < nextDate) setReturnDate(nextDate);
                }}
              />
              {errors.date && (
                <p
                  id="booking-date-error"
                  className="mt-1 text-sm font-semibold text-[#b3341f]"
                >
                  {errors.date}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="booking-time" className={ticketLabelClass}>
                Время
              </label>
              <TimePicker
                id="booking-time"
                tone="paper"
                value={time}
                aria-invalid={Boolean(errors.time)}
                aria-describedby={errors.time ? "booking-time-error" : undefined}
                onChange={(nextTime) => {
                  setTime(nextTime);
                  clearError("time");
                }}
              />
              {errors.time && (
                <p
                  id="booking-time-error"
                  className="mt-1 text-sm font-semibold text-[#b3341f]"
                >
                  {errors.time}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={roundTrip}
            onClick={toggleRoundTrip}
            className={`flex min-h-14 w-full items-center justify-between gap-4 rounded-xl border-2 px-4 py-3 text-left transition ${
              roundTrip
                ? "border-gold-deep bg-[#f3e7c0]"
                : "border-paper-line bg-white/60 hover:border-gold-deep/60"
            }`}
          >
            <span>
              <span className="block font-bold text-paper-ink">
                Обратная поездка
              </span>
              <span className="block text-sm text-paper-ink/60">
                Возвращение в тот же день или выбранную дату
              </span>
            </span>
            <span className="shrink-0 rounded-full bg-paper-ink px-2.5 py-1 font-display text-xs font-semibold text-gold">
              −50%
            </span>
          </button>

          <AnimatePresence initial={false}>
            {roundTrip && (
              <motion.div
                key="return-trip"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 0.61, 0.2, 1] }}
                className="!mt-0 overflow-hidden"
              >
                <div className="grid gap-4 rounded-xl border border-dashed border-paper-line bg-white/50 p-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-return-date"
                      className={ticketLabelClass}
                    >
                      Дата обратно
                    </label>
                    <DatePicker
                      id="booking-return-date"
                      tone="paper"
                      value={returnDate}
                      min={date || localToday()}
                      aria-invalid={Boolean(errors.returnDate)}
                      aria-describedby={
                        errors.returnDate
                          ? "booking-return-date-error"
                          : undefined
                      }
                      onChange={(nextDate) => {
                        setReturnDate(nextDate);
                        clearError("returnDate");
                      }}
                    />
                    {errors.returnDate && (
                      <p
                        id="booking-return-date-error"
                        className="mt-1 text-sm font-semibold text-[#b3341f]"
                      >
                        {errors.returnDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="booking-return-time"
                      className={ticketLabelClass}
                    >
                      Время обратно
                    </label>
                    <TimePicker
                      id="booking-return-time"
                      tone="paper"
                      value={returnTime}
                      aria-invalid={Boolean(errors.returnTime)}
                      aria-describedby={
                        errors.returnTime
                          ? "booking-return-time-error"
                          : undefined
                      }
                      onChange={(nextTime) => {
                        setReturnTime(nextTime);
                        clearError("returnTime");
                      }}
                    />
                    {errors.returnTime && (
                      <p
                        id="booking-return-time-error"
                        className="mt-1 text-sm font-semibold text-[#b3341f]"
                      >
                        {errors.returnTime}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-paper-ink px-6 font-display text-sm font-semibold uppercase tracking-[0.18em] text-gold transition hover:bg-black"
          >
            Дальше
            <ArrowRight
              className="size-5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </button>
        </form>
      </div>
    </div>
  );
}
