import Image from "next/image";
import { NextSeo } from "next-seo";
import {
  Armchair,
  BadgePercent,
  Clock3,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import AboutUs from "@/components/AboutUs";
import AutoPark from "@/components/AutoPark";
import BookingWidget from "@/components/BookingWidget";
import Contacts from "@/components/Contacts";
import PriceList from "@/components/PriceList";
import SiteShell from "@/components/SiteShell";
import { siteConfig } from "@/lib/siteConfig";

const heroPoints = [
  { label: "Фиксированные цены", icon: ShieldCheck },
  { label: "Дневные и ночные поездки", icon: Clock3 },
  { label: "Детское кресло", icon: Armchair },
];

const marqueeItems = [
  "Бендеры → Кишинёв",
  "Тирасполь → Аэропорт",
  "Бендеры → Одесса",
  "Фиксированные цены",
  "Кишинёв → Тирасполь",
  "Обратно −50%",
  "Днём и ночью",
];

export default function HomePage() {
  const title = "InterTaxi — Междугороднее такси по Молдове и Приднестровью";
  const description =
    "Закажите междугороднее такси InterTaxi онлайн: Бендеры, Тирасполь, Кишинёв, аэропорт и другие направления по Молдове, ПМР и Украине.";

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={siteConfig.url}
        openGraph={{
          type: "website",
          url: siteConfig.url,
          title,
          description,
          siteName: siteConfig.name,
          locale: "ru_RU",
          images: [
            {
              url: `${siteConfig.url}/og-intertaxi.jpg`,
              width: 1200,
              height: 630,
              alt: "InterTaxi — междугороднее такси",
            },
          ],
        }}
      />

      <SiteShell>
        <section
          id="home"
          className="hero-glow grain relative isolate overflow-hidden text-ink"
        >
          <div
            className="absolute inset-y-0 right-0 -z-10 hidden w-[60%] opacity-30 lg:block"
            aria-hidden="true"
          >
            <Image
              src="/header-img-car.png"
              alt=""
              fill
              priority
              sizes="60vw"
              className="object-contain object-right-bottom saturate-[0.6] contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d0b] via-[#0b0d0b]/55 to-[#0b0d0b]/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d0b] via-transparent to-[#0b0d0b]/70" />
          </div>

          <div className="section-shell relative z-10 grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.8fr)] lg:items-center lg:gap-14 lg:py-20">
            <div className="relative max-w-2xl">
              <div className="rise inline-flex min-h-9 items-center gap-3 rounded-full border border-line-strong bg-surface/70 px-4 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-ink-dim">
                <MapPin className="size-3.5 text-gold" aria-hidden="true" />
                Молдова · ПМР · Украина
              </div>

              <h1 className="rise rise-2 mt-7 font-display text-[clamp(1.9rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight">
                Между городами —{" "}
                <span className="relative whitespace-nowrap text-gold">
                  без сюрпризов
                  <span
                    className="road-divider absolute -bottom-2 left-0 w-full"
                    aria-hidden="true"
                  />
                </span>
              </h1>

              <p className="rise rise-3 mt-7 max-w-xl text-base leading-7 text-ink-dim sm:text-lg sm:leading-8">
                Выберите маршрут, узнайте цену и запланируйте поездку за пару
                минут. Встретим вовремя и довезём с комфортом.
              </p>

              <div className="rise rise-4 mt-7 flex items-center gap-4 rounded-2xl border border-dashed border-gold/45 bg-gold-soft/70 p-4 sm:max-w-lg">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold text-[#14120a]">
                  <BadgePercent className="size-6" aria-hidden="true" />
                </span>
                <p className="text-sm leading-6 text-ink-dim">
                  <strong className="block font-display text-sm font-semibold tracking-wide text-gold">
                    ОБРАТНАЯ ПОЕЗДКА −50%
                  </strong>
                  Добавьте возвращение прямо в форме заказа.
                </p>
              </div>

              <ul className="rise rise-5 mt-8 grid gap-3 text-sm text-ink-dim sm:grid-cols-3">
                {heroPoints.map(({ label, icon: Icon }) => (
                  <li key={label} className="flex min-h-11 items-center gap-2.5">
                    <Icon className="size-4 shrink-0 text-gold" aria-hidden="true" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <BookingWidget className="rise rise-4 relative z-20" />
          </div>

          <div className="relative z-10 border-t border-line py-4">
            <div className="marquee" aria-hidden="true">
              <div className="marquee-track">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex shrink-0 items-center">
                    {marqueeItems.map((item) => (
                      <span
                        key={`${copy}-${item}`}
                        className="flex items-center gap-6 pr-6 font-display text-[0.66rem] font-medium uppercase tracking-[0.3em] text-ink-mute"
                      >
                        {item}
                        <span className="size-1.5 rotate-45 bg-gold/70" />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="routes" className="scroll-mt-20 bg-background">
          <span id="benefits" className="block scroll-mt-20" aria-hidden="true" />
          <div className="section-shell">
            <PriceList />
          </div>
        </section>

        <section
          id="autopark"
          className="surface-grid scroll-mt-20 border-y border-line bg-bg-deep"
        >
          <div className="section-shell">
            <AutoPark />
          </div>
        </section>

        <section id="about" className="scroll-mt-20 bg-background">
          <div className="section-shell">
            <AboutUs />
          </div>
        </section>

        <section
          id="contacts"
          className="scroll-mt-20 border-t border-line bg-surface/40"
        >
          <div className="section-shell">
            <Contacts />
          </div>
        </section>
      </SiteShell>
    </>
  );
}
