import Link from "next/link";
import { Camera, MessageCircle, Phone, Send } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const contactLinks = [
  {
    label: "Телефон",
    value: siteConfig.phone.display,
    href: siteConfig.phone.href,
    icon: Phone,
  },
  {
    label: "Telegram",
    value: "Написать",
    href: siteConfig.social.telegram,
    icon: Send,
  },
  {
    label: "Viber",
    value: "Открыть чат",
    href: siteConfig.social.viber,
    icon: MessageCircle,
  },
  {
    label: "Instagram",
    value: "Наши поездки",
    href: siteConfig.social.instagram,
    icon: Camera,
  },
];

const footerNav = [
  { label: "Маршруты", href: "/#routes" },
  { label: "Автопарк", href: "/#autopark" },
  { label: "Эвакуатор 24/7", href: "/evacuators" },
  { label: "Мои заказы", href: "/my-orders" },
];

export default function Footer() {
  return (
    <footer className="grain relative bg-bg-deep text-ink">
      <div className="checker-strip opacity-80" aria-hidden="true" />

      <div className="section-shell relative z-10 grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr] md:py-16">
        <div>
          <Link
            href="/#home"
            className="inline-flex min-h-11 items-center gap-3 rounded-lg"
          >
            <span className="grid size-10 place-items-center rounded-lg bg-gold font-display text-sm font-bold text-[#14120a]">
              IT
            </span>
            <span className="font-display text-xl font-semibold tracking-[0.06em]">
              {siteConfig.name.toUpperCase()}
            </span>
          </Link>
          <p className="mt-5 max-w-xl text-sm leading-6 text-ink-dim sm:text-base">
            Междугородние поездки по Молдове, Приднестровью и Украине — с
            понятной ценой, удобным временем и заботой о пассажирах.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold text-ink-dim">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                className="min-h-11 content-center transition-colors hover:text-gold"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-2">
          {contactLinks.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group min-h-24 rounded-2xl border border-line bg-surface/60 p-3.5 transition-colors hover:border-gold/40 hover:bg-surface"
              aria-label={`${label}: ${value}`}
            >
              <Icon
                className="size-5 text-gold transition-transform duration-200 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="mt-3 block text-xs uppercase tracking-[0.14em] text-ink-mute">
                {label}
              </span>
              <span className="mt-1 block text-sm font-bold text-ink">
                {value}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="relative z-10 border-t border-line">
        <div className="section-shell flex flex-col gap-2 py-5 text-xs text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Все права защищены.</p>
          <p className="font-display text-[0.62rem] tracking-[0.28em]">
            МОЛДОВА · ПМР · УКРАИНА
          </p>
        </div>
      </div>
    </footer>
  );
}
