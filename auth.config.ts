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
      const isOnAdmin = nextUrl.pathname.startsWith("/admin")
      const isOnPortal = ["/profile", "/orders", "/settings"].some(route => nextUrl.pathname.startsWith(route))
      
      // Protect admin and portal routes
      if (isOnAdmin || isOnPortal) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page (Google)
      } else if (isLoggedIn) {
        if (nextUrl.pathname === "/login") {
          return Response.redirect(new URL("/admin", nextUrl))
        }
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
