import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle2, History, House } from "lucide-react";
import { NextSeo } from "next-seo";
import SiteShell from "@/components/SiteShell";

export default function Thanks() {
  return (
    <>
      <NextSeo
        title="Заказ отправлен — InterTaxi"
        description="Ваш заказ InterTaxi отправлен на подтверждение."
        noindex
        nofollow
      />
      <SiteShell>
        <section className="hero-glow grain relative min-h-[68vh] py-14 sm:py-20">
          <div className="section-shell relative z-10 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.2, 1] }}
              className="w-full max-w-xl rounded-card border border-line bg-surface p-6 text-center shadow-card sm:p-10"
            >
              <motion.span
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 16,
                  delay: 0.15,
                }}
                className="mx-auto grid size-16 place-items-center rounded-full border border-success/30 bg-[#0d2417] text-success"
              >
                <CheckCircle2 className="size-9" aria-hidden="true" />
              </motion.span>
              <p className="mt-6 font-display text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-success">
                Заказ принят
              </p>
              <h1 className="mt-3 font-display text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
                Спасибо! Мы скоро свяжемся с вами.
              </h1>
              <p className="mx-auto mt-4 max-w-md leading-7 text-ink-dim">
                Детали поездки сохранены на этом устройстве. Водитель подтвердит
                время и стоимость по телефону.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line-strong bg-surface font-bold text-ink transition-colors hover:border-gold/50 hover:bg-surface-2"
                >
                  <House className="size-5" aria-hidden="true" />
                  На главную
                </Link>
                <Link
                  href="/my-orders"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gold font-extrabold text-[#14120a] shadow-gold transition-colors hover:bg-gold-bright"
                >
                  <History className="size-5" aria-hidden="true" />
                  Мои заказы
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
