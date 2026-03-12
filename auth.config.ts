import type { NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      // @ts-expect-error - role is not default in next-auth type
      const role = auth?.user?.role as string | undefined
      const isOnAdmin = nextUrl.pathname.startsWith("/admin")
      const isOnPortal = ["/profile", "/orders", "/settings", "/checkout"].some(
        (route) => nextUrl.pathname.startsWith(route)
      )

      if (isOnAdmin) {
        if (!isLoggedIn) {
          // Unauthenticated → redirect to admin-specific login
          return Response.redirect(new URL("/admin-login", nextUrl))
        }
        if (role !== "ADMIN") {
          // Logged-in but not admin → proper 403 Unauthorized page
          return Response.redirect(new URL("/unauthorized", nextUrl))
        }
        return true
      }

      if (isOnPortal) {
        if (!isLoggedIn) {
          // Redirect to main login with callbackUrl
          const loginUrl = new URL("/login", nextUrl)
          loginUrl.searchParams.set("callbackUrl", nextUrl.pathname)
          return Response.redirect(loginUrl)
        }
        return true
      }

      // If logged in and visiting /login or /admin-login, go home
      if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/admin-login")) {
        return Response.redirect(new URL("/", nextUrl))
      }

      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        // @ts-expect-error - role is not default in next-auth type
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
        // @ts-expect-error - role is not default in next-auth type
        session.user.role = token.role as string
        // Forward Google profile picture from JWT to session
        if (token.picture) {
          session.user.image = token.picture as string
        }
        if (token.name) {
          session.user.name = token.name as string
        }
      }
      return session
    },
  },
} satisfies NextAuthConfig
