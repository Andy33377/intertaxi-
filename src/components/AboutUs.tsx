import { Clock3, MapPinned, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { siteConfig } from "@/lib/siteConfig";

const trustPoints = [
  {
    value: "10+ лет",
    label: "опыта за рулём",
    icon: ShieldCheck,
  },
  {
    value: "Днём и ночью",
    label: "по предварительному заказу",
    icon: Clock3,
  },
  {
    value: "3 региона",
    label: "Молдова, ПМР и Украина",
    icon: MapPinned,
  },
];

export default function AboutUs() {
  return (
    <div className="py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <SectionHeading
            index="03"
            kicker="О нас"
            title="Спокойная поездка начинается с доверия"
            description={
              <>
                <strong className="text-ink">{siteConfig.name}</strong> —
                междугородние поездки с вниманием к пунктуальности, чистоте
                автомобиля и комфорту каждого пассажира.
              </>
            }
          />
        </div>

        <div className="view-rise grid gap-3">
          {trustPoints.map(({ value, label, icon: Icon }) => (
            <div
              key={value}
              className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-gold/35"
            >
              <span
                className="road-divider absolute inset-x-5 top-0 opacity-0 transition-opacity duration-300 group-hover:opacity-70"
                style={{ height: 2 }}
                aria-hidden="true"
              />
              <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold-soft text-gold">
                <Icon className="size-6" aria-hidden />
              </span>
              <div>
                <p className="font-display text-lg font-semibold tracking-tight text-ink">
                  {value}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-dim">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
