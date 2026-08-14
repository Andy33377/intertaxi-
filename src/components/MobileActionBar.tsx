import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

type MobileActionBarProps = {
  phoneHref?: string;
  phoneLabel?: string;
  actionHref?: string;
  actionLabel?: string;
};

export default function MobileActionBar({
  phoneHref = siteConfig.phone.href,
  phoneLabel = "Позвонить",
  actionHref = "/#booking",
  actionLabel = "Заказать",
}: MobileActionBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-[rgb(8_9_8/0.92)] p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-14px_40px_rgb(0_0_0/0.5)] backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
        <a
          href={phoneHref}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line-strong bg-surface font-bold text-ink"
        >
          <Phone className="size-5 text-gold" aria-hidden="true" />
          {phoneLabel}
        </a>
        <Link
          href={actionHref}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gold font-extrabold text-[#14120a] shadow-gold"
        >
          {actionLabel}
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
