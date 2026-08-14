"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  Baby,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Luggage,
  Snowflake,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Badge, Card, SectionHeading } from "@/components/ui";

type Car = {
  id: number;
  image: string;
  name: string;
  description: string;
  seats: number;
  fuel: string;
  childSeat: boolean;
  ac: boolean;
  largeLuggage: boolean;
};

const cars: Car[] = [
  {
    id: 1,
    image: "/car1.png",
    name: "Volkswagen Touran",
    description:
      "Удобный минивэн для семьи или небольшой компании с комфортным салоном.",
    seats: 6,
    fuel: "Дизель",
    childSeat: true,
    ac: true,
    largeLuggage: false,
  },
  {
    id: 2,
    image: "/car2.png",
    name: "Volkswagen Transporter T4",
    description:
      "Просторный автомобиль для групповых поездок и маршрутов с большим багажом.",
    seats: 6,
    fuel: "Дизель",
    childSeat: true,
    ac: true,
    largeLuggage: true,
  },
];

type Spec = {
  label: string;
  icon: LucideIcon;
};

export default function AutoPark() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<-1 | 1>(1);
  const car = cars[currentIndex];

  const move = (direction: -1 | 1) => {
    setSlideDirection(direction);
    setCurrentIndex(
      (current) => (current + direction + cars.length) % cars.length,
    );
  };

  const jumpTo = (index: number) => {
    if (index === currentIndex) return;
    setSlideDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const specs: Spec[] = [
    { label: `${car.seats} мест`, icon: Users },
    { label: car.fuel, icon: Fuel },
    ...(car.ac ? [{ label: "Кондиционер", icon: Snowflake }] : []),
    ...(car.childSeat ? [{ label: "Детское кресло", icon: Baby }] : []),
    ...(car.largeLuggage ? [{ label: "Большой багаж", icon: Luggage }] : []),
  ];

  return (
    <div className="py-14 sm:py-20">
      <SectionHeading
        index="02"
        kicker="Комфорт в пути"
        title="Наш автопарк"
        description="Подберём автомобиль под количество пассажиров, багаж и особенности поездки."
      />

      <Card className="view-rise mt-8 overflow-hidden p-0 lg:grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0f0c] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 62%, rgb(247 191 36 / 0.12), transparent 70%)",
            }}
            aria-hidden="true"
          />
          <AnimatePresence
            initial={false}
            custom={slideDirection}
            mode="popLayout"
          >
            <motion.div
              key={car.image}
              custom={slideDirection}
              initial={{ opacity: 0, x: slideDirection * 60, scale: 1.02 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: slideDirection * -60, scale: 0.99 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.2, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={car.image}
                alt={`${car.name} — автомобиль ${currentIndex + 1} из ${cars.length}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0d0f0c]/70 via-transparent to-transparent"
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 sm:px-4">
            <button
              type="button"
              aria-label="Показать предыдущий автомобиль"
              onClick={() => move(-1)}
              className="grid size-11 place-items-center rounded-full border border-line-strong bg-black/50 text-ink backdrop-blur transition hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Показать следующий автомобиль"
              onClick={() => move(1)}
              className="grid size-11 place-items-center rounded-full border border-line-strong bg-black/50 text-ink backdrop-blur transition hover:border-gold hover:text-gold"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </div>

          <span className="absolute bottom-3 right-3 rounded-full border border-line-strong bg-black/60 px-3 py-1 font-display text-[0.66rem] font-semibold tracking-[0.2em] text-gold backdrop-blur">
            {currentIndex + 1} / {cars.length}
          </span>
        </div>

        <div
          className="flex flex-col justify-center p-5 sm:p-7 lg:p-9"
          aria-live="polite"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-ink-mute">
                Борт №{car.id}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {car.name}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-dim">
                {car.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {specs.map(({ label, icon: Icon }) => (
                  <Badge
                    key={label}
                    variant="default"
                    className="gap-1.5 py-2 normal-case tracking-normal"
                  >
                    <Icon className="size-4 text-gold" aria-hidden />
                    {label}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div
            className="mt-7 flex justify-center lg:justify-start"
            aria-label="Выбор автомобиля"
          >
            {cars.map((option, index) => (
              <button
                key={option.id}
                type="button"
                aria-label={`Показать ${option.name}`}
                aria-current={index === currentIndex ? "true" : undefined}
                onClick={() => jumpTo(index)}
                className="grid size-11 place-items-center rounded-full hover:bg-surface-2"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-gold"
                      : "w-2 bg-line-strong"
                  }`}
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
