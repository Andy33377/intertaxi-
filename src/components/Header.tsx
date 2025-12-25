"use client";

import React, { useEffect, useState } from "react";

type NavItem = { label: string; target?: string; href?: string };

const items: NavItem[] = [
  { label: "Главная", href: "/#home" },
  { label: "Маршруты", href: "/#routes" },
  { label: "О компании", href: "/#about" },
  { label: "Контакты", href: "/#contacts" },
  { label: "Автопарк", href: "/#autopark" },
  { label: "Эвакуаторы", href: "/evacuators" },
  { label: "Мои заказы", href: "/my-orders" },
];

type Country = "MD" | "PMR" | "UA"; // Исправлено: UK → UA

const countryMeta: Record<Country, { label: string; flag: string }> = {
  MD: { label: "MD", flag: "🇲🇩" },
  PMR: { label: "PMR", flag: "🇲🇩" },
  UA: { label: "UA", flag: "🇺🇦" }, // Исправлено: UK → UA
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<Country>("PMR"); // По умолчанию PMR
  const [countryModalOpen, setCountryModalOpen] = useState(false);

  // Читаем страну из localStorage при загрузке
  useEffect(() => {
    const saved = window.localStorage.getItem("country") as Country | null;
    if (saved === "MD" || saved === "PMR" || saved === "UA") {
      setCountry(saved);
    } else {
      // Если нет сохранённой, устанавливаем PMR и сохраняем
      setCountry("PMR");
      window.localStorage.setItem("country", "PMR");
    }
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setCountryModalOpen(false);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-black text-white h-[64px] w-full z-50">
        <div className="flex items-center justify-between w-full h-full px-4">
          <h2 className="font-bold text-lg">InterTaxi</h2>

          <div className="flex items-center gap-2">
            {/* Кнопка выбора страны */}
            <button
              type="button"
              onClick={() => setCountryModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-white text-black text-sm"
            >
              <span>{countryMeta[country].flag}</span>
              <span>{countryMeta[country].label}</span>
            </button>

            {/* Бургер-меню */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="p-2 -mr-2"
              aria-label="Открыть меню"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 8h16" />
                <path d="M4 16h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 🔹 Бекдроп под меню */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-[64px] bg-black/30 z-40"
        />
      )}

      {/* 🔹 Само меню */}
      <nav
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-[64px] left-0 right-0 bg-white text-slate-900 shadow-lg transition-opacity duration-150 z-50 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="py-2">
          {items.map((it) => (
            <li key={it.label}>
              <a
                href={it.href ?? `#${it.target}`}
                onClick={() => setOpen(false)}
                className="block w-full px-4 py-3 hover:bg-slate-100 active:bg-slate-200"
                rel={
                  it.href?.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {it.label}
              </a>
            </li>
          ))}

          <li className="px-4 pb-3">
            <a
              href="#contacts"
              onClick={() => setOpen(false)}
              className="block w-full rounded-full bg-emerald-600 text-white font-semibold px-4 py-3 hover:bg-emerald-700 text-center"
            >
              Запланировать поездку
            </a>
          </li>
        </ul>
      </nav>

      {/* 🔹 Модалка выбора страны */}
      {countryModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-4 w-[280px] space-y-3">
            <h2 className="text-lg font-semibold text-center">
              Выберите страну
            </h2>
            <div className="space-y-2">
              {(["MD", "PMR", "UA"] as Country[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCountry(c);
                    window.localStorage.setItem("country", c); // Сохраняем в localStorage
                    setCountryModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border ${
                    country === c
                      ? "bg-emerald-50 border-emerald-500"
                      : "bg-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{countryMeta[c].flag}</span>
                    <span className="font-medium">{countryMeta[c].label}</span>
                  </span>
                  {country === c && (
                    <span className="text-xs text-emerald-600">Выбрано</span>
                  )}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setCountryModalOpen(false)}
              className="w-full mt-1 rounded-xl border px-3 py-2 text-sm"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Контент с отступом под фиксированный header */}
      <main className="pt-[64px]">{/* Весь контент страницы */}</main>
    </>
  );
};

export default Header;
