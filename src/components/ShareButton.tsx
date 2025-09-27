// src/components/ShareButton.tsx
"use client";
import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "InterTaxi — Междугороднее такси",
      text: "Быстро и надёжно: поездки между городами. Онлайн‑заказ.",
      url: window.location.href,
    };

    try {
      // Пробуем нативный Web Share API (работает на мобиле)
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch (_) {
      console.log("Пользователь отменил шаринг");
      return;
    }

    // Fallback: копируем ссылку в буфер
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      // Если не поддерживается clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
    >
      {copied ? "Ссылка скопирована!" : "Поделиться этой страницей"}
    </button>
  );
}
