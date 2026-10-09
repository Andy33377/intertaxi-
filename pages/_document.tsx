import { Head, Html, Main, NextScript } from "next/document";
import { golos, unbounded } from "@/lib/fonts";
import { GOOGLE_ADS_ID } from "@/lib/gtag";

export default function Document() {
  return (
    <Html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`${golos.variable} ${unbounded.variable}`}
    >
      <Head>
        {/* Google tag (gtag.js) — Google Ads */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
