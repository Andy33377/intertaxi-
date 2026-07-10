import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileActionBar from "@/components/MobileActionBar";

type SiteShellProps = {
  children: ReactNode;
  className?: string;
  emergency?: boolean;
  mobileAction?: {
    phoneHref?: string;
    phoneLabel?: string;
    actionHref?: string;
    actionLabel?: string;
  };
};

export default function SiteShell({
  children,
  className = "",
  emergency = false,
  mobileAction,
}: SiteShellProps) {
  return (
    <div className={`${emergency ? "emergency-theme" : ""} ${className}`}>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileActionBar {...mobileAction} />
    </div>
  );
}
