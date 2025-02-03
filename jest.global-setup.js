const { execSync } = require('child_process')
const { PrismaClient } = require('@prisma/client')

module.exports = async () => {
  // Set test database URL
  process.env.DATABASE_URL =
    'postgresql://kleptonix:Default_KL3PT0N1X_Password!@localhost:5432/kleptonix_test?schema=public'

  // Run migrations on test database
  execSync('npx prisma migrate deploy')

  // Clean up test database
  const prisma = new PrismaClient()
  const tablenames = await prisma.$queryRaw`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
        )
      } catch (error) {
        console.log({ error })
      }
    }
  }

  await prisma.$disconnect()
}
