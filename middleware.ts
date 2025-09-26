import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // пускаем всё, что не админка
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();
  try {
    const [user, pass] = Buffer.from(auth.split(" ")[1], "base64")
      .toString()
      .split(":");
    if (user === process.env.DRIVER_USER && pass === process.env.DRIVER_PASS) {
      return NextResponse.next();
    }
  } catch {
    // ignore
  }
  return unauthorized();
}

export const config = {
  matcher: ["/admin/:path*"],
};
