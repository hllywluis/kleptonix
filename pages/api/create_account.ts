import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/prisma'
import { hash } from 'bcrypt'
import { z } from 'zod'

// Input validation schema
const createAccountSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    password_confirmation: z.string(),
    dname: z.string().min(3, 'Display name must be at least 3 characters'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  })

type CreateAccountResponse = {
  success?: boolean
  error?: string
  redirectUrl?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateAccountResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Validate input
    const validatedData = createAccountSchema.parse(req.body)

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
      select: {
        id: true,
      },
    })

    if (existingUser) {
      return res.status(400).json({
        error: 'email-taken',
        redirectUrl: '/sign_up?error=email-taken',
      })
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 10)

    // Create user
    await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        dname: validatedData.dname,
      },
    })

    // Return success
    return res.status(201).json({
      success: true,
      redirectUrl: '/sign_in?success=account-created',
    })
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.errors[0].message,
        redirectUrl: `/sign_up?error=${encodeURIComponent(
          error.errors[0].message
        )}`,
      })
    }

    // Handle other errors
    console.error('[Create Account Error]:', error)
    return res.status(500).json({
      error: 'An unexpected error occurred',
      redirectUrl: '/sign_up?error=server-error',
    })
  }
}
