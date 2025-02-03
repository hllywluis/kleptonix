import { createMocks } from 'node-mocks-http'
import createAccountHandler from '../../pages/api/create_account'
import retrieveAccountHandler from '../../pages/api/retrieve_account'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import { describe, it, expect, afterEach, afterAll } from '@jest/globals'

const prisma = new PrismaClient()

describe('Authentication System', () => {
  afterEach(async () => {
    // Clean up database after each test
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    // Disconnect Prisma after all tests
    await prisma.$disconnect()
  })

  describe('Account Creation', () => {
    it('should create a new account with valid credentials', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'StrongP@ss123',
          password_confirmation: 'StrongP@ss123',
          dname: 'TestUser',
        },
      })

      await createAccountHandler(req, res)

      expect(res._getStatusCode()).toBe(201)
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        redirectUrl: '/sign_in?success=account-created',
      })

      // Verify user was created in database
      const user = await prisma.user.findUnique({
        where: { email: 'test@example.com' },
        select: { email: true, dname: true },
      })

      expect(user).toEqual({
        email: 'test@example.com',
        dname: 'TestUser',
      })
    })

    it('should reject weak passwords', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'weak',
          password_confirmation: 'weak',
          dname: 'TestUser',
        },
      })

      await createAccountHandler(req, res)

      expect(res._getStatusCode()).toBe(400)
      expect(JSON.parse(res._getData())).toHaveProperty('error')

      // Verify no user was created
      const user = await prisma.user.findUnique({
        where: { email: 'test@example.com' },
      })
      expect(user).toBeNull()
    })

    it('should reject mismatched passwords', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'StrongP@ss123',
          password_confirmation: 'DifferentP@ss123',
          dname: 'TestUser',
        },
      })

      await createAccountHandler(req, res)

      expect(res._getStatusCode()).toBe(400)
      expect(JSON.parse(res._getData())).toHaveProperty('error')

      // Verify no user was created
      const user = await prisma.user.findUnique({
        where: { email: 'test@example.com' },
      })
      expect(user).toBeNull()
    })
  })

  describe('Account Retrieval', () => {
    it('should authenticate with valid credentials', async () => {
      // Create test user
      const hashedPassword = await hash('StrongP@ss123', 10)
      await prisma.user.create({
        data: {
          email: 'test@example.com',
          password: hashedPassword,
          dname: 'TestUser',
        },
      })

      const { req, res } = createMocks({
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'StrongP@ss123',
        },
      })

      await retrieveAccountHandler(req, res)

      expect(res._getStatusCode()).toBe(200)
      const responseData = JSON.parse(res._getData())
      expect(responseData).toEqual({
        id: expect.any(Number),
        email: 'test@example.com',
        dname: 'TestUser',
        name: null,
      })
      expect(responseData).not.toHaveProperty('password')
    })

    it('should reject invalid credentials', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          email: 'nonexistent@example.com',
          password: 'WrongP@ss123',
        },
      })

      await retrieveAccountHandler(req, res)

      expect(res._getStatusCode()).toBe(401)
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Invalid credentials',
      })
    })

    it('should handle invalid request methods', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      })

      await retrieveAccountHandler(req, res)

      expect(res._getStatusCode()).toBe(405)
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Method not allowed',
      })
    })
  })
})
