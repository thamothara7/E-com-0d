import { auth } from "@/auth"
import { NextRequest } from "next/server"

export default function proxy(request: NextRequest) {
  return (auth as any)(request)
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/settings/:path*",
    "/checkout/:path*",
  ],
}
