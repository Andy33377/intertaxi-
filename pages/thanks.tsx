import Link from "next/link";

export default function Thanks() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Спасибо! Заказ отправлен.</h1>
      <Link
        href="/"
        className="rounded-2xl bg-black text-white font-semibold px-6 py-3 hover:bg-emerald-700"
      >
        На главную
      </Link>
    </div>
  );
}
