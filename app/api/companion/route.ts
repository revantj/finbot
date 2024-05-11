import { prisma } from "@/prisma/client";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, description, src, instructions, categoryId, seed } = body;
    if (
      !name ||
      !description ||
      !src ||
      !instructions ||
      !categoryId ||
      !seed
    ) {
      return new NextResponse("Missing required fields.", { status: 400 });
    }

    const companion = await prisma.companion.create({
      data: {
        name,
        description,
        src,
        seed,
        userId: user.id,
        categoryId,
        userName: user.firstName!,
        instructions,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_POST]:", error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
}
