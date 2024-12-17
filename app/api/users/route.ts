import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function POST(req: Request) {
    try {
        const { name, email } = await req.json()

        if (!name || !email) {
            return NextResponse.json(
                { message: 'Name and email are required.' },
                { status: 400 }
            );
        }

        const newUser = await prisma.user.create({
            data: { name, email },
        });

        return NextResponse.json(newUser, { status: 201 })
    } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json(
            { message: 'Error creating user.' },
            { status: 500 }
        )
    }
}
