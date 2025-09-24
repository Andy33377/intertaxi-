// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorizedResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // защищаем только раздел админки
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorizedResponse();

  try {
    const base64 = auth.split(" ")[1] || "";
    const [user, pass] = Buffer.from(base64, "base64").toString().split(":");

    if (user === process.env.DRIVER_USER && pass === process.env.DRIVER_PASS) {
      return NextResponse.next();
    }
  } catch {
    // fallthrough
  }

  return unauthorizedResponse();
}

export const config = {
  matcher: ["/admin/:path*"],
};
