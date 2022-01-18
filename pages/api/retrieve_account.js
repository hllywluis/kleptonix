import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

let prisma

if (!PrismaClient.instance) {
    prisma = new PrismaClient()
}

export default async function handle(req, res) {
    if (req.method === "POST") {
        const user = await prisma.users.findMany({
            where: {
                email: req.body.email,
            }
        })

        if (user.length < 1) {
            res.redirect(301, `/sign_in?error=not-found`).end()
        } else {
            res.status(200).json({ body: req.body }).end()
        }
    } else {
        res.redirect(301, "/").end()
    }
}