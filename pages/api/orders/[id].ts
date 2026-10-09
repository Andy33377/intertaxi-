import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/adminAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Все операции с конкретным заказом — только для админа
  if (!isAdminRequest(req)) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
    res.status(401).end("Unauthorized");
    return;
  }

  const id = Number(req.query.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  if (req.method === "GET") {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json(order);
    return;
  }

  if (req.method === "DELETE") {
    try {
      await prisma.order.delete({ where: { id } });
      res.status(204).end();
      return;
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      if (error.code === "P2025") {
        res.status(404).json({ error: "Order not found" });
        return;
      }
      console.error("❌ Ошибка при удалении заказа:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }

  res.setHeader("Allow", ["GET", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
