import bcrypt from "bcrypt"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()
    const { name, email, password,phone } = body
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
        data: {
            name,
            email,
            phone,
            hashed_password: hashedPassword
        }
    })

    return NextResponse.json(user)

    //return new Response(JSON.stringify(user))
}