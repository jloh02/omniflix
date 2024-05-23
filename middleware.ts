import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";
import {
  loginPageRoute,
  publicRoutes,
  protectedRoutes,
} from "@/utils/constants";

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );

  const res: NextResponse = await updateSession(request);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login page if user is not unauthenticated
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL(loginPageRoute, request.nextUrl));
  }

  if (user && path === loginPageRoute) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
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
