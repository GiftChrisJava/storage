import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next(); // now go next

  const supabase = createClientComponentClient({ req, res });

  // get the current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is authenticated send to videos page
  if (user && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/videos", req.url));
  }

  // if not logged in and not going to the home route, the redirect to home route
  if (user && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/"));
  }

  return res;
}

// run this middleware on these routes
export const config = {
  matcher: ["/", "/videos"],
};
