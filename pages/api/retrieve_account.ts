import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/prisma'
import { compare } from 'bcrypt'
import { z } from 'zod'

// Input validation schema
const retrieveAccountSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type RetrieveAccountResponse = {
  id?: number
  email?: string
  dname?: string | null
  name?: string | null
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RetrieveAccountResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Validate input
    const validatedData = retrieveAccountSchema.parse(req.body)

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        dname: true,
        name: true,
      },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Verify password
    const isValidPassword = await compare(validatedData.password, user.password)

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return res.status(200).json(userWithoutPassword)
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.errors[0].message,
      })
    }

    // Handle other errors
    console.error('[Retrieve Account Error]:', error)
    return res.status(500).json({
      error: 'An unexpected error occurred',
    })
  }
}
