"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { mdPmCities, uaCities } from "@/lib/cities";

export default function ContactsPage() {
  const router = useRouter();
  const [roundTrip, setRoundTrip] = useState(false);

  const cityOptions = [
    { label: "Молдова / ПМР", cities: mdPmCities },
    { label: "Украина", cities: uaCities },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const from = data.get("from") as string;
    const to = data.get("to") as string;
    const returnTo = roundTrip ? (data.get("returnTo") as string) : null;

    // Валидация: проверяем, что не выбраны заголовки групп
    if (!from || from.startsWith("__group_") || from === "") {
      alert("Пожалуйста, выберите пункт отправления");
      return;
    }

    if (!to || to.startsWith("__group_") || to === "") {
      alert("Пожалуйста, выберите пункт назначения");
      return;
    }

    if (
      roundTrip &&
      (!returnTo || returnTo.startsWith("__group_") || returnTo === "")
    ) {
      alert("Пожалуйста, выберите пункт назначения для обратной поездки");
      return;
    }

    const payload = {
      from,
      to,
      date: data.get("date") as string,
      time: data.get("time"),
      roundTrip,
      returnTo: returnTo || null,
      returnDate: roundTrip ? (data.get("date") as string) : null,
      returnTime: data.get("returnTime") || null,
    };

    localStorage.setItem("tripData", JSON.stringify(payload));
    router.push("/order");
  };

  return (
    <div id="contacts">
      <div className="flex gap-4 text-3xl items-center justify-center pt-7 pb-3">
        {/* Telegram Icon */}
        <a
          href="https://t.me/AlexandrZaluzhets"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-telegram"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
          </svg>
        </a>
        <a
          href="viber://chat?number=%2B37377951963"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="55"
            height="53"
            viewBox="0 0 50 50"
          >
            {" "}
            <path d="M 44.78125 13.15625 C 44 10.367188 42.453125 8.164063 40.1875 6.605469 C 37.328125 4.632813 34.039063 3.9375 31.199219 3.511719 C 27.269531 2.925781 23.710938 2.84375 20.316406 3.257813 C 17.136719 3.648438 14.742188 4.269531 12.558594 5.273438 C 8.277344 7.242188 5.707031 10.425781 4.921875 14.734375 C 4.539063 16.828125 4.28125 18.71875 4.132813 20.523438 C 3.789063 24.695313 4.101563 28.386719 5.085938 31.808594 C 6.046875 35.144531 7.722656 37.527344 10.210938 39.09375 C 10.84375 39.492188 11.65625 39.78125 12.441406 40.058594 C 12.886719 40.214844 13.320313 40.367188 13.675781 40.535156 C 14.003906 40.6875 14.003906 40.714844 14 40.988281 C 13.972656 43.359375 14 48.007813 14 48.007813 L 14.007813 49 L 15.789063 49 L 16.078125 48.71875 C 16.269531 48.539063 20.683594 44.273438 22.257813 42.554688 L 22.472656 42.316406 C 22.742188 42.003906 22.742188 42.003906 23.019531 42 C 25.144531 41.957031 27.316406 41.875 29.472656 41.757813 C 32.085938 41.617188 35.113281 41.363281 37.964844 40.175781 C 40.574219 39.085938 42.480469 37.355469 43.625 35.035156 C 44.820313 32.613281 45.527344 29.992188 45.792969 27.019531 C 46.261719 21.792969 45.929688 17.257813 44.78125 13.15625 Z M 35.382813 33.480469 C 34.726563 34.546875 33.75 35.289063 32.597656 35.769531 C 31.753906 36.121094 30.894531 36.046875 30.0625 35.695313 C 23.097656 32.746094 17.632813 28.101563 14.023438 21.421875 C 13.277344 20.046875 12.761719 18.546875 12.167969 17.09375 C 12.046875 16.796875 12.054688 16.445313 12 16.117188 C 12.050781 13.769531 13.851563 12.445313 15.671875 12.046875 C 16.367188 11.890625 16.984375 12.136719 17.5 12.632813 C 18.929688 13.992188 20.058594 15.574219 20.910156 17.347656 C 21.28125 18.125 21.113281 18.8125 20.480469 19.390625 C 20.347656 19.511719 20.210938 19.621094 20.066406 19.730469 C 18.621094 20.816406 18.410156 21.640625 19.179688 23.277344 C 20.492188 26.0625 22.671875 27.933594 25.488281 29.09375 C 26.230469 29.398438 26.929688 29.246094 27.496094 28.644531 C 27.574219 28.566406 27.660156 28.488281 27.714844 28.394531 C 28.824219 26.542969 30.4375 26.726563 31.925781 27.78125 C 32.902344 28.476563 33.851563 29.210938 34.816406 29.917969 C 36.289063 31 36.277344 32.015625 35.382813 33.480469 Z M 26.144531 15 C 25.816406 15 25.488281 15.027344 25.164063 15.082031 C 24.617188 15.171875 24.105469 14.804688 24.011719 14.257813 C 23.921875 13.714844 24.289063 13.199219 24.835938 13.109375 C 25.265625 13.035156 25.707031 13 26.144531 13 C 30.476563 13 34 16.523438 34 20.855469 C 34 21.296875 33.964844 21.738281 33.890625 22.164063 C 33.808594 22.652344 33.386719 23 32.90625 23 C 32.851563 23 32.796875 22.996094 32.738281 22.984375 C 32.195313 22.894531 31.828125 22.378906 31.917969 21.835938 C 31.972656 21.515625 32 21.1875 32 20.855469 C 32 17.628906 29.371094 15 26.144531 15 Z M 31 21 C 31 21.550781 30.550781 22 30 22 C 29.449219 22 29 21.550781 29 21 C 29 19.347656 27.652344 18 26 18 C 25.449219 18 25 17.550781 25 17 C 25 16.449219 25.449219 16 26 16 C 28.757813 16 31 18.242188 31 21 Z M 36.710938 23.222656 C 36.605469 23.6875 36.191406 24 35.734375 24 C 35.660156 24 35.585938 23.992188 35.511719 23.976563 C 34.972656 23.851563 34.636719 23.316406 34.757813 22.777344 C 34.902344 22.140625 34.976563 21.480469 34.976563 20.816406 C 34.976563 15.957031 31.019531 12 26.160156 12 C 25.496094 12 24.835938 12.074219 24.199219 12.21875 C 23.660156 12.34375 23.125 12.003906 23.003906 11.464844 C 22.878906 10.925781 23.21875 10.390625 23.757813 10.269531 C 24.539063 10.089844 25.347656 10 26.160156 10 C 32.125 10 36.976563 14.851563 36.976563 20.816406 C 36.976563 21.628906 36.886719 22.4375 36.710938 23.222656 Z"></path>{" "}
          </svg>{" "}
        </a>

        <svg
          width="55"
          height="55"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 56.7 56.7"
          enable-background="new 0 0 56.7 56.7"
        >
          <a
            href="https://www.instagram.com/taxi_transfer_pmr.md?igsh=bzI2ejZqcW16Y3J0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <g>
              <path d="M28.2,16.7c-7,0-12.8,5.7-12.8,12.8s5.7,12.8,12.8,12.8S41,36.5,41,29.5S35.2,16.7,28.2,16.7z M28.2,37.7   c-4.5,0-8.2-3.7-8.2-8.2s3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2S32.7,37.7,28.2,37.7z" />
              <circle cx="41.5" cy="16.4" r="2.9" />
              <path d="M49,8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7,0-14.5,5.8-14.5,14.5v20.5c0,4.3,1.4,8,4.2,10.7c2.7,2.6,6.3,3.9,10.4,3.9   h20.4c4.3,0,7.9-1.4,10.5-3.9c2.7-2.6,4.1-6.3,4.1-10.6V19.3C53,15.1,51.6,11.5,49,8.9z M48.6,39.9c0,3.1-1.1,5.6-2.9,7.3   s-4.3,2.6-7.3,2.6H18c-3,0-5.5-0.9-7.3-2.6C8.9,45.4,8,42.9,8,39.8V19.3c0-3,0.9-5.5,2.7-7.3c1.7-1.7,4.3-2.6,7.3-2.6h20.6   c3,0,5.5,0.9,7.3,2.7c1.7,1.8,2.7,4.3,2.7,7.2V39.9L48.6,39.9z" />
            </g>
          </a>
        </svg>
        {/* Phone Icon */}
        <a href="tel:+37377951963">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="45"
            height="45"
          >
            <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z" />
          </svg>
        </a>
      </div>

      <section className="flex justify-center mt-[30px]">
        <form
          onSubmit={handleSubmit}
          className="border-0 w-full rounded-md p-3 bg-[#A9D3D9] pt-10 flex flex-col gap-4 max-w-[340px]"
        >
          <h2 className="text-center text-black text-2xl font-black">
            Запланируй поездку
          </h2>

          {/* Пункт отправления */}
          <select
            name="from"
            className="appearance-none border-none bg-white rounded-2xl p-4 outline-none"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Выберите пункт отправления
            </option>
            {cityOptions.map((group) => (
              <React.Fragment key={group.label}>
                <option
                  value={`__group_${group.label}__`}
                  disabled
                  className="font-semibold text-gray-500"
                >
                  ─ {group.label} ─
                </option>
                {group.cities.map((city) => (
                  <option key={`${group.label}-${city}`} value={city}>
                    {city}
                  </option>
                ))}
              </React.Fragment>
            ))}
          </select>

          {/* Пункт назначения */}
          <select
            name="to"
            className="appearance-none border-none bg-white rounded-2xl p-4 outline-none"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Выберите пункт назначения
            </option>
            {cityOptions.map((group) => (
              <React.Fragment key={group.label}>
                <option
                  value={`__group_${group.label}__`}
                  disabled
                  className="font-semibold text-gray-500"
                >
                  ─ {group.label} ─
                </option>
                {group.cities.map((city) => (
                  <option key={`${group.label}-${city}`} value={city}>
                    {city}
                  </option>
                ))}
              </React.Fragment>
            ))}
          </select>

          {/* Дата и время */}
          <input
            name="date"
            type="date"
            className="border-none bg-white rounded-2xl p-4 outline-none"
            required
          />
          <input
            name="time"
            type="time"
            step="300"
            className="border-none bg-white rounded-2xl p-4 outline-none"
            required
          />

          {/* Чекбокс обратной поездки */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={roundTrip}
              onChange={(e) => setRoundTrip(e.target.checked)}
            />
            Обратная поездка (−50% стоимости)
          </label>

          {/* Поля обратной поездки */}
          {roundTrip && (
            <>
              <select
                name="returnTo"
                className="appearance-none border-none bg-white rounded-2xl p-4 outline-none"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Выберите пункт назначения (обратно)
                </option>
                {cityOptions.map((group) => (
                  <React.Fragment key={group.label}>
                    <option
                      value={`__group_${group.label}__`}
                      disabled
                      className="font-semibold text-gray-500"
                    >
                      ─ {group.label} ─
                    </option>
                    {group.cities.map((city) => (
                      <option key={`${group.label}-${city}`} value={city}>
                        {city}
                      </option>
                    ))}
                  </React.Fragment>
                ))}
              </select>

              <input
                name="returnTime"
                type="time"
                step="300"
                className="border-none bg-white rounded-2xl p-4 outline-none"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="rounded-2xl bg-black text-white font-semibold py-3 hover:bg-emerald-700"
          >
            Дальше
          </button>
        </form>
      </section>
    </div>
  );
}
