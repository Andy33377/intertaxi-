"use client";
import React, { useState } from "react";

const cars = [
  {
    id: 1,
    image: "/car0.png",
    name: "Volkswagen Golf",
    description:
      "Компактный и экономичный хэтчбек для городских и междугородних поездок. Удобный салон и комфортная подвеска.",
    seats: 5,
    fuel: "Дизель",
    childSeat: true,
    ac: true,
    largeLuggage: false,
  },
  {
    id: 2,
    image: "/car1.png",
    name: "Volkswagen Touran",
    description:
      "Компактный минивэн для семейных поездок. Удобный салон, экономичный расход, отличный выбор для междугородних маршрутов.",
    seats: 6,
    fuel: "Дизель",
    childSeat: true,
    ac: true,
    largeLuggage: false,
  },
  {
    id: 3,
    image: "/car2.png",
    name: "Volkswagen Transporter T4",
    description:
      "Просторный фургон для комфортных поездок. Большой багажник, удобные кресла, идеален для групп и перевозки багажа.",
    seats: 6,
    fuel: "Дизель",
    childSeat: true,
    ac: true,
    largeLuggage: true,
  },
];

const AutoPark = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cars.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div id="autopark" className="pb-10">
      <h2 className="pt-16 text-center text-black text-2xl font-black mb-8">
        Наш автопарк
      </h2>

      <div className="max-w-2xl mx-auto">
        {/* Карусель */}
        <div className="relative">
          {/* Основное изображение - закругления только сверху */}
          <div className="relative w-full   md:h-96 rounded-t-2xl overflow-hidden bg-gray-100 shadow-lg">
            <img
              src={cars[currentIndex].image}
              alt={cars[currentIndex].name}
              className="w-full h-full object-cover"
            />

            {/* Кнопки навигации */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
              aria-label="Предыдущее фото"
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
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
              aria-label="Следующее фото"
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Карточка с информацией - закругления только снизу, "наезжает" на фото */}
          <div className="bg-white rounded-b-2xl border-t-0 border-x border-b border-gray-200 p-4 shadow-sm -mt-2 relative z-10">
            {/* Название слева, цена справа */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg md:text-xl font-bold text-black">
                {cars[currentIndex].name}
              </h3>
            </div>

            {/* Характеристики в ряд с иконками */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
              <span className="flex items-center gap-1.5">
                <img
                  src="/directions_car_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                  alt=""
                  className="w-5 h-5 brightness-0"
                />
                <span>{cars[currentIndex].seats}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <img
                  src="/local_gas_station_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                  alt=""
                  className="w-5 h-5 brightness-0"
                />
                <span>{cars[currentIndex].fuel}</span>
              </span>
              {cars[currentIndex].childSeat && (
                <span className="flex items-center gap-1.5">
                  <img
                    src="/child_care_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                    alt=""
                    className="w-5 h-5 brightness-0"
                  />
                  <span>Детское кресло</span>
                </span>
              )}
              {cars[currentIndex].ac && (
                <span className="flex items-center gap-1.5">
                  <img
                    src="/ac_unit_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                    alt=""
                    className="w-5 h-5 brightness-0"
                  />
                  <span>Кондиционер</span>
                </span>
              )}
              {cars[currentIndex].largeLuggage && (
                <span className="flex items-center gap-1.5">
                  <img
                    src="/checked_bag_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                    alt=""
                    className="w-5 h-5 brightness-0"
                  />
                  <span>большой багаж</span>
                </span>
              )}
            </div>

            {/* Индикаторы (точки) */}
            <div className="flex justify-center gap-2 mt-4 mb-4">
              {cars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentIndex
                      ? "bg-black w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Перейти к фото ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoPark;
