import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ["/wishlist", "/profile", "/admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  // Strip locale prefix for route matching
  const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
  const isProtected = protectedRoutes.some((r) => pathnameWithoutLocale.startsWith(r));

  if (isProtected && !token) {
    const locale = pathname.split("/")[1] || "en";
    return NextResponse.redirect(
      new URL(`/${locale}/login?next=${pathnameWithoutLocale}`, request.url)
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
