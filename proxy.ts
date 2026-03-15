import { auth } from "@/auth"
import { NextRequest } from "next/server"

export default function proxy(request: NextRequest) {
  return (auth as any)(request)
}

export const config = {
  // Broad matcher to ensure all routes (including /admin, /profile, etc.) are processed by auth middleware
  // while ignoring static assets and API routes.
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}

