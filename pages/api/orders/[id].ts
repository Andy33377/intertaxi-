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
) {
  const id = Number(req.query.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  if (req.method === "GET") {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.status(200).json(order);
  }

  if (req.method === "DELETE") {
    if (!isAuthorized(req)) return res.status(401).end("Unauthorized");

    try {
      await prisma.order.delete({ where: { id } });
      return res.status(204).end();
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      if (error.code === "P2025") {
        // Prisma: record not found
        return res.status(404).json({ error: "Order not found" });
      }
      console.error("❌ Ошибка при удалении заказа:", err);
      return res.status(500).json({ error: error.message || "Unknown error" });
    }
  }

  res.setHeader("Allow", ["GET", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
