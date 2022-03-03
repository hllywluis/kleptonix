import { prisma } from "../../prisma/prisma"
import { getSession } from "next-auth/react"

export default async function handle(req, res) {
  const session = await getSession({ req })

  if (req.method === "POST") {
    if (session.user) {
      const result = await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          id: req.body.id ?? session.user.id,
          dname: req.body.dname ?? session.user.dname,
          hidename: req.body.hidename ?? session.user.hidename,
          subs: req.body.subs ?? session.user.subs,
          email: req.body.email ?? session.user.email,
          password: req.body.password ?? session.user.password,
          name: req.body.name ?? session.user.name,
        },
      })
    }
    return res.redirect(301, "/profile")
  } else {
    return res.redirect(301, "/")
  }
}
