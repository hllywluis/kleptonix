import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Add TextEncoder/TextDecoder to global scope
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}))

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: null,
    status: 'unauthenticated',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
  getSession: jest.fn(),
}))

// Mock environment variables
process.env = {
  ...process.env,
  AUTH_SECRET: 'test-secret',
  NEXTAUTH_URL: 'http://localhost:3000',
  DATABASE_URL:
    'postgresql://kleptonix:Default_KL3PT0N1X_Password!@localhost:5432/kleptonix_test?schema=public',
}

// Suppress console errors during tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
}

// Clear all mocks between tests
beforeEach(() => {
  jest.clearAllMocks()
})
