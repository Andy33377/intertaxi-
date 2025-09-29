import type { NextApiRequest, NextApiResponse } from "next";

let users: Array<{ id: number; name: string }> = [];

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
    const user = users.find((u) => u.id === id) || null;
    res.status(200).json(user);
    return;
  }

  if (req.method === "PUT") {
    const { name } = req.body as { name?: string };
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    users[idx].name = name || users[idx].name;
    res.status(200).json(users[idx]);
    return;
  }

  if (req.method === "DELETE") {
    users = users.filter((u) => u.id !== id);
    res.status(204).end();
    return;
  }

  res.status(405).end();
  return;
}
