import type { NextAuthOptions, User } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../prisma/prisma'
import { compare } from 'bcrypt'
import { z } from 'zod'

// Input validation schema
const credentialsSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type DbUser = {
  id: number
  email: string
  password: string
  dname: string | null
  name: string | null
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/sign_in',
    error: '/sign_in',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email address', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          // Validate input
          const validatedCredentials = credentialsSchema.parse(credentials)

          // Find user
          const user = (await prisma.user.findUnique({
            where: {
              email: validatedCredentials.email,
            },
            select: {
              id: true,
              email: true,
              password: true,
              dname: true,
              name: true,
            },
          })) as DbUser | null

          if (!user) {
            console.log(
              `No user found for email: ${validatedCredentials.email}`
            )
            return null
          }

          // Verify password
          const isValidPassword = await compare(
            validatedCredentials.password,
            user.password
          )

          if (!isValidPassword) {
            console.log(
              `Invalid password for email: ${validatedCredentials.email}`
            )
            return null
          }

          // Return user without password
          const { password: _, ...userWithoutPassword } = user
          return userWithoutPassword
        } catch (error) {
          console.error('[Auth Error]:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: typeof user.id === 'string' ? parseInt(user.id, 10) : user.id,
          email: user.email,
          dname: user.dname || null,
          name: user.name || null,
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          id:
            typeof token.user.id === 'string'
              ? parseInt(token.user.id, 10)
              : token.user.id,
          email: token.user.email,
          dname: token.user.dname,
          name: token.user.name,
        }
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
