import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  if (req.method === "GET") {
    const order = await prisma.order.findUnique({ where: { id } });
    return res.status(200).json(order);
  }

  if (req.method === "DELETE") {
    await prisma.order.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "DELETE"]);
  return res.status(405).end();
}
