import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 10 };
const buckets = new Map<string, number[]>();

function tooMany(req: NextApiRequest) {
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown";
  const now = Date.now();
  const start = now - RATE_LIMIT.windowMs;
  const arr = buckets.get(ip)?.filter((t) => t > start) || [];
  if (arr.length >= RATE_LIMIT.max) return true;
  arr.push(now);
  buckets.set(ip, arr);
  return false;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const auth = req.headers.authorization || "";
    const ok =
      auth.startsWith("Basic ") &&
      (() => {
        try {
          const [u, p] = Buffer.from(auth.split(" ")[1], "base64")
            .toString()
            .split(":");
          return u === process.env.DRIVER_USER && p === process.env.DRIVER_PASS;
        } catch {
          return false;
        }
      })();
    if (!ok) return res.status(401).end("Unauthorized");

    try {
      const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(orders);
    } catch (err: unknown) {
      const error = err as { message?: string };
      console.error("❌ Ошибка при получении заказов:", err);
      return res.status(500).json({ error: error.message || "Unknown error" });
    }
  }

  if (req.method === "POST") {
    try {
      const {
        name,
        phone,
        passengers,
        childSeat,
        comment,
        from,
        to,
        date,
        time,
        roundTrip,
        returnDate,
        returnTime,
      } = req.body;

      if (tooMany(req)) {
        return res.status(429).json({ error: "Too many requests, try later" });
      }

      if (!name || !phone || !from || !to || !date || !time) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const order = await prisma.order.create({
        data: {
          name,
          phone,
          passengers: Number(passengers) || 1,
          childSeat: Boolean(childSeat),
          comment: comment || null,
          from,
          to,
          date,
          time,
          roundTrip: Boolean(roundTrip),
          returnDate: returnDate || null,
          returnTime: returnTime || null,
        },
      });

      const token = process.env.TELEGRAM_BOT_TOKEN;
      const chat = process.env.TELEGRAM_CHAT_ID;
      if (token && chat) {
        const adminUrl =
          process.env.ADMIN_URL || "https://intertaxi.vercel.app/admin/orders";
        const phoneDisplay = phone.startsWith("+") ? phone : `+${phone}`;

        const text =
          `🆕 Новый заказ\n` +
          `Маршрут: ${from} → ${to}\n` +
          `Дата/время: ${date} ${time}\n` +
          (roundTrip
            ? `Обратка: ${returnDate ?? "—"} ${returnTime ?? "—"}\n`
            : "") +
          `Имя: ${name}\n` +
          `Телефон: ${phoneDisplay}\n` +
          `Пассажиры: ${Number(passengers) || 1}${
            childSeat ? " (+дет.кресло)" : ""
          }\n` +
          (comment ? `Комментарий: ${comment}\n` : "") +
          `ID: ${order.id}\n\n` +
          `🔗 Админка: ${adminUrl}`;

        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chat, text }),
        }).catch((e) => console.error("Telegram error:", e));
      }

      return res.status(201).json(order);
    } catch (err: unknown) {
      const error = err as { message?: string };
      console.error("❌ Ошибка при создании заказа:", err);
      return res.status(400).json({ error: error.message || "Unknown error" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
