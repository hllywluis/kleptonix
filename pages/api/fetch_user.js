import { PrismaClient } from "@prisma/client"

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
        res.redirect(301, "/").end()
    } else {
        const user = await prisma.user.findUnique({
            where: {
                email: "luis@kleptonix.com"
            }
        })
    }
}