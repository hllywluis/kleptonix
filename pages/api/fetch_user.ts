import { prisma } from "../../prisma/prisma";

export default async function handle(req, res) {
  if (req.method === "POST") {
    res.redirect(301, "/").end();
  } else {
    const user = await prisma.users.findUnique({
      where: {
        email: "luis@kleptonix.com",
      },
    });
  }
}
