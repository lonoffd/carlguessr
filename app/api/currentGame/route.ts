import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// Standardized Response Helper
// eslint-disable-next-line
function createResponse(success: boolean, data: any, status: number) {
    return NextResponse.json({ success, data }, { status });
}

export async function GET() {
    try {
        // Fetch challenge by ID
        // const challenge = { id: 'foobar', title: 'hello world' }
        const challenge = await prisma.challenge.findUnique({
            where: {
                id: 'cm4rvwt580000phrypbxnij1q'
            }
        })

        console.log('challenge', challenge)

        // Handle not found
        if (!challenge) {
            return createResponse(false, { error: "Challenge not found." }, 404);
        }

        // Return success response
        return createResponse(true, challenge, 200);
    } catch (error) {
        console.error("Error fetching challenge:", error);
        return createResponse(false, { error: "Internal Server Error" }, 500);
    }
}

export async function POST() {
    // If you decide to implement POST logic in the future
    return createResponse(false, { error: "Method Not Allowed" }, 405);
}
