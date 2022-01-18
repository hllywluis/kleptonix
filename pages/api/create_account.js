import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

let prisma

if (!PrismaClient.instance) {
    prisma = new PrismaClient()
}

export default async function handle(req, res) {
    if (req.method === "POST") {
        const saltNumber = 10

        const hashed_password = await bcrypt.hash(req.body.password, saltNumber)
        const hashed_confirmPassword = await bcrypt.hash(req.body.password_confirmation, saltNumber)

        const passwordMatch = await bcrypt.compare(req.body.password, hashed_password)
        const confirmPasswordMatch = await bcrypt.compare(req.body.password_confirmation, hashed_confirmPassword)

        if (passwordMatch && confirmPasswordMatch) {
            const checkUser = await prisma.users.findUnique({
                where: {
                    email: req.body.email,
                }
            })

            if (checkUser) {
                res.redirect(301, `/sign_up?error=email-taken`).end()
            } else {
                const user = await prisma.users.create({
                    data: {
                        email: req.body.email,
                        password: hashed_password
                    }
                })

                res.redirect(301, `/sign_in?success=account-created`).end()
            }
        }
    } else {
        res.redirect(301, "/").end()
    }
}