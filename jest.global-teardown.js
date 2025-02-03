const { PrismaClient } = require('@prisma/client')

module.exports = async () => {
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
