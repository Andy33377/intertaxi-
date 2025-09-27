import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ ok: true });
    return;
  } catch (e: unknown) {
    res.status(500).json({ ok: false, error: String(e) });
    return;
  }
}
