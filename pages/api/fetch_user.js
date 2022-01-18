import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

let prisma

if (!PrismaClient.instance) {
    prisma = new PrismaClient()
}

export default async function handle(req, res) {
    if (req.method === "POST") {
        res.redirect(301, "/").end()
    } else {
        const user = await prisma.user.findUnique({
            where: {
                email: "luis@kleptonix.com"
            }
        })
    }
}