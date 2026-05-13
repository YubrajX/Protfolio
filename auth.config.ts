import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    session: {
        maxAge: 30 * 60, // 30 minutes
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnAdmin = nextUrl.pathname.startsWith("/admin")
            const isOnLogin = nextUrl.pathname.startsWith("/login")

            if (isOnAdmin) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            } else if (isOnLogin) {
                if (isLoggedIn) return Response.redirect(new URL("/admin", nextUrl))
            }
            return true
        },
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig
