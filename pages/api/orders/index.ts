import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/adminAuth";

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

const MAX = { name: 80, phone: 20, place: 120, comment: 500 } as const;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

function str(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!v || v.length > max) return null;
  return v;
}

function optStr(value: unknown, max: number) {
  if (value === undefined || value === null || value === "") return null;
  return str(value, max);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    if (!isAdminRequest(req)) {
      res.status(401).end("Unauthorized");
      return;
    }

    try {
      const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(orders);
      return;
    } catch (err: unknown) {
      console.error("❌ Ошибка при получении заказов:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }

  if (req.method === "POST") {
    try {
      if (tooMany(req)) {
        res.status(429).json({ error: "Too many requests, try later" });
        return;
      }

      const body = (req.body ?? {}) as Record<string, unknown>;
      const name = str(body.name, MAX.name);
      const phone = str(body.phone, MAX.phone);
      const from = str(body.from, MAX.place);
      const to = str(body.to, MAX.place);
      const date = str(body.date, 10);
      const time = str(body.time, 5);
      const comment = optStr(body.comment, MAX.comment);
      const roundTrip = body.roundTrip === true;
      const returnDate = roundTrip ? optStr(body.returnDate, 10) : null;
      const returnTime = roundTrip ? optStr(body.returnTime, 5) : null;
      const childSeat = body.childSeat === true;
      const passengersNum = Number(body.passengers);
      const passengers =
        Number.isInteger(passengersNum) && passengersNum >= 1 && passengersNum <= 20
          ? passengersNum
          : 1;

      if (
        !name ||
        !phone ||
        !/^\+?[0-9]{6,15}$/.test(phone) ||
        !from ||
        !to ||
        !date ||
        !DATE_RE.test(date) ||
        !time ||
        !TIME_RE.test(time) ||
        (returnDate !== null && !DATE_RE.test(returnDate)) ||
        (returnTime !== null && !TIME_RE.test(returnTime)) ||
        (typeof body.comment === "string" &&
          body.comment.trim().length > MAX.comment)
      ) {
        res.status(400).json({ error: "Invalid or missing fields" });
        return;
      }

      const order = await prisma.order.create({
        data: {
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
          `Пассажиры: ${passengers}${
            childSeat ? " (+дет.кресло)" : ""
          }\n` +
          (comment ? `Комментарий: ${comment}\n` : "") +
          `ID: ${order.id}\n\n` +
          `🔗 Админка: ${adminUrl}`;

        try {
          const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chat, text }),
          });
          if (!tgRes.ok) {
            const t = await tgRes.text();
            console.error("Telegram send failed:", tgRes.status, t);
          }
        } catch (e) {
          console.error("Telegram error:", e);
        }
      }

      res.status(201).json(order);
      return;
    } catch (err: unknown) {
      console.error("❌ Ошибка при создании заказа:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
  return;
}
