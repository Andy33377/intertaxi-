import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(orders);
    } catch (err: any) {
      console.error("❌ Ошибка при получении заказов:", err);
      return res.status(500).json({ error: err.message });
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
      console.log("📥 BODY:", req.body);

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

      return res.status(201).json(order);
    } catch (err: any) {
      console.error("❌ Ошибка при создании заказа:", err);
      return res.status(400).json({ error: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
