import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

let prisma

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export default async function handle(req, res) {
    if (req.method === "POST") {
        const user = await prisma.users.findUnique({
            where: {
                email: req.body.email,
            }
        })

        if (user < 1) {
            res.status(500).json({ error: "not-found" })
        } else {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password)

            if (passwordMatch) {
                res.status(200).json(user)
            } else {
                res.status(500).json({ error: "wrong-password" })
            }
        }
    } else {
        res.redirect(301, "/").end()
    }
}