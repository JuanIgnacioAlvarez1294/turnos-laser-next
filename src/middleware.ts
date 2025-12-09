import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // rutas protegidas
  const adminRoutes = path.startsWith("/admin");

  const token = req.cookies.get("__session")?.value;

  // Si NO hay token y quiere entrar a admin → login
  if (!token && adminRoutes) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};