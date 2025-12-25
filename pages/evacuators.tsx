import Head from "next/head";
import Header from "@/components/Header";
import EvacuatorPriceList from "@/components/EvacuatorPriceList";

export default function EvacuatorsPage() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Услуги эвакуатора, автосервиса и шиномонтажа 24/7. Любые направления, работаем со страховыми, выписываем чеки."
        />
      </Head>

      <Header />
      <div className="flex flex-col items-center gap-3 mt-10 px-4">
        <img
          src="/evacuator-logo.png"
          alt="Эвакуатор"
          className="!max-w-[260px] md:!max-w-[320px] h-auto"
        />
        <p className="text-base md:text-lg text-gray-600 text-center max-w-2xl">
          Круглосуточная помощь на дороге: эвакуация, автосервис и шиномонтаж
        </p>
      </div>

      <main className="min-h-screen bg-white text-black">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-4"></div>

          {/* Main CTA Card - Uber style */}
          <div className="bg-black text-white rounded-2xl p-8 mb-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Вызвать эвакуатор</h2>

            <div className="space-y-4 mb-6">
              <a
                href="tel:+37377704380"
                className="block w-full bg-white text-black rounded-xl p-4 text-center text-lg font-semibold hover:bg-gray-100 transition"
              >
                ☎️ 0777 04 380
              </a>
              <a
                href="tel:+37362167613"
                className="block w-full bg-white text-black rounded-xl p-4 text-center text-lg font-semibold hover:bg-gray-100 transition"
              >
                ☎️ 0621 67 613
              </a>
            </div>

            <p className="text-sm text-gray-300 text-center">
              Нажмите на номер, чтобы сразу позвонить
            </p>

            {/* Instagram */}
            <div className="mt-6 pt-6 border-t border-gray-700 flex items-center justify-center gap-3">
              <span className="text-m text-gray-300">Мы в Instagram</span>
              <a
                href="https://www.instagram.com/evakuator_pmr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 56.7 56.7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="currentColor">
                    <path d="M28.2,16.7c-7,0-12.8,5.7-12.8,12.8s5.7,12.8,12.8,12.8S41,36.5,41,29.5S35.2,16.7,28.2,16.7z M28.2,37.7   c-4.5,0-8.2-3.7-8.2-8.2s3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2S32.7,37.7,28.2,37.7z" />
                    <circle cx="41.5" cy="16.4" r="2.9" />
                    <path d="M49,8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7,0-14.5,5.8-14.5,14.5v20.5c0,4.3,1.4,8,4.2,10.7c2.7,2.6,6.3,3.9,10.4,3.9   h20.4c4.3,0,7.9-1.4,10.5-3.9c2.7-2.6,4.1-6.3,4.1-10.6V19.3C53,15.1,51.6,11.5,49,8.9z M48.6,39.9c0,3.1-1.1,5.6-2.9,7.3   s-4.3,2.6-7.3,2.6H18c-3,0-5.5-0.9-7.3-2.6C8.9,45.4,8,42.9,8,39.8V19.3c0-3,0.9-5.5,2.7-7.3c1.7-1.7,4.3-2.6,7.3-2.6h20.6   c3,0,5.5,0.9,7.3,2.7c1.7,1.8,2.7,4.3,2.7,7.2V39.9L48.6,39.9z" />
                  </g>
                </svg>
              </a>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="text-3xl mb-3">
                <img
                  className="w-7 h-7 brightness-0"
                  src="/auto_towing.svg"
                  alt=""
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">Эвакуатор</h3>
              <p className="text-sm text-gray-600">
                Перевозка авто после поломки или ДТП, выезд по городу и между
                городами
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="text-3xl mb-3">
                <img
                  src="/build_.svg"
                  alt=""
                  className="w-7 h-7 brightness-0"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">Автосервис</h3>
              <p className="text-sm text-gray-600">
                Диагностика и ремонт основных узлов, помощь с запуском, мелкий
                ремонт на месте
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="text-3xl mb-3">
                {" "}
                <img
                  src="/car-wheel.svg"
                  alt=""
                  className="w-7 h-7 brightness-0"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">Шиномонтаж</h3>
              <p className="text-sm text-gray-600">
                Прокол, порез или повреждение колеса — поможем заменить или
                отремонтировать
              </p>
            </div>
          </div>
          <div className="mb-6">
            <EvacuatorPriceList />
          </div>

          {/* Info Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900 text-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl  font-semibold mb-4">
                Как вызвать эвакуатор
              </h3>
              <ol className="space-y-2 text-sm text-white">
                <li className="flex gap-2">
                  <span className="font-semibold text-gray">1.</span>
                  <span>Позвоните по одному из номеров выше</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray">2.</span>
                  <span>Назовите точное местоположение и направление</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray">3.</span>
                  <span>Опишите проблему: поломка, ДТП, не заводится</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray">4.</span>
                  <span>Ожидайте машину в согласованное время</span>
                </li>
              </ol>
            </div>

            <div className="bg-gray-700 text-white rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Для страховых компаний
              </h3>
              <p className="text-sm text-gray-300">
                Мы выписываем чеки и необходимые документы для страховых
                компаний. Сообщите об этом оператору при оформлении вызова.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gray-300 rounded-xl mb-6 p-6 border border-gray-200 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/acute.svg"
                  alt=""
                  className="w-6 h-6 brightness-0 flex-shrink-0"
                />
                <p className="text-sm font-medium text-gray-700">
                  Работаем 24/7
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/explore_nearby.svg"
                  alt=""
                  className="w-6 h-6 brightness-0 flex-shrink-0"
                />
                <p className="text-sm font-medium text-gray-700">
                  Любые направления Молдова и Приднестровье
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/fact_check.svg"
                  alt=""
                  className="w-6 h-6 brightness-0 flex-shrink-0"
                />
                <p className="text-sm font-medium text-gray-700">
                  Чеки страховым
                </p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <a
              href="/#home"
              className="inline-block bg-black text-white rounded-xl px-8 py-3 font-semibold hover:bg-gray-800 transition"
            >
              Вернуться на главную InterTaxi
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
