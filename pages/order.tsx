import OrderForm from "@/components/order/OrderForm";
import SiteShell from "@/components/SiteShell";
import { NextSeo } from "next-seo";

export default function OrderPage() {
  return (
    <>
      <NextSeo
        title="Подтверждение поездки — InterTaxi"
        description="Проверьте маршрут и оставьте контакты для подтверждения поездки."
        noindex
        nofollow
      />
      <SiteShell>
        <section className="hero-glow grain relative min-h-[70vh] py-10 sm:py-14">
          <div className="section-shell relative z-10">
            <OrderForm />
          </div>
        </section>
      </SiteShell>
    </>
  );
}
