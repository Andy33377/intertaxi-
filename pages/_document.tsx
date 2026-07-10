import { Head, Html, Main, NextScript } from "next/document";
import { golos, unbounded } from "@/lib/fonts";

export default function Document() {
  return (
    <Html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`${golos.variable} ${unbounded.variable}`}
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
