"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import {
  COUNTRY_CHANGE_EVENT,
  Country,
  countryMeta,
  getCurrentCountry,
  setCurrentCountry,
} from "@/lib/country";
import { siteConfig } from "@/lib/siteConfig";

const navItems = [
  { label: "Маршруты", href: "/#routes" },
  { label: "Почему мы", href: "/#benefits" },
  { label: "Автопарк", href: "/#autopark" },
  { label: "Контакты", href: "/#contacts" },
  { label: "Эвакуатор", href: "/evacuators", emergency: true },
  { label: "Мои заказы", href: "/my-orders" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState<Country>("PMR");
  const countryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveCountry(getCurrentCountry());
    const updateCountry = () => setActiveCountry(getCurrentCountry());
    window.addEventListener(COUNTRY_CHANGE_EVENT, updateCountry);
    window.addEventListener("storage", updateCountry);
    return () => {
      window.removeEventListener(COUNTRY_CHANGE_EVENT, updateCountry);
      window.removeEventListener("storage", updateCountry);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setCountryOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        countryRef.current &&
        !countryRef.current.contains(event.target as Node)
      ) {
        setCountryOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const chooseCountry = (country: Country) => {
    setCurrentCountry(country);
    setActiveCountry(country);
    setCountryOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-line bg-[rgb(9_11_9/0.86)] text-ink backdrop-blur-xl">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/#home"
            className="flex min-h-11 items-center gap-3 rounded-lg"
            aria-label={`${siteConfig.name}, на главную`}
          >
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-lg bg-gold font-display text-xs font-bold text-[#14120a]">
              <span
                className="checker-strip absolute inset-x-0 top-0 opacity-20"
                style={{ height: 6, backgroundSize: "6px 6px" }}
                aria-hidden="true"
              />
              IT
            </span>
            <span className="leading-none">
              <span className="block font-display text-sm font-semibold tracking-[0.08em]">
                {siteConfig.name.toUpperCase()}
              </span>
              <span className="mt-1 hidden text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-ink-mute sm:block">
                Междугороднее такси
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold transition-colors hover:bg-surface-2 ${
                  item.emergency
                    ? "text-[#ff9257] hover:text-[#ffab7d]"
                    : "text-ink-dim hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div ref={countryRef} className="relative">
              <button
                type="button"
                onClick={() => setCountryOpen((value) => !value)}
                className="flex min-h-11 items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-3 text-sm font-bold transition-colors hover:border-gold/40 hover:bg-surface-2"
                aria-expanded={countryOpen}
                aria-haspopup="menu"
                aria-label="Выбрать регион и валюту"
              >
                <span aria-hidden="true">{countryMeta[activeCountry].flag}</span>
                <span>{countryMeta[activeCountry].label}</span>
                <ChevronDown className="size-4 text-ink-mute" aria-hidden="true" />
              </button>

              <AnimatePresence>
                {countryOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -4 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  role="menu"
                  aria-label="Регион и валюта"
                  className="absolute right-0 top-[calc(100%+0.5rem)] w-64 origin-top-right rounded-2xl border border-line-strong bg-surface p-2 text-ink shadow-lift"
                >
                  {(Object.keys(countryMeta) as Country[]).map((country) => (
                    <button
                      key={country}
                      type="button"
                      role="menuitemradio"
                      aria-checked={activeCountry === country}
                      onClick={() => chooseCountry(country)}
                      className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm transition-colors hover:bg-surface-2 ${
                        activeCountry === country
                          ? "bg-gold-soft font-bold text-gold"
                          : ""
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span aria-hidden="true">{countryMeta[country].flag}</span>
                        <span>{countryMeta[country].name}</span>
                      </span>
                      <span className="text-xs text-ink-mute">
                        {countryMeta[country].currency}
                      </span>
                    </button>
                  ))}
                </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/#booking"
              className="hidden min-h-11 items-center rounded-lg bg-gold px-4 text-sm font-extrabold text-[#14120a] shadow-gold transition-colors hover:bg-gold-bright sm:flex"
            >
              Заказать
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="grid size-11 place-items-center rounded-lg transition-colors hover:bg-surface-2 lg:hidden"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? (
                <X className="size-6" aria-hidden="true" />
              ) : (
                <Menu className="size-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
      {menuOpen && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            type="button"
            className="fixed inset-0 top-16 z-40 cursor-default bg-black/60"
            onClick={() => setMenuOpen(false)}
            aria-label="Закрыть меню"
          />
          <motion.nav
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.2, 1] }}
            id="mobile-navigation"
            aria-label="Мобильная навигация"
            className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line-strong bg-surface px-4 py-4 text-ink shadow-lift lg:hidden"
          >
            <div className="mx-auto grid max-w-2xl gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-12 items-center rounded-xl px-3 font-semibold transition-colors hover:bg-surface-2 ${
                    item.emergency ? "text-[#ff9257]" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-4">
                <a
                  href={siteConfig.phone.href}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line-strong font-bold"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Позвонить
                </a>
                <Link
                  href="/#booking"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center justify-center rounded-xl bg-gold font-extrabold text-[#14120a]"
                >
                  Заказать
                </Link>
              </div>
            </div>
          </motion.nav>
        </>
      )}
      </AnimatePresence>

      <div className="h-16" aria-hidden="true" />
    </>
  );
}
