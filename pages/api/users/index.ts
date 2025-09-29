import type { NextApiRequest, NextApiResponse } from "next";

const users: Array<{ id: number; name: string }> = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    res.status(200).json(users);
    return;
  }

  if (req.method === "POST") {
    const { name } = req.body as { name?: string };
    const user = { id: Date.now(), name: name || "noname" };
    users.push(user);
    res.status(201).json(user);
    return;
  }

  res.status(405).end();
  return;
}
