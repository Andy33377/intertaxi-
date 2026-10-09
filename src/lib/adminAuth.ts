import { timingSafeEqual } from "crypto";
import type { IncomingMessage } from "http";

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Проверяет Basic-авторизацию водителя/админа (DRIVER_USER / DRIVER_PASS). */
export function isAdminRequest(req: Pick<IncomingMessage, "headers">) {
  const expectedUser = process.env.DRIVER_USER;
  const expectedPass = process.env.DRIVER_PASS;
  // Если переменные не заданы — доступ закрыт для всех
  if (!expectedUser || !expectedPass) return false;

  const header = req.headers.authorization || "";
  if (!header.startsWith("Basic ")) return false;

  try {
    const decoded = Buffer.from(header.slice(6), "base64").toString();
    const sep = decoded.indexOf(":");
    if (sep === -1) return false;
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);
    return safeEqual(user, expectedUser) && safeEqual(pass, expectedPass);
  } catch {
    return false;
  }
}
