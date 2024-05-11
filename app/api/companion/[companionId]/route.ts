import { prisma } from "@/prisma/client";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.companionId) {
      return new NextResponse("Companion id is required!", { status: 400 });
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

    const companion = await prisma.companion.update({
      where: { id: params.companionId, userId: user.id },
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
    console.log("[COMPANION_PATCH]:", error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const companion = await prisma.companion.delete({
      where: { id: params.companionId, userId: user.id },
    });
    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_DELETE]:", error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
}
