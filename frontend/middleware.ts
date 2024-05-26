import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";
import {
  DASHBOARD_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  PUBLIC_ROUTES,
} from "@/utils/constants";

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(path);

  const res: NextResponse = await updateSession(request);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login page if user is unauthenticated
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN_PAGE_ROUTE, request.nextUrl));
  }

  // Redirect logged in users to dashboard
  if (user && (path === LOGIN_PAGE_ROUTE || path === HOME_PAGE_ROUTE)) {
    return NextResponse.redirect(
      new URL(DASHBOARD_PAGE_ROUTE, request.nextUrl),
    );
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};