import type { AppProps } from "next/app";
import "../src/styles/globals.css";
import { DefaultSeo } from "next-seo";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="InterTaxi — Междугороднее такси"
        description="Быстро и надёжно: поездки между городами. Онлайн‑заказ."
        openGraph={{
          type: "website",
          url: "https://intertaxi.vercel.app",
          title: "InterTaxi — Междугороднее такси",
          description:
            "Быстро и надёжно: поездки между городами. Онлайн‑заказ.",
          images: [{ url: "https://intertaxi.vercel.app/og.jpg" }],
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
