"use client";
import React from "react";
import ShareButton from "@/components/ShareButton";

const AboutUs = () => {
  return (
    <div id="about" className="px-6 pb-10 max-w-[375px] mx-auto">
      <div>
        <h2 className="pt-16 text-center text-black text-2xl font-black">
          О нас
        </h2>
        <p className="mt-4 text-center text-gray-700 leading-relaxed">
          InterTaxi — это междугороднее такси для удобных и безопасных поездок
          по Приднестровью и за его пределы. За рулём — <b>Александр</b>,
          водитель с опытом более трёх лет в сфере перевозок.
        </p>
        <p className="mt-4 text-center text-gray-700 leading-relaxed">
          Мы ценим пунктуальность, чистоту и комфорт. Для нас важно, чтобы
          каждая поездка проходила спокойно и с уважением к пассажиру.
        </p>
      </div>

      <div className="border-0 text-center w-full mt-10 mb-10 rounded-2xl p-6 bg-[#A9D3D9] flex flex-col gap-4 max-w-[320px] mx-auto shadow-sm">
        <h2 className="text-black text-2xl font-black">Контакты</h2>
        <p className="text-lg">Телефон</p>
        <p className="text-lg font-semibold">+373 (779)51963</p>
        <a
          href="tel:+37389056"
          className="flex justify-center rounded-2xl bg-black text-white font-semibold w-full py-3 hover:bg-gray-800 transition"
        >
          Позвонить
        </a>
      </div>

      <div className="text-center space-y-2 text-sm text-gray-600">
        <ShareButton />
        <p>© 2025 Такси Межгород — Все права защищены.</p>
      </div>
    </div>
  );
};

export default AboutUs;
