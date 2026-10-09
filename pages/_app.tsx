import type { AppProps } from "next/app";
import "react-day-picker/style.css";
import "../src/styles/globals.css";
import { DefaultSeo } from "next-seo";
import { golos, unbounded } from "@/lib/fonts";
import { siteConfig } from "@/lib/siteConfig";
import { useEffect } from "react";
import { handleContactClick } from "@/lib/gtag";

export default function MyApp({ Component, pageProps }: AppProps) {
  // Конверсии Google Ads: клики по телефону, Telegram, Viber
  useEffect(() => {
    document.addEventListener("click", handleContactClick);
    return () => document.removeEventListener("click", handleContactClick);
  }, []);

  return (
    <div className={`${golos.variable} ${unbounded.variable}`}>
      <DefaultSeo
        title={`${siteConfig.name} — Междугороднее такси`}
        description={siteConfig.description}
        openGraph={{
          type: "website",
          url: siteConfig.url,
          siteName: siteConfig.name,
          locale: "ru_RU",
          title: `${siteConfig.name} — Междугороднее такси`,
          description: siteConfig.description,

          images: [
            {
              url: `${siteConfig.url}/og-intertaxi.jpg`,
              width: 1200,
              height: 630,
              alt: `${siteConfig.name} — Междугороднее такси`,
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          { name: "theme-color", content: "#0b0d0b" },
          { name: "format-detection", content: "telephone=no" },
        ]}
        additionalLinkTags={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      <Component {...pageProps} />
    </div>
  );
}
