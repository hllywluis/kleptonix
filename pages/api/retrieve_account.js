import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

let prisma

if (!PrismaClient.instance) {
    prisma = new PrismaClient()
}

export default async function handle(req, res) {
    if (req.method === "POST") {
        const user = await prisma.users.findUnique({
            where: {
                email: req.body.email,
            }
        })

        if (user < 1) {
            res.redirect(301, `/sign_in?error=not-found`).end()
        } else {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password)

            if (passwordMatch) {
                res.status(200).json(user)
            } else {
                res.redirect(301, "/sign_in?error=wrong-password").end()
            }
        }
    } else {
        res.redirect(301, "/").end()
    }
}