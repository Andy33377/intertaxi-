import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Error500() {
  return (
    <div className="hero-glow grain relative flex min-h-screen items-center justify-center p-6 text-center">
      <div className="relative z-10">
        <p className="font-display text-[clamp(4rem,14vw,8rem)] font-semibold leading-none text-gold">
          500
        </p>
        <div className="road-divider mx-auto mt-4 w-40" aria-hidden="true" />
        <h1 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          Ошибка сервера
        </h1>
        <p className="mt-3 text-ink-dim">
          Мы уже работаем над проблемой. Попробуйте обновить страницу чуть позже.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gold px-6 font-extrabold text-[#14120a] shadow-gold transition-colors hover:bg-gold-bright"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
          На главную
        </Link>
      </div>
    </div>
  );
}
