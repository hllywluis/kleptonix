export async function retrieve_user(req) {
  const client = require("../prisma/prisma")
  const { getSession } = require("next-auth/react")
  const { prisma } = client

  const session = await getSession(req)

  if (session) {
    const user = await prisma.user?.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (user) {
      return {
        props: { user },
      }
    } else {
    }
  } else {
    return {
      props: { user: {} },
    }
  }
}
