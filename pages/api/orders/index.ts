import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/lib/prisma"; // ✅ вместо new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(orders);
    }

    if (req.method === "POST") {
      console.log("try");

      try {
        // ✅ гарантированно получаем объект
        const body =
          typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        console.log("📥 BODY:", body);

        const { name, phone, passengers, childSeat, comment } = body;

        const order = await prisma.order.create({
          data: {
            name,
            phone,
            passengers: Number(passengers) || 1,
            childSeat: Boolean(childSeat),
            comment: comment || null,
          },
        });

        return res.status(201).json(order);
      } catch (err: any) {
        console.error("ORDER CREATE ERROR:", err);
        return res.status(400).json({ error: err.message });
      }
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end();
  } catch (error: any) {
    console.error("API ERROR /orders:", error);
    return res.status(500).json({ error: error.message });
  }
}
