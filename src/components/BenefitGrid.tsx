"use client";

import { motion } from "motion/react";
import {
  ArrowLeftRight,
  ArrowUpRight,
  BadgePercent,
  Baby,
  MoonStar,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 0.61, 0.2, 1] as const },
  },
};

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
};

const benefits: Benefit[] = [
  {
    title: "Оба направления",
    description: "Любой опубликованный маршрут доступен туда и обратно.",
    icon: ArrowLeftRight,
  },
  {
    title: "Обратно −50%",
    description: "Скидка на обратную поездку по условиям выбранного маршрута.",
    icon: BadgePercent,
  },
  {
    title: "Днём и ночью",
    description: "Подберём удобное время отправления, включая ночные поездки.",
    icon: MoonStar,
  },
  {
    title: "Комфорт и безопасность",
    description: "Фиксированная цена, кондиционер и детское кресло по запросу.",
    icon: Baby,
  },
  {
    title: "Помощь на дороге",
    description: "Эвакуатор, автосервис и шиномонтаж при поломке или ДТП.",
    icon: Wrench,
    href: "/evacuators",
  },
];

export default function BenefitGrid() {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
    >
      {benefits.map(({ title, description, icon: Icon, href }) => {
        const content = (
          <>
            <span className="mb-4 grid size-11 place-items-center rounded-xl border border-gold/25 bg-gold-soft text-gold transition-transform duration-200 group-hover:-translate-y-0.5">
              <Icon className="size-5" aria-hidden />
            </span>
            <h3 className="font-display text-[0.88rem] font-semibold leading-snug tracking-tight text-ink">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">
              {description}
            </p>
          </>
        );

        return (
          <motion.div
            key={title}
            variants={cardVariants}
            className="group h-full rounded-2xl border border-line bg-surface p-4 transition-colors duration-200 hover:border-gold/35"
          >
            {href ? (
              <a
                href={href}
                className="block h-full rounded-lg focus-visible:outline-offset-4"
              >
                {content}
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-gold">
                  Подробнее
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </a>
            ) : (
              content
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
