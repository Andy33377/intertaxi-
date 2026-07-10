"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  Camera,
  MessageCircle,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { siteConfig } from "@/lib/siteConfig";

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 0.61, 0.2, 1] as const },
  },
};

type ContactChannel = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

export default function Contacts() {
  const channels: ContactChannel[] = [
    {
      label: "Телефон",
      value: siteConfig.phone.display,
      href: siteConfig.phone.href,
      icon: Phone,
    },
    {
      label: "Telegram",
      value: "Написать в Telegram",
      href: siteConfig.social.telegram,
      icon: Send,
      external: true,
    },
    {
      label: "Viber",
      value: "Написать в Viber",
      href: siteConfig.social.viber,
      icon: MessageCircle,
      external: true,
    },
    {
      label: "Instagram",
      value: "Отзывы и новости",
      href: siteConfig.social.instagram,
      icon: Camera,
      external: true,
    },
  ];

  return (
    <div className="py-14 sm:py-20">
      <SectionHeading
        index="04"
        kicker="Всегда на связи"
        title="Свяжитесь удобным способом"
        description="Позвоните или напишите — подтвердим маршрут, время подачи и детали поездки."
        align="center"
        className="mb-9"
      />

      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {channels.map(({ label, value, href, icon: Icon, external }) => (
          <motion.a
            key={label}
            variants={cardVariants}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={`${label}: ${value}`}
            className="group relative flex min-h-32 flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-colors duration-200 hover:border-gold/40 hover:bg-surface-2 focus-visible:border-gold"
          >
            <div className="flex items-start justify-between">
              <span className="grid size-11 place-items-center rounded-xl bg-bg-deep text-gold transition-transform duration-200 group-hover:-translate-y-0.5">
                <Icon className="size-5" aria-hidden />
              </span>
              <ArrowUpRight
                className="size-5 text-ink-mute transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                aria-hidden
              />
            </div>
            <div className="mt-6">
              <span className="block text-[0.66rem] font-bold uppercase tracking-[0.2em] text-ink-mute">
                {label}
              </span>
              <span className="mt-1.5 block text-sm font-bold leading-snug text-ink">
                {value}
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
