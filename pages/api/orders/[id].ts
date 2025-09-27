import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

function isAuthorized(req: NextApiRequest) {
  const h = req.headers.authorization || "";
  if (!h.startsWith("Basic ")) return false;

  try {
    const [u, p] = Buffer.from(h.split(" ")[1], "base64").toString().split(":");
    return u === process.env.DRIVER_USER && p === process.env.DRIVER_PASS;
  } catch {
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const id = Number(req.query.id);
  if (Number.isNaN(id)) {
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
    if (!isAuthorized(req)) {
      res.status(401).end("Unauthorized");
      return;
    }

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
      res.status(500).json({ error: error.message || "Unknown error" });
      return;
    }
  }

  res.setHeader("Allow", ["GET", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
