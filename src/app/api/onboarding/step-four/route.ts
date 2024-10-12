import { db, StepFourSchema } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { Mood } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { happiness, mood, sleep, stress } = StepFourSchema.parse(body);

        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!happiness || !mood || !sleep || !stress) {
            return new NextResponse("Invalid data passed", { status: 422 });
        }

        // check here if the user already has these details if yes then update them else create new
        const existingWellness = await db.mentalWellness.findFirst({
            where: { userId: user.id }
        });

        if (existingWellness) {
            await db.mentalWellness.update({
                where: { id: existingWellness.id },
                data: {
                    happiness,
                    mood: mood as Mood,
                    sleep,
                    stress,
                },
            });
        } else {
            await db.mentalWellness.create({
                data: {
                    userId: user.id,
                    happiness,
                    mood: mood as Mood,
                    sleep,
                    stress,
                },
            });
        }

        return NextResponse.json("Mental wellness updated!", { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data passed", { status: 422 });
        }

        console.error("Error in /api/onboarding/step-four:", error);
        return new NextResponse("Could not update mental wellness", { status: 500 });
    }
}