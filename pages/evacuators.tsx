import Link from "next/link";
import { NextSeo } from "next-seo";
import {
  ArrowLeft,
  Camera,
  CircleDot,
  Clock,
  FileText,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import Header from "@/components/Header";
import EvacuatorPriceList from "@/components/EvacuatorPriceList";
import { Card, Section, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/lib/siteConfig";

const title = `Эвакуатор 24/7 в Бендерах, Тирасполе и по Молдове | ${siteConfig.name}`;
const description =
  "Круглосуточный эвакуатор, автосервис и шиномонтаж в Бендерах, Тирасполе, Молдове и Приднестровье. Позвоните — поможем на дороге.";

const services = [
  {
    title: "Эвакуатор",
    description:
      "Перевезём автомобиль после поломки или ДТП по городу и между городами.",
    icon: Truck,
  },
  {
    title: "Автосервис",
    description:
      "Поможем с запуском, диагностикой и мелким ремонтом на месте.",
    icon: Wrench,
  },
  {
    title: "Шиномонтаж",
    description:
      "Заменим или отремонтируем колесо при проколе, порезе или повреждении.",
    icon: CircleDot,
  },
];

const callSteps = [
  "Позвоните по одному из номеров выше",
  "Назовите точное местоположение и направление",
  "Опишите проблему: поломка, ДТП или автомобиль не заводится",
  "Согласуйте стоимость и ожидайте машину",
];

const features = [
  { label: "Работаем 24/7", icon: Clock },
  { label: "Молдова и Приднестровье", icon: MapPin },
  { label: "Чеки и документы", icon: FileText },
];

export default function EvacuatorsPage() {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`${siteConfig.url}/evacuators`}
        openGraph={{
          type: "website",
          locale: "ru_RU",
          url: `${siteConfig.url}/evacuators`,
          title,
          description,
          siteName: siteConfig.name,
          images: [
            {
              url: `${siteConfig.url}/og-1.jpg`,
              width: 1200,
              height: 630,
              alt: `Эвакуатор 24/7 — ${siteConfig.name}`,
            },
          ],
        }}
      />

      <div className="emergency-theme">
        <Header />

        <main className="min-h-screen bg-background text-ink">
          <div className="hero-glow grain relative border-b border-line">
            <Section size="sm" className="relative z-10">
              <div className="mx-auto max-w-3xl text-center">
                <div className="inline-flex min-h-9 items-center gap-3 rounded-full border border-gold/30 bg-gold-soft px-4 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-gold">
                  <Clock className="size-3.5" aria-hidden="true" />
                  Помощь на дороге 24/7
                </div>
                <h1 className="mt-6 font-display text-[clamp(1.7rem,4.5vw,2.9rem)] font-semibold leading-[1.12] tracking-tight">
                  Эвакуатор рядом,{" "}
                  <span className="text-gold">когда каждая минута важна</span>
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink-dim sm:text-lg">
                  Эвакуация, автосервис и шиномонтаж по Молдове и Приднестровью.
                  Нажмите на номер — оператор сразу примет вызов.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {siteConfig.evacuatorPhones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="emergency-pulse group flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-gold px-5 py-4 font-display text-lg font-semibold tracking-tight text-[#1c0b03] transition hover:bg-gold-bright motion-reduce:animate-none sm:text-xl"
                      aria-label={`Позвонить в службу эвакуации: ${phone.display}`}
                    >
                      <Phone aria-hidden="true" className="size-6 shrink-0" />
                      <span>{phone.display}</span>
                    </a>
                  ))}
                </div>

                <a
                  href="https://www.instagram.com/evakuator_pmr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-auto mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink-dim transition hover:bg-surface-2 hover:text-gold"
                >
                  <Camera aria-hidden="true" className="size-5" />
                  Эвакуатор в Instagram
                </a>
              </div>
            </Section>
          </div>

          <Section size="md" className="py-12 sm:py-16">
            <SectionHeading
              index="01"
              kicker="Поможем на месте"
              title="Дорожные услуги"
              align="center"
              className="mb-8"
            />

            <div className="grid items-stretch gap-4 md:grid-cols-3">
              {services.map(({ title: serviceTitle, description: text, icon: Icon }) => (
                <Card key={serviceTitle} className="view-rise h-full p-6">
                  <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold-soft text-gold">
                    <Icon aria-hidden="true" className="size-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {serviceTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink-dim">{text}</p>
                </Card>
              ))}
            </div>
          </Section>

          <Section size="md" className="pb-12 sm:pb-16">
            <EvacuatorPriceList />
          </Section>

          <Section size="md" className="pb-12 sm:pb-16">
            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <Card tone="dark" className="p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  Как вызвать эвакуатор
                </h2>
                <ol className="mt-7 list-none space-y-0">
                  {callSteps.map((step, index) => (
                    <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                      {index < callSteps.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute left-[21px] top-11 h-[calc(100%-2.25rem)] w-px border-l-2 border-dotted border-gold/40"
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-semibold text-[#1c0b03]"
                      >
                        {index + 1}
                      </span>
                      <p className="pt-2 text-sm leading-6 text-ink-dim">
                        <span className="sr-only">Шаг {index + 1}: </span>
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </Card>

              <Card tone="accent" className="p-6 sm:p-8">
                <ShieldCheck
                  aria-hidden="true"
                  className="size-10 text-gold-deep"
                />
                <h2 className="mt-5 font-display text-xl font-semibold tracking-tight text-paper-ink sm:text-2xl">
                  Для страховых компаний
                </h2>
                <p className="mt-3 text-sm leading-6 text-paper-ink/70">
                  Выписываем чеки и необходимые документы. Сообщите оператору о
                  страховке при оформлении вызова.
                </p>
              </Card>
            </div>
          </Section>

          <Section size="sm" className="pb-12">
            <div className="grid gap-3 sm:grid-cols-3">
              {features.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex min-h-20 items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3"
                >
                  <Icon aria-hidden="true" className="size-5 text-gold" />
                  <span className="text-sm font-bold text-ink">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/#home"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-ink-dim transition hover:bg-surface-2 hover:text-ink"
              >
                <ArrowLeft aria-hidden="true" className="size-5" />
                Вернуться на главную {siteConfig.name}
              </Link>
            </div>
          </Section>
        </main>
      </div>
    </>
  );
}
