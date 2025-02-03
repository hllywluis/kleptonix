import type { DefaultSession } from 'next-auth'
import { DefaultUser } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      email: string
      dname?: string | null
      name?: string | null
    } & DefaultSession['user']
  }

  interface User {
    id: number
    email: string
    dname?: string | null
    name?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user?: {
      id: number
      email: string
      dname?: string | null
      name?: string | null
    }
  }
}
