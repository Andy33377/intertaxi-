"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";

const items = [
  { label: "Главная", target: "home" },
  { label: "Маршруты", target: "routes" },
  { label: "Автопарк", target: "cars" },
  { label: "О компании", target: "about" },
  { label: "Контакты", target: "contacts" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[64px] bg-black text-white flex items-center justify-between z-50">
        <h2 className="ml-[24px] font-bold">InterTaxi</h2>
        <div className="flex justify-between gap-3">
          <h2>sign in</h2>
          <button onClick={() => setOpen((v) => !v)} className="">
            <svg
              className="mr-[24px]"
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

        <nav
          className={`absolute top-[64px] left-0 right-0 bg-white text-slate-900 shadow-lg transition-opacity duration-150 
      ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <ul className="py-2">
            {items.map(({ label, target }) => (
              <li key={target}>
                <a
                  href={`#${target}`}
                  onClick={() => setOpen(false)}
                  className="block w-full px-4 py-3 hover:bg-slate-100 active:bg-slate-200"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="px-4 pb-3">
              <button className="w-full rounded-full bg-emerald-600 text-white font-semibold px-4 py-3 hover:bg-emerald-700">
                Заказать поездку
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="pt-[64px]">{/* Весь контент страницы тут */}</main>
    </>
  );
};

export default Header;
