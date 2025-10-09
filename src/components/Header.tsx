"use client";
import React, { useEffect, useState } from "react";

type NavItem = { label: string; target?: string; href?: string };

const items: NavItem[] = [
  { label: "Главная", target: "home" },
  { label: "Маршруты", target: "routes" },
  { label: "О компании", target: "about" },
  { label: "Контакты", target: "contacts" },
  { label: "Мои заказы", href: "/my-orders" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  // 🔹 Закрытие меню по клавише Esc
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
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

      {/* Контент с отступом под фиксированный header */}
      <main className="pt-[64px]">{/* Весь контент страницы */}</main>
    </>
  );
};

export default Header;
