import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    // The secret provided below must be changed for security purposes.
    secret: "6>\**9g]Ce;98v>6MzAJ_hzZUa4>}(6Z",
    pages: {
        signIn: "/sign_in",
        error: "/sign_in"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email address", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const res = await fetch("http://localhost:3000/api/retrieve_account", {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    })
                    const user = await res.json()

                    if (res.ok && user) {
                        return user
                    }

                    return null
                } catch (e) {
                    console.log(e)
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            return session
        }
    }
})