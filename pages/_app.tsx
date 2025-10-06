import type { AppProps } from "next/app";
import "../src/styles/globals.css";
import { DefaultSeo } from "next-seo";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="InterTaxi — Междугороднее такси"
        description="Быстро и надёжно: поездки между городами Молдовы и Приднестровья. Онлайн‑заказ."
        openGraph={{
          type: "website",
          url: "https://intertaxi.vercel.app",
          title: "InterTaxi — Междугороднее такси",
          description:
            "Быстро и надёжно: поездки между городами Молдовы и Приднестровья.",

          images: [
            {
              url: "https://intertaxi.vercel.app/og-1.jpg",
              width: 1200,
              height: 630,
              alt: "InterTaxi — Междугороднее такси",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          { rel: "icon", href: "/favicon.ico" },
          { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}
