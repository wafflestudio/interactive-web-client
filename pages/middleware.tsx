import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === "/user") {
    url.pathname = "/user/me";
    return NextResponse.redirect(url);
  }
}
