import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({ where: { id } });
    return res.status(200).json(user);
  }

  if (req.method === "PUT") {
    const { name, email } = req.body;
    const updated = await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await prisma.user.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).end();
}
